import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
    'https://lffhvhwoybnvilyeexgr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZmh2aHdveWJudmlseWVleGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NDM0NTMsImV4cCI6MjAwNjUxOTQ1M30.8yNPZrsC-xvv16sgt4tiWF3joFhlZpSNevG8VVDcKS4'
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

export { supabase, setRememberMeSession, getRememberMeSession };