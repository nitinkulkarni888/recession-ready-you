
import { useState } from "react";
import FinancialAssessment from "@/components/FinancialAssessment";
import UserInfo from "@/components/UserInfo";
import Results from "@/components/Results";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import AdSenseTest from "@/components/AdSenseTest";

export type UserData = {
  name: string;
  age: number;
};

export type FinancialData = {
  incomeStability: number;
  monthlyExpenses: number;
  emergencyFund: number;
  debtToIncome: number;
  monthlySavings: number;
  jobMarketability: number;
  investmentDiversity: number;
  liquidAssets: number;
  insuranceCoverage: number;
  skillUpgradation: number;
};

export type RiskAssessment = {
  overallRisk: number;
  incomeRisk: number;
  savingsRisk: number;
  debtRisk: number;
  investmentRisk: number;
  recommendations: string[];
};

const Index = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<"user-info" | "assessment" | "results">("user-info");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null);

  const handleUserInfoSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentStep("assessment");
    toast({
      title: "Let's start your assessment",
      description: `Thanks, ${data.name}! Now let's evaluate your financial readiness for uncertain times.`,
    });
  };

  const handleAssessmentSubmit = (data: FinancialData) => {
    setFinancialData(data);
    
    // Calculate risk assessment
    const assessment = calculateRiskAssessment(data);
    setRiskAssessment(assessment);
    setCurrentStep("results");
    
    toast({
      title: "Assessment Complete!",
      description: "We've analyzed your financial situation and prepared recommendations for you.",
    });
  };

  const calculateRiskAssessment = (data: FinancialData): RiskAssessment => {
    // Income risk (lower is better)
    const incomeRisk = 10 - data.incomeStability - data.jobMarketability/2;
    
    // Savings risk (lower is better)
    const savingsRisk = 10 - data.emergencyFund - data.monthlySavings/2;
    
    // Debt risk (lower is better)
    const debtRisk = data.debtToIncome * 2;
    
    // Investment risk (lower is better)
    const investmentRisk = 10 - data.investmentDiversity - data.liquidAssets/2;
    
    // Overall risk (scale of 1-10, lower is better)
    const overallRisk = (incomeRisk + savingsRisk + debtRisk + investmentRisk) / 4;
    
    // Generate recommendations based on risk factors
    const recommendations: string[] = [];
    
    if (incomeRisk > 5) {
      recommendations.push("Consider developing multiple income streams to reduce dependency on a single job.");
      recommendations.push("Invest in building skills that are in high demand across different industries.");
    }
    
    if (savingsRisk > 5) {
      recommendations.push("Aim to build an emergency fund that covers 6-12 months of expenses.");
      recommendations.push("Review and reduce non-essential monthly expenses to increase your savings rate.");
    }
    
    if (debtRisk > 5) {
      recommendations.push("Prioritize paying down high-interest debt to reduce your debt-to-income ratio.");
      recommendations.push("Consider debt consolidation to lower your monthly payment obligations.");
    }
    
    if (investmentRisk > 5) {
      recommendations.push("Diversify your investment portfolio across different asset classes.");
      recommendations.push("Ensure you have some investments that can be quickly converted to cash if needed.");
    }
    
    if (data.insuranceCoverage < 5) {
      recommendations.push("Review your insurance coverage to ensure you're adequately protected during challenging times.");
    }
    
    if (data.skillUpgradation < 5) {
      recommendations.push("Continuously update your skills to maintain marketability in changing job markets.");
    }
    
    return {
      overallRisk,
      incomeRisk,
      savingsRisk,
      debtRisk,
      investmentRisk,
      recommendations
    };
  };

  const handleReset = () => {
    setCurrentStep("user-info");
    setUserData(null);
    setFinancialData(null);
    setRiskAssessment(null);
    toast({
      title: "Assessment Reset",
      description: "Start a new financial readiness assessment.",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 via-cyan-50 to-emerald-50 relative overflow-hidden">
      {/* Enhanced background decoration with vibrant colors */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 rounded-full opacity-40 animate-float" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-emerald-200 via-teal-200 to-blue-200 rounded-full opacity-40 animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-30 animate-breathe" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full opacity-30 animate-breathe" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent animate-glow">
            Recession-Ready You
          </h1>
          <p className="mt-4 text-xl text-gray-600 animate-fade-in stagger-1 font-medium">
            Assess your financial preparedness for economic downturns
          </p>
          <div className="mt-6 flex justify-center space-x-4 animate-fade-in stagger-2">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        {/* Enhanced AdSense with animation */}
        <div className="animate-fade-in stagger-3">
          <AdSenseTest />
        </div>
        
        <Card className="shadow-2xl animate-scale-in hover-scale finance-card border-0 overflow-hidden backdrop-blur-sm stagger-4 hover-glow">
          <div className="h-3 finance-gradient-rainbow w-full animate-rainbow"></div>
          <CardContent className="p-8">
            {currentStep === "user-info" && (
              <div className="animate-fade-in">
                <UserInfo onSubmit={handleUserInfoSubmit} />
              </div>
            )}
            
            {currentStep === "assessment" && userData && (
              <div className="animate-slide-in">
                <FinancialAssessment 
                  userData={userData} 
                  onSubmit={handleAssessmentSubmit} 
                />
              </div>
            )}
            
            {currentStep === "results" && userData && financialData && riskAssessment && (
              <div className="animate-scale-in">
                <Results 
                  userData={userData}
                  financialData={financialData}
                  riskAssessment={riskAssessment}
                  onReset={handleReset}
                />
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="text-center mt-8 text-sm text-gray-500 animate-fade-in stagger-5">
          <p className="mb-4 text-base font-medium bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
            This assessment is for educational purposes only and should not replace professional financial advice.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="/privacy-policy" className="text-purple-600 hover:text-purple-700 transition-all duration-300 hover:underline hover:scale-105 font-medium">Privacy Policy</a>
            <a href="/terms" className="text-blue-600 hover:text-blue-700 transition-all duration-300 hover:underline hover:scale-105 font-medium">Terms of Service</a>
          </div>
        </div>
        
        {/* Enhanced bottom ad with animation */}
        <div className="mt-12 animate-fade-in stagger-6">
          <AdSenseTest />
        </div>
      </div>
    </div>
  );
};

export default Index;
