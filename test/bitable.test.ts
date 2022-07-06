import { appAllPermission } from './help.test'

describe('bitable.test', () => {
  const cli = appAllPermission.ins()
  const appToken = 'bascn9T22ch7O8cfAuEza3Zv2tb'
  const tableID = 'tbly5aRriIYOT5SM'

  it('', async () => {
    const resp = await cli.bitable.getBitableViewList({
      app_token: appToken,
      table_id: tableID
    })
    expect(resp.data.items?.length).toBeGreaterThan(0)
  })
})

