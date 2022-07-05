import BotService from './bot'
import AuthService from './auth'
import { RawRequestReq, RequestBody, Response } from './request'
import axios, { AxiosInstance } from 'axios'

class LarkError extends Error {
  scope: string
  api: string
  code: number
  msg: string

  constructor(scope: string, api: string, code: number, msg: string) {
    super(`${scope}#${api} ${code}: ${msg}`)

    this.scope = scope
    this.api = api
    this.code = code
    this.msg = msg
  }
}

interface LarkOption {
  appID?: string
  appSecret?: string

  encryptKey?: string
  verificationToken?: string
}

export class Lark {
  public openBaseURL: string

  public appID?: string
  public appSecret?: string

  private encryptKey?: string
  private verificationToken?: string

  private httpClient: AxiosInstance

  bot: BotService
  auth: AuthService

  constructor(option: LarkOption) {
    this.openBaseURL = 'https://open.feishu.cn'

    this.appID = option.appID
    this.appSecret = option.appSecret

    this.encryptKey = option.encryptKey
    this.verificationToken = option.verificationToken

    this.httpClient = axios.create({
      maxRedirects: 0,
      validateStatus: function() {
        return true
      }
    })
    // this.httpClient.interceptors.response.

    this.auth = new AuthService({ lark: this })
    this.bot = new BotService({ lark: this })
  }

  public async RawRequest<T extends RequestBody, K>(req: RawRequestReq<T>): Promise<{
    data: K,
    response: Response,
  }> {
    console.log(`[DEBUG] ${req.scope}#${req.api}`, req)
    const headers = {} as { [key: string]: string }
    if (req.need_tenant_accessToken) {
      const { data } = await this.auth.getTenantAccessToken()
      headers['Authorization'] = `Bearer ${data.token}`
    } else if (req.need_app_accessToken) {
      const { data } = await this.auth.getAppAccessToken()
      headers['Authorization'] = `Bearer ${data.token}`
    }
    const body = req.body?.getBody()
    const res = await this.httpClient.request({
      method: req.method,
      url: req.url,
      headers,
      data: body
    })
    const data = res.data
    if (data.code !== 0) {
      throw new LarkError(req.scope, req.api, data.code, data.msg)
    }
    console.log('res', res.data)

    if (req.api === 'GetBotInfo' && res.data.bot) {
      // @ts-ignore
      return { data: res.data.bot, response: {} }
    } else if (res.data.data) {
      // @ts-ignore
      return { data: res.data.data, response: {} }
    }

    // @ts-ignore
    return { data: res.data, response: {} }
  }
}
