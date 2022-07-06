import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class AuthService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // resendAppTicket 飞书每隔 1 小时会给应用推送一次最新的 app_ticket, 应用也可以主动调用此接口, 触发飞书进行及时的重新推送。（该接口并不能直接获取app_ticket, 而是触发事件推送）
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_ticket_resend
  async resendAppTicket(
    request: Auth.ResendAppTicketReq
  ): Promise<{
    data: Auth.ResendAppTicketResp
    response: Response
  }> {
    const req: RawRequestReq<ResendAppTicketReq> = {
      scope: 'Auth',
      api: 'ResendAppTicket',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/auth/v3/app_ticket/resend',
      body: new ResendAppTicketReq(request),
      method_option: false
    }
    return this.cli.RawRequest<ResendAppTicketReq, Auth.ResendAppTicketResp>(req)
  }
  // getAccessToken 获取登录预授权码 code 对应的登录用户身份。
  //
  // 该接口仅适用于通过[第三方网站免登](https://open.feishu.cn/document/ukTMukTMukTM/uETOwYjLxkDM24SM5AjN)文档中的登录方式获取的预授权码, 小程序登录中用户身份的获取, 请使用[小程序 code2session 接口](https://open.feishu.cn/document/uYjL24iN/ukjM04SOyQjL5IDN)
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/authen/access_token
  async getAccessToken(
    request: Auth.GetAccessTokenReq
  ): Promise<{
    data: Auth.GetAccessTokenResp
    response: Response
  }> {
    const req: RawRequestReq<GetAccessTokenReq> = {
      scope: 'Auth',
      api: 'GetAccessToken',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/authen/v1/access_token',
      body: new GetAccessTokenReq(request),
      method_option: false,
      need_app_accessToken: true
    }
    return this.cli.RawRequest<GetAccessTokenReq, Auth.GetAccessTokenResp>(req)
  }
  // refreshAccessToken user_access_token 具有一定的时效性, 默认最长有效期为7200秒。该接口用于在 user_access_token 过期时用 refresh_token 重新获取 access_token。此时会返回新的 refresh_token, 再次刷新 access_token 时需要使用新的 refresh_token。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/authen/refresh_access_token
  async refreshAccessToken(
    request: Auth.RefreshAccessTokenReq
  ): Promise<{
    data: Auth.RefreshAccessTokenResp
    response: Response
  }> {
    const req: RawRequestReq<RefreshAccessTokenReq> = {
      scope: 'Auth',
      api: 'RefreshAccessToken',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/authen/v1/refresh_access_token',
      body: new RefreshAccessTokenReq(request),
      method_option: false,
      need_app_accessToken: true
    }
    return this.cli.RawRequest<RefreshAccessTokenReq, Auth.RefreshAccessTokenResp>(req)
  }
  // getUserInfo 通过 user_access_token 获取登录用户的信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/authen/user_info
  async getUserInfo(
    request: Auth.GetUserInfoReq
  ): Promise<{
    data: Auth.GetUserInfoResp
    response: Response
  }> {
    const req: RawRequestReq<GetUserInfoReq> = {
      scope: 'Auth',
      api: 'GetUserInfo',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/authen/v1/user_info',
      body: new GetUserInfoReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetUserInfoReq, Auth.GetUserInfoResp>(req)
  }

  // https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal
  // https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token
  async getTenantAccessToken(): Promise<{
    data: Auth.TokenExpire
    response: Response
  }> {
    const req: RawRequestReq<GetTenantAccessTokenReq> = {
      scope: 'Auth',
      api: 'GetTenantAccessToken',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/auth/v3/tenant_access_token/internal',
      body: new GetTenantAccessTokenReq({
        app_id: this.cli.appID,
        app_secret: this.cli.appSecret
      })
    }
    if (this.cli.isISV) {
      const appTokenResp = await this.getAppAccessToken()
      req.url = this.cli.openBaseURL + '/open-apis/auth/v3/tenant_access_token'
      req.body = new GetTenantAccessTokenReq({
        app_access_token: appTokenResp.data.token,
        tenant_key: this.cli.tenantKey
      })
    }

    const { data, response } = await this.cli.RawRequest<
      GetTenantAccessTokenReq,
      Auth.GetTenantAccessTokenResp
    >(req)
    return {
      data: {
        token: data.tenant_access_token,
        expire: data.expire
      },
      response
    }
  }

  // docs: https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token_internal
  // docs: https://open.feishu.cn/document/ukTMukTMukTM/uADN14CM0UjLwQTN
  async getAppAccessToken(): Promise<{
    data: Auth.TokenExpire
    response: Response
  }> {
    const req: RawRequestReq<GetTenantAccessTokenReq> = {
      scope: 'Auth',
      api: 'GetAppAccessToken',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/auth/v3/app_access_token/internal',
      body: new GetTenantAccessTokenReq({
        app_id: this.cli.appID,
        app_secret: this.cli.appSecret
      })
    }
    if (this.cli.isISV) {
      req.url = this.cli.openBaseURL + '/open-apis/auth/v3/app_access_token'
      req.body = new GetTenantAccessTokenReq({
        app_id: this.cli.appID,
        app_secret: this.cli.appSecret,
        app_ticket: await this.getAppTicket()
      })
    }

    const { data, response } = await this.cli.RawRequest<
      GetTenantAccessTokenReq,
      Auth.GetTenantAccessTokenResp
    >(req)
    return {
      data: {
        token: data.app_access_token,
        expire: data.expire
      },
      response
    }
  }

  async getAppTicket(): Promise<string> {
    const res = await this.cli.store?.get(genISVAppTicketKey(this.cli.appID || ''))
    return (res && res.val) || ''
  }

  async setAppTicket(appTicket: string): Promise<void> {
    await this.cli.store?.set(genISVAppTicketKey(this.cli.appID || ''), appTicket, 7200)
  }
}

