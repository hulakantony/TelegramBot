require('dotenv').config();

module.exports = {
  token: process.env.TELEGRAM_BOT_TOKEN,
  myId: parseInt(process.env.TELEGRAM_MY_ID)
};