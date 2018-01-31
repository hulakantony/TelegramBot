const s3 = require('../instances/s3');
const { bucketName: Bucket } = require('../config/s3');

module.exports = (Key) => {
  return new Promise((resolve, reject) => {
    s3.getObject({ Bucket, Key }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}