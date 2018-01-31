require('dotenv').config();

module.exports = {
  token: process.env.TELEGRAM_BOT_TOKEN,
  myIds: process.env.TELEGRAM_MY_IDS.split(',').map(id => parseInt(id))
};