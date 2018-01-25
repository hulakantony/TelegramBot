const { 
  checkUserExist, 
  userLoginQuery, 
  updateUserStartTime 
} = require('../../services/users.query');
const { db } = require('../../instances/db');

module.exports.saveUserData = async (msg) => {
  try {
    const existsData = await db.queryToDb(checkUserExist(msg.from.id));
    if (!existsData.rows[0].exists) {
      await db.queryToDb(userLoginQuery(msg.from))
    } else {
      await db.queryToDb(updateUserStartTime(msg.from.id))
    }
  } catch (err) {
    console.log(err);
  }
}