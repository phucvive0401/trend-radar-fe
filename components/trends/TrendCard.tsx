'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Eye, Target } from 'lucide-react';

interface TrendCardProps {
  hashtag: string;
  growth: string;
  posts: string;
  source: string;
  engagement: string;
  velocity: string;
  category: string;
  className?: string;
}

export function TrendCard({ 
  hashtag, 
  growth, 
  posts, 
  source, 
  engagement, 
  velocity, 
  category,
  className 
}: TrendCardProps) {
  const getVelocityColor = (velocity: string) => {
    switch (velocity) {
      case 'Accelerating': return 'text-green-600 bg-green-50';
      case 'Rising': return 'text-blue-600 bg-blue-50';
      case 'Steady': return 'text-yellow-600 bg-yellow-50';
      case 'Stable': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className={`group p-4 rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer ${className}`}>
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">{hashtag}</span>
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {posts} posts
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {engagement} engagement
              </span>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-green-600 mb-1">
              {growth}
            </Badge>
            <div className={`text-xs px-2 py-1 rounded-full ${getVelocityColor(velocity)}`}>
              {velocity}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {source}
          </Badge>
          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity h-6 text-xs">
            <Target className="h-3 w-3 mr-1" />
            Analyze
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}