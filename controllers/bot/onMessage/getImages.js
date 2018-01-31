const { bucketName: Bucket } = require('../../../config/s3');
const { getLastFiveImages } = require('../../database/images');
const gets3Object = require('../../../utils/gets3Object');

module.exports = async (bot, chatId, s3) => {
  const images = await getLastFiveImages();
  for (let [index, file] of images.entries()) {
    try {
      let data = await gets3Object(file.image_name);
      bot.sendPhoto(chatId, data.Body, { 
        caption: `User: ${file.first_name} ${file.last_name} \nTime: ${file.captured_at}`,
        "reply_markup": index === images.length - 1 ? {
          "keyboard": [['Make photo','Show last five messages', 'Show last five photos']],
          "one_time_keyboard": true,
          } : ''
      });
    } catch (err) {
      console.log(err);
    }
  }
}