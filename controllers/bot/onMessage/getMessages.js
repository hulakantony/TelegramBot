const { getLastFiveMessages } = require('../../database/messages');

module.exports = async (bot, chatId) => {
  const message = await getLastFiveMessages();
  bot.sendMessage(chatId, message, {
    "reply_markup": {
      "keyboard": [['Make photo','Show last five messages', 'Show last five photos']],
      "one_time_keyboard": true,
      }
  });
} 