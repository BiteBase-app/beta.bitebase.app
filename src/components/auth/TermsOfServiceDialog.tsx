import { FileText, Scale, Shield, AlertTriangle, CheckCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface TermsOfServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept?: () => void;
}

export function TermsOfServiceDialog({ open, onOpenChange, onAccept }: TermsOfServiceDialogProps) {
  const handleAccept = () => {
    onAccept?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Terms of Service</DialogTitle>
              <DialogDescription className="text-base">
                Legal terms and conditions for using BiteBase Intelligence
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="px-6 max-h-[60vh]">
          <div className="space-y-6 pb-6">
            {/* Introduction */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Scale className="h-5 w-5 text-purple-500" />
                Agreement to Terms
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of BiteBase Intelligence's website, 
                applications, and services (collectively, the "Service"). By accessing or using our Service, 
                you agree to be bound by these Terms.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 text-sm">
                  <strong>Effective Date:</strong> January 1, 2025 | <strong>Last Updated:</strong> January 2025
                </p>
              </div>
            </section>

            <Separator />

            {/* Service Description */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Service Description</h3>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  BiteBase Intelligence provides AI-powered restaurant analytics, market intelligence, 
                  and location optimization services to help restaurant businesses make data-driven decisions.
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Our Services Include:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• AI-powered market analysis and insights</li>
                    <li>• Location intelligence and site selection tools</li>
                    <li>• Competitor tracking and analysis</li>
                    <li>• Customer demographic insights</li>
                    <li>• Performance forecasting and analytics</li>
                    <li>• Custom reporting and dashboards</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            {/* Account Terms */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Account Registration & Use</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Account Requirements</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You must be at least 18 years old to create an account</li>
                    <li>• Provide accurate and complete registration information</li>
                    <li>• Maintain the security of your account credentials</li>
                    <li>• You are responsible for all activities under your account</li>
                    <li>• One account per person or business entity</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Acceptable Use</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use the Service only for lawful business purposes</li>
                    <li>• Do not share account access with unauthorized users</li>
                    <li>• Do not attempt to reverse engineer or hack the Service</li>
                    <li>• Do not use the Service to compete with BiteBase Intelligence</li>
                    <li>• Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            {/* Subscription & Billing */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Subscription & Billing</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-blue-900">Free Trial</h4>
                  <p className="text-blue-800 text-sm">
                    We offer a 14-day free trial with access to all features. No credit card required. 
                    Trial automatically expires unless you choose a paid plan.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Billing Terms</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Monthly or annual billing cycles</li>
                      <li>• Automatic renewal unless cancelled</li>
                      <li>• Payments processed securely via Stripe</li>
                      <li>• All fees are non-refundable except as stated</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Cancellation</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Cancel anytime from your account settings</li>
                      <li>• Service continues until end of billing period</li>
                      <li>• No refunds for partial months</li>
                      <li>• 30-day money-back guarantee for new users</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Intellectual Property */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Intellectual Property</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Our Rights</h4>
                  <p className="text-sm text-gray-600">
                    BiteBase Intelligence owns all rights to the Service, including software, algorithms, 
                    trademarks, and content. You receive a limited license to use the Service according to these Terms.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Your Data</h4>
                  <p className="text-sm text-gray-600">
                    You retain ownership of your business data. We may use aggregated, anonymized data 
                    to improve our Service. We will not share your specific business data with competitors.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Limitations & Disclaimers */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Limitations & Disclaimers
              </h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="font-medium mb-2 text-orange-900">Service Availability</h4>
                  <p className="text-orange-800 text-sm">
                    We strive for 99.9% uptime but cannot guarantee uninterrupted service. 
                    We may perform maintenance that temporarily affects availability.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-orange-900">Data Accuracy</h4>
                  <p className="text-orange-800 text-sm">
                    While we use reliable data sources and advanced AI, we cannot guarantee 100% accuracy 
                    of market insights or predictions. Use our analytics as one factor in your decision-making.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-orange-900">Limitation of Liability</h4>
                  <p className="text-orange-800 text-sm">
                    Our liability is limited to the amount you paid for the Service in the 12 months 
                    preceding any claim. We are not liable for indirect, consequential, or business losses.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Privacy & Security */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Privacy & Security
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm mb-3">
                  We take your privacy and data security seriously. Our practices are governed by our 
                  Data Processing Policy and include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-700">
                  <div>• SOC 2 Type II compliance</div>
                  <div>• End-to-end encryption</div>
                  <div>• Regular security audits</div>
                  <div>• GDPR and CCPA compliance</div>
                  <div>• Secure data centers</div>
                  <div>• Employee background checks</div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Termination */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Termination</h3>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  Either party may terminate this agreement at any time. Upon termination:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>Your access to the Service will be suspended</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>You can export your data for 30 days after termination</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>We may delete your data after the retention period</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>Outstanding fees remain due and payable</span>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Changes to Terms */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Changes to Terms</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  We may update these Terms from time to time. We will notify you of material changes 
                  via email or through the Service. Continued use after changes constitutes acceptance 
                  of the new Terms.
                </p>
              </div>
            </section>

            <Separator />

            {/* Contact Information */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Contact & Governing Law</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Legal Questions:</strong> legal@bitebase.app<br />
                  <strong>General Support:</strong> support@bitebase.app<br />
                  <strong>Governing Law:</strong> State of California, USA<br />
                  <strong>Dispute Resolution:</strong> Binding arbitration in San Francisco, CA
                </p>
              </div>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Close
            </Button>
            {onAccept && (
              <Button
                onClick={handleAccept}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Accept Terms
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}