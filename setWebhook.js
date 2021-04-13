const { default: Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.TG_BOT_API_TOKEN)

if (!process.env.WORKER_ENDPOINT) {
  console.error('WORKER_ENDPOINT not set')
  process.exit(1)
}

if (!process.env.TG_BOT_API_TOKEN) {
  console.error('TG_BOT_API_TOKEN not set')
  process.exit(1)
}

bot.telegram
  .setWebhook(process.env.WORKER_ENDPOINT)
  .then((res) => (res ? console.info('OK') : console.error('NOT OK')))
