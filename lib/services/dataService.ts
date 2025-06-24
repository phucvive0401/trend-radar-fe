import { DataFile, ChartSuggestion } from '@/types';

export class DataService {
  private static instance: DataService;

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  public async uploadFile(file: File): Promise<DataFile> {
    // Simulate file upload and processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newFile: DataFile = {
      id: Date.now().toString(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date(),
      status: 'processing',
      rows: Math.floor(Math.random() * 10000) + 1000,
      columns: this.detectColumns(file.name),
      preview: this.generatePreview(file.name),
      insights: []
    };

    // Simulate processing completion
    setTimeout(() => {
      newFile.status = 'ready';
      newFile.insights = this.generateInsights(file.name);
    }, 3000);

    return newFile;
  }

  public async generateChartSuggestions(file: DataFile): Promise<ChartSuggestion[]> {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    return [
      {
        id: '1',
        type: 'line',
        title: 'Trend Analysis Over Time',
        description: 'Shows progression of key metrics with seasonal patterns',
        xAxis: 'date',
        yAxis: 'value',
        confidence: 95,
        insight: 'Strong upward trend with weekly cycles',
        actionable: true
      },
      {
        id: '2',
        type: 'bar',
        title: 'Category Performance Comparison',
        description: 'Compares performance across different categories',
        xAxis: 'category',
        yAxis: 'performance',
        confidence: 88,
        insight: 'Category A outperforms by 34%',
        actionable: true
      }
    ];
  }

  private detectColumns(fileName: string): string[] {
    if (fileName.includes('sales')) {
      return ['date', 'product_id', 'revenue', 'quantity', 'category', 'platform'];
    }
    if (fileName.includes('engagement')) {
      return ['post_id', 'likes', 'shares', 'comments', 'reach', 'hashtags'];
    }
    return ['column1', 'column2', 'column3', 'column4'];
  }

  private generatePreview(fileName: string): any[] {
    if (fileName.includes('sales')) {
      return [
        { date: '2024-01-15', product_id: 'P001', revenue: 245.50, quantity: 3, category: 'Fashion', platform: 'Shopee' },
        { date: '2024-01-15', product_id: 'P002', revenue: 89.99, quantity: 1, category: 'Tech', platform: 'TikTok' },
        { date: '2024-01-16', product_id: 'P003', revenue: 156.75, quantity: 2, category: 'Home', platform: 'Instagram' },
      ];
    }
    return [
      { column1: 'Sample', column2: 'Data', column3: 123, column4: 'Value' },
      { column1: 'Example', column2: 'Row', column3: 456, column4: 'Test' },
    ];
  }

  private generateInsights(fileName: string): string[] {
    if (fileName.includes('sales')) {
      return [
        'Data quality score: 96%',
        'No missing values detected',
        'Strong correlation between category and revenue',
        'Weekend sales show 23% higher conversion'
      ];
    }
    return [
      'Data quality score: 94%',
      'No missing values detected',
      'Ready for analysis'
    ];
  }
}