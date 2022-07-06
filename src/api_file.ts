import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class FileService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // uploadImage 上传图片接口, 可以上传 JPEG、PNG、WEBP、GIF、TIFF、BMP、ICO格式图片
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 上传的图片大小不能超过10MB
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create
  async uploadImage(
    request: File.UploadImageReq
  ): Promise<{
    data: File.UploadImageResp
    response: Response
  }> {
    const req: RawRequestReq<UploadImageReq> = {
      scope: 'File',
      api: 'UploadImage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/images',
      body: new UploadImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<UploadImageReq, File.UploadImageResp>(req)
  }
  // downloadImage 下载图片资源, 只能下载应用自己上传且图片类型为message的图片
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 只能下载机器人自己上传且图片类型为message的图片, avatar类型暂不支持下载；
  // - 下载用户发送的资源, 请使用[获取消息中的资源文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get)接口
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/get
  async downloadImage(
    request: File.DownloadImageReq
  ): Promise<{
    data: File.DownloadImageResp
    response: Response
  }> {
    const req: RawRequestReq<DownloadImageReq> = {
      scope: 'File',
      api: 'DownloadImage',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/images/:image_key',
      body: new DownloadImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file_download: true
    }
    return this.cli.RawRequest<DownloadImageReq, File.DownloadImageResp>(req)
  }
  // uploadFile 上传文件, 可以上传视频, 音频和常见的文件类型
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 不允许上传空文件
  // - 示例代码中需要自行替换文件路径和鉴权Token
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/file/create
  async uploadFile(
    request: File.UploadFileReq
  ): Promise<{
    data: File.UploadFileResp
    response: Response
  }> {
    const req: RawRequestReq<UploadFileReq> = {
      scope: 'File',
      api: 'UploadFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/files',
      body: new UploadFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<UploadFileReq, File.UploadFileResp>(req)
  }
  // downloadFile 下载文件接口, 只能下载应用自己上传的文件
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 只能下载机器人自己上传的文件
  // - 下载用户发送的资源, 请使用[获取消息中的资源文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get)接口
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/file/get
  async downloadFile(
    request: File.DownloadFileReq
  ): Promise<{
    data: File.DownloadFileResp
    response: Response
  }> {
    const req: RawRequestReq<DownloadFileReq> = {
      scope: 'File',
      api: 'DownloadFile',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/files/:file_key',
      body: new DownloadFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file_download: true
    }
    return this.cli.RawRequest<DownloadFileReq, File.DownloadFileResp>(req)
  }
}

export declare namespace File {
  export interface UploadImageReq {
    image_type: string // 图片类型, 示例值: "message", 可选值有: `message`: 用于发送消息, `avatar`: 用于设置头像
    image: Buffer // 图片内容, 示例值: 二进制文件
  }

  export interface UploadImageResp {
    image_key: string // 图片的key
  }

  export interface uploadImageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UploadImageResp
  }

  export interface DownloadImageReq {
    image_key: string // 图片的key, 示例值: "img_8d5181ca-0aed-40f0-b0d1-b1452132afbg"
  }

  export interface DownloadImageResp {
    file: Buffer
  }

  export interface downloadImageResp {
    code: number
    msg: string
    data: DownloadImageResp
  }

  export interface UploadFileReq {
    file_type: string // 文件类型, 示例值: "mp4", 可选值有: `opus`: 上传opus音频文件；, 其他格式的音频文件, 请转为opus格式后上传, 转换方式可参考: ffmpeg -i  SourceFile.mp3 -acodec libopus -ac 1 -ar 16000 TargetFile.opus, `mp4`: 上传mp4视频文件, `pdf`: 上传pdf格式文件, `doc`: 上传doc格式文件, `xls`: 上传xls格式文件, `ppt`: 上传ppt格式文件, `stream`: 上传stream格式文件。以上类型之外, 可以使用stream格式
    file_name: string // 带后缀的文件名, 示例值: "测试视频.mp4"
    duration?: number // 文件的时长（视频, 音频）, 单位:毫秒。不填充时无法显示具体时长, 示例值: 3000
    file: Buffer // 文件内容, 示例值: 二进制文件
  }

  export interface UploadFileResp {
    file_key: string // 文件的key
  }

  export interface uploadFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UploadFileResp
  }

  export interface DownloadFileReq {
    file_key: string // 文件的key, 示例值: "file_456a92d6-c6ea-4de4-ac3f-7afcf44ac78g"
  }

  export interface DownloadFileResp {
    file: Buffer
  }

  export interface downloadFileResp {
    code: number
    msg: string
    data: DownloadFileResp
  }
}

class UploadImageReq {
  image_type?: any
  image?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      image_type: this.image_type,
      image: this.image
    }
  }

  getPath(path: string) {
    return path
  }
}

class DownloadImageReq {
  image_key?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':image_key', this.image_key)

    return path
  }
}

class UploadFileReq {
  file_type?: any
  file_name?: any
  duration?: any
  file?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      file_type: this.file_type,
      file_name: this.file_name,
      duration: this.duration,
      file: this.file
    }
  }

  getPath(path: string) {
    return path
  }
}

class DownloadFileReq {
  file_key?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_key', this.file_key)

    return path
  }
}
