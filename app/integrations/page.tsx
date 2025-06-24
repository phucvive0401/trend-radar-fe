'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Bell,
  Plug, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Trash2, 
  Plus,
  Clock,
  Settings,
  ExternalLink,
  Key,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  Shield,
  Globe,
  Database,
  Bot,
  Smartphone,
  Monitor,
  Wifi,
  WifiOff,
  Activity,
  AlertTriangle,
  Star,
  ArrowUpRight
} from 'lucide-react';

const availableIntegrations = [
  {
    id: 'shopee',
    name: 'Shopee',
    description: 'Connect your Shopee store for product and sales data synchronization',
    category: 'E-commerce',
    logo: '🛒',
    features: ['Product sync', 'Order tracking', 'Analytics', 'Inventory management'],
    pricing: 'Free',
    rating: 4.8,
    users: '2.4M+',
    setupTime: '5 minutes',
    dataTypes: ['Products', 'Orders', 'Customers', 'Analytics'],
  },
  {
    id: 'tiktok',
    name: 'TikTok for Business',
    description: 'Integrate TikTok ads and content performance analytics',
    category: 'Social Media',
    logo: '🎵',
    features: ['Ad performance', 'Content analytics', 'Audience insights', 'Campaign management'],
    pricing: 'Free',
    rating: 4.6,
    users: '1.8M+',
    setupTime: '3 minutes',
    dataTypes: ['Campaigns', 'Content', 'Audience', 'Performance'],
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Import Google Ads campaign data and performance metrics',
    category: 'Advertising',
    logo: '🔍',
    features: ['Campaign data', 'Keyword performance', 'ROI tracking', 'Conversion analytics'],
    pricing: 'Free',
    rating: 4.7,
    users: '5.2M+',
    setupTime: '7 minutes',
    dataTypes: ['Campaigns', 'Keywords', 'Conversions', 'Costs'],
  },
  {
    id: 'facebook',
    name: 'Facebook & Instagram',
    description: 'Connect Facebook and Instagram business accounts for comprehensive social media analytics',
    category: 'Social Media',
    logo: '📘',
    features: ['Post analytics', 'Ad performance', 'Audience data', 'Story insights'],
    pricing: 'Free',
    rating: 4.5,
    users: '3.1M+',
    setupTime: '4 minutes',
    dataTypes: ['Posts', 'Ads', 'Audience', 'Stories'],
  },
  {
    id: 'kiotviet',
    name: 'KiotViet',
    description: 'Sync inventory and sales data from KiotViet POS system',
    category: 'POS System',
    logo: '🏪',
    features: ['Inventory sync', 'Sales data', 'Customer data', 'Transaction history'],
    pricing: 'Premium',
    rating: 4.4,
    users: '890K+',
    setupTime: '10 minutes',
    dataTypes: ['Inventory', 'Sales', 'Customers', 'Transactions'],
  },
  {
    id: 'lazada',
    name: 'Lazada',
    description: 'Connect Lazada seller center for marketplace data and analytics',
    category: 'E-commerce',
    logo: '🛍️',
    features: ['Product listings', 'Order management', 'Performance metrics', 'Seller analytics'],
    pricing: 'Free',
    rating: 4.3,
    users: '1.2M+',
    setupTime: '6 minutes',
    dataTypes: ['Products', 'Orders', 'Performance', 'Reviews'],
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing and financial analytics integration',
    category: 'Payments',
    logo: '💳',
    features: ['Payment tracking', 'Revenue analytics', 'Customer insights', 'Subscription management'],
    pricing: 'Free',
    rating: 4.9,
    users: '4.7M+',
    setupTime: '8 minutes',
    dataTypes: ['Payments', 'Revenue', 'Customers', 'Subscriptions'],
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing automation and campaign analytics',
    category: 'Email Marketing',
    logo: '📧',
    features: ['Campaign analytics', 'Audience insights', 'Automation tracking', 'A/B test results'],
    pricing: 'Free',
    rating: 4.2,
    users: '2.8M+',
    setupTime: '5 minutes',
    dataTypes: ['Campaigns', 'Subscribers', 'Automation', 'Analytics'],
  },
];

