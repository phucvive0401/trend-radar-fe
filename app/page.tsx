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
  Upload
} from 'lucide-react';

// Mock data for demonstration
const mockKPIs = [
  {
    title: 'Total Revenue',
    value: '$124,500',
    change: 12.5,
    changeLabel: 'from last month',
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: 'Trend Score',
    value: '8.4/10',
    change: 5.2,
    changeLabel: 'from last week',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: 'Active Users',
    value: '12,483',
    change: -2.1,
    changeLabel: 'from yesterday',
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: 'Page Views',
    value: '84,291',
    change: 18.2,
    changeLabel: 'from last week',
    icon: <Eye className="h-4 w-4" />,
  },
];

const hotTrends = [
  { hashtag: '#SustainableFashion', growth: '+245%', posts: '12.4K', source: 'Multi-source' },
  { hashtag: '#TechGadgets2024', growth: '+189%', posts: '8.7K', source: 'TikTok' },
  { hashtag: '#HomeDecor', growth: '+156%', posts: '15.2K', source: 'Instagram' },
  { hashtag: '#FitnessMotivation', growth: '+134%', posts: '9.8K', source: 'Imported' },
  { hashtag: '#FoodieLife', growth: '+112%', posts: '18.6K', source: 'Multi-source' },
];

const domains = [
  { id: 'all', name: 'All Domains', stores: 15 },
  { id: 'fashion', name: 'Fashion & Apparel', stores: 5 },
  { id: 'tech', name: 'Technology', stores: 3 },
  { id: 'home', name: 'Home & Garden', stores: 4 },
  { id: 'food', name: 'Food & Beverage', stores: 3 },
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

  return (
    <div className="space-y-6">
      <Header 
        title="Overview Dashboard" 
        subtitle="Real-time analytics and performance insights"
      />
      
      {/* Enhanced Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-muted-foreground" />
            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger className="w-48">
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
              <SelectTrigger className="w-32">
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
              <SelectTrigger className="w-32">
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
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Domain Summary */}
      {selectedDomain && selectedDomain.id !== 'all' && (
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{selectedDomain.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedDomain.stores} stores • Filtered view active
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setDomainFilter('all')}>
                Clear Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Search Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive chart visualization</p>
                <p className="text-sm text-muted-foreground">Revenue and search volume correlation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Hot Trends Widget */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Hot Trends Now</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="animate-pulse">
                Live
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setShowImportModal(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hotTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{trend.hashtag}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{trend.posts} posts</span>
                      <Badge variant="outline" className="text-xs">
                        {trend.source}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {trend.growth}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t text-center">
              <p className="text-xs text-muted-foreground">
                Auto-refreshes every 5 minutes • Multi-source data
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <Filter className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Geographic performance heatmap</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Positive</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Neutral</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/5 h-full bg-yellow-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">20%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Negative</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/20 h-full bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Dashboard
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}