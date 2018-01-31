process.on('uncaughtException', (err) => {
  console.log('There was an uncaught error', err);
  process.exit(1);
});
require('./bot')();