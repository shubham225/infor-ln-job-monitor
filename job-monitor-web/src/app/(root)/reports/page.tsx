"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { IconReload, IconArrowsDiagonal } from '@tabler/icons-react';


export default function Reports() {
  const [dateRange, setDateRange] = useState('7d');

  const reports = [
    {
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100/50",
      title: "Job Performance Report",
      description: "Analyze job execution performance, success rates, and execution times over selected period.",
      records: "2,340 jobs",
    },
    {
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100/50",
      title: "Failure Analysis Report",
      description: "Detailed breakdown of job failures by type, status, and root cause analysis.",
      records: "156 failures",
    },
    {
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100/50",
      title: "Execution Time Report",
      description: "Track average execution times, bottlenecks, and performance trends.",
      records: "Avg: 2m 34s",
    },
    {
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-100/50",
      title: "System Health Report",
      description: "Monitor system resource usage, uptime, and health metrics.",
      records: "99.8% uptime",
    },
  ];

  return (
    <div className="p-4 space-y-4 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate and download comprehensive reports for job monitoring and analysis.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="hidden sm:flex items-center gap-1 rounded-lg bg-muted p-1">
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => setDateRange('1d')}>1D</Button>
            <Button variant={dateRange === '7d' ? 'default' : 'ghost'} size="sm" className="text-xs" onClick={() => setDateRange('7d')}>7D</Button>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => setDateRange('30d')}>30D</Button>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => setDateRange('custom')}>Custom</Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon" aria-label="Refresh">
              <IconReload size={18} />
            </Button>
            <Button variant="outline" size="icon" aria-label="Export">
              <IconArrowsDiagonal size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report, idx) => {
          const IconComponent = report.icon;
          return (
            <Card key={idx} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${report.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${report.color}`} />
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download size={14} />
                    Export
                  </Button>
                </div>
                <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xs text-muted-foreground">Total Records</span>
                  <span className="text-sm font-semibold">{report.records}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Report Exports</h3>
          <div className="space-y-3">
            {[
              { name: "Job Performance Report", date: "2 hours ago", type: "PDF" },
              { name: "Failure Analysis Report", date: "1 day ago", type: "Excel" },
              { name: "System Health Report", date: "3 days ago", type: "PDF" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-muted text-muted-foreground">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}