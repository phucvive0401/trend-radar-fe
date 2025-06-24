export interface ChatMessage {
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

export class ChatbotService {
  private static instance: ChatbotService;

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  public async sendMessage(message: string): Promise<ChatMessage> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = this.generateResponse(message);
    
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response.content,
      timestamp: new Date(),
      chart: response.chart,
      deepDiveLink: response.deepDiveLink,
      suggestions: response.suggestions,
    };
  }

  private generateResponse(question: string): {
    content: string;
    chart?: any;
    deepDiveLink?: string;
    suggestions: string[];
  } {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('trending') || lowerQuestion.includes('hashtag')) {
      return {
        content: "📈 **Current Trending Analysis:**\n\n#SustainableFashion is leading with **+245% growth** this week, driven by increased eco-consciousness. #TechGadgets2024 follows at **+189%** with strong TikTok engagement.\n\n**Key Insights:**\n• Peak engagement: 2-4 PM daily\n• Best platforms: TikTok, Instagram\n• Audience: 18-34 demographics\n\n*The chart below shows detailed performance metrics.*",
        chart: {
          type: 'line',
          data: [
            { day: 'Mon', revenue: 4200, searches: 1200 },
            { day: 'Tue', revenue: 3800, searches: 1100 },
            { day: 'Wed', revenue: 5200, searches: 1500 },
            { day: 'Thu', revenue: 4900, searches: 1400 },
            { day: 'Fri', revenue: 6100, searches: 1800 },
            { day: 'Sat', revenue: 5800, searches: 1600 },
            { day: 'Sun', revenue: 4600, searches: 1300 }
          ],
          title: "Trending Hashtags Performance"
        },
        deepDiveLink: '/trends',
        suggestions: [
          "Show me detailed breakdown",
          "Compare with last month",
          "What's driving this trend?",
          "Suggest optimization strategies"
        ]
      };
    }
    
    if (lowerQuestion.includes('revenue') || lowerQuestion.includes('sales')) {
      return {
        content: "💰 **Revenue Performance Summary:**\n\nYour revenue shows **+12.5% growth** this week with Friday being the peak day at **$6,100**. The correlation with search volume indicates strong organic demand.\n\n**Highlights:**\n• Total weekly revenue: $34,600\n• Best performing day: Friday\n• Growth trend: Accelerating\n• Conversion rate: 3.2% (↑0.4%)",
        suggestions: [
          "Show revenue by platform",
          "Analyze conversion funnel",
          "Compare with competitors",
          "Forecast next month"
        ]
      };
    }
    
    if (lowerQuestion.includes('engagement') || lowerQuestion.includes('performance')) {
      return {
        content: "🎯 **Engagement Analysis:**\n\nSustainable fashion content leads with **8.4% average engagement**, significantly above industry standard (5.2%). Video content performs **3x better** than static posts.\n\n**Top Performers:**\n• #SustainableFashion: 8.4% engagement\n• #TechGadgets: 6.2% engagement\n• #Fitness: 7.1% engagement\n\n**Recommendation:** Focus on video content during 2-4 PM peak hours.",
        suggestions: [
          "Content optimization tips",
          "Best posting times",
          "Platform comparison",
          "Audience insights"
        ]
      };
    }
    
    if (lowerQuestion.includes('competitor')) {
      return {
        content: "🏆 **Competitive Landscape:**\n\nYour market position is strong with **15% market share** in the sustainable fashion segment. BrandA leads at 23% but shows slowing growth.\n\n**Key Findings:**\n• Your engagement rate (7.3%) exceeds BrandA (6.8%)\n• Pricing advantage: 15% below market average\n• Growth rate: +15% vs industry +8%\n\n**Opportunity:** Capitalize on sustainability trend momentum.",
        suggestions: [
          "Detailed competitor analysis",
          "Pricing strategy review",
          "Market share trends",
          "Competitive advantages"
        ]
      };
    }
    
    return {
      content: "🤖 **Analysis Complete:**\n\nI've processed your query and found relevant insights across your data sources. The metrics show positive trends with opportunities for optimization.\n\n**Quick Summary:**\n• Data sources: 5 platforms analyzed\n• Time range: Last 7 days\n• Confidence level: 94%\n\nWould you like me to dive deeper into any specific area?",
      suggestions: [
        "Show me trending topics",
        "Analyze revenue performance",
        "Compare platform metrics",
        "Generate content ideas"
      ]
    };
  }
}