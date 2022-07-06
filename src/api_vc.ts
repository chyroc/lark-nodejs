import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class VCService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // applyVCReserve 创建一个会议预约。
  //
  // 支持预约最近30天内的会议（到期时间距离当前时间不超过30天）, 预约到期后会议号将被释放, 如需继续使用可通过"更新预约"接口进行续期；预约会议时可配置参会人在会中的权限, 以达到控制会议的目的
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/apply
  async applyVCReserve(
    request: VC.ApplyVCReserveReq
  ): Promise<{
    data: VC.ApplyVCReserveResp
    response: Response
  }> {
    const req: RawRequestReq<ApplyVCReserveReq> = {
      scope: 'VC',
      api: 'ApplyVCReserve',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/reserves/apply',
      body: new ApplyVCReserveReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<ApplyVCReserveReq, VC.ApplyVCReserveResp>(req)
  }
  // updateVCReserve 更新一个预约
  //
  // 只能更新归属于自己的预约, 不需要更新的字段不传（如果传空则会被更新为空）；可用于续期操作, 到期时间距离当前时间不超过30天
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/update
  async updateVCReserve(
    request: VC.UpdateVCReserveReq
  ): Promise<{
    data: VC.UpdateVCReserveResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateVCReserveReq> = {
      scope: 'VC',
      api: 'UpdateVCReserve',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/reserves/:reserve_id',
      body: new UpdateVCReserveReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateVCReserveReq, VC.UpdateVCReserveResp>(req)
  }
  // deleteVCReserve 删除一个预约
  //
  // 只能删除归属于自己的预约；删除后数据不可恢复
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/delete
  async deleteVCReserve(
    request: VC.DeleteVCReserveReq
  ): Promise<{
    data: VC.DeleteVCReserveResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteVCReserveReq> = {
      scope: 'VC',
      api: 'DeleteVCReserve',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/reserves/:reserve_id',
      body: new DeleteVCReserveReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteVCReserveReq, VC.DeleteVCReserveResp>(req)
  }
  // getVCReserve 获取一个预约的详情
  //
  // 只能获取归属于自己的预约
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/get
  async getVCReserve(
    request: VC.GetVCReserveReq
  ): Promise<{
    data: VC.GetVCReserveResp
    response: Response
  }> {
    const req: RawRequestReq<GetVCReserveReq> = {
      scope: 'VC',
      api: 'GetVCReserve',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/reserves/:reserve_id',
      body: new GetVCReserveReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetVCReserveReq, VC.GetVCReserveResp>(req)
  }
  // getVCReserveActiveMeeting 获取一个预约的当前活跃会议
  //
  // 只能获取归属于自己的预约的活跃会议（一个预约最多有一个正在进行中的会议）
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/get_active_meeting
  async getVCReserveActiveMeeting(
    request: VC.GetVCReserveActiveMeetingReq
  ): Promise<{
    data: VC.GetVCReserveActiveMeetingResp
    response: Response
  }> {
    const req: RawRequestReq<GetVCReserveActiveMeetingReq> = {
      scope: 'VC',
      api: 'GetVCReserveActiveMeeting',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/reserves/:reserve_id/get_active_meeting',
      body: new GetVCReserveActiveMeetingReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetVCReserveActiveMeetingReq, VC.GetVCReserveActiveMeetingResp>(req)
  }
  // getVCMeeting 获取一个会议的详细数据
  //
  // 只能获取归属于自己的会议, 支持查询最近90天内的会议
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/get
  async getVCMeeting(
    request: VC.GetVCMeetingReq
  ): Promise<{
    data: VC.GetVCMeetingResp
    response: Response
  }> {
    const req: RawRequestReq<GetVCMeetingReq> = {
      scope: 'VC',
      api: 'GetVCMeeting',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/meetings/:meeting_id',
      body: new GetVCMeetingReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetVCMeetingReq, VC.GetVCMeetingResp>(req)
  }
  // listVCMeetingByNo 获取指定时间范围（90天内)会议号关联的会议简要信息列表
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/list_by_no
  async listVCMeetingByNo(
    request: VC.ListVCMeetingByNoReq
  ): Promise<{
    data: VC.ListVCMeetingByNoResp
    response: Response
  }> {
    const req: RawRequestReq<ListVCMeetingByNoReq> = {
      scope: 'VC',
      api: 'ListVCMeetingByNo',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/meetings/list_by_no',
      body: new ListVCMeetingByNoReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<ListVCMeetingByNoReq, VC.ListVCMeetingByNoResp>(req)
  }
  // inviteVCMeeting 邀请参会人进入会议
  //
  // 发起邀请的操作者必须具有相应的权限（如果操作者为用户, 则必须在会中）, 如果会议被锁定、或参会人数如果达到上限, 则会邀请失败
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/invite
  async inviteVCMeeting(
    request: VC.InviteVCMeetingReq
  ): Promise<{
    data: VC.InviteVCMeetingResp
    response: Response
  }> {
    const req: RawRequestReq<InviteVCMeetingReq> = {
      scope: 'VC',
      api: 'InviteVCMeeting',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/meetings/:meeting_id/invite',
      body: new InviteVCMeetingReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<InviteVCMeetingReq, VC.InviteVCMeetingResp>(req)
  }
  // kickoutVCMeeting 将参会人从会议中移除
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/kickout
  async kickoutVCMeeting(
    request: VC.KickoutVCMeetingReq
  ): Promise<{
    data: VC.KickoutVCMeetingResp
    response: Response
  }> {
    const req: RawRequestReq<KickoutVCMeetingReq> = {
      scope: 'VC',
      api: 'KickoutVCMeeting',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/meetings/:meeting_id/kickout',
      body: new KickoutVCMeetingReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<KickoutVCMeetingReq, VC.KickoutVCMeetingResp>(req)
  }
  // setVCHostMeeting 设置会议的主持人
  //
  // 发起设置主持人的操作者必须具有相应的权限（如果操作者为用户, 必须是会中当前主持人）；该操作使用CAS并发安全机制, 需传入会中当前主持人, 如果操作失败可使用返回的最新数据重试
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/set_host
  async setVCHostMeeting(
    request: VC.SetVCHostMeetingReq
  ): Promise<{
    data: VC.SetVCHostMeetingResp
    response: Response
  }> {
    const req: RawRequestReq<SetVCHostMeetingReq> = {
      scope: 'VC',
      api: 'SetVCHostMeeting',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/meetings/:meeting_id/set_host',
      body: new SetVCHostMeetingReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SetVCHostMeetingReq, VC.SetVCHostMeetingResp>(req)
  }
  // endVCMeeting 结束一个进行中的会议
  //
  // 会议正在进行中, 且操作者须具有相应的权限（如果操作者为用户, 必须是会中当前主持人）
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/end
  async endVCMeeting(
    request: VC.EndVCMeetingReq
  ): Promise<{
    data: VC.EndVCMeetingResp
    response: Response
  }> {
    const req: RawRequestReq<EndVCMeetingReq> = {
      scope: 'VC',
      api: 'EndVCMeeting',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/meetings/:meeting_id/end',
      body: new EndVCMeetingReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<EndVCMeetingReq, VC.EndVCMeetingResp>(req)
  }
  // startVCMeetingRecording 在会议中开始录制。
  //
  // 会议正在进行中, 且操作者具有相应权限（如果操作者为用户, 必须是会中当前主持人）
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/start
  async startVCMeetingRecording(
    request: VC.StartVCMeetingRecordingReq
  ): Promise<{
    data: VC.StartVCMeetingRecordingResp
    response: Response
  }> {
    const req: RawRequestReq<StartVCMeetingRecordingReq> = {
      scope: 'VC',
      api: 'StartVCMeetingRecording',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/meetings/:meeting_id/recording/start',
      body: new StartVCMeetingRecordingReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<StartVCMeetingRecordingReq, VC.StartVCMeetingRecordingResp>(req)
  }
  // stopVCMeetingRecording 在会议中停止录制。
  //
  // 会议正在录制中, 且操作者具有相应权限（如果操作者为用户, 必须是会中当前主持人）
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/stop
  async stopVCMeetingRecording(
    request: VC.StopVCMeetingRecordingReq
  ): Promise<{
    data: VC.StopVCMeetingRecordingResp
    response: Response
  }> {
    const req: RawRequestReq<StopVCMeetingRecordingReq> = {
      scope: 'VC',
      api: 'StopVCMeetingRecording',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/meetings/:meeting_id/recording/stop',
      body: new StopVCMeetingRecordingReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<StopVCMeetingRecordingReq, VC.StopVCMeetingRecordingResp>(req)
  }
  // getVCMeetingRecording 获取一个会议的录制文件。
  //
  // 会议结束后并且收到了"录制完成"的事件方可获取录制文件；只有会议owner（通过开放平台预约的会议即为预约人）有权限获取；录制时间太短(<5s)有可能无法生成录制文件
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/get
  async getVCMeetingRecording(
    request: VC.GetVCMeetingRecordingReq
  ): Promise<{
    data: VC.GetVCMeetingRecordingResp
    response: Response
  }> {
    const req: RawRequestReq<GetVCMeetingRecordingReq> = {
      scope: 'VC',
      api: 'GetVCMeetingRecording',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/meetings/:meeting_id/recording',
      body: new GetVCMeetingRecordingReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetVCMeetingRecordingReq, VC.GetVCMeetingRecordingResp>(req)
  }
  // setVCPermissionMeetingRecording 将一个会议的录制文件授权给组织、用户或公开到公网
  //
  // 会议结束后并且收到了"录制完成"的事件方可进行授权；会议owner（通过开放平台预约的会议即为预约人）才有权限操作
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/set_permission
  async setVCPermissionMeetingRecording(
    request: VC.SetVCPermissionMeetingRecordingReq
  ): Promise<{
    data: VC.SetVCPermissionMeetingRecordingResp
    response: Response
  }> {
    const req: RawRequestReq<SetVCPermissionMeetingRecordingReq> = {
      scope: 'VC',
      api: 'SetVCPermissionMeetingRecording',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/meetings/:meeting_id/recording/set_permission',
      body: new SetVCPermissionMeetingRecordingReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      SetVCPermissionMeetingRecordingReq,
      VC.SetVCPermissionMeetingRecordingResp
    >(req)
  }
  // getVCDailyReport 获取一段时间内组织的每日会议使用报告。
  //
  // 支持最近90天内的数据查询
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/report/get_daily
  async getVCDailyReport(
    request: VC.GetVCDailyReportReq
  ): Promise<{
    data: VC.GetVCDailyReportResp
    response: Response
  }> {
    const req: RawRequestReq<GetVCDailyReportReq> = {
      scope: 'VC',
      api: 'GetVCDailyReport',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/reports/get_daily',
      body: new GetVCDailyReportReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetVCDailyReportReq, VC.GetVCDailyReportResp>(req)
  }
  // getVCTopUserReport 获取一段时间内组织内会议使用的top用户列表。
  //
  // 支持最近90天内的数据查询；默认返回前10位, 最多可查询前100位
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/report/get_top_user
  async getVCTopUserReport(
    request: VC.GetVCTopUserReportReq
  ): Promise<{
    data: VC.GetVCTopUserReportResp
    response: Response
  }> {
    const req: RawRequestReq<GetVCTopUserReportReq> = {
      scope: 'VC',
      api: 'GetVCTopUserReport',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/reports/get_top_user',
      body: new GetVCTopUserReportReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetVCTopUserReportReq, VC.GetVCTopUserReportResp>(req)
  }
  // getVCRoomConfig 查询一个范围内的会议室配置。
  //
  // 根据查询范围传入对应的参数
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/query
  async getVCRoomConfig(
    request: VC.GetVCRoomConfigReq
  ): Promise<{
    data: VC.GetVCRoomConfigResp
    response: Response
  }> {
    const req: RawRequestReq<GetVCRoomConfigReq> = {
      scope: 'VC',
      api: 'GetVCRoomConfig',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/room_configs/query',
      body: new GetVCRoomConfigReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetVCRoomConfigReq, VC.GetVCRoomConfigResp>(req)
  }
  // setVCRoomConfig 设置一个范围内的会议室配置。
  //
  // 根据设置范围传入对应的参数
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/set
  async setVCRoomConfig(
    request: VC.SetVCRoomConfigReq
  ): Promise<{
    data: VC.SetVCRoomConfigResp
    response: Response
  }> {
    const req: RawRequestReq<SetVCRoomConfigReq> = {
      scope: 'VC',
      api: 'SetVCRoomConfig',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/vc/v1/room_configs/set',
      body: new SetVCRoomConfigReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SetVCRoomConfigReq, VC.SetVCRoomConfigResp>(req)
  }
}

export declare namespace VC {
  export interface ApplyVCReserveReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    end_time?: string // 预约到期时间（unix时间, 单位sec）, 多人会议必填, 示例值: "1608888867"
    meeting_settings: ApplyVCReserveReqMeetingSettings // 会议设置
  }

  export interface ApplyVCReserveReqMeetingSettings {
    topic?: string // 会议主题, 示例值: "my meeting"
    action_permissions?: ApplyVCReserveReqMeetingSettingsActionPermission[] // 会议权限配置列表, 如果存在相同的权限配置项则它们之间为"逻辑或"的关系（即 有一个为true则拥有该权限）
    meeting_initial_type?: number // 会议初始类型, 示例值: 1, 可选值有: `1`: 多人会议, `2`: 1v1呼叫
    call_setting?: ApplyVCReserveReqMeetingSettingsCallSetting // 1v1呼叫相关参数
  }

  export interface ApplyVCReserveReqMeetingSettingsActionPermission {
    permission: number // 权限项, 示例值: 1, 可选值有: `1`: 是否能成为主持人, `2`: 是否能邀请参会人, `3`: 是否能加入会议
    permission_checkers?: ApplyVCReserveReqMeetingSettingsActionPermissionPermissionChecker[] // 权限检查器列表, 权限检查器之间为"逻辑或"的关系（即 有一个为true则拥有该权限）
  }

  export interface ApplyVCReserveReqMeetingSettingsActionPermissionPermissionChecker {
    check_field: number // 检查字段类型, 示例值: 1, 可选值有: `1`: 用户ID, `2`: 用户类型, `3`: 租户ID
    check_mode: number // 检查方式, 示例值: 1, 可选值有: `1`: 在check_list中为有权限（白名单）, `2`: 不在check_list中为有权限（黑名单）
    check_list?: string[] // 检查字段列表, 示例值: 123
  }

  export interface ApplyVCReserveReqMeetingSettingsCallSetting {
    callee: ApplyVCReserveReqMeetingSettingsCallSettingCallee // 被呼叫的用户
  }

  export interface ApplyVCReserveReqMeetingSettingsCallSettingCallee {
    id?: string // 用户ID, 示例值: "ou_3ec3f6a28a0d08c45d895276e8e5e19b"
    user_type: number // 用户类型, 当前仅支持用户类型6(pstn用户), 示例值: 1, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
    pstn_sip_info?: ApplyVCReserveReqMeetingSettingsCallSettingCalleePstnSipInfo // pstn/sip信息
  }

  export interface ApplyVCReserveReqMeetingSettingsCallSettingCalleePstnSipInfo {
    nickname?: string // 给pstn/sip用户设置的临时昵称, 示例值: "dodo"
    main_address: string // pstn/sip主机号, 格式为: [国际冠字]-[电话区号][电话号码], 当前仅支持国内手机及固定电话号码, 示例值: "+86-02187654321"
  }

  export interface ApplyVCReserveResp {
    reserve: ApplyVCReserveRespReserve // 预约数据
  }

  export interface ApplyVCReserveRespReserve {
    id: string // 预约ID（预约的唯一标识）
    meeting_no: string // 9位会议号（飞书用户可通过输入9位会议号快捷入会）
    url: string // 会议链接（飞书用户可通过点击会议链接快捷入会）
    app_link: string // APPLink用于唤起飞书APP入会。"{?}"为占位符, 用于配置入会参数, 使用时需替换具体值: 0表示关闭, 1表示打开。preview为入会前的设置页, mic为麦克风, speaker为扬声器, camera为摄像头
    live_link: string // 直播链接
    end_time: string // 预约到期时间（unix时间, 单位sec）
  }

  export interface applyVCReserveResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: ApplyVCReserveResp
  }

  export interface UpdateVCReserveReq {
    reserve_id: string // 预约ID（预约的唯一标识）, 示例值: "6911188411932033028"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    end_time?: string // 预约到期时间（unix时间, 单位sec）, 示例值: "1608888867"
    meeting_settings?: UpdateVCReserveReqMeetingSettings // 会议设置
  }

  export interface UpdateVCReserveReqMeetingSettings {
    topic?: string // 会议主题, 示例值: "my meeting"
    action_permissions?: UpdateVCReserveReqMeetingSettingsActionPermission[] // 会议权限配置列表, 如果存在相同的权限配置项则它们之间为"逻辑或"的关系（即 有一个为true则拥有该权限）
    meeting_initial_type?: number // 会议初始类型, 示例值: 1, 可选值有: `1`: 多人会议, `2`: 1v1呼叫
    call_setting?: UpdateVCReserveReqMeetingSettingsCallSetting // 1v1呼叫相关参数
  }

  export interface UpdateVCReserveReqMeetingSettingsActionPermission {
    permission: number // 权限项, 示例值: 1, 可选值有: `1`: 是否能成为主持人, `2`: 是否能邀请参会人, `3`: 是否能加入会议
    permission_checkers?: UpdateVCReserveReqMeetingSettingsActionPermissionPermissionChecker[] // 权限检查器列表, 权限检查器之间为"逻辑或"的关系（即 有一个为true则拥有该权限）
  }

  export interface UpdateVCReserveReqMeetingSettingsActionPermissionPermissionChecker {
    check_field: number // 检查字段类型, 示例值: 1, 可选值有: `1`: 用户ID, `2`: 用户类型, `3`: 租户ID
    check_mode: number // 检查方式, 示例值: 1, 可选值有: `1`: 在check_list中为有权限（白名单）, `2`: 不在check_list中为有权限（黑名单）
    check_list?: string[] // 检查字段列表
  }

  export interface UpdateVCReserveReqMeetingSettingsCallSetting {
    callee: UpdateVCReserveReqMeetingSettingsCallSettingCallee // 被呼叫的用户
  }

  export interface UpdateVCReserveReqMeetingSettingsCallSettingCallee {
    id?: string // 用户ID, 示例值: "ou_3ec3f6a28a0d08c45d895276e8e5e19b"
    user_type: number // 用户类型, 当前仅支持用户类型6(pstn用户), 示例值: 1, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
    pstn_sip_info?: UpdateVCReserveReqMeetingSettingsCallSettingCalleePstnSipInfo // pstn/sip信息
  }

  export interface UpdateVCReserveReqMeetingSettingsCallSettingCalleePstnSipInfo {
    nickname?: string // 给pstn/sip用户设置的临时昵称, 示例值: "dodo"
    main_address: string // pstn/sip主机号, 格式为: [国际冠字]-[电话区号][电话号码], 当前仅支持国内手机及固定电话号码, 示例值: "+86-02187654321"
  }

  export interface UpdateVCReserveResp {
    reserve: UpdateVCReserveRespReserve // 预约数据
  }

  export interface UpdateVCReserveRespReserve {
    id: string // 预约ID（预约的唯一标识）
    meeting_no: string // 9位会议号（飞书用户可通过输入9位会议号快捷入会）
    url: string // 会议链接（飞书用户可通过点击会议链接快捷入会）
    end_time: string // 预约到期时间（unix时间, 单位sec）
    expire_status: number // 过期状态, 可选值有: `1`: 未过期, `2`: 已过期
  }

  export interface updateVCReserveResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateVCReserveResp
  }

  export interface DeleteVCReserveReq {
    reserve_id: string // 预约ID（预约的唯一标识）, 示例值: "6911188411932033028"
  }

  export interface DeleteVCReserveResp {}

  export interface deleteVCReserveResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteVCReserveResp
  }

  export interface GetVCReserveReq {
    reserve_id: string // 预约ID（预约的唯一标识）, 示例值: "6911188411932033028"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetVCReserveResp {
    reserve: GetVCReserveRespReserve // 预约数据
  }

  export interface GetVCReserveRespReserve {
    id: string // 预约ID（预约的唯一标识）
    meeting_no: string // 9位会议号（飞书用户可通过输入9位会议号快捷入会）
    url: string // 会议链接（飞书用户可通过点击会议链接快捷入会）
    app_link: string // APPLink用于唤起飞书APP入会。"{?}"为占位符, 用于配置入会参数, 使用时需替换具体值: 0表示关闭, 1表示打开。preview为入会前的设置页, mic为麦克风, speaker为扬声器, camera为摄像头
    live_link: string // 直播链接
    end_time: string // 预约到期时间（unix时间, 单位sec）
    expire_status: number // 过期状态, 可选值有: `1`: 未过期, `2`: 已过期
    reserve_user_id: string // 预约人ID
    meeting_settings: GetVCReserveRespReserveMeetingSettings // 会议设置
  }

  export interface GetVCReserveRespReserveMeetingSettings {
    topic: string // 会议主题
    action_permissions?: GetVCReserveRespReserveMeetingSettingsActionPermission[] // 会议权限配置列表, 如果存在相同的权限配置项则它们之间为"逻辑或"的关系（即 有一个为true则拥有该权限）
    meeting_initial_type: number // 会议初始类型, 可选值有: `1`: 多人会议, `2`: 1v1呼叫
    call_setting: GetVCReserveRespReserveMeetingSettingsCallSetting // 1v1呼叫相关参数
  }

  export interface GetVCReserveRespReserveMeetingSettingsActionPermission {
    permission: number // 权限项, 可选值有: `1`: 是否能成为主持人, `2`: 是否能邀请参会人, `3`: 是否能加入会议
    permission_checkers?: GetVCReserveRespReserveMeetingSettingsActionPermissionPermissionChecker[] // 权限检查器列表, 权限检查器之间为"逻辑或"的关系（即 有一个为true则拥有该权限）
  }

  export interface GetVCReserveRespReserveMeetingSettingsActionPermissionPermissionChecker {
    check_field: number // 检查字段类型, 可选值有: `1`: 用户ID, `2`: 用户类型, `3`: 租户ID
    check_mode: number // 检查方式, 可选值有: `1`: 在check_list中为有权限（白名单）, `2`: 不在check_list中为有权限（黑名单）
    check_list?: string[] // 检查字段列表
  }

  export interface GetVCReserveRespReserveMeetingSettingsCallSetting {
    callee: GetVCReserveRespReserveMeetingSettingsCallSettingCallee // 被呼叫的用户
  }

  export interface GetVCReserveRespReserveMeetingSettingsCallSettingCallee {
    id: string // 用户ID
    user_type: number // 用户类型, 当前仅支持用户类型6(pstn用户), 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
    pstn_sip_info: GetVCReserveRespReserveMeetingSettingsCallSettingCalleePstnSipInfo // pstn/sip信息
  }

  export interface GetVCReserveRespReserveMeetingSettingsCallSettingCalleePstnSipInfo {
    nickname: string // 给pstn/sip用户设置的临时昵称
    main_address: string // pstn/sip主机号, 格式为: [国际冠字]-[电话区号][电话号码], 当前仅支持国内手机及固定电话号码
  }

  export interface getVCReserveResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetVCReserveResp
  }

  export interface GetVCReserveActiveMeetingReq {
    reserve_id: string // 预约ID（预约的唯一标识）, 示例值: "6911188411932033028"
    with_participants?: boolean // 是否需要参会人列表, 默认为false, 示例值: false
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetVCReserveActiveMeetingResp {
    meeting: GetVCReserveActiveMeetingRespMeeting // 会议数据
  }

  export interface GetVCReserveActiveMeetingRespMeeting {
    id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）
    topic: string // 会议主题
    url: string // 会议链接（飞书用户可通过点击会议链接快捷入会）
    meeting_no: string // 会议号
    create_time: string // 会议创建时间（unix时间, 单位sec）
    start_time: string // 会议开始时间（unix时间, 单位sec）
    end_time: string // 会议结束时间（unix时间, 单位sec）
    host_user: GetVCReserveActiveMeetingRespMeetingHostUser // 主持人
    status: number // 会议状态, 可选值有: `1`: 会议呼叫中, `2`: 会议进行中, `3`: 会议已结束
    participant_count: string // 参会人数
    participant_count_accumulated: string // 累计参会人数
    participants?: GetVCReserveActiveMeetingRespMeetingParticipant[] // 参会人列表
    ability: GetVCReserveActiveMeetingRespMeetingAbility // 会中使用的能力
  }

  export interface GetVCReserveActiveMeetingRespMeetingAbility {
    use_video: boolean // 是否使用视频
    use_audio: boolean // 是否使用音频
    use_share_screen: boolean // 是否使用共享屏幕
    use_follow_screen: boolean // 是否使用妙享（magic share）
    use_recording: boolean // 是否使用录制
    use_pstn: boolean // 是否使用PSTN
  }

  export interface GetVCReserveActiveMeetingRespMeetingHostUser {
    id: string // 用户ID
    user_type: number // 用户类型, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
  }

  export interface GetVCReserveActiveMeetingRespMeetingParticipant {
    id: string // 用户ID
    first_join_time: string // 首次入会时间, 秒级Unix时间戳
    final_leave_time: string // 最终离会时间, 秒级Unix时间戳
    in_meeting_duration: string // 累计在会中时间, 时间单位: 秒
    user_type: number // 用户类型, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
    is_host: boolean // 是否为主持人
    is_cohost: boolean // 是否为联席主持人
    is_external: boolean // 是否为外部参会人
    status: number // 参会人状态, 可选值有: `1`: 呼叫中, `2`: 在会中, `3`: 正在响铃, `4`: 不在会中或已经离开会议
  }

  export interface getVCReserveActiveMeetingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetVCReserveActiveMeetingResp
  }

  export interface GetVCMeetingReq {
    meeting_id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）, 示例值: "6911188411932033028"
    with_participants?: boolean // 是否需要参会人列表, 示例值: false
    with_meeting_ability?: boolean // 是否需要会中使用能力统计（仅限tenant_access_token）, 示例值: false
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetVCMeetingResp {
    meeting: GetVCMeetingRespMeeting // 会议数据
  }

  export interface GetVCMeetingRespMeeting {
    id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）
    topic: string // 会议主题
    url: string // 会议链接（飞书用户可通过点击会议链接快捷入会）
    meeting_no: string // 会议号
    create_time: string // 会议创建时间（unix时间, 单位sec）
    start_time: string // 会议开始时间（unix时间, 单位sec）
    end_time: string // 会议结束时间（unix时间, 单位sec）
    host_user: GetVCMeetingRespMeetingHostUser // 主持人
    status: number // 会议状态, 可选值有: 1: 会议呼叫中, 2: 会议进行中, 3: 会议已结束
    participant_count: string // 参会人数
    participant_count_accumulated: string // 累计参会人数
    participants?: GetVCMeetingRespMeetingParticipant[] // 参会人列表
    ability: GetVCMeetingRespMeetingAbility // 会中使用的能力
  }

  export interface GetVCMeetingRespMeetingAbility {
    use_video: boolean // 是否使用视频
    use_audio: boolean // 是否使用音频
    use_share_screen: boolean // 是否使用共享屏幕
    use_follow_screen: boolean // 是否使用妙享（magic share）
    use_recording: boolean // 是否使用录制
    use_pstn: boolean // 是否使用PSTN
  }

  export interface GetVCMeetingRespMeetingHostUser {
    id: string // 用户ID
    user_type: number // 用户类型, 可选值有: 1: lark用户, 2: rooms用户, 3: 文档用户, 4: neo单品用户, 5: neo单品游客用户, 6: pstn用户, 7: sip用户
  }

  export interface GetVCMeetingRespMeetingParticipant {
    id: string // 用户ID
    first_join_time: string // 首次入会时间, 秒级Unix时间戳
    final_leave_time: string // 最终离会时间, 秒级Unix时间戳
    in_meeting_duration: string // 累计在会中时间, 时间单位: 秒
    user_type: number // 用户类型, 可选值有: 1: lark用户, 2: rooms用户, 3: 文档用户, 4: neo单品用户, 5: neo单品游客用户, 6: pstn用户, 7: sip用户
    is_host: boolean // 是否为主持人
    is_cohost: boolean // 是否为联席主持人
    is_external: boolean // 是否为外部参会人
    status: number // 参会人状态, 可选值有: 1: 呼叫中, 2: 在会中, 3: 正在响铃, 4: 不在会中或已经离开会议
  }

  export interface getVCMeetingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetVCMeetingResp
  }

  export interface ListVCMeetingByNoReq {
    meeting_no: string // 9位会议号, 示例值: "123456789"
    start_time: string // 查询开始时间（unix时间, 单位sec）, 示例值: "1608888867"
    end_time: string // 查询结束时间（unix时间, 单位sec）, 示例值: "1608888867"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "5"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `10`
  }

  export interface ListVCMeetingByNoResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    meeting_briefs?: ListVCMeetingByNoRespMeetingBrief[] // 会议简要信息列表
  }

  export interface ListVCMeetingByNoRespMeetingBrief {
    id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）
    topic: string // 会议主题
    url: string // 会议链接（飞书用户可通过点击会议链接快捷入会）
    meeting_no: string // 会议号
  }

  export interface listVCMeetingByNoResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: ListVCMeetingByNoResp
  }

  export interface InviteVCMeetingReq {
    meeting_id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）, 示例值: "6911188411932033028"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    invitees?: InviteVCMeetingReqInvitee[] // 被邀请的用户列表
  }

  export interface InviteVCMeetingReqInvitee {
    id?: string // 用户ID, 示例值: "ou_3ec3f6a28a0d08c45d895276e8e5e19b"
    user_type?: number // 用户类型, 示例值: 1, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
  }

  export interface InviteVCMeetingResp {
    invite_results?: InviteVCMeetingRespInviteResult[] // 邀请结果
  }

  export interface InviteVCMeetingRespInviteResult {
    id: string // 用户ID
    user_type: number // 用户类型, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
    status: number // 邀请结果, 可选值有: `1`: 邀请成功, `2`: 邀请失败
  }

  export interface inviteVCMeetingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: InviteVCMeetingResp
  }

  export interface KickoutVCMeetingReq {
    meeting_id: string // 会议ID, 示例值: "6911188411932033028"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    kickout_users?: KickoutVCMeetingReqKickoutUser[] // 需踢出的用户列表
  }

  export interface KickoutVCMeetingReqKickoutUser {
    id?: string // 用户ID, 示例值: "ou_3ec3f6a28a0d08c45d895276e8e5e19b"
    user_type?: number // 用户类型, 示例值: 1, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
  }

  export interface KickoutVCMeetingResp {
    kickout_results?: KickoutVCMeetingRespKickoutResult[] // 踢出结果
  }

  export interface KickoutVCMeetingRespKickoutResult {
    id: string // 用户ID
    user_type: number // 用户类型, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
    result: number // 邀请结果, 可选值有: `1`: 邀请成功, `2`: 邀请失败
  }

  export interface kickoutVCMeetingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: KickoutVCMeetingResp
  }

  export interface SetVCHostMeetingReq {
    meeting_id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）, 示例值: "6911188411932033028"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    host_user: SetVCHostMeetingReqHostUser // 将要设置的主持人
    old_host_user?: SetVCHostMeetingReqOldHostUser // 当前主持人（CAS并发安全: 如果和会中当前主持人不符则会设置失败, 可使用返回的最新数据重新设置）
  }

  export interface SetVCHostMeetingReqHostUser {
    id?: string // 用户ID, 示例值: "ou_3ec3f6a28a0d08c45d895276e8e5e19b"
    user_type?: number // 用户类型, 示例值: 1, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
  }

  export interface SetVCHostMeetingReqOldHostUser {
    id?: string // 用户ID, 示例值: "ou_3ec3f6a28a0d08c45d895276e8e5e19b"
    user_type?: number // 用户类型, 示例值: 1, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
  }

  export interface SetVCHostMeetingResp {
    host_user: SetVCHostMeetingRespHostUser // 会中当前主持人
  }

  export interface SetVCHostMeetingRespHostUser {
    id: string // 用户ID
    user_type: number // 用户类型, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
  }

  export interface setVCHostMeetingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SetVCHostMeetingResp
  }

  export interface EndVCMeetingReq {
    meeting_id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）, 示例值: "6911188411932033028"
  }

  export interface EndVCMeetingResp {}

  export interface endVCMeetingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: EndVCMeetingResp
  }

  export interface StartVCMeetingRecordingReq {
    meeting_id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）, 示例值: "6911188411932033028"
    timezone?: number // 录制文件时间显示使用的时区[-12, 12], 示例值: 8
  }

  export interface StartVCMeetingRecordingResp {}

  export interface startVCMeetingRecordingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: StartVCMeetingRecordingResp
  }

  export interface StopVCMeetingRecordingReq {
    meeting_id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）, 示例值: "6911188411932033028"
  }

  export interface StopVCMeetingRecordingResp {}

  export interface stopVCMeetingRecordingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: StopVCMeetingRecordingResp
  }

  export interface GetVCMeetingRecordingReq {
    meeting_id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）, 示例值: "6911188411932033028"
  }

  export interface GetVCMeetingRecordingResp {
    recording: GetVCMeetingRecordingRespRecording // 录制文件数据
  }

  export interface GetVCMeetingRecordingRespRecording {
    url: string // 录制文件URL
    duration: string // 录制总时长（单位msec）
  }

  export interface getVCMeetingRecordingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetVCMeetingRecordingResp
  }

  export interface SetVCPermissionMeetingRecordingReq {
    meeting_id: string // 会议ID（视频会议的唯一标识, 视频会议开始后才会产生）, 示例值: "6911188411932033028"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    permission_objects?: SetVCPermissionMeetingRecordingReqPermissionObject[] // 授权对象列表
  }

  export interface SetVCPermissionMeetingRecordingReqPermissionObject {
    id?: string // 授权对象ID, 示例值: "ou_3ec3f6a28a0d08c45d895276e8e5e19b"
    type: number // 授权对象类型, 示例值: 1, 可选值有: `1`: 用户授权, `2`: 群组授权, `3`: 租户内授权（id字段不填）, `4`: 公网授权（id字段不填）
    permission: number // 权限, 示例值: 1, 可选值有: `1`: 查看
  }

  export interface SetVCPermissionMeetingRecordingResp {}

  export interface setVCPermissionMeetingRecordingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SetVCPermissionMeetingRecordingResp
  }

  export interface GetVCDailyReportReq {
    start_time: string // 开始时间（unix时间, 单位sec）, 示例值: "1608888867"
    end_time: string // 结束时间（unix时间, 单位sec）, 示例值: "1608888966"
  }

  export interface GetVCDailyReportResp {
    meeting_report: GetVCDailyReportRespMeetingReport // 会议报告
  }

  export interface GetVCDailyReportRespMeetingReport {
    total_meeting_count: number // 总会议数量
    total_meeting_duration: number // 总会议时长（单位sec）
    total_participant_count: number // 总参会人数
    daily_report?: GetVCDailyReportRespMeetingReportDailyReport[] // 每日会议报告列表
  }

  export interface GetVCDailyReportRespMeetingReportDailyReport {
    date: string // 日期（unix时间, 单位sec）
    meeting_count: string // 会议数量
    meeting_duration: string // 会议时长（单位sec）
    participant_count: string // 参会人数
  }

  export interface getVCDailyReportResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetVCDailyReportResp
  }

  export interface GetVCTopUserReportReq {
    start_time: string // 开始时间（unix时间, 单位sec）, 示例值: "1608888867"
    end_time: string // 结束时间（unix时间, 单位sec）, 示例值: "1608889966"
    limit: number // 取前多少位, 示例值: 10
    order_by: number // 排序依据（降序）, 示例值: 1, 可选值有: `1`: 会议数量, `2`: 会议时长
  }

  export interface GetVCTopUserReportResp {
    top_user_report?: GetVCTopUserReportRespTopUserReport[] // top用户列表
  }

  export interface GetVCTopUserReportRespTopUserReport {
    id: string // 用户ID
    name: string // 用户名
    user_type: number // 用户类型, 可选值有: `1`: lark用户, `2`: rooms用户, `3`: 文档用户, `4`: neo单品用户, `5`: neo单品游客用户, `6`: pstn用户, `7`: sip用户
    meeting_count: string // 会议数量
    meeting_duration: string // 会议时长（单位min）
  }

  export interface getVCTopUserReportResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetVCTopUserReportResp
  }

  export interface GetVCRoomConfigReq {
    scope: number // 查询节点范围, 示例值: 5, 可选值有: `1`: 租户, `2`: 国家/地区, `3`: 城市, `4`: 建筑, `5`: 楼层, `6`: 会议室
    country_id?: string // 国家/地区ID scope为2, 3时需要此参数, 示例值: "086"
    district_id?: string // 城市ID scope为3时需要此参数, 示例值: "001"
    building_id?: string // 建筑ID scope为4, 5时需要此参数, 示例值: "22"
    floor_name?: string // 楼层 scope为5时需要此参数, 示例值: "4"
    room_id?: string // 会议室ID scope为6时需要此参数, 示例值: "6383786266263"
  }

  export interface GetVCRoomConfigResp {
    room_background: string // 飞书会议室背景图
    display_background: string // 飞书签到板背景图
    digital_signage: GetVCRoomConfigRespDigitalSignage // 飞书会议室数字标牌
  }

  export interface GetVCRoomConfigRespDigitalSignage {
    enable: boolean // 是否开启数字标牌功能
    mute: boolean // 是否静音播放
    start_display: number // 日程会议开始前n分钟结束播放
    stop_display: number // 会议结束后n分钟开始播放
    materials?: GetVCRoomConfigRespDigitalSignageMaterial[] // 素材列表
  }

  export interface GetVCRoomConfigRespDigitalSignageMaterial {
    id: string // 素材ID
    name: string // 素材名称
    material_type: number // 素材类型, 可选值有: `1`: 图片, `2`: 视频, `3`: GIF
    url: string // 素材url
    duration: number // 播放时长（单位sec）
    cover: string // 素材封面url
    md5: string // 素材文件md5
  }

  export interface getVCRoomConfigResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetVCRoomConfigResp
  }

  export interface SetVCRoomConfigReq {
    scope: number // 设置节点范围, 示例值: 5, 可选值有: `1`: 租户, `2`: 国家/地区, `3`: 城市, `4`: 建筑, `5`: 楼层, `6`: 会议室
    country_id?: string // 国家/地区ID scope为2, 3时需要此参数, 示例值: "086"
    district_id?: string // 城市ID scope为3时需要此参数, 示例值: "223"
    building_id?: string // 建筑ID scope为4, 5时需要此参数, 示例值: "66"
    floor_name?: string // 楼层 scope为5时需要此参数, 示例值: "3"
    room_id?: string // 会议室ID scope为6时需要此参数, 示例值: "67687262867363"
    room_config: SetVCRoomConfigReqRoomConfig // 会议室设置
  }

  export interface SetVCRoomConfigReqRoomConfig {
    room_background?: string // 飞书会议室背景图, 示例值: "https://lf1-ttcdn-tos.pstatp.com/obj/xxx"
    display_background?: string // 飞书签到板背景图, 示例值: "https://lf1-ttcdn-tos.pstatp.com/obj/xxx"
    digital_signage?: SetVCRoomConfigReqRoomConfigDigitalSignage // 飞书会议室数字标牌
  }

  export interface SetVCRoomConfigReqRoomConfigDigitalSignage {
    enable?: boolean // 是否开启数字标牌功能, 示例值: true
    mute?: boolean // 是否静音播放, 示例值: true
    start_display?: number // 日程会议开始前n分钟结束播放, 示例值: 3
    stop_display?: number // 会议结束后n分钟开始播放, 示例值: 3
    materials?: SetVCRoomConfigReqRoomConfigDigitalSignageMaterial[] // 素材列表
  }

  export interface SetVCRoomConfigReqRoomConfigDigitalSignageMaterial {
    id?: string // 素材ID, 示例值: "7847784676276"
    name?: string // 素材名称, 示例值: "name"
    material_type?: number // 素材类型, 示例值: 0, 可选值有: `1`: 图片, `2`: 视频, `3`: GIF
    url?: string // 素材url, 示例值: "url"
    duration?: number // 播放时长（单位sec）, 示例值: 15
    cover?: string // 素材封面url, 示例值: "url"
    md5?: string // 素材文件md5, 示例值: "md5"
  }

  export interface SetVCRoomConfigResp {}

  export interface setVCRoomConfigResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SetVCRoomConfigResp
  }
}

