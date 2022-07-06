import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class MessageService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // sendEphemeralMessage 用于机器人在群会话中发送仅指定用户可见的消息卡片。
  //
  // ## 使用场景
  // 临时消息卡片多用于群聊中用户与机器人交互的中间态。例如在群聊中用户需要使用待办事项类bot创建一条提醒, bot 发送了可设置提醒日期和提醒内容的一张可交互的消息卡片, 此卡片在没有设置为临时卡片的情况下为群内全员可见, 即群内可看见该用户与 bot 交互的过程。而设置为临时卡片后, 交互过程仅该用户可见, 群内其他成员只会看到最终设置完成的提醒卡片。
  // 通过临时消息卡片, 可以减少消息对群聊中不相关用户的打扰, 有效降低群消息的噪声。
  // 需要启用机器人能力；需要机器人在会话群里。
  // -  仅触发临时卡片的用户自己可见。
  // - 不支持转发。
  // - 只能在群聊使用。
  // - 仅在用户处于在线状态的飞书客户端上可见。
  // - 临时消息卡片的[呈现能力](https://open.feishu.cn/document/ukTMukTMukTM/uEjNwUjLxYDM14SM2ATN)、[交互能力](https://open.feishu.cn/document/ukTMukTMukTM/uYjNwUjL2YDM14iN2ATN)与消息卡片一致。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uETOyYjLxkjM24SM5IjN
  async sendEphemeralMessage(
    request: Message.SendEphemeralMessageReq
  ): Promise<{
    data: Message.SendEphemeralMessageResp
    response: Response
  }> {
    const req: RawRequestReq<SendEphemeralMessageReq> = {
      scope: 'Message',
      api: 'SendEphemeralMessage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/ephemeral/v1/send',
      body: new SendEphemeralMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SendEphemeralMessageReq, Message.SendEphemeralMessageResp>(req)
  }
  // sendUrgentAppMessage 对指定消息进行应用内加急。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 只能加急机器人自己发送的消息
  // - 加急时机器人仍需要在会话内
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_app
  async sendUrgentAppMessage(
    request: Message.SendUrgentAppMessageReq
  ): Promise<{
    data: Message.SendUrgentAppMessageResp
    response: Response
  }> {
    const req: RawRequestReq<SendUrgentAppMessageReq> = {
      scope: 'Message',
      api: 'SendUrgentAppMessage',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id/urgent_app',
      body: new SendUrgentAppMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SendUrgentAppMessageReq, Message.SendUrgentAppMessageResp>(req)
  }
  // sendUrgentSmsMessage 对指定消息进行应用内加急与短信加急。
  //
  // 特别说明:
  // - 通过接口产生的短信加急将消耗企业的加急额度, 请慎重调用。
  // - 通过租户管理后台-费用中心-短信/电话加急 可以查看当前额度。
  // - 默认接口限流为50 QPS, 请谨慎调用。
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 只能加急机器人自己发送的消息
  // - 加急时机器人仍需要在会话内
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_sms
  async sendUrgentSmsMessage(
    request: Message.SendUrgentSmsMessageReq
  ): Promise<{
    data: Message.SendUrgentSmsMessageResp
    response: Response
  }> {
    const req: RawRequestReq<SendUrgentSmsMessageReq> = {
      scope: 'Message',
      api: 'SendUrgentSmsMessage',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id/urgent_sms',
      body: new SendUrgentSmsMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SendUrgentSmsMessageReq, Message.SendUrgentSmsMessageResp>(req)
  }
  // sendUrgentPhoneMessage 对指定消息进行应用内加急与电话加急
  //
  // 特别说明:
  // - 通过接口产生的电话加急将消耗企业的加急额度, 请慎重调用。
  // - 通过租户管理后台-费用中心-短信/电话加急 可以查看当前额度。
  // - 默认接口限流为50 QPS, 请谨慎调用。
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 只能加急机器人自己发送的消息
  // - 加急时机器人仍需要在会话内
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_phone
  async sendUrgentPhoneMessage(
    request: Message.SendUrgentPhoneMessageReq
  ): Promise<{
    data: Message.SendUrgentPhoneMessageResp
    response: Response
  }> {
    const req: RawRequestReq<SendUrgentPhoneMessageReq> = {
      scope: 'Message',
      api: 'SendUrgentPhoneMessage',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id/urgent_phone',
      body: new SendUrgentPhoneMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SendUrgentPhoneMessageReq, Message.SendUrgentPhoneMessageResp>(req)
  }
  // sendRawMessage 给指定用户或者会话发送消息, 支持文本、富文本、可交互的[消息卡片](https://open.feishu.cn/document/ukTMukTMukTM/uczM3QjL3MzN04yNzcDN)、群名片、个人名片、图片、视频、音频、文件、表情包。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 给用户发送消息, 需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability)
  // - 给群组发送消息, 需要机器人在群中
  // - 该接口不支持给部门成员发消息, 请使用 [批量发送消息](https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM)
  // - 文本消息请求体最大不能超过150KB
  // - 卡片及富文本消息请求体最大不能超过30KB
  // - 消息卡片的 `update_multi`（是否为共享卡片）字段在卡片内容的`config`结构体中设置。详细参考文档[配置卡片属性](https://open.feishu.cn/document/ukTMukTMukTM/uAjNwUjLwYDM14CM2ATN)
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create
  async sendRawMessage(
    request: Message.SendRawMessageReq
  ): Promise<{
    data: Message.SendRawMessageResp
    response: Response
  }> {
    const req: RawRequestReq<SendRawMessageReq> = {
      scope: 'Message',
      api: 'SendRawMessage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages',
      body: new SendRawMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SendRawMessageReq, Message.SendRawMessageResp>(req)
  }
  // sendRawMessageOld 为了更好地提升该接口的安全性, 我们对其进行了升级, 请尽快迁移至[新版本>>](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create)
  //
  // 给指定用户或者会话发送文本消息, 其中会话包括私聊会话和群会话。
  // - 需要启用机器人能力；私聊会话时机器人需要拥有对用户的可见性, 群会话需要机器人在群里
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUjNz4SN2MjL1YzM
  async sendRawMessageOld(
    request: Message.SendRawMessageOldReq
  ): Promise<{
    data: Message.SendRawMessageOldResp
    response: Response
  }> {
    const req: RawRequestReq<SendRawMessageOldReq> = {
      scope: 'Message',
      api: 'SendRawMessageOld',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/message/v4/send/',
      body: new SendRawMessageOldReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SendRawMessageOldReq, Message.SendRawMessageOldResp>(req)
  }
  // batchSendOldRawMessage 给多个用户或者多个部门发送消息。
  //
  // 注意事项:
  // - 调用该接口需要注意
  // - 应用需要启用机器人能力
  // - 必须拥有获取与发送单聊、群组消息权限, 或者以应用的身份发消息权限
  // - 应用需要拥有批量发送消息权限
  // --给用户发送需要拥有 给多个用户批量发消息 权限
  // --给部门发送需要拥有 给一个或多个部门的成员批量发消息 权限
  // - 应用需要拥有对所发送用户或部门的可见性
  // - 通过该接口发送的消息 不支持更新以及回复等操作
  // - 只能发送给用户, 无法发送给群组
  // - 异步接口, 会有一定延迟, 每个应用待发送的消息按顺序处理, 请合理安排批量发送范围和顺序。发送消息给单个用户的场景请使用[发送消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create)接口
  // - 单个应用每天通过该接口发送的总消息条数不超过50万
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM
  async batchSendOldRawMessage(
    request: Message.BatchSendOldRawMessageReq
  ): Promise<{
    data: Message.BatchSendOldRawMessageResp
    response: Response
  }> {
    const req: RawRequestReq<BatchSendOldRawMessageReq> = {
      scope: 'Message',
      api: 'BatchSendOldRawMessage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/message/v4/batch_send/',
      body: new BatchSendOldRawMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<BatchSendOldRawMessageReq, Message.BatchSendOldRawMessageResp>(req)
  }
  // replyRawMessage 回复指定消息, 支持文本、富文本、卡片、群名片、个人名片、图片、视频、文件等多种消息类型。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 回复私聊消息, 需要机器人对用户有可用性
  // - 回复群组消息, 需要机器人在群中
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/reply
  async replyRawMessage(
    request: Message.ReplyRawMessageReq
  ): Promise<{
    data: Message.ReplyRawMessageResp
    response: Response
  }> {
    const req: RawRequestReq<ReplyRawMessageReq> = {
      scope: 'Message',
      api: 'ReplyRawMessage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id/reply',
      body: new ReplyRawMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<ReplyRawMessageReq, Message.ReplyRawMessageResp>(req)
  }
  // deleteMessage 机器人撤回机器人自己发送的消息或群主撤回群内消息。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app), 撤回消息时机器人仍需要在会话内
  // - 机器人可以撤回单聊和群组内, 自己发送 且 发送时间不超过1天(24小时)的消息
  // - 若机器人要撤回群内他人发送的消息, 则机器人必须是该群的群主 或者 得到群主的授权, 且消息发送时间不超过1天（24小时）
  // - 无法撤回通过「批量发送消息接口」发送的消息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/delete
  async deleteMessage(
    request: Message.DeleteMessageReq
  ): Promise<{
    data: Message.DeleteMessageResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMessageReq> = {
      scope: 'Message',
      api: 'DeleteMessage',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id',
      body: new DeleteMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteMessageReq, Message.DeleteMessageResp>(req)
  }
  // batchDeleteMessage 批量撤回消息
  //
  // 注意事项:
  // - 只能撤回通过[批量发送消息](https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM)接口产生的消息, 单条消息的撤回请使用[撤回消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/delete)接口
  // - 路径参数batch_message_id为[批量发送消息](https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM)接口返回值中的message_id字段, 用于标识一次批量发送消息请求, 格式为: bm-xxx
  // - 一次调用涉及大量消息, 所以为异步接口, 会有一定延迟。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/delete
  async batchDeleteMessage(
    request: Message.BatchDeleteMessageReq
  ): Promise<{
    data: Message.BatchDeleteMessageResp
    response: Response
  }> {
    const req: RawRequestReq<BatchDeleteMessageReq> = {
      scope: 'Message',
      api: 'BatchDeleteMessage',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/im/v1/batch_messages/:batch_message_id',
      body: new BatchDeleteMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<BatchDeleteMessageReq, Message.BatchDeleteMessageResp>(req)
  }
  // updateMessage 更新应用已发送的消息卡片内容。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 当前仅支持更新 卡片消息
  // - 不支持更新批量消息
  // - 只支持对所有人都更新的[「共享卡片」](ukTMukTMukTM/uAjNwUjLwYDM14CM2ATN), 也即需要在卡片的`config`属性中, 显式声明`"update_multi":true`。 如果你只想更新特定人的消息卡片, 必须要用户在卡片操作交互后触发, 开发文档参考[「独享卡片」](https://open.feishu.cn/document/ukTMukTMukTM/uYjNwUjL2YDM14iN2ATN#49904b71)
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/patch
  async updateMessage(
    request: Message.UpdateMessageReq
  ): Promise<{
    data: Message.UpdateMessageResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateMessageReq> = {
      scope: 'Message',
      api: 'UpdateMessage',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id',
      body: new UpdateMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateMessageReq, Message.UpdateMessageResp>(req)
  }
  // updateMessageDelay 用于用户交互完成后延后更新消息卡片
  //
  // ### 使用场景
  // 1. 用户点击卡片后业务方需要处理较长时间, 无法在3s内及时返回需要展示的卡片内容
  // 2. 指定只更新一部分收到这张卡片成员（同一个`message_id`）看到的卡片内容
  // - 需要用户主动交互触发, 不支持无条件更新
  // - 延迟更新使用的token有效期为30分钟, 超时则无法更新卡片
  // - 调用延迟更新接口需要晚于同步返回, 否则会出现不可预测行为 服务端处理时, 可先立即 return 空串, 再在30分钟内调用延迟更新接口更新卡片
  // - 只能更新用户交互对应卡片, 不允许更新其他卡片
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMDO1YjLzgTN24yM4UjN
  async updateMessageDelay(
    request: Message.UpdateMessageDelayReq
  ): Promise<{
    data: Message.UpdateMessageDelayResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateMessageDelayReq> = {
      scope: 'Message',
      api: 'UpdateMessageDelay',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/interactive/v1/card/update',
      body: new UpdateMessageDelayReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateMessageDelayReq, Message.UpdateMessageDelayResp>(req)
  }
  // getMessageReadUserList 查询消息的已读信息。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 只能查询机器人自己发送, 且发送时间不超过7天的消息
  // - 查询消息已读信息时机器人仍需要在会话内
  // - 本接口不支持查询批量消息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/read_users
  async getMessageReadUserList(
    request: Message.GetMessageReadUserListReq
  ): Promise<{
    data: Message.GetMessageReadUserListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMessageReadUserListReq> = {
      scope: 'Message',
      api: 'GetMessageReadUserList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id/read_users',
      body: new GetMessageReadUserListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetMessageReadUserListReq, Message.GetMessageReadUserListResp>(req)
  }
  // getBatchSentMessageReadUser 查询批量消息推送和阅读人数
  //
  // 注意事项:
  // - 只能查询通过[批量发送消息](https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM)接口产生的消息
  // - 该接口返回的数据为查询时刻的快照数据。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/read_user
  async getBatchSentMessageReadUser(
    request: Message.GetBatchSentMessageReadUserReq
  ): Promise<{
    data: Message.GetBatchSentMessageReadUserResp
    response: Response
  }> {
    const req: RawRequestReq<GetBatchSentMessageReadUserReq> = {
      scope: 'Message',
      api: 'GetBatchSentMessageReadUser',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/batch_messages/:batch_message_id/read_user',
      body: new GetBatchSentMessageReadUserReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetBatchSentMessageReadUserReq,
      Message.GetBatchSentMessageReadUserResp
    >(req)
  }
  // getBatchSentMessageProgress 查询批量消息整体进度
  //
  // 注意事项:
  // * 该接口是[查询批量消息推送和阅读人数](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/read_user)接口的加强版
  // * 该接口返回的数据为查询时刻的快照数据
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/get_progress
  async getBatchSentMessageProgress(
    request: Message.GetBatchSentMessageProgressReq
  ): Promise<{
    data: Message.GetBatchSentMessageProgressResp
    response: Response
  }> {
    const req: RawRequestReq<GetBatchSentMessageProgressReq> = {
      scope: 'Message',
      api: 'GetBatchSentMessageProgress',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/batch_messages/:batch_message_id/get_progress',
      body: new GetBatchSentMessageProgressReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetBatchSentMessageProgressReq,
      Message.GetBatchSentMessageProgressResp
    >(req)
  }
  // getMessageList 获取会话（包括单聊、群组）的历史消息（聊天记录）。
  //
  // 接口级别权限默认只能获取单聊（p2p）消息, 如果需要获取群组（group）消息, 应用还必须拥有 *获取群组中所有消息* 权限
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 获取消息时, 机器人必须在群组中
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/list
  async getMessageList(
    request: Message.GetMessageListReq
  ): Promise<{
    data: Message.GetMessageListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMessageListReq> = {
      scope: 'Message',
      api: 'GetMessageList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages',
      body: new GetMessageListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetMessageListReq, Message.GetMessageListResp>(req)
  }
  // getMessageFile 获取消息中的资源文件, 包括音频, 视频, 图片和文件, 暂不支持表情包资源下载。当前仅支持 100M 以内的资源文件的下载。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 机器人和消息需要在同一会话中
  // - 请求的 file_key 和 message_id 需要匹配
  // - 暂不支持获取合并转发消息中的子消息的资源文件
  // - 获取群组消息时, 应用必须拥有 获取群组中所有的消息 权限
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get
  async getMessageFile(
    request: Message.GetMessageFileReq
  ): Promise<{
    data: Message.GetMessageFileResp
    response: Response
  }> {
    const req: RawRequestReq<GetMessageFileReq> = {
      scope: 'Message',
      api: 'GetMessageFile',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id/resources/:file_key',
      body: new GetMessageFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file_download: true
    }
    return this.cli.RawRequest<GetMessageFileReq, Message.GetMessageFileResp>(req)
  }
  // getMessage 通过 message_id 查询消息内容
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 机器人必须在群组中
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/get
  async getMessage(
    request: Message.GetMessageReq
  ): Promise<{
    data: Message.GetMessageResp
    response: Response
  }> {
    const req: RawRequestReq<GetMessageReq> = {
      scope: 'Message',
      api: 'GetMessage',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id',
      body: new GetMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetMessageReq, Message.GetMessageResp>(req)
  }
  // deleteEphemeralMessage 在群会话中删除指定用户可见的临时消息卡片
  //
  // 临时卡片消息可以通过该接口进行显式删除, 临时卡片消息删除后将不会在该设备上留下任何痕迹。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uITOyYjLykjM24iM5IjN
  async deleteEphemeralMessage(
    request: Message.DeleteEphemeralMessageReq
  ): Promise<{
    data: Message.DeleteEphemeralMessageResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteEphemeralMessageReq> = {
      scope: 'Message',
      api: 'DeleteEphemeralMessage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/ephemeral/v1/delete',
      body: new DeleteEphemeralMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteEphemeralMessageReq, Message.DeleteEphemeralMessageResp>(req)
  }
  // createMessageReaction 给指定消息添加指定类型的表情回复（reaction即表情回复, 本说明文档统一用“reaction”代称）。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 待添加reaction的消息要真实存在, 不能被撤回
  // - 给消息添加reaction, 需要reaction的发送方（机器人或者用户）在消息所在的会话内
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/create
  async createMessageReaction(
    request: Message.CreateMessageReactionReq
  ): Promise<{
    data: Message.CreateMessageReactionResp
    response: Response
  }> {
    const req: RawRequestReq<CreateMessageReactionReq> = {
      scope: 'Message',
      api: 'CreateMessageReaction',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id/reactions',
      body: new CreateMessageReactionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateMessageReactionReq, Message.CreateMessageReactionResp>(req)
  }
  // getMessageReactionList 获取指定消息的特定类型表情回复列表（reaction即表情回复, 本说明文档统一用“reaction”代称）。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 待获取reaction信息的消息要真实存在, 不能被撤回
  // - 获取消息的reaction, 需要request的授权主体（机器人或者用户）在消息所在的会话内
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/list
  async getMessageReactionList(
    request: Message.GetMessageReactionListReq
  ): Promise<{
    data: Message.GetMessageReactionListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMessageReactionListReq> = {
      scope: 'Message',
      api: 'GetMessageReactionList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id/reactions',
      body: new GetMessageReactionListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetMessageReactionListReq, Message.GetMessageReactionListResp>(req)
  }
  // deleteMessageReaction 删除指定消息的表情回复（reaction即表情回复, 本说明文档统一用“reaction”代称）。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 只能删除真实存在的reaction, 并且删除reaction请求的操作者必须是reaction的原始添加者
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/delete
  async deleteMessageReaction(
    request: Message.DeleteMessageReactionReq
  ): Promise<{
    data: Message.DeleteMessageReactionResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMessageReactionReq> = {
      scope: 'Message',
      api: 'DeleteMessageReaction',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/im/v1/messages/:message_id/reactions/:reaction_id',
      body: new DeleteMessageReactionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteMessageReactionReq, Message.DeleteMessageReactionResp>(req)
  }
}

export declare namespace Message {
  export interface SendEphemeralMessageReq {
    chat_id: string // 发送临时消息的群ID可通过事件推送获取
    open_id: string // 指定发送临时消息卡片的用户, 其他人将无法看到临时消息卡片, 只需要填 open_id、email、user_id（id介绍详见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)） 中的一个即可。服务端依次读取字段的顺序为 open_id > user_id > email
    user_id: string // 指定发送临时消息卡片的用户, 其他人将无法看到临时消息卡片, 只需要填 open_id、email、user_id（id介绍详见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)） 中的一个即可。服务端依次读取字段的顺序为 open_id > user_id > email
    email: string // 指定发送临时消息卡片的用户, 其他人将无法看到临时消息卡片, 只需要填 open_id、email、user_id（id介绍详见[用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)） 中的一个即可。服务端依次读取字段的顺序为 open_id > user_id > email
    msg_type: string // 消息的类型, 此处固定填 "interactive"
    card: any // 消息卡片的描述内容, 具体参考 [基础结构](https://open.feishu.cn/document/ukTMukTMukTM/uEjNwUjLxYDM14SM2ATN)
  }

  export interface SendEphemeralMessageResp {
    message_id: string // 消息 ID
  }

  export interface sendEphemeralMessageResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码描述
    data: SendEphemeralMessageResp
  }

  export interface SendUrgentAppMessageReq {
    message_id: string // 待加急的消息ID。注意不支持批量消息ID（bm_xxx）, 示例值: "om_dc13264520392913993dd051dba21dcf"
    user_id_type: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id_list?: string[] // 目标用户的ID。列表不可为空, 示例值: ["ou_6yf8af6bgb9100449565764t3382b168"]
  }

  export interface SendUrgentAppMessageResp {
    invalid_user_id_list?: string[] // 无效的用户ID
  }

  export interface sendUrgentAppMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SendUrgentAppMessageResp
  }

  export interface SendUrgentSmsMessageReq {
    message_id: string // 待加急的消息ID。注意不支持批量消息ID(bm_xxx), 示例值: "om_dc13264520392913993dd051dba21dcf"
    user_id_type: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id_list?: string[] // 目标用户的ID。列表不可为空, 示例值: ["ou_6yf8af6bgb9100449565764t3382b168"]
  }

  export interface SendUrgentSmsMessageResp {
    invalid_user_id_list?: string[] // 无效的用户ID
  }

  export interface sendUrgentSmsMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SendUrgentSmsMessageResp
  }

  export interface SendUrgentPhoneMessageReq {
    message_id: string // 待加急的消息的ID。注意不支持批量消息ID（bm_xxx）, 示例值: "om_dc13264520392913993dd051dba21dcf"
    user_id_type: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id_list?: string[] // 目标用户的ID。列表不可为空, 示例值: ["ou_6yf8af6bgb9100449565764t3382b168"]
  }

  export interface SendUrgentPhoneMessageResp {
    invalid_user_id_list?: string[] // 无效的用户ID
  }

  export interface sendUrgentPhoneMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SendUrgentPhoneMessageResp
  }

  export interface SendRawMessageReq {
    receive_id_type: string // 消息接收者id类型 open_id/user_id/union_id/email/chat_id, 示例值: "open_id", 可选值有: `open_id`: 以open_id来识别用户([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id)), `user_id`: 以user_id来识别用户。需要有获取用户 userID的权限 ([什么是 User ID？](https://open.feishu.cn/document/home/user-identity-introduction/user-id)), `union_id`: 以union_id来识别用户([什么是 Union ID？](https://open.feishu.cn/document/home/user-identity-introduction/union-id)), `email`: 以email来识别用户。是用户的真实邮箱, `chat_id`: 以chat_id来识别群聊。群ID说明请参考: [群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description)
    receive_id: string // 依据receive_id_type的值, 填写对应的消息接收者id, 示例值: "ou_7d8a6e6df7621556ce0d21922b676706ccs"
    content: string // 消息内容, json结构序列化后的字符串。不同msg_type对应不同内容。消息类型 包括: text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等, 具体格式说明参考: [发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json), 示例值: "{\"text\":\"<at user_id=\\\"ou_155184d1e73cbfb8973e5a9e698e74f2\\\">Tom</at> test content\"}"
    msg_type: string // 消息类型 包括: text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等, 类型定义请参考[发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json), 示例值: "text"
  }

  export interface SendRawMessageResp {
    message_id: string // 消息id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    root_id: string // 根消息id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    parent_id: string // 父消息的id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    msg_type: string // 消息类型 包括: text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等, 类型定义请参考[发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)
    create_time: string // 消息生成的时间戳（毫秒）
    update_time: string // 消息更新的时间戳（毫秒）
    deleted: boolean // 消息是否被撤回
    updated: boolean // 消息是否被更新
    chat_id: string // 所属的群
    sender: SendRawMessageRespSender // 发送者, 可以是用户或应用
    body: SendRawMessageRespBody // 消息内容
    mentions?: SendRawMessageRespMention[] // 被@的用户或机器人的id列表
    upper_message_id: string // 合并转发消息中, 上一层级的消息id message_id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
  }

  export interface SendRawMessageRespBody {
    content: string // 消息内容, json结构序列化后的字符串。不同msg_type对应不同内容。消息类型 包括: text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等, 类型定义请参考: [发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)
  }

  export interface SendRawMessageRespMention {
    key: string // 被@的用户或机器人的序号。例如, 第3个被@到的成员, 值为“@_user_3”
    id: string // 被@的用户或者机器人的open_id
    id_type: string // 被@的用户或机器人 id 类型, 目前仅支持 `open_id` ([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id))
    name: string // 被@的用户或机器人的姓名
    tenant_key: string // 为租户在飞书上的唯一标识, 用来换取对应的tenant_access_token, 也可以用作租户在应用里面的唯一标识
  }

  export interface SendRawMessageRespSender {
    id: string // 该字段标识发送者的id
    id_type: string // 该字段标识发送者的id类型
    sender_type: string // 该字段标识发送者的类型
    tenant_key: string // 为租户在飞书上的唯一标识, 用来换取对应的tenant_access_token, 也可以用作租户在应用里面的唯一标识
  }

  export interface sendRawMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SendRawMessageResp
  }

  export interface SendRawMessageOldReq {
    open_id: string // 给用户发私聊消息, 只需要填 open_id([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id))、email（真实邮箱）、user_id([什么是 User ID？](https://open.feishu.cn/document/home/user-identity-introduction/user-id)) 中的一个即可, 向群里发消息使用群的 chat_id。服务端依次读取字段的顺序为 chat_id > open_id > user_id > email   ( user_id 对应V3接口的 employee_id, chat_id 对应V3的 open_chat_id )
    user_id: string // 给用户发私聊消息, 只需要填 open_id([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id))、email（真实邮箱）、user_id([什么是 User ID？](https://open.feishu.cn/document/home/user-identity-introduction/user-id)) 中的一个即可, 向群里发消息使用群的 chat_id。服务端依次读取字段的顺序为 chat_id > open_id > user_id > email   ( user_id 对应V3接口的 employee_id, chat_id 对应V3的 open_chat_id )
    email: string // 给用户发私聊消息, 只需要填 open_id([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id))、email（真实邮箱）、user_id([什么是 User ID？](https://open.feishu.cn/document/home/user-identity-introduction/user-id)) 中的一个即可, 向群里发消息使用群的 chat_id。服务端依次读取字段的顺序为 chat_id > open_id > user_id > email   ( user_id 对应V3接口的 employee_id, chat_id 对应V3的 open_chat_id )
    chat_id: string // 给用户发私聊消息, 只需要填 open_id([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id))、email（真实邮箱）、user_id([什么是 User ID？](https://open.feishu.cn/document/home/user-identity-introduction/user-id)) 中的一个即可, 向群里发消息使用群的 chat_id。服务端依次读取字段的顺序为 chat_id > open_id > user_id > email   ( user_id 对应V3接口的 employee_id, chat_id 对应V3的 open_chat_id )
    root_id?: string // 如果需要回复某条消息, 填对应消息的消息 ID
    msg_type: string // 消息类型, 此处固定填 "text"
    content: SendRawMessageOldReqContent // 消息内容
  }

  export interface SendRawMessageOldReqContent {
    text: string // 文本消息内容, 文本消息中可以 at 个人或全体成员 at 全体成员: <at user_id="all">  </at>   at 个人: <at user_id="ou_xxxxxxx"></at>, user_id 为用户 user_id或者open_id
    image_key: string // image_key 可以通过图片上传接口获得
    post?: any // 富文本消息
  }

  export interface SendRawMessageOldResp {
    message_id: string // 消息 ID
  }

  export interface sendRawMessageOldResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码描述
    data: SendRawMessageOldResp
  }

  export interface BatchSendOldRawMessageReq {
    msg_type: string // 消息类型, 支持多种消息类型, 详见下表。
    content?: any // 消息内容, 支持除卡片消息外的多种消息内容, 详见下表。
    card?: any // 卡片消息内容, 注意card和content必须二选一
    department_ids?: string[] // 支持[自定义部门ID](https://open.feishu.cn/document/ukTMukTMukTM/uYTM5UjL2ETO14iNxkTN/terminology#3c3e6267), 和open_department_id, 列表长度小于等于 200    注: 部门下的所有子部门包含的成员也会收到消息 示例值: ["3dceba33a33226", "d502aaa9514059", "od-5b91c9affb665451a16b90b4be367efa"]
    open_ids?: string[] // 用户 open_id 列表, 长度小于等于 200   示例值: ["ou_18eac85d35a26f989317ad4f02e8bbbb", "ou_461cf042d9eedaa60d445f26dc747d5e"]
    user_ids?: string[] // 用户 user_id 列表, 长度小于等于 200 （对应 V3 接口的 employee_ids ）  示例值: ["7cdcc7c2", "ca51d83b"]
    union_ids?: string[] // 用户 union_ids 列表, 长度小于等于 200   示例值: ["on_cad4860e7af114fb4ff6c5d496d1dd76", "on_gdcq860e7af114fb4ff6c5d496dabcet"]
  }

  export interface BatchSendOldRawMessageResp {
    message_id: string // 消息 ID
    invalid_department_ids?: string[] // 不合法的部门 ID 列表
    invalid_open_ids?: string[] // 不合法的 open_id 列表
    invalid_user_ids?: string[] // 不合法的 user_id 列表（对应V3接口的invalid_employee_ids）
    invalid_union_ids?: string[] // 不合法的 union_id 列表
  }

  export interface batchSendOldRawMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchSendOldRawMessageResp
  }

  export interface ReplyRawMessageReq {
    message_id: string // 待回复的消息的ID, 示例值: "om_dc13264520392913993dd051dba21dcf"
    content: string // 消息内容 json 格式, 格式说明参考: [发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json), 示例值: "{\"text\":\"<at user_id=\\\"ou_155184d1e73cbfb8973e5a9e698e74f2\\\">Tom</at> test content\"}"
    msg_type: string // 消息类型, 包括: text、post、image、file、audio、media、sticker、interactive、share_card、share_user, 示例值: "text"
  }

  export interface ReplyRawMessageResp {
    message_id: string // 消息id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    root_id: string // 根消息id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    parent_id: string // 父消息的id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    msg_type: string // 消息类型 包括: text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等, 类型定义请参考[发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)
    create_time: string // 消息生成的时间戳（毫秒）
    update_time: string // 消息更新的时间戳（毫秒）
    deleted: boolean // 消息是否被撤回
    updated: boolean // 消息是否被更新
    chat_id: string // 所属的群
    sender: ReplyRawMessageRespSender // 发送者, 可以是用户或应用
    body: ReplyRawMessageRespBody // 消息内容
    mentions?: ReplyRawMessageRespMention[] // 被@的用户或机器人的id列表
    upper_message_id: string // 合并转发消息中, 上一层级的消息id message_id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
  }

  export interface ReplyRawMessageRespBody {
    content: string // 消息内容, json结构序列化后的字符串。不同msg_type对应不同内容。消息类型 包括: text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等, 类型定义请参考: [发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)
  }

  export interface ReplyRawMessageRespMention {
    key: string // 被@的用户或机器人的序号。例如, 第3个被@到的成员, 值为“@_user_3”
    id: string // 被@的用户或者机器人的open_id
    id_type: string // 被@的用户或机器人 id 类型, 目前仅支持 `open_id` ([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id))
    name: string // 被@的用户或机器人的姓名
    tenant_key: string // 为租户在飞书上的唯一标识, 用来换取对应的tenant_access_token, 也可以用作租户在应用里面的唯一标识
  }

  export interface ReplyRawMessageRespSender {
    id: string // 该字段标识发送者的id
    id_type: string // 该字段标识发送者的id类型
    sender_type: string // 该字段标识发送者的类型
    tenant_key: string // 为租户在飞书上的唯一标识, 用来换取对应的tenant_access_token, 也可以用作租户在应用里面的唯一标识
  }

  export interface replyRawMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: ReplyRawMessageResp
  }

  export interface DeleteMessageReq {
    message_id: string // 待撤回的消息的ID, 示例值: "om_dc13264520392913993dd051dba21dcf"
  }

  export interface DeleteMessageResp {}

  export interface deleteMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteMessageResp
  }

  export interface BatchDeleteMessageReq {
    batch_message_id: string // 待撤回的批量消息的ID, 示例值: "bm-dc13264520392913993dd051dba21dcf"
  }

  export interface BatchDeleteMessageResp {}

  export interface batchDeleteMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchDeleteMessageResp
  }

  export interface UpdateMessageReq {
    message_id: string // 待更新的消息的ID, 示例值: "om_dc13264520392913993dd051dba21dcf"
    content: string // 消息内容 json 格式, [发送消息 content 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json), 参考文档中的卡片格式, 示例值: "参考链接"
  }

  export interface UpdateMessageResp {}

  export interface updateMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateMessageResp
  }

  export interface UpdateMessageDelayReq {
    token: string // 用于更新卡片的token, 不是tenant_access_token（可通过[卡片交互返回内容](https://open.feishu.cn/document/ukTMukTMukTM/uEzNwUjLxcDM14SM3ATN)获取）
    card: any // 消息卡片的描述内容, 具体参考[卡片结构](https://open.feishu.cn/document/ukTMukTMukTM/uEjNwUjLxYDM14SM2ATN)
  }

  export interface UpdateMessageDelayResp {}

  export interface updateMessageDelayResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码描述
    data: UpdateMessageDelayResp
  }

  export interface GetMessageReadUserListReq {
    message_id: string // 待查询的消息的ID, 请注意不支持查询批量消息, 示例值: "om_dc13264520392913993dd051dba21dcf"
    user_id_type: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    page_size?: number // 此次调用中使用的分页的大小, 示例值: 20, 取值范围: `1` ～ `100`
    page_token?: string // 下一页分页的token, 示例值: "GxmvlNRvP0NdQZpa7yIqf_Lv_QuBwTQ8tXkX7w-irAghVD_TvuYd1aoJ1LQph86O-XImC4X9j9FhUPhXQDvtrQ["
  }

  export interface GetMessageReadUserListResp {
    items?: GetMessageReadUserListRespItem[]
    has_more: boolean // 是否还有下一页
    page_token: string // 下一页分页的token
  }

  export interface GetMessageReadUserListRespItem {
    user_id_type: string // 用户id类型
    user_id: string // 用户id
    timestamp: string // 阅读时间
    tenant_key: string // tenant key
  }

  export interface getMessageReadUserListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMessageReadUserListResp
  }

  export interface GetBatchSentMessageReadUserReq {
    batch_message_id: string // 待查询的批量消息的ID, 示例值: "bm_dc13264520392913993dd051dba21dcf"
  }

  export interface GetBatchSentMessageReadUserResp {
    read_user: GetBatchSentMessageReadUserRespReadUser // 批量发送消息的用户阅读情况
  }

  export interface GetBatchSentMessageReadUserRespReadUser {
    read_count: string // 已读的人数
    total_count: number // 推送的总人数
  }

  export interface getBatchSentMessageReadUserResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBatchSentMessageReadUserResp
  }

  export interface GetBatchSentMessageProgressReq {
    batch_message_id: string // 待查询的批量消息的ID, 示例值: "bm-0b3d5d1b2df7c6d5dbd1abe2c91e2217"
  }

  export interface GetBatchSentMessageProgressResp {
    batch_message_send_progress?: GetBatchSentMessageProgressRespBatchMessageSendProgres[] // 消息发送进度
    batch_message_recall_progress?: GetBatchSentMessageProgressRespBatchMessageRecallProgres[] // 消息撤回进度
  }

  export interface GetBatchSentMessageProgressRespBatchMessageRecallProgres {
    recall: boolean // 该条批量消息是否被执行过撤回操作
    recall_count: number // 已经成功撤回的消息数量
  }

  export interface GetBatchSentMessageProgressRespBatchMessageSendProgres {
    valid_user_ids_count: number // 批量请求中有效的userid数量(包含机器人不可见用户), * 注: 当valid_user_ids_count为0有两种情况: 1. 批量任务还没有开始被调度（请等待一会再调用该接口）, 2. 批量发送消息时传入的所有openIDs、employeID、departmentiIDs都不包含有效的用户
    success_user_ids_count: number // 已经成功给用户发送成功的消息数量, * 注: 最终success_user_ids_count不一定等于valid_user_ids_count, 因为valid_user_ids_count包含了对机器人不可见的用户
    read_user_ids_count: number // 已读信息用户数量
  }

  export interface getBatchSentMessageProgressResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBatchSentMessageProgressResp
  }

  export interface GetMessageListReq {
    container_id_type: string // 容器类型, 目前可选值仅有"chat", 包含单聊（p2p）和群聊（group）, 示例值: "chat"
    container_id: string // 容器的id, 即chat的id, 示例值: "oc_234jsi43d3ssi993d43545f"
    start_time?: string // 历史信息的起始时间（秒级时间戳）, 示例值: "1609296809"
    end_time?: string // 历史信息的结束时间（秒级时间戳）, 示例值: "1608594809"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "GxmvlNRvP0NdQZpa7yIqf_Lv_QuBwTQ8tXkX7w-irAghVD_TvuYd1aoJ1LQph86O-XImC4X9j9FhUPhXQDvtrQ["
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
  }

  export interface GetMessageListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetMessageListRespItem[] // message[]
  }

  export interface GetMessageListRespItem {
    message_id: string // 消息id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    root_id: string // 根消息id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    parent_id: string // 父消息的id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    msg_type: string // 消息类型 包括: text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等, 类型定义请参考[发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)
    create_time: string // 消息生成的时间戳（毫秒）
    update_time: string // 消息更新的时间戳（毫秒）
    deleted: boolean // 消息是否被撤回
    updated: boolean // 消息是否被更新
    chat_id: string // 所属的群
    sender: GetMessageListRespItemSender // 发送者, 可以是用户或应用
    body: GetMessageListRespItemBody // 消息内容
    mentions?: GetMessageListRespItemMention[] // 被@的用户或机器人的id列表
    upper_message_id: string // 合并转发消息中, 上一层级的消息id message_id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
  }

  export interface GetMessageListRespItemBody {
    content: string // 消息内容, json结构序列化后的字符串。不同msg_type对应不同内容。消息类型 包括: text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等, 类型定义请参考: [发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)
  }

  export interface GetMessageListRespItemMention {
    key: string // 被@的用户或机器人的序号。例如, 第3个被@到的成员, 值为“@_user_3”
    id: string // 被@的用户或者机器人的open_id
    id_type: string // 被@的用户或机器人 id 类型, 目前仅支持 `open_id` ([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id))
    name: string // 被@的用户或机器人的姓名
    tenant_key: string // 为租户在飞书上的唯一标识, 用来换取对应的tenant_access_token, 也可以用作租户在应用里面的唯一标识
  }

  export interface GetMessageListRespItemSender {
    id: string // 该字段标识发送者的id
    id_type: string // 该字段标识发送者的id类型
    sender_type: string // 该字段标识发送者的类型
    tenant_key: string // 为租户在飞书上的唯一标识, 用来换取对应的tenant_access_token, 也可以用作租户在应用里面的唯一标识
  }

  export interface getMessageListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMessageListResp
  }

  export interface GetMessageFileReq {
    message_id: string // 待查询资源对应的消息ID, 示例值: "om_dc13264520392913993dd051dba21dcf"
    file_key: string // 待查询资源的key, 示例值: "file_456a92d6-c6ea-4de4-ac3f-7afcf44ac78g"
    type: string // 资源类型, 可选"image, file“； image对应消息中的 图片, 富文本消息中的图片。  file对应消息中的 文件、音频、视频、（表情包除外）, 示例值: "image"
  }

  export interface GetMessageFileResp {
    file: Buffer
  }

  export interface getMessageFileResp {
    code: number
    msg: string
    data: GetMessageFileResp
  }

  export interface GetMessageReq {
    message_id: string // 待获取消息内容的消息的ID, 示例值: "om_dc13264520392913993dd051dba21dcf"
  }

  export interface GetMessageResp {
    items?: GetMessageRespItem[] // --
  }

  export interface GetMessageRespItem {
    message_id: string // 消息id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    root_id: string // 根消息id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    parent_id: string // 父消息的id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
    msg_type: string // 消息类型 包括: text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等, 类型定义请参考[发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)
    create_time: string // 消息生成的时间戳（毫秒）
    update_time: string // 消息更新的时间戳（毫秒）
    deleted: boolean // 消息是否被撤回
    updated: boolean // 消息是否被更新
    chat_id: string // 所属的群
    sender: GetMessageRespItemSender // 发送者, 可以是用户或应用
    body: GetMessageRespItemBody // 消息内容
    mentions?: GetMessageRespItemMention[] // 被@的用户或机器人的id列表
    upper_message_id: string // 合并转发消息中, 上一层级的消息id message_id, 说明参见: [消息ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2)
  }

  export interface GetMessageRespItemBody {
    content: string // 消息内容, json结构序列化后的字符串。不同msg_type对应不同内容。消息类型 包括: text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等, 类型定义请参考: [发送消息content说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)
  }

  export interface GetMessageRespItemMention {
    key: string // 被@的用户或机器人的序号。例如, 第3个被@到的成员, 值为“@_user_3”
    id: string // 被@的用户或者机器人的open_id
    id_type: string // 被@的用户或机器人 id 类型, 目前仅支持 `open_id` ([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id))
    name: string // 被@的用户或机器人的姓名
  }

  export interface GetMessageRespItemSender {
    id: string // 该字段标识发送者的id
    id_type: string // 该字段标识发送者的id类型
    sender_type: string // 该字段标识发送者的类型
  }

  export interface getMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMessageResp
  }

  export interface DeleteEphemeralMessageReq {
    message_id: string // 临时消息ID
  }

  export interface DeleteEphemeralMessageResp {}

  export interface deleteEphemeralMessageResp {
    code: number
    msg: string
    data: DeleteEphemeralMessageResp
  }

  export interface CreateMessageReactionReq {
    message_id: string // 待添加reaction的消息ID, 示例值: "om_a8f2294ba1a38afaac9d"
    reaction_type: CreateMessageReactionReqReactionType // reaction资源类型
  }

  export interface CreateMessageReactionReqReactionType {
    emoji_type: string // emoji类型 [emoji类型列举](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/emojis-introduce), 示例值: "SMILE"
  }

  export interface CreateMessageReactionResp {
    reaction_id: string // reaction资源ID
    operator: CreateMessageReactionRespOperator // 添加reaction的操作人
    action_time: string // reaction动作的的unix timestamp(单位:ms)
    reaction_type: CreateMessageReactionRespReactionType // reaction资源类型
  }

  export interface CreateMessageReactionRespOperator {
    operator_id: string // 操作人ID
    operator_type: string // 操作人身份, 用户或应用, 可选值有: `app`: "app", `user`: "user"
  }

  export interface CreateMessageReactionRespReactionType {
    emoji_type: string // emoji类型 [emoji类型列举](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/emojis-introduce)
  }

  export interface createMessageReactionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateMessageReactionResp
  }

  export interface GetMessageReactionListReq {
    message_id: string // 待获取reaction的消息ID, 示例值: "om_8964d1b4*2b31383276113"
    reaction_type?: string // 待查询消息reaction的类型[emoji类型列举](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/emojis-introduce), 不传入该参数, 表示拉取所有类型reaction, 示例值: "LAUGH"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "YhljsPiGfUgnVAg9urvRFd-BvSqRL20wMZNAWfa9xXkud6UKCybPuUgQ1vM26dj6"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetMessageReactionListResp {
    items?: GetMessageReactionListRespItem[] // 查询指定reaction_type返回的reaction列表
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface GetMessageReactionListRespItem {
    reaction_id: string // reaction资源ID
    operator: GetMessageReactionListRespItemOperator // 添加reaction的操作人
    action_time: string // reaction动作的的unix timestamp(单位:ms)
    reaction_type: GetMessageReactionListRespItemReactionType // reaction资源类型
  }

  export interface GetMessageReactionListRespItemOperator {
    operator_id: string // 操作人ID
    operator_type: string // 操作人身份, 用户或应用, 可选值有: `app`: "app", `user`: "user"
  }

  export interface GetMessageReactionListRespItemReactionType {
    emoji_type: string // emoji类型 [emoji类型列举](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/emojis-introduce)
  }

  export interface getMessageReactionListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMessageReactionListResp
  }

  export interface DeleteMessageReactionReq {
    message_id: string // 待删除reaction的消息ID, 示例值: "om_8964d1b4*2b31383276113"
    reaction_id: string // 待删除reaction的资源id, 示例值: "ZCaCIjUBVVWSrm5L-3ZTw*sNa8dHVplEzzSfJVUVLMLcS_"
  }

  export interface DeleteMessageReactionResp {
    reaction_id: string // reaction资源ID
    operator: DeleteMessageReactionRespOperator // 添加reaction的操作人
    action_time: string // reaction动作的的unix timestamp(单位:ms)
    reaction_type: DeleteMessageReactionRespReactionType // reaction资源类型
  }

  export interface DeleteMessageReactionRespOperator {
    operator_id: string // 操作人ID
    operator_type: string // 操作人身份, 用户或应用, 可选值有: `app`: "app", `user`: "user"
  }

  export interface DeleteMessageReactionRespReactionType {
    emoji_type: string // emoji类型 [emoji类型列举](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/emojis-introduce)
  }

  export interface deleteMessageReactionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteMessageReactionResp
  }
}

