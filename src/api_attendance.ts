import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class AttendanceService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getAttendanceGroupList 翻页获取所有考勤组列表。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list
  async getAttendanceGroupList(
    request: Attendance.GetAttendanceGroupListReq
  ): Promise<{
    data: Attendance.GetAttendanceGroupListResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceGroupListReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceGroupList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/groups',
      body: new GetAttendanceGroupListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetAttendanceGroupListReq, Attendance.GetAttendanceGroupListResp>(
      req
    )
  }
  // createAttendanceGroup 考勤组, 是对部门或者员工在某个特定场所及特定时间段内的出勤情况（包括上下班、迟到、早退、病假、婚假、丧假、公休、工作时间、加班情况等）的一种规则设定。
  //
  // 通过设置考勤组, 可以从部门、员工两个维度, 来设定考勤方式、考勤时间、考勤地点等考勤规则。
  // 出于安全考虑, 目前通过该接口只允许修改自己创建的考勤组。
  // ## 考勤组负责人
  // 考勤组负责人可修改该考勤组的排班, 并查看该考勤组的考勤数据。
  // 如果考勤组负责人同时被企业管理员赋予了考勤管理员的角色, 则该考勤组负责人还拥有考勤管理员的权限, 可以编辑及删除考勤规则。
  // ## 考勤组人员
  // 可按部门、员工两个维度, 设置需要参加考勤或无需参加考勤的人员。
  // - 若是按部门维度添加的考勤人员, 当有新员工加入该部门时, 其会自动加入该考勤组。
  // - 若是按员工维度添加的考勤人员, 当其上级部门被添加到其他考勤组时, 该员工不会更换考勤组。
  // ## 考勤组类型
  // 提供 3 种不同的考勤类型: 固定班制、排班制、自由班制。
  // - 固定班制: 指考勤组内每位人员的上下班时间一致, 适用于上下班时间固定或无需安排多个班次的考勤组。
  // - 排班制: 指考勤组人员的上下班时间不完全一致, 可自定义安排每位人员的上下班时间, 适用于存在多个班次如早晚班的考勤组。
  // - 自由班制: 指没有具体的班次, 考勤组人员可以在打卡时段内自由打卡, 按照打卡时段统计上班时长。
  // ## 考勤班次
  // - 固定班制下, 需设置周一到周日每天安排哪个班次, 以及可针对特殊日期进行打卡设置。
  // - 排班制下, 需对考勤组内每一位人员的每一天进行班次指定。
  // - 自由班制下, 需设置一天中最早打卡时间和最晚打卡时间, 以及一周中哪几天需要打卡。
  // ## 考勤方式
  // 支持 3 种考勤方式: GPS 打卡、Wi-Fi 打卡、考勤机打卡。
  // - GPS 打卡: 需设置经纬度信息及考勤地点名称。
  // - Wi-Fi 打卡: 需设置 Wi-Fi 名称及 Wi-Fi 的 MAC 地址。
  // - 考勤机打卡: 需设置考勤机名称及考勤机序号。
  // ## 考勤其他设置
  // - 规则设置: 支持设置是否允许外勤打卡, 是否允许补卡以及一个月补卡的次数, 是否允许 PC 端打卡。
  // - 安全设置: 支持设置是否开启人脸识别打卡, 以及什么情况下开启人脸识别。
  // - 统计设置: 支持设置考勤组人员是否可以查看到某些维度的统计数据。
  // - 加班设置: 支持配置加班时间的计算规则。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create
  async createAttendanceGroup(
    request: Attendance.CreateAttendanceGroupReq
  ): Promise<{
    data: Attendance.CreateAttendanceGroupResp
    response: Response
  }> {
    const req: RawRequestReq<CreateAttendanceGroupReq> = {
      scope: 'Attendance',
      api: 'CreateAttendanceGroup',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/groups',
      body: new CreateAttendanceGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateAttendanceGroupReq, Attendance.CreateAttendanceGroupResp>(req)
  }
  // searchAttendanceGroup 按考勤组名称查询考勤组摘要信息。查询条件支持名称精确匹配和模糊匹配两种方式。查询结果按考勤组修改时间 desc 排序, 且最大记录数为 10 条。
  //
  // 该接口依赖的数据和考勤组主数据间存在数据同步延时（正常数据同步 2 秒以内）, 因此在使用该接口时需注意评估数据延迟潜在风险。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search
  async searchAttendanceGroup(
    request: Attendance.SearchAttendanceGroupReq
  ): Promise<{
    data: Attendance.SearchAttendanceGroupResp
    response: Response
  }> {
    const req: RawRequestReq<SearchAttendanceGroupReq> = {
      scope: 'Attendance',
      api: 'SearchAttendanceGroup',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/groups/search',
      body: new SearchAttendanceGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SearchAttendanceGroupReq, Attendance.SearchAttendanceGroupResp>(req)
  }
  // getAttendanceGroup 通过考勤组 ID 获取考勤组详情。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/get
  async getAttendanceGroup(
    request: Attendance.GetAttendanceGroupReq
  ): Promise<{
    data: Attendance.GetAttendanceGroupResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceGroupReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceGroup',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/groups/:group_id',
      body: new GetAttendanceGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetAttendanceGroupReq, Attendance.GetAttendanceGroupResp>(req)
  }
  // deleteAttendanceGroup 通过班次 ID 删除班次。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/delete
  async deleteAttendanceGroup(
    request: Attendance.DeleteAttendanceGroupReq
  ): Promise<{
    data: Attendance.DeleteAttendanceGroupResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteAttendanceGroupReq> = {
      scope: 'Attendance',
      api: 'DeleteAttendanceGroup',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/groups/:group_id',
      body: new DeleteAttendanceGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteAttendanceGroupReq, Attendance.DeleteAttendanceGroupResp>(req)
  }
  // getAttendanceShiftList 翻页获取所有班次列表。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/list
  async getAttendanceShiftList(
    request: Attendance.GetAttendanceShiftListReq
  ): Promise<{
    data: Attendance.GetAttendanceShiftListResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceShiftListReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceShiftList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/shifts',
      body: new GetAttendanceShiftListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetAttendanceShiftListReq, Attendance.GetAttendanceShiftListResp>(
      req
    )
  }
  // getAttendanceShift 通过班次的名称查询班次信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query
  async getAttendanceShift(
    request: Attendance.GetAttendanceShiftReq
  ): Promise<{
    data: Attendance.GetAttendanceShiftResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceShiftReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceShift',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/shifts/query',
      body: new GetAttendanceShiftReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetAttendanceShiftReq, Attendance.GetAttendanceShiftResp>(req)
  }
  // getAttendanceShiftDetail 通过班次 ID 获取班次详情。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/get
  async getAttendanceShiftDetail(
    request: Attendance.GetAttendanceShiftDetailReq
  ): Promise<{
    data: Attendance.GetAttendanceShiftDetailResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceShiftDetailReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceShiftDetail',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/shifts/:shift_id',
      body: new GetAttendanceShiftDetailReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetAttendanceShiftDetailReq,
      Attendance.GetAttendanceShiftDetailResp
    >(req)
  }
  // deleteAttendanceShift 通过班次 ID 删除班次。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/delete
  async deleteAttendanceShift(
    request: Attendance.DeleteAttendanceShiftReq
  ): Promise<{
    data: Attendance.DeleteAttendanceShiftResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteAttendanceShiftReq> = {
      scope: 'Attendance',
      api: 'DeleteAttendanceShift',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/shifts/:shift_id',
      body: new DeleteAttendanceShiftReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteAttendanceShiftReq, Attendance.DeleteAttendanceShiftResp>(req)
  }
  // createAttendanceShift 班次是描述一次考勤任务时间规则的统称, 比如一天打多少次卡, 每次卡的上下班时间, 晚到多长时间算迟到, 晚到多长时间算缺卡等。
  //
  // - 创建一个考勤组前, 必须先创建一个或者多个班次。
  // - 一个公司内的班次是共享的, 你可以直接引用他人创建的班次, 但是需要注意的是, 若他人修改了班次, 会影响到你的考勤组及其考勤结果。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create
  async createAttendanceShift(
    request: Attendance.CreateAttendanceShiftReq
  ): Promise<{
    data: Attendance.CreateAttendanceShiftResp
    response: Response
  }> {
    const req: RawRequestReq<CreateAttendanceShiftReq> = {
      scope: 'Attendance',
      api: 'CreateAttendanceShift',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/shifts',
      body: new CreateAttendanceShiftReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateAttendanceShiftReq, Attendance.CreateAttendanceShiftResp>(req)
  }
  // getAttendanceUserDailyShift 支持查询多个用户的排班情况, 查询的时间跨度不能超过 30 天。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/query
  async getAttendanceUserDailyShift(
    request: Attendance.GetAttendanceUserDailyShiftReq
  ): Promise<{
    data: Attendance.GetAttendanceUserDailyShiftResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceUserDailyShiftReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceUserDailyShift',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_daily_shifts/query',
      body: new GetAttendanceUserDailyShiftReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetAttendanceUserDailyShiftReq,
      Attendance.GetAttendanceUserDailyShiftResp
    >(req)
  }
  // batchCreateAttendanceUserDailyShift 班表是用来描述考勤组内人员每天按哪个班次进行上班。目前班表支持按一个整月对一位或多位人员进行排班。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/batch_create
  async batchCreateAttendanceUserDailyShift(
    request: Attendance.BatchCreateAttendanceUserDailyShiftReq
  ): Promise<{
    data: Attendance.BatchCreateAttendanceUserDailyShiftResp
    response: Response
  }> {
    const req: RawRequestReq<BatchCreateAttendanceUserDailyShiftReq> = {
      scope: 'Attendance',
      api: 'BatchCreateAttendanceUserDailyShift',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_daily_shifts/batch_create',
      body: new BatchCreateAttendanceUserDailyShiftReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchCreateAttendanceUserDailyShiftReq,
      Attendance.BatchCreateAttendanceUserDailyShiftResp
    >(req)
  }
  // getAttendanceUserStatsField 查询考勤统计支持的日度统计或月度统计的统计表头。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_field/query
  async getAttendanceUserStatsField(
    request: Attendance.GetAttendanceUserStatsFieldReq
  ): Promise<{
    data: Attendance.GetAttendanceUserStatsFieldResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceUserStatsFieldReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceUserStatsField',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_stats_fields/query',
      body: new GetAttendanceUserStatsFieldReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetAttendanceUserStatsFieldReq,
      Attendance.GetAttendanceUserStatsFieldResp
    >(req)
  }
  // getAttendanceUserStatsView 查询开发者定制的日度统计或月度统计的统计报表表头设置信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/query
  async getAttendanceUserStatsView(
    request: Attendance.GetAttendanceUserStatsViewReq
  ): Promise<{
    data: Attendance.GetAttendanceUserStatsViewResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceUserStatsViewReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceUserStatsView',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_stats_views/query',
      body: new GetAttendanceUserStatsViewReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetAttendanceUserStatsViewReq,
      Attendance.GetAttendanceUserStatsViewResp
    >(req)
  }
  // updateAttendanceUserStatsView 更新开发者定制的日度统计或月度统计的统计报表表头设置信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/update
  async updateAttendanceUserStatsView(
    request: Attendance.UpdateAttendanceUserStatsViewReq
  ): Promise<{
    data: Attendance.UpdateAttendanceUserStatsViewResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateAttendanceUserStatsViewReq> = {
      scope: 'Attendance',
      api: 'UpdateAttendanceUserStatsView',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_stats_views/:user_stats_view_id',
      body: new UpdateAttendanceUserStatsViewReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateAttendanceUserStatsViewReq,
      Attendance.UpdateAttendanceUserStatsViewResp
    >(req)
  }
  // getAttendanceUserStatsData 查询日度统计或月度统计的统计数据。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_data/query
  async getAttendanceUserStatsData(
    request: Attendance.GetAttendanceUserStatsDataReq
  ): Promise<{
    data: Attendance.GetAttendanceUserStatsDataResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceUserStatsDataReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceUserStatsData',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_stats_datas/query',
      body: new GetAttendanceUserStatsDataReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetAttendanceUserStatsDataReq,
      Attendance.GetAttendanceUserStatsDataResp
    >(req)
  }
  // getAttendanceUserApproval 获取员工在某段时间内的请假、加班、外出和出差四种审批的通过数据。
  //
  // 请假的假期时长字段, 暂未开放提供, 待后续提供。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query
  async getAttendanceUserApproval(
    request: Attendance.GetAttendanceUserApprovalReq
  ): Promise<{
    data: Attendance.GetAttendanceUserApprovalResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceUserApprovalReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceUserApproval',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_approvals/query',
      body: new GetAttendanceUserApprovalReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetAttendanceUserApprovalReq,
      Attendance.GetAttendanceUserApprovalResp
    >(req)
  }
  // createAttendanceUserApproval 由于部分企业使用的是自己的审批系统, 而不是飞书审批系统, 因此员工的请假、加班等数据无法流入到飞书考勤系统中, 导致员工在请假时间段内依然收到打卡提醒, 并且被记为缺卡。
  //
  // 对于这些只使用飞书考勤系统, 而未使用飞书审批系统的企业, 可以通过考勤开放接口的形式, 将三方审批结果数据回写到飞书考勤系统中。
  // 目前支持写入加班、请假、出差和外出这四种审批结果, 写入只会追加(insert), 不会覆盖(update)
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create
  async createAttendanceUserApproval(
    request: Attendance.CreateAttendanceUserApprovalReq
  ): Promise<{
    data: Attendance.CreateAttendanceUserApprovalResp
    response: Response
  }> {
    const req: RawRequestReq<CreateAttendanceUserApprovalReq> = {
      scope: 'Attendance',
      api: 'CreateAttendanceUserApproval',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_approvals',
      body: new CreateAttendanceUserApprovalReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CreateAttendanceUserApprovalReq,
      Attendance.CreateAttendanceUserApprovalResp
    >(req)
  }
  // updateAttendanceRemedyApproval 对于只使用飞书考勤系统而未使用飞书审批系统的企业, 可以通过该接口更新写入飞书考勤系统中的三方系统审批状态, 例如请假、加班、外出、出差、补卡等审批, 状态包括通过、不通过、撤销等。
  //
  // 发起状态的审批才可以被更新为通过、不通过, 已经通过的审批才可以被更新为撤销。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/approval_info/process
  async updateAttendanceRemedyApproval(
    request: Attendance.UpdateAttendanceRemedyApprovalReq
  ): Promise<{
    data: Attendance.UpdateAttendanceRemedyApprovalResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateAttendanceRemedyApprovalReq> = {
      scope: 'Attendance',
      api: 'UpdateAttendanceRemedyApproval',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/approval_infos/process',
      body: new UpdateAttendanceRemedyApprovalReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateAttendanceRemedyApprovalReq,
      Attendance.UpdateAttendanceRemedyApprovalResp
    >(req)
  }
  // batchGetAttendanceUserFlow 批量查询授权内员工的实际打卡流水记录。例如, 企业给一个员工设定的班次是上午 9 点和下午 6 点各打一次上下班卡, 但是该员工在这期间打了多次卡, 该接口会把所有的打卡记录都返回。
  //
  // 如果只需获取打卡结果, 而不需要详细的打卡数据, 可使用“获取打卡结果”的接口。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/query
  async batchGetAttendanceUserFlow(
    request: Attendance.BatchGetAttendanceUserFlowReq
  ): Promise<{
    data: Attendance.BatchGetAttendanceUserFlowResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetAttendanceUserFlowReq> = {
      scope: 'Attendance',
      api: 'BatchGetAttendanceUserFlow',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_flows/query',
      body: new BatchGetAttendanceUserFlowReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchGetAttendanceUserFlowReq,
      Attendance.BatchGetAttendanceUserFlowResp
    >(req)
  }
  // getAttendanceUserFlow 通过打卡记录 ID 获取用户的打卡流水记录。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/get
  async getAttendanceUserFlow(
    request: Attendance.GetAttendanceUserFlowReq
  ): Promise<{
    data: Attendance.GetAttendanceUserFlowResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceUserFlowReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceUserFlow',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_flows/:user_flow_id',
      body: new GetAttendanceUserFlowReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetAttendanceUserFlowReq, Attendance.GetAttendanceUserFlowResp>(req)
  }
  // getAttendanceUserTask 获取企业内员工的实际打卡结果, 包括上班打卡结果和下班打卡结果。
  //
  // - 如果企业给一个员工设定的班次是上午 9 点和下午 6 点各打一次上下班卡, 即使员工在这期间打了多次卡, 该接口也只会返回 1 条记录。
  // - 如果要获取打卡的详细数据, 如打卡位置等信息, 可使用“获取打卡流水记录”或“批量查询打卡流水记录”的接口。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query
  async getAttendanceUserTask(
    request: Attendance.GetAttendanceUserTaskReq
  ): Promise<{
    data: Attendance.GetAttendanceUserTaskResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceUserTaskReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceUserTask',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_tasks/query',
      body: new GetAttendanceUserTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetAttendanceUserTaskReq, Attendance.GetAttendanceUserTaskResp>(req)
  }
  // batchCreateAttendanceUserFlow 导入授权内员工的打卡流水记录。导入后, 会根据员工所在的考勤组班次规则, 计算最终的打卡状态与结果。
  //
  // 适用于考勤机数据导入等场景。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/batch_create
  async batchCreateAttendanceUserFlow(
    request: Attendance.BatchCreateAttendanceUserFlowReq
  ): Promise<{
    data: Attendance.BatchCreateAttendanceUserFlowResp
    response: Response
  }> {
    const req: RawRequestReq<BatchCreateAttendanceUserFlowReq> = {
      scope: 'Attendance',
      api: 'BatchCreateAttendanceUserFlow',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_flows/batch_create',
      body: new BatchCreateAttendanceUserFlowReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchCreateAttendanceUserFlowReq,
      Attendance.BatchCreateAttendanceUserFlowResp
    >(req)
  }
  // getAttendanceUserTaskRemedyAllowedRemedyList 获取用户某天可以补的第几次上 / 下班卡的时间。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query_user_allowed_remedys
  async getAttendanceUserTaskRemedyAllowedRemedyList(
    request: Attendance.GetAttendanceUserTaskRemedyAllowedRemedyListReq
  ): Promise<{
    data: Attendance.GetAttendanceUserTaskRemedyAllowedRemedyListResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceUserTaskRemedyAllowedRemedyListReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceUserTaskRemedyAllowedRemedyList',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/attendance/v1/user_task_remedys/query_user_allowed_remedys',
      body: new GetAttendanceUserTaskRemedyAllowedRemedyListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetAttendanceUserTaskRemedyAllowedRemedyListReq,
      Attendance.GetAttendanceUserTaskRemedyAllowedRemedyListResp
    >(req)
  }
  // getAttendanceUserTaskRemedy 获取授权内员工的补卡记录。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query
  async getAttendanceUserTaskRemedy(
    request: Attendance.GetAttendanceUserTaskRemedyReq
  ): Promise<{
    data: Attendance.GetAttendanceUserTaskRemedyResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceUserTaskRemedyReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceUserTaskRemedy',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_task_remedys/query',
      body: new GetAttendanceUserTaskRemedyReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetAttendanceUserTaskRemedyReq,
      Attendance.GetAttendanceUserTaskRemedyResp
    >(req)
  }
  // createAttendanceUserTaskRemedy 对于只使用飞书考勤系统而未使用飞书审批系统的企业, 可以通过该接口, 将在三方审批系统中发起的补卡审批数据, 写入到飞书考勤系统中。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create
  async createAttendanceUserTaskRemedy(
    request: Attendance.CreateAttendanceUserTaskRemedyReq
  ): Promise<{
    data: Attendance.CreateAttendanceUserTaskRemedyResp
    response: Response
  }> {
    const req: RawRequestReq<CreateAttendanceUserTaskRemedyReq> = {
      scope: 'Attendance',
      api: 'CreateAttendanceUserTaskRemedy',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_task_remedys',
      body: new CreateAttendanceUserTaskRemedyReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CreateAttendanceUserTaskRemedyReq,
      Attendance.CreateAttendanceUserTaskRemedyResp
    >(req)
  }
  // getAttendanceUserSettingList 批量查询授权内员工的用户设置信息, 包括人脸照片文件 ID、人脸照片更新时间。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/query
  async getAttendanceUserSettingList(
    request: Attendance.GetAttendanceUserSettingListReq
  ): Promise<{
    data: Attendance.GetAttendanceUserSettingListResp
    response: Response
  }> {
    const req: RawRequestReq<GetAttendanceUserSettingListReq> = {
      scope: 'Attendance',
      api: 'GetAttendanceUserSettingList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_settings/query',
      body: new GetAttendanceUserSettingListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetAttendanceUserSettingListReq,
      Attendance.GetAttendanceUserSettingListResp
    >(req)
  }
  // updateAttendanceUserSetting 修改授权内员工的用户设置信息, 包括人脸照片文件 ID。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/modify
  async updateAttendanceUserSetting(
    request: Attendance.UpdateAttendanceUserSettingReq
  ): Promise<{
    data: Attendance.UpdateAttendanceUserSettingResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateAttendanceUserSettingReq> = {
      scope: 'Attendance',
      api: 'UpdateAttendanceUserSetting',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/user_settings/modify',
      body: new UpdateAttendanceUserSettingReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateAttendanceUserSettingReq,
      Attendance.UpdateAttendanceUserSettingResp
    >(req)
  }
  // downloadAttendanceFile 通过文件 ID 下载指定的文件。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/download
  async downloadAttendanceFile(
    request: Attendance.DownloadAttendanceFileReq
  ): Promise<{
    data: Attendance.DownloadAttendanceFileResp
    response: Response
  }> {
    const req: RawRequestReq<DownloadAttendanceFileReq> = {
      scope: 'Attendance',
      api: 'DownloadAttendanceFile',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/files/:file_id/download',
      body: new DownloadAttendanceFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file_download: true
    }
    return this.cli.RawRequest<DownloadAttendanceFileReq, Attendance.DownloadAttendanceFileResp>(
      req
    )
  }
  // uploadAttendanceFile 上传文件并获取文件 ID, 可用于“修改用户设置”接口中的 face_key 参数。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/upload
  async uploadAttendanceFile(
    request: Attendance.UploadAttendanceFileReq
  ): Promise<{
    data: Attendance.UploadAttendanceFileResp
    response: Response
  }> {
    const req: RawRequestReq<UploadAttendanceFileReq> = {
      scope: 'Attendance',
      api: 'UploadAttendanceFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/attendance/v1/files/upload',
      body: new UploadAttendanceFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<UploadAttendanceFileReq, Attendance.UploadAttendanceFileResp>(req)
  }
}

export declare namespace Attendance {
  export interface GetAttendanceGroupListReq {
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "wgNOR1rmxogRvAsGl6CXlQ["
  }

  export interface GetAttendanceGroupListResp {
    group_list?: GetAttendanceGroupListRespGroup[] // 考勤组列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetAttendanceGroupListRespGroup {
    group_id: string // 考勤组 ID
    group_name: string // 考勤组名称
  }

  export interface getAttendanceGroupListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceGroupListResp
  }

  export interface CreateAttendanceGroupReq {
    employee_type: string // 用户 ID 的类型, 示例值: "employee_id", 可选值有: employee_id: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, employee_no: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    dept_type: string // 部门 ID 的类型, 示例值: "od-fcb45c28a45311afd441b8869541ece8", 可选值有: open_id: 暂时只支持部门的 openid
    group: CreateAttendanceGroupReqGroup // 6921319402260496386
    operator_id?: string // 操作人uid, 如果您未操作[考勤管理后台“API 接入”流程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/attendance-development-guidelines), 则此字段为必填字段, 示例值: "dd31248a"
  }

  export interface CreateAttendanceGroupReqGroup {
    group_id?: string // 考勤组 ID（仅修改时提供）, 需要从“获取打卡结果”的接口中获取 groupId, 示例值: "6919358128597097404"
    group_name: string // 考勤组名称, 示例值: "开心考勤"
    time_zone: string // 时区, 示例值: "Asia/Shanghai"
    bind_dept_ids?: string[] // 绑定的部门 ID, 示例值: od-fcb45c28a45311afd440b7869541fce8
    except_dept_ids?: string[] // 排除的部门 ID, 示例值: od-fcb45c28a45311afd440b7869541fce8
    bind_user_ids?: string[] // 绑定的用户 ID, 示例值: 52aa1fa1
    except_user_ids?: string[] // 排除的用户 ID, 示例值: 52aa1fa1
    group_leader_ids?: string[] // 考勤负责人 ID 列表, 必选字段, 示例值: 2bg4a9be
    allow_out_punch?: boolean // 是否允许外勤打卡, 示例值: true
    allow_pc_punch?: boolean // 是否允许 PC 端打卡, 示例值: true
    allow_remedy?: boolean // 是否限制补卡, 示例值: true
    remedy_limit?: boolean // 是否限制补卡次数, 示例值: true
    remedy_limit_count?: number // 补卡次数, 示例值: 3
    remedy_date_limit?: boolean // 是否限制补卡时间, 示例值: true
    remedy_date_num?: number // 补卡时间, 几天内补卡, 示例值: 3
    show_cumulative_time?: boolean // 是否展示累计时长, 示例值: true
    show_over_time?: boolean // 是否展示加班时长, 示例值: true
    hide_staff_punch_time?: boolean // 是否隐藏员工打卡详情, 示例值: true
    face_punch?: boolean // 是否开启人脸识别打卡, 示例值: true
    face_punch_cfg?: number // 人脸识别打卡规则, 1: 每次打卡均需人脸识别, 2: 疑似作弊打卡时需要人脸识别, 示例值: 1
    face_downgrade?: boolean // 人脸识别失败时是否允许普通拍照打卡, 示例值: true
    replace_basic_pic?: boolean // 人脸识别失败时是否允许替换基准图片, 示例值: true
    machines?: CreateAttendanceGroupReqGroupMachine[] // 考勤机列表
    gps_range?: number // GPS 打卡的有效范围（不建议使用）, 示例值: 300
    locations?: CreateAttendanceGroupReqGroupLocation[] // 地址列表
    group_type: number // 考勤类型, 0: 固定班制, 2: 排班制, 3: 自由班制, 示例值: 0
    punch_day_shift_ids?: string[] // 固定班制必须填, 示例值: 6921319402260496386
    free_punch_cfg?: CreateAttendanceGroupReqGroupFreePunchCfg // 配置自由班制
    calendar_id: number // 国家日历  ID, 0: 不根据国家日历排休, 1: 中国大陆, 2: 美国, 3: 日本, 4: 印度, 5: 新加坡, 默认 1, 示例值: 1
    need_punch_special_days?: CreateAttendanceGroupReqGroupNeedPunchSpecialDay[] // 必须打卡的特殊日期
    no_need_punch_special_days?: CreateAttendanceGroupReqGroupNoNeedPunchSpecialDay[] // 无需打卡的特殊日期
    work_day_no_punch_as_lack?: boolean // 自由班制下工作日不打卡是否记为缺卡, 示例值: true
    effect_now?: boolean // 是否立即生效, 默认 false, 示例值: true
    remedy_period_type?: number // 补卡周期类型, 示例值: 0
    remedy_period_custom_date?: number // 补卡自定义周期起始日期, 示例值: 1
    punch_type?: number // 打卡类型, 位运算。1: GPS 打卡, 2: Wi-Fi 打卡, 4: 考勤机打卡, 8: IP 打卡, 示例值: 1
  }

  export interface CreateAttendanceGroupReqGroupFreePunchCfg {
    free_start_time: string // 自由班制打卡开始时间, 示例值: "7:00"
    free_end_time: string // 自由班制打卡结束时间, 示例值: "18:00"
    punch_day: number // 打卡的时间, 为 7 位数字, 每一位依次代表周一到周日, 0 为不上班, 1 为上班, 示例值: 1111100
    work_day_no_punch_as_lack?: boolean // 工作日不打卡是否记为缺卡, 示例值: true
  }

  export interface CreateAttendanceGroupReqGroupLocation {
    location_name: string // 地址名称, 示例值: "浙江省杭州市余杭区五常街道木桥头西溪八方城"
    location_type: number // 地址类型, 1: GPS, 2: Wi-Fi, 8: IP, 示例值: 1
    latitude?: number // 地址纬度, 示例值: 30.28994
    longitude?: number // 地址经度, 示例值: 120.04509
    ssid?: string // Wi-Fi 名称, 示例值: "TP-Link-af12ca"
    bssid?: string // Wi-Fi 的 MAC 地址, 示例值: "08:00:20:0A:8C:6D"
    map_type?: number // 地图类型, 1: 高德, 2: 谷歌, 示例值: 1
    address?: string // 地址名称, 示例值: "北京市海淀区中航广场"
    ip?: string // IP 地址, 示例值: "122.224.123.146"
    feature?: string // 额外信息, 例如: 运营商信息, 示例值: "中国电信"
    gps_range?: number // GPS 打卡的有效范围, 示例值: 300
  }

  export interface CreateAttendanceGroupReqGroupMachine {
    machine_sn: string // 考勤机序列号, 示例值: "FS0701"
    machine_name: string // 考勤机名称, 示例值: "创实 9 楼"
  }

  export interface CreateAttendanceGroupReqGroupNeedPunchSpecialDay {
    punch_day: number // 打卡日期, 示例值: 20190101
    shift_id: string // 班次 ID, 示例值: "6919668827865513935"
  }

  export interface CreateAttendanceGroupReqGroupNoNeedPunchSpecialDay {
    punch_day: number // 打卡日期, 示例值: 20190101
    shift_id: string // 班次 ID, 示例值: "6919668827865513935"
  }

  export interface CreateAttendanceGroupResp {
    group: CreateAttendanceGroupRespGroup // 6921319402260496386
  }

  export interface CreateAttendanceGroupRespGroup {
    group_id: string // 考勤组 ID（仅修改时提供）, 需要从“获取打卡结果”的接口中获取 groupId
    group_name: string // 考勤组名称
    time_zone: string // 时区
    bind_dept_ids?: string[] // 绑定的部门 ID
    except_dept_ids?: string[] // 排除的部门 ID
    bind_user_ids?: string[] // 绑定的用户 ID
    except_user_ids?: string[] // 排除的用户 ID
    group_leader_ids?: string[] // 考勤负责人 ID 列表, 必选字段
    allow_out_punch: boolean // 是否允许外勤打卡
    allow_pc_punch: boolean // 是否允许 PC 端打卡
    allow_remedy: boolean // 是否限制补卡
    remedy_limit: boolean // 是否限制补卡次数
    remedy_limit_count: number // 补卡次数
    remedy_date_limit: boolean // 是否限制补卡时间
    remedy_date_num: number // 补卡时间, 几天内补卡
    show_cumulative_time: boolean // 是否展示累计时长
    show_over_time: boolean // 是否展示加班时长
    hide_staff_punch_time: boolean // 是否隐藏员工打卡详情
    face_punch: boolean // 是否开启人脸识别打卡
    face_punch_cfg: number // 人脸识别打卡规则, 1: 每次打卡均需人脸识别, 2: 疑似作弊打卡时需要人脸识别
    face_downgrade: boolean // 人脸识别失败时是否允许普通拍照打卡
    replace_basic_pic: boolean // 人脸识别失败时是否允许替换基准图片
    machines?: CreateAttendanceGroupRespGroupMachine[] // 考勤机列表
    gps_range: number // GPS 打卡的有效范围（不建议使用）
    locations?: CreateAttendanceGroupRespGroupLocation[] // 地址列表
    group_type: number // 考勤类型, 0: 固定班制, 2: 排班制, 3: 自由班制
    punch_day_shift_ids?: string[] // 固定班制必须填
    free_punch_cfg: CreateAttendanceGroupRespGroupFreePunchCfg // 配置自由班制
    calendar_id: number // 国家日历  ID, 0: 不根据国家日历排休, 1: 中国大陆, 2: 美国, 3: 日本, 4: 印度, 5: 新加坡, 默认 1
    need_punch_special_days?: CreateAttendanceGroupRespGroupNeedPunchSpecialDay[] // 必须打卡的特殊日期
    no_need_punch_special_days?: CreateAttendanceGroupRespGroupNoNeedPunchSpecialDay[] // 无需打卡的特殊日期
    work_day_no_punch_as_lack: boolean // 自由班制下工作日不打卡是否记为缺卡
    effect_now: boolean // 是否立即生效, 默认 false
    remedy_period_type: number // 补卡周期类型
    remedy_period_custom_date: number // 补卡自定义周期起始日期
    punch_type: number // 打卡类型, 位运算。1: GPS 打卡, 2: Wi-Fi 打卡, 4: 考勤机打卡, 8: IP 打卡
  }

  export interface CreateAttendanceGroupRespGroupFreePunchCfg {
    free_start_time: string // 自由班制打卡开始时间
    free_end_time: string // 自由班制打卡结束时间
    punch_day: number // 打卡的时间, 为 7 位数字, 每一位依次代表周一到周日, 0 为不上班, 1 为上班
    work_day_no_punch_as_lack: boolean // 工作日不打卡是否记为缺卡
  }

  export interface CreateAttendanceGroupRespGroupLocation {
    location_id: string // 地址 ID
    location_name: string // 地址名称
    location_type: number // 地址类型, 1: GPS, 2: Wi-Fi, 8: IP
    latitude: number // 地址纬度
    longitude: number // 地址经度
    ssid: string // Wi-Fi 名称
    bssid: string // Wi-Fi 的 MAC 地址
    map_type: number // 地图类型, 1: 高德, 2: 谷歌
    address: string // 地址名称
    ip: string // IP 地址
    feature: string // 额外信息, 例如: 运营商信息
    gps_range: number // GPS 打卡的有效范围
  }

  export interface CreateAttendanceGroupRespGroupMachine {
    machine_sn: string // 考勤机序列号
    machine_name: string // 考勤机名称
  }

  export interface CreateAttendanceGroupRespGroupNeedPunchSpecialDay {
    punch_day: number // 打卡日期
    shift_id: string // 班次 ID
  }

  export interface CreateAttendanceGroupRespGroupNoNeedPunchSpecialDay {
    punch_day: number // 打卡日期
    shift_id: string // 班次 ID
  }

  export interface createAttendanceGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateAttendanceGroupResp
  }

  export interface SearchAttendanceGroupReq {
    group_name: string // 考勤组名称, 示例值: "考勤组1"
    exactly_matched?: boolean // 是否精准匹配, 默认为 false: 模糊匹配；true: 精准匹配, 示例值: true
  }

  export interface SearchAttendanceGroupResp {
    group_list?: SearchAttendanceGroupRespGroup[] // 考勤组列表
  }

  export interface SearchAttendanceGroupRespGroup {
    group_id: string // 考勤组 ID
    group_name: string // 考勤组名称
  }

  export interface searchAttendanceGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SearchAttendanceGroupResp
  }

  export interface GetAttendanceGroupReq {
    group_id: string // 考勤组 ID, 获取方式: 1）[创建或修改考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create) 2）[按名称查询考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search) 3）[获取打卡结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query), 示例值: "6919358128597097404"
    employee_type: string // 用户 ID 的类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employeeId, `employee_no`: 员工工号
    dept_type: string // 部门 ID 的类型, 示例值: "od-fcb45c28a45311afd441b8869541ece8", 可选值有: `open_id`: 暂时只支持部门的 openid
  }

  export interface GetAttendanceGroupResp {
    group_id: string // 考勤组 ID（仅修改时提供）, 需要从“获取打卡结果”的接口中获取 groupId
    group_name: string // 考勤组名称
    time_zone: string // 时区
    bind_dept_ids?: string[] // 绑定的部门 ID
    except_dept_ids?: string[] // 排除的部门 ID
    bind_user_ids?: string[] // 绑定的用户 ID
    except_user_ids?: string[] // 排除的用户 ID
    group_leader_ids?: string[] // 考勤负责人 ID 列表, 必选字段
    allow_out_punch: boolean // 是否允许外勤打卡
    allow_pc_punch: boolean // 是否允许 PC 端打卡
    allow_remedy: boolean // 是否限制补卡
    remedy_limit: boolean // 是否限制补卡次数
    remedy_limit_count: number // 补卡次数
    remedy_date_limit: boolean // 是否限制补卡时间
    remedy_date_num: number // 补卡时间, 几天内补卡
    show_cumulative_time: boolean // 是否展示累计时长
    show_over_time: boolean // 是否展示加班时长
    hide_staff_punch_time: boolean // 是否隐藏员工打卡详情
    face_punch: boolean // 是否开启人脸识别打卡
    face_punch_cfg: number // 人脸识别打卡规则, 1: 每次打卡均需人脸识别, 2: 疑似作弊打卡时需要人脸识别
    face_downgrade: boolean // 人脸识别失败时是否允许普通拍照打卡
    replace_basic_pic: boolean // 人脸识别失败时是否允许替换基准图片
    machines?: GetAttendanceGroupRespMachine[] // 考勤机列表
    gps_range: number // GPS 打卡的有效范围（不建议使用）
    locations?: GetAttendanceGroupRespLocation[] // 地址列表
    group_type: number // 考勤类型, 0: 固定班制, 2: 排班制, 3: 自由班制
    punch_day_shift_ids?: string[] // 固定班制必须填
    free_punch_cfg: GetAttendanceGroupRespFreePunchCfg // 配置自由班制
    calendar_id: number // 国家日历  ID, 0: 不根据国家日历排休, 1: 中国大陆, 2: 美国, 3: 日本, 4: 印度, 5: 新加坡, 默认 1
    need_punch_special_days?: GetAttendanceGroupRespNeedPunchSpecialDay[] // 必须打卡的特殊日期
    no_need_punch_special_days?: GetAttendanceGroupRespNoNeedPunchSpecialDay[] // 无需打卡的特殊日期
    work_day_no_punch_as_lack: boolean // 自由班制下工作日不打卡是否记为缺卡
    effect_now: boolean // 是否立即生效, 默认 false
    remedy_period_type: number // 补卡周期类型
    remedy_period_custom_date: number // 补卡自定义周期起始日期
    punch_type: number // 打卡类型, 位运算。1: GPS 打卡, 2: Wi-Fi 打卡, 4: 考勤机打卡, 8: IP 打卡
  }

  export interface GetAttendanceGroupRespFreePunchCfg {
    free_start_time: string // 自由班制打卡开始时间
    free_end_time: string // 自由班制打卡结束时间
    punch_day: number // 打卡的时间, 为 7 位数字, 每一位依次代表周一到周日, 0 为不上班, 1 为上班
    work_day_no_punch_as_lack: boolean // 工作日不打卡是否记为缺卡
  }

  export interface GetAttendanceGroupRespLocation {
    location_id: string // 地址 ID
    location_name: string // 地址名称
    location_type: number // 地址类型, 1: GPS, 2: Wi-Fi, 8: IP
    latitude: number // 地址纬度
    longitude: number // 地址经度
    ssid: string // Wi-Fi 名称
    bssid: string // Wi-Fi 的 MAC 地址
    map_type: number // 地图类型, 1: 高德, 2: 谷歌
    address: string // 地址名称
    ip: string // IP 地址
    feature: string // 额外信息, 例如: 运营商信息
    gps_range: number // GPS 打卡的有效范围
  }

  export interface GetAttendanceGroupRespMachine {
    machine_sn: string // 考勤机序列号
    machine_name: string // 考勤机名称
  }

  export interface GetAttendanceGroupRespNeedPunchSpecialDay {
    punch_day: number // 打卡日期
    shift_id: string // 班次 ID
  }

  export interface GetAttendanceGroupRespNoNeedPunchSpecialDay {
    punch_day: number // 打卡日期
    shift_id: string // 班次 ID
  }

  export interface getAttendanceGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceGroupResp
  }

  export interface DeleteAttendanceGroupReq {
    group_id: string // 考勤组 ID, 获取方式: 1）[创建或修改考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create) 2）[按名称查询考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search) 3）[获取打卡结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query), 示例值: "6919358128597097404"
  }

  export interface DeleteAttendanceGroupResp {}

  export interface deleteAttendanceGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteAttendanceGroupResp
  }

  export interface GetAttendanceShiftListReq {
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "YrkvQ1wGaPVta45tkxuGiQ["
  }

  export interface GetAttendanceShiftListResp {
    shift_list?: GetAttendanceShiftListRespShift[] // 班次列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetAttendanceShiftListRespShift {
    shift_id: string // 班次 ID
    shift_name: string // 班次名称
    punch_times: number // 打卡次数
    is_flexible: boolean // 是否弹性打卡
    flexible_minutes: number // 弹性打卡的时间
    no_need_off: boolean // 不需要打下班卡
    punch_time_rule?: GetAttendanceShiftListRespShiftPunchTimeRule[] // 打卡规则
    late_off_late_on_rule?: GetAttendanceShiftListRespShiftLateOffLateOnRule[] // 晚走晚到规则
    rest_time_rule?: GetAttendanceShiftListRespShiftRestTimeRule[] // 休息规则
  }

  export interface GetAttendanceShiftListRespShiftLateOffLateOnRule {
    late_off_minutes: number // 晚走多久
    late_on_minutes: number // 晚到多久
  }

  export interface GetAttendanceShiftListRespShiftPunchTimeRule {
    on_time: string // 上班时间
    off_time: string // 下班时间
    late_minutes_as_late: number // 晚到多久记为迟到
    late_minutes_as_lack: number // 晚到多久记为缺卡
    on_advance_minutes: number // 最早多久可打上班卡
    early_minutes_as_early: number // 早退多久记为早退
    early_minutes_as_lack: number // 早退多久记为缺卡
    off_delay_minutes: number // 最晚多久可打下班卡
  }

  export interface GetAttendanceShiftListRespShiftRestTimeRule {
    rest_begin_time: string // 休息开始
    rest_end_time: string // 休息结束
  }

  export interface getAttendanceShiftListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceShiftListResp
  }

  export interface GetAttendanceShiftReq {
    shift_name: string // 班次名称, 示例值: "早班"
  }

  export interface GetAttendanceShiftResp {
    shift_id: string // 班次 ID
    shift_name: string // 班次名称
    punch_times: number // 打卡次数
    is_flexible: boolean // 是否弹性打卡
    flexible_minutes: number // 弹性打卡的时间
    no_need_off: boolean // 不需要打下班卡
    punch_time_rule?: GetAttendanceShiftRespPunchTimeRule[] // 打卡规则
    late_off_late_on_rule?: GetAttendanceShiftRespLateOffLateOnRule[] // 晚走晚到规则
    rest_time_rule?: GetAttendanceShiftRespRestTimeRule[] // 休息规则
  }

  export interface GetAttendanceShiftRespLateOffLateOnRule {
    late_off_minutes: number // 晚走多久
    late_on_minutes: number // 晚到多久
  }

  export interface GetAttendanceShiftRespPunchTimeRule {
    on_time: string // 上班时间
    off_time: string // 下班时间
    late_minutes_as_late: number // 晚到多久记为迟到
    late_minutes_as_lack: number // 晚到多久记为缺卡
    on_advance_minutes: number // 最早多久可打上班卡
    early_minutes_as_early: number // 早退多久记为早退
    early_minutes_as_lack: number // 早退多久记为缺卡
    off_delay_minutes: number // 最晚多久可打下班卡
  }

  export interface GetAttendanceShiftRespRestTimeRule {
    rest_begin_time: string // 休息开始
    rest_end_time: string // 休息结束
  }

  export interface getAttendanceShiftResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceShiftResp
  }

  export interface GetAttendanceShiftDetailReq {
    shift_id: string // 班次 ID, 获取方式: 1）[按名称查询班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query) 2）[创建班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create), 示例值: "6919358778597097404"
  }

  export interface GetAttendanceShiftDetailResp {
    shift_id: string // 班次 ID
    shift_name: string // 班次名称
    punch_times: number // 打卡次数
    is_flexible: boolean // 是否弹性打卡
    flexible_minutes: number // 弹性打卡的时间
    no_need_off: boolean // 不需要打下班卡
    punch_time_rule?: GetAttendanceShiftDetailRespPunchTimeRule[] // 打卡规则
    late_off_late_on_rule?: GetAttendanceShiftDetailRespLateOffLateOnRule[] // 晚走晚到规则
    rest_time_rule?: GetAttendanceShiftDetailRespRestTimeRule[] // 休息规则
  }

  export interface GetAttendanceShiftDetailRespLateOffLateOnRule {
    late_off_minutes: number // 晚走多久
    late_on_minutes: number // 晚到多久
  }

  export interface GetAttendanceShiftDetailRespPunchTimeRule {
    on_time: string // 上班时间
    off_time: string // 下班时间
    late_minutes_as_late: number // 晚到多久记为迟到
    late_minutes_as_lack: number // 晚到多久记为缺卡
    on_advance_minutes: number // 最早多久可打上班卡
    early_minutes_as_early: number // 早退多久记为早退
    early_minutes_as_lack: number // 早退多久记为缺卡
    off_delay_minutes: number // 最晚多久可打下班卡
  }

  export interface GetAttendanceShiftDetailRespRestTimeRule {
    rest_begin_time: string // 休息开始
    rest_end_time: string // 休息结束
  }

  export interface getAttendanceShiftDetailResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceShiftDetailResp
  }

  export interface DeleteAttendanceShiftReq {
    shift_id: string // 班次 ID, 获取方式: 1）[按名称查询班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query) 2）[创建班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create), 示例值: "6919358778597097404"
  }

  export interface DeleteAttendanceShiftResp {}

  export interface deleteAttendanceShiftResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteAttendanceShiftResp
  }

  export interface CreateAttendanceShiftReq {
    shift_name: string // 班次名称, 示例值: "早班"
    punch_times: number // 打卡次数, 示例值: 1
    is_flexible?: boolean // 是否弹性打卡, 示例值: false
    flexible_minutes?: number // 弹性打卡的时间, 示例值: 60
    no_need_off?: boolean // 不需要打下班卡, 示例值: true
    punch_time_rule?: CreateAttendanceShiftReqPunchTimeRule[] // 打卡规则
    late_off_late_on_rule?: CreateAttendanceShiftReqLateOffLateOnRule[] // 晚走晚到规则
    rest_time_rule?: CreateAttendanceShiftReqRestTimeRule[] // 休息规则
  }

  export interface CreateAttendanceShiftReqLateOffLateOnRule {
    late_off_minutes: number // 晚走多久, 示例值: 60
    late_on_minutes: number // 晚到多久, 示例值: 30
  }

  export interface CreateAttendanceShiftReqPunchTimeRule {
    on_time: string // 上班时间, 示例值: "9:00"
    off_time: string // 下班时间, 示例值: "18:00, 第二天凌晨2点, 26:00"
    late_minutes_as_late: number // 晚到多久记为迟到, 示例值: 30
    late_minutes_as_lack: number // 晚到多久记为缺卡, 示例值: 60
    on_advance_minutes: number // 最早多久可打上班卡, 示例值: 60
    early_minutes_as_early: number // 早退多久记为早退, 示例值: 30
    early_minutes_as_lack: number // 早退多久记为缺卡, 示例值: 60
    off_delay_minutes: number // 最晚多久可打下班卡, 示例值: 60
  }

  export interface CreateAttendanceShiftReqRestTimeRule {
    rest_begin_time: string // 休息开始, 示例值: "13:00"
    rest_end_time: string // 休息结束, 示例值: "14:00"
  }

  export interface CreateAttendanceShiftResp {
    shift: CreateAttendanceShiftRespShift // 班次
  }

  export interface CreateAttendanceShiftRespShift {
    shift_id: string // 班次 ID
    shift_name: string // 班次名称
    punch_times: number // 打卡次数
    is_flexible: boolean // 是否弹性打卡
    flexible_minutes: number // 弹性打卡的时间
    no_need_off: boolean // 不需要打下班卡
    punch_time_rule?: CreateAttendanceShiftRespShiftPunchTimeRule[] // 打卡规则
    late_off_late_on_rule?: CreateAttendanceShiftRespShiftLateOffLateOnRule[] // 晚走晚到规则
    rest_time_rule?: CreateAttendanceShiftRespShiftRestTimeRule[] // 休息规则
  }

  export interface CreateAttendanceShiftRespShiftLateOffLateOnRule {
    late_off_minutes: number // 晚走多久
    late_on_minutes: number // 晚到多久
  }

  export interface CreateAttendanceShiftRespShiftPunchTimeRule {
    on_time: string // 上班时间
    off_time: string // 下班时间
    late_minutes_as_late: number // 晚到多久记为迟到
    late_minutes_as_lack: number // 晚到多久记为缺卡
    on_advance_minutes: number // 最早多久可打上班卡
    early_minutes_as_early: number // 早退多久记为早退
    early_minutes_as_lack: number // 早退多久记为缺卡
    off_delay_minutes: number // 最晚多久可打下班卡
  }

  export interface CreateAttendanceShiftRespShiftRestTimeRule {
    rest_begin_time: string // 休息开始
    rest_end_time: string // 休息结束
  }

  export interface createAttendanceShiftResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateAttendanceShiftResp
  }

  export interface GetAttendanceUserDailyShiftReq {
    employee_type: string // 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    user_ids?: string[] // employee_no 或 employee_id 列表, 示例值: ["abd754f7"]
    check_date_from: number // 查询的起始工作日, 示例值: 20190817
    check_date_to: number // 查询的结束工作日, 示例值: 20190820
  }

  export interface GetAttendanceUserDailyShiftResp {
    user_daily_shifts?: GetAttendanceUserDailyShiftRespUserDailyShift[] // 班表信息列表
  }

  export interface GetAttendanceUserDailyShiftRespUserDailyShift {
    group_id: string // 考勤组 ID, 获取方式: 1）[创建或修改考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create) 2）[按名称查询考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search) 3）[获取打卡结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query)
    shift_id: string // 班次 ID, 获取方式: 1）[按名称查询班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query) 2）[创建班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create)
    month: number // 月份
    user_id: string // 用户 ID
    day_no: number // 日期
  }

  export interface getAttendanceUserDailyShiftResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceUserDailyShiftResp
  }

  export interface BatchCreateAttendanceUserDailyShiftReq {
    employee_type: string // 请求体和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: employee_id: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, employee_no: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    user_daily_shifts?: BatchCreateAttendanceUserDailyShiftReqUserDailyShift[] // 班表信息列表
    operator_id?: string // 操作人uid, 如果您未操作[考勤管理后台“API 接入”流程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/attendance-development-guidelines), 则此字段为必填字段, 示例值: "dd31248a"
  }

  export interface BatchCreateAttendanceUserDailyShiftReqUserDailyShift {
    group_id: string // 考勤组 ID, 获取方式: 1）[创建或修改考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create) 2）[按名称查询考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search) 3）[获取打卡结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query), 示例值: "6737202939523236110"
    shift_id: string // 班次 ID, 获取方式: 1）[按名称查询班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query) 2）[创建班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create), 示例值: "6753520403404030215"
    month: number // 月份, 示例值: 202101
    user_id: string // 用户 ID, 示例值: "abd754f7"
    day_no: number // 日期, 示例值: 21
  }

  export interface BatchCreateAttendanceUserDailyShiftResp {
    user_daily_shifts?: BatchCreateAttendanceUserDailyShiftRespUserDailyShift[] // 班表信息列表
  }

  export interface BatchCreateAttendanceUserDailyShiftRespUserDailyShift {
    group_id: string // 考勤组 ID, 获取方式: 1）[创建或修改考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create) 2）[按名称查询考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search) 3）[获取打卡结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query)
    shift_id: string // 班次 ID, 获取方式: 1）[按名称查询班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query) 2）[创建班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create)
    month: number // 月份
    user_id: string // 用户 ID
    day_no: number // 日期
  }

  export interface batchCreateAttendanceUserDailyShiftResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchCreateAttendanceUserDailyShiftResp
  }

  export interface GetAttendanceUserStatsFieldReq {
    employee_type: string // 响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    locale: string // 语言类型, 示例值: "zh", 可选值有: `en`: 英语, `ja`: 日语, `zh`: 中文
    stats_type: string // 统计类型, 示例值: "daily", 可选值有: `daily`: 日度统计, `month`: 月度统计
    start_date: number // 开始时间, 示例值: 20210316
    end_date: number // 结束时间（时间间隔不超过 40 天）, 示例值: 20210323
  }

  export interface GetAttendanceUserStatsFieldResp {
    user_stats_field: GetAttendanceUserStatsFieldRespUserStatsField // 统计数据表头
  }

  export interface GetAttendanceUserStatsFieldRespUserStatsField {
    stats_type: string // 统计类型, 可选值有: `daily`: 日度统计, `month`: 月度统计
    user_id: string // 用户 ID
    fields?: GetAttendanceUserStatsFieldRespUserStatsFieldField[] // 字段列表
  }

  export interface GetAttendanceUserStatsFieldRespUserStatsFieldField {
    code: string // 字段编号
    title: string // 字段名称
    child_fields?: GetAttendanceUserStatsFieldRespUserStatsFieldFieldChildField[] // 子字段列表
  }

  export interface GetAttendanceUserStatsFieldRespUserStatsFieldFieldChildField {
    code: string // 子字段编号
    title: string // 子字段名称
    time_unit: string // 时间单位
  }

  export interface getAttendanceUserStatsFieldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceUserStatsFieldResp
  }

  export interface GetAttendanceUserStatsViewReq {
    employee_type: string // 响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: employee_id: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, employee_no: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    locale: string // 语言类型, 示例值: "zh", 可选值有: en: 英语, ja: 日语, zh: 中文
    stats_type: string // 统计类型, 示例值: "daily", 可选值有: daily: 日度统计, month: 月度统计
    user_id?: string // 查询用户id, 同【查询统计数据】、【更新统计设置】user_id, 示例值: "dd31248a"
  }

  export interface GetAttendanceUserStatsViewResp {
    view: GetAttendanceUserStatsViewRespView // 统计视图
  }

  export interface GetAttendanceUserStatsViewRespView {
    view_id: string // 视图 ID
    stats_type: string // 视图类型, 可选值有: daily: 日度统计, month: 月度统计
    user_id: string // 查询用户id, 同【查询统计数据】、【查询统计设置】user_id
    items?: GetAttendanceUserStatsViewRespViewItem[] // 用户设置字段
  }

  export interface GetAttendanceUserStatsViewRespViewItem {
    code: string // 标题编号
    title: string // 标题名称
    child_items?: GetAttendanceUserStatsViewRespViewItemChildItem[] // 子标题
  }

  export interface GetAttendanceUserStatsViewRespViewItemChildItem {
    code: string // 子标题编号
    value: string // 开关字段, 0: 关闭, 1: 开启（非开关字段场景: code = 51501 可选值为1-6）
    title: string // 子标题名称
    column_type: number // 列类型
    read_only: boolean // 是否只读
    min_value: string // 最小值
    max_value: string // 最大值
  }

  export interface getAttendanceUserStatsViewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceUserStatsViewResp
  }

  export interface UpdateAttendanceUserStatsViewReq {
    user_stats_view_id: string // 用户视图 ID, 获取方式: 1）[查询统计设置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/query), 示例值: "TmpZNU5qTTJORFF6T1RnNU5UTTNOakV6TWl0dGIyNTBhQT09"
    employee_type: string // 员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    view: UpdateAttendanceUserStatsViewReqView // 统计设置
  }

  export interface UpdateAttendanceUserStatsViewReqView {
    view_id: string // 视图 ID, 示例值: "TmpZNU5qTTJORFF6T1RnNU5UTTNOakV6TWl0dGIyNTBhQT09"
    stats_type: string // 视图类型, 示例值: "month", 可选值有: `daily`: 日度统计, `month`: 月度统计
    user_id: string // 查询用户id, 同【查询统计数据】、【查询统计设置】user_id, 示例值: "ec8ddg56"
    items?: UpdateAttendanceUserStatsViewReqViewItem[] // 用户设置字段
  }

  export interface UpdateAttendanceUserStatsViewReqViewItem {
    code: string // 标题编号, 示例值: "522"
    child_items?: UpdateAttendanceUserStatsViewReqViewItemChildItem[] // 子标题
  }

  export interface UpdateAttendanceUserStatsViewReqViewItemChildItem {
    code: string // 子标题编号, 示例值: "50101"
    value: string // 开关字段, 0: 关闭, 1: 开启（非开关字段场景: code = 51501 可选值为1-6）, 示例值: "0"
  }

  export interface UpdateAttendanceUserStatsViewResp {
    view: UpdateAttendanceUserStatsViewRespView // 视图
  }

  export interface UpdateAttendanceUserStatsViewRespView {
    view_id: string // 视图 ID
    stats_type: string // 视图类型, 可选值有: `daily`: 日度统计, `month`: 月度统计
    user_id: string // 查询用户id, 同【查询统计数据】、【查询统计设置】user_id
    items?: UpdateAttendanceUserStatsViewRespViewItem[] // 用户设置字段
  }

  export interface UpdateAttendanceUserStatsViewRespViewItem {
    code: string // 标题编号
    title: string // 标题名称
    child_items?: UpdateAttendanceUserStatsViewRespViewItemChildItem[] // 子标题
  }

  export interface UpdateAttendanceUserStatsViewRespViewItemChildItem {
    code: string // 子标题编号
    value: string // 开关字段, 0: 关闭, 1: 开启（非开关字段场景: code = 51501 可选值为1-6）
    title: string // 子标题名称
    column_type: number // 列类型
    read_only: boolean // 是否只读
    min_value: string // 最小值
    max_value: string // 最大值
  }

  export interface updateAttendanceUserStatsViewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateAttendanceUserStatsViewResp
  }

  export interface GetAttendanceUserStatsDataReq {
    employee_type: string // 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: employee_id: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, employee_no: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    locale: string // 语言类型, 示例值: "zh", 可选值有: en: 英语, ja: 日语, zh: 中文
    stats_type: string // 统计类型, 示例值: "month", 可选值有: daily: 日度统计, month: 月度统计
    start_date: number // 开始时间, 示例值: 20210316
    end_date: number // 结束时间, （时间间隔不超过 40 天）, 示例值: 20210323
    user_ids?: string[] // 查询的用户 ID 列表, （用户数量不超过 200）, 示例值: [, "ec8ddg56", "4dbb52f2", "4167842e", ]
    need_history?: boolean // 是否需要历史数据, 示例值: true
    current_group_only?: boolean // 只展示当前考勤组, 示例值: true
    user_id?: string // 查询用户id, 同【更新统计设置】、【查询统计设置】user_id, 示例值: "ec8ddg56"
  }

  export interface GetAttendanceUserStatsDataResp {
    user_datas?: GetAttendanceUserStatsDataRespUserData[] // 用户统计数据
  }

  export interface GetAttendanceUserStatsDataRespUserData {
    name: string // 用户姓名
    user_id: string // 用户 ID
    datas?: GetAttendanceUserStatsDataRespUserDataData[] // 用户的统计数据
  }

  export interface GetAttendanceUserStatsDataRespUserDataData {
    code: string // 字段编号
    value: string // 数据值
    features?: GetAttendanceUserStatsDataRespUserDataDataFeature[] // 数据属性
  }

  export interface GetAttendanceUserStatsDataRespUserDataDataFeature {
    key: string // 统计数据列附加属性的名称
    value: string // 统计数据列附加属性的值
  }

  export interface getAttendanceUserStatsDataResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceUserStatsDataResp
  }

  export interface GetAttendanceUserApprovalReq {
    employee_type: string // 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: employee_id: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, employee_no: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    user_ids?: string[] // employee_no 或 employee_id 列表, 示例值: ["abd754f7"]
    check_date_from: number // 查询的起始工作日, 示例值: 20190817
    check_date_to: number // 查询的结束工作日, 与 check_date_from 的时间间隔不超过 30 天, 示例值: 20190820
  }

  export interface GetAttendanceUserApprovalResp {
    user_approvals?: GetAttendanceUserApprovalRespUserApproval[] // 审批结果列表
  }

  export interface GetAttendanceUserApprovalRespUserApproval {
    user_id: string // 审批用户 ID
    date: string // 审批作用日期
    outs?: GetAttendanceUserApprovalRespUserApprovalOut[] // 外出信息
    leaves?: GetAttendanceUserApprovalRespUserApprovalLeave[] // 请假信息
    overtime_works?: GetAttendanceUserApprovalRespUserApprovalOvertimeWork[] // 加班信息
    trips?: GetAttendanceUserApprovalRespUserApprovalTrip[] // 出差信息
  }

  export interface GetAttendanceUserApprovalRespUserApprovalLeave {
    approval_id: string // 审批实例 ID
    uniq_id: string // 假期类型唯一 ID, 代表一种假期类型, 长度小于 14
    unit: number // 假期时长单位, 可选值有: 1: 天, 2: 小时, 3: 半天, 4: 半小时
    interval: number // 假期时长（单位: 秒）, 暂未开放提供, 待后续提供
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    i18n_names: GetAttendanceUserApprovalRespUserApprovalLeaveI18nNames // 假期多语言展示, 格式为 map, key 为 ["ch"、"en"、"ja"], 其中 ch 代表中文、en 代表英语、ja 代表日语
    default_locale: string // 默认语言类型, 由于飞书客户端支持中、英、日三种语言, 当用户切换语言时, 如果假期名称没有所对应的语言, 会使用默认语言的名称, 可选值有: ch: 中文, en: 英文, ja: 日文
    reason: string // 请假理由, 必选字段
    approve_pass_time: string // 审批通过时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    approve_apply_time: string // 审批申请时间, 时间格式为 yyyy-MM-dd HH:mm:ss
  }

  export interface GetAttendanceUserApprovalRespUserApprovalLeaveI18nNames {
    ch: string // 中文描述
    en: string // 英语描述
    ja: string // 日语描述
  }

  export interface GetAttendanceUserApprovalRespUserApprovalOut {
    approval_id: string // 审批实例 ID
    uniq_id: string // 外出类型唯一 ID, 代表一种假期类型, 长度小于 14
    unit: number // 外出时长单位, 可选值有: 1: 天, 2: 小时, 3: 半天, 4: 半小时
    interval: number // 外出时长（单位: 秒）
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    i18n_names: GetAttendanceUserApprovalRespUserApprovalOutI18nNames // 外出多语言展示, 格式为 map, key 为 ["ch"、"en"、"ja"], 其中 ch 代表中文、en 代表英语、ja 代表日语
    default_locale: string // 默认语言类型, 由于飞书客户端支持中、英、日三种语言, 当用户切换语言时, 如果假期名称没有所对应的语言, 会使用默认语言的名称
    reason: string // 外出理由
    approve_pass_time: string // 审批通过时间
    approve_apply_time: string // 审批申请时间
  }

  export interface GetAttendanceUserApprovalRespUserApprovalOutI18nNames {
    ch: string // 中文描述
    en: string // 英语描述
    ja: string // 日语描述
  }

  export interface GetAttendanceUserApprovalRespUserApprovalOvertimeWork {
    approval_id: string // 审批实例 ID
    duration: number // 加班时长
    unit: number // 加班时长单位, 可选值有: 1: 天, 2: 小时, 3: 半天, 4: 半小时
    category: number // 加班日期类型, 可选值有: 1: 工作日, 2: 休息日, 3: 节假日
    type: number // 加班规则类型, 可选值有: 0: 不关联加班规则, 1: 调休, 2: 加班费, 3: 关联加班规则, 没有调休或加班费
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss
  }

  export interface GetAttendanceUserApprovalRespUserApprovalTrip {
    approval_id: string // 审批实例 ID
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    reason: string // 出差理由
    approve_pass_time: string // 审批通过时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    approve_apply_time: string // 审批申请时间, 时间格式为 yyyy-MM-dd HH:mm:ss
  }

  export interface getAttendanceUserApprovalResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceUserApprovalResp
  }

  export interface CreateAttendanceUserApprovalReq {
    employee_type: string // 请求体和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: employee_id: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, employee_no: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    user_approval?: CreateAttendanceUserApprovalReqUserApproval // 审批信息
  }

  export interface CreateAttendanceUserApprovalReqUserApproval {
    user_id: string // 审批用户 ID, 示例值: "abd754f7"
    date: string // 审批作用日期, 示例值: "20210104"
    outs?: CreateAttendanceUserApprovalReqUserApprovalOut[] // 外出信息
    leaves?: CreateAttendanceUserApprovalReqUserApprovalLeave[] // 请假信息
    overtime_works?: CreateAttendanceUserApprovalReqUserApprovalOvertimeWork[] // 加班信息
    trips?: CreateAttendanceUserApprovalReqUserApprovalTrip[] // 出差信息
  }

  export interface CreateAttendanceUserApprovalReqUserApprovalLeave {
    approval_id?: string // 审批实例 ID, 示例值: "6737202939523236113"
    uniq_id?: string // 假期类型唯一 ID, 代表一种假期类型, 长度小于 14, 示例值: "6852582717813440527"
    unit: number // 假期时长单位, 示例值: 1, 可选值有: 1: 天, 2: 小时, 3: 半天, 4: 半小时
    interval: number // 假期时长（单位: 秒）, 暂未开放提供, 待后续提供, 示例值: 28800
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss, 示例值: "2021-01-04 09:00:00"
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss, 示例值: "2021-01-04 19:00:00"
    i18n_names: CreateAttendanceUserApprovalReqUserApprovalLeaveI18nNames // 假期多语言展示, 格式为 map, key 为 ["ch"、"en"、"ja"], 其中 ch 代表中文、en 代表英语、ja 代表日语
    default_locale: string // 默认语言类型, 由于飞书客户端支持中、英、日三种语言, 当用户切换语言时, 如果假期名称没有所对应的语言, 会使用默认语言的名称, 示例值: "ch", 可选值有: ch: 中文, en: 英文, ja: 日文
    reason: string // 请假理由, 必选字段, 示例值: "家里有事"
  }

  export interface CreateAttendanceUserApprovalReqUserApprovalLeaveI18nNames {
    ch?: string // 中文描述, 示例值: "中文描述"
    en?: string // 英语描述, 示例值: "English description"
    ja?: string // 日语描述, 示例值: "日本語の説明"
  }

  export interface CreateAttendanceUserApprovalReqUserApprovalOut {
    approval_id?: string // 审批实例 ID, 示例值: "6737202939523236113"
    uniq_id: string // 外出类型唯一 ID, 代表一种假期类型, 长度小于 14, 示例值: "9496E43696967658A512969523E89870"
    unit: number // 外出时长单位, 示例值: 1, 可选值有: 1: 天, 2: 小时, 3: 半天, 4: 半小时
    interval: number // 外出时长（单位: 秒）, 示例值: 28800
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss, 示例值: "2021-01-04 09:00:00"
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss, 示例值: "2021-01-04 19:00:00"
    i18n_names: CreateAttendanceUserApprovalReqUserApprovalOutI18nNames // 外出多语言展示, 格式为 map, key 为 ["ch"、"en"、"ja"], 其中 ch 代表中文、en 代表英语、ja 代表日语
    default_locale: string // 默认语言类型, 由于飞书客户端支持中、英、日三种语言, 当用户切换语言时, 如果假期名称没有所对应的语言, 会使用默认语言的名称, 示例值: "ch"
    reason: string // 外出理由, 示例值: "外出办事"
  }

  export interface CreateAttendanceUserApprovalReqUserApprovalOutI18nNames {
    ch?: string // 中文描述, 示例值: "中文描述"
    en?: string // 英语描述, 示例值: "English description"
    ja?: string // 日语描述, 示例值: "日本語の説明"
  }

  export interface CreateAttendanceUserApprovalReqUserApprovalOvertimeWork {
    approval_id?: string // 审批实例 ID, 示例值: "6737202939523236113"
    duration: number // 加班时长, 示例值: 1.5
    unit: number // 加班时长单位, 示例值: 1, 可选值有: 1: 天, 2: 小时, 3: 半天, 4: 半小时
    category: number // 加班日期类型, 示例值: 2, 可选值有: 1: 工作日, 2: 休息日, 3: 节假日
    type: number // 加班规则类型, 示例值: 1, 可选值有: 0: 不关联加班规则, 1: 调休, 2: 加班费, 3: 关联加班规则, 没有调休或加班费
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss, 示例值: "2021-01-09 09:00:00"
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss, 示例值: "2021-01-10 13:00:00"
  }

  export interface CreateAttendanceUserApprovalReqUserApprovalTrip {
    approval_id?: string // 审批实例 ID, 示例值: "6737202939523236113"
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss, 示例值: "2021-01-04 09:00:00"
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss, 示例值: "2021-01-04 19:00:00"
    reason: string // 出差理由, 示例值: "培训"
  }

  export interface CreateAttendanceUserApprovalResp {
    user_approval: CreateAttendanceUserApprovalRespUserApproval // 审批信息
  }

  export interface CreateAttendanceUserApprovalRespUserApproval {
    user_id: string // 审批用户 ID
    date: string // 审批作用日期
    outs?: CreateAttendanceUserApprovalRespUserApprovalOut[] // 外出信息
    leaves?: CreateAttendanceUserApprovalRespUserApprovalLeave[] // 请假信息
    overtime_works?: CreateAttendanceUserApprovalRespUserApprovalOvertimeWork[] // 加班信息
    trips?: CreateAttendanceUserApprovalRespUserApprovalTrip[] // 出差信息
  }

  export interface CreateAttendanceUserApprovalRespUserApprovalLeave {
    approval_id: string // 审批实例 ID
    uniq_id: string // 假期类型唯一 ID, 代表一种假期类型, 长度小于 14
    unit: number // 假期时长单位, 可选值有: 1: 天, 2: 小时, 3: 半天, 4: 半小时
    interval: number // 假期时长（单位: 秒）, 暂未开放提供, 待后续提供
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    i18n_names: CreateAttendanceUserApprovalRespUserApprovalLeaveI18nNames // 假期多语言展示, 格式为 map, key 为 ["ch"、"en"、"ja"], 其中 ch 代表中文、en 代表英语、ja 代表日语
    default_locale: string // 默认语言类型, 由于飞书客户端支持中、英、日三种语言, 当用户切换语言时, 如果假期名称没有所对应的语言, 会使用默认语言的名称, 可选值有: ch: 中文, en: 英文, ja: 日文
    reason: string // 请假理由, 必选字段
    approve_pass_time: string // 审批通过时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    approve_apply_time: string // 审批申请时间, 时间格式为 yyyy-MM-dd HH:mm:ss
  }

  export interface CreateAttendanceUserApprovalRespUserApprovalLeaveI18nNames {
    ch: string // 中文描述
    en: string // 英语描述
    ja: string // 日语描述
  }

  export interface CreateAttendanceUserApprovalRespUserApprovalOut {
    approval_id: string // 审批实例 ID
    uniq_id: string // 外出类型唯一 ID, 代表一种假期类型, 长度小于 14
    unit: number // 外出时长单位, 可选值有: 1: 天, 2: 小时, 3: 半天, 4: 半小时
    interval: number // 外出时长（单位: 秒）
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    i18n_names: CreateAttendanceUserApprovalRespUserApprovalOutI18nNames // 外出多语言展示, 格式为 map, key 为 ["ch"、"en"、"ja"], 其中 ch 代表中文、en 代表英语、ja 代表日语
    default_locale: string // 默认语言类型, 由于飞书客户端支持中、英、日三种语言, 当用户切换语言时, 如果假期名称没有所对应的语言, 会使用默认语言的名称
    reason: string // 外出理由
    approve_pass_time: string // 审批通过时间
    approve_apply_time: string // 审批申请时间
  }

  export interface CreateAttendanceUserApprovalRespUserApprovalOutI18nNames {
    ch: string // 中文描述
    en: string // 英语描述
    ja: string // 日语描述
  }

  export interface CreateAttendanceUserApprovalRespUserApprovalOvertimeWork {
    approval_id: string // 审批实例 ID
    duration: number // 加班时长
    unit: number // 加班时长单位, 可选值有: 1: 天, 2: 小时, 3: 半天, 4: 半小时
    category: number // 加班日期类型, 可选值有: 1: 工作日, 2: 休息日, 3: 节假日
    type: number // 加班规则类型, 可选值有: 0: 不关联加班规则, 1: 调休, 2: 加班费, 3: 关联加班规则, 没有调休或加班费
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss
  }

  export interface CreateAttendanceUserApprovalRespUserApprovalTrip {
    approval_id: string // 审批实例 ID
    start_time: string // 开始时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    end_time: string // 结束时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    reason: string // 出差理由
    approve_pass_time: string // 审批通过时间, 时间格式为 yyyy-MM-dd HH:mm:ss
    approve_apply_time: string // 审批申请时间, 时间格式为 yyyy-MM-dd HH:mm:ss
  }

  export interface createAttendanceUserApprovalResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateAttendanceUserApprovalResp
  }

  export interface UpdateAttendanceRemedyApprovalReq {
    approval_id: string // 审批实例 ID, 获取方式: 1）[获取审批通过数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query) 2）[写入审批结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create) 3）[通知补卡审批发起（补卡情况下）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create), 示例值: "6737202939523236113"
    approval_type: string // 审批类型, leave: 请假, out: 外出, overtime: 加班, trip: 出差, remedy: 补卡, 示例值: "remedy"
    status: number // 审批状态, 1: 不通过, 2: 通过, 4: 撤销, 示例值: 4
  }

  export interface UpdateAttendanceRemedyApprovalResp {
    approval_info: UpdateAttendanceRemedyApprovalRespApprovalInfo // 审批信息
  }

  export interface UpdateAttendanceRemedyApprovalRespApprovalInfo {
    approval_id: string // 审批实例 ID
    approval_type: string // 审批类型, 可选值有: leave: 请假, overtime: 加班, trip: 出差, out: 外出, remedy: 补卡
    status: number // 审批状态, 可选值有: 0: 待审批, 1: 未通过, 2: 已通过, 3: 已取消, 4: 已撤回
  }

  export interface updateAttendanceRemedyApprovalResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateAttendanceRemedyApprovalResp
  }

  export interface BatchGetAttendanceUserFlowReq {
    employee_type: string // 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    include_terminated_user?: boolean // 由于新入职用户可以复用已离职用户的employee_no/employee_id。如果true, 返回employee_no/employee_id对应的所有在职+离职用户数据；如果false, 只返回employee_no/employee_id对应的在职或最近一个离职用户数据, 示例值: true
    user_ids?: string[] // employee_no 或 employee_id 列表, 长度不超过 50, 示例值: [ "abd754f7"]
    check_time_from: string // 查询的起始时间, 时间戳, 示例值: "1566641088"
    check_time_to: string // 查询的结束时间, 时间戳, 示例值: "1566641088"
  }

  export interface BatchGetAttendanceUserFlowResp {
    user_flow_results?: BatchGetAttendanceUserFlowRespUserFlowResult[] // 打卡记录列表
  }

  export interface BatchGetAttendanceUserFlowRespUserFlowResult {
    user_id: string // 用户 ID
    creator_id: string // 记录创建者 ID
    location_name: string // 打卡位置名称信息
    check_time: string // 打卡时间, 精确到秒的时间戳
    comment: string // 打卡备注
    record_id: string // 打卡记录 ID
    longitude: number // 打卡经度
    latitude: number // 打卡纬度
    ssid: string // 打卡 Wi-Fi 的 SSID
    bssid: string // 打卡 Wi-Fi 的 MAC 地址
    is_field: boolean // 是否为外勤打卡
    is_wifi: boolean // 是否为 Wi-Fi 打卡
    type: number // 记录生成方式, 可选值有: `0`: 用户打卡, `1`: 管理员修改, `2`: 用户补卡, `3`: 系统自动生成, `4`: 下班免打卡, `5`: 考勤机, `6`: 极速打卡, `7`: 考勤开放平台导入
    photo_urls?: string[] // 打卡照片列表
    device_id: string // 打卡设备 ID
  }

  export interface batchGetAttendanceUserFlowResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchGetAttendanceUserFlowResp
  }

  export interface GetAttendanceUserFlowReq {
    user_flow_id: string // 打卡流水记录 ID, 获取方式: 1）[批量查询打卡流水记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/query) 2）[获取打卡结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query) 3）[导入打卡流水记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/batch_create), 示例值: "6708236686834352397"
    employee_type: string // 响应体中的 user_id 和 creator_id 的员工工号类型, 示例值: "employee_id", 可选值有: `open_id`: 开放 openID, `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
  }

  export interface GetAttendanceUserFlowResp {
    user_id: string // 用户 ID
    creator_id: string // 记录创建者 ID
    location_name: string // 打卡位置名称信息
    check_time: string // 打卡时间, 精确到秒的时间戳
    comment: string // 打卡备注
    record_id: string // 打卡记录 ID
    longitude: number // 打卡经度
    latitude: number // 打卡纬度
    ssid: string // 打卡 Wi-Fi 的 SSID
    bssid: string // 打卡 Wi-Fi 的 MAC 地址
    is_field: boolean // 是否为外勤打卡
    is_wifi: boolean // 是否为 Wi-Fi 打卡
    type: number // 记录生成方式, 可选值有: `0`: 用户打卡, `1`: 管理员修改, `2`: 用户补卡, `3`: 系统自动生成, `4`: 下班免打卡, `5`: 考勤机, `6`: 极速打卡, `7`: 考勤开放平台导入
    photo_urls?: string[] // 打卡照片列表
    device_id: string // 打卡设备 ID
  }

  export interface getAttendanceUserFlowResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceUserFlowResp
  }

  export interface GetAttendanceUserTaskReq {
    employee_type: string // 员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    ignore_invalid_users?: boolean // 是否忽略无效和没有权限的用户。如果 true, 则返回有效用户的信息, 并告知无效和没有权限的用户信息；如果 false, 且 user_ids 中存在无效或没有权限的用户, 则返回错误, 示例值: true
    include_terminated_user?: boolean // 由于新入职员工可以复用已离职员工的 employee_no/employee_id, 如果 true, 则返回 employee_no/employee_id 对应的所有在职 + 离职员工的数据；如果 false, 则只返回 employee_no/employee_id 对应的在职或最近一个离职员工的数据, 示例值: true
    user_ids?: string[] // employee_no 或 employee_id 列表, 示例值: abd754f7
    check_date_from: number // 查询的起始工作日, 示例值: 20190817
    check_date_to: number // 查询的结束工作日, 示例值: 20190820
  }

  export interface GetAttendanceUserTaskResp {
    user_task_results?: GetAttendanceUserTaskRespUserTaskResult[] // 打卡任务列表
    invalid_user_ids?: string[] // 无效用户 ID 列表
    unauthorized_user_ids?: string[] // 没有权限用户 ID 列表
  }

  export interface GetAttendanceUserTaskRespUserTaskResult {
    result_id: string // 打卡记录 ID
    user_id: string // 用户 ID
    employee_name: string // 用户姓名
    day: number // 日期
    group_id: string // 考勤组 ID
    shift_id: string // 班次 ID
    records?: GetAttendanceUserTaskRespUserTaskResultRecord[] // 用户考勤记录
  }

  export interface GetAttendanceUserTaskRespUserTaskResultRecord {
    check_in_record_id: string // 上班打卡记录 ID
    check_in_record: GetAttendanceUserTaskRespUserTaskResultRecordCheckInRecord // 上班打卡记录
    check_out_record_id: string // 下班打卡记录 ID
    check_out_record: GetAttendanceUserTaskRespUserTaskResultRecordCheckOutRecord // 下班打卡记录
    check_in_result: string // 上班打卡结果, 可选值有: `NoNeedCheck`: 无需打卡, `SystemCheck`: 系统打卡, `Normal`: 正常, `Early`: 早退, `Late`: 迟到, `Lack`: 缺卡
    check_out_result: string // 下班打卡结果, 可选值有: `NoNeedCheck`: 无需打卡, `SystemCheck`: 系统打卡, `Normal`: 正常, `Early`: 早退, `Late`: 迟到, `Lack`: 缺卡
    check_in_result_supplement: string // 上班打卡结果补充, 可选值有: `None`: 无, `ManagerModification`: 管理员修改, `CardReplacement`: 补卡通过, `ShiftChange`: 换班, `Travel`: 出差, `Leave`: 请假, `GoOut`: 外出, `CardReplacementApplication`: 补卡申请中, `FieldPunch`: 外勤打卡
    check_out_result_supplement: string // 下班打卡结果补充, 可选值有: `None`: 无, `ManagerModification`: 管理员修改, `CardReplacement`: 补卡通过, `ShiftChange`: 换班, `Travel`: 出差, `Leave`: 请假, `GoOut`: 外出, `CardReplacementApplication`: 补卡申请中, `FieldPunch`: 外勤打卡
    check_in_shift_time: string // 上班打卡时间
    check_out_shift_time: string // 下班打卡时间
  }

  export interface GetAttendanceUserTaskRespUserTaskResultRecordCheckInRecord {
    user_id: string // 用户 ID
    creator_id: string // 记录创建者 ID
    location_name: string // 打卡位置名称信息
    check_time: string // 打卡时间, 精确到秒的时间戳
    comment: string // 打卡备注
    record_id: string // 打卡记录 ID
    longitude: number // 打卡经度
    latitude: number // 打卡纬度
    ssid: string // 打卡 Wi-Fi 的 SSID
    bssid: string // 打卡 Wi-Fi 的 MAC 地址
    is_field: boolean // 是否为外勤打卡
    is_wifi: boolean // 是否为 Wi-Fi 打卡
    type: number // 记录生成方式, 可选值有: `0`: 用户打卡, `1`: 管理员修改, `2`: 用户补卡, `3`: 系统自动生成, `4`: 下班免打卡, `5`: 考勤机, `6`: 极速打卡, `7`: 考勤开放平台导入
    photo_urls?: string[] // 打卡照片列表
    device_id: string // 打卡设备 ID
  }

  export interface GetAttendanceUserTaskRespUserTaskResultRecordCheckOutRecord {
    user_id: string // 用户 ID
    creator_id: string // 记录创建者 ID
    location_name: string // 打卡位置名称信息
    check_time: string // 打卡时间, 精确到秒的时间戳
    comment: string // 打卡备注
    record_id: string // 打卡记录 ID
    longitude: number // 打卡经度
    latitude: number // 打卡纬度
    ssid: string // 打卡 Wi-Fi 的 SSID
    bssid: string // 打卡 Wi-Fi 的 MAC 地址
    is_field: boolean // 是否为外勤打卡
    is_wifi: boolean // 是否为 Wi-Fi 打卡
    type: number // 记录生成方式, 可选值有: `0`: 用户打卡, `1`: 管理员修改, `2`: 用户补卡, `3`: 系统自动生成, `4`: 下班免打卡, `5`: 考勤机, `6`: 极速打卡, `7`: 考勤开放平台导入
    photo_urls?: string[] // 打卡照片列表
    device_id: string // 打卡设备 ID
  }

  export interface getAttendanceUserTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceUserTaskResp
  }

  export interface BatchCreateAttendanceUserFlowReq {
    employee_type: string // 请求体和响应体中的 user_id 和 creator_id 的员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    flow_records?: BatchCreateAttendanceUserFlowReqFlowRecord[] // 打卡流水记录列表
  }

  export interface BatchCreateAttendanceUserFlowReqFlowRecord {
    user_id: string // 用户 ID, 示例值: "abd754f7"
    creator_id: string // 记录创建者 ID, 示例值: "abd754f7"
    location_name: string // 打卡位置名称信息, 示例值: "西溪八方城"
    check_time: string // 打卡时间, 精确到秒的时间戳, 示例值: "1611476284"
    comment: string // 打卡备注, 示例值: "上班打卡"
    record_id?: string // 打卡记录 ID, 示例值: "6709359313699356941"
    longitude?: number // 打卡经度, 示例值: 30.28991
    latitude?: number // 打卡纬度, 示例值: 120.04513
    ssid?: string // 打卡 Wi-Fi 的 SSID, 示例值: "b0:b8:67:5c:1d:72"
    bssid?: string // 打卡 Wi-Fi 的 MAC 地址, 示例值: "b0:b8:67:5c:1d:72"
    is_field?: boolean // 是否为外勤打卡, 示例值: true
    is_wifi?: boolean // 是否为 Wi-Fi 打卡, 示例值: true
    type?: number // 记录生成方式, 示例值: 0, 可选值有: `0`: 用户打卡, `1`: 管理员修改, `2`: 用户补卡, `3`: 系统自动生成, `4`: 下班免打卡, `5`: 考勤机, `6`: 极速打卡, `7`: 考勤开放平台导入
    photo_urls?: string[] // 打卡照片列表, 示例值: https://time.clockin.biz/manage/download/6840389754748502021
    device_id?: string // 打卡设备 ID, 示例值: "99e0609ee053448596502691a81428654d7ded64c7bd85acd982d26b3636c37d"
  }

  export interface BatchCreateAttendanceUserFlowResp {
    flow_records?: BatchCreateAttendanceUserFlowRespFlowRecord[] // 打卡流水记录列表
  }

  export interface BatchCreateAttendanceUserFlowRespFlowRecord {
    user_id: string // 用户 ID
    creator_id: string // 记录创建者 ID
    location_name: string // 打卡位置名称信息
    check_time: string // 打卡时间, 精确到秒的时间戳
    comment: string // 打卡备注
    record_id: string // 打卡记录 ID
    longitude: number // 打卡经度
    latitude: number // 打卡纬度
    ssid: string // 打卡 Wi-Fi 的 SSID
    bssid: string // 打卡 Wi-Fi 的 MAC 地址
    is_field: boolean // 是否为外勤打卡
    is_wifi: boolean // 是否为 Wi-Fi 打卡
    type: number // 记录生成方式, 可选值有: `0`: 用户打卡, `1`: 管理员修改, `2`: 用户补卡, `3`: 系统自动生成, `4`: 下班免打卡, `5`: 考勤机, `6`: 极速打卡, `7`: 考勤开放平台导入
    photo_urls?: string[] // 打卡照片列表
    device_id: string // 打卡设备 ID
  }

  export interface batchCreateAttendanceUserFlowResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchCreateAttendanceUserFlowResp
  }

  export interface GetAttendanceUserTaskRemedyAllowedRemedyListReq {
    employee_type: string // 请求体和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    user_id: string // 用户 ID, 示例值: "abd754f7"
    remedy_date: number // 补卡日期, 示例值: 20210104
  }

  export interface GetAttendanceUserTaskRemedyAllowedRemedyListResp {
    user_allowed_remedys?: GetAttendanceUserTaskRemedyAllowedRemedyListRespUserAllowedRemedy[] // 用户可补卡时间
  }

  export interface GetAttendanceUserTaskRemedyAllowedRemedyListRespUserAllowedRemedy {
    user_id: string // 用户 ID
    remedy_date: number // 补卡日期
    is_free_punch: boolean // 是否为自由班次, 若为自由班次, 则不用选择考虑第几次上下班, 直接选择补卡时间即可
    punch_no: number // 第几次上下班, 0: 第 1 次上下班, 1: 第 2 次上下班, 2: 第 3 次上下班
    work_type: number // 上班 / 下班, 1: 上班, 2: 下班
    punch_status: string // 打卡状态, Early: 早退, Late: 迟到, Lack: 缺卡
    normal_punch_time: string // 正常的应打卡时间, 时间格式为 yyyy-MM-dd HH:mm
    remedy_start_time: string // 可选的补卡时间的最小值, 时间格式为 yyyy-MM-dd HH:mm
    remedy_end_time: string // 可选的补卡时间的最大值, 时间格式为 yyyy-MM-dd HH:mm
  }

  export interface getAttendanceUserTaskRemedyAllowedRemedyListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceUserTaskRemedyAllowedRemedyListResp
  }

  export interface GetAttendanceUserTaskRemedyReq {
    employee_type: string // 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    user_ids?: string[] // employee_no 或 employee_id 列表, 示例值: ["abd754f7"]
    check_time_from: string // 查询的起始时间, 精确到秒的时间戳, 示例值: "1566641088"
    check_time_to: string // 查询的结束时间, 精确到秒的时间戳, 示例值: "1592561088"
  }

  export interface GetAttendanceUserTaskRemedyResp {
    user_remedys?: GetAttendanceUserTaskRemedyRespUserRemedy[] // 补卡记录列表
  }

  export interface GetAttendanceUserTaskRemedyRespUserRemedy {
    user_id: string // 用户 ID
    remedy_date: number // 补卡日期
    punch_no: number // 第几次上下班, 0: 第 1 次上下班, 1: 第 2 次上下班, 2: 第 3 次上下班, 自由班制填 0
    work_type: number // 上班 / 下班, 1: 上班, 2: 下班, 自由班制填 0
    approval_id: string // 审批 ID
    remedy_time: string // 补卡时间, 时间格式为 yyyy-MM-dd HH:mm
    status: number // 补卡状态（默认为审批中）, 可选值有: `0`: 审批中, `2`: 已通过, `3`: 已取消, `4`: 通过后撤回
    reason: string // 补卡原因
    time: string // 补卡时间, 精确到秒的时间戳
    time_zone: string // 补卡时考勤组时区
    create_time: string // 补卡发起时间, 精确到秒的时间戳
    update_time: string // 补卡状态更新时间, 精确到秒的时间戳
  }

  export interface getAttendanceUserTaskRemedyResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceUserTaskRemedyResp
  }

  export interface CreateAttendanceUserTaskRemedyReq {
    employee_type: string // 请求体和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    user_id: string // 用户 ID, 示例值: "abd754f7"
    remedy_date: number // 补卡日期, 示例值: 20210701
    punch_no: number // 第几次上下班, 0: 第 1 次上下班, 1: 第 2 次上下班, 2: 第 3 次上下班, 自由班制填 0, 示例值: 0
    work_type: number // 上班 / 下班, 1: 上班, 2: 下班, 自由班制填 0, 示例值: 1
    approval_id?: string // 审批 ID, 示例值: "6737202939523236113"
    remedy_time: string // 补卡时间, 时间格式为 yyyy-MM-dd HH:mm, 示例值: "2021-07-01 08:00"
    status?: number // 补卡状态（默认为审批中）, 示例值: 2, 可选值有: `0`: 审批中, `2`: 已通过, `3`: 已取消, `4`: 通过后撤回
    reason: string // 补卡原因, 示例值: "忘记打卡"
    time?: string // 补卡时间, 精确到秒的时间戳, 示例值: "1611476284"
    time_zone?: string // 补卡时考勤组时区, 示例值: "Asia/Shanghai"
    create_time?: string // 补卡发起时间, 精确到秒的时间戳, 示例值: "1611476284"
    update_time?: string // 补卡状态更新时间, 精确到秒的时间戳, 示例值: "1611476284"
  }

  export interface CreateAttendanceUserTaskRemedyResp {
    user_remedy: CreateAttendanceUserTaskRemedyRespUserRemedy // 补卡审批信息
  }

  export interface CreateAttendanceUserTaskRemedyRespUserRemedy {
    user_id: string // 用户 ID
    remedy_date: number // 补卡日期
    punch_no: number // 第几次上下班, 0: 第 1 次上下班, 1: 第 2 次上下班, 2: 第 3 次上下班, 自由班制填 0
    work_type: number // 上班 / 下班, 1: 上班, 2: 下班, 自由班制填 0
    approval_id: string // 审批 ID
    remedy_time: string // 补卡时间, 时间格式为 yyyy-MM-dd HH:mm
    status: number // 补卡状态（默认为审批中）, 可选值有: `0`: 审批中, `2`: 已通过, `3`: 已取消, `4`: 通过后撤回
    reason: string // 补卡原因
    time: string // 补卡时间, 精确到秒的时间戳
    time_zone: string // 补卡时考勤组时区
    create_time: string // 补卡发起时间, 精确到秒的时间戳
    update_time: string // 补卡状态更新时间, 精确到秒的时间戳
  }

  export interface createAttendanceUserTaskRemedyResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateAttendanceUserTaskRemedyResp
  }

  export interface GetAttendanceUserSettingListReq {
    employee_type: string // 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    user_ids?: string[] // employee_no 或 employee_id 列表, 示例值: ["abd754f7"], 最大长度: `100`
  }

  export interface GetAttendanceUserSettingListResp {
    user_settings?: GetAttendanceUserSettingListRespUserSetting[] // 用户设置信息列表
  }

  export interface GetAttendanceUserSettingListRespUserSetting {
    user_id: string // 用户 ID
    face_key: string // 人脸照片文件 ID, 获取方式: [文件上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/upload)
    face_key_update_time: string // 人脸照片更新时间, 精确到秒的时间戳
  }

  export interface getAttendanceUserSettingListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetAttendanceUserSettingListResp
  }

  export interface UpdateAttendanceUserSettingReq {
    employee_type: string // 请求体和响应体中的 user_id 的员工工号类型, 示例值: "employee_id", 可选值有: `employee_id`: 员工 employee ID, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的用户 ID, `employee_no`: 员工工号, 即飞书管理后台 > 组织架构 > 成员与部门 > 成员详情中的工号
    user_setting?: UpdateAttendanceUserSettingReqUserSetting // 用户设置
  }

  export interface UpdateAttendanceUserSettingReqUserSetting {
    user_id: string // 用户 ID, 示例值: "abd754f7"
    face_key: string // 人脸照片文件 ID, 获取方式: [文件上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/upload), 示例值: "xxxxxb306842b1c189bc5212eefxxxxx"
    face_key_update_time?: string // 人脸照片更新时间, 精确到秒的时间戳, 示例值: "1625681917"
  }

  export interface UpdateAttendanceUserSettingResp {
    user_setting: UpdateAttendanceUserSettingRespUserSetting // 用户设置
  }

  export interface UpdateAttendanceUserSettingRespUserSetting {
    user_id: string // 用户 ID
    face_key: string // 人脸照片文件 ID, 获取方式: [文件上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/upload)
    face_key_update_time: string // 人脸照片更新时间, 精确到秒的时间戳
  }

  export interface updateAttendanceUserSettingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateAttendanceUserSettingResp
  }

  export interface DownloadAttendanceFileReq {
    file_id: string // 文件 ID, 示例值: "xxxxxb306842b1c189bc5212eefxxxxx"
  }

  export interface DownloadAttendanceFileResp {
    file: Buffer
  }

  export interface downloadAttendanceFileResp {
    code: number
    msg: string
    data: DownloadAttendanceFileResp
  }

  export interface UploadAttendanceFileReq {
    file_name: string // 带后缀的文件名, 示例值: "人脸照片.jpg"
    file: Buffer // 文件内容, 示例值: 二进制文件
  }

  export interface UploadAttendanceFileResp {
    file: UploadAttendanceFileRespFile // 文件
  }

  export interface UploadAttendanceFileRespFile {
    file_id: string // 文件 ID
  }

  export interface uploadAttendanceFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UploadAttendanceFileResp
  }
}

