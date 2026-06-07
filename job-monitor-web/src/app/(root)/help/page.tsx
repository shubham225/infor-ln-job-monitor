"use client"

import { Server, Activity, AlertTriangle, Monitor, Zap, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutJobMonitor() {
  const features = [
    {
      icon: Server,
      color: "text-blue-600",
      bgColor: "bg-blue-100/50",
      title: "Real-Time Monitoring",
      description: "Visualize performance metrics and application health instantly. Track CPU, memory, and other critical stats in real-time dashboards.",
    },
    {
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-100/50",
      title: "Detailed Logs & Insights",
      description: "Explore logs with advanced filters and timestamps. Quickly identify issues and understand system behavior to debug efficiently.",
    },
    {
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100/50",
      title: "Custom Alerts",
      description: "Configure notifications for critical events or performance thresholds. Stay informed and take action before problems escalate.",
    },
    {
      icon: Monitor,
      color: "text-green-600",
      bgColor: "bg-green-100/50",
      title: "Multi-Environment Support",
      description: "Monitor multiple jobs, environments, and servers from a single dashboard. Switch contexts easily and manage all systems efficiently.",
    },
    {
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100/50",
      title: "Fast Performance",
      description: "Lightning-fast job execution monitoring with minimal latency. Real-time updates ensure you never miss critical events.",
    },
    {
      icon: Shield,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100/50",
      title: "Secure & Reliable",
      description: "Enterprise-grade security with encryption and role-based access control. Reliable monitoring with 99.8% uptime guarantee.",
    },
  ]

  return (
    <div className="p-4 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon
            return (
              <Card key={idx} className="hover:shadow-md transition-shadow border">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5.8K+</div>
            <p className="text-muted-foreground">Jobs Monitored</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">99.8%</div>
            <p className="text-muted-foreground">System Uptime</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
            <p className="text-muted-foreground">Real-Time Monitoring</p>
          </div>
        </section>
      </div>
    </div>
  )
}
