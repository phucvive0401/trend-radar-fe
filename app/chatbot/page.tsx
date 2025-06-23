'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
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
  Mic,
  Image as ImageIcon,
  FileText,
  Download,
  Share2,
  Bookmark,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Brain,
  Target,
  Lightbulb
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
  confidence?: number;
  sources?: string[];
  actionItems?: string[];
  isTyping?: boolean;
}

const sampleQuestions = [
  "What are the top trending hashtags this week?",
  "Show me revenue comparison by platform",
  "Which products have the highest engagement rate?",
  "What's the sentiment analysis for #SustainableFashion?",
  "Compare TikTok vs Instagram performance",
  "Show me the forecast for next month's trends",
  "Analyze competitor pricing strategies",
  "What's the best time to post for maximum engagement?",
  "Generate content ideas for sustainable fashion",
  "Show ROI analysis for recent campaigns"
];

const quickActions = [
  { icon: TrendingUp, label: "Trend Analysis", query: "Show me the latest trending hashtags with growth analysis" },
  { icon: BarChart3, label: "Performance Report", query: "Generate a comprehensive performance report for this week" },
  { icon: Target, label: "Campaign Ideas", query: "Suggest campaign ideas based on current trends" },
  { icon: Lightbulb, label: "Content Strategy", query: "Help me develop a content strategy for next month" }
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
      { day: 'Sat', revenue: 5800, searches: 1700 },
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
      content: "Hi! I'm your AI trend analyst powered by advanced machine learning. I can help you analyze trends, generate insights, create reports, and provide strategic recommendations. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "Show trending hashtags",
        "Analyze competitor performance",
        "Revenue breakdown by platform",
        "Generate content ideas"
      ],
      confidence: 100
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [bookmarkedMessages, setBookmarkedMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check for URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      setInputValue(query);
      setTimeout(() => handleSendMessage(query), 500);
    }
  }, []);

  const handleSendMessage = async (customMessage?: string) => {
    const messageText = customMessage || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setChatHistory(prev => [...prev, messageText]);
    setInputValue('');
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate realistic AI processing time
    setTimeout(() => {
      setMessages(prev => prev.filter(m => !m.isTyping));
      
      const botResponse: Message = {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: generateBotResponse(messageText),
        timestamp: new Date(),
        chart: shouldIncludeChart(messageText) ? {
          type: getChartType(messageText),
          data: getChartData(messageText),
          title: getChartTitle(messageText)
        } : undefined,
        deepDiveLink: shouldIncludeChart(messageText) ? '/trends' : undefined,
        suggestions: generateSuggestions(messageText),
        confidence: Math.floor(Math.random() * 20) + 80,
        sources: generateSources(messageText),
        actionItems: generateActionItems(messageText)
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000 + Math.random() * 1000);
  };

  const generateBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('trending') || lowerQuestion.includes('hashtag')) {
      return "Based on real-time analysis across multiple platforms, #SustainableFashion is showing exceptional growth at +245% this week, driven by increased consumer awareness and influencer adoption. #TechGadgets2024 follows at +189% with strong performance on TikTok. The sustainable fashion trend shows particularly strong engagement rates of 8.4% compared to the platform average of 3.2%.";
    }
    
    if (lowerQuestion.includes('revenue') || lowerQuestion.includes('sales') || lowerQuestion.includes('performance')) {
      return "Your revenue performance shows strong momentum with a 12.5% increase compared to last month. Peak performance occurred on Friday with $6,100 in daily revenue, correlating with high search volume. The data indicates optimal posting times between 2-4 PM for maximum conversion. I've generated a detailed chart showing the revenue-search volume correlation below.";
    }
    
    if (lowerQuestion.includes('engagement') || lowerQuestion.includes('content')) {
      return "Engagement analysis reveals that sustainable fashion content achieves the highest rates at 8.4% average, followed by fitness motivation at 7.1%. Video content consistently outperforms static posts by 3x across all platforms. The optimal content mix appears to be 60% video, 30% carousel posts, and 10% static images for maximum engagement.";
    }
    
    if (lowerQuestion.includes('sentiment') || lowerQuestion.includes('analysis')) {
      return "Sentiment analysis across 50K+ mentions shows overwhelmingly positive reception: 75% positive, 20% neutral, and only 5% negative sentiment. #SustainableFashion demonstrates particularly strong positive sentiment at 89%, indicating high brand affinity and purchase intent. Key positive drivers include 'eco-friendly', 'quality', and 'stylish' mentions.";
    }
    
    if (lowerQuestion.includes('competitor') || lowerQuestion.includes('compare')) {
      return "Competitive analysis reveals BrandA leads with 23% market share but shows vulnerability in pricing strategy. BrandC is emerging as a strong competitor with +15% growth and viral TikTok campaigns. Your positioning in the sustainable segment provides a competitive advantage with 89% positive sentiment vs. industry average of 65%.";
    }
    
    if (lowerQuestion.includes('forecast') || lowerQuestion.includes('predict')) {
      return "ML-powered forecasting indicates #SustainableFashion will continue strong growth, potentially reaching +320% by month-end with 89% confidence. Seasonal factors and increasing brand partnerships support this projection. I recommend increasing content production by 40% to capitalize on this trend window.";
    }
    
    if (lowerQuestion.includes('campaign') || lowerQuestion.includes('strategy')) {
      return "Based on current trend analysis, I recommend a multi-platform campaign focusing on sustainable fashion during peak hours (2-4 PM). Suggested content mix: 60% educational content about sustainability, 30% product showcases, 10% user-generated content. Expected ROI: +156% based on similar campaigns.";
    }
    
    return "I've analyzed your query using advanced ML algorithms and cross-referenced it with real-time market data. The insights show positive trends across your key metrics with several optimization opportunities. Would you like me to dive deeper into any specific area or generate actionable recommendations?";
  };

  const generateSuggestions = (question: string): string[] => {
    const suggestions = [
      "Show me more details about this trend",
      "Compare with last month's data",
      "Generate an action plan",
      "Export this analysis",
      "Set up alerts for similar trends",
      "Create a campaign brief",
      "Analyze competitor response",
      "Show related opportunities"
    ];
    return suggestions.slice(0, 4);
  };

  const generateSources = (question: string): string[] => {
    return [
      "TikTok Analytics API",
      "Instagram Business API", 
      "Google Trends",
      "Internal Sales Data",
      "Competitor Intelligence"
    ];
  };

  const generateActionItems = (question: string): string[] => {
    const actions = [
      "Increase content production for trending hashtags",
      "Optimize posting schedule for peak engagement",
      "Develop sustainable fashion content series",
      "Monitor competitor pricing strategies",
      "Set up automated trend alerts"
    ];
    return actions.slice(0, 3);
  };

  const shouldIncludeChart = (question: string): boolean => {
    const chartKeywords = ['revenue', 'trend', 'performance', 'comparison', 'show me', 'chart', 'graph', 'data'];
    return chartKeywords.some(keyword => question.toLowerCase().includes(keyword));
  };

  const getChartType = (question: string): 'line' | 'bar' | 'pie' => {
    if (question.toLowerCase().includes('trend') || question.toLowerCase().includes('time')) return 'line';
    if (question.toLowerCase().includes('compare') || question.toLowerCase().includes('hashtag')) return 'bar';
    return 'line';
  };

  const getChartData = (question: string) => {
    return getChartType(question) === 'line' ? mockChartData.line.data : mockChartData.bar.data;
  };

  const getChartTitle = (question: string): string => {
    if (question.toLowerCase().includes('hashtag')) return mockChartData.bar.title;
    return mockChartData.line.title;
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const bookmarkMessage = (messageId: string) => {
    setBookmarkedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const exportChat = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: messages.filter(m => !m.isTyping),
      summary: "AI Trend Analysis Chat Session"
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trend-chat-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const MiniChart = ({ chart }: { chart: Message['chart'] }) => {
    if (!chart) return null;

    return (
      <div className="mt-4 p-4 bg-gradient-to-br from-primary/5 to-chart-1/5 rounded-lg border border-primary/10">
        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          {chart.title}
        </h4>
        <div className="h-32 flex items-end gap-1">
          {chart.data.map((item: any, index: number) => {
            const value = item.revenue || item.posts || item.engagement || 0;
            const maxValue = Math.max(...chart.data.map((d: any) => d.revenue || d.posts || d.engagement || 0));
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div 
                  className="w-full bg-gradient-to-t from-primary to-chart-1 rounded-t transition-all duration-300 group-hover:from-primary/80 group-hover:to-chart-1/80"
                  style={{ 
                    height: `${(value / maxValue) * 100}%`,
                    minHeight: '8px'
                  }}
                />
                <span className="text-xs text-muted-foreground mt-1 font-medium">
                  {item.day || item.hashtag?.slice(0, 8) || `Item ${index + 1}`}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Hover over bars for detailed values
        </div>
      </div>
    );
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="animate-pulse bg-green-100 text-green-800">
        <div className="status-dot status-online mr-1"></div>
        AI Online
      </Badge>
      <Button variant="outline" size="sm" className="hover-lift" onClick={exportChat}>
        <Download className="h-4 w-4 mr-2" />
        Export Chat
      </Button>
      <Button variant="outline" size="sm" className="hover-lift" onClick={() => setMessages([messages[0]])}>
        <RefreshCw className="h-4 w-4 mr-2" />
        New Chat
      </Button>
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-in-up">
      <Header 
        title="Trend Chatbot" 
        subtitle="AI-powered natural language analytics"
        actions={headerActions}
      />
      
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Enhanced Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[700px] flex flex-col hover-lift">
            <CardHeader className="flex-shrink-0 border-b bg-gradient-to-r from-primary/5 to-chart-1/5">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Bot className="h-6 w-6 text-primary" />
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span>AI Trend Analyst</span>
                  <Badge variant="secondary" className="bg-gradient-to-r from-primary to-chart-1 text-primary-foreground">
                    <Sparkles className="h-3 w-3 mr-1" />
                    GPT-4 Powered
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span>Advanced ML</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-600">Response time: <2s</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in-up`}
                    >
                      {message.type === 'bot' && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-1 flex items-center justify-center">
                            {message.isTyping ? (
                              <Loader2 className="h-5 w-5 text-primary-foreground animate-spin" />
                            ) : (
                              <Bot className="h-5 w-5 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className={`max-w-[85%] ${message.type === 'user' ? 'order-1' : ''}`}>
                        <div
                          className={`rounded-2xl p-4 transition-all duration-200 hover-lift ${
                            message.type === 'user'
                              ? 'bg-gradient-to-br from-primary to-chart-1 text-primary-foreground ml-auto'
                              : 'bg-muted/50 border'
                          }`}
                        >
                          {message.isTyping ? (
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              </div>
                              <span className="text-sm text-muted-foreground">AI is analyzing...</span>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              
                              {message.confidence && message.type === 'bot' && (
                                <div className="mt-3 p-2 bg-white/50 rounded-lg">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">Confidence Level</span>
                                    <span className="font-medium">{message.confidence}%</span>
                                  </div>
                                  <Progress value={message.confidence} className="h-1" />
                                </div>
                              )}
                              
                              {message.chart && <MiniChart chart={message.chart} />}
                              
                              {message.sources && message.type === 'bot' && (
                                <div className="mt-3 p-2 bg-white/50 rounded-lg">
                                  <p className="text-xs text-muted-foreground font-medium mb-1">Data Sources:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {message.sources.map((source, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {source}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {message.actionItems && message.type === 'bot' && (
                                <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                  <p className="text-xs font-medium mb-2 flex items-center gap-1">
                                    <Target className="h-3 w-3" />
                                    Recommended Actions:
                                  </p>
                                  <ul className="text-xs space-y-1">
                                    {message.actionItems.map((action, index) => (
                                      <li key={index} className="flex items-start gap-1">
                                        <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                        {action}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {message.suggestions && message.type === 'bot' && (
                                <div className="mt-3 space-y-2">
                                  <p className="text-xs text-muted-foreground font-medium">Suggested follow-ups:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {message.suggestions.map((suggestion, index) => (
                                      <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        className="text-xs h-7 hover-lift"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                      >
                                        {suggestion}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {message.deepDiveLink && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-3 hover-lift"
                                  asChild
                                >
                                  <a href={message.deepDiveLink}>
                                    <ExternalLink className="h-3 w-3 mr-2" />
                                    Deep Dive Analysis
                                  </a>
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                        
                        {!message.isTyping && (
                          <div className="flex items-center justify-between mt-2 px-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                            
                            {message.type === 'bot' && (
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 hover-lift"
                                  onClick={() => copyMessage(message.content)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 hover-lift"
                                  onClick={() => bookmarkMessage(message.id)}
                                >
                                  <Bookmark className={`h-3 w-3 ${bookmarkedMessages.includes(message.id) ? 'fill-current text-blue-600' : ''}`} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 hover-lift">
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 hover-lift">
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
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
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
              
              <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Ask me about trends, revenue, engagement, or anything else..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      className="pr-20 focus-ring"
                      disabled={isTyping}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover-lift"
                        onClick={() => setIsListening(!isListening)}
                      >
                        <Mic className={`h-3 w-3 ${isListening ? 'text-red-500' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 hover-lift">
                        <ImageIcon className="h-3 w-3 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleSendMessage()} 
                    disabled={!inputValue.trim() || isTyping}
                    className="gradient-bg hover-lift"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3 whitespace-normal hover-lift focus-ring"
                  onClick={() => handleQuickAction(action.query)}
                >
                  <action.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Sample Questions */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Sample Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sampleQuestions.slice(0, 6).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3 whitespace-normal hover-lift focus-ring"
                  onClick={() => handleSampleQuestion(question)}
                >
                  <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" />
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Stats */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                AI Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Queries Today</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Response</span>
                <span className="font-medium text-green-600">1.2s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Accuracy</span>
                <span className="font-medium text-primary">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Satisfaction</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">4.8</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Bookmarked</span>
                  <span className="font-medium">{bookmarkedMessages.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pro Tips */}
          <Card className="hover-lift border-primary/20 bg-gradient-to-br from-primary/5 to-chart-1/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Lightbulb className="h-5 w-5" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Ask specific questions for better insights</p>
              <p>• Use "compare" for side-by-side analysis</p>
              <p>• Request charts with "show me" or "visualize"</p>
              <p>• Try voice input for hands-free queries</p>
              <p>• Bookmark important responses for later</p>
              <p>• Export chat sessions for reports</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}