class GetAttendanceGroupListReq {
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

class CreateAttendanceGroupReq {
  employee_type?: any
  dept_type?: any
  group?: any
  operator_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      group: this.group,
      operator_id: this.operator_id
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    if (this.dept_type !== undefined) {
      q['dept_type'] = this.dept_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SearchAttendanceGroupReq {
  group_name?: any
  exactly_matched?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      group_name: this.group_name,
      exactly_matched: this.exactly_matched
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetAttendanceGroupReq {
  group_id?: any
  employee_type?: any
  dept_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':group_id', this.group_id)

    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    if (this.dept_type !== undefined) {
      q['dept_type'] = this.dept_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteAttendanceGroupReq {
  group_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':group_id', this.group_id)

    return path
  }
}

class GetAttendanceShiftListReq {
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

class GetAttendanceShiftReq {
  shift_name?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.shift_name !== undefined) {
      q['shift_name'] = this.shift_name
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetAttendanceShiftDetailReq {
  shift_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':shift_id', this.shift_id)

    return path
  }
}

class DeleteAttendanceShiftReq {
  shift_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':shift_id', this.shift_id)

    return path
  }
}

class CreateAttendanceShiftReq {
  shift_name?: any
  punch_times?: any
  is_flexible?: any
  flexible_minutes?: any
  no_need_off?: any
  punch_time_rule?: any
  late_off_late_on_rule?: any
  rest_time_rule?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      shift_name: this.shift_name,
      punch_times: this.punch_times,
      is_flexible: this.is_flexible,
      flexible_minutes: this.flexible_minutes,
      no_need_off: this.no_need_off,
      punch_time_rule: this.punch_time_rule,
      late_off_late_on_rule: this.late_off_late_on_rule,
      rest_time_rule: this.rest_time_rule
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetAttendanceUserDailyShiftReq {
  employee_type?: any
  user_ids?: any
  check_date_from?: any
  check_date_to?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_ids: this.user_ids,
      check_date_from: this.check_date_from,
      check_date_to: this.check_date_to
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchCreateAttendanceUserDailyShiftReq {
  employee_type?: any
  user_daily_shifts?: any
  operator_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_daily_shifts: this.user_daily_shifts,
      operator_id: this.operator_id
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetAttendanceUserStatsFieldReq {
  employee_type?: any
  locale?: any
  stats_type?: any
  start_date?: any
  end_date?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      locale: this.locale,
      stats_type: this.stats_type,
      start_date: this.start_date,
      end_date: this.end_date
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetAttendanceUserStatsViewReq {
  employee_type?: any
  locale?: any
  stats_type?: any
  user_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      locale: this.locale,
      stats_type: this.stats_type,
      user_id: this.user_id
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateAttendanceUserStatsViewReq {
  user_stats_view_id?: any
  employee_type?: any
  view?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      view: this.view
    }
  }

  getPath(path: string) {
    path = path.replace(':user_stats_view_id', this.user_stats_view_id)

    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetAttendanceUserStatsDataReq {
  employee_type?: any
  locale?: any
  stats_type?: any
  start_date?: any
  end_date?: any
  user_ids?: any
  need_history?: any
  current_group_only?: any
  user_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      locale: this.locale,
      stats_type: this.stats_type,
      start_date: this.start_date,
      end_date: this.end_date,
      user_ids: this.user_ids,
      need_history: this.need_history,
      current_group_only: this.current_group_only,
      user_id: this.user_id
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetAttendanceUserApprovalReq {
  employee_type?: any
  user_ids?: any
  check_date_from?: any
  check_date_to?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_ids: this.user_ids,
      check_date_from: this.check_date_from,
      check_date_to: this.check_date_to
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateAttendanceUserApprovalReq {
  employee_type?: any
  user_approval?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_approval: this.user_approval
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateAttendanceRemedyApprovalReq {
  approval_id?: any
  approval_type?: any
  status?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_id: this.approval_id,
      approval_type: this.approval_type,
      status: this.status
    }
  }

  getPath(path: string) {
    return path
  }
}

class BatchGetAttendanceUserFlowReq {
  employee_type?: any
  include_terminated_user?: any
  user_ids?: any
  check_time_from?: any
  check_time_to?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_ids: this.user_ids,
      check_time_from: this.check_time_from,
      check_time_to: this.check_time_to
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    if (this.include_terminated_user !== undefined) {
      q['include_terminated_user'] = this.include_terminated_user
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetAttendanceUserFlowReq {
  user_flow_id?: any
  employee_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':user_flow_id', this.user_flow_id)

    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetAttendanceUserTaskReq {
  employee_type?: any
  ignore_invalid_users?: any
  include_terminated_user?: any
  user_ids?: any
  check_date_from?: any
  check_date_to?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_ids: this.user_ids,
      check_date_from: this.check_date_from,
      check_date_to: this.check_date_to
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    if (this.ignore_invalid_users !== undefined) {
      q['ignore_invalid_users'] = this.ignore_invalid_users
    }
    if (this.include_terminated_user !== undefined) {
      q['include_terminated_user'] = this.include_terminated_user
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchCreateAttendanceUserFlowReq {
  employee_type?: any
  flow_records?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      flow_records: this.flow_records
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetAttendanceUserTaskRemedyAllowedRemedyListReq {
  employee_type?: any
  user_id?: any
  remedy_date?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id: this.user_id,
      remedy_date: this.remedy_date
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetAttendanceUserTaskRemedyReq {
  employee_type?: any
  user_ids?: any
  check_time_from?: any
  check_time_to?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_ids: this.user_ids,
      check_time_from: this.check_time_from,
      check_time_to: this.check_time_to
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateAttendanceUserTaskRemedyReq {
  employee_type?: any
  user_id?: any
  remedy_date?: any
  punch_no?: any
  work_type?: any
  approval_id?: any
  remedy_time?: any
  status?: any
  reason?: any
  time?: any
  time_zone?: any
  create_time?: any
  update_time?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id: this.user_id,
      remedy_date: this.remedy_date,
      punch_no: this.punch_no,
      work_type: this.work_type,
      approval_id: this.approval_id,
      remedy_time: this.remedy_time,
      status: this.status,
      reason: this.reason,
      time: this.time,
      time_zone: this.time_zone,
      create_time: this.create_time,
      update_time: this.update_time
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetAttendanceUserSettingListReq {
  employee_type?: any
  user_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_ids: this.user_ids
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateAttendanceUserSettingReq {
  employee_type?: any
  user_setting?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_setting: this.user_setting
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_type !== undefined) {
      q['employee_type'] = this.employee_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DownloadAttendanceFileReq {
  file_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_id', this.file_id)

    return path
  }
}

class UploadAttendanceFileReq {
  file_name?: any
  file?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      file: this.file
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.file_name !== undefined) {
      q['file_name'] = this.file_name
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}
