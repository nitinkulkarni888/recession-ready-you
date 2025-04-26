
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AdSenseTest from "@/components/AdSenseTest";

const Terms = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-finance-blue">Terms of Service</h1>
        </div>
        
        <AdSenseTest />
        
        <Card className="my-6 shadow-lg">
          <CardHeader>
            <CardTitle>Terms of Service for Recession-Ready You</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>Last updated: April 26, 2025</p>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Acceptance of Terms</h3>
              <p>
                By accessing or using Recession-Ready You, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you do not have permission to access the service.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Description of Service</h3>
              <p>
                Recession-Ready You is a financial assessment tool designed to provide users with insights regarding their financial preparedness for economic downturns. The service is provided "as is" without any guarantees or warranties.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Financial Disclaimer</h3>
              <p>
                The information provided by Recession-Ready You is for educational and informational purposes only. It should not be considered financial advice. Always consult with a qualified financial professional before making important financial decisions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Advertisements</h3>
              <p>
                Recession-Ready You displays advertisements provided by Google AdSense. We are not responsible for the content of these advertisements. By using our service, you acknowledge that we are not responsible for any losses or damages that may arise from your interaction with these advertisements.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">User Responsibilities</h3>
              <p>
                Users are responsible for the accuracy of the information they provide for the assessment. Inaccurate information may result in misleading assessments.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Limitation of Liability</h3>
              <p>
                Recession-Ready You and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the service.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Changes to Terms</h3>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of the service following the posting of changes constitutes your acceptance of such changes.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p>
                If you have questions about these Terms of Service, please contact us at terms@recession-ready-you.example.com.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center my-6">
          <Button asChild>
            <Link to="/">Return to Assessment</Link>
          </Button>
        </div>
        
        <AdSenseTest />
      </div>
    </div>
  );
};

export default Terms;
