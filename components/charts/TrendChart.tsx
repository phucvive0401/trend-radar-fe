'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart3, ArrowUpRight, Zap } from 'lucide-react';

interface TrendChartProps {
  title: string;
  data?: any[];
  className?: string;
}

export function TrendChart({ title, data, className }: TrendChartProps) {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
            <Button variant="outline" size="sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              Analyze
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center bg-gradient-to-br from-primary/5 to-blue-50 rounded-lg border-2 border-dashed border-primary/20">
          <div className="text-center">
            <div className="p-4 bg-white rounded-full shadow-sm mb-4 mx-auto w-fit">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Interactive Chart</h3>
            <p className="text-muted-foreground mb-4">Real-time data visualization with predictive insights</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Primary Metric</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Secondary Metric</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}