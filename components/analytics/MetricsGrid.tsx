'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon?: React.ReactNode;
}

interface MetricsGridProps {
  metrics: Metric[];
  className?: string;
}

export function MetricsGrid({ metrics, className }: MetricsGridProps) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {metrics.map((metric, index) => (
        <Card key={index} className="transition-all hover:shadow-lg hover:-translate-y-1 group cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="flex items-center gap-2">
              {metric.icon && (
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  {metric.icon}
                </div>
              )}
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={metric.change > 0 ? "default" : "destructive"}
                className="flex items-center gap-1 px-2 py-1"
              >
                {metric.change > 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(metric.change)}%
              </Badge>
              <p className="text-xs text-muted-foreground">{metric.changeLabel}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}