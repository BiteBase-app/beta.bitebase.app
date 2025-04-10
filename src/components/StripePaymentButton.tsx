
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface StripePaymentButtonProps {
  productName: string;
  amount: number; // amount in cents
  buttonText?: string;
  onSuccess?: () => void;
  disabled?: boolean;
  className?: string; // Added className prop
}

export const StripePaymentButton = ({
  productName,
  amount,
  buttonText = "Subscribe Now",
  onSuccess,
  disabled = false,
  className = "" // Added default value
}: StripePaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // For production, replace with real Stripe integration using Supabase Edge Function
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          amount,
          successUrl: window.location.origin + '/payment-success',
          cancelUrl: window.location.origin + '/payment-canceled',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Payment service unavailable');
      }
      
      const data = await response.json();
      
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Invalid response from payment service');
      }
      
      // onSuccess callback will be handled after redirect back from Stripe
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={isLoading || disabled}
      className={`w-full ${className}`}
    >
      {isLoading ? "Processing..." : buttonText}
    </Button>
  );
};

export default StripePaymentButton;
