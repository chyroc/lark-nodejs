import { appAllPermission } from './help.test'

describe('bot.test', () => {
  const cli = appAllPermission.ins()

  it('bot.getBotInfo', async () => {
    const resp = await cli.bot.getBotInfo({})
    expect(resp.data.app_name).toEqual('lark-sdk')
  })
})
