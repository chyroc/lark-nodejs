import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class PassportService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getPassportSession 该接口用于查询用户的登录信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/passport-v1/session/query
  async getPassportSession(
    request: Passport.GetPassportSessionReq
  ): Promise<{
    data: Passport.GetPassportSessionResp
    response: Response
  }> {
    const req: RawRequestReq<GetPassportSessionReq> = {
      scope: 'Passport',
      api: 'GetPassportSession',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/passport/v1/sessions/query',
      body: new GetPassportSessionReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetPassportSessionReq, Passport.GetPassportSessionResp>(req)
  }
}

export declare namespace Passport {
  export interface GetPassportSessionReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_ids?: string[] // 用户 ID, 示例值: ["47f621ff"], 最大长度: `100`
  }

  export interface GetPassportSessionResp {
    mask_sessions?: GetPassportSessionRespMaskSession[] // 用户登录信息
  }

  export interface GetPassportSessionRespMaskSession {
    create_time: string // 创建时间
    terminal_type: number // 客户端类型, 可选值有: `0`: 未知, `1`: 个人电脑, `2`: 浏览器, `3`: 安卓手机, `4`: Apple手机, `5`: 服务端
    user_id: string // 用户ID
  }

  export interface getPassportSessionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetPassportSessionResp
  }
}

class GetPassportSessionReq {
  user_id_type?: any
  user_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_ids: this.user_ids
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
