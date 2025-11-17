
"use client"

import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  Trophy, 
  Star, 
  TrendingUp, 
  Award, 
  Target,
  Sparkles,
  Zap,
  Heart,
  Flame,
  Crown,
  ChevronRight
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProgress as UserProgressType } from '@/lib/types';
import { courses as allCourses, badges as allBadges } from '@/lib/mock-data';

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { AnimatedNumber } from "@/components/dashboard/animated/animated-number"
import { AnimatedCircularProgress } from "@/components/dashboard/animated/animated-circular-progress"
import PerformanceAnalysis from "@/components/dashboard/performance-analysis"

const defaultProgress: UserProgressType = {
    lessonCompletions: [],
    exerciseAttempts: [],
    badges: [],
    challengeProgress: [],
}

const iconMap: { [key: string]: React.ElementType } = {
  Award,
  Code: Sparkles,
  GraduationCap: BookOpen,
  HardHat: Trophy,
  Star,
  Flame,
  Crown,
};


export default function DashboardPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const progressDocRef = useMemoFirebase(() => user ? doc(firestore, "users", user.uid, "progress", "main") : null, [user, firestore]);
    const { data: userProgress, isLoading: isProgressLoading } = useDoc<UserProgressType>(progressDocRef);

    const progress = userProgress || defaultProgress;
    
    const { totalPoints } = useMemo(() => {
        const totalPoints = (progress.lessonCompletions.length * 10) + (progress.challengeProgress.filter(c => c.completed).length * 50);
        return { totalPoints };
    }, [progress]);

    const weeklyActivity = useMemo(() => {
        // Mock data for weekly activity
        return [45, 60, 55, 70, 65, 80, 75];
    }, []);

    const coursesData = useMemo(() => allCourses.map(course => {
        const completedLessons = progress.lessonCompletions.filter(lc => course.lessons.some(l => l.id === lc.lessonId && lc.isCompleted)).length;
        const courseProgress = course.lessons.length > 0 ? Math.round((completedLessons / course.lessons.length) * 100) : 0;
        return {
          id: course.id,
          title: course.title,
          progress: courseProgress,
          totalLessons: course.lessons.length,
          completedLessons: completedLessons,
        };
    }), [progress.lessonCompletions]);

    const currentCourse = coursesData.find(c => c.progress < 100) || coursesData[0] || {
        title: "No courses started",
        progress: 0,
        totalLessons: 0,
        completedLessons: 0
    };

    const achievementsData = useMemo(() => allBadges.map(badge => ({
        id: badge.id,
        title: badge.title,
        icon: React.createElement(iconMap[badge.icon] || Star, { className: 'w-4 h-4' }),
        unlocked: progress.badges.includes(badge.id),
      })), [progress.badges]);

    const recentActivity = useMemo(() => {
        const activities = [
            ...progress.lessonCompletions.slice(-3).map(lc => {
                const lesson = allCourses.flatMap(c => c.lessons).find(l => l.id === lc.lessonId);
                return {
                  id: `l-${lc.lessonId}`,
                  title: `Completed: ${lesson?.title || 'a lesson'}`,
                  time: 'Recently',
                  points: 10
                }
            }),
            ...progress.challengeProgress.filter(c => c.completed).slice(-2).map(cc => ({
                id: `c-${cc.level}`,
                title: `Conquered Challenge Level ${cc.level}`,
                time: 'Recently',
                points: 50
            }))
        ];
        return activities.sort(() => -1); // Simple reverse sort for demo
    }, [progress.lessonCompletions, progress.challengeProgress]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const maxActivity = Math.max(...weeklyActivity);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    if (isUserLoading || isProgressLoading) {
      return <div>Loading dashboard...</div>
    }

    return (
        <motion.div
        className="w-full space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800">
                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'user'} />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-teal-400 text-white">
                {user?.displayName?.charAt(0) || 'U'}
                </AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Welcome back, {user?.displayName?.split(' ')[0] || 'Learner'}!
                </h1>
                <p className="text-sm text-muted-foreground">Keep up the amazing progress! 🎉</p>
            </div>
            </div>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white">
                <Link href="/courses">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Explore Courses
                </Link>
            </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <Flame className="w-8 h-8 text-orange-500" />
                    <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    Active
                    </Badge>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-3xl font-bold">
                    <AnimatedNumber value={7} /> days
                    </p>
                </div>
                </CardContent>
            </Card>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/30 border-teal-200 dark:border-teal-800">
                <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <Star className="w-8 h-8 text-yellow-500" />
                    <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Points
                    </Badge>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Points</p>
                    <p className="text-3xl font-bold">
                    <AnimatedNumber value={totalPoints} />
                    </p>
                </div>
                </CardContent>
            </Card>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-950/30 dark:to-lime-900/30 border-lime-200 dark:border-lime-800">
                <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <Trophy className="w-8 h-8 text-lime-600" />
                    <Badge className="bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400">
                    Completed
                    </Badge>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Lessons Done</p>
                    <p className="text-3xl font-bold">
                    <AnimatedNumber value={progress.lessonCompletions.length} />
                    </p>
                </div>
                </CardContent>
            </Card>
            </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Course Progress */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full">
                <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold">Current Course</h3>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/courses">
                            View All <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </Button>
                </div>

                <div className="space-y-6">
                    <div>
                    <h4 className="text-xl font-bold mb-2">{currentCourse.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                        {currentCourse.completedLessons} of {currentCourse.totalLessons} lessons completed
                    </p>
                    <Progress value={currentCourse.progress} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-2">{currentCourse.progress}% Complete</p>
                    </div>

                    {/* Weekly Activity Chart */}
                    <div>
                    <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-teal-600" />
                        Weekly Activity
                    </h4>
                    <div className="flex items-end justify-between gap-2 h-32">
                        {weeklyActivity.map((value, index) => (
                        <motion.div
                            key={index}
                            className="flex-1 flex flex-col items-center gap-2"
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            <motion.div
                            className="w-full bg-gradient-to-t from-purple-500 to-teal-500 rounded-t-lg"
                            style={{ height: `${(value / maxActivity) * 100}%` }}
                            whileHover={{ scale: 1.1 }}
                            />
                            <span className="text-xs text-muted-foreground">{days[index]}</span>
                        </motion.div>
                        ))}
                    </div>
                    </div>
                </div>
                </CardContent>
            </Card>
            </motion.div>

            {/* Right Column: Circular Progress, Achievements, and AI Analysis */}
            <motion.div variants={itemVariants} className="space-y-6">
                <Card>
                    <CardContent className="p-6 flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        Overall Progress
                    </h3>
                    <AnimatedCircularProgress
                        max={100}
                        min={0}
                        value={currentCourse.progress}
                        gaugePrimaryColor="rgb(168 85 247)"
                        gaugeSecondaryColor="rgba(168, 85, 247, 0.1)"
                    />
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                        You're doing great! Keep learning!
                    </p>
                    </CardContent>
                </Card>

                <PerformanceAnalysis userProgress={progress} />

                <Card>
                    <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-600" />
                        Achievements
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {achievementsData.map((achievement) => (
                        <motion.div
                            key={achievement.id}
                            className={cn(
                            "p-3 rounded-lg border-2 flex flex-col items-center gap-2 text-center",
                            achievement.unlocked
                                ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-yellow-300 dark:border-yellow-800"
                                : "bg-muted/50 border-muted opacity-50"
                            )}
                            whileHover={achievement.unlocked ? { scale: 1.05 } : {}}
                        >
                            <div
                            className={cn(
                                "p-2 rounded-full",
                                achievement.unlocked
                                ? "bg-yellow-200 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400"
                                : "bg-muted text-muted-foreground"
                            )}
                            >
                            {achievement.icon}
                            </div>
                            <span className="text-xs font-medium">{achievement.title}</span>
                        </motion.div>
                        ))}
                    </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
            <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-teal-600" />
                    Recent Activity
                </h3>
                <Button variant="ghost" size="sm">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                </div>
                <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                    <motion.div
                    key={activity.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-teal-500">
                        <Heart className="w-4 h-4 text-white" />
                        </div>
                        <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-teal-500 text-white">
                        +{activity.points} pts
                    </Badge>
                    </motion.div>
                ))}
                </div>
            </CardContent>
            </Card>
        </motion.div>
        </motion.div>
    )
}
