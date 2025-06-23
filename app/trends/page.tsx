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
  Bot,
  Sparkles,
  Eye,
  Heart,
  Share2,
  Zap,
  Globe,
  Calendar
} from 'lucide-react';

const trendingHashtags = [
  { 
    hashtag: '#SustainableFashion', 
    rank: 1, 
    volume: '2.4M', 
    growth: '+245%', 
    sentiment: 'positive', 
    price: '$45-85',
    engagement: '8.4%',
    platforms: ['TikTok', 'Instagram', 'Twitter'],
    peakHours: '2-4 PM'
  },
  { 
    hashtag: '#TechGadgets2024', 
    rank: 2, 
    volume: '1.8M', 
    growth: '+189%', 
    sentiment: 'positive', 
    price: '$120-450',
    engagement: '6.2%',
    platforms: ['TikTok', 'YouTube'],
    peakHours: '7-9 PM'
  },
  { 
    hashtag: '#HomeDecor', 
    rank: 3, 
    volume: '1.5M', 
    growth: '+156%', 
    sentiment: 'neutral', 
    price: '$25-200',
    engagement: '5.8%',
    platforms: ['Instagram', 'Pinterest'],
    peakHours: '10-12 AM'
  },
  { 
    hashtag: '#FitnessMotivation', 
    rank: 4, 
    volume: '1.2M', 
    growth: '+134%', 
    sentiment: 'positive', 
    price: '$15-80',
    engagement: '7.1%',
    platforms: ['TikTok', 'Instagram'],
    peakHours: '6-8 AM'
  },
  { 
    hashtag: '#FoodieLife', 
    rank: 5, 
    volume: '980K', 
    growth: '+112%', 
    sentiment: 'positive', 
    price: '$8-45',
    engagement: '9.2%',
    platforms: ['Instagram', 'TikTok'],
    peakHours: '12-2 PM'
  },
];

