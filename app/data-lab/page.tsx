'use client';

import React, { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Upload, 
  FileSpreadsheet, 
  BarChart3, 
  LineChart, 
  PieChart,
  Download,
  Eye,
  Sparkles,
  Database,
  AlertCircle,
  CheckCircle,
  Trash2,
  RefreshCw,
  Zap,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ArrowUpRight
} from 'lucide-react';

interface DataFile {
  id: string;
  name: string;
  size: string;
  uploadDate: Date;
  status: 'processing' | 'ready' | 'error';
  rows: number;
  columns: string[];
  preview: any[];
  insights?: string[];
}

interface ChartSuggestion {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'scatter';
  title: string;
  description: string;
  xAxis: string;
  yAxis: string;
  confidence: number;
  insight: string;
  actionable: boolean;
}

const mockDataFiles: DataFile[] = [
  {
    id: '1',
    name: 'sales_data_2024.csv',
    size: '2.4 MB',
    uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'ready',
    rows: 15420,
    columns: ['date', 'product_id', 'revenue', 'quantity', 'category', 'platform'],
    preview: [
      { date: '2024-01-15', product_id: 'P001', revenue: 245.50, quantity: 3, category: 'Fashion', platform: 'Shopee' },
      { date: '2024-01-15', product_id: 'P002', revenue: 89.99, quantity: 1, category: 'Tech', platform: 'TikTok' },
      { date: '2024-01-16', product_id: 'P003', revenue: 156.75, quantity: 2, category: 'Home', platform: 'Instagram' },
    ],
    insights: [
      'Fashion category shows 23% higher conversion rates',
      'Weekend sales peak at 2-4 PM consistently',
      'Shopee platform generates 34% of total revenue'
    ]
  },
  {
    id: '2',
    name: 'engagement_metrics.xlsx',
    size: '1.8 MB',
    uploadDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'ready',
    rows: 8750,
    columns: ['post_id', 'likes', 'shares', 'comments', 'reach', 'hashtags'],
    preview: [
      { post_id: 'POST001', likes: 1250, shares: 89, comments: 156, reach: 12500, hashtags: '#fashion #sustainable' },
      { post_id: 'POST002', likes: 890, shares: 45, comments: 78, reach: 8900, hashtags: '#tech #gadgets' },
    ],
    insights: [
      'Video posts generate 3x more engagement',
      '#sustainable hashtag increases reach by 45%',
      'Comments-to-likes ratio indicates high engagement quality'
    ]
  }
];

const mockChartSuggestions: ChartSuggestion[] = [
  {
    id: '1',
    type: 'line',
    title: 'Revenue Trend Over Time',
    description: 'Shows daily revenue progression with clear seasonal patterns and growth opportunities',
    xAxis: 'date',
    yAxis: 'revenue',
    confidence: 95,
    insight: 'Revenue shows 23% growth with Friday peaks',
    actionable: true
  },
  {
    id: '2',
    type: 'bar',
    title: 'Revenue by Platform',
    description: 'Compares total revenue across different sales platforms to identify top performers',
    xAxis: 'platform',
    yAxis: 'revenue',
    confidence: 88,
    insight: 'Shopee generates 34% of total revenue',
    actionable: true
  },
  {
    id: '3',
    type: 'pie',
    title: 'Category Distribution',
    description: 'Shows the proportion of sales by product category for strategic planning',
    xAxis: 'category',
    yAxis: 'quantity',
    confidence: 82,
    insight: 'Fashion dominates with 45% market share',
    actionable: false
  }
];

