import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class HelpdeskService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // createHelpdeskNotification 调用接口创建推送, 创建成功后为草稿状态
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/create
  async createHelpdeskNotification(
    request: Helpdesk.CreateHelpdeskNotificationReq
  ): Promise<{
    data: Helpdesk.CreateHelpdeskNotificationResp
    response: Response
  }> {
    const req: RawRequestReq<CreateHelpdeskNotificationReq> = {
      scope: 'Helpdesk',
      api: 'CreateHelpdeskNotification',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/notifications',
      body: new CreateHelpdeskNotificationReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      CreateHelpdeskNotificationReq,
      Helpdesk.CreateHelpdeskNotificationResp
    >(req)
  }
  // updateHelpdeskNotification 更新推送信息, 只有在草稿状态下才可以调用此接口进行更新
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/patch
  async updateHelpdeskNotification(
    request: Helpdesk.UpdateHelpdeskNotificationReq
  ): Promise<{
    data: Helpdesk.UpdateHelpdeskNotificationResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateHelpdeskNotificationReq> = {
      scope: 'Helpdesk',
      api: 'UpdateHelpdeskNotification',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/notifications/:notification_id',
      body: new UpdateHelpdeskNotificationReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      UpdateHelpdeskNotificationReq,
      Helpdesk.UpdateHelpdeskNotificationResp
    >(req)
  }
  // getHelpdeskNotification 查询推送详情
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/get
  async getHelpdeskNotification(
    request: Helpdesk.GetHelpdeskNotificationReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskNotificationResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskNotificationReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskNotification',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/notifications/:notification_id',
      body: new GetHelpdeskNotificationReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<GetHelpdeskNotificationReq, Helpdesk.GetHelpdeskNotificationResp>(
      req
    )
  }
  // previewHelpdeskNotification 在正式执行推送之前是可以调用此接口预览设置的推送内容
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/preview
  async previewHelpdeskNotification(
    request: Helpdesk.PreviewHelpdeskNotificationReq
  ): Promise<{
    data: Helpdesk.PreviewHelpdeskNotificationResp
    response: Response
  }> {
    const req: RawRequestReq<PreviewHelpdeskNotificationReq> = {
      scope: 'Helpdesk',
      api: 'PreviewHelpdeskNotification',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/notifications/:notification_id/preview',
      body: new PreviewHelpdeskNotificationReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      PreviewHelpdeskNotificationReq,
      Helpdesk.PreviewHelpdeskNotificationResp
    >(req)
  }
  // submitApproveHelpdeskNotification 正常情况下调用创建推送接口后, 就可以调用提交审核接口, 如果创建人是服务台owner则会自动审核通过, 否则会通知服务台owner审核此推送信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/submit_approve
  async submitApproveHelpdeskNotification(
    request: Helpdesk.SubmitApproveHelpdeskNotificationReq
  ): Promise<{
    data: Helpdesk.SubmitApproveHelpdeskNotificationResp
    response: Response
  }> {
    const req: RawRequestReq<SubmitApproveHelpdeskNotificationReq> = {
      scope: 'Helpdesk',
      api: 'SubmitApproveHelpdeskNotification',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/helpdesk/v1/notifications/:notification_id/submit_approve',
      body: new SubmitApproveHelpdeskNotificationReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      SubmitApproveHelpdeskNotificationReq,
      Helpdesk.SubmitApproveHelpdeskNotificationResp
    >(req)
  }
  // cancelApproveHelpdeskNotification 提交审核后, 如果需要取消审核, 则调用此接口
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/cancel_approve
  async cancelApproveHelpdeskNotification(
    request: Helpdesk.CancelApproveHelpdeskNotificationReq
  ): Promise<{
    data: Helpdesk.CancelApproveHelpdeskNotificationResp
    response: Response
  }> {
    const req: RawRequestReq<CancelApproveHelpdeskNotificationReq> = {
      scope: 'Helpdesk',
      api: 'CancelApproveHelpdeskNotification',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/helpdesk/v1/notifications/:notification_id/cancel_approve',
      body: new CancelApproveHelpdeskNotificationReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      CancelApproveHelpdeskNotificationReq,
      Helpdesk.CancelApproveHelpdeskNotificationResp
    >(req)
  }
  // executeSendHelpdeskNotification 审核通过后调用此接口设置推送时间, 等待调度系统调度, 发送消息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/execute_send
  async executeSendHelpdeskNotification(
    request: Helpdesk.ExecuteSendHelpdeskNotificationReq
  ): Promise<{
    data: Helpdesk.ExecuteSendHelpdeskNotificationResp
    response: Response
  }> {
    const req: RawRequestReq<ExecuteSendHelpdeskNotificationReq> = {
      scope: 'Helpdesk',
      api: 'ExecuteSendHelpdeskNotification',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/helpdesk/v1/notifications/:notification_id/execute_send',
      body: new ExecuteSendHelpdeskNotificationReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      ExecuteSendHelpdeskNotificationReq,
      Helpdesk.ExecuteSendHelpdeskNotificationResp
    >(req)
  }
  // cancelSendHelpdeskNotification 取消推送接口, 审核通过后待调度可以调用, 发送过程中可以调用（会撤回已发送的消息）, 发送完成后可以需要推送（会撤回所有已发送的消息）
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/cancel_send
  async cancelSendHelpdeskNotification(
    request: Helpdesk.CancelSendHelpdeskNotificationReq
  ): Promise<{
    data: Helpdesk.CancelSendHelpdeskNotificationResp
    response: Response
  }> {
    const req: RawRequestReq<CancelSendHelpdeskNotificationReq> = {
      scope: 'Helpdesk',
      api: 'CancelSendHelpdeskNotification',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/helpdesk/v1/notifications/:notification_id/cancel_send',
      body: new CancelSendHelpdeskNotificationReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      CancelSendHelpdeskNotificationReq,
      Helpdesk.CancelSendHelpdeskNotificationResp
    >(req)
  }
  // startHelpdeskService 该接口用于创建服务台对话。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/start_service
  async startHelpdeskService(
    request: Helpdesk.StartHelpdeskServiceReq
  ): Promise<{
    data: Helpdesk.StartHelpdeskServiceResp
    response: Response
  }> {
    const req: RawRequestReq<StartHelpdeskServiceReq> = {
      scope: 'Helpdesk',
      api: 'StartHelpdeskService',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/start_service',
      body: new StartHelpdeskServiceReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<StartHelpdeskServiceReq, Helpdesk.StartHelpdeskServiceResp>(req)
  }
  // getHelpdeskTicket 该接口用于获取单个服务台工单详情。仅支持自建应用。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/get
  async getHelpdeskTicket(
    request: Helpdesk.GetHelpdeskTicketReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskTicketResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskTicketReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskTicket',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/tickets/:ticket_id',
      body: new GetHelpdeskTicketReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<GetHelpdeskTicketReq, Helpdesk.GetHelpdeskTicketResp>(req)
  }
  // updateHelpdeskTicket 该接口用于更新服务台工单详情。只会更新数据, 不会触发相关操作。如修改工单状态到关单, 不会关闭聊天页面。仅支持自建应用。要更新的工单字段必须至少输入一项。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/update
  async updateHelpdeskTicket(
    request: Helpdesk.UpdateHelpdeskTicketReq
  ): Promise<{
    data: Helpdesk.UpdateHelpdeskTicketResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateHelpdeskTicketReq> = {
      scope: 'Helpdesk',
      api: 'UpdateHelpdeskTicket',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/tickets/:ticket_id',
      body: new UpdateHelpdeskTicketReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<UpdateHelpdeskTicketReq, Helpdesk.UpdateHelpdeskTicketResp>(req)
  }
  // getHelpdeskTicketList 该接口用于获取全部工单详情。仅支持自建应用。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/list
  async getHelpdeskTicketList(
    request: Helpdesk.GetHelpdeskTicketListReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskTicketListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskTicketListReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskTicketList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/tickets',
      body: new GetHelpdeskTicketListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<GetHelpdeskTicketListReq, Helpdesk.GetHelpdeskTicketListResp>(req)
  }
  // downloadHelpdeskTicketImage 该接口用于获取服务台工单消息图象。仅支持自建应用。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/ticket_image
  async downloadHelpdeskTicketImage(
    request: Helpdesk.DownloadHelpdeskTicketImageReq
  ): Promise<{
    data: Helpdesk.DownloadHelpdeskTicketImageResp
    response: Response
  }> {
    const req: RawRequestReq<DownloadHelpdeskTicketImageReq> = {
      scope: 'Helpdesk',
      api: 'DownloadHelpdeskTicketImage',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/ticket_images',
      body: new DownloadHelpdeskTicketImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true,
      is_file_download: true
    }
    return this.cli.RawRequest<
      DownloadHelpdeskTicketImageReq,
      Helpdesk.DownloadHelpdeskTicketImageResp
    >(req)
  }
  // answerHelpdeskTicketUserQuery 该接口用于回复用户提问结果至工单, 需要工单仍处于进行中且未接入人工状态。仅支持自建应用。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/answer_user_query
  async answerHelpdeskTicketUserQuery(
    request: Helpdesk.AnswerHelpdeskTicketUserQueryReq
  ): Promise<{
    data: Helpdesk.AnswerHelpdeskTicketUserQueryResp
    response: Response
  }> {
    const req: RawRequestReq<AnswerHelpdeskTicketUserQueryReq> = {
      scope: 'Helpdesk',
      api: 'AnswerHelpdeskTicketUserQuery',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/tickets/:ticket_id/answer_user_query',
      body: new AnswerHelpdeskTicketUserQueryReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      AnswerHelpdeskTicketUserQueryReq,
      Helpdesk.AnswerHelpdeskTicketUserQueryResp
    >(req)
  }
  // getHelpdeskTicketCustomizedFields 该接口用于获取服务台自定义字段详情。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/customized_fields
  async getHelpdeskTicketCustomizedFields(
    request: Helpdesk.GetHelpdeskTicketCustomizedFieldsReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskTicketCustomizedFieldsResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskTicketCustomizedFieldsReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskTicketCustomizedFields',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/customized_fields',
      body: new GetHelpdeskTicketCustomizedFieldsReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      GetHelpdeskTicketCustomizedFieldsReq,
      Helpdesk.GetHelpdeskTicketCustomizedFieldsResp
    >(req)
  }
  // getHelpdeskTicketMessageList 该接口用于获取服务台工单消息详情。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket-message/list
  async getHelpdeskTicketMessageList(
    request: Helpdesk.GetHelpdeskTicketMessageListReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskTicketMessageListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskTicketMessageListReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskTicketMessageList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/tickets/:ticket_id/messages',
      body: new GetHelpdeskTicketMessageListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      GetHelpdeskTicketMessageListReq,
      Helpdesk.GetHelpdeskTicketMessageListResp
    >(req)
  }
  // sendHelpdeskTicketMessage 该接口用于工单发送消息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket-message/create
  async sendHelpdeskTicketMessage(
    request: Helpdesk.SendHelpdeskTicketMessageReq
  ): Promise<{
    data: Helpdesk.SendHelpdeskTicketMessageResp
    response: Response
  }> {
    const req: RawRequestReq<SendHelpdeskTicketMessageReq> = {
      scope: 'Helpdesk',
      api: 'SendHelpdeskTicketMessage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/tickets/:ticket_id/messages',
      body: new SendHelpdeskTicketMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      SendHelpdeskTicketMessageReq,
      Helpdesk.SendHelpdeskTicketMessageResp
    >(req)
  }
  // sendHelpdeskMessage 通过服务台机器人给指定用户的服务台专属群或私聊发送消息, 支持文本、富文本、卡片、图片。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/bot-message/create
  async sendHelpdeskMessage(
    request: Helpdesk.SendHelpdeskMessageReq
  ): Promise<{
    data: Helpdesk.SendHelpdeskMessageResp
    response: Response
  }> {
    const req: RawRequestReq<SendHelpdeskMessageReq> = {
      scope: 'Helpdesk',
      api: 'SendHelpdeskMessage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/message',
      body: new SendHelpdeskMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<SendHelpdeskMessageReq, Helpdesk.SendHelpdeskMessageResp>(req)
  }
  // getHelpdeskTicketCustomizedFieldList 该接口用于获取全部工单自定义字段。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/list-ticket-customized-fields
  async getHelpdeskTicketCustomizedFieldList(
    request: Helpdesk.GetHelpdeskTicketCustomizedFieldListReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskTicketCustomizedFieldListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskTicketCustomizedFieldListReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskTicketCustomizedFieldList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/ticket_customized_fields',
      body: new GetHelpdeskTicketCustomizedFieldListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      GetHelpdeskTicketCustomizedFieldListReq,
      Helpdesk.GetHelpdeskTicketCustomizedFieldListResp
    >(req)
  }
  // deleteHelpdeskTicketCustomizedField 该接口用于删除工单自定义字段。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/delete
  async deleteHelpdeskTicketCustomizedField(
    request: Helpdesk.DeleteHelpdeskTicketCustomizedFieldReq
  ): Promise<{
    data: Helpdesk.DeleteHelpdeskTicketCustomizedFieldResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteHelpdeskTicketCustomizedFieldReq> = {
      scope: 'Helpdesk',
      api: 'DeleteHelpdeskTicketCustomizedField',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id',
      body: new DeleteHelpdeskTicketCustomizedFieldReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      DeleteHelpdeskTicketCustomizedFieldReq,
      Helpdesk.DeleteHelpdeskTicketCustomizedFieldResp
    >(req)
  }
  // updateHelpdeskTicketCustomizedField 该接口用于更新自定义字段。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/update-ticket-customized-field
  async updateHelpdeskTicketCustomizedField(
    request: Helpdesk.UpdateHelpdeskTicketCustomizedFieldReq
  ): Promise<{
    data: Helpdesk.UpdateHelpdeskTicketCustomizedFieldResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateHelpdeskTicketCustomizedFieldReq> = {
      scope: 'Helpdesk',
      api: 'UpdateHelpdeskTicketCustomizedField',
      method: 'PATCH',
      url:
        this.cli.openBaseURL +
        '/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id',
      body: new UpdateHelpdeskTicketCustomizedFieldReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      UpdateHelpdeskTicketCustomizedFieldReq,
      Helpdesk.UpdateHelpdeskTicketCustomizedFieldResp
    >(req)
  }
  // createHelpdeskTicketCustomizedField 该接口用于创建自定义字段
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/create-ticket-customized-field
  async createHelpdeskTicketCustomizedField(
    request: Helpdesk.CreateHelpdeskTicketCustomizedFieldReq
  ): Promise<{
    data: Helpdesk.CreateHelpdeskTicketCustomizedFieldResp
    response: Response
  }> {
    const req: RawRequestReq<CreateHelpdeskTicketCustomizedFieldReq> = {
      scope: 'Helpdesk',
      api: 'CreateHelpdeskTicketCustomizedField',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/ticket_customized_fields',
      body: new CreateHelpdeskTicketCustomizedFieldReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      CreateHelpdeskTicketCustomizedFieldReq,
      Helpdesk.CreateHelpdeskTicketCustomizedFieldResp
    >(req)
  }
  // getHelpdeskTicketCustomizedField 该接口用于获取工单自定义字段详情。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/get-ticket-customized-field
  async getHelpdeskTicketCustomizedField(
    request: Helpdesk.GetHelpdeskTicketCustomizedFieldReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskTicketCustomizedFieldResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskTicketCustomizedFieldReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskTicketCustomizedField',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id',
      body: new GetHelpdeskTicketCustomizedFieldReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      GetHelpdeskTicketCustomizedFieldReq,
      Helpdesk.GetHelpdeskTicketCustomizedFieldResp
    >(req)
  }
  // createHelpdeskCategory 该接口用于创建知识库分类。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/create
  async createHelpdeskCategory(
    request: Helpdesk.CreateHelpdeskCategoryReq
  ): Promise<{
    data: Helpdesk.CreateHelpdeskCategoryResp
    response: Response
  }> {
    const req: RawRequestReq<CreateHelpdeskCategoryReq> = {
      scope: 'Helpdesk',
      api: 'CreateHelpdeskCategory',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/categories',
      body: new CreateHelpdeskCategoryReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<CreateHelpdeskCategoryReq, Helpdesk.CreateHelpdeskCategoryResp>(req)
  }
  // getHelpdeskCategory 该接口用于获取知识库分类。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/get
  async getHelpdeskCategory(
    request: Helpdesk.GetHelpdeskCategoryReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskCategoryResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskCategoryReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskCategory',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/categories/:id',
      body: new GetHelpdeskCategoryReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<GetHelpdeskCategoryReq, Helpdesk.GetHelpdeskCategoryResp>(req)
  }
  // updateHelpdeskCategory 该接口用于更新知识库分类详情。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/patch
  async updateHelpdeskCategory(
    request: Helpdesk.UpdateHelpdeskCategoryReq
  ): Promise<{
    data: Helpdesk.UpdateHelpdeskCategoryResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateHelpdeskCategoryReq> = {
      scope: 'Helpdesk',
      api: 'UpdateHelpdeskCategory',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/categories/:id',
      body: new UpdateHelpdeskCategoryReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<UpdateHelpdeskCategoryReq, Helpdesk.UpdateHelpdeskCategoryResp>(req)
  }
  // deleteHelpdeskCategory 该接口用于删除知识库分类详情。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/delete
  async deleteHelpdeskCategory(
    request: Helpdesk.DeleteHelpdeskCategoryReq
  ): Promise<{
    data: Helpdesk.DeleteHelpdeskCategoryResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteHelpdeskCategoryReq> = {
      scope: 'Helpdesk',
      api: 'DeleteHelpdeskCategory',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/categories/:id',
      body: new DeleteHelpdeskCategoryReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<DeleteHelpdeskCategoryReq, Helpdesk.DeleteHelpdeskCategoryResp>(req)
  }
  // getHelpdeskCategoryList 该接口用于获取服务台知识库所有分类。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/list-categories
  async getHelpdeskCategoryList(
    request: Helpdesk.GetHelpdeskCategoryListReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskCategoryListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskCategoryListReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskCategoryList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/categories',
      body: new GetHelpdeskCategoryListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<GetHelpdeskCategoryListReq, Helpdesk.GetHelpdeskCategoryListResp>(
      req
    )
  }
  // createHelpdeskFAQ 该接口用于创建知识库。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/create
  async createHelpdeskFAQ(
    request: Helpdesk.CreateHelpdeskFAQReq
  ): Promise<{
    data: Helpdesk.CreateHelpdeskFAQResp
    response: Response
  }> {
    const req: RawRequestReq<CreateHelpdeskFAQReq> = {
      scope: 'Helpdesk',
      api: 'CreateHelpdeskFAQ',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/faqs',
      body: new CreateHelpdeskFAQReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<CreateHelpdeskFAQReq, Helpdesk.CreateHelpdeskFAQResp>(req)
  }
  // getHelpdeskFAQ 该接口用于获取服务台知识库详情。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/get
  async getHelpdeskFAQ(
    request: Helpdesk.GetHelpdeskFAQReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskFAQResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskFAQReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskFAQ',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/faqs/:id',
      body: new GetHelpdeskFAQReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<GetHelpdeskFAQReq, Helpdesk.GetHelpdeskFAQResp>(req)
  }
  // updateHelpdeskFAQ 该接口用于修改知识库。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/patch
  async updateHelpdeskFAQ(
    request: Helpdesk.UpdateHelpdeskFAQReq
  ): Promise<{
    data: Helpdesk.UpdateHelpdeskFAQResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateHelpdeskFAQReq> = {
      scope: 'Helpdesk',
      api: 'UpdateHelpdeskFAQ',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/faqs/:id',
      body: new UpdateHelpdeskFAQReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<UpdateHelpdeskFAQReq, Helpdesk.UpdateHelpdeskFAQResp>(req)
  }
  // deleteHelpdeskFAQ 该接口用于删除知识库。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/delete
  async deleteHelpdeskFAQ(
    request: Helpdesk.DeleteHelpdeskFAQReq
  ): Promise<{
    data: Helpdesk.DeleteHelpdeskFAQResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteHelpdeskFAQReq> = {
      scope: 'Helpdesk',
      api: 'DeleteHelpdeskFAQ',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/faqs/:id',
      body: new DeleteHelpdeskFAQReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<DeleteHelpdeskFAQReq, Helpdesk.DeleteHelpdeskFAQResp>(req)
  }
  // getHelpdeskFAQList 该接口用于获取服务台知识库详情。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/list
  async getHelpdeskFAQList(
    request: Helpdesk.GetHelpdeskFAQListReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskFAQListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskFAQListReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskFAQList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/faqs',
      body: new GetHelpdeskFAQListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<GetHelpdeskFAQListReq, Helpdesk.GetHelpdeskFAQListResp>(req)
  }
  // getHelpdeskFAQImage 该接口用于获取知识库图像。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/faq_image
  async getHelpdeskFAQImage(
    request: Helpdesk.GetHelpdeskFAQImageReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskFAQImageResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskFAQImageReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskFAQImage',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/faqs/:id/image/:image_key',
      body: new GetHelpdeskFAQImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true,
      is_file_download: true
    }
    return this.cli.RawRequest<GetHelpdeskFAQImageReq, Helpdesk.GetHelpdeskFAQImageResp>(req)
  }
  // searchHelpdeskFAQ 该接口用于搜索服务台知识库。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/search
  async searchHelpdeskFAQ(
    request: Helpdesk.SearchHelpdeskFAQReq
  ): Promise<{
    data: Helpdesk.SearchHelpdeskFAQResp
    response: Response
  }> {
    const req: RawRequestReq<SearchHelpdeskFAQReq> = {
      scope: 'Helpdesk',
      api: 'SearchHelpdeskFAQ',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/faqs/search',
      body: new SearchHelpdeskFAQReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<SearchHelpdeskFAQReq, Helpdesk.SearchHelpdeskFAQResp>(req)
  }
  // updateHelpdeskAgent 更新客服状态等信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent/patch
  async updateHelpdeskAgent(
    request: Helpdesk.UpdateHelpdeskAgentReq
  ): Promise<{
    data: Helpdesk.UpdateHelpdeskAgentResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateHelpdeskAgentReq> = {
      scope: 'Helpdesk',
      api: 'UpdateHelpdeskAgent',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agents/:agent_id',
      body: new UpdateHelpdeskAgentReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<UpdateHelpdeskAgentReq, Helpdesk.UpdateHelpdeskAgentResp>(req)
  }
  // getHelpdeskAgentEmail 该接口用于获取客服邮箱地址
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent/agent_email
  async getHelpdeskAgentEmail(
    request: Helpdesk.GetHelpdeskAgentEmailReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskAgentEmailResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskAgentEmailReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskAgentEmail',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agent_emails',
      body: new GetHelpdeskAgentEmailReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<GetHelpdeskAgentEmailReq, Helpdesk.GetHelpdeskAgentEmailResp>(req)
  }
  // createHelpdeskAgentSchedule 该接口用于创建客服
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_schedule/create
  async createHelpdeskAgentSchedule(
    request: Helpdesk.CreateHelpdeskAgentScheduleReq
  ): Promise<{
    data: Helpdesk.CreateHelpdeskAgentScheduleResp
    response: Response
  }> {
    const req: RawRequestReq<CreateHelpdeskAgentScheduleReq> = {
      scope: 'Helpdesk',
      api: 'CreateHelpdeskAgentSchedule',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agent_schedules',
      body: new CreateHelpdeskAgentScheduleReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      CreateHelpdeskAgentScheduleReq,
      Helpdesk.CreateHelpdeskAgentScheduleResp
    >(req)
  }
  // deleteHelpdeskAgentSchedule 该接口用于删除客服
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent-schedules/delete
  async deleteHelpdeskAgentSchedule(
    request: Helpdesk.DeleteHelpdeskAgentScheduleReq
  ): Promise<{
    data: Helpdesk.DeleteHelpdeskAgentScheduleResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteHelpdeskAgentScheduleReq> = {
      scope: 'Helpdesk',
      api: 'DeleteHelpdeskAgentSchedule',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agents/:agent_id/schedules',
      body: new DeleteHelpdeskAgentScheduleReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      DeleteHelpdeskAgentScheduleReq,
      Helpdesk.DeleteHelpdeskAgentScheduleResp
    >(req)
  }
  // updateHelpdeskAgentSchedule 该接口用于更新客服的日程
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent-schedules/patch
  async updateHelpdeskAgentSchedule(
    request: Helpdesk.UpdateHelpdeskAgentScheduleReq
  ): Promise<{
    data: Helpdesk.UpdateHelpdeskAgentScheduleResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateHelpdeskAgentScheduleReq> = {
      scope: 'Helpdesk',
      api: 'UpdateHelpdeskAgentSchedule',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agents/:agent_id/schedules',
      body: new UpdateHelpdeskAgentScheduleReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      UpdateHelpdeskAgentScheduleReq,
      Helpdesk.UpdateHelpdeskAgentScheduleResp
    >(req)
  }
  // getHelpdeskAgentSchedule 该接口用于获取客服信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent-schedules/get
  async getHelpdeskAgentSchedule(
    request: Helpdesk.GetHelpdeskAgentScheduleReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskAgentScheduleResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskAgentScheduleReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskAgentSchedule',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agents/:agent_id/schedules',
      body: new GetHelpdeskAgentScheduleReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<GetHelpdeskAgentScheduleReq, Helpdesk.GetHelpdeskAgentScheduleResp>(
      req
    )
  }
  // getHelpdeskAgentScheduleList 该接口用于获取所有客服信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_schedule/list
  async getHelpdeskAgentScheduleList(
    request: Helpdesk.GetHelpdeskAgentScheduleListReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskAgentScheduleListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskAgentScheduleListReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskAgentScheduleList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agent_schedules',
      body: new GetHelpdeskAgentScheduleListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      GetHelpdeskAgentScheduleListReq,
      Helpdesk.GetHelpdeskAgentScheduleListResp
    >(req)
  }
  // createHelpdeskAgentSkill 该接口用于创建客服技能
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/create
  async createHelpdeskAgentSkill(
    request: Helpdesk.CreateHelpdeskAgentSkillReq
  ): Promise<{
    data: Helpdesk.CreateHelpdeskAgentSkillResp
    response: Response
  }> {
    const req: RawRequestReq<CreateHelpdeskAgentSkillReq> = {
      scope: 'Helpdesk',
      api: 'CreateHelpdeskAgentSkill',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agent_skills',
      body: new CreateHelpdeskAgentSkillReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<CreateHelpdeskAgentSkillReq, Helpdesk.CreateHelpdeskAgentSkillResp>(
      req
    )
  }
  // getHelpdeskAgentSkill 该接口用于获取客服技能
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/get
  async getHelpdeskAgentSkill(
    request: Helpdesk.GetHelpdeskAgentSkillReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskAgentSkillResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskAgentSkillReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskAgentSkill',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agent_skills/:agent_skill_id',
      body: new GetHelpdeskAgentSkillReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<GetHelpdeskAgentSkillReq, Helpdesk.GetHelpdeskAgentSkillResp>(req)
  }
  // updateHelpdeskAgentSkill 该接口用于更新客服技能
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/patch
  async updateHelpdeskAgentSkill(
    request: Helpdesk.UpdateHelpdeskAgentSkillReq
  ): Promise<{
    data: Helpdesk.UpdateHelpdeskAgentSkillResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateHelpdeskAgentSkillReq> = {
      scope: 'Helpdesk',
      api: 'UpdateHelpdeskAgentSkill',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agent_skills/:agent_skill_id',
      body: new UpdateHelpdeskAgentSkillReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<UpdateHelpdeskAgentSkillReq, Helpdesk.UpdateHelpdeskAgentSkillResp>(
      req
    )
  }
  // deleteHelpdeskAgentSkill 该接口用于删除客服技能
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/delete
  async deleteHelpdeskAgentSkill(
    request: Helpdesk.DeleteHelpdeskAgentSkillReq
  ): Promise<{
    data: Helpdesk.DeleteHelpdeskAgentSkillResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteHelpdeskAgentSkillReq> = {
      scope: 'Helpdesk',
      api: 'DeleteHelpdeskAgentSkill',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agent_skills/:agent_skill_id',
      body: new DeleteHelpdeskAgentSkillReq(request),
      method_option: false,
      need_user_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<DeleteHelpdeskAgentSkillReq, Helpdesk.DeleteHelpdeskAgentSkillResp>(
      req
    )
  }
  // getHelpdeskAgentSkillList 获取全部客服技能
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/list
  async getHelpdeskAgentSkillList(
    request: Helpdesk.GetHelpdeskAgentSkillListReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskAgentSkillListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskAgentSkillListReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskAgentSkillList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agent_skills',
      body: new GetHelpdeskAgentSkillListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      GetHelpdeskAgentSkillListReq,
      Helpdesk.GetHelpdeskAgentSkillListResp
    >(req)
  }
  // getHelpdeskAgentSkillRuleList 该接口用于获取全部客服技能。仅支持自建应用。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill_rule/list
  async getHelpdeskAgentSkillRuleList(
    request: Helpdesk.GetHelpdeskAgentSkillRuleListReq
  ): Promise<{
    data: Helpdesk.GetHelpdeskAgentSkillRuleListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHelpdeskAgentSkillRuleListReq> = {
      scope: 'Helpdesk',
      api: 'GetHelpdeskAgentSkillRuleList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/agent_skill_rules',
      body: new GetHelpdeskAgentSkillRuleListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<
      GetHelpdeskAgentSkillRuleListReq,
      Helpdesk.GetHelpdeskAgentSkillRuleListResp
    >(req)
  }
  // subscribeHelpdeskEvent 用于订阅服务台事件
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/subscribe
  async subscribeHelpdeskEvent(
    request: Helpdesk.SubscribeHelpdeskEventReq
  ): Promise<{
    data: Helpdesk.SubscribeHelpdeskEventResp
    response: Response
  }> {
    const req: RawRequestReq<SubscribeHelpdeskEventReq> = {
      scope: 'Helpdesk',
      api: 'SubscribeHelpdeskEvent',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/events/subscribe',
      body: new SubscribeHelpdeskEventReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<SubscribeHelpdeskEventReq, Helpdesk.SubscribeHelpdeskEventResp>(req)
  }
  // unsubscribeHelpdeskEvent 用于取消订阅服务台事件
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/unsubscribe
  async unsubscribeHelpdeskEvent(
    request: Helpdesk.UnsubscribeHelpdeskEventReq
  ): Promise<{
    data: Helpdesk.UnsubscribeHelpdeskEventResp
    response: Response
  }> {
    const req: RawRequestReq<UnsubscribeHelpdeskEventReq> = {
      scope: 'Helpdesk',
      api: 'UnsubscribeHelpdeskEvent',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/helpdesk/v1/events/unsubscribe',
      body: new UnsubscribeHelpdeskEventReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_helpdesk_auth: true
    }
    return this.cli.RawRequest<UnsubscribeHelpdeskEventReq, Helpdesk.UnsubscribeHelpdeskEventResp>(
      req
    )
  }
}

export declare namespace Helpdesk {
  export interface CreateHelpdeskNotificationReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    id?: string // 非必填, 创建成功后返回, 示例值: "6981801914270744596"
    job_name?: string // 必填, 任务名称, 示例值: "测试推送任务"
    status?: number // 非必填, 创建成功后返回, 示例值: 0
    create_user?: CreateHelpdeskNotificationReqCreateUser // 非必填, 创建人
    created_at?: string // 非必填, 创建时间（毫秒时间戳）, 示例值: "1626332244719"
    update_user?: CreateHelpdeskNotificationReqUpdateUser // 非必填, 更新用户
    updated_at?: string // 非必填, 更新时间（毫秒时间戳）, 示例值: "1626332244719"
    target_user_count?: number // 非必填, 目标推送用户总数, 示例值: 1
    sent_user_count?: number // 非必填, 已推送用户总数, 示例值: 1
    read_user_count?: number // 非必填, 已读用户总数, 示例值: 1
    send_at?: string // 非必填, 推送任务触发时间（毫秒时间戳）, 示例值: "1626332244719"
    push_content?: string // 必填, 推送内容, 详见: https://open.feishu.cn/tool/cardbuilder?from=howtoguide, 示例值: "{   \"config\": {     \"wide_screen_mode\": true   }, \"elements\": [     {       \"tag\": \"div\", \"text\": {         \"tag\": \"lark_md\", \"content\": \"[飞书](https://www.feishu.cn)整合即时沟通、日历、音视频会议、云文档、云盘、工作台等功能于一体, 成就组织和个人, 更高效、更愉悦。\"       }     }   ] }"
    push_type?: number // 必填, 0（定时推送: push_scope不能等于3） 1（新人入职推送: push_scope必须等于1或者3；new_staff_scope_type不能为空）, 示例值: 0
    push_scope_type?: number // 必填, 推送范围（服务台私信） 0: 组织内全部成员（user_list和department_list必须为空） 1: 不推送任何成员（user_list和department_list必须为空, chat_list不可为空） 2: 推送到部分成员（user_list或department_list不能为空） 3: 入职新人 以上四种状态, chat_list都相对独立, 只有在推送范围为1时, 必须需要设置chat_list, 示例值: 0
    new_staff_scope_type?: number // 非必填, 新人入职范围类型（push_type为1时生效） 0: 组织内所有新人 1: 组织内特定的部门（new_staff_scope_department_list 字段不能为空）, 示例值: 0
    new_staff_scope_department_list?: CreateHelpdeskNotificationReqNewStaffScopeDepartment[] // 非必填, 新人入职生效部门列表
    user_list?: CreateHelpdeskNotificationReqUser[] // 非必填, push推送到成员列表
    department_list?: CreateHelpdeskNotificationReqDepartment[] // 非必填, push推送到的部门信息列表
    chat_list?: CreateHelpdeskNotificationReqChat[] // 非必填, push推送到的会话列表(群)
    ext?: string // 非必填, 预留扩展字段, 示例值: "{}"
  }

  export interface CreateHelpdeskNotificationReqChat {
    chat_id?: string // 非必填, 会话ID, 示例值: "oc_7277fd1262bfafc363d5b2a1f9c2ac90"
    name?: string // 非必填, 会话名称, 示例值: "测试群聊"
  }

  export interface CreateHelpdeskNotificationReqCreateUser {
    user_id?: string // 非必填, 用户id, 示例值: "ou_7277fd1262bfafc363d5b2a1f9c2ac90"
    avatar_url?: string // 非必填, 头像地址, 示例值: "http://*.com/*.png"
    name?: string // 非必填, 用户名称, 示例值: "test"
  }

  export interface CreateHelpdeskNotificationReqDepartment {
    department_id?: string // 部门ID, 示例值: "od_7277fd1262bfafc363d5b2a1f9c2ac90"
    name?: string // 非必填, 部门名称, 示例值: "测试部门"
  }

  export interface CreateHelpdeskNotificationReqNewStaffScopeDepartment {
    department_id?: string // 部门ID, 示例值: "od_7277fd1262bfafc363d5b2a1f9c2ac90"
    name?: string // 非必填, 部门名称, 示例值: "测试部门"
  }

  export interface CreateHelpdeskNotificationReqUpdateUser {
    user_id?: string // 非必填, 用户id, 示例值: "ou_7277fd1262bfafc363d5b2a1f9c2ac90"
    avatar_url?: string // 非必填, 头像地址, 示例值: "http://*.com/*.png"
    name?: string // 非必填, 用户名称, 示例值: "test"
  }

  export interface CreateHelpdeskNotificationReqUser {
    user_id?: string // 非必填, 用户id, 示例值: "ou_7277fd1262bfafc363d5b2a1f9c2ac90"
    avatar_url?: string // 非必填, 头像地址, 示例值: "http://*.com/*.png"
    name?: string // 非必填, 用户名称, 示例值: "test"
  }

  export interface CreateHelpdeskNotificationResp {
    notification_id: string // 创建成功后的唯一id
    status: number // 当前状态
  }

  export interface createHelpdeskNotificationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateHelpdeskNotificationResp
  }

  export interface UpdateHelpdeskNotificationReq {
    notification_id: string // push任务唯一id, 示例值: "6985032626234982420"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    id?: string // 非必填, 创建成功后返回, 示例值: "6981801914270744596"
    job_name?: string // 必填, 任务名称, 示例值: "测试推送任务"
    status?: number // 非必填, 创建成功后返回, 示例值: 0
    create_user?: UpdateHelpdeskNotificationReqCreateUser // 非必填, 创建人
    created_at?: string // 非必填, 创建时间（毫秒时间戳）, 示例值: "1626332244719"
    update_user?: UpdateHelpdeskNotificationReqUpdateUser // 非必填, 更新用户
    updated_at?: string // 非必填, 更新时间（毫秒时间戳）, 示例值: "1626332244719"
    target_user_count?: number // 非必填, 目标推送用户总数, 示例值: 1
    sent_user_count?: number // 非必填, 已推送用户总数, 示例值: 1
    read_user_count?: number // 非必填, 已读用户总数, 示例值: 1
    send_at?: string // 非必填, 推送任务触发时间（毫秒时间戳）, 示例值: "1626332244719"
    push_content?: string // 必填, 推送内容, 详见: https://open.feishu.cn/tool/cardbuilder?from=howtoguide, 示例值: "{   \"config\": {     \"wide_screen_mode\": true   }, \"elements\": [     {       \"tag\": \"div\", \"text\": {         \"tag\": \"lark_md\", \"content\": \"[飞书](https://www.feishu.cn)整合即时沟通、日历、音视频会议、云文档、云盘、工作台等功能于一体, 成就组织和个人, 更高效、更愉悦。\"       }     }   ] }"
    push_type?: number // 必填, 0（定时推送: push_scope不能等于3） 1（新人入职推送: push_scope必须等于1或者3；new_staff_scope_type不能为空）, 示例值: 0
    push_scope_type?: number // 必填, 推送范围（服务台私信） 0: 组织内全部成员（user_list和department_list必须为空） 1: 不推送任何成员（user_list和department_list必须为空, chat_list不可为空） 2: 推送到部分成员（user_list或department_list不能为空） 3: 入职新人 以上四种状态, chat_list都相对独立, 只有在推送范围为1时, 必须需要设置chat_list, 示例值: 0
    new_staff_scope_type?: number // 非必填, 新人入职范围类型（push_type为1时生效） 0: 组织内所有新人 1: 组织内特定的部门（new_staff_scope_department_list 字段不能为空）, 示例值: 0
    new_staff_scope_department_list?: UpdateHelpdeskNotificationReqNewStaffScopeDepartment[] // 非必填, 新人入职生效部门列表
    user_list?: UpdateHelpdeskNotificationReqUser[] // 非必填, push推送到成员列表
    department_list?: UpdateHelpdeskNotificationReqDepartment[] // 非必填, push推送到的部门信息列表
    chat_list?: UpdateHelpdeskNotificationReqChat[] // 非必填, push推送到的会话列表(群)
    ext?: string // 非必填, 预留扩展字段, 示例值: "{}"
  }

  export interface UpdateHelpdeskNotificationReqChat {
    chat_id?: string // 非必填, 会话ID, 示例值: "oc_7277fd1262bfafc363d5b2a1f9c2ac90"
    name?: string // 非必填, 会话名称, 示例值: "测试群聊"
  }

  export interface UpdateHelpdeskNotificationReqCreateUser {
    user_id?: string // 非必填, 用户id, 示例值: "ou_7277fd1262bfafc363d5b2a1f9c2ac90"
    avatar_url?: string // 非必填, 头像地址, 示例值: "http://*.com/*.png"
    name?: string // 非必填, 用户名称, 示例值: "test"
  }

  export interface UpdateHelpdeskNotificationReqDepartment {
    department_id?: string // 部门ID, 示例值: "od_7277fd1262bfafc363d5b2a1f9c2ac90"
    name?: string // 非必填, 部门名称, 示例值: "测试部门"
  }

  export interface UpdateHelpdeskNotificationReqNewStaffScopeDepartment {
    department_id?: string // 部门ID, 示例值: "od_7277fd1262bfafc363d5b2a1f9c2ac90"
    name?: string // 非必填, 部门名称, 示例值: "测试部门"
  }

  export interface UpdateHelpdeskNotificationReqUpdateUser {
    user_id?: string // 非必填, 用户id, 示例值: "ou_7277fd1262bfafc363d5b2a1f9c2ac90"
    avatar_url?: string // 非必填, 头像地址, 示例值: "http://*.com/*.png"
    name?: string // 非必填, 用户名称, 示例值: "test"
  }

  export interface UpdateHelpdeskNotificationReqUser {
    user_id?: string // 非必填, 用户id, 示例值: "ou_7277fd1262bfafc363d5b2a1f9c2ac90"
    avatar_url?: string // 非必填, 头像地址, 示例值: "http://*.com/*.png"
    name?: string // 非必填, 用户名称, 示例值: "test"
  }

  export interface UpdateHelpdeskNotificationResp {}

  export interface updateHelpdeskNotificationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateHelpdeskNotificationResp
  }

  export interface GetHelpdeskNotificationReq {
    notification_id: string // 唯一ID, 示例值: "1624326025000"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetHelpdeskNotificationResp {
    notification: GetHelpdeskNotificationRespNotification // push任务详情
    approval_app_link: string // 审批链接
  }

  export interface GetHelpdeskNotificationRespNotification {
    id: string // 非必填, 创建成功后返回
    job_name: string // 必填, 任务名称
    status: number // 非必填, 创建成功后返回
    create_user: GetHelpdeskNotificationRespNotificationCreateUser // 非必填, 创建人
    created_at: string // 非必填, 创建时间（毫秒时间戳）
    update_user: GetHelpdeskNotificationRespNotificationUpdateUser // 非必填, 更新用户
    updated_at: string // 非必填, 更新时间（毫秒时间戳）
    target_user_count: number // 非必填, 目标推送用户总数
    sent_user_count: number // 非必填, 已推送用户总数
    read_user_count: number // 非必填, 已读用户总数
    send_at: string // 非必填, 推送任务触发时间（毫秒时间戳）
    push_content: string // 必填, 推送内容, 详见: https://open.feishu.cn/tool/cardbuilder?from=howtoguide
    push_type: number // 必填, 0（定时推送: push_scope不能等于3） 1（新人入职推送: push_scope必须等于1或者3；new_staff_scope_type不能为空）
    push_scope_type: number // 必填, 推送范围（服务台私信） 0: 组织内全部成员（user_list和department_list必须为空） 1: 不推送任何成员（user_list和department_list必须为空, chat_list不可为空） 2: 推送到部分成员（user_list或department_list不能为空） 3: 入职新人 以上四种状态, chat_list都相对独立, 只有在推送范围为1时, 必须需要设置chat_list
    new_staff_scope_type: number // 非必填, 新人入职范围类型（push_type为1时生效） 0: 组织内所有新人 1: 组织内特定的部门（new_staff_scope_department_list 字段不能为空）
    new_staff_scope_department_list?: GetHelpdeskNotificationRespNotificationNewStaffScopeDepartment[] // 非必填, 新人入职生效部门列表
    user_list?: GetHelpdeskNotificationRespNotificationUser[] // 非必填, push推送到成员列表
    department_list?: GetHelpdeskNotificationRespNotificationDepartment[] // 非必填, push推送到的部门信息列表
    chat_list?: GetHelpdeskNotificationRespNotificationChat[] // 非必填, push推送到的会话列表(群)
    ext: string // 非必填, 预留扩展字段
  }

  export interface GetHelpdeskNotificationRespNotificationChat {
    chat_id: string // 非必填, 会话ID
    name: string // 非必填, 会话名称
  }

  export interface GetHelpdeskNotificationRespNotificationCreateUser {
    user_id: string // 非必填, 用户id
    avatar_url: string // 非必填, 头像地址
    name: string // 非必填, 用户名称
  }

  export interface GetHelpdeskNotificationRespNotificationDepartment {
    department_id: string // 部门ID
    name: string // 非必填, 部门名称
  }

  export interface GetHelpdeskNotificationRespNotificationNewStaffScopeDepartment {
    department_id: string // 部门ID
    name: string // 非必填, 部门名称
  }

  export interface GetHelpdeskNotificationRespNotificationUpdateUser {
    user_id: string // 非必填, 用户id
    avatar_url: string // 非必填, 头像地址
    name: string // 非必填, 用户名称
  }

  export interface GetHelpdeskNotificationRespNotificationUser {
    user_id: string // 非必填, 用户id
    avatar_url: string // 非必填, 头像地址
    name: string // 非必填, 用户名称
  }

  export interface getHelpdeskNotificationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskNotificationResp
  }

  export interface PreviewHelpdeskNotificationReq {
    notification_id: string // 创建推送接口成功后返回的唯一id, 示例值: "6985032626234982420"
  }

  export interface PreviewHelpdeskNotificationResp {}

  export interface previewHelpdeskNotificationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: PreviewHelpdeskNotificationResp
  }

  export interface SubmitApproveHelpdeskNotificationReq {
    notification_id: string // 创建接口返回的唯一id, 示例值: "6985032626234982420"
    reason: string // 提交审批理由, 示例值: "测试发送消息"
  }

  export interface SubmitApproveHelpdeskNotificationResp {
    has_access: boolean // 是否有权限创建或者管理审批流程 （有两种情况会导致没有权限: 1: 用户没有安装服务台小程序, 需要在https://app.feishu.cn/app/cli_9f9f8825d53b900d 安装小程序 2: 用户安装的服务台小程序版本过低）
  }

  export interface submitApproveHelpdeskNotificationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SubmitApproveHelpdeskNotificationResp
  }

  export interface CancelApproveHelpdeskNotificationReq {
    notification_id: string // 唯一ID, 示例值: "6981801914270744596"
  }

  export interface CancelApproveHelpdeskNotificationResp {}

  export interface cancelApproveHelpdeskNotificationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CancelApproveHelpdeskNotificationResp
  }

  export interface ExecuteSendHelpdeskNotificationReq {
    notification_id: string // 创建接口返回的唯一id, 示例值: "6985032626234982420"
    send_at: string // 发送时间戳(毫秒), 示例值: "1624326025000"
  }

  export interface ExecuteSendHelpdeskNotificationResp {}

  export interface executeSendHelpdeskNotificationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: ExecuteSendHelpdeskNotificationResp
  }

  export interface CancelSendHelpdeskNotificationReq {
    notification_id: string // 唯一ID, 示例值: "6981801914270744596"
    is_recall: boolean // 是否召回已发送的消息, 新人入职消息同样适用, 示例值: true
  }

  export interface CancelSendHelpdeskNotificationResp {}

  export interface cancelSendHelpdeskNotificationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CancelSendHelpdeskNotificationResp
  }

  export interface StartHelpdeskServiceReq {
    human_service?: boolean // 是否直接进入人工(若appointed_agents填写了, 该值为必填), 示例值: false
    appointed_agents?: string[] // 客服 open ids (获取方式参考[获取单个用户信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get)), human_service需要为true, 示例值: [ou_7dab8a3d3cdcc9da365777c7ad535d62]
    open_id: string // 用户 open id, (获取方式参考[获取单个用户信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get)), 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    customized_info?: string // 工单来源自定义信息, 长度限制1024字符, 如设置, [获取工单详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/get)会返回此信息, 示例值: "测试自定义字段信息"
  }

  export interface StartHelpdeskServiceResp {
    chat_id: string // 客服群open ID
  }

  export interface startHelpdeskServiceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: StartHelpdeskServiceResp
  }

  export interface GetHelpdeskTicketReq {
    ticket_id: string // ticket id, 示例值: "123456"
  }

  export interface GetHelpdeskTicketResp {
    ticket: GetHelpdeskTicketRespTicket // 工单详情
  }

  export interface GetHelpdeskTicketRespTicket {
    ticket_id: string // 工单ID, [可以从工单列表里面取](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/list), [也可以订阅工单创建事件获取](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/events/created)
    helpdesk_id: string // 服务台ID
    guest: GetHelpdeskTicketRespTicketGuest // 工单创建用户
    comments: GetHelpdeskTicketRespTicketComments // 备注
    ticket_type: number // 工单阶段: 1. 机器人 2. 人工
    status: number // 工单状态, 1: 已创建 2: 处理中 3: 排队中 4: 待定 5: 待用户响应 50: 被机器人关闭 51: 被客服关闭 52: 用户自己关闭
    score: number // 工单评分, 1: 不满意, 2:一般, 3:满意
    created_at: number // 工单创建时间
    updated_at: number // 工单更新时间, 没有值时为-1
    closed_at: number // 工单结束时间
    dissatisfaction_reason?: string[] // 不满意原因
    agents?: GetHelpdeskTicketRespTicketAgent[] // 工单客服
    channel: number // 工单渠道, 描述: 9: Open API 2: 二维码 14: 分享 13: 搜索 其他数字: 其他渠道
    solve: number // 工单是否解决 1:没解决 2:已解决
    closed_by: GetHelpdeskTicketRespTicketClosedBy // 关单用户ID
    collaborators?: GetHelpdeskTicketRespTicketCollaborator[] // 工单协作者
    customized_fields?: GetHelpdeskTicketRespTicketCustomizedField[] // 自定义字段列表, 没有值时不设置, 下拉菜单的value对应工单字段里面的children.display_name, [获取全部工单自定义字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/list-ticket-customized-fields)
    agent_service_duration: number // 客服服务时长, 客服最后一次回复时间距离客服进入时间间隔, 单位分钟
    agent_first_response_duration: number // 客服首次回复时间距离客服进入时间的间隔(秒)
    bot_service_duration: number // 机器人服务时间: 客服进入时间距离工单创建时间的间隔, 单位秒
    agent_resolution_time: number // 客服解决时长, 关单时间距离客服进入时间的间隔, 单位秒
    actual_processing_time: number // 工单实际处理时间: 从客服进入到关单, 单位秒
    agent_entry_time: number // 客服进入时间, 单位毫秒
    agent_first_response_time: number // 客服首次回复时间, 单位毫秒
    agent_last_response_time: number // 客服最后回复时间, 单位毫秒
  }

  export interface GetHelpdeskTicketRespTicketAgent {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface GetHelpdeskTicketRespTicketClosedBy {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface GetHelpdeskTicketRespTicketCollaborator {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface GetHelpdeskTicketRespTicketComments {
    content: string // 备注
    created_at: number // 备注时间, 单位毫秒
    id: number // 备注ID
    user_avatar_url: string // 备注人头像
    user_name: string // 备注人姓名
    user_id: number // 备注人ID
  }

  export interface GetHelpdeskTicketRespTicketCustomizedField {
    id: string // 自定义字段ID
    value: string // 自定义字段值
    key_name: string // 键名
    display_name: string // 展示名称
    position: number // 展示位置
    required: boolean // 是否必填
    editable: boolean // 是否可修改
  }

  export interface GetHelpdeskTicketRespTicketGuest {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface getHelpdeskTicketResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskTicketResp
  }

  export interface UpdateHelpdeskTicketReq {
    ticket_id: string // 工单ID, 示例值: "6945345902185807891"
    status?: number // new status, 1: 已创建, 2: 处理中, 3: 排队中, 5: 待定, 50: 机器人关闭工单, 51: 关闭工单, 示例值: 1
    tag_names?: string[] // 新标签名
    comment?: string // 新评论, 示例值: "good"
    customized_fields?: UpdateHelpdeskTicketReqCustomizedField[] // 自定义字段
    ticket_type?: number // ticket stage, 示例值: 1
    solved?: number // 工单是否解决, 1: 未解决, 2: 已解决, 示例值: 1
    channel?: number // 工单来源渠道ID, 示例值: 1
  }

  export interface UpdateHelpdeskTicketReqCustomizedField {
    id?: string // 自定义字段ID, 示例值: "123"
    value?: string // 自定义字段值, 示例值: "value"
    key_name?: string // 键名, 示例值: "key"
  }

  export interface UpdateHelpdeskTicketResp {}

  export interface updateHelpdeskTicketResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateHelpdeskTicketResp
  }

  export interface GetHelpdeskTicketListReq {
    ticket_id?: string // 搜索条件: 工单ID, 示例值: "123456"
    agent_id?: string // 搜索条件: 客服id, 示例值: "ou_b5de90429xxx"
    closed_by_id?: string // 搜索条件: 关单客服id, 示例值: "ou_b5de90429xxx"
    type?: number // 搜索条件: 工单类型 1:bot 2:人工, 示例值: 1
    channel?: number // 搜索条件: 工单渠道, 示例值: 0
    solved?: number // 搜索条件: 工单是否解决 1:没解决 2:已解决, 示例值: 1
    score?: number // 搜索条件: 工单评分, 示例值: 1
    status_list?: number[] // 搜索条件: 工单状态列表, 示例值: 1
    guest_name?: string // 搜索条件: 用户名称, 示例值: "abc"
    guest_id?: string // 搜索条件: 用户id, 示例值: "ou_b5de90429xxx"
    tags?: string[] // 搜索条件: 用户标签列表, 示例值: 备注
    page?: number // 页数, 从1开始, 默认为1, 示例值: 1
    page_size?: number // 当前页大小, 最大为200, 默认为20。分页查询最多累计返回一万条数据, 超过一万条请更改查询条件, 推荐通过时间查询, 示例值: 20
    create_time_start?: number // 搜索条件: 工单创建起始时间 ms (也需要填上create_time_end), 相当于>=create_time_start, 示例值: 1616920429000
    create_time_end?: number // 搜索条件: 工单创建结束时间 ms (也需要填上create_time_start), 相当于<=create_time_end, 示例值: 1616920429000
    update_time_start?: number // 搜索条件: 工单修改起始时间 ms (也需要填上update_time_end), 示例值: 1616920429000
    update_time_end?: number // 搜索条件: 工单修改结束时间 ms(也需要填上update_time_start), 示例值: 1616920429000
  }

  export interface GetHelpdeskTicketListResp {
    total: number // 工单总数 (单次请求最大为10000条)
    tickets?: GetHelpdeskTicketListRespTicket[] // 工单
  }

  export interface GetHelpdeskTicketListRespTicket {
    ticket_id: string // 工单ID, [可以从工单列表里面取](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/list), [也可以订阅工单创建事件获取](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/events/created)
    helpdesk_id: string // 服务台ID
    guest: GetHelpdeskTicketListRespTicketGuest // 工单创建用户
    comments: GetHelpdeskTicketListRespTicketComments // 备注
    ticket_type: number // 工单阶段: 1. 机器人 2. 人工
    status: number // 工单状态, 1: 已创建 2: 处理中 3: 排队中 4: 待定 5: 待用户响应 50: 被机器人关闭 51: 被客服关闭 52: 用户自己关闭
    score: number // 工单评分, 1: 不满意, 2:一般, 3:满意
    created_at: number // 工单创建时间
    updated_at: number // 工单更新时间, 没有值时为-1
    closed_at: number // 工单结束时间
    dissatisfaction_reason?: string[] // 不满意原因
    agents?: GetHelpdeskTicketListRespTicketAgent[] // 工单客服
    channel: number // 工单渠道, 描述: 9: Open API 2: 二维码 14: 分享 13: 搜索 其他数字: 其他渠道
    solve: number // 工单是否解决 1:没解决 2:已解决
    closed_by: GetHelpdeskTicketListRespTicketClosedBy // 关单用户ID
    collaborators?: GetHelpdeskTicketListRespTicketCollaborator[] // 工单协作者
    customized_fields?: GetHelpdeskTicketListRespTicketCustomizedField[] // 自定义字段列表, 没有值时不设置, 下拉菜单的value对应工单字段里面的children.display_name, [获取全部工单自定义字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/list-ticket-customized-fields)
    agent_service_duration: number // 客服服务时长, 客服最后一次回复时间距离客服进入时间间隔, 单位分钟
    agent_first_response_duration: number // 客服首次回复时间距离客服进入时间的间隔(秒)
    bot_service_duration: number // 机器人服务时间: 客服进入时间距离工单创建时间的间隔, 单位秒
    agent_resolution_time: number // 客服解决时长, 关单时间距离客服进入时间的间隔, 单位秒
    actual_processing_time: number // 工单实际处理时间: 从客服进入到关单, 单位秒
    agent_entry_time: number // 客服进入时间, 单位毫秒
    agent_first_response_time: number // 客服首次回复时间, 单位毫秒
    agent_last_response_time: number // 客服最后回复时间, 单位毫秒
  }

  export interface GetHelpdeskTicketListRespTicketAgent {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface GetHelpdeskTicketListRespTicketClosedBy {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface GetHelpdeskTicketListRespTicketCollaborator {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface GetHelpdeskTicketListRespTicketComments {
    content: string // 备注
    created_at: number // 备注时间, 单位毫秒
    id: number // 备注ID
    user_avatar_url: string // 备注人头像
    user_name: string // 备注人姓名
    user_id: number // 备注人ID
  }

  export interface GetHelpdeskTicketListRespTicketCustomizedField {
    id: string // 自定义字段ID
    value: string // 自定义字段值
    key_name: string // 键名
    display_name: string // 展示名称
    position: number // 展示位置
    required: boolean // 是否必填
    editable: boolean // 是否可修改
  }

  export interface GetHelpdeskTicketListRespTicketGuest {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface getHelpdeskTicketListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskTicketListResp
  }

  export interface DownloadHelpdeskTicketImageReq {
    ticket_id: string // 工单ID, 示例值: "12345"
    msg_id: string // 消息ID, [查询消息ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket-message/list), 示例值: "12345"
    index?: number // index, 当消息类型为post时, 需指定图片index, index从0开始。当消息类型为img时, 无需index, 示例值: 0
  }

  export interface DownloadHelpdeskTicketImageResp {
    file: Buffer
  }

  export interface downloadHelpdeskTicketImageResp {
    code: number
    msg: string
    data: DownloadHelpdeskTicketImageResp
  }

  export interface AnswerHelpdeskTicketUserQueryReq {
    ticket_id: string // 工单ID, 示例值: "6945345902185807891"
    event_id: string // 事件ID, 可从订阅事件中提取, 示例值: "abcd"
    faqs?: AnswerHelpdeskTicketUserQueryReqFAQ[] // faq结果列表
  }

  export interface AnswerHelpdeskTicketUserQueryReqFAQ {
    id?: string // faq服务台内唯一标识, 示例值: "12345"
    score?: number // faq匹配得分, 示例值: 0.9
  }

  export interface AnswerHelpdeskTicketUserQueryResp {}

  export interface answerHelpdeskTicketUserQueryResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: AnswerHelpdeskTicketUserQueryResp
  }

  export interface GetHelpdeskTicketCustomizedFieldsReq {
    visible_only?: boolean // visible only, 示例值: true
  }

  export interface GetHelpdeskTicketCustomizedFieldsResp {
    user_customized_fields?: GetHelpdeskTicketCustomizedFieldsRespUserCustomizedField[] // 用户自定义字段
    ticket_customized_fields?: GetHelpdeskTicketCustomizedFieldsRespTicketCustomizedField[] // 自定义工单字段
  }

  export interface GetHelpdeskTicketCustomizedFieldsRespTicketCustomizedField {
    ticket_customized_field_id: string // 工单自定义字段ID
    helpdesk_id: string // 服务台ID
    key_name: string // 键名
    display_name: string // 名称
    position: string // 字段在列表后台管理列表中的位置
    field_type: string // 类型, string - 单行文本, multiline - 多行文本, dropdown - 下拉列表, dropdown_nested - 级联下拉
    description: string // 描述
    visible: boolean // 是否可见
    editable: boolean // 是否可以修改
    required: boolean // 是否必填
    created_at: string // 创建时间
    updated_at: string // 更新时间
    created_by: GetHelpdeskTicketCustomizedFieldsRespTicketCustomizedFieldCreatedBy // 创建用户
    updated_by: GetHelpdeskTicketCustomizedFieldsRespTicketCustomizedFieldUpdatedBy // 更新用户
    dropdown_allow_multiple: boolean // 是否支持多选, 仅在字段类型是dropdown的时候有效
  }

  export interface GetHelpdeskTicketCustomizedFieldsRespTicketCustomizedFieldCreatedBy {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
  }

  export interface GetHelpdeskTicketCustomizedFieldsRespTicketCustomizedFieldUpdatedBy {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
  }

  export interface GetHelpdeskTicketCustomizedFieldsRespUserCustomizedField {
    user_customized_field_id: string // 字段ID
    id: string // 旧字段ID, 向后兼容用
    helpdesk_id: string // 服务台ID
    key_name: string // 字段键
    display_name: string // 字段展示名称
    position: string // 字段在列表中的展示位置
    field_type: string // 字段类型
    description: string // 字段描述信息
    visible: boolean // 字段是否可见
    editable: boolean // 字段是否可编辑
    required: boolean // 字段是否必填
    created_at: string // 字段创建时间
    updated_at: string // 字段修改时间
  }

  export interface getHelpdeskTicketCustomizedFieldsResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskTicketCustomizedFieldsResp
  }

  export interface GetHelpdeskTicketMessageListReq {
    ticket_id: string // 工单ID, 示例值: "6948728206392295444"
    time_start?: number // 起始时间, 示例值: 1617960686000
    time_end?: number // 结束时间, 示例值: 1617960687000
    page?: number // 页数ID, 示例值: 1
    page_size?: number // 消息数量, 最大200, 默认20, 示例值: 10
  }

  export interface GetHelpdeskTicketMessageListResp {
    messages?: GetHelpdeskTicketMessageListRespMessage[] // 工单消息列表
    total: number // 消息总数
  }

  export interface GetHelpdeskTicketMessageListRespMessage {
    id: string // 工单消息ID
    message_id: string // chat消息ID
    message_type: string // 消息类型；text: 纯文本；post: 富文本
    created_at: number // 创建时间
    content: string // 内容
    user_name: string // 用户名
    avatar_url: string // 用户图片url
    user_id: string // 用户open ID
  }

  export interface getHelpdeskTicketMessageListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskTicketMessageListResp
  }

  export interface SendHelpdeskTicketMessageReq {
    ticket_id: string // 工单ID, 示例值: "6948728206392295444"
    msg_type: string // 消息类型；text: 纯文本；post: 富文本, 示例值: "post"
    content: string // --纯文本, 参考[发送文本消息](https://open.feishu.cn/document/ukTMukTMukTM/uUjNz4SN2MjL1YzM)中的content；, 富文本, 参考[发送富文本消息](https://open.feishu.cn/document/ukTMukTMukTM/uMDMxEjLzATMx4yMwETM)中的content, 示例值: "{, "msg_type": "post", "content": {, "post": {, "zh_cn": {, "title": "this is title", "content": [, [, {, "tag": "text", "un_escape": true, "text": "第一行:", }, {, "tag": "a", "text": "超链接", "href": "http://www.feishu.cn", }, ], [, {, "tag": "text", "text": "第二行 :", }, {, "tag": "text", "text": "文本测试", }, ], ], }, }, }, }"
  }

  export interface SendHelpdeskTicketMessageResp {
    message_id: string // chat消息open ID
  }

  export interface sendHelpdeskTicketMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SendHelpdeskTicketMessageResp
  }

  export interface SendHelpdeskMessageReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    msg_type: string // 消息类型, 示例值: "post", 可选值有: `text`: 普通文本, `post`: 富文本, `image`: 图片, `interactive`: 卡片消息
    content: string // 消息内容, json格式结构序列化成string。格式说明参考: [发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json), 示例值: "{\"post\":{\"zh_cn\":{\"title\":\"some title\", \"content\":[[{\"tag\":\"text\", \"text\":\"some content\"}]]}}}"
    receiver_id: string // 接收消息用户id, 示例值: "ou_7346484524"
    receive_type?: string // 接收消息方式, chat(服务台专属服务群)或user(服务台机器人私聊)。若选择专属服务群, 用户有正在处理的工单将会发送失败。默认以chat方式发送, 示例值: "chat", 可选值有: `chat`: 通过服务台专属群发送, `user`: 通过服务台机器人私聊发送
  }

  export interface SendHelpdeskMessageResp {
    message_id: string // chat消息open_id
  }

  export interface sendHelpdeskMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SendHelpdeskMessageResp
  }

  export interface GetHelpdeskTicketCustomizedFieldListReq {
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "6948728206392295444"
    page_size?: number // 分页大小, 示例值: 10；默认为20, 最大值: `100`
    visible?: boolean // 是否可见, 示例值: true
  }

  export interface GetHelpdeskTicketCustomizedFieldListResp {
    has_more: boolean // 是否还有更多项
    next_page_token: string // 下一分页标识
    items?: GetHelpdeskTicketCustomizedFieldListRespItem[] // 工单自定义字段列表
  }

  export interface GetHelpdeskTicketCustomizedFieldListRespItem {
    ticket_customized_field_id: string // 工单自定义字段ID
    helpdesk_id: string // 服务台ID
    key_name: string // 键名
    display_name: string // 名称
    position: string // 字段在列表后台管理列表中的位置
    field_type: string // 类型
    description: string // 描述
    visible: boolean // 是否可见
    editable: boolean // 是否可以修改
    required: boolean // 是否必填
    created_at: string // 创建时间
    updated_at: string // 更新时间
    created_by: GetHelpdeskTicketCustomizedFieldListRespItemCreatedBy // 创建用户
    updated_by: GetHelpdeskTicketCustomizedFieldListRespItemUpdatedBy // 更新用户
    dropdown_options: GetHelpdeskTicketCustomizedFieldListRespItemDropdownOption // 下拉列表选项
    dropdown_allow_multiple: boolean // 是否支持多选, 仅在字段类型是dropdown的时候有效
  }

  export interface GetHelpdeskTicketCustomizedFieldListRespItemCreatedBy {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
  }

  export interface GetHelpdeskTicketCustomizedFieldListRespItemDropdownOption {
    children?: GetHelpdeskTicketCustomizedFieldListRespItemDropdownOptionChildren[] // 选项列表
  }

  export interface GetHelpdeskTicketCustomizedFieldListRespItemDropdownOptionChildren {
    tag: string // 选项ID
    display_name: string // 展示名称
    children?: GetHelpdeskTicketCustomizedFieldListRespItemDropdownOptionChildren[] // 同上: 选项列表, 只适用于多层下拉列表（最多可以设置三级下拉列表）
  }

  export interface GetHelpdeskTicketCustomizedFieldListRespItemUpdatedBy {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
  }

  export interface getHelpdeskTicketCustomizedFieldListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskTicketCustomizedFieldListResp
  }

  export interface DeleteHelpdeskTicketCustomizedFieldReq {
    ticket_customized_field_id: string // 工单自定义字段ID, 示例值: "6948728206392295444"
  }

  export interface DeleteHelpdeskTicketCustomizedFieldResp {}

  export interface deleteHelpdeskTicketCustomizedFieldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteHelpdeskTicketCustomizedFieldResp
  }

  export interface UpdateHelpdeskTicketCustomizedFieldReq {
    ticket_customized_field_id: string // 工单自定义字段ID, 示例值: "6948728206392295444"
    display_name?: string // 名称, 示例值: "test dropdown"
    position?: string // 字段在列表后台管理列表中的位置, 示例值: "3"
    description?: string // 描述, 示例值: "下拉示例"
    visible?: boolean // 是否可见, 示例值: true
    required?: boolean // 是否必填, 示例值: false
    dropdown_options: UpdateHelpdeskTicketCustomizedFieldReqDropdownOption // 下拉列表选项
  }

  export interface UpdateHelpdeskTicketCustomizedFieldReqDropdownOption {
    children?: UpdateHelpdeskTicketCustomizedFieldReqDropdownOptionChildren[] // 选项列表
  }

  export interface UpdateHelpdeskTicketCustomizedFieldReqDropdownOptionChildren {
    tag: string // 选项ID
    display_name: string // 展示名称
    children?: UpdateHelpdeskTicketCustomizedFieldReqDropdownOptionChildren[] // 同上: 选项列表, 只适用于多层下拉列表（最多可以设置三级下拉列表）
  }

  export interface UpdateHelpdeskTicketCustomizedFieldResp {}

  export interface updateHelpdeskTicketCustomizedFieldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateHelpdeskTicketCustomizedFieldResp
  }

  export interface CreateHelpdeskTicketCustomizedFieldReq {
    helpdesk_id: string // 服务台ID, 示例值: "1542164574896126"
    key_name: string // 键名, 示例值: "test dropdown"
    display_name: string // 名称, 示例值: "test dropdown"
    position: string // 字段在列表后台管理列表中的位置, 示例值: "3"
    field_type: string // 类型, string - 单行文本, multiline - 多行文本, dropdown - 下拉列表, dropdown_nested - 级联下拉, 示例值: "dropdown"
    description: string // 描述, 示例值: "下拉示例"
    visible: boolean // 是否可见, 示例值: true
    editable: boolean // 是否可以修改, 示例值: true
    required: boolean // 是否必填, 示例值: false
    dropdown_options: CreateHelpdeskTicketCustomizedFieldReqDropdownOption // 下拉列表选项
    dropdown_allow_multiple?: boolean // 是否支持多选, 仅在字段类型是dropdown的时候有效, 示例值: true
  }

  export interface CreateHelpdeskTicketCustomizedFieldReqDropdownOption {
    children?: CreateHelpdeskTicketCustomizedFieldReqDropdownOptionChildren[] // 选项列表
  }

  export interface CreateHelpdeskTicketCustomizedFieldReqDropdownOptionChildren {
    tag: string // 选项ID
    display_name: string // 展示名称
    children?: CreateHelpdeskTicketCustomizedFieldReqDropdownOptionChildren[] // 同上: 选项列表, 只适用于多层下拉列表（最多可以设置三级下拉列表）
  }

  export interface CreateHelpdeskTicketCustomizedFieldResp {}

  export interface createHelpdeskTicketCustomizedFieldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateHelpdeskTicketCustomizedFieldResp
  }

  export interface GetHelpdeskTicketCustomizedFieldReq {
    ticket_customized_field_id: string // 工单自定义字段ID, 示例值: "6948728206392295444"
  }

  export interface GetHelpdeskTicketCustomizedFieldResp {
    ticket_customized_field_id: string // 工单自定义字段ID
    helpdesk_id: string // 服务台ID
    key_name: string // 键名
    display_name: string // 名称
    position: string // 字段在列表后台管理列表中的位置
    field_type: string // 类型
    description: string // 描述
    visible: boolean // 是否可见
    editable: boolean // 是否可以修改
    required: boolean // 是否必填
    created_at: string // 创建时间
    updated_at: string // 更新时间
    created_by: GetHelpdeskTicketCustomizedFieldRespCreatedBy // 创建用户
    updated_by: GetHelpdeskTicketCustomizedFieldRespUpdatedBy // 更新用户
    dropdown_allow_multiple: boolean // 是否支持多选, 仅在字段类型是dropdown的时候有效
  }

  export interface GetHelpdeskTicketCustomizedFieldRespCreatedBy {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
  }

  export interface GetHelpdeskTicketCustomizedFieldRespUpdatedBy {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    email: string // 用户邮箱
    dropdown_options: GetHelpdeskTicketCustomizedFieldRespUpdatedByDropdownOption // 下拉列表选项
  }

  export interface GetHelpdeskTicketCustomizedFieldRespUpdatedByDropdownOption {
    children?: GetHelpdeskTicketCustomizedFieldRespUpdatedByDropdownOptionChildren[] // 选项列表
  }

  export interface GetHelpdeskTicketCustomizedFieldRespUpdatedByDropdownOptionChildren {
    tag: string // 选项ID
    display_name: string // 展示名称
    children?: GetHelpdeskTicketCustomizedFieldRespUpdatedByDropdownOptionChildren[] // 同上: 选项列表, 只适用于多层下拉列表（最多可以设置三级下拉列表）
  }

  export interface getHelpdeskTicketCustomizedFieldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskTicketCustomizedFieldResp
  }

  export interface CreateHelpdeskCategoryReq {
    name: string // 名称, 示例值: "创建团队和邀请成员"
    parent_id: string // 父知识库分类ID, 示例值: "0"
    language?: string // 语言, 示例值: "zh_cn"
  }

  export interface CreateHelpdeskCategoryResp {
    category: CreateHelpdeskCategoryRespCategory // 知识库分类
  }

  export interface CreateHelpdeskCategoryRespCategory {
    category_id: string // 知识库分类ID
    id: string // 知识库分类ID, （旧版, 请使用category_id）
    name: string // 名称
    parent_id: string // 父知识库分类ID
    helpdesk_id: string // 服务台ID
    language: string // 语言
  }

  export interface createHelpdeskCategoryResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateHelpdeskCategoryResp
  }

  export interface GetHelpdeskCategoryReq {
    id: string // 知识库分类ID, 示例值: "6948728206392295444"
  }

  export interface GetHelpdeskCategoryResp {
    category_id: string // 知识库分类ID
    id: string // 知识库分类ID, （旧版, 请使用category_id）
    name: string // 名称
    helpdesk_id: string // 服务台ID
    language: string // 语言
  }

  export interface getHelpdeskCategoryResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskCategoryResp
  }

  export interface UpdateHelpdeskCategoryReq {
    id: string // category id, 示例值: "6948728206392295444"
    name?: string // 名称, 示例值: "创建团队和邀请成员"
    parent_id?: string // 父知识库分类ID, 示例值: "0"
  }

  export interface UpdateHelpdeskCategoryResp {}

  export interface updateHelpdeskCategoryResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateHelpdeskCategoryResp
  }

  export interface DeleteHelpdeskCategoryReq {
    id: string // 知识库分类ID, 示例值: "6948728206392295444"
  }

  export interface DeleteHelpdeskCategoryResp {}

  export interface deleteHelpdeskCategoryResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteHelpdeskCategoryResp
  }

  export interface GetHelpdeskCategoryListReq {
    lang?: string // 知识库分类语言, 示例值: "zh_cn"
    order_by?: number // 排序键。1: 根据知识库分类更新时间排序, 示例值: 1
    asc?: boolean // 顺序。true: 正序；false: 反序, 示例值: true
  }

  export interface GetHelpdeskCategoryListResp {
    categories?: GetHelpdeskCategoryListRespCategory[] // 知识库分类列表
  }

  export interface GetHelpdeskCategoryListRespCategory {
    category_id: string // 知识库分类ID
    id: string // 知识库分类ID, （旧版, 请使用category_id）
    name: string // 名称
    parent_id: string // 父知识库分类ID
    helpdesk_id: string // 服务台ID
    language: string // 语言
    children?: GetHelpdeskCategoryListRespCategory[] // 子分类详情
  }

  export interface getHelpdeskCategoryListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskCategoryListResp
  }

  export interface CreateHelpdeskFAQReq {
    faq?: CreateHelpdeskFAQReqFAQ // 知识库详情
  }

  export interface CreateHelpdeskFAQReqFAQ {
    category_id?: string // 知识库分类ID, 示例值: "6836004780707807251"
    question: string // 问题, 示例值: "问题"
    answer?: string // 答案, 示例值: "答案"
    answer_richtext?: string // 富文本答案和答案必须有一个必填。Json Array格式, 富文本结构请见[了解更多: 富文本](https://open.feishu.cn/document/ukTMukTMukTM/uITM0YjLyEDN24iMxQjN), 示例值: "[{, "content": "这只是一个测试, 医保问题", "type": "text", }]"
    tags?: string[] // 相似问题, 示例值: ["tag1", "tag2", "tag3"]
  }

  export interface CreateHelpdeskFAQResp {
    faq: CreateHelpdeskFAQRespFAQ // 知识库详情
  }

  export interface CreateHelpdeskFAQRespFAQ {
    faq_id: string // 知识库ID
    id: string // 知识库旧版ID, 请使用faq_id
    helpdesk_id: string // 服务台ID
    question: string // 问题
    answer: string // 答案
    answer_richtext: string // 富文本答案
    create_time: number // 创建时间
    update_time: number // 修改时间
    categories?: CreateHelpdeskFAQRespFAQCategory[] // 分类
    tags?: string[] // 相似问题列表
    expire_time: number // 失效时间
    update_user: CreateHelpdeskFAQRespFAQUpdateUser // 更新用户
    create_user: CreateHelpdeskFAQRespFAQCreateUser // 创建用户
  }

  export interface CreateHelpdeskFAQRespFAQCategory {
    category_id: string // 知识库分类ID
    id: string // 知识库分类ID, （旧版, 请使用category_id）
    name: string // 名称
    parent_id: string // 父知识库分类ID
    helpdesk_id: string // 服务台ID
    language: string // 语言
  }

  export interface CreateHelpdeskFAQRespFAQCreateUser {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface CreateHelpdeskFAQRespFAQUpdateUser {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface createHelpdeskFAQResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateHelpdeskFAQResp
  }

  export interface GetHelpdeskFAQReq {
    id: string // 知识库ID, 示例值: "6856395634652479491"
  }

  export interface GetHelpdeskFAQResp {
    faq: GetHelpdeskFAQRespFAQ // 知识库详情
  }

  export interface GetHelpdeskFAQRespFAQ {
    faq_id: string // 知识库ID
    id: string // 知识库旧版ID, 请使用faq_id
    helpdesk_id: string // 服务台ID
    question: string // 问题
    answer: string // 答案
    answer_richtext: string // 富文本答案
    create_time: number // 创建时间
    update_time: number // 修改时间
    categories?: GetHelpdeskFAQRespFAQCategory[] // 分类
    tags?: string[] // 相似问题列表
    expire_time: number // 失效时间
    update_user: GetHelpdeskFAQRespFAQUpdateUser // 更新用户
    create_user: GetHelpdeskFAQRespFAQCreateUser // 创建用户
  }

  export interface GetHelpdeskFAQRespFAQCategory {
    category_id: string // 知识库分类ID
    id: string // 知识库分类ID, （旧版, 请使用category_id）
    name: string // 名称
    parent_id: string // 父知识库分类ID
    helpdesk_id: string // 服务台ID
    language: string // 语言
  }

  export interface GetHelpdeskFAQRespFAQCreateUser {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
  }

  export interface GetHelpdeskFAQRespFAQUpdateUser {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
  }

  export interface getHelpdeskFAQResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskFAQResp
  }

  export interface UpdateHelpdeskFAQReq {
    id: string // 知识库ID, 示例值: "6856395634652479491"
    faq?: UpdateHelpdeskFAQReqFAQ // 修改的知识库内容
  }

  export interface UpdateHelpdeskFAQReqFAQ {
    category_id?: string // 知识库分类ID, 示例值: "6836004780707807251"
    question: string // 问题, 示例值: "问题"
    answer?: string // 答案, 示例值: "答案"
    answer_richtext?: string // 富文本答案和答案必须有一个必填。Json Array格式, 富文本结构请见[了解更多: 富文本](https://open.feishu.cn/document/ukTMukTMukTM/uITM0YjLyEDN24iMxQjN), 示例值: "[{, "content": "这只是一个测试, 医保问题", "type": "text", }]"
    tags?: string[] // 相似问题
  }

  export interface UpdateHelpdeskFAQResp {}

  export interface updateHelpdeskFAQResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateHelpdeskFAQResp
  }

  export interface DeleteHelpdeskFAQReq {
    id: string // id, 示例值: "12345"
  }

  export interface DeleteHelpdeskFAQResp {}

  export interface deleteHelpdeskFAQResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteHelpdeskFAQResp
  }

  export interface GetHelpdeskFAQListReq {
    category_id?: string // 知识库分类ID, 示例值: "6856395522433908739"
    status?: string // 搜索条件: 知识库状态 1:在线 0:删除, 可恢复 2: 删除, 不可恢复, 示例值: "1"
    search?: string // 搜索条件: 关键词, 匹配问题标题, 问题关键字, 用户姓名, 示例值: "点餐"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "6856395634652479491"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetHelpdeskFAQListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    page_size: number // 实际返回的FAQ数量
    total: number // 总数
    items?: GetHelpdeskFAQListRespItem[] // 知识库列表
  }

  export interface GetHelpdeskFAQListRespItem {
    faq_id: string // 知识库ID
    id: string // 知识库旧版ID, 请使用faq_id
    helpdesk_id: string // 服务台ID
    question: string // 问题
    answer: string // 答案
    answer_richtext: string // 富文本答案
    create_time: number // 创建时间
    update_time: number // 修改时间
    categories?: GetHelpdeskFAQListRespItemCategory[] // 分类
    tags?: string[] // 相似问题列表
    expire_time: number // 失效时间
    update_user: GetHelpdeskFAQListRespItemUpdateUser // 更新用户
    create_user: GetHelpdeskFAQListRespItemCreateUser // 创建用户
  }

  export interface GetHelpdeskFAQListRespItemCategory {
    category_id: string // 知识库分类ID
    id: string // 知识库分类ID, （旧版, 请使用category_id）
    name: string // 名称
    parent_id: string // 父知识库分类ID
    helpdesk_id: string // 服务台ID
    language: string // 语言
  }

  export interface GetHelpdeskFAQListRespItemCreateUser {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
  }

  export interface GetHelpdeskFAQListRespItemUpdateUser {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
  }

  export interface getHelpdeskFAQListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskFAQListResp
  }

  export interface GetHelpdeskFAQImageReq {
    id: string // 知识库ID, 示例值: "12345"
    image_key: string // 图像key, 示例值: "img_b07ffac0-19c1-48a3-afca-599f8ea825fj"
  }

  export interface GetHelpdeskFAQImageResp {
    file: Buffer
  }

  export interface getHelpdeskFAQImageResp {
    code: number
    msg: string
    data: GetHelpdeskFAQImageResp
  }

  export interface SearchHelpdeskFAQReq {
    query: string // 搜索query, query内容如果不是英文, 包含中文空格等有两种编码策略: 1. url编码 2. base64编码, 同时加上base64=true参数, 示例值: "wifi"
    base64?: string // 是否转换为base64, 输入true表示是, 不填写表示否, 中文需要转换为base64, 示例值: "5bel5Y2V"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "6936004780707807251"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface SearchHelpdeskFAQResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: SearchHelpdeskFAQRespItem[] // 知识库列表
  }

  export interface SearchHelpdeskFAQRespItem {
    faq_id: string // 知识库ID
    id: string // 知识库旧版ID, 请使用faq_id
    helpdesk_id: string // 服务台ID
    question: string // 问题
    answer: string // 答案
    answer_richtext?: SearchHelpdeskFAQRespItemAnswerRichtext[] // 富文本答案
    create_time: number // 创建时间
    update_time: number // 修改时间
    categories?: SearchHelpdeskFAQRespItemCategory[] // 分类
    tags?: string[] // 相似问题列表
    expire_time: number // 失效时间
    update_user: SearchHelpdeskFAQRespItemUpdateUser // 更新用户
    create_user: SearchHelpdeskFAQRespItemCreateUser // 创建用户
  }

  export interface SearchHelpdeskFAQRespItemAnswerRichtext {
    content: string // 内容
    type: string // 类型
  }

  export interface SearchHelpdeskFAQRespItemCategory {
    category_id: string // 知识库分类ID
    id: string // 知识库分类ID, （旧版, 请使用category_id）
    name: string // 名称
    parent_id: string // 父知识库分类ID
    helpdesk_id: string // 服务台ID
    language: string // 语言
  }

  export interface SearchHelpdeskFAQRespItemCreateUser {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface SearchHelpdeskFAQRespItemUpdateUser {
    id: string // 用户ID
    avatar_url: string // 用户头像url
    name: string // 用户名
    department: string // 所在部门名称
    city: string // 城市
    country: string // 国家代号(CountryCode), 参考: http://www.mamicode.com/info-detail-2186501.html
  }

  export interface searchHelpdeskFAQResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SearchHelpdeskFAQResp
  }

  export interface UpdateHelpdeskAgentReq {
    agent_id: string // 客服id, 示例值: "ou_14777d82ffef0f707de5a8c7ff2c5ebe"
    status?: number // agent status, 示例值: 1: 在线；2: 离线
  }

  export interface UpdateHelpdeskAgentResp {}

  export interface updateHelpdeskAgentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateHelpdeskAgentResp
  }

  export interface GetHelpdeskAgentEmailReq {}

  export interface GetHelpdeskAgentEmailResp {
    agents: string // agent emails
  }

  export interface getHelpdeskAgentEmailResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskAgentEmailResp
  }

  export interface CreateHelpdeskAgentScheduleReq {
    agent_schedules?: CreateHelpdeskAgentScheduleReqAgentSchedule[] // 新客服日程
  }

  export interface CreateHelpdeskAgentScheduleReqAgentSchedule {
    agent_id?: string // 客服id, [可以以普通用户身份在服务台发起工单, 从工单详情里面获取用户guest.id](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/get), 示例值: "agent-id"
    schedule?: CreateHelpdeskAgentScheduleReqAgentScheduleSchedule[] // 工作日程列表
    agent_skill_ids?: string[] // 客服技能 ids
  }

  export interface CreateHelpdeskAgentScheduleReqAgentScheduleSchedule {
    start_time?: string // 开始时间, format 00:00 - 23:59, 示例值: "00:00"
    end_time?: string // 结束时间, format 00:00 - 23:59, 示例值: "24:00"
    weekday?: number // 星期几, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 7 - Sunday, 9 - Everday, 10 - Weekday, 11 - Weekend, 示例值: 9
  }

  export interface CreateHelpdeskAgentScheduleResp {}

  export interface createHelpdeskAgentScheduleResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateHelpdeskAgentScheduleResp
  }

  export interface DeleteHelpdeskAgentScheduleReq {
    agent_id: string // agent user id, 示例值: "12345"
  }

  export interface DeleteHelpdeskAgentScheduleResp {}

  export interface deleteHelpdeskAgentScheduleResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteHelpdeskAgentScheduleResp
  }

  export interface UpdateHelpdeskAgentScheduleReq {
    agent_id: string // 客服 id, 示例值: "123456"
    agent_schedule?: UpdateHelpdeskAgentScheduleReqAgentSchedule // 工作日程列表
  }

  export interface UpdateHelpdeskAgentScheduleReqAgentSchedule {
    schedule?: UpdateHelpdeskAgentScheduleReqAgentScheduleSchedule[] // 工作日程列表
    agent_skill_ids?: string[] // 客服技能 ids
  }

  export interface UpdateHelpdeskAgentScheduleReqAgentScheduleSchedule {
    start_time?: string // 开始时间, format 00:00 - 23:59, 示例值: "00:00"
    end_time?: string // 结束时间, format 00:00 - 23:59, 示例值: "24:00"
    weekday?: number // 星期几, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 7 - Sunday, 9 - Everday, 10 - Weekday, 11 - Weekend, 示例值: 9
  }

  export interface UpdateHelpdeskAgentScheduleResp {}

  export interface updateHelpdeskAgentScheduleResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateHelpdeskAgentScheduleResp
  }

  export interface GetHelpdeskAgentScheduleReq {
    agent_id: string // 客服 id, 示例值: "	客服 id"
  }

  export interface GetHelpdeskAgentScheduleResp {
    agent_schedule: GetHelpdeskAgentScheduleRespAgentSchedule // 客服日程
  }

  export interface GetHelpdeskAgentScheduleRespAgentSchedule {
    status: number // 客服状态, 1 - online客服, 2 - offline(手动)客服, 3 - off duty(下班)自动处于非服务时间段
    agent: GetHelpdeskAgentScheduleRespAgentScheduleAgent // 客服信息
    schedule?: GetHelpdeskAgentScheduleRespAgentScheduleSchedule[] // 工作日程列表
    agent_skills?: GetHelpdeskAgentScheduleRespAgentScheduleAgentSkill[] // 客服技能
  }

  export interface GetHelpdeskAgentScheduleRespAgentScheduleAgent {
    id: string // 客服 id
    avatar_url: string // avatar url
    name: string // 客服名字
    email: string // email
    department: string // 部门
    company_name: string // 公司名
  }

  export interface GetHelpdeskAgentScheduleRespAgentScheduleAgentSkill {
    id: string // 客服技能 id
    name: string // 客服技能名
    is_default: boolean // 是默认技能
  }

  export interface GetHelpdeskAgentScheduleRespAgentScheduleSchedule {
    start_time: string // 开始时间, format 00:00 - 23:59
    end_time: string // 结束时间, format 00:00 - 23:59
    weekday: number // 星期几, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 7 - Sunday, 9 - Everday, 10 - Weekday, 11 - Weekend
  }

  export interface getHelpdeskAgentScheduleResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskAgentScheduleResp
  }

  export interface GetHelpdeskAgentScheduleListReq {
    status?: number[] // 筛选条件, 1 - online客服, 2 - offline(手动)客服, 3 - off duty(下班)客服, 4 - 移除客服, 示例值: status=1&status=2
  }

  export interface GetHelpdeskAgentScheduleListResp {
    agent_schedules?: GetHelpdeskAgentScheduleListRespAgentSchedule[] // 客服列表
  }

  export interface GetHelpdeskAgentScheduleListRespAgentSchedule {
    status: number // 客服状态, 1 - online客服, 2 - offline(手动)客服, 3 - off duty(下班)自动处于非服务时间段
    agent: GetHelpdeskAgentScheduleListRespAgentScheduleAgent // 客服信息
    schedule?: GetHelpdeskAgentScheduleListRespAgentScheduleSchedule[] // 工作日程列表
    agent_skills?: GetHelpdeskAgentScheduleListRespAgentScheduleAgentSkill[] // 客服技能
  }

  export interface GetHelpdeskAgentScheduleListRespAgentScheduleAgent {
    id: string // 客服 id
    avatar_url: string // avatar url
    name: string // 客服名字
    email: string // email
    department: string // 部门
    company_name: string // 公司名
  }

  export interface GetHelpdeskAgentScheduleListRespAgentScheduleAgentSkill {
    id: string // 客服技能 id
    name: string // 客服技能名
    is_default: boolean // 是默认技能
  }

  export interface GetHelpdeskAgentScheduleListRespAgentScheduleSchedule {
    start_time: string // 开始时间, format 00:00 - 23:59
    end_time: string // 结束时间, format 00:00 - 23:59
    weekday: number // 星期几, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 7 - Sunday, 9 - Everday, 10 - Weekday, 11 - Weekend
  }

  export interface getHelpdeskAgentScheduleListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskAgentScheduleListResp
  }

  export interface CreateHelpdeskAgentSkillReq {
    name?: string // 技能名, 示例值: "test-skill"
    rules?: CreateHelpdeskAgentSkillReqRule[] // 技能rules
    agent_ids?: string[] // 客服 ids, 示例值: ["客服ID"]
  }

  export interface CreateHelpdeskAgentSkillReqRule {
    id?: string // rule id, 参考[获取客服技能rules](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill_rule/list) 用于获取rules options, 示例值: "test-skill-id"
    selected_operator?: number // 运算符比较, 参考[客服技能运算符选项](https://open.feishu.cn/document/ukTMukTMukTM/ucDOyYjL3gjM24yN4IjN/operator-options), 示例值: 8
    operand?: string // rule 操作数的值, 示例值: "{, "selected_departments": [, {, "id": "部门ID", "name": "IT", }, ], }"
    category?: number // rule 类型, 1-知识库, 2-工单信息, 3-用户飞书信息, 示例值: 3
  }

  export interface CreateHelpdeskAgentSkillResp {
    agent_skill_id: string // 客服技能id
  }

  export interface createHelpdeskAgentSkillResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateHelpdeskAgentSkillResp
  }

  export interface GetHelpdeskAgentSkillReq {
    agent_skill_id: string // agent skill id, 示例值: "6941215891786825756"
  }

  export interface GetHelpdeskAgentSkillResp {
    agent_skill: GetHelpdeskAgentSkillRespAgentSkill // 技能
  }

  export interface GetHelpdeskAgentSkillRespAgentSkill {
    id: string // 技能id
    name: string // 技能名
    rules?: GetHelpdeskAgentSkillRespAgentSkillRule[] // 技能rules
    agent_ids?: string[] // 具有此技能的客服ids
    is_default: boolean // 默认技能
    agents?: GetHelpdeskAgentSkillRespAgentSkillAgent[] // 客服 info
  }

  export interface GetHelpdeskAgentSkillRespAgentSkillAgent {
    id: string // user id
    avatar_url: string // user avatar url
    name: string // user name
  }

  export interface GetHelpdeskAgentSkillRespAgentSkillRule {
    id: string // rule id, 参考[获取客服技能rules](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill_rule/list) 用于获取rules options
    selected_operator: number // 运算符比较, 参考[客服技能运算符选项](https://open.feishu.cn/document/ukTMukTMukTM/ucDOyYjL3gjM24yN4IjN/operator-options)
    operator_options?: number[] // rule操作数value, [客服技能及运算符](https://open.feishu.cn/document/ukTMukTMukTM/ucDOyYjL3gjM24yN4IjN/operator-options)
    operand: string // rule 操作数的值
    category: number // rule 类型, 1-知识库, 2-工单信息, 3-用户飞书信息
    display_name: string // rule 名
  }

  export interface getHelpdeskAgentSkillResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskAgentSkillResp
  }

  export interface UpdateHelpdeskAgentSkillReq {
    agent_skill_id: string // agent skill id, 示例值: "test-skill-id"
    agent_skill?: UpdateHelpdeskAgentSkillReqAgentSkill // 更新技能
  }

  export interface UpdateHelpdeskAgentSkillReqAgentSkill {
    name?: string // 技能名, 示例值: "skill-name"
    rules?: UpdateHelpdeskAgentSkillReqAgentSkillRules // 技能rules
    agent_ids?: string[] // 具有此技能的客服ids
  }

  export interface UpdateHelpdeskAgentSkillReqAgentSkillRules {
    id?: string // rule id, 参考[获取客服技能rules](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill_rule/list) 用于获取rules options, 示例值: "test-skill-id"
    selected_operator?: number // 运算符比较, 参考[客服技能运算符选项](https://open.feishu.cn/document/ukTMukTMukTM/ucDOyYjL3gjM24yN4IjN/operator-options), 示例值: 8
    operator_options?: number[] // rule操作数value, [客服技能及运算符](https://open.feishu.cn/document/ukTMukTMukTM/ucDOyYjL3gjM24yN4IjN/operator-options)
    operand?: string // rule 操作数的值, 示例值: "{, "selected_departments": [, {, "id": "部门ID", "name": "IT", }, ], }"
  }

  export interface UpdateHelpdeskAgentSkillResp {}

  export interface updateHelpdeskAgentSkillResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateHelpdeskAgentSkillResp
  }

  export interface DeleteHelpdeskAgentSkillReq {
    agent_skill_id: string // agent group id, 示例值: "test-skill-id"
  }

  export interface DeleteHelpdeskAgentSkillResp {}

  export interface deleteHelpdeskAgentSkillResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteHelpdeskAgentSkillResp
  }

  export interface GetHelpdeskAgentSkillListReq {}

  export interface GetHelpdeskAgentSkillListResp {
    agent_skills?: GetHelpdeskAgentSkillListRespAgentSkill[] // 客服技能列表
  }

  export interface GetHelpdeskAgentSkillListRespAgentSkill {
    id: string // 技能id
    name: string // 技能名
    agent_ids?: string[] // 具有此技能的客服ids
    is_default: boolean // 默认技能
  }

  export interface getHelpdeskAgentSkillListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskAgentSkillListResp
  }

  export interface GetHelpdeskAgentSkillRuleListReq {}

  export interface GetHelpdeskAgentSkillRuleListResp {
    rules?: GetHelpdeskAgentSkillRuleListRespRule[] // rules列表
  }

  export interface GetHelpdeskAgentSkillRuleListRespRule {
    id: string // rule id, 参考[获取客服技能rules](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill_rule/list) 用于获取rules options
    operator_options?: number[] // rule操作数value, [客服技能及运算符](https://open.feishu.cn/document/ukTMukTMukTM/ucDOyYjL3gjM24yN4IjN/operator-options)
    operand: string // rule 操作数的值
    category: number // rule 类型, 1-知识库, 2-工单信息, 3-用户飞书信息
    display_name: string // rule 名
  }

  export interface getHelpdeskAgentSkillRuleListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHelpdeskAgentSkillRuleListResp
  }

  export interface SubscribeHelpdeskEventReq {
    events?: SubscribeHelpdeskEventReqEvent[] // 可订阅的事件列表
  }

  export interface SubscribeHelpdeskEventReqEvent {
    type: string // 事件类型, 示例值: "helpdesk.ticket_message"
    subtype: string // 事件子类型, 示例值: "ticket_message.created_v1"
  }

  export interface SubscribeHelpdeskEventResp {}

  export interface subscribeHelpdeskEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SubscribeHelpdeskEventResp
  }

  export interface UnsubscribeHelpdeskEventReq {
    events?: UnsubscribeHelpdeskEventReqEvent[] // event list to unsubscribe
  }

  export interface UnsubscribeHelpdeskEventReqEvent {
    type: string // 事件类型, 示例值: "helpdesk.ticket_message"
    subtype: string // 事件子类型, 示例值: "ticket_message.created_v1"
  }

  export interface UnsubscribeHelpdeskEventResp {}

  export interface unsubscribeHelpdeskEventResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UnsubscribeHelpdeskEventResp
  }
}