export declare namespace Auth {
  export interface ResendAppTicketReq {
    app_id: string // 应用唯一标识, 创建应用后获得, 示例值: "cli_slkdjalasdkjasd"
    app_secret: string // 应用秘钥, 创建应用后获得, 示例值: "dskLLdkasdjlasdKK"
  }

  export interface ResendAppTicketResp {}

  export interface resendAppTicketResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: ResendAppTicketResp
  }

  export interface GetAccessTokenReq {
    grant_type: string // 授权类型, 本流程中, 此值为: "authorization_code", 示例值: "authorization_code"
    code: string // 来自[请求身份验证](https://open.feishu.cn/document/ukTMukTMukTM/ukzN4UjL5cDO14SO3gTN)流程, 用户扫码登录后会自动302到redirect_uri并带上此参数, 示例值: "xMSldislSkdK"
  }

  export interface GetAccessTokenResp {
    access_token: string // user_access_token, 用于获取用户资源
    token_type: string // token 类型
    expires_in: number // access_token 的有效期, 单位: 秒
    name: string // 用户姓名
    en_name: string // 用户英文名称
    avatar_url: string // 用户头像
    avatar_thumb: string // 用户头像 72x72
    avatar_middle: string // 用户头像 240x240
    avatar_big: string // 用户头像 640x640
    open_id: string // 用户在应用内的唯一标识
    union_id: string // 用户统一ID
    email: string // 用户邮箱, 字段权限要求: 获取用户邮箱信息
    enterprise_email: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 字段权限要求（满足任一）: 获取用户雇佣信息
    user_id: string // 用户 user_id, 字段权限要求: 获取用户 user ID
    mobile: string // 用户手机号, 字段权限要求: 获取用户手机号
    tenant_key: string // 当前企业标识
    refresh_expires_in: number // refresh_token 的有效期, 单位: 秒
    refresh_token: string // 刷新用户 access_token 时使用的 token
  }

  export interface getAccessTokenResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAccessTokenResp
  }

  export interface RefreshAccessTokenReq {
    grant_type: string // 授权类型, 本流程中, 此值为: "refresh_token", 示例值: "refresh_token"
    refresh_token: string // 来自[获取登录用户身份](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/authen/access_token) 或 本接口返回值, 示例值: "ur-oQ0mMq6MCcueAv0pwx2fQQhxqv__CbLu6G8ySFwafeKww2Def2BJdOkW3.9gCFM.LBQgFri901QaqeuL"
  }

  export interface RefreshAccessTokenResp {
    access_token: string // user_access_token, 用于获取用户资源
    token_type: string // token 类型
    expires_in: number // access_token 的有效期, 单位: 秒
    name: string // 用户姓名
    en_name: string // 用户英文名称
    avatar_url: string // 用户头像
    avatar_thumb: string // 用户头像 72x72
    avatar_middle: string // 用户头像 240x240
    avatar_big: string // 用户头像 640x640
    open_id: string // 用户在应用内的唯一标识
    union_id: string // 用户统一ID
    email: string // 用户邮箱, 字段权限要求: 获取用户邮箱信息
    user_id: string // 用户 user_id, 字段权限要求: 获取用户 user ID
    mobile: string // 用户手机号, 字段权限要求: 获取用户手机号
    tenant_key: string // 当前企业标识
    refresh_expires_in: number // refresh_token 的有效期, 单位: 秒
    refresh_token: string // 刷新用户 access_token 时使用的 token
  }

  export interface refreshAccessTokenResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: RefreshAccessTokenResp
  }

  export interface GetUserInfoReq {}

  export interface GetUserInfoResp {
    name: string // 用户姓名
    en_name: string // 用户英文名称
    avatar_url: string // 用户头像
    avatar_thumb: string // 用户头像 72x72
    avatar_middle: string // 用户头像 240x240
    avatar_big: string // 用户头像 640x640
    open_id: string // 用户在应用内的唯一标识
    union_id: string // 用户对ISV的唯一标识, 对于同一个ISV, 用户在其名下所有应用的union_id相同
    email: string // 用户邮箱, 字段权限要求: 获取用户邮箱信息
    enterprise_email: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 字段权限要求（满足任一）: 获取用户雇佣信息
    user_id: string // 用户 user_id, 字段权限要求: 获取用户 user ID
    mobile: string // 用户手机号, 字段权限要求: 获取用户手机号
    tenant_key: string // 当前企业标识
  }

  export interface getUserInfoResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetUserInfoResp
  }

  export class TokenExpire {
    token: string
    expire: number
  }

  interface GetTenantAccessTokenResp {
    code: number
    msg: string
    tenant_access_token: string
    app_access_token: string
    expire: number
  }
}

