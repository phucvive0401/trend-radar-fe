'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
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
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Star,
  Bookmark,
  ExternalLink,
  RefreshCw,
  TrendingDown,
  AlertTriangle,
  CheckCircle2
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
    peakHours: '2-4 PM',
    velocity: 'accelerating',
    roi: '+156%',
    competition: 'medium',
    forecast: 'rising',
    tags: ['eco-friendly', 'sustainable', 'fashion'],
    avgViews: '125K',
    shareRate: '12.3%',
    conversionRate: '3.2%'
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
    peakHours: '7-9 PM',
    velocity: 'steady',
    roi: '+89%',
    competition: 'high',
    forecast: 'stable',
    tags: ['technology', 'gadgets', 'innovation'],
    avgViews: '98K',
    shareRate: '8.7%',
    conversionRate: '2.8%'
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
    peakHours: '10-12 AM',
    velocity: 'steady',
    roi: '+67%',
    competition: 'low',
    forecast: 'rising',
    tags: ['home', 'decor', 'interior'],
    avgViews: '76K',
    shareRate: '15.2%',
    conversionRate: '4.1%'
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
    peakHours: '6-8 AM',
    velocity: 'accelerating',
    roi: '+112%',
    competition: 'medium',
    forecast: 'rising',
    tags: ['fitness', 'motivation', 'health'],
    avgViews: '89K',
    shareRate: '11.8%',
    conversionRate: '3.5%'
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
    peakHours: '12-2 PM',
    velocity: 'decelerating',
    roi: '+78%',
    competition: 'high',
    forecast: 'declining',
    tags: ['food', 'cooking', 'recipes'],
    avgViews: '112K',
    shareRate: '18.5%',
    conversionRate: '2.9%'
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
    engagement: '4.2%',
    topHashtags: ['#SustainableFashion', '#EcoFriendly'],
    recentActivity: 'Launched new eco collection',
    threatLevel: 'medium'
  },
  { 
    name: 'BrandB', 
    marketShare: '18%', 
    avgPrice: '$89', 
    sentiment: 'neutral', 
    trend: '+8%',
    followers: '1.8M',
    engagement: '3.8%',
    topHashtags: ['#TechGadgets', '#Innovation'],
    recentActivity: 'Price reduction campaign',
    threatLevel: 'low'
  },
  { 
    name: 'BrandC', 
    marketShare: '15%', 
    avgPrice: '$45', 
    sentiment: 'positive', 
    trend: '+15%',
    followers: '1.2M',
    engagement: '5.1%',
    topHashtags: ['#HomeDecor', '#Minimalist'],
    recentActivity: 'Viral TikTok campaign',
    threatLevel: 'high'
  },
  { 
    name: 'BrandD', 
    marketShare: '12%', 
    avgPrice: '$78', 
    sentiment: 'negative', 
    trend: '-3%',
    followers: '980K',
    engagement: '2.9%',
    topHashtags: ['#Fitness', '#Wellness'],
    recentActivity: 'Customer service issues',
    threatLevel: 'low'
  },
];

const forecastData = [
  {
    hashtag: '#SustainableFashion',
    currentGrowth: '+245%',
    predictedGrowth: '+320%',
    confidence: 89,
    timeframe: '4 weeks',
    factors: ['Seasonal trend', 'Influencer adoption', 'Brand partnerships'],
    recommendation: 'Strong buy - High growth potential'
  },
  {
    hashtag: '#TechGadgets2024',
    currentGrowth: '+189%',
    predictedGrowth: '+156%',
    confidence: 76,
    timeframe: '4 weeks',
    factors: ['Market saturation', 'Competition increase'],
    recommendation: 'Hold - Stable performance expected'
  },
  {
    hashtag: '#HomeDecor',
    currentGrowth: '+156%',
    predictedGrowth: '+198%',
    confidence: 82,
    timeframe: '4 weeks',
    factors: ['Spring season', 'Home improvement trends'],
    recommendation: 'Buy - Seasonal opportunity'
  }
];