class CreateHelpdeskNotificationReq {
  user_id_type?: any
  id?: any
  job_name?: any
  status?: any
  create_user?: any
  created_at?: any
  update_user?: any
  updated_at?: any
  target_user_count?: any
  sent_user_count?: any
  read_user_count?: any
  send_at?: any
  push_content?: any
  push_type?: any
  push_scope_type?: any
  new_staff_scope_type?: any
  new_staff_scope_department_list?: any
  user_list?: any
  department_list?: any
  chat_list?: any
  ext?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      id: this.id,
      job_name: this.job_name,
      status: this.status,
      create_user: this.create_user,
      created_at: this.created_at,
      update_user: this.update_user,
      updated_at: this.updated_at,
      target_user_count: this.target_user_count,
      sent_user_count: this.sent_user_count,
      read_user_count: this.read_user_count,
      send_at: this.send_at,
      push_content: this.push_content,
      push_type: this.push_type,
      push_scope_type: this.push_scope_type,
      new_staff_scope_type: this.new_staff_scope_type,
      new_staff_scope_department_list: this.new_staff_scope_department_list,
      user_list: this.user_list,
      department_list: this.department_list,
      chat_list: this.chat_list,
      ext: this.ext
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

class UpdateHelpdeskNotificationReq {
  notification_id?: any
  user_id_type?: any
  id?: any
  job_name?: any
  status?: any
  create_user?: any
  created_at?: any
  update_user?: any
  updated_at?: any
  target_user_count?: any
  sent_user_count?: any
  read_user_count?: any
  send_at?: any
  push_content?: any
  push_type?: any
  push_scope_type?: any
  new_staff_scope_type?: any
  new_staff_scope_department_list?: any
  user_list?: any
  department_list?: any
  chat_list?: any
  ext?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      id: this.id,
      job_name: this.job_name,
      status: this.status,
      create_user: this.create_user,
      created_at: this.created_at,
      update_user: this.update_user,
      updated_at: this.updated_at,
      target_user_count: this.target_user_count,
      sent_user_count: this.sent_user_count,
      read_user_count: this.read_user_count,
      send_at: this.send_at,
      push_content: this.push_content,
      push_type: this.push_type,
      push_scope_type: this.push_scope_type,
      new_staff_scope_type: this.new_staff_scope_type,
      new_staff_scope_department_list: this.new_staff_scope_department_list,
      user_list: this.user_list,
      department_list: this.department_list,
      chat_list: this.chat_list,
      ext: this.ext
    }
  }

  getPath(path: string) {
    path = path.replace(':notification_id', this.notification_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHelpdeskNotificationReq {
  notification_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':notification_id', this.notification_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class PreviewHelpdeskNotificationReq {
  notification_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':notification_id', this.notification_id)

    return path
  }
}

class SubmitApproveHelpdeskNotificationReq {
  notification_id?: any
  reason?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      reason: this.reason
    }
  }

  getPath(path: string) {
    path = path.replace(':notification_id', this.notification_id)

    return path
  }
}