class SendEphemeralMessageReq {
  chat_id?: any
  open_id?: any
  user_id?: any
  email?: any
  msg_type?: any
  card?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      chat_id: this.chat_id,
      open_id: this.open_id,
      user_id: this.user_id,
      email: this.email,
      msg_type: this.msg_type,
      card: this.card
    }
  }

  getPath(path: string) {
    return path
  }
}

class SendUrgentAppMessageReq {
  message_id?: any
  user_id_type?: any
  user_id_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id_list: this.user_id_list
    }
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SendUrgentSmsMessageReq {
  message_id?: any
  user_id_type?: any
  user_id_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id_list: this.user_id_list
    }
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SendUrgentPhoneMessageReq {
  message_id?: any
  user_id_type?: any
  user_id_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id_list: this.user_id_list
    }
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SendRawMessageReq {
  receive_id_type?: any
  receive_id?: any
  content?: any
  msg_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      receive_id: this.receive_id,
      content: this.content,
      msg_type: this.msg_type
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.receive_id_type !== undefined) {
      q['receive_id_type'] = this.receive_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SendRawMessageOldReq {
  open_id?: any
  user_id?: any
  email?: any
  chat_id?: any
  root_id?: any
  msg_type?: any
  content?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      open_id: this.open_id,
      user_id: this.user_id,
      email: this.email,
      chat_id: this.chat_id,
      root_id: this.root_id,
      msg_type: this.msg_type,
      content: this.content
    }
  }

  getPath(path: string) {
    return path
  }
}

