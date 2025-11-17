
"use client";

import { useState, useEffect, useRef } from 'react';
import type { PyodideInterface } from 'pyodide';
import { Button } from '@/components/ui/button';
import { Play, Loader2, RefreshCw, Rocket, Star, CheckCircle } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { motion, useAnimation } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { playgroundLevels } from '@/lib/mock-data';
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc, arrayUnion } from 'firebase/firestore';
import type { UserProgress, PlaygroundLevel } from '@/lib/types';


// Store the pyodide instance promise globally to ensure it's loaded only once.
let pyodidePromise: Promise<PyodideInterface> | null = null;

const getPyodide = () => {
    if (!pyodidePromise) {
        pyodidePromise = (async () => {
            // Load the pyodide script itself
            if (typeof window !== 'undefined' && !window.loadPyodide) {
                await new Promise<void>((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
                    script.async = true;
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error("Failed to load Pyodide script."));
                    document.body.appendChild(script);
                });
            }
            // Initialize pyodide
            const pyodide = await window.loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
            });
            return pyodide;
        })();
    }
    return pyodidePromise;
};


const GameCanvas = ({ characterState, targetState, controls }: { characterState: any, targetState: any, controls: any }) => {
    const nightSkyImage = PlaceHolderImages.find(p => p.id === 'night-sky');
    return (
        <div className="relative w-full h-full bg-gray-800 overflow-hidden rounded-lg shadow-inner-lg flex items-center justify-center">
            {nightSkyImage && (
                <Image 
                    src={nightSkyImage.imageUrl} 
                    alt="Night sky with stars background" 
                    fill
                    className="object-cover opacity-40"
                    data-ai-hint={nightSkyImage.imageHint}
                />
            )}
            <motion.div
                className="absolute"
                initial={{ x: targetState.x, y: targetState.y }}
                animate={{ x: targetState.x, y: targetState.y, scale: [1, 1.2, 1] }}
                transition={{ scale: { duration: 2, repeat: Infinity } }}
            >
                <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
            </motion.div>
            <motion.div
                animate={controls}
                transition={{ type: "spring", stiffness: 100 }}
                className="absolute"
            >
                <Rocket style={{ color: characterState.color }} className="w-10 h-10" />
            </motion.div>
        </div>
    )
}

