import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types';

/**
 * Creates a Supabase client for server-side usage (Server Components, Route Handlers).
 * This client uses the anon key for read-only public data access.
 */
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
    );
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