class BatchSendOldRawMessageReq {
  msg_type?: any
  content?: any
  card?: any
  department_ids?: any
  open_ids?: any
  user_ids?: any
  union_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      msg_type: this.msg_type,
      content: this.content,
      card: this.card,
      department_ids: this.department_ids,
      open_ids: this.open_ids,
      user_ids: this.user_ids,
      union_ids: this.union_ids
    }
  }

  getPath(path: string) {
    return path
  }
}

class ReplyRawMessageReq {
  message_id?: any
  content?: any
  msg_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      content: this.content,
      msg_type: this.msg_type
    }
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)

    return path
  }
}

class DeleteMessageReq {
  message_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)

    return path
  }
}

class BatchDeleteMessageReq {
  batch_message_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':batch_message_id', this.batch_message_id)

    return path
  }
}

class UpdateMessageReq {
  message_id?: any
  content?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      content: this.content
    }
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)

    return path
  }
}

class UpdateMessageDelayReq {
  token?: any
  card?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      token: this.token,
      card: this.card
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetMessageReadUserListReq {
  message_id?: any
  user_id_type?: any
  page_size?: any
  page_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetBatchSentMessageReadUserReq {
  batch_message_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':batch_message_id', this.batch_message_id)

    return path
  }
}

class GetBatchSentMessageProgressReq {
  batch_message_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':batch_message_id', this.batch_message_id)

    return path
  }
}

