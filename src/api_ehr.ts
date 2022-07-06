import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class EHRService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getEHREmployeeList 根据员工飞书用户 ID / 员工状态 / 雇员类型等搜索条件, 批量获取员工花名册字段信息。字段包括「系统标准字段 / system_fields」和「自定义字段 / custom_fields」
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/employee/list
  async getEHREmployeeList(
    request: EHR.GetEHREmployeeListReq
  ): Promise<{
    data: EHR.GetEHREmployeeListResp
    response: Response
  }> {
    const req: RawRequestReq<GetEHREmployeeListReq> = {
      scope: 'EHR',
      api: 'GetEHREmployeeList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/ehr/v1/employees',
      body: new GetEHREmployeeListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetEHREmployeeListReq, EHR.GetEHREmployeeListResp>(req)
  }
  // downloadEHRAttachments 根据文件 token 下载文件。
  //
  // 调用 「批量获取员工花名册信息」接口的返回值中, 「文件」类型的字段 id, 即是文件 token
  // ![image.png](//sf1-ttcdn-tos.pstatp.com/obj/open-platform-opendoc/bed391d2a8ce6ed2d5985ea69bf92850_9GY1mnuDXP.png)
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/attachment/get
  async downloadEHRAttachments(
    request: EHR.DownloadEHRAttachmentsReq
  ): Promise<{
    data: EHR.DownloadEHRAttachmentsResp
    response: Response
  }> {
    const req: RawRequestReq<DownloadEHRAttachmentsReq> = {
      scope: 'EHR',
      api: 'DownloadEHRAttachments',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/ehr/v1/attachments/:token',
      body: new DownloadEHRAttachmentsReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file_download: true
    }
    return this.cli.RawRequest<DownloadEHRAttachmentsReq, EHR.DownloadEHRAttachmentsResp>(req)
  }
}

export declare namespace EHR {
  export interface GetEHREmployeeListReq {
    view?: string // 返回数据类型, 示例值: "basic", 可选值有: `basic`: 概览, 只返回 id、name 等基本信息, `full`: 明细, 返回系统标准字段和自定义字段集合
    status?: number[] // 员工状态, 不传代表查询所有员工状态, 实际在职 = 2&4, 可同时查询多个状态的记录, 如 status=2&status=4, 示例值: 2, 可选值有: `1`: 待入职, `2`: 在职, `3`: 已取消入职, `4`: 待离职, `5`: 已离职
    type?: number[] // 雇员类型, 不传代表查询所有雇员类型, 示例值: 1, 可选值有: `1`: 全职, `2`: 实习, `3`: 顾问, `4`: 外包, `5`: 劳务
    start_time?: string // 查询开始时间（创建时间 >= 此时间）, 示例值: "1608690517811"
    end_time?: string // 查询结束时间（创建时间 <= 此时间）, 示例值: "1608690517811"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_ids?: string[] // user_id、open_id 或 union_id, 默认为 open_id, 如果传入的值不是 open_id, 需要一并传入 user_id_type 参数, 可一次查询多个 id 的用户, 例如: user_ids=ou_8ebd4f35d7101ffdeb4771d7c8ec517e&user_ids=ou_7abc4f35d7101ffdeb4771dabcde, [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: ou_8ebd4f35d7101ffdeb4771d7c8ec517e, 最大长度: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "10"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetEHREmployeeListResp {
    items?: GetEHREmployeeListRespItem[] // 员工列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetEHREmployeeListRespItem {
    user_id: string // 员工的用户 ID, user_id_type 为 user_id 时返回 user_id；, user_id_type 为 open_id 时返回 open_id；, user_id_type 为 union_id 时返回 union_id；, 「待入职」和「已取消入职」的员工, 此字段值为 null
    system_fields: GetEHREmployeeListRespItemSystemFields // 系统字段
    custom_fields?: GetEHREmployeeListRespItemCustomField[] // 自定义字段
  }

  export interface GetEHREmployeeListRespItemCustomField {
    key: string // 自定义字段key
    label: string // 自定义字段名称
    type: string // 自定义字段类型, 可选值有: `text`: 文本类型, `date`: 日期类型, 如 2020-01-01, `option`: 枚举类型, `file`: 附件类型
    value: string // 根据 type 不同, 结构不同, 不同 type 对应的数据结构在 type 的枚举值中有描述
  }

