import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class SearchService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // createSearchDataSource 创建一个数据源
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/create
  async createSearchDataSource(
    request: Search.CreateSearchDataSourceReq
  ): Promise<{
    data: Search.CreateSearchDataSourceResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSearchDataSourceReq> = {
      scope: 'Search',
      api: 'CreateSearchDataSource',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/search/v2/data_sources',
      body: new CreateSearchDataSourceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateSearchDataSourceReq, Search.CreateSearchDataSourceResp>(req)
  }
  // getSearchDataSource 获取已经创建的数据源
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/get
  async getSearchDataSource(
    request: Search.GetSearchDataSourceReq
  ): Promise<{
    data: Search.GetSearchDataSourceResp
    response: Response
  }> {
    const req: RawRequestReq<GetSearchDataSourceReq> = {
      scope: 'Search',
      api: 'GetSearchDataSource',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/search/v2/data_sources/:data_source_id',
      body: new GetSearchDataSourceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetSearchDataSourceReq, Search.GetSearchDataSourceResp>(req)
  }
  // updateSearchDataSource 更新一个已经存在的数据源
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/patch
  async updateSearchDataSource(
    request: Search.UpdateSearchDataSourceReq
  ): Promise<{
    data: Search.UpdateSearchDataSourceResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSearchDataSourceReq> = {
      scope: 'Search',
      api: 'UpdateSearchDataSource',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/search/v2/data_sources/:data_source_id',
      body: new UpdateSearchDataSourceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateSearchDataSourceReq, Search.UpdateSearchDataSourceResp>(req)
  }
  // getSearchDataSourceList 批量获取创建的数据源信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/list
  async getSearchDataSourceList(
    request: Search.GetSearchDataSourceListReq
  ): Promise<{
    data: Search.GetSearchDataSourceListResp
    response: Response
  }> {
    const req: RawRequestReq<GetSearchDataSourceListReq> = {
      scope: 'Search',
      api: 'GetSearchDataSourceList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/search/v2/data_sources',
      body: new GetSearchDataSourceListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetSearchDataSourceListReq, Search.GetSearchDataSourceListResp>(req)
  }
  // deleteSearchDataSource 删除一个已存在的数据源
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/delete
  async deleteSearchDataSource(
    request: Search.DeleteSearchDataSourceReq
  ): Promise<{
    data: Search.DeleteSearchDataSourceResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSearchDataSourceReq> = {
      scope: 'Search',
      api: 'DeleteSearchDataSource',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/search/v2/data_sources/:data_source_id',
      body: new DeleteSearchDataSourceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteSearchDataSourceReq, Search.DeleteSearchDataSourceResp>(req)
  }
  // batchCreateSearchDataSourceItem 为提高索引数据记录的速度, 特提供批量索引数据记录的接口
  //
  // 注意: 一个batch中所有数据项的datasourceID需要一致, tenantID也需要一致
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/batch_create
  async batchCreateSearchDataSourceItem(
    request: Search.BatchCreateSearchDataSourceItemReq
  ): Promise<{
    data: Search.BatchCreateSearchDataSourceItemResp
    response: Response
  }> {
    const req: RawRequestReq<BatchCreateSearchDataSourceItemReq> = {
      scope: 'Search',
      api: 'BatchCreateSearchDataSourceItem',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/search/v2/data_sources/:data_source_id/items/batch_create',
      body: new BatchCreateSearchDataSourceItemReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchCreateSearchDataSourceItemReq,
      Search.BatchCreateSearchDataSourceItemResp
    >(req)
  }
  // createSearchDataSourceItem 索引一条数据记录
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/create
  async createSearchDataSourceItem(
    request: Search.CreateSearchDataSourceItemReq
  ): Promise<{
    data: Search.CreateSearchDataSourceItemResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSearchDataSourceItemReq> = {
      scope: 'Search',
      api: 'CreateSearchDataSourceItem',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/search/v2/data_sources/:data_source_id/items',
      body: new CreateSearchDataSourceItemReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CreateSearchDataSourceItemReq,
      Search.CreateSearchDataSourceItemResp
    >(req)
  }
  // getSearchDataSourceItem 获取单个数据记录
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/get
  async getSearchDataSourceItem(
    request: Search.GetSearchDataSourceItemReq
  ): Promise<{
    data: Search.GetSearchDataSourceItemResp
    response: Response
  }> {
    const req: RawRequestReq<GetSearchDataSourceItemReq> = {
      scope: 'Search',
      api: 'GetSearchDataSourceItem',
      method: 'GET',
      url:
        this.cli.openBaseURL + '/open-apis/search/v2/data_sources/:data_source_id/items/:item_id',
      body: new GetSearchDataSourceItemReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetSearchDataSourceItemReq, Search.GetSearchDataSourceItemResp>(req)
  }
  // deleteSearchDataSourceItem 删除数据项
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/delete
  async deleteSearchDataSourceItem(
    request: Search.DeleteSearchDataSourceItemReq
  ): Promise<{
    data: Search.DeleteSearchDataSourceItemResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSearchDataSourceItemReq> = {
      scope: 'Search',
      api: 'DeleteSearchDataSourceItem',
      method: 'DELETE',
      url:
        this.cli.openBaseURL + '/open-apis/search/v2/data_sources/:data_source_id/items/:item_id',
      body: new DeleteSearchDataSourceItemReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteSearchDataSourceItemReq,
      Search.DeleteSearchDataSourceItemResp
    >(req)
  }
  // updateSearchSchema 修改数据范式
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/patch
  async updateSearchSchema(
    request: Search.UpdateSearchSchemaReq
  ): Promise<{
    data: Search.UpdateSearchSchemaResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSearchSchemaReq> = {
      scope: 'Search',
      api: 'UpdateSearchSchema',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/search/v2/schemas/:schema_id',
      body: new UpdateSearchSchemaReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateSearchSchemaReq, Search.UpdateSearchSchemaResp>(req)
  }
  // deleteSearchSchema 删除已存在的数据范式
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/delete
  async deleteSearchSchema(
    request: Search.DeleteSearchSchemaReq
  ): Promise<{
    data: Search.DeleteSearchSchemaResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSearchSchemaReq> = {
      scope: 'Search',
      api: 'DeleteSearchSchema',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/search/v2/schemas/:schema_id',
      body: new DeleteSearchSchemaReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteSearchSchemaReq, Search.DeleteSearchSchemaResp>(req)
  }
  // getSearchSchema 获取单个数据范式
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/get
  async getSearchSchema(
    request: Search.GetSearchSchemaReq
  ): Promise<{
    data: Search.GetSearchSchemaResp
    response: Response
  }> {
    const req: RawRequestReq<GetSearchSchemaReq> = {
      scope: 'Search',
      api: 'GetSearchSchema',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/search/v2/schemas/:schema_id',
      body: new GetSearchSchemaReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetSearchSchemaReq, Search.GetSearchSchemaResp>(req)
  }
  // createSearchSchema 创建一个数据源
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/create
  async createSearchSchema(
    request: Search.CreateSearchSchemaReq
  ): Promise<{
    data: Search.CreateSearchSchemaResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSearchSchemaReq> = {
      scope: 'Search',
      api: 'CreateSearchSchema',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/search/v2/schemas',
      body: new CreateSearchSchemaReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateSearchSchemaReq, Search.CreateSearchSchemaResp>(req)
  }
}

export declare namespace Search {
  export interface CreateSearchDataSourceReq {
    name: string // data_source的展示名称, 示例值: "客服工单"
    state?: number // 数据源状态, 0-已上线, 1-未上线, 示例值: 0, 可选值有: 0: 已上线, 1: 未上线
    description?: string // 对于数据源的描述, 示例值: "搜索客服工单数据"
    icon_url?: string // 数据源在 search tab 上的展示图标路径, 示例值: "https://www.xxx.com/open.jpg"
    template?: string // 数据源采用的展示模版名称, 示例值: "search_common_card", 默认值: `search_common_card`
    searchable_fields?: string[] // 描述哪些字段可以被搜索, 示例值: ["field1", "field2"]（不推荐使用, 如果有定制搜索需求, 请用 schema 接口）
    i18n_name?: CreateSearchDataSourceReqI18nName // 数据源的国际化展示名称
    i18n_description?: CreateSearchDataSourceReqI18nDescription // 数据源的国际化描述
    schema_id?: string // 数据源关联的 schema 标识, 示例值: "custom_schema"
  }

  export interface CreateSearchDataSourceReqI18nDescription {
    zh_cn?: string // 国际化字段: 中文, 示例值: "任务"
    en_us?: string // 国际化字段: 英文, 示例值: "TODO"
    ja_jp?: string // 国际化字段: 日文, 示例值: "タスク"
  }

  export interface CreateSearchDataSourceReqI18nName {
    zh_cn?: string // 国际化字段: 中文, 示例值: "任务"
    en_us?: string // 国际化字段: 英文, 示例值: "TODO"
    ja_jp?: string // 国际化字段: 日文, 示例值: "タスク"
  }

  export interface CreateSearchDataSourceResp {
    data_source: CreateSearchDataSourceRespDataSource // 数据源实例
  }

  export interface CreateSearchDataSourceRespDataSource {
    id: string // 数据源的唯一标识
    name: string // data_source的展示名称
    state: number // 数据源状态, 0-已上线, 1-未上线, 可选值有: 0: 已上线, 1: 未上线
    description: string // 对于数据源的描述
    create_time: string // 创建时间, 使用Unix时间戳, 单位为“秒”
    update_time: string // 更新时间, 使用Unix时间戳, 单位为“秒”
    is_exceed_quota: boolean // 是否超限
    icon_url: string // 数据源在 search tab 上的展示图标路径
    template: string // 数据源采用的展示模版名称
    searchable_fields?: string[] // 描述哪些字段可以被搜索
    i18n_name: CreateSearchDataSourceRespDataSourceI18nName // 数据源的国际化展示名称
    i18n_description: CreateSearchDataSourceRespDataSourceI18nDescription // 数据源的国际化描述
    schema_id: string // 数据源关联的 schema 标识
  }

  export interface CreateSearchDataSourceRespDataSourceI18nDescription {
    zh_cn: string // 国际化字段: 中文
    en_us: string // 国际化字段: 英文
    ja_jp: string // 国际化字段: 日文
  }

  export interface CreateSearchDataSourceRespDataSourceI18nName {
    zh_cn: string // 国际化字段: 中文
    en_us: string // 国际化字段: 英文
    ja_jp: string // 国际化字段: 日文
  }

  export interface createSearchDataSourceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateSearchDataSourceResp
  }

  export interface GetSearchDataSourceReq {
    data_source_id: string // 数据源的唯一标识, 示例值: "service_ticket"
  }

  export interface GetSearchDataSourceResp {
    data_source: GetSearchDataSourceRespDataSource // 数据源实例
  }

  export interface GetSearchDataSourceRespDataSource {
    id: string // 数据源的唯一标识
    name: string // data_source的展示名称
    state: number // 数据源状态, 0-已上线, 1-未上线, 可选值有: 0: 已上线, 1: 未上线
    description: string // 对于数据源的描述
    create_time: string // 创建时间, 使用Unix时间戳, 单位为“秒”
    update_time: string // 更新时间, 使用Unix时间戳, 单位为“秒”
    is_exceed_quota: boolean // 是否超限
    icon_url: string // 数据源在 search tab 上的展示图标路径
    template: string // 数据源采用的展示模版名称
    searchable_fields?: string[] // 描述哪些字段可以被搜索
    i18n_name: GetSearchDataSourceRespDataSourceI18nName // 数据源的国际化展示名称
    i18n_description: GetSearchDataSourceRespDataSourceI18nDescription // 数据源的国际化描述
    schema_id: string // 数据源关联的 schema 标识
  }

  export interface GetSearchDataSourceRespDataSourceI18nDescription {
    zh_cn: string // 国际化字段: 中文
    en_us: string // 国际化字段: 英文
    ja_jp: string // 国际化字段: 日文
  }

  export interface GetSearchDataSourceRespDataSourceI18nName {
    zh_cn: string // 国际化字段: 中文
    en_us: string // 国际化字段: 英文
    ja_jp: string // 国际化字段: 日文
  }

  export interface getSearchDataSourceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetSearchDataSourceResp
  }

  export interface UpdateSearchDataSourceReq {
    data_source_id: string // 数据源的唯一标识, 示例值: "service_ticket"
    name?: string // 数据源的展示名称, 示例值: "客服工单"
    state?: number // 数据源状态, 0-已上线, 1-未上线, 示例值: 0, 可选值有: 0: 已上线, 1: 未上线
    description?: string // 对于数据源的描述, 示例值: "搜索客服工单"
    icon_url?: string // 数据源在 search tab 上的展示图标路径, 示例值: "https://www.xxx.com/open.jpg"
    i18n_name?: UpdateSearchDataSourceReqI18nName // 数据源名称多语言配置, json格式, key为语言locale, value为对应文案, 例如{"zh_cn":"测试数据源", "en_us":"Test DataSource"}
    i18n_description?: UpdateSearchDataSourceReqI18nDescription // 数据源描述多语言配置, json格式, key为语言locale, value为对应文案, 例如{"zh_cn":"搜索测试数据源相关数据", "en_us":"Search data from Test DataSource"}
  }

  export interface UpdateSearchDataSourceReqI18nDescription {
    zh_cn?: string // 国际化字段: 中文, 示例值: "任务"
    en_us?: string // 国际化字段: 英文, 示例值: "TODO"
    ja_jp?: string // 国际化字段: 日文, 示例值: "タスク"
  }

  export interface UpdateSearchDataSourceReqI18nName {
    title: string // 该条数据记录对应的标题, 示例值: "工单: 无法创建文章"
    source_url: string // 该条数据记录对应的跳转url, 示例值: "http://www.abc.com.cn"
    create_time?: number // 数据项的创建时间。Unix 时间, 单位为秒, 示例值: 1618831236
    update_time?: number // 数据项的更新时间。Unix 时间, 单位为秒, 示例值: 1618831236
    source_url_mobile?: string // 移动端搜索命中的跳转地址。如果您PC端和移动端有不同的跳转地址, 可以在这里写入移动端专用的url, 我们会在搜索时为您选择合适的地址, 示例值: "https://www.feishu.cn"
  }

  export interface UpdateSearchDataSourceResp {
    data_source: UpdateSearchDataSourceRespDataSource // 数据源
  }

  export interface UpdateSearchDataSourceRespDataSource {
    id: string // 数据源的唯一标识
    name: string // data_source的展示名称
    state: number // 数据源状态, 0-已上线, 1-未上线, 可选值有: 0: 已上线, 1: 未上线
    description: string // 对于数据源的描述
    create_time: string // 创建时间, 使用Unix时间戳, 单位为“秒”
    update_time: string // 更新时间, 使用Unix时间戳, 单位为“秒”
    is_exceed_quota: boolean // 是否超限
    icon_url: string // 数据源在 search tab 上的展示图标路径
    template: string // 数据源采用的展示模版名称
    searchable_fields?: string[] // 描述哪些字段可以被搜索
    i18n_name: UpdateSearchDataSourceRespDataSourceI18nName // 数据源的国际化展示名称
    i18n_description: UpdateSearchDataSourceRespDataSourceI18nDescription // 数据源的国际化描述
    schema_id: string // 数据源关联的 schema 标识
  }

  export interface UpdateSearchDataSourceRespDataSourceI18nDescription {
    zh_cn: string // 国际化字段: 中文
    en_us: string // 国际化字段: 英文
    ja_jp: string // 国际化字段: 日文
  }

  export interface UpdateSearchDataSourceRespDataSourceI18nName {
    zh_cn: string // 国际化字段: 中文
    en_us: string // 国际化字段: 英文
    ja_jp: string // 国际化字段: 日文
  }

  export interface updateSearchDataSourceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateSearchDataSourceResp
  }

  export interface GetSearchDataSourceListReq {
    view?: number // 回包数据格式, 0-全量数据；1-摘要数据, 注: 摘要数据仅包含"id", "name", "state", 示例值: 0, 可选值有: 0: 全量数据, 1: 摘要数据
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "PxZFma9OIRhdBlT/dOYNiu2Ro8F2WAhcby7OhOijfljZ"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
  }

  export interface GetSearchDataSourceListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetSearchDataSourceListRespItem[] // 数据源中的数据记录
  }

  export interface GetSearchDataSourceListRespItem {
    id: string // 数据源的唯一标识
    name: string // data_source的展示名称
    state: number // 数据源状态, 0-已上线, 1-未上线, 可选值有: 0: 已上线, 1: 未上线
    description: string // 对于数据源的描述
    create_time: string // 创建时间, 使用Unix时间戳, 单位为“秒”
    update_time: string // 更新时间, 使用Unix时间戳, 单位为“秒”
    is_exceed_quota: boolean // 是否超限
    icon_url: string // 数据源在 search tab 上的展示图标路径
    template: string // 数据源采用的展示模版名称
    searchable_fields?: string[] // 描述哪些字段可以被搜索
    i18n_name: GetSearchDataSourceListRespItemI18nName // 数据源的国际化展示名称
    i18n_description: GetSearchDataSourceListRespItemI18nDescription // 数据源的国际化描述
    schema_id: string // 数据源关联的 schema 标识
  }

  export interface GetSearchDataSourceListRespItemI18nDescription {
    zh_cn: string // 国际化字段: 中文
    en_us: string // 国际化字段: 英文
    ja_jp: string // 国际化字段: 日文
  }

  export interface GetSearchDataSourceListRespItemI18nName {
    zh_cn: string // 国际化字段: 中文
    en_us: string // 国际化字段: 英文
    ja_jp: string // 国际化字段: 日文
  }

  export interface getSearchDataSourceListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetSearchDataSourceListResp
  }

  export interface DeleteSearchDataSourceReq {
    data_source_id: string // 数据源的唯一标识, 示例值: "6953903108179099667"
  }

  export interface DeleteSearchDataSourceResp {}

  export interface deleteSearchDataSourceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteSearchDataSourceResp
  }

  export interface BatchCreateSearchDataSourceItemReq {
    data_source_id: string // 数据源的ID, 示例值: "service_ticket"
    items?: BatchCreateSearchDataSourceItemReqItem[] // 待进入索引的item列表
  }

  export interface BatchCreateSearchDataSourceItemReqItem {
    id: string // item 在 datasource 中的唯一标识, 示例值: "01010111"
    acl?: BatchCreateSearchDataSourceItemReqItemACL[] // item 的访问权限控制。 acl 字段为空数组, 则默认数据不可见。如果数据是全员可见, 需要设置 access="allow"; type="user"; value="everyone"
    metadata: BatchCreateSearchDataSourceItemReqItemMetadata // item 的元信息
    structured_data: string // 结构化数据（以 json 字符串传递）, 这些字段是搜索结果的展示字段（title字段无须在此另外指定）；, 示例值: "{"key":"value"}"
    content?: BatchCreateSearchDataSourceItemReqItemContent // 非结构化数据, 如文档文本, 飞书搜索会用来做召回
  }

  export interface BatchCreateSearchDataSourceItemReqItemACL {
    access?: string // 权限类型, 优先级: Deny > Allow, 示例值: "allow", 可选值有: `allow`: 允许访问, `deny`: 禁止访问
    value?: string // 设置的权限值, 例如 userID, 依赖 type 描述, 注: 在 type 为 user 且 access 为 allow 时, 可填 "everyone" 来表示该数据项对全员可见；, 示例值: "d35e3c23"
    type?: string // 权限值类型, 示例值: "user", 可选值有: `user`: 访问权限控制中指定“用户”可以访问或拒绝访问该条数据
  }

  export interface BatchCreateSearchDataSourceItemReqItemContent {
    format?: string // 内容的格式, 示例值: "html", 可选值有: `html`: html格式, `plaintext`: 纯文本格式
    content_data?: string // 全文数据, 示例值: "这是一个很长的文本"
  }

  export interface BatchCreateSearchDataSourceItemReqItemMetadata {
    title: string // 该条数据记录对应的标题, 示例值: "工单: 无法创建文章"
    source_url: string // 该条数据记录对应的跳转url, 示例值: "http://www.abc.com.cn"
    create_time?: number // 数据项的创建时间。Unix 时间, 单位为秒, 示例值: 1618831236
    update_time: number // 数据项的更新时间。Unix 时间, 单位为秒, 示例值: 1618831236
  }

  export interface BatchCreateSearchDataSourceItemResp {
    result: BatchCreateSearchDataSourceItemRespResult // 返回信息列表
  }

  export interface BatchCreateSearchDataSourceItemRespResult {
    item_id: string // itemID
    is_success: boolean // 该数据项是否成功发往索引, 注意: 存在极端情况该字段为True, 但并未进入索引
    err: string // 若该数据项索引失败, 则表示该数据的失败信息
  }

  export interface batchCreateSearchDataSourceItemResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchCreateSearchDataSourceItemResp
  }

  export interface CreateSearchDataSourceItemReq {
    data_source_id: string // 数据源的ID, 示例值: "service_ticket"
    id: string // item 在 datasource 中的唯一标识, 示例值: "01010111", 最大长度: `50` 字符
    acl?: CreateSearchDataSourceItemReqACL[] // item 的访问权限控制。 acl 字段为空数组, 则默认数据不可见。如果数据是全员可见, 需要设置 access="allow"; type="user"; value="everyone"
    metadata: CreateSearchDataSourceItemReqMetadata // item 的元信息
    structured_data: string // 结构化数据（以 json 字符串传递）, 这些字段是搜索结果的展示字段（title字段无须在此另外指定）；, 示例值: "{\"key\":\"value\"}"
    content?: CreateSearchDataSourceItemReqContent // 非结构化数据, 如文档文本, 飞书搜索会用来做召回
    field_acl?: string // $$$search.v2.type.item.prop.field_acl.desc$$$, 示例值: "$$$search.v2.type.item.prop.field_acl.string.example$$$"
  }

  export interface CreateSearchDataSourceItemReqACL {
    access?: string // 权限类型, 优先级: Deny > Allow, 示例值: "allow", 可选值有: `allow`: 允许访问, `deny`: 禁止访问
    value?: string // 设置的权限值, 例如 userID, 依赖 type 描述, 注: 在 type 为 user 且 access 为 allow 时, 可填 "everyone" 来表示该数据项对全员可见；, 示例值: "d35e3c23"
    type?: string // 权限值类型, 示例值: "user", 可选值有: `user`: 访问权限控制中指定“用户”可以访问或拒绝访问该条数据, `group`: (已下线)访问权限控制中指定“用户组”可以访问或拒绝访问该条数据
  }

  export interface CreateSearchDataSourceItemReqContent {
    format?: string // 内容的格式, 示例值: "html", 可选值有: `html`: html格式, `plaintext`: 纯文本格式
    content_data?: string // 全文数据, 示例值: "这是一个很长的文本"
  }

  export interface CreateSearchDataSourceItemReqMetadata {
    title: string // 该条数据记录对应的标题, 示例值: "工单: 无法创建文章"
    source_url: string // 该条数据记录对应的跳转url, 示例值: "http://www.abc.com.cn"
    create_time?: number // 数据项的创建时间。Unix 时间, 单位为秒, 示例值: 1618831236
    update_time?: number // 数据项的更新时间。Unix 时间, 单位为秒, 示例值: 1618831236
    source_url_mobile?: string // 移动端搜索命中的跳转地址。如果您PC端和移动端有不同的跳转地址, 可以在这里写入移动端专用的url, 我们会在搜索时为您选择合适的地址, 示例值: "https://www.feishu.cn"
  }

  export interface CreateSearchDataSourceItemResp {}

  export interface createSearchDataSourceItemResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateSearchDataSourceItemResp
  }

  export interface GetSearchDataSourceItemReq {
    data_source_id: string // 数据源的id, 示例值: "service_ticket"
    item_id: string // 数据记录的唯一标识, 示例值: "01010111"
  }

  export interface GetSearchDataSourceItemResp {
    item: GetSearchDataSourceItemRespItem // 数据项实例
  }

  export interface GetSearchDataSourceItemRespItem {
    id: string // item 在 datasource 中的唯一标识
    acl?: GetSearchDataSourceItemRespItemACL[] // item 的访问权限控制。 acl 字段为空数组, 则默认数据不可见。如果数据是全员可见, 需要设置 access="allow"; type="user"; value="everyone"
    metadata: GetSearchDataSourceItemRespItemMetadata // item 的元信息
    structured_data: string // 结构化数据（以 json 字符串传递）, 这些字段是搜索结果的展示字段（title字段无须在此另外指定）；
    content: GetSearchDataSourceItemRespItemContent // 非结构化数据, 如文档文本, 飞书搜索会用来做召回
  }

  export interface GetSearchDataSourceItemRespItemACL {
    access: string // 权限类型, 优先级: Deny > Allow, 可选值有: `allow`: 允许访问, `deny`: 禁止访问
    value: string // 设置的权限值, 例如 userID, 依赖 type 描述, 注: 在 type 为 user 且 access 为 allow 时, 可填 "everyone" 来表示该数据项对全员可见；
    type: string // 权限值类型, 可选值有: `user`: 访问权限控制中指定“用户”可以访问或拒绝访问该条数据, `group`: (已下线)访问权限控制中指定“用户组”可以访问或拒绝访问该条数据
  }

  export interface GetSearchDataSourceItemRespItemContent {
    format: string // 内容的格式, 可选值有: `html`: html格式, `plaintext`: 纯文本格式
    content_data: string // 全文数据
  }

  export interface GetSearchDataSourceItemRespItemMetadata {
    title: string // 该条数据记录对应的标题
    source_url: string // 该条数据记录对应的跳转url
    create_time: number // 数据项的创建时间。Unix 时间, 单位为秒
    update_time: number // 数据项的更新时间。Unix 时间, 单位为秒
  }

  export interface getSearchDataSourceItemResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetSearchDataSourceItemResp
  }

  export interface DeleteSearchDataSourceItemReq {
    data_source_id: string // 数据源的ID, 示例值: "service_ticket"
    item_id: string // 数据记录的ID, 示例值: "01010111"
  }

  export interface DeleteSearchDataSourceItemResp {}

  export interface deleteSearchDataSourceItemResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteSearchDataSourceItemResp
  }

  export interface UpdateSearchSchemaReq {
    schema_id: string // 用户自定义数据范式的唯一标识, 示例值: "custom_schema_id", 最大长度: `40` 字符, 正则校验: `^[a-zA-Z][a-zA-Z0-9-_].*$`
    display?: UpdateSearchSchemaReqDisplay // 数据展示相关配置
  }

  export interface UpdateSearchSchemaReqDisplay {
    card_key: string // 搜索数据的展示卡片, 示例值: "search_common_card", 可选值有: search_common_card: 普通 common 卡片
    fields_mapping?: UpdateSearchSchemaReqDisplayFieldsMapping[] // 数据字段名称和展示字段名称的映射关系。如果没有设置, 则只会展示 与展示字段名称同名的 数据字段
  }

  export interface UpdateSearchSchemaReqDisplayFieldsMapping {
    display_field: string // 展示字段名称, 与 card_key 有关, 每个模版能展示的字段不同。该字段不能重复, 示例值: "summary"
    data_field: string // 数据字段的名称。需要确保该字段对应在 schema 属性定义中的 is_returnable 为 true, 否则无法展示。需要使用 ${xxx} 的规则来描述, 示例值: "${description}"
  }

  export interface UpdateSearchSchemaResp {
    schema: UpdateSearchSchemaRespSchema // 数据范式实例
  }

  export interface UpdateSearchSchemaRespSchema {
    properties?: UpdateSearchSchemaRespSchemaPropertie[] // 数据范式的属性定义
    display: UpdateSearchSchemaRespSchemaDisplay // 数据展示相关配置
    schema_id: string // 用户自定义数据范式的唯一标识
  }

  export interface UpdateSearchSchemaRespSchemaDisplay {
    card_key: string // 搜索数据的展示卡片, 可选值有: search_common_card: 普通 common 卡片
    fields_mapping?: UpdateSearchSchemaRespSchemaDisplayFieldsMapping[] // 数据字段名称和展示字段名称的映射关系。如果没有设置, 则只会展示 与展示字段名称同名的 数据字段
  }

  export interface UpdateSearchSchemaRespSchemaDisplayFieldsMapping {
    display_field: string // 展示字段名称, 与 card_key 有关, 每个模版能展示的字段不同。该字段不能重复
    data_field: string // 数据字段的名称。需要确保该字段对应在 schema 属性定义中的 is_returnable 为 true, 否则无法展示。需要使用 ${xxx} 的规则来描述
  }

  export interface UpdateSearchSchemaRespSchemaPropertie {
    name: string // 属性名
    type: string // 属性类型, 可选值有: text: -长文本类型, 长度大于20的文本, int: 64位整数类型, tag: 标签类型, timestamp: Unix 时间戳类型（单位为秒）, double: 浮点数类型（小数）, tinytext: 短文本类型, 长度小于等于20的文本
    is_searchable: boolean // 该属性是否可用作搜索, 默认为 false
    is_sortable: boolean // 该属性是否可用作搜索结果排序, 默认为 false。如果为 true, 需要再配置 sortOptions
    is_returnable: boolean // 该属性是否可用作返回字段, 为 false 时, 该字段不会被召回和展示。默认为 false
    sort_options: UpdateSearchSchemaRespSchemaPropertieSortOptions // 属性排序的可选配置, 当 is_sortable 为 true 时, 该字段为必填字段
    type_definitions: UpdateSearchSchemaRespSchemaPropertieTypeDefinitions // 相关类型数据的定义和约束
    search_options: UpdateSearchSchemaRespSchemaPropertieSearchOptions // 属性搜索的可选配置, 当 is_searchable 为 true 时, 该字段为必填参数
  }

  export interface UpdateSearchSchemaRespSchemaPropertieSearchOptions {
    enable_semantic_match: boolean // 是否支持语义切词召回。默认不支持（推荐使用在长文本的场景）
    enable_exact_match: boolean // 是否支持精确匹配。默认不支持（推荐使用在短文本、需要精确查找的场景）
    enable_prefix_match: boolean // 是否支持前缀匹配（短文本的默认的分词/召回策略。前缀长度为 1-12）
    enable_number_suffix_match: boolean // 是否支持数据后缀匹配。默认不支持（推荐使用在短文本、有数字后缀查找的场景。后缀长度为3-12）
    enable_camel_match: boolean // 是否支持驼峰英文匹配。默认不支持（推荐使用在短文本, 且包含驼峰形式英文的查找场景）
  }

  export interface UpdateSearchSchemaRespSchemaPropertieSortOptions {
    priority: number // 排序的优先级, 可选范围为 0~4, 0为最高优先级。如果优先级相同, 则随机进行排序。默认为0, 可选值有: 0: 最高优先级, 1: 次高优先级, 2: 次次高优先级, 3: 次低优先级, 4: 最低优先级
    order: string // 排序的顺序。默认为 desc, 可选值有: asc: 升序, desc: 降序
  }

  export interface UpdateSearchSchemaRespSchemaPropertieTypeDefinitions {
    tag?: UpdateSearchSchemaRespSchemaPropertieTypeDefinitionsTag[] // 标签类型的定义
  }

  export interface UpdateSearchSchemaRespSchemaPropertieTypeDefinitionsTag {
    name: string // tag 对应的枚举值名称
    color: string // 标签对应的颜色, 可选值有: red: 含警示性、敏感性的提示信息, green: 表示成功、完成、完毕的提示信息, blue: 组件架构、职能等中性信息, grey: 中立系统提示信息（慎重使用）, yellow: 焦点信息、推广性信息
    text: string // 标签中展示的文本
  }

  export interface updateSearchSchemaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateSearchSchemaResp
  }

  export interface DeleteSearchSchemaReq {
    schema_id: string // 用户自定义数据范式的唯一标识, 示例值: "custom_schema_id", 最大长度: `40` 字符, 正则校验: `^[a-zA-Z][a-zA-Z0-9-_].*$`
  }

  export interface DeleteSearchSchemaResp {}

  export interface deleteSearchSchemaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteSearchSchemaResp
  }

  export interface GetSearchSchemaReq {
    schema_id: string // 用户自定义数据范式的唯一标识, 示例值: "custom_schema_id", 最大长度: `40` 字符, 正则校验: `^[a-zA-Z][a-zA-Z0-9-_].*$`
  }

  export interface GetSearchSchemaResp {
    schema: GetSearchSchemaRespSchema // 数据范式
  }

  export interface GetSearchSchemaRespSchema {
    properties?: GetSearchSchemaRespSchemaPropertie[] // 数据范式的属性定义
    display: GetSearchSchemaRespSchemaDisplay // 数据展示相关配置
    schema_id: string // 用户自定义数据范式的唯一标识
  }

  export interface GetSearchSchemaRespSchemaDisplay {
    card_key: string // 搜索数据的展示卡片, 可选值有: search_common_card: 普通 common 卡片
    fields_mapping?: GetSearchSchemaRespSchemaDisplayFieldsMapping[] // 数据字段名称和展示字段名称的映射关系。如果没有设置, 则只会展示 与展示字段名称同名的 数据字段
  }

  export interface GetSearchSchemaRespSchemaDisplayFieldsMapping {
    display_field: string // 展示字段名称, 与 card_key 有关, 每个模版能展示的字段不同。该字段不能重复
    data_field: string // 数据字段的名称。需要确保该字段对应在 schema 属性定义中的 is_returnable 为 true, 否则无法展示。需要使用 ${xxx} 的规则来描述
  }

  export interface GetSearchSchemaRespSchemaPropertie {
    name: string // 属性名
    type: string // 属性类型, 可选值有: text: -长文本类型, 长度大于20的文本, int: 64位整数类型, tag: 标签类型, timestamp: Unix 时间戳类型（单位为秒）, double: 浮点数类型（小数）, tinytext: 短文本类型, 长度小于等于20的文本
    is_searchable: boolean // 该属性是否可用作搜索, 默认为 false
    is_sortable: boolean // 该属性是否可用作搜索结果排序, 默认为 false。如果为 true, 需要再配置 sortOptions
    is_returnable: boolean // 该属性是否可用作返回字段, 为 false 时, 该字段不会被召回和展示。默认为 false
    sort_options: GetSearchSchemaRespSchemaPropertieSortOptions // 属性排序的可选配置, 当 is_sortable 为 true 时, 该字段为必填字段
    type_definitions: GetSearchSchemaRespSchemaPropertieTypeDefinitions // 相关类型数据的定义和约束
    search_options: GetSearchSchemaRespSchemaPropertieSearchOptions // 属性搜索的可选配置, 当 is_searchable 为 true 时, 该字段为必填参数
  }

  export interface GetSearchSchemaRespSchemaPropertieSearchOptions {
    enable_semantic_match: boolean // 是否支持语义切词召回。默认不支持（推荐使用在长文本的场景）
    enable_exact_match: boolean // 是否支持精确匹配。默认不支持（推荐使用在短文本、需要精确查找的场景）
    enable_prefix_match: boolean // 是否支持前缀匹配（短文本的默认的分词/召回策略。前缀长度为 1-12）
    enable_number_suffix_match: boolean // 是否支持数据后缀匹配。默认不支持（推荐使用在短文本、有数字后缀查找的场景。后缀长度为3-12）
    enable_camel_match: boolean // 是否支持驼峰英文匹配。默认不支持（推荐使用在短文本, 且包含驼峰形式英文的查找场景）
  }

  export interface GetSearchSchemaRespSchemaPropertieSortOptions {
    priority: number // 排序的优先级, 可选范围为 0~4, 0为最高优先级。如果优先级相同, 则随机进行排序。默认为0, 可选值有: 0: 最高优先级, 1: 次高优先级, 2: 次次高优先级, 3: 次低优先级, 4: 最低优先级
    order: string // 排序的顺序。默认为 desc, 可选值有: asc: 升序, desc: 降序
  }

  export interface GetSearchSchemaRespSchemaPropertieTypeDefinitions {
    tag?: GetSearchSchemaRespSchemaPropertieTypeDefinitionsTag[] // 标签类型的定义
  }

  export interface GetSearchSchemaRespSchemaPropertieTypeDefinitionsTag {
    name: string // tag 对应的枚举值名称
    color: string // 标签对应的颜色, 可选值有: red: 含警示性、敏感性的提示信息, green: 表示成功、完成、完毕的提示信息, blue: 组件架构、职能等中性信息, grey: 中立系统提示信息（慎重使用）, yellow: 焦点信息、推广性信息
    text: string // 标签中展示的文本
  }

  export interface getSearchSchemaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetSearchSchemaResp
  }

  export interface CreateSearchSchemaReq {
    validate_only?: boolean // 是否只用来校验合法性, 示例值: true, 默认值: `false`
    properties?: CreateSearchSchemaReqPropertie[] // 数据范式的属性定义
    display: CreateSearchSchemaReqDisplay // 数据展示相关配置
    schema_id: string // 用户自定义数据范式的唯一标识, 示例值: "jira_schema", 最大长度: `40` 字符, 正则校验: `^[a-zA-Z][a-zA-Z0-9-_].*$`
  }

  export interface CreateSearchSchemaReqDisplay {
    card_key: string // 搜索数据的展示卡片, 示例值: "search_common_card", 可选值有: search_common_card: 普通 common 卡片
    fields_mapping?: CreateSearchSchemaReqDisplayFieldsMapping[] // 数据字段名称和展示字段名称的映射关系。如果没有设置, 则只会展示 与展示字段名称同名的 数据字段
  }

  export interface CreateSearchSchemaReqDisplayFieldsMapping {
    display_field: string // 展示字段名称, 与 card_key 有关, 每个模版能展示的字段不同。该字段不能重复, 示例值: "summary"
    data_field: string // 数据字段的名称。需要确保该字段对应在 schema 属性定义中的 is_returnable 为 true, 否则无法展示。需要使用 ${xxx} 的规则来描述, 示例值: "${description}"
  }

  export interface CreateSearchSchemaReqPropertie {
    name: string // 属性名, 示例值: "summary", 最大长度: `20` 字符
    type: string // 属性类型, 示例值: "text", 可选值有: text: -长文本类型, 长度大于20的文本, int: 64位整数类型, tag: 标签类型, timestamp: Unix 时间戳类型（单位为秒）, double: 浮点数类型（小数）, tinytext: 短文本类型, 长度小于等于20的文本
    is_searchable?: boolean // 该属性是否可用作搜索, 默认为 false, 示例值: true
    is_sortable?: boolean // 该属性是否可用作搜索结果排序, 默认为 false。如果为 true, 需要再配置 sortOptions, 示例值: false
    is_returnable?: boolean // 该属性是否可用作返回字段, 为 false 时, 该字段不会被召回和展示。默认为 false, 示例值: true
    sort_options?: CreateSearchSchemaReqPropertieSortOptions // 属性排序的可选配置, 当 is_sortable 为 true 时, 该字段为必填字段
    type_definitions?: CreateSearchSchemaReqPropertieTypeDefinitions // 相关类型数据的定义和约束
    search_options?: CreateSearchSchemaReqPropertieSearchOptions // 属性搜索的可选配置, 当 is_searchable 为 true 时, 该字段为必填参数
  }

  export interface CreateSearchSchemaReqPropertieSearchOptions {
    enable_semantic_match?: boolean // 是否支持语义切词召回。默认不支持（推荐使用在长文本的场景）, 示例值: true
    enable_exact_match?: boolean // 是否支持精确匹配。默认不支持（推荐使用在短文本、需要精确查找的场景）, 示例值: false
    enable_prefix_match?: boolean // 是否支持前缀匹配（短文本的默认的分词/召回策略。前缀长度为 1-12）, 示例值: false
    enable_number_suffix_match?: boolean // 是否支持数据后缀匹配。默认不支持（推荐使用在短文本、有数字后缀查找的场景。后缀长度为3-12）, 示例值: false
    enable_camel_match?: boolean // 是否支持驼峰英文匹配。默认不支持（推荐使用在短文本, 且包含驼峰形式英文的查找场景）, 示例值: false
  }

  export interface CreateSearchSchemaReqPropertieSortOptions {
    priority?: number // 排序的优先级, 可选范围为 0~4, 0为最高优先级。如果优先级相同, 则随机进行排序。默认为0, 示例值: 0, 可选值有: 0: 最高优先级, 1: 次高优先级, 2: 次次高优先级, 3: 次低优先级, 4: 最低优先级, 默认值: `0`, 取值范围: `0` ～ `4`
    order?: string // 排序的顺序。默认为 desc, 示例值: "asc", 可选值有: asc: 升序, desc: 降序, 默认值: `desc`
  }

  export interface CreateSearchSchemaReqPropertieTypeDefinitions {
    tag?: CreateSearchSchemaReqPropertieTypeDefinitionsTag[] // 标签类型的定义, 最大长度: `10`
  }

  export interface CreateSearchSchemaReqPropertieTypeDefinitionsTag {
    name: string // tag 对应的枚举值名称, 示例值: "status", 最大长度: `20` 字符
    color: string // 标签对应的颜色, 示例值: "blue", 可选值有: red: 含警示性、敏感性的提示信息, green: 表示成功、完成、完毕的提示信息, blue: 组件架构、职能等中性信息, grey: 中立系统提示信息（慎重使用）, yellow: 焦点信息、推广性信息
    text: string // 标签中展示的文本, 示例值: "PASS", 最大长度: `8` 字符
  }

  export interface CreateSearchSchemaResp {
    schema: CreateSearchSchemaRespSchema // 数据范式实例
  }

  export interface CreateSearchSchemaRespSchema {
    properties?: CreateSearchSchemaRespSchemaPropertie[] // 数据范式的属性定义
    display: CreateSearchSchemaRespSchemaDisplay // 数据展示相关配置
    schema_id: string // 用户自定义数据范式的唯一标识
  }

  export interface CreateSearchSchemaRespSchemaDisplay {
    card_key: string // 搜索数据的展示卡片, 可选值有: search_common_card: 普通 common 卡片
    fields_mapping?: CreateSearchSchemaRespSchemaDisplayFieldsMapping[] // 数据字段名称和展示字段名称的映射关系。如果没有设置, 则只会展示 与展示字段名称同名的 数据字段
  }

  export interface CreateSearchSchemaRespSchemaDisplayFieldsMapping {
    display_field: string // 展示字段名称, 与 card_key 有关, 每个模版能展示的字段不同。该字段不能重复
    data_field: string // 数据字段的名称。需要确保该字段对应在 schema 属性定义中的 is_returnable 为 true, 否则无法展示。需要使用 ${xxx} 的规则来描述
  }

  export interface CreateSearchSchemaRespSchemaPropertie {
    name: string // 属性名
    type: string // 属性类型, 可选值有: text: -长文本类型, 长度大于20的文本, int: 64位整数类型, tag: 标签类型, timestamp: Unix 时间戳类型（单位为秒）, double: 浮点数类型（小数）, tinytext: 短文本类型, 长度小于等于20的文本
    is_searchable: boolean // 该属性是否可用作搜索, 默认为 false
    is_sortable: boolean // 该属性是否可用作搜索结果排序, 默认为 false。如果为 true, 需要再配置 sortOptions
    is_returnable: boolean // 该属性是否可用作返回字段, 为 false 时, 该字段不会被召回和展示。默认为 false
    sort_options: CreateSearchSchemaRespSchemaPropertieSortOptions // 属性排序的可选配置, 当 is_sortable 为 true 时, 该字段为必填字段
    type_definitions: CreateSearchSchemaRespSchemaPropertieTypeDefinitions // 相关类型数据的定义和约束
    search_options: CreateSearchSchemaRespSchemaPropertieSearchOptions // 属性搜索的可选配置, 当 is_searchable 为 true 时, 该字段为必填参数
  }

  export interface CreateSearchSchemaRespSchemaPropertieSearchOptions {
    enable_semantic_match: boolean // 是否支持语义切词召回。默认不支持（推荐使用在长文本的场景）
    enable_exact_match: boolean // 是否支持精确匹配。默认不支持（推荐使用在短文本、需要精确查找的场景）
    enable_prefix_match: boolean // 是否支持前缀匹配（短文本的默认的分词/召回策略。前缀长度为 1-12）
    enable_number_suffix_match: boolean // 是否支持数据后缀匹配。默认不支持（推荐使用在短文本、有数字后缀查找的场景。后缀长度为3-12）
    enable_camel_match: boolean // 是否支持驼峰英文匹配。默认不支持（推荐使用在短文本, 且包含驼峰形式英文的查找场景）
  }

  export interface CreateSearchSchemaRespSchemaPropertieSortOptions {
    priority: number // 排序的优先级, 可选范围为 0~4, 0为最高优先级。如果优先级相同, 则随机进行排序。默认为0, 可选值有: 0: 最高优先级, 1: 次高优先级, 2: 次次高优先级, 3: 次低优先级, 4: 最低优先级
    order: string // 排序的顺序。默认为 desc, 可选值有: asc: 升序, desc: 降序
  }

  export interface CreateSearchSchemaRespSchemaPropertieTypeDefinitions {
    tag?: CreateSearchSchemaRespSchemaPropertieTypeDefinitionsTag[] // 标签类型的定义
  }

  export interface CreateSearchSchemaRespSchemaPropertieTypeDefinitionsTag {
    name: string // tag 对应的枚举值名称
    color: string // 标签对应的颜色, 可选值有: red: 含警示性、敏感性的提示信息, green: 表示成功、完成、完毕的提示信息, blue: 组件架构、职能等中性信息, grey: 中立系统提示信息（慎重使用）, yellow: 焦点信息、推广性信息
    text: string // 标签中展示的文本
  }

  export interface createSearchSchemaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateSearchSchemaResp
  }
}

