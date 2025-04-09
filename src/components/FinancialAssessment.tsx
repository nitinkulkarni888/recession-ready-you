
import { useState } from "react";
import { UserData, FinancialData } from "@/pages/Index";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

interface FinancialAssessmentProps {
  userData: UserData;
  onSubmit: (data: FinancialData) => void;
}

const questions = [
  {
    id: "incomeStability",
    title: "Income Stability",
    description: "How stable is your current source of income?",
    min: 1,
    max: 10,
    minLabel: "Highly unstable",
    maxLabel: "Very stable",
    tip: "Consider factors like job security, industry stability, and your employer's financial health.",
  },
  {
    id: "monthlyExpenses",
    title: "Monthly Expenses",
    description: "What percentage of your monthly income do you spend on essential expenses?",
    min: 1,
    max: 10,
    minLabel: "90%+ (High)",
    maxLabel: "Below 50% (Low)",
    tip: "Essential expenses include housing, utilities, food, and transportation.",
  },
  {
    id: "emergencyFund",
    title: "Emergency Fund",
    description: "How many months of expenses could you cover with your emergency savings?",
    min: 1,
    max: 10,
    minLabel: "None",
    maxLabel: "12+ months",
    tip: "Financial experts typically recommend having 3-6 months of expenses saved.",
  },
  {
    id: "debtToIncome",
    title: "Debt-to-Income Ratio",
    description: "How would you rate your debt-to-income ratio?",
    min: 1,
    max: 10,
    minLabel: "Very high",
    maxLabel: "Very low/no debt",
    tip: "This includes all debt payments (mortgage, car loans, credit cards, etc.) divided by your monthly income.",
  },
  {
    id: "monthlySavings",
    title: "Monthly Savings Rate",
    description: "What percentage of your income do you save or invest monthly?",
    min: 1,
    max: 10,
    minLabel: "0%",
    maxLabel: "30%+",
    tip: "This includes retirement contributions, investments, and regular savings.",
  },
  {
    id: "jobMarketability",
    title: "Job Marketability",
    description: "How easy would it be for you to find a new job if you lost your current one?",
    min: 1,
    max: 10,
    minLabel: "Very difficult",
    maxLabel: "Very easy",
    tip: "Consider your skills, experience, education, and the demand for your profession.",
  },
  {
    id: "investmentDiversity",
    title: "Investment Diversity",
    description: "How diversified are your investments?",
    min: 1,
    max: 10,
    minLabel: "Not diversified",
    maxLabel: "Highly diversified",
    tip: "Consider the variety of asset classes, sectors, and geographic regions in your portfolio.",
  },
  {
    id: "liquidAssets",
    title: "Liquid Assets",
    description: "How much of your net worth is in liquid assets that can be accessed quickly?",
    min: 1,
    max: 10,
    minLabel: "Very little",
    maxLabel: "Substantial amount",
    tip: "Liquid assets include cash, money market funds, and easily sellable investments.",
  },
  {
    id: "insuranceCoverage",
    title: "Insurance Coverage",
    description: "How comprehensive is your insurance coverage?",
    min: 1,
    max: 10,
    minLabel: "Minimal/none",
    maxLabel: "Comprehensive",
    tip: "Consider health, disability, life, and property insurance.",
  },
  {
    id: "skillUpgradation",
    title: "Skill Development",
    description: "How frequently do you update your professional skills?",
    min: 1,
    max: 10,
    minLabel: "Rarely/never",
    maxLabel: "Continuously",
    tip: "Regular skill upgrades improve your employment prospects during economic downturns.",
  },
];

const initialValues: FinancialData = {
  incomeStability: 5,
  monthlyExpenses: 5,
  emergencyFund: 5,
  debtToIncome: 5,
  monthlySavings: 5,
  jobMarketability: 5,
  investmentDiversity: 5,
  liquidAssets: 5,
  insuranceCoverage: 5,
  skillUpgradation: 5,
};

const FinancialAssessment = ({ userData, onSubmit }: FinancialAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<FinancialData>(initialValues);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSliderChange = (value: number[]) => {
    const questionId = questions[currentQuestion].id as keyof FinancialData;
    setAnswers({
      ...answers,
      [questionId]: value[0]
    });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id as keyof FinancialData];

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold">{userData.name}'s Financial Assessment</h2>
        <p className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
      </div>
      
      <Progress value={progress} className="h-2 mb-6" />
      
      <Card className="border-t-4 border-t-finance-blue">
        <CardHeader>
          <CardTitle>{question.title}</CardTitle>
          <CardDescription>{question.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-4">
            <Slider
              defaultValue={[currentAnswer]}
              min={question.min}
              max={question.max}
              step={1}
              onValueChange={handleSliderChange}
              className="mb-6"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{question.minLabel}</span>
              <span>{question.maxLabel}</span>
            </div>
          </div>
          
          <div className="mt-4 bg-blue-50 p-3 rounded-md border border-finance-light-blue">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Tip:</span> {question.tip}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FinancialAssessment;
