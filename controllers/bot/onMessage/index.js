const makePhoto = require('./makePhoto');
const myID = parseInt(require('../../../config/telegram').myId);
const bot = require('../../../instances/bot');
const s3 = require('../../../instances/s3');

module.exports = () => {
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const authorId = msg.from.id;
    if (msg.text[0] === '/') {
      return;
    }
    if (authorId !== myID) {
      bot.sendMessage(chatId, 'You are not allowed!');
      return;
    }
    if (msg.text.trim().toLowerCase() !== 'make photo') {
      bot.sendMessage(chatId, 'Unknown command');
      return;
    }
    makePhoto(bot, chatId, s3);
  });
}