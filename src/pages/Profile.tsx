
import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LoginModal } from "@/components/auth/LoginModal";

interface ProfileData {
  username: string;
  email: string;
  avatar_url: string | null;
}

export default function Profile() {
  const { user, session, loading } = useAuth();
  const { toast } = useToast();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    email: "",
    avatar_url: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user && session) {
      fetchProfile();
    } else if (!loading && !user) {
      setIsLoginModalOpen(true);
    }
  }, [user, session, loading]);

  const fetchProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, email, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          await createProfile();
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load profile data.",
          });
        }
      } else if (data) {
        setProfileData({
          username: data.username || '',
          email: data.email || user.email || '',
          avatar_url: data.avatar_url,
        });
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username: user.user_metadata?.username || '',
          email: user.email || '',
        });

      if (error) {
        console.error('Error creating profile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create profile.",
        });
      } else {
        setProfileData({
          username: user.user_metadata?.username || '',
          email: user.email || '',
          avatar_url: null,
        });
      }
    } catch (error) {
      console.error('Unexpected error creating profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profileData.username,
          email: profileData.email,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save profile changes.",
        });
      } else {
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
      }
    } catch (error) {
      console.error('Unexpected error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Show login modal if not authenticated
  if (!user && !loading) {
    return (
      <>
        <MainLayout>
          <div className="max-w-2xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p className="text-muted-foreground mb-6">Please log in to view your profile.</p>
            <Button onClick={() => setIsLoginModalOpen(true)}>Log In</Button>
          </div>
        </MainLayout>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </>
    );
  }

  // Show loading state
  if (loading || isLoading) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="flex flex-col items-center mb-6 sm:flex-row sm:items-start sm:gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileData.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profileData.username}`} alt="Profile" />
              <AvatarFallback>{profileData.username?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center sm:mt-0 sm:text-left flex-1">
              <h2 className="text-xl font-semibold">{profileData.username || 'User'}</h2>
              <p className="text-muted-foreground">{profileData.email}</p>
              <p className="text-xs text-muted-foreground mt-1">User ID: {user?.id}</p>
              <Button variant="outline" size="sm" className="mt-2">Change Photo</Button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="userId">User ID</Label>
              <Input 
                id="userId"
                value={user?.id || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">User ID cannot be changed</p>
            </div>
            
            <div className="pt-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