class CreateSearchDataSourceReq {
  name?: any
  state?: any
  description?: any
  icon_url?: any
  template?: any
  searchable_fields?: any
  i18n_name?: any
  i18n_description?: any
  schema_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      state: this.state,
      description: this.description,
      icon_url: this.icon_url,
      template: this.template,
      searchable_fields: this.searchable_fields,
      i18n_name: this.i18n_name,
      i18n_description: this.i18n_description,
      schema_id: this.schema_id
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetSearchDataSourceReq {
  data_source_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':data_source_id', this.data_source_id)

    return path
  }
}

class UpdateSearchDataSourceReq {
  data_source_id?: any
  name?: any
  state?: any
  description?: any
  icon_url?: any
  i18n_name?: any
  i18n_description?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      state: this.state,
      description: this.description,
      icon_url: this.icon_url,
      i18n_name: this.i18n_name,
      i18n_description: this.i18n_description
    }
  }

  getPath(path: string) {
    path = path.replace(':data_source_id', this.data_source_id)

    return path
  }
}

class GetSearchDataSourceListReq {
  view?: any
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
    if (this.view !== undefined) {
      q['view'] = this.view
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

class DeleteSearchDataSourceReq {
  data_source_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':data_source_id', this.data_source_id)

    return path
  }
}

