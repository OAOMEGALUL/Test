const { createClient } = require('@supabase/supabase-js');

// Инициализация клиента Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  // Разрешаем только отправку данных
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Используй POST!' });
  }

  const { name, description, link, photo_url, secret_key } = req.body;

  // ТВОЙ ПАРОЛЬ ПРЯМО ТУТ (можешь изменить на свой)
  const MY_SECRET_PASS = 'MEGALUL2026';

  if (secret_key !== MY_SECRET_PASS) {
    return res.status(403).json({ error: 'Пошел нахуй, неверный пароль!' });
  }

  try {
    const { data, error } = await supabase
      .from('victims')
      .insert([{ name, description, link, photo_url }]);

    if (error) throw error;

    return res.status(200).json({ success: true, message: 'Мамонт добавлен!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
