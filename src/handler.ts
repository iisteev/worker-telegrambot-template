import Telegraf from 'telegraf'

export async function handleRequest(request: Request): Promise<Response> {
  const bot = new Telegraf(TG_BOT_API_TOKEN)

  bot.start((ctx) => ctx.reply('Welcome'))
  bot.help((ctx) => ctx.reply('Send me a sticker'))
  bot.on('sticker', (ctx) => ctx.reply('👍'))
  bot.hears('hi', (ctx) => ctx.reply('Hey there'))

  const result = { success: true }
  try {
    await bot.handleUpdate(await request.json())
  } catch (error) {
    result.success = false
  } finally {
    const init = {
      headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify(result)
    return new Response(body, init)
  }
}
