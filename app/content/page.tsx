'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { 
  Video, 
  Image, 
  Type, 
  Calendar as CalendarIcon, 
  Send, 
  Copy,
  Sparkles,
  RotateCcw
} from 'lucide-react';

const templates = [
  {
    id: 1,
    name: 'Product Launch',
    category: 'E-commerce',
    content: '🚀 Introducing our latest innovation! [Product Name] is here to revolutionize your [category]. Get yours now with 20% off! #NewProduct #Innovation',
  },
  {
    id: 2,
    name: 'Behind the Scenes',
    category: 'Lifestyle',
    content: '✨ Take a peek behind the scenes! Here\'s how we create magic at [Brand Name]. What would you like to see more of? #BehindTheScenes #Team',
  },
  {
    id: 3,
    name: 'User Generated Content',
    category: 'Community',
    content: '💕 We love seeing how you use [Product Name]! Thank you @[username] for sharing this amazing shot. Tag us for a chance to be featured! #UserGenerated',
  },
];

export default function ContentStudio() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [captionText, setCaptionText] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok');
  const [abTestVariations, setAbTestVariations] = useState<string[]>(['']);

  const generateVariations = () => {
    const variations = [
      '🌟 Discover the secret to [benefit]! Our [product] will change your life. Try it now! #LifeChanger #MustHave',
      '💫 Ready to transform your [routine]? [Product] is the game-changer you\'ve been waiting for! #Transform #GameChanger',
      '✨ Experience the difference with [product]. Join thousands of happy customers! Limited time offer! #Experience #LimitedTime',
      '🔥 Don\'t miss out! [Product] is flying off the shelves. Get yours before it\'s gone! #DontMissOut #Flying',
      '💎 Treat yourself to luxury with [product]. You deserve the best! Premium quality at an affordable price. #Luxury #Affordable',
    ];
    setAbTestVariations(variations.slice(0, 5));
  };

  const addVariation = () => {
    if (abTestVariations.length < 5) {
      setAbTestVariations([...abTestVariations, '']);
    }
  };

  const updateVariation = (index: number, value: string) => {
    const updated = [...abTestVariations];
    updated[index] = value;
    setAbTestVariations(updated);
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Content Studio" 
        subtitle="Create, test, and schedule your social media content"
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Content Creation */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Caption Composer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Platform</label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="shopee">Shopee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Caption</label>
                <Textarea
                  placeholder="Write your caption here..."
                  value={captionText}
                  onChange={(e) => setCaptionText(e.target.value)}
                  className="min-h-32"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {captionText.length}/2200 characters
                  </span>
                  <Button variant="outline" size="sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Enhance
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Post Now
                </Button>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* A/B Test Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  A/B Test Variations
                </span>
                <Button variant="outline" size="sm" onClick={generateVariations}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Auto Generate
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {abTestVariations.map((variation, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Variation {index + 1}</Badge>
                    </div>
                    <Textarea
                      placeholder={`Enter variation ${index + 1}...`}
                      value={variation}
                      onChange={(e) => updateVariation(index, e.target.value)}
                      className="min-h-20"
                    />
                  </div>
                ))}
                
                {abTestVariations.length < 5 && (
                  <Button variant="outline" onClick={addVariation} className="w-full">
                    Add Variation ({abTestVariations.length}/5)
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Template Library */}
          <Card>
            <CardHeader>
              <CardTitle>Template Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => setCaptionText(template.content)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {template.content}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scheduling Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Schedule Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Time</label>
                  <Input type="time" />
                </div>
                
                <Button className="w-full">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule for {selectedDate?.toLocaleDateString()}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Video className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop your media files here
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Browse Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}