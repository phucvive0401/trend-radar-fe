'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus,
  FileText, 
  Download, 
  Mail, 
  Calendar, 
  Clock,
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Settings,
  Play,
  Pause,
  Eye,
  Share2,
  Copy,
  Star,
  Zap,
  Bot,
  Sparkles,
  Target,
  Globe,
  Smartphone,
  Monitor,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const reportTemplates = [
  {
    id: 'executive-dashboard',
    name: 'Executive Dashboard',
    description: 'High-level KPIs and strategic insights for leadership',
    sections: ['Executive Summary', 'Key Metrics', 'Strategic Insights', 'Recommendations'],
    category: 'Executive',
    estimatedTime: '5 minutes',
    popularity: 95,
    lastUpdated: '2 days ago',
    features: ['Real-time data', 'Interactive charts', 'Trend analysis'],
  },
  {
    id: 'weekly-performance',
    name: 'Weekly Performance Report',
    description: 'Comprehensive weekly analytics including KPIs, trends, and recommendations',
    sections: ['Executive Summary', 'KPI Overview', 'Trend Analysis', 'Action Items'],
    category: 'Performance',
    estimatedTime: '8 minutes',
    popularity: 87,
    lastUpdated: '1 day ago',
    features: ['Week-over-week comparison', 'Goal tracking', 'Performance alerts'],
  },
  {
    id: 'monthly-summary',
    name: 'Monthly Summary Report',
    description: 'Monthly business intelligence report with detailed insights and forecasts',
    sections: ['Monthly Overview', 'Performance Metrics', 'Competitive Analysis', 'Growth Opportunities'],
    category: 'Business Intelligence',
    estimatedTime: '12 minutes',
    popularity: 92,
    lastUpdated: '3 days ago',
    features: ['Monthly trends', 'Forecasting', 'Competitive benchmarks'],
  },
  {
    id: 'campaign-analysis',
    name: 'Campaign Analysis Report',
    description: 'Detailed analysis of marketing campaign performance and ROI',
    sections: ['Campaign Overview', 'Performance Metrics', 'Audience Insights', 'Optimization Recommendations'],
    category: 'Marketing',
    estimatedTime: '10 minutes',
    popularity: 78,
    lastUpdated: '1 day ago',
    features: ['ROI analysis', 'Attribution modeling', 'Audience segmentation'],
  },
  {
    id: 'competitor-insights',
    name: 'Competitor Insights Report',
    description: 'Market intelligence and competitive landscape analysis',
    sections: ['Market Overview', 'Competitor Analysis', 'Pricing Insights', 'Strategic Recommendations'],
    category: 'Competitive Intelligence',
    estimatedTime: '15 minutes',
    popularity: 84,
    lastUpdated: '2 days ago',
    features: ['Market share analysis', 'Pricing intelligence', 'SWOT analysis'],
  },
  {
    id: 'social-media-performance',
    name: 'Social Media Performance',
    description: 'Comprehensive social media analytics across all platforms',
    sections: ['Platform Overview', 'Engagement Metrics', 'Content Performance', 'Growth Strategies'],
    category: 'Social Media',
    estimatedTime: '7 minutes',
    popularity: 89,
    lastUpdated: '1 day ago',
    features: ['Cross-platform analysis', 'Content optimization', 'Influencer tracking'],
  },
];

const scheduledReports = [
  {
    id: 1,
    name: 'Weekly Performance Report',
    template: 'weekly-performance',
    frequency: 'Weekly',
    nextRun: new Date('2024-01-15 09:00'),
    recipients: ['team@company.com', 'ceo@company.com'],
    status: 'active',
    lastSent: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    openRate: '94%',
    format: 'PDF',
  },
  {
    id: 2,
    name: 'Monthly Summary Report',
    template: 'monthly-summary',
    frequency: 'Monthly',
    nextRun: new Date('2024-02-01 08:00'),
    recipients: ['board@company.com'],
    status: 'active',
    lastSent: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    openRate: '100%',
    format: 'PowerPoint',
  },
  {
    id: 3,
    name: 'Campaign Analysis',
    template: 'campaign-analysis',
    frequency: 'Bi-weekly',
    nextRun: new Date('2024-01-20 14:00'),
    recipients: ['marketing@company.com', 'analytics@company.com'],
    status: 'paused',
    lastSent: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    openRate: '87%',
    format: 'Excel',
  },
];

const recentReports = [
  {
    id: 1,
    name: 'Weekly Performance Report',
    template: 'weekly-performance',
    generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    size: '2.4 MB',
    format: 'PDF',
    downloads: 12,
    views: 45,
    status: 'completed',
  },
  {
    id: 2,
    name: 'Executive Dashboard',
    template: 'executive-dashboard',
    generatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    size: '1.8 MB',
    format: 'PowerPoint',
    downloads: 8,
    views: 23,
    status: 'completed',
  },
  {
    id: 3,
    name: 'Social Media Performance',
    template: 'social-media-performance',
    generatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    size: '3.1 MB',
    format: 'PDF',
    downloads: 15,
    views: 67,
    status: 'completed',
  },
];

