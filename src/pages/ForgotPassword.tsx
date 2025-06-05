import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { BiteBaseLogo } from "@/components/ui/BiteBaseLogo";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast({
        title: "Reset Link Sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password - BiteBase Intelligence</title>
        <meta name="description" content="Reset your BiteBase Intelligence account password. Enter your email to receive reset instructions." />
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
            {/* Back to Login */}
            <div className="mb-6">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
              <p className="text-gray-600">
                {isSubmitted 
                  ? "Check your email for reset instructions"
                  : "Enter your email to receive reset instructions"
                }
              </p>
            </div>

            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              {isSubmitted ? (
                // Success State
                <CardContent className="p-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      We've sent password reset instructions to <strong>{email}</strong>
                    </p>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500">
                        Didn't receive the email? Check your spam folder or try again.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setEmail("");
                        }}
                        className="w-full"
                      >
                        Try Different Email
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              ) : (
                // Form State
                <>
                  <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
                    <CardDescription className="text-center">
                      Enter your email address and we'll send you a link to reset your password
                    </CardDescription>
                  </CardHeader>

                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12"
                            required
                            autoComplete="email"
                          />
                        </div>
                      </div>

                      <Alert className="border-blue-200 bg-blue-50">
                        <Mail className="h-4 w-4" />
                        <AlertDescription className="text-blue-700">
                          Make sure to check your spam folder if you don't see the email in your inbox.
                        </AlertDescription>
                      </Alert>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pt-6">
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium"
                        disabled={isLoading || !email}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending Reset Link...
                          </div>
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>

                      <div className="text-center text-sm text-gray-600">
                        Remember your password?{" "}
                        <Link 
                          to="/login" 
                          className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                        >
                          Sign in
                        </Link>
                      </div>
                    </CardFooter>
                  </form>
                </>
              )}
            </Card>

            {/* Additional Help */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-sm text-gray-500 mb-2">
                Still having trouble?
              </p>
              <a 
                href="mailto:support@bitebase.app" 
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium hover:underline"
              >
                Contact Support
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;