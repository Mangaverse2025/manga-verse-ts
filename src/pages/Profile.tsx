
import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";

export default function Profile() {
  const [formData, setFormData] = useState({
    profileName: "John Doe",
    username: "johndoe123",
    userId: "user_12345", // Cannot be changed
    password: "••••••••",
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && newPassword.length > 0) {
      setFormData({
        ...formData,
        password: "••••••••", // In a real app, we would update the actual password
      });
      setIsPasswordModalOpen(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save the profile data to the backend
    console.log("Profile data saved:", formData);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="flex flex-col items-center mb-6 sm:flex-row sm:items-start sm:gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center sm:mt-0 sm:text-left flex-1">
              <h2 className="text-xl font-semibold">{formData.profileName}</h2>
              <p className="text-muted-foreground">@{formData.username}</p>
              <Button variant="outline" size="sm" className="mt-2">Change Photo</Button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="profileName">Profile Name</Label>
              <Input 
                id="profileName"
                name="profileName"
                value={formData.profileName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="userId">User ID</Label>
              <Input 
                id="userId"
                value={formData.userId}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">User ID cannot be changed</p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex gap-2">
                <Input 
                  id="password"
                  type="password"
                  value={formData.password}
                  readOnly
                  className="flex-1"
                />
                <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Change Password</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>
                        Enter your new password below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input 
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input 
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handlePasswordChange}>Change Password</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
