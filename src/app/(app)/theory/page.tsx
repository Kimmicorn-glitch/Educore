
'use client';

import { useState, useTransition } from 'react';
import { theoryContent } from '@/lib/mock-data';
import type { TheoryContent } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookText, Loader2, PlayCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAudioLecture } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function SubjectTheory({ content }: { content: TheoryContent }) {
  const [isPending, startTransition] = useTransition();
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateAudio = () => {
    setError(null);
    setAudioSrc(null);
    startTransition(async () => {
        // Strip HTML tags for the TTS service, but keep paragraph breaks for natural pauses.
        const plainText = content.lectureNotes
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/p>/gi, '\n')
            .replace(/<[^>]*>/g, '');

        const result = await getAudioLecture({ text: plainText });

        if (result.success && result.data) {
            setAudioSrc(result.data.audio);
            toast({
                title: "Audio Lecture Ready",
                description: "Your audio lecture has been generated.",
            });
        } else {
            setError(result.error || "An unknown error occurred.");
            toast({
                variant: "destructive",
                title: "Audio Generation Failed",
                description: result.error,
            });
        }
    });
  };

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible defaultValue="glossary" className="w-full">
        <AccordionItem value="glossary">
          <AccordionTrigger>Vocabulary Glossary</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {content.glossary.map((item, index) => (
                <div key={index} className="border-b pb-2">
                  <h4 className="font-semibold">{item.term}</h4>
                  <p className="text-muted-foreground text-sm">{item.definition}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="notes">
          <AccordionTrigger>Lecture Notes</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
                <Button onClick={handleGenerateAudio} disabled={isPending}>
                    {isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                    ) : (
                        <><PlayCircle className="mr-2 h-4 w-4" /> Generate Audio Lecture</>
                    )}
                </Button>

                {isPending && (
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Generating Audio</AlertTitle>
                        <AlertDescription>
                            This can take up to a minute for longer lectures. Please be patient.
                        </AlertDescription>
                    </Alert>
                )}

                {error && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error Generating Audio</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {audioSrc && (
                    <div>
                        <audio controls src={audioSrc} className="w-full">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}

                <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content.lectureNotes }} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default function TheoryPage() {
  return (
    <div className="space-y-8">
        <div className="flex items-center gap-4">
            <BookText className="h-10 w-10 text-primary" />
            <div>
                <h1 className="text-3xl font-bold font-headline">Theory & Concepts</h1>
                <p className="text-muted-foreground">A reference guide for core topics, glossaries, and lecture notes.</p>
            </div>
        </div>

        <Card>
            <CardContent className="p-6">
                <Tabs defaultValue="Python" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="Python">Python</TabsTrigger>
                        <TabsTrigger value="English">English</TabsTrigger>
                        <TabsTrigger value="Maths">Maths</TabsTrigger>
                        <TabsTrigger value="Physics">Physics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Python">
                        <SubjectTheory content={theoryContent.find(t => t.subject === 'Python')!} />
                    </TabsContent>
                    <TabsContent value="English">
                        <SubjectTheory content={theoryContent.find(t => t.subject === 'English')!} />
                    </TabsContent>
                    <TabsContent value="Maths">
                        <SubjectTheory content={theoryContent.find(t => t.subject === 'Maths')!} />
                    </TabsContent>
                    <TabsContent value="Physics">
                        <SubjectTheory content={theoryContent.find(t => t.subject === 'Physics')!} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>

    </div>
  );
}
