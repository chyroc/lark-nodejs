import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class MeetingRoomService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getMeetingRoomCustomization 该接口用于获取会议室个性化配置。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uIjM5UjLyITO14iMykTN/query-meeting-room-customization-setting
  async getMeetingRoomCustomization(
    request: MeetingRoom.GetMeetingRoomCustomizationReq
  ): Promise<{
    data: MeetingRoom.GetMeetingRoomCustomizationResp
    response: Response
  }> {
    const req: RawRequestReq<GetMeetingRoomCustomizationReq> = {
      scope: 'MeetingRoom',
      api: 'GetMeetingRoomCustomization',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/room/customization',
      body: new GetMeetingRoomCustomizationReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetMeetingRoomCustomizationReq,
      MeetingRoom.GetMeetingRoomCustomizationResp
    >(req)
  }
  // batchGetMeetingRoomSummary 通过日程的Uid和Original time, 查询会议室日程主题。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uIjM5UjLyITO14iMykTN/
  async batchGetMeetingRoomSummary(
    request: MeetingRoom.BatchGetMeetingRoomSummaryReq
  ): Promise<{
    data: MeetingRoom.BatchGetMeetingRoomSummaryResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetMeetingRoomSummaryReq> = {
      scope: 'MeetingRoom',
      api: 'BatchGetMeetingRoomSummary',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/summary/batch_get',
      body: new BatchGetMeetingRoomSummaryReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchGetMeetingRoomSummaryReq,
      MeetingRoom.BatchGetMeetingRoomSummaryResp
    >(req)
  }
  // getMeetingRoomBuildingList 该接口用于获取本企业下的建筑物（办公大楼）。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ugzNyUjL4cjM14CO3ITN
  async getMeetingRoomBuildingList(
    request: MeetingRoom.GetMeetingRoomBuildingListReq
  ): Promise<{
    data: MeetingRoom.GetMeetingRoomBuildingListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMeetingRoomBuildingListReq> = {
      scope: 'MeetingRoom',
      api: 'GetMeetingRoomBuildingList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/building/list',
      body: new GetMeetingRoomBuildingListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetMeetingRoomBuildingListReq,
      MeetingRoom.GetMeetingRoomBuildingListResp
    >(req)
  }
  // batchGetMeetingRoomBuilding 该接口用于获取指定建筑物的详细信息。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ukzNyUjL5cjM14SO3ITN
  async batchGetMeetingRoomBuilding(
    request: MeetingRoom.BatchGetMeetingRoomBuildingReq
  ): Promise<{
    data: MeetingRoom.BatchGetMeetingRoomBuildingResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetMeetingRoomBuildingReq> = {
      scope: 'MeetingRoom',
      api: 'BatchGetMeetingRoomBuilding',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/building/batch_get',
      body: new BatchGetMeetingRoomBuildingReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchGetMeetingRoomBuildingReq,
      MeetingRoom.BatchGetMeetingRoomBuildingResp
    >(req)
  }
  // getMeetingRoomRoomList 该接口用于获取指定建筑下的会议室。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uADOyUjLwgjM14CM4ITN
  async getMeetingRoomRoomList(
    request: MeetingRoom.GetMeetingRoomRoomListReq
  ): Promise<{
    data: MeetingRoom.GetMeetingRoomRoomListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMeetingRoomRoomListReq> = {
      scope: 'MeetingRoom',
      api: 'GetMeetingRoomRoomList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/room/list',
      body: new GetMeetingRoomRoomListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetMeetingRoomRoomListReq, MeetingRoom.GetMeetingRoomRoomListResp>(
      req
    )
  }
  // batchGetMeetingRoomRoom 该接口用于获取指定会议室的详细信息。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uEDOyUjLxgjM14SM4ITN
  async batchGetMeetingRoomRoom(
    request: MeetingRoom.BatchGetMeetingRoomRoomReq
  ): Promise<{
    data: MeetingRoom.BatchGetMeetingRoomRoomResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetMeetingRoomRoomReq> = {
      scope: 'MeetingRoom',
      api: 'BatchGetMeetingRoomRoom',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/room/batch_get',
      body: new BatchGetMeetingRoomRoomReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<BatchGetMeetingRoomRoomReq, MeetingRoom.BatchGetMeetingRoomRoomResp>(
      req
    )
  }
  // batchGetMeetingRoomFreebusy 该接口用于获取指定会议室的忙闲日程实例列表。非重复日程只有唯一实例；重复日程可能存在多个实例, 依据重复规则和时间范围扩展。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uIDOyUjLygjM14iM4ITN
  async batchGetMeetingRoomFreebusy(
    request: MeetingRoom.BatchGetMeetingRoomFreebusyReq
  ): Promise<{
    data: MeetingRoom.BatchGetMeetingRoomFreebusyResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetMeetingRoomFreebusyReq> = {
      scope: 'MeetingRoom',
      api: 'BatchGetMeetingRoomFreebusy',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/freebusy/batch_get',
      body: new BatchGetMeetingRoomFreebusyReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchGetMeetingRoomFreebusyReq,
      MeetingRoom.BatchGetMeetingRoomFreebusyResp
    >(req)
  }
  // replyMeetingRoomInstance 该接口用于回复会议室日程实例, 包括未签到释放和提前结束释放。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYzN4UjL2cDO14iN3gTN
  async replyMeetingRoomInstance(
    request: MeetingRoom.ReplyMeetingRoomInstanceReq
  ): Promise<{
    data: MeetingRoom.ReplyMeetingRoomInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<ReplyMeetingRoomInstanceReq> = {
      scope: 'MeetingRoom',
      api: 'ReplyMeetingRoomInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/instance/reply',
      body: new ReplyMeetingRoomInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      ReplyMeetingRoomInstanceReq,
      MeetingRoom.ReplyMeetingRoomInstanceResp
    >(req)
  }
  // createMeetingRoomBuilding 该接口对应管理后台的添加建筑, 添加楼层的功能, 可用于创建建筑物和建筑物的楼层信息。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATNwYjLwUDM24CM1AjN
  async createMeetingRoomBuilding(
    request: MeetingRoom.CreateMeetingRoomBuildingReq
  ): Promise<{
    data: MeetingRoom.CreateMeetingRoomBuildingResp
    response: Response
  }> {
    const req: RawRequestReq<CreateMeetingRoomBuildingReq> = {
      scope: 'MeetingRoom',
      api: 'CreateMeetingRoomBuilding',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/building/create',
      body: new CreateMeetingRoomBuildingReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CreateMeetingRoomBuildingReq,
      MeetingRoom.CreateMeetingRoomBuildingResp
    >(req)
  }
  // updateMeetingRoomBuilding 该接口用于编辑建筑信息, 添加楼层, 删除楼层, 编辑楼层信息。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uETNwYjLxUDM24SM1AjN
  async updateMeetingRoomBuilding(
    request: MeetingRoom.UpdateMeetingRoomBuildingReq
  ): Promise<{
    data: MeetingRoom.UpdateMeetingRoomBuildingResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateMeetingRoomBuildingReq> = {
      scope: 'MeetingRoom',
      api: 'UpdateMeetingRoomBuilding',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/building/update',
      body: new UpdateMeetingRoomBuildingReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateMeetingRoomBuildingReq,
      MeetingRoom.UpdateMeetingRoomBuildingResp
    >(req)
  }
  // deleteMeetingRoomBuilding 该接口用于删除建筑物（办公大楼）。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzMxYjLzMTM24yMzEjN
  async deleteMeetingRoomBuilding(
    request: MeetingRoom.DeleteMeetingRoomBuildingReq
  ): Promise<{
    data: MeetingRoom.DeleteMeetingRoomBuildingResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMeetingRoomBuildingReq> = {
      scope: 'MeetingRoom',
      api: 'DeleteMeetingRoomBuilding',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/building/delete',
      body: new DeleteMeetingRoomBuildingReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteMeetingRoomBuildingReq,
      MeetingRoom.DeleteMeetingRoomBuildingResp
    >(req)
  }
  // batchGetMeetingRoomBuildingID 该接口用于根据租户自定义建筑 ID 查询建筑 ID。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uQzMxYjL0MTM24CNzEjN
  async batchGetMeetingRoomBuildingID(
    request: MeetingRoom.BatchGetMeetingRoomBuildingIDReq
  ): Promise<{
    data: MeetingRoom.BatchGetMeetingRoomBuildingIDResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetMeetingRoomBuildingIDReq> = {
      scope: 'MeetingRoom',
      api: 'BatchGetMeetingRoomBuildingID',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/building/batch_get_id',
      body: new BatchGetMeetingRoomBuildingIDReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchGetMeetingRoomBuildingIDReq,
      MeetingRoom.BatchGetMeetingRoomBuildingIDResp
    >(req)
  }
  // createMeetingRoomRoom 该接口用于创建会议室。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uITNwYjLyUDM24iM1AjN
  async createMeetingRoomRoom(
    request: MeetingRoom.CreateMeetingRoomRoomReq
  ): Promise<{
    data: MeetingRoom.CreateMeetingRoomRoomResp
    response: Response
  }> {
    const req: RawRequestReq<CreateMeetingRoomRoomReq> = {
      scope: 'MeetingRoom',
      api: 'CreateMeetingRoomRoom',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/room/create',
      body: new CreateMeetingRoomRoomReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateMeetingRoomRoomReq, MeetingRoom.CreateMeetingRoomRoomResp>(req)
  }
  // updateMeetingRoomRoom 该接口用于更新会议室。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMTNwYjLzUDM24yM1AjN
  async updateMeetingRoomRoom(
    request: MeetingRoom.UpdateMeetingRoomRoomReq
  ): Promise<{
    data: MeetingRoom.UpdateMeetingRoomRoomResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateMeetingRoomRoomReq> = {
      scope: 'MeetingRoom',
      api: 'UpdateMeetingRoomRoom',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/room/update',
      body: new UpdateMeetingRoomRoomReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateMeetingRoomRoomReq, MeetingRoom.UpdateMeetingRoomRoomResp>(req)
  }
  // deleteMeetingRoomRoom 该接口用于删除会议室。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUzMxYjL1MTM24SNzEjN
  async deleteMeetingRoomRoom(
    request: MeetingRoom.DeleteMeetingRoomRoomReq
  ): Promise<{
    data: MeetingRoom.DeleteMeetingRoomRoomResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMeetingRoomRoomReq> = {
      scope: 'MeetingRoom',
      api: 'DeleteMeetingRoomRoom',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/room/delete',
      body: new DeleteMeetingRoomRoomReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteMeetingRoomRoomReq, MeetingRoom.DeleteMeetingRoomRoomResp>(req)
  }
  // batchGetMeetingRoomRoomID 该接口用于根据租户自定义会议室ID查询会议室ID。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYzMxYjL2MTM24iNzEjN
  async batchGetMeetingRoomRoomID(
    request: MeetingRoom.BatchGetMeetingRoomRoomIDReq
  ): Promise<{
    data: MeetingRoom.BatchGetMeetingRoomRoomIDResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetMeetingRoomRoomIDReq> = {
      scope: 'MeetingRoom',
      api: 'BatchGetMeetingRoomRoomID',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/room/batch_get_id',
      body: new BatchGetMeetingRoomRoomIDReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchGetMeetingRoomRoomIDReq,
      MeetingRoom.BatchGetMeetingRoomRoomIDResp
    >(req)
  }
  // getMeetingRoomCountryList 新建建筑时需要标明所处国家/地区, 该接口用于获得系统预先提供的可供选择的国家 /地区列表。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uQTNwYjL0UDM24CN1AjN
  async getMeetingRoomCountryList(
    request: MeetingRoom.GetMeetingRoomCountryListReq
  ): Promise<{
    data: MeetingRoom.GetMeetingRoomCountryListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMeetingRoomCountryListReq> = {
      scope: 'MeetingRoom',
      api: 'GetMeetingRoomCountryList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/country/list',
      body: new GetMeetingRoomCountryListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetMeetingRoomCountryListReq,
      MeetingRoom.GetMeetingRoomCountryListResp
    >(req)
  }
  // getMeetingRoomDistrictList 新建建筑时需要选择所处国家/地区, 该接口用于获得系统预先提供的可供选择的城市列表。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUTNwYjL1UDM24SN1AjN
  async getMeetingRoomDistrictList(
    request: MeetingRoom.GetMeetingRoomDistrictListReq
  ): Promise<{
    data: MeetingRoom.GetMeetingRoomDistrictListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMeetingRoomDistrictListReq> = {
      scope: 'MeetingRoom',
      api: 'GetMeetingRoomDistrictList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/meeting_room/district/list',
      body: new GetMeetingRoomDistrictListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetMeetingRoomDistrictListReq,
      MeetingRoom.GetMeetingRoomDistrictListResp
    >(req)
  }
}

export declare namespace MeetingRoom {
  export interface GetMeetingRoomCustomizationReq {
    room_ids?: string[] // 要获取的会议室ID列表
  }

  export interface GetMeetingRoomCustomizationResp {
    error_room_ids?: GetMeetingRoomCustomizationRespErrorRoomID[] // 返回错误的入参
    room_id_to_customization: GetMeetingRoomCustomizationRespRoomIDToCustomization // 会议室ID-个性化配置的映射
  }

  export interface GetMeetingRoomCustomizationRespErrorRoomID {
    building_id: string // 建筑id
    room_id: string // 会议室id
    error_msg: string // 错误信息
  }

  export interface GetMeetingRoomCustomizationRespRoomIDToCustomization {
    room_id: GetMeetingRoomCustomizationRespRoomIDToCustomizationRoomID // 会议室ID
  }

  export interface GetMeetingRoomCustomizationRespRoomIDToCustomizationRoomID {
    contact_ids?: number[] // 准备会议室个性化的相关配置的人员ID列表
    customization_data: GetMeetingRoomCustomizationRespRoomIDToCustomizationRoomIDCustomizationData // 个性化配置数据
    preparation_time: number // 准备时间
  }

  export interface GetMeetingRoomCustomizationRespRoomIDToCustomizationRoomIDCustomizationData {
    conditions: GetMeetingRoomCustomizationRespRoomIDToCustomizationRoomIDCustomizationDataConditions // 问卷的显示条件, 当条件满足时, 该问卷才会出现让用户进行选择
    customization_type: number // 问卷的类型, 1表示单选, 2表示多选, 3表示填空
    index_key: string // 每个问卷的独立id
    input_content: string // 当type类型为填空时, 该参数需要填入
    is_required: boolean // 当type类型为填空时, 该参数需要填入
    label: string // 每个问卷的问题
    options: GetMeetingRoomCustomizationRespRoomIDToCustomizationRoomIDCustomizationDataOptions // 每个问卷的选项
    place_holder: string // 填空题在未填写时的填充文案
  }

  export interface GetMeetingRoomCustomizationRespRoomIDToCustomizationRoomIDCustomizationDataConditions {
    custom_key: string // 该custom_key对应的index_key选中后, 问卷才会显示
    option_keys?: string[] // 所有的option都被选中后, 问卷才会显示
  }

  export interface GetMeetingRoomCustomizationRespRoomIDToCustomizationRoomIDCustomizationDataOptions {
    is_others: boolean // 是否是其他选项
    is_selected: boolean // 该选项是否勾选
    option_image_url: string // 选项的图片
    option_key: string // 每个选项的唯一id
    option_label: string // 每个问卷的选项
    others_content: string // 其他选项的输入内容
  }

  export interface getMeetingRoomCustomizationResp {
    code: number
    msg: string
    data: GetMeetingRoomCustomizationResp
  }

  export interface BatchGetMeetingRoomSummaryReq {
    EventUids?: BatchGetMeetingRoomSummaryReqEventUid[] // 需要查询的日程Uid和Original time
  }

  export interface BatchGetMeetingRoomSummaryReqEventUid {
    uid: string // 日程的唯一id
    original_time: number // 日程实例原始时间。非重复性日程和重复性日程, 此处传0；重复性日程的例外, 传对应的original_time
  }

  export interface BatchGetMeetingRoomSummaryResp {
    EventInfos?: BatchGetMeetingRoomSummaryRespEventInfo[] // 成功查询到的日程信息
    ErrorEventUids?: BatchGetMeetingRoomSummaryRespErrorEventUid[] // 没有查询到的日程
  }

  export interface BatchGetMeetingRoomSummaryRespErrorEventUid {
    uid: string // 日程的唯一id
    original_time: number // 日程实例原始时间。非重复性日程和重复性日程, 此处为0；重复性日程的例外, 为对应的original_time
    error_msg: string // 错误信息
  }

  export interface BatchGetMeetingRoomSummaryRespEventInfo {
    uid: string // 日程的唯一id
    original_time: number // 日程实例原始时间。非重复性日程和重复性日程, 此处为0；重复性日程的例外, 为对应的original_time
    summary: string // 日程主题
    vchat: BatchGetMeetingRoomSummaryRespEventInfoVchat // 视频会议信息
  }

  export interface BatchGetMeetingRoomSummaryRespEventInfoVchat {
    vc_type: string // 视屏会议类型   可选值有: - `vc`: 飞书视频会议, 取该类型时, 其他字段无效。  - `third_party`: 第三方链接视频会议, 取该类型时, icon_type、description、meeting_url字段生效。  - `no_meeting`: 无视频会议, 取该类型时, 其他字段无效。 - `lark_live`: 飞书直播, 内部类型, 飞书客户端使用, API不支持创建, 只读。 - `unknown`: 未知类型, 做兼容使用, 飞书客户端使用, API不支持创建, 只读。
    icon_type: string // 第三方视频会议icon类型；可以为空, 为空展示默认icon。  可选值有: - `vc`: 飞书视频会议icon - `live`: 直播视频会议icon  -  `default`: 默认icon
    description: string // 第三方视频会议文案, 可以为空, 为空展示默认文案
    meeting_url: string // 视频会议URL
  }

  export interface batchGetMeetingRoomSummaryResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: BatchGetMeetingRoomSummaryResp // 返回业务信息
  }

  export interface GetMeetingRoomBuildingListReq {
    page_size?: number // 请求期望返回的建筑物数量, 不足则返回全部, 该值默认为 10, 最大为 100
    page_token?: string // 用于标记当前请求的分页标记, 将返回以当前分页标记开始, 往后 page_size 个元素
    order_by?: string // 提供用于对名称进行升序/降序排序的方式查询, 可选项有: "name-asc, name-desc", 传入其他字符串不做处理, 默认无序
    fields?: string // 用于指定返回的字段名, 每个字段名之间用逗号 ", " 分隔, 如: “id, name”, "*" 表示返回全部字段, 可选字段有: "id, name, description, floors", 默认返回所有字段
  }

  export interface GetMeetingRoomBuildingListResp {
    page_token: string // 分页标记, 存在下一页时返回
    has_more: boolean // 存在下一页时, 该值为 true, 否则为 false
    buildings?: GetMeetingRoomBuildingListRespBuilding[] // 建筑列表
  }

  export interface GetMeetingRoomBuildingListRespBuilding {
    building_id: string // 建筑物 ID
    description: string // 建筑物的相关描述
    floors?: string[] // 属于当前建筑物的所有楼层列表
    name: string // 建筑物名称
    country_id: string // 所属国家 ID
    district_id: string // 所属城市 ID
  }

  export interface getMeetingRoomBuildingListResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: GetMeetingRoomBuildingListResp // 返回业务信息
  }

  export interface BatchGetMeetingRoomBuildingReq {
    building_ids?: string[] // 用于查询指定建筑物的 ID
    fields?: string // 用于指定返回的字段名, 每个字段名之间用逗号 ", " 分隔, 如: “id, name”, "*" 表示返回全部字段, 可选字段有: "id, name, description, floors", 默认返回所有字段
  }

  export interface BatchGetMeetingRoomBuildingResp {
    buildings?: BatchGetMeetingRoomBuildingRespBuilding[] // 建筑列表
  }

  export interface BatchGetMeetingRoomBuildingRespBuilding {
    building_id: string // 建筑物 ID
    description: string // 建筑物的相关描述
    floors?: string[] // 属于当前建筑物的所有楼层列表
    name: string // 建筑物名称
    country_id: string // 所属国家 ID
    district_id: string // 所属城市 ID
  }

  export interface batchGetMeetingRoomBuildingResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: BatchGetMeetingRoomBuildingResp // 返回业务信息
  }

  export interface GetMeetingRoomRoomListReq {
    building_id: string // 被查询的建筑物 ID
    page_size?: number // 请求期望返回的会议室数量, 不足则返回全部, 该值默认为 100, 最大为 1000
    page_token?: string // 用于标记当前请求的分页标记, 将返回以当前分页标记开始, 往后 page_size 个元素
    order_by?: string // 提供用于对名称/楼层进行升序/降序排序的方式查询, 可选项有: "name-asc, name-desc, floor_name-asc, floor_name-desc", 传入其他字符串不做处理, 默认无序
    fields?: string // 用于指定返回的字段名, 每个字段名之间用逗号 ", " 分隔, 如: “id, name”, "*" 表示返回全部字段, 可选字段有: "id, name, description, capacity, building_id, building_name, floor_name, is_disabled, display_id", 默认返回所有字段
  }

  export interface GetMeetingRoomRoomListResp {
    page_token: string // 分页标记, 存在下一页时返回
    has_more: boolean // 存在下一页时, 该值为 true, 否则为 false
    rooms?: GetMeetingRoomRoomListRespRoom[] // 会议室列表
  }

  export interface GetMeetingRoomRoomListRespRoom {
    room_id: string // 会议室 ID
    building_id: string // 会议室所属建筑物 ID
    building_name: string // 会议室所属建筑物名称
    capacity: number // 会议室能容纳的人数
    description: string // 会议室的相关描述
    display_id: string // 会议室的展示 ID
    floor_name: string // 会议室所在楼层名称
    is_disabled: boolean // 会议室是否不可用, 若会议室不可用, 则该值为 true, 否则为 false
    name: string // 会议室名称
  }

  export interface getMeetingRoomRoomListResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: GetMeetingRoomRoomListResp // 返回业务信息
  }

  export interface BatchGetMeetingRoomRoomReq {
    room_ids?: string[] // 用于查询指定会议室的 ID
    fields?: string // 用于指定返回的字段名, 每个字段名之间用逗号 ", " 分隔, 如: “id, name”, "*" 表示返回全部字段, 可选字段有: "id, name, description, capacity, building_id, building_name, floor_name, is_disabled, display_id", 默认返回所有字段
  }

  export interface BatchGetMeetingRoomRoomResp {
    rooms?: BatchGetMeetingRoomRoomRespRoom[] // 会议室列表
  }

  export interface BatchGetMeetingRoomRoomRespRoom {
    room_id: string // 会议室 ID
    building_id: string // 会议室所属建筑物 ID
    building_name: string // 会议室所属建筑物名称
    capacity: number // 会议室能容纳的人数
    description: string // 会议室的相关描述
    display_id: string // 会议室的展示 ID
    floor_name: string // 会议室所在楼层名称
    is_disabled: boolean // 会议室是否不可用, 若会议室不可用, 则该值为 true, 否则为 false
    name: string // 会议室名称
  }

  export interface batchGetMeetingRoomRoomResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: BatchGetMeetingRoomRoomResp // 返回业务信息
  }

  export interface BatchGetMeetingRoomFreebusyReq {
    room_ids?: string[] // 用于查询指定会议室的 ID
    time_min: string // 查询会议室忙闲的起始时间, 需要遵循格式 [RFC3339](https://tools.ietf.org/html/rfc3339), 需要进行URL Encode
    time_max: string // 查询会议室忙闲的结束时间, 需要遵循格式 [RFC3339](https://tools.ietf.org/html/rfc3339), 需要进行URL Encode
  }

  export interface BatchGetMeetingRoomFreebusyResp {
    time_min: string // 查询会议室忙闲的起始时间, 与请求参数完全相同
    time_max: string // 查询会议室忙闲的结束时间, 与请求参数完全相同
    free_busy?: { [key: string]: BatchGetMeetingRoomFreebusyRespFreeBusy } // 会议室忙闲列表
  }

  export interface BatchGetMeetingRoomFreebusyRespFreeBusy {
    start_time: string // 忙碌起始时间
    end_time: string // 忙碌结束时间
    uid: string // 日程 ID
    original_time: number // 日程实例的原始时间, 非重复日程以及重复性日程的原日程为0, 重复性日程的例外日程为非0
    organizer_info: BatchGetMeetingRoomFreebusyRespFreeBusyOrganizerInfo // 组织者信息, 私密日程不返回该信息
  }

  export interface BatchGetMeetingRoomFreebusyRespFreeBusyOrganizerInfo {
    name: string // 组织者姓名
    open_id: string // 组织者 open_id
  }

  export interface batchGetMeetingRoomFreebusyResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: BatchGetMeetingRoomFreebusyResp // 返回业务信息
  }

  export interface ReplyMeetingRoomInstanceReq {
    room_id: string // 会议室的 ID
    uid: string // 会议室的日程 ID
    original_time: number // 日程实例原始时间, 非重复日程必为0。重复日程若为0则表示回复其所有实例, 否则表示回复单个实例。
    status: string // 回复状态, NOT_CHECK_IN 表示未签到, ENDED_BEFORE_DUE 表示提前结束, ACCEPTED_BY_ADMIN 表示被管理员置为接受, DECLINED_BY_ADMIN 表示被管理员置为拒绝
  }

  export interface ReplyMeetingRoomInstanceResp {}

  export interface replyMeetingRoomInstanceResp {
    code: number // 返回码, 非 0 表示失败。105003表示 original_time 非法, 此时可能是重复日程的整个开始时间被修改, 建议应用重新查询会议室日程实例列表, 获取最新的 original_time。
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: ReplyMeetingRoomInstanceResp
  }

  export interface CreateMeetingRoomBuildingReq {
    name: string // 建筑名称
    floors?: string[] // 楼层列表
    country_id: string // 国家/地区ID
    district_id: string // 城市ID
    custom_building_id?: string // 租户自定义建筑ID
  }

  export interface CreateMeetingRoomBuildingResp {
    building_id: string // 成功创建的建筑ID
  }

  export interface createMeetingRoomBuildingResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: CreateMeetingRoomBuildingResp // 返回业务信息
  }

  export interface UpdateMeetingRoomBuildingReq {
    building_id: string // 要更新的建筑ID
    name?: string // 建筑名称
    floors?: string[] // 楼层列表
    country_id?: string // 国家/地区ID
    district_id?: string // 城市ID
    custom_building_id?: string // 租户自定义建筑ID
  }

  export interface UpdateMeetingRoomBuildingResp {}

  export interface updateMeetingRoomBuildingResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: UpdateMeetingRoomBuildingResp
  }

  export interface DeleteMeetingRoomBuildingReq {
    building_id: string // 要删除的建筑ID
  }

  export interface DeleteMeetingRoomBuildingResp {}

  export interface deleteMeetingRoomBuildingResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: DeleteMeetingRoomBuildingResp
  }

  export interface BatchGetMeetingRoomBuildingIDReq {
    custom_building_ids?: string[] // 用于查询指定建筑物的租户自定义建筑ID
  }

  export interface BatchGetMeetingRoomBuildingIDResp {
    buildings?: BatchGetMeetingRoomBuildingIDRespBuilding[] // 建筑列表
  }

  export interface BatchGetMeetingRoomBuildingIDRespBuilding {
    building_id: string // 建筑物ID
    custom_building_id: string // 租户自定义建筑物ID
  }

  export interface batchGetMeetingRoomBuildingIDResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: BatchGetMeetingRoomBuildingIDResp // 返回业务信息
  }

  export interface CreateMeetingRoomRoomReq {
    building_id: string // 会议室所在的建筑ID
    floor: string // 会议室所在的建筑楼层
    name: string // 会议室名称
    capacity: number // 容量
    is_disabled: boolean // 是否禁用
    custom_room_id?: string // 租户自定义会议室ID
  }

  export interface CreateMeetingRoomRoomResp {
    room_id: string // 成功创建的会议室ID
  }

  export interface createMeetingRoomRoomResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: CreateMeetingRoomRoomResp // 返回业务信息
  }

  export interface UpdateMeetingRoomRoomReq {
    room_id: string // 要更新的会议室ID
    name?: string // 会议室名称
    capacity?: number // 容量
    custom_room_id?: string // 租户自定义会议室ID
  }

  export interface UpdateMeetingRoomRoomResp {}

  export interface updateMeetingRoomRoomResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: UpdateMeetingRoomRoomResp
  }

  export interface DeleteMeetingRoomRoomReq {
    room_id: string // 要删除的会议室ID
  }

  export interface DeleteMeetingRoomRoomResp {}

  export interface deleteMeetingRoomRoomResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: DeleteMeetingRoomRoomResp
  }

  export interface BatchGetMeetingRoomRoomIDReq {
    custom_room_ids?: string[] // 用于查询指定会议室的租户自定义会议室ID
  }

  export interface BatchGetMeetingRoomRoomIDResp {
    rooms?: BatchGetMeetingRoomRoomIDRespRoom[] // 会议室列表
  }

  export interface BatchGetMeetingRoomRoomIDRespRoom {
    room_id: string // 会议室 ID
    custom_room_id: string // 租户自定义会议室 ID
  }

  export interface batchGetMeetingRoomRoomIDResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: BatchGetMeetingRoomRoomIDResp // 返回业务信息
  }

  export interface GetMeetingRoomCountryListReq {}

  export interface GetMeetingRoomCountryListResp {
    countries?: GetMeetingRoomCountryListRespCountry[] // 国家地区列表
  }

  export interface GetMeetingRoomCountryListRespCountry {
    country_id: string // 国家地区ID
    name: string // 国家地区名称
  }

  export interface getMeetingRoomCountryListResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: GetMeetingRoomCountryListResp // 返回业务信息
  }

  export interface GetMeetingRoomDistrictListReq {
    country_id: number // 国家地区ID
  }

  export interface GetMeetingRoomDistrictListResp {
    districts?: GetMeetingRoomDistrictListRespDistrict[] // 城市列表
  }

  export interface GetMeetingRoomDistrictListRespDistrict {
    district_id: string // 城市ID
    name: string // 城市名称
  }

  export interface getMeetingRoomDistrictListResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述, "success" 表示成功, 其他为错误提示信息
    data: GetMeetingRoomDistrictListResp // 返回业务信息
  }
}

class GetMeetingRoomCustomizationReq {
  room_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      room_ids: this.room_ids
    }
  }

  getPath(path: string) {
    return path
  }
}

