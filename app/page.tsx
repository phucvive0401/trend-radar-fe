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
  Target,
  ArrowUpRight,
  Clock,
  Zap
} from 'lucide-react';

import { toast } from 'sonner'; // Notification

import dynamic from 'next/dynamic';
const ImportModal = dynamic(() => import('@/components/ImportModal'), { ssr: false });

// Mock data for demonstration
const mockKPIs = [
  {
    title: 'Total Revenue',
    value: '$124,500',
    change: 12.5,
    changeLabel: 'from last month',
    icon: <DollarSign className="h-4 w-4" />,
    trend: [4200, 3800, 5200, 4900, 6100, 5800, 4600],
  },
  {
    title: 'Trend Score',
    value: '8.4/10',
    change: 5.2,
    changeLabel: 'from last week',
    icon: <TrendingUp className="h-4 w-4" />,
    trend: [7.2, 7.8, 8.1, 7.9, 8.4, 8.2, 8.4],
  },
  {
    title: 'Active Users',
    value: '12,483',
    change: -2.1,
    changeLabel: 'from yesterday',
    icon: <Users className="h-4 w-4" />,
    trend: [12800, 12600, 12483, 12700, 12483, 12400, 12483],
  },
  {
    title: 'Page Views',
    value: '84,291',
    change: 18.2,
    changeLabel: 'from last week',
    icon: <Eye className="h-4 w-4" />,
    trend: [71200, 75400, 78900, 82100, 84291, 83500, 84291],
  },
];

const hotTrends = [
  { 
    hashtag: '#SustainableFashion', 
    growth: '+245%', 
    posts: '12.4K', 
    source: 'Multi-source',
    engagement: '8.4%',
    velocity: 'Accelerating',
    category: 'Fashion'
  },
  { 
    hashtag: '#TechGadgets2024', 
    growth: '+189%', 
    posts: '8.7K', 
    source: 'TikTok',
    engagement: '6.2%',
    velocity: 'Rising',
    category: 'Technology'
  },
  { 
    hashtag: '#HomeDecor', 
    growth: '+156%', 
    posts: '15.2K', 
    source: 'Instagram',
    engagement: '5.8%',
    velocity: 'Steady',
    category: 'Home'
  },
  { 
    hashtag: '#FitnessMotivation', 
    growth: '+134%', 
    posts: '9.8K', 
    source: 'Imported',
    engagement: '7.1%',
    velocity: 'Rising',
    category: 'Fitness'
  },
  { 
    hashtag: '#FoodieLife', 
    growth: '+112%', 
    posts: '18.6K', 
    source: 'Multi-source',
    engagement: '4.9%',
    velocity: 'Stable',
    category: 'Food'
  },
];

const domains = [
  { id: 'all', name: 'All Domains', stores: 15, revenue: '$124.5K', growth: '+12.5%' },
  { id: 'fashion', name: 'Fashion & Apparel', stores: 5, revenue: '$45.2K', growth: '+18.3%' },
  { id: 'tech', name: 'Technology', stores: 3, revenue: '$38.7K', growth: '+22.1%' },
  { id: 'home', name: 'Home & Garden', stores: 4, revenue: '$28.4K', growth: '+8.7%' },
  { id: 'food', name: 'Food & Beverage', stores: 3, revenue: '$12.2K', growth: '+15.2%' },
];