  export interface GetEHREmployeeListRespItemSystemFields {
    name: string // 中文姓名
    en_name: string // 英文姓名
    email: string // 邮箱
    mobile: string // 手机号码
    department_id: string // 部门的飞书 open_department_id
    manager: GetEHREmployeeListRespItemSystemFieldsManager // 上级
    job: GetEHREmployeeListRespItemSystemFieldsJob // 职位
    job_level: GetEHREmployeeListRespItemSystemFieldsJobLevel // 职级
    work_location: GetEHREmployeeListRespItemSystemFieldsWorkLocation // 工作地点
    gender: number // 性别, 可选值有: `1`: 男, `2`: 女
    birthday: string // 出生日期
    native_region: GetEHREmployeeListRespItemSystemFieldsNativeRegion // 籍贯
    ethnicity: number // 民族, 可选值有: `1`: 汉族, `2`: 蒙古族, `3`: 回族, `4`: 藏族, `5`: 维吾尔族, `6`: 苗族, `7`: 彝族, `8`: 壮族, `9`: 布依族, `10`: 朝鲜族, `11`: 满族, `12`: 侗族, `13`: 瑶族, `14`: 白族, `15`: 土家族, `16`: 哈尼族, `17`: 哈萨克族, `18`: 傣族, `19`: 黎族, `20`: 傈僳族, `21`: 佤族, `22`: 畲族, `23`: 高山族, `24`: 拉祜族, `25`: 水族, `26`: 东乡族, `27`: 纳西族, `28`: 景颇族, `29`: 阿昌族, `30`: 柯尔克孜族, `31`: 土族, `32`: 达斡尔族, `33`: 仫佬族, `34`: 羌族, `35`: 布朗族, `36`: 撒拉族, `37`: 毛南族, `38`: 仡佬族, `39`: 锡伯族, `40`: 普米族, `41`: 塔吉克族, `42`: 怒族, `43`: 乌孜别克族, `44`: 俄罗斯族, `45`: 鄂温克族, `46`: 德昂族, `47`: 保安族, `48`: 裕固族, `49`: 京族, `50`: 塔塔尔族, `51`: 独龙族, `52`: 鄂伦春族, `53`: 赫哲族, `54`: 门巴族, `55`: 珞巴族, `56`: 基诺族, `57`: 其他
    marital_status: number // 婚姻状况, 可选值有: `1`: 未婚, `2`: 已婚, `3`: 离异, `4`: 其他
    political_status: number // 政治面貌, 可选值有: `1`: 中共党员, `2`: 中国农工民主党, `3`: 中国国民党革命委员会, `4`: 中国民主促进会会员, `5`: 中国民主同盟成员, `6`: 中国民主建国会, `7`: 中国致公党党员, `8`: 九三学社社员, `9`: 共青团员, `10`: 其它党派成员, `11`: 民主人士, `12`: 群众
    entered_workforce_date: string // 参加工作日期
    id_type: number // 证件类型, 可选值有: `1`: 居民身份证, `2`: 港澳居民来往内地通行证, `3`: 台湾居民来往大陆通行证, `4`: 护照, `5`: 其他
    id_number: string // 证件号
    hukou_type: number // 户口类型, 可选值有: `1`: 本市城镇, `2`: 外埠城镇, `3`: 本市农村, `4`: 外埠农村
    hukou_location: string // 户口所在地
    bank_account_number: string // 银行卡号
    bank_name: string // 开户行
    social_security_account: string // 社保账号
    provident_fund_account: string // 公积金账号
    employee_no: string // 工号
    employee_type: number // 雇员类型, 可选值有: `1`: 全职, `2`: 实习, `3`: 顾问, `4`: 外包, `5`: 劳务
    status: number // 员工状态, 可选值有: `1`: 待入职, `2`: 在职, `3`: 已取消入职, `4`: 待离职, `5`: 已离职
    hire_date: string // 入职日期
    probation_months: number // 试用期（月）
    conversion_date: string // 转正日期
    application: number // 转正申请, 可选值有: `1`: 未申请, `2`: 审批中, `3`: 被驳回, `4`: 已通过
    application_status: number // 转正状态, 可选值有: `1`: 无需转正, `2`: 待转正, `3`: 已转正
    last_day: string // 离职日期
    departure_type: number // 离职类型, 可选值有: `1`: 主动, `2`: 被动
    departure_reason: number // 离职原因, 可选值有: `1`: 身体、家庭原因, `2`: 职业发展, `3`: 薪资福利不满意, `4`: 工作压力大, `5`: 合同到期不续签, `6`: 其他, `7`: 无法胜任工作, `8`: 组织业务调整和岗位优化, `9`: 违反公司条例, `10`: 试用期未通过, `11`: 其他
    departure_notes: string // 离职备注
    contract_company: GetEHREmployeeListRespItemSystemFieldsContractCompany // 合同公司
    contract_type: number // 合同类型, 可选值有: `1`: 固定期限劳动合同, `2`: 无固定期限劳动合同, `3`: 实习协议, `4`: 外包协议, `5`: 劳务派遣合同, `6`: 返聘协议, `7`: 其他
    contract_start_date: string // 合同开始日期
    contract_expiration_date: string // 合同到期日期
    contract_sign_times: number // 劳动合同签订次数
    personal_email: string // 个人邮箱
    family_address: string // 家庭地址
    primary_emergency_contact: GetEHREmployeeListRespItemSystemFieldsPrimaryEmergencyContact // 主要紧急联系人
    emergency_contact?: GetEHREmployeeListRespItemSystemFieldsEmergencyContact[] // 紧急联系人
    highest_level_of_edu: GetEHREmployeeListRespItemSystemFieldsHighestLevelOfEdu // 最高学历
    education?: GetEHREmployeeListRespItemSystemFieldsEducation[] // 教育经历
    former_work_exp: GetEHREmployeeListRespItemSystemFieldsFormerWorkExp // 前工作经历
    work_exp?: GetEHREmployeeListRespItemSystemFieldsWorkExp[] // 工作经历
    id_photo_po_side?: GetEHREmployeeListRespItemSystemFieldsIDPhotoPoSide[] // 身份证照片（人像面）
    id_photo_em_side?: GetEHREmployeeListRespItemSystemFieldsIDPhotoEmSide[] // 身份证照片（国徽面）
    id_photo?: GetEHREmployeeListRespItemSystemFieldsIDPhoto[] // 证件照
    diploma_photo?: GetEHREmployeeListRespItemSystemFieldsDiplomaPhoto[] // 学位证书
    graduation_cert?: GetEHREmployeeListRespItemSystemFieldsGraduationCert[] // 毕业证书
    cert_of_merit?: GetEHREmployeeListRespItemSystemFieldsCertOfMerit[] // 奖励证明
    offboarding_file?: GetEHREmployeeListRespItemSystemFieldsOffboardingFile[] // 离职证明
    cancel_onboarding_reason: number // 取消入职原因, 可选值有: `1`: 个人原因, `2`: 原单位留任, `3`: 接受其他 Offer, `4`: 其他
    cancel_onboarding_notes: string // 取消入职备注
    employee_form_status: number // 入职登记表状态, 可选值有: `1`: 未发送, `2`: 待提交, `3`: 已提交
    create_time: number // 创建时间
    update_time: number // 更新时间
  }

