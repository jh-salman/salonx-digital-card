import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    const getSession = async ()=>{
      const {data} = await supabase.auth.getSession()
      setUser(data.session?.user ?? null);
    }
    getSession();

    const { data: subscription} = supabase.auth.onAuthStateChange((_event, session)=>{
      setUser(session?.user ?? null);
    })
    return ()=>{
      subscription.subscription.unsubscribe();
    }
  },[])


  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const signup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);