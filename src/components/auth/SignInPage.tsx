import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-900 to-dark-800 text-gray-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-primary-500 inline-block mb-2"
          >
            🚗
          </motion.div>
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">Sign In to Carfolio</h1>
          <p className="text-gray-400">Welcome back to your car showcase</p>
        </div>
        
        <SignIn 
          routing="path" 
          path="/sign-in" 
          signUpUrl="/sign-up"
          appearance={{
            layout: {
              socialButtonsVariant: "iconButton",
              socialButtonsPlacement: "top",
              showOptionalFields: false,
              logoPlacement: "none",
            },
            elements: {
              rootBox: "w-full",
              card: "bg-dark-800/80 backdrop-blur-sm rounded-xl border border-dark-700 shadow-xl p-6",
              header: "hidden",
              footer: "pb-0",
                formButtonPrimary: 
                  "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                formFieldInput: 
                  "bg-dark-700/50 border-dark-600 text-gray-100 placeholder-gray-500 rounded-lg focus:ring-primary-500 focus:border-primary-500",
                formFieldLabel: "text-gray-300",
                footerActionText: "text-gray-400",
                footerActionLink: 
                  "text-primary-400 hover:text-primary-300 font-medium",
                dividerLine: "bg-dark-600",
                dividerText: "text-gray-500",
                identityPreviewEditButton: "text-primary-400",
                formFieldWarningText: "text-amber-400",
                formFieldErrorText: "text-red-400",
                socialButtonsIconButton: 
                  "border-dark-600 bg-dark-700/50 hover:bg-dark-600 text-gray-300",
                socialButtonsBlockButton: 
                  "border-dark-600 bg-dark-700/50 hover:bg-dark-600 text-gray-300",
                otpCodeFieldInput: 
                  "bg-dark-700/50 border-dark-600 text-gray-100",
              },
            }}
          />
        
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            By signing in, you agree to our{" "}
            <a href="#" className="text-primary-400 hover:text-primary-300">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-primary-400 hover:text-primary-300">Privacy Policy</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
