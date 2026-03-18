import { createClient } from '@supabase/supabase-js'

// Используем именно те названия, которые у тебя в Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Ты че, даун? Только GET!' });
  }

  try {
    const { data, error } = await supabase
      .from('victims') // Убедись, что таблица называется именно victims
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
