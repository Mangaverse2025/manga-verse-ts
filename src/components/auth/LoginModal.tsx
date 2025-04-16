
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome } from "lucide-react";  // Using Chrome icon as a replacement for Google

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-md">
        {isLogin ? (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold">Welcome back!</h2>
              <p className="text-sm text-muted-foreground">Log in to your account</p>
            </div>
            
            <Button variant="outline" className="w-full">
              <Chrome className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username or Email</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username or email" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                />
              </div>
              
              <div className="text-sm">
                <a href="#" className="text-primary hover:text-primary/90">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <Button className="w-full">Log in</Button>
            
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="text-primary font-medium hover:text-primary/90"
              >
                Register Now
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold">Create an account</h2>
              <p className="text-sm text-muted-foreground">Sign up to join MangaVerse</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input 
                  id="register-username" 
                  placeholder="Choose a username" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  placeholder="Enter your email" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  placeholder="Create a password" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Confirm password</Label>
                <Input 
                  id="register-confirm" 
                  type="password" 
                  placeholder="Confirm your password" 
                />
              </div>
            </div>
            
            <Button className="w-full">Register</Button>
            
            <div className="text-center text-sm">
              Already have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="text-primary font-medium hover:text-primary/90"
              >
                Login Now
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
