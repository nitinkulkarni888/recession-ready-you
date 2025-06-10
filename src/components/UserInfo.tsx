
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
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent animate-glow">
        Let's Get Started
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3 animate-fade-in stagger-1">
          <Label htmlFor="name" className="text-gray-700 font-semibold text-lg">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`transition-all duration-300 text-lg py-3 ${errors.name ? "border-red-500" : "hover:border-purple-400 focus:border-blue-500"} bg-white/90 backdrop-blur-sm hover:bg-white focus:bg-white rounded-xl border-2 hover:shadow-lg focus:shadow-xl`}
          />
          {errors.name && <p className="text-sm text-red-500 animate-fade-in font-medium">{errors.name}</p>}
        </div>
        
        <div className="space-y-3 animate-fade-in stagger-2">
          <Label htmlFor="age" className="text-gray-700 font-semibold text-lg">Your Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`transition-all duration-300 text-lg py-3 ${errors.age ? "border-red-500" : "hover:border-purple-400 focus:border-blue-500"} bg-white/90 backdrop-blur-sm hover:bg-white focus:bg-white rounded-xl border-2 hover:shadow-lg focus:shadow-xl`}
            min="18"
            max="100"
          />
          {errors.age && <p className="text-sm text-red-500 animate-fade-in font-medium">{errors.age}</p>}
        </div>
        
        <Button 
          type="submit" 
          className="w-full finance-button hover-scale text-lg py-4 rounded-xl font-semibold animate-fade-in stagger-3"
          onClick={() => !errors.name && !errors.age && document.querySelector('button[type="submit"]')?.classList.add('animate-pulse-once')}
        >
          Continue to Assessment ✨
        </Button>
      </form>
    </div>
  );
};

export default UserInfo;