class ApplyVCReserveReq {
  user_id_type?: any
  end_time?: any
  meeting_settings?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      end_time: this.end_time,
      meeting_settings: this.meeting_settings
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

class UpdateVCReserveReq {
  reserve_id?: any
  user_id_type?: any
  end_time?: any
  meeting_settings?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      end_time: this.end_time,
      meeting_settings: this.meeting_settings
    }
  }

  getPath(path: string) {
    path = path.replace(':reserve_id', this.reserve_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteVCReserveReq {
  reserve_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':reserve_id', this.reserve_id)

    return path
  }
}

class GetVCReserveReq {
  reserve_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':reserve_id', this.reserve_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetVCReserveActiveMeetingReq {
  reserve_id?: any
  with_participants?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':reserve_id', this.reserve_id)

    const q = {} as { [key: string]: any }
    if (this.with_participants !== undefined) {
      q['with_participants'] = this.with_participants
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetVCMeetingReq {
  meeting_id?: any
  with_participants?: any
  with_meeting_ability?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':meeting_id', this.meeting_id)

    const q = {} as { [key: string]: any }
    if (this.with_participants !== undefined) {
      q['with_participants'] = this.with_participants
    }
    if (this.with_meeting_ability !== undefined) {
      q['with_meeting_ability'] = this.with_meeting_ability
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class ListVCMeetingByNoReq {
  meeting_no?: any
  start_time?: any
  end_time?: any
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
    if (this.meeting_no !== undefined) {
      q['meeting_no'] = this.meeting_no
    }
    if (this.start_time !== undefined) {
      q['start_time'] = this.start_time
    }
    if (this.end_time !== undefined) {
      q['end_time'] = this.end_time
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

class InviteVCMeetingReq {
  meeting_id?: any
  user_id_type?: any
  invitees?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      invitees: this.invitees
    }
  }

  getPath(path: string) {
    path = path.replace(':meeting_id', this.meeting_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class KickoutVCMeetingReq {
  meeting_id?: any
  user_id_type?: any
  kickout_users?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      kickout_users: this.kickout_users
    }
  }

  getPath(path: string) {
    path = path.replace(':meeting_id', this.meeting_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SetVCHostMeetingReq {
  meeting_id?: any
  user_id_type?: any
  host_user?: any
  old_host_user?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      host_user: this.host_user,
      old_host_user: this.old_host_user
    }
  }

  getPath(path: string) {
    path = path.replace(':meeting_id', this.meeting_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class EndVCMeetingReq {
  meeting_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':meeting_id', this.meeting_id)

    return path
  }
}

class StartVCMeetingRecordingReq {
  meeting_id?: any
  timezone?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      timezone: this.timezone
    }
  }

  getPath(path: string) {
    path = path.replace(':meeting_id', this.meeting_id)

    return path
  }
}

class StopVCMeetingRecordingReq {
  meeting_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':meeting_id', this.meeting_id)

    return path
  }
}

class GetVCMeetingRecordingReq {
  meeting_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':meeting_id', this.meeting_id)

    return path
  }
}

