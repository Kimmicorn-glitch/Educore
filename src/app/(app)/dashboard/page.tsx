'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from '@/components/ui/card';
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
  const totalPoints = (progress.lessonCompletions.length * 10) + (progress.challengeProgress.filter(c => c.completed).length * 50);
  const level = Math.floor(totalPoints / 200) + 1;
  const nextLevelProgress = ((totalPoints % 200) / 200) * 100;
  
  const courses: Course[] = allCourses.map(course => {
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
  });

  const achievements: Achievement[] = allBadges.map(badge => ({
    id: badge.id,
    title: badge.title,
    description: badge.description,
    icon: React.createElement(iconMap[badge.icon] || Star, { className: 'w-6 h-6' }),
    unlocked: progress.badges.includes(badge.id),
    date: progress.badges.includes(badge.id) ? 'Unlocked' : undefined
  }));

  const recentActivities: Activity[] = [
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
  ].sort(() => -1); // Simple reverse sort for demo


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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-purple-100 bg-gradient-to-br from-purple-50/50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current Streak
                </CardTitle>
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{streak} days</div>
              <p className="text-xs text-muted-foreground mt-1">Keep it going! 🔥</p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 bg-gradient-to-br from-teal-50/50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Points
                </CardTitle>
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalPoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">+10 this week ⭐</p>
            </CardContent>
          </Card>

          <Card className="border-lime-100 bg-gradient-to-br from-lime-50/50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current Level
                </CardTitle>
                <TrendingUp className="w-5 h-5 text-lime-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">Level {level}</div>
              <Progress value={nextLevelProgress} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(nextLevelProgress)}% to next level
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 bg-gradient-to-br from-purple-50/50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Study Time
                </CardTitle>
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">12.5h</div>
              <p className="text-xs text-muted-foreground mt-1">This week ⏰</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses Progress */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Your Courses
                </CardTitle>
                <CardDescription>Track your learning progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="group p-4 rounded-lg border border-border/50 hover:border-purple-200 transition-all duration-300 hover:shadow-md bg-gradient-to-r from-background to-purple-50/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${course.color} border`}>
                          {course.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-purple-600 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {course.completedLessons} of {course.totalLessons} lessons
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        {course.progress}%
                      </Badge>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {course.totalLessons - course.completedLessons} lessons remaining
                      </span>
                      <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50" asChild>
                        <Link href={`/courses/${course.id.toLowerCase()}`}>Continue</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest achievements and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
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

          {/* Achievements */}
          <div className="space-y-4">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Achievements
                </CardTitle>
                <CardDescription>Unlock badges as you learn</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="unlocked" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
                    <TabsTrigger value="locked">Locked</TabsTrigger>
                  </TabsList>
                  <TabsContent value="unlocked" className="space-y-3">
                    <ScrollArea className="h-[400px] pr-4">
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
                                <p className="text-xs text-lime-600 mt-1 font-medium">
                                  {achievement.date}
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
                  </TabsContent>
                  <TabsContent value="locked" className="space-y-3">
                    <ScrollArea className="h-[400px] pr-4">
                      {achievements
                        .filter((a) => !a.unlocked)
                        .map((achievement) => (
                          <div
                            key={achievement.id}
                            className="mb-3 p-3 rounded-lg border border-border/50 bg-muted/20 opacity-60 hover:opacity-80 transition-opacity"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-full bg-muted text-muted-foreground">
                                {achievement.icon}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm text-foreground">
                                  {achievement.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {achievement.description}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  🔒 Keep learning to unlock!
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Daily Goal */}
        <Card className="border-border/50 shadow-sm bg-gradient-to-r from-purple-50/50 via-teal-50/30 to-lime-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Daily Goal
            </CardTitle>
            <CardDescription>Complete {dailyGoalTotal} lessons today to reach your daily goal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{dailyGoalCompleted} of {dailyGoalTotal} lessons completed</span>
                <span className="text-sm text-muted-foreground">{dailyGoalProgress}%</span>
              </div>
              <Progress value={dailyGoalProgress} className="h-3" />
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-muted-foreground">{dailyGoalTotal - dailyGoalCompleted} more lessons to reach your goal!</p>
                <Button className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600" asChild>
                  <Link href="/courses">Start Learning</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
