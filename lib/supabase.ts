import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = "https://kojaostsmdfdthnczeaf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvamFvc3RzbWRmZHRobmN6ZWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODAzOTYsImV4cCI6MjA3NzU1NjM5Nn0.2hy2NKZ65NFFbIBe1Ko03LeGcsAybwLiROJFXO0fwc0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // since we're on native
  },
});