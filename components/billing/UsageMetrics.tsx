'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Zap, Users, Shield } from 'lucide-react';

interface UsageData {
  integrations: { used: number; limit: number };
  apiCalls: { used: number; limit: number };
  users: { used: number; limit: number };
  storage: { used: number; limit: number };
}

interface UsageMetricsProps {
  usage: UsageData;
}

export function UsageMetrics({ usage }: UsageMetricsProps) {
  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const metrics = [
    {
      title: 'API Calls',
      icon: BarChart3,
      used: usage.apiCalls.used,
      limit: usage.apiCalls.limit,
      unit: 'calls',
    },
    {
      title: 'Integrations',
      icon: Zap,
      used: usage.integrations.used,
      limit: usage.integrations.limit,
      unit: 'integrations',
    },
    {
      title: 'Team Members',
      icon: Users,
      used: usage.users.used,
      limit: usage.users.limit,
      unit: 'users',
    },
    {
      title: 'Data Storage',
      icon: Shield,
      used: usage.storage.used,
      limit: usage.storage.limit,
      unit: 'GB',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {metrics.map((metric) => {
        const percentage = getUsagePercentage(metric.used, metric.limit);
        return (
          <Card key={metric.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <metric.icon className="h-5 w-5" />
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Used this month</span>
                  <span className="font-medium">
                    {metric.used.toLocaleString()} / {metric.limit.toLocaleString()} {metric.unit}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  {Math.round(percentage)}% used
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}