class CancelApproveHelpdeskNotificationReq {
  notification_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':notification_id', this.notification_id)

    return path
  }
}

class ExecuteSendHelpdeskNotificationReq {
  notification_id?: any
  send_at?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      send_at: this.send_at
    }
  }

  getPath(path: string) {
    path = path.replace(':notification_id', this.notification_id)

    return path
  }
}

class CancelSendHelpdeskNotificationReq {
  notification_id?: any
  is_recall?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      is_recall: this.is_recall
    }
  }

  getPath(path: string) {
    path = path.replace(':notification_id', this.notification_id)

    return path
  }
}

class StartHelpdeskServiceReq {
  human_service?: any
  appointed_agents?: any
  open_id?: any
  customized_info?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      human_service: this.human_service,
      appointed_agents: this.appointed_agents,
      open_id: this.open_id,
      customized_info: this.customized_info
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetHelpdeskTicketReq {
  ticket_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':ticket_id', this.ticket_id)

    return path
  }
}

class UpdateHelpdeskTicketReq {
  ticket_id?: any
  status?: any
  tag_names?: any
  comment?: any
  customized_fields?: any
  ticket_type?: any
  solved?: any
  channel?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      status: this.status,
      tag_names: this.tag_names,
      comment: this.comment,
      customized_fields: this.customized_fields,
      ticket_type: this.ticket_type,
      solved: this.solved,
      channel: this.channel
    }
  }

  getPath(path: string) {
    path = path.replace(':ticket_id', this.ticket_id)

    return path
  }
}

