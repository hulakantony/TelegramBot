const { Client } = require('ssh2');
const raspiConfig = require('../../../config/raspberry');
const { bucketName: Bucket } = require('../../../config/s3');
const { sshMakePhotoCommand } = require('../../../config/sshCommands');

module.exports = (bot, chatId, s3) => {
  bot.sendMessage(chatId, 'Loading...');
  const conn = new Client();
  conn.on('error', (err) => {
    bot.sendMessage(chatId, 'Unable to connect to raspberry');
  });
  conn.on('ready', function() {
    const date = new Date().getTime();
    console.log('Client :: ready');
    conn.exec(`${sshMakePhotoCommand} "${date}"`, function(err, stream) {
      if (err) {
        bot.sendMessage(chatId, 'Unable to connect to raspberry');
        return;
      }
      stream.on('close', function(code, signal) {
        console.log('Stream :: close');
        conn.end();
      }).on('data', (response) => {
        if (response.toString().trim() !== 'Done') {
          return;
        }
       s3.getObject({ Bucket, Key: `${date}` }, function(err, data) {
          if (err) {
            console.log(err);
            bot.sendMessage(chatId, 'Something wrong with getting imase from S3');
          } else if (!data.Body.length) {
            stream.end();
            console.log('RETURN');
            return;
          } else {
            bot.sendPhoto(chatId, data.Body, {caption: new Date(date).toString()});
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