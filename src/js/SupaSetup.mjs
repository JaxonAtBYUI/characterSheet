import { createClient } from "@supabase/supabase-js";

const url = "https://pvertqztxdvhgswnekwf.supabase.co";
const key = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2ZXJ0cXp0eGR2aGdzd25la3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg2MjkxMTgsImV4cCI6MTk4NDIwNTExOH0.CQbNx02KpU4Dt7okNusqGBwqOHqN-u1pTIZHDnbBJV8";
const supabase = createClient(url, process.env.SUPABASE_KEY);
export default supabase;