  export interface GetEHREmployeeListRespItemSystemFieldsCertOfMerit {
    id: string // 下载文件所需要的 Token
    mime_type: string // 文件类型
    name: string // 名称
    size: number // 大小
  }

  export interface GetEHREmployeeListRespItemSystemFieldsContractCompany {
    id: number // 公司 ID
    name: string // 公司名称
  }

  export interface GetEHREmployeeListRespItemSystemFieldsDiplomaPhoto {
    id: string // 下载文件所需要的 Token
    mime_type: string // 文件类型
    name: string // 名称
    size: number // 大小
  }

  export interface GetEHREmployeeListRespItemSystemFieldsEducation {
    level: number // 学历, 可选值有: `1`: 小学, `2`: 初中, `3`: 高中, `4`: 职业高级中学, `5`: 中等专业学校, `6`: 大专, `7`: 本科, `8`: 硕士, `9`: 博士
    school: string // 毕业学校
    major: string // 专业
    degree: number // 学位, 可选值有: `1`: 学士, `2`: 硕士, `3`: 博士
    start: string // 开始日期
    end: string // 结束日期
  }

  export interface GetEHREmployeeListRespItemSystemFieldsEmergencyContact {
    name: string // 紧急联系人姓名
    relationship: number // 与紧急联系人的关系, 可选值有: `1`: 父母, `2`: 配偶, `3`: 子女, `4`: 兄弟姐妹, `5`: 朋友, `6`: 其他
    mobile: string // 手机号
  }

