'use client';

import React, { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navigation = [
  // Core Analysis
  { 
    category: '🧭 Core Analysis',
    items: [
      { name: 'Dashboard', href: '/', icon: Layout, permission: 'canViewDashboard' },
      { name: 'Trend Explorer', href: '/trends', icon: TrendingUp, permission: 'canViewAnalytics' },
      { name: 'Trend Chatbot', href: '/chatbot', icon: Bot, permission: 'canViewAnalytics', badge: 'Beta', special: true },
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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <div className={cn(
        "flex h-screen flex-col bg-card border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <div className="flex items-center gap-2 animate-slide-in-right">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-1">
                <BarChart3 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold gradient-text">TrendRadar</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 hover-lift focus-ring"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <Separator />
        
        {/* Navigation */}
        <nav className="flex-1 space-y-6 px-3 py-4 overflow-y-auto">
          {navigation.map((section) => {
            const visibleItems = section.items.filter(item => 
              hasPermission(permissions, item.permission)
            );
            
            if (visibleItems.length === 0) return null;
            
            return (
              <div key={section.category} className="space-y-2">
                {!collapsed && (
                  <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {section.category}
                  </h3>
                )}
                <div className="space-y-1">
                  {visibleItems.map((item) => {
                    const isActive = pathname === item.href;
                    const NavItem = (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover-lift focus-ring',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                          item.special && 'relative overflow-hidden',
                          collapsed && 'justify-center'
                        )}
                      >
                        {item.special && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-chart-1/10 to-primary/10 animate-pulse" />
                        )}
                        <item.icon className={cn(
                          "h-4 w-4 transition-transform group-hover:scale-110",
                          item.special && "relative z-10"
                        )} />
                        {!collapsed && (
                          <>
                            <span className={cn("flex-1", item.special && "relative z-10")}>
                              {item.name}
                            </span>
                            {item.badge && (
                              <Badge 
                                variant={isActive ? "secondary" : "outline"} 
                                className={cn(
                                  "text-xs px-1.5 py-0.5 transition-all",
                                  item.special && "bg-gradient-to-r from-primary to-chart-1 text-primary-foreground animate-pulse relative z-10"
                                )}
                              >
                                {item.badge === 'Beta' && <Sparkles className="h-2 w-2 mr-1" />}
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    );

                    if (collapsed) {
                      return (
                        <Tooltip key={item.name}>
                          <TooltipTrigger asChild>
                            {NavItem}
                          </TooltipTrigger>
                          <TooltipContent side="right" className="flex items-center gap-2">
                            {item.name}
                            {item.badge && (
                              <Badge variant="outline" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return NavItem;
                  })}
                </div>
              </div>
            );
          })}
        </nav>
        
        <Separator />
        
        {/* User Section */}
        <div className="p-4">
          {!collapsed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-chart-1 text-primary-foreground">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role?.replace('_', ' ')}
                    </p>
                    <div className="status-dot status-online"></div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start hover-lift focus-ring text-muted-foreground hover:text-red-600"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20 mx-auto cursor-pointer hover-lift">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-chart-1 text-primary-foreground">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="text-center">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role?.replace('_', ' ')}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full hover-lift focus-ring text-muted-foreground hover:text-red-600"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Sign out
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}