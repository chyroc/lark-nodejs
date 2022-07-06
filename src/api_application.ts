import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class ApplicationService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // isApplicationUserAdmin 该接口用于查询用户是否为应用管理员。
  //
  // > 此处应用管理员是指可以进入企业管理后台对应用进行审核和管理的企业管理员, 并不是应用的开发者。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uITN1EjLyUTNx4iM1UTM
  async isApplicationUserAdmin(
    request: Application.IsApplicationUserAdminReq
  ): Promise<{
    data: Application.IsApplicationUserAdminResp
    response: Response
  }> {
    const req: RawRequestReq<IsApplicationUserAdminReq> = {
      scope: 'Application',
      api: 'IsApplicationUserAdmin',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/application/v3/is_user_admin',
      body: new IsApplicationUserAdminReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<IsApplicationUserAdminReq, Application.IsApplicationUserAdminResp>(
      req
    )
  }
  // getApplicationUserAdminScope 该接口用于获取应用管理员的管理范围, 即该应用管理员能够管理哪些部门。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzN3QjLzczN04yM3cDN
  async getApplicationUserAdminScope(
    request: Application.GetApplicationUserAdminScopeReq
  ): Promise<{
    data: Application.GetApplicationUserAdminScopeResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationUserAdminScopeReq> = {
      scope: 'Application',
      api: 'GetApplicationUserAdminScope',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v1/user/admin_scope/get',
      body: new GetApplicationUserAdminScopeReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetApplicationUserAdminScopeReq,
      Application.GetApplicationUserAdminScopeResp
    >(req)
  }
  // getApplicationAppVisibility 该接口用于查询应用在该企业内可以被使用的范围, 只能被企业自建应用调用。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uIjM3UjLyIzN14iMycTN
  async getApplicationAppVisibility(
    request: Application.GetApplicationAppVisibilityReq
  ): Promise<{
    data: Application.GetApplicationAppVisibilityResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationAppVisibilityReq> = {
      scope: 'Application',
      api: 'GetApplicationAppVisibility',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/application/v2/app/visibility',
      body: new GetApplicationAppVisibilityReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetApplicationAppVisibilityReq,
      Application.GetApplicationAppVisibilityResp
    >(req)
  }
  // getApplicationUserVisibleApp 该接口用于查询用户可用的应用列表, 只能被企业自建应用调用。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMjM3UjLzIzN14yMycTN
  async getApplicationUserVisibleApp(
    request: Application.GetApplicationUserVisibleAppReq
  ): Promise<{
    data: Application.GetApplicationUserVisibleAppResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationUserVisibleAppReq> = {
      scope: 'Application',
      api: 'GetApplicationUserVisibleApp',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/application/v1/user/visible_apps',
      body: new GetApplicationUserVisibleAppReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetApplicationUserVisibleAppReq,
      Application.GetApplicationUserVisibleAppResp
    >(req)
  }
  // getApplicationAppList 该接口用于查询企业安装的应用列表, 只能被企业自建应用调用。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYDN3UjL2QzN14iN0cTN
  async getApplicationAppList(
    request: Application.GetApplicationAppListReq
  ): Promise<{
    data: Application.GetApplicationAppListResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationAppListReq> = {
      scope: 'Application',
      api: 'GetApplicationAppList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/application/v3/app/list',
      body: new GetApplicationAppListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetApplicationAppListReq, Application.GetApplicationAppListResp>(req)
  }
  // updateApplicationAppVisibility 该接口用于增加或者删除指定应用被哪些人可用, 只能被企业自建应用调用。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ucDN3UjL3QzN14yN0cTN
  async updateApplicationAppVisibility(
    request: Application.UpdateApplicationAppVisibilityReq
  ): Promise<{
    data: Application.UpdateApplicationAppVisibilityResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateApplicationAppVisibilityReq> = {
      scope: 'Application',
      api: 'UpdateApplicationAppVisibility',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/application/v3/app/update_visibility',
      body: new UpdateApplicationAppVisibilityReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateApplicationAppVisibilityReq,
      Application.UpdateApplicationAppVisibilityResp
    >(req)
  }
  // getApplicationAppAdminUserList 查询审核应用的管理员列表, 返回最新10个管理员账户id列表。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ucDOwYjL3gDM24yN4AjN
  async getApplicationAppAdminUserList(
    request: Application.GetApplicationAppAdminUserListReq
  ): Promise<{
    data: Application.GetApplicationAppAdminUserListResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationAppAdminUserListReq> = {
      scope: 'Application',
      api: 'GetApplicationAppAdminUserList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/user/v4/app_admin_user/list',
      body: new GetApplicationAppAdminUserListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetApplicationAppAdminUserListReq,
      Application.GetApplicationAppAdminUserListResp
    >(req)
  }
  // checkUserIsInApplicationPaidScope 当付费套餐是按人数收费 或者 限制最大使用人数时, 开放平台会引导企业管理员设置“付费功能开通范围”。  但是受开通范围限制, 部分用户就无法使用对应的付费功能。  可以通过此接口, 在付费功能点入口判断是否允许某个用户进入使用。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATNwUjLwUDM14CM1ATN
  async checkUserIsInApplicationPaidScope(
    request: Application.CheckUserIsInApplicationPaidScopeReq
  ): Promise<{
    data: Application.CheckUserIsInApplicationPaidScopeResp
    response: Response
  }> {
    const req: RawRequestReq<CheckUserIsInApplicationPaidScopeReq> = {
      scope: 'Application',
      api: 'CheckUserIsInApplicationPaidScope',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/pay/v1/paid_scope/check_user',
      body: new CheckUserIsInApplicationPaidScopeReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CheckUserIsInApplicationPaidScopeReq,
      Application.CheckUserIsInApplicationPaidScopeResp
    >(req)
  }
  // getApplicationOrderList 该接口用于分页查询应用租户下的已付费订单, 每次购买对应一个唯一的订单, 订单会记录购买的套餐的相关信息, 业务方需要自行处理套餐的有效期和付费方案的升级。
  //
  // >  备注: 免费模式的应用不会产生订单, 仅收费应用会产生订单 (含免费版)。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uETNwUjLxUDM14SM1ATN
  async getApplicationOrderList(
    request: Application.GetApplicationOrderListReq
  ): Promise<{
    data: Application.GetApplicationOrderListResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationOrderListReq> = {
      scope: 'Application',
      api: 'GetApplicationOrderList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/pay/v1/order/list',
      body: new GetApplicationOrderListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetApplicationOrderListReq, Application.GetApplicationOrderListResp>(
      req
    )
  }
  // getApplicationOrder 该接口用于查询某个订单的具体信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uITNwUjLyUDM14iM1ATN
  async getApplicationOrder(
    request: Application.GetApplicationOrderReq
  ): Promise<{
    data: Application.GetApplicationOrderResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationOrderReq> = {
      scope: 'Application',
      api: 'GetApplicationOrder',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/pay/v1/order/get',
      body: new GetApplicationOrderReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetApplicationOrderReq, Application.GetApplicationOrderResp>(req)
  }
  // getApplicationUnderAuditList 查看本企业下所有待审核的自建应用列表
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/underauditlist
  async getApplicationUnderAuditList(
    request: Application.GetApplicationUnderAuditListReq
  ): Promise<{
    data: Application.GetApplicationUnderAuditListResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationUnderAuditListReq> = {
      scope: 'Application',
      api: 'GetApplicationUnderAuditList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/application/v6/applications/underauditlist',
      body: new GetApplicationUnderAuditListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetApplicationUnderAuditListReq,
      Application.GetApplicationUnderAuditListResp
    >(req)
  }
  // getApplication 根据app_id获取应用的基础信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/get
  async getApplication(
    request: Application.GetApplicationReq
  ): Promise<{
    data: Application.GetApplicationResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationReq> = {
      scope: 'Application',
      api: 'GetApplication',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/application/v6/applications/:app_id',
      body: new GetApplicationReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetApplicationReq, Application.GetApplicationResp>(req)
  }
  // getApplicationVersion 根据 app_id, version_id 获取对应应用版本的信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/get
  async getApplicationVersion(
    request: Application.GetApplicationVersionReq
  ): Promise<{
    data: Application.GetApplicationVersionResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationVersionReq> = {
      scope: 'Application',
      api: 'GetApplicationVersion',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/application/v6/applications/:app_id/app_versions/:version_id',
      body: new GetApplicationVersionReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetApplicationVersionReq, Application.GetApplicationVersionResp>(req)
  }
  // updateApplicationVersion 通过接口来更新应用版本的审核结果: 通过后应用可以直接上架；拒绝后则开发者可以看到拒绝理由, 并在修改后再次申请发布。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/patch
  async updateApplicationVersion(
    request: Application.UpdateApplicationVersionReq
  ): Promise<{
    data: Application.UpdateApplicationVersionResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateApplicationVersionReq> = {
      scope: 'Application',
      api: 'UpdateApplicationVersion',
      method: 'PATCH',
      url:
        this.cli.openBaseURL +
        '/open-apis/application/v6/applications/:app_id/app_versions/:version_id',
      body: new UpdateApplicationVersionReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateApplicationVersionReq,
      Application.UpdateApplicationVersionResp
    >(req)
  }
  // updateApplication 更新应用的分组信息（分组会影响应用在工作台中的分类情况, 请谨慎更新）
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/patch
  async updateApplication(
    request: Application.UpdateApplicationReq
  ): Promise<{
    data: Application.UpdateApplicationResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateApplicationReq> = {
      scope: 'Application',
      api: 'UpdateApplication',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/application/v6/applications/:app_id',
      body: new UpdateApplicationReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateApplicationReq, Application.UpdateApplicationResp>(req)
  }
  // getApplicationUsageOverview 查看应用在某一天/某一周/某一个月的使用数据, 可以查看租户整体对应用的使用情况, 也可以分部门查看。
  //
  // 1. 仅支持企业版/旗舰版租户使用
  // 2. 一般每天早上10点产出前一天的数据
  // 3. 已经支持的指标包括: 应用的活跃用户数、累计用户数、新增用户数
  // 4. 数据从飞书3.46版本开始统计, 使用飞书版本3.45及以下版本的用户数据不会被统计到
  // 5. 按照部门查看数据时, 会展示当前部门以及其子部门的整体使用情况
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/overview
  async getApplicationUsageOverview(
    request: Application.GetApplicationUsageOverviewReq
  ): Promise<{
    data: Application.GetApplicationUsageOverviewResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationUsageOverviewReq> = {
      scope: 'Application',
      api: 'GetApplicationUsageOverview',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/application/v6/applications/:app_id/app_usage/overview',
      body: new GetApplicationUsageOverviewReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetApplicationUsageOverviewReq,
      Application.GetApplicationUsageOverviewResp
    >(req)
  }
  // getApplicationUsageTrend 查询应用在指定时间段内企业员工的使用趋势信息。
  //
  // :::warning
  // 此接口目前仅支持小程序的使用情况查询, 不支持网页应用和机器人应用的使用情况查询;仅支持查询自建应用, 不支持查询商店应用
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uITN0YjLyUDN24iM1QjN
  async getApplicationUsageTrend(
    request: Application.GetApplicationUsageTrendReq
  ): Promise<{
    data: Application.GetApplicationUsageTrendResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationUsageTrendReq> = {
      scope: 'Application',
      api: 'GetApplicationUsageTrend',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/application/v1/app_usage_trend',
      body: new GetApplicationUsageTrendReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetApplicationUsageTrendReq,
      Application.GetApplicationUsageTrendResp
    >(req)
  }
  // updateApplicationFeedback 更新应用的反馈数据
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/patch
  async updateApplicationFeedback(
    request: Application.UpdateApplicationFeedbackReq
  ): Promise<{
    data: Application.UpdateApplicationFeedbackResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateApplicationFeedbackReq> = {
      scope: 'Application',
      api: 'UpdateApplicationFeedback',
      method: 'PATCH',
      url:
        this.cli.openBaseURL +
        '/open-apis/application/v6/applications/:app_id/feedbacks/:feedback_id',
      body: new UpdateApplicationFeedbackReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateApplicationFeedbackReq,
      Application.UpdateApplicationFeedbackResp
    >(req)
  }
  // getApplicationFeedbackList 查询应用的反馈数据
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/list
  async getApplicationFeedbackList(
    request: Application.GetApplicationFeedbackListReq
  ): Promise<{
    data: Application.GetApplicationFeedbackListResp
    response: Response
  }> {
    const req: RawRequestReq<GetApplicationFeedbackListReq> = {
      scope: 'Application',
      api: 'GetApplicationFeedbackList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/application/v6/applications/:app_id/feedbacks',
      body: new GetApplicationFeedbackListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetApplicationFeedbackListReq,
      Application.GetApplicationFeedbackListResp
    >(req)
  }
}

export declare namespace Application {
  export interface IsApplicationUserAdminReq {
    open_id?: string // 用户 open_id, open_id 和 employee_id 两个参数必须包含其一, 若同时传入取 open_id
    employee_id?: string // 用户 employee_id（同通讯录 v3 版本中的 user_id）, open_id 和 employee_id 两个参数必须包含其一, 若同时传入取 open_id
  }

  export interface IsApplicationUserAdminResp {
    is_app_admin: boolean // 用户是否为管理员, true 为是, false 为否
  }

  export interface isApplicationUserAdminResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述
    data: IsApplicationUserAdminResp // 返回的业务信息
  }

  export interface GetApplicationUserAdminScopeReq {
    employee_id: string // 支持通过 open_id 或者 employee_id 查询, 不支持混合两种 ID 进行查询, 其中 employee_id 同通讯录 v3 版本中的 user_id
    open_id: string // 支持通过 open_id 或者 employee_id 查询, 不支持混合两种 ID 进行查询, 其中 employee_id 同通讯录 v3 版本中的 user_id
  }

  export interface GetApplicationUserAdminScopeResp {
    is_all: boolean // 是否管理所有部门
    department_list?: string[] // 管理的部门列表, 当 is_all 为 true 时, 不返回该字段
  }

  export interface getApplicationUserAdminScopeResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述
    data: GetApplicationUserAdminScopeResp // 返回业务数据
  }

  export interface GetApplicationAppVisibilityReq {
    app_id: string // 目标应用的 ID
    user_page_token?: string // 分页拉取用户列表起始位置标示, 不填表示从头开始
    user_page_size?: number // 本次拉取用户列表最大个数(最大值 1000, 0 自动最大个数 )
  }

  export interface GetApplicationAppVisibilityResp {
    departments?: GetApplicationAppVisibilityRespDepartment[] // 可用部门列表
    users?: GetApplicationAppVisibilityRespUser[] // 可用用户列表（仅包含单独设置的用户, 可用部门、用户组中的用户未展开）
    is_visible_to_all: number // 是否全员可见, 1: 是, 0: 否
    has_more_users: number // 是否还有更多可见用户, 1: 是, 0: 否
    user_page_token: string // 拉取下一页用户列表时使用的 user_page_token
  }

  export interface GetApplicationAppVisibilityRespDepartment {
    id: string // 自定义 department_id
  }

  export interface GetApplicationAppVisibilityRespUser {
    user_id: string // 用户的 user_id, 只返回给申请了 user_id 权限的企业自建应用
    open_id: string // 用户的 open_id
  }

  export interface getApplicationAppVisibilityResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述
    data: GetApplicationAppVisibilityResp // 返回的业务信息
  }

  export interface GetApplicationUserVisibleAppReq {
    page_token?: string // 分页起始位置标示, 不填表示从头开始
    page_size?: number // 单页需求最大个数（最大 100）, 0 自动最大个数
    lang?: string // 优先展示的应用信息的语言版本（zh_cn: 中文, en_us: 英文, ja_jp: 日文）
    open_id?: string // 目标用户 open_id
    user_id?: string // 目标用户 user_id, 与 open_id 至少给其中之一, user_id 优先于 open_id
  }

  export interface GetApplicationUserVisibleAppResp {
    page_token: string // 下一个请求页应当给的起始位置
    page_size: number // 本次请求实际返回的页大小
    total_count: number // 可用的应用总数
    has_more: boolean // 是否还有更多应用
    lang: string // 当前选择的版本语言
    app_list: GetApplicationUserVisibleAppRespAppList // 应用列表
  }

  export interface GetApplicationUserVisibleAppRespAppList {
    app_id: string // 应用 ID
    primary_language: string // 应用首选语言
    app_name: string // 应用名称
    description: string // 应用描述
    avatar_url: string // 应用 icon
    app_scene_type: number // 应用类型, 0: 企业自建应用；1: 应用商店应用
    status: number // 启停状态, 0: 停用；1: 启用
    mobile_default_ability: number // 移动端默认的应用功能, 0: 未开启；1: 小程序；2: H5；8: 机器人
    pc_default_ability: number // PC客户端默认的应用功能, 0: 未开启；1: 小程序；2: H5；8: 机器人
  }

  export interface getApplicationUserVisibleAppResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述
    data: GetApplicationUserVisibleAppResp // 返回的业务信息, 仅 code = 0 时有效
  }

  export interface GetApplicationAppListReq {
    page_token?: string // 分页起始位置标示, 不填表示从头开始（不保证 page_token 一定为数字, 请填入上一次请求返回的 page_token）
    page_size?: number // 单页需求最大个数（最大 100）, 0 自动最大个数
    lang?: string // 优先展示的应用信息的语言版本（zh_cn: 中文, en_us: 英文, ja_jp: 日文）
    status?: number // 要返回的应用的状态, 0:停用；1:启用；-1:全部, 默认为 -1
  }

  export interface GetApplicationAppListResp {
    page_token: string // 下一个请求页应当给的起始位置
    page_size: number // 本次请求实际返回的页大小
    total_count: number // 可用的应用总数
    has_more: boolean // 是否还有更多应用
    lang: string // 当前选择的版本语言
    app_list: GetApplicationAppListRespAppList // 应用列表
  }

  export interface GetApplicationAppListRespAppList {
    app_id: string // 应用 ID
    primary_language: string // 应用首选语言
    app_name: string // 应用名称
    description: string // 应用描述
    avatar_url: string // 应用 icon
    app_scene_type: number // 应用类型, 0: 企业自建应用；1: 应用商店应用
    status: number // 启停状态, 0: 停用；1: 启用
    mobile_default_ability: number // 移动端默认的应用功能, 0: 未开启；1: 小程序；2: H5；8: 机器人
    pc_default_ability: number // PC客户端默认的应用功能, 0: 未开启；1: 小程序；2: H5；8: 机器人
  }

  export interface getApplicationAppListResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述
    data: GetApplicationAppListResp // 返回的业务信息, 仅 code = 0 时有效
  }

  export interface UpdateApplicationAppVisibilityReq {
    app_id: string // 目标应用的 ID
    del_users?: UpdateApplicationAppVisibilityReqDelUser[] // 删除的用户列表, 元素个数不超过 500, 先增加后删除
    add_users?: UpdateApplicationAppVisibilityReqAddUser[] // 增加的用户列表, 元素个数不超过500, 先增加后删除
    is_visiable_to_all?: number // 是否全员可见, 0: 否；1: 是；不填: 继续当前状态不改变
    add_departments?: string[] // 添加的部门列表, 元素个数不超过 500, 先增加后删除
    del_departments?: string[] // 删除的部门列表, 元素个数不超过 500, 先增加后删除
  }

  export interface UpdateApplicationAppVisibilityReqAddUser {
    open_id?: string // 与 user_id 至少给其中之一, user_id 优先于 open_id
    user_id?: string
  }

  export interface UpdateApplicationAppVisibilityReqDelUser {
    open_id?: string // 与 user_id 至少给其中之一, user_id 优先于 open_id
    user_id?: string
  }

  export interface UpdateApplicationAppVisibilityResp {}

  export interface updateApplicationAppVisibilityResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述
    data: UpdateApplicationAppVisibilityResp // 返回的业务信息
  }

  export interface GetApplicationAppAdminUserListReq {}

  export interface GetApplicationAppAdminUserListResp {
    user_list?: GetApplicationAppAdminUserListRespUser[] // 管理员列表
  }

  export interface GetApplicationAppAdminUserListRespUser {
    open_id: string // 某管理员的open_id
    user_id: string // 某管理员的user_id
    union_id: string // 某管理员的union_id
  }

  export interface getApplicationAppAdminUserListResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码描述
    data: GetApplicationAppAdminUserListResp
  }

  export interface CheckUserIsInApplicationPaidScopeReq {
    open_id?: string // 用户 open_id, open_id 和 user_id 两个参数必须包含其一, 若同时传入取 open_id
    user_id?: string // 用户 user_id, user_id 和 open_id 两个参数必须包含其一, 若同时传入取 open_id
  }

  export interface CheckUserIsInApplicationPaidScopeResp {
    status: string // 用户是否在开通范围中, "valid" -该用户在开通范围中, "not_in_scope"-该用户不在开通范围中, "no_active_license"-企业未购买任何价格方案或价格方案已过期, "exceeds_maximum_limit"-企业当前配置的付费功能开通范围人数超出限制, 需提醒管理员调整
    price_plan_id: string // 租户当前使用的「价格方案ID」, 对应开发者后台中「价格方案配置」中的「价格方案」
    is_trial: boolean // 是否为试用版本, true-是试用版本；false-非试用版本
    service_stop_time: string // 租户当前有生效价格方案时表示价格方案的到期时间, 为时间unix时间戳
  }

  export interface checkUserIsInApplicationPaidScopeResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述
    data: CheckUserIsInApplicationPaidScopeResp // 返回的业务信息
  }

  export interface GetApplicationOrderListReq {
    status?: string // 获取用户购买套餐信息设置的过滤条件, normal为正常状态, refunded为已退款, 该字段为空或者all表示所有, 未支付的订单无法查到
    page_size: number // 每页显示的订单数量
    page_token?: string // 翻页标识, 可以从上次请求的响应中获取, 不填或者为空时表示从开头获取
    tenant_key?: string // 购买应用的租户唯一标识, 为空表示获取应用下所有订单, 有值表示获取应用下该租户购买的订单
  }

  export interface GetApplicationOrderListResp {
    total: number // 总订单数
    has_more: boolean // 是否还有数据, true还有数据, false没有数据
    page_token: string // 下一页数据的标识, 可作为请求下一页数据的参数, 当has_more为false时该字段为空
    order_list: GetApplicationOrderListRespOrderList // 订单信息列表
  }

  export interface GetApplicationOrderListRespOrderList {
    order_id: string // 订单ID, 唯一标识
    price_plan_id: string // 价格方案ID, 唯一标识
    price_plan_type: string // 价格方案类型 。 可选值包括: "trial" -试用；"permanent"-免费；"per_year"-企业年付费；"per_month"-企业月付费；"per_seat_per_year"-按人按年付费；"per_seat_per_month"-按人按月付费；"permanent_count"-按次付费；
    seats: number // 实际购买人数 仅对price_plan_type为per_seat_per_year和per_seat_per_month 有效
    buy_count: number // 购买数量 总是为1
    create_time: string // 订单创建时间戳
    pay_time: string // 订单支付时间戳
    status: string // 订单当前状态, "normal" -正常；"refund"-已退款；
    buy_type: string // 购买类型, "buy" - 普通购买;"upgrade"-为升级购买(仅price_plan_type 为per_year, per_month, per_seat_per_year, per_seat_per_month时可升级购买);"renew" - 续费购买；
    src_order_id: string // 源订单ID, 当前订单为升级购买时, 即buy_type为upgrade时, 此字段记录源订单等ID
    dst_order_id: string // 升级后的新订单ID, 当前订单如果做过升级购买, 此字段记录升级购买后生成的新订单ID, 当前订单仍然有效
    order_pay_price: number // 订单实际支付金额, 单位分
    tenant_key: string // 租户唯一标识
  }

  export interface getApplicationOrderListResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述
    data: GetApplicationOrderListResp // 返回的业务信息
  }

  export interface GetApplicationOrderReq {
    order_id: string // 订单ID
  }

  export interface GetApplicationOrderResp {
    order: GetApplicationOrderRespOrder // 订单信息
  }

  export interface GetApplicationOrderRespOrder {
    order_id: string // 订单ID, 唯一标识
    price_plan_id: string // 价格方案ID, 唯一标识
    price_plan_type: string // 价格方案类型 "trial" -试用；"permanent"-一次性付费；"per_year"-企业年付费；"per_month"-企业月付费；"per_seat_per_year"-按人按年付费；"per_seat_per_month"-按人按月付费；"permanent_count"-按次付费；
    seats: number // 实际购买人数 仅对price_plan_type为per_seat_per_year和per_seat_per_month 有效
    buy_count: number // 购买数量 总是为1
    create_time: string // 订单创建时间戳
    pay_time: string // 订单支付时间戳
    status: string // 订单当前状态, "normal" -正常；"refund"-已退款；
    buy_type: string // 购买类型, "buy" - 普通购买;"upgrade"-为升级购买(仅price_plan_type 为per_year, per_month, per_seat_per_year, per_seat_per_month时可升级购买);"renew" - 续费购买；
    src_order_id: string // 源订单ID, 当前订单为升级购买时, 即buy_type为upgrade时, 此字段记录源订单等ID
    dst_order_id: string // 升级后的新订单ID, 当前订单如果做过升级购买, 此字段记录升级购买后生成的新订单ID, 当前订单仍然有效
    order_pay_price: number // 订单实际支付金额, 单位分
    tenant_key: string // 租户唯一标识
  }

  export interface getApplicationOrderResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述
    data: GetApplicationOrderResp // 返回的业务信息
  }

  export interface GetApplicationUnderAuditListReq {
    lang: string // 指定返回的语言, 示例值: "zh_cn", 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文, 最小长度: `1` 字符
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "new-e3c5a0627cdf0c2e057da7257b90376a"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetApplicationUnderAuditListResp {
    items?: GetApplicationUnderAuditListRespItem[] // 待审核应用列表
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface GetApplicationUnderAuditListRespItem {
    app_id: string // 应用的 app_id
    creator_id: string // 应用创建者（所有者）
    status: number // 应用状态, 可选值有: `0`: 停用状态, `1`: 启用状态, `2`: 未启用状态, `3`: 未知状态
    scene_type: number // 应用类型, 可选值有: `0`: 自建应用, `1`: 应用商店应用, `2`: 个人应用商店应用, `3`: 未知应用类型
    redirect_urls?: string[] // 安全设置中的重定向 URL
    online_version_id: string // 发布在线上的应用版本 ID, 若没有则为空
    unaudit_version_id: string // 在审核中的版本 ID, 若没有则为空
    app_name: string // 应用名称
    avatar_url: string // 应用图标 url
    description: string // 应用默认描述
    scopes?: GetApplicationUnderAuditListRespItemScope[] // 应用权限列表
    back_home_url: string // 后台主页地址
    i18n?: GetApplicationUnderAuditListRespItemI18n[] // 应用的国际化信息列表
    primary_language: string // 应用主语言, 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文
    common_categories?: string[] // 应用分类的国际化描述
  }

  export interface GetApplicationUnderAuditListRespItemI18n {
    i18n_key: string // 国际化语言的 key, 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文
    name: string // 应用国际化名称
    description: string // 应用国际化描述（副标题）
    help_use: string // 帮助国际化文档链接
  }

  export interface GetApplicationUnderAuditListRespItemScope {
    scope: string // 应用权限
    description: string // 应用权限的国际化描述
    level: number // 权限等级描述, 可选值有: `1`: 普通权限, `2`: 高级权限, `3`: 超敏感权限, `0`: 未知等级
  }

  export interface getApplicationUnderAuditListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApplicationUnderAuditListResp
  }

  export interface GetApplicationReq {
    app_id: string // 应用的 app_id, 需要查询其他应用信息时, 必须申请[获取应用信息](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)权限, 仅查询本应用信息时, 可填入 "me" 或者应用自身 app_id, 示例值: "cli_9b445f5258795107"
    lang: string // 指定获取应用在该语言下的信息, 示例值: "zh_cn", 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文, 最小长度: `1` 字符
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetApplicationResp {
    app: GetApplicationRespApp // 应用数据
  }

  export interface GetApplicationRespApp {
    app_id: string // 应用的 app_id
    creator_id: string // 应用创建者（所有者）
    status: number // 应用状态, 可选值有: `0`: 停用状态, `1`: 启用状态, `2`: 未启用状态, `3`: 未知状态
    scene_type: number // 应用类型, 可选值有: `0`: 自建应用, `1`: 应用商店应用, `2`: 个人应用商店应用, `3`: 未知应用类型
    redirect_urls?: string[] // 安全设置中的重定向 URL
    online_version_id: string // 发布在线上的应用版本 ID, 若没有则为空
    unaudit_version_id: string // 在审核中的版本 ID, 若没有则为空
    app_name: string // 应用名称
    avatar_url: string // 应用图标 url
    description: string // 应用默认描述
    scopes?: GetApplicationRespAppScope[] // 应用权限列表
    back_home_url: string // 后台主页地址
    i18n?: GetApplicationRespAppI18n[] // 应用的国际化信息列表
    primary_language: string // 应用主语言, 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文
    common_categories?: string[] // 应用分类的国际化描述
  }

  export interface GetApplicationRespAppI18n {
    i18n_key: string // 国际化语言的 key, 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文
    name: string // 应用国际化名称
    description: string // 应用国际化描述（副标题）
    help_use: string // 帮助国际化文档链接
  }

  export interface GetApplicationRespAppScope {
    scope: string // 应用权限
    description: string // 应用权限的国际化描述
    level: number // 权限等级描述, 可选值有: `1`: 普通权限, `2`: 高级权限, `3`: 超敏感权限, `0`: 未知等级
  }

  export interface getApplicationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApplicationResp
  }

  export interface GetApplicationVersionReq {
    app_id: string // 应用的 app_id, 需要查询其他应用版本信息时, 必须申请[获取应用版本信息](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)权限, 仅查询本应用版本信息时, 可填入 "me" 或者应用自身 app_id, 示例值: "cli_9f3ca975326b501b"
    version_id: string // 唯一标识应用版本的 ID, 示例值: "oav_d317f090b7258ad0372aa53963cda70d"
    lang: string // 应用信息的语言版本, 示例值: "zh_cn", 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文, 最小长度: `1` 字符
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetApplicationVersionResp {
    app_version: GetApplicationVersionRespAppVersion // 应用版本信息
  }

  export interface GetApplicationVersionRespAppVersion {
    app_id: string // 应用 id
    version: string // 在开发者后台填入的应用版本号
    version_id: string // 唯一标识应用版本的 ID
    app_name: string // 应用默认名称
    avatar_url: string // 应用头像 url
    description: string // 应用默认描述
    scopes?: GetApplicationVersionRespAppVersionScope[] // 应用权限列表
    back_home_url: string // 后台主页地址
    i18n?: GetApplicationVersionRespAppVersionI18n[] // 应用的国际化信息列表
    common_categories?: string[] // 应用分类的国际化描述
    events?: string[] // 应用已订阅开放平台事件列表
    status: number // 版本状态, 可选值有: `0`: 未知状态, `1`: 审核通过, `2`: 审核拒绝, `3`: 审核中, `4`: 未提交审核
    create_time: string // 版本创建时间（单位: s）
    publish_time: string // 版本发布时间（单位: s）
    ability: GetApplicationVersionRespAppVersionAbility // 当前版本下应用开启的能力
    remark: GetApplicationVersionRespAppVersionRemark // 跟随应用版本的信息
  }

  export interface GetApplicationVersionRespAppVersionAbility {
    gadget: GetApplicationVersionRespAppVersionAbilityGadget // 小程序能力
    web_app: GetApplicationVersionRespAppVersionAbilityWebApp // 网页能力
    bot: GetApplicationVersionRespAppVersionAbilityBot // 机器人能力
    workplace_widgets?: GetApplicationVersionRespAppVersionAbilityWorkplaceWidget[] // 小组件能力
    navigate: GetApplicationVersionRespAppVersionAbilityNavigate // 主导航小程序
    cloud_doc: GetApplicationVersionRespAppVersionAbilityCloudDoc // 云文档应用
    docs_blocks?: GetApplicationVersionRespAppVersionAbilityDocsBlock[] // 云文档小组件
    message_action: GetApplicationVersionRespAppVersionAbilityMessageAction // 消息快捷操作
    plus_menu: GetApplicationVersionRespAppVersionAbilityPlusMenu // 加号菜单
  }

  export interface GetApplicationVersionRespAppVersionAbilityBot {
    card_request_url: string // 消息卡片回调地址
  }

  export interface GetApplicationVersionRespAppVersionAbilityCloudDoc {
    space_url: string // 云空间重定向 url
    i18n?: GetApplicationVersionRespAppVersionAbilityCloudDocI18n[] // 国际化信息
    icon_url: string // 图标链接
    mode: number // 云文档支持模式, 可选值有: `0`: 未知, `1`: 移动端
  }

  export interface GetApplicationVersionRespAppVersionAbilityCloudDocI18n {
    i18n_key: string // 国际化语言的 key, 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文
    name: string // 云文档国际化名称
    read_description: string // 云文档国际化读权限说明
    write_description: string // 云文档国际化写权限说明
  }

  export interface GetApplicationVersionRespAppVersionAbilityDocsBlock {
    block_type_id: string // BlockTypeID
    i18n?: GetApplicationVersionRespAppVersionAbilityDocsBlockI18n[] // block 的国际化信息
    mobile_icon_url: string // 移动端 icon 链接
    pc_icon_url: string // pc 端口 icon 链接
  }

  export interface GetApplicationVersionRespAppVersionAbilityDocsBlockI18n {
    i18n_key: string // 国际化语言的 key, 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文
    name: string // 名称
  }

  export interface GetApplicationVersionRespAppVersionAbilityGadget {
    enable_pc_mode: number // pc 支持的小程序模式, bit 位表示, 可选值有: `1`: sidebar 模式, `2`: pc 模式, `4`: 主导航模式
    schema_urls?: string[] // schema url 列表
    pc_use_mobile_pkg: boolean // pc 端是否使用小程序版本
    pc_version: string // pc 的小程序版本号
    mobile_version: string // 移动端小程序版本号
    mobile_min_lark_version: string // 移动端兼容的最低飞书版本
    pc_min_lark_version: string // pc 端兼容的最低飞书版本
  }

  export interface GetApplicationVersionRespAppVersionAbilityMessageAction {
    pc_app_link: string // pc 端链接
    mobile_app_link: string // 移动端链接
    i18n?: GetApplicationVersionRespAppVersionAbilityMessageActionI18n[] // 国际化信息
  }

  export interface GetApplicationVersionRespAppVersionAbilityMessageActionI18n {
    i18n_key: string // 国际化语言的 key, 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文
    name: string // 国际化名称
  }

  export interface GetApplicationVersionRespAppVersionAbilityNavigate {
    pc: GetApplicationVersionRespAppVersionAbilityNavigatePc // pc 端主导航信息
    mobile: GetApplicationVersionRespAppVersionAbilityNavigateMobile // 移动端主导航信息
  }

  export interface GetApplicationVersionRespAppVersionAbilityNavigateMobile {
    version: string // 主导航小程序版本号
    image_url: string // 默认图片 url
    hover_image_url: string // 选中态图片 url
  }

  export interface GetApplicationVersionRespAppVersionAbilityNavigatePc {
    version: string // 主导航小程序版本号
    image_url: string // 默认图片 url
    hover_image_url: string // 选中态图片 url
  }

  export interface GetApplicationVersionRespAppVersionAbilityPlusMenu {
    pc_app_link: string // pc 端链接
    mobile_app_link: string // 移动端链接
  }

  export interface GetApplicationVersionRespAppVersionAbilityWebApp {
    pc_url: string // pc 端 url
    mobile_url: string // 移动端 url
  }

  export interface GetApplicationVersionRespAppVersionAbilityWorkplaceWidget {
    min_lark_version: string // 最低兼容 lark 版本号
  }

  export interface GetApplicationVersionRespAppVersionI18n {
    i18n_key: string // 国际化语言的 key, 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文
    name: string // 应用国际化名称
    description: string // 应用国际化描述（副标题）
    help_use: string // 帮助国际化文档链接
  }

  export interface GetApplicationVersionRespAppVersionRemark {
    remark: string // 备注说明
    update_remark: string // 更新说明
    visibility: GetApplicationVersionRespAppVersionRemarkVisibility // 应用当前版本开发者编辑的可见性建议, 若开发者未编辑可见性建议, 则该字段无内容
  }

  export interface GetApplicationVersionRespAppVersionRemarkVisibility {
    is_all: boolean // 是否全员可见
    visible_list: GetApplicationVersionRespAppVersionRemarkVisibilityVisibleList // 可见名单
    invisible_list: GetApplicationVersionRespAppVersionRemarkVisibilityInvisibleList // 不可见名单
  }

  export interface GetApplicationVersionRespAppVersionRemarkVisibilityInvisibleList {
    open_ids?: string[] // 可见性成员 open_id 列表
    department_ids?: string[] // 可见性部门的 id 列表
  }

  export interface GetApplicationVersionRespAppVersionRemarkVisibilityVisibleList {
    open_ids?: string[] // 可见性成员 open_id 列表
    department_ids?: string[] // 可见性部门的 id 列表
  }

  export interface GetApplicationVersionRespAppVersionScope {
    scope: string // 应用权限
    description: string // 应用权限的国际化描述
    level: number // 权限等级描述, 可选值有: `1`: 普通权限, `2`: 高级权限, `3`: 超敏感权限, `0`: 未知等级
  }

  export interface getApplicationVersionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApplicationVersionResp
  }

  export interface UpdateApplicationVersionReq {
    app_id: string // 应用 id, 示例值: "cli_9f3ca975326b501b"
    version_id: string // 唯一标识应用版本的 ID, 示例值: "oav_d317f090b7258ad0372aa53963cda70d"
    user_id_type: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    operator_id: string // 操作者的 open_id, 示例值: "ou_4065981088f8ef67a504ba8bd6b24d85"
    reject_reason?: string // 当修改版本状态为被驳回时, 这一项必填, 示例值: "拒绝理由"
    status?: number // 版本状态, 示例值: 1, 可选值有: `0`: 未知状态, `1`: 审核通过, `2`: 审核拒绝, `3`: 审核中, `4`: 未提交审核
  }

  export interface UpdateApplicationVersionResp {}

  export interface updateApplicationVersionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateApplicationVersionResp
  }

  export interface UpdateApplicationReq {
    app_id: string // 应用的 id, 示例值: "cli_9b445f5258795107"
    lang: string // 指定返回的语言, 示例值: "zh_cn", 可选值有: `zh_cn`: 中文, `en_us`: 英文, `ja_jp`: 日文
    common_categories?: string[] // 应用分类的国际化描述, 长度范围: `1` ～ `3`
  }

  export interface UpdateApplicationResp {}

  export interface updateApplicationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateApplicationResp
  }

  export interface GetApplicationUsageOverviewReq {
    app_id: string // 目标应用 ID, 示例值: "cli_9f115af860f7901b"
    department_id_type?: string // 调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    date: string // 查询日期, 格式为yyyy-mm-dd, 若cycle_type为1, date可以为任何自然日；若cycle_type为2, 则输入的date必须为周一； 若cycle_type为3, 则输入的date必须为每月1号, 示例值: "2021-07-08"
    cycle_type: number // 活跃周期的统计类型, 示例值: 1, 可选值有: `1`: 日活, 指自然日, 返回当前日期所在日的数据, `2`: 周活, 指自然周, 返回当前日期所在周的数据。若到查询时当周还没结束, 则返回周一到当前日期的数值。例如在2021/7/15 查询2021/7/5 这一周的数据, 则代表的是2021/7/5 ~ 2021/7/11。但若是在2021/7/8 查询2021/7/5 这一周的数据, 则返回的是2021/7/5 ~ 2021/7/7 的数据, `3`: 月活, 指自然月, 返回当前日期所在月的数据。若不满一个月则返回当月1日到截止日期前的数据。例如在2021/8/15 查询 7月的数据, 则代表2021/7/1~2021/7/31。 若在2021/8/15 查询8月的数据, 则代表2021/8/1~2021/8/14的数据
    department_id?: string // 查询的部门id, 获取方法可参考[部门ID概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview), 若部门id为空, 则返回当前租户的使用数据；若填写部门id, 则返回当前部门的使用数据（包含子部门的用户）；, 若路径参数中department_id_type为空或者为open_department_id, 则此处应该填写部门的 open_department_id；若路径参数中department_id_type为department_id, 则此处应该填写部门的 department_id, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141"
    ability: string // 能力类型, 按能力类型进行筛选, 返回对应能力的活跃数据, 示例值: "app", 可选值有: `app`: 返回应用整体的数据, `mp`: 返回小程序能力的数据, `h5`: 返回网页能力的数据, `bot`: 返回机器人能力的数据
  }

  export interface GetApplicationUsageOverviewResp {
    items?: GetApplicationUsageOverviewRespItem[] // 员工使用应用概览数据
  }

  export interface GetApplicationUsageOverviewRespItem {
    metric_name: string // 指标名称, uv: 活跃用户数, total_users: 累计用户数, new_users: 新增用户数
    metric_value: number // 指标值
  }

  export interface getApplicationUsageOverviewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApplicationUsageOverviewResp
  }

  export interface GetApplicationUsageTrendReq {
    app_id: string // 目标应用的 ID, 支持自建应用
    ability: string // 应用能力, mp: 小程序
    time_start: number // 起始时间戳（秒）, 时间跨度最长支持180天
    time_end: number // 截止时间戳（秒）, 时间跨度最长支持180天
    time_interval: number // 步长（秒）, 最小步长为60秒, 需满足(${time_end} - ${time_start}) / ${time_interval} <= 2*24*60
    filters?: GetApplicationUsageTrendReqFilter[] // 过滤条件
  }

  export interface GetApplicationUsageTrendReqFilter {
    key: string // 过滤字段, 支持`department_id
    op: string // 过滤操作, 支持`in`、`=
    value: string // 过滤字段值, 多个使用英文逗号分隔
  }

  export interface GetApplicationUsageTrendResp {
    item?: { [key: string]: GetApplicationUsageTrendRespItem } // 返回项
  }

  export interface GetApplicationUsageTrendRespItem {
    trends?: GetApplicationUsageTrendRespItemTrend[] // 趋势数据
  }

  export interface GetApplicationUsageTrendRespItemTrend {
    timestamp: number // 时间戳
    pv: number // 应用使用pv
    uv: number // 应用使用uv
  }

  export interface getApplicationUsageTrendResp {
    code: number // 返回码, 非0表示失败
    msg: string // 返回码的描述
    data: GetApplicationUsageTrendResp // 返回的业务信息, 仅code = 0时有效
  }

  export interface UpdateApplicationFeedbackReq {
    app_id: string // 目标应用 ID, 示例值: "cli_9f115af860f7901b"
    feedback_id: string // 应用反馈记录id, 示例值: "7057888018203574291"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    status: number // 反馈处理状态, 示例值: 1, 可选值有: `0`: 反馈未处理, `1`: 反馈已处理, `2`: 反馈处理中, `3`: 反馈已关闭
    operator_id: string // 反馈处理人员id, 租户内用户的唯一标识, ID值与查询参数中的user_id_type 对应, 示例值: "ou_9565b69967831233761cc2f11b4c089f"
  }

  export interface UpdateApplicationFeedbackResp {}

  export interface updateApplicationFeedbackResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateApplicationFeedbackResp
  }

  export interface GetApplicationFeedbackListReq {
    app_id: string // 目标应用 ID, 示例值: "cli_9f115af860f7901b"
    from_date?: string // 查询的起始日期, 格式为yyyy-mm-dd。不填则默认为当前日期减去180天, 示例值: "2022-01-30"
    to_date?: string // 查询的结束日期, 格式为yyyy-mm-dd。不填默认为当前日期, 只能查询 180 天内的数据, 示例值: "2022-01-30"
    feedback_type?: number // 反馈类型, 不填写则表示查询所有反馈类型, 示例值: 1, 可选值有: 1: 故障反馈, 2: 产品建议
    status?: number // 反馈处理状态, 不填写则表示查询所有处理类型, 示例值: 0, 可选值有: 0: 反馈未处理, 1: 反馈已处理, 2: 反馈处理中, 3: 反馈已关闭
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    page_token?: string // 分页拉取反馈列表起始位置标示, 不填表示从头开始, 示例值: ""7064688334618378259""
    page_size?: number // 本次拉取反馈列表最大个数, 示例值: 100, 默认值: `100`, 取值范围: `1` ～ `100`
  }

  export interface GetApplicationFeedbackListResp {
    feedback_list?: GetApplicationFeedbackListRespFeedback[] // 应用的反馈列表
    has_more: boolean // 是否还有更多用户反馈列表, true: 是, false: 否
    page_token: string // 拉取下一页应用反馈列表时使用的 page_token
  }

  export interface GetApplicationFeedbackListRespFeedback {
    feedback_id: string // 应用反馈 ID, 应用反馈记录唯一标识
    app_id: string // 被反馈应用ID
    feedback_time: string // 反馈提交时间, 格式为yyyy-mm-dd hh:mm:ss
    tenant_name: string // 反馈用户的租户名, 查询 isv 应用时返回
    feedback_type: number // 反馈类型, 可选值有: 1: 故障反馈, 2: 产品建议
    status: number // 反馈处理状态, 可选值有: 0: 反馈未处理, 1: 反馈已处理, 2: 反馈处理中, 3: 反馈已关闭
    fault_type?: number[] // 故障类型列表: 1: 黑屏 2: 白屏 3: 无法打开小程序  4: 卡顿 5: 小程序闪退 6: 页面加载慢 7: 死机 8: 其他异常
    fault_time: string // 故障时间, 格式为yyyy-mm-dd hh:mm:ss
    source: number // 反馈来源: 1: 小程序 2: 网页应用 3: 机器人 4: webSDK, 可选值有: 1: 小程序, 2: 网页应用, 3: 机器人, 4: WebSDK
    contact: string // 用户联系方式, 只有用户填写联系方式后返回, 字段权限要求（满足任一）: 获取用户邮箱信息, 获取用户手机号
    update_time: string // 反馈处理时间, 格式为yyyy-mm-dd hh:mm:ss
    description: string // 反馈问题描述
    user_id: string // 反馈用户id, 租户内用户的唯一标识, ID值与查询参数中的user_id_type对应
    operator_id: string // 操作者id, 租户内用户的唯一标识, ID值与查询参数中的user_id_type 对应
    images?: string[] // 反馈图片url列表, url 过期时间三天
    feedback_path: string // $$$application.v6.type.application.feedback.prop.feedback_path.desc$$$
  }

  export interface getApplicationFeedbackListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApplicationFeedbackListResp
  }
}

class IsApplicationUserAdminReq {
  open_id?: any
  employee_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.open_id !== undefined) {
      q['open_id'] = this.open_id
    }
    if (this.employee_id !== undefined) {
      q['employee_id'] = this.employee_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationUserAdminScopeReq {
  employee_id?: any
  open_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_id !== undefined) {
      q['employee_id'] = this.employee_id
    }
    if (this.open_id !== undefined) {
      q['open_id'] = this.open_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationAppVisibilityReq {
  app_id?: any
  user_page_token?: any
  user_page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.app_id !== undefined) {
      q['app_id'] = this.app_id
    }
    if (this.user_page_token !== undefined) {
      q['user_page_token'] = this.user_page_token
    }
    if (this.user_page_size !== undefined) {
      q['user_page_size'] = this.user_page_size
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationUserVisibleAppReq {
  page_token?: any
  page_size?: any
  lang?: any
  open_id?: any
  user_id?: any

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
    if (this.lang !== undefined) {
      q['lang'] = this.lang
    }
    if (this.open_id !== undefined) {
      q['open_id'] = this.open_id
    }
    if (this.user_id !== undefined) {
      q['user_id'] = this.user_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationAppListReq {
  page_token?: any
  page_size?: any
  lang?: any
  status?: any

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
    if (this.lang !== undefined) {
      q['lang'] = this.lang
    }
    if (this.status !== undefined) {
      q['status'] = this.status
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateApplicationAppVisibilityReq {
  app_id?: any
  del_users?: any
  add_users?: any
  is_visiable_to_all?: any
  add_departments?: any
  del_departments?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      app_id: this.app_id,
      del_users: this.del_users,
      add_users: this.add_users,
      is_visiable_to_all: this.is_visiable_to_all,
      add_departments: this.add_departments,
      del_departments: this.del_departments
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetApplicationAppAdminUserListReq {
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

class CheckUserIsInApplicationPaidScopeReq {
  open_id?: any
  user_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.open_id !== undefined) {
      q['open_id'] = this.open_id
    }
    if (this.user_id !== undefined) {
      q['user_id'] = this.user_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationOrderListReq {
  status?: any
  page_size?: any
  page_token?: any
  tenant_key?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.status !== undefined) {
      q['status'] = this.status
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.tenant_key !== undefined) {
      q['tenant_key'] = this.tenant_key
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationOrderReq {
  order_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.order_id !== undefined) {
      q['order_id'] = this.order_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationUnderAuditListReq {
  lang?: any
  page_token?: any
  page_size?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.lang !== undefined) {
      q['lang'] = this.lang
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationReq {
  app_id?: any
  lang?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_id', this.app_id)

    const q = {} as { [key: string]: any }
    if (this.lang !== undefined) {
      q['lang'] = this.lang
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationVersionReq {
  app_id?: any
  version_id?: any
  lang?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_id', this.app_id)
    path = path.replace(':version_id', this.version_id)

    const q = {} as { [key: string]: any }
    if (this.lang !== undefined) {
      q['lang'] = this.lang
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateApplicationVersionReq {
  app_id?: any
  version_id?: any
  user_id_type?: any
  operator_id?: any
  reject_reason?: any
  status?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      status: this.status
    }
  }

  getPath(path: string) {
    path = path.replace(':app_id', this.app_id)
    path = path.replace(':version_id', this.version_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.operator_id !== undefined) {
      q['operator_id'] = this.operator_id
    }
    if (this.reject_reason !== undefined) {
      q['reject_reason'] = this.reject_reason
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateApplicationReq {
  app_id?: any
  lang?: any
  common_categories?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      common_categories: this.common_categories
    }
  }

  getPath(path: string) {
    path = path.replace(':app_id', this.app_id)

    const q = {} as { [key: string]: any }
    if (this.lang !== undefined) {
      q['lang'] = this.lang
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationUsageOverviewReq {
  app_id?: any
  department_id_type?: any
  date?: any
  cycle_type?: any
  department_id?: any
  ability?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      date: this.date,
      cycle_type: this.cycle_type,
      department_id: this.department_id,
      ability: this.ability
    }
  }

  getPath(path: string) {
    path = path.replace(':app_id', this.app_id)

    const q = {} as { [key: string]: any }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationUsageTrendReq {
  app_id?: any
  ability?: any
  time_start?: any
  time_end?: any
  time_interval?: any
  filters?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      app_id: this.app_id,
      ability: this.ability,
      time_start: this.time_start,
      time_end: this.time_end,
      time_interval: this.time_interval,
      filters: this.filters
    }
  }

  getPath(path: string) {
    return path
  }
}

class UpdateApplicationFeedbackReq {
  app_id?: any
  feedback_id?: any
  user_id_type?: any
  status?: any
  operator_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_id', this.app_id)
    path = path.replace(':feedback_id', this.feedback_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.status !== undefined) {
      q['status'] = this.status
    }
    if (this.operator_id !== undefined) {
      q['operator_id'] = this.operator_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApplicationFeedbackListReq {
  app_id?: any
  from_date?: any
  to_date?: any
  feedback_type?: any
  status?: any
  user_id_type?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_id', this.app_id)

    const q = {} as { [key: string]: any }
    if (this.from_date !== undefined) {
      q['from_date'] = this.from_date
    }
    if (this.to_date !== undefined) {
      q['to_date'] = this.to_date
    }
    if (this.feedback_type !== undefined) {
      q['feedback_type'] = this.feedback_type
    }
    if (this.status !== undefined) {
      q['status'] = this.status
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
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
