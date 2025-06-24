'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  TrendingUp,
  Check,
  X,
  Star,
  Zap,
  Shield,
  Users,
  BarChart3,
  Clock
} from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 5 integrations',
      'Basic analytics dashboard',
      '1,000 API calls/month',
      'Email support',
      '7-day data retention',
    ],
    limitations: [
      'No advanced forecasting',
      'No custom reports',
      'No team collaboration',
    ],
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$79',
    period: '/month',
    description: 'Advanced features for growing businesses',
    features: [
      'Up to 15 integrations',
      'Advanced analytics & forecasting',
      '10,000 API calls/month',
      'Priority support',
      '30-day data retention',
      'Custom reports',
      'Team collaboration (5 users)',
      'A/B testing tools',
    ],
    limitations: [
      'Limited white-label options',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'Full-featured solution for large organizations',
    features: [
      'Unlimited integrations',
      'Full analytics suite',
      'Unlimited API calls',
      '24/7 dedicated support',
      'Unlimited data retention',
      'Custom reports & dashboards',
      'Unlimited team members',
      'Advanced A/B testing',
      'White-label options',
      'Custom integrations',
      'SLA guarantee',
    ],
    limitations: [],
    popular: false,
  },
];

const currentPlan = {
  name: 'Professional',
  price: '$79',
  period: '/month',
  nextBilling: new Date('2024-02-15'),
  usage: {
    integrations: { used: 8, limit: 15 },
    apiCalls: { used: 6420, limit: 10000 },
    users: { used: 3, limit: 5 },
    storage: { used: 12.5, limit: 50 }, // GB
  },
};

const invoices = [
  {
    id: 'INV-2024-001',
    date: new Date('2024-01-15'),
    amount: '$79.00',
    status: 'paid',
    plan: 'Professional',
  },
  {
    id: 'INV-2023-012',
    date: new Date('2023-12-15'),
    amount: '$79.00',
    status: 'paid',
    plan: 'Professional',
  },
  {
    id: 'INV-2023-011',
    date: new Date('2023-11-15'),
    amount: '$29.00',
    status: 'paid',
    plan: 'Starter',
  },
];

export default function BillingPage() {
  const { permissions } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('professional');

  if (!permissions.canManageBilling) {
    return (
      <div className="space-y-6">
        <Header title="Billing & Plans" subtitle="Access denied" />
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">You don't have permission to manage billing.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Billing & Plans" 
        subtitle="Manage your subscription and billing information"
      />
      
      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current Plan</TabsTrigger>
          <TabsTrigger value="plans">Upgrade Plans</TabsTrigger>
          <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
          <TabsTrigger value="invoices">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Plan</span>
                  <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                    <p className="text-3xl font-bold text-primary">
                      {currentPlan.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        {currentPlan.period}
                      </span>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Next billing date</span>
                      <span className="font-medium">
                        {currentPlan.nextBilling.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Billing cycle</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Change Plan
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/26</p>
                    </div>
                    <Badge variant="outline">Primary</Badge>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {plan.id === 'professional' && (
                      <Badge variant="outline">Current</Badge>
                    )}
                  </CardTitle>
                  <div>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <X className="h-4 w-4 text-red-500" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.id === 'professional' ? 'outline' : 'default'}
                      disabled={plan.id === 'professional'}
                    >
                      {plan.id === 'professional' ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  API Calls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used this month</span>
                    <span className="font-medium">
                      {currentPlan.usage.apiCalls.used.toLocaleString()} / {currentPlan.usage.apiCalls.limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={getUsagePercentage(currentPlan.usage.apiCalls.used, currentPlan.usage.apiCalls.limit)} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {Math.round(getUsagePercentage(currentPlan.usage.apiCalls.used, currentPlan.usage.apiCalls.limit))}% used
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active integrations</span>
                    <span className="font-medium">
                      {currentPlan.usage.integrations.used} / {currentPlan.usage.integrations.limit}
                    </span>
                  </div>
                  <Progress 
                    value={getUsagePercentage(currentPlan.usage.integrations.used, currentPlan.usage.integrations.limit)} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {Math.round(getUsagePercentage(currentPlan.usage.integrations.used, currentPlan.usage.integrations.limit))}% used
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active users</span>
                    <span className="font-medium">
                      {currentPlan.usage.users.used} / {currentPlan.usage.users.limit}
                    </span>
                  </div>
                  <Progress 
                    value={getUsagePercentage(currentPlan.usage.users.used, currentPlan.usage.users.limit)} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {Math.round(getUsagePercentage(currentPlan.usage.users.used, currentPlan.usage.users.limit))}% used
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Data Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage used</span>
                    <span className="font-medium">
                      {currentPlan.usage.storage.used} GB / {currentPlan.usage.storage.limit} GB
                    </span>
                  </div>
                  <Progress 
                    value={getUsagePercentage(currentPlan.usage.storage.used, currentPlan.usage.storage.limit)} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {Math.round(getUsagePercentage(currentPlan.usage.storage.used, currentPlan.usage.storage.limit))}% used
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{invoice.id}</h4>
                        <Badge variant={invoice.status === 'paid' ? 'default' : 'destructive'} className="capitalize">
                          {invoice.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {invoice.date.toLocaleDateString()}
                        </span>
                        <span>{invoice.plan} Plan</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{invoice.amount}</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}