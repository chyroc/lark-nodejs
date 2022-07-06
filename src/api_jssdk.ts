import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class JssdkService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getJssdkTicket 通过在你的网页中引入飞书网页组件, 可在你的网页中直接使用飞书的功能。
  //
  // - 网页组件只适用于自建应用, 暂不支持商店应用。
  // - 网页组件适用于普通web网页, 不建议在小程序webview中调用此组件
  // ## 准备工作
  // - 在开发者后台[创建一个企业自建应用](https://open.feishu.cn/document/home/introduction-to-custom-app-development/self-built-application-development-process)。
  // - 引入组件库。在网页 html 中引入如下代码:
  // ```html
  // <script src="https://lf1-cdn-tos.bytegoofy.com/goofy/locl/lark/external_js_sdk/h5-js-sdk-1.1.2.js"></script>
  // ```
  // ::: warning
  // 若要使用成员卡片组件, SDK需要在`<body>`加载后引入。
  //
  // doc: https://open.feishu.cn/document/uYjL24iN/uUDO3YjL1gzN24SN4cjN
  async getJssdkTicket(
    request: Jssdk.GetJssdkTicketReq
  ): Promise<{
    data: Jssdk.GetJssdkTicketResp
    response: Response
  }> {
    const req: RawRequestReq<GetJssdkTicketReq> = {
      scope: 'Jssdk',
      api: 'GetJssdkTicket',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/jssdk/ticket/get',
      body: new GetJssdkTicketReq(request),
      method_option: false,
      need_app_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetJssdkTicketReq, Jssdk.GetJssdkTicketResp>(req)
  }
}

export declare namespace Jssdk {
  export interface GetJssdkTicketReq {}

  export interface GetJssdkTicketResp {
    expire_in: number // jsapi_ticket 的有效时间
    ticket: string // jsapi_ticket
  }

  export interface getJssdkTicketResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 对返回码的文本描述
    data: GetJssdkTicketResp // 返回内容
  }
}

class GetJssdkTicketReq {
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
