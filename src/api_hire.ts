import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class HireService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getHireJob 根据职位 ID 获取职位信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get
  async getHireJob(
    request: Hire.GetHireJobReq
  ): Promise<{
    data: Hire.GetHireJobResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireJobReq> = {
      scope: 'Hire',
      api: 'GetHireJob',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/jobs/:job_id',
      body: new GetHireJobReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireJobReq, Hire.GetHireJobResp>(req)
  }
  // getHireJobManager 根据职位 ID 获取职位上的招聘人员信息, 如招聘负责人、用人经理
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job-manager/get
  async getHireJobManager(
    request: Hire.GetHireJobManagerReq
  ): Promise<{
    data: Hire.GetHireJobManagerResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireJobManagerReq> = {
      scope: 'Hire',
      api: 'GetHireJobManager',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/jobs/:job_id/managers/:manager_id',
      body: new GetHireJobManagerReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireJobManagerReq, Hire.GetHireJobManagerResp>(req)
  }
  // getHireTalent 根据人才 ID 获取人才信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/get
  async getHireTalent(
    request: Hire.GetHireTalentReq
  ): Promise<{
    data: Hire.GetHireTalentResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireTalentReq> = {
      scope: 'Hire',
      api: 'GetHireTalent',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/talents/:talent_id',
      body: new GetHireTalentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireTalentReq, Hire.GetHireTalentResp>(req)
  }
  // getHireAttachment 获取招聘系统中附件的元信息, 比如文件名、创建时间、文件url等
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/get
  async getHireAttachment(
    request: Hire.GetHireAttachmentReq
  ): Promise<{
    data: Hire.GetHireAttachmentResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireAttachmentReq> = {
      scope: 'Hire',
      api: 'GetHireAttachment',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/attachments/:attachment_id',
      body: new GetHireAttachmentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireAttachmentReq, Hire.GetHireAttachmentResp>(req)
  }
  // getHireAttachmentPreview 根据附件 ID 获取附件预览信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/preview
  async getHireAttachmentPreview(
    request: Hire.GetHireAttachmentPreviewReq
  ): Promise<{
    data: Hire.GetHireAttachmentPreviewResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireAttachmentPreviewReq> = {
      scope: 'Hire',
      api: 'GetHireAttachmentPreview',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/attachments/:attachment_id/preview',
      body: new GetHireAttachmentPreviewReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireAttachmentPreviewReq, Hire.GetHireAttachmentPreviewResp>(req)
  }
  // getHireResumeSource 获取简历来源列表
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/resume_source/list
  async getHireResumeSource(
    request: Hire.GetHireResumeSourceReq
  ): Promise<{
    data: Hire.GetHireResumeSourceResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireResumeSourceReq> = {
      scope: 'Hire',
      api: 'GetHireResumeSource',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/resume_sources',
      body: new GetHireResumeSourceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireResumeSourceReq, Hire.GetHireResumeSourceResp>(req)
  }
  // createHireNote 创建备注信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/create
  async createHireNote(
    request: Hire.CreateHireNoteReq
  ): Promise<{
    data: Hire.CreateHireNoteResp
    response: Response
  }> {
    const req: RawRequestReq<CreateHireNoteReq> = {
      scope: 'Hire',
      api: 'CreateHireNote',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/notes',
      body: new CreateHireNoteReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateHireNoteReq, Hire.CreateHireNoteResp>(req)
  }
  // updateHireNote 根据备注 ID 更新备注信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/patch
  async updateHireNote(
    request: Hire.UpdateHireNoteReq
  ): Promise<{
    data: Hire.UpdateHireNoteResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateHireNoteReq> = {
      scope: 'Hire',
      api: 'UpdateHireNote',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/notes/:note_id',
      body: new UpdateHireNoteReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateHireNoteReq, Hire.UpdateHireNoteResp>(req)
  }
  // getHireNote 根据备注 ID 获取备注信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/get
  async getHireNote(
    request: Hire.GetHireNoteReq
  ): Promise<{
    data: Hire.GetHireNoteResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireNoteReq> = {
      scope: 'Hire',
      api: 'GetHireNote',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/notes/:note_id',
      body: new GetHireNoteReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireNoteReq, Hire.GetHireNoteResp>(req)
  }
  // getHireNoteList 获取备注列表
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/list
  async getHireNoteList(
    request: Hire.GetHireNoteListReq
  ): Promise<{
    data: Hire.GetHireNoteListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireNoteListReq> = {
      scope: 'Hire',
      api: 'GetHireNoteList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/notes',
      body: new GetHireNoteListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireNoteListReq, Hire.GetHireNoteListResp>(req)
  }
  // getHireReferralByApplication 根据投递 ID 获取内推信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral/get_by_application
  async getHireReferralByApplication(
    request: Hire.GetHireReferralByApplicationReq
  ): Promise<{
    data: Hire.GetHireReferralByApplicationResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireReferralByApplicationReq> = {
      scope: 'Hire',
      api: 'GetHireReferralByApplication',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/referrals/get_by_application',
      body: new GetHireReferralByApplicationReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetHireReferralByApplicationReq,
      Hire.GetHireReferralByApplicationResp
    >(req)
  }
  // getHireJobProcessList 获取全部招聘流程信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_process/list
  async getHireJobProcessList(
    request: Hire.GetHireJobProcessListReq
  ): Promise<{
    data: Hire.GetHireJobProcessListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireJobProcessListReq> = {
      scope: 'Hire',
      api: 'GetHireJobProcessList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/job_processes',
      body: new GetHireJobProcessListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireJobProcessListReq, Hire.GetHireJobProcessListResp>(req)
  }
  // createHireApplication 根据人才 ID 和职位 ID 创建投递
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/create
  async createHireApplication(
    request: Hire.CreateHireApplicationReq
  ): Promise<{
    data: Hire.CreateHireApplicationResp
    response: Response
  }> {
    const req: RawRequestReq<CreateHireApplicationReq> = {
      scope: 'Hire',
      api: 'CreateHireApplication',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/applications',
      body: new CreateHireApplicationReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateHireApplicationReq, Hire.CreateHireApplicationResp>(req)
  }
  // terminateHireApplication 根据投递 ID 修改投递状态为「已终止」
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/terminate
  async terminateHireApplication(
    request: Hire.TerminateHireApplicationReq
  ): Promise<{
    data: Hire.TerminateHireApplicationResp
    response: Response
  }> {
    const req: RawRequestReq<TerminateHireApplicationReq> = {
      scope: 'Hire',
      api: 'TerminateHireApplication',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/applications/:application_id/terminate',
      body: new TerminateHireApplicationReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<TerminateHireApplicationReq, Hire.TerminateHireApplicationResp>(req)
  }
  // getHireApplication 根据投递 ID 获取单个投递信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/get
  async getHireApplication(
    request: Hire.GetHireApplicationReq
  ): Promise<{
    data: Hire.GetHireApplicationResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireApplicationReq> = {
      scope: 'Hire',
      api: 'GetHireApplication',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/applications/:application_id',
      body: new GetHireApplicationReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireApplicationReq, Hire.GetHireApplicationResp>(req)
  }
  // getHireApplicationList 根据限定条件获取投递列表信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/list
  async getHireApplicationList(
    request: Hire.GetHireApplicationListReq
  ): Promise<{
    data: Hire.GetHireApplicationListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireApplicationListReq> = {
      scope: 'Hire',
      api: 'GetHireApplicationList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/applications',
      body: new GetHireApplicationListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireApplicationListReq, Hire.GetHireApplicationListResp>(req)
  }
  // getHireApplicationInterviewList 根据投递 ID 获取面试记录列表
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application-interview/list
  async getHireApplicationInterviewList(
    request: Hire.GetHireApplicationInterviewListReq
  ): Promise<{
    data: Hire.GetHireApplicationInterviewListResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireApplicationInterviewListReq> = {
      scope: 'Hire',
      api: 'GetHireApplicationInterviewList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/applications/:application_id/interviews',
      body: new GetHireApplicationInterviewListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetHireApplicationInterviewListReq,
      Hire.GetHireApplicationInterviewListResp
    >(req)
  }
  // getHireOfferByApplication 根据投递 ID 获取 Offer 信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/offer
  async getHireOfferByApplication(
    request: Hire.GetHireOfferByApplicationReq
  ): Promise<{
    data: Hire.GetHireOfferByApplicationResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireOfferByApplicationReq> = {
      scope: 'Hire',
      api: 'GetHireOfferByApplication',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/applications/:application_id/offer',
      body: new GetHireOfferByApplicationReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireOfferByApplicationReq, Hire.GetHireOfferByApplicationResp>(
      req
    )
  }
  // getHireOfferSchema 根据 Offer 申请表 ID, 获取 Offer 申请表的详细信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_schema/get
  async getHireOfferSchema(
    request: Hire.GetHireOfferSchemaReq
  ): Promise<{
    data: Hire.GetHireOfferSchemaResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireOfferSchemaReq> = {
      scope: 'Hire',
      api: 'GetHireOfferSchema',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/offer_schemas/:offer_schema_id',
      body: new GetHireOfferSchemaReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireOfferSchemaReq, Hire.GetHireOfferSchemaResp>(req)
  }
  // makeHireTransferOnboardByApplication 根据投递 ID 操作候选人入职并创建员工。投递须处于「待入职」阶段, 可通过「转移阶段」接口变更投递状态
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/transfer_onboard
  async makeHireTransferOnboardByApplication(
    request: Hire.MakeHireTransferOnboardByApplicationReq
  ): Promise<{
    data: Hire.MakeHireTransferOnboardByApplicationResp
    response: Response
  }> {
    const req: RawRequestReq<MakeHireTransferOnboardByApplicationReq> = {
      scope: 'Hire',
      api: 'MakeHireTransferOnboardByApplication',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/hire/v1/applications/:application_id/transfer_onboard',
      body: new MakeHireTransferOnboardByApplicationReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      MakeHireTransferOnboardByApplicationReq,
      Hire.MakeHireTransferOnboardByApplicationResp
    >(req)
  }
  // updateHireEmployee 根据员工 ID 更新员工转正、离职状态
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/patch
  async updateHireEmployee(
    request: Hire.UpdateHireEmployeeReq
  ): Promise<{
    data: Hire.UpdateHireEmployeeResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateHireEmployeeReq> = {
      scope: 'Hire',
      api: 'UpdateHireEmployee',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/employees/:employee_id',
      body: new UpdateHireEmployeeReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateHireEmployeeReq, Hire.UpdateHireEmployeeResp>(req)
  }
  // getHireEmployeeByApplication 通过投递 ID 获取入职信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get_by_application
  async getHireEmployeeByApplication(
    request: Hire.GetHireEmployeeByApplicationReq
  ): Promise<{
    data: Hire.GetHireEmployeeByApplicationResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireEmployeeByApplicationReq> = {
      scope: 'Hire',
      api: 'GetHireEmployeeByApplication',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/employees/get_by_application',
      body: new GetHireEmployeeByApplicationReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetHireEmployeeByApplicationReq,
      Hire.GetHireEmployeeByApplicationResp
    >(req)
  }
  // getHireEmployee 通过员工 ID 获取入职信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get
  async getHireEmployee(
    request: Hire.GetHireEmployeeReq
  ): Promise<{
    data: Hire.GetHireEmployeeResp
    response: Response
  }> {
    const req: RawRequestReq<GetHireEmployeeReq> = {
      scope: 'Hire',
      api: 'GetHireEmployee',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/hire/v1/employees/:employee_id',
      body: new GetHireEmployeeReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetHireEmployeeReq, Hire.GetHireEmployeeResp>(req)
  }
}

export declare namespace Hire {
  export interface GetHireJobReq {
    job_id: number // 职位 ID, 请求Path中, 示例值: 6001
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, `people_admin_id`: 以people_admin_id来识别用户, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetHireJobResp {
    job: GetHireJobRespJob // 职位数据
  }

  export interface GetHireJobRespJob {
    id: string // 职位 ID
    title: string // 职位名称
    description: string // 职位描述
    code: string // 职位编号
    requirement: string // 职位要求
    recruitment_type: GetHireJobRespJobRecruitmentType // 雇佣类型
    department: GetHireJobRespJobDepartment // 部门
    city: GetHireJobRespJobCity // 工作地点
    min_job_level: GetHireJobRespJobMinJobLevel // 最低职级
    max_job_level: GetHireJobRespJobMaxJobLevel // 最高职级
    highlight_list?: GetHireJobRespJobHighlight[] // 职位亮点
    job_category: GetHireJobRespJobJobCategory // 职位序列
    job_type: GetHireJobRespJobJobType // 职位类别
    active_status: number // 启用状态, 可选值有: `1`: 启用, `2`: 未启用
    create_user_id: string // 创建人ID, 若为空则为系统或其他对接系统创建
    create_time: number // 创建时间
    update_time: number // 更新时间
    process_type: number // 招聘流程类型, 可选值有: `1`: 社招流程, `2`: 校招流程
    process_id: string // 招聘流程 ID
    process_name: string // 招聘流程中文名称
    process_en_name: string // 招聘流程英文名称
    customized_data_list?: GetHireJobRespJobCustomizedData[] // 自定义字段列表
    job_function: GetHireJobRespJobJobFunction // 职能分类
    subject: GetHireJobRespJobSubject // 职位项目
    head_count: number // 招聘数量
    experience: number // 工作年限, 可选值有: `1`: 不限, `2`: 应届毕业生, `3`: 1年以下, `4`: 1-3年, `5`: 3-5年, `6`: 5-7年, `7`: 7-10年, `8`: 10年以上
    expiry_time: number // 到期日期
    min_salary: number // 最低薪资, 单位:k
    max_salary: number // 最高薪资, 单位:k
    required_degree: number // 学历要求, 可选值有: `1`: 小学及以上, `2`: 初中及以上, `3`: 专职及以上, `4`: 高中及以上, `5`: 大专及以上, `6`: 本科及以上, `7`: 硕士及以上, `8`: 博士及以上, `20`: 不限
    city_list?: GetHireJobRespJobCity[] // 工作地点列表
  }

  export interface GetHireJobRespJobCity {
    city_code: string // 工作地点城市代码
    zh_name: string // 工作地点中文名称
    en_name: string // 工作地点英文名称
  }

  export interface GetHireJobRespJobCityName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireJobRespJobCustomizedData {
    object_id: string // 自定义字段 ID
    name: GetHireJobRespJobCustomizedDataName // 字段名称
    object_type: number // 字段类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    value: GetHireJobRespJobCustomizedDataValue // 自定义字段值
  }

  export interface GetHireJobRespJobCustomizedDataName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireJobRespJobCustomizedDataValue {
    content: string // 当字段类型为单行文本、多行文本、模块、默认字段时, 从此字段取值
    option: GetHireJobRespJobCustomizedDataValueOption // 当字段类型为单选时, 从此字段取值
    option_list?: GetHireJobRespJobCustomizedDataValueOption[] // 当字段类型为多选时, 从此字段取值
    time_range: GetHireJobRespJobCustomizedDataValueTimeRange // 当字段类型为时间段时, 从此字段取值
    time: string // 当字段类型为日期选择、月份选择、年份选择时, 从此字段取值, 该字段是毫秒级时间戳
    number: string // 当字段类型为数字时, 从此字段取值
  }

  export interface GetHireJobRespJobCustomizedDataValueOption {
    key: string // 选项 ID
    name: GetHireJobRespJobCustomizedDataValueOptionName // 选项名称
  }

  export interface GetHireJobRespJobCustomizedDataValueOptionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireJobRespJobCustomizedDataValueTimeRange {
    start_time: string // 开始时间
    end_time: string // 结束时间
  }

  export interface GetHireJobRespJobDepartment {
    id: string // 部门 ID
    zh_name: string // 部门中文名称
    en_name: string // 部门英文名称
  }

  export interface GetHireJobRespJobHighlight {
    id: string // 职位亮点 ID
    zh_name: string // 职位亮点中文名称
    en_name: string // 职位亮点英文名称
  }

  export interface GetHireJobRespJobJobCategory {
    id: string // 职位序列 ID
    zh_name: string // 职位序列中文名称
    en_name: string // 职位序列英文名称
    active_status: number // 职位序列启用状态, 可选值有: `1`: 启用, `2`: 未启用
  }

  export interface GetHireJobRespJobJobFunction {
    id: string // ID
    name: GetHireJobRespJobJobFunctionName // 名称
  }

  export interface GetHireJobRespJobJobFunctionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireJobRespJobJobType {
    id: string // 职位类别 ID
    zh_name: string // 职位类别中文名称
    en_name: string // 职位类别英文名称
  }

  export interface GetHireJobRespJobMaxJobLevel {
    id: string // 职级 ID
    zh_name: string // 职级中文名称
    en_name: string // 职级英文名称
    active_status: number // 职级启用状态, 可选值有: `1`: 启用, `2`: 未启用
  }

  export interface GetHireJobRespJobMinJobLevel {
    id: string // 职级 ID
    zh_name: string // 职级中文名称
    en_name: string // 职级英文名称
    active_status: number // 职级启用状态, 可选值有: `1`: 启用, `2`: 未启用
  }

  export interface GetHireJobRespJobRecruitmentType {
    id: string // 雇佣类型 ID
    zh_name: string // 雇佣类型中文名称
    en_name: string // 雇佣类型英文名称
    active_status: number // 雇佣类型启用状态, 可选值有: `1`: 启用, `2`: 未启用
  }

  export interface GetHireJobRespJobSubject {
    id: string // ID
    name: GetHireJobRespJobSubjectName // 名称
  }

  export interface GetHireJobRespJobSubjectName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface getHireJobResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireJobResp
  }

  export interface GetHireJobManagerReq {
    job_id: string // 职位 ID, 示例值: "1618209327096"
    manager_id: string // 此处传入职位 ID, 示例值: "1618209327096"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, `people_admin_id`: 以 people_admin_id 来识别用户, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetHireJobManagerResp {
    info: GetHireJobManagerRespInfo // 职位负责人
  }

  export interface GetHireJobManagerRespInfo {
    id: string // 职位 ID
    recruiter_id: string // 招聘负责人 ID, 仅一位, 可通过用户相关接口获取用户 ID
    hiring_manager_id_list?: string[] // 用人经理 ID 列表
    assistant_id_list?: string[] // 协助人 ID 列表
  }

  export interface getHireJobManagerResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireJobManagerResp
  }

  export interface GetHireTalentReq {
    talent_id: string // 人才ID, 示例值: "6891560630172518670"
  }

  export interface GetHireTalentResp {
    talent: GetHireTalentRespTalent // 人才信息
  }

  export interface GetHireTalentRespTalent {
    id: string // 人才ID
    is_in_agency_period: boolean // 是否在猎头保护期, 可选值有: `false`: 未在猎头保护期, `true`: 在猎头保护期
    basic_info: GetHireTalentRespTalentBasicInfo // 基础信息
    education_list?: GetHireTalentRespTalentEducation[] // 教育经历
    career_list?: GetHireTalentRespTalentCareer[] // 工作经历
    project_list?: GetHireTalentRespTalentProject[] // 项目经历
    works_list?: GetHireTalentRespTalentWorks[] // 作品
    award_list?: GetHireTalentRespTalentAward[] // 获奖
    language_list?: GetHireTalentRespTalentLanguage[] // 语言能力
    sns_list?: GetHireTalentRespTalentSns[] // 社交账号
    resume_source_list?: GetHireTalentRespTalentResumeSource[] // 简历来源
    interview_registration_list?: GetHireTalentRespTalentInterviewRegistration[] // 面试登记表
    resume_attachment_id_list?: string[] // 简历附件id列表（按照简历创建时间降序）
    customized_data_list?: GetHireTalentRespTalentCustomizedData[] // 自定义模块
    top_degree: number // 最高学历, 可选值有: `1`: 小学, `2`: 初中, `3`: 专职, `4`: 高中, `5`: 大专, `6`: 本科, `7`: 硕士, `8`: 博士, `9`: 其他
  }

  export interface GetHireTalentRespTalentAward {
    id: string // ID
    title: string // 获奖名称
    award_time: string // 获奖时间
    desc: string // 描述
    customized_data_list?: GetHireTalentRespTalentAwardCustomizedData[] // 自定义字段
  }

  export interface GetHireTalentRespTalentAwardCustomizedData {
    object_id: string // 自定义字段 ID
    name: GetHireTalentRespTalentAwardCustomizedDataName // 字段名称
    object_type: number // 字段类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    value: GetHireTalentRespTalentAwardCustomizedDataValue // 自定义字段值
  }

  export interface GetHireTalentRespTalentAwardCustomizedDataName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentAwardCustomizedDataValue {
    content: string // 当字段类型为单行文本、多行文本、模块、默认字段时, 从此字段取值
    option: GetHireTalentRespTalentAwardCustomizedDataValueOption // 当字段类型为单选时, 从此字段取值
    option_list?: GetHireTalentRespTalentAwardCustomizedDataValueOption[] // 当字段类型为多选时, 从此字段取值
    time_range: GetHireTalentRespTalentAwardCustomizedDataValueTimeRange // 当字段类型为时间段时, 从此字段取值
    time: string // 当字段类型为日期选择、月份选择、年份选择时, 从此字段取值, 该字段是秒级时间戳
    number: string // 当字段类型为数字时, 从此字段取值
  }

  export interface GetHireTalentRespTalentAwardCustomizedDataValueOption {
    key: string // 选项 ID
    name: GetHireTalentRespTalentAwardCustomizedDataValueOptionName // 选项名称
  }

  export interface GetHireTalentRespTalentAwardCustomizedDataValueOptionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentAwardCustomizedDataValueTimeRange {
    start_time: string // 开始时间
    end_time: string // 结束时间, 当值为至今时, 返回「-」
  }

  export interface GetHireTalentRespTalentBasicInfo {
    name: string // 名字
    mobile: string // 手机
    mobile_code: string // 手机国家区号
    mobile_country_code: string // 手机国家代码
    email: string // 邮箱
    experience_years: number // 工作年限
    age: number // 年龄
    nationality: GetHireTalentRespTalentBasicInfoNationality // 国籍
    gender: number // 性别, 可选值有: `1`: 男, `2`: 女, `3`: 其他
    current_city: GetHireTalentRespTalentBasicInfoCurrentCity // 所在地点
    hometown_city: GetHireTalentRespTalentBasicInfoHometownCity // 家乡
    preferred_city_list?: GetHireTalentRespTalentBasicInfoPreferredCity[] // 意向地点
    identification_type: number // 证件类型, 可选值有: `1`: 中国 - 居民身份证, `2`: 护照, `3`: 中国 - 港澳居民居住证, `4`: 中国 - 台湾居民来往大陆通行证, `5`: 其他, `6`: 中国 - 港澳居民来往内地通行证, `9`: 中国 - 台湾居民居住证
    identification_number: string // 证件号
    birthday: number // 生日
    creator_id: string // 创建人
    marital_status: number // 婚姻状况, 可选值有: `1`: 已婚, `2`: 未婚
    current_home_address: string // 家庭住址
    customized_data_list?: GetHireTalentRespTalentBasicInfoCustomizedData[] // 自定义字段
    modify_time: string // 修改时间
  }

  export interface GetHireTalentRespTalentBasicInfoCurrentCity {
    city_code: string // 城市码
    zh_name: string // 中文名
    en_name: string // 英文名
  }

  export interface GetHireTalentRespTalentBasicInfoCustomizedData {
    object_id: string // 自定义字段 ID
    name: GetHireTalentRespTalentBasicInfoCustomizedDataName // 字段名称
    object_type: number // 字段类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    value: GetHireTalentRespTalentBasicInfoCustomizedDataValue // 自定义字段值
  }

  export interface GetHireTalentRespTalentBasicInfoCustomizedDataName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentBasicInfoCustomizedDataValue {
    content: string // 当字段类型为单行文本、多行文本、模块、默认字段时, 从此字段取值
    option: GetHireTalentRespTalentBasicInfoCustomizedDataValueOption // 当字段类型为单选时, 从此字段取值
    option_list?: GetHireTalentRespTalentBasicInfoCustomizedDataValueOption[] // 当字段类型为多选时, 从此字段取值
    time_range: GetHireTalentRespTalentBasicInfoCustomizedDataValueTimeRange // 当字段类型为时间段时, 从此字段取值
    time: string // 当字段类型为日期选择、月份选择、年份选择时, 从此字段取值, 该字段是秒级时间戳
    number: string // 当字段类型为数字时, 从此字段取值
  }

  export interface GetHireTalentRespTalentBasicInfoCustomizedDataValueOption {
    key: string // 选项 ID
    name: GetHireTalentRespTalentBasicInfoCustomizedDataValueOptionName // 选项名称
  }

  export interface GetHireTalentRespTalentBasicInfoCustomizedDataValueOptionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentBasicInfoCustomizedDataValueTimeRange {
    start_time: string // 开始时间
    end_time: string // 结束时间, 当值为至今时, 返回「-」
  }

  export interface GetHireTalentRespTalentBasicInfoHometownCity {
    city_code: string // 城市码
    zh_name: string // 中文名
    en_name: string // 英文名
  }

  export interface GetHireTalentRespTalentBasicInfoNationality {
    nationality_code: string // 国家编码
    zh_name: string // 中文名
    en_name: string // 英文名
  }

  export interface GetHireTalentRespTalentBasicInfoPreferredCity {
    city_code: string // 城市码
    zh_name: string // 中文名
    en_name: string // 英文名
  }

  export interface GetHireTalentRespTalentCareer {
    id: string // ID
    company: string // 公司名称
    title: string // 职位名称
    desc: string // 描述
    start_time: string // 开始时间
    end_time: string // 结束时间
    career_type: number // 经历类型, 可选值有: `1`: 实习经历, `2`: 工作经历
    tag_list?: number[] // 工作经历标签, 可选值有: `5`: 百度 阿里 腾讯, `6`: 头条, 美团, 滴滴, `7`: 其它大厂
    customized_data_list?: GetHireTalentRespTalentCareerCustomizedData[] // 自定义字段
  }

  export interface GetHireTalentRespTalentCareerCustomizedData {
    object_id: string // 自定义字段 ID
    name: GetHireTalentRespTalentCareerCustomizedDataName // 字段名称
    object_type: number // 字段类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    value: GetHireTalentRespTalentCareerCustomizedDataValue // 自定义字段值
  }

  export interface GetHireTalentRespTalentCareerCustomizedDataName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentCareerCustomizedDataValue {
    content: string // 当字段类型为单行文本、多行文本、模块、默认字段时, 从此字段取值
    option: GetHireTalentRespTalentCareerCustomizedDataValueOption // 当字段类型为单选时, 从此字段取值
    option_list?: GetHireTalentRespTalentCareerCustomizedDataValueOption[] // 当字段类型为多选时, 从此字段取值
    time_range: GetHireTalentRespTalentCareerCustomizedDataValueTimeRange // 当字段类型为时间段时, 从此字段取值
    time: string // 当字段类型为日期选择、月份选择、年份选择时, 从此字段取值, 该字段是秒级时间戳
    number: string // 当字段类型为数字时, 从此字段取值
  }

  export interface GetHireTalentRespTalentCareerCustomizedDataValueOption {
    key: string // 选项 ID
    name: GetHireTalentRespTalentCareerCustomizedDataValueOptionName // 选项名称
  }

  export interface GetHireTalentRespTalentCareerCustomizedDataValueOptionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentCareerCustomizedDataValueTimeRange {
    start_time: string // 开始时间
    end_time: string // 结束时间, 当值为至今时, 返回「-」
  }

  export interface GetHireTalentRespTalentCustomizedData {
    object_id: string // 模块 ID
    name: GetHireTalentRespTalentCustomizedDataName // 模块名称
    object_type: number // 类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    children?: GetHireTalentRespTalentCustomizedDataChildren[] // 模块下的字段
  }

  export interface GetHireTalentRespTalentCustomizedDataChildren {
    object_id: string // 自定义字段 ID
    name: GetHireTalentRespTalentCustomizedDataChildrenName // 字段名称
    object_type: number // 字段类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    value: GetHireTalentRespTalentCustomizedDataChildrenValue // 自定义字段值
  }

  export interface GetHireTalentRespTalentCustomizedDataChildrenName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentCustomizedDataChildrenValue {
    content: string // 当字段类型为单行文本、多行文本、模块、默认字段时, 从此字段取值
    option: GetHireTalentRespTalentCustomizedDataChildrenValueOption // 当字段类型为单选时, 从此字段取值
    option_list?: GetHireTalentRespTalentCustomizedDataChildrenValueOption[] // 当字段类型为多选时, 从此字段取值
    time_range: GetHireTalentRespTalentCustomizedDataChildrenValueTimeRange // 当字段类型为时间段时, 从此字段取值
    time: string // 当字段类型为日期选择、月份选择、年份选择时, 从此字段取值, 该字段是秒级时间戳
    number: string // 当字段类型为数字时, 从此字段取值
  }

  export interface GetHireTalentRespTalentCustomizedDataChildrenValueOption {
    key: string // 选项 ID
    name: GetHireTalentRespTalentCustomizedDataChildrenValueOptionName // 选项名称
  }

  export interface GetHireTalentRespTalentCustomizedDataChildrenValueOptionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentCustomizedDataChildrenValueTimeRange {
    start_time: string // 开始时间
    end_time: string // 结束时间, 当值为至今时, 返回「-」
  }

  export interface GetHireTalentRespTalentCustomizedDataName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentEducation {
    id: string // ID
    degree: number // 学位, 可选值有: `1`: 小学, `2`: 初中, `3`: 专职, `4`: 高中, `5`: 大专, `6`: 本科, `7`: 硕士, `8`: 博士, `9`: 其他
    school: string // 学校
    field_of_study: string // 专业
    start_time: string // 开始时间
    end_time: string // 结束时间
    education_type: number // 学历类型, 可选值有: `1`: 海外及港台, `2`: 统招全日制, `3`: 非全日制, `4`: 自考, `5`: 其他
    academic_ranking: number // 成绩排名, 可选值有: `5`: 前 5 %, `10`: 前 10 %, `20`: 前 20 %, `30`: 前 30 %, `50`: 前 50 %, `-1`: 其他
    tag_list?: number[] // 教育经历标签, 可选值有: `1`: 985学校, `2`: 211学校, `3`: 一本, `4`: 国外院校QS200
    customized_data_list?: GetHireTalentRespTalentEducationCustomizedData[] // 自定义字段
  }

  export interface GetHireTalentRespTalentEducationCustomizedData {
    object_id: string // 自定义字段 ID
    name: GetHireTalentRespTalentEducationCustomizedDataName // 字段名称
    object_type: number // 字段类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    value: GetHireTalentRespTalentEducationCustomizedDataValue // 自定义字段值
  }

  export interface GetHireTalentRespTalentEducationCustomizedDataName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentEducationCustomizedDataValue {
    content: string // 当字段类型为单行文本、多行文本、模块、默认字段时, 从此字段取值
    option: GetHireTalentRespTalentEducationCustomizedDataValueOption // 当字段类型为单选时, 从此字段取值
    option_list?: GetHireTalentRespTalentEducationCustomizedDataValueOption[] // 当字段类型为多选时, 从此字段取值
    time_range: GetHireTalentRespTalentEducationCustomizedDataValueTimeRange // 当字段类型为时间段时, 从此字段取值
    time: string // 当字段类型为日期选择、月份选择、年份选择时, 从此字段取值, 该字段是秒级时间戳
    number: string // 当字段类型为数字时, 从此字段取值
  }

  export interface GetHireTalentRespTalentEducationCustomizedDataValueOption {
    key: string // 选项 ID
    name: GetHireTalentRespTalentEducationCustomizedDataValueOptionName // 选项名称
  }

  export interface GetHireTalentRespTalentEducationCustomizedDataValueOptionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentEducationCustomizedDataValueTimeRange {
    start_time: string // 开始时间
    end_time: string // 结束时间, 当值为至今时, 返回「-」
  }

  export interface GetHireTalentRespTalentInterviewRegistration {
    id: string // ID
    registration_time: number // 创建时间
  }

  export interface GetHireTalentRespTalentLanguage {
    id: string // ID
    language: number // 语言, 可选值有: `1`: 英语, `2`: 法语, `3`: 日语, `4`: 韩语, `5`: 德语, `6`: 俄语, `7`: 西班牙语, `8`: 葡萄牙语, `9`: 阿拉伯语, `10`: 印地语, `11`: 印度斯坦语, `12`: 孟加拉语, `13`: 豪萨语, `14`: 旁遮普语, `15`: 波斯语, `16`: 斯瓦西里语, `17`: 泰卢固语, `18`: 土耳其语, `19`: 意大利语, `20`: 爪哇语, `21`: 泰米尔语, `22`: 马拉地语, `23`: 越南语, `24`: 普通话, `25`: 粤语
    proficiency: number // 精通程度, 可选值有: `1`: 入门, `2`: 日常会话, `3`: 商务会话, `4`: 无障碍沟通, `5`: 母语
    customized_data_list?: GetHireTalentRespTalentLanguageCustomizedData[] // 自定义字段
  }

  export interface GetHireTalentRespTalentLanguageCustomizedData {
    object_id: string // 自定义字段 ID
    name: GetHireTalentRespTalentLanguageCustomizedDataName // 字段名称
    object_type: number // 字段类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    value: GetHireTalentRespTalentLanguageCustomizedDataValue // 自定义字段值
  }

  export interface GetHireTalentRespTalentLanguageCustomizedDataName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentLanguageCustomizedDataValue {
    content: string // 当字段类型为单行文本、多行文本、模块、默认字段时, 从此字段取值
    option: GetHireTalentRespTalentLanguageCustomizedDataValueOption // 当字段类型为单选时, 从此字段取值
    option_list?: GetHireTalentRespTalentLanguageCustomizedDataValueOption[] // 当字段类型为多选时, 从此字段取值
    time_range: GetHireTalentRespTalentLanguageCustomizedDataValueTimeRange // 当字段类型为时间段时, 从此字段取值
    time: string // 当字段类型为日期选择、月份选择、年份选择时, 从此字段取值, 该字段是秒级时间戳
    number: string // 当字段类型为数字时, 从此字段取值
  }

  export interface GetHireTalentRespTalentLanguageCustomizedDataValueOption {
    key: string // 选项 ID
    name: GetHireTalentRespTalentLanguageCustomizedDataValueOptionName // 选项名称
  }

  export interface GetHireTalentRespTalentLanguageCustomizedDataValueOptionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentLanguageCustomizedDataValueTimeRange {
    start_time: string // 开始时间
    end_time: string // 结束时间, 当值为至今时, 返回「-」
  }

  export interface GetHireTalentRespTalentProject {
    id: string // ID
    name: string // 项目名称
    role: string // 项目角色
    link: string // 项目链接
    desc: string // 描述
    start_time: string // 开始时间
    end_time: string // 结束时间
    customized_data_list?: GetHireTalentRespTalentProjectCustomizedData[] // 自定义字段
  }

  export interface GetHireTalentRespTalentProjectCustomizedData {
    object_id: string // 自定义字段 ID
    name: GetHireTalentRespTalentProjectCustomizedDataName // 字段名称
    object_type: number // 字段类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    value: GetHireTalentRespTalentProjectCustomizedDataValue // 自定义字段值
  }

  export interface GetHireTalentRespTalentProjectCustomizedDataName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentProjectCustomizedDataValue {
    content: string // 当字段类型为单行文本、多行文本、模块、默认字段时, 从此字段取值
    option: GetHireTalentRespTalentProjectCustomizedDataValueOption // 当字段类型为单选时, 从此字段取值
    option_list?: GetHireTalentRespTalentProjectCustomizedDataValueOption[] // 当字段类型为多选时, 从此字段取值
    time_range: GetHireTalentRespTalentProjectCustomizedDataValueTimeRange // 当字段类型为时间段时, 从此字段取值
    time: string // 当字段类型为日期选择、月份选择、年份选择时, 从此字段取值, 该字段是秒级时间戳
    number: string // 当字段类型为数字时, 从此字段取值
  }

  export interface GetHireTalentRespTalentProjectCustomizedDataValueOption {
    key: string // 选项 ID
    name: GetHireTalentRespTalentProjectCustomizedDataValueOptionName // 选项名称
  }

  export interface GetHireTalentRespTalentProjectCustomizedDataValueOptionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentProjectCustomizedDataValueTimeRange {
    start_time: string // 开始时间
    end_time: string // 结束时间, 当值为至今时, 返回「-」
  }

  export interface GetHireTalentRespTalentResumeSource {
    id: string // ID
    zh_name: string // 中文名
    en_name: string // 英文名
  }

  export interface GetHireTalentRespTalentSns {
    id: string // ID
    sns_type: number // SNS名称, 可选值有: `1`: 领英, `2`: 脉脉, `3`: 微信, `4`: 微博, `5`: Github, `6`: 知乎, `7`: 脸书, `8`: 推特, `9`: Whatsapp, `10`: 个人网站, `11`: QQ
    link: string // URL/ID
    customized_data_list?: GetHireTalentRespTalentSnsCustomizedData[] // 自定义字段
  }

  export interface GetHireTalentRespTalentSnsCustomizedData {
    object_id: string // 自定义字段 ID
    name: GetHireTalentRespTalentSnsCustomizedDataName // 字段名称
    object_type: number // 字段类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    value: GetHireTalentRespTalentSnsCustomizedDataValue // 自定义字段值
  }

  export interface GetHireTalentRespTalentSnsCustomizedDataName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentSnsCustomizedDataValue {
    content: string // 当字段类型为单行文本、多行文本、模块、默认字段时, 从此字段取值
    option: GetHireTalentRespTalentSnsCustomizedDataValueOption // 当字段类型为单选时, 从此字段取值
    option_list?: GetHireTalentRespTalentSnsCustomizedDataValueOption[] // 当字段类型为多选时, 从此字段取值
    time_range: GetHireTalentRespTalentSnsCustomizedDataValueTimeRange // 当字段类型为时间段时, 从此字段取值
    time: string // 当字段类型为日期选择、月份选择、年份选择时, 从此字段取值, 该字段是秒级时间戳
    number: string // 当字段类型为数字时, 从此字段取值
  }

  export interface GetHireTalentRespTalentSnsCustomizedDataValueOption {
    key: string // 选项 ID
    name: GetHireTalentRespTalentSnsCustomizedDataValueOptionName // 选项名称
  }

  export interface GetHireTalentRespTalentSnsCustomizedDataValueOptionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentSnsCustomizedDataValueTimeRange {
    start_time: string // 开始时间
    end_time: string // 结束时间, 当值为至今时, 返回「-」
  }

  export interface GetHireTalentRespTalentWorks {
    id: string // ID
    link: string // 作品链接
    desc: string // 描述
    name: string // 作品附件名称, 若需获取作品附件预览信息可调用「获取附件预览信息」接口
    customized_data_list?: GetHireTalentRespTalentWorksCustomizedData[] // 自定义字段
  }

  export interface GetHireTalentRespTalentWorksCustomizedData {
    object_id: string // 自定义字段 ID
    name: GetHireTalentRespTalentWorksCustomizedDataName // 字段名称
    object_type: number // 字段类型, 可选值有: `1`: 单行文本, `2`: 多行文本, `3`: 单选, `4`: 多选, `5`: 日期, `6`: 月份选择, `7`: 年份选择, `8`: 时间段, `9`: 数字, `10`: 默认字段, `11`: 模块
    value: GetHireTalentRespTalentWorksCustomizedDataValue // 自定义字段值
  }

  export interface GetHireTalentRespTalentWorksCustomizedDataName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentWorksCustomizedDataValue {
    content: string // 当字段类型为单行文本、多行文本、模块、默认字段时, 从此字段取值
    option: GetHireTalentRespTalentWorksCustomizedDataValueOption // 当字段类型为单选时, 从此字段取值
    option_list?: GetHireTalentRespTalentWorksCustomizedDataValueOption[] // 当字段类型为多选时, 从此字段取值
    time_range: GetHireTalentRespTalentWorksCustomizedDataValueTimeRange // 当字段类型为时间段时, 从此字段取值
    time: string // 当字段类型为日期选择、月份选择、年份选择时, 从此字段取值, 该字段是秒级时间戳
    number: string // 当字段类型为数字时, 从此字段取值
  }

  export interface GetHireTalentRespTalentWorksCustomizedDataValueOption {
    key: string // 选项 ID
    name: GetHireTalentRespTalentWorksCustomizedDataValueOptionName // 选项名称
  }

  export interface GetHireTalentRespTalentWorksCustomizedDataValueOptionName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireTalentRespTalentWorksCustomizedDataValueTimeRange {
    start_time: string // 开始时间
    end_time: string // 结束时间, 当值为至今时, 返回「-」
  }

  export interface getHireTalentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireTalentResp
  }

  export interface GetHireAttachmentReq {
    attachment_id: string // 附件id, 示例值: "6435242341238"
  }

  export interface GetHireAttachmentResp {
    attachment: GetHireAttachmentRespAttachment // 附件信息
  }

  export interface GetHireAttachmentRespAttachment {
    id: string // 附件id
    url: string // 附件的url
    name: string // 附件文件名
    mime: string // 媒体类型/MIME
    create_time: number // 附件创建时间（单位ms）
  }

  export interface getHireAttachmentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireAttachmentResp
  }

  export interface GetHireAttachmentPreviewReq {
    attachment_id: string // 附件id, 示例值: "11111"
  }

  export interface GetHireAttachmentPreviewResp {
    url: string // 预览链接
  }

  export interface getHireAttachmentPreviewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireAttachmentPreviewResp
  }

  export interface GetHireResumeSourceReq {
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "1"
  }

  export interface GetHireResumeSourceResp {
    items?: GetHireResumeSourceRespItem[] // 数据
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetHireResumeSourceRespItem {
    id: string // 来源 ID
    zh_name: string // 中文名
    en_name: string // 英文名
    active_status: number // 启用状态, 可选值有: `1`: 已启用, `2`: 已禁用
    resume_source_type: number // 来源类型, 可选值有: `10000`: 内推, `10001`: 猎头, `10002`: 内部来源, `10003`: 第三方招聘网站, `10004`: 社交媒体, `10005`: 线下来源, `10006`: 其他, `10007`: 外部推荐
  }

  export interface getHireResumeSourceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireResumeSourceResp
  }

  export interface CreateHireNoteReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, `people_admin_id`: 以people_admin_id来识别用户, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    talent_id: string // 人才ID, 示例值: "6916472453069883661"
    application_id?: string // 投递ID, 示例值: "6891565253964859661"
    creator_id?: string // 创建人ID, 示例值: "ou_f476cb099ac9227c9bae09ce46112579"
    content: string // 内容, 示例值: "测试"
    privacy?: number // 备注私密属性（默认为公开）, 示例值: 1, 可选值有: `1`: 私密, `2`: 公开
  }

  export interface CreateHireNoteResp {
    note: CreateHireNoteRespNote // 备注信息
  }

  export interface CreateHireNoteRespNote {
    id: string // 备注ID
    talent_id: string // 人才ID
    application_id: string // 投递ID
    is_private: boolean // 是否私密
    create_time: number // 创建时间
    modify_time: number // 更新时间
    creator_id: string // 创建人ID
    content: string // 内容
  }

  export interface createHireNoteResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateHireNoteResp
  }

  export interface UpdateHireNoteReq {
    note_id: string // 备注 ID, 示例值: "6960663240925956401"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, `people_admin_id`: 以people_admin_id来识别用户, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    content: string // 备注内容, 示例值: "111"
  }

  export interface UpdateHireNoteResp {
    note: UpdateHireNoteRespNote // 备注数据
  }

  export interface UpdateHireNoteRespNote {
    id: string // 备注ID
    talent_id: string // 人才ID
    application_id: string // 投递ID
    is_private: boolean // 是否私密
    create_time: number // 创建时间
    modify_time: number // 更新时间
    creator_id: string // 创建人ID
    content: string // 内容
  }

  export interface updateHireNoteResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateHireNoteResp
  }

  export interface GetHireNoteReq {
    note_id: string // 备注ID, 示例值: "6949805467799537964"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, `people_admin_id`: 以people_admin_id来识别用户, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetHireNoteResp {
    note: GetHireNoteRespNote // 备注数据
  }

  export interface GetHireNoteRespNote {
    id: string // 备注ID
    talent_id: string // 人才ID
    application_id: string // 投递ID
    is_private: boolean // 是否私密
    create_time: number // 创建时间
    modify_time: number // 更新时间
    creator_id: string // 创建人ID
    content: string // 内容
  }

  export interface getHireNoteResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireNoteResp
  }

  export interface GetHireNoteListReq {
    page_size?: number // 每页限制, 每页最大不超过100, 示例值: 10
    page_token?: string // 查询游标, 由上一页结果返回, 第一页不传, 示例值: "1"
    talent_id: string // 人才ID, 示例值: "6916472453069883661"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, `people_admin_id`: 以people_admin_id来识别用户, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetHireNoteListResp {
    items?: GetHireNoteListRespItem[] // 备注数据列表
    has_more: boolean // 是否还有下一页数据
    page_token: string // 游标, 翻下一页数据时使用
  }

  export interface GetHireNoteListRespItem {
    id: string // 备注ID
    talent_id: string // 人才ID
    application_id: string // 投递ID
    is_private: boolean // 是否私密
    create_time: number // 创建时间
    modify_time: number // 更新时间
    creator_id: string // 创建人ID
    content: string // 内容
  }

  export interface getHireNoteListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireNoteListResp
  }

  export interface GetHireReferralByApplicationReq {
    application_id: string // 投递的 ID, 示例值: "6134134355464633"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, `people_admin_id`: 以people_admin_id来识别用户, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetHireReferralByApplicationResp {
    referral: GetHireReferralByApplicationRespReferral // 内推信息
  }

  export interface GetHireReferralByApplicationRespReferral {
    id: string // 内推的 ID
    application_id: string // 投递 ID
    create_time: number // 创建时间（ms）
    referral_user_id: string // 内推人的 ID
    referral_user: GetHireReferralByApplicationRespReferralReferralUser // 内推人信息
  }

  export interface GetHireReferralByApplicationRespReferralReferralUser {
    id: string // ID
    name: GetHireReferralByApplicationRespReferralReferralUserName // 名称
  }

  export interface GetHireReferralByApplicationRespReferralReferralUserName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface getHireReferralByApplicationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireReferralByApplicationResp
  }

  export interface GetHireJobProcessListReq {
    page_size?: number // 分页大小, 不能超过 100, 示例值: 10
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "1"
  }

  export interface GetHireJobProcessListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetHireJobProcessListRespItem[] // 列表
  }

  export interface GetHireJobProcessListRespItem {
    id: string // ID
    zh_name: string // 中文名称
    en_name: string // 英文名称
    type: number // 类型 1=社招流程, 2=校招流程, 可选值有: `1`: 社招流程, `2`: 校招流程
    stage_list?: GetHireJobProcessListRespItemStage[] // 阶段列表, 内部按用户设置顺序排列
  }

  export interface GetHireJobProcessListRespItemStage {
    id: string // ID
    zh_name: string // 中文名称
    en_name: string // 英文名称
    type: number // 1=筛选型, 2=评估型, 3=笔试型, 4=面试型, 5=Offer型, 6=待入职, 7=已入职, 8=其它类型, 255=系统默认, 后端模型中并没有该字段, 仅用于前端显示, 可选值有: `1`: 筛选型, `2`: 评估型, `3`: 笔试型, `4`: 面试型, `5`: Offer型, `6`: 待入职, `7`: 已入职, `8`: 其它类型, `255`: 系统默认
  }

  export interface getHireJobProcessListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireJobProcessListResp
  }

  export interface CreateHireApplicationReq {
    talent_id: string // 人才ID, 示例值: "12312312312"
    job_id: string // 职位ID, 示例值: "12312312312"
    application_preferred_city_code_list?: string[] // 意向投递城市列表, 可从「获取职位信息」返回的工作地点列表获取, 示例值: ["CT_1"]
  }

  export interface CreateHireApplicationResp {
    id: string // 投递ID
  }

  export interface createHireApplicationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateHireApplicationResp
  }

  export interface TerminateHireApplicationReq {
    application_id: string // 投递ID, 示例值: "12312312312"
    termination_type: number // 终止原因的类型, 示例值: 1, 可选值有: `1`: 我们拒绝了候选人, `22`: 候选人拒绝了我们, `27`: 其他
    termination_reason_list?: string[] // 终止的具体原因的id列表, 示例值: ["6891560630172518670"]
    termination_reason_note?: string // 终止备注, 示例值: "不符合期望"
  }

  export interface TerminateHireApplicationResp {}

  export interface terminateHireApplicationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: TerminateHireApplicationResp
  }

  export interface GetHireApplicationReq {
    application_id: string // 投递 ID, 示例值: "6949805467799537964"
  }

  export interface GetHireApplicationResp {
    application: GetHireApplicationRespApplication // 投递数据
  }

  export interface GetHireApplicationRespApplication {
    id: string // 投递id
    job_id: string // 投递的职位 ID
    talent_id: string // 候选人 ID
    resume_resource_id: string // 简历来源 ID
    stage: GetHireApplicationRespApplicationStage // 投递处于的阶段
    active_status: number // 活跃状态, 可选值有: `1`: 活跃, `2`: 非活跃, 即为「已终止」, `3`: 全部
    delivery_type: number // 投递方式, 可选值有: `1`: HR寻访, `2`: 候选人主动投递
    resume_source_info: GetHireApplicationRespApplicationResumeSourceInfo // 投递来源信息
    website_resume_source: GetHireApplicationRespApplicationWebsiteResumeSource // 官网投递来源
    talent_attachment_resume_id: string // 简历附件 ID
    create_time: string // 创建时间
    modify_time: string // 修改时间
    stage_time_list?: GetHireApplicationRespApplicationStageTime[] // 阶段变更时间列表
    termination_type: number // 终止原因的类型, 可选值有: `1`: 我们拒绝了候选人, `22`: 候选人拒绝了我们, `27`: 其他
    termination_reason_list?: string[] // 终止的具体原因的id列表
    termination_reason_note: string // 终止备注
    application_preferred_city_list?: GetHireApplicationRespApplicationApplicationPreferredCity[] // 意向投递城市列表
  }

  export interface GetHireApplicationRespApplicationApplicationPreferredCity {
    code: string // 编码
    name: GetHireApplicationRespApplicationApplicationPreferredCityName // 名称
  }

  export interface GetHireApplicationRespApplicationApplicationPreferredCityName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireApplicationRespApplicationResumeSourceInfo {
    id: string // 投递来源 ID
    name: GetHireApplicationRespApplicationResumeSourceInfoName // 投递来源名称
    resume_source_type: number // 投递来源类型, 可选值有: `10000`: 内推, `10001`: 猎头, `10002`: 内部来源, `10003`: 第三方招聘网站, `10004`: 社交媒体, `10005`: 线下来源, `10006`: 其他, `10007`: 外部推荐
  }

  export interface GetHireApplicationRespApplicationResumeSourceInfoName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireApplicationRespApplicationStage {
    id: string // 阶段 ID
    zh_name: string // 阶段中文名字
    en_name: string // 英文名
    type: number // 阶段类型, 可选值有: `1`: 筛选型, `2`: 评估型, `3`: 笔试型, `4`: 面试型, `5`: Offer型, `6`: 待入职, `7`: 已入职, `8`: 其它类型, `255`: 系统默认
  }

  export interface GetHireApplicationRespApplicationStageTime {
    stage_id: string // 阶段 ID
    enter_time: string // 最近一次进入该阶段的时间
    exit_time: string // 最后一次离开时间, 如当前在该阶段, 则为空
  }

  export interface GetHireApplicationRespApplicationWebsiteResumeSource {
    website_id: string // 官网站点 ID
    website_name: GetHireApplicationRespApplicationWebsiteResumeSourceWebsiteName // 官网站点名称
    channel: GetHireApplicationRespApplicationWebsiteResumeSourceChannel // 推广渠道来源
  }

  export interface GetHireApplicationRespApplicationWebsiteResumeSourceChannel {
    channel_id: string // 官网推广渠道 ID
    channel_name: GetHireApplicationRespApplicationWebsiteResumeSourceChannelChannelName // 官网推广渠道名称
  }

  export interface GetHireApplicationRespApplicationWebsiteResumeSourceChannelChannelName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface GetHireApplicationRespApplicationWebsiteResumeSourceWebsiteName {
    zh_cn: string // 中文
    en_us: string // 英文
  }

  export interface getHireApplicationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireApplicationResp
  }

  export interface GetHireApplicationListReq {
    process_id?: string // 按流程过滤, 招聘流程 ID, 枚举值通过接口「获取招聘流程信息」接口获取, 示例值: "6960663240925956554"
    stage_id?: string // 按招聘阶段过滤, 招聘阶段 ID, 枚举值通过「获取招聘流程信息」接口获取, 示例值: "614218419274131"
    talent_id?: string // 按人才过滤, 示例值: "6891560630172518670"
    active_status?: string // 按活跃状态筛选 1=活跃投递, 2=非活跃投递, 3=全部, 示例值: "1"
    job_id?: string // 职位 ID, 示例值: "7334134355464633"
    page_token?: string // 查询游标, 由上一页结果返回, 第一页不传, 示例值: "1"
    page_size?: number // 每页限制, 每页最大不超过100, 示例值: 100
    update_start_time?: string // 最早更新时间, 毫秒级时间戳, 示例值: "1618500278663"
    update_end_time?: string // 最晚更新时间, 毫秒级时间戳, 示例值: "1618500278663"
  }

  export interface GetHireApplicationListResp {
    items?: string[] // 投递数据列表
    page_token: string // 游标, 翻下一页数据时使用
    has_more: boolean // 是否还有下一页数据
  }

  export interface getHireApplicationListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireApplicationListResp
  }

  export interface GetHireApplicationInterviewListReq {
    application_id: string // 投递ID, 示例值: "6949805467799537964"
    page_size: number // 分页大小, 不能超过 50, 示例值: 10
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xx"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetHireApplicationInterviewListResp {
    page_token: string // 分页标志
    has_more: boolean // 是否有更多
    items?: GetHireApplicationInterviewListRespItem[] // 面试列表
  }

  export interface GetHireApplicationInterviewListRespItem {
    id: string // 面试id
    begin_time: number // 面试开始时间（ms）
    end_time: number // 面试结束时间（ms）
    round: number // 面试轮次（从0开始计数）
    stage_id: string // 面试关联的投递阶段
    interview_record_list?: GetHireApplicationInterviewListRespItemInterviewRecord[] // 面试官记录列表
  }

  export interface GetHireApplicationInterviewListRespItemInterviewRecord {
    id: string // 面试记录 ID
    user_id: string // 面试官用户 ID
    content: string // 系统预设「记录」题目内容
    min_job_level_id: string // 建议定级下限的职级 ID
    max_job_level_id: string // 建议定级上限的职级 ID
    commit_status: number // 提交状态, 可选值有: `1`: 已提交, `2`: 未提交
    conclusion: number // 面试结论, 可选值有: `1`: 通过, `2`: 未通过, `3`: 未开始, `4`: 未提交, `5`: 未到场
    interview_score: GetHireApplicationInterviewListRespItemInterviewRecordInterviewScore // 面试评分
  }

  export interface GetHireApplicationInterviewListRespItemInterviewRecordInterviewScore {
    id: string // 面试评分 ID
    level: number // 分数级别
    zh_name: string // 中文名称
    zh_description: string // 中文描述
    en_name: string // 英文名称
    en_description: string // 英文描述
  }

  export interface getHireApplicationInterviewListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireApplicationInterviewListResp
  }

  export interface GetHireOfferByApplicationReq {
    application_id: string // 投递ID, 示例值: "6949805467799537964"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetHireOfferByApplicationResp {
    offer: GetHireOfferByApplicationRespOffer // Offer数据
  }

  export interface GetHireOfferByApplicationRespOffer {
    id: string // Offer id
    application_id: string // 投递id
    basic_info: GetHireOfferByApplicationRespOfferBasicInfo // 基础信息
    salary_plan: GetHireOfferByApplicationRespOfferSalaryPlan // 薪酬计划
    schema_id: string // 当前 Offer 使用的 schema
    offer_status: number // Offer 状态, 可选值有: `0`: 所有, `1`: 未申请, `2`: 审批中, `3`: 审批已撤回, `4`: 审批通过, `5`: 审批不通过, `6`: Offer 已发出, `7`: 候选人已接受, `8`: 候选人已拒绝, `9`: Offer 已失效
    job_info: GetHireOfferByApplicationRespOfferJobInfo // 职位信息
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfo {
    offer_type: number // Offer 类型, 可选值有: `1`: Social, `2`: Campus, `3`: Intern, `4`: InternTransfer
    remark: string // 备注
    expire_time: number // Offer 过期时间
    owner_user_id: string // Offer 负责人 ID
    creator_user_id: string // Offer 创建人 ID
    employee_type: GetHireOfferByApplicationRespOfferBasicInfoEmployeeType // Offer 人员类型
    create_time: string // 创建时间
    leader_user_id: string // 直属上级 ID
    onboard_date: string // 入职日期
    department_id: string // 入职部门
    probation_month: number // 试用期, 比如试用期6个月
    contract_year: number // 合同期, 比如3年
    recruitment_type: GetHireOfferByApplicationRespOfferBasicInfoRecruitmentType // 雇员类型
    sequence: GetHireOfferByApplicationRespOfferBasicInfoSequence // 序列
    level: GetHireOfferByApplicationRespOfferBasicInfoLevel // 级别
    onboard_address: GetHireOfferByApplicationRespOfferBasicInfoOnboardAddress // 入职地点
    work_address: GetHireOfferByApplicationRespOfferBasicInfoWorkAddress // 工作地点
    customize_info_list?: GetHireOfferByApplicationRespOfferBasicInfoCustomizeInfo[] // 自定义字段信息
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoCustomizeInfo {
    object_id: string // 自定义字段 ID
    customize_value: string // 自定义字段 value
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoEmployeeType {
    id: string // ID
    zh_name: string // 中文名称
    en_name: string // 英文名称
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoLevel {
    id: string // ID
    zh_name: string // 中文名称
    en_name: string // 英文名称
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoOnboardAddress {
    id: string // ID
    zh_name: string // 中文名称
    en_name: string // 英文名称
    district: GetHireOfferByApplicationRespOfferBasicInfoOnboardAddressDistrict // 区域信息
    city: GetHireOfferByApplicationRespOfferBasicInfoOnboardAddressCity // 城市信息
    state: GetHireOfferByApplicationRespOfferBasicInfoOnboardAddressState // 省信息
    country: GetHireOfferByApplicationRespOfferBasicInfoOnboardAddressCountry // 国家信息
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoOnboardAddressCity {
    zh_name: string // 中文名称
    en_name: string // 英文名称
    code: string // 编码
    location_type: number // 地址类型, 可选值有: `1`: COUNTRY, `2`: STATE, `3`: CITY, `4`: DISTRICT, `5`: ADDRESS
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoOnboardAddressCountry {
    zh_name: string // 中文名称
    en_name: string // 英文名称
    code: string // 编码
    location_type: number // 地址类型, 可选值有: `1`: COUNTRY, `2`: STATE, `3`: CITY, `4`: DISTRICT, `5`: ADDRESS
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoOnboardAddressDistrict {
    zh_name: string // 中文名称
    en_name: string // 英文名称
    code: string // 编码
    location_type: number // 地址类型
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoOnboardAddressState {
    zh_name: string // 中文名称
    en_name: string // 英文名称
    code: string // 编码
    location_type: number // 地址类型, 可选值有: `1`: COUNTRY, `2`: STATE, `3`: CITY, `4`: DISTRICT, `5`: ADDRESS
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoRecruitmentType {
    id: string // ID
    zh_name: string // 中文名称
    en_name: string // 英文名称
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoSequence {
    id: string // ID
    zh_name: string // 中文名称
    en_name: string // 英文名称
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoWorkAddress {
    id: string // ID
    zh_name: string // 中文名称
    en_name: string // 英文名称
    district: GetHireOfferByApplicationRespOfferBasicInfoWorkAddressDistrict // 区域信息
    city: GetHireOfferByApplicationRespOfferBasicInfoWorkAddressCity // 城市信息
    state: GetHireOfferByApplicationRespOfferBasicInfoWorkAddressState // 省信息
    country: GetHireOfferByApplicationRespOfferBasicInfoWorkAddressCountry // 国家信息
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoWorkAddressCity {
    zh_name: string // 中文名称
    en_name: string // 英文名称
    code: string // 编码
    location_type: number // 地址类型, 可选值有: `1`: COUNTRY, `2`: STATE, `3`: CITY, `4`: DISTRICT, `5`: ADDRESS
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoWorkAddressCountry {
    zh_name: string // 中文名称
    en_name: string // 英文名称
    code: string // 编码
    location_type: number // 地址类型, 可选值有: `1`: COUNTRY, `2`: STATE, `3`: CITY, `4`: DISTRICT, `5`: ADDRESS
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoWorkAddressDistrict {
    zh_name: string // 中文名称
    en_name: string // 英文名称
    code: string // 编码
    location_type: number // 地址类型
  }

  export interface GetHireOfferByApplicationRespOfferBasicInfoWorkAddressState {
    zh_name: string // 中文名称
    en_name: string // 英文名称
    code: string // 编码
    location_type: number // 地址类型, 可选值有: `1`: COUNTRY, `2`: STATE, `3`: CITY, `4`: DISTRICT, `5`: ADDRESS
  }

  export interface GetHireOfferByApplicationRespOfferJobInfo {
    job_id: string // Offer 职位 ID
    job_name: string // Offer 职位名称
  }

  export interface GetHireOfferByApplicationRespOfferSalaryPlan {
    currency: string // 币种
    basic_salary: string // 基本薪资, 为JSON 格式, amount 代表基本薪资的金额, peroid 代表基本薪资的周期单位, 如: "{"amount":"10000", "period":2}"
    probation_salary_percentage: string // 试用期百分比
    award_salary_multiple: string // 年终奖月数
    option_shares: string // 期权股数
    quarterly_bonus: string // 季度奖金额
    half_year_bonus: string // 半年奖金额
    total_annual_cash: string // 年度现金总额(数量, 非公式)
    customize_info_list?: GetHireOfferByApplicationRespOfferSalaryPlanCustomizeInfo[] // 自定义字段的 value 信息
  }

  export interface GetHireOfferByApplicationRespOfferSalaryPlanCustomizeInfo {
    object_id: string // 自定义字段 ID
    customize_value: string // 自定义字段 value
  }

  export interface getHireOfferByApplicationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireOfferByApplicationResp
  }

  export interface GetHireOfferSchemaReq {
    offer_schema_id: string // offer申请表的ID *必需属性, 示例值: "1231231231231"
  }

  export interface GetHireOfferSchemaResp {
    id: string // offer申请表ID
    scenario: number // offer申请表使用场景, 可选值有: `1`: Offer审批表
    version: number // 申请表版本
    object_list?: GetHireOfferSchemaRespObject[] // 字段对象信息
  }

  export interface GetHireOfferSchemaRespObject {
    id: string // 字段ID
    name: GetHireOfferSchemaRespObjectName // 字段名称
    type: string // 字段类型, text=单行文本, long_text=多行文本, select=单选, multi_select=多选, date_select=日期, number=数字
    is_customized: boolean // 字段是否为自定义
    option_list?: GetHireOfferSchemaRespObjectOption[] // 单选/多选可选择字段的选项值
  }

  export interface GetHireOfferSchemaRespObjectName {
    zh_cn: string // 中文名
    en_us: string // 英文名
  }

  export interface GetHireOfferSchemaRespObjectOption {
    name: GetHireOfferSchemaRespObjectOptionName // 名字
    index: number // 选项序号
    active_status: number // 选项当前是否启用, 可选值有: `1`: 进行中, `2`: 已终止
  }

  export interface GetHireOfferSchemaRespObjectOptionName {
    zh_cn: string // 中文名
    en_us: string // 英文名
  }

  export interface getHireOfferSchemaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireOfferSchemaResp
  }

  export interface MakeHireTransferOnboardByApplicationReq {
    application_id: string // 投递ID, 示例值: "7073372582620416300"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    actual_onboard_time?: number // 实际入职时间, 示例值: 1616428800000
    expected_conversion_time?: number // 预期转正时间, 示例值: 1616428800000
    job_requirement_id?: string // 招聘需求 ID, 示例值: "6960663240925956402"
    operator_id?: string // 操作人 UserID, 示例值: "ou-xxx"
    onboard_city_code?: string // 候选人办公地点 ID, 枚举可通过接口「获取地址列表」获取, 将用于候选人内推奖规则判断, 示例值: "CT_2"
    department?: string // 候选人入职部门 ID, 枚举可通过接口「获取部门信息列表」获取, 将用于候选人内推奖规则判断, 示例值: "6966123381141866028"
    leader?: string // 候选人直属上级 UserID, 将用于候选人内推奖规则判断, 示例值: "ou-xxx"
    sequence?: string // 候选人序列 ID, 枚举可通过接口「获取职务分类列表」获取, 将用于候选人内推奖规则判断, 示例值: "7006234385490345986"
    level?: string // 候选人职级 ID, 枚举可通过接口「获取职级列表」获取, 将用于候选人内推奖规则判断, 示例值: "6937934036379650311"
    employee_type?: string // 候选人入职人员类型 ID, 可通过接口人力资源管理平台「获取员工类型列表」获取, 将用于候选人内推奖规则判断, 示例值: "1"
  }

  export interface MakeHireTransferOnboardByApplicationResp {
    employee: MakeHireTransferOnboardByApplicationRespEmployee // employee
  }

  export interface MakeHireTransferOnboardByApplicationRespEmployee {
    id: string // 员工ID
    application_id: string // 投递ID
    onboard_status: number // 入职状态, 可选值有: `1`: 已入职, `2`: 已离职
    conversion_status: number // 转正状态, 可选值有: `1`: 未转正, `2`: 已转正
    onboard_time: number // 实际入职时间
    expected_conversion_time: number // 预期转正时间
    actual_conversion_time: number // 实际转正时间
    overboard_time: number // 离职时间
    overboard_note: string // 离职原因
    onboard_city_code: string // 办公地点
    department: string // 入职部门
    leader: string // 直属上级
    sequence: string // 序列
    level: string // 职级
    employee_type: string // 员工类型
  }

  export interface makeHireTransferOnboardByApplicationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: MakeHireTransferOnboardByApplicationResp
  }

  export interface UpdateHireEmployeeReq {
    employee_id: string // 员工ID, 示例值: "123"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    operation: number // 修改状态操作, 示例值: 1, 可选值有: `1`: 转正, `2`: 离职
    conversion_info?: UpdateHireEmployeeReqConversionInfo // 转正信息
    overboard_info?: UpdateHireEmployeeReqOverboardInfo // 离职信息
  }

  export interface UpdateHireEmployeeReqConversionInfo {
    actual_conversion_time?: number // 实际转正日期, 示例值: 1637596800000
  }

  export interface UpdateHireEmployeeReqOverboardInfo {
    actual_overboard_time?: number // 实际离职日期, 示例值: 1637596800000
    overboard_note?: string // 离职原因, 示例值: "职业发展考虑"
  }

  export interface UpdateHireEmployeeResp {
    employee: UpdateHireEmployeeRespEmployee // 员工信息
  }

  export interface UpdateHireEmployeeRespEmployee {
    id: string // 员工ID
    application_id: string // 投递ID
    onboard_status: number // 入职状态, 可选值有: `1`: 已入职, `2`: 已离职
    conversion_status: number // 转正状态, 可选值有: `1`: 未转正, `2`: 已转正
    onboard_time: number // 实际入职时间
    expected_conversion_time: number // 预期转正时间
    actual_conversion_time: number // 实际转正时间
    overboard_time: number // 离职时间
    overboard_note: string // 离职原因
    onboard_city_code: string // 办公地点
    department: string // 入职部门
    leader: string // 直属上级
    sequence: string // 序列
    level: string // 职级
    employee_type: string // 员工类型
  }

  export interface updateHireEmployeeResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateHireEmployeeResp
  }

  export interface GetHireEmployeeByApplicationReq {
    application_id: string // 投递ID, 示例值: "123"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetHireEmployeeByApplicationResp {
    employee: GetHireEmployeeByApplicationRespEmployee // 员工信息
  }

  export interface GetHireEmployeeByApplicationRespEmployee {
    id: string // 员工ID
    application_id: string // 投递ID
    onboard_status: number // 入职状态, 可选值有: `1`: 已入职, `2`: 已离职
    conversion_status: number // 转正状态, 可选值有: `1`: 未转正, `2`: 已转正
    onboard_time: number // 实际入职时间
    expected_conversion_time: number // 预期转正时间
    actual_conversion_time: number // 实际转正时间
    overboard_time: number // 离职时间
    overboard_note: string // 离职原因
    onboard_city_code: string // 办公地点
    department: string // 入职部门
    leader: string // 直属上级
    sequence: string // 序列
    level: string // 职级
    employee_type: string // 员工类型
  }

  export interface getHireEmployeeByApplicationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireEmployeeByApplicationResp
  }

  export interface GetHireEmployeeReq {
    employee_id: string // 员工ID, 示例值: "123"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetHireEmployeeResp {
    employee: GetHireEmployeeRespEmployee // 员工信息
  }

  export interface GetHireEmployeeRespEmployee {
    id: string // 员工ID
    application_id: string // 投递ID
    onboard_status: number // 入职状态, 可选值有: `1`: 已入职, `2`: 已离职
    conversion_status: number // 转正状态, 可选值有: `1`: 未转正, `2`: 已转正
    onboard_time: number // 实际入职时间
    expected_conversion_time: number // 预期转正时间
    actual_conversion_time: number // 实际转正时间
    overboard_time: number // 离职时间
    overboard_note: string // 离职原因
    onboard_city_code: string // 办公地点
    department: string // 入职部门
    leader: string // 直属上级
    sequence: string // 序列
    level: string // 职级
    employee_type: string // 员工类型
  }

  export interface getHireEmployeeResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetHireEmployeeResp
  }
}

class GetHireJobReq {
  job_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':job_id', this.job_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHireJobManagerReq {
  job_id?: any
  manager_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':job_id', this.job_id)
    path = path.replace(':manager_id', this.manager_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHireTalentReq {
  talent_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':talent_id', this.talent_id)

    return path
  }
}

class GetHireAttachmentReq {
  attachment_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':attachment_id', this.attachment_id)

    return path
  }
}

class GetHireAttachmentPreviewReq {
  attachment_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':attachment_id', this.attachment_id)

    return path
  }
}

class GetHireResumeSourceReq {
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

class CreateHireNoteReq {
  user_id_type?: any
  talent_id?: any
  application_id?: any
  creator_id?: any
  content?: any
  privacy?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      talent_id: this.talent_id,
      application_id: this.application_id,
      creator_id: this.creator_id,
      content: this.content,
      privacy: this.privacy
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

class UpdateHireNoteReq {
  note_id?: any
  user_id_type?: any
  content?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      content: this.content
    }
  }

  getPath(path: string) {
    path = path.replace(':note_id', this.note_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHireNoteReq {
  note_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':note_id', this.note_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHireNoteListReq {
  page_size?: any
  page_token?: any
  talent_id?: any
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
    if (this.talent_id !== undefined) {
      q['talent_id'] = this.talent_id
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHireReferralByApplicationReq {
  application_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.application_id !== undefined) {
      q['application_id'] = this.application_id
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHireJobProcessListReq {
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

class CreateHireApplicationReq {
  talent_id?: any
  job_id?: any
  application_preferred_city_code_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      talent_id: this.talent_id,
      job_id: this.job_id,
      application_preferred_city_code_list: this.application_preferred_city_code_list
    }
  }

  getPath(path: string) {
    return path
  }
}

class TerminateHireApplicationReq {
  application_id?: any
  termination_type?: any
  termination_reason_list?: any
  termination_reason_note?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      termination_type: this.termination_type,
      termination_reason_list: this.termination_reason_list,
      termination_reason_note: this.termination_reason_note
    }
  }

  getPath(path: string) {
    path = path.replace(':application_id', this.application_id)

    return path
  }
}

class GetHireApplicationReq {
  application_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':application_id', this.application_id)

    return path
  }
}

class GetHireApplicationListReq {
  process_id?: any
  stage_id?: any
  talent_id?: any
  active_status?: any
  job_id?: any
  page_token?: any
  page_size?: any
  update_start_time?: any
  update_end_time?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.process_id !== undefined) {
      q['process_id'] = this.process_id
    }
    if (this.stage_id !== undefined) {
      q['stage_id'] = this.stage_id
    }
    if (this.talent_id !== undefined) {
      q['talent_id'] = this.talent_id
    }
    if (this.active_status !== undefined) {
      q['active_status'] = this.active_status
    }
    if (this.job_id !== undefined) {
      q['job_id'] = this.job_id
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.update_start_time !== undefined) {
      q['update_start_time'] = this.update_start_time
    }
    if (this.update_end_time !== undefined) {
      q['update_end_time'] = this.update_end_time
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHireApplicationInterviewListReq {
  application_id?: any
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
    path = path.replace(':application_id', this.application_id)

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

class GetHireOfferByApplicationReq {
  application_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':application_id', this.application_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHireOfferSchemaReq {
  offer_schema_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':offer_schema_id', this.offer_schema_id)

    return path
  }
}

class MakeHireTransferOnboardByApplicationReq {
  application_id?: any
  user_id_type?: any
  actual_onboard_time?: any
  expected_conversion_time?: any
  job_requirement_id?: any
  operator_id?: any
  onboard_city_code?: any
  department?: any
  leader?: any
  sequence?: any
  level?: any
  employee_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      actual_onboard_time: this.actual_onboard_time,
      expected_conversion_time: this.expected_conversion_time,
      job_requirement_id: this.job_requirement_id,
      operator_id: this.operator_id,
      onboard_city_code: this.onboard_city_code,
      department: this.department,
      leader: this.leader,
      sequence: this.sequence,
      level: this.level,
      employee_type: this.employee_type
    }
  }

  getPath(path: string) {
    path = path.replace(':application_id', this.application_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateHireEmployeeReq {
  employee_id?: any
  user_id_type?: any
  operation?: any
  conversion_info?: any
  overboard_info?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      operation: this.operation,
      conversion_info: this.conversion_info,
      overboard_info: this.overboard_info
    }
  }

  getPath(path: string) {
    path = path.replace(':employee_id', this.employee_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHireEmployeeByApplicationReq {
  application_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.application_id !== undefined) {
      q['application_id'] = this.application_id
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetHireEmployeeReq {
  employee_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':employee_id', this.employee_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}