class GetHelpdeskTicketListReq {
  ticket_id?: any
  agent_id?: any
  closed_by_id?: any
  type?: any
  channel?: any
  solved?: any
  score?: any
  status_list?: any
  guest_name?: any
  guest_id?: any
  tags?: any
  page?: any
  page_size?: any
  create_time_start?: any
  create_time_end?: any
  update_time_start?: any
  update_time_end?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.ticket_id !== undefined) {
      q['ticket_id'] = this.ticket_id
    }
    if (this.agent_id !== undefined) {
      q['agent_id'] = this.agent_id
    }
    if (this.closed_by_id !== undefined) {
      q['closed_by_id'] = this.closed_by_id
    }
    if (this.type !== undefined) {
      q['type'] = this.type
    }
    if (this.channel !== undefined) {
      q['channel'] = this.channel
    }
    if (this.solved !== undefined) {
      q['solved'] = this.solved
    }
    if (this.score !== undefined) {
      q['score'] = this.score
    }
    if (this.status_list !== undefined) {
      q['status_list'] = this.status_list
    }
    if (this.guest_name !== undefined) {
      q['guest_name'] = this.guest_name
    }
    if (this.guest_id !== undefined) {
      q['guest_id'] = this.guest_id
    }
    if (this.tags !== undefined) {
      q['tags'] = this.tags
    }
    if (this.page !== undefined) {
      q['page'] = this.page
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.create_time_start !== undefined) {
      q['create_time_start'] = this.create_time_start
    }
    if (this.create_time_end !== undefined) {
      q['create_time_end'] = this.create_time_end
    }
    if (this.update_time_start !== undefined) {
      q['update_time_start'] = this.update_time_start
    }
    if (this.update_time_end !== undefined) {
      q['update_time_end'] = this.update_time_end
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DownloadHelpdeskTicketImageReq {
  ticket_id?: any
  msg_id?: any
  index?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.ticket_id !== undefined) {
      q['ticket_id'] = this.ticket_id
    }
    if (this.msg_id !== undefined) {
      q['msg_id'] = this.msg_id
    }
    if (this.index !== undefined) {
      q['index'] = this.index
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class AnswerHelpdeskTicketUserQueryReq {
  ticket_id?: any
  event_id?: any
  faqs?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      event_id: this.event_id,
      faqs: this.faqs
    }
  }

  getPath(path: string) {
    path = path.replace(':ticket_id', this.ticket_id)

    return path
  }
}

