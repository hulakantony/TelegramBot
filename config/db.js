require('dotenv').config();
const env = process.env;

module.exports = {
  user: env.RDS_USERNAME,
  host: env.RDS_HOSTNAME,
  database: env.RDS_DB_NAME,
  password: env.RDS_PASSWORD,
  port: env.RDS_PORT,
}