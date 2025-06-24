import { TrendData, KPIData, Integration, NotificationData, ReportTemplate, ScheduledReport, DataFile, ChartSuggestion } from '@/types';
import { DollarSign, TrendingUp, Users, Eye } from 'lucide-react';

export const mockKPIs: KPIData[] = [
  {
    title: 'Total Revenue',
    value: '$124,500',
    change: 12.5,
    changeLabel: 'from last month',
    icon: DollarSign,
    trend: [4200, 3800, 5200, 4900, 6100, 5800, 4600],
  },
  {
    title: 'Trend Score',
    value: '8.4/10',
    change: 5.2,
    changeLabel: 'from last week',
    icon: TrendingUp,
    trend: [7.2, 7.8, 8.1, 7.9, 8.4, 8.2, 8.4],
  },
  {
    title: 'Active Users',
    value: '12,483',
    change: -2.1,
    changeLabel: 'from yesterday',
    icon: Users,
    trend: [12800, 12600, 12483, 12700, 12483, 12400, 12483],
  },
  {
    title: 'Page Views',
    value: '84,291',
    change: 18.2,
    changeLabel: 'from last week',
    icon: Eye,
    trend: [71200, 75400, 78900, 82100, 84291, 83500, 84291],
  },
];

export const mockTrendData: TrendData[] = [
  {
    hashtag: '#SustainableFashion',
    rank: 1,
    volume: '2.4M',
    growth: '+245%',
    sentiment: 'positive',
    price: '$45-85',
    engagement: '8.4%',
    velocity: 'Accelerating',
    platforms: ['TikTok', 'Instagram', 'Twitter'],
    peakHours: '2-4 PM',
    demographics: '18-34',
    competition: 'Medium',
    category: 'Fashion',
  },
  {
    hashtag: '#TechGadgets2024',
    rank: 2,
    volume: '1.8M',
    growth: '+189%',
    sentiment: 'positive',
    price: '$120-450',
    engagement: '6.2%',
    velocity: 'Rising',
    platforms: ['TikTok', 'YouTube'],
    peakHours: '7-9 PM',
    demographics: '25-45',
    competition: 'High',
    category: 'Technology',
  },
  {
    hashtag: '#HomeDecor',
    rank: 3,
    volume: '1.5M',
    growth: '+156%',
    sentiment: 'neutral',
    price: '$25-200',
    engagement: '5.8%',
    velocity: 'Steady',
    platforms: ['Instagram', 'Pinterest'],
    peakHours: '10-12 PM',
    demographics: '28-50',
    competition: 'Medium',
    category: 'Home',
  },
];

export const mockIntegrations: Integration[] = [
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
    health: 45,
    monthlyApiCalls: 23100,
    dataTransferred: '1.8 GB',
    uptime: '87.3%',
    error: 'Token expired - requires re-authentication',
  },
];

export const mockNotifications: NotificationData[] = [
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
];

export const mockReportTemplates: ReportTemplate[] = [
  {
    id: 'executive-dashboard',
    name: 'Executive Dashboard',
    description: 'High-level KPIs and strategic insights for leadership',
    sections: ['Executive Summary', 'Key Metrics', 'Strategic Insights', 'Recommendations'],
    category: 'Executive',
    estimatedTime: '5 minutes',
    popularity: 95,
    lastUpdated: '2 days ago',
    features: ['Real-time data', 'Interactive charts', 'Trend analysis'],
  },
  {
    id: 'weekly-performance',
    name: 'Weekly Performance Report',
    description: 'Comprehensive weekly analytics including KPIs, trends, and recommendations',
    sections: ['Executive Summary', 'KPI Overview', 'Trend Analysis', 'Action Items'],
    category: 'Performance',
    estimatedTime: '8 minutes',
    popularity: 87,
    lastUpdated: '1 day ago',
    features: ['Week-over-week comparison', 'Goal tracking', 'Performance alerts'],
  },
];

export const mockScheduledReports: ScheduledReport[] = [
  {
    id: 1,
    name: 'Weekly Performance Report',
    template: 'weekly-performance',
    frequency: 'Weekly',
    nextRun: new Date('2024-01-15 09:00'),
    recipients: ['team@company.com', 'ceo@company.com'],
    status: 'active',
    lastSent: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    openRate: '94%',
    format: 'PDF',
  },
];

export const mockDataFiles: DataFile[] = [
  {
    id: '1',
    name: 'sales_data_2024.csv',
    size: '2.4 MB',
    uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'ready',
    rows: 15420,
    columns: ['date', 'product_id', 'revenue', 'quantity', 'category', 'platform'],
    preview: [
      { date: '2024-01-15', product_id: 'P001', revenue: 245.50, quantity: 3, category: 'Fashion', platform: 'Shopee' },
      { date: '2024-01-15', product_id: 'P002', revenue: 89.99, quantity: 1, category: 'Tech', platform: 'TikTok' },
      { date: '2024-01-16', product_id: 'P003', revenue: 156.75, quantity: 2, category: 'Home', platform: 'Instagram' },
    ],
    insights: [
      'Fashion category shows 23% higher conversion rates',
      'Weekend sales peak at 2-4 PM consistently',
      'Shopee platform generates 34% of total revenue'
    ]
  },
];

export const mockChartSuggestions: ChartSuggestion[] = [
  {
    id: '1',
    type: 'line',
    title: 'Revenue Trend Over Time',
    description: 'Shows daily revenue progression with clear seasonal patterns and growth opportunities',
    xAxis: 'date',
    yAxis: 'revenue',
    confidence: 95,
    insight: 'Revenue shows 23% growth with Friday peaks',
    actionable: true
  },
  {
    id: '2',
    type: 'bar',
    title: 'Revenue by Platform',
    description: 'Compares total revenue across different sales platforms to identify top performers',
    xAxis: 'platform',
    yAxis: 'revenue',
    confidence: 88,
    insight: 'Shopee generates 34% of total revenue',
    actionable: true
  },
];