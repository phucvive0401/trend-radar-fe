// components/filters.tsx

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Store, Calendar, Globe } from 'lucide-react';

export function DomainFilter({ domains, value, onChange }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Store className="h-4 w-4 text-primary" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block">Domain</label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-56 border-0 shadow-none p-0 h-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {domains.map((domain: any) => (
              <SelectItem key={domain.id} value={domain.id}>
                <div>
                  <span className="font-medium">{domain.name}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{domain.stores} stores</span>
                    <span>•</span>
                    <span>{domain.revenue}</span>
                    <span className="text-green-600">{domain.growth}</span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function TimeFilter({ value, onChange }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Calendar className="h-4 w-4 text-blue-600" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block">Time Range</label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-32 border-0 shadow-none p-0 h-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function RegionFilter({ value, onChange }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-green-50 rounded-lg">
        <Globe className="h-4 w-4 text-green-600" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block">Region</label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-32 border-0 shadow-none p-0 h-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global">Global</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="eu">Europe</SelectItem>
            <SelectItem value="asia">Asia Pacific</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
