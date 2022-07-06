import { appAllPermission } from './help.test'

describe('auth.test', () => {
  const cli = appAllPermission.ins()

  it('auth.getTenantAccessToken', async () => {
    const resp = await cli.auth.getTenantAccessToken()
    expect(resp.data.expire).toBeDefined()
    expect(resp.data.token).toBeDefined()
    console.log('auth.getTenantAccessToken', resp)
  })

  it('auth.getAppAccessToken', async () => {
    const resp = await cli.auth.getAppAccessToken()
    expect(resp.data.expire).toBeDefined()
    expect(resp.data.token).toBeDefined()
    console.log('auth.getAppAccessToken', resp)
  })
})
