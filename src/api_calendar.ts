import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class CalendarService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // createCalendarACL 该接口用于以当前身份（应用 / 用户）给日历添加访问控制权限, 即日历成员。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 当前身份需要有日历的 owner 权限, 并且日历的类型只能为 primary 或 shared。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/create
  async createCalendarACL(
    request: Calendar.CreateCalendarACLReq
  ): Promise<{
    data: Calendar.CreateCalendarACLResp
    response: Response
  }> {
    const req: RawRequestReq<CreateCalendarACLReq> = {
      scope: 'Calendar',
      api: 'CreateCalendarACL',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/acls',
      body: new CreateCalendarACLReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateCalendarACLReq, Calendar.CreateCalendarACLResp>(req)
  }
  // deleteCalendarACL 该接口用于以当前身份（应用 / 用户）删除日历的控制权限, 即日历成员。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 当前身份需要有日历的 owner 权限, 并且日历的类型只能为 primary 或 shared。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/delete
  async deleteCalendarACL(
    request: Calendar.DeleteCalendarACLReq
  ): Promise<{
    data: Calendar.DeleteCalendarACLResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteCalendarACLReq> = {
      scope: 'Calendar',
      api: 'DeleteCalendarACL',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/acls/:acl_id',
      body: new DeleteCalendarACLReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteCalendarACLReq, Calendar.DeleteCalendarACLResp>(req)
  }
  // getCalendarACLList 该接口用于以当前身份（应用 / 用户）获取日历的控制权限列表。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 当前身份需要有日历的 owner 权限, 并且日历的类型只能为 primary 或 shared。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/list
  async getCalendarACLList(
    request: Calendar.GetCalendarACLListReq
  ): Promise<{
    data: Calendar.GetCalendarACLListResp
    response: Response
  }> {
    const req: RawRequestReq<GetCalendarACLListReq> = {
      scope: 'Calendar',
      api: 'GetCalendarACLList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/acls',
      body: new GetCalendarACLListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetCalendarACLListReq, Calendar.GetCalendarACLListResp>(req)
  }
  // subscribeCalendarACL 该接口用于以用户身份订阅指定日历下的日历成员变更事件。
  //
  // 用户必须对日历有访问权限。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/subscription
  async subscribeCalendarACL(
    request: Calendar.SubscribeCalendarACLReq
  ): Promise<{
    data: Calendar.SubscribeCalendarACLResp
    response: Response
  }> {
    const req: RawRequestReq<SubscribeCalendarACLReq> = {
      scope: 'Calendar',
      api: 'SubscribeCalendarACL',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/acls/subscription',
      body: new SubscribeCalendarACLReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SubscribeCalendarACLReq, Calendar.SubscribeCalendarACLResp>(req)
  }
  // getPrimaryCalendar 获取当前身份的主日历信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/primary
  async getPrimaryCalendar(
    request: Calendar.GetPrimaryCalendarReq
  ): Promise<{
    data: Calendar.GetPrimaryCalendarResp
    response: Response
  }> {
    const req: RawRequestReq<GetPrimaryCalendarReq> = {
      scope: 'Calendar',
      api: 'GetPrimaryCalendar',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/primary',
      body: new GetPrimaryCalendarReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetPrimaryCalendarReq, Calendar.GetPrimaryCalendarResp>(req)
  }
  // createCalendar 该接口用于为当前身份（应用 / 用户）创建一个共享日历。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/create
  async createCalendar(
    request: Calendar.CreateCalendarReq
  ): Promise<{
    data: Calendar.CreateCalendarResp
    response: Response
  }> {
    const req: RawRequestReq<CreateCalendarReq> = {
      scope: 'Calendar',
      api: 'CreateCalendar',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars',
      body: new CreateCalendarReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateCalendarReq, Calendar.CreateCalendarResp>(req)
  }
  // deleteCalendar 该接口用于以当前身份（应用 / 用户）删除一个共享日历。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 当前身份必须对日历具有 owner 权限。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/delete
  async deleteCalendar(
    request: Calendar.DeleteCalendarReq
  ): Promise<{
    data: Calendar.DeleteCalendarResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteCalendarReq> = {
      scope: 'Calendar',
      api: 'DeleteCalendar',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id',
      body: new DeleteCalendarReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteCalendarReq, Calendar.DeleteCalendarResp>(req)
  }
  // getCalendar 该接口用于以当前身份（应用 / 用户）根据日历 ID 获取日历信息。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 当前身份必须对日历有访问权限。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get
  async getCalendar(
    request: Calendar.GetCalendarReq
  ): Promise<{
    data: Calendar.GetCalendarResp
    response: Response
  }> {
    const req: RawRequestReq<GetCalendarReq> = {
      scope: 'Calendar',
      api: 'GetCalendar',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id',
      body: new GetCalendarReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetCalendarReq, Calendar.GetCalendarResp>(req)
  }
  // getCalendarList 该接口用于分页获得当前身份（应用 / 用户）的日历列表。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 调用时首先使用 page_token 分页拉取存量数据, 之后使用 sync_token 增量同步变更数据。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/list
  async getCalendarList(
    request: Calendar.GetCalendarListReq
  ): Promise<{
    data: Calendar.GetCalendarListResp
    response: Response
  }> {
    const req: RawRequestReq<GetCalendarListReq> = {
      scope: 'Calendar',
      api: 'GetCalendarList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars',
      body: new GetCalendarListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetCalendarListReq, Calendar.GetCalendarListResp>(req)
  }
  // updateCalendar 该接口用于以当前身份（应用 / 用户）修改日历信息。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 当前身份对日历有 owner 权限时, 可修改全局字段: summary, description, permission。
  // 当前身份对日历不具有 owner 权限时, 仅可修改对自己生效的字段: color, summary_alias。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/patch
  async updateCalendar(
    request: Calendar.UpdateCalendarReq
  ): Promise<{
    data: Calendar.UpdateCalendarResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateCalendarReq> = {
      scope: 'Calendar',
      api: 'UpdateCalendar',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id',
      body: new UpdateCalendarReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateCalendarReq, Calendar.UpdateCalendarResp>(req)
  }
  // searchCalendar 该接口用于通过关键字查询公共日历或用户主日历。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/search
  async searchCalendar(
    request: Calendar.SearchCalendarReq
  ): Promise<{
    data: Calendar.SearchCalendarResp
    response: Response
  }> {
    const req: RawRequestReq<SearchCalendarReq> = {
      scope: 'Calendar',
      api: 'SearchCalendar',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/search',
      body: new SearchCalendarReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SearchCalendarReq, Calendar.SearchCalendarResp>(req)
  }
  // subscribeCalendar 该接口用于以当前身份（应用 / 用户）订阅某个日历。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // - 仅可订阅类型为 primary 或 shared 的公开日历。
  // - 可订阅日历数量上限为1000。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscribe
  async subscribeCalendar(
    request: Calendar.SubscribeCalendarReq
  ): Promise<{
    data: Calendar.SubscribeCalendarResp
    response: Response
  }> {
    const req: RawRequestReq<SubscribeCalendarReq> = {
      scope: 'Calendar',
      api: 'SubscribeCalendar',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/subscribe',
      body: new SubscribeCalendarReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SubscribeCalendarReq, Calendar.SubscribeCalendarResp>(req)
  }
  // unsubscribeCalendar 该接口用于以当前身份（应用 / 用户）取消对某日历的订阅状态。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 仅可操作已经被当前身份订阅的日历。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscribe
  async unsubscribeCalendar(
    request: Calendar.UnsubscribeCalendarReq
  ): Promise<{
    data: Calendar.UnsubscribeCalendarResp
    response: Response
  }> {
    const req: RawRequestReq<UnsubscribeCalendarReq> = {
      scope: 'Calendar',
      api: 'UnsubscribeCalendar',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/unsubscribe',
      body: new UnsubscribeCalendarReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UnsubscribeCalendarReq, Calendar.UnsubscribeCalendarResp>(req)
  }
  // subscribeCalendarChangeEvent 该接口用于以用户身份订阅当前身份下日历列表中的所有日历变更。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscription
  async subscribeCalendarChangeEvent(
    request: Calendar.SubscribeCalendarChangeEventReq
  ): Promise<{
    data: Calendar.SubscribeCalendarChangeEventResp
    response: Response
  }> {
    const req: RawRequestReq<SubscribeCalendarChangeEventReq> = {
      scope: 'Calendar',
      api: 'SubscribeCalendarChangeEvent',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/subscription',
      body: new SubscribeCalendarChangeEventReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      SubscribeCalendarChangeEventReq,
      Calendar.SubscribeCalendarChangeEventResp
    >(req)
  }
  // createCalendarEvent 该接口用于以当前身份（应用 / 用户）在日历上创建一个日程。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 当前身份必须对日历有 writer 或 owner 权限, 并且日历的类型只能为 primary 或 shared。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/create
  async createCalendarEvent(
    request: Calendar.CreateCalendarEventReq
  ): Promise<{
    data: Calendar.CreateCalendarEventResp
    response: Response
  }> {
    const req: RawRequestReq<CreateCalendarEventReq> = {
      scope: 'Calendar',
      api: 'CreateCalendarEvent',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/events',
      body: new CreateCalendarEventReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateCalendarEventReq, Calendar.CreateCalendarEventResp>(req)
  }
  // deleteCalendarEvent 该接口用于以当前身份（应用 / 用户）删除日历上的一个日程。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 当前身份必须对日历有 writer 或 owner 权限, 并且日历的类型只能为 primary 或 shared。
  // 当前身份必须是日程的组织者。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/delete
  async deleteCalendarEvent(
    request: Calendar.DeleteCalendarEventReq
  ): Promise<{
    data: Calendar.DeleteCalendarEventResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteCalendarEventReq> = {
      scope: 'Calendar',
      api: 'DeleteCalendarEvent',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id',
      body: new DeleteCalendarEventReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteCalendarEventReq, Calendar.DeleteCalendarEventResp>(req)
  }
  // getCalendarEvent 该接口用于以当前身份（应用 / 用户）获取日历上的一个日程。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // - 当前身份必须对日历有reader、writer或owner权限才会返回日程详细信息（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口, role字段可查看权限）。
  // - [例外日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction#71c5ec78)可通过event_id的非0时间戳后缀, 来获取修改的重复性日程的哪一天日程的时间信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/get
  async getCalendarEvent(
    request: Calendar.GetCalendarEventReq
  ): Promise<{
    data: Calendar.GetCalendarEventResp
    response: Response
  }> {
    const req: RawRequestReq<GetCalendarEventReq> = {
      scope: 'Calendar',
      api: 'GetCalendarEvent',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id',
      body: new GetCalendarEventReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetCalendarEventReq, Calendar.GetCalendarEventResp>(req)
  }
  // getCalendarEventList 该接口用于以当前身份（应用 / 用户）获取日历下的日程列表。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // - 当前身份必须对日历有reader、writer或owner权限才会返回日程详细信息（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口, role字段可查看权限）。
  // - 仅支持primary、shared和resource类型的日历获取日程列表。
  // - 调用时首先使用 page_token 分页拉取存量数据, 之后使用 sync_token 增量同步变更数据。
  // - 为了确保调用方日程同步数据的一致性, 在使用sync_token时, 不能同时使用start_time和end_time, 否则可能造成日程数据缺失。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/list
  async getCalendarEventList(
    request: Calendar.GetCalendarEventListReq
  ): Promise<{
    data: Calendar.GetCalendarEventListResp
    response: Response
  }> {
    const req: RawRequestReq<GetCalendarEventListReq> = {
      scope: 'Calendar',
      api: 'GetCalendarEventList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/events',
      body: new GetCalendarEventListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetCalendarEventListReq, Calendar.GetCalendarEventListResp>(req)
  }
  // updateCalendarEvent 该接口用于以当前身份（应用 / 用户）更新日历上的一个日程。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 当前身份必须对日历有 writer 或 owner 权限, 并且日历的类型只能为 primary 或 shared。
  // 当前身份为日程组织者时, 可修改所有可编辑字段。
  // 当前身份为日程参与者时, 仅可编辑部分字段。（如: visibility, free_busy_status, color, reminders）
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/patch
  async updateCalendarEvent(
    request: Calendar.UpdateCalendarEventReq
  ): Promise<{
    data: Calendar.UpdateCalendarEventResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateCalendarEventReq> = {
      scope: 'Calendar',
      api: 'UpdateCalendarEvent',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id',
      body: new UpdateCalendarEventReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateCalendarEventReq, Calendar.UpdateCalendarEventResp>(req)
  }
  // searchCalendarEvent 该接口用于以用户身份搜索某日历下的相关日程。
  //
  // 身份由 Header Authorization 的 Token 类型决定。
  // 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口, role字段可查看权限）。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/search
  async searchCalendarEvent(
    request: Calendar.SearchCalendarEventReq
  ): Promise<{
    data: Calendar.SearchCalendarEventResp
    response: Response
  }> {
    const req: RawRequestReq<SearchCalendarEventReq> = {
      scope: 'Calendar',
      api: 'SearchCalendarEvent',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/events/search',
      body: new SearchCalendarEventReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SearchCalendarEventReq, Calendar.SearchCalendarEventResp>(req)
  }
  // subscribeCalendarEvent 该接口用于以用户身份订阅指定日历下的日程变更事件。
  //
  // 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口, role字段可查看权限）。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/subscription
  async subscribeCalendarEvent(
    request: Calendar.SubscribeCalendarEventReq
  ): Promise<{
    data: Calendar.SubscribeCalendarEventResp
    response: Response
  }> {
    const req: RawRequestReq<SubscribeCalendarEventReq> = {
      scope: 'Calendar',
      api: 'SubscribeCalendarEvent',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/calendar/v4/calendars/:calendar_id/events/subscription',
      body: new SubscribeCalendarEventReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SubscribeCalendarEventReq, Calendar.SubscribeCalendarEventResp>(req)
  }
  // createCalendarEventAttendee 批量给日程添加参与人。
  //
  // - 当前身份需要有日历的 writer 或 owner 权限, 并且日历的类型只能为 primary 或 shared。
  // - 当前身份需要是日程的组织者, 或日程设置了「参与人可邀请其它参与人」权限。
  // - 新添加的日程参与人必须与日程组织者在同一个企业内。
  // - 使用该接口添加会议室后, 会议室会进入异步的预约流程, 请求结束不代表会议室预约成功, 需后续再查询预约状态。
  // - 每个日程最多只能有 3000 名参与人。
  // - 开启管理员能力后预约会议室可不受会议室预约范围的限制（当前不支持用管理员身份给其他人的日程预约会议室）
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/create
  async createCalendarEventAttendee(
    request: Calendar.CreateCalendarEventAttendeeReq
  ): Promise<{
    data: Calendar.CreateCalendarEventAttendeeResp
    response: Response
  }> {
    const req: RawRequestReq<CreateCalendarEventAttendeeReq> = {
      scope: 'Calendar',
      api: 'CreateCalendarEventAttendee',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees',
      body: new CreateCalendarEventAttendeeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      CreateCalendarEventAttendeeReq,
      Calendar.CreateCalendarEventAttendeeResp
    >(req)
  }
  // getCalendarEventAttendeeList 获取日程的参与人列表, 若参与者列表中有群组, 请使用 [获取参与人群成员列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list) 。
  //
  // - 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口, role字段可查看权限）。
  // - 当前身份必须有权限查看日程的参与人列表。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/list
  async getCalendarEventAttendeeList(
    request: Calendar.GetCalendarEventAttendeeListReq
  ): Promise<{
    data: Calendar.GetCalendarEventAttendeeListResp
    response: Response
  }> {
    const req: RawRequestReq<GetCalendarEventAttendeeListReq> = {
      scope: 'Calendar',
      api: 'GetCalendarEventAttendeeList',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees',
      body: new GetCalendarEventAttendeeListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      GetCalendarEventAttendeeListReq,
      Calendar.GetCalendarEventAttendeeListResp
    >(req)
  }
  // deleteCalendarEventAttendee 批量删除日程的参与人。
  //
  // - 当前身份需要有日历的 writer 或 owner 权限, 并且日历的类型只能为 primary 或 shared。
  // - 当前身份需要是日程的组织者。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/batch_delete
  async deleteCalendarEventAttendee(
    request: Calendar.DeleteCalendarEventAttendeeReq
  ): Promise<{
    data: Calendar.DeleteCalendarEventAttendeeResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteCalendarEventAttendeeReq> = {
      scope: 'Calendar',
      api: 'DeleteCalendarEventAttendee',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/batch_delete',
      body: new DeleteCalendarEventAttendeeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteCalendarEventAttendeeReq,
      Calendar.DeleteCalendarEventAttendeeResp
    >(req)
  }
  // getCalendarEventAttendeeChatMemberList 获取日程的群参与人的群成员列表。
  //
  // - 当前身份必须有权限查看日程的参与人列表。
  // - 当前身份必须在群聊中, 或有权限查看群成员列表。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list
  async getCalendarEventAttendeeChatMemberList(
    request: Calendar.GetCalendarEventAttendeeChatMemberListReq
  ): Promise<{
    data: Calendar.GetCalendarEventAttendeeChatMemberListResp
    response: Response
  }> {
    const req: RawRequestReq<GetCalendarEventAttendeeChatMemberListReq> = {
      scope: 'Calendar',
      api: 'GetCalendarEventAttendeeChatMemberList',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members',
      body: new GetCalendarEventAttendeeChatMemberListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      GetCalendarEventAttendeeChatMemberListReq,
      Calendar.GetCalendarEventAttendeeChatMemberListResp
    >(req)
  }
  // getCalendarFreeBusyList 查询用户主日历或会议室的忙闲信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/freebusy/list
  async getCalendarFreeBusyList(
    request: Calendar.GetCalendarFreeBusyListReq
  ): Promise<{
    data: Calendar.GetCalendarFreeBusyListResp
    response: Response
  }> {
    const req: RawRequestReq<GetCalendarFreeBusyListReq> = {
      scope: 'Calendar',
      api: 'GetCalendarFreeBusyList',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/freebusy/list',
      body: new GetCalendarFreeBusyListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetCalendarFreeBusyListReq, Calendar.GetCalendarFreeBusyListResp>(
      req
    )
  }
  // createCalendarTimeoffEvent 为指定用户创建一个请假日程, 可以是一个普通请假日程, 也可以是一个全天日程。
  //
  // 创建请假日程后, 会在相应时间内, 在用户个人签名页展示请假信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/create
  async createCalendarTimeoffEvent(
    request: Calendar.CreateCalendarTimeoffEventReq
  ): Promise<{
    data: Calendar.CreateCalendarTimeoffEventResp
    response: Response
  }> {
    const req: RawRequestReq<CreateCalendarTimeoffEventReq> = {
      scope: 'Calendar',
      api: 'CreateCalendarTimeoffEvent',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/timeoff_events',
      body: new CreateCalendarTimeoffEventReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CreateCalendarTimeoffEventReq,
      Calendar.CreateCalendarTimeoffEventResp
    >(req)
  }
  // deleteCalendarTimeoffEvent 删除一个指定的请假日程, 请假日程删除, 用户个人签名页的请假信息也会消失。
  //
  // 一个应用只能删除自己创建的请假日程。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/delete
  async deleteCalendarTimeoffEvent(
    request: Calendar.DeleteCalendarTimeoffEventReq
  ): Promise<{
    data: Calendar.DeleteCalendarTimeoffEventResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteCalendarTimeoffEventReq> = {
      scope: 'Calendar',
      api: 'DeleteCalendarTimeoffEvent',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/timeoff_events/:timeoff_event_id',
      body: new DeleteCalendarTimeoffEventReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteCalendarTimeoffEventReq,
      Calendar.DeleteCalendarTimeoffEventResp
    >(req)
  }
  // generateCaldavConf 用于为当前用户生成一个CalDAV账号密码, 用于将飞书日历信息同步到本地设备日历。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/setting/generate_caldav_conf
  async generateCaldavConf(
    request: Calendar.GenerateCaldavConfReq
  ): Promise<{
    data: Calendar.GenerateCaldavConfResp
    response: Response
  }> {
    const req: RawRequestReq<GenerateCaldavConfReq> = {
      scope: 'Calendar',
      api: 'GenerateCaldavConf',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/settings/generate_caldav_conf',
      body: new GenerateCaldavConfReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GenerateCaldavConfReq, Calendar.GenerateCaldavConfResp>(req)
  }
  // createCalendarExchangeBinding 本接口将Exchange账户绑定到飞书账户, 进而支持Exchange日历的导入
  //
  // 操作用户需要是企业超级管理员
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/create
  async createCalendarExchangeBinding(
    request: Calendar.CreateCalendarExchangeBindingReq
  ): Promise<{
    data: Calendar.CreateCalendarExchangeBindingResp
    response: Response
  }> {
    const req: RawRequestReq<CreateCalendarExchangeBindingReq> = {
      scope: 'Calendar',
      api: 'CreateCalendarExchangeBinding',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/exchange_bindings',
      body: new CreateCalendarExchangeBindingReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      CreateCalendarExchangeBindingReq,
      Calendar.CreateCalendarExchangeBindingResp
    >(req)
  }
  // getCalendarExchangeBinding 本接口获取Exchange账户的绑定状态, 包括exchange日历是否同步完成。
  //
  // 操作用户需要是企业超级管理员
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/get
  async getCalendarExchangeBinding(
    request: Calendar.GetCalendarExchangeBindingReq
  ): Promise<{
    data: Calendar.GetCalendarExchangeBindingResp
    response: Response
  }> {
    const req: RawRequestReq<GetCalendarExchangeBindingReq> = {
      scope: 'Calendar',
      api: 'GetCalendarExchangeBinding',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id',
      body: new GetCalendarExchangeBindingReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      GetCalendarExchangeBindingReq,
      Calendar.GetCalendarExchangeBindingResp
    >(req)
  }
  // deleteCalendarExchangeBinding 本接口解除Exchange账户和飞书账户的绑定关系, Exchange账户解除绑定后才能绑定其他飞书账户
  //
  // 操作用户需要是企业超级管理员
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/delete
  async deleteCalendarExchangeBinding(
    request: Calendar.DeleteCalendarExchangeBindingReq
  ): Promise<{
    data: Calendar.DeleteCalendarExchangeBindingResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteCalendarExchangeBindingReq> = {
      scope: 'Calendar',
      api: 'DeleteCalendarExchangeBinding',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id',
      body: new DeleteCalendarExchangeBindingReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteCalendarExchangeBindingReq,
      Calendar.DeleteCalendarExchangeBindingResp
    >(req)
  }
}

export declare namespace Calendar {
  export interface CreateCalendarACLReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    role: string // 对日历的访问权限, 示例值: "writer", 可选值有: `unknown`: 未知权限, `free_busy_reader`: 游客, 只能看到忙碌/空闲信息, `reader`: 订阅者, 查看所有日程详情, `writer`: 编辑者, 创建及修改日程, `owner`: 管理员, 管理日历及共享设置
    scope: CreateCalendarACLReqScope // 权限范围
  }

  export interface CreateCalendarACLReqScope {
    type: string // 权限类型, 当type为User时, 值为open_id/user_id/union_id, 示例值: "user", 可选值有: `user`: 用户
    user_id?: string // 用户ID, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "ou_xxxxxx"
  }

  export interface CreateCalendarACLResp {
    acl_id: string // acl资源ID。参见[ACL ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/introduction)
    role: string // 对日历的访问权限, 可选值有: `unknown`: 未知权限, `free_busy_reader`: 游客, 只能看到忙碌/空闲信息, `reader`: 订阅者, 查看所有日程详情, `writer`: 编辑者, 创建及修改日程, `owner`: 管理员, 管理日历及共享设置
    scope: CreateCalendarACLRespScope // 权限范围
  }

  export interface CreateCalendarACLRespScope {
    type: string // 权限类型, 当type为User时, 值为open_id/user_id/union_id, 可选值有: `user`: 用户
    user_id: string // 用户ID, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
  }

  export interface createCalendarACLResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateCalendarACLResp
  }

  export interface DeleteCalendarACLReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    acl_id: string // acl资源ID。参见[ACL ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/introduction), 示例值: "user_xxxxxx"
  }

  export interface DeleteCalendarACLResp {}

  export interface deleteCalendarACLResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteCalendarACLResp
  }

  export interface GetCalendarACLListReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xxx"
    page_size?: number // 分页大小, 示例值: 10, 小于10取10, 最大值: `50`
  }

  export interface GetCalendarACLListResp {
    acls?: GetCalendarACLListRespACL[] // 入参日历对应的acl列表
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface GetCalendarACLListRespACL {
    acl_id: string // acl资源ID。参见[ACL ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/introduction)
    role: string // 对日历的访问权限, 可选值有: `unknown`: 未知权限, `free_busy_reader`: 游客, 只能看到忙碌/空闲信息, `reader`: 订阅者, 查看所有日程详情, `writer`: 编辑者, 创建及修改日程, `owner`: 管理员, 管理日历及共享设置
    scope: GetCalendarACLListRespACLScope // 权限范围
  }

  export interface GetCalendarACLListRespACLScope {
    type: string // 权限类型, 当type为User时, 值为open_id/user_id/union_id, 可选值有: `user`: 用户
    user_id: string // 用户ID, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
  }

  export interface getCalendarACLListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetCalendarACLListResp
  }

  export interface SubscribeCalendarACLReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
  }

  export interface SubscribeCalendarACLResp {}

  export interface subscribeCalendarACLResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SubscribeCalendarACLResp
  }

  export interface GetPrimaryCalendarReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetPrimaryCalendarResp {
    calendars?: GetPrimaryCalendarRespCalendar[] // 主日历列表
  }

  export interface GetPrimaryCalendarRespCalendar {
    calendar: GetPrimaryCalendarRespCalendarCalendar // 日历实体信息
    user_id: string // 日历的创建者user ID, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
  }

  export interface GetPrimaryCalendarRespCalendarCalendar {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日历标题
    description: string // 日历描述
    permissions: string // 日历公开范围, 可选值有: `private`: 私密, `show_only_free_busy`: 仅展示忙闲信息, `public`: 他人可查看日程详情
    color: number // 日历颜色, 颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效
    type: string // 日历类型, 可选值有: `unknown`: 未知类型, `primary`: 用户或应用的主日历, `shared`: 由用户或应用创建的共享日历, `google`: 用户绑定的谷歌日历, `resource`: 会议室日历, `exchange`: 用户绑定的Exchange日历
    summary_alias: string // 日历备注名, 修改或添加后仅对当前身份生效
    is_deleted: boolean // 对于当前身份, 日历是否已经被标记为删除
    is_third_party: boolean // 当前日历是否是第三方数据；三方日历及日程只支持读, 不支持写入
    role: string // 当前身份对于该日历的访问权限, 可选值有: `unknown`: 未知权限, `free_busy_reader`: 游客, 只能看到忙碌/空闲信息, `reader`: 订阅者, 查看所有日程详情, `writer`: 编辑者, 创建及修改日程, `owner`: 管理员, 管理日历及共享设置
  }

  export interface getPrimaryCalendarResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetPrimaryCalendarResp
  }

  export interface CreateCalendarReq {
    summary?: string // 日历标题, 示例值: "测试日历", 最大长度: `255` 字符
    description?: string // 日历描述, 示例值: "使用开放接口创建日历", 最大长度: `255` 字符
    permissions?: string // 日历公开范围, 示例值: "private", 可选值有: `private`: 私密, `show_only_free_busy`: 仅展示忙闲信息, `public`: 他人可查看日程详情
    color?: number // 日历颜色, 颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效, 示例值:1
    summary_alias?: string // 日历备注名, 修改或添加后仅对当前身份生效, 示例值: "日历备注名", 最大长度: `255` 字符
  }

  export interface CreateCalendarResp {
    calendar: CreateCalendarRespCalendar // 新创建的日历实体
  }

  export interface CreateCalendarRespCalendar {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日历标题
    description: string // 日历描述
    permissions: string // 日历公开范围, 可选值有: `private`: 私密, `show_only_free_busy`: 仅展示忙闲信息, `public`: 他人可查看日程详情
    color: number // 日历颜色, 颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效
    type: string // 日历类型, 可选值有: `unknown`: 未知类型, `primary`: 用户或应用的主日历, `shared`: 由用户或应用创建的共享日历, `google`: 用户绑定的谷歌日历, `resource`: 会议室日历, `exchange`: 用户绑定的Exchange日历
    summary_alias: string // 日历备注名, 修改或添加后仅对当前身份生效
    is_deleted: boolean // 对于当前身份, 日历是否已经被标记为删除
    is_third_party: boolean // 当前日历是否是第三方数据；三方日历及日程只支持读, 不支持写入
    role: string // 当前身份对于该日历的访问权限, 可选值有: `unknown`: 未知权限, `free_busy_reader`: 游客, 只能看到忙碌/空闲信息, `reader`: 订阅者, 查看所有日程详情, `writer`: 编辑者, 创建及修改日程, `owner`: 管理员, 管理日历及共享设置
  }

  export interface createCalendarResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateCalendarResp
  }

  export interface DeleteCalendarReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
  }

  export interface DeleteCalendarResp {}

  export interface deleteCalendarResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteCalendarResp
  }

  export interface GetCalendarReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
  }

  export interface GetCalendarResp {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日历标题
    description: string // 日历描述
    permissions: string // 日历公开范围, 可选值有: `private`: 私密, `show_only_free_busy`: 仅展示忙闲信息, `public`: 他人可查看日程详情
    color: number // 日历颜色, 颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效
    type: string // 日历类型, 可选值有: `unknown`: 未知类型, `primary`: 用户或应用的主日历, `shared`: 由用户或应用创建的共享日历, `google`: 用户绑定的谷歌日历, `resource`: 会议室日历, `exchange`: 用户绑定的Exchange日历
    summary_alias: string // 日历备注名, 修改或添加后仅对当前身份生效
    is_deleted: boolean // 对于当前身份, 日历是否已经被标记为删除
    is_third_party: boolean // 当前日历是否是第三方数据；三方日历及日程只支持读, 不支持写入
    role: string // 当前身份对于该日历的访问权限, 可选值有: `unknown`: 未知权限, `free_busy_reader`: 游客, 只能看到忙碌/空闲信息, `reader`: 订阅者, 查看所有日程详情, `writer`: 编辑者, 创建及修改日程, `owner`: 管理员, 管理日历及共享设置
  }

  export interface getCalendarResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetCalendarResp
  }

  export interface GetCalendarListReq {
    page_size?: number // 一次请求要求返回最大数量, 默认500, 取值范围为[50. 1000], 示例值: 50, 默认值: `500`, 取值范围: `50` ～ `1000`
    page_token?: string // 上次请求Response返回的分页标记, 首次请求时为空, 示例值: "ListCalendarsPageToken_xxx"
    sync_token?: string // 上次请求Response返回的增量同步标记, 分页请求未结束时为空, 示例值: "ListCalendarsSyncToken_xxx"
  }

  export interface GetCalendarListResp {
    has_more: boolean // 是否还有更多数据
    page_token: string // 下次请求需要带上的分页标记, 90 天有效期
    sync_token: string // 下次请求需要带上的增量同步标记, 90 天有效期
    calendar_list?: GetCalendarListRespCalendar[] // 分页加载的日历数据列表
  }

  export interface GetCalendarListRespCalendar {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日历标题
    description: string // 日历描述
    permissions: string // 日历公开范围, 可选值有: `private`: 私密, `show_only_free_busy`: 仅展示忙闲信息, `public`: 他人可查看日程详情
    color: number // 日历颜色, 颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效
    type: string // 日历类型, 可选值有: `unknown`: 未知类型, `primary`: 用户或应用的主日历, `shared`: 由用户或应用创建的共享日历, `google`: 用户绑定的谷歌日历, `resource`: 会议室日历, `exchange`: 用户绑定的Exchange日历
    summary_alias: string // 日历备注名, 修改或添加后仅对当前身份生效
    is_deleted: boolean // 对于当前身份, 日历是否已经被标记为删除
    is_third_party: boolean // 当前日历是否是第三方数据；三方日历及日程只支持读, 不支持写入
    role: string // 当前身份对于该日历的访问权限, 可选值有: `unknown`: 未知权限, `free_busy_reader`: 游客, 只能看到忙碌/空闲信息, `reader`: 订阅者, 查看所有日程详情, `writer`: 编辑者, 创建及修改日程, `owner`: 管理员, 管理日历及共享设置
  }

  export interface getCalendarListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetCalendarListResp
  }

  export interface UpdateCalendarReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    summary?: string // 日历标题, 示例值: "测试日历", 长度范围: `1` ～ `255` 字符
    description?: string // 日历描述, 示例值: "使用开放接口创建日历", 最大长度: `255` 字符
    permissions?: string // 日历公开范围, 示例值: "private", 可选值有: `private`: 私密, `show_only_free_busy`: 仅展示忙闲信息, `public`: 他人可查看日程详情
    color?: number // 日历颜色, 颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效, 示例值:1
    summary_alias?: string // 日历备注名, 修改或添加后仅对当前身份生效, 示例值: "日历备注名", 最大长度: `255` 字符
  }

  export interface UpdateCalendarResp {
    calendar: UpdateCalendarRespCalendar // 更新后的日历实体
  }

  export interface UpdateCalendarRespCalendar {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日历标题
    description: string // 日历描述
    permissions: string // 日历公开范围, 可选值有: `private`: 私密, `show_only_free_busy`: 仅展示忙闲信息, `public`: 他人可查看日程详情
    color: number // 日历颜色, 颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效
    type: string // 日历类型, 可选值有: `unknown`: 未知类型, `primary`: 用户或应用的主日历, `shared`: 由用户或应用创建的共享日历, `google`: 用户绑定的谷歌日历, `resource`: 会议室日历, `exchange`: 用户绑定的Exchange日历
    summary_alias: string // 日历备注名, 修改或添加后仅对当前身份生效
    is_deleted: boolean // 对于当前身份, 日历是否已经被标记为删除
    is_third_party: boolean // 当前日历是否是第三方数据；三方日历及日程只支持读, 不支持写入
    role: string // 当前身份对于该日历的访问权限, 可选值有: `unknown`: 未知权限, `free_busy_reader`: 游客, 只能看到忙碌/空闲信息, `reader`: 订阅者, 查看所有日程详情, `writer`: 编辑者, 创建及修改日程, `owner`: 管理员, 管理日历及共享设置
  }

  export interface updateCalendarResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateCalendarResp
  }

  export interface SearchCalendarReq {
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "10"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    query: string // 搜索关键字, 示例值: "query words", 长度范围: `1` ～ `200` 字符
  }

  export interface SearchCalendarResp {
    items?: SearchCalendarRespItem[] // 搜索命中的日历列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface SearchCalendarRespItem {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日历标题
    description: string // 日历描述
    permissions: string // 日历公开范围, 可选值有: `private`: 私密, `show_only_free_busy`: 仅展示忙闲信息, `public`: 他人可查看日程详情
    color: number // 日历颜色, 颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效
    type: string // 日历类型, 可选值有: `unknown`: 未知类型, `primary`: 用户或应用的主日历, `shared`: 由用户或应用创建的共享日历, `google`: 用户绑定的谷歌日历, `resource`: 会议室日历, `exchange`: 用户绑定的Exchange日历
    summary_alias: string // 日历备注名, 修改或添加后仅对当前身份生效
    is_deleted: boolean // 对于当前身份, 日历是否已经被标记为删除
    is_third_party: boolean // 当前日历是否是第三方数据；三方日历及日程只支持读, 不支持写入
    role: string // 当前身份对于该日历的访问权限, 可选值有: `unknown`: 未知权限, `free_busy_reader`: 游客, 只能看到忙碌/空闲信息, `reader`: 订阅者, 查看所有日程详情, `writer`: 编辑者, 创建及修改日程, `owner`: 管理员, 管理日历及共享设置
  }

  export interface searchCalendarResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SearchCalendarResp
  }

  export interface SubscribeCalendarReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
  }

  export interface SubscribeCalendarResp {
    calendar: SubscribeCalendarRespCalendar // 订阅的日历实体
  }

  export interface SubscribeCalendarRespCalendar {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日历标题
    description: string // 日历描述
    permissions: string // 日历公开范围, 可选值有: `private`: 私密, `show_only_free_busy`: 仅展示忙闲信息, `public`: 他人可查看日程详情
    color: number // 日历颜色, 颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效
    type: string // 日历类型, 可选值有: `unknown`: 未知类型, `primary`: 用户或应用的主日历, `shared`: 由用户或应用创建的共享日历, `google`: 用户绑定的谷歌日历, `resource`: 会议室日历, `exchange`: 用户绑定的Exchange日历
    summary_alias: string // 日历备注名, 修改或添加后仅对当前身份生效
    is_deleted: boolean // 对于当前身份, 日历是否已经被标记为删除
    is_third_party: boolean // 当前日历是否是第三方数据；三方日历及日程只支持读, 不支持写入
    role: string // 当前身份对于该日历的访问权限, 可选值有: `unknown`: 未知权限, `free_busy_reader`: 游客, 只能看到忙碌/空闲信息, `reader`: 订阅者, 查看所有日程详情, `writer`: 编辑者, 创建及修改日程, `owner`: 管理员, 管理日历及共享设置
  }

  export interface subscribeCalendarResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SubscribeCalendarResp
  }

  export interface UnsubscribeCalendarReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
  }

  export interface UnsubscribeCalendarResp {}

  export interface unsubscribeCalendarResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UnsubscribeCalendarResp
  }

  export interface SubscribeCalendarChangeEventReq {}

  export interface SubscribeCalendarChangeEventResp {}

  export interface subscribeCalendarChangeEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SubscribeCalendarChangeEventResp
  }

  export interface CreateCalendarEventReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    summary?: string // 日程标题, 示例值: "日程标题", 最大长度: `1000` 字符
    description?: string // 日程描述；目前不支持编辑富文本描述, 如果日程描述通过客户端编辑过, 更新描述会导致富文本格式丢失, 示例值: "日程描述", 最大长度: `40960` 字符
    need_notification?: boolean // 更新日程是否给日程参与人发送bot通知, 默认为true, 示例值: false
    start_time: CreateCalendarEventReqStartTime // 日程开始时间
    end_time: CreateCalendarEventReqEndTime // 日程结束时间
    vchat?: CreateCalendarEventReqVchat // 视频会议信息。
    visibility?: string // 日程公开范围, 新建日程默认为Default；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 示例值: "default", 可选值有: `default`: 默认权限, 跟随日历权限, 默认仅向他人显示是否“忙碌”, `public`: 公开, 显示日程详情, `private`: 私密, 仅自己可见详情
    attendee_ability?: string // 参与人权限, 示例值: "can_see_others", 可选值有: `none`: 无法编辑日程、无法邀请其它参与人、无法查看参与人列表, `can_see_others`: 无法编辑日程、无法邀请其它参与人、可以查看参与人列表, `can_invite_others`: 无法编辑日程、可以邀请其它参与人、可以查看参与人列表, `can_modify_event`: 可以编辑日程、可以邀请其它参与人、可以查看参与人列表
    free_busy_status?: string // 日程占用的忙闲状态, 新建日程默认为Busy；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 示例值: "busy", 可选值有: `busy`: 忙碌, `free`: 空闲
    location?: CreateCalendarEventReqLocation // 日程地点
    color?: number // 日程颜色, 颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色, 示例值:1
    reminders?: CreateCalendarEventReqReminder[] // 日程提醒列表
    recurrence?: string // 重复日程的重复性规则；参考[rfc5545](https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.10)；, 不支持COUNT和UNTIL同时出现；, 预定会议室重复日程长度不得超过两年, 示例值: "FREQ=DAILY;INTERVAL=1", 最大长度: `2000` 字符
    schemas?: CreateCalendarEventReqSchema[] // 日程自定义信息；控制日程详情页的ui展示。
  }

  export interface CreateCalendarEventReqEndTime {
    date?: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定, 示例值: "2018-09-01"
    timestamp?: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区), 示例值: "1602504000"
    timezone?: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai, 示例值: "Asia/Shanghai"
  }

  export interface CreateCalendarEventReqLocation {
    name?: string // 地点名称, 示例值: "地点名称", 长度范围: `1` ～ `512` 字符
    address?: string // 地点地址, 示例值: "地点地址", 长度范围: `1` ～ `255` 字符
    latitude?: number // 地点坐标纬度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准, 示例值: 1.100000023841858
    longitude?: number // 地点坐标经度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准, 示例值: 2.200000047683716
  }

  export interface CreateCalendarEventReqReminder {
    minutes?: number // 日程提醒时间的偏移量, 正数时表示在日程开始前X分钟提醒, 负数时表示在日程开始后X分钟提醒, 新建或更新日程时传入该字段, 仅对当前身份生效, 示例值: 5, 取值范围: `-20160` ～ `20160`
  }

  export interface CreateCalendarEventReqSchema {
    ui_name?: string // UI名称。取值范围如下: ForwardIcon: 日程转发按钮, MeetingChatIcon: 会议群聊按钮, MeetingMinutesIcon: 会议纪要按钮, MeetingVideo: 视频会议区域, RSVP: 接受/拒绝/待定区域, Attendee: 参与者区域, OrganizerOrCreator: 组织者/创建者区域, 示例值: "ForwardIcon"
    ui_status?: string // UI项自定义状态。目前只支持hide, 示例值: "hide", 可选值有: `hide`: 隐藏显示, `readonly`: 只读, `editable`: 可编辑, `unknown`: 未知UI项自定义状态, 仅用于读取时兼容
    app_link?: string // 按钮点击后跳转的链接; 该字段暂不支持传入, 示例值: "https://applink.feishu.cn/client/calendar/event/detail?calendarId=xxxxxx&key=xxxxxx&originalTime=xxxxxx&startTime=xxxxxx", 最大长度: `2000` 字符
  }

  export interface CreateCalendarEventReqStartTime {
    date?: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定, 示例值: "2018-09-01"
    timestamp?: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区), 示例值: "1602504000"
    timezone?: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai, 示例值: "Asia/Shanghai"
  }

  export interface CreateCalendarEventReqVchat {
    vc_type?: string // 视频会议类型, 示例值: "third_party", 可选值有: `vc`: 飞书视频会议, 取该类型时, 其他字段无效, `third_party`: 第三方链接视频会议, 取该类型时, icon_type、description、meeting_url字段生效, `no_meeting`: 无视频会议, 取该类型时, 其他字段无效, `lark_live`: 飞书直播, 内部类型, 飞书客户端使用, API不支持创建, 只读, `unknown`: 未知类型, 做兼容使用, 飞书客户端使用, API不支持创建, 只读。
    icon_type?: string // 第三方视频会议icon类型；可以为空, 为空展示默认icon, 示例值: "vc", 可选值有: `vc`: 飞书视频会议icon, `live`: 直播视频会议icon, `default`: 默认icon
    description?: string // 第三方视频会议文案, 可以为空, 为空展示默认文案, 示例值: "发起视频会议", 长度范围: `0` ～ `500` 字符
    meeting_url?: string // 视频会议URL, 示例值: "https://example.com", 长度范围: `1` ～ `2000` 字符
  }

  export interface CreateCalendarEventResp {
    event: CreateCalendarEventRespEvent // 新创建的日程实体
  }

  export interface CreateCalendarEventRespEvent {
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction)
    organizer_calendar_id: string // 日程组织者日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日程标题
    description: string // 日程描述；目前不支持编辑富文本描述, 如果日程描述通过客户端编辑过, 更新描述会导致富文本格式丢失
    need_notification: boolean // 更新日程是否给日程参与人发送bot通知, 默认为true
    start_time: CreateCalendarEventRespEventStartTime // 日程开始时间
    end_time: CreateCalendarEventRespEventEndTime // 日程结束时间
    vchat: CreateCalendarEventRespEventVchat // 视频会议信息。
    visibility: string // 日程公开范围, 新建日程默认为Default；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 可选值有: `default`: 默认权限, 跟随日历权限, 默认仅向他人显示是否“忙碌”, `public`: 公开, 显示日程详情, `private`: 私密, 仅自己可见详情
    attendee_ability: string // 参与人权限, 可选值有: `none`: 无法编辑日程、无法邀请其它参与人、无法查看参与人列表, `can_see_others`: 无法编辑日程、无法邀请其它参与人、可以查看参与人列表, `can_invite_others`: 无法编辑日程、可以邀请其它参与人、可以查看参与人列表, `can_modify_event`: 可以编辑日程、可以邀请其它参与人、可以查看参与人列表
    free_busy_status: string // 日程占用的忙闲状态, 新建日程默认为Busy；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 可选值有: `busy`: 忙碌, `free`: 空闲
    location: CreateCalendarEventRespEventLocation // 日程地点
    color: number // 日程颜色, 颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。
    reminders?: CreateCalendarEventRespEventReminder[] // 日程提醒列表
    recurrence: string // 重复日程的重复性规则；参考[rfc5545](https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.10)；, 不支持COUNT和UNTIL同时出现；, 预定会议室重复日程长度不得超过两年。
    status: string // 日程状态, 可选值有: `tentative`: 未回应, `confirmed`: 已确认, `cancelled`: 日程已取消
    is_exception: boolean // 日程是否是一个重复日程的例外日程
    recurring_event_id: string // 例外日程的原重复日程的event_id
    schemas?: CreateCalendarEventRespEventSchema[] // 日程自定义信息；控制日程详情页的ui展示。
  }

  export interface CreateCalendarEventRespEventEndTime {
    date: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定
    timestamp: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区)
    timezone: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai
  }

  export interface CreateCalendarEventRespEventLocation {
    name: string // 地点名称
    address: string // 地点地址
    latitude: number // 地点坐标纬度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准
    longitude: number // 地点坐标经度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准
  }

  export interface CreateCalendarEventRespEventReminder {
    minutes: number // 日程提醒时间的偏移量, 正数时表示在日程开始前X分钟提醒, 负数时表示在日程开始后X分钟提醒, 新建或更新日程时传入该字段, 仅对当前身份生效
  }

  export interface CreateCalendarEventRespEventSchema {
    ui_name: string // UI名称。取值范围如下: ForwardIcon: 日程转发按钮, MeetingChatIcon: 会议群聊按钮, MeetingMinutesIcon: 会议纪要按钮, MeetingVideo: 视频会议区域, RSVP: 接受/拒绝/待定区域, Attendee: 参与者区域, OrganizerOrCreator: 组织者/创建者区域
    ui_status: string // UI项自定义状态。目前只支持hide, 可选值有: `hide`: 隐藏显示, `readonly`: 只读, `editable`: 可编辑, `unknown`: 未知UI项自定义状态, 仅用于读取时兼容
    app_link: string // 按钮点击后跳转的链接; 该字段暂不支持传入。
  }

  export interface CreateCalendarEventRespEventStartTime {
    date: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定
    timestamp: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区)
    timezone: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai
  }

  export interface CreateCalendarEventRespEventVchat {
    vc_type: string // 视频会议类型, 可选值有: `vc`: 飞书视频会议, 取该类型时, 其他字段无效, `third_party`: 第三方链接视频会议, 取该类型时, icon_type、description、meeting_url字段生效, `no_meeting`: 无视频会议, 取该类型时, 其他字段无效, `lark_live`: 飞书直播, 内部类型, 飞书客户端使用, API不支持创建, 只读, `unknown`: 未知类型, 做兼容使用, 飞书客户端使用, API不支持创建, 只读。
    icon_type: string // 第三方视频会议icon类型；可以为空, 为空展示默认icon, 可选值有: `vc`: 飞书视频会议icon, `live`: 直播视频会议icon, `default`: 默认icon
    description: string // 第三方视频会议文案, 可以为空, 为空展示默认文案
    meeting_url: string // 视频会议URL
  }

  export interface createCalendarEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateCalendarEventResp
  }

  export interface DeleteCalendarEventReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction), 示例值: "xxxxxxxxx_0"
    need_notification?: boolean // 删除日程是否给日程参与人发送bot通知, 默认为true, 示例值: false, 可选值有: `true`: true, `false`: false
  }

  export interface DeleteCalendarEventResp {}

  export interface deleteCalendarEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteCalendarEventResp
  }

  export interface GetCalendarEventReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction), 示例值: "xxxxxxxxx_0"
  }

  export interface GetCalendarEventResp {
    event: GetCalendarEventRespEvent // 日程实体
  }

  export interface GetCalendarEventRespEvent {
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction)
    organizer_calendar_id: string // 日程组织者日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日程标题
    description: string // 日程描述；目前不支持编辑富文本描述, 如果日程描述通过客户端编辑过, 更新描述会导致富文本格式丢失
    start_time: GetCalendarEventRespEventStartTime // 日程开始时间
    end_time: GetCalendarEventRespEventEndTime // 日程结束时间
    vchat: GetCalendarEventRespEventVchat // 视频会议信息。
    visibility: string // 日程公开范围, 新建日程默认为Default；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 可选值有: `default`: 默认权限, 跟随日历权限, 默认仅向他人显示是否“忙碌”, `public`: 公开, 显示日程详情, `private`: 私密, 仅自己可见详情
    attendee_ability: string // 参与人权限, 可选值有: `none`: 无法编辑日程、无法邀请其它参与人、无法查看参与人列表, `can_see_others`: 无法编辑日程、无法邀请其它参与人、可以查看参与人列表, `can_invite_others`: 无法编辑日程、可以邀请其它参与人、可以查看参与人列表, `can_modify_event`: 可以编辑日程、可以邀请其它参与人、可以查看参与人列表
    free_busy_status: string // 日程占用的忙闲状态, 新建日程默认为Busy；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 可选值有: `busy`: 忙碌, `free`: 空闲
    location: GetCalendarEventRespEventLocation // 日程地点
    color: number // 日程颜色, 颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。
    reminders?: GetCalendarEventRespEventReminder[] // 日程提醒列表
    recurrence: string // 重复日程的重复性规则；参考[rfc5545](https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.10)；, 不支持COUNT和UNTIL同时出现；, 预定会议室重复日程长度不得超过两年。
    status: string // 日程状态, 可选值有: `tentative`: 未回应, `confirmed`: 已确认, `cancelled`: 日程已取消
    is_exception: boolean // 日程是否是一个重复日程的例外日程
    recurring_event_id: string // 例外日程的原重复日程的event_id
    schemas?: GetCalendarEventRespEventSchema[] // 日程自定义信息；控制日程详情页的ui展示。
  }

  export interface GetCalendarEventRespEventEndTime {
    date: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定
    timestamp: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区)
    timezone: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai
  }

  export interface GetCalendarEventRespEventLocation {
    name: string // 地点名称
    address: string // 地点地址
    latitude: number // 地点坐标纬度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准
    longitude: number // 地点坐标经度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准
  }

  export interface GetCalendarEventRespEventReminder {
    minutes: number // 日程提醒时间的偏移量, 正数时表示在日程开始前X分钟提醒, 负数时表示在日程开始后X分钟提醒, 新建或更新日程时传入该字段, 仅对当前身份生效
  }

  export interface GetCalendarEventRespEventSchema {
    ui_name: string // UI名称。取值范围如下: ForwardIcon: 日程转发按钮, MeetingChatIcon: 会议群聊按钮, MeetingMinutesIcon: 会议纪要按钮, MeetingVideo: 视频会议区域, RSVP: 接受/拒绝/待定区域, Attendee: 参与者区域, OrganizerOrCreator: 组织者/创建者区域
    ui_status: string // UI项自定义状态。目前只支持hide, 可选值有: `hide`: 隐藏显示, `readonly`: 只读, `editable`: 可编辑, `unknown`: 未知UI项自定义状态, 仅用于读取时兼容
    app_link: string // 按钮点击后跳转的链接; 该字段暂不支持传入。
  }

  export interface GetCalendarEventRespEventStartTime {
    date: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定
    timestamp: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区)
    timezone: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai
  }

  export interface GetCalendarEventRespEventVchat {
    vc_type: string // 视频会议类型, 可选值有: `vc`: 飞书视频会议, 取该类型时, 其他字段无效, `third_party`: 第三方链接视频会议, 取该类型时, icon_type、description、meeting_url字段生效, `no_meeting`: 无视频会议, 取该类型时, 其他字段无效, `lark_live`: 飞书直播, 内部类型, 飞书客户端使用, API不支持创建, 只读, `unknown`: 未知类型, 做兼容使用, 飞书客户端使用, API不支持创建, 只读。
    icon_type: string // 第三方视频会议icon类型；可以为空, 为空展示默认icon, 可选值有: `vc`: 飞书视频会议icon, `live`: 直播视频会议icon, `default`: 默认icon
    description: string // 第三方视频会议文案, 可以为空, 为空展示默认文案
    meeting_url: string // 视频会议URL
  }

  export interface getCalendarEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetCalendarEventResp
  }

  export interface GetCalendarEventListReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    page_size?: number // 一次请求要求返回最大数量, 默认500, 取值范围为[50, 1000], 示例值: 50, 默认值: `500`, 取值范围: `50` ～ `1000`
    anchor_time?: string // 拉取anchor_time之后的日程, 为timestamp, 示例值: "1609430400"
    page_token?: string // 上次请求Response返回的分页标记, 首次请求时为空, 示例值: "ListCalendarsPageToken_1632452910_1632539310"
    sync_token?: string // 上次请求Response返回的增量同步标记, 分页请求未结束时为空, 示例值: "ListCalendarsSyncToken_1632452910"
    start_time?: string // 日程开始Unix时间戳, 单位为秒, 示例值: "1631777271"
    end_time?: string // 日程结束Unix时间戳, 单位为秒, 示例值: "1631777271"
  }

  export interface GetCalendarEventListResp {
    has_more: boolean // 是否有下一页数据
    page_token: string // 下次请求需要带上的分页标记, 90 天有效期
    sync_token: string // 下次请求需要带上的增量同步标记, 90 天有效期
    items?: GetCalendarEventListRespItem[] // 日程列表
  }

  export interface GetCalendarEventListRespItem {
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction)
    organizer_calendar_id: string // 日程组织者日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日程标题
    description: string // 日程描述；目前不支持编辑富文本描述, 如果日程描述通过客户端编辑过, 更新描述会导致富文本格式丢失
    start_time: GetCalendarEventListRespItemStartTime // 日程开始时间
    end_time: GetCalendarEventListRespItemEndTime // 日程结束时间
    vchat: GetCalendarEventListRespItemVchat // 视频会议信息。
    visibility: string // 日程公开范围, 新建日程默认为Default；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 可选值有: `default`: 默认权限, 跟随日历权限, 默认仅向他人显示是否“忙碌”, `public`: 公开, 显示日程详情, `private`: 私密, 仅自己可见详情
    attendee_ability: string // 参与人权限, 可选值有: `none`: 无法编辑日程、无法邀请其它参与人、无法查看参与人列表, `can_see_others`: 无法编辑日程、无法邀请其它参与人、可以查看参与人列表, `can_invite_others`: 无法编辑日程、可以邀请其它参与人、可以查看参与人列表, `can_modify_event`: 可以编辑日程、可以邀请其它参与人、可以查看参与人列表
    free_busy_status: string // 日程占用的忙闲状态, 新建日程默认为Busy；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 可选值有: `busy`: 忙碌, `free`: 空闲
    location: GetCalendarEventListRespItemLocation // 日程地点
    color: number // 日程颜色, 颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。
    reminders?: GetCalendarEventListRespItemReminder[] // 日程提醒列表
    recurrence: string // 重复日程的重复性规则；参考[rfc5545](https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.10)；, 不支持COUNT和UNTIL同时出现；, 预定会议室重复日程长度不得超过两年。
    status: string // 日程状态, 可选值有: `tentative`: 未回应, `confirmed`: 已确认, `cancelled`: 日程已取消
    is_exception: boolean // 日程是否是一个重复日程的例外日程
    recurring_event_id: string // 例外日程的原重复日程的event_id
    schemas?: GetCalendarEventListRespItemSchema[] // 日程自定义信息；控制日程详情页的ui展示。
  }

  export interface GetCalendarEventListRespItemEndTime {
    date: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定
    timestamp: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区)
    timezone: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai
  }

  export interface GetCalendarEventListRespItemLocation {
    name: string // 地点名称
    address: string // 地点地址
    latitude: number // 地点坐标纬度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准
    longitude: number // 地点坐标经度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准
  }

  export interface GetCalendarEventListRespItemReminder {
    minutes: number // 日程提醒时间的偏移量, 正数时表示在日程开始前X分钟提醒, 负数时表示在日程开始后X分钟提醒, 新建或更新日程时传入该字段, 仅对当前身份生效
  }

  export interface GetCalendarEventListRespItemSchema {
    ui_name: string // UI名称。取值范围如下: ForwardIcon: 日程转发按钮, MeetingChatIcon: 会议群聊按钮, MeetingMinutesIcon: 会议纪要按钮, MeetingVideo: 视频会议区域, RSVP: 接受/拒绝/待定区域, Attendee: 参与者区域, OrganizerOrCreator: 组织者/创建者区域
    ui_status: string // UI项自定义状态。目前只支持hide, 可选值有: `hide`: 隐藏显示, `readonly`: 只读, `editable`: 可编辑, `unknown`: 未知UI项自定义状态, 仅用于读取时兼容
    app_link: string // 按钮点击后跳转的链接; 该字段暂不支持传入。
  }

  export interface GetCalendarEventListRespItemStartTime {
    date: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定
    timestamp: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区)
    timezone: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai
  }

  export interface GetCalendarEventListRespItemVchat {
    vc_type: string // 视频会议类型, 可选值有: `vc`: 飞书视频会议, 取该类型时, 其他字段无效, `third_party`: 第三方链接视频会议, 取该类型时, icon_type、description、meeting_url字段生效, `no_meeting`: 无视频会议, 取该类型时, 其他字段无效, `lark_live`: 飞书直播, 内部类型, 飞书客户端使用, API不支持创建, 只读, `unknown`: 未知类型, 做兼容使用, 飞书客户端使用, API不支持创建, 只读。
    icon_type: string // 第三方视频会议icon类型；可以为空, 为空展示默认icon, 可选值有: `vc`: 飞书视频会议icon, `live`: 直播视频会议icon, `default`: 默认icon
    description: string // 第三方视频会议文案, 可以为空, 为空展示默认文案
    meeting_url: string // 视频会议URL
  }

  export interface getCalendarEventListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetCalendarEventListResp
  }

  export interface UpdateCalendarEventReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction), 示例值: "00592a0e-7edf-4678-bc9d-1b77383ef08e_0"
    summary?: string // 日程标题, 示例值: "日程标题", 最大长度: `1000` 字符
    description?: string // 日程描述；目前不支持编辑富文本描述, 如果日程描述通过客户端编辑过, 更新描述会导致富文本格式丢失, 示例值: "日程描述", 最大长度: `40960` 字符
    need_notification?: boolean // 更新日程是否给日程参与人发送bot通知, 默认为true, 示例值: false
    start_time?: UpdateCalendarEventReqStartTime // 日程开始时间
    end_time?: UpdateCalendarEventReqEndTime // 日程结束时间
    vchat?: UpdateCalendarEventReqVchat // 视频会议信息。
    visibility?: string // 日程公开范围, 新建日程默认为Default；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 示例值: "default", 可选值有: `default`: 默认权限, 跟随日历权限, 默认仅向他人显示是否“忙碌”, `public`: 公开, 显示日程详情, `private`: 私密, 仅自己可见详情
    attendee_ability?: string // 参与人权限, 示例值: "can_see_others", 可选值有: `none`: 无法编辑日程、无法邀请其它参与人、无法查看参与人列表, `can_see_others`: 无法编辑日程、无法邀请其它参与人、可以查看参与人列表, `can_invite_others`: 无法编辑日程、可以邀请其它参与人、可以查看参与人列表, `can_modify_event`: 可以编辑日程、可以邀请其它参与人、可以查看参与人列表
    free_busy_status?: string // 日程占用的忙闲状态, 新建日程默认为Busy；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 示例值: "busy", 可选值有: `busy`: 忙碌, `free`: 空闲
    location?: UpdateCalendarEventReqLocation // 日程地点
    color?: number // 日程颜色, 颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色, 示例值:1
    reminders?: UpdateCalendarEventReqReminder[] // 日程提醒列表
    recurrence?: string // 重复日程的重复性规则；参考[rfc5545](https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.10)；, 不支持COUNT和UNTIL同时出现；, 预定会议室重复日程长度不得超过两年, 示例值: "FREQ=DAILY;INTERVAL=1", 最大长度: `2000` 字符
    schemas?: UpdateCalendarEventReqSchema[] // 日程自定义信息；控制日程详情页的ui展示。
  }

  export interface UpdateCalendarEventReqEndTime {
    date?: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定, 示例值: "2018-09-01"
    timestamp?: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区), 示例值: "1602504000"
    timezone?: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai, 示例值: "Asia/Shanghai"
  }

  export interface UpdateCalendarEventReqLocation {
    name?: string // 地点名称, 示例值: "地点名称", 长度范围: `1` ～ `512` 字符
    address?: string // 地点地址, 示例值: "地点地址", 长度范围: `1` ～ `255` 字符
    latitude?: number // 地点坐标纬度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准, 示例值: 1.100000023841858
    longitude?: number // 地点坐标经度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准, 示例值: 2.200000047683716
  }

  export interface UpdateCalendarEventReqReminder {
    minutes?: number // 日程提醒时间的偏移量, 正数时表示在日程开始前X分钟提醒, 负数时表示在日程开始后X分钟提醒, 新建或更新日程时传入该字段, 仅对当前身份生效, 示例值: 5, 取值范围: `-20160` ～ `20160`
  }

  export interface UpdateCalendarEventReqSchema {
    ui_name?: string // UI名称。取值范围如下: ForwardIcon: 日程转发按钮, MeetingChatIcon: 会议群聊按钮, MeetingMinutesIcon: 会议纪要按钮, MeetingVideo: 视频会议区域, RSVP: 接受/拒绝/待定区域, Attendee: 参与者区域, OrganizerOrCreator: 组织者/创建者区域, 示例值: "ForwardIcon"
    ui_status?: string // UI项自定义状态。目前只支持hide, 示例值: "hide", 可选值有: `hide`: 隐藏显示, `readonly`: 只读, `editable`: 可编辑, `unknown`: 未知UI项自定义状态, 仅用于读取时兼容
    app_link?: string // 按钮点击后跳转的链接; 该字段暂不支持传入, 示例值: "https://applink.feishu.cn/client/calendar/event/detail?calendarId=xxxxxx&key=xxxxxx&originalTime=xxxxxx&startTime=xxxxxx", 最大长度: `2000` 字符
  }

  export interface UpdateCalendarEventReqStartTime {
    date?: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定, 示例值: "2018-09-01"
    timestamp?: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区), 示例值: "1602504000"
    timezone?: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai, 示例值: "Asia/Shanghai"
  }

  export interface UpdateCalendarEventReqVchat {
    vc_type?: string // 视频会议类型, 示例值: "third_party", 可选值有: `vc`: 飞书视频会议, 取该类型时, 其他字段无效, `third_party`: 第三方链接视频会议, 取该类型时, icon_type、description、meeting_url字段生效, `no_meeting`: 无视频会议, 取该类型时, 其他字段无效, `lark_live`: 飞书直播, 内部类型, 飞书客户端使用, API不支持创建, 只读, `unknown`: 未知类型, 做兼容使用, 飞书客户端使用, API不支持创建, 只读。
    icon_type?: string // 第三方视频会议icon类型；可以为空, 为空展示默认icon, 示例值: "vc", 可选值有: `vc`: 飞书视频会议icon, `live`: 直播视频会议icon, `default`: 默认icon
    description?: string // 第三方视频会议文案, 可以为空, 为空展示默认文案, 示例值: "发起视频会议", 长度范围: `0` ～ `500` 字符
    meeting_url?: string // 视频会议URL, 示例值: "https://example.com", 长度范围: `1` ～ `2000` 字符
  }

  export interface UpdateCalendarEventResp {
    event: UpdateCalendarEventRespEvent // 更新后的日程实体
  }

  export interface UpdateCalendarEventRespEvent {
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction)
    organizer_calendar_id: string // 日程组织者日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日程标题
    description: string // 日程描述；目前不支持编辑富文本描述, 如果日程描述通过客户端编辑过, 更新描述会导致富文本格式丢失
    need_notification: boolean // 更新日程是否给日程参与人发送bot通知, 默认为true
    start_time: UpdateCalendarEventRespEventStartTime // 日程开始时间
    end_time: UpdateCalendarEventRespEventEndTime // 日程结束时间
    vchat: UpdateCalendarEventRespEventVchat // 视频会议信息。
    visibility: string // 日程公开范围, 新建日程默认为Default；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 可选值有: `default`: 默认权限, 跟随日历权限, 默认仅向他人显示是否“忙碌”, `public`: 公开, 显示日程详情, `private`: 私密, 仅自己可见详情
    attendee_ability: string // 参与人权限, 可选值有: `none`: 无法编辑日程、无法邀请其它参与人、无法查看参与人列表, `can_see_others`: 无法编辑日程、无法邀请其它参与人、可以查看参与人列表, `can_invite_others`: 无法编辑日程、可以邀请其它参与人、可以查看参与人列表, `can_modify_event`: 可以编辑日程、可以邀请其它参与人、可以查看参与人列表
    free_busy_status: string // 日程占用的忙闲状态, 新建日程默认为Busy；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 可选值有: `busy`: 忙碌, `free`: 空闲
    location: UpdateCalendarEventRespEventLocation // 日程地点
    color: number // 日程颜色, 颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。
    reminders?: UpdateCalendarEventRespEventReminder[] // 日程提醒列表
    recurrence: string // 重复日程的重复性规则；参考[rfc5545](https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.10)；, 不支持COUNT和UNTIL同时出现；, 预定会议室重复日程长度不得超过两年。
    status: string // 日程状态, 可选值有: `tentative`: 未回应, `confirmed`: 已确认, `cancelled`: 日程已取消
    is_exception: boolean // 日程是否是一个重复日程的例外日程
    recurring_event_id: string // 例外日程的原重复日程的event_id
    schemas?: UpdateCalendarEventRespEventSchema[] // 日程自定义信息；控制日程详情页的ui展示。
  }

  export interface UpdateCalendarEventRespEventEndTime {
    date: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定
    timestamp: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区)
    timezone: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai
  }

  export interface UpdateCalendarEventRespEventLocation {
    name: string // 地点名称
    address: string // 地点地址
    latitude: number // 地点坐标纬度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准
    longitude: number // 地点坐标经度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准
  }

  export interface UpdateCalendarEventRespEventReminder {
    minutes: number // 日程提醒时间的偏移量, 正数时表示在日程开始前X分钟提醒, 负数时表示在日程开始后X分钟提醒, 新建或更新日程时传入该字段, 仅对当前身份生效
  }

  export interface UpdateCalendarEventRespEventSchema {
    ui_name: string // UI名称。取值范围如下: ForwardIcon: 日程转发按钮, MeetingChatIcon: 会议群聊按钮, MeetingMinutesIcon: 会议纪要按钮, MeetingVideo: 视频会议区域, RSVP: 接受/拒绝/待定区域, Attendee: 参与者区域, OrganizerOrCreator: 组织者/创建者区域
    ui_status: string // UI项自定义状态。目前只支持hide, 可选值有: `hide`: 隐藏显示, `readonly`: 只读, `editable`: 可编辑, `unknown`: 未知UI项自定义状态, 仅用于读取时兼容
    app_link: string // 按钮点击后跳转的链接; 该字段暂不支持传入。
  }

  export interface UpdateCalendarEventRespEventStartTime {
    date: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定
    timestamp: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区)
    timezone: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai
  }

  export interface UpdateCalendarEventRespEventVchat {
    vc_type: string // 视频会议类型, 可选值有: `vc`: 飞书视频会议, 取该类型时, 其他字段无效, `third_party`: 第三方链接视频会议, 取该类型时, icon_type、description、meeting_url字段生效, `no_meeting`: 无视频会议, 取该类型时, 其他字段无效, `lark_live`: 飞书直播, 内部类型, 飞书客户端使用, API不支持创建, 只读, `unknown`: 未知类型, 做兼容使用, 飞书客户端使用, API不支持创建, 只读。
    icon_type: string // 第三方视频会议icon类型；可以为空, 为空展示默认icon, 可选值有: `vc`: 飞书视频会议icon, `live`: 直播视频会议icon, `default`: 默认icon
    description: string // 第三方视频会议文案, 可以为空, 为空展示默认文案
    meeting_url: string // 视频会议URL
  }

  export interface updateCalendarEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateCalendarEventResp
  }

  export interface SearchCalendarEventReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xxxxx"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
    query: string // 搜索关键字, 示例值: "query words", 长度范围: `0` ～ `200` 字符
    filter?: SearchCalendarEventReqFilter // 搜索过滤器
  }

  export interface SearchCalendarEventReqFilter {
    start_time?: SearchCalendarEventReqFilterStartTime // 搜索过滤项, 日程搜索区间的开始时间, 被搜索日程的事件必须与搜索区间有交集
    end_time?: SearchCalendarEventReqFilterEndTime // 搜索过滤项, 日程搜索区间的结束时间, 被搜索日程的事件必须与搜索区间有交集
    user_ids?: string[] // 搜索过滤项, 参与人的用户ID列表, 被搜索日程中必须包含至少一个其中的参与人。参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: xxxxx
    room_ids?: string[] // 搜索过滤项, 会议室ID列表, 被搜索日程中必须包含至少一个其中的会议室, 示例值: xxxxx
    chat_ids?: string[] // 搜索过滤项, 群ID列表, 被搜索日程的参与人中必须包含至少一个其中的群。参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: xxxxx
  }

  export interface SearchCalendarEventReqFilterEndTime {
    date?: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定, 示例值: "2018-09-01"
    timestamp?: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区), 示例值: "1602504000"
    timezone?: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai, 示例值: "Asia/Shanghai"
  }

  export interface SearchCalendarEventReqFilterStartTime {
    date?: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定, 示例值: "2018-09-01"
    timestamp?: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区), 示例值: "1602504000"
    timezone?: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai, 示例值: "Asia/Shanghai"
  }

  export interface SearchCalendarEventResp {
    items?: SearchCalendarEventRespItem[] // 搜索命中的日程列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface SearchCalendarEventRespItem {
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction)
    organizer_calendar_id: string // 日程组织者日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction)
    summary: string // 日程标题
    description: string // 日程描述；目前不支持编辑富文本描述, 如果日程描述通过客户端编辑过, 更新描述会导致富文本格式丢失
    need_notification: boolean // 更新日程是否给日程参与人发送bot通知, 默认为true
    start_time: SearchCalendarEventRespItemStartTime // 日程开始时间
    end_time: SearchCalendarEventRespItemEndTime // 日程结束时间
    vchat: SearchCalendarEventRespItemVchat // 视频会议信息。
    visibility: string // 日程公开范围, 新建日程默认为Default；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 可选值有: `default`: 默认权限, 跟随日历权限, 默认仅向他人显示是否“忙碌”, `public`: 公开, 显示日程详情, `private`: 私密, 仅自己可见详情
    attendee_ability: string // 参与人权限, 可选值有: `none`: 无法编辑日程、无法邀请其它参与人、无法查看参与人列表, `can_see_others`: 无法编辑日程、无法邀请其它参与人、可以查看参与人列表, `can_invite_others`: 无法编辑日程、可以邀请其它参与人、可以查看参与人列表, `can_modify_event`: 可以编辑日程、可以邀请其它参与人、可以查看参与人列表
    free_busy_status: string // 日程占用的忙闲状态, 新建日程默认为Busy；仅新建日程时对所有参与人生效, 之后修改该属性仅对当前身份生效, 可选值有: `busy`: 忙碌, `free`: 空闲
    location: SearchCalendarEventRespItemLocation // 日程地点
    color: number // 日程颜色, 颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。
    reminders?: SearchCalendarEventRespItemReminder[] // 日程提醒列表
    recurrence: string // 重复日程的重复性规则；参考[rfc5545](https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.10)；, 不支持COUNT和UNTIL同时出现；, 预定会议室重复日程长度不得超过两年。
    status: string // 日程状态, 可选值有: `tentative`: 未回应, `confirmed`: 已确认, `cancelled`: 日程已取消
    is_exception: boolean // 日程是否是一个重复日程的例外日程
    recurring_event_id: string // 例外日程的原重复日程的event_id
    schemas?: SearchCalendarEventRespItemSchema[] // 日程自定义信息；控制日程详情页的ui展示。
  }

  export interface SearchCalendarEventRespItemEndTime {
    date: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定
    timestamp: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区)
    timezone: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai
  }

  export interface SearchCalendarEventRespItemLocation {
    name: string // 地点名称
    address: string // 地点地址
    latitude: number // 地点坐标纬度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准
    longitude: number // 地点坐标经度信息, 对于国内的地点, 采用GCJ-02标准, 海外地点采用WGS84标准
  }

  export interface SearchCalendarEventRespItemReminder {
    minutes: number // 日程提醒时间的偏移量, 正数时表示在日程开始前X分钟提醒, 负数时表示在日程开始后X分钟提醒, 新建或更新日程时传入该字段, 仅对当前身份生效
  }

  export interface SearchCalendarEventRespItemSchema {
    ui_name: string // UI名称。取值范围如下: ForwardIcon: 日程转发按钮, MeetingChatIcon: 会议群聊按钮, MeetingMinutesIcon: 会议纪要按钮, MeetingVideo: 视频会议区域, RSVP: 接受/拒绝/待定区域, Attendee: 参与者区域, OrganizerOrCreator: 组织者/创建者区域
    ui_status: string // UI项自定义状态。目前只支持hide, 可选值有: `hide`: 隐藏显示, `readonly`: 只读, `editable`: 可编辑, `unknown`: 未知UI项自定义状态, 仅用于读取时兼容
    app_link: string // 按钮点击后跳转的链接; 该字段暂不支持传入。
  }

  export interface SearchCalendarEventRespItemStartTime {
    date: string // 仅全天日程使用该字段, 如2018-09-01。需满足 RFC3339 格式。不能与 timestamp 同时指定
    timestamp: string // 秒级时间戳, 如1602504000(表示2020/10/12 20:0:00 +8时区)
    timezone: string // 时区名称, 使用IANA Time Zone Database标准, 如Asia/Shanghai；全天日程时区固定为UTC, 非全天日程时区默认为Asia/Shanghai
  }

  export interface SearchCalendarEventRespItemVchat {
    vc_type: string // 视频会议类型, 可选值有: `vc`: 飞书视频会议, 取该类型时, 其他字段无效, `third_party`: 第三方链接视频会议, 取该类型时, icon_type、description、meeting_url字段生效, `no_meeting`: 无视频会议, 取该类型时, 其他字段无效, `lark_live`: 飞书直播, 内部类型, 飞书客户端使用, API不支持创建, 只读, `unknown`: 未知类型, 做兼容使用, 飞书客户端使用, API不支持创建, 只读。
    icon_type: string // 第三方视频会议icon类型；可以为空, 为空展示默认icon, 可选值有: `vc`: 飞书视频会议icon, `live`: 直播视频会议icon, `default`: 默认icon
    description: string // 第三方视频会议文案, 可以为空, 为空展示默认文案
    meeting_url: string // 视频会议URL
  }

  export interface searchCalendarEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SearchCalendarEventResp
  }

  export interface SubscribeCalendarEventReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
  }

  export interface SubscribeCalendarEventResp {}

  export interface subscribeCalendarEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SubscribeCalendarEventResp
  }

  export interface CreateCalendarEventAttendeeReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction), 示例值: "xxxxxxxxx_0"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    attendees?: CreateCalendarEventAttendeeReqAttendee[] // 新增参与人列表；, 单次请求会议室的数量限制为100。
    need_notification?: boolean // 是否给参与人发送bot通知 默认为true, 示例值: false
    instance_start_time_admin?: string // 使用管理员身份访问时要修改的实例(仅用于重复日程修改其中的一个实例, 非重复日程无需填此字段), 示例值: "1647320400"
    is_enable_admin?: boolean // 是否启用管理员身份(需先在管理后台设置某人为会议室管理员), 示例值: false
  }

  export interface CreateCalendarEventAttendeeReqAttendee {
    type?: string // 参与人类型, 示例值: "user", 可选值有: `user`: 用户, `chat`: 群组, `resource`: 会议室, `third_party`: 邮箱
    is_optional?: boolean // 参与人是否为「可选参加」, 无法编辑群参与人的此字段, 示例值: true, 默认值: `false`
    user_id?: string // 参与人的用户id, 依赖于user_id_type返回对应的取值, 当is_external为true时, 此字段只会返回open_id或者union_id, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "ou_xxxxxxxx"
    chat_id?: string // chat类型参与人的群组chat_id, 参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_xxxxxxxxx"
    room_id?: string // resource类型参与人的会议室room_id, 示例值: "omm_xxxxxxxx"
    third_party_email?: string // third_party类型参与人的邮箱, 示例值: "wangwu@email.com"
    operate_id?: string // 如果日程是使用应用身份创建的, 在添加会议室的时候, 用来指定会议室的联系人, 在会议室视图展示。参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "ou_xxxxxxxx"
    resource_customization?: CreateCalendarEventAttendeeReqAttendeeResourceCustomization[] // 会议室的个性化配置
  }

  export interface CreateCalendarEventAttendeeReqAttendeeResourceCustomization {
    index_key: string // 每个配置的唯一ID, 示例值: "16281481596100"
    input_content?: string // 当type类型为填空时, 该参数需要填入, 示例值: "xxx"
    options?: CreateCalendarEventAttendeeReqAttendeeResourceCustomizationOption[] // 每个配置的选项
  }

  export interface CreateCalendarEventAttendeeReqAttendeeResourceCustomizationOption {
    option_key?: string // 每个选项的唯一ID, 示例值: "16281481596185"
    others_content?: string // 当type类型为其它选项时, 该参数需要填入, 示例值: "xxx"
  }

  export interface CreateCalendarEventAttendeeResp {
    attendees?: CreateCalendarEventAttendeeRespAttendee[] // 新增参与人后的日程所有参与人列表
  }

  export interface CreateCalendarEventAttendeeRespAttendee {
    type: string // 参与人类型, 可选值有: `user`: 用户, `chat`: 群组, `resource`: 会议室, `third_party`: 邮箱
    attendee_id: string // 参与人ID。参见[参与人ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/introduction#4998889c)
    rsvp_status: string // 参与人RSVP状态, 可选值有: `needs_action`: 参与人尚未回复状态, 或表示会议室预约中, `accept`: 参与人回复接受, 或表示会议室预约成功, `tentative`: 参与人回复待定, `decline`: 参与人回复拒绝, 或表示会议室预约失败, `removed`: 参与人或会议室已经从日程中被移除
    is_optional: boolean // 参与人是否为「可选参加」, 无法编辑群参与人的此字段
    is_organizer: boolean // 参与人是否为日程组织者
    is_external: boolean // 参与人是否为外部参与人；外部参与人不支持编辑
    display_name: string // 参与人名称
    chat_members?: CreateCalendarEventAttendeeRespAttendeeChatMember[] // 群中的群成员, 当type为Chat时有效；群成员不支持编辑
    user_id: string // 参与人的用户id, 依赖于user_id_type返回对应的取值, 当is_external为true时, 此字段只会返回open_id或者union_id, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    chat_id: string // chat类型参与人的群组chat_id, 参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description)
    room_id: string // resource类型参与人的会议室room_id
    third_party_email: string // third_party类型参与人的邮箱
    operate_id: string // 如果日程是使用应用身份创建的, 在添加会议室的时候, 用来指定会议室的联系人, 在会议室视图展示。参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    resource_customization?: CreateCalendarEventAttendeeRespAttendeeResourceCustomization[] // 会议室的个性化配置
  }

  export interface CreateCalendarEventAttendeeRespAttendeeChatMember {
    rsvp_status: string // 参与人RSVP状态, 可选值有: `needs_action`: 参与人尚未回复状态, 或表示会议室预约中, `accept`: 参与人回复接受, 或表示会议室预约成功, `tentative`: 参与人回复待定, `decline`: 参与人回复拒绝, 或表示会议室预约失败, `removed`: 参与人或会议室已经从日程中被移除
    is_optional: boolean // 参与人是否为「可选参加」
    display_name: string // 参与人名称
    is_organizer: boolean // 参与人是否为日程组织者
    is_external: boolean // 参与人是否为外部参与人
  }

  export interface CreateCalendarEventAttendeeRespAttendeeResourceCustomization {
    index_key: string // 每个配置的唯一ID
    input_content: string // 当type类型为填空时, 该参数需要填入
    options?: CreateCalendarEventAttendeeRespAttendeeResourceCustomizationOption[] // 每个配置的选项
  }

  export interface CreateCalendarEventAttendeeRespAttendeeResourceCustomizationOption {
    option_key: string // 每个选项的唯一ID
    others_content: string // 当type类型为其它选项时, 该参数需要填入
  }

  export interface createCalendarEventAttendeeResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateCalendarEventAttendeeResp
  }

  export interface GetCalendarEventAttendeeListReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction), 示例值: "xxxxxxxxx_0"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "780TRhwXXXXX"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetCalendarEventAttendeeListResp {
    items?: GetCalendarEventAttendeeListRespItem[] // 日程的参与者列表
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface GetCalendarEventAttendeeListRespItem {
    type: string // 参与人类型, 可选值有: `user`: 用户, `chat`: 群组, `resource`: 会议室, `third_party`: 邮箱
    attendee_id: string // 参与人ID。参见[参与人ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/introduction#4998889c)
    rsvp_status: string // 参与人RSVP状态, 可选值有: `needs_action`: 参与人尚未回复状态, 或表示会议室预约中, `accept`: 参与人回复接受, 或表示会议室预约成功, `tentative`: 参与人回复待定, `decline`: 参与人回复拒绝, 或表示会议室预约失败, `removed`: 参与人或会议室已经从日程中被移除
    is_optional: boolean // 参与人是否为「可选参加」, 无法编辑群参与人的此字段
    is_organizer: boolean // 参与人是否为日程组织者
    is_external: boolean // 参与人是否为外部参与人；外部参与人不支持编辑
    display_name: string // 参与人名称
    chat_members?: GetCalendarEventAttendeeListRespItemChatMember[] // 群中的群成员, 当type为Chat时有效；群成员不支持编辑
    user_id: string // 参与人的用户id, 依赖于user_id_type返回对应的取值, 当is_external为true时, 此字段只会返回open_id或者union_id, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    chat_id: string // chat类型参与人的群组chat_id, 参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description)
    room_id: string // resource类型参与人的会议室room_id
    third_party_email: string // third_party类型参与人的邮箱
    operate_id: string // 如果日程是使用应用身份创建的, 在添加会议室的时候, 用来指定会议室的联系人, 在会议室视图展示。参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    resource_customization?: GetCalendarEventAttendeeListRespItemResourceCustomization[] // 会议室的个性化配置
  }

  export interface GetCalendarEventAttendeeListRespItemChatMember {
    rsvp_status: string // 参与人RSVP状态, 可选值有: `needs_action`: 参与人尚未回复状态, 或表示会议室预约中, `accept`: 参与人回复接受, 或表示会议室预约成功, `tentative`: 参与人回复待定, `decline`: 参与人回复拒绝, 或表示会议室预约失败, `removed`: 参与人或会议室已经从日程中被移除
    is_optional: boolean // 参与人是否为「可选参加」
    display_name: string // 参与人名称
    is_organizer: boolean // 参与人是否为日程组织者
    is_external: boolean // 参与人是否为外部参与人
  }

  export interface GetCalendarEventAttendeeListRespItemResourceCustomization {
    index_key: string // 每个配置的唯一ID
    input_content: string // 当type类型为填空时, 该参数需要填入
    options?: GetCalendarEventAttendeeListRespItemResourceCustomizationOption[] // 每个配置的选项
  }

  export interface GetCalendarEventAttendeeListRespItemResourceCustomizationOption {
    option_key: string // 每个选项的唯一ID
    others_content: string // 当type类型为其它选项时, 该参数需要填入
  }

  export interface getCalendarEventAttendeeListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetCalendarEventAttendeeListResp
  }

  export interface DeleteCalendarEventAttendeeReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction), 示例值: "xxxxxxxxx_0"
    attendee_ids?: string[] // 要移除的参与人 ID 列表。参见[参与人ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/introduction#4998889c), 示例值: ["user_xxxxx", "chat_xxxxx", "resource_xxxxx", "third_party_xxxxx"]
    need_notification?: boolean // 删除日程参与人时是否要给参与人发送bot通知, 默认为true, 示例值: false
    instance_start_time_admin?: string // 使用管理员身份访问时要修改的实例, 示例值: "1647320400"
    is_enable_admin?: boolean // 是否启用管理员身份(需先在管理后台设置某人为会议室管理员), 示例值: false
  }

  export interface DeleteCalendarEventAttendeeResp {}

  export interface deleteCalendarEventAttendeeResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteCalendarEventAttendeeResp
  }

  export interface GetCalendarEventAttendeeChatMemberListReq {
    calendar_id: string // 日历ID。参见[日历ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/introduction), 示例值: "feishu.cn_xxxxxxxxxx@group.calendar.feishu.cn"
    event_id: string // 日程ID。参见[日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction), 示例值: "xxxxxxxxx_0"
    attendee_id: string // 群参与人 ID。参见[参与人ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/introduction#4998889c), 示例值: "chat_xxxxxx"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "23jhysaxxxxsysy"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetCalendarEventAttendeeChatMemberListResp {
    items?: GetCalendarEventAttendeeChatMemberListRespItem[] // 群中的群成员, 当type为chat时有效；群成员不支持编辑
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface GetCalendarEventAttendeeChatMemberListRespItem {
    rsvp_status: string // 参与人RSVP状态, 可选值有: `needs_action`: 参与人尚未回复状态, 或表示会议室预约中, `accept`: 参与人回复接受, 或表示会议室预约成功, `tentative`: 参与人回复待定, `decline`: 参与人回复拒绝, 或表示会议室预约失败, `removed`: 参与人或会议室已经从日程中被移除
    is_optional: boolean // 参与人是否为「可选参加」
    display_name: string // 参与人名称
    open_id: string // 参与人open_id, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "ou_xxxxxxxx"
    is_organizer: boolean // 参与人是否为日程组织者
    is_external: boolean // 参与人是否为外部参与人
  }

  export interface getCalendarEventAttendeeChatMemberListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetCalendarEventAttendeeChatMemberListResp
  }

  export interface GetCalendarFreeBusyListReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    time_min: string // 查询时段开始时间, 需要url编码, 示例值: "2020-10-28T12:00:00+08:00"
    time_max: string // 查询时段结束时间, 需要url编码, 示例值: "2020-12-28T12:00:00+08:00"
    user_id?: string // 用户user_id, 输入时与 room_id 二选一。参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "ou_xxxxxxxxxx"
    room_id?: string // 会议室room_id, 输入时与 user_id 二选一, 示例值: "omm_xxxxxxxxxx"
  }

  export interface GetCalendarFreeBusyListResp {
    freebusy_list?: GetCalendarFreeBusyListRespFreebusy[] // 日历上请求时间区间内的忙碌时间段信息。
  }

  export interface GetCalendarFreeBusyListRespFreebusy {
    start_time: string // 忙闲信息开始时间, RFC3339 date_time 格式
    end_time: string // 忙闲信息结束时间, RFC3339 date_time 格式
  }

  export interface getCalendarFreeBusyListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetCalendarFreeBusyListResp
  }

  export interface CreateCalendarTimeoffEventReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id: string // 用户id, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "ou_XXXXXXXXXX"
    timezone: string // 时区, 示例值: "Asia/Shanghai"
    start_time: string // 休假开始时间: 有时间戳(1609430400)和日期(2021-01-01)两种格式, 其它格式无效；, 时间戳格式是按小时休假日程, 日期格式是全天休假日程；, start_time与end_time格式需保持一致, 否则无效, 示例值: "2021-01-01"
    end_time: string // 休假结束时间: 有时间戳(1609430400)和日期(2021-01-01)两种格式, 其它格式无效；, 时间戳格式是按小时休假日程, 日期格式是全天休假日程；, start_time与end_time格式需保持一致, 否则无效, 示例值: "2021-01-01"
    title?: string // 自定义请假日程标题, 没有设置则为默认日程标题, 示例值: "请假中(全天) / 1-Day Time Off"
    description?: string // 自定义请假日程描述, 没有设置则为默认日程描述, 示例值: "若删除此日程, 飞书中相应的“请假”标签将自动消失, 而请假系统中的休假申请不会被撤销。"
  }

  export interface CreateCalendarTimeoffEventResp {
    timeoff_event_id: string // 请假日程ID。参见[请假日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/introduction#b6611a02)
    user_id: string // 用户id, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    timezone: string // 时区
    start_time: string // 休假开始时间: 有时间戳(1609430400)和日期(2021-01-01)两种格式, 其它格式无效；, 时间戳格式是按小时休假日程, 日期格式是全天休假日程；, start_time与end_time格式需保持一致, 否则无效。
    end_time: string // 休假结束时间: 有时间戳(1609430400)和日期(2021-01-01)两种格式, 其它格式无效；, 时间戳格式是按小时休假日程, 日期格式是全天休假日程；, start_time与end_time格式需保持一致, 否则无效。
    title: string // 自定义请假日程标题, 没有设置则为默认日程标题
    description: string // 自定义请假日程描述, 没有设置则为默认日程描述
  }

  export interface createCalendarTimeoffEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateCalendarTimeoffEventResp
  }

  export interface DeleteCalendarTimeoffEventReq {
    timeoff_event_id: string // 休假申请的唯一标识id。参见[请假日程ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/introduction#b6611a02), 示例值: "timeoff:XXXXXX-XXXX-0917-1623-aa493d591a39"
  }

  export interface DeleteCalendarTimeoffEventResp {}

  export interface deleteCalendarTimeoffEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteCalendarTimeoffEventResp
  }

  export interface GenerateCaldavConfReq {
    device_name?: string // 需要同步日历的设备名, 在日历中展示用来管理密码, 示例值: "iPhone", 最大长度: `100` 字符
  }

  export interface GenerateCaldavConfResp {
    password: string // caldav密码
    user_name: string // caldav用户名
    server_address: string // 服务器地址
    device_name: string // 设备名
  }

  export interface generateCaldavConfResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GenerateCaldavConfResp
  }

  export interface CreateCalendarExchangeBindingReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    admin_account?: string // admin账户, 示例值: "email_admin_example@outlook.com", 长度范围: `1` ～ `500` 字符
    exchange_account?: string // 用户绑定的exchange账户, 示例值: "email_account_example@outlook.com", 长度范围: `1` ～ `500` 字符
    user_id?: string // exchange账户绑定user唯一标识id, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "ou_xxxxxxxxxxxxxxxxxx"
  }

  export interface CreateCalendarExchangeBindingResp {
    admin_account: string // admin账户, 字段权限要求: 获取用户邮箱信息
    exchange_account: string // 用户绑定的exchange账户, 字段权限要求: 获取用户邮箱信息
    user_id: string // exchange账户绑定user唯一标识id, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    status: string // exchange账户同步状态, 可选值有: `doing`: 日历正在同步, `cal_done`: 日历同步完成, `timespan_done`: 近期时间段同步完成, `done`: 日程同步完成, `err`: 同步错误
    exchange_binding_id: string // exchange绑定唯一标识id。参见[exchange绑定ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/introduction#12533d5e)
  }

  export interface createCalendarExchangeBindingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateCalendarExchangeBindingResp
  }

  export interface GetCalendarExchangeBindingReq {
    exchange_binding_id: string // exchange绑定唯一标识id。参见[exchange绑定ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/introduction#12533d5e), 示例值: "ZW1haWxfYWRtaW5fZXhhbXBsZUBvdXRsb29rLmNvbSBlbWFpbF9hY2NvdW50X2V4YW1wbGVAb3V0bG9vay5jb20="
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetCalendarExchangeBindingResp {
    admin_account: string // admin账户, 字段权限要求: 获取用户邮箱信息
    exchange_account: string // 用户绑定的exchange账户, 字段权限要求: 获取用户邮箱信息
    user_id: string // exchange账户绑定user唯一标识id, 参见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    status: string // exchange账户同步状态, 可选值有: `doing`: 日历正在同步, `cal_done`: 日历同步完成, `timespan_done`: 近期时间段同步完成, `done`: 日程同步完成, `err`: 同步错误
    exchange_binding_id: string // exchange绑定唯一标识id。参见[exchange绑定ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/introduction#12533d5e)
  }

  export interface getCalendarExchangeBindingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetCalendarExchangeBindingResp
  }

  export interface DeleteCalendarExchangeBindingReq {
    exchange_binding_id: string // exchange绑定唯一标识id。参见[exchange绑定ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/introduction#12533d5e), 示例值: "ZW1haWxfYWRtaW5fZXhhbXBsZUBvdXRsb29rLmNvbSBlbWFpbF9hY2NvdW50X2V4YW1wbGVAb3V0bG9vay5jb20="
  }

  export interface DeleteCalendarExchangeBindingResp {}

  export interface deleteCalendarExchangeBindingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteCalendarExchangeBindingResp
  }
}

