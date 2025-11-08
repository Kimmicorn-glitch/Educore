
"use client";

import { courses } from "@/lib/mock-data";
import { notFound, useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TargetAudience, UserProgress } from "@/lib/types";
import { useDoc, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

const defaultProgress: UserProgress = {
    lessonCompletions: [],
    exerciseAttempts: [],
    badges: [],
    challengeProgress: [],
}

export default function SubjectPage() {
  const params = useParams() as { subject: string };
  const course = courses.find(c => c.id.toLowerCase() === params.subject.toLowerCase());
  const [audience, setAudience] = useState<TargetAudience | "all">("all");
  const { user } = useUser();
  const firestore = useFirestore();

  const progressDocRef = useMemoFirebase(() => user ? doc(firestore, "users", user.uid, "progress", "main") : null, [user, firestore]);
  const { data: userProgress } = useDoc<UserProgress>(progressDocRef);

  const progress = userProgress || defaultProgress;

  if (!course) {
    notFound();
  }

  const getCompletionStatus = (lessonId: string) => {
    return progress.lessonCompletions.find(l => l.lessonId === lessonId)?.isCompleted || false;
  }

  const filteredLessons = audience === "all"
    ? course.lessons
    : course.lessons.filter(l => l.targetAudience === audience);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
        <div>
          <Select onValueChange={(value) => setAudience(value as TargetAudience | "all")} defaultValue="all">
              <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by audience" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="all">All Audiences</SelectItem>
                  <SelectItem value="Children">Children</SelectItem>
                  <SelectItem value="Teenagers">Teenagers</SelectItem>
                  <SelectItem value="Adults">Adults</SelectItem>
              </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLessons.map(lesson => {
          const isCompleted = getCompletionStatus(lesson.id);
          return (
            <Link key={lesson.id} href={`/courses/${params.subject}/${lesson.id}`}>
              <Card className="transition-all hover:bg-card/90 hover:shadow-md">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-start gap-4">
                        {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                        ) : (
                            <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-1" />
                        )}
                        <div>
                            <h3 className="font-semibold">{lesson.title}</h3>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <Badge 
                                    variant={lesson.level === 'Beginner' ? 'secondary' : lesson.level === 'Intermediate' ? 'default' : 'destructive'}
                                >
                                    {lesson.level}
                                </Badge>
                                <Badge variant="outline">{lesson.targetAudience}</Badge>
                            </div>
                        </div>
                    </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground ml-4" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
        {filteredLessons.length === 0 && (
            <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                    <p>No lessons found for the selected audience.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
