'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Volume2, 
  VolumeX,
  Settings,
  Filter,
  Clock,
  DollarSign,
  Users,
  Hash
} from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'trend_alert',
    title: '#SustainableFashion trending up 245%',
    message: 'This hashtag has shown significant growth in the last 24 hours. Consider creating content around this trend.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    priority: 'high',
    read: false,
    channel: 'TikTok',
  },
  {
    id: 2,
    type: 'revenue_alert',
    title: 'Revenue threshold exceeded',
    message: 'Daily revenue has exceeded $5,000 target by 20%. Great performance!',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    priority: 'medium',
    read: false,
    channel: 'Shopee',
  },
  {
    id: 3,
    type: 'competitor_alert',
    title: 'Competitor price change detected',
    message: 'BrandA has reduced prices by 15% on similar products. Review pricing strategy.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    priority: 'medium',
    read: true,
    channel: 'Market',
  },
  {
    id: 4,
    type: 'engagement_alert',
    title: 'Low engagement detected',
    message: 'Recent posts showing 40% lower engagement than average. Consider content optimization.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    priority: 'low',
    read: true,
    channel: 'Instagram',
  },
];

const alertSettings = [
  {
    id: 'trend_alerts',
    name: 'Trend Alerts',
    description: 'Get notified when hashtags or products start trending',
    enabled: true,
    threshold: '100',
    channels: ['TikTok', 'Instagram', 'Facebook'],
  },
  {
    id: 'revenue_alerts',
    name: 'Revenue Alerts',
    description: 'Notifications for revenue milestones and targets',
    enabled: true,
    threshold: '5000',
    channels: ['Shopee', 'Lazada'],
  },
  {
    id: 'competitor_alerts',
    name: 'Competitor Alerts',
    description: 'Monitor competitor activities and price changes',
    enabled: false,
    threshold: '10',
    channels: ['Market'],
  },
  {
    id: 'engagement_alerts',
    name: 'Engagement Alerts',
    description: 'Track post performance and engagement rates',
    enabled: true,
    threshold: '50',
    channels: ['All Platforms'],
  },
];

export default function NotificationHub() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [settings, setSettings] = useState(alertSettings);
  const [unreadCount, setUnreadCount] = useState(2);

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
        return <Bell className="h-4 w-4" />;
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

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notification.read;
    return notification.type === selectedFilter;
  });

  const toggleSetting = (settingId: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === settingId 
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  const updateThreshold = (settingId: string, threshold: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === settingId 
        ? { ...setting, threshold }
        : setting
    ));
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Notification Hub" 
        subtitle="Real-time alerts and system notifications"
      />
      
      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">
            Notifications {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings">Alert Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="unread">Unread Only</SelectItem>
                  <SelectItem value="trend_alert">Trend Alerts</SelectItem>
                  <SelectItem value="revenue_alert">Revenue Alerts</SelectItem>
                  <SelectItem value="competitor_alert">Competitor Alerts</SelectItem>
                  <SelectItem value="engagement_alert">Engagement Alerts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
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
                      <Button variant="ghost" size="sm">
                        {notification.read ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4">
            {settings.map((setting) => (
              <Card key={setting.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{setting.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={() => toggleSetting(setting.id)}
                    />
                  </div>
                </CardHeader>
                {setting.enabled && (
                  <CardContent className="pt-0">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor={`threshold-${setting.id}`}>Alert Threshold</Label>
                        <Input
                          id={`threshold-${setting.id}`}
                          value={setting.threshold}
                          onChange={(e) => updateThreshold(setting.id, e.target.value)}
                          placeholder="Enter threshold value"
                        />
                      </div>
                      <div>
                        <Label>Channels</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {setting.channels.map((channel) => (
                            <Badge key={channel} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}