class BatchCreateSearchDataSourceItemReq {
  data_source_id?: any
  items?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      items: this.items
    }
  }

  getPath(path: string) {
    path = path.replace(':data_source_id', this.data_source_id)

    return path
  }
}

class CreateSearchDataSourceItemReq {
  data_source_id?: any
  id?: any
  acl?: any
  metadata?: any
  structured_data?: any
  content?: any
  field_acl?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      id: this.id,
      acl: this.acl,
      metadata: this.metadata,
      structured_data: this.structured_data,
      content: this.content,
      field_acl: this.field_acl
    }
  }

  getPath(path: string) {
    path = path.replace(':data_source_id', this.data_source_id)

    return path
  }
}

class GetSearchDataSourceItemReq {
  data_source_id?: any
  item_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':data_source_id', this.data_source_id)
    path = path.replace(':item_id', this.item_id)

    return path
  }
}

class DeleteSearchDataSourceItemReq {
  data_source_id?: any
  item_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':data_source_id', this.data_source_id)
    path = path.replace(':item_id', this.item_id)

    return path
  }
}

class UpdateSearchSchemaReq {
  schema_id?: any
  display?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      display: this.display
    }
  }

  getPath(path: string) {
    path = path.replace(':schema_id', this.schema_id)

    return path
  }
}

class DeleteSearchSchemaReq {
  schema_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':schema_id', this.schema_id)

    return path
  }
}

class GetSearchSchemaReq {
  schema_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':schema_id', this.schema_id)

    return path
  }
}

class CreateSearchSchemaReq {
  validate_only?: any
  properties?: any
  display?: any
  schema_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      properties: this.properties,
      display: this.display,
      schema_id: this.schema_id
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.validate_only !== undefined) {
      q['validate_only'] = this.validate_only
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}
