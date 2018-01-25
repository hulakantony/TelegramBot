require('dotenv').config();
const env = process.env;

module.exports = {
  host: env.PI_HOST,
  password: env.PI_PASSWORD,
  user: env.PI_USER
};