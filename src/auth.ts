import { Lark } from './lark'
import { RawRequestReq, Response } from './request'

// tslint:disable:variable-name

export default class AuthService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal
  // https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token
  async getTenantAccessToken(): Promise<{
    data: Auth.TokenExpire,
    response: Response,
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

    const {
      data,
      response
    } = await this.cli.RawRequest<GetTenantAccessTokenReq, AuthPrivate.GetTenantAccessTokenResp>(req)
    return {
      data: {
        token: data.tenant_access_token,
        expire: data.expire
      }, response
    }
  }


  // docs: https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token_internal
// docs: https://open.feishu.cn/document/ukTMukTMukTM/uADN14CM0UjLwQTN
  async getAppAccessToken(): Promise<{
    data: Auth.TokenExpire,
    response: Response,
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

    const {
      data,
      response
    } = await this.cli.RawRequest<GetTenantAccessTokenReq, AuthPrivate.GetTenantAccessTokenResp>(req)
    return {
      data: {
        token: data.app_access_token,
        expire: data.expire
      }, response
    }
  }
}

export declare namespace Auth {
  export class TokenExpire {
    token: string
    expire: number
  }
}

declare namespace AuthPrivate {
  interface GetTenantAccessTokenResp {
    code: number
    msg: string
    tenant_access_token: string
    app_access_token: string
    expire: number
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
}
