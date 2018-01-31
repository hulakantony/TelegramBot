const makePhoto = require('./makePhoto');
const getMessages = require('./getMessages');
const myID = parseInt(require('../../../config/telegram').myId);
const bot = require('../../../instances/bot');
const { saveUserMessage } = require('../../database/messages');
const getImages = require('./getImages');

module.exports = () => {
  bot.on('message', (msg) => {
    saveUserMessage(msg);
    const chatId = msg.chat.id;
    const authorId = msg.from.id;
    const text = msg.text.trim().toLowerCase();
    if (msg.text[0] === '/') {
      return;
    }
    if (authorId !== myID) {
      bot.sendMessage(chatId, 'You are not allowed!');
      return;
    }
    if (text === 'make photo') {
      makePhoto(bot, chatId);
      return;
    }
    if (text === 'show last five messages') {
      getMessages(bot, chatId);
      return;
    }
    if (text === 'show last five photos') {
      getImages(bot, chatId);
      return;
    }
    bot.sendMessage(chatId, 'Unknown command');
  });
}