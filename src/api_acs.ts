import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class ACSService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getACSAccessRecordPhoto 用户在门禁考勤机上成功开门或打卡后, 智能门禁应用都会生成一条门禁记录, 对于使用人脸识别方式进行开门的识别记录, 还会有抓拍图。
  //
  // 可以用该接口下载开门时的人脸识别照片
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record-access_photo/get
  async getACSAccessRecordPhoto(
    request: ACS.GetACSAccessRecordPhotoReq
  ): Promise<{
    data: ACS.GetACSAccessRecordPhotoResp
    response: Response
  }> {
    const req: RawRequestReq<GetACSAccessRecordPhotoReq> = {
      scope: 'ACS',
      api: 'GetACSAccessRecordPhoto',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/acs/v1/access_records/:access_record_id/access_photo',
      body: new GetACSAccessRecordPhotoReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file_download: true
    }
    return this.cli.RawRequest<GetACSAccessRecordPhotoReq, ACS.GetACSAccessRecordPhotoResp>(req)
  }
  // getACSAccessRecordList 用户在门禁考勤机上成功开门或打卡后, 智能门禁应用都会生成一条门禁记录。
  //
  // 该接口返回满足查询参数的识别记录
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record/list
  async getACSAccessRecordList(
    request: ACS.GetACSAccessRecordListReq
  ): Promise<{
    data: ACS.GetACSAccessRecordListResp
    response: Response
  }> {
    const req: RawRequestReq<GetACSAccessRecordListReq> = {
      scope: 'ACS',
      api: 'GetACSAccessRecordList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/acs/v1/access_records',
      body: new GetACSAccessRecordListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetACSAccessRecordListReq, ACS.GetACSAccessRecordListResp>(req)
  }
  // getACSDeviceList 使用该接口获取租户内所有设备
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/device/list
  async getACSDeviceList(
    request: ACS.GetACSDeviceListReq
  ): Promise<{
    data: ACS.GetACSDeviceListResp
    response: Response
  }> {
    const req: RawRequestReq<GetACSDeviceListReq> = {
      scope: 'ACS',
      api: 'GetACSDeviceList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/acs/v1/devices',
      body: new GetACSDeviceListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetACSDeviceListReq, ACS.GetACSDeviceListResp>(req)
  }
  // getACSUserFace 对于已经录入人脸图片的用户, 可以使用该接口下载用户人脸图片
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user-face/get
  async getACSUserFace(
    request: ACS.GetACSUserFaceReq
  ): Promise<{
    data: ACS.GetACSUserFaceResp
    response: Response
  }> {
    const req: RawRequestReq<GetACSUserFaceReq> = {
      scope: 'ACS',
      api: 'GetACSUserFace',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/acs/v1/users/:user_id/face',
      body: new GetACSUserFaceReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file_download: true
    }
    return this.cli.RawRequest<GetACSUserFaceReq, ACS.GetACSUserFaceResp>(req)
  }
  // updateACSUserFace 用户需要录入人脸图片才可以使用门禁考勤机。使用该 API 上传门禁用户的人脸图片。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user-face/update
  async updateACSUserFace(
    request: ACS.UpdateACSUserFaceReq
  ): Promise<{
    data: ACS.UpdateACSUserFaceResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateACSUserFaceReq> = {
      scope: 'ACS',
      api: 'UpdateACSUserFace',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/acs/v1/users/:user_id/face',
      body: new UpdateACSUserFaceReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<UpdateACSUserFaceReq, ACS.UpdateACSUserFaceResp>(req)
  }
  // getACSUser 该接口用于获取智能门禁中单个用户的信息。
  //
  // 只能获取已加入智能门禁权限组的用户
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/get
  async getACSUser(
    request: ACS.GetACSUserReq
  ): Promise<{
    data: ACS.GetACSUserResp
    response: Response
  }> {
    const req: RawRequestReq<GetACSUserReq> = {
      scope: 'ACS',
      api: 'GetACSUser',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/acs/v1/users/:user_id',
      body: new GetACSUserReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetACSUserReq, ACS.GetACSUserResp>(req)
  }
  // updateACSUser 飞书智能门禁在人脸识别成功后会有韦根信号输出, 输出用户的卡号。
  //
  // 对于使用韦根协议的门禁系统, 企业可使用该接口录入用户卡号。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/patch
  async updateACSUser(
    request: ACS.UpdateACSUserReq
  ): Promise<{
    data: ACS.UpdateACSUserResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateACSUserReq> = {
      scope: 'ACS',
      api: 'UpdateACSUser',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/acs/v1/users/:user_id',
      body: new UpdateACSUserReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateACSUserReq, ACS.UpdateACSUserResp>(req)
  }
  // getACSUserList 使用该接口获取智能门禁中所有用户信息
  //
  // 只能获取已加入智能门禁权限组的用户
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/list
  async getACSUserList(
    request: ACS.GetACSUserListReq
  ): Promise<{
    data: ACS.GetACSUserListResp
    response: Response
  }> {
    const req: RawRequestReq<GetACSUserListReq> = {
      scope: 'ACS',
      api: 'GetACSUserList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/acs/v1/users',
      body: new GetACSUserListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetACSUserListReq, ACS.GetACSUserListResp>(req)
  }
}

export declare namespace ACS {
  export interface GetACSAccessRecordPhotoReq {
    access_record_id: string // 门禁访问记录 ID, 示例值: "6939433228970082591"
  }

  export interface GetACSAccessRecordPhotoResp {
    file: Buffer
  }

  export interface getACSAccessRecordPhotoResp {
    code: number
    msg: string
    data: GetACSAccessRecordPhotoResp
  }

  export interface GetACSAccessRecordListReq {
    page_size?: number // 分页大小, 示例值: 100, 最大值: `500`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/dk53s4Ebp882DYfFaPFbz00L4CMZJrqGdzNyc8BcZtDbwVUvRmQTvyMYicnGWrde9X56TgdBuS+JKiSIkdexPw="
    from: number // 记录开始时间, 单位秒, 示例值: 1624520521
    to: number // 记录结束时间, 单位秒, 时间跨度不能超过30天, 示例值: 1624520521
    device_id?: string // 门禁设备 ID, 示例值: "7091146989218002577"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetACSAccessRecordListResp {
    items?: GetACSAccessRecordListRespItem[]
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetACSAccessRecordListRespItem {
    access_record_id: string // 门禁记录 ID
    user_id: string // 门禁记录所属用户 ID
    device_id: string // 门禁设备 ID
    is_clock_in: boolean // 是否是打卡
    access_time: string // 访问时间, 单位秒
    access_type: string // 识别方式, 可选值有: `FA`: 人脸识别方式
    access_data: string // 识别相关数据, 根据 access_type 不同, 取值不同
    is_door_open: boolean // 是否开门
  }

  export interface getACSAccessRecordListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetACSAccessRecordListResp
  }

  export interface GetACSDeviceListReq {}

  export interface GetACSDeviceListResp {
    items?: GetACSDeviceListRespItem[]
  }

  export interface GetACSDeviceListRespItem {
    device_id: string // 门禁设备 ID
    device_name: string // 设备名称
    device_sn: string // 设备 SN 码
  }

  export interface getACSDeviceListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetACSDeviceListResp
  }

  export interface GetACSUserFaceReq {
    user_id: string // 用户 ID, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    is_cropped?: boolean // 裁剪图, 示例值: true
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetACSUserFaceResp {
    file: Buffer
  }

  export interface getACSUserFaceResp {
    code: number
    msg: string
    data: GetACSUserFaceResp
  }

  export interface UpdateACSUserFaceReq {
    user_id: string // 用户 ID, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    files: Buffer // 人脸图片内容, 示例值: jpg图片
    file_type: string // 文件类型, 可选的类型有jpg, png, 示例值: "jpg"
    file_name: string // 带后缀的文件名, 示例值: "efeqz12f.jpg"
  }

  export interface UpdateACSUserFaceResp {}

  export interface updateACSUserFaceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateACSUserFaceResp
  }

  export interface GetACSUserReq {
    user_id: string // 用户 ID, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetACSUserResp {
    user: GetACSUserRespUser // 门禁用户信息
  }

  export interface GetACSUserRespUser {
    feature: GetACSUserRespUserFeature // 用户特征
    user_id: string // 用户 ID
  }

  export interface GetACSUserRespUserFeature {
    card: number // 卡号
    face_uploaded: boolean // 是否已上传人脸图片
  }

  export interface getACSUserResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetACSUserResp
  }

  export interface UpdateACSUserReq {
    user_id: string // 用户 ID, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    feature?: UpdateACSUserReqFeature // 用户特征
  }

  export interface UpdateACSUserReqFeature {
    card?: number // 卡号, 示例值: 123456
  }

  export interface UpdateACSUserResp {}

  export interface updateACSUserResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateACSUserResp
  }

  export interface GetACSUserListReq {
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "10"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetACSUserListResp {
    items?: GetACSUserListRespItem[]
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetACSUserListRespItem {
    feature: GetACSUserListRespItemFeature // 用户特征
    user_id: string // 用户 ID
  }

  export interface GetACSUserListRespItemFeature {
    card: number // 卡号
    face_uploaded: boolean // 是否已上传人脸图片
  }

  export interface getACSUserListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetACSUserListResp
  }
}

class GetACSAccessRecordPhotoReq {
  access_record_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':access_record_id', this.access_record_id)

    return path
  }
}

class GetACSAccessRecordListReq {
  page_size?: any
  page_token?: any
  from?: any
  to?: any
  device_id?: any
  user_id_type?: any

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
    if (this.from !== undefined) {
      q['from'] = this.from
    }
    if (this.to !== undefined) {
      q['to'] = this.to
    }
    if (this.device_id !== undefined) {
      q['device_id'] = this.device_id
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetACSDeviceListReq {
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

class GetACSUserFaceReq {
  user_id?: any
  is_cropped?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':user_id', this.user_id)

    const q = {} as { [key: string]: any }
    if (this.is_cropped !== undefined) {
      q['is_cropped'] = this.is_cropped
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateACSUserFaceReq {
  user_id?: any
  user_id_type?: any
  files?: any
  file_type?: any
  file_name?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      files: this.files,
      file_type: this.file_type,
      file_name: this.file_name
    }
  }

  getPath(path: string) {
    path = path.replace(':user_id', this.user_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetACSUserReq {
  user_id?: any
  user_id_type?: any

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
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateACSUserReq {
  user_id?: any
  user_id_type?: any
  feature?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      feature: this.feature
    }
  }

  getPath(path: string) {
    path = path.replace(':user_id', this.user_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetACSUserListReq {
  page_size?: any
  page_token?: any
  user_id_type?: any

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
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}
