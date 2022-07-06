import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class EventService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getEventOutboundIpList 飞书开放平台向应用配置的回调地址推送事件时, 是通过特定的IP发送出去的。如果企业需要做防火墙配置, 那么可以通过这个接口获取到所有相关的IP段。
  //
  // IP段有变更可能, 建议企业每隔6小时定时拉取IP段更新防火墙设置, 这样因IP变更导致推送失败的事件还可以通过重试解决。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-v1/outbound_ip/list
  async getEventOutboundIpList(
    request: Event.GetEventOutboundIpListReq
  ): Promise<{
    data: Event.GetEventOutboundIpListResp
    response: Response
  }> {
    const req: RawRequestReq<GetEventOutboundIpListReq> = {
      scope: 'Event',
      api: 'GetEventOutboundIpList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/event/v1/outbound_ip',
      body: new GetEventOutboundIpListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetEventOutboundIpListReq, Event.GetEventOutboundIpListResp>(req)
  }
}

export declare namespace Event {
  export interface GetEventOutboundIpListReq {
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xxx"
  }

  export interface GetEventOutboundIpListResp {
    ip_list?: string[] // outbound ip
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface getEventOutboundIpListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetEventOutboundIpListResp
  }
}

class GetEventOutboundIpListReq {
  page_size?: any
  page_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
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
