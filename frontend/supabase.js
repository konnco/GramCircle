import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseBrand = createClient(
  'https://bxuyjrcpcenvcjlqcyhx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4dXlqcmNwY2VudmNqbHFjeWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3MzU4NzEsImV4cCI6MjAwNjMxMTg3MX0.DR_tVR-Bw-_WrEliLw1jbfjOfsWjvvIl30Z_0N6vMN8'
);

const REMEMBER_ME_STORAGE_KEY = 'supabase_remember_me';

// Function to store user session in local storage
const setRememberMeSession = (session) => {
  localStorage.setItem(REMEMBER_ME_STORAGE_KEY, JSON.stringify(session));
};

// Function to get user session from local storage
const getRememberMeSession = () => {
  const sessionData = localStorage.getItem(REMEMBER_ME_STORAGE_KEY);
  return sessionData ? JSON.parse(sessionData) : null;
};

export { supabaseBrand, setRememberMeSession, getRememberMeSession };