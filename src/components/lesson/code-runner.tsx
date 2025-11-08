"use client"

import { useState, useEffect, useRef } from 'react';
import type { PyodideInterface } from 'pyodide';
import { Button } from '@/components/ui/button';
import { Play, Loader2, Terminal } from 'lucide-react';
import { Textarea } from '../ui/textarea';

interface CodeRunnerProps {
    starterCode: string;
}

export default function CodeRunner({ starterCode }: CodeRunnerProps) {
    const [code, setCode] = useState(starterCode);
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isExecuting, setIsExecuting] = useState(false);
    const pyodideRef = useRef<PyodideInterface | null>(null);

    useEffect(() => {
        const loadPyodide = async () => {
            if (window.loadPyodide) {
                try {
                    const pyodide = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
                    });
                    pyodide.setStdout({ batched: (str) => setOutput(prev => prev + str + '\n') });
                    pyodide.setStderr({ batched: (str) => setOutput(prev => prev + str + '\n') });
                    pyodideRef.current = pyodide;
                } catch (error) {
                    console.error("Failed to load Pyodide:", error);
                    setOutput("Error: Failed to load Python environment.");
                }
            } else {
                console.error("Pyodide script not loaded.");
                setOutput("Error: Python runtime is not available.");
            }
            setIsLoading(false);
        };
        loadPyodide();
    }, []);

    const runCode = async () => {
        if (!pyodideRef.current) return;
        setIsExecuting(true);
        setOutput('');
        try {
            await pyodideRef.current.runPythonAsync(code);
        } catch (error) {
            if (error instanceof Error) {
                setOutput(error.message);
            } else {
                setOutput(String(error));
            }
        }
        setIsExecuting(false);
    };
    
    // Pyodide is not defined on the server, so we need to add its script tag.
    // The component logic assumes it will be available on the `window` object.
    useEffect(() => {
        if (document.getElementById('pyodide-script')) return;
        const script = document.createElement('script');
        script.id = 'pyodide-script';
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="space-y-4">
            <div className='rounded-md border bg-card'>
                <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Write your Python code here..."
                    className="font-code text-sm border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-b-none"
                    rows={10}
                    disabled={isLoading || isExecuting}
                />
                 <div className="p-2 border-t flex justify-end">
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

            {output && (
                <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <Terminal className="h-5 w-5" />
                        Output
                    </h4>
                    <pre className="bg-muted p-4 rounded-md text-sm text-muted-foreground overflow-x-auto">
                        <code>{output}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}

// Add Pyodide type to global window
declare global {
  interface Window {
    loadPyodide: (options?: { indexURL: string }) => Promise<PyodideInterface>;
  }
}
