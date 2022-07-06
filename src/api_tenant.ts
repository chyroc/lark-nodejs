import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class TenantService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getTenant 获取企业名称、企业编号等企业信息
  //
  // 如果ISV应用是企业创建时默认安装, 并且180天内企业未打开或使用过此应用, 则无法通过此接口获取到企业信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant/query
  async getTenant(
    request: Tenant.GetTenantReq
  ): Promise<{
    data: Tenant.GetTenantResp
    response: Response
  }> {
    const req: RawRequestReq<GetTenantReq> = {
      scope: 'Tenant',
      api: 'GetTenant',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/tenant/v2/tenant/query',
      body: new GetTenantReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetTenantReq, Tenant.GetTenantResp>(req)
  }
}

export declare namespace Tenant {
  export interface GetTenantReq {}

  export interface GetTenantResp {
    tenant: GetTenantRespTenant // 企业信息
  }

  export interface GetTenantRespTenant {
    name: string // 企业名称
    display_id: string // 企业编号, 平台内唯一
    tenant_tag: number // 个人版/团队版标志, 可选值有: `0`: 团队版, `2`: 个人版
    tenant_key: string // 企业标识
    avatar: GetTenantRespTenantAvatar // 企业头像
  }

  export interface GetTenantRespTenantAvatar {
    avatar_origin: string // 企业头像
    avatar_72: string // 企业头像 72x72
    avatar_240: string // 企业头像 240x240
    avatar_640: string // 企业头像 640x640
  }

  export interface getTenantResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetTenantResp
  }
}

class GetTenantReq {
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
