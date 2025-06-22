'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  BarChart3,
  TrendingUp,
  Zap,
  FileText,
  Bell,
  Settings,
  Users,
  CreditCard,
  Plug,
  Video,
  Layout,
  User,
  LogOut,
  Bot,
  Database,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const navigation = [
  // Core Analysis
  { 
    category: '🧭 Core Analysis',
    items: [
      { name: 'Dashboard', href: '/', icon: Layout, permission: 'canViewDashboard' },
      { name: 'Trend Explorer', href: '/trends', icon: TrendingUp, permission: 'canViewAnalytics' },
      { name: 'Trend Chatbot', href: '/chatbot', icon: Bot, permission: 'canViewAnalytics', badge: 'Beta' },
      { name: 'Action Center', href: '/actions', icon: Zap, permission: 'canViewAnalytics' },
    ]
  },
  // Data & Content
  {
    category: '📊 Data & Content',
    items: [
      { name: 'Data Lab', href: '/data-lab', icon: Database, permission: 'canViewAnalytics', badge: 'New' },
      { name: 'Content Studio', href: '/content', icon: Video, permission: 'canSchedulePosts' },
      { name: 'Reports & Export', href: '/reports', icon: FileText, permission: 'canEditReports' },
      { name: 'Notification Hub', href: '/notifications', icon: Bell, permission: 'canViewDashboard' },
    ]
  },
  // System Tools
  {
    category: '⚙️ System Tools',
    items: [
      { name: 'Integrations', href: '/integrations', icon: Plug, permission: 'canManageIntegrations' },
      { name: 'Users & Roles', href: '/users', icon: Users, permission: 'canManageUsers' },
      { name: 'Billing & Plans', href: '/billing', icon: CreditCard, permission: 'canManageBilling' },
      { name: 'Settings', href: '/settings', icon: Settings, permission: 'canViewDashboard' },
    ]
  }
];

function hasPermission(permissions: any, permissionKey: string): boolean {
  return permissions[permissionKey as keyof typeof permissions] === true;
}

export function Sidebar() {
  const pathname = usePathname();
  const { user, permissions, logout } = useAuth();

  return (
    <div className="flex h-screen w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">TrendRadar Hub</span>
        </div>
      </div>
      
      <Separator />
      
      <nav className="flex-1 space-y-6 px-3 py-4 overflow-y-auto">
        {navigation.map((section) => {
          const visibleItems = section.items.filter(item => 
            hasPermission(permissions, item.permission)
          );
          
          if (visibleItems.length === 0) return null;
          
          return (
            <div key={section.category}>
              <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {section.category}
              </h3>
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge 
                          variant={isActive ? "secondary" : "outline"} 
                          className="text-xs px-1.5 py-0.5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
      
      <Separator />
      
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
}