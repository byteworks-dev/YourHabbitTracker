import { createClient } from '@supabase/supabase-js'

// Diese Variablen werden von Vite automatisch geladen
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)