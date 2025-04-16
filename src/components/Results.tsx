import { UserData, FinancialData, RiskAssessment } from "@/pages/Index";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CircleCheck, AlertTriangle, CircleAlert, HeartHandshake, Sparkles } from "lucide-react";
import AdSenseTest from "./AdSenseTest";

interface ResultsProps {
  userData: UserData;
  financialData: FinancialData;
  riskAssessment: RiskAssessment;
  onReset: () => void;
}

const getRiskColor = (riskScore: number) => {
  if (riskScore <= 3) return "text-finance-green";
  if (riskScore <= 6) return "text-finance-yellow";
  return "text-finance-red";
};

const getRiskBgColor = (riskScore: number) => {
  if (riskScore <= 3) return "bg-green-100";
  if (riskScore <= 6) return "bg-yellow-100";
  return "bg-red-100";
};

const getRiskLabel = (riskScore: number) => {
  if (riskScore <= 3) return "Low";
  if (riskScore <= 6) return "Moderate";
  return "High";
};

const getRiskIcon = (riskScore: number) => {
  if (riskScore <= 3) return <CircleCheck className="h-6 w-6 text-finance-green" />;
  if (riskScore <= 6) return <AlertTriangle className="h-6 w-6 text-finance-yellow" />;
  return <CircleAlert className="h-6 w-6 text-finance-red" />;
};

const Results = ({ userData, financialData, riskAssessment, onReset }: ResultsProps) => {
  const { overallRisk, incomeRisk, savingsRisk, debtRisk, investmentRisk, recommendations } = riskAssessment;
  
  const riskAreas = [
    { name: "Income Security", risk: incomeRisk },
    { name: "Savings Buffer", risk: savingsRisk },
    { name: "Debt Management", risk: debtRisk },
    { name: "Investment Strategy", risk: investmentRisk },
  ];

  const advisorRecommendations = [
    "Consider consulting a Certified Financial Planner (CFP) to develop a comprehensive recession-readiness strategy tailored to your specific situation.",
    "A fee-only financial advisor can provide unbiased advice on optimizing your investment portfolio for economic downturns.",
    "If your debt-to-income ratio is high, a credit counselor can help you develop a debt management plan to reduce your financial vulnerability.",
    "Tax professionals can identify strategies to maximize tax efficiency during economic uncertainty.",
    "Insurance specialists can review your coverage to ensure you're adequately protected against major financial risks.",
    "Retirement specialists can help ensure your long-term plans remain on track despite short-term economic volatility."
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6 animate-fade-in">
        <h2 className="text-2xl font-semibold">Your Recession Readiness Results</h2>
        <p className="text-muted-foreground">
          Based on your answers, here's how prepared you are for economic uncertainty
        </p>
      </div>

      <div className="mb-8 animate-fade-in">
        <Card className={`border-0 ${getRiskBgColor(overallRisk)} hover-scale transition-all duration-300`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overall Risk Level</span>
              <span className={`text-2xl ${getRiskColor(overallRisk)}`}>
                {getRiskLabel(overallRisk)}
              </span>
            </CardTitle>
            <CardDescription>
              {overallRisk <= 3 
                ? "You're generally well-prepared for economic uncertainty. Continue to maintain your strong financial position while looking for opportunities to further strengthen weak areas." 
                : overallRisk <= 6 
                  ? "You have some vulnerabilities to address to improve your preparedness. Focus on the recommendations below to strengthen your financial resilience."
                  : "Your financial situation needs significant strengthening to weather economic uncertainty. Consider prioritizing the most critical recommendations below."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-6 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${overallRisk <= 3 ? 'bg-finance-green' : overallRisk <= 6 ? 'bg-finance-yellow' : 'bg-finance-red'} transition-all duration-1000 ease-out`}
                style={{ width: `${(overallRisk/10) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {riskAreas.map((area, index) => (
          <Card key={area.name} className={`border hover-scale transition-all duration-300 animate-fade-in stagger-${index + 1}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                {getRiskIcon(area.risk)}
                <span>{area.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className={`font-medium ${getRiskColor(area.risk)}`}>
                  {getRiskLabel(area.risk)} Risk
                </span>
                <span className="text-sm text-gray-500">
                  Score: {area.risk.toFixed(1)} / 10
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <AdSenseTest />

      <Card className="border-t-4 border-t-finance-teal mb-8 animate-fade-in hover-scale transition-all duration-300">
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>
            Actions to strengthen your financial position during economic uncertainty
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <li key={index} className={`flex gap-3 items-start animate-slide-in stagger-${index % 4 + 1}`}>
                <div className="bg-finance-light-green rounded-full p-1 mt-0.5">
                  <CircleCheck className="h-4 w-4 text-finance-green" />
                </div>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-purple-400 mb-8 animate-fade-in hover-scale transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartHandshake className="h-5 w-5 text-purple-500" />
            <span>Professional Financial Guidance</span>
          </CardTitle>
          <CardDescription>
            Consider consulting with these financial professionals for personalized advice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {advisorRecommendations.map((recommendation, index) => (
              <li key={index} className={`flex gap-3 items-start animate-slide-in stagger-${index % 4 + 1}`}>
                <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                </div>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="bg-purple-50 border-t border-purple-100">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Remember:</span> While this assessment provides a general overview, a qualified financial professional can offer tailored advice based on your complete financial picture and goals.
          </p>
        </CardFooter>
      </Card>

      <div className="flex justify-center animate-fade-in stagger-4">
        <Button 
          onClick={(e) => {
            (e.target as HTMLElement).classList.add('animate-pulse-once');
            setTimeout(onReset, 300);
          }} 
          className="px-6 bg-finance-blue hover:bg-blue-600 hover-scale"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default Results;
