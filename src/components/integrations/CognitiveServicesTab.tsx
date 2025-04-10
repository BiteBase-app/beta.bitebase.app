
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StripePaymentButton } from "@/components/StripePaymentButton";

export const CognitiveServicesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Premium Mind Enhancement Programs</CardTitle>
        <CardDescription>
          Choose from our scientifically-backed cognitive enhancement programs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-xl">Basic</CardTitle>
              <CardDescription>Personal cognitive training</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$49</div>
              <p className="text-muted-foreground">per month</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Core cognitive assessments</li>
                <li>• Memory enhancement exercises</li>
                <li>• Monthly progress reports</li>
              </ul>
            </CardContent>
            <CardFooter>
              <StripePaymentButton 
                productName="Basic Mind Program" 
                amount={4900} 
                buttonText="Subscribe Now"
              />
            </CardFooter>
          </Card>
          
          <Card className="border-bitebase-green-600 shadow-lg relative">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-bitebase-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Professional</CardTitle>
              <CardDescription>Advanced cognitive enhancement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$99</div>
              <p className="text-muted-foreground">per month</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Comprehensive cognitive assessment</li>
                <li>• Personalized training protocol</li>
                <li>• Weekly performance tracking</li>
                <li>• Focus & attention optimization</li>
              </ul>
            </CardContent>
            <CardFooter>
              <StripePaymentButton 
                productName="Professional Mind Program" 
                amount={9900} 
                buttonText="Subscribe Now"
                onSuccess={() => console.log("Professional plan subscribed")}
              />
            </CardFooter>
          </Card>
          
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <CardDescription>Team-based cognitive solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$249</div>
              <p className="text-muted-foreground">per month</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Team cognitive assessments</li>
                <li>• Group training sessions</li>
                <li>• API access for integration</li>
                <li>• Custom reporting dashboards</li>
                <li>• Dedicated cognitive coach</li>
              </ul>
            </CardContent>
            <CardFooter>
              <StripePaymentButton 
                productName="Enterprise Mind Program" 
                amount={24900} 
                buttonText="Subscribe Now"
              />
            </CardFooter>
          </Card>
        </div>

        <OneTimeAssessments />
      </CardContent>
    </Card>
  );
};

const OneTimeAssessments = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">One-time Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-medium">Comprehensive Cognitive Assessment</h3>
              <p className="text-sm text-muted-foreground">In-depth analysis of your cognitive strengths and weaknesses</p>
            </div>
            <div className="text-right">
              <div className="font-bold">$199</div>
              <StripePaymentButton 
                productName="Cognitive Assessment" 
                amount={19900}
                buttonText="Buy Now" 
              />
            </div>
          </div>
          <div className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-medium">Focus & Productivity Consultation</h3>
              <p className="text-sm text-muted-foreground">One-on-one session with a cognitive specialist</p>
            </div>
            <div className="text-right">
              <div className="font-bold">$149</div>
              <StripePaymentButton 
                productName="Focus Consultation" 
                amount={14900}
                buttonText="Buy Now" 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CognitiveServicesTab;
