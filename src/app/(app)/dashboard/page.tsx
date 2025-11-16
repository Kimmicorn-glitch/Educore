
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProgress as UserProgressType } from '@/lib/types';
import { courses as allCourses, badges as allBadges, exercises } from '@/lib/mock-data';

import PerformanceAnalysis from '@/components/dashboard/performance-analysis';
import ProgressChart from '@/components/dashboard/progress-chart';

import { 
  BookOpen, 
  Trophy, 
  Target, 
  Flame, 
  Star, 
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  Zap,
  Heart,
  Sparkles,
  Rocket,
  Brain,
  LucideIcon
} from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  color: string;
  icon: React.ReactNode;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
}

interface Activity {
  id: string;
  type: string;
  title: string;
  time: string;
  points: number;
}


const iconMap: { [key: string]: React.ElementType } = {
  Award,
  Code: Zap,
  GraduationCap: Brain,
  HardHat: Trophy,
  Trophy,
  Star,
  Flame,
  Heart
};


const courseIconMap: { [key: string]: React.ReactNode } = {
  Python: <Brain className="w-5 h-5" />,
  English: <BookOpen className="w-5 h-5" />,
  Maths: <Rocket className="w-5 h-5" />,
  Physics: <Sparkles className="w-5 h-5" />
};

const courseColorMap: { [key: string]: string } = {
  Python: 'bg-purple-100 text-purple-700 border-purple-200',
  English: 'bg-teal-100 text-teal-700 border-teal-200',
  Maths: 'bg-lime-100 text-lime-700 border-lime-200',
  Physics: 'bg-orange-100 text-orange-700 border-orange-200'
};


