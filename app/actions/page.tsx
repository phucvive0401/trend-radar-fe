'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus,
  ShoppingCart, 
  Wand2, 
  Calendar, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Package,
  Sparkles,
  Target,
  Send,
  Bot,
  Zap,
  BarChart3,
  Users,
  DollarSign,
  Eye,
  ArrowUpRight,
  Play,
  Pause,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Timer,
  Lightbulb,
  Rocket,
  Star
} from 'lucide-react';

const suggestedProducts = [
  {
    id: 1,
    name: 'Eco-Friendly Water Bottle',
    category: 'Sustainability',
    confidence: 95,
    expectedSales: '$2,400',
    trend: '#SustainableLiving',
    inStock: true,
    profitMargin: '45%',
    competitorPrice: '$32',
    suggestedPrice: '$28',
    demandScore: 8.7,
    riskLevel: 'Low',
    timeToMarket: '3-5 days',
    suppliers: 12,
    reviews: 4.8,
    marketSize: 'Large',
  },
  {
    id: 2,
    name: 'Smart Fitness Tracker',
    category: 'Technology',
    confidence: 88,
    expectedSales: '$4,200',
    trend: '#FitnessTech',
    inStock: false,
    profitMargin: '38%',
    competitorPrice: '$89',
    suggestedPrice: '$79',
    demandScore: 9.2,
    riskLevel: 'Medium',
    timeToMarket: '7-10 days',
    suppliers: 8,
    reviews: 4.6,
    marketSize: 'Growing',
  },
  {
    id: 3,
    name: 'Organic Skincare Set',
    category: 'Beauty',
    confidence: 92,
    expectedSales: '$1,800',
    trend: '#CleanBeauty',
    inStock: true,
    profitMargin: '52%',
    competitorPrice: '$45',
    suggestedPrice: '$42',
    demandScore: 8.1,
    riskLevel: 'Low',
    timeToMarket: '2-4 days',
    suppliers: 15,
    reviews: 4.9,
    marketSize: 'Stable',
  },
];

const automationWorkflows = [
  {
    id: 1,
    name: 'Trending Product Alert',
    description: 'Automatically detect and import trending products',
    status: 'active',
    lastRun: new Date(Date.now() - 30 * 60 * 1000),
    nextRun: new Date(Date.now() + 30 * 60 * 1000),
    frequency: 'Every 30 minutes',
    successRate: 94,
    itemsProcessed: 1247,
    triggers: ['Trend spike > 200%', 'Confidence > 85%'],
    actions: ['Import product', 'Generate content', 'Schedule posts'],
  },
  {
    id: 2,
    name: 'Content Generation Pipeline',
    description: 'Auto-generate and schedule social media content',
    status: 'active',
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 4 * 60 * 60 * 1000),
    frequency: 'Every 6 hours',
    successRate: 87,
    itemsProcessed: 342,
    triggers: ['New product imported', 'Trend confidence > 80%'],
    actions: ['Generate captions', 'Create variations', 'Schedule posts'],
  },
  {
    id: 3,
    name: 'Competitor Price Monitor',
    description: 'Monitor competitor pricing and adjust automatically',
    status: 'paused',
    lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
    nextRun: null,
    frequency: 'Daily',
    successRate: 91,
    itemsProcessed: 89,
    triggers: ['Price change detected', 'Market shift > 10%'],
    actions: ['Update pricing', 'Send alert', 'Generate report'],
  },
];

const taskList = [
  { 
    id: 1, 
    task: 'Update product descriptions for trending items', 
    completed: false, 
    priority: 'high',
    assignee: 'AI Assistant',
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    estimatedTime: '15 min',
    category: 'Content',
    automatable: true,
  },
  { 
    id: 2, 
    task: 'Schedule TikTok posts for #SustainableFashion', 
    completed: true, 
    priority: 'medium',
    assignee: 'Marketing Team',
    dueDate: new Date(Date.now() - 30 * 60 * 1000),
    estimatedTime: '30 min',
    category: 'Social Media',
    automatable: true,
  },
  { 
    id: 3, 
    task: 'Analyze competitor pricing strategy', 
    completed: false, 
    priority: 'low',
    assignee: 'Analytics Team',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    estimatedTime: '2 hours',
    category: 'Research',
    automatable: false,
  },
  { 
    id: 4, 
    task: 'Create A/B test for new ad campaign', 
    completed: false, 
    priority: 'high',
    assignee: 'Marketing Team',
    dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
    estimatedTime: '45 min',
    category: 'Advertising',
    automatable: true,
  },
];

