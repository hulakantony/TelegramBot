const { saveUserMessage, getLastFiveMessages } = require('../../services/messages.query');
const { db } = require('../../instances/db');

module.exports.saveUserMessage = async (msg) => {
  try {
    await db.queryToDb(saveUserMessage(msg));
  } catch (err) {
    console.log(err);
  }
};

module.exports.getLastFiveMessages = async () => {
  let messages;
  try {
    const data = await db.queryToDb(getLastFiveMessages());
    messages = data.rows.reduce((sum, row) => {
      const dateSting = new Date(row.sended_at).toString().split('GMT')[0].trim();
      return sum += `User: ${row.first_name} ${row.last_name} \nText: ${row.text} \nDate: ${dateSting} \n\n`
    }, '');
  } catch (err) {
    messages = err.message;
  }
  return messages;
};