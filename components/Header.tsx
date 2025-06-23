'use client';

import React, { useState } from 'react';
import { Bell, Search, Settings, Menu, Sun, Moon, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const { user } = useAuth();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight gradient-text">{title}</h1>
              {title === 'Trend Chatbot' && (
                <Badge variant="secondary" className="animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  Beta
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground text-balance">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Enhanced Search */}
          <div className={`relative transition-all duration-300 ${searchFocused ? 'w-96' : 'w-80'}`}>
            <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${
              searchFocused ? 'text-primary' : 'text-muted-foreground'
            }`} />
            <Input
              placeholder="Search anything..."
              className={`pl-10 transition-all duration-300 focus-ring ${
                searchFocused ? 'shadow-lg' : ''
              }`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          
          {/* Custom Actions */}
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
          
          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="hover-lift focus-ring">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-white font-medium">3</span>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" className="hover-lift focus-ring">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-lift focus-ring">
                <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-chart-1 text-primary-foreground">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 status-dot status-online"></div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <Badge variant="outline" className="text-xs capitalize">
                      {user?.role?.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus-ring">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus-ring">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus-ring">
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}