class GetHelpdeskTicketCustomizedFieldsReq {
  visible_only?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.visible_only !== undefined) {
      q['visible_only'] = this.visible_only
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHelpdeskTicketMessageListReq {
  ticket_id?: any
  time_start?: any
  time_end?: any
  page?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':ticket_id', this.ticket_id)

    const q = {} as { [key: string]: any }
    if (this.time_start !== undefined) {
      q['time_start'] = this.time_start
    }
    if (this.time_end !== undefined) {
      q['time_end'] = this.time_end
    }
    if (this.page !== undefined) {
      q['page'] = this.page
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SendHelpdeskTicketMessageReq {
  ticket_id?: any
  msg_type?: any
  content?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      msg_type: this.msg_type,
      content: this.content
    }
  }

  getPath(path: string) {
    path = path.replace(':ticket_id', this.ticket_id)

    return path
  }
}

class SendHelpdeskMessageReq {
  user_id_type?: any
  msg_type?: any
  content?: any
  receiver_id?: any
  receive_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      msg_type: this.msg_type,
      content: this.content,
      receiver_id: this.receiver_id,
      receive_type: this.receive_type
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

class GetHelpdeskTicketCustomizedFieldListReq {
  page_token?: any
  page_size?: any
  visible?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      visible: this.visible
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

class DeleteHelpdeskTicketCustomizedFieldReq {
  ticket_customized_field_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':ticket_customized_field_id', this.ticket_customized_field_id)

