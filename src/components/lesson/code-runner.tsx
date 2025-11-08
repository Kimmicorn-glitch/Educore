"use client"

import { useState, useEffect, useRef } from 'react';
import type { PyodideInterface } from 'pyodide';
import { Button } from '@/components/ui/button';
import { Play, Loader2, Terminal, CheckCircle, XCircle, Send } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface CodeRunnerProps {
    starterCode: string;
    testCode?: string;
}

export default function CodeRunner({ starterCode, testCode }: CodeRunnerProps) {
    const [code, setCode] = useState(starterCode);
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isExecuting, setIsExecuting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    const pyodideRef = useRef<PyodideInterface | null>(null);
    const hasAttemptedLoad = useRef(false);

    useEffect(() => {
        const loadPyodide = async () => {
            if (window.loadPyodide) {
                try {
                    const pyodide = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
                    });
                    pyodide.setStdout({ batched: (str) => setOutput(prev => prev + str + '\\n') });
                    pyodide.setStderr({ batched: (str) => setOutput(prev => prev + str + '\\n') });
                    pyodideRef.current = pyodide;
                    setIsLoading(false);
                } catch (error) {
                    console.error("Failed to load Pyodide:", error);
                    setOutput("Error: Failed to load Python environment.");
                    setIsLoading(false);
                }
            } else {
                 console.error("Pyodide script not loaded.");
                 setOutput("Error: Python runtime is not available.");
                 setIsLoading(false);
            }
        };
        
        // Ensure script is on the page before trying to load
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
                 setOutput("Error: Failed to load Python runtime script.");
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
        setOutput('');
        setSubmissionStatus('idle');
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

    const submitCode = async () => {
        if (!pyodideRef.current || !testCode) {
            setOutput("No test case available for this exercise.");
            setSubmissionStatus('incorrect');
            return;
        };
        setIsExecuting(true);
        setOutput('');
        try {
            const testWithUserCode = code + '\\n\\n' + testCode;
            const result = await pyodideRef.current.runPythonAsync(testWithUserCode);
            setOutput(prev => prev + String(result || ''));
            setSubmissionStatus('correct');
        } catch (error) {
            if (error instanceof Error) {
                setOutput(error.message);
            } else {
                setOutput(String(error));
            }
            setSubmissionStatus('incorrect');
        }
        setIsExecuting(false);
    };

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
                 <div className="p-2 border-t flex justify-end gap-2">
                    <Button onClick={runCode} variant="outline" disabled={isLoading || isExecuting}>
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading Env...</>
                        ) : isExecuting ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running...</>
                        ) : (
                            <><Play className="mr-2 h-4 w-4" /> Run Code</>
                        )}
                    </Button>
                    <Button onClick={submitCode} disabled={isLoading || isExecuting || !testCode}>
                        {isExecuting ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                        ) : (
                            <><Send className="mr-2 h-4 w-4" /> Submit Answer</>
                        )}
                    </Button>
                 </div>
            </div>

            {submissionStatus === 'correct' && (
                <Alert variant="default" className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle className="text-green-800 dark:text-green-200">Correct!</AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-300">
                        Great job! Your solution passed all the tests.
                    </AlertDescription>
                </Alert>
            )}
            {submissionStatus === 'incorrect' && (
                <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Incorrect</AlertTitle>
                    <AlertDescription>
                        Your solution didn't pass. Check the output for error messages and try again.
                    </AlertDescription>
                </Alert>
            )}

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
