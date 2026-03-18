const { createClient } = require('@supabase/supabase-js');

// Этот код выведет ошибку в логи Vercel, если ключи пустые
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("ОШИБКА: Ключи Supabase не найдены в Environment Variables!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешаем запросы отовосюду
  
  try {
    const { data, error } = await supabase
      .from('victims')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message, details: "Проверь таблицу victims и ключи в Vercel" });
  }
};
