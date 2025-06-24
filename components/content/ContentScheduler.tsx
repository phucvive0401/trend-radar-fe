'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, TrendingUp, Settings, Copy } from 'lucide-react';

interface ScheduledPost {
  id: number;
  content: string;
  platform: string;
  scheduledTime: Date;
  status: string;
  engagement: string;
  hashtags: string[];
}

interface ContentSchedulerProps {
  scheduledPosts: ScheduledPost[];
}

export function ContentScheduler({ scheduledPosts }: ContentSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'TikTok': return '🎵';
      case 'Instagram': return '📷';
      case 'Facebook': return '📘';
      default: return '🌐';
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Scheduled Posts
            </span>
            <Badge variant="outline">
              {scheduledPosts.filter(p => p.status === 'scheduled').length} scheduled
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledPosts.map((post) => (
              <Card key={post.id} className="hover:bg-accent/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{post.platform}</h4>
                        <Badge 
                          variant={post.status === 'scheduled' ? 'default' : 'secondary'}
                          className="capitalize text-xs"
                        >
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.scheduledTime.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {post.engagement} expected
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.hashtags.map((hashtag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {hashtag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Calendar Widget */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Content Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            
            <div className="mt-4 space-y-2">
              <Label className="text-sm font-medium">Quick Schedule</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Clock className="h-3 w-3 mr-1" />
                  Peak Hours
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Optimal Time
                </Button>
              </div>
              <Input type="time" className="w-full" />
              <Button className="w-full" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule for {selectedDate?.toLocaleDateString()}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Preview */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Expected Reach</span>
                <span className="font-medium">12.5K - 18.2K</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Engagement Rate</span>
                <span className="font-medium text-green-600">7.8% - 9.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Best Time Score</span>
                <span className="font-medium">94/100</span>
              </div>
            </div>
            
            <div className="pt-3 border-t">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Optimization Tips</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Add 2-3 trending hashtags</li>
                <li>• Include a clear call-to-action</li>
                <li>• Post during peak hours (2-4 PM)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}