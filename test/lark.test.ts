import { Lark } from '../src'

describe('Lark test', () => {
  it('cli.bot', async () => {
    const cli = new Lark({})
    const resp = await cli.bot.getBotInfo({})
    console.log('cli.bot', resp)
  })
})
