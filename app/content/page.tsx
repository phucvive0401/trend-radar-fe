'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { 
  Video, 
  Image, 
  Type, 
  Calendar as CalendarIcon, 
  Send, 
  Copy,
  Sparkles,
  RotateCcw,
  Clock,
  Users,
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  Bot,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Play,
  Pause,
  Settings,
  Download,
  Upload,
  Star,
  CheckCircle,
  AlertCircle,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

const templates = [
  {
    id: 1,
    name: 'Product Launch',
    category: 'E-commerce',
    content: '🚀 Introducing our latest innovation! [Product Name] is here to revolutionize your [category]. Get yours now with 20% off! #NewProduct #Innovation',
    engagement: '8.4%',
    platforms: ['TikTok', 'Instagram'],
    performance: 'High',
  },
  {
    id: 2,
    name: 'Behind the Scenes',
    category: 'Lifestyle',
    content: '✨ Take a peek behind the scenes! Here\'s how we create magic at [Brand Name]. What would you like to see more of? #BehindTheScenes #Team',
    engagement: '6.7%',
    platforms: ['Instagram', 'Facebook'],
    performance: 'Medium',
  },
  {
    id: 3,
    name: 'User Generated Content',
    category: 'Community',
    content: '💕 We love seeing how you use [Product Name]! Thank you @[username] for sharing this amazing shot. Tag us for a chance to be featured! #UserGenerated',
    engagement: '9.2%',
    platforms: ['Instagram', 'TikTok'],
    performance: 'High',
  },
  {
    id: 4,
    name: 'Trending Challenge',
    category: 'Viral',
    content: '🔥 Join the #[TrendingHashtag] challenge! Show us your creativity and win amazing prizes. Tag 3 friends to spread the fun! 🎉',
    engagement: '12.1%',
    platforms: ['TikTok'],
    performance: 'Very High',
  },
  {
    id: 5,
    name: 'Educational Content',
    category: 'Educational',
    content: '📚 Did you know? [Interesting Fact] about [Topic]. Swipe to learn more tips that will change your [relevant area]! 💡',
    engagement: '7.8%',
    platforms: ['Instagram', 'LinkedIn'],
    performance: 'Medium',
  },
];

const scheduledPosts = [
  {
    id: 1,
    content: 'Check out our sustainable fashion collection! 🌱 Perfect for eco-conscious style lovers.',
    platform: 'TikTok',
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    status: 'scheduled',
    engagement: '8.4%',
    hashtags: ['#SustainableFashion', '#EcoFriendly', '#Style'],
  },
  {
    id: 2,
    content: 'Behind the scenes of our latest photoshoot ✨ The magic happens here!',
    platform: 'Instagram',
    scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    status: 'scheduled',
    engagement: '6.7%',
    hashtags: ['#BehindTheScenes', '#Photography', '#Creative'],
  },
  {
    id: 3,
    content: 'New product alert! 🚨 Our smart fitness tracker is now available with 25% off.',
    platform: 'Facebook',
    scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: 'draft',
    engagement: '5.2%',
    hashtags: ['#FitnessTech', '#HealthTech', '#Discount'],
  },
];

const contentAnalytics = {
  totalPosts: 247,
  avgEngagement: '7.8%',
  topPerformer: '#SustainableFashion',
  bestTime: '2:00 PM - 4:00 PM',
  audienceGrowth: '+12.5%',
  reachIncrease: '+18.3%',
};

const aiSuggestions = [
  {
    type: 'hashtag',
    title: 'Trending Hashtag Opportunity',
    suggestion: '#EcoFriendlyTech is gaining 245% momentum',
    action: 'Create content around this trend',
    confidence: 94,
  },
  {
    type: 'timing',
    title: 'Optimal Posting Time',
    suggestion: 'Your audience is most active at 2-4 PM',
    action: 'Schedule posts during peak hours',
    confidence: 87,
  },
  {
    type: 'content',
    title: 'Content Type Recommendation',
    suggestion: 'Video content performs 3x better than images',
    action: 'Focus on video creation',
    confidence: 91,
  },
];

