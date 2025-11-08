import { BookOpenCheck, CheckCircle, Target } from "lucide-react";
import StatsCard from "@/components/dashboard/stats-card";
import ProgressChart from "@/components/dashboard/progress-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userProgress } from "@/lib/mock-data";
import PerformanceAnalysis from "@/components/dashboard/performance-analysis";

export default function DashboardPage() {
    const totalLessons = 10;
    const completedLessons = userProgress.lessonCompletions.filter(l => l.isCompleted).length;
    const overallProgress = Math.round((completedLessons / totalLessons) * 100);
    const totalAttempts = userProgress.exerciseAttempts.reduce((sum, item) => sum + item.attempts, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome Back, Learner!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your learning journey.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
            title="Overall Progress"
            value={`${overallProgress}%`}
            icon={CheckCircle}
            description={`${completedLessons} of ${totalLessons} lessons completed`}
        />
        <StatsCard
            title="Lessons Completed"
            value={completedLessons.toString()}
            icon={BookOpenCheck}
            description="Across all subjects"
        />
        <StatsCard
            title="Total Practice Attempts"
            value={totalAttempts.toString()}
            icon={Target}
            description="Keep practicing to improve!"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <ProgressChart />
            </CardContent>
        </Card>
        <div className="lg:col-span-2">
            <PerformanceAnalysis />
        </div>
      </div>
    </div>
  );
}