  export interface GetEHREmployeeListRespItemSystemFieldsFormerWorkExp {
    company: string // 公司
    department: string // 部门
    job: string // 职位
    start: string // 开始日期
    end: string // 截止日期
    description: string // 工作描述
  }

  export interface GetEHREmployeeListRespItemSystemFieldsGraduationCert {
    id: string // 下载文件所需要的 Token
    mime_type: string // 文件类型
    name: string // 名称
    size: number // 大小
  }

  export interface GetEHREmployeeListRespItemSystemFieldsHighestLevelOfEdu {
    level: number // 学历, 可选值有: `1`: 小学, `2`: 初中, `3`: 高中, `4`: 职业高级中学, `5`: 中等专业学校, `6`: 大专, `7`: 本科, `8`: 硕士, `9`: 博士
    school: string // 毕业学校
    major: string // 专业
    degree: number // 学位, 可选值有: `1`: 学士, `2`: 硕士, `3`: 博士
    start: string // 开始日期
    end: string // 结束日期
  }

  export interface GetEHREmployeeListRespItemSystemFieldsIDPhoto {
    id: string // 下载文件所需要的 Token
    mime_type: string // 文件类型
    name: string // 名称
    size: number // 大小
  }

  export interface GetEHREmployeeListRespItemSystemFieldsIDPhotoEmSide {
    id: string // 下载文件所需要的 Token
    mime_type: string // 文件类型
    name: string // 名称
    size: number // 大小
  }

  export interface GetEHREmployeeListRespItemSystemFieldsIDPhotoPoSide {
    id: string // 下载文件所需要的 Token
    mime_type: string // 文件类型
    name: string // 名称
    size: number // 大小
  }

  export interface GetEHREmployeeListRespItemSystemFieldsJob {
    id: number // 职位 ID
    name: string // 职位名称
  }

  export interface GetEHREmployeeListRespItemSystemFieldsJobLevel {
    id: number // 职级 ID
    name: string // 职级名称
  }

  export interface GetEHREmployeeListRespItemSystemFieldsManager {
    user_id: string // 上级的用户 ID（user_id）
    name: string // 中文名
    en_name: string // 英文名
  }

  export interface GetEHREmployeeListRespItemSystemFieldsNativeRegion {
    iso_code: string // ISO 编码
    name: string // 名称
  }

  export interface GetEHREmployeeListRespItemSystemFieldsOffboardingFile {
    id: string // 下载文件所需要的 Token
    mime_type: string // 文件类型
    name: string // 名称
    size: number // 大小
  }

  export interface GetEHREmployeeListRespItemSystemFieldsPrimaryEmergencyContact {
    name: string // 紧急联系人姓名
    relationship: number // 与紧急联系人的关系, 可选值有: `1`: 父母, `2`: 配偶, `3`: 子女, `4`: 兄弟姐妹, `5`: 朋友, `6`: 其他
    mobile: string // 手机号
  }

  export interface GetEHREmployeeListRespItemSystemFieldsWorkExp {
    company: string // 公司
    department: string // 部门
    job: string // 职位
    start: string // 开始日期
    end: string // 截止日期
    description: string // 工作描述
  }

  export interface GetEHREmployeeListRespItemSystemFieldsWorkLocation {
    id: number // 工作地点 ID
    name: string // 工作地点名称
  }

  export interface getEHREmployeeListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetEHREmployeeListResp
  }

  export interface DownloadEHRAttachmentsReq {
    token: string // 文件 token, 示例值: "09bf7b924f9a4a69875788891b5970d8"
  }

  export interface DownloadEHRAttachmentsResp {
    file: Buffer
  }

  export interface downloadEHRAttachmentsResp {
    code: number
    msg: string
    data: DownloadEHRAttachmentsResp
  }
}

class GetEHREmployeeListReq {
  view?: any
  status?: any
  type?: any
  start_time?: any
  end_time?: any
  user_id_type?: any
  user_ids?: any
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
    if (this.view !== undefined) {
      q['view'] = this.view
    }
    if (this.status !== undefined) {
      q['status'] = this.status
    }
    if (this.type !== undefined) {
      q['type'] = this.type
    }
    if (this.start_time !== undefined) {
      q['start_time'] = this.start_time
    }
    if (this.end_time !== undefined) {
      q['end_time'] = this.end_time
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.user_ids !== undefined) {
      q['user_ids'] = this.user_ids
    }
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

class DownloadEHRAttachmentsReq {
  token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':token', this.token)

    return path
  }
}
