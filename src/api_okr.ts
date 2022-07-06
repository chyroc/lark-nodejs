import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class OKRService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getOKRPeriodList - 当前仅支持「飞书OKR 企业版」客户使用本接口。[了解更多](https://okr.feishu.cn/price)
  //
  // - 获取OKR周期列表
  // 使用tenant_access_token需要额外申请权限以应用身份访问OKR信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/list
  async getOKRPeriodList(
    request: OKR.GetOKRPeriodListReq
  ): Promise<{
    data: OKR.GetOKRPeriodListResp
    response: Response
  }> {
    const req: RawRequestReq<GetOKRPeriodListReq> = {
      scope: 'OKR',
      api: 'GetOKRPeriodList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/okr/v1/periods',
      body: new GetOKRPeriodListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetOKRPeriodListReq, OKR.GetOKRPeriodListResp>(req)
  }
  // batchGetOKR - 当前仅支持「飞书OKR 企业版」客户使用本接口。[了解更多](https://okr.feishu.cn/price)
  //
  // - 根据OKR id批量获取OKR
  // 使用tenant_access_token需要额外申请权限以应用身份访问OKR信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/okr/batch_get
  async batchGetOKR(
    request: OKR.BatchGetOKRReq
  ): Promise<{
    data: OKR.BatchGetOKRResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetOKRReq> = {
      scope: 'OKR',
      api: 'BatchGetOKR',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/okr/v1/okrs/batch_get',
      body: new BatchGetOKRReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchGetOKRReq, OKR.BatchGetOKRResp>(req)
  }
  // getUserOKRList - 当前仅支持「飞书OKR 企业版」客户使用本接口。[了解更多](https://okr.feishu.cn/price)
  //
  // - 根据用户的id获取OKR列表
  // 使用tenant_access_token需要额外申请权限以应用身份访问OKR信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/user-okr/list
  async getUserOKRList(
    request: OKR.GetUserOKRListReq
  ): Promise<{
    data: OKR.GetUserOKRListResp
    response: Response
  }> {
    const req: RawRequestReq<GetUserOKRListReq> = {
      scope: 'OKR',
      api: 'GetUserOKRList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/okr/v1/users/:user_id/okrs',
      body: new GetUserOKRListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetUserOKRListReq, OKR.GetUserOKRListResp>(req)
  }
}

export declare namespace OKR {
  export interface GetOKRPeriodListReq {
    page_token?: string // 分页标志page_token, 示例值: "xaasdasdax"
    page_size?: number // 分页大小, 默认10, 示例值: 10, 默认值: `10`
  }

  export interface GetOKRPeriodListResp {
    page_token: string // 分页标志
    has_more: boolean // 是否有更多
    items?: GetOKRPeriodListRespItem[] // 数据项
  }

  export interface GetOKRPeriodListRespItem {
    id: string // id
    zh_name: string // 中文名称
    en_name: string // 英文名称
    status: number // 启用状态, 可选值有: `0`: 正常状态, `1`: 暂不处理, `2`: 标记失效, `3`: 隐藏周期
  }

  export interface getOKRPeriodListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetOKRPeriodListResp
  }

  export interface BatchGetOKRReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, `people_admin_id`: 以people_admin_id来识别用户, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    okr_ids?: string[] // OKR ID 列表, 最多10个, 示例值: 7043693679567028244, 最大长度: `10`
    lang?: string // 请求OKR的语言版本（比如@的人名）, lang=en_us/zh_cn, 请求 Query中, 示例值: "zh_cn", 默认值: `zh_cn`
  }

  export interface BatchGetOKRResp {
    okr_list?: BatchGetOKRRespOKR[] // OKR 列表
  }

  export interface BatchGetOKRRespOKR {
    id: string // id
    permission: number // OKR的访问权限, 可选值有: `0`: 此时OKR只返回id, `1`: 返回OKR的其他具体字段
    period_id: string // period_id
    name: string // 名称
    objective_list?: BatchGetOKRRespOKRObjective[] // Objective列表
    confirm_status: number // OKR确认状态, 可选值有: `0`: 未填写 OKR, `1`: 已填写未发起确认, `2`: 已发起待上级确认, `3`: 上级未通过, `4`: 上级已通过
  }

  export interface BatchGetOKRRespOKRObjective {
    id: string // Objective ID
    permission: number // 权限, 可选值有: `0`: 此时OKR只返回id, `1`: 返回OKR的其他具体字段
    content: string // Objective 内容
    progress_report: string // Objective 进度记录内容
    score: number // Objective 分数（0 - 100）
    weight: number // Objective的权重（0 - 100）
    progress_rate: BatchGetOKRRespOKRObjectiveProgressRate // Objective进度
    kr_list?: BatchGetOKRRespOKRObjectiveKr[] // Objective KeyResult 列表
    aligned_objective_list?: BatchGetOKRRespOKRObjectiveAlignedObjective[] // 对齐到该Objective的Objective列表
    aligning_objective_list?: BatchGetOKRRespOKRObjectiveAligningObjective[] // 该Objective对齐到的Objective列表
    progress_record_list?: BatchGetOKRRespOKRObjectiveProgressRecord[] // 该Objective的进度列表
    progress_rate_percent_last_updated_time: string // 最后一次进度百分比更新时间 毫秒
    progress_rate_status_last_updated_time: string // 最后一次状态更新时间 毫秒
    progress_record_last_updated_time: string // 最后一次在侧边栏新增或者编辑进展的时间 毫秒
    progress_report_last_updated_time: string // 最后一次编辑进展记录/备注的时间 毫秒
    score_last_updated_time: string // 最后一次打分更新时间 毫秒
    deadline: string // 截止时间 毫秒
    mentioned_user_list?: BatchGetOKRRespOKRObjectiveMentionedUser[] // 该Objective提到的人员列表
  }

  export interface BatchGetOKRRespOKRObjectiveAlignedObjective {
    id: string // Objective的ID
    okr_id: string // OKR的ID
    owner: BatchGetOKRRespOKRObjectiveAlignedObjectiveOwner // 该Objective的Owner
  }

  export interface BatchGetOKRRespOKRObjectiveAlignedObjectiveOwner {
    open_id: string // 用户的 open_id
    user_id: string // 用户的 user_id
  }

  export interface BatchGetOKRRespOKRObjectiveAligningObjective {
    id: string // Objective的ID
    okr_id: string // OKR的ID
    owner: BatchGetOKRRespOKRObjectiveAligningObjectiveOwner // 该Objective的Owner
  }

  export interface BatchGetOKRRespOKRObjectiveAligningObjectiveOwner {
    open_id: string // 用户的 open_id
    user_id: string // 用户的 user_id
  }

  export interface BatchGetOKRRespOKRObjectiveKr {
    id: string // Key Result ID
    content: string // KeyResult 内容
    score: number // KeyResult打分（0 - 100）
    weight: number // KeyResult权重（0 - 100）（废弃）
    kr_weight: number // KeyResult的权重（0 - 100）
    progress_rate: BatchGetOKRRespOKRObjectiveKrProgressRate // KR进度
    progress_record_list?: BatchGetOKRRespOKRObjectiveKrProgressRecord[] // 该KR的进度列表
    progress_rate_percent_last_updated_time: string // 最后一次进度百分比更新时间 毫秒
    progress_rate_status_last_updated_time: string // 最后一次状态更新时间 毫秒
    progress_record_last_updated_time: string // 最后一次在侧边栏新增或者编辑进展的时间 毫秒
    progress_report_last_updated_time: string // 最后一次编辑进展记录/备注的时间 毫秒
    score_last_updated_time: string // 最后一次打分更新时间 毫秒
    deadline: string // 截止时间 毫秒
    mentioned_user_list?: BatchGetOKRRespOKRObjectiveKrMentionedUser[] // 该Objective提到的人员列表
  }

  export interface BatchGetOKRRespOKRObjectiveKrMentionedUser {
    open_id: string // 用户的 open_id
    user_id: string // 用户的 user_id
  }

  export interface BatchGetOKRRespOKRObjectiveKrProgressRate {
    percent: number // Objective 进度百分比 >= 0
    status: string // Objective 进度状态, 可选值有: `-1`: 未更新, `0`: 正常, `1`: 有风险, `2`: 已延期
  }

  export interface BatchGetOKRRespOKRObjectiveKrProgressRecord {
    id: string // OKR 进展记录ID
  }

  export interface BatchGetOKRRespOKRObjectiveMentionedUser {
    open_id: string // 用户的 open_id
    user_id: string // 用户的 user_id
  }

  export interface BatchGetOKRRespOKRObjectiveProgressRate {
    percent: number // Objective 进度百分比 >= 0
    status: string // Objective 进度状态, 可选值有: `-1`: 未更新, `0`: 正常, `1`: 有风险, `2`: 已延期
  }

  export interface BatchGetOKRRespOKRObjectiveProgressRecord {
    id: string // OKR 进展记录ID
  }

  export interface batchGetOKRResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchGetOKRResp
  }

  export interface GetUserOKRListReq {
    user_id: string // 目标用户id, 示例值: "ou-asdasdasdasdasd"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, `people_admin_id`: 以people_admin_id来识别用户, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    offset: string // 请求列表的偏移, offset>=0, 示例值: "0"
    limit: string // 列表长度, 0-10, 示例值: "5"
    lang?: string // 请求OKR的语言版本（比如@的人名）, lang=en_us/zh_cn, 示例值: "zh_cn", 默认值: `zh_cn`
    period_ids?: string[] // period_id列表, 最多10个, 示例值: ["6951461264858777132"], 最大长度: `10`
  }

  export interface GetUserOKRListResp {
    total: number // OKR周期总数
    okr_list?: GetUserOKRListRespOKR[] // OKR 列表
  }

  export interface GetUserOKRListRespOKR {
    id: string // id
    permission: number // OKR的访问权限, 可选值有: `0`: 此时OKR只返回id, `1`: 返回OKR的其他具体字段
    period_id: string // period_id
    name: string // 名称
    objective_list?: GetUserOKRListRespOKRObjective[] // Objective列表
    confirm_status: number // OKR确认状态, 可选值有: `0`: 未填写 OKR, `1`: 已填写未发起确认, `2`: 已发起待上级确认, `3`: 上级未通过, `4`: 上级已通过
  }

  export interface GetUserOKRListRespOKRObjective {
    id: string // Objective ID
    permission: number // 权限, 可选值有: `0`: 此时OKR只返回id, `1`: 返回OKR的其他具体字段
    content: string // Objective 内容
    progress_report: string // Objective 进度记录内容
    score: number // Objective 分数（0 - 100）
    weight: number // Objective的权重（0 - 100）
    progress_rate: GetUserOKRListRespOKRObjectiveProgressRate // Objective进度
    kr_list?: GetUserOKRListRespOKRObjectiveKr[] // Objective KeyResult 列表
    aligned_objective_list?: GetUserOKRListRespOKRObjectiveAlignedObjective[] // 对齐到该Objective的Objective列表
    aligning_objective_list?: GetUserOKRListRespOKRObjectiveAligningObjective[] // 该Objective对齐到的Objective列表
    progress_record_list?: GetUserOKRListRespOKRObjectiveProgressRecord[] // 该Objective的进度列表
    progress_rate_percent_last_updated_time: string // 最后一次进度百分比更新时间 毫秒
    progress_rate_status_last_updated_time: string // 最后一次状态更新时间 毫秒
    progress_record_last_updated_time: string // 最后一次在侧边栏新增或者编辑进展的时间 毫秒
    progress_report_last_updated_time: string // 最后一次编辑进展记录/备注的时间 毫秒
    score_last_updated_time: string // 最后一次打分更新时间 毫秒
    deadline: string // 截止时间 毫秒
    mentioned_user_list?: GetUserOKRListRespOKRObjectiveMentionedUser[] // 该Objective提到的人员列表
  }

  export interface GetUserOKRListRespOKRObjectiveAlignedObjective {
    id: string // Objective的ID
    okr_id: string // OKR的ID
    owner: GetUserOKRListRespOKRObjectiveAlignedObjectiveOwner // 该Objective的Owner
  }

  export interface GetUserOKRListRespOKRObjectiveAlignedObjectiveOwner {
    open_id: string // 用户的 open_id
    user_id: string // 用户的 user_id
  }

  export interface GetUserOKRListRespOKRObjectiveAligningObjective {
    id: string // Objective的ID
    okr_id: string // OKR的ID
    owner: GetUserOKRListRespOKRObjectiveAligningObjectiveOwner // 该Objective的Owner
  }

  export interface GetUserOKRListRespOKRObjectiveAligningObjectiveOwner {
    open_id: string // 用户的 open_id
    user_id: string // 用户的 user_id
  }

  export interface GetUserOKRListRespOKRObjectiveKr {
    id: string // Key Result ID
    content: string // KeyResult 内容
    score: number // KeyResult打分（0 - 100）
    weight: number // KeyResult权重（0 - 100）（废弃）
    kr_weight: number // KeyResult的权重（0 - 100）
    progress_rate: GetUserOKRListRespOKRObjectiveKrProgressRate // KR进度
    progress_record_list?: GetUserOKRListRespOKRObjectiveKrProgressRecord[] // 该KR的进度列表
    progress_rate_percent_last_updated_time: string // 最后一次进度百分比更新时间 毫秒
    progress_rate_status_last_updated_time: string // 最后一次状态更新时间 毫秒
    progress_record_last_updated_time: string // 最后一次在侧边栏新增或者编辑进展的时间 毫秒
    progress_report_last_updated_time: string // 最后一次编辑进展记录/备注的时间 毫秒
    score_last_updated_time: string // 最后一次打分更新时间 毫秒
    deadline: string // 截止时间 毫秒
    mentioned_user_list?: GetUserOKRListRespOKRObjectiveKrMentionedUser[] // 该Objective提到的人员列表
  }

  export interface GetUserOKRListRespOKRObjectiveKrMentionedUser {
    open_id: string // 用户的 open_id
    user_id: string // 用户的 user_id
  }

  export interface GetUserOKRListRespOKRObjectiveKrProgressRate {
    percent: number // Objective 进度百分比 >= 0
    status: string // Objective 进度状态, 可选值有: `-1`: 未更新, `0`: 正常, `1`: 有风险, `2`: 已延期
  }

  export interface GetUserOKRListRespOKRObjectiveKrProgressRecord {
    id: string // OKR 进展记录ID
  }

  export interface GetUserOKRListRespOKRObjectiveMentionedUser {
    open_id: string // 用户的 open_id
    user_id: string // 用户的 user_id
  }

  export interface GetUserOKRListRespOKRObjectiveProgressRate {
    percent: number // Objective 进度百分比 >= 0
    status: string // Objective 进度状态, 可选值有: `-1`: 未更新, `0`: 正常, `1`: 有风险, `2`: 已延期
  }

  export interface GetUserOKRListRespOKRObjectiveProgressRecord {
    id: string // OKR 进展记录ID
  }

  export interface getUserOKRListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetUserOKRListResp
  }
}

class GetOKRPeriodListReq {
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchGetOKRReq {
  user_id_type?: any
  okr_ids?: any
  lang?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.okr_ids !== undefined) {
      q['okr_ids'] = this.okr_ids
    }
    if (this.lang !== undefined) {
      q['lang'] = this.lang
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetUserOKRListReq {
  user_id?: any
  user_id_type?: any
  offset?: any
  limit?: any
  lang?: any
  period_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':user_id', this.user_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.offset !== undefined) {
      q['offset'] = this.offset
    }
    if (this.limit !== undefined) {
      q['limit'] = this.limit
    }
    if (this.lang !== undefined) {
      q['lang'] = this.lang
    }
    if (this.period_ids !== undefined) {
      q['period_ids'] = this.period_ids
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}
