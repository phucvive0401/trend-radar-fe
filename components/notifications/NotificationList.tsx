'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, DollarSign, Users, Hash, Volume2, VolumeX } from 'lucide-react';
import { NotificationData } from '@/types';

interface NotificationListProps {
  notifications: NotificationData[];
  onMarkAsRead?: (id: number) => void;
}

export function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trend_alert':
        return <TrendingUp className="h-4 w-4" />;
      case 'revenue_alert':
        return <DollarSign className="h-4 w-4" />;
      case 'competitor_alert':
        return <Users className="h-4 w-4" />;
      case 'engagement_alert':
        return <Hash className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card key={notification.id} className={`transition-all hover:shadow-md ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${notification.read ? 'bg-muted' : 'bg-primary/10'}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                      {notification.title}
                    </h4>
                    <Badge variant={getPriorityColor(notification.priority) as any} className="text-xs">
                      {notification.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {notification.channel}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {notification.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onMarkAsRead?.(notification.id)}
                >
                  {notification.read ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}