const connectedIntegrations = [
  {
    id: 'shopee',
    name: 'Shopee',
    status: 'connected',
    lastSync: new Date(Date.now() - 10 * 60 * 1000),
    syncFrequency: 'Every 15 minutes',
    dataPoints: '12,450',
    logo: '🛒',
    autoSync: true,
    health: 98,
    monthlyApiCalls: 45230,
    dataTransferred: '2.4 GB',
    uptime: '99.9%',
  },
  {
    id: 'tiktok',
    name: 'TikTok for Business',
    status: 'error',
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
    syncFrequency: 'Every 30 minutes',
    dataPoints: '8,230',
    logo: '🎵',
    autoSync: true,
    error: 'Token expired - requires re-authentication',
    health: 45,
    monthlyApiCalls: 23100,
    dataTransferred: '1.8 GB',
    uptime: '87.3%',
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    status: 'connected',
    lastSync: new Date(Date.now() - 5 * 60 * 1000),
    syncFrequency: 'Every hour',
    dataPoints: '5,670',
    logo: '🔍',
    autoSync: false,
    health: 92,
    monthlyApiCalls: 18750,
    dataTransferred: '1.2 GB',
    uptime: '99.2%',
  },
  {
    id: 'facebook',
    name: 'Facebook & Instagram',
    status: 'connected',
    lastSync: new Date(Date.now() - 20 * 60 * 1000),
    syncFrequency: 'Every 2 hours',
    dataPoints: '15,890',
    logo: '📘',
    autoSync: true,
    health: 89,
    monthlyApiCalls: 32400,
    dataTransferred: '3.1 GB',
    uptime: '98.7%',
  },
];

const integrationStats = {
  totalConnected: connectedIntegrations.length,
  totalDataPoints: connectedIntegrations.reduce((sum, integration) => sum + parseInt(integration.dataPoints.replace(',', '')), 0),
  avgHealth: Math.round(connectedIntegrations.reduce((sum, integration) => sum + integration.health, 0) / connectedIntegrations.length),
  monthlyApiCalls: connectedIntegrations.reduce((sum, integration) => sum + integration.monthlyApiCalls, 0),
};

