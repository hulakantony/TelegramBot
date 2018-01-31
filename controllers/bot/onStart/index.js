const { saveUserData } = require('../../database/users');
const bot = require('../../../instances/bot');

module.exports = () => {
  bot.onText(/\/start/, (msg) => {
    saveUserData(msg);
    bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
      "keyboard": [['Make photo','Show last five messages', 'Show last five photos']],
      "one_time_keyboard": true,
      }
    });
  });
}

