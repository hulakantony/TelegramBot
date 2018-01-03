module.exports = {
  apps: [{
    name: 'telegrambot',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-195-163-158.eu-central-1.compute.amazonaws.com',
      key: '~/Documents/Projects/bot/nodetelegram.pem',
      ref: 'origin/master',
      repo: 'git@github.com:hulakantony/TelegramBot.git',
      path: '/home/ubuntu/TelegramBot',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}