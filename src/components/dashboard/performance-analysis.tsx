"use client";

import { useState, useTransition } from "react";
import { Wand2, Loader2, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getPerformanceAnalysis } from "@/app/actions";
import { userProgress } from "@/lib/mock-data";
import type { PerformanceAnalysisOutput } from "@/ai/flows/ai-powered-personalized-learning";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Subject } from "@/lib/types";

export default function PerformanceAnalysis() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [analysis, setAnalysis] = useState<PerformanceAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState<Subject>('Python');

  const handleAnalysis = () => {
    setError(null);
    setAnalysis(null);
    startTransition(async () => {
      const result = await getPerformanceAnalysis({
        ...userProgress,
        subject,
      });

      if (result.success && result.data) {
        setAnalysis(result.data);
        toast({
          title: "Analysis Complete",
          description: "Your personalized learning suggestions are ready.",
        });
      } else {
        setError(result.error || "An unknown error occurred.");
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: result.error || "Could not generate performance analysis.",
        });
      }
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          <span>AI Learning Advisor</span>
        </CardTitle>
        <CardDescription>
          Get personalized tips to improve your skills. Select a subject and click analyze.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between gap-4">
        <div>
            <Select onValueChange={(value) => setSubject(value as Subject)} defaultValue={subject}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Maths">Maths</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                </SelectContent>
            </Select>

            {isPending && (
            <div className="mt-4 flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="mt-2 text-sm">Our AI is analyzing your progress...</p>
            </div>
            )}
            
            {error && (
                <div className="mt-4 p-4 rounded-md bg-destructive/10 text-destructive-foreground flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {analysis && !isPending && (
            <div className="mt-4 space-y-4">
                <div>
                <h4 className="font-semibold flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    Difficulty Adjustment
                </h4>
                <p className="text-sm text-muted-foreground capitalize">{analysis.recommendedDifficultyAdjustment}</p>
                </div>
                <div>
                <h4 className="font-semibold flex items-center gap-2 mb-1">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    Focus Areas
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {analysis.suggestedFocusAreas.map((area, index) => (
                    <li key={index}>{area}</li>
                    ))}
                </ul>
                </div>
            </div>
            )}
        </div>

        <Button onClick={handleAnalysis} disabled={isPending} className="w-full mt-4">
          {isPending ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
          ) : (
            <><Wand2 className="mr-2 h-4 w-4" /> Analyze Performance</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
