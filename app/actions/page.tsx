'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ShoppingCart, 
  Wand2, 
  Calendar, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Package,
  Sparkles,
  Target,
  Send
} from 'lucide-react';

const suggestedProducts = [
  {
    id: 1,
    name: 'Eco-Friendly Water Bottle',
    category: 'Sustainability',
    confidence: 95,
    expectedSales: '$2,400',
    trend: '#SustainableLiving',
    inStock: true,
  },
  {
    id: 2,
    name: 'Smart Fitness Tracker',
    category: 'Technology',
    confidence: 88,
    expectedSales: '$4,200',
    trend: '#FitnessTech',
    inStock: false,
  },
  {
    id: 3,
    name: 'Organic Skincare Set',
    category: 'Beauty',
    confidence: 92,
    expectedSales: '$1,800',
    trend: '#CleanBeauty',
    inStock: true,
  },
];

const taskList = [
  { id: 1, task: 'Update product descriptions for trending items', completed: false, priority: 'high' },
  { id: 2, task: 'Schedule TikTok posts for #SustainableFashion', completed: true, priority: 'medium' },
  { id: 3, task: 'Analyze competitor pricing', completed: false, priority: 'low' },
  { id: 4, task: 'Create A/B test for new ad campaign', completed: false, priority: 'high' },
  { id: 5, task: 'Export weekly performance report', completed: true, priority: 'medium' },
];

export default function ActionCenter() {
  const [selectedTone, setSelectedTone] = useState('professional');
  const [captionPrompt, setCaptionPrompt] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const handleTaskToggle = (taskId: number) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Action Center" 
        subtitle="AI-powered recommendations and automation tools"
      />
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Suggested Products to Import
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestedProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <Badge variant={product.inStock ? 'default' : 'secondary'}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <span className="text-sm">
                        <span className="text-muted-foreground">Confidence:</span>
                        <span className="font-medium ml-1">{product.confidence}%</span>
                      </span>
                      <span className="text-sm">
                        <span className="text-muted-foreground">Expected:</span>
                        <span className="font-medium ml-1">{product.expectedSales}</span>
                      </span>
                    </div>
                    <Badge variant="outline">{product.trend}</Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analyze
                    </Button>
                    <Button size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Auto Caption Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Auto-Caption & Promotions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Tone & Style</label>
                <Select value={selectedTone} onValueChange={setSelectedTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual & Friendly</SelectItem>
                    <SelectItem value="trendy">Trendy & Hip</SelectItem>
                    <SelectItem value="inspiring">Inspiring</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Prompt</label>
                <Textarea
                  placeholder="Describe your product or campaign..."
                  value={captionPrompt}
                  onChange={(e) => setCaptionPrompt(e.target.value)}
                  className="min-h-20"
                />
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Caption
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Task Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {taskList.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                />
                <div className="flex-1">
                  <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.task}
                  </p>
                </div>
                <Badge 
                  variant={
                    task.priority === 'high' ? 'destructive' :
                    task.priority === 'medium' ? 'default' : 'secondary'
                  }
                  className="text-xs"
                >
                  {task.priority}
                </Badge>
                {task.completed && (
                  <Clock className="h-4 w-4 text-green-600" />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full">
              <Target className="h-4 w-4 mr-2" />
              Mark Selected as Complete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Scheduling */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Schedule to TikTok</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-accent/20">
                <h4 className="font-medium mb-2">Next Scheduled Post</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  "Check out our sustainable fashion collection! 🌱 #SustainableFashion #EcoFriendly"
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Today at 2:00 PM</span>
                </div>
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Schedule New Post
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule to Shopee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-accent/20">
                <h4 className="font-medium mb-2">Product Launch</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Eco-Friendly Water Bottle - 20% off launch promotion
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tomorrow at 9:00 AM</span>
                </div>
              </div>
              <Button className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Schedule Product
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}