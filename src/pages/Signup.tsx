import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { DataPolicyDialog } from "@/components/auth/DataPolicyDialog";
import { TermsOfServiceDialog } from "@/components/auth/TermsOfServiceDialog";
import { BiteBaseLogo } from "@/components/ui/BiteBaseLogo";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  });
  const [showDataPolicy, setShowDataPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { register, error } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Calculate password strength
    if (field === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return { text: "Very Weak", color: "text-red-500" };
      case 2: return { text: "Weak", color: "text-orange-500" };
      case 3: return { text: "Fair", color: "text-yellow-500" };
      case 4: return { text: "Good", color: "text-blue-500" };
      case 5: return { text: "Strong", color: "text-green-500" };
      default: return { text: "", color: "" };
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return false;
    }

    if (!agreements.terms) {
      toast({
        title: "Agreement Required",
        description: "Please accept the Terms of Service to continue.",
        variant: "destructive"
      });
      return false;
    }

    if (!agreements.privacy) {
      toast({
        title: "Agreement Required",
        description: "Please accept the Data Policy to continue.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const success = await register(formData.email, formData.password, formData.fullName);
      if (success) {
        toast({
          title: "Account Created Successfully!",
          description: "Welcome to BiteBase Intelligence. You can now access all features.",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-blue-500";
      case 5: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - BiteBase Intelligence</title>
        <meta name="description" content="Create your BiteBase Intelligence account and start transforming your restaurant business with AI-powered analytics." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-emerald-200 to-teal-200 blur-3xl opacity-70"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 blur-3xl opacity-70"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <motion.div 
                className="inline-flex items-center gap-3 mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <BiteBaseLogo size="xl" variant="gradient" />
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  BiteBase
                </span>
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
              <p className="text-gray-600">Start your 14-day free trial today</p>
            </div>

            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
                <CardDescription className="text-center">
                  Join thousands of successful restaurants
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-700">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="pl-10 h-12"
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 h-12"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 pr-10 h-12"
                        required
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${strengthColor()}`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${getPasswordStrengthText().color}`}>
                            {getPasswordStrengthText().text}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>Password should contain:</p>
                          <ul className="space-y-1 ml-2">
                            <li className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                              <CheckCircle className="h-3 w-3" />
                              At least 8 characters
                            </li>
                            <li className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                              <CheckCircle className="h-3 w-3" />
                              One uppercase letter
                            </li>
                            <li className={`flex items-center gap-1 ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                              <CheckCircle className="h-3 w-3" />
                              One number
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 pr-10 h-12"
                        required
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  {/* Agreements */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={agreements.terms}
                          onCheckedChange={(checked) => 
                            setAgreements(prev => ({ ...prev, terms: checked as boolean }))
                          }
                          className="mt-1"
                        />
                        <div className="text-sm leading-relaxed">
                          <Label htmlFor="terms" className="cursor-pointer">
                            I agree to the{" "}
                            <button
                              type="button"
                              onClick={() => setShowTerms(true)}
                              className="text-emerald-600 hover:text-emerald-700 underline"
                            >
                              Terms of Service
                            </button>
                            {" "}and{" "}
                            <button
                              type="button"
                              onClick={() => setShowDataPolicy(true)}
                              className="text-emerald-600 hover:text-emerald-700 underline"
                            >
                              Data Policy
                            </button>
                            <span className="text-red-500 ml-1">*</span>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="privacy"
                          checked={agreements.privacy}
                          onCheckedChange={(checked) => 
                            setAgreements(prev => ({ ...prev, privacy: checked as boolean }))
                          }
                          className="mt-1"
                        />
                        <div className="text-sm leading-relaxed">
                          <Label htmlFor="privacy" className="cursor-pointer">
                            I acknowledge that I have read and understand the{" "}
                            <button
                              type="button"
                              onClick={() => setShowDataPolicy(true)}
                              className="text-emerald-600 hover:text-emerald-700 underline"
                            >
                              Data Processing Policy
                            </button>
                            {" "}and consent to the processing of my personal data
                            <span className="text-red-500 ml-1">*</span>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="marketing"
                          checked={agreements.marketing}
                          onCheckedChange={(checked) => 
                            setAgreements(prev => ({ ...prev, marketing: checked as boolean }))
                          }
                          className="mt-1"
                        />
                        <div className="text-sm leading-relaxed">
                          <Label htmlFor="marketing" className="cursor-pointer">
                            I would like to receive product updates, tips, and special offers via email
                            <span className="text-gray-500 ml-1">(optional)</span>
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-6">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium"
                    disabled={isLoading || !agreements.terms || !agreements.privacy}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Start Free Trial
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                    >
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Secure Registration</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>GDPR Compliant</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Data Policy Dialog */}
        <DataPolicyDialog 
          open={showDataPolicy} 
          onOpenChange={setShowDataPolicy}
          onAccept={() => {
            setAgreements(prev => ({ ...prev, privacy: true }));
            setShowDataPolicy(false);
          }}
        />

        {/* Terms of Service Dialog */}
        <TermsOfServiceDialog 
          open={showTerms} 
          onOpenChange={setShowTerms}
          onAccept={() => {
            setAgreements(prev => ({ ...prev, terms: true }));
            setShowTerms(false);
          }}
        />
      </div>
    </>
  );
};

export default Signup;