
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle successful sign in
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in:', session.user.id);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message,
        });
      } else if (data.user) {
        console.log('Sign in successful:', data.user.id);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      }
      
      return { error };
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "An unexpected error occurred.",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username: username || '',
          }
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error.message,
        });
      } else if (data.user) {
        console.log('Sign up successful:', data.user.id);
        // Check if email confirmation is required
        if (!data.session) {
          toast({
            title: "Registration Successful!",
            description: "Please check your email to verify your account.",
          });
        } else {
          toast({
            title: "Registration Successful!",
            description: "Welcome! You are now logged in.",
          });
        }
      }
      
      return { error };
    } catch (error: any) {
      console.error('Unexpected sign up error:', error);
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: "An unexpected error occurred.",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          variant: "destructive",
          title: "Logout Error",
          description: "An error occurred while logging out.",
        });
      } else {
        console.log('Sign out successful');
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        });
      }
    } catch (error: any) {
      console.error('Unexpected sign out error:', error);
      toast({
        variant: "destructive",
        title: "Logout Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
