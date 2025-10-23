import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = "https://xtmzlvjwuokhxeqzqsbr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bXpsdmp3dW9raHhlcXpxc2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNTgxMzAsImV4cCI6MjA3NjYzNDEzMH0.ebzhbCfPw2YHWWkTErilVaodLRKEXwCf5Nl1CjhDuJE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // since we're on native
  },
});