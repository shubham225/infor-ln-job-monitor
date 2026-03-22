"use client"

import { Server, Activity, AlertTriangle, Monitor } from "lucide-react"

export default function AboutJobMonitor() {
  return (
    <div className="max-w-5xl mx-auto p-2">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About JobMonitor</h1>
        <p className="text-lg text-muted-foreground">
          Monitor Infor LN Jobs in real-time, get actionable insights, and stay ahead of issues with JobMonitor.
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 rounded-lg shadow-md border">
          <Server className="text-blue-600 w-8 h-8 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Real-Time Monitoring</h2>
          <p className="text-muted-foreground">
            Visualize performance metrics and application health instantly. Track CPU, memory, and other critical stats in real-time dashboards.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-md border">
          <Activity className="text-purple-600 w-8 h-8 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Detailed Logs & Insights</h2>
          <p className="text-muted-foreground">
            Explore logs with advanced filters and timestamps. Quickly identify issues and understand system behavior to debug efficiently.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-md border">
          <AlertTriangle className="text-red-600 w-8 h-8 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Custom Alerts</h2>
          <p className="text-muted-foreground">
            Configure notifications for critical events or performance thresholds. Stay informed and take action before problems escalate.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-md border">
          <Monitor className="text-green-600 w-8 h-8 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Multi-Environment Support</h2>
          <p className="text-muted-foreground">
            Monitor multiple jobs, environments, and servers from a single dashboard. Switch contexts easily and manage all systems efficiently.
          </p>
        </div>
      </section>
    </div>
  )
}
