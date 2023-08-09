const { createClient } = require('@supabase/supabase-js');

const supabaseCreator = createClient(
    'https://lffhvhwoybnvilyeexgr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZmh2aHdveWJudmlseWVleGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NDM0NTMsImV4cCI6MjAwNjUxOTQ1M30.8yNPZrsC-xvv16sgt4tiWF3joFhlZpSNevG8VVDcKS4'
);

const REMEMBER_ME_STORAGE_KEY = 'supabase_remember_me';

const setRememberMeSession = (session) => {
  try {
    const fs = require('fs');
    fs.writeFileSync(REMEMBER_ME_STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Error writing session to file:', error);
  }
};

const getRememberMeSession = () => {
  try {
    const fs = require('fs');
    const sessionData = fs.readFileSync(REMEMBER_ME_STORAGE_KEY, 'utf8');
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Error reading session from file:', error);
    return null;
  }
};

module.exports = { supabaseCreator, setRememberMeSession, getRememberMeSession };