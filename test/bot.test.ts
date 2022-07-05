import { Lark } from '../src'

describe('bot.test', () => {
  const appID = process.env.LARK_APP_ALL_PERMISSION_APP_ID
  const appSecret = process.env.LARK_APP_ALL_PERMISSION_APP_SECRET

  it('bot.getBotInfo', async () => {
    const cli = new Lark({ appID, appSecret })
    const resp = await cli.bot.getBotInfo({})
    expect(resp.data.app_name).toBeDefined()
    // expect(resp.data.token).toBeDefined()
    console.log('bot.getBotInfo', resp)
  })
})
