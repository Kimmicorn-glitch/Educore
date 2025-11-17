"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTheme } from "next-themes"
import { courses } from "@/lib/mock-data"
import type { UserProgress } from "@/lib/types"

const chartConfig = {
  progress: {
    label: "Progress",
  },
}

interface ProgressChartProps {
    userProgress: UserProgress;
}

export default function ProgressChart({ userProgress }: ProgressChartProps) {
    const { resolvedTheme } = useTheme()
    const tickColor = resolvedTheme === 'dark' ? '#888' : '#333';

    const chartData = courses.map(course => {
        const courseLessons = course.lessons.map(l => l.id);
        const completedLessons = userProgress.lessonCompletions.filter(l => l.isCompleted && courseLessons.includes(l.lessonId)).length;
        const progress = course.lessons.length > 0 ? (completedLessons / course.lessons.length) * 100 : 0;
        const fill = progress > 50 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))";
        return { subject: course.id, progress, fill };
    })

  return (
    <div className="w-full aspect-video">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis 
                    dataKey="subject" 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={8} 
                    tick={{ fill: tickColor, fontSize: 12 }}
                />
                <YAxis
                    tickLine={false} 
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: tickColor, fontSize: 12 }}
                    domain={[0, 100]}
                />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="progress" radius={8} />
            </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
  )
}