class SetVCPermissionMeetingRecordingReq {
  meeting_id?: any
  user_id_type?: any
  permission_objects?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      permission_objects: this.permission_objects
    }
  }

  getPath(path: string) {
    path = path.replace(':meeting_id', this.meeting_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetVCDailyReportReq {
  start_time?: any
  end_time?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.start_time !== undefined) {
      q['start_time'] = this.start_time
    }
    if (this.end_time !== undefined) {
      q['end_time'] = this.end_time
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetVCTopUserReportReq {
  start_time?: any
  end_time?: any
  limit?: any
  order_by?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.start_time !== undefined) {
      q['start_time'] = this.start_time
    }
    if (this.end_time !== undefined) {
      q['end_time'] = this.end_time
    }
    if (this.limit !== undefined) {
      q['limit'] = this.limit
    }
    if (this.order_by !== undefined) {
      q['order_by'] = this.order_by
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetVCRoomConfigReq {
  scope?: any
  country_id?: any
  district_id?: any
  building_id?: any
  floor_name?: any
  room_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.scope !== undefined) {
      q['scope'] = this.scope
    }
    if (this.country_id !== undefined) {
      q['country_id'] = this.country_id
    }
    if (this.district_id !== undefined) {
      q['district_id'] = this.district_id
    }
    if (this.building_id !== undefined) {
      q['building_id'] = this.building_id
    }
    if (this.floor_name !== undefined) {
      q['floor_name'] = this.floor_name
    }
    if (this.room_id !== undefined) {
      q['room_id'] = this.room_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SetVCRoomConfigReq {
  scope?: any
  country_id?: any
  district_id?: any
  building_id?: any
  floor_name?: any
  room_id?: any
  room_config?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      scope: this.scope,
      country_id: this.country_id,
      district_id: this.district_id,
      building_id: this.building_id,
      floor_name: this.floor_name,
      room_id: this.room_id,
      room_config: this.room_config
    }
  }

  getPath(path: string) {
    return path
  }
}