class CreateCalendarACLReq {
  calendar_id?: any
  user_id_type?: any
  role?: any
  scope?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      role: this.role,
      scope: this.scope
    }
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteCalendarACLReq {
  calendar_id?: any
  acl_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)
    path = path.replace(':acl_id', this.acl_id)

    return path
  }
}

class GetCalendarACLListReq {
  calendar_id?: any
  user_id_type?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SubscribeCalendarACLReq {
  calendar_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    return path
  }
}

class GetPrimaryCalendarReq {
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateCalendarReq {
  summary?: any
  description?: any
  permissions?: any
  color?: any
  summary_alias?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      summary: this.summary,
      description: this.description,
      permissions: this.permissions,
      color: this.color,
      summary_alias: this.summary_alias
    }
  }

  getPath(path: string) {
    return path
  }
}

class DeleteCalendarReq {
  calendar_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    return path
  }
}

class GetCalendarReq {
  calendar_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    return path
  }
}

class GetCalendarListReq {
  page_size?: any
  page_token?: any
  sync_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.sync_token !== undefined) {
      q['sync_token'] = this.sync_token
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateCalendarReq {
  calendar_id?: any
  summary?: any
  description?: any
  permissions?: any
  color?: any
  summary_alias?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      summary: this.summary,
      description: this.description,
      permissions: this.permissions,
      color: this.color,
      summary_alias: this.summary_alias
    }
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    return path
  }
}

