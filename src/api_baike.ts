import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class BaikeService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // createBaikeDraft 草稿并非百科词条, 而是指通过 API 发起创建新词条或更新现有词条的申请。百科管理员审核通过后, 草稿将变为新的词条或覆盖已有词条。
  //
  // 以用户身份创建草稿（即 Authorization 使用 user_access_token）, 对应用户将收到由企业百科 Bot 发送的审核结果；以应用身份创建草稿（即 Authorization 使用 tenant_access_toke）, 不会收到任何通知。
  // · 创建新的百科词条时, 无需传入 entity_id 字段
  // · 更新已有百科词条时, 请传入对应词条的 entity_id 或 outer_info
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/create
  async createBaikeDraft(
    request: Baike.CreateBaikeDraftReq
  ): Promise<{
    data: Baike.CreateBaikeDraftResp
    response: Response
  }> {
    const req: RawRequestReq<CreateBaikeDraftReq> = {
      scope: 'Baike',
      api: 'CreateBaikeDraft',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/baike/v1/drafts',
      body: new CreateBaikeDraftReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateBaikeDraftReq, Baike.CreateBaikeDraftResp>(req)
  }
  // createBaikeUpdate 根据 draft_id 更新草稿内容, 已审批的草稿无法编辑
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/update
  async createBaikeUpdate(
    request: Baike.CreateBaikeUpdateReq
  ): Promise<{
    data: Baike.CreateBaikeUpdateResp
    response: Response
  }> {
    const req: RawRequestReq<CreateBaikeUpdateReq> = {
      scope: 'Baike',
      api: 'CreateBaikeUpdate',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/baike/v1/drafts/:draft_id',
      body: new CreateBaikeUpdateReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateBaikeUpdateReq, Baike.CreateBaikeUpdateResp>(req)
  }
  // createBaikeEntity 通过此接口创建的词条, 不需要百科管理员审核可直接写入词库, 请慎重使用【租户管理员请慎重审批】
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/create
  async createBaikeEntity(
    request: Baike.CreateBaikeEntityReq
  ): Promise<{
    data: Baike.CreateBaikeEntityResp
    response: Response
  }> {
    const req: RawRequestReq<CreateBaikeEntityReq> = {
      scope: 'Baike',
      api: 'CreateBaikeEntity',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/baike/v1/entities',
      body: new CreateBaikeEntityReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateBaikeEntityReq, Baike.CreateBaikeEntityResp>(req)
  }
  // updateBaikeEntity 通过此接口更新已有的词条, 不需要百科管理员审核可直接写入词库, 请慎重使用【租户管理员请慎重审批】
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/update
  async updateBaikeEntity(
    request: Baike.UpdateBaikeEntityReq
  ): Promise<{
    data: Baike.UpdateBaikeEntityResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateBaikeEntityReq> = {
      scope: 'Baike',
      api: 'UpdateBaikeEntity',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/baike/v1/entities/:entity_id',
      body: new UpdateBaikeEntityReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateBaikeEntityReq, Baike.UpdateBaikeEntityResp>(req)
  }
  // getBaikeEntity 通过词条 id 拉取对应的实体词详情信息
  //
  // 也支持通过 provider 和 outer_id 返回对应实体的详情数据。此时路径中的 entity_id 为固定的 enterprise_0
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/get
  async getBaikeEntity(
    request: Baike.GetBaikeEntityReq
  ): Promise<{
    data: Baike.GetBaikeEntityResp
    response: Response
  }> {
    const req: RawRequestReq<GetBaikeEntityReq> = {
      scope: 'Baike',
      api: 'GetBaikeEntity',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/baike/v1/entities/:entity_id',
      body: new GetBaikeEntityReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBaikeEntityReq, Baike.GetBaikeEntityResp>(req)
  }
  // getBaikeEntityList 分页拉取词条列表数据, 支持拉取租户内的全部词条
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/list
  async getBaikeEntityList(
    request: Baike.GetBaikeEntityListReq
  ): Promise<{
    data: Baike.GetBaikeEntityListResp
    response: Response
  }> {
    const req: RawRequestReq<GetBaikeEntityListReq> = {
      scope: 'Baike',
      api: 'GetBaikeEntityList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/baike/v1/entities',
      body: new GetBaikeEntityListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBaikeEntityListReq, Baike.GetBaikeEntityListResp>(req)
  }
  // matchBaikeEntity 将关键词与词条名、别名精准匹配, 并返回对应的 词条 ID
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/match
  async matchBaikeEntity(
    request: Baike.MatchBaikeEntityReq
  ): Promise<{
    data: Baike.MatchBaikeEntityResp
    response: Response
  }> {
    const req: RawRequestReq<MatchBaikeEntityReq> = {
      scope: 'Baike',
      api: 'MatchBaikeEntity',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/baike/v1/entities/match',
      body: new MatchBaikeEntityReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<MatchBaikeEntityReq, Baike.MatchBaikeEntityResp>(req)
  }
  // searchBaikeEntity 传入关键词, 与词条名、别名、释义等信息进行模糊匹配, 返回搜到的词条信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/search
  async searchBaikeEntity(
    request: Baike.SearchBaikeEntityReq
  ): Promise<{
    data: Baike.SearchBaikeEntityResp
    response: Response
  }> {
    const req: RawRequestReq<SearchBaikeEntityReq> = {
      scope: 'Baike',
      api: 'SearchBaikeEntity',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/baike/v1/entities/search',
      body: new SearchBaikeEntityReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SearchBaikeEntityReq, Baike.SearchBaikeEntityResp>(req)
  }
  // highlightBaikeEntity 传入一句话, 智能识别句中对应的词条, 并返回词条位置和 entity_id, 可在外部系统中快速实现百科词条智能高亮
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/highlight
  async highlightBaikeEntity(
    request: Baike.HighlightBaikeEntityReq
  ): Promise<{
    data: Baike.HighlightBaikeEntityResp
    response: Response
  }> {
    const req: RawRequestReq<HighlightBaikeEntityReq> = {
      scope: 'Baike',
      api: 'HighlightBaikeEntity',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/baike/v1/entities/highlight',
      body: new HighlightBaikeEntityReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<HighlightBaikeEntityReq, Baike.HighlightBaikeEntityResp>(req)
  }
  // getBaikeClassificationList 获取企业百科当前分类。
  //
  // 企业百科目前为二级分类体系, 每个词条可添加多个二级分类, 但每个一级分类下只能添加一个分类。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/classification/list
  async getBaikeClassificationList(
    request: Baike.GetBaikeClassificationListReq
  ): Promise<{
    data: Baike.GetBaikeClassificationListResp
    response: Response
  }> {
    const req: RawRequestReq<GetBaikeClassificationListReq> = {
      scope: 'Baike',
      api: 'GetBaikeClassificationList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/baike/v1/classifications',
      body: new GetBaikeClassificationListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBaikeClassificationListReq, Baike.GetBaikeClassificationListResp>(
      req
    )
  }
}

export declare namespace Baike {
  export interface CreateBaikeDraftReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    id?: string // 词条 ID （需要更新某个词条时填写, 若是创建新词条可不填写）, 示例值: "enterprise_40217521"
    main_keys?: CreateBaikeDraftReqMainKey[] // 词条名, 最大长度: `1`
    aliases?: CreateBaikeDraftReqAliase[] // 别名, 最大长度: `10`
    description?: string // 词条释义（纯文本格式）, 示例值: "企业百科是飞书提供的一款知识管理工具, 通过企业百科可以帮助企业将分散的知识信息进行聚合, 并通过UGC的方式, 促进企业知识的保鲜和流通", 最大长度: `5000` 字符
    related_meta?: CreateBaikeDraftReqRelatedMeta // 更多相关信息
    outer_info?: CreateBaikeDraftReqOuterInfo // 外部系统关联数据
    rich_text?: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分, 示例值: "<b>加粗</b><i>斜体</i><p><a href=\"https://feishu.cn\">链接</a></p><p><span>企业百科是飞书提供的一款知识管理工具, 通过企业百科可以帮助企业将分散的知识信息进行聚合, 并通过UGC的方式, 促进企业知识的保鲜和流通</span></p>", 最大长度: `5000` 字符
  }

  export interface CreateBaikeDraftReqAliase {
    key: string // 名称的值, 示例值: "企业百科"
    display_status: CreateBaikeDraftReqAliaseDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeDraftReqAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮, 示例值: true
    allow_search: boolean // 对应名称是否在搜索结果中展示, 示例值: true
  }

  export interface CreateBaikeDraftReqMainKey {
    key: string // 名称的值, 示例值: "企业百科"
    display_status: CreateBaikeDraftReqMainKeyDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeDraftReqMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮, 示例值: true
    allow_search: boolean // 对应名称是否在搜索结果中展示, 示例值: true
  }

  export interface CreateBaikeDraftReqOuterInfo {
    provider: string // 外部系统（不能包含中横线 "-"）, 示例值: "星云", 长度范围: `2` ～ `32` 字符
    outer_id: string // 词条在外部系统中对应的唯一 ID（不能包含中横线 "-"）, 示例值: "client_6539i3498d", 长度范围: `1` ～ `64` 字符
  }

  export interface CreateBaikeDraftReqRelatedMeta {
    users?: CreateBaikeDraftReqRelatedMetaUser[] // 相关联系人
    chats?: CreateBaikeDraftReqRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: CreateBaikeDraftReqRelatedMetaDoc[] // 相关云文档
    oncalls?: CreateBaikeDraftReqRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: CreateBaikeDraftReqRelatedMetaLink[] // 相关链接
    abbreviations?: CreateBaikeDraftReqRelatedMetaAbbreviation[] // 相关词条
    classifications?: CreateBaikeDraftReqRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface CreateBaikeDraftReqRelatedMetaAbbreviation {
    id?: string // 相关词条 ID, 示例值: "enterprise_51587960"
  }

  export interface CreateBaikeDraftReqRelatedMetaChat {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
  }

  export interface CreateBaikeDraftReqRelatedMetaClassification {
    id: string // 二级分类 ID, 示例值: "7049606926702837761"
    father_id?: string // 对应一级分类 ID, 示例值: "7049606926702837777"
  }

  export interface CreateBaikeDraftReqRelatedMetaDoc {
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
    url?: string // 链接地址, 示例值: "https://www.feishu.cn/hc/zh-CN", 正则校验: `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:.;]+[-A-Za-z0-9+&@#/%=~_|]`
  }

  export interface CreateBaikeDraftReqRelatedMetaLink {
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
    url?: string // 链接地址, 示例值: "https://www.feishu.cn/hc/zh-CN", 正则校验: `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:.;]+[-A-Za-z0-9+&@#/%=~_|]`
  }

  export interface CreateBaikeDraftReqRelatedMetaOncall {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
  }

  export interface CreateBaikeDraftReqRelatedMetaUser {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
  }

  export interface CreateBaikeDraftResp {
    draft: CreateBaikeDraftRespDraft // 草稿信息
  }

  export interface CreateBaikeDraftRespDraft {
    draft_id: string // 草稿 ID
    entity: CreateBaikeDraftRespDraftEntity // 词条信息
  }

  export interface CreateBaikeDraftRespDraftEntity {
    id: string // 词条 ID （需要更新某个词条时填写, 若是创建新词条可不填写）
    main_keys?: CreateBaikeDraftRespDraftEntityMainKey[] // 词条名
    aliases?: CreateBaikeDraftRespDraftEntityAliase[] // 别名
    description: string // 词条释义（纯文本格式）
    create_time: string // 词条创建时间
    update_time: string // 词条最近更新时间
    related_meta: CreateBaikeDraftRespDraftEntityRelatedMeta // 更多相关信息
    categories?: string[] // 词条标签
    statistics: CreateBaikeDraftRespDraftEntityStatistics // 当前词条收到的反馈数据
    outer_info: CreateBaikeDraftRespDraftEntityOuterInfo // 外部系统关联数据
    rich_text: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分
  }

  export interface CreateBaikeDraftRespDraftEntityAliase {
    key: string // 名称的值
    display_status: CreateBaikeDraftRespDraftEntityAliaseDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeDraftRespDraftEntityAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface CreateBaikeDraftRespDraftEntityMainKey {
    key: string // 名称的值
    display_status: CreateBaikeDraftRespDraftEntityMainKeyDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeDraftRespDraftEntityMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface CreateBaikeDraftRespDraftEntityOuterInfo {
    provider: string // 外部系统（不能包含中横线 "-"）
    outer_id: string // 词条在外部系统中对应的唯一 ID（不能包含中横线 "-"）
  }

  export interface CreateBaikeDraftRespDraftEntityRelatedMeta {
    users?: CreateBaikeDraftRespDraftEntityRelatedMetaUser[] // 相关联系人
    chats?: CreateBaikeDraftRespDraftEntityRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: CreateBaikeDraftRespDraftEntityRelatedMetaDoc[] // 相关云文档
    oncalls?: CreateBaikeDraftRespDraftEntityRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: CreateBaikeDraftRespDraftEntityRelatedMetaLink[] // 相关链接
    abbreviations?: CreateBaikeDraftRespDraftEntityRelatedMetaAbbreviation[] // 相关词条
    classifications?: CreateBaikeDraftRespDraftEntityRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface CreateBaikeDraftRespDraftEntityRelatedMetaAbbreviation {
    id: string // 相关词条 ID
  }

  export interface CreateBaikeDraftRespDraftEntityRelatedMetaChat {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeDraftRespDraftEntityRelatedMetaClassification {
    id: string // 二级分类 ID
    name: string // 二级分类名称
    father_id: string // 对应一级分类 ID
  }

  export interface CreateBaikeDraftRespDraftEntityRelatedMetaDoc {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeDraftRespDraftEntityRelatedMetaLink {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeDraftRespDraftEntityRelatedMetaOncall {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeDraftRespDraftEntityRelatedMetaUser {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeDraftRespDraftEntityStatistics {
    like_count: number // 累计点赞
    dislike_count: number // 当前词条版本收到的负反馈数量
  }

  export interface createBaikeDraftResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateBaikeDraftResp
  }

  export interface CreateBaikeUpdateReq {
    draft_id: string // 草稿 ID, 示例值: "5347"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    id?: string // 词条 ID （需要更新某个词条时填写, 若是创建新词条可不填写）, 示例值: "enterprise_40217521"
    main_keys?: CreateBaikeUpdateReqMainKey[] // 词条名, 最大长度: `1`
    aliases?: CreateBaikeUpdateReqAliase[] // 别名, 最大长度: `10`
    description?: string // 词条释义（纯文本格式）, 示例值: "企业百科是飞书提供的一款知识管理工具, 通过企业百科可以帮助企业将分散的知识信息进行聚合, 并通过UGC的方式, 促进企业知识的保鲜和流通", 最大长度: `5000` 字符
    related_meta?: CreateBaikeUpdateReqRelatedMeta // 更多相关信息
    rich_text?: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分, 示例值: "<b>加粗</b><i>斜体</i><p><a href=\"https://feishu.cn\">链接</a></p><p><span>企业百科是飞书提供的一款知识管理工具, 通过企业百科可以帮助企业将分散的知识信息进行聚合, 并通过UGC的方式, 促进企业知识的保鲜和流通</span></p>", 最大长度: `5000` 字符
  }

  export interface CreateBaikeUpdateReqAliase {
    key: string // 名称的值, 示例值: "企业百科"
    display_status: CreateBaikeUpdateReqAliaseDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeUpdateReqAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮, 示例值: true
    allow_search: boolean // 对应名称是否在搜索结果中展示, 示例值: true
  }

  export interface CreateBaikeUpdateReqMainKey {
    key: string // 名称的值, 示例值: "企业百科"
    display_status: CreateBaikeUpdateReqMainKeyDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeUpdateReqMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮, 示例值: true
    allow_search: boolean // 对应名称是否在搜索结果中展示, 示例值: true
  }

  export interface CreateBaikeUpdateReqRelatedMeta {
    users?: CreateBaikeUpdateReqRelatedMetaUser[] // 相关联系人
    chats?: CreateBaikeUpdateReqRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: CreateBaikeUpdateReqRelatedMetaDoc[] // 相关云文档
    oncalls?: CreateBaikeUpdateReqRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: CreateBaikeUpdateReqRelatedMetaLink[] // 相关链接
    abbreviations?: CreateBaikeUpdateReqRelatedMetaAbbreviation[] // 相关词条
    classifications?: CreateBaikeUpdateReqRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface CreateBaikeUpdateReqRelatedMetaAbbreviation {
    id?: string // 相关词条 ID, 示例值: "enterprise_51587960"
  }

  export interface CreateBaikeUpdateReqRelatedMetaChat {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
  }

  export interface CreateBaikeUpdateReqRelatedMetaClassification {
    id: string // 二级分类 ID, 示例值: "7049606926702837761"
    father_id?: string // 对应一级分类 ID, 示例值: "7049606926702837777"
  }

  export interface CreateBaikeUpdateReqRelatedMetaDoc {
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
    url?: string // 链接地址, 示例值: "https://www.feishu.cn/hc/zh-CN", 正则校验: `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:.;]+[-A-Za-z0-9+&@#/%=~_|]`
  }

  export interface CreateBaikeUpdateReqRelatedMetaLink {
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
    url?: string // 链接地址, 示例值: "https://www.feishu.cn/hc/zh-CN", 正则校验: `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:.;]+[-A-Za-z0-9+&@#/%=~_|]`
  }

  export interface CreateBaikeUpdateReqRelatedMetaOncall {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
  }

  export interface CreateBaikeUpdateReqRelatedMetaUser {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
  }

  export interface CreateBaikeUpdateResp {
    draft: CreateBaikeUpdateRespDraft // 草稿
  }

  export interface CreateBaikeUpdateRespDraft {
    draft_id: string // 草稿 ID
    entity: CreateBaikeUpdateRespDraftEntity // 词条信息
  }

  export interface CreateBaikeUpdateRespDraftEntity {
    id: string // 词条 ID （需要更新某个词条时填写, 若是创建新词条可不填写）
    main_keys?: CreateBaikeUpdateRespDraftEntityMainKey[] // 词条名
    aliases?: CreateBaikeUpdateRespDraftEntityAliase[] // 别名
    description: string // 词条释义（纯文本格式）
    create_time: string // 词条创建时间
    update_time: string // 词条最近更新时间
    related_meta: CreateBaikeUpdateRespDraftEntityRelatedMeta // 更多相关信息
    categories?: string[] // 词条标签
    statistics: CreateBaikeUpdateRespDraftEntityStatistics // 当前词条收到的反馈数据
    outer_info: CreateBaikeUpdateRespDraftEntityOuterInfo // 外部系统关联数据
    rich_text: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分
  }

  export interface CreateBaikeUpdateRespDraftEntityAliase {
    key: string // 名称的值
    display_status: CreateBaikeUpdateRespDraftEntityAliaseDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeUpdateRespDraftEntityAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface CreateBaikeUpdateRespDraftEntityMainKey {
    key: string // 名称的值
    display_status: CreateBaikeUpdateRespDraftEntityMainKeyDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeUpdateRespDraftEntityMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface CreateBaikeUpdateRespDraftEntityOuterInfo {
    provider: string // 外部系统（不能包含中横线 "-"）
    outer_id: string // 词条在外部系统中对应的唯一 ID（不能包含中横线 "-"）
  }

  export interface CreateBaikeUpdateRespDraftEntityRelatedMeta {
    users?: CreateBaikeUpdateRespDraftEntityRelatedMetaUser[] // 相关联系人
    chats?: CreateBaikeUpdateRespDraftEntityRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: CreateBaikeUpdateRespDraftEntityRelatedMetaDoc[] // 相关云文档
    oncalls?: CreateBaikeUpdateRespDraftEntityRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: CreateBaikeUpdateRespDraftEntityRelatedMetaLink[] // 相关链接
    abbreviations?: CreateBaikeUpdateRespDraftEntityRelatedMetaAbbreviation[] // 相关词条
    classifications?: CreateBaikeUpdateRespDraftEntityRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface CreateBaikeUpdateRespDraftEntityRelatedMetaAbbreviation {
    id: string // 相关词条 ID
  }

  export interface CreateBaikeUpdateRespDraftEntityRelatedMetaChat {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeUpdateRespDraftEntityRelatedMetaClassification {
    id: string // 二级分类 ID
    name: string // 二级分类名称
    father_id: string // 对应一级分类 ID
  }

  export interface CreateBaikeUpdateRespDraftEntityRelatedMetaDoc {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeUpdateRespDraftEntityRelatedMetaLink {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeUpdateRespDraftEntityRelatedMetaOncall {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeUpdateRespDraftEntityRelatedMetaUser {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeUpdateRespDraftEntityStatistics {
    like_count: number // 累计点赞
    dislike_count: number // 当前词条版本收到的负反馈数量
  }

  export interface createBaikeUpdateResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateBaikeUpdateResp
  }

  export interface CreateBaikeEntityReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    main_keys?: CreateBaikeEntityReqMainKey[] // 词条名, 最大长度: `1`
    aliases?: CreateBaikeEntityReqAliase[] // 别名, 最大长度: `10`
    description?: string // 词条释义（纯文本格式）, 示例值: "企业百科是飞书提供的一款知识管理工具, 通过企业百科可以帮助企业将分散的知识信息进行聚合, 并通过UGC的方式, 促进企业知识的保鲜和流通", 最大长度: `5000` 字符
    related_meta?: CreateBaikeEntityReqRelatedMeta // 更多相关信息
    outer_info?: CreateBaikeEntityReqOuterInfo // 外部系统关联数据
    rich_text?: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分, 示例值: "<b>加粗</b><i>斜体</i><p><a href=\"https://feishu.cn\">链接</a></p><p><span>企业百科是飞书提供的一款知识管理工具, 通过企业百科可以帮助企业将分散的知识信息进行聚合, 并通过UGC的方式, 促进企业知识的保鲜和流通</span></p>", 最大长度: `5000` 字符
  }

  export interface CreateBaikeEntityReqAliase {
    key: string // 名称的值, 示例值: "企业百科"
    display_status: CreateBaikeEntityReqAliaseDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeEntityReqAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮, 示例值: true
    allow_search: boolean // 对应名称是否在搜索结果中展示, 示例值: true
  }

  export interface CreateBaikeEntityReqMainKey {
    key: string // 名称的值, 示例值: "企业百科"
    display_status: CreateBaikeEntityReqMainKeyDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeEntityReqMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮, 示例值: true
    allow_search: boolean // 对应名称是否在搜索结果中展示, 示例值: true
  }

  export interface CreateBaikeEntityReqOuterInfo {
    provider: string // 外部系统（不能包含中横线 "-"）, 示例值: "星云", 长度范围: `2` ～ `32` 字符
    outer_id: string // 词条在外部系统中对应的唯一 ID（不能包含中横线 "-"）, 示例值: "client_6539i3498d", 长度范围: `1` ～ `64` 字符
  }

  export interface CreateBaikeEntityReqRelatedMeta {
    users?: CreateBaikeEntityReqRelatedMetaUser[] // 相关联系人
    chats?: CreateBaikeEntityReqRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: CreateBaikeEntityReqRelatedMetaDoc[] // 相关云文档
    oncalls?: CreateBaikeEntityReqRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: CreateBaikeEntityReqRelatedMetaLink[] // 相关链接
    abbreviations?: CreateBaikeEntityReqRelatedMetaAbbreviation[] // 相关词条
    classifications?: CreateBaikeEntityReqRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface CreateBaikeEntityReqRelatedMetaAbbreviation {
    id?: string // 相关词条 ID, 示例值: "enterprise_51587960"
  }

  export interface CreateBaikeEntityReqRelatedMetaChat {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
  }

  export interface CreateBaikeEntityReqRelatedMetaClassification {
    id: string // 二级分类 ID, 示例值: "7049606926702837761"
    father_id?: string // 对应一级分类 ID, 示例值: "7049606926702837777"
  }

  export interface CreateBaikeEntityReqRelatedMetaDoc {
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
    url?: string // 链接地址, 示例值: "https://www.feishu.cn/hc/zh-CN", 正则校验: `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:.;]+[-A-Za-z0-9+&@#/%=~_|]`
  }

  export interface CreateBaikeEntityReqRelatedMetaLink {
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
    url?: string // 链接地址, 示例值: "https://www.feishu.cn/hc/zh-CN", 正则校验: `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:.;]+[-A-Za-z0-9+&@#/%=~_|]`
  }

  export interface CreateBaikeEntityReqRelatedMetaOncall {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
  }

  export interface CreateBaikeEntityReqRelatedMetaUser {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
  }

  export interface CreateBaikeEntityResp {
    entity: CreateBaikeEntityRespEntity // 词条信息
  }

  export interface CreateBaikeEntityRespEntity {
    id: string // 词条 ID （需要更新某个词条时填写, 若是创建新词条可不填写）
    main_keys?: CreateBaikeEntityRespEntityMainKey[] // 词条名
    aliases?: CreateBaikeEntityRespEntityAliase[] // 别名
    description: string // 词条释义（纯文本格式）
    create_time: string // 词条创建时间
    update_time: string // 词条最近更新时间
    related_meta: CreateBaikeEntityRespEntityRelatedMeta // 更多相关信息
    categories?: string[] // 词条标签
    statistics: CreateBaikeEntityRespEntityStatistics // 当前词条收到的反馈数据
    outer_info: CreateBaikeEntityRespEntityOuterInfo // 外部系统关联数据
    rich_text: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分
  }

  export interface CreateBaikeEntityRespEntityAliase {
    key: string // 名称的值
    display_status: CreateBaikeEntityRespEntityAliaseDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeEntityRespEntityAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface CreateBaikeEntityRespEntityMainKey {
    key: string // 名称的值
    display_status: CreateBaikeEntityRespEntityMainKeyDisplayStatus // 名称展示范围
  }

  export interface CreateBaikeEntityRespEntityMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface CreateBaikeEntityRespEntityOuterInfo {
    provider: string // 外部系统（不能包含中横线 "-"）
    outer_id: string // 词条在外部系统中对应的唯一 ID（不能包含中横线 "-"）
  }

  export interface CreateBaikeEntityRespEntityRelatedMeta {
    users?: CreateBaikeEntityRespEntityRelatedMetaUser[] // 相关联系人
    chats?: CreateBaikeEntityRespEntityRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: CreateBaikeEntityRespEntityRelatedMetaDoc[] // 相关云文档
    oncalls?: CreateBaikeEntityRespEntityRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: CreateBaikeEntityRespEntityRelatedMetaLink[] // 相关链接
    abbreviations?: CreateBaikeEntityRespEntityRelatedMetaAbbreviation[] // 相关词条
    classifications?: CreateBaikeEntityRespEntityRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface CreateBaikeEntityRespEntityRelatedMetaAbbreviation {
    id: string // 相关词条 ID
  }

  export interface CreateBaikeEntityRespEntityRelatedMetaChat {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeEntityRespEntityRelatedMetaClassification {
    id: string // 二级分类 ID
    name: string // 二级分类名称
    father_id: string // 对应一级分类 ID
  }

  export interface CreateBaikeEntityRespEntityRelatedMetaDoc {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeEntityRespEntityRelatedMetaLink {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeEntityRespEntityRelatedMetaOncall {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeEntityRespEntityRelatedMetaUser {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface CreateBaikeEntityRespEntityStatistics {
    like_count: number // 累计点赞
    dislike_count: number // 当前词条版本收到的负反馈数量
  }

  export interface createBaikeEntityResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateBaikeEntityResp
  }

  export interface UpdateBaikeEntityReq {
    entity_id: string // 实体词 ID, 示例值: "enterprise_40217521"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    main_keys?: UpdateBaikeEntityReqMainKey[] // 词条名, 最大长度: `1`
    aliases?: UpdateBaikeEntityReqAliase[] // 别名, 最大长度: `10`
    description?: string // 词条释义（纯文本格式）, 示例值: "企业百科是飞书提供的一款知识管理工具, 通过企业百科可以帮助企业将分散的知识信息进行聚合, 并通过UGC的方式, 促进企业知识的保鲜和流通", 最大长度: `5000` 字符
    related_meta?: UpdateBaikeEntityReqRelatedMeta // 更多相关信息
    outer_info?: UpdateBaikeEntityReqOuterInfo // 外部系统关联数据
    rich_text?: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分, 示例值: "<b>加粗</b><i>斜体</i><p><a href=\"https://feishu.cn\">链接</a></p><p><span>企业百科是飞书提供的一款知识管理工具, 通过企业百科可以帮助企业将分散的知识信息进行聚合, 并通过UGC的方式, 促进企业知识的保鲜和流通</span></p>", 最大长度: `5000` 字符
  }

  export interface UpdateBaikeEntityReqAliase {
    key: string // 名称的值, 示例值: "企业百科"
    display_status: UpdateBaikeEntityReqAliaseDisplayStatus // 名称展示范围
  }

  export interface UpdateBaikeEntityReqAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮, 示例值: true
    allow_search: boolean // 对应名称是否在搜索结果中展示, 示例值: true
  }

  export interface UpdateBaikeEntityReqMainKey {
    key: string // 名称的值, 示例值: "企业百科"
    display_status: UpdateBaikeEntityReqMainKeyDisplayStatus // 名称展示范围
  }

  export interface UpdateBaikeEntityReqMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮, 示例值: true
    allow_search: boolean // 对应名称是否在搜索结果中展示, 示例值: true
  }

  export interface UpdateBaikeEntityReqOuterInfo {
    provider: string // 外部系统（不能包含中横线 "-"）, 示例值: "星云", 长度范围: `2` ～ `32` 字符
    outer_id: string // 词条在外部系统中对应的唯一 ID（不能包含中横线 "-"）, 示例值: "client_6539i3498d", 长度范围: `1` ～ `64` 字符
  }

  export interface UpdateBaikeEntityReqRelatedMeta {
    users?: UpdateBaikeEntityReqRelatedMetaUser[] // 相关联系人
    chats?: UpdateBaikeEntityReqRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: UpdateBaikeEntityReqRelatedMetaDoc[] // 相关云文档
    oncalls?: UpdateBaikeEntityReqRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: UpdateBaikeEntityReqRelatedMetaLink[] // 相关链接
    abbreviations?: UpdateBaikeEntityReqRelatedMetaAbbreviation[] // 相关词条
    classifications?: UpdateBaikeEntityReqRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface UpdateBaikeEntityReqRelatedMetaAbbreviation {
    id?: string // 相关词条 ID, 示例值: "enterprise_51587960"
  }

  export interface UpdateBaikeEntityReqRelatedMetaChat {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
  }

  export interface UpdateBaikeEntityReqRelatedMetaClassification {
    id: string // 二级分类 ID, 示例值: "7049606926702837761"
    father_id?: string // 对应一级分类 ID, 示例值: "7049606926702837777"
  }

  export interface UpdateBaikeEntityReqRelatedMetaDoc {
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
    url?: string // 链接地址, 示例值: "https://www.feishu.cn/hc/zh-CN", 正则校验: `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:.;]+[-A-Za-z0-9+&@#/%=~_|]`
  }

  export interface UpdateBaikeEntityReqRelatedMetaLink {
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
    url?: string // 链接地址, 示例值: "https://www.feishu.cn/hc/zh-CN", 正则校验: `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:.;]+[-A-Za-z0-9+&@#/%=~_|]`
  }

  export interface UpdateBaikeEntityReqRelatedMetaOncall {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
  }

  export interface UpdateBaikeEntityReqRelatedMetaUser {
    id: string // 对应相关信息 ID, 示例值: "格式请看请求体示例"
    title?: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题, 示例值: "企业百科帮助中心"
  }

  export interface UpdateBaikeEntityResp {
    entity: UpdateBaikeEntityRespEntity // 词条信息
  }

  export interface UpdateBaikeEntityRespEntity {
    id: string // 词条 ID （需要更新某个词条时填写, 若是创建新词条可不填写）
    main_keys?: UpdateBaikeEntityRespEntityMainKey[] // 词条名
    aliases?: UpdateBaikeEntityRespEntityAliase[] // 别名
    description: string // 词条释义（纯文本格式）
    create_time: string // 词条创建时间
    update_time: string // 词条最近更新时间
    related_meta: UpdateBaikeEntityRespEntityRelatedMeta // 更多相关信息
    categories?: string[] // 词条标签
    statistics: UpdateBaikeEntityRespEntityStatistics // 当前词条收到的反馈数据
    outer_info: UpdateBaikeEntityRespEntityOuterInfo // 外部系统关联数据
    rich_text: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分
  }

  export interface UpdateBaikeEntityRespEntityAliase {
    key: string // 名称的值
    display_status: UpdateBaikeEntityRespEntityAliaseDisplayStatus // 名称展示范围
  }

  export interface UpdateBaikeEntityRespEntityAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface UpdateBaikeEntityRespEntityMainKey {
    key: string // 名称的值
    display_status: UpdateBaikeEntityRespEntityMainKeyDisplayStatus // 名称展示范围
  }

  export interface UpdateBaikeEntityRespEntityMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface UpdateBaikeEntityRespEntityOuterInfo {
    provider: string // 外部系统（不能包含中横线 "-"）
    outer_id: string // 词条在外部系统中对应的唯一 ID（不能包含中横线 "-"）
  }

  export interface UpdateBaikeEntityRespEntityRelatedMeta {
    users?: UpdateBaikeEntityRespEntityRelatedMetaUser[] // 相关联系人
    chats?: UpdateBaikeEntityRespEntityRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: UpdateBaikeEntityRespEntityRelatedMetaDoc[] // 相关云文档
    oncalls?: UpdateBaikeEntityRespEntityRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: UpdateBaikeEntityRespEntityRelatedMetaLink[] // 相关链接
    abbreviations?: UpdateBaikeEntityRespEntityRelatedMetaAbbreviation[] // 相关词条
    classifications?: UpdateBaikeEntityRespEntityRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface UpdateBaikeEntityRespEntityRelatedMetaAbbreviation {
    id: string // 相关词条 ID
  }

  export interface UpdateBaikeEntityRespEntityRelatedMetaChat {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface UpdateBaikeEntityRespEntityRelatedMetaClassification {
    id: string // 二级分类 ID
    name: string // 二级分类名称
    father_id: string // 对应一级分类 ID
  }

  export interface UpdateBaikeEntityRespEntityRelatedMetaDoc {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface UpdateBaikeEntityRespEntityRelatedMetaLink {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface UpdateBaikeEntityRespEntityRelatedMetaOncall {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface UpdateBaikeEntityRespEntityRelatedMetaUser {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface UpdateBaikeEntityRespEntityStatistics {
    like_count: number // 累计点赞
    dislike_count: number // 当前词条版本收到的负反馈数量
  }

  export interface updateBaikeEntityResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateBaikeEntityResp
  }

  export interface GetBaikeEntityReq {
    entity_id: string // 词条 ID, 示例值: "enterprise_515879"
    provider?: string // 外部系统, 示例值: "星云", 长度范围: `2` ～ `32` 字符
    outer_id?: string // 词条在外部系统中对应的唯一 ID, 示例值: "12345", 长度范围: `1` ～ `64` 字符
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetBaikeEntityResp {
    entity: GetBaikeEntityRespEntity // 实体词
  }

  export interface GetBaikeEntityRespEntity {
    id: string // 词条 ID （需要更新某个词条时填写, 若是创建新词条可不填写）
    main_keys?: GetBaikeEntityRespEntityMainKey[] // 词条名
    aliases?: GetBaikeEntityRespEntityAliase[] // 别名
    description: string // 词条释义（纯文本格式）
    create_time: string // 词条创建时间
    update_time: string // 词条最近更新时间
    related_meta: GetBaikeEntityRespEntityRelatedMeta // 更多相关信息
    categories?: string[] // 词条标签
    statistics: GetBaikeEntityRespEntityStatistics // 当前词条收到的反馈数据
    outer_info: GetBaikeEntityRespEntityOuterInfo // 外部系统关联数据
    rich_text: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分
  }

  export interface GetBaikeEntityRespEntityAliase {
    key: string // 名称的值
    display_status: GetBaikeEntityRespEntityAliaseDisplayStatus // 名称展示范围
  }

  export interface GetBaikeEntityRespEntityAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface GetBaikeEntityRespEntityMainKey {
    key: string // 名称的值
    display_status: GetBaikeEntityRespEntityMainKeyDisplayStatus // 名称展示范围
  }

  export interface GetBaikeEntityRespEntityMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface GetBaikeEntityRespEntityOuterInfo {
    provider: string // 外部系统（不能包含中横线 "-"）
    outer_id: string // 词条在外部系统中对应的唯一 ID（不能包含中横线 "-"）
  }

  export interface GetBaikeEntityRespEntityRelatedMeta {
    users?: GetBaikeEntityRespEntityRelatedMetaUser[] // 相关联系人
    chats?: GetBaikeEntityRespEntityRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: GetBaikeEntityRespEntityRelatedMetaDoc[] // 相关云文档
    oncalls?: GetBaikeEntityRespEntityRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: GetBaikeEntityRespEntityRelatedMetaLink[] // 相关链接
    abbreviations?: GetBaikeEntityRespEntityRelatedMetaAbbreviation[] // 相关词条
    classifications?: GetBaikeEntityRespEntityRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface GetBaikeEntityRespEntityRelatedMetaAbbreviation {
    id: string // 相关词条 ID
  }

  export interface GetBaikeEntityRespEntityRelatedMetaChat {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface GetBaikeEntityRespEntityRelatedMetaClassification {
    id: string // 二级分类 ID
    name: string // 二级分类名称
    father_id: string // 对应一级分类 ID
  }

  export interface GetBaikeEntityRespEntityRelatedMetaDoc {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface GetBaikeEntityRespEntityRelatedMetaLink {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface GetBaikeEntityRespEntityRelatedMetaOncall {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface GetBaikeEntityRespEntityRelatedMetaUser {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface GetBaikeEntityRespEntityStatistics {
    like_count: number // 累计点赞
    dislike_count: number // 当前词条版本收到的负反馈数量
  }

  export interface getBaikeEntityResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBaikeEntityResp
  }

  export interface GetBaikeEntityListReq {
    page_size?: number // 分页大小, 示例值: 20, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "b152fa6e6f62a291019a04c3a93f365f8ac641910506ff15ff4cad6534e087cb4ed8fa2c"
    provider?: string // 相关外部系统【可用来过滤词条数据】, 示例值: "星云", 长度范围: `2` ～ `32` 字符
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetBaikeEntityListResp {
    entities?: GetBaikeEntityListRespEntity[] // 词条列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface GetBaikeEntityListRespEntity {
    id: string // 词条 ID （需要更新某个词条时填写, 若是创建新词条可不填写）
    main_keys?: GetBaikeEntityListRespEntityMainKey[] // 词条名
    aliases?: GetBaikeEntityListRespEntityAliase[] // 别名
    description: string // 词条释义（纯文本格式）
    create_time: string // 词条创建时间
    update_time: string // 词条最近更新时间
    related_meta: GetBaikeEntityListRespEntityRelatedMeta // 更多相关信息
    categories?: string[] // 词条标签
    statistics: GetBaikeEntityListRespEntityStatistics // 当前词条收到的反馈数据
    outer_info: GetBaikeEntityListRespEntityOuterInfo // 外部系统关联数据
    rich_text: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分
  }

  export interface GetBaikeEntityListRespEntityAliase {
    key: string // 名称的值
    display_status: GetBaikeEntityListRespEntityAliaseDisplayStatus // 名称展示范围
  }

  export interface GetBaikeEntityListRespEntityAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface GetBaikeEntityListRespEntityMainKey {
    key: string // 名称的值
    display_status: GetBaikeEntityListRespEntityMainKeyDisplayStatus // 名称展示范围
  }

  export interface GetBaikeEntityListRespEntityMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface GetBaikeEntityListRespEntityOuterInfo {
    provider: string // 外部系统（不能包含中横线 "-"）
    outer_id: string // 词条在外部系统中对应的唯一 ID（不能包含中横线 "-"）
  }

  export interface GetBaikeEntityListRespEntityRelatedMeta {
    users?: GetBaikeEntityListRespEntityRelatedMetaUser[] // 相关联系人
    chats?: GetBaikeEntityListRespEntityRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: GetBaikeEntityListRespEntityRelatedMetaDoc[] // 相关云文档
    oncalls?: GetBaikeEntityListRespEntityRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: GetBaikeEntityListRespEntityRelatedMetaLink[] // 相关链接
    abbreviations?: GetBaikeEntityListRespEntityRelatedMetaAbbreviation[] // 相关词条
    classifications?: GetBaikeEntityListRespEntityRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface GetBaikeEntityListRespEntityRelatedMetaAbbreviation {
    id: string // 相关词条 ID
  }

  export interface GetBaikeEntityListRespEntityRelatedMetaChat {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface GetBaikeEntityListRespEntityRelatedMetaClassification {
    id: string // 二级分类 ID
    name: string // 二级分类名称
    father_id: string // 对应一级分类 ID
  }

  export interface GetBaikeEntityListRespEntityRelatedMetaDoc {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface GetBaikeEntityListRespEntityRelatedMetaLink {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface GetBaikeEntityListRespEntityRelatedMetaOncall {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface GetBaikeEntityListRespEntityRelatedMetaUser {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface GetBaikeEntityListRespEntityStatistics {
    like_count: number // 累计点赞
    dislike_count: number // 当前词条版本收到的负反馈数量
  }

  export interface getBaikeEntityListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBaikeEntityListResp
  }

  export interface MatchBaikeEntityReq {
    word: string // 搜索关键词, 将与词条名、别名进行精准匹配, 示例值: "企业百科", 长度范围: `1` ～ `100` 字符
  }

  export interface MatchBaikeEntityResp {
    results?: MatchBaikeEntityRespResult[] // 搜索结果
  }

  export interface MatchBaikeEntityRespResult {
    entity_id: string // 词条 ID
    type: number // 命中的字段, 可选值有: 0: 词条名, 1: 全称, 2: 别名
  }

  export interface matchBaikeEntityResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: MatchBaikeEntityResp
  }

  export interface SearchBaikeEntityReq {
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "b152fa6e6f62a291019a04c3a93f365f8ac641910506ff15ff4cad6534e087cb4ed8fa2c"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    query: string // 搜索关键词, 示例值: "百科", 长度范围: `1` ～ `100` 字符
  }

  export interface SearchBaikeEntityResp {
    entities?: SearchBaikeEntityRespEntitie[] // 搜索结果
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface SearchBaikeEntityRespEntitie {
    id: string // 词条 ID （需要更新某个词条时填写, 若是创建新词条可不填写）
    main_keys?: SearchBaikeEntityRespEntitieMainKey[] // 词条名
    aliases?: SearchBaikeEntityRespEntitieAliase[] // 别名
    description: string // 词条释义（纯文本格式）
    create_time: string // 词条创建时间
    update_time: string // 词条最近更新时间
    related_meta: SearchBaikeEntityRespEntitieRelatedMeta // 更多相关信息
    categories?: string[] // 词条标签
    statistics: SearchBaikeEntityRespEntitieStatistics // 当前词条收到的反馈数据
    outer_info: SearchBaikeEntityRespEntitieOuterInfo // 外部系统关联数据
    rich_text: string // 富文本格式（当填写富文本内容时, description字段将会失效可不填写）, 支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分
  }

  export interface SearchBaikeEntityRespEntitieAliase {
    key: string // 名称的值
    display_status: SearchBaikeEntityRespEntitieAliaseDisplayStatus // 名称展示范围
  }

  export interface SearchBaikeEntityRespEntitieAliaseDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface SearchBaikeEntityRespEntitieMainKey {
    key: string // 名称的值
    display_status: SearchBaikeEntityRespEntitieMainKeyDisplayStatus // 名称展示范围
  }

  export interface SearchBaikeEntityRespEntitieMainKeyDisplayStatus {
    allow_highlight: boolean // 对应名称是否在消息/云文档高亮
    allow_search: boolean // 对应名称是否在搜索结果中展示
  }

  export interface SearchBaikeEntityRespEntitieOuterInfo {
    provider: string // 外部系统（不能包含中横线 "-"）
    outer_id: string // 词条在外部系统中对应的唯一 ID（不能包含中横线 "-"）
  }

  export interface SearchBaikeEntityRespEntitieRelatedMeta {
    users?: SearchBaikeEntityRespEntitieRelatedMetaUser[] // 相关联系人
    chats?: SearchBaikeEntityRespEntitieRelatedMetaChat[] // 相关服务中的相关公开群
    docs?: SearchBaikeEntityRespEntitieRelatedMetaDoc[] // 相关云文档
    oncalls?: SearchBaikeEntityRespEntitieRelatedMetaOncall[] // 相关服务中的相关值班号
    links?: SearchBaikeEntityRespEntitieRelatedMetaLink[] // 相关链接
    abbreviations?: SearchBaikeEntityRespEntitieRelatedMetaAbbreviation[] // 相关词条
    classifications?: SearchBaikeEntityRespEntitieRelatedMetaClassification[] // 当前词条所属分类, 词条只能属于二级分类, 且每个一级分类下只能选择一个二级分类。
  }

  export interface SearchBaikeEntityRespEntitieRelatedMetaAbbreviation {
    id: string // 相关词条 ID
  }

  export interface SearchBaikeEntityRespEntitieRelatedMetaChat {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface SearchBaikeEntityRespEntitieRelatedMetaClassification {
    id: string // 二级分类 ID
    name: string // 二级分类名称
    father_id: string // 对应一级分类 ID
  }

  export interface SearchBaikeEntityRespEntitieRelatedMetaDoc {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface SearchBaikeEntityRespEntitieRelatedMetaLink {
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface SearchBaikeEntityRespEntitieRelatedMetaOncall {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface SearchBaikeEntityRespEntitieRelatedMetaUser {
    id: string // 对应相关信息 ID
    title: string // 对应相关信息的描述, 如相关联系人的描述、相关链接的标题
    url: string // 链接地址
  }

  export interface SearchBaikeEntityRespEntitieStatistics {
    like_count: number // 累计点赞
    dislike_count: number // 当前词条版本收到的负反馈数量
  }

  export interface searchBaikeEntityResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SearchBaikeEntityResp
  }

  export interface HighlightBaikeEntityReq {
    text: string // 需要识别百科词条的内容（不超过1000字）, 示例值: "企业百科是飞书提供的一款知识管理工具", 长度范围: `1` ～ `1000` 字符
  }

  export interface HighlightBaikeEntityResp {
    phrases?: HighlightBaikeEntityRespPhrase[] // 识别到的词条信息
  }

  export interface HighlightBaikeEntityRespPhrase {
    name: string // 识别到的关键词
    entity_ids?: string[] // 对应的词条 ID
    span: HighlightBaikeEntityRespPhraseSpan // 词条所在位置
  }

  export interface HighlightBaikeEntityRespPhraseSpan {
    start: number // 关键词开始位置, 从 0 开始计数（编码格式采用 utf-8）
    end: number // 关键词结束位置, 从 0 开始计数（编码格式采用 utf-8）
  }

  export interface highlightBaikeEntityResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: HighlightBaikeEntityResp
  }

  export interface GetBaikeClassificationListReq {
    page_size?: number // 分页大小, 示例值: 20, 最大值: `500`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "408ecac018b2e3518db37275e812aad7bb8ad3e755fc886f322ac6c430ba"
  }

  export interface GetBaikeClassificationListResp {
    items?: GetBaikeClassificationListRespItem[] // 分类
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface GetBaikeClassificationListRespItem {
    id: string // 二级分类 ID
    name: string // 二级分类名称
    father_id: string // 对应一级分类 ID
  }

  export interface getBaikeClassificationListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBaikeClassificationListResp
  }
}

class CreateBaikeDraftReq {
  user_id_type?: any
  id?: any
  main_keys?: any
  aliases?: any
  description?: any
  related_meta?: any
  outer_info?: any
  rich_text?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      id: this.id,
      main_keys: this.main_keys,
      aliases: this.aliases,
      description: this.description,
      related_meta: this.related_meta,
      outer_info: this.outer_info,
      rich_text: this.rich_text
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

class CreateBaikeUpdateReq {
  draft_id?: any
  user_id_type?: any
  id?: any
  main_keys?: any
  aliases?: any
  description?: any
  related_meta?: any
  rich_text?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      id: this.id,
      main_keys: this.main_keys,
      aliases: this.aliases,
      description: this.description,
      related_meta: this.related_meta,
      rich_text: this.rich_text
    }
  }

  getPath(path: string) {
    path = path.replace(':draft_id', this.draft_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateBaikeEntityReq {
  user_id_type?: any
  main_keys?: any
  aliases?: any
  description?: any
  related_meta?: any
  outer_info?: any
  rich_text?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      main_keys: this.main_keys,
      aliases: this.aliases,
      description: this.description,
      related_meta: this.related_meta,
      outer_info: this.outer_info,
      rich_text: this.rich_text
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

class UpdateBaikeEntityReq {
  entity_id?: any
  user_id_type?: any
  main_keys?: any
  aliases?: any
  description?: any
  related_meta?: any
  outer_info?: any
  rich_text?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      main_keys: this.main_keys,
      aliases: this.aliases,
      description: this.description,
      related_meta: this.related_meta,
      outer_info: this.outer_info,
      rich_text: this.rich_text
    }
  }

  getPath(path: string) {
    path = path.replace(':entity_id', this.entity_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetBaikeEntityReq {
  entity_id?: any
  provider?: any
  outer_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':entity_id', this.entity_id)

    const q = {} as { [key: string]: any }
    if (this.provider !== undefined) {
      q['provider'] = this.provider
    }
    if (this.outer_id !== undefined) {
      q['outer_id'] = this.outer_id
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetBaikeEntityListReq {
  page_size?: any
  page_token?: any
  provider?: any
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
    if (this.provider !== undefined) {
      q['provider'] = this.provider
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class MatchBaikeEntityReq {
  word?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      word: this.word
    }
  }

  getPath(path: string) {
    return path
  }
}

class SearchBaikeEntityReq {
  page_token?: any
  page_size?: any
  user_id_type?: any
  query?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      query: this.query
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
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

class HighlightBaikeEntityReq {
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

class GetBaikeClassificationListReq {
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