    return path
  }
}

class UpdateHelpdeskTicketCustomizedFieldReq {
  ticket_customized_field_id?: any
  display_name?: any
  position?: any
  description?: any
  visible?: any
  required?: any
  dropdown_options?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      display_name: this.display_name,
      position: this.position,
      description: this.description,
      visible: this.visible,
      required: this.required,
      dropdown_options: this.dropdown_options
    }
  }

  getPath(path: string) {
    path = path.replace(':ticket_customized_field_id', this.ticket_customized_field_id)

    return path
  }
}

class CreateHelpdeskTicketCustomizedFieldReq {
  helpdesk_id?: any
  key_name?: any
  display_name?: any
  position?: any
  field_type?: any
  description?: any
  visible?: any
  editable?: any
  required?: any
  dropdown_options?: any
  dropdown_allow_multiple?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      helpdesk_id: this.helpdesk_id,
      key_name: this.key_name,
      display_name: this.display_name,
      position: this.position,
      field_type: this.field_type,
      description: this.description,
      visible: this.visible,
      editable: this.editable,
      required: this.required,
      dropdown_options: this.dropdown_options,
      dropdown_allow_multiple: this.dropdown_allow_multiple
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetHelpdeskTicketCustomizedFieldReq {
  ticket_customized_field_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':ticket_customized_field_id', this.ticket_customized_field_id)

