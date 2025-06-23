'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon?: React.ReactNode;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
  sparklineData?: number[];
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  className,
  trend,
  sparklineData = [1, 3, 2, 4, 3, 5, 4, 6, 5, 7]
}: KPICardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;
  
  return (
    <Card className={cn(
      'group relative overflow-hidden hover-lift focus-ring transition-all duration-300',
      'hover:shadow-xl hover:shadow-primary/5',
      className
    )}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          {icon && (
            <div className="text-muted-foreground group-hover:text-primary transition-colors">
              {icon}
            </div>
          )}
          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {value}
          </div>
          
          {/* Mini sparkline */}
          <div className="flex items-end gap-0.5 h-8 opacity-60 group-hover:opacity-100 transition-opacity">
            {sparklineData.map((point, index) => (
              <div
                key={index}
                className="bg-primary/30 group-hover:bg-primary/60 transition-colors rounded-sm"
                style={{
                  height: `${(point / Math.max(...sparklineData)) * 100}%`,
                  width: '4px'
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge 
            variant={isNeutral ? "secondary" : isPositive ? "default" : "destructive"}
            className={cn(
              "flex items-center gap-1 transition-all duration-300",
              isPositive && "bg-green-100 text-green-800 hover:bg-green-200",
              !isPositive && !isNeutral && "bg-red-100 text-red-800 hover:bg-red-200",
              isNeutral && "bg-gray-100 text-gray-800 hover:bg-gray-200"
            )}
          >
            {!isNeutral && (isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            ))}
            {isNeutral ? '0' : `${isPositive ? '+' : ''}${change}`}%
          </Badge>
          <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            {changeLabel}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}