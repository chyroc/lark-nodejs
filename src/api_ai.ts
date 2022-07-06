import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class AIService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // recognizeBasicImage 可识别图片中的文字, 按图片中的区域划分, 分段返回文本列表
  //
  // 单租户限流: 20QPS, 同租户下的应用没有限流, 共享本租户的 20QPS 限流
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/optical_char_recognition-v1/image/basic_recognize
  async recognizeBasicImage(
    request: AI.RecognizeBasicImageReq
  ): Promise<{
    data: AI.RecognizeBasicImageResp
    response: Response
  }> {
    const req: RawRequestReq<RecognizeBasicImageReq> = {
      scope: 'AI',
      api: 'RecognizeBasicImage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/optical_char_recognition/v1/image/basic_recognize',
      body: new RecognizeBasicImageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<RecognizeBasicImageReq, AI.RecognizeBasicImageResp>(req)
  }
  // recognizeSpeechStream 语音流式接口, 将整个音频文件分片进行传入模型。能够实时返回数据。建议每个音频分片的大小为 100-200ms
  //
  // 单租户限流: 20 路（一个 stream_id 称为一路会话）, 同租户下的应用没有限流, 共享本租户的 20路限流
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/stream_recognize
  async recognizeSpeechStream(
    request: AI.RecognizeSpeechStreamReq
  ): Promise<{
    data: AI.RecognizeSpeechStreamResp
    response: Response
  }> {
    const req: RawRequestReq<RecognizeSpeechStreamReq> = {
      scope: 'AI',
      api: 'RecognizeSpeechStream',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/speech_to_text/v1/speech/stream_recognize',
      body: new RecognizeSpeechStreamReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<RecognizeSpeechStreamReq, AI.RecognizeSpeechStreamResp>(req)
  }
  // recognizeSpeechFile 语音文件识别接口, 上传整段语音文件进行一次性识别。接口适合 60 秒以内音频识别
  //
  // 单租户限流: 20QPS, 同租户下的应用没有限流, 共享本租户的 20QPS 限流
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/file_recognize
  async recognizeSpeechFile(
    request: AI.RecognizeSpeechFileReq
  ): Promise<{
    data: AI.RecognizeSpeechFileResp
    response: Response
  }> {
    const req: RawRequestReq<RecognizeSpeechFileReq> = {
      scope: 'AI',
      api: 'RecognizeSpeechFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/speech_to_text/v1/speech/file_recognize',
      body: new RecognizeSpeechFileReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<RecognizeSpeechFileReq, AI.RecognizeSpeechFileResp>(req)
  }
  // translateText 机器翻译 (MT), 支持以下语种互译:
  //
  // "zh": 汉语；
  // "zh-Hant": 繁体汉语；
  // "en": 英语；
  // "ja": 日语；
  // "ru": 俄语；
  // "de": 德语；
  // "fr": 法语；
  // "it": 意大利语；
  // "pl": 波兰语；
  // "th": 泰语；
  // "hi": 印地语；
  // "id": 印尼语；
  // "es": 西班牙语；
  // "pt": 葡萄牙语；
  // "ko": 朝鲜语；
  // "vi": 越南语；
  // 单租户限流: 20QPS, 同租户下的应用没有限流, 共享本租户的 20QPS 限流
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/translate
  async translateText(
    request: AI.TranslateTextReq
  ): Promise<{
    data: AI.TranslateTextResp
    response: Response
  }> {
    const req: RawRequestReq<TranslateTextReq> = {
      scope: 'AI',
      api: 'TranslateText',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/translation/v1/text/translate',
      body: new TranslateTextReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<TranslateTextReq, AI.TranslateTextResp>(req)
  }
  // detectTextLanguage 机器翻译 (MT), 支持 100 多种语言识别, 返回符合 ISO 639-1 标准
  //
  // 单租户限流: 20QPS, 同租户下的应用没有限流, 共享本租户的 20QPS 限流
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/detect
  async detectTextLanguage(
    request: AI.DetectTextLanguageReq
  ): Promise<{
    data: AI.DetectTextLanguageResp
    response: Response
  }> {
    const req: RawRequestReq<DetectTextLanguageReq> = {
      scope: 'AI',
      api: 'DetectTextLanguage',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/translation/v1/text/detect',
      body: new DetectTextLanguageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DetectTextLanguageReq, AI.DetectTextLanguageResp>(req)
  }
}

export declare namespace AI {
  export interface RecognizeBasicImageReq {
    image?: string // base64 后的图片数据, 示例值: "base64后的图片二进制数据"
  }

  export interface RecognizeBasicImageResp {
    text_list?: string[] // 按区域识别, 返回文本列表
  }

  export interface recognizeBasicImageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: RecognizeBasicImageResp
  }

  export interface RecognizeSpeechStreamReq {
    speech: RecognizeSpeechStreamReqSpeech // 语音资源
    config: RecognizeSpeechStreamReqConfig // 配置属性
  }

  export interface RecognizeSpeechStreamReqConfig {
    stream_id: string // 仅包含字母数字和下划线的 16 位字符串作为同一数据流的标识, 用户生成, 示例值: "asd1234567890ddd"
    sequence_id: number // 数据流分片的序号, 序号从 0 开始, 每次请求递增 1, 示例值: 1
    action: number // 数据流标记: 1 首包, 2 正常结束, 等待结果返回, 3 中断数据流不返回最终结果, 示例值: 1
    format: string // 语音格式, 目前仅支持: pcm, 示例值: "pcm"
    engine_type: string // 引擎类型, 目前仅支持: 16k_auto 中英混合, 示例值: "16k_auto"
  }

  export interface RecognizeSpeechStreamReqSpeech {
    speech?: string // pcm格式音频文件（文件识别）或音频分片（流式识别）经base64编码后的内容, 示例值: "PdmrfE267Cd/Z9KpmNFh71A2PSJZxSp7+8upCg["
  }

  export interface RecognizeSpeechStreamResp {
    stream_id: string // 16 位 String 随机串作为同一数据流的标识
    sequence_id: number // 数据流分片的序号, 序号从 0 开始, 每次请求递增 1
    recognition_text: string // 语音流识别后的文本信息
  }

  export interface recognizeSpeechStreamResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: RecognizeSpeechStreamResp
  }

  export interface RecognizeSpeechFileReq {
    speech: RecognizeSpeechFileReqSpeech // 语音资源
    config: RecognizeSpeechFileReqConfig // 配置属性
  }

  export interface RecognizeSpeechFileReqConfig {
    file_id: string // 仅包含字母数字和下划线的 16 位字符串作为文件的标识, 用户生成, 示例值: "qwe12dd34567890w"
    format: string // 语音格式, 目前仅支持: pcm, 示例值: "pcm"
    engine_type: string // 引擎类型, 目前仅支持: 16k_auto 中英混合, 示例值: "16k_auto"
  }

  export interface RecognizeSpeechFileReqSpeech {
    speech?: string // pcm格式音频文件（文件识别）或音频分片（流式识别）经base64编码后的内容, 示例值: "PdmrfE267Cd/Z9KpmNFh71A2PSJZxSp7+8upCg["
  }

  export interface RecognizeSpeechFileResp {
    recognition_text: string // 语音识别后的文本信息
  }

  export interface recognizeSpeechFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: RecognizeSpeechFileResp
  }

  export interface TranslateTextReq {
    source_language: string // 源语言, 示例值: "zh"
    text: string // 源文本, 示例值: "尝试使用一下飞书吧"
    target_language: string // 目标语言, 示例值: "en"
    glossary?: TranslateTextReqGlossary[] // 请求级术语表, 携带术语, 仅在本次翻译中生效（最多能携带 128个术语词）
  }

  export interface TranslateTextReqGlossary {
    from: string // 原文, 示例值: "飞书"
    to: string // 译文, 示例值: "Lark"
  }

  export interface TranslateTextResp {
    text: string // 翻译后的文本
  }

  export interface translateTextResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: TranslateTextResp
  }

  export interface DetectTextLanguageReq {
    text: string // 需要被识别语种的文本, 示例值: "你好"
  }

  export interface DetectTextLanguageResp {
    language: string // 识别的文本语种, 返回符合 ISO 639-1 标准
  }

  export interface detectTextLanguageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DetectTextLanguageResp
  }
}

class RecognizeBasicImageReq {
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
    return path
  }
}

class RecognizeSpeechStreamReq {
  speech?: any
  config?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      speech: this.speech,
      config: this.config
    }
  }

  getPath(path: string) {
    return path
  }
}

class RecognizeSpeechFileReq {
  speech?: any
  config?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      speech: this.speech,
      config: this.config
    }
  }

  getPath(path: string) {
    return path
  }
}

class TranslateTextReq {
  source_language?: any
  text?: any
  target_language?: any
  glossary?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      source_language: this.source_language,
      text: this.text,
      target_language: this.target_language,
      glossary: this.glossary
    }
  }

  getPath(path: string) {
    return path
  }
}

class DetectTextLanguageReq {
  text?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      text: this.text
    }
  }

  getPath(path: string) {
    return path
  }
}
