'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  BarChart3,
  ExternalLink,
  Sparkles,
  Clock,
  Zap,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Lightbulb,
  Target,
  ArrowUpRight
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  chart?: {
    type: 'line' | 'bar' | 'pie';
    data: any;
    title: string;
  };
  deepDiveLink?: string;
  streaming?: boolean;
  suggestions?: string[];
}

const sampleQuestions = [
  "What are the top trending hashtags this week?",
  "Show me revenue comparison by platform",
  "Which products have the highest engagement rate?",
  "What's the sentiment analysis for #SustainableFashion?",
  "Compare TikTok vs Instagram performance",
  "Show me the forecast for next month's trends",
  "What's the best time to post for maximum engagement?",
  "Which competitors are gaining market share?",
  "Analyze the ROI of our recent campaigns",
  "What content types perform best in our niche?"
];

const quickActions = [
  { label: "Trending Analysis", icon: TrendingUp, query: "Show me what's trending right now" },
  { label: "Revenue Insights", icon: BarChart3, query: "Analyze our revenue performance" },
  { label: "Competitor Check", icon: Target, query: "How are our competitors performing?" },
  { label: "Content Strategy", icon: Lightbulb, query: "Suggest content strategy improvements" },
];

const mockChartData = {
  line: {
    title: "Revenue Trend (Last 7 Days)",
    data: [
      { day: 'Mon', revenue: 4200, searches: 1200 },
      { day: 'Tue', revenue: 3800, searches: 1100 },
      { day: 'Wed', revenue: 5200, searches: 1500 },
      { day: 'Thu', revenue: 4900, searches: 1400 },
      { day: 'Fri', revenue: 6100, searches: 1800 },
      { day: 'Sat', revenue: 5800, searches: 1600 },
      { day: 'Sun', revenue: 4600, searches: 1300 }
    ]
  },
  bar: {
    title: "Top Hashtags Performance",
    data: [
      { hashtag: '#SustainableFashion', posts: 2400, engagement: 8.4 },
      { hashtag: '#TechGadgets', posts: 1800, engagement: 6.2 },
      { hashtag: '#HomeDecor', posts: 1500, engagement: 5.8 },
      { hashtag: '#Fitness', posts: 1200, engagement: 7.1 }
    ]
  }
};