export default function ReportsPage() {
  const { permissions } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [emailRecipients, setEmailRecipients] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleSectionToggle = (section: string) => {
    setSelectedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const currentTemplate = reportTemplates.find(t => t.id === selectedTemplate);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="h-4 w-4 text-green-600" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'text-green-600 bg-green-50';
    if (popularity >= 80) return 'text-blue-600 bg-blue-50';
    if (popularity >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  if (!permissions.canEditReports) {
    return (
      <div className="space-y-6">
        <Header title="Reports & Export" subtitle="Access denied" />
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">You don't have permission to access reports.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header 
        title="Reports & Export" 
        subtitle="Generate professional reports and automate delivery"
      />
      
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Report Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates ({reportTemplates.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled ({scheduledReports.length})</TabsTrigger>
          <TabsTrigger value="history">History ({recentReports.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Enhanced Report Builder */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    AI Report Builder
                  </span>
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    <Bot className="h-3 w-3 mr-1" />
                    AI Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="template">Report Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <span className="font-medium">{template.name}</span>
                              <div className="text-xs text-muted-foreground">
                                {template.category} • {template.estimatedTime}
                              </div>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs ml-2 ${getPopularityColor(template.popularity)}`}>
                              {template.popularity}%
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {currentTemplate && (
                    <div className="mt-2 p-3 bg-accent/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">
                        {currentTemplate.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {currentTemplate.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="title">Report Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter custom report title"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date Range</Label>
                    <Select defaultValue="last-7-days">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Last 7 days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 days</SelectItem>
                        <SelectItem value="last-90-days">Last 90 days</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Data Sources</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="social">Social Media Only</SelectItem>
                        <SelectItem value="ecommerce">E-commerce Only</SelectItem>
                        <SelectItem value="ads">Advertising Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {currentTemplate && (
                  <div>
                    <Label>Report Sections</Label>
                    <div className="space-y-3 mt-2">
                      {currentTemplate.sections.map((section) => (
                        <div key={section} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={section}
                              checked={selectedSections.includes(section)}
                              onCheckedChange={() => handleSectionToggle(section)}
                            />
                            <Label htmlFor={section} className="font-medium">
                              {section}
                            </Label>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {Math.floor(Math.random() * 5) + 3} charts
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="format">Export Format</Label>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            PDF Document
                          </div>
                        </SelectItem>
                        <SelectItem value="pptx">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            PowerPoint
                          </div>
                        </SelectItem>
                        <SelectItem value="xlsx">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Excel Workbook
                          </div>
                        </SelectItem>
                        <SelectItem value="docx">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Word Document
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Branding</Label>
                    <Select defaultValue="company">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">Company Branding</SelectItem>
                        <SelectItem value="white-label">White Label</SelectItem>
                        <SelectItem value="custom">Custom Theme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {isGenerating ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Generating Report...</span>
                      <span className="text-sm text-muted-foreground">{generationProgress}%</span>
                    </div>
                    <Progress value={generationProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Processing data and creating visualizations...
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={handleGenerateReport}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Email & Scheduling */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Delivery & Automation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="recipients">Email Recipients</Label>
                  <Input
                    id="recipients"
                    placeholder="Enter email addresses (comma separated)"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Team
                    </Button>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Executives
                    </Button>
                    <Button variant="outline" size="sm">
                      <Globe className="h-4 w-4 mr-2" />
                      Stakeholders
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>Delivery Options</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Email Delivery</div>
                          <div className="text-sm text-muted-foreground">Send via email</div>
                        </div>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Download className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Download Link</div>
                          <div className="text-sm text-muted-foreground">Generate download link</div>
                        </div>
                      </div>
                      <Checkbox />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Share2 className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Dashboard Link</div>
                          <div className="text-sm text-muted-foreground">Interactive online version</div>
                        </div>
                      </div>
                      <Checkbox />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Schedule Frequency</Label>
                  <Select defaultValue="manual">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual (One-time)</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Day</Label>
                    <Select defaultValue="monday">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Smart Scheduling</Label>
                    <Checkbox />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI will optimize delivery time based on recipient engagement patterns
                  </p>
                </div>
                
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Setup Automated Delivery
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{template.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPopularityColor(template.popularity)}`}>
                      <Star className="h-3 w-3 mr-1 inline" />
                      {template.popularity}%
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Estimated time:</span>
                      <span className="font-medium">{template.estimatedTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last updated:</span>
                      <span className="font-medium">{template.lastUpdated}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sections:</span>
                      <span className="font-medium">{template.sections.length}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <Label className="text-xs font-medium text-muted-foreground">Features:</Label>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <Zap className="h-4 w-4 mr-2" />
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

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Scheduled Reports</span>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Schedule
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            {getStatusIcon(report.status)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-1">{report.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <span className="flex items-center gap-1">
                                <RefreshCw className="h-3 w-3" />
                                {report.frequency}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Next: {report.nextRun.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {report.recipients.length} recipients
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground">
                                Last sent: {report.lastSent.toLocaleDateString()}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {report.openRate} open rate
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {report.format}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={report.status === 'active' ? 'default' : 'secondary'}
                            className="capitalize"
                          >
                            {report.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Run Now
                        </Button>
                        <Button variant="outline" size="sm">
                          {report.status === 'active' ? (
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
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {report.generatedAt.toLocaleString()}
                          </span>
                          <span>{report.size}</span>
                          <Badge variant="outline" className="text-xs">
                            {report.format}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {report.downloads} downloads
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {report.views} views
                          </span>
                          <Badge 
                            variant={report.status === 'completed' ? 'default' : 'secondary'}
                            className="text-xs capitalize"
                          >
                            {report.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}