class SearchCalendarReq {
  page_token?: any
  page_size?: any
  query?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      query: this.query
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SubscribeCalendarReq {
  calendar_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    return path
  }
}

class UnsubscribeCalendarReq {
  calendar_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    return path
  }
}

class SubscribeCalendarChangeEventReq {
  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    return path
  }
}

class CreateCalendarEventReq {
  calendar_id?: any
  summary?: any
  description?: any
  need_notification?: any
  start_time?: any
  end_time?: any
  vchat?: any
  visibility?: any
  attendee_ability?: any
  free_busy_status?: any
  location?: any
  color?: any
  reminders?: any
  recurrence?: any
  schemas?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      summary: this.summary,
      description: this.description,
      need_notification: this.need_notification,
      start_time: this.start_time,
      end_time: this.end_time,
      vchat: this.vchat,
      visibility: this.visibility,
      attendee_ability: this.attendee_ability,
      free_busy_status: this.free_busy_status,
      location: this.location,
      color: this.color,
      reminders: this.reminders,
      recurrence: this.recurrence,
      schemas: this.schemas
    }
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    return path
  }
}

class DeleteCalendarEventReq {
  calendar_id?: any
  event_id?: any
  need_notification?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)
    path = path.replace(':event_id', this.event_id)

    const q = {} as { [key: string]: any }
    if (this.need_notification !== undefined) {
      q['need_notification'] = this.need_notification
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetCalendarEventReq {
  calendar_id?: any
  event_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)
    path = path.replace(':event_id', this.event_id)

    return path
  }
}

