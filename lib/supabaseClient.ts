import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://nxvcjlnnvehwjpghnplp.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_7yl__7dVBhnm5tjgVSbxKw_Wsz-wJBg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
