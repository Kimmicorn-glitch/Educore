
"use client";

import { useState, useEffect, useRef } from 'react';
import type { PyodideInterface } from 'pyodide';
import { Button } from '@/components/ui/button';
import { Play, Loader2, RefreshCw, Rocket, Star } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { motion, useAnimation } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const starterCode = `# Welcome to the Playground!
# Your goal: guide the rocket to the star!

# Use these commands to control the rocket:
# move(x, y) - Moves by x (right) and y (down) pixels.
# rotate(degrees) - Rotates the character clockwise.

# Try to reach the star at position (200, -150)
# from your starting point (0, 0)
move(100, 0)
# What's next?
`;

const GameCanvas = ({ characterState, targetState, controls }: { characterState: any, targetState: any, controls: any }) => {
    return (
        <div className="relative w-full h-full bg-gray-800 overflow-hidden rounded-lg shadow-inner-lg flex items-center justify-center">
            <Image 
                src="https://picsum.photos/seed/galaxy-drawing/800/600" 
                alt="Galaxy drawing background" 
                layout="fill" 
                objectFit="cover" 
                className="opacity-40"
                data-ai-hint="galaxy drawing"
            />
            <motion.div
                className="absolute"
                initial={{ x: targetState.x, y: targetState.y }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
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
    const [code, setCode] = useState(starterCode);
    const [isLoading, setIsLoading] = useState(true);
    const [isExecuting, setIsExecuting] = useState(false);
    const pyodideRef = useRef<PyodideInterface | null>(null);
    const hasAttemptedLoad = useRef(false);
    const { toast } = useToast();

    const initialCharacterState = { x: 0, y: 0, rotation: 0, color: '#FFFFFF' };
    const [characterState, setCharacterState] = useState(initialCharacterState);
    
    const targetState = { x: 200, y: -150 };

    const controls = useAnimation();

    const resetCharacter = () => {
        setCharacterState(initialCharacterState);
        controls.start({ ...initialCharacterState, transition: { duration: 0 } });
    }

    const checkCollision = (charPos: {x: number, y: number}) => {
        const distance = Math.sqrt(Math.pow(charPos.x - targetState.x, 2) + Math.pow(charPos.y - targetState.y, 2));
        if (distance < 30) { // 30px collision threshold
            toast({
                title: "You reached the star! 🌟",
                description: "Great job navigating the cosmos!",
            });
        }
    }

    useEffect(() => {
        const loadPyodide = async () => {
            if (window.loadPyodide) {
                try {
                    const pyodide = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
                    });
                    
                    const move = (x: number, y: number) => {
                       setCharacterState(prev => {
                           const newState = {...prev, x: prev.x + x, y: prev.y + y};
                           controls.start({ x: newState.x, y: newState.y });
                           checkCollision(newState);
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
                    setIsLoading(false);
                } catch (error) {
                    console.error("Failed to load Pyodide:", error);
                    setIsLoading(false);
                }
            } else {
                 console.error("Pyodide script not loaded.");
                 setIsLoading(false);
            }
        };
        
        if (!document.getElementById('pyodide-script')) {
            const script = document.createElement('script');
            script.id = 'pyodide-script';
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
            script.async = true;
            script.onload = () => {
                if (!hasAttemptedLoad.current && window.loadPyodide) {
                    loadPyodide();
                    hasAttemptedLoad.current = true;
                }
            };
            script.onerror = () => {
                 setIsLoading(false);
            }
            document.body.appendChild(script);
        } else if (window.loadPyodide && !hasAttemptedLoad.current) {
            loadPyodide();
            hasAttemptedLoad.current = true;
        }

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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[60vh]">
            <div className="space-y-4">
                <div className='rounded-md border bg-card flex flex-col h-full'>
                    <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your Python code here..."
                        className="font-code text-sm border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-b-none bg-gray-900 text-gray-100 flex-grow"
                        rows={20}
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
                        <GameCanvas characterState={characterState} targetState={targetState} controls={controls} />
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
