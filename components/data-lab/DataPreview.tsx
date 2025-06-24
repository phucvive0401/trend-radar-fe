'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Database, BarChart3, Download, Sparkles } from 'lucide-react';
import { DataFile } from '@/types';

interface DataPreviewProps {
  file: DataFile;
}

export function DataPreview({ file }: DataPreviewProps) {
  if (file.status !== 'ready') {
    return null;
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Data Preview - {file.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Database className="h-3 w-3" />
                {file.rows.toLocaleString()} rows
              </Badge>
              <Badge variant="outline" className="gap-1">
                <BarChart3 className="h-3 w-3" />
                {file.columns.length} columns
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
                  {file.columns.map((column) => (
                    <th key={column} className="border-b p-3 text-left text-sm font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {file.preview.map((row, index) => (
                  <tr key={index} className="hover:bg-muted/25 transition-colors">
                    {file.columns.map((column) => (
                      <td key={column} className="border-b p-3 text-sm">
                        {row[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {file.insights && (
            <div className="p-4 bg-gradient-to-r from-primary/5 to-blue-50 rounded-lg border">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI-Generated Insights
              </h4>
              <div className="space-y-2">
                {file.insights.map((insight, index) => (
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
  );
}