export default function DataLab() {
  const { permissions } = useAuth();
  const [selectedFile, setSelectedFile] = useState<DataFile | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dataFiles, setDataFiles] = useState<DataFile[]>(mockDataFiles);
  const [selectedChart, setSelectedChart] = useState<ChartSuggestion | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size exceeds 10MB limit');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new file to the list
          const newFile: DataFile = {
            id: Date.now().toString(),
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            uploadDate: new Date(),
            status: 'processing',
            rows: Math.floor(Math.random() * 10000) + 1000,
            columns: ['column1', 'column2', 'column3', 'column4'],
            preview: [],
            insights: []
          };
          
          setDataFiles(prev => [newFile, ...prev]);
          
          // Simulate processing completion
          setTimeout(() => {
            setDataFiles(prev => prev.map(f => 
              f.id === newFile.id ? { 
                ...f, 
                status: 'ready' as const,
                insights: [
                  'Data quality score: 94%',
                  'No missing values detected',
                  'Ready for analysis'
                ]
              } : f
            ));
          }, 2000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusIcon = (status: DataFile['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getChartIcon = (type: ChartSuggestion['type']) => {
    switch (type) {
      case 'bar':
        return <BarChart3 className="h-4 w-4" />;
      case 'line':
        return <LineChart className="h-4 w-4" />;
      case 'pie':
        return <PieChart className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  if (!permissions.canViewAnalytics) {
    return (
      <div className="space-y-6">
        <Header title="Data Lab" subtitle="Access denied" />
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">You don't have permission to access Data Lab.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header 
        title="Data Lab" 
        subtitle="Self-service BI - Upload, analyze, and visualize your data"
      />
      
      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Preview</TabsTrigger>
          <TabsTrigger value="analyze">AI Analysis</TabsTrigger>
          <TabsTrigger value="visualize">Visualizations</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Enhanced File Upload */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Data File
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    dragActive 
                      ? 'border-primary bg-primary/5 scale-105' 
                      : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                      <FileSpreadsheet className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Drop your files here</h3>
                      <p className="text-muted-foreground mb-4">
                        Support CSV, XLS, XLSX files up to 10MB
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Auto-detection</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-yellow-600" />
                          <span>Fast processing</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span>AI insights</span>
                        </div>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
                
                {isUploading && (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uploading...</span>
                      <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Processing file and generating insights...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced File List */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Uploaded Files</span>
                  <Badge variant="secondary">{dataFiles.length} files</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {dataFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedFile?.id === file.id ? 'border-primary bg-primary/5 shadow-md' : 'hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FileSpreadsheet className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-medium text-sm">{file.name}</span>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <span>{file.size}</span>
                              <span>•</span>
                              <span>{file.rows.toLocaleString()} rows</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(file.status)}
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {file.insights && file.insights.length > 0 && (
                        <div className="space-y-1">
                          {file.insights.slice(0, 2).map((insight, index) => (
                            <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                              <Sparkles className="h-3 w-3 text-yellow-500" />
                              {insight}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <span className="text-xs text-muted-foreground">
                          {file.uploadDate.toLocaleDateString()}
                        </span>
                        <Badge 
                          variant={file.status === 'ready' ? 'default' : 
                                  file.status === 'processing' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {file.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Data Preview */}
          {selectedFile && selectedFile.status === 'ready' && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Data Preview - {selectedFile.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="gap-1">
                        <Database className="h-3 w-3" />
                        {selectedFile.rows.toLocaleString()} rows
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <BarChart3 className="h-3 w-3" />
                        {selectedFile.columns.length} columns
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Clean Data
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          {selectedFile.columns.map((column) => (
                            <th key={column} className="border-b p-3 text-left text-sm font-medium">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedFile.preview.map((row, index) => (
                          <tr key={index} className="hover:bg-muted/25 transition-colors">
                            {selectedFile.columns.map((column) => (
                              <td key={column} className="border-b p-3 text-sm">
                                {row[column]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {selectedFile.insights && (
                    <div className="p-4 bg-gradient-to-r from-primary/5 to-blue-50 rounded-lg border">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        AI-Generated Insights
                      </h4>
                      <div className="space-y-2">
                        {selectedFile.insights.map((insight, index) => (
                          <div key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            {insight}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analyze" className="space-y-6">
          {selectedFile ? (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Chart Suggestions for {selectedFile.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {mockChartSuggestions.map((suggestion) => (
                    <Card 
                      key={suggestion.id} 
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                        selectedChart?.id === suggestion.id ? 'ring-2 ring-primary shadow-lg' : ''
                      }`}
                      onClick={() => setSelectedChart(suggestion)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              {getChartIcon(suggestion.type)}
                            </div>
                            <span className="font-medium text-sm">{suggestion.title}</span>
                          </div>
                          <Badge 
                            variant={suggestion.confidence >= 90 ? 'default' : 'secondary'} 
                            className="text-xs"
                          >
                            {suggestion.confidence}% match
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </p>
                        
                        <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-xs font-medium text-green-700">Key Insight</span>
                          </div>
                          <p className="text-xs text-green-700">{suggestion.insight}</p>
                        </div>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">X-Axis:</span>
                            <span className="font-medium">{suggestion.xAxis}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Y-Axis:</span>
                            <span className="font-medium">{suggestion.yAxis}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm">
                            <BarChart3 className="h-3 w-3 mr-2" />
                            Create Chart
                          </Button>
                          {suggestion.actionable && (
                            <Button variant="outline" size="sm">
                              <Target className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-blue-50 rounded-lg border">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">AI Recommendations</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on your data patterns, I recommend starting with the Revenue Trend chart to identify growth opportunities, then exploring platform performance to optimize your marketing strategy.
                  </p>
                  <Button variant="outline" size="sm">
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Generate All Suggested Charts
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Select a Data File</h3>
                  <p className="text-muted-foreground">Choose a data file to see AI-powered chart suggestions</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="visualize" className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Custom Chart Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <div>
                  <Label>Chart Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="scatter">Scatter Plot</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                      <SelectItem value="heatmap">Heatmap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>X-Axis</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedFile?.columns.map((column) => (
                        <SelectItem key={column} value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Y-Axis</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedFile?.columns.map((column) => (
                        <SelectItem key={column} value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Generate Chart
                  </Button>
                </div>
              </div>
              
              {/* Advanced Options */}
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div>
                  <Label>Color Scheme</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select colors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="blue">Blue Gradient</SelectItem>
                      <SelectItem value="green">Green Gradient</SelectItem>
                      <SelectItem value="purple">Purple Gradient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Aggregation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sum">Sum</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="count">Count</SelectItem>
                      <SelectItem value="max">Maximum</SelectItem>
                      <SelectItem value="min">Minimum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Time Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Preview Area */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Chart Preview</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Full Screen
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-gradient-to-br from-primary/5 to-blue-50 rounded-lg border-2 border-dashed border-primary/20">
                <div className="text-center">
                  <div className="p-4 bg-white rounded-full shadow-sm mb-4 mx-auto w-fit">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Interactive Chart Preview</h3>
                  <p className="text-muted-foreground mb-4">Configure your chart settings above to see the visualization</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span>Real-time updates</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-green-500" />
                      <span>Interactive tooltips</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4 text-blue-500" />
                      <span>Export ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}