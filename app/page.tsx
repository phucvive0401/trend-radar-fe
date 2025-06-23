'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { KPICard } from '@/components/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Progress } from '@/components/ui/progress';
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
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

// Enhanced mock data with more realistic values
const mockKPIs = [
  {
    title: 'Total Revenue',
    value: '$124,500',
    change: 12.5,
    changeLabel: 'from last month',
    icon: <DollarSign className="h-4 w-4" />,
    sparklineData: [2400, 2800, 2600, 3200, 2900, 3600, 3200, 4100, 3800, 4500],
    target: 150000,
    current: 124500
  },
  {
    title: 'Trend Score',
    value: '8.4/10',
    change: 5.2,
    changeLabel: 'from last week',
    icon: <TrendingUp className="h-4 w-4" />,
    sparklineData: [6.2, 6.8, 6.5, 7.2, 7.0, 7.8, 7.5, 8.2, 8.0, 8.4],
    target: 9.0,
    current: 8.4
  },
  {
    title: 'Active Users',
    value: '12,483',
    change: -2.1,
    changeLabel: 'from yesterday',
    icon: <Users className="h-4 w-4" />,
    sparklineData: [14200, 13800, 13500, 13200, 12900, 12600, 12800, 12500, 12300, 12483],
    target: 15000,
    current: 12483
  },
  {
    title: 'Page Views',
    value: '84,291',
    change: 18.2,
    changeLabel: 'from last week',
    icon: <Eye className="h-4 w-4" />,
    sparklineData: [68000, 72000, 69000, 75000, 73000, 78000, 76000, 82000, 80000, 84291],
    target: 100000,
    current: 84291
  },
];

const hotTrends = [
  { 
    hashtag: '#SustainableFashion', 
    growth: '+245%', 
    posts: '12.4K', 
    source: 'Multi-source', 
    sentiment: 'positive',
    velocity: 'accelerating',
    peakTime: '2-4 PM',
    avgEngagement: '8.4%',
    estimatedReach: '2.4M'
  },
  { 
    hashtag: '#TechGadgets2024', 
    growth: '+189%', 
    posts: '8.7K', 
    source: 'TikTok', 
    sentiment: 'positive',
    velocity: 'steady',
    peakTime: '7-9 PM',
    avgEngagement: '6.2%',
    estimatedReach: '1.8M'
  },
  { 
    hashtag: '#HomeDecor', 
    growth: '+156%', 
    posts: '15.2K', 
    source: 'Instagram', 
    sentiment: 'neutral',
    velocity: 'steady',
    peakTime: '10-12 AM',
    avgEngagement: '5.8%',
    estimatedReach: '1.5M'
  },
  { 
    hashtag: '#FitnessMotivation', 
    growth: '+134%', 
    posts: '9.8K', 
    source: 'Multi-source', 
    sentiment: 'positive',
    velocity: 'accelerating',
    peakTime: '6-8 AM',
    avgEngagement: '7.1%',
    estimatedReach: '1.2M'
  },
  { 
    hashtag: '#FoodieLife', 
    growth: '+112%', 
    posts: '18.6K', 
    source: 'Instagram', 
    sentiment: 'positive',
    velocity: 'decelerating',
    peakTime: '12-2 PM',
    avgEngagement: '9.2%',
    estimatedReach: '980K'
  },
];

const domains = [
  { id: 'all', name: 'All Domains', stores: 15, revenue: '$124.5K', growth: '+12.5%' },
  { id: 'fashion', name: 'Fashion & Apparel', stores: 5, revenue: '$45.2K', growth: '+18.3%' },
  { id: 'tech', name: 'Technology', stores: 3, revenue: '$38.7K', growth: '+8.9%' },
  { id: 'home', name: 'Home & Garden', stores: 4, revenue: '$25.1K', growth: '+15.2%' },
  { id: 'food', name: 'Food & Beverage', stores: 3, revenue: '$15.5K', growth: '+22.1%' },
];

const quickActions = [
  { icon: Share2, label: 'Share Dashboard', variant: 'outline' as const, action: 'share' },
  { icon: Download, label: 'Export Report', variant: 'outline' as const, action: 'export' },
  { icon: Calendar, label: 'Schedule Report', variant: 'outline' as const, action: 'schedule' },
  { icon: Sparkles, label: 'AI Insights', variant: 'default' as const, action: 'ai-insights' },
];