class BatchGetMeetingRoomSummaryReq {
  EventUids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      EventUids: this.EventUids
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetMeetingRoomBuildingListReq {
  page_size?: any
  page_token?: any
  order_by?: any
  fields?: any

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
    if (this.order_by !== undefined) {
      q['order_by'] = this.order_by
    }
    if (this.fields !== undefined) {
      q['fields'] = this.fields
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchGetMeetingRoomBuildingReq {
  building_ids?: any
  fields?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.building_ids !== undefined) {
      q['building_ids'] = this.building_ids
    }
    if (this.fields !== undefined) {
      q['fields'] = this.fields
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetMeetingRoomRoomListReq {
  building_id?: any
  page_size?: any
  page_token?: any
  order_by?: any
  fields?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.building_id !== undefined) {
      q['building_id'] = this.building_id
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.order_by !== undefined) {
      q['order_by'] = this.order_by
    }
    if (this.fields !== undefined) {
      q['fields'] = this.fields
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchGetMeetingRoomRoomReq {
  room_ids?: any
  fields?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.room_ids !== undefined) {
      q['room_ids'] = this.room_ids
    }
    if (this.fields !== undefined) {
      q['fields'] = this.fields
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchGetMeetingRoomFreebusyReq {
  room_ids?: any
  time_min?: any
  time_max?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.room_ids !== undefined) {
      q['room_ids'] = this.room_ids
    }
    if (this.time_min !== undefined) {
      q['time_min'] = this.time_min
    }
    if (this.time_max !== undefined) {
      q['time_max'] = this.time_max
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class ReplyMeetingRoomInstanceReq {
  room_id?: any
  uid?: any
  original_time?: any
  status?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      room_id: this.room_id,
      uid: this.uid,
      original_time: this.original_time,
      status: this.status
    }
  }

  getPath(path: string) {
    return path
  }
}

class CreateMeetingRoomBuildingReq {
  name?: any
  floors?: any
  country_id?: any
  district_id?: any
  custom_building_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      floors: this.floors,
      country_id: this.country_id,
      district_id: this.district_id,
      custom_building_id: this.custom_building_id
    }
  }

  getPath(path: string) {
    return path
  }
}

class UpdateMeetingRoomBuildingReq {
  building_id?: any
  name?: any
  floors?: any
  country_id?: any
  district_id?: any
  custom_building_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      building_id: this.building_id,
      name: this.name,
      floors: this.floors,
      country_id: this.country_id,
      district_id: this.district_id,
      custom_building_id: this.custom_building_id
    }
  }

  getPath(path: string) {
    return path
  }
}

class DeleteMeetingRoomBuildingReq {
  building_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      building_id: this.building_id
    }
  }

  getPath(path: string) {
    return path
  }
}