class GetCalendarEventListReq {
  calendar_id?: any
  page_size?: any
  anchor_time?: any
  page_token?: any
  sync_token?: any
  start_time?: any
  end_time?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    const q = {} as { [key: string]: any }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.anchor_time !== undefined) {
      q['anchor_time'] = this.anchor_time
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.sync_token !== undefined) {
      q['sync_token'] = this.sync_token
    }
    if (this.start_time !== undefined) {
      q['start_time'] = this.start_time
    }
    if (this.end_time !== undefined) {
      q['end_time'] = this.end_time
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateCalendarEventReq {
  calendar_id?: any
  event_id?: any
  summary?: any
  description?: any
  need_notification?: any
  start_time?: any
  end_time?: any
  vchat?: any
  visibility?: any
  attendee_ability?: any
  free_busy_status?: any
  location?: any
  color?: any
  reminders?: any
  recurrence?: any
  schemas?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      summary: this.summary,
      description: this.description,
      need_notification: this.need_notification,
      start_time: this.start_time,
      end_time: this.end_time,
      vchat: this.vchat,
      visibility: this.visibility,
      attendee_ability: this.attendee_ability,
      free_busy_status: this.free_busy_status,
      location: this.location,
      color: this.color,
      reminders: this.reminders,
      recurrence: this.recurrence,
      schemas: this.schemas
    }
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)
    path = path.replace(':event_id', this.event_id)

    return path
  }
}

