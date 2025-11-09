
'use client';

import { BookOpenCheck, CheckCircle, Target } from "lucide-react";
import StatsCard from "@/components/dashboard/stats-card";
import ProgressChart from "@/components/dashboard/progress-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import PerformanceAnalysis from "@/components/dashboard/performance-analysis";
import type { UserProgress } from "@/lib/types";


const defaultProgress: UserProgress = {
    lessonCompletions: [],
    exerciseAttempts: [],
    badges: [],
    challengeProgress: [],
}

export default function DashboardPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const progressDocRef = useMemoFirebase(() => user ? doc(firestore, "users", user.uid, "progress", "main") : null, [user, firestore]);
    const { data: userProgress, isLoading } = useDoc<UserProgress>(progressDocRef);

    const progress = userProgress || defaultProgress;

    const totalLessons = 10;
    const completedLessons = progress.lessonCompletions.filter(l => l.isCompleted).length;
    const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const totalAttempts = progress.exerciseAttempts.reduce((sum, item) => sum + item.attempts, 0);

    if (isLoading) {
        return <div>Loading dashboard...</div>
    }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome Back, {user?.displayName || 'Learner'}!</h1>
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
                <ProgressChart userProgress={progress}/>
            </CardContent>
        </Card>
        <div className="lg:col-span-2">
            <PerformanceAnalysis userProgress={progress} />
        </div>
      </div>
    </div>
  );
}