class GetMessageListReq {
  container_id_type?: any
  container_id?: any
  start_time?: any
  end_time?: any
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
    if (this.container_id_type !== undefined) {
      q['container_id_type'] = this.container_id_type
    }
    if (this.container_id !== undefined) {
      q['container_id'] = this.container_id
    }
    if (this.start_time !== undefined) {
      q['start_time'] = this.start_time
    }
    if (this.end_time !== undefined) {
      q['end_time'] = this.end_time
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

class GetMessageFileReq {
  message_id?: any
  file_key?: any
  type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)
    path = path.replace(':file_key', this.file_key)

    const q = {} as { [key: string]: any }
    if (this.type !== undefined) {
      q['type'] = this.type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetMessageReq {
  message_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)

    return path
  }
}

class DeleteEphemeralMessageReq {
  message_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      message_id: this.message_id
    }
  }

  getPath(path: string) {
    return path
  }
}

class CreateMessageReactionReq {
  message_id?: any
  reaction_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      reaction_type: this.reaction_type
    }
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)

    return path
  }
}

class GetMessageReactionListReq {
  message_id?: any
  reaction_type?: any
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
    path = path.replace(':message_id', this.message_id)

    const q = {} as { [key: string]: any }
    if (this.reaction_type !== undefined) {
      q['reaction_type'] = this.reaction_type
    }
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

class DeleteMessageReactionReq {
  message_id?: any
  reaction_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':message_id', this.message_id)
    path = path.replace(':reaction_id', this.reaction_id)

    return path
  }
}
