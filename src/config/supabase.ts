import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(
  process.env.SUPABASE_URL || 'https://supabase.co',
  process.env.SUPABASE_ANON_PUBLIC || 'something'
);

export default supabaseClient;
