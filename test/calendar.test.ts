import { appAllPermission, userAdmin } from './help.test'

describe('calendar', () => {
  const cli = appAllPermission.ins()

  it('calendar.crud', async () => {
    const resp = await cli.bot.getBotInfo({})
    expect(resp.data.app_name).toEqual('lark-sdk')

    const createCalendarResp = await cli.calendar.createCalendar({
      summary: 'summary-test',
      description: 'desc-test'
    })
    const calendarID = createCalendarResp.data.calendar.calendar_id


    const getCalendarResp = await cli.calendar.getCalendar({
      calendar_id: calendarID
    })
    expect(getCalendarResp.data.summary).toEqual('summary-test')

    await cli.calendar.getCalendarList({})

    await cli.calendar.updateCalendar({
      calendar_id: calendarID,
      summary: 'summary-test-update'
    })

    await cli.calendar.subscribeCalendar({
      calendar_id: calendarID
    })

    await cli.calendar.unsubscribeCalendar({
      calendar_id: calendarID
    })

    await cli.calendar.deleteCalendar({
      calendar_id: calendarID
    })
  }, 20 * 1000)

  it('calendar.event.crud', async () => {
    const createCalendarResp = await cli.calendar.createCalendar({
      summary: 'summary-test',
      description: 'desc-test'
    })
    const calendarID = createCalendarResp.data.calendar.calendar_id

    const createEventResp = await cli.calendar.createCalendarEvent({
      calendar_id: calendarID,
      summary: 'summary-test',
      start_time: {
        date: '2020-09-01'
      },
      end_time: {
        date: '2020-09-02'
      }
    })
    const eventID = createEventResp.data.event.event_id

    const getCalendarEventResp = await cli.calendar.getCalendarEvent({
      calendar_id: calendarID,
      event_id: eventID
    })
    expect(getCalendarEventResp.data.event.summary).toEqual('summary-test')

    await cli.calendar.getCalendarEventList({
      calendar_id: calendarID
    })

    await cli.calendar.updateCalendarEvent({
      calendar_id: calendarID,
      event_id: eventID,
      summary: 'summary-test-update'
    })

    await cli.calendar.deleteCalendarEvent({
      calendar_id: calendarID,
      event_id: eventID
    })
  }, 20 * 1000)

  it('calendar.acl', async () => {
    const createCalendarResp = await cli.calendar.createCalendar({
      summary: 'summary-test',
      description: 'desc-test'
    })
    const calendarID = createCalendarResp.data.calendar.calendar_id

    const createCalendarACLResp = await cli.calendar.createCalendarACL({
      calendar_id: calendarID,
      role: 'writer',
      scope: {
        type: 'user',
        user_id: userAdmin.openID
      }
    })
    const aclID = createCalendarACLResp.data.acl_id

    await cli.calendar.getCalendarACLList({
      calendar_id: calendarID
    })

    await cli.calendar.deleteCalendarACL({
      calendar_id: calendarID,
      acl_id: aclID
    })

    await cli.calendar.deleteCalendar({
      calendar_id: calendarID
    })
  }, 20 * 1000)
})


