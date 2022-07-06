import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class HumanAuthService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getFaceVerifyAuthResult ::: note
  //
  // 无源人脸比对接入需申请白名单, 接入前请联系飞书开放平台工作人员, 邮箱: openplatform@bytedance.com。
  // 无源人脸比对流程, 开发者后台通过调用此接口请求飞书后台, 对本次活体比对结果做校验。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/human_authentication-v1/face/query-recognition-result
  async getFaceVerifyAuthResult(
    request: HumanAuth.GetFaceVerifyAuthResultReq
  ): Promise<{
    data: HumanAuth.GetFaceVerifyAuthResultResp
    response: Response
  }> {
    const req: RawRequestReq<GetFaceVerifyAuthResultReq> = {
      scope: 'HumanAuth',
      api: 'GetFaceVerifyAuthResult',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/face_verify/v1/query_auth_result',
      body: new GetFaceVerifyAuthResultReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetFaceVerifyAuthResultReq, HumanAuth.GetFaceVerifyAuthResultResp>(
      req
    )
  }
  // uploadFaceVerifyImage ::: note
  //
  // 无源人脸比对接入需申请白名单, 接入前请联系飞书开放平台工作人员, 邮箱: openplatform@bytedance.com。
  // 无源人脸比对流程, 开发者后台通过调用此接口将基准图片上传到飞书后台, 做检测时的对比使用。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/human_authentication-v1/face/upload-facial-reference-image
  async uploadFaceVerifyImage(
    request: HumanAuth.UploadFaceVerifyImageReq
  ): Promise<{
    data: HumanAuth.UploadFaceVerifyImageResp
    response: Response
  }> {
    const req: RawRequestReq<UploadFaceVerifyImageReq> = {
      scope: 'HumanAuth',
      api: 'UploadFaceVerifyImage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/face_verify/v1/upload_face_image',
      body: new UploadFaceVerifyImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<UploadFaceVerifyImageReq, HumanAuth.UploadFaceVerifyImageResp>(req)
  }
  // cropFaceVerifyImage ::: note
  //
  // 无源人脸比对接入需申请白名单, 接入前请联系飞书开放平台工作人员, 邮箱: openplatform@bytedance.com。
  // 无源人脸比对流程, 开发者后台通过调用此接口对基准图片做规范校验及处理。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/human_authentication-v1/face/facial-image-cropping
  async cropFaceVerifyImage(
    request: HumanAuth.CropFaceVerifyImageReq
  ): Promise<{
    data: HumanAuth.CropFaceVerifyImageResp
    response: Response
  }> {
    const req: RawRequestReq<CropFaceVerifyImageReq> = {
      scope: 'HumanAuth',
      api: 'CropFaceVerifyImage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/face_verify/v1/crop_face_image',
      body: new CropFaceVerifyImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<CropFaceVerifyImageReq, HumanAuth.CropFaceVerifyImageResp>(req)
  }
  // createIdentity 该接口用于录入实名认证的身份信息, 在唤起有源活体认证前, 需要使用该接口进行实名认证。
  //
  // 实名认证接口会有计费管理, 接入前请联系飞书开放平台工作人员, 邮箱: openplatform@bytedance.com。
  // 仅通过计费申请的应用, 才能在[开发者后台](https://open.feishu.cn/app)查找并申请该接口的权限。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/human_authentication-v1/identity/create
  async createIdentity(
    request: HumanAuth.CreateIdentityReq
  ): Promise<{
    data: HumanAuth.CreateIdentityResp
    response: Response
  }> {
    const req: RawRequestReq<CreateIdentityReq> = {
      scope: 'HumanAuth',
      api: 'CreateIdentity',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/human_authentication/v1/identities',
      body: new CreateIdentityReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateIdentityReq, HumanAuth.CreateIdentityResp>(req)
  }
}

export declare namespace HumanAuth {
  export interface GetFaceVerifyAuthResultReq {
    req_order_no: string // 人脸识别单次唯一标识, 由`tt.startFaceVerify`接口返回
    open_id?: string // 用户应用标识, 与employee_id二选其一
    employee_id?: string // 用户租户标识, 与open_id二选其一
  }

  export interface GetFaceVerifyAuthResultResp {
    auth_state: number // 认证结果, 0: 认证中, 1: 认证成功, 1: 认证失败
    auth_timpstamp: number // 认证时间, unix 时间戳
  }

  export interface getFaceVerifyAuthResultResp {
    code: number // 返回码, 非0为失败
    msg: string // 返回信息, 返回码的描述
    data: GetFaceVerifyAuthResultResp // 业务数据
  }

  export interface UploadFaceVerifyImageReq {
    open_id?: string // 用户应用标识, 与employee_id二选其一
    employee_id?: string // 用户租户标识, 与open_id二选其一
    image: Buffer // 带有头像的人脸照片
  }

  export interface UploadFaceVerifyImageResp {
    face_uid: string // 人脸图片用户Uid, 需返回给应用小程序, 作为小程序调起人脸识别接口的uid参数
  }

  export interface uploadFaceVerifyImageResp {
    code: number // 返回码, 非0为失败
    msg: string // 返回信息, 返回码的描述
    data: UploadFaceVerifyImageResp // 业务数据
  }

  export interface CropFaceVerifyImageReq {
    raw_image: Buffer // 带有头像的人脸照片文件名称
  }

  export interface CropFaceVerifyImageResp {
    face_image: string // BASE64(裁剪后的人脸基准图片), code为0时返回
  }

  export interface cropFaceVerifyImageResp {
    code: number // 返回码, 非0为失败
    msg: string // 返回信息, 返回码的描述
    data: CropFaceVerifyImageResp // 业务数据
  }

  export interface CreateIdentityReq {
    user_id: string // 用户的唯一标识（使用的ID类型见下一参数描述, 不同ID类型的区别和获取, 参考文档: [如何获得 User ID、Open ID 和 Union ID？](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get)）, 示例值: "ou_2eb5483cb377daa5054bc6f86e2089a5"
    user_id_type?: string // 用户ID类型, 示例值: "open_id", 可选值有: `open_id`: 用户的open id, `union_id`: 用户的union id, `user_id`: 用户的user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    identity_name: string // 姓名, 示例值: "张三"
    identity_code: string // 身份证号, 示例值: "4xxxxxxxx"
    mobile?: string // 手机号, 示例值: "13xxxxxxx"
  }

  export interface CreateIdentityResp {
    verify_uid: string // 用户绑定实名身份的uid
  }

  export interface createIdentityResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateIdentityResp
  }
}

class GetFaceVerifyAuthResultReq {
  req_order_no?: any
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
    if (this.req_order_no !== undefined) {
      q['req_order_no'] = this.req_order_no
    }
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

class UploadFaceVerifyImageReq {
  open_id?: any
  employee_id?: any
  image?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      image: this.image
    }
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

class CropFaceVerifyImageReq {
  raw_image?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      raw_image: this.raw_image
    }
  }

  getPath(path: string) {
    return path
  }
}

class CreateIdentityReq {
  user_id?: any
  user_id_type?: any
  identity_name?: any
  identity_code?: any
  mobile?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      identity_name: this.identity_name,
      identity_code: this.identity_code,
      mobile: this.mobile
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.user_id !== undefined) {
      q['user_id'] = this.user_id
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}
