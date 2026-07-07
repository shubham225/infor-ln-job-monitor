"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "An area chart with a legend"

export const chartConfig = {
  successfulExecutions: { label: "Successful", color: "var(--chart-2)" },
  failedExecutions: { label: "Failed", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ChartAreaLegend({
  data,
}: {
  data: { month: string; successfulExecutions: number; failedExecutions: number }[];
}) {
  return (
    <div className="w-full h-full flex flex-col">
      <ChartContainer config={chartConfig} className="flex-1 w-full min-h-0">
        <AreaChart
          data={data}
          margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
        >
          <CartesianGrid vertical={false} stroke="var(--border)" />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => String(value).slice(0, 3)}
            style={{ fontSize: "0.75rem" }}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />

          {/* Successful */}
          <Area
            dataKey="successfulExecutions"
            type="monotone"
            fill="var(--color-successfulExecutions)"
            stroke="var(--color-successfulExecutions)"
            fillOpacity={0.5}
            stackId="a"
          />

          {/* Failed */}
          <Area
            dataKey="failedExecutions"
            type="monotone"
            fill="var(--color-failedExecutions)"
            stroke="var(--color-failedExecutions)"
            fillOpacity={0.5}
            stackId="a"
          />

          <ChartLegend content={<ChartLegendContent />} wrapperStyle={{ paddingTop: "12px" }} />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}