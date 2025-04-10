import React, { useState } from 'react';
import { TierLevel, useTier } from '@/contexts/TierContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Crown, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function TierOverride() {
  const { currentTier, setCurrentTier } = useTier();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const tiers: { value: TierLevel; label: string; color: string }[] = [
    { value: 'free', label: 'Free Trial', color: 'bg-gray-100 text-gray-800' },
    { value: 'growth', label: 'Growth', color: 'bg-blue-100 text-blue-800' },
    { value: 'pro', label: 'Pro', color: 'bg-purple-100 text-purple-800' },
    { value: 'enterprise', label: 'Enterprise', color: 'bg-amber-100 text-amber-800' },
    { value: 'franchise', label: 'Franchise', color: 'bg-green-100 text-green-800' }
  ];

  const handleTierChange = (value: string) => {
    setCurrentTier(value as TierLevel);
    toast({
      title: 'Tier Changed',
      description: `You are now using the ${value.charAt(0).toUpperCase() + value.slice(1)} tier.`,
      duration: 3000,
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 rounded-full h-12 w-12 p-0 shadow-lg"
        variant="default"
      >
        <Crown className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 left-6 z-50 w-80 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Tier Override</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Change your subscription tier to access all features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Current Tier:</div>
            <Badge className={getTierColor(currentTier)}>
              {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
            </Badge>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Select Tier:</div>
            <Select value={currentTier} onValueChange={handleTierChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a tier" />
              </SelectTrigger>
              <SelectContent>
                {tiers.map((tier) => (
                  <SelectItem key={tier.value} value={tier.value}>
                    <div className="flex items-center">
                      <span>{tier.label}</span>
                      <Badge className={tier.color + ' ml-2'} variant="outline">
                        {tier.value === currentTier ? 'Active' : ''}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={() => handleTierChange('franchise')} 
          className="w-full"
          variant="default"
        >
          Enable All Features
        </Button>
      </CardFooter>
    </Card>
  );
}

function getTierColor(tier: TierLevel): string {
  switch (tier) {
    case 'free':
      return 'bg-gray-100 text-gray-800';
    case 'growth':
      return 'bg-blue-100 text-blue-800';
    case 'pro':
      return 'bg-purple-100 text-purple-800';
    case 'enterprise':
      return 'bg-amber-100 text-amber-800';
    case 'franchise':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
