
"use client";

import { useState, useEffect, useRef } from 'react';
import type { PyodideInterface } from 'pyodide';
import { Button } from '@/components/ui/button';
import { Play, Loader2, RefreshCw, Bot } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';

const starterCode = `# Welcome to the Playground!
# Use these commands to control the character:
# move(x, y) - Moves the character by x and y pixels.
# rotate(degrees) - Rotates the character.
# change_color(color) - Changes color (e.g., "red", "#FF5733").

# Let's draw a square!
for i in range(4):
  move(100, 0)
  rotate(90)
`;

const GameCanvas = ({ characterState }: { characterState: any }) => {
    return (
        <div className="relative w-full h-full bg-gray-900 overflow-hidden rounded-lg shadow-inner-lg">
            <motion.div
                className="absolute inset-0 z-0"
                animate={{
                    background: [
                        'linear-gradient(135deg, #1e3a8a, #4c1d95)',
                        'linear-gradient(135deg, #4c1d95, #be185d)',
                        'linear-gradient(135deg, #be185d, #1e3a8a)',
                    ],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    animate={{
                        x: characterState.x,
                        y: characterState.y,
                        rotate: characterState.rotation,
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative"
                >
                    <Bot style={{ color: characterState.color }} className="w-12 h-12" />
                </motion.div>
            </div>
        </div>
    )
}

export default function CodePlayground() {
    const [code, setCode] = useState(starterCode);
    const [isLoading, setIsLoading] = useState(true);
    const [isExecuting, setIsExecuting] = useState(false);
    const pyodideRef = useRef<PyodideInterface | null>(null);
    const hasAttemptedLoad = useRef(false);

    const [characterState, setCharacterState] = useState({
        x: 0,
        y: 0,
        rotation: 0,
        color: '#FFFFFF'
    });

    const resetCharacter = () => {
        setCharacterState({ x: 0, y: 0, rotation: 0, color: '#FFFFFF' });
    }

    useEffect(() => {
        const loadPyodide = async () => {
            if (window.loadPyodide) {
                try {
                    const pyodide = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
                    });
                    
                    const move = (x: number, y: number) => {
                        setCharacterState(prev => ({...prev, x: prev.x + x, y: prev.y + y}));
                    };
                    const rotate = (degrees: number) => {
                        setCharacterState(prev => ({...prev, rotation: prev.rotation + degrees}));
                    };
                    const change_color = (color: string) => {
                        setCharacterState(prev => ({...prev, color}));
                    };

                    pyodide.globals.set('move', move);
                    pyodide.globals.set('rotate', rotate);
                    pyodide.globals.set('change_color', change_color);

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

    }, []);

    const runCode = async () => {
        if (!pyodideRef.current) return;
        setIsExecuting(true);
        resetCharacter();
        // A small delay to ensure state reset before running new code
        await new Promise(resolve => setTimeout(resolve, 50)); 
        try {
            await pyodideRef.current.runPythonAsync(code);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                alert(`Execution Error: ${error.message}`);
            } else {
                console.error(String(error));
                alert(`An unknown error occurred: ${String(error)}`);
            }
        }
        setIsExecuting(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[60vh]">
            <div className="space-y-4">
                <div className='rounded-md border bg-card'>
                    <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your Python code here..."
                        className="font-code text-sm border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-b-none bg-gray-900 text-gray-100"
                        rows={20}
                        disabled={isLoading || isExecuting}
                    />
                     <div className="p-2 border-t flex justify-end gap-2">
                        <Button onClick={resetCharacter} variant="outline" disabled={isLoading || isExecuting}>
                           <RefreshCw className="mr-2 h-4 w-4" /> Reset
                        </Button>
                        <Button onClick={runCode} disabled={isLoading || isExecuting}>
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</>
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
                <Card className="h-full">
                    <CardContent className="p-2 h-full">
                        <GameCanvas characterState={characterState} />
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