class BatchGetMeetingRoomBuildingIDReq {
  custom_building_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.custom_building_ids !== undefined) {
      q['custom_building_ids'] = this.custom_building_ids
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateMeetingRoomRoomReq {
  building_id?: any
  floor?: any
  name?: any
  capacity?: any
  is_disabled?: any
  custom_room_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      building_id: this.building_id,
      floor: this.floor,
      name: this.name,
      capacity: this.capacity,
      is_disabled: this.is_disabled,
      custom_room_id: this.custom_room_id
    }
  }

  getPath(path: string) {
    return path
  }
}

class UpdateMeetingRoomRoomReq {
  room_id?: any
  name?: any
  capacity?: any
  custom_room_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      room_id: this.room_id,
      name: this.name,
      capacity: this.capacity,
      custom_room_id: this.custom_room_id
    }
  }

  getPath(path: string) {
    return path
  }
}

class DeleteMeetingRoomRoomReq {
  room_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      room_id: this.room_id
    }
  }

  getPath(path: string) {
    return path
  }
}

class BatchGetMeetingRoomRoomIDReq {
  custom_room_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.custom_room_ids !== undefined) {
      q['custom_room_ids'] = this.custom_room_ids
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetMeetingRoomCountryListReq {
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

class GetMeetingRoomDistrictListReq {
  country_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.country_id !== undefined) {
      q['country_id'] = this.country_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}
