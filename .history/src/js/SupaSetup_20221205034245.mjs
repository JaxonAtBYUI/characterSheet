import { createClient } from "@supabase/supabase-js";

const url = "https://pvertqztxdvhgswnekwf.supabase.co";
const key = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2ZXJ0cXp0eGR2aGdzd25la3dmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2ODYyOTExOCwiZXhwIjoxOTg0MjA1MTE4fQ.MHpA-NzW_vug0UU_oNIA_x0Ctwf0VXM_52HwUnry7DA";
const supabase = createClient(url, process.env.SUPABASE_KEY);
export default supabase;