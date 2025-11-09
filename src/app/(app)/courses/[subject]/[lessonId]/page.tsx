
'use client';

import { courses, exercises } from "@/lib/mock-data";
import { notFound, useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import CodeRunner from "@/components/lesson/code-runner";
import AiChatbot from "@/components/lesson/ai-chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useUser, useFirestore, useMemoFirebase, updateDocumentNonBlocking, useDoc } from "@/firebase";
import { doc, arrayUnion } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import type { UserProgress } from "@/lib/types";

export default function LessonPage() {
  const params = useParams() as { subject: string; lessonId: string };
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const course = courses.find(c => c.id.toLowerCase() === params.subject.toLowerCase());
  const lesson = course?.lessons.find(l => l.id === params.lessonId);
  
  const progressDocRef = useMemoFirebase(() => user ? doc(firestore, "users", user.uid, "progress", "main") : null, [user, firestore]);
  const { data: userProgress, mutate } = useDoc<UserProgress>(progressDocRef);

  if (!course || !lesson) {
    notFound();
  }

  const exercise = exercises.find(e => e.id === lesson.linkedExerciseId);

  const handleMarkComplete = () => {
    if (!user || !firestore) {
        toast({
            variant: "destructive",
            title: "Not logged in",
            description: "You must be logged in to save your progress.",
        });
        return;
    }

    const progressRef = doc(firestore, "users", user.uid, "progress", "main");
    const newCompletion = { lessonId: lesson.id, isCompleted: true };

    updateDocumentNonBlocking(progressRef, {
        lessonCompletions: arrayUnion(newCompletion)
    });
    
    if (userProgress) {
        const alreadyCompleted = userProgress.lessonCompletions.some(lc => lc.lessonId === lesson.id);
        if (!alreadyCompleted) {
            mutate({ 
                ...userProgress, 
                lessonCompletions: [...userProgress.lessonCompletions, newCompletion] 
            });
        }
    }

    toast({
        title: "Progress Saved!",
        description: `Lesson "${lesson.title}" marked as complete.`,
    });
  }

  return (
    <div className="space-y-8">
        <Link href={`/courses/${params.subject}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to {course.title}
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge 
                        variant={lesson.level === 'Beginner' ? 'secondary' : lesson.level === 'Intermediate' ? 'default' : 'destructive'}
                        className="w-fit"
                    >
                        {lesson.level}
                    </Badge>
                    <Badge variant="outline">{lesson.targetAudience}</Badge>
                </div>
                <h1 className="text-4xl font-bold font-headline">{lesson.title}</h1>
            </div>
            <Button onClick={handleMarkComplete} className="w-full md:w-auto">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Complete
            </Button>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: lesson.content.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\n\n/g, '<br /><br />').replace(/\n/g, '<br />') }} />


        {exercise && (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{exercise.title}</CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <CodeRunner 
                        starterCode={exercise.starterCode || ''} 
                        testCode={exercise.test} 
                        lessonId={lesson.id}
                    />
                </CardContent>
            </Card>
        )}

        <AiChatbot lessonContent={lesson.content} />
    </div>
  );
}
