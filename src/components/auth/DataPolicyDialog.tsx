import { Shield, Database, Lock, Eye, Users, Globe, CheckCircle, X } from "lucide-react";
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

interface DataPolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept?: () => void;
}

export function DataPolicyDialog({ open, onOpenChange, onAccept }: DataPolicyDialogProps) {
  const handleAccept = () => {
    onAccept?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Data Processing Policy</DialogTitle>
              <DialogDescription className="text-base">
                How we collect, use, and protect your information
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="px-6 max-h-[60vh]">
          <div className="space-y-6 pb-6">
            {/* Introduction */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                Data Collection & Processing
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                At BiteBase Intelligence, we are committed to protecting your privacy and ensuring transparent 
                data practices. This policy explains how we collect, process, and safeguard your personal and 
                business data in compliance with GDPR, CCPA, and other applicable privacy regulations.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Last Updated:</strong> January 2025 | <strong>Effective Date:</strong> January 1, 2025
                </p>
              </div>
            </section>

            <Separator />

            {/* What We Collect */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-500" />
                Information We Collect
              </h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Personal Information</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Name, email address, and contact information</li>
                    <li>• Account credentials and authentication data</li>
                    <li>• Payment and billing information (processed securely via Stripe)</li>
                    <li>• Profile preferences and settings</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Business Data</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Restaurant information (name, location, cuisine type)</li>
                    <li>• Market research data and analytics preferences</li>
                    <li>• Location intelligence queries and results</li>
                    <li>• Usage patterns and feature interactions</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Technical Data</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• IP address, browser type, and device information</li>
                    <li>• Session data and application performance metrics</li>
                    <li>• Cookies and similar tracking technologies</li>
                    <li>• API usage logs and system interactions</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            {/* How We Use Data */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                How We Use Your Data
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Service Delivery</h4>
                      <p className="text-xs text-gray-600">Provide AI-powered restaurant analytics and insights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Account Management</h4>
                      <p className="text-xs text-gray-600">Manage your subscription and billing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Customer Support</h4>
                      <p className="text-xs text-gray-600">Provide technical assistance and resolve issues</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Product Improvement</h4>
                      <p className="text-xs text-gray-600">Enhance our AI algorithms and user experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Security & Fraud Prevention</h4>
                      <p className="text-xs text-gray-600">Protect against unauthorized access and misuse</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Legal Compliance</h4>
                      <p className="text-xs text-gray-600">Meet regulatory requirements and legal obligations</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Data Security */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-500" />
                Data Security & Protection
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Encryption</h4>
                    <p className="text-xs text-gray-600">All data encrypted in transit (TLS 1.3) and at rest (AES-256)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Access Controls</h4>
                    <p className="text-xs text-gray-600">Role-based access with multi-factor authentication</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">SOC 2 Compliance</h4>
                    <p className="text-xs text-gray-600">Independently audited security controls and procedures</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Regular Audits</h4>
                    <p className="text-xs text-gray-600">Continuous security monitoring and vulnerability assessments</p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Data Sharing */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Globe className="h-5 w-5 text-orange-500" />
                Data Sharing & Third Parties
              </h3>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  We do not sell your personal data. We may share data only in these limited circumstances:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><strong>Service Providers:</strong> Trusted partners who help deliver our services (AWS, Stripe, etc.)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><strong>Legal Requirements:</strong> When required by law or to protect our rights</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale (with notice)</span>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Your Rights */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Your Rights & Choices</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm mb-3">
                  You have the following rights regarding your personal data:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>• Access and download your data</div>
                  <div>• Correct inaccurate information</div>
                  <div>• Delete your account and data</div>
                  <div>• Restrict data processing</div>
                  <div>• Data portability</div>
                  <div>• Withdraw consent anytime</div>
                </div>
                <p className="text-green-700 text-xs mt-3">
                  Contact us at privacy@bitebase.app to exercise these rights.
                </p>
              </div>
            </section>

            <Separator />

            {/* Contact */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Data Protection Officer:</strong> privacy@bitebase.app<br />
                  <strong>General Inquiries:</strong> support@bitebase.app<br />
                  <strong>Address:</strong> BiteBase Intelligence, 123 Tech Street, San Francisco, CA 94105
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
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Accept & Continue
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}