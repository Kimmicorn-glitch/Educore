import { courses, exercises } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import CodeRunner from "@/components/lesson/code-runner";
import AiChatbot from "@/components/lesson/ai-chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LessonPage({ params }: { params: { subject: string; lessonId: string } }) {
  const course = courses.find(c => c.id.toLowerCase() === params.subject.toLowerCase());
  const lesson = course?.lessons.find(l => l.id === params.lessonId);
  
  if (!course || !lesson) {
    notFound();
  }

  const exercise = exercises.find(e => e.id === lesson.linkedExerciseId);

  return (
    <div className="space-y-8">
        <Link href={`/courses/${params.subject}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to {course.title}
        </Link>
        
        <div className="space-y-2">
            <div className="flex items-center gap-2">
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

        <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>{lesson.content}</p>
        </div>

        {exercise && (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{exercise.title}</CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <CodeRunner starterCode={exercise.starterCode || ''} />
                </CardContent>
            </Card>
        )}

        <AiChatbot />
    </div>
  );
}
