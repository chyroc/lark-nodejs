import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class BotService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getBotInfo 获取机器人的基本信息。
  //
  // 需要启用机器人能力（前往[开发者后台](https://open.feishu.cn/app) - 选择你要获取信息的应用 - 导航栏点击应用功能 - 机器人, 开启机器人能力并发布后即可。）
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uAjMxEjLwITMx4CMyETM
  async getBotInfo(
    request: Bot.GetBotInfoReq
  ): Promise<{
    data: Bot.GetBotInfoResp
    response: Response
  }> {
    const req: RawRequestReq<GetBotInfoReq> = {
      scope: 'Bot',
      api: 'GetBotInfo',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/bot/v3/info',
      body: new GetBotInfoReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetBotInfoReq, Bot.GetBotInfoResp>(req)
  }
  // addBotToChat 为了更好地提升该接口的安全性, 我们对其进行了升级, 请尽快迁移至[新版本>>](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/create)
  //
  // 拉机器人进群
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYDO04iN4QjL2gDN
  async addBotToChat(
    request: Bot.AddBotToChatReq
  ): Promise<{
    data: Bot.AddBotToChatResp
    response: Response
  }> {
    const req: RawRequestReq<AddBotToChatReq> = {
      scope: 'Bot',
      api: 'AddBotToChat',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/bot/v4/add',
      body: new AddBotToChatReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<AddBotToChatReq, Bot.AddBotToChatResp>(req)
  }
}

export declare namespace Bot {
  export interface GetBotInfoReq {}

  export interface GetBotInfoResp {
    activate_status: number // app 当前状态, 0: 初始化, 租户待安装, 1: 租户停用, 2: 租户启用, 3: 安装后待启用, 4: 升级待启用, 5: license过期停用, 6: Lark套餐到期或降级停用
    app_name: string // app 名称
    avatar_url: string // app 图像地址
    ip_white_list?: string[] // app 的 IP 白名单地址
    open_id: string // 机器人的open_id
  }

  export interface getBotInfoResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    bot: GetBotInfoResp // 机器人信息
  }

  export interface AddBotToChatReq {
    chat_id: string // 群的id
  }

  export interface AddBotToChatResp {}

  export interface addBotToChatResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码描述
    data: AddBotToChatResp
  }
}

class GetBotInfoReq {
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

class AddBotToChatReq {
  chat_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      chat_id: this.chat_id
    }
  }

  getPath(path: string) {
    return path
  }
}
