import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface SubjectCardProps {
  course: Course;
}

export default function SubjectCard({ course }: SubjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/courses/${course.id.toLowerCase()}`}>
          <div className="relative h-48 w-full">
            <Image
              src={course.image.url}
              alt={course.title}
              fill
              className="object-cover"
              data-ai-hint={course.image.hint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-6">
        <CardTitle className="font-headline text-xl mb-2">{course.title}</CardTitle>
        <CardDescription className="flex-grow">{course.description}</CardDescription>
        <Link href={`/courses/${course.id.toLowerCase()}`} className="mt-4">
          <Button className="w-full">
            View Lessons <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
