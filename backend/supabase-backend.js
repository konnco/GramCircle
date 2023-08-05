const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://bxuyjrcpcenvcjlqcyhx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4dXlqcmNwY2VudmNqbHFjeWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3MzU4NzEsImV4cCI6MjAwNjMxMTg3MX0.DR_tVR-Bw-_WrEliLw1jbfjOfsWjvvIl30Z_0N6vMN8'
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

module.exports = { supabase, setRememberMeSession, getRememberMeSession };