    return path
  }
}

class CreateHelpdeskCategoryReq {
  name?: any
  parent_id?: any
  language?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      parent_id: this.parent_id,
      language: this.language
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetHelpdeskCategoryReq {
  id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':id', this.id)

    return path
  }
}

class UpdateHelpdeskCategoryReq {
  id?: any
  name?: any
  parent_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      parent_id: this.parent_id
    }
  }

  getPath(path: string) {
    path = path.replace(':id', this.id)

    return path
  }
}

class DeleteHelpdeskCategoryReq {
  id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':id', this.id)

    return path
  }
}

class GetHelpdeskCategoryListReq {
  lang?: any
  order_by?: any
  asc?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.lang !== undefined) {
      q['lang'] = this.lang
    }
    if (this.order_by !== undefined) {
      q['order_by'] = this.order_by
    }
    if (this.asc !== undefined) {
      q['asc'] = this.asc
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateHelpdeskFAQReq {
  faq?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      faq: this.faq
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetHelpdeskFAQReq {
  id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':id', this.id)

    return path
  }
}

class UpdateHelpdeskFAQReq {
  id?: any
  faq?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      faq: this.faq
    }
  }

  getPath(path: string) {
    path = path.replace(':id', this.id)

    return path
  }
}

class DeleteHelpdeskFAQReq {
  id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':id', this.id)

    return path
  }
}

