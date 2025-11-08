
'use client';

import { useState } from 'react';
import { challenges, userProgress } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, Swords, Trophy, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CodeRunner from '@/components/lesson/code-runner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0]);

  const getCompletionStatus = (level: number) => {
    return userProgress.challengeProgress.find(p => p.level === level)?.completed || false;
  };

  const totalCompleted = userProgress.challengeProgress.filter(p => p.completed).length;
  const totalChallenges = challenges.length;
  const progressPercentage = (totalCompleted / totalChallenges) * 100;

  return (
    <div className="space-y-8">
        <div className="flex items-center gap-4">
            <Swords className="h-10 w-10 text-primary" />
            <div>
                <h1 className="text-3xl font-bold font-headline">Coding Challenges</h1>
                <p className="text-muted-foreground">Apply your skills and climb the ranks!</p>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-amber-500" />
                    Your Progress
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <div className="w-full bg-muted rounded-full h-4">
                        <div 
                            className="bg-primary h-4 rounded-full transition-all duration-500" 
                            style={{ width: `${progressPercentage}%`}}
                        ></div>
                    </div>
                    <span className="font-bold">{totalCompleted} / {totalChallenges}</span>
                </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Challenge Levels</CardTitle>
                        <CardDescription>Select a level to begin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                        {challenges.map(challenge => (
                            <button
                                key={challenge.level}
                                onClick={() => setSelectedChallenge(challenge)}
                                className={`w-full text-left p-3 rounded-lg border transition-all ${selectedChallenge.level === challenge.level ? 'bg-primary/10 border-primary' : 'hover:bg-muted'}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {getCompletionStatus(challenge.level) ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        ) : (
                                            <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                        )}
                                        <span className="font-semibold">Level {challenge.level}: {challenge.title}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardDescription>Level {selectedChallenge.level}</CardDescription>
                                <CardTitle className="font-headline text-2xl mt-1">{selectedChallenge.title}</CardTitle>
                            </div>
                            <div className="flex gap-2 flex-wrap justify-end max-w-[50%]">
                                {selectedChallenge.tags.map(tag => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-muted-foreground">{selectedChallenge.description}</p>
                        
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-sm">
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-accent" /> Need a hint?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="prose prose-sm dark:prose-invert bg-muted p-3 rounded-md">
                                        The test case for this problem is:
                                        <pre><code className="language-python">{selectedChallenge.test}</code></pre>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <CodeRunner 
                            starterCode={selectedChallenge.starterCode}
                            testCode={selectedChallenge.test}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