const alerts = [
  {
    id: 1,
    type: 'success',
    title: 'Revenue Target Achieved',
    message: 'Monthly revenue target exceeded by 8.3%',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    priority: 'medium'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Engagement Drop Detected',
    message: '#TechGadgets showing 15% engagement decrease',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    priority: 'high'
  },
  {
    id: 3,
    type: 'info',
    title: 'New Trend Emerging',
    message: '#SustainableBeauty gaining momentum (+89%)',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    priority: 'low'
  }
];

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [timeFilter, setTimeFilter] = useState('7d');
  const [regionFilter, setRegionFilter] = useState('global');
  const [domainFilter, setDomainFilter] = useState('all');
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
  const [kpiData, setKpiData] = useState(mockKPIs);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update KPI data with slight variations
      setKpiData(prev => prev.map(kpi => ({
        ...kpi,
        sparklineData: kpi.sparklineData.map(val => 
          val + (Math.random() - 0.5) * val * 0.1
        )
      })));
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'share':
        navigator.share?.({
          title: 'TrendRadar Dashboard',
          text: 'Check out my analytics dashboard',
          url: window.location.href
        });
        break;
      case 'export':
        // Simulate export
        const data = JSON.stringify({ kpis: kpiData, trends: hotTrends }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        break;
      case 'schedule':
        // Navigate to reports page
        window.location.href = '/reports';
        break;
      case 'ai-insights':
        // Navigate to chatbot
        window.location.href = '/chatbot';
        break;
    }
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const selectedDomain = domains.find(d => d.id === domainFilter);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Activity className="h-4 w-4 text-blue-600" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getVelocityIcon = (velocity: string) => {
    switch (velocity) {
      case 'accelerating': return <ArrowUpRight className="h-3 w-3 text-green-600" />;
      case 'decelerating': return <ArrowDownRight className="h-3 w-3 text-red-600" />;
      case 'steady': return <Minus className="h-3 w-3 text-blue-600" />;
      default: return <Minus className="h-3 w-3" />;
    }
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="hover-lift">
        <Activity className="h-4 w-4 mr-2" />
        Live View
      </Button>
      <Button size="sm" className="hover-lift gradient-bg" onClick={() => handleQuickAction('ai-insights')}>
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
      
      {/* Enhanced Filters with Domain Stats */}
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
                          <div className="flex items-center gap-2 ml-3">
                            <Badge variant="secondary" className="text-xs">
                              {domain.stores} stores
                            </Badge>
                            <Badge variant="outline" className="text-xs text-green-600">
                              {domain.growth}
                            </Badge>
                          </div>
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
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domain Summary with Enhanced Stats */}
      {selectedDomain && selectedDomain.id !== 'all' && (
        <Card className="border-l-4 border-l-primary animate-slide-in-right">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-semibold gradient-text text-lg">{selectedDomain.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground">
                      {selectedDomain.stores} stores
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {selectedDomain.revenue} revenue
                    </span>
                    <Badge variant="outline" className="text-green-600">
                      {selectedDomain.growth}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setDomainFilter('all')} className="hover-lift">
                Clear Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Real-time Alerts */}
      {alerts.length > 0 && (
        <Card className="border-l-4 border-l-yellow-500 bg-yellow-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Real-time Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.slice(0, 3).map((alert) => (
                <div 
                  key={alert.id} 
                  className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => setSelectedAlert(alert.id)}
                >
                  <div className="flex items-center gap-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'default' : 'secondary'} className="text-xs">
                      {alert.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced KPI Cards with Progress Indicators */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 stagger-children">
        {kpiData.map((kpi, index) => (
          <div key={index} className="space-y-2">
            <KPICard {...kpi} />
            {kpi.target && (
              <div className="px-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress to target</span>
                  <span>{Math.round((kpi.current / kpi.target) * 100)}%</span>
                </div>
                <Progress value={(kpi.current / kpi.target) * 100} className="h-1" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Enhanced Revenue Chart */}
        <Card className="lg:col-span-2 hover-lift group">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue & Search Volume Trends
              </span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="animate-pulse bg-green-100 text-green-800">
                  <div className="status-dot status-online mr-1"></div>
                  Live
                </Badge>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-primary/5 to-chart-1/5 rounded-lg border border-primary/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <div className="text-center space-y-3 relative z-10">
                <div className="relative">
                  <BarChart3 className="h-16 w-16 text-primary mx-auto animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-1/20 rounded-full blur-xl"></div>
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Interactive Chart Visualization</p>
                  <p className="text-sm text-muted-foreground">Revenue and search volume correlation analysis</p>
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Revenue
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                      Search Volume
                    </span>
                  </div>
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
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm group-hover/item:text-primary transition-colors">{trend.hashtag}</p>
                      {getVelocityIcon(trend.velocity)}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {trend.posts} posts
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {trend.estimatedReach}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {trend.peakTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {trend.source}
                      </Badge>
                      <div className={`status-dot ${
                        trend.sentiment === 'positive' ? 'status-online' : 
                        trend.sentiment === 'neutral' ? 'status-offline' : 'status-busy'
                      }`}></div>
                      <span className="text-xs text-muted-foreground">{trend.avgEngagement} eng.</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-green-600 font-medium mb-1">
                      {trend.growth}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{trend.velocity}</p>
                  </div>
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

      {/* Enhanced Additional Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Performance Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-chart-2/10 to-chart-3/10 rounded-lg border border-chart-2/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
              <div className="text-center space-y-3 relative z-10">
                <Globe className="h-12 w-12 text-chart-2 mx-auto animate-pulse" />
                <div>
                  <p className="text-lg font-medium">Geographic Performance</p>
                  <p className="text-sm text-muted-foreground">Interactive heatmap visualization</p>
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>🇺🇸 US: 45%</span>
                    <span>🇪🇺 EU: 30%</span>
                    <span>🌏 APAC: 25%</span>
                  </div>
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
                { label: 'Positive', value: 75, color: 'bg-green-500', count: '18.2K mentions' },
                { label: 'Neutral', value: 20, color: 'bg-yellow-500', count: '4.8K mentions' },
                { label: 'Negative', value: 5, color: 'bg-red-500', count: '1.2K mentions' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.count}</span>
                  </div>
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
            <div className="mt-4 pt-3 border-t">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Overall sentiment score</span>
                <span className="font-medium text-green-600">8.2/10</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Actions */}
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
                onClick={() => handleQuickAction(action.action)}
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t">
            <p className="text-xs text-muted-foreground">
              💡 Tip: Use keyboard shortcuts for faster navigation. Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+K</kbd> to open command palette.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}