'use client';

import React, { useState } from 'react';
import { theoryContent } from '@/lib/mock-data';
import type { TheoryContent as TheoryContentType, Subject } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  FileText,
  Search,
  ChevronRight,
  Clock,
  Tag,
  Download,
  Share2,
  Bookmark,
  Plus,
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  subject: string;
  date: string;
  duration: string;
  tags: string[];
  content: string;
  summary: string;
}

interface Theory {
  id: string;
  title: string;
  category: string;
  description: string;
  keyPoints: string[];
}

// Adapt mock data to the new UI structure
const notes: Note[] = theoryContent.map((subjectContent, index) => ({
    id: `${subjectContent.subject.toLowerCase()}-${index}`,
    title: `${subjectContent.subject} Core Concepts`,
    subject: subjectContent.subject,
    date: '2024-01-18', // Static date for example
    duration: '2h 15m', // Static duration
    tags: ['Fundamentals', subjectContent.subject],
    content: subjectContent.lectureNotes.replace(/<[^>]*>/g, ''), // Strip HTML for plain text view
    summary: `An overview of the core theoretical concepts for ${subjectContent.subject}, covering fundamental principles and key ideas.`
}));

const theories: Theory[] = theoryContent.flatMap(subjectContent => 
    subjectContent.glossary.map(item => ({
        id: `${subjectContent.subject}-${item.term}`,
        title: item.term,
        category: subjectContent.subject,
        description: item.definition,
        keyPoints: [
            `Core concept in ${subjectContent.subject}`,
            'Fundamental for advanced topics'
        ]
    }))
);


export default function TheoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0] || null);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredTheories = theories.filter(
    (theory) =>
      theory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theory.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
           <div className="space-y-1">
             <h1 className="text-3xl font-bold font-headline">Theory & Concepts</h1>
             <p className="text-muted-foreground">Your comprehensive lecture notes and theory hub</p>
           </div>
           <Button>
             <Plus className="w-4 h-4 mr-2" />
             New Note
           </Button>
         </div>

        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
            type="text"
            placeholder="Search notes, theories, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            />
        </div>
        <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="notes">
                <FileText className="w-4 h-4 mr-2" />
                Lecture Notes
            </TabsTrigger>
            <TabsTrigger value="theory">
                <BookOpen className="w-4 h-4 mr-2" />
                Glossary
            </TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-3 pr-4">
                    {filteredNotes.map((note) => (
                        <Card
                        key={note.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedNote?.id === note.id
                            ? 'border-primary bg-primary/10'
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedNote(note)}
                        >
                        <CardHeader className="p-4 pb-3">
                            <div className="flex items-start justify-between">
                            <CardTitle className="text-base font-semibold line-clamp-2">
                                {note.title}
                            </CardTitle>
                            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                            </div>
                            <CardDescription className="text-sm">{note.subject}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-2">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {note.duration}
                            </span>
                            <span>{note.date}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                            {note.tags.slice(0, 2).map((tag) => (
                                <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                                >
                                {tag}
                                </Badge>
                            ))}
                            {note.tags.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                +{note.tags.length - 2}
                                </Badge>
                            )}
                            </div>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                </ScrollArea>
                </div>
                <div className="lg:col-span-2">
                {selectedNote ? (
                    <Card>
                    <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                            <CardTitle className="text-2xl">{selectedNote.title}</CardTitle>
                            <CardDescription className="text-base">{selectedNote.subject}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                            <Bookmark className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                            <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                            <Download className="w-4 h-4" />
                            </Button>
                        </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {selectedNote.duration}
                        </span>
                        <span>{selectedNote.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                        {selectedNote.tags.map((tag) => (
                            <Badge
                            key={tag}
                            variant="secondary"
                            >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                            </Badge>
                        ))}
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="p-6 space-y-6">
                        <div>
                        <h3 className="text-lg font-semibold mb-3 text-primary">Summary</h3>
                        <p className="text-muted-foreground leading-relaxed">{selectedNote.summary}</p>
                        </div>
                        <Separator />
                        <div>
                        <h3 className="text-lg font-semibold mb-3 text-primary">Detailed Notes</h3>
                        <p className="text-foreground leading-relaxed whitespace-pre-line">{selectedNote.content}</p>
                        </div>
                    </CardContent>
                    </Card>
                ) : (
                    <Card className="h-full flex items-center justify-center min-h-[400px]">
                    <CardContent className="text-center space-y-3 p-6">
                        <FileText className="w-16 h-16 mx-auto text-muted-foreground/50" />
                        <p className="text-muted-foreground">Select a note to view details</p>
                    </CardContent>
                    </Card>
                )}
                </div>
            </div>
            </TabsContent>
            <TabsContent value="theory" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTheories.map((theory) => (
                <Card key={theory.id} className="hover:shadow-lg transition-all hover:border-primary/50">
                    <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                        <Badge variant="default">
                        {theory.category}
                        </Badge>
                        <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{theory.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                        {theory.description}
                    </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4 p-6">
                    <h4 className="text-sm font-semibold mb-3 text-primary">Key Points:</h4>
                    <ul className="space-y-2">
                        {theory.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                        </li>
                        ))}
                    </ul>
                    </CardContent>
                </Card>
                ))}
            </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}