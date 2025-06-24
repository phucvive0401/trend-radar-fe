'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  popular: boolean;
}

interface PlanCardProps {
  plan: Plan;
  currentPlan?: string;
  onSelectPlan?: (planId: string) => void;
}

export function PlanCard({ plan, currentPlan, onSelectPlan }: PlanCardProps) {
  const isCurrentPlan = currentPlan === plan.id;

  return (
    <Card className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">
            <Star className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {plan.name}
          {isCurrentPlan && (
            <Badge variant="outline">Current</Badge>
          )}
        </CardTitle>
        <div>
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground">{plan.period}</span>
        </div>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>{feature}</span>
              </div>
            ))}
            {plan.limitations.map((limitation, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="h-4 w-4 text-red-500" />
                <span>{limitation}</span>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full" 
            variant={isCurrentPlan ? 'outline' : 'default'}
            disabled={isCurrentPlan}
            onClick={() => onSelectPlan?.(plan.id)}
          >
            {isCurrentPlan ? 'Current Plan' : 'Upgrade'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}