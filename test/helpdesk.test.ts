import { helpdeskAllPermission, userAdmin } from './help.test'

describe('helpdesk', () => {
  const cli = helpdeskAllPermission.ins()

  it('startHelpdeskService', async () => {
    await cli.helpdesk.startHelpdeskService({
      open_id: userAdmin.openID
    })
  }, 20 * 1000)

  it('getHelpdeskTicketList', async () => {
    const resp = await cli.helpdesk.getHelpdeskTicketList({})
    expect(resp.data.total).toBeGreaterThan(0)
    expect(resp.data.tickets?.length).toBeGreaterThan(0)
  }, 20 * 1000)

  it('getHelpdeskTicketMessageList', async () => {
    const resp = await cli.helpdesk.getHelpdeskTicketMessageList({
      ticket_id: '6958447406052540443'
    })
    expect(resp.data.messages?.length).toBeGreaterThan(0)
  }, 20 * 1000)
})
