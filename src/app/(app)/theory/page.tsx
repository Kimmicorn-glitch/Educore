
'use client';

import { theoryContent } from '@/lib/mock-data';
import type { TheoryContent } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookText } from 'lucide-react';

function SubjectTheory({ content }: { content: TheoryContent }) {
  return (
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
          <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content.lectureNotes.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\n/g, '<br />') }} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