const defaultProgress: UserProgressType = {
    lessonCompletions: [],
    exerciseAttempts: [],
    badges: [],
    challengeProgress: [],
}

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const progressDocRef = useMemoFirebase(() => user ? doc(firestore, "users", user.uid, "progress", "main") : null, [user, firestore]);
  const { data: userProgress, isLoading: isProgressLoading } = useDoc<UserProgressType>(progressDocRef);

  const progress = userProgress || defaultProgress;

  const [streak, setStreak] = useState(7); // Static for now
  
  const { totalPoints, level, nextLevelProgress } = useMemo(() => {
    const totalPoints = (progress.lessonCompletions.length * 10) + (progress.challengeProgress.filter(c => c.completed).length * 50);
    const level = Math.floor(totalPoints / 200) + 1;
    const nextLevelProgress = ((totalPoints % 200) / 200) * 100;
    return { totalPoints, level, nextLevelProgress };
  }, [progress]);
  
  const courses: Course[] = useMemo(() => allCourses.map(course => {
    const completedLessons = progress.lessonCompletions.filter(lc => course.lessons.some(l => l.id === lc.lessonId && lc.isCompleted)).length;
    const courseProgress = course.lessons.length > 0 ? Math.round((completedLessons / course.lessons.length) * 100) : 0;
    return {
      id: course.id,
      title: course.title,
      progress: courseProgress,
      totalLessons: course.lessons.length,
      completedLessons: completedLessons,
      color: courseColorMap[course.id] || 'bg-gray-100 text-gray-700 border-gray-200',
      icon: courseIconMap[course.id] || <BookOpen className="w-5 h-5" />,
    };
  }), [progress.lessonCompletions]);

  const achievements: Achievement[] = useMemo(() => allBadges.map(badge => ({
    id: badge.id,
    title: badge.title,
    description: badge.description,
    icon: React.createElement(iconMap[badge.icon] || Star, { className: 'w-6 h-6' }),
    unlocked: progress.badges.includes(badge.id),
    date: progress.badges.includes(badge.id) ? 'Unlocked' : undefined
  })), [progress.badges]);

  const recentActivities: Activity[] = useMemo(() => {
      const activities = [
          ...progress.lessonCompletions.slice(-2).map(lc => {
              const lesson = allCourses.flatMap(c => c.lessons).find(l => l.id === lc.lessonId);
              return {
                id: `l-${lc.lessonId}`,
                type: 'lesson',
                title: `Completed "${lesson?.title || 'a lesson'}"`,
                time: 'Recently',
                points: 10
              }
          }),
          ...progress.challengeProgress.filter(c => c.completed).slice(-2).map(cc => ({
              id: `c-${cc.level}`,
              type: 'achievement',
              title: `Completed Challenge Level ${cc.level}`,
              time: 'Recently',
              points: 50
          }))
      ];
      return activities.sort(() => -1); // Simple reverse sort for demo
  }, [progress.lessonCompletions, progress.challengeProgress]);


  const dailyGoalCompleted = progress.lessonCompletions.length % 5;
  const dailyGoalTotal = 5;
  const dailyGoalProgress = (dailyGoalCompleted / dailyGoalTotal) * 100;


  if (isUserLoading || isProgressLoading) {
      return <div>Loading dashboard...</div>
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-500" />
              Learning Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, {user?.displayName || 'Learner'}! Keep up the amazing work! 🎉</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-purple-200">
              <AvatarImage src={user?.photoURL || ''} />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-teal-400 text-white">
                {user?.displayName?.charAt(0) || 'L'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{user?.displayName || 'Learner'}</p>
              <p className="text-sm text-muted-foreground">Level {level}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-500" />
                            Course Progress
                        </CardTitle>
                        <CardDescription>An overview of your progress across all subjects.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProgressChart userProgress={progress} />
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-teal-500" />
                            Recent Activity
                        </CardTitle>
                        <CardDescription>Your latest achievements and completed lessons</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ScrollArea className="h-[250px] pr-4">
                            <div className="space-y-3">
                                {recentActivities.map((activity, index) => (
                                <React.Fragment key={activity.id}>
                                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-teal-50/50 transition-colors">
                                    <div className="p-2 rounded-full bg-teal-100 text-teal-600">
                                        {activity.type === 'lesson' && <BookOpen className="w-4 h-4" />}
                                        {activity.type === 'quiz' && <CheckCircle2 className="w-4 h-4" />}
                                        {activity.type === 'achievement' && <Trophy className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm text-foreground">{activity.title}</p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-lime-100 text-lime-700">
                                        +{activity.points}
                                    </Badge>
                                    </div>
                                    {index < recentActivities.length - 1 && <Separator />}
                                </React.Fragment>
                                ))}
                                {recentActivities.length === 0 && (
                                    <div className="text-center text-muted-foreground py-10">
                                        <p>No recent activity. Time to start learning!</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                <PerformanceAnalysis userProgress={progress} />

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Achievements
                        </CardTitle>
                        <CardDescription>Badges you've unlocked</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px] pr-4">
                        {achievements
                            .filter((a) => a.unlocked)
                            .map((achievement) => (
                            <div
                                key={achievement.id}
                                className="mb-3 p-3 rounded-lg border border-lime-200 bg-gradient-to-br from-lime-50/50 to-white hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-start gap-3">
                                <div className="p-2 rounded-full bg-lime-100 text-lime-600">
                                    {achievement.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm text-foreground">
                                    {achievement.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                    {achievement.description}
                                    </p>
                                </div>
                                </div>
                            </div>
                            ))}
                            {achievements.filter((a) => a.unlocked).length === 0 && (
                                <div className="text-center text-muted-foreground py-10">
                                    <p>No badges unlocked yet. Complete some lessons!</p>
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Continue Learning Section */}
        <div>
            <h2 className="text-2xl font-bold mb-4">Continue Your Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 {courses.map((course) => (
                  <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                             <div className={`p-2 rounded-lg ${course.color} border`}>
                                {course.icon}
                            </div>
                            <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">{course.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{course.completedLessons} of {course.totalLessons} lessons done</p>
                        <Progress value={course.progress} className="h-2" />
                    </CardContent>
                    <CardFooter>
                         <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 w-full justify-center" asChild>
                            <Link href={`/courses/${course.id.toLowerCase()}`}>Continue Learning</Link>
                        </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
