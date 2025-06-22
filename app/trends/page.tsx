'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  Hash, 
  DollarSign,
  Users,
  BarChart3,
  Target,
  MessageCircle,
  Store,
  Bot
} from 'lucide-react';

const trendingHashtags = [
  { hashtag: '#SustainableFashion', rank: 1, volume: '2.4M', growth: '+245%', sentiment: 'positive', price: '$45-85' },
  { hashtag: '#TechGadgets2024', rank: 2, volume: '1.8M', growth: '+189%', sentiment: 'positive', price: '$120-450' },
  { hashtag: '#HomeDecor', rank: 3, volume: '1.5M', growth: '+156%', sentiment: 'neutral', price: '$25-200' },
  { hashtag: '#FitnessMotivation', rank: 4, volume: '1.2M', growth: '+134%', sentiment: 'positive', price: '$15-80' },
  { hashtag: '#FoodieLife', rank: 5, volume: '980K', growth: '+112%', sentiment: 'positive', price: '$8-45' },
];

const competitorData = [
  { name: 'BrandA', marketShare: '23%', avgPrice: '$67', sentiment: 'positive', trend: '+12%' },
  { name: 'BrandB', marketShare: '18%', avgPrice: '$89', sentiment: 'neutral', trend: '+8%' },
  { name: 'BrandC', marketShare: '15%', avgPrice: '$45', sentiment: 'positive', trend: '+15%' },
  { name: 'BrandD', marketShare: '12%', avgPrice: '$78', sentiment: 'negative', trend: '-3%' },
];

const stores = [
  { id: 'all', name: 'All Stores' },
  { id: 'store1', name: 'Fashion Store A' },
  { id: 'store2', name: 'Tech Store B' },
  { id: 'store3', name: 'Home Store C' },
];

const sampleChatbotQuestions = [
  "What's trending in sustainable fashion?",
  "Show me competitor analysis for tech products",
  "Which hashtags have the highest ROI?",
  "Compare engagement rates across platforms",
  "What's the sentiment for #HomeDecor?",
  "Forecast trends for next month"
];

export default function TrendExplorer() {
  const { permissions } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [storeFilter, setStoreFilter] = useState('all');
  const [showChatbot, setShowChatbot] = useState(false);

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
        return <TrendingUp className="h-4 w-4" />;
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

  const filteredNotifications = trendingHashtags.filter(notification => {
    if (categoryFilter === 'all') return true;
    return notification.hashtag.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <Header 
        title="Trend Explorer" 
        subtitle="Discover trending hashtags and competitive insights"
      />
      
      {/* Enhanced Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search hashtags, products, or keywords..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-muted-foreground" />
            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
          
          {permissions.canExport && (
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
          
          {/* Ask Chatbot Button */}
          <Dialog open={showChatbot} onOpenChange={setShowChatbot}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-primary/5 border-primary/20 hover:bg-primary/10">
                <Bot className="h-4 w-4 mr-2" />
                Ask Chatbot
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Ask AI Trend Analyst
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Try asking these sample questions:
                </p>
                <div className="space-y-2">
                  {sampleChatbotQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-3 whitespace-normal"
                      onClick={() => {
                        setShowChatbot(false);
                        // Navigate to chatbot with pre-filled question
                        window.location.href = `/chatbot?q=${encodeURIComponent(question)}`;
                      }}
                    >
                      <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" />
                      {question}
                    </Button>
                  ))}
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setShowChatbot(false);
                    window.location.href = '/chatbot';
                  }}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Open Full Chatbot
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="hashtags" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hashtags">Trending Hashtags</TabsTrigger>
          <TabsTrigger value="products">Product Rankings</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="forecast">4-Week Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="hashtags" className="space-y-4">
          <div className="grid gap-4">
            {filteredNotifications.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {item.rank}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.hashtag}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {item.volume} posts
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant={item.sentiment === 'positive' ? 'default' : 
                              item.sentiment === 'neutral' ? 'secondary' : 'destructive'}
                    >
                      {item.sentiment}
                    </Badge>
                    <Badge variant="outline" className="text-green-600">
                      {item.growth}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      Analyze
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <div key={rank} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">#{rank}</span>
                      <div>
                        <h4 className="font-medium">Product {rank}</h4>
                        <p className="text-sm text-muted-foreground">Category • Brand</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${Math.floor(Math.random() * 100) + 20}</p>
                      <p className="text-sm text-green-600">+{Math.floor(Math.random() * 50) + 10}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {competitorData.map((competitor, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {competitor.name}
                    <Badge variant={competitor.trend.startsWith('+') ? 'default' : 'destructive'}>
                      {competitor.trend}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Market Share</span>
                      <span className="font-medium">{competitor.marketShare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Price</span>
                      <span className="font-medium">{competitor.avgPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sentiment</span>
                      <Badge 
                        variant={competitor.sentiment === 'positive' ? 'default' : 
                                competitor.sentiment === 'neutral' ? 'secondary' : 'destructive'}
                        className="capitalize"
                      >
                        {competitor.sentiment}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ML-Powered 4-Week Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">ML Forecast Visualization</p>
                  <p className="text-sm text-muted-foreground">Predicted trends for next 4 weeks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}