export default function ContentStudio() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [captionText, setCaptionText] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok');
  const [abTestVariations, setAbTestVariations] = useState<string[]>(['']);
  const [contentType, setContentType] = useState('post');
  const [targetAudience, setTargetAudience] = useState('general');

  const generateVariations = () => {
    const variations = [
      '🌟 Discover the secret to [benefit]! Our [product] will change your life. Try it now! #LifeChanger #MustHave',
      '💫 Ready to transform your [routine]? [Product] is the game-changer you\'ve been waiting for! #Transform #GameChanger',
      '✨ Experience the difference with [product]. Join thousands of happy customers! Limited time offer! #Experience #LimitedTime',
      '🔥 Don\'t miss out! [Product] is flying off the shelves. Get yours before it\'s gone! #DontMissOut #Flying',
      '💎 Treat yourself to luxury with [product]. You deserve the best! Premium quality at an affordable price. #Luxury #Affordable',
    ];
    setAbTestVariations(variations.slice(0, 5));
  };

  const addVariation = () => {
    if (abTestVariations.length < 5) {
      setAbTestVariations([...abTestVariations, '']);
    }
  };

  const updateVariation = (index: number, value: string) => {
    const updated = [...abTestVariations];
    updated[index] = value;
    setAbTestVariations(updated);
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Very High': return 'text-green-600 bg-green-50';
      case 'High': return 'text-blue-600 bg-blue-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'TikTok': return '🎵';
      case 'Instagram': return '📷';
      case 'Facebook': return '📘';
      case 'LinkedIn': return '💼';
      default: return '🌐';
    }
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Content Studio" 
        subtitle="AI-powered content creation and scheduling platform"
      />
      
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Content Creator</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Manager</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          <TabsTrigger value="templates">Template Library</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Enhanced Content Creation */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Type className="h-5 w-5" />
                      AI Content Composer
                    </span>
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Powered
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Content Type</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="post">Social Media Post</SelectItem>
                          <SelectItem value="story">Story Content</SelectItem>
                          <SelectItem value="reel">Reel/Short Video</SelectItem>
                          <SelectItem value="carousel">Carousel Post</SelectItem>
                          <SelectItem value="live">Live Stream</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Target Platform</Label>
                      <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tiktok">
                            <div className="flex items-center gap-2">
                              <span>🎵</span>
                              TikTok
                            </div>
                          </SelectItem>
                          <SelectItem value="instagram">
                            <div className="flex items-center gap-2">
                              <span>📷</span>
                              Instagram
                            </div>
                          </SelectItem>
                          <SelectItem value="facebook">
                            <div className="flex items-center gap-2">
                              <span>📘</span>
                              Facebook
                            </div>
                          </SelectItem>
                          <SelectItem value="shopee">
                            <div className="flex items-center gap-2">
                              <span>🛒</span>
                              Shopee
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Target Audience</Label>
                      <Select value={targetAudience} onValueChange={setTargetAudience}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Audience</SelectItem>
                          <SelectItem value="young-adults">Young Adults (18-25)</SelectItem>
                          <SelectItem value="millennials">Millennials (26-40)</SelectItem>
                          <SelectItem value="parents">Parents</SelectItem>
                          <SelectItem value="professionals">Professionals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Content Tone</Label>
                      <Select defaultValue="engaging">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual & Friendly</SelectItem>
                          <SelectItem value="engaging">Engaging & Fun</SelectItem>
                          <SelectItem value="inspiring">Inspiring</SelectItem>
                          <SelectItem value="urgent">Urgent & Compelling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Content Description</Label>
                    <Textarea
                      placeholder="Describe your content idea, product, or campaign..."
                      value={captionText}
                      onChange={(e) => setCaptionText(e.target.value)}
                      className="min-h-32"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {captionText.length}/2200 characters
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Sparkles className="h-4 w-4 mr-2" />
                          AI Enhance
                        </Button>
                        <Button variant="outline" size="sm">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Add Trending
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Hashtag Strategy</Label>
                      <Select defaultValue="trending">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trending">Trending Focus</SelectItem>
                          <SelectItem value="niche">Niche Specific</SelectItem>
                          <SelectItem value="branded">Brand Focused</SelectItem>
                          <SelectItem value="mixed">Mixed Strategy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">CTA Type</Label>
                      <Select defaultValue="engagement">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engagement">Engagement</SelectItem>
                          <SelectItem value="sales">Sales Driven</SelectItem>
                          <SelectItem value="awareness">Brand Awareness</SelectItem>
                          <SelectItem value="traffic">Drive Traffic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Content Length</Label>
                      <Select defaultValue="optimal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short & Punchy</SelectItem>
                          <SelectItem value="optimal">Platform Optimal</SelectItem>
                          <SelectItem value="detailed">Detailed & Informative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Content
                    </Button>
                    <Button variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button variant="outline">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced A/B Test Generator */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <RotateCcw className="h-5 w-5" />
                      A/B Test Variations
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {abTestVariations.filter(v => v.trim()).length}/5 variations
                      </Badge>
                      <Button variant="outline" size="sm" onClick={generateVariations}>
                        <Bot className="h-4 w-4 mr-2" />
                        AI Generate
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {abTestVariations.map((variation, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <BarChart3 className="h-3 w-3" />
                            Variation {index + 1}
                          </Badge>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Predicted Performance:</span>
                            <Badge variant="secondary" className="text-xs">
                              {Math.floor(Math.random() * 30) + 70}% engagement
                            </Badge>
                          </div>
                        </div>
                        <Textarea
                          placeholder={`Enter variation ${index + 1}...`}
                          value={variation}
                          onChange={(e) => updateVariation(index, e.target.value)}
                          className="min-h-20"
                        />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{variation.length} characters</span>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              Preview
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Target className="h-3 w-3 mr-1" />
                              Test
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {abTestVariations.length < 5 && (
                      <Button variant="outline" onClick={addVariation} className="w-full">
                        Add Variation ({abTestVariations.length}/5)
                      </Button>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Start A/B Test
                        </Button>
                        <Button variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Test Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* AI Suggestions */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {suggestion.type === 'hashtag' && <TrendingUp className="h-4 w-4 text-primary" />}
                          {suggestion.type === 'timing' && <Clock className="h-4 w-4 text-primary" />}
                          {suggestion.type === 'content' && <Video className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{suggestion.suggestion}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {suggestion.confidence}% confidence
                            </Badge>
                            <Button size="sm" variant="outline" className="h-6 text-xs">
                              Apply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Enhanced Template Library Preview */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Quick Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {templates.slice(0, 3).map((template) => (
                      <div
                        key={template.id}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors group"
                        onClick={() => setCaptionText(template.content)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <div className={`px-2 py-1 rounded-full text-xs ${getPerformanceColor(template.performance)}`}>
                            {template.performance}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {template.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {template.platforms.map((platform) => (
                              <span key={platform} className="text-xs">
                                {getPlatformIcon(platform)}
                              </span>
                            ))}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {template.engagement} avg
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    View All Templates
                  </Button>
                </CardContent>
              </Card>

              {/* Enhanced Media Upload */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Media Assets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors">
                      <Video className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag & drop your media files
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Images, videos, GIFs up to 50MB
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Browse Files
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Recent uploads</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          View All
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                            <Image className="h-6 w-6 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Scheduled Posts
                    </span>
                    <Badge variant="outline">
                      {scheduledPosts.filter(p => p.status === 'scheduled').length} scheduled
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheduledPosts.map((post) => (
                      <Card key={post.id} className="hover:bg-accent/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium">{post.platform}</h4>
                                <Badge 
                                  variant={post.status === 'scheduled' ? 'default' : 'secondary'}
                                  className="capitalize text-xs"
                                >
                                  {post.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {post.content}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {post.scheduledTime.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <BarChart3 className="h-3 w-3" />
                                  {post.engagement} expected
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {post.hashtags.map((hashtag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {hashtag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Calendar Widget */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Content Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  
                  <div className="mt-4 space-y-2">
                    <Label className="text-sm font-medium">Quick Schedule</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Clock className="h-3 w-3 mr-1" />
                        Peak Hours
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Optimal Time
                      </Button>
                    </div>
                    <Input type="time" className="w-full" />
                    <Button className="w-full" size="sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Schedule for {selectedDate?.toLocaleDateString()}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Preview */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Expected Reach</span>
                      <span className="font-medium">12.5K - 18.2K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Engagement Rate</span>
                      <span className="font-medium text-green-600">7.8% - 9.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Best Time Score</span>
                      <span className="font-medium">94/100</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Optimization Tips</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Add 2-3 trending hashtags</li>
                      <li>• Include a clear call-to-action</li>
                      <li>• Post during peak hours (2-4 PM)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                    <p className="text-2xl font-bold">{contentAnalytics.totalPosts}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Type className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+12.5%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Engagement</p>
                    <p className="text-2xl font-bold">{contentAnalytics.avgEngagement}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+2.3%</span>
                  <span className="text-muted-foreground ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Top Performer</p>
                    <p className="text-lg font-bold">{contentAnalytics.topPerformer}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">245%</span>
                  <span className="text-muted-foreground ml-1">growth rate</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Best Time</p>
                    <p className="text-lg font-bold">{contentAnalytics.bestTime}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Target className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-blue-600">94%</span>
                  <span className="text-muted-foreground ml-1">accuracy</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { platform: 'TikTok', engagement: 9.2, posts: 89, growth: '+15.3%' },
                    { platform: 'Instagram', engagement: 7.8, posts: 124, growth: '+8.7%' },
                    { platform: 'Facebook', engagement: 5.4, posts: 34, growth: '+12.1%' },
                  ].map((platform) => (
                    <div key={platform.platform} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getPlatformIcon(platform.platform)}</span>
                        <div>
                          <h4 className="font-medium">{platform.platform}</h4>
                          <p className="text-sm text-muted-foreground">{platform.posts} posts</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{platform.engagement}%</p>
                        <p className="text-sm text-green-600">{platform.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Content Type Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Video Content', engagement: 12.4, icon: Video, color: 'text-blue-600' },
                    { type: 'Image Posts', engagement: 8.7, icon: Image, color: 'text-green-600' },
                    { type: 'Carousel Posts', engagement: 6.9, icon: RotateCcw, color: 'text-purple-600' },
                    { type: 'Text Posts', engagement: 4.2, icon: Type, color: 'text-yellow-600' },
                  ].map((content) => (
                    <div key={content.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <content.icon className={`h-5 w-5 ${content.color}`} />
                        <span className="font-medium">{content.type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(content.engagement / 15) * 100}%` }}
                          />
                        </div>
                        <span className="font-semibold w-12 text-right">{content.engagement}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold mb-1">{template.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(template.performance)}`}>
                      {template.performance}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {template.content}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {template.platforms.map((platform) => (
                        <span key={platform} className="text-lg">
                          {getPlatformIcon(platform)}
                        </span>
                      ))}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {template.engagement} avg engagement
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setCaptionText(template.content)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}