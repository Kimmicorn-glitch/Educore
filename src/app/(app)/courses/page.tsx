import { courses } from "@/lib/mock-data";
import SubjectCard from "@/components/courses/subject-card";

export default function CoursesPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Explore Courses</h1>
        <p className="text-muted-foreground">Choose a subject to start your learning journey.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <SubjectCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
