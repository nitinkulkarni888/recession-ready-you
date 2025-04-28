
import { useState } from "react";
import { UserData } from "@/pages/Index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface UserInfoProps {
  onSubmit: (data: UserData) => void;
}

const UserInfo = ({ onSubmit }: UserInfoProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    age: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {
      name: !name.trim() ? "Name is required" : "",
      age: !age.trim() 
        ? "Age is required" 
        : isNaN(Number(age)) || Number(age) <= 0 || Number(age) >= 120 
          ? "Please enter a valid age" 
          : "",
    };
    
    setErrors(newErrors);
    
    // If there are no errors, submit the data
    if (!newErrors.name && !newErrors.age) {
      onSubmit({
        name: name.trim(),
        age: Number(age),
      });
    } else {
      toast({
        title: "Please check your information",
        description: "We need your name and a valid age to continue.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Let's Get Started
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 animate-fade-in stagger-1">
          <Label htmlFor="name" className="text-gray-700 font-medium">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`transition-all ${errors.name ? "border-red-500" : "hover:border-blue-400 focus:border-blue-500"} bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white`}
          />
          {errors.name && <p className="text-sm text-red-500 animate-fade-in">{errors.name}</p>}
        </div>
        
        <div className="space-y-2 animate-fade-in stagger-2">
          <Label htmlFor="age" className="text-gray-700 font-medium">Your Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`transition-all ${errors.age ? "border-red-500" : "hover:border-blue-400 focus:border-blue-500"} bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white`}
            min="18"
            max="100"
          />
          {errors.age && <p className="text-sm text-red-500 animate-fade-in">{errors.age}</p>}
        </div>
        
        <Button 
          type="submit" 
          className="w-full finance-button hover-scale"
          onClick={() => !errors.name && !errors.age && document.querySelector('button[type="submit"]')?.classList.add('animate-pulse-once')}
        >
          Continue to Assessment
        </Button>
      </form>
    </div>
  );
};

export default UserInfo;
