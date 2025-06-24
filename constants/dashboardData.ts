// constants/dashboardData.ts

import {
  DollarSign,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Target,
} from 'lucide-react';

export const mockKPIs = [
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

export const hotTrends = [
  {
    hashtag: '#SustainableFashion',
    growth: '+245%',
    posts: '12.4K',
    source: 'Multi-source',
    engagement: '8.4%',
    velocity: 'Accelerating',
    category: 'Fashion',
  },
  {
    hashtag: '#TechGadgets2024',
    growth: '+189%',
    posts: '8.7K',
    source: 'TikTok',
    engagement: '6.2%',
    velocity: 'Rising',
    category: 'Technology',
  },
  {
    hashtag: '#HomeDecor',
    growth: '+156%',
    posts: '15.2K',
    source: 'Instagram',
    engagement: '5.8%',
    velocity: 'Steady',
    category: 'Home',
  },
  {
    hashtag: '#FitnessMotivation',
    growth: '+134%',
    posts: '9.8K',
    source: 'Imported',
    engagement: '7.1%',
    velocity: 'Rising',
    category: 'Fitness',
  },
  {
    hashtag: '#FoodieLife',
    growth: '+112%',
    posts: '18.6K',
    source: 'Multi-source',
    engagement: '4.9%',
    velocity: 'Stable',
    category: 'Food',
  },
];

export const domains = [
  { id: 'all', name: 'All Domains', stores: 15, revenue: '$124.5K', growth: '+12.5%' },
  { id: 'fashion', name: 'Fashion & Apparel', stores: 5, revenue: '$45.2K', growth: '+18.3%' },
  { id: 'tech', name: 'Technology', stores: 3, revenue: '$38.7K', growth: '+22.1%' },
  { id: 'home', name: 'Home & Garden', stores: 4, revenue: '$28.4K', growth: '+8.7%' },
  { id: 'food', name: 'Food & Beverage', stores: 3, revenue: '$12.2K', growth: '+15.2%' },
];

export const quickInsights = [
  {
    title: 'Peak Performance Hour',
    value: '2:00 PM - 3:00 PM',
    description: 'Highest engagement window today',
    icon: Clock,
    action: 'Schedule Posts',
  },
  {
    title: 'Top Converting Hashtag',
    value: '#SustainableFashion',
    description: '3.2x higher conversion rate',
    icon: Target,
    action: 'Create Content',
  },
  {
    title: 'Trending Category',
    value: 'Eco-Friendly Products',
    description: 'Rising 45% this week',
    icon: TrendingUp,
    action: 'Explore Trends',
  },
];
