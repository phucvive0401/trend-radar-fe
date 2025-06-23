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
  Mic,
  Image as ImageIcon
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
  "Show me the forecast for next month's trends"
];

const mockChartData = {
  line: {
    title: "Revenue Trend (Last 7 Days)",
    data: [
      { day: 'Mon', revenue: 4200 },
      { day: 'Tue', revenue: 3800 },
      { day: 'Wed', revenue: 5200 },
      { day: 'Thu', revenue: 4900 },
      { day: 'Fri', revenue: 6100 },
      { day: 'Sat', revenue: 5800 },
      { day: 'Sun', revenue: 4600 }
    ]
  },
  bar: {
    title: "Top Hashtags Performance",
    data: [
      { hashtag: '#SustainableFashion', posts: 2400 },
      { hashtag: '#TechGadgets', posts: 1800 },
      { hashtag: '#HomeDecor', posts: 1500 },
      { hashtag: '#Fitness', posts: 1200 }
    ]
  }
};

export default function TrendChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI trend analyst. Ask me anything about your data, trends, or performance metrics. I can provide insights and visualizations in real-time!",
      timestamp: new Date(),
      suggestions: [
        "Show trending hashtags",
        "Analyze competitor performance",
        "Revenue breakdown by platform"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate streaming response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date(),
        chart: shouldIncludeChart(inputValue) ? {
          type: 'line',
          data: mockChartData.line.data,
          title: mockChartData.line.title
        } : undefined,
        deepDiveLink: shouldIncludeChart(inputValue) ? '/trends' : undefined,
        suggestions: generateSuggestions(inputValue)
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('trending') || lowerQuestion.includes('hashtag')) {
      return "Based on the latest data, #SustainableFashion is trending up 245% this week, followed by #TechGadgets2024 at +189%. The growth is primarily driven by increased engagement on TikTok and Instagram platforms.";
    }
    
    if (lowerQuestion.includes('revenue') || lowerQuestion.includes('sales')) {
      return "Your revenue has shown strong performance this week with a 12.5% increase compared to last month. Peak performance was on Friday with $6,100 in daily revenue. The chart below shows the detailed breakdown.";
    }
    
    if (lowerQuestion.includes('engagement') || lowerQuestion.includes('performance')) {
      return "Engagement rates are highest for sustainable fashion content (8.4% avg) and tech gadgets (6.2% avg). Video content performs 3x better than static posts across all platforms.";
    }
    
    if (lowerQuestion.includes('sentiment')) {
      return "Sentiment analysis shows 75% positive, 20% neutral, and 5% negative mentions. #SustainableFashion has particularly strong positive sentiment at 89%.";
    }
    
    return "I've analyzed your query and found relevant insights. The data shows positive trends across your key metrics. Would you like me to dive deeper into any specific area?";
  };

  const generateSuggestions = (question: string): string[] => {
    const suggestions = [
      "Show me more details",
      "Compare with last month",
      "Export this data",
      "Set up alerts for this trend"
    ];
    return suggestions.slice(0, 3);
  };

  const shouldIncludeChart = (question: string): boolean => {
    const chartKeywords = ['revenue', 'trend', 'performance', 'comparison', 'show me'];
    return chartKeywords.some(keyword => question.toLowerCase().includes(keyword));
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
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
          {chart.data.map((item: any, index: number) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div 
                className="w-full bg-gradient-to-t from-primary to-chart-1 rounded-t transition-all duration-300 group-hover:from-primary/80 group-hover:to-chart-1/80"
                style={{ 
                  height: `${(item.revenue || item.posts) / Math.max(...chart.data.map((d: any) => d.revenue || d.posts)) * 100}%`,
                  minHeight: '8px'
                }}
              />
              <span className="text-xs text-muted-foreground mt-1 font-medium">
                {item.day || item.hashtag?.slice(0, 3)}
              </span>
            </div>
          ))}
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
      <Button variant="outline" size="sm" className="hover-lift">
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
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col hover-lift">
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
                    Beta
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-green-500" />
                  Response time: <span className="font-medium text-green-600">&lt;2s</span>
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
                            <Bot className="h-5 w-5 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                        <div
                          className={`rounded-2xl p-4 transition-all duration-200 hover-lift ${
                            message.type === 'user'
                              ? 'bg-gradient-to-br from-primary to-chart-1 text-primary-foreground ml-auto'
                              : 'bg-muted/50 border'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          
                          {message.chart && <MiniChart chart={message.chart} />}
                          
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
                        </div>
                        
                        <div className="flex items-center justify-between mt-2 px-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                          
                          {message.type === 'bot' && (
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6 hover-lift">
                                <Copy className="h-3 w-3" />
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
                    <div className="flex gap-4 animate-slide-in-up">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-1 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-primary-foreground animate-pulse" />
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
              
              <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Ask me about trends, revenue, engagement..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="pr-20 focus-ring"
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
                    onClick={handleSendMessage} 
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

        {/* Sample Questions Sidebar */}
        <div className="space-y-4">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Sample Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sampleQuestions.map((question, index) => (
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

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Quick Stats
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
            </CardContent>
          </Card>

          <Card className="hover-lift border-primary/20 bg-gradient-to-br from-primary/5 to-chart-1/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Zap className="h-5 w-5" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Ask specific questions for better insights</p>
              <p>• Use "compare" for side-by-side analysis</p>
              <p>• Request charts with "show me" or "visualize"</p>
              <p>• Try voice input for hands-free queries</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}