const aiInsights = [
  {
    type: 'opportunity',
    title: 'High-Potential Product Detected',
    message: 'Smart Fitness Tracker shows 320% growth potential with low competition',
    confidence: 94,
    action: 'Import Now',
    impact: 'High Revenue',
    timeframe: '24-48 hours',
  },
  {
    type: 'warning',
    title: 'Market Saturation Alert',
    message: 'Phone accessories market showing signs of oversaturation',
    confidence: 87,
    action: 'Diversify Portfolio',
    impact: 'Risk Mitigation',
    timeframe: '1-2 weeks',
  },
  {
    type: 'trend',
    title: 'Emerging Trend Spotted',
    message: '#EcoFriendlyTech gaining momentum across all platforms',
    confidence: 91,
    action: 'Create Content',
    impact: 'Early Mover Advantage',
    timeframe: '3-5 days',
  },
];

export default function ActionCenter() {
  const [selectedTone, setSelectedTone] = useState('professional');
  const [captionPrompt, setCaptionPrompt] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [automationEnabled, setAutomationEnabled] = useState(true);

  const handleTaskToggle = (taskId: number) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="h-4 w-4 text-green-600" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Rocket className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'trend':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      default:
        return <Lightbulb className="h-5 w-5 text-purple-600" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'High': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Action Center" 
        subtitle="AI-powered recommendations and automation hub"
      />
      
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Smart Product Discovery</TabsTrigger>
          <TabsTrigger value="automation">Automation Workflows</TabsTrigger>
          <TabsTrigger value="content">Content Generation</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* AI Insights Banner */}
          <div className="grid gap-4 md:grid-cols-3">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{insight.message}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}% confidence
                        </Badge>
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          {insight.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Product Recommendations */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    AI-Recommended Products
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Powered
                    </Badge>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {suggestedProducts.map((product) => (
                    <Card key={product.id} className="hover:shadow-md transition-all cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-lg">{product.name}</h4>
                              <Badge variant="outline">{product.category}</Badge>
                              <Badge className={`${getRiskColor(product.riskLevel)} border-0`}>
                                {product.riskLevel} Risk
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Expected Sales</div>
                                <div className="font-semibold text-green-600">{product.expectedSales}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Profit Margin</div>
                                <div className="font-semibold">{product.profitMargin}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Demand Score</div>
                                <div className="font-semibold flex items-center gap-1">
                                  {product.demandScore}/10
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Time to Market</div>
                                <div className="font-semibold">{product.timeToMarket}</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Suggested Price</div>
                                  <div className="font-medium">{product.suggestedPrice}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Suppliers</div>
                                  <div className="font-medium">{product.suppliers} available</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Reviews</div>
                                  <div className="font-medium">{product.reviews}/5.0</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Market Size</div>
                                  <div className="font-medium">{product.marketSize}</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                              <Badge variant="outline" className="text-xs">
                                {product.trend}
                              </Badge>
                              <Badge variant={product.inStock ? 'default' : 'secondary'} className="text-xs">
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {product.confidence}% AI Confidence
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button className="flex-1">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Import Product
                          </Button>
                          <Button variant="outline">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Analyze Market
                          </Button>
                          <Button variant="outline">
                            <Wand2 className="h-4 w-4 mr-2" />
                            Generate Content
                          </Button>
                          <Button variant="outline" size="sm">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Automation Workflows
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      {automationWorkflows.filter(w => w.status === 'active').length} Active
                    </Badge>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Workflow
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automationWorkflows.map((workflow) => (
                    <Card key={workflow.id} className="hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              {getStatusIcon(workflow.status)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-1">{workflow.name}</h4>
                              <p className="text-muted-foreground text-sm mb-3">{workflow.description}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                  <div className="text-xs text-muted-foreground">Success Rate</div>
                                  <div className="font-semibold text-green-600">{workflow.successRate}%</div>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground">Items Processed</div>
                                  <div className="font-semibold">{workflow.itemsProcessed.toLocaleString()}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground">Frequency</div>
                                  <div className="font-semibold">{workflow.frequency}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground">Next Run</div>
                                  <div className="font-semibold">
                                    {workflow.nextRun ? workflow.nextRun.toLocaleTimeString() : 'Paused'}
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div>
                                  <div className="text-xs text-muted-foreground mb-1">Triggers</div>
                                  <div className="flex flex-wrap gap-1">
                                    {workflow.triggers.map((trigger, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {trigger}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground mb-1">Actions</div>
                                  <div className="flex flex-wrap gap-1">
                                    {workflow.actions.map((action, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {action}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={workflow.status === 'active' ? 'default' : 
                                      workflow.status === 'paused' ? 'secondary' : 'destructive'}
                              className="capitalize"
                            >
                              {workflow.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Logs
                          </Button>
                          <Button variant="outline" size="sm">
                            {workflow.status === 'active' ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Resume
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Enhanced Auto Caption Generator */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  AI Content Generator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Content Type</Label>
                    <Select defaultValue="social-post">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social-post">Social Media Post</SelectItem>
                        <SelectItem value="product-description">Product Description</SelectItem>
                        <SelectItem value="ad-copy">Advertisement Copy</SelectItem>
                        <SelectItem value="email-campaign">Email Campaign</SelectItem>
                        <SelectItem value="blog-post">Blog Post</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Tone & Style</Label>
                    <Select value={selectedTone} onValueChange={setSelectedTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual & Friendly</SelectItem>
                        <SelectItem value="trendy">Trendy & Hip</SelectItem>
                        <SelectItem value="inspiring">Inspiring</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="urgent">Urgent & Compelling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Target Platform</Label>
                    <Select defaultValue="multi">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multi">Multi-Platform</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="shopee">Shopee</SelectItem>
                        <SelectItem value="lazada">Lazada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Content Prompt</Label>
                    <Textarea
                      placeholder="Describe your product, campaign, or content idea..."
                      value={captionPrompt}
                      onChange={(e) => setCaptionPrompt(e.target.value)}
                      className="min-h-24"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Target Audience</Label>
                      <Select defaultValue="general">
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
                      <Label className="text-sm font-medium mb-2 block">Content Length</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short (50-100 chars)</SelectItem>
                          <SelectItem value="medium">Medium (100-200 chars)</SelectItem>
                          <SelectItem value="long">Long (200+ chars)</SelectItem>
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
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Task Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Smart Task Manager
                  </span>
                  <Badge variant="outline">
                    {taskList.filter(t => !t.completed).length} pending
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {taskList.map((task) => (
                    <Card key={task.id} className="hover:bg-accent/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => handleTaskToggle(task.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {task.task}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {task.assignee}
                              </span>
                              <span className="flex items-center gap-1">
                                <Timer className="h-3 w-3" />
                                {task.estimatedTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {task.dueDate.toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge 
                                variant={
                                  task.priority === 'high' ? 'destructive' :
                                  task.priority === 'medium' ? 'default' : 'secondary'
                                }
                                className="text-xs"
                              >
                                {task.priority}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {task.category}
                              </Badge>
                              {task.automatable && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                  <Bot className="h-3 w-3 mr-1" />
                                  Automatable
                                </Badge>
                              )}
                            </div>
                          </div>
                          {task.completed && (
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t space-y-2">
                  <Button variant="outline" className="w-full">
                    <Target className="h-4 w-4 mr-2" />
                    Mark Selected as Complete
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Bot className="h-4 w-4 mr-2" />
                    Auto-Complete Eligible Tasks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="hover:shadow-lg transition-all group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{insight.message}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Confidence</span>
                          <span className="font-medium">{insight.confidence}%</span>
                        </div>
                        <Progress value={insight.confidence} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                        <div>
                          <span className="text-muted-foreground">Impact</span>
                          <div className="font-medium">{insight.impact}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Timeframe</span>
                          <div className="font-medium">{insight.timeframe}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    {insight.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}