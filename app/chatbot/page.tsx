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
  Zap
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
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  const shouldIncludeChart = (question: string): boolean => {
    const chartKeywords = ['revenue', 'trend', 'performance', 'comparison', 'show me'];
    return chartKeywords.some(keyword => question.toLowerCase().includes(keyword));
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  const MiniChart = ({ chart }: { chart: Message['chart'] }) => {
    if (!chart) return null;

    return (
      <div className="mt-3 p-3 bg-muted/20 rounded-lg border">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          {chart.title}
        </h4>
        <div className="h-32 flex items-end gap-1">
          {chart.data.map((item: any, index: number) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-primary rounded-t"
                style={{ 
                  height: `${(item.revenue || item.posts) / Math.max(...chart.data.map((d: any) => d.revenue || d.posts)) * 100}%`,
                  minHeight: '4px'
                }}
              />
              <span className="text-xs text-muted-foreground mt-1">
                {item.day || item.hashtag?.slice(0, 3)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Trend Chatbot" 
        subtitle="AI-powered natural language analytics - Beta"
      />
      
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Trend Analyst
                <Badge variant="secondary" className="ml-2">Beta</Badge>
                <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  Response time: &lt;2s
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'bot' && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground ml-auto'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          
                          {message.chart && <MiniChart chart={message.chart} />}
                          
                          {message.deepDiveLink && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              asChild
                            >
                              <a href={message.deepDiveLink}>
                                <ExternalLink className="h-3 w-3 mr-2" />
                                Deep Dive Analysis
                              </a>
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary animate-pulse" />
                        </div>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
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
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me about trends, revenue, engagement..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sample Questions Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Sample Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3 whitespace-normal"
                  onClick={() => handleSampleQuestion(question)}
                >
                  <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" />
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Queries Today</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Response</span>
                <span className="font-medium">1.2s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Accuracy</span>
                <span className="font-medium">94%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}