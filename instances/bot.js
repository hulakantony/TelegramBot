const TelegramBot = require('node-telegram-bot-api');
const { token } = require('../config/telegram');

module.exports = new TelegramBot(token, {polling: true});