const stores = [
  { id: 'all', name: 'All Stores', count: 15 },
  { id: 'store1', name: 'Fashion Store A', count: 5 },
  { id: 'store2', name: 'Tech Store B', count: 3 },
  { id: 'store3', name: 'Home Store C', count: 4 },
  { id: 'store4', name: 'Food Store D', count: 3 },
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
  const [bookmarkedTrends, setBookmarkedTrends] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rank');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredHashtags = trendingHashtags
    .filter(hashtag => {
      const matchesSearch = hashtag.hashtag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hashtag.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter === 'all' || 
                             hashtag.tags.some(tag => tag.toLowerCase().includes(categoryFilter.toLowerCase()));
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'growth':
          return parseInt(b.growth.replace(/[+%]/g, '')) - parseInt(a.growth.replace(/[+%]/g, ''));
        case 'engagement':
          return parseFloat(b.engagement.replace('%', '')) - parseFloat(a.engagement.replace('%', ''));
        case 'volume':
          return parseFloat(b.volume.replace(/[KM]/g, '')) - parseFloat(a.volume.replace(/[KM]/g, ''));
        default:
          return a.rank - b.rank;
      }
    });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const toggleBookmark = (hashtag: string) => {
    setBookmarkedTrends(prev => 
      prev.includes(hashtag) 
        ? prev.filter(h => h !== hashtag)
        : [...prev, hashtag]
    );
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const getForecastIcon = (forecast: string) => {
    switch (forecast) {
      case 'rising': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'declining': return <TrendingDown className="h-3 w-3 text-red-600" />;
      case 'stable': return <Minus className="h-3 w-3 text-blue-600" />;
      default: return <Minus className="h-3 w-3" />;
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getThreatLevel = (level: string) => {
    switch (level) {
      case 'low': return { color: 'text-green-600 bg-green-100', icon: CheckCircle2 };
      case 'medium': return { color: 'text-yellow-600 bg-yellow-100', icon: AlertTriangle };
      case 'high': return { color: 'text-red-600 bg-red-100', icon: AlertTriangle };
      default: return { color: 'text-gray-600 bg-gray-100', icon: AlertTriangle };
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
                        <div className="flex items-center justify-between w-full">
                          <span>{store.name}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {store.count}
                          </Badge>
                        </div>
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
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 focus-ring">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rank">Rank</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
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

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hover-lift"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
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
          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Total Trends</span>
                </div>
                <p className="text-2xl font-bold">{filteredHashtags.length}</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Avg Growth</span>
                </div>
                <p className="text-2xl font-bold text-green-600">+167%</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-muted-foreground">Avg Engagement</span>
                </div>
                <p className="text-2xl font-bold text-red-600">7.3%</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">Bookmarked</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{bookmarkedTrends.length}</p>
              </CardContent>
            </Card>
          </div>

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
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{item.hashtag}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(item.hashtag);
                            }}
                            className="h-6 w-6 p-0"
                          >
                            <Bookmark className={`h-3 w-3 ${bookmarkedTrends.includes(item.hashtag) ? 'fill-current text-blue-600' : 'text-muted-foreground'}`} />
                          </Button>
                          {getVelocityIcon(item.velocity)}
                          {getForecastIcon(item.forecast)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{item.volume} posts</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Heart className="h-3 w-3" />
                            <span>{item.engagement} engagement</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            <span>{item.avgViews} avg views</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <DollarSign className="h-3 w-3" />
                            <span>{item.roi} ROI</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          {item.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                          <Badge className={`${getCompetitionColor(item.competition)} border-0 text-xs`}>
                            {item.competition} competition
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={`${getSentimentColor(item.sentiment)} border-0`}>
                        {item.sentiment}
                      </Badge>
                      <Badge variant="outline" className="text-green-600 font-medium">
                        {item.growth}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="hover-lift">
                          <Target className="h-4 w-4 mr-2" />
                          Analyze
                        </Button>
                        <Button variant="outline" size="sm" className="hover-lift">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
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
                        <h4 className="font-medium group-hover:text-primary transition-colors">Eco-Friendly Product {rank}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Sustainable Fashion • EcoBrand</span>
                          <Badge variant="outline" className="text-xs">
                            {Math.floor(Math.random() * 1000) + 100} reviews
                          </Badge>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
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
            {competitorData.map((competitor, index) => {
              const threat = getThreatLevel(competitor.threatLevel);
              const ThreatIcon = threat.icon;
              
              return (
                <Card key={index} className="hover-lift group">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="group-hover:text-primary transition-colors">{competitor.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={competitor.trend.startsWith('+') ? 'default' : 'destructive'}>
                          {competitor.trend}
                        </Badge>
                        <Badge className={`${threat.color} border-0 text-xs`}>
                          <ThreatIcon className="h-3 w-3 mr-1" />
                          {competitor.threatLevel}
                        </Badge>
                      </div>
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
                      
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Top Hashtags:</p>
                        <div className="flex flex-wrap gap-1">
                          {competitor.topHashtags.map((hashtag) => (
                            <Badge key={hashtag} variant="outline" className="text-xs">
                              {hashtag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-muted/20 rounded-lg">
                        <p className="text-sm font-medium">Recent Activity:</p>
                        <p className="text-sm text-muted-foreground">{competitor.recentActivity}</p>
                      </div>
                      
                      <Button variant="outline" className="w-full hover-lift">
                        <Eye className="h-4 w-4 mr-2" />
                        View Detailed Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
              <div className="space-y-6">
                {forecastData.map((forecast, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{forecast.hashtag}</h4>
                      <Badge variant="outline" className="text-xs">
                        {forecast.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Growth</p>
                        <p className="font-medium text-green-600">{forecast.currentGrowth}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Predicted Growth</p>
                        <p className="font-medium text-blue-600">{forecast.predictedGrowth}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Confidence Level</p>
                      <Progress value={forecast.confidence} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Key Factors:</p>
                      <div className="flex flex-wrap gap-1">
                        {forecast.factors.map((factor) => (
                          <Badge key={factor} variant="secondary" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm font-medium text-primary">
                        💡 {forecast.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enhanced Trend Detail Modal */}
      {selectedTrend && (
        <Dialog open={!!selectedTrend} onOpenChange={() => setSelectedTrend(null)}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
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
              
              <div className="grid md:grid-cols-2 gap-6">
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
                    <h4 className="font-medium mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Average Views:</span>
                        <span className="font-medium">{selectedTrend.avgViews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Share Rate:</span>
                        <span className="font-medium">{selectedTrend.shareRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conversion Rate:</span>
                        <span className="font-medium">{selectedTrend.conversionRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ROI:</span>
                        <span className="font-medium text-green-600">{selectedTrend.roi}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Market Analysis</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Competition Level:</span>
                        <Badge className={`${getCompetitionColor(selectedTrend.competition)} border-0 text-xs`}>
                          {selectedTrend.competition}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price Range:</span>
                        <span className="font-medium">{selectedTrend.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Peak Hours:</span>
                        <span className="font-medium">{selectedTrend.peakHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Forecast:</span>
                        <div className="flex items-center gap-1">
                          {getForecastIcon(selectedTrend.forecast)}
                          <span className="font-medium capitalize">{selectedTrend.forecast}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Related Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTrend.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
                <Button variant="outline" onClick={() => toggleBookmark(selectedTrend.hashtag)}>
                  <Bookmark className={`h-4 w-4 mr-2 ${bookmarkedTrends.includes(selectedTrend.hashtag) ? 'fill-current' : ''}`} />
                  {bookmarkedTrends.includes(selectedTrend.hashtag) ? 'Bookmarked' : 'Bookmark'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}