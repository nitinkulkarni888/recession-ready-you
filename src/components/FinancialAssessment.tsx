
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
    description: "How stable is your current source of income? Consider the reliability of your paycheck, the health of your industry, and your job security.",
    min: 1,
    max: 10,
    minLabel: "Highly unstable",
    maxLabel: "Very stable",
    tip: "Consider factors like job security, industry stability, your employer's financial health, and whether you have multiple income streams. Industries like healthcare, utilities, and government tend to be more recession-resistant than luxury goods or entertainment.",
  },
  {
    id: "monthlyExpenses",
    title: "Monthly Expenses",
    description: "What percentage of your monthly income do you spend on essential expenses? Essential expenses include housing, utilities, food, transportation, insurance, and minimum debt payments.",
    min: 1,
    max: 10,
    minLabel: "90%+ (High)",
    maxLabel: "Below 50% (Low)",
    tip: "Financial experts recommend that essential expenses should ideally be below 50% of your income. The lower your essential expenses ratio, the more financial flexibility you have during economic downturns. Consider which expenses could be reduced quickly if needed.",
  },
  {
    id: "emergencyFund",
    title: "Emergency Fund",
    description: "How many months of expenses could you cover with your emergency savings? This should be money that's easily accessible in high-yield savings accounts or similar liquid assets.",
    min: 1,
    max: 10,
    minLabel: "None",
    maxLabel: "12+ months",
    tip: "Financial experts typically recommend having 3-6 months of expenses saved during normal times, but 6-12 months is better preparation for a recession. Your emergency fund should be in cash or cash equivalents that can be accessed without penalties or market risk.",
  },
  {
    id: "debtToIncome",
    title: "Debt-to-Income Ratio",
    description: "How would you rate your debt-to-income ratio? This is calculated by dividing your total monthly debt payments by your gross monthly income.",
    min: 1,
    max: 10,
    minLabel: "Very high",
    maxLabel: "Very low/no debt",
    tip: "A healthy debt-to-income ratio is typically below 36%. During economic uncertainty, lower is better as it reduces your fixed monthly obligations. Prioritize paying down high-interest debt like credit cards before a recession hits.",
  },
  {
    id: "monthlySavings",
    title: "Monthly Savings Rate",
    description: "What percentage of your income do you save or invest monthly? This includes retirement contributions, investments, and regular savings.",
    min: 1,
    max: 10,
    minLabel: "0%",
    maxLabel: "30%+",
    tip: "Aim to save at least 20% of your income. During uncertain economic times, you might want to adjust the allocation between investments and cash savings to build more liquidity. The higher your savings rate, the faster you can recover from financial setbacks.",
  },
  {
    id: "jobMarketability",
    title: "Job Marketability",
    description: "How easy would it be for you to find a new job if you lost your current one? Consider your skills, experience, industry demand, and local job market conditions.",
    min: 1,
    max: 10,
    minLabel: "Very difficult",
    maxLabel: "Very easy",
    tip: "Having in-demand, transferable skills across multiple industries provides security during downturns. Update your resume and professional profiles now, and maintain your professional network before you need it. Consider which adjacent industries might value your expertise.",
  },
  {
    id: "investmentDiversity",
    title: "Investment Diversity",
    description: "How diversified are your investments across different asset classes, sectors, and geographic regions? Diversification helps reduce risk during market volatility.",
    min: 1,
    max: 10,
    minLabel: "Not diversified",
    maxLabel: "Highly diversified",
    tip: "A well-diversified portfolio might include stocks, bonds, real estate, and perhaps some alternative investments appropriate for your risk tolerance. During recessions, historically defensive sectors like utilities, healthcare, and consumer staples tend to outperform, while having some international exposure can protect against domestic downturns.",
  },
  {
    id: "liquidAssets",
    title: "Liquid Assets",
    description: "How much of your net worth is in liquid assets that can be accessed quickly without significant penalties or losses? Liquid assets can be converted to cash within days.",
    min: 1,
    max: 10,
    minLabel: "Very little",
    maxLabel: "Substantial amount",
    tip: "Liquid assets include cash, money market funds, and easily sellable investments. During economic uncertainty, having 6-12 months of expenses in liquid assets provides a crucial safety buffer. Avoid having to sell investments at a loss or tap into retirement accounts early.",
  },
  {
    id: "insuranceCoverage",
    title: "Insurance Coverage",
    description: "How comprehensive is your insurance coverage across health, disability, life, property, and liability? Adequate insurance prevents financial catastrophes.",
    min: 1,
    max: 10,
    minLabel: "Minimal/none",
    maxLabel: "Comprehensive",
    tip: "Insurance becomes even more important during economic downturns. Health and disability insurance protect against high medical costs and income loss. Review your policies annually to ensure coverage matches your current situation and consider umbrella policies for additional liability protection.",
  },
  {
    id: "skillUpgradation",
    title: "Skill Development",
    description: "How frequently do you update your professional skills through continuing education, certifications, or training? Staying current in your field maintains your employability.",
    min: 1,
    max: 10,
    minLabel: "Rarely/never",
    maxLabel: "Continuously",
    tip: "Continuous learning keeps you competitive in the job market. During economic downturns, employers often retain employees with the most current, relevant skills. Consider which skills are emerging in your industry and which might become automated or obsolete.",
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
        <h2 className="text-2xl font-semibold text-gray-800">{userData.name}'s Financial Assessment</h2>
        <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
      </div>
      
      <Progress value={progress} className="h-2 mb-6" />
      
      <Card className="finance-card border-0 overflow-hidden">
        <div className="h-1 finance-gradient-blue w-full"></div>
        <CardHeader>
          <CardTitle className="text-gray-800">{question.title}</CardTitle>
          <CardDescription className="mt-2 text-gray-600">{question.description}</CardDescription>
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
          
          <div className="mt-4 bg-blue-50 p-4 rounded-md border border-finance-light-blue">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Expert Tip:</span> {question.tip}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between bg-gray-50 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-white"
          >
            Previous
          </Button>
          <Button onClick={handleNext} className="finance-button">
            {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FinancialAssessment;
