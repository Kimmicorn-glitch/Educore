"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTheme } from "next-themes"

const chartData = [
  { subject: "Python", progress: 65, fill: "hsl(var(--chart-1))" },
  { subject: "English", progress: 80, fill: "hsl(var(--chart-1))" },
  { subject: "Maths", progress: 45, fill: "hsl(var(--chart-1))" },
  { subject: "Physics", progress: 30, fill: "hsl(var(--chart-2))" },
]

const chartConfig = {
  progress: {
    label: "Progress",
  },
}

export default function ProgressChart() {
    const { resolvedTheme } = useTheme()
    const tickColor = resolvedTheme === 'dark' ? '#888' : '#333';

  return (
    <div className="h-80 w-full">
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