class ResendAppTicketReq {
  app_id?: any
  app_secret?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      app_id: this.app_id,
      app_secret: this.app_secret
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetAccessTokenReq {
  grant_type?: any
  code?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      grant_type: this.grant_type,
      code: this.code
    }
  }

  getPath(path: string) {
    return path
  }
}

class RefreshAccessTokenReq {
  grant_type?: any
  refresh_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      grant_type: this.grant_type,
      refresh_token: this.refresh_token
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetUserInfoReq {
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

class GetTenantAccessTokenReq {
  app_id?: string
  app_secret?: string
  app_access_token?: string
  tenant_key?: string
  app_ticket?: string

  constructor(props: {
    app_id?: string
    app_secret?: string
    app_access_token?: string
    tenant_key?: string
    app_ticket?: string
  }) {
    this.app_id = props.app_id
    this.app_secret = props.app_secret
    this.app_access_token = props.app_access_token
    this.tenant_key = props.tenant_key
    this.app_ticket = props.app_ticket
  }

  getBody() {
    return {
      app_id: this.app_id,
      app_secret: this.app_secret,
      app_access_token: this.app_access_token,
      tenant_key: this.tenant_key,
      app_ticket: this.app_ticket
    }
  }

  getPath(path: string) {
    return path
  }
}

const genTenantTokenKey = (isISV: boolean, appID: string, tenantKey: string): string => {
  if (isISV) {
    return 'isv-tenant-token:' + appID + '-' + tenantKey
  }
  return 'internal-tenant-token:' + appID
}

const genAppTokenKey = (isISV: boolean, appID: string): string => {
  if (isISV) {
    return 'isv-app-token:' + appID
  }
  return 'internal-app-token:' + appID
}

const genISVAppTicketKey = (appID: string): string => {
  return 'isv-app-ticket:' + appID
}
