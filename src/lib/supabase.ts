import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || url === 'sua_url_aqui') {
    throw new Error('Supabase não configurado. Adicione as variáveis de ambiente.')
  }

  _supabase = createClient(url, key)
  return _supabase
}
