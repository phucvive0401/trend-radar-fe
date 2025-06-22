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
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, 
  Download, 
  Mail, 
  Calendar, 
  Clock,
  BarChart3,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';

const reportTemplates = [
  {
    id: 'weekly-performance',
    name: 'Weekly Performance Report',
    description: 'Comprehensive weekly analytics including KPIs, trends, and recommendations',
    sections: ['Executive Summary', 'KPI Overview', 'Trend Analysis', 'Action Items'],
  },
  {
    id: 'monthly-summary',
    name: 'Monthly Summary Report',
    description: 'Monthly business intelligence report with detailed insights and forecasts',
    sections: ['Monthly Overview', 'Performance Metrics', 'Competitive Analysis', 'Growth Opportunities'],
  },
  {
    id: 'campaign-analysis',
    name: 'Campaign Analysis Report',
    description: 'Detailed analysis of marketing campaign performance and ROI',
    sections: ['Campaign Overview', 'Performance Metrics', 'Audience Insights', 'Optimization Recommendations'],
  },
  {
    id: 'competitor-insights',
    name: 'Competitor Insights Report',
    description: 'Market intelligence and competitive landscape analysis',
    sections: ['Market Overview', 'Competitor Analysis', 'Pricing Insights', 'Strategic Recommendations'],
  },
];

const scheduledReports = [
  {
    id: 1,
    name: 'Weekly Performance Report',
    frequency: 'Weekly',
    nextRun: '2024-01-15 09:00',
    recipients: ['team@company.com', 'ceo@company.com'],
    status: 'active',
  },
  {
    id: 2,
    name: 'Monthly Summary Report',
    frequency: 'Monthly',
    nextRun: '2024-02-01 08:00',
    recipients: ['board@company.com'],
    status: 'active',
  },
];

export default function ReportsPage() {
  const { permissions } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [emailRecipients, setEmailRecipients] = useState('');

  const handleSectionToggle = (section: string) => {
    setSelectedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const currentTemplate = reportTemplates.find(t => t.id === selectedTemplate);

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
        subtitle="Generate and schedule automated reports"
      />
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Report Builder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Create New Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="template">Report Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {reportTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {currentTemplate && (
                <p className="text-sm text-muted-foreground mt-1">
                  {currentTemplate.description}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="title">Report Title</Label>
              <Input
                id="title"
                placeholder="Enter report title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>
            
            {currentTemplate && (
              <div>
                <Label>Include Sections</Label>
                <div className="space-y-2 mt-2">
                  {currentTemplate.sections.map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                      <Checkbox
                        id={section}
                        checked={selectedSections.includes(section)}
                        onCheckedChange={() => handleSectionToggle(section)}
                      />
                      <Label htmlFor={section} className="text-sm">
                        {section}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="format">Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="pptx">PowerPoint</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                  <SelectItem value="docx">Word</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Email & Scheduling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email & Automation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="recipients">Email Recipients</Label>
              <Input
                id="recipients"
                placeholder="Enter email addresses (comma separated)"
                value={emailRecipients}
                onChange={(e) => setEmailRecipients(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Schedule Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Day</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Day" />
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
            
            <Button className="w-full">
              <Clock className="h-4 w-4 mr-2" />
              Setup Auto-Send
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground">
                      {report.frequency}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Next: {report.nextRun}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {report.recipients.length} recipients
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={report.status === 'active' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Weekly Performance Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Generated on Jan {8 + i}, 2024
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}