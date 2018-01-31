const { saveImageInfo, getLastFiveImages } = require('../../services/images.query');
const { db } = require('../../instances/db');

module.exports.saveImageInfo = async (payload) => {
  try {
    await db.queryToDb(saveImageInfo(payload));
  } catch (err) {
    console.log(err);
  }
};

module.exports.getLastFiveImages = async () => {
  let images;
  try {
    const data = await db.queryToDb(getLastFiveImages());
    images = data.rows.reverse();
  } catch (err) {
    images = err.message;
  }
  return images;
};