
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AdSenseTest from "@/components/AdSenseTest";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-finance-blue">Privacy Policy</h1>
        </div>
        
        <AdSenseTest />
        
        <Card className="my-6 shadow-lg">
          <CardHeader>
            <CardTitle>Privacy Policy for Recession-Ready You</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>Last updated: April 26, 2025</p>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Information We Collect</h3>
              <p>
                This application collects the following information from users:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Name and age provided during the assessment</li>
                <li>Financial information provided during the assessment</li>
                <li>Anonymous usage data to improve the application</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">How We Use the Information</h3>
              <p>
                We use the information you provide solely for the purpose of:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Generating personalized financial readiness assessments</li>
                <li>Improving our application and services</li>
                <li>Providing relevant recommendations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Google AdSense</h3>
              <p>
                We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your visit to our website and other websites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-finance-blue hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Data Storage</h3>
              <p>
                All the data you provide is stored locally on your device and is not transmitted to our servers. Your assessment data is not accessible to us or any third parties.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Cookie Policy</h3>
              <p>
                This application uses cookies to enhance user experience and for advertising purposes through Google AdSense. By using this application, you consent to our use of cookies.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p>
                If you have questions about this Privacy Policy, please contact us at privacy@recession-ready-you.example.com.
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

export default PrivacyPolicy;
