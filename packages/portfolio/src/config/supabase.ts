import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(
  'https://chojcamcqydloijjypzf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNob2pjYW1jcXlkbG9pamp5cHpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MDg0Nzk2NSwiZXhwIjoyMDA2NDIzOTY1fQ.OWwMtWEo9TqfsHaCFUTJTH3f_Fd6K8ecBxky2iTWUzQ'
);

export default supabaseClient;
