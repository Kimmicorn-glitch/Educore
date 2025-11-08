import { courses, userProgress } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const course = courses.find(c => c.id.toLowerCase() === params.subject.toLowerCase());

  if (!course) {
    notFound();
  }

  const getCompletionStatus = (lessonId: string) => {
    return userProgress.lessonCompletions.find(l => l.lessonId === lessonId)?.isCompleted || false;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">{course.title}</h1>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      <div className="space-y-4">
        {course.lessons.map(lesson => {
          const isCompleted = getCompletionStatus(lesson.id);
          return (
            <Link key={lesson.id} href={`/courses/${params.subject}/${lesson.id}`}>
              <Card className="transition-all hover:bg-card/90 hover:shadow-md">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                            <Circle className="h-6 w-6 text-muted-foreground" />
                        )}
                        <div>
                            <h3 className="font-semibold">{lesson.title}</h3>
                            <Badge 
                                variant={lesson.level === 'Beginner' ? 'secondary' : lesson.level === 'Intermediate' ? 'default' : 'destructive'}
                                className="mt-1"
                            >
                                {lesson.level}
                            </Badge>
                        </div>
                    </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