const quickInsights = [
  {
    title: 'Peak Performance Hour',
    value: '2:00 PM - 3:00 PM',
    description: 'Highest engagement window today',
    icon: <Clock className="h-4 w-4" />,
    action: 'Schedule Posts',
  },
  {
    title: 'Top Converting Hashtag',
    value: '#SustainableFashion',
    description: '3.2x higher conversion rate',
    icon: <Target className="h-4 w-4" />,
    action: 'Create Content',
  },
  {
    title: 'Trending Category',
    value: 'Eco-Friendly Products',
    description: 'Rising 45% this week',
    icon: <TrendingUp className="h-4 w-4" />,
    action: 'Explore Trends',
  },
];

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [timeFilter, setTimeFilter] = useState('7d');
  const [regionFilter, setRegionFilter] = useState('global');
  const [domainFilter, setDomainFilter] = useState('all');
  const [showImportModal, setShowImportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
      toast.success('Data refreshed!');
    }, 2000);
  };

  // 2. Export Report handler
  const handleExport = async () => {
    setIsExporting(true);
    // Simulate file export (PDF/Excel)
    await new Promise((res) => setTimeout(res, 1600));
    setIsExporting(false);
    toast.success('Report exported!');
  };

  // 3. Share Dashboard
  const handleShare = () => {
    // Example: Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast.success('Dashboard link copied!');
  };

  // 4. Schedule Report
  const handleSchedule = () => {
    toast.info('Report scheduling is coming soon!');
  };

  // 5. Set Alerts
  const handleAlerts = () => {
    toast.info('Custom alerts setup is coming soon!');
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const selectedDomain = domains.find(d => d.id === domainFilter);

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
    <div className="space-y-6">
      <Header 
        title="Overview Dashboard" 
        subtitle="Real-time analytics and performance insights"
      />
      
      {/* Enhanced Filters with Visual Hierarchy */}
      <div className="bg-white rounded-lg border p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Store className="h-4 w-4 text-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block">Domain</label>
                <Select value={domainFilter} onValueChange={setDomainFilter}>
                  <SelectTrigger className="w-56 border-0 shadow-none p-0 h-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain.id} value={domain.id}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <span className="font-medium">{domain.name}</span>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{domain.stores} stores</span>
                              <span>•</span>
                              <span>{domain.revenue}</span>
                              <span className="text-green-600">{domain.growth}</span>
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block">Time Range</label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-32 border-0 shadow-none p-0 h-auto">
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
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Globe className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block">Region</label>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-32 border-0 shadow-none p-0 h-auto">
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
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">Last updated</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>
      </div>

      {/* Domain Summary with Enhanced Visual Design */}
      {selectedDomain && selectedDomain.id !== 'all' && (
        <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedDomain.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{selectedDomain.stores}</span> stores
                    </span>
                    <span className="flex items-center gap-1">
                      Revenue: <span className="font-medium text-green-600">{selectedDomain.revenue}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      Growth: <span className="font-medium text-green-600">{selectedDomain.growth}</span>
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setDomainFilter('all')}>
                Clear Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced KPI Cards with Micro Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Quick Insights Section */}
      <div className="grid gap-4 md:grid-cols-3">
        {quickInsights.map((insight, index) => (
          <Card key={index} className="hover:shadow-md transition-all duration-200 cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  {insight.icon}
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">{insight.title}</h4>
                <p className="font-semibold text-lg mb-1">{insight.value}</p>
                <p className="text-xs text-muted-foreground mb-3">{insight.description}</p>
                <Button size="sm" variant="outline" className="text-xs h-7">
                  {insight.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart - Enhanced */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue & Search Volume Trends
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
                <h3 className="font-semibold text-lg mb-2">Interactive Revenue Analytics</h3>
                <p className="text-muted-foreground mb-4">Revenue and search volume correlation with predictive insights</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Revenue</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Search Volume</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Hot Trends Widget */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Hot Trends Now
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 animate-pulse">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Live
                </Badge>
                <Button variant="outline" size="sm" onClick={() => setShowImportModal(true)}>
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {hotTrends.map((trend, index) => (
              <div key={index} className="group p-4 rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{trend.hashtag}</span>
                      <Badge variant="outline" className="text-xs">
                        {trend.category}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {trend.posts} posts
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {trend.engagement} engagement
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-green-600 mb-1">
                      {trend.growth}
                    </Badge>
                    <div className={`text-xs px-2 py-1 rounded-full ${getVelocityColor(trend.velocity)}`}>
                      {trend.velocity}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {trend.source}
                  </Badge>
                  <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity h-6 text-xs">
                    <Target className="h-3 w-3 mr-1" />
                    Analyze
                  </Button>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-3 border-t text-center">
              <p className="text-xs text-muted-foreground mb-2">
                Auto-refreshes every 5 minutes • Multi-source data
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                View All Trends
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Performance Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200">
              <div className="text-center">
                <div className="p-4 bg-white rounded-full shadow-sm mb-4 mx-auto w-fit">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Geographic Performance</h3>
                <p className="text-sm text-muted-foreground">Interactive heatmap showing regional performance metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Positive
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-semibold w-10">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  Neutral
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/5 h-full bg-yellow-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-semibold w-10">20%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  Negative
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/20 h-full bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-semibold w-10">5%</span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Score</span>
                  <span className="font-semibold text-green-600">8.4/10</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start gap-3 h-12">
              <Share2 className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Share Dashboard</div>
                <div className="text-xs text-muted-foreground">Export current view</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start gap-3 h-12">
              <Download className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Export Report</div>
                <div className="text-xs text-muted-foreground">PDF, Excel, PowerPoint</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start gap-3 h-12">
              <Calendar className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Schedule Report</div>
                <div className="text-xs text-muted-foreground">Automated delivery</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start gap-3 h-12">
              <Target className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Set Alerts</div>
                <div className="text-xs text-muted-foreground">Custom notifications</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}