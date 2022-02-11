// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

import BotService from './bot'
import { Response } from './request'

interface LarkOption {
  appID?: string
  appSecret?: string

  encryptKey?: string
  verificationToken?: string
}

export class Lark {
  public openBaseURL: string

  private appID?: string
  private appSecret?: string

  private encryptKey?: string
  private verificationToken?: string

  bot: BotService

  constructor(option: LarkOption) {
    this.openBaseURL = ''

    this.appID = option.appID
    this.appSecret = option.appSecret

    this.encryptKey = option.encryptKey
    this.verificationToken = option.verificationToken

    this.bot = new BotService({ lark: this })
  }

  public async RawRequest<T, K>(req: T): Promise<{
    data: K,
    response: Response,
  }> {
    // @ts-ignore
    return { data: null, response: {} }
  }
}