class SearchCalendarEventReq {
  calendar_id?: any
  user_id_type?: any
  page_token?: any
  page_size?: any
  query?: any
  filter?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      query: this.query,
      filter: this.filter
    }
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SubscribeCalendarEventReq {
  calendar_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)

    return path
  }
}

class CreateCalendarEventAttendeeReq {
  calendar_id?: any
  event_id?: any
  user_id_type?: any
  attendees?: any
  need_notification?: any
  instance_start_time_admin?: any
  is_enable_admin?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      attendees: this.attendees,
      need_notification: this.need_notification,
      instance_start_time_admin: this.instance_start_time_admin,
      is_enable_admin: this.is_enable_admin
    }
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)
    path = path.replace(':event_id', this.event_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetCalendarEventAttendeeListReq {
  calendar_id?: any
  event_id?: any
  user_id_type?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)
    path = path.replace(':event_id', this.event_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteCalendarEventAttendeeReq {
  calendar_id?: any
  event_id?: any
  attendee_ids?: any
  need_notification?: any
  instance_start_time_admin?: any
  is_enable_admin?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      attendee_ids: this.attendee_ids,
      need_notification: this.need_notification,
      instance_start_time_admin: this.instance_start_time_admin,
      is_enable_admin: this.is_enable_admin
    }
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)
    path = path.replace(':event_id', this.event_id)

    return path
  }
}