class GetHelpdeskFAQListReq {
  category_id?: any
  status?: any
  search?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.category_id !== undefined) {
      q['category_id'] = this.category_id
    }
    if (this.status !== undefined) {
      q['status'] = this.status
    }
    if (this.search !== undefined) {
      q['search'] = this.search
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

class GetHelpdeskFAQImageReq {
  id?: any
  image_key?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':id', this.id)
    path = path.replace(':image_key', this.image_key)

    return path
  }
}

class SearchHelpdeskFAQReq {
  query?: any
  base64?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.query !== undefined) {
      q['query'] = this.query
    }
    if (this.base64 !== undefined) {
      q['base64'] = this.base64
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

class UpdateHelpdeskAgentReq {
  agent_id?: any
  status?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      status: this.status
    }
  }

  getPath(path: string) {
    path = path.replace(':agent_id', this.agent_id)

    return path
  }
}

class GetHelpdeskAgentEmailReq {
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

class CreateHelpdeskAgentScheduleReq {
  agent_schedules?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      agent_schedules: this.agent_schedules
    }
  }

  getPath(path: string) {
    return path
  }
}

class DeleteHelpdeskAgentScheduleReq {
  agent_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':agent_id', this.agent_id)

    return path
  }
}

class UpdateHelpdeskAgentScheduleReq {
  agent_id?: any
  agent_schedule?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      agent_schedule: this.agent_schedule
    }
  }

  getPath(path: string) {
    path = path.replace(':agent_id', this.agent_id)

    return path
  }
}

class GetHelpdeskAgentScheduleReq {
  agent_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':agent_id', this.agent_id)

    return path
  }
}

class GetHelpdeskAgentScheduleListReq {
  status?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.status !== undefined) {
      q['status'] = this.status
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateHelpdeskAgentSkillReq {
  name?: any
  rules?: any
  agent_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      rules: this.rules,
      agent_ids: this.agent_ids
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetHelpdeskAgentSkillReq {
  agent_skill_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':agent_skill_id', this.agent_skill_id)

    return path
  }
}

class UpdateHelpdeskAgentSkillReq {
  agent_skill_id?: any
  agent_skill?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      agent_skill: this.agent_skill
    }
  }

  getPath(path: string) {
    path = path.replace(':agent_skill_id', this.agent_skill_id)

    return path
  }
}

class DeleteHelpdeskAgentSkillReq {
  agent_skill_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':agent_skill_id', this.agent_skill_id)

    return path
  }
}

class GetHelpdeskAgentSkillListReq {
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

class GetHelpdeskAgentSkillRuleListReq {
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

class SubscribeHelpdeskEventReq {
  events?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      events: this.events
    }
  }

  getPath(path: string) {
    return path
  }
}

class UnsubscribeHelpdeskEventReq {
  events?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      events: this.events
    }
  }

  getPath(path: string) {
    return path
  }
}
