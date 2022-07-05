import { Lark } from '../src'

describe('auth.test', () => {
  const appID = process.env.LARK_APP_ALL_PERMISSION_APP_ID
  const appSecret = process.env.LARK_APP_ALL_PERMISSION_APP_SECRET

  it('auth.getTenantAccessToken', async () => {
    const cli = new Lark({ appID, appSecret })
    const resp = await cli.auth.getTenantAccessToken()
    expect(resp.data.expire).toBeDefined()
    expect(resp.data.token).toBeDefined()
    console.log('auth.getTenantAccessToken', resp)
  })

  it('auth.getAppAccessToken', async () => {
    const cli = new Lark({ appID, appSecret })
    const resp = await cli.auth.getAppAccessToken()
    expect(resp.data.expire).toBeDefined()
    expect(resp.data.token).toBeDefined()
    console.log('auth.getAppAccessToken', resp)
  })
})
