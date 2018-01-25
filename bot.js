module.exports = () => {
  require('./controllers/bot/onStart')();
  require('./controllers/bot/onMessage')();
}