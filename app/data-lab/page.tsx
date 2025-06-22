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
  RefreshCw
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
}

interface ChartSuggestion {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'scatter';
  title: string;
  description: string;
  xAxis: string;
  yAxis: string;
  confidence: number;
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
    ]
  }
];

const mockChartSuggestions: ChartSuggestion[] = [
  {
    id: '1',
    type: 'line',
    title: 'Revenue Trend Over Time',
    description: 'Shows daily revenue progression with clear seasonal patterns',
    xAxis: 'date',
    yAxis: 'revenue',
    confidence: 95
  },
  {
    id: '2',
    type: 'bar',
    title: 'Revenue by Platform',
    description: 'Compares total revenue across different sales platforms',
    xAxis: 'platform',
    yAxis: 'revenue',
    confidence: 88
  },
  {
    id: '3',
    type: 'pie',
    title: 'Category Distribution',
    description: 'Shows the proportion of sales by product category',
    xAxis: 'category',
    yAxis: 'quantity',
    confidence: 82
  }
];

export default function DataLab() {
  const { permissions } = useAuth();
  const [selectedFile, setSelectedFile] = useState<DataFile | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dataFiles, setDataFiles] = useState<DataFile[]>(mockDataFiles);

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
            columns: ['column1', 'column2', 'column3'],
            preview: []
          };
          
          setDataFiles(prev => [newFile, ...prev]);
          
          // Simulate processing completion
          setTimeout(() => {
            setDataFiles(prev => prev.map(f => 
              f.id === newFile.id ? { ...f, status: 'ready' as const } : f
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

        <TabsContent value="upload" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Data File
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FileSpreadsheet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Drop your files here</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Support CSV, XLS, XLSX files up to 10MB
                  </p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
                
                {isUploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Uploading...</span>
                      <span className="text-sm">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* File List */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dataFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent/50 ${
                        selectedFile?.id === file.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(file.status)}
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{file.size}</span>
                        <span>{file.rows.toLocaleString()} rows</span>
                        <span>{file.uploadDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Preview */}
          {selectedFile && selectedFile.status === 'ready' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Data Preview - {selectedFile.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="outline">{selectedFile.rows.toLocaleString()} rows</Badge>
                    <Badge variant="outline">{selectedFile.columns.length} columns</Badge>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted/50">
                          {selectedFile.columns.map((column) => (
                            <th key={column} className="border border-border p-2 text-left text-sm font-medium">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedFile.preview.map((row, index) => (
                          <tr key={index} className="hover:bg-muted/25">
                            {selectedFile.columns.map((column) => (
                              <td key={column} className="border border-border p-2 text-sm">
                                {row[column]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analyze" className="space-y-4">
          {selectedFile ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Chart Suggestions for {selectedFile.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockChartSuggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getChartIcon(suggestion.type)}
                            <span className="font-medium text-sm">{suggestion.title}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {suggestion.confidence}% match
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-3">
                          {suggestion.description}
                        </p>
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
                        <Button className="w-full mt-3" size="sm">
                          Create Chart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a data file to see AI chart suggestions</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="visualize" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Chart Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  <Button className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Chart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Preview Area */}
          <Card>
            <CardHeader>
              <CardTitle>Chart Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Chart will appear here</p>
                  <p className="text-sm text-muted-foreground">Configure your chart settings above</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}