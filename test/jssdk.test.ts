import { appAllPermission } from './help.test'

describe('file', () => {
  const cli = appAllPermission.ins()

  it('uploadImage', async () => {
    const resp = await cli.jssdk.getJssdkTicket({})
    expect(resp.data.ticket).toBeDefined()
  }, 20 * 1000)

  // it('uploadImage', async () => {
  // const resp = await cli.jssdk.GenerateJssdkSignature({url: "https://m.mm.cn/ttc/3541093/3131_1.html"})
  // expect(resp.data.ticket).toBeDefined()
  // }, 20 * 1000)

})
