const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  // Разрешаем только POST запросы (отправка формы)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '404 Not Found' });
  }

  const { name, description, link, photo_url, secret_key } = req.body;

  // Простая проверка, чтобы левые люди не засирали твою доску
  // Замени 'MEGALUL2026' на свой секретный пароль
  if (secret_key !== 'MEGALUL2026') {
    return res.status(403).json({ error: 'Неверный ключ доступа!' });
  }

  try {
    const { data, error } = await supabase
      .from('victims')
      .insert([{ name, description, link, photo_url }]);

    if (error) throw error;
    res.status(200).json({ success: true, message: 'Мамонт добавлен в Hall of Lulz!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

