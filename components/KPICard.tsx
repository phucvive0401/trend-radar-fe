'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, MoreHorizontal, Target, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon?: React.ReactNode;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
  sparklineData?: number[];
  target?: number;
  current?: number;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  className,
  trend,
  sparklineData = [1, 3, 2, 4, 3, 5, 4, 6, 5, 7],
  target,
  current
}: KPICardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isPositive = change > 0;
  const isNeutral = change === 0;
  
  const maxSparkline = Math.max(...sparklineData);
  const minSparkline = Math.min(...sparklineData);
  const sparklineRange = maxSparkline - minSparkline;
  
  return (
    <TooltipProvider>
      <Card className={cn(
        'group relative overflow-hidden hover-lift focus-ring transition-all duration-300',
        'hover:shadow-xl hover:shadow-primary/5 cursor-pointer',
        className
      )} onClick={() => setShowDetails(!showDetails)}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated border */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chart-1/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
            {title}
            {target && (
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Target: {typeof target === 'number' ? target.toLocaleString() : target}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {icon && (
              <div className="text-muted-foreground group-hover:text-primary transition-colors">
                {icon}
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 relative z-10">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                {value}
              </div>
              {target && current && (
                <Tooltip>
                  <TooltipTrigger>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Progress: {Math.round((current / target) * 100)}% of target</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            
            {/* Enhanced sparkline with hover effects */}
            <div className="flex items-end gap-0.5 h-8 opacity-60 group-hover:opacity-100 transition-opacity">
              {sparklineData.map((point, index) => {
                const height = sparklineRange > 0 
                  ? ((point - minSparkline) / sparklineRange) * 100 
                  : 50;
                const isLast = index === sparklineData.length - 1;
                
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <div
                        className={cn(
                          "transition-all duration-300 rounded-sm cursor-pointer",
                          isLast 
                            ? "bg-primary group-hover:bg-primary/80" 
                            : "bg-primary/30 group-hover:bg-primary/60 hover:bg-primary/80"
                        )}
                        style={{
                          height: `${Math.max(height, 10)}%`,
                          width: '4px'
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Value: {point.toLocaleString()}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
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

          {/* Expandable details */}
          {showDetails && (
            <div className="pt-3 border-t space-y-2 animate-slide-in-up">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Current:</span>
                  <span className="font-medium ml-1">{current?.toLocaleString() || value}</span>
                </div>
                {target && (
                  <div>
                    <span className="text-muted-foreground">Target:</span>
                    <span className="font-medium ml-1">{target.toLocaleString()}</span>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">Trend:</span>
                  <span className={cn(
                    "font-medium ml-1",
                    isPositive ? "text-green-600" : !isNeutral ? "text-red-600" : "text-gray-600"
                  )}>
                    {isPositive ? "Increasing" : !isNeutral ? "Decreasing" : "Stable"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Period:</span>
                  <span className="font-medium ml-1">{changeLabel.replace('from ', '')}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}