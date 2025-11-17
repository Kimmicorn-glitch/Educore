
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProgress as UserProgressType } from '@/lib/types';
import { courses as allCourses, badges as allBadges } from '@/lib/mock-data';

import PerformanceAnalysis from '@/components/dashboard/performance-analysis';
import ProgressChart from '@/components/dashboard/progress-chart';
import StatsCard from '@/components/dashboard/stats-card';

import { 
  BookOpen, 
  Trophy, 
  Target, 
  Flame, 
  Star,
  CheckCircle2,
  Sparkles,
  Brain,
  Rocket,
  PlusCircle,
  TrendingUp
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
}

interface Activity {
  id: string;
  type: 'lesson' | 'challenge';
  title: string;
  time: string;
  points: number;
}


const iconMap: { [key: string]: React.ElementType } = {
  Award: Star,
  Code: Sparkles,
  GraduationCap: Brain,
  HardHat: Trophy,
  Trophy,
  Star,
  Flame,
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
  
  const { totalPoints, level } = useMemo(() => {
    const totalPoints = (progress.lessonCompletions.length * 10) + (progress.challengeProgress.filter(c => c.completed).length * 50);
    const level = Math.floor(totalPoints / 200) + 1;
    return { totalPoints, level };
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
  })), [progress.badges]);

  const recentActivities: Activity[] = useMemo(() => {
      const activities = [
          ...progress.lessonCompletions.slice(-3).map(lc => {
              const lesson = allCourses.flatMap(c => c.lessons).find(l => l.id === lc.lessonId);
              return {
                id: `l-${lc.lessonId}`,
                type: 'lesson' as 'lesson',
                title: `Completed "${lesson?.title || 'a lesson'}"`,
                time: 'Recently',
                points: 10
              }
          }),
          ...progress.challengeProgress.filter(c => c.completed).slice(-2).map(cc => ({
              id: `c-${cc.level}`,
              type: 'challenge' as 'challenge',
              title: `Conquered Challenge Level ${cc.level}`,
              time: 'Recently',
              points: 50
          }))
      ];
      return activities.sort(() => -1); // Simple reverse sort for demo
  }, [progress.lessonCompletions, progress.challengeProgress]);

  if (isUserLoading || isProgressLoading) {
      return <div>Loading dashboard...</div>
  }

  return (
    <div className="space-y-8">
      
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-foreground font-headline flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-primary" />
                    Welcome Back, {user?.displayName?.split(' ')[0] || 'Learner'}!
                </h1>
                <p className="text-muted-foreground mt-2">Here's a snapshot of your learning journey. Keep up the great work! 🎉</p>
            </div>
            <Button asChild>
              <Link href="/courses">
                <PlusCircle className="mr-2 h-4 w-4"/>
                Start a New Lesson
              </Link>
            </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Points" value={totalPoints.toString()} icon={Star} description={`You are currently Level ${level}`} />
            <StatsCard title="Lessons Completed" value={progress.lessonCompletions.length.toString()} icon={BookOpen} description="Keep learning new things!" />
            <StatsCard title="Challenges Won" value={progress.challengeProgress.filter(c => c.completed).length.toString()} icon={Trophy} description="Putting skills to the test." />
            <StatsCard title="Learning Streak" value={`${streak} days`} icon={Flame} description="Consistency is key!" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Left Column (Main) */}
            <div className="lg:col-span-3 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            Course Progress
                        </CardTitle>
                        <CardDescription>Your progress across all subjects.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProgressChart userProgress={progress} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-teal-500" />
                            Recent Activity
                        </CardTitle>
                        <CardDescription>Your latest achievements and completed lessons.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ScrollArea className="h-[250px] pr-4">
                            <div className="space-y-1">
                                {recentActivities.map((activity, index) => (
                                <React.Fragment key={activity.id}>
                                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="p-2.5 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400">
                                            {activity.type === 'lesson' ? <BookOpen className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-foreground">{activity.title}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                        <Badge variant="secondary" className="bg-lime-100 text-lime-700 dark:bg-lime-900/50 dark:text-lime-300">
                                            +{activity.points} XP
                                        </Badge>
                                    </div>
                                    {index < recentActivities.length - 1 && <Separator className="my-1" />}
                                </React.Fragment>
                                ))}
                                {recentActivities.length === 0 && (
                                    <div className="text-center text-muted-foreground py-10">
                                        <p>No recent activity yet. Let's start learning!</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column (Continue Learning) */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          Continue Your Journey
                      </CardTitle>
                      <CardDescription>Pick up where you left off.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col gap-4">
                      {courses.map((course) => (
                        <Link href={`/courses/${course.id.toLowerCase()}`} key={course.id} className="block group">
                          <Card className="hover:shadow-md hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${course.color} border`}>
                                    {course.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-semibold group-hover:text-primary transition-colors">{course.title}</h4>
                                    <span className="text-xs font-medium text-muted-foreground">{course.progress}%</span>
                                  </div>
                                  <Progress value={course.progress} className="h-2" />
                                </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                  </CardContent>
              </Card>
            </div>
        </div>

        {/* Secondary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
              <PerformanceAnalysis userProgress={progress} />
          </div>
          <div className="lg:col-span-2">
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      Achievements
                      </CardTitle>
                      <CardDescription>Badges you've unlocked so far.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ScrollArea className="h-[340px] pr-4">
                      {achievements
                          .filter((a) => a.unlocked)
                          .map((achievement) => (
                          <div
                              key={achievement.id}
                              className="mb-3 p-3 rounded-lg border bg-background hover:border-yellow-400/50 transition-colors"
                          >
                              <div className="flex items-center gap-4">
                              <div className="p-2.5 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400">
                                  {achievement.icon}
                              </div>
                              <div className="flex-1">
                                  <h4 className="font-semibold text-sm text-foreground">
                                  {achievement.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                  {achievement.description}
                                  </p>
                              </div>
                              </div>
                          </div>
                          ))}
                          {achievements.filter((a) => a.unlocked).length === 0 && (
                              <div className="text-center text-muted-foreground py-10">
                                  <p>No badges unlocked yet. Complete lessons and challenges to earn them!</p>
                              </div>
                          )}
                      </ScrollArea>
                  </CardContent>
              </Card>
          </div>
        </div>

    </div>
  );
}
    
    
