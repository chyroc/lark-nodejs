import { Lark } from '../src'

describe('applink.test', () => {
  const appID = process.env.LARK_APP_ALL_PERMISSION_APP_ID
  const appSecret = process.env.LARK_APP_ALL_PERMISSION_APP_SECRET
  const cli = new Lark({ appID, appSecret })

  it('bot', async () => {
    const resp = cli.applink.openBot({ appId: 'cli_x' })
    console.log(resp)
    expect(resp).toEqual('https://applink.feishu.cn/client/bot/open?appId=cli_x')
  })

  it('calendar', async () => {
    const resp = cli.applink.openCalender({})
    console.log(resp)
    expect(resp).toEqual('https://applink.feishu.cn/client/calendar/open')
  })

  it('calender_account', async () => {
    const resp = cli.applink.openCalenderAccount({})
    console.log(resp)
    expect(resp).toEqual('https://applink.feishu.cn/client/calendar/account')
  })

  it('calender_event_create.1', async () => {
    const resp = cli.applink.openCalenderEventCreate({
      startTime: '1581950880'
    })
    console.log(resp)
    expect(resp).toEqual('https://applink.feishu.cn/client/calendar/event/create?startTime=1581950880')
  })
  it('calender_event_create.2', async () => {
    const resp = cli.applink.openCalenderEventCreate({
      startTime: '1581950880',
      endTime: '1581951000'
    })
    console.log(resp)
    expect(resp).toEqual('https://applink.feishu.cn/client/calendar/event/create?endTime=1581951000&startTime=1581950880')
  })
  it('calender_event_create.3', async () => {
    const resp = cli.applink.openCalenderEventCreate({
      startTime: '1581950880',
      summary: '主题'
    })
    console.log(resp)
    expect(resp).toEqual('https://applink.feishu.cn/client/calendar/event/create?startTime=1581950880&summary=%E4%B8%BB%E9%A2%98')
  })

  it('calendar_view', async () => {
    expect(cli.applink.openCalenderView({ type: 'week' })).toEqual('https://applink.feishu.cn/client/calendar/view?type=week')
    expect(cli.applink.openCalenderView({ type: 'meeting' })).toEqual('https://applink.feishu.cn/client/calendar/view?type=meeting')
    expect(cli.applink.openCalenderView({
      type: 'day',
      date: '1581999948'
    })).toEqual('https://applink.feishu.cn/client/calendar/view?date=1581999948&type=day')
  })

  it('chat', async () => {
    expect(cli.applink.openChat({ openId: '1234567890' })).toEqual('https://applink.feishu.cn/client/chat/open?openId=1234567890')
    expect(cli.applink.openChat({ openChatId: 'oc_41e7bdf4877cfc316136f4ccf6c32613' })).toEqual('https://applink.feishu.cn/client/chat/open?openChatId=oc_41e7bdf4877cfc316136f4ccf6c32613')
  })

  it('docs', async () => {
    expect(cli.applink.openDocs({ URL: 'https://bytedance.feishu.cn/docs/doccn9EOHrnB0r0iEN9HoCPczbf' })).toEqual('https://applink.feishu.cn/client/docs/open?URL=https%3A%2F%2Fbytedance.feishu.cn%2Fdocs%2Fdoccn9EOHrnB0r0iEN9HoCPczbf')
  })

  it('lark', async () => {
    expect(cli.applink.openLark({})).toEqual('https://applink.feishu.cn/client/op/open')
  })

  it('mini-pro', async () => {
    expect(cli.applink.openMiniProgram({
      appId: '1234567890',
      mode: 'window'
    })).toEqual('https://applink.feishu.cn/client/mini_program/open?appId=1234567890&mode=window')
    expect(cli.applink.openMiniProgram({
      appId: '1234567890',
      mode: 'window',
      path: 'pages/home'
    })).toEqual('https://applink.feishu.cn/client/mini_program/open?appId=1234567890&mode=window&path=pages%2Fhome')
    expect(cli.applink.openMiniProgram({
      appId: '1234567890',
      mode: 'window',
      path: 'pages/home?xid=123'
    })).toEqual('https://applink.feishu.cn/client/mini_program/open?appId=1234567890&mode=window&path=pages%2Fhome%3Fxid%3D123')
    expect(cli.applink.openMiniProgram({
      appId: '1234567890',
      mode: 'window',
      path: 'pages/home?xid=123',
      path_pc: 'pages/pc_home?pid=123'
    })).toEqual('https://applink.feishu.cn/client/mini_program/open?appId=1234567890&mode=window&path=pages%2Fhome%3Fxid%3D123&path_pc=pages%2Fpc_home%3Fpid%3D123')
  })

  it('sso', async () => {
    expect(cli.applink.openSSOLogin({
      sso_domain: 'sso.domain.com',
      tenant_name: 'tenant-id'
    })).toEqual('https://applink.feishu.cn/client/passport/sso_login?sso_domain=sso.domain.com&tenant_name=tenant-id')
  })

  it('web', async () => {
    expect(cli.applink.openWebApp({
      appId: 'app-id'
    })).toEqual('https://applink.feishu.cn/client/web_app/open?appId=app-id')
    expect(cli.applink.openWebURL({
      url: 'google.com',
      mode: 'window'
    })).toEqual('https://applink.feishu.cn/client/web_url/open?mode=window&url=google.com')
  })
})


