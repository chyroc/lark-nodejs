import { Lark } from './lark'
import { RawRequestReq, Response } from './request'

export default class BotService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uAjMxEjLwITMx4CMyETM
  async getBotInfo(request: Bot.GetBotInfoReq): Promise<{
    data: Bot.GetBotInfoResp,
    response: Response,
  }> {
    const req: RawRequestReq<GetBotInfoReq> = {
      scope: 'Bot',
      api: 'GetBotInfo',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/bot/v3/info',
      body: new GetBotInfoReq(),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetBotInfoReq, Bot.GetBotInfoResp>(req)
  }
}

export declare namespace Bot {
  export interface GetBotInfoReq {
  }

  export interface GetBotInfoResp {
    activate_status: number
    app_name: string
    avatar_url: string
    ip_white_list: string[]
    open_id: string
  }
}

class GetBotInfoReq {
  getBody() {
    return {}
  }
}
