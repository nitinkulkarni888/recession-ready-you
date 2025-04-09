
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
      <h2 className="text-2xl font-semibold text-center mb-6">Let's Get Started</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Your Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={errors.age ? "border-red-500" : ""}
            min="18"
            max="100"
          />
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </div>
        
        <Button type="submit" className="w-full bg-finance-blue hover:bg-blue-600">
          Continue to Assessment
        </Button>
      </form>
    </div>
  );
};

export default UserInfo;