export default function IntegrationsPage() {
  const { permissions } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!permissions.canManageIntegrations) {
    return (
      <div className="space-y-6">
        <Header title="Integrations" subtitle="Access denied" />
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <Plug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">You don't have permission to manage integrations.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'syncing':
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'syncing':
        return <Badge className="bg-blue-100 text-blue-800">Syncing</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredAvailable = availableIntegrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(availableIntegrations.map(i => i.category)));

  return (
    <div className="space-y-6">
      <Header 
        title="Integrations Hub" 
        subtitle="Connect your data sources and automate workflows"
      />
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="connected">Connected ({connectedIntegrations.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableIntegrations.length})</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Integration Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Connected</p>
                    <p className="text-2xl font-bold">{integrationStats.totalConnected}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Plug className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+2</span>
                  <span className="text-muted-foreground ml-1">this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Data Points</p>
                    <p className="text-2xl font-bold">{integrationStats.totalDataPoints.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Database className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+15.3%</span>
                  <span className="text-muted-foreground ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Health</p>
                    <p className="text-2xl font-bold">{integrationStats.avgHealth}%</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Activity className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Shield className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-blue-600">Excellent</span>
                  <span className="text-muted-foreground ml-1">status</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">API Calls</p>
                    <p className="text-2xl font-bold">{(integrationStats.monthlyApiCalls / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <BarChart3 className="h-4 w-4 text-purple-600 mr-1" />
                  <span className="text-purple-600">Monthly</span>
                  <span className="text-muted-foreground ml-1">usage</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Add Integration</h3>
                    <p className="text-sm text-muted-foreground">Connect new data sources</p>
                  </div>
                </div>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Integrations
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <RefreshCw className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sync All</h3>
                    <p className="text-sm text-muted-foreground">Refresh all data sources</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Bot className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Auto-Setup</h3>
                    <p className="text-sm text-muted-foreground">AI-powered configuration</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Bot className="h-4 w-4 mr-2" />
                  Smart Setup
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Integration Health Overview */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Integration Health Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedIntegrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{integration.logo}</div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Last sync: {integration.lastSync.toLocaleTimeString()}</span>
                          <span>{integration.dataPoints} data points</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`font-semibold ${getHealthColor(integration.health)}`}>
                          {integration.health}%
                        </div>
                        <div className="text-xs text-muted-foreground">Health</div>
                      </div>
                      <div className="w-16">
                        <Progress value={integration.health} className="h-2" />
                      </div>
                      {getStatusIcon(integration.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connected" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Plug className="h-5 w-5" />
                  Connected Integrations
                </span>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {connectedIntegrations.map((integration) => (
                  <Card key={integration.id} className="hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{integration.logo}</div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-lg">{integration.name}</h4>
                              {getStatusIcon(integration.status)}
                              {getStatusBadge(integration.status)}
                            </div>
                            
                            {integration.error && (
                              <div className="flex items-center gap-2 mb-3 p-2 bg-red-50 rounded-lg">
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                <p className="text-sm text-red-600">{integration.error}</p>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <div className="text-xs text-muted-foreground">Health Score</div>
                                <div className={`font-semibold ${getHealthColor(integration.health)}`}>
                                  {integration.health}%
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Data Points</div>
                                <div className="font-semibold">{integration.dataPoints}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">API Calls</div>
                                <div className="font-semibold">{integration.monthlyApiCalls.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Uptime</div>
                                <div className="font-semibold text-green-600">{integration.uptime}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Sync: {integration.syncFrequency}</span>
                              <span>•</span>
                              <span>Last: {integration.lastSync.toLocaleString()}</span>
                              <span>•</span>
                              <span>Data: {integration.dataTransferred}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`auto-sync-${integration.id}`} className="text-sm">
                              Auto-sync
                            </Label>
                            <Switch
                              id={`auto-sync-${integration.id}`}
                              checked={integration.autoSync}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Sync Now
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          {/* Enhanced Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Bot className="h-4 w-4 mr-2" />
                    AI Recommend
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAvailable.map((integration) => (
              <Card key={integration.id} className="hover:shadow-lg transition-all group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{integration.logo}</div>
                      <div>
                        <h4 className="font-semibold">{integration.name}</h4>
                        <Badge variant="outline" className="text-xs mt-1">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{integration.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {integration.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Users:</span>
                      <span className="font-medium ml-1">{integration.users}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Setup:</span>
                      <span className="font-medium ml-1">{integration.setupTime}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pricing:</span>
                      <span className="font-medium ml-1">{integration.pricing}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rating:</span>
                      <span className="font-medium ml-1">{integration.rating}/5</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Features:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {integration.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {integration.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{integration.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Data Types:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {integration.dataTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Global Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Default Sync Frequency</Label>
                  <Select defaultValue="15min">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5min">Every 5 minutes</SelectItem>
                      <SelectItem value="15min">Every 15 minutes</SelectItem>
                      <SelectItem value="30min">Every 30 minutes</SelectItem>
                      <SelectItem value="1hour">Every hour</SelectItem>
                      <SelectItem value="manual">Manual only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-retry Failed Syncs</Label>
                    <p className="text-sm text-muted-foreground">Automatically retry failed synchronizations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Peak Hours Optimization</Label>
                    <p className="text-sm text-muted-foreground">Increase sync frequency during business hours</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Smart Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">Automatically adjust API call frequency</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt all data in transit and at rest</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Access Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all integration access attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Token Auto-Refresh</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh expired tokens</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div>
                  <Label>Data Retention Period</Label>
                  <Select defaultValue="90days">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">30 days</SelectItem>
                      <SelectItem value="90days">90 days</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sync Failure Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when syncs fail</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Health Score Alerts</Label>
                    <p className="text-sm text-muted-foreground">Alert when health drops below threshold</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div>
                  <Label>Health Threshold</Label>
                  <Select defaultValue="70">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="70">70%</SelectItem>
                      <SelectItem value="80">80%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Summary</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly integration reports</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>API Rate Limit</Label>
                  <Select defaultValue="1000">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500">500 calls/hour</SelectItem>
                      <SelectItem value="1000">1,000 calls/hour</SelectItem>
                      <SelectItem value="5000">5,000 calls/hour</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>API Key Rotation</Label>
                    <p className="text-sm text-muted-foreground">Automatically rotate API keys monthly</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Webhook Verification</Label>
                    <p className="text-sm text-muted-foreground">Verify webhook signatures</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Button variant="outline" className="w-full">
                  <Key className="h-4 w-4 mr-2" />
                  Manage API Keys
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}