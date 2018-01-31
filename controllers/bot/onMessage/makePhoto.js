const { Client } = require('ssh2');
const raspiConfig = require('../../../config/raspberry');
const { sshMakePhotoCommand } = require('../../../config/sshCommands');
const { saveImageInfo } = require('../../database/images');
const gets3Object = require('../../../utils/gets3Object');

module.exports = (bot, chatId) => {
  bot.sendMessage(chatId, 'Loading...');
  const conn = new Client();
  conn.on('error', (err) => {
    bot.sendMessage(chatId, 'Unable to connect to raspberry', {
      "reply_markup": {
        "keyboard": [['Make photo', 'Show last five messages', 'Show last five photos']],
        "one_time_keyboard": true,
      }
    });
  });
  conn.on('ready', function() {
    const date = new Date().getTime();
    console.log('[INFO]:  Client ready');
    conn.exec(`${sshMakePhotoCommand} "${date}"`, function(err, stream) {
      if (err) {
        bot.sendMessage(chatId, 'Unable to connect to raspberry', {
          "reply_markup": {
            "keyboard": [['Make photo', 'Show last five messages', 'Show last five photos']],
            "one_time_keyboard": true,
          }
        });
        return;
      }
      stream.on('close', function(code, signal) {
        console.log('[INFO]  Stream close');
        conn.end();
      }).on('data', async (response) => {
        if (response.toString().trim() !== 'Done') {
          return;
        }
        let data;
        try {
          data = await gets3Object(`${date}`);
        } catch (err) {
          console.log(err);
          bot.sendMessage(chatId, 'Something wrong with getting imase from S3', {
            "reply_markup": {
              "keyboard": [['Make photo', 'Show last five messages', 'Show last five photos']],
              "one_time_keyboard": true,
            }
          });
        }
        if (!data.Body.length) {
          stream.end();
          return;
        }
        saveImageInfo({ id: chatId, imageName: `${date}` });
        bot.sendPhoto(chatId, data.Body, {
          caption: new Date(date).toString(),
          "reply_markup": {
            "keyboard": [['Make photo', 'Show last five messages', 'Show last five photos']],
            "one_time_keyboard": true,
          }
        });
      }).stderr.on('data', function(data) {
        console.log('STDERR: ' + data);
      });
    })
  }).connect({
    ...raspiConfig,
    readyTimeout: 5000
  });
}