"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "An area chart with a legend"

const chartData = [
  { month: "January", completed: 186, failed: 80 },
  { month: "February", completed: 305, failed: 200 },
  { month: "March", completed: 237, failed: 120 },
  { month: "April", completed: 73, failed: 190 },
  { month: "May", completed: 209, failed: 130 },
  { month: "June", completed: 214, failed: 140 },
]

export const chartConfig = {
  completed: { label: "Completed", color: "var(--chart-1)" },
  failed: { label: "Failed", color: "var(--chart-2)" },
} satisfies ChartConfig;


export function ChartAreaLegend() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
          Monthly Job Execution Trend
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[290px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

           {/* Completed */}
            <Area
              dataKey="completed"
              type="natural"
              fill="var(--color-completed)"
              stroke="var(--color-completed)"
              fillOpacity={0.4}
              stackId="a"
            />

            {/* Failed */}
            <Area
              dataKey="failed"
              type="natural"
              fill="var(--color-failed)"
              stroke="var(--color-failed)"
              fillOpacity={0.4}
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}