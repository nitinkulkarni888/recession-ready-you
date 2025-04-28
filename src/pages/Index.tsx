
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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-100 to-indigo-100 rounded-full opacity-30 animate-pulse" style={{ animationDuration: '10s' }} />
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Recession-Ready You
          </h1>
          <p className="mt-2 text-lg text-gray-600 animate-fade-in stagger-1">
            Assess your financial preparedness for economic downturns
          </p>
        </div>
        
        {/* Showing an ad at the top of the page */}
        <AdSenseTest />
        
        <Card className="shadow-xl animate-scale-in hover-scale finance-card border-0 overflow-hidden backdrop-blur-sm">
          <div className="h-2 finance-gradient-blue w-full"></div>
          <CardContent className="p-6">
            {currentStep === "user-info" && (
              <UserInfo onSubmit={handleUserInfoSubmit} />
            )}
            
            {currentStep === "assessment" && userData && (
              <FinancialAssessment 
                userData={userData} 
                onSubmit={handleAssessmentSubmit} 
              />
            )}
            
            {currentStep === "results" && userData && financialData && riskAssessment && (
              <Results 
                userData={userData}
                financialData={financialData}
                riskAssessment={riskAssessment}
                onReset={handleReset}
              />
            )}
          </CardContent>
        </Card>
        
        <div className="text-center mt-8 text-sm text-gray-500 animate-fade-in stagger-2">
          <p>This assessment is for educational purposes only and should not replace professional financial advice.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 transition-colors hover:underline">Privacy Policy</a>
            <a href="/terms" className="text-blue-600 hover:text-blue-700 transition-colors hover:underline">Terms of Service</a>
          </div>
        </div>
        
        {/* Showing an ad at the bottom of the page */}
        <div className="mt-8">
          <AdSenseTest />
        </div>
      </div>
    </div>
  );
};

export default Index;