const competitorData = [
  { 
    name: 'BrandA', 
    marketShare: '23%', 
    avgPrice: '$67', 
    sentiment: 'positive', 
    trend: '+12%',
    followers: '2.4M',
    engagement: '4.2%'
  },
  { 
    name: 'BrandB', 
    marketShare: '18%', 
    avgPrice: '$89', 
    sentiment: 'neutral', 
    trend: '+8%',
    followers: '1.8M',
    engagement: '3.8%'
  },
  { 
    name: 'BrandC', 
    marketShare: '15%', 
    avgPrice: '$45', 
    sentiment: 'positive', 
    trend: '+15%',
    followers: '1.2M',
    engagement: '5.1%'
  },
  { 
    name: 'BrandD', 
    marketShare: '12%', 
    avgPrice: '$78', 
    sentiment: 'negative', 
    trend: '-3%',
    followers: '980K',
    engagement: '2.9%'
  },
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
  const [selectedTrend, setSelectedTrend] = useState<any>(null);

  const filteredHashtags = trendingHashtags.filter(hashtag => {
    if (categoryFilter === 'all') return true;
    return hashtag.hashtag.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <Dialog open={showChatbot} onOpenChange={setShowChatbot}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-primary/5 border-primary/20 hover:bg-primary/10 hover-lift">
            <Bot className="h-4 w-4 mr-2" />
            Ask AI
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Trend Analyst
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
                  className="w-full text-left justify-start h-auto p-3 whitespace-normal hover-lift"
                  onClick={() => {
                    setShowChatbot(false);
                    window.location.href = `/chatbot?q=${encodeURIComponent(question)}`;
                  }}
                >
                  <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" />
                  {question}
                </Button>
              ))}
            </div>
            <Button 
              className="w-full gradient-bg hover-lift" 
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
      
      {permissions.canExport && (
        <Button variant="outline" className="hover-lift">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-in-up">
      <Header 
        title="Trend Explorer" 
        subtitle="Discover trending hashtags and competitive insights"
        actions={headerActions}
      />
      
      {/* Enhanced Search and Filters */}
      <Card className="glass border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search hashtags, products, or keywords..."
                  className="pl-10 focus-ring"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Store className="h-4 w-4 text-muted-foreground" />
                <Select value={storeFilter} onValueChange={setStoreFilter}>
                  <SelectTrigger className="w-40 focus-ring">
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
                <SelectTrigger className="w-40 focus-ring">
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
                <SelectTrigger className="w-32 focus-ring">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="hashtags" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hashtags">Trending Hashtags</TabsTrigger>
          <TabsTrigger value="products">Product Rankings</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="forecast">4-Week Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="hashtags" className="space-y-4">
          <div className="grid gap-4">
            {filteredHashtags.map((item, index) => (
              <Card key={index} className="hover-lift group cursor-pointer" onClick={() => setSelectedTrend(item)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-1 text-primary-foreground text-sm font-bold">
                        {item.rank}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{item.hashtag}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {item.volume} posts
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {item.engagement} engagement
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {item.price}
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Peak: {item.peakHours}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {item.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge className={`${getSentimentColor(item.sentiment)} border-0`}>
                        {item.sentiment}
                      </Badge>
                      <Badge variant="outline" className="text-green-600 font-medium">
                        {item.growth}
                      </Badge>
                      <Button variant="outline" size="sm" className="hover-lift">
                        <Target className="h-4 w-4 mr-2" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Top Performing Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <div key={rank} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-all duration-200 hover-lift group">
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-1 text-primary-foreground text-sm font-bold">
                        {rank}
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">Product {rank}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Category • Brand</span>
                          <Badge variant="outline" className="text-xs">
                            {Math.floor(Math.random() * 1000) + 100} reviews
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${Math.floor(Math.random() * 100) + 20}</p>
                      <p className="text-sm text-green-600 font-medium">+{Math.floor(Math.random() * 50) + 10}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {competitorData.map((competitor, index) => (
              <Card key={index} className="hover-lift group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="group-hover:text-primary transition-colors">{competitor.name}</span>
                    <Badge variant={competitor.trend.startsWith('+') ? 'default' : 'destructive'}>
                      {competitor.trend}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Market Share</span>
                          <span className="font-medium">{competitor.marketShare}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Avg Price</span>
                          <span className="font-medium">{competitor.avgPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Followers</span>
                          <span className="font-medium">{competitor.followers}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Engagement</span>
                          <span className="font-medium">{competitor.engagement}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Sentiment</span>
                          <Badge className={`${getSentimentColor(competitor.sentiment)} border-0 text-xs`}>
                            {competitor.sentiment}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full hover-lift">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                ML-Powered 4-Week Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-chart-4/10 to-chart-5/10 rounded-lg border border-chart-4/20">
                <div className="text-center space-y-3">
                  <div className="relative">
                    <BarChart3 className="h-16 w-16 text-chart-4 mx-auto animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-chart-4/20 to-chart-5/20 rounded-full blur-xl"></div>
                  </div>
                  <div>
                    <p className="text-lg font-medium">ML Forecast Visualization</p>
                    <p className="text-sm text-muted-foreground">Predicted trends for next 4 weeks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Trend Detail Modal */}
      {selectedTrend && (
        <Dialog open={!!selectedTrend} onOpenChange={() => setSelectedTrend(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                {selectedTrend.hashtag} - Detailed Analysis
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{selectedTrend.volume}</p>
                  <p className="text-xs text-muted-foreground">Total Posts</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{selectedTrend.growth}</p>
                  <p className="text-xs text-muted-foreground">Growth Rate</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{selectedTrend.engagement}</p>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">#{selectedTrend.rank}</p>
                  <p className="text-xs text-muted-foreground">Global Rank</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Platform Distribution</h4>
                  <div className="flex gap-2">
                    {selectedTrend.platforms.map((platform: string) => (
                      <Badge key={platform} variant="outline">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Peak Activity Hours</h4>
                  <p className="text-sm text-muted-foreground">{selectedTrend.peakHours}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <p className="text-sm text-muted-foreground">{selectedTrend.price}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 gradient-bg">
                  <Target className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}