class GetCalendarEventAttendeeChatMemberListReq {
  calendar_id?: any
  event_id?: any
  attendee_id?: any
  page_token?: any
  page_size?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':calendar_id', this.calendar_id)
    path = path.replace(':event_id', this.event_id)
    path = path.replace(':attendee_id', this.attendee_id)

    const q = {} as { [key: string]: any }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetCalendarFreeBusyListReq {
  user_id_type?: any
  time_min?: any
  time_max?: any
  user_id?: any
  room_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      time_min: this.time_min,
      time_max: this.time_max,
      user_id: this.user_id,
      room_id: this.room_id
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateCalendarTimeoffEventReq {
  user_id_type?: any
  user_id?: any
  timezone?: any
  start_time?: any
  end_time?: any
  title?: any
  description?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id: this.user_id,
      timezone: this.timezone,
      start_time: this.start_time,
      end_time: this.end_time,
      title: this.title,
      description: this.description
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteCalendarTimeoffEventReq {
  timeoff_event_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':timeoff_event_id', this.timeoff_event_id)

    return path
  }
}

class GenerateCaldavConfReq {
  device_name?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      device_name: this.device_name
    }
  }

  getPath(path: string) {
    return path
  }
}

class CreateCalendarExchangeBindingReq {
  user_id_type?: any
  admin_account?: any
  exchange_account?: any
  user_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      admin_account: this.admin_account,
      exchange_account: this.exchange_account,
      user_id: this.user_id
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetCalendarExchangeBindingReq {
  exchange_binding_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':exchange_binding_id', this.exchange_binding_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteCalendarExchangeBindingReq {
  exchange_binding_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':exchange_binding_id', this.exchange_binding_id)

    return path
  }
}