export default function TrendChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "👋 Hi! I'm your AI Trend Analyst. I can help you discover insights, analyze performance, and forecast trends. Ask me anything about your data!",
      timestamp: new Date(),
      suggestions: [
        "What's trending today?",
        "Show revenue analytics",
        "Analyze competitor performance",
        "Suggest content ideas"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseTime, setResponseTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check for pre-filled question from URL
    const urlParams = new URLSearchParams(window.location.search);
    const question = urlParams.get('q');
    if (question) {
      setInputValue(question);
    }
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim()) return;

    const startTime = Date.now();
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate streaming response with realistic delay
    setTimeout(() => {
      const endTime = Date.now();
      setResponseTime(endTime - startTime);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(text),
        timestamp: new Date(),
        chart: shouldIncludeChart(text) ? {
          type: 'line',
          data: mockChartData.line.data,
          title: mockChartData.line.title
        } : undefined,
        deepDiveLink: shouldIncludeChart(text) ? '/trends' : undefined,
        suggestions: generateSuggestions(text),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 1000 + 800); // 0.8-1.8s response time
  };

  const generateBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('trending') || lowerQuestion.includes('hashtag')) {
      return "📈 **Current Trending Analysis:**\n\n#SustainableFashion is leading with **+245% growth** this week, driven by increased eco-consciousness. #TechGadgets2024 follows at **+189%** with strong TikTok engagement.\n\n**Key Insights:**\n• Peak engagement: 2-4 PM daily\n• Best platforms: TikTok, Instagram\n• Audience: 18-34 demographics\n\n*The chart below shows detailed performance metrics.*";
    }
    
    if (lowerQuestion.includes('revenue') || lowerQuestion.includes('sales')) {
      return "💰 **Revenue Performance Summary:**\n\nYour revenue shows **+12.5% growth** this week with Friday being the peak day at **$6,100**. The correlation with search volume indicates strong organic demand.\n\n**Highlights:**\n• Total weekly revenue: $34,600\n• Best performing day: Friday\n• Growth trend: Accelerating\n• Conversion rate: 3.2% (↑0.4%)";
    }
    
    if (lowerQuestion.includes('engagement') || lowerQuestion.includes('performance')) {
      return "🎯 **Engagement Analysis:**\n\nSustainable fashion content leads with **8.4% average engagement**, significantly above industry standard (5.2%). Video content performs **3x better** than static posts.\n\n**Top Performers:**\n• #SustainableFashion: 8.4% engagement\n• #TechGadgets: 6.2% engagement\n• #Fitness: 7.1% engagement\n\n**Recommendation:** Focus on video content during 2-4 PM peak hours.";
    }
    
    if (lowerQuestion.includes('sentiment')) {
      return "😊 **Sentiment Analysis Results:**\n\n**Overall Sentiment Score: 8.4/10**\n\n• **Positive:** 75% (↑5% from last week)\n• **Neutral:** 20% (stable)\n• **Negative:** 5% (↓2% improvement)\n\n#SustainableFashion shows exceptional **89% positive sentiment**, indicating strong brand alignment with values-driven consumers.";
    }

    if (lowerQuestion.includes('competitor')) {
      return "🏆 **Competitive Landscape:**\n\nYour market position is strong with **15% market share** in the sustainable fashion segment. BrandA leads at 23% but shows slowing growth.\n\n**Key Findings:**\n• Your engagement rate (7.3%) exceeds BrandA (6.8%)\n• Pricing advantage: 15% below market average\n• Growth rate: +15% vs industry +8%\n\n**Opportunity:** Capitalize on sustainability trend momentum.";
    }
    
    return "🤖 **Analysis Complete:**\n\nI've processed your query and found relevant insights across your data sources. The metrics show positive trends with opportunities for optimization.\n\n**Quick Summary:**\n• Data sources: 5 platforms analyzed\n• Time range: Last 7 days\n• Confidence level: 94%\n\nWould you like me to dive deeper into any specific area?";
  };

  const shouldIncludeChart = (question: string): boolean => {
    const chartKeywords = ['revenue', 'trend', 'performance', 'comparison', 'show me', 'analyze', 'chart'];
    return chartKeywords.some(keyword => question.toLowerCase().includes(keyword));
  };

  const generateSuggestions = (question: string): string[] => {
    const suggestions = [
      "Show me detailed breakdown",
      "Compare with last month",
      "What's driving this trend?",
      "Suggest optimization strategies"
    ];
    return suggestions.slice(0, 2);
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const MiniChart = ({ chart }: { chart: Message['chart'] }) => {
    if (!chart) return null;

    return (
      <div className="mt-4 p-4 bg-gradient-to-br from-primary/5 to-blue-50 rounded-lg border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            {chart.title}
          </h4>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <ExternalLink className="h-3 w-3 mr-1" />
            Full View
          </Button>
        </div>
        <div className="h-32 flex items-end gap-1 mb-2">
          {chart.data.map((item: any, index: number) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div 
                className="w-full bg-gradient-to-t from-primary to-blue-500 rounded-t hover:from-primary/80 hover:to-blue-500/80 transition-colors cursor-pointer"
                style={{ 
                  height: `${(item.revenue || item.posts || item.engagement * 10) / Math.max(...chart.data.map((d: any) => d.revenue || d.posts || d.engagement * 10)) * 100}%`,
                  minHeight: '8px'
                }}
              />
              <span className="text-xs text-muted-foreground mt-1 group-hover:text-primary transition-colors">
                {item.day || item.hashtag?.slice(0, 4) || index + 1}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Interactive chart • Click for details</span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Live data
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Header 
        title="AI Trend Analyst" 
        subtitle="Natural language analytics powered by advanced AI"
      />
      
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Enhanced Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col shadow-lg">
            <CardHeader className="flex-shrink-0 border-b bg-gradient-to-r from-primary/5 to-blue-50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span>AI Trend Analyst</span>
                    <Badge variant="secondary" className="ml-2 text-xs">Beta</Badge>
                  </div>
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    <span>Avg: {responseTime > 0 ? `${(responseTime/1000).toFixed(1)}s` : '<2s'}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'bot' && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-md">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}
                      
                      <div className={`max-w-[85%] ${message.type === 'user' ? 'order-1' : ''}`}>
                        <div
                          className={`rounded-2xl p-4 ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground ml-auto'
                              : 'bg-muted/50 border'
                          }`}
                        >
                          <div className="prose prose-sm max-w-none">
                            {message.content.split('\n').map((line, index) => (
                              <p key={index} className={`${index === 0 ? 'mt-0' : ''} ${message.type === 'user' ? 'text-primary-foreground' : ''}`}>
                                {line}
                              </p>
                            ))}
                          </div>
                          
                          {message.chart && <MiniChart chart={message.chart} />}
                          
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs"
                                  onClick={() => handleSendMessage(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                          {message.type === 'bot' && (
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => copyMessage(message.content)}>
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-white animate-pulse" />
                        </div>
                      </div>
                      <div className="bg-muted/50 border rounded-2xl p-4">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
              
              <div className="p-4 border-t bg-background">
                <div className="flex gap-3">
                  <Input
                    placeholder="Ask me about trends, revenue, engagement, or anything else..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 h-12"
                  />
                  <Button 
                    onClick={() => handleSendMessage()} 
                    disabled={!inputValue.trim() || isTyping}
                    className="h-12 px-6"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => handleQuickAction(action.query)}
                >
                  <action.icon className="h-4 w-4 mr-3 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-xs text-muted-foreground">{action.query}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Sample Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Sample Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-64 overflow-y-auto">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3 whitespace-normal hover:bg-primary/5"
                  onClick={() => handleSampleQuestion(question)}
                >
                  <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Session Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Queries Today</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Response</span>
                <span className="font-medium text-green-600">1.2s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Accuracy Score</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Sources</span>
                <span className="font-medium">5 platforms</span>
              </div>
              <div className="pt-3 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Chat History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}