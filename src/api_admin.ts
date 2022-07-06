import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class AdminService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // adminResetPassword 重置用户的企业邮箱密码, 仅当用户的邮箱和企业邮箱(别名)一致时生效, 可用于处理飞书企业邮箱登录死锁的问题。
  //
  // 邮箱死锁: 当用户的登录凭证与飞书企业邮箱一致时, 目前飞书登录流程要求用户输入验证码, 由于飞书邮箱无单独的帐号体系, 则未登录时无法收取邮箱验证码, 即陷入死锁
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/password/reset
  async adminResetPassword(
    request: Admin.AdminResetPasswordReq
  ): Promise<{
    data: Admin.AdminResetPasswordResp
    response: Response
  }> {
    const req: RawRequestReq<AdminResetPasswordReq> = {
      scope: 'Admin',
      api: 'AdminResetPassword',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/admin/v1/password/reset',
      body: new AdminResetPasswordReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<AdminResetPasswordReq, Admin.AdminResetPasswordResp>(req)
  }
  // getAdminDeptStats 该接口用于获取部门维度的用户活跃和功能使用数据, 即IM（即时通讯）、日历、云文档、音视频会议功能的使用数据。
  //
  // - 只有企业自建应用才有权限调用此接口
  // - 当天的数据会在第二天的早上九点半产出（UTC+8）
  // - 部门维度的数据最多查询最近366天（包含366天）的数据
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_dept_stat/list
  async getAdminDeptStats(
    request: Admin.GetAdminDeptStatsReq
  ): Promise<{
    data: Admin.GetAdminDeptStatsResp
    response: Response
  }> {
    const req: RawRequestReq<GetAdminDeptStatsReq> = {
      scope: 'Admin',
      api: 'GetAdminDeptStats',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/admin/v1/admin_dept_stats',
      body: new GetAdminDeptStatsReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetAdminDeptStatsReq, Admin.GetAdminDeptStatsResp>(req)
  }
  // getAdminUserStats 用于获取用户维度的用户活跃和功能使用数据, 即IM（即时通讯）、日历、云文档、音视频会议功能的使用数据。
  //
  // - 只有企业自建应用才有权限调用此接口
  // - 当天的数据会在第二天的早上九点半产出（UTC+8）
  // - 用户维度的数据最多查询最近31天的数据（包含31天）的数据
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_user_stat/list
  async getAdminUserStats(
    request: Admin.GetAdminUserStatsReq
  ): Promise<{
    data: Admin.GetAdminUserStatsResp
    response: Response
  }> {
    const req: RawRequestReq<GetAdminUserStatsReq> = {
      scope: 'Admin',
      api: 'GetAdminUserStats',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/admin/v1/admin_user_stats',
      body: new GetAdminUserStatsReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetAdminUserStatsReq, Admin.GetAdminUserStatsResp>(req)
  }
}

export declare namespace Admin {
  export interface AdminResetPasswordReq {
    user_id_type: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    password: AdminResetPasswordReqPassword // 需要重置的密码参数, 不少于8个字符, 字母、数字和符号, 至少三选二
    user_id: string // 待修改密码的用户ID, 只针对邮箱登录凭证与企业邮箱(包括别名)相等的用户生效, 示例值: "abc123", 长度范围: `0` ～ `200` 字符
  }

  export interface AdminResetPasswordReqPassword {
    ent_email_password: string // 企业邮箱密码, 示例值: "abcd*efg"
  }

  export interface AdminResetPasswordResp {}

  export interface adminResetPasswordResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: AdminResetPasswordResp
  }

  export interface GetAdminDeptStatsReq {
    department_id_type: string // 部门ID类型, 示例值: "open_department_id", 可选值有: `department_id`: 部门的 ID, `open_department_id`: 部门的 Open ID
    start_date: string // 起始日期（包含）, 格式是YYYY-mm-dd, 示例值: "2020-02-15"
    end_date: string // 终止日期（包含）, 格式是YYYY-mm-dd, 起止日期之间相差不能超过91天（包含91天）, 示例值: "2020-02-15"
    department_id: string // 部门的 ID, 取决于department_id_type, 仅支持根部门及其下前4级子部门, 示例值: "od-382e2793cfc9471f892e8a672987654c"
    contains_child_dept: boolean // 是否包含子部门, 如果该值为false, 则只查出本部门直属用户活跃和功能使用数据；如果该值为true, 则查出该部门以及其子部门（子部门层级最多不超过根部门下的前4级）的用户活跃和功能使用数据, 示例值: false
    page_size?: number // 分页大小, 默认是10, 示例值: 10, 取值范围: `1` ～ `20`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；当返回的has_more为true时, 会返回新的page_token, 再次调用接口, 传入这个page_token, 将获得下一页数据, 示例值: "2"
  }

  export interface GetAdminDeptStatsResp {
    has_more: boolean // 分页查询时返回, 代表是否还有更多数据
    page_token: string // 分页标记, 下一页分页的token
    items?: GetAdminDeptStatsRespItem[] // 数据报表
  }

  export interface GetAdminDeptStatsRespItem {
    date: string // 日期
    department_id: string // 部门的department_id 或者open_department_id
    department_name: string // 部门名字
    department_path: string // 部门路径
    total_user_num: number // 部门总人数
    active_user_num: number // 激活人数
    active_user_rate: string // 激活率
    suite_dau: number // 活跃人数
    suite_active_rate: string // 活跃率
    new_user_num: number // 新用户数
    new_active_num: number // 新激活数
    resign_user_num: number // 离职人数
    im_dau: number // 消息活跃人数
    send_messenger_user_num: number // 发送消息人数
    send_messenger_num: number // 发送消息数
    avg_send_messenger_num: string // 人均发送消息数
    docs_dau: number // 云文档活跃人数
    create_docs_user_num: number // 创建文件人数
    create_docs_num: number // 创建文件数
    avg_create_docs_num: string // 人均创建文件数
    cal_dau: number // 日历活跃人数
    create_cal_user_num: number // 创建日程人数
    create_cal_num: number // 创建日程数
    avg_create_cal_num: string // 人均创建日程数
    vc_dau: number // 音视频会议活跃人数
    vc_duration: number // 会议时长（分钟）
    avg_vc_duration: string // 人均会议时长（分钟）
    avg_duration: string // 人均飞书使用时长（分钟）
    task_dau: number // 任务活跃人数
    create_task_user_num: number // 创建任务人数
    create_task_num: number // 创建任务数
    avg_create_task_num: string // 人均创建任务数
  }

  export interface getAdminDeptStatsResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAdminDeptStatsResp
  }

  export interface GetAdminUserStatsReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 部门ID类型, 示例值: "open_department_id", 可选值有: `department_id`: 部门的 ID, `open_department_id`: 部门的 Open ID
    start_date: string // 起始日期（包含）, 格式是YYYY-mm-dd, 示例值: "2020-02-15"
    end_date: string // 终止日期（包含）, 格式是YYYY-mm-dd。起止日期之间相差不能超过31天（包含31天）, 示例值: "2020-02-15"
    department_id?: string // 部门的 ID, 取决于department_id_type, 示例值: "od-382e2793cfc9471f892e8a672987654c"
    user_id?: string // 用户的open_id, user_id或者union_id, 取决于user_id_type, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    page_size?: number // 分页大小, 默认是10, 示例值: 10, 取值范围: `1` ～ `20`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；当返回的has_more为true时, 会返回新的page_token, 再次调用接口, 传入这个page_token, 将获得下一页数据, 示例值: "2"
  }

  export interface GetAdminUserStatsResp {
    has_more: boolean // 是否有下一页数据
    page_token: string // 下一页分页的token
    items?: GetAdminUserStatsRespItem[] // 数据报表
  }

  export interface GetAdminUserStatsRespItem {
    date: string // 日期
    user_id: string // 用户ID
    user_name: string // 用户名
    department_name: string // 部门名
    department_path: string // 部门路径
    create_time: string // 账号创建时间
    user_active_flag: number // 用户激活状态, 可选值有: `0`: 未激活, `1`: 已激活
    register_time: string // 激活时间
    suite_active_flag: number // 用户活跃状态, 用户在飞书套件任意应用登陆, 即为活跃。包括飞书即时消息, 文档, 日历, 会议, 开放平台等, 可选值有: `0`: 无活跃, `1`: 活跃
    last_active_time: string // 最近活跃时间
    im_active_flag: number // 用户消息活跃状态, 发生过如下事件, 则认为该用户消息活跃: 发送消息、回复消息、reaction、转发消息、阅读消息、查看会话、发送表情消息等, 可选值有: `0`: 无活跃, `1`: 活跃
    send_messenger_num: number // 发送消息数
    docs_active_flag: number // 用户云文档活跃状态, "发生过如下事件, 则认为该用户云文档活跃: 事件1: 文档/文件打开, 事件2: 进入docs相关页面: 如文档详情页, space的各个页面", 可选值有: `0`: 无活跃, `1`: 活跃
    create_docs_num: number // 创建文件数
    cal_active_flag: number // 用户日历活跃状态, 发生过如下事件, 则认为用户日历活跃, 包含进入日历、创建日程、收到日程邀请等, 可选值有: `0`: 无活跃, `1`: 活跃
    create_cal_num: number // 创建日程数
    vc_active_flag: number // 用户音视频会议活跃状态, 用户进入会中状态（不包含妙计和直播）即为活跃, 可选值有: `0`: 无活跃, `1`: 活跃
    vc_duration: number // 会议时长
    active_os: string // 活跃设备
    create_task_num: number // 创建任务数
    vc_num: number // 会议数
  }

  export interface getAdminUserStatsResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAdminUserStatsResp
  }
}

class AdminResetPasswordReq {
  user_id_type?: any
  password?: any
  user_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      password: this.password,
      user_id: this.user_id
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

class GetAdminDeptStatsReq {
  department_id_type?: any
  start_date?: any
  end_date?: any
  department_id?: any
  contains_child_dept?: any
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
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.start_date !== undefined) {
      q['start_date'] = this.start_date
    }
    if (this.end_date !== undefined) {
      q['end_date'] = this.end_date
    }
    if (this.department_id !== undefined) {
      q['department_id'] = this.department_id
    }
    if (this.contains_child_dept !== undefined) {
      q['contains_child_dept'] = this.contains_child_dept
    }
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

class GetAdminUserStatsReq {
  user_id_type?: any
  department_id_type?: any
  start_date?: any
  end_date?: any
  department_id?: any
  user_id?: any
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
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.start_date !== undefined) {
      q['start_date'] = this.start_date
    }
    if (this.end_date !== undefined) {
      q['end_date'] = this.end_date
    }
    if (this.department_id !== undefined) {
      q['department_id'] = this.department_id
    }
    if (this.user_id !== undefined) {
      q['user_id'] = this.user_id
    }
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
