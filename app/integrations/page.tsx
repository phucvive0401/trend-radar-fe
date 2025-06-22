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
import { useAuth } from '@/contexts/AuthContext';
import { 
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
  Calendar
} from 'lucide-react';

const availableIntegrations = [
  {
    id: 'shopee',
    name: 'Shopee',
    description: 'Connect your Shopee store for product and sales data',
    category: 'E-commerce',
    logo: '🛒',
    features: ['Product sync', 'Order tracking', 'Analytics'],
  },
  {
    id: 'tiktok',
    name: 'TikTok for Business',
    description: 'Integrate TikTok ads and content performance',
    category: 'Social Media',
    logo: '🎵',
    features: ['Ad performance', 'Content analytics', 'Audience insights'],
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Import Google Ads campaign data and performance',
    category: 'Advertising',
    logo: '🔍',
    features: ['Campaign data', 'Keyword performance', 'ROI tracking'],
  },
  {
    id: 'facebook',
    name: 'Facebook & Instagram',
    description: 'Connect Facebook and Instagram business accounts',
    category: 'Social Media',
    logo: '📘',
    features: ['Post analytics', 'Ad performance', 'Audience data'],
  },
  {
    id: 'kiotviet',
    name: 'KiotViet',
    description: 'Sync inventory and sales data from KiotViet POS',
    category: 'POS System',
    logo: '🏪',
    features: ['Inventory sync', 'Sales data', 'Customer data'],
  },
  {
    id: 'lazada',
    name: 'Lazada',
    description: 'Connect Lazada seller center for marketplace data',
    category: 'E-commerce',
    logo: '🛍️',
    features: ['Product listings', 'Order management', 'Performance metrics'],
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
  },
];

export default function IntegrationsPage() {
  const { permissions } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

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
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const filteredAvailable = availableIntegrations.filter(integration => {
    if (selectedCategory === 'all') return true;
    return integration.category === selectedCategory;
  });

  const categories = Array.from(new Set(availableIntegrations.map(i => i.category)));

  return (
    <div className="space-y-6">
      <Header 
        title="Integrations" 
        subtitle="Connect your data sources and platforms"
      />
      
      {/* Connected Integrations */}
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
          <div className="space-y-4">
            {connectedIntegrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{integration.logo}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{integration.name}</h4>
                      {getStatusIcon(integration.status)}
                      {getStatusBadge(integration.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Last sync: {integration.lastSync.toLocaleString()}</span>
                      <span>{integration.syncFrequency}</span>
                      <span>{integration.dataPoints} data points</span>
                    </div>
                    {integration.error && (
                      <p className="text-sm text-red-600 mt-1">{integration.error}</p>
                    )}
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
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Available Integrations</CardTitle>
          <div className="flex items-center gap-4">
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAvailable.map((integration) => (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{integration.logo}</div>
                    <div>
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {integration.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {integration.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <Label className="text-xs font-medium">Features:</Label>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sync Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Sync Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Global Sync Frequency</Label>
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
              <div>
                <Label>Peak Hours Optimization</Label>
                <Switch defaultChecked />
                <p className="text-xs text-muted-foreground mt-1">
                  Increase sync frequency during business hours
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync All Now
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Advanced Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}