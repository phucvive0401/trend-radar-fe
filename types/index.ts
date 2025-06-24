export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'account_owner' | 'analyst' | 'viewer';
  avatar?: string;
  lastLogin?: Date;
  department?: string;
  phone?: string;
  createdAt?: Date;
}

export interface Permission {
  canViewDashboard: boolean;
  canViewAnalytics: boolean;
  canExport: boolean;
  canManageUsers: boolean;
  canManageIntegrations: boolean;
  canSchedulePosts: boolean;
  canEditReports: boolean;
  canManageBilling: boolean;
}

export interface TrendData {
  hashtag: string;
  rank: number;
  volume: string;
  growth: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  price: string;
  engagement: string;
  velocity: 'Accelerating' | 'Rising' | 'Steady' | 'Stable';
  platforms: string[];
  peakHours: string;
  demographics: string;
  competition: 'Low' | 'Medium' | 'High';
  category: string;
}

export interface KPIData {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon?: React.ReactNode;
  trend?: number[];
}

export interface Integration {
  id: string;
  name: string;
  status: 'connected' | 'error' | 'syncing' | 'pending';
  lastSync: Date;
  syncFrequency: string;
  dataPoints: string;
  logo: string;
  autoSync: boolean;
  health: number;
  monthlyApiCalls: number;
  dataTransferred: string;
  uptime: string;
  error?: string;
}

export interface NotificationData {
  id: number;
  type: 'trend_alert' | 'revenue_alert' | 'competitor_alert' | 'engagement_alert';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  channel: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
  category: string;
  estimatedTime: string;
  popularity: number;
  lastUpdated: string;
  features: string[];
}

export interface ScheduledReport {
  id: number;
  name: string;
  template: string;
  frequency: string;
  nextRun: Date;
  recipients: string[];
  status: 'active' | 'paused' | 'error';
  lastSent: Date;
  openRate: string;
  format: string;
}

export interface DataFile {
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

export interface ChartSuggestion {
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