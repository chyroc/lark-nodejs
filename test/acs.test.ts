import { Lark } from '../src'

describe('acs.test', () => {
  const appID = process.env.LARK_APP_ALL_PERMISSION_APP_ID
  const appSecret = process.env.LARK_APP_ALL_PERMISSION_APP_SECRET

  it('acs.getACSUser', async () => {
    const cli = new Lark({ appID, appSecret })
    const resp = await cli.acs.getACSUser({
      user_id: 's'
    })
    // expect(resp.data.app_name).toBeDefined()
    // expect(resp.data.token).toBeDefined()
    console.log('acs.getACSUser', resp)
  })
})