export default function CodePlayground() {
    const { user } = useUser();
    const firestore = useFirestore();
    const progressDocRef = useMemoFirebase(() => user ? doc(firestore, "users", user.uid, "progress", "main") : null, [user, firestore]);
    const { data: userProgress } = useDoc<UserProgress>(progressDocRef);

    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [currentLevel, setCurrentLevel] = useState<PlaygroundLevel>(playgroundLevels[0]);

    const [code, setCode] = useState(currentLevel.starterCode);
    const [isLoading, setIsLoading] = useState(true);
    const [isExecuting, setIsExecuting] = useState(false);
    const pyodideRef = useRef<PyodideInterface | null>(null);
    const { toast } = useToast();

    const initialCharacterState = { x: 0, y: 0, rotation: 0, color: '#FFFFFF' };
    const [characterState, setCharacterState] = useState(initialCharacterState);
    
    const controls = useAnimation();

    useEffect(() => {
        if(userProgress?.playgroundProgress) {
            const lastCompletedLevel = userProgress.playgroundProgress.reduce((max, p) => p.completed && p.level > max ? p.level : max, 0);
            const nextLevelIndex = playgroundLevels.findIndex(l => l.level === lastCompletedLevel + 1);
            setCurrentLevelIndex(nextLevelIndex > -1 ? nextLevelIndex : playgroundLevels.length -1);
        }
    }, [userProgress]);
    
    useEffect(() => {
        const newLevel = playgroundLevels[currentLevelIndex];
        setCurrentLevel(newLevel);
        setCode(newLevel.starterCode);
        resetCharacter();
    }, [currentLevelIndex, controls]);


    const resetCharacter = () => {
        setCharacterState(initialCharacterState);
        controls.start({ ...initialCharacterState, transition: { duration: 0 } });
    }

    const handleLevelComplete = async () => {
        if (user && progressDocRef) {
            updateDocumentNonBlocking(progressDocRef, {
                playgroundProgress: arrayUnion({ level: currentLevel.level, completed: true })
            });
        }
        
        toast({
            title: `Level ${currentLevel.level} Complete! 🌟`,
            description: "Great job navigating the cosmos!",
        });

        if (currentLevelIndex < playgroundLevels.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
        } else {
             toast({
                title: "All Challenges Cleared! 🚀",
                description: "You're a master navigator!",
            });
        }
    }
    
    useEffect(() => {
        const checkCollision = (charPos: {x: number, y: number}) => {
            const distance = Math.sqrt(Math.pow(charPos.x - currentLevel.target.x, 2) + Math.pow(charPos.y - currentLevel.target.y, 2));
            if (distance < 30) { // 30px collision threshold
               handleLevelComplete();
            }
        }
        checkCollision(characterState);
    }, [characterState, currentLevel.target]);


    useEffect(() => {
        const loadPyodide = async () => {
             try {
                const pyodide = await getPyodide();
                
                const move = (x: number, y: number) => {
                   setCharacterState(prev => {
                       const newState = {...prev, x: prev.x + x, y: prev.y + y};
                       controls.start({ x: newState.x, y: newState.y });
                       return newState;
                    });
                };
                const rotate = (degrees: number) => {
                    setCharacterState(prev => {
                        const newState = {...prev, rotation: prev.rotation + degrees };
                        controls.start({ rotate: newState.rotation });
                        return newState;
                    });
                };

                pyodide.globals.set('move', move);
                pyodide.globals.set('rotate', rotate);
                
                pyodideRef.current = pyodide;
            } catch (error) {
                console.error("Failed to initialize Pyodide:", error);
                toast({ variant: 'destructive', title: "Environment Error", description: error instanceof Error ? error.message : "Failed to load Python environment." });
            } finally {
                setIsLoading(false);
            }
        };
        
        loadPyodide();

    }, [controls, toast]);

    const runCode = async () => {
        if (!pyodideRef.current) return;
        setIsExecuting(true);
        resetCharacter();
        await new Promise(resolve => setTimeout(resolve, 100)); 
        try {
            await pyodideRef.current.runPythonAsync(code);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                toast({ variant: 'destructive', title: "Execution Error", description: error.message });
            } else {
                console.error(String(error));
                toast({ variant: 'destructive', title: "An unknown error occurred", description: String(error) });
            }
        }
        setIsExecuting(false);
    };
    
    const allLevelsCompleted = currentLevelIndex >= playgroundLevels.length - 1 && 
                               userProgress?.playgroundProgress?.some(p => p.level === playgroundLevels[playgroundLevels.length - 1].level && p.completed);

    if (allLevelsCompleted) {
        return (
            <Card className="flex flex-col items-center justify-center text-center p-8">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold">Congratulations!</h2>
                <p className="text-muted-foreground">You have completed all playground challenges.</p>
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[60vh]">
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Level {currentLevel.level}: {currentLevel.title}</CardTitle>
                        <CardDescription>
                            Your mission is to guide the rocket to the star at coordinates ({currentLevel.target.x}, {currentLevel.target.y}).
                        </CardDescription>
                    </CardHeader>
                </Card>
                <div className='rounded-md border bg-card flex flex-col h-full'>
                    <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your Python code here..."
                        className="font-code text-sm border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-b-none bg-gray-900 text-gray-100 flex-grow"
                        rows={15}
                        disabled={isLoading || isExecuting}
                    />
                     <div className="p-2 border-t flex justify-end gap-2">
                        <Button onClick={resetCharacter} variant="outline" disabled={isLoading || isExecuting}>
                           <RefreshCw className="mr-2 h-4 w-4" /> Reset
                        </Button>
                        <Button onClick={runCode} disabled={isLoading || isExecuting}>
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading Env...</>
                            ) : isExecuting ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running...</>
                            ) : (
                                <><Play className="mr-2 h-4 w-4" /> Run Code</>
                            )}
                        </Button>
                     </div>
                </div>
            </div>
            <div>
                <Card className="h-full aspect-square lg:aspect-auto">
                    <CardContent className="p-2 h-full">
                        <GameCanvas characterState={characterState} targetState={currentLevel.target} controls={controls} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Add Pyodide type to global window
declare global {
  interface Window {
    loadPyodide: (options?: { indexURL: string }) => Promise<PyodideInterface>;
  }
}
