'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { KPICard } from '@/components/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Eye, 
  Share2, 
  Download,
  RefreshCw,
  Calendar,
  Globe,
  Filter,
  Store,
  Upload,
  Sparkles,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';

// Mock data for demonstration
const mockKPIs = [
  {
    title: 'Total Revenue',
    value: '$124,500',
    change: 12.5,
    changeLabel: 'from last month',
    icon: <DollarSign className="h-4 w-4" />,
    sparklineData: [2, 4, 3, 5, 4, 6, 5, 7, 6, 8]
  },
  {
    title: 'Trend Score',
    value: '8.4/10',
    change: 5.2,
    changeLabel: 'from last week',
    icon: <TrendingUp className="h-4 w-4" />,
    sparklineData: [3, 5, 4, 6, 5, 7, 6, 8, 7, 9]
  },
  {
    title: 'Active Users',
    value: '12,483',
    change: -2.1,
    changeLabel: 'from yesterday',
    icon: <Users className="h-4 w-4" />,
    sparklineData: [8, 7, 6, 7, 6, 5, 6, 5, 4, 5]
  },
  {
    title: 'Page Views',
    value: '84,291',
    change: 18.2,
    changeLabel: 'from last week',
    icon: <Eye className="h-4 w-4" />,
    sparklineData: [1, 3, 2, 4, 3, 5, 4, 6, 5, 7]
  },
];

const hotTrends = [
  { hashtag: '#SustainableFashion', growth: '+245%', posts: '12.4K', source: 'Multi-source', sentiment: 'positive' },
  { hashtag: '#TechGadgets2024', growth: '+189%', posts: '8.7K', source: 'TikTok', sentiment: 'positive' },
  { hashtag: '#HomeDecor', growth: '+156%', posts: '15.2K', source: 'Instagram', sentiment: 'neutral' },
  { hashtag: '#FitnessMotivation', growth: '+134%', posts: '9.8K', source: 'Imported', sentiment: 'positive' },
  { hashtag: '#FoodieLife', growth: '+112%', posts: '18.6K', source: 'Multi-source', sentiment: 'positive' },
];

const domains = [
  { id: 'all', name: 'All Domains', stores: 15 },
  { id: 'fashion', name: 'Fashion & Apparel', stores: 5 },
  { id: 'tech', name: 'Technology', stores: 3 },
  { id: 'home', name: 'Home & Garden', stores: 4 },
  { id: 'food', name: 'Food & Beverage', stores: 3 },
];

const quickActions = [
  { icon: Share2, label: 'Share Dashboard', variant: 'outline' as const },
  { icon: Download, label: 'Export Report', variant: 'outline' as const },
  { icon: Calendar, label: 'Schedule Report', variant: 'outline' as const },
  { icon: Sparkles, label: 'AI Insights', variant: 'default' as const },
];

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [timeFilter, setTimeFilter] = useState('7d');
  const [regionFilter, setRegionFilter] = useState('global');
  const [domainFilter, setDomainFilter] = useState('all');
  const [showImportModal, setShowImportModal] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const selectedDomain = domains.find(d => d.id === domainFilter);

  const headerActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="hover-lift">
        <Activity className="h-4 w-4 mr-2" />
        Live View
      </Button>
      <Button size="sm" className="hover-lift gradient-bg">
        <Zap className="h-4 w-4 mr-2" />
        AI Insights
      </Button>
    </div>
  );

  return (
    <div className="space-y-8 animate-slide-in-up">
      <Header 
        title="Overview Dashboard" 
        subtitle="Real-time analytics and performance insights"
        actions={headerActions}
      />
      
      {/* Enhanced Filters */}
      <Card className="glass border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Store className="h-4 w-4 text-muted-foreground" />
                <Select value={domainFilter} onValueChange={setDomainFilter}>
                  <SelectTrigger className="w-48 focus-ring">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain.id} value={domain.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{domain.name}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {domain.stores}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-32 focus-ring">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-32 focus-ring">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="eu">Europe</SelectItem>
                    <SelectItem value="asia">Asia Pacific</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="status-dot status-online"></div>
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hover-lift focus-ring"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domain Summary */}
      {selectedDomain && selectedDomain.id !== 'all' && (
        <Card className="border-l-4 border-l-primary animate-slide-in-right">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold gradient-text">{selectedDomain.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedDomain.stores} stores • Filtered view active
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setDomainFilter('all')} className="hover-lift">
                Clear Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 stagger-children">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 hover-lift group">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue & Search Volume Trends
              </span>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-primary/5 to-chart-1/5 rounded-lg border border-primary/10">
              <div className="text-center space-y-3">
                <div className="relative">
                  <BarChart3 className="h-16 w-16 text-primary mx-auto animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-1/20 rounded-full blur-xl"></div>
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Interactive Chart Visualization</p>
                  <p className="text-sm text-muted-foreground">Revenue and search volume correlation analysis</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Hot Trends Widget */}
        <Card className="hover-lift group">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Hot Trends Now
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="animate-pulse bg-green-100 text-green-800">
                <div className="status-dot status-online mr-1"></div>
                Live
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setShowImportModal(true)} className="hover-lift">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hotTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-all duration-200 hover-lift group/item">
                  <div className="flex-1">
                    <p className="font-medium text-sm group-hover/item:text-primary transition-colors">{trend.hashtag}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {trend.posts} posts
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {trend.source}
                      </Badge>
                      <div className={`status-dot ${
                        trend.sentiment === 'positive' ? 'status-online' : 
                        trend.sentiment === 'neutral' ? 'status-offline' : 'status-busy'
                      }`}></div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 font-medium">
                    {trend.growth}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Auto-refreshes every 5 minutes • Multi-source data
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Performance Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-chart-2/10 to-chart-3/10 rounded-lg border border-chart-2/20">
              <div className="text-center space-y-3">
                <Globe className="h-12 w-12 text-chart-2 mx-auto animate-pulse" />
                <div>
                  <p className="text-lg font-medium">Geographic Performance</p>
                  <p className="text-sm text-muted-foreground">Interactive heatmap visualization</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Positive', value: 75, color: 'bg-green-500' },
                { label: 'Neutral', value: 20, color: 'bg-yellow-500' },
                { label: 'Negative', value: 5, color: 'bg-red-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium w-8">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <Button 
                key={index}
                variant={action.variant} 
                size="sm" 
                className="hover-lift focus-ring"
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}