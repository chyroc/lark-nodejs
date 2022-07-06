import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class BitableService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getBitableViewList 根据 app_token 和 table_id, 获取数据表的所有视图
  //
  // 该接口支持调用频率上限为 20 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/list
  async getBitableViewList(
    request: Bitable.GetBitableViewListReq
  ): Promise<{
    data: Bitable.GetBitableViewListResp
    response: Response
  }> {
    const req: RawRequestReq<GetBitableViewListReq> = {
      scope: 'Bitable',
      api: 'GetBitableViewList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views',
      body: new GetBitableViewListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBitableViewListReq, Bitable.GetBitableViewListResp>(req)
  }
  // createBitableView 在数据表中新增一个视图
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/create
  async createBitableView(
    request: Bitable.CreateBitableViewReq
  ): Promise<{
    data: Bitable.CreateBitableViewResp
    response: Response
  }> {
    const req: RawRequestReq<CreateBitableViewReq> = {
      scope: 'Bitable',
      api: 'CreateBitableView',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views',
      body: new CreateBitableViewReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateBitableViewReq, Bitable.CreateBitableViewResp>(req)
  }
  // deleteBitableView 删除数据表中的视图
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/delete
  async deleteBitableView(
    request: Bitable.DeleteBitableViewReq
  ): Promise<{
    data: Bitable.DeleteBitableViewResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteBitableViewReq> = {
      scope: 'Bitable',
      api: 'DeleteBitableView',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id',
      body: new DeleteBitableViewReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteBitableViewReq, Bitable.DeleteBitableViewResp>(req)
  }
  // getBitableRecordList 该接口用于列出数据表中的现有记录, 单次最多列出 100 行记录, 支持分页获取。
  //
  // 该接口支持调用频率上限为 1000 次/分钟
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/list
  async getBitableRecordList(
    request: Bitable.GetBitableRecordListReq
  ): Promise<{
    data: Bitable.GetBitableRecordListResp
    response: Response
  }> {
    const req: RawRequestReq<GetBitableRecordListReq> = {
      scope: 'Bitable',
      api: 'GetBitableRecordList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records',
      body: new GetBitableRecordListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBitableRecordListReq, Bitable.GetBitableRecordListResp>(req)
  }
  // getBitableRecord 该接口用于根据 record_id 的值检索现有记录
  //
  // 该接口支持调用频率上限为 20 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/get
  async getBitableRecord(
    request: Bitable.GetBitableRecordReq
  ): Promise<{
    data: Bitable.GetBitableRecordResp
    response: Response
  }> {
    const req: RawRequestReq<GetBitableRecordReq> = {
      scope: 'Bitable',
      api: 'GetBitableRecord',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id',
      body: new GetBitableRecordReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBitableRecordReq, Bitable.GetBitableRecordResp>(req)
  }
  // createBitableRecord 该接口用于在数据表中新增一条记录
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/create
  async createBitableRecord(
    request: Bitable.CreateBitableRecordReq
  ): Promise<{
    data: Bitable.CreateBitableRecordResp
    response: Response
  }> {
    const req: RawRequestReq<CreateBitableRecordReq> = {
      scope: 'Bitable',
      api: 'CreateBitableRecord',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records',
      body: new CreateBitableRecordReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateBitableRecordReq, Bitable.CreateBitableRecordResp>(req)
  }
  // batchCreateBitableRecord 该接口用于在数据表中新增多条记录
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_create
  async batchCreateBitableRecord(
    request: Bitable.BatchCreateBitableRecordReq
  ): Promise<{
    data: Bitable.BatchCreateBitableRecordResp
    response: Response
  }> {
    const req: RawRequestReq<BatchCreateBitableRecordReq> = {
      scope: 'Bitable',
      api: 'BatchCreateBitableRecord',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_create',
      body: new BatchCreateBitableRecordReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchCreateBitableRecordReq, Bitable.BatchCreateBitableRecordResp>(
      req
    )
  }
  // updateBitableRecord 该接口用于更新数据表中的一条记录
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/update
  async updateBitableRecord(
    request: Bitable.UpdateBitableRecordReq
  ): Promise<{
    data: Bitable.UpdateBitableRecordResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateBitableRecordReq> = {
      scope: 'Bitable',
      api: 'UpdateBitableRecord',
      method: 'PUT',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id',
      body: new UpdateBitableRecordReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateBitableRecordReq, Bitable.UpdateBitableRecordResp>(req)
  }
  // batchUpdateBitableRecord 该接口用于更新数据表中的多条记录
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_update
  async batchUpdateBitableRecord(
    request: Bitable.BatchUpdateBitableRecordReq
  ): Promise<{
    data: Bitable.BatchUpdateBitableRecordResp
    response: Response
  }> {
    const req: RawRequestReq<BatchUpdateBitableRecordReq> = {
      scope: 'Bitable',
      api: 'BatchUpdateBitableRecord',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_update',
      body: new BatchUpdateBitableRecordReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchUpdateBitableRecordReq, Bitable.BatchUpdateBitableRecordResp>(
      req
    )
  }
  // deleteBitableRecord 该接口用于删除数据表中的一条记录
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/delete
  async deleteBitableRecord(
    request: Bitable.DeleteBitableRecordReq
  ): Promise<{
    data: Bitable.DeleteBitableRecordResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteBitableRecordReq> = {
      scope: 'Bitable',
      api: 'DeleteBitableRecord',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id',
      body: new DeleteBitableRecordReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteBitableRecordReq, Bitable.DeleteBitableRecordResp>(req)
  }
  // batchDeleteBitableRecord 该接口用于删除数据表中现有的多条记录
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_delete
  async batchDeleteBitableRecord(
    request: Bitable.BatchDeleteBitableRecordReq
  ): Promise<{
    data: Bitable.BatchDeleteBitableRecordResp
    response: Response
  }> {
    const req: RawRequestReq<BatchDeleteBitableRecordReq> = {
      scope: 'Bitable',
      api: 'BatchDeleteBitableRecord',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_delete',
      body: new BatchDeleteBitableRecordReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchDeleteBitableRecordReq, Bitable.BatchDeleteBitableRecordResp>(
      req
    )
  }
  // getBitableFieldList 根据 app_token 和 table_id, 获取数据表的所有字段
  //
  // 该接口支持调用频率上限为 20 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/list
  async getBitableFieldList(
    request: Bitable.GetBitableFieldListReq
  ): Promise<{
    data: Bitable.GetBitableFieldListResp
    response: Response
  }> {
    const req: RawRequestReq<GetBitableFieldListReq> = {
      scope: 'Bitable',
      api: 'GetBitableFieldList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields',
      body: new GetBitableFieldListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBitableFieldListReq, Bitable.GetBitableFieldListResp>(req)
  }
  // createBitableField 该接口用于在数据表中新增一个字段
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/create
  async createBitableField(
    request: Bitable.CreateBitableFieldReq
  ): Promise<{
    data: Bitable.CreateBitableFieldResp
    response: Response
  }> {
    const req: RawRequestReq<CreateBitableFieldReq> = {
      scope: 'Bitable',
      api: 'CreateBitableField',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields',
      body: new CreateBitableFieldReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateBitableFieldReq, Bitable.CreateBitableFieldResp>(req)
  }
  // updateBitableField 该接口用于在数据表中更新一个字段
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/update
  async updateBitableField(
    request: Bitable.UpdateBitableFieldReq
  ): Promise<{
    data: Bitable.UpdateBitableFieldResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateBitableFieldReq> = {
      scope: 'Bitable',
      api: 'UpdateBitableField',
      method: 'PUT',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id',
      body: new UpdateBitableFieldReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateBitableFieldReq, Bitable.UpdateBitableFieldResp>(req)
  }
  // deleteBitableField 该接口用于在数据表中删除一个字段
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/delete
  async deleteBitableField(
    request: Bitable.DeleteBitableFieldReq
  ): Promise<{
    data: Bitable.DeleteBitableFieldResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteBitableFieldReq> = {
      scope: 'Bitable',
      api: 'DeleteBitableField',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id',
      body: new DeleteBitableFieldReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteBitableFieldReq, Bitable.DeleteBitableFieldResp>(req)
  }
  // getBitableAppRoleList 列出自定义权限
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/list
  async getBitableAppRoleList(
    request: Bitable.GetBitableAppRoleListReq
  ): Promise<{
    data: Bitable.GetBitableAppRoleListResp
    response: Response
  }> {
    const req: RawRequestReq<GetBitableAppRoleListReq> = {
      scope: 'Bitable',
      api: 'GetBitableAppRoleList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/roles',
      body: new GetBitableAppRoleListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBitableAppRoleListReq, Bitable.GetBitableAppRoleListResp>(req)
  }
  // createBitableAppRole 新增自定义权限
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create
  async createBitableAppRole(
    request: Bitable.CreateBitableAppRoleReq
  ): Promise<{
    data: Bitable.CreateBitableAppRoleResp
    response: Response
  }> {
    const req: RawRequestReq<CreateBitableAppRoleReq> = {
      scope: 'Bitable',
      api: 'CreateBitableAppRole',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/roles',
      body: new CreateBitableAppRoleReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateBitableAppRoleReq, Bitable.CreateBitableAppRoleResp>(req)
  }
  // deleteBitableAppRole 删除自定义权限
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/delete
  async deleteBitableAppRole(
    request: Bitable.DeleteBitableAppRoleReq
  ): Promise<{
    data: Bitable.DeleteBitableAppRoleResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteBitableAppRoleReq> = {
      scope: 'Bitable',
      api: 'DeleteBitableAppRole',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/roles/:role_id',
      body: new DeleteBitableAppRoleReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteBitableAppRoleReq, Bitable.DeleteBitableAppRoleResp>(req)
  }
  // updateBitableAppRole 更新自定义权限
  //
  // 更新自定义权限是全量更新, 会完全覆盖旧的自定义权限设置
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/update
  async updateBitableAppRole(
    request: Bitable.UpdateBitableAppRoleReq
  ): Promise<{
    data: Bitable.UpdateBitableAppRoleResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateBitableAppRoleReq> = {
      scope: 'Bitable',
      api: 'UpdateBitableAppRole',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/roles/:role_id',
      body: new UpdateBitableAppRoleReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateBitableAppRoleReq, Bitable.UpdateBitableAppRoleResp>(req)
  }
  // batchDeleteBitableAppRoleMember 批量删除自定义权限的协作者
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_delete
  async batchDeleteBitableAppRoleMember(
    request: Bitable.BatchDeleteBitableAppRoleMemberReq
  ): Promise<{
    data: Bitable.BatchDeleteBitableAppRoleMemberResp
    response: Response
  }> {
    const req: RawRequestReq<BatchDeleteBitableAppRoleMemberReq> = {
      scope: 'Bitable',
      api: 'BatchDeleteBitableAppRoleMember',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_delete',
      body: new BatchDeleteBitableAppRoleMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      BatchDeleteBitableAppRoleMemberReq,
      Bitable.BatchDeleteBitableAppRoleMemberResp
    >(req)
  }
  // batchCreateBitableAppRoleMember 批量新增自定义权限的协作者
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_create
  async batchCreateBitableAppRoleMember(
    request: Bitable.BatchCreateBitableAppRoleMemberReq
  ): Promise<{
    data: Bitable.BatchCreateBitableAppRoleMemberResp
    response: Response
  }> {
    const req: RawRequestReq<BatchCreateBitableAppRoleMemberReq> = {
      scope: 'Bitable',
      api: 'BatchCreateBitableAppRoleMember',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_create',
      body: new BatchCreateBitableAppRoleMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      BatchCreateBitableAppRoleMemberReq,
      Bitable.BatchCreateBitableAppRoleMemberResp
    >(req)
  }
  // getBitableAppRoleMemberList 列出自定义权限的协作者
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/list
  async getBitableAppRoleMemberList(
    request: Bitable.GetBitableAppRoleMemberListReq
  ): Promise<{
    data: Bitable.GetBitableAppRoleMemberListResp
    response: Response
  }> {
    const req: RawRequestReq<GetBitableAppRoleMemberListReq> = {
      scope: 'Bitable',
      api: 'GetBitableAppRoleMemberList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members',
      body: new GetBitableAppRoleMemberListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      GetBitableAppRoleMemberListReq,
      Bitable.GetBitableAppRoleMemberListResp
    >(req)
  }
  // createBitableAppRoleMember 新增自定义权限的协作者
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/create
  async createBitableAppRoleMember(
    request: Bitable.CreateBitableAppRoleMemberReq
  ): Promise<{
    data: Bitable.CreateBitableAppRoleMemberResp
    response: Response
  }> {
    const req: RawRequestReq<CreateBitableAppRoleMemberReq> = {
      scope: 'Bitable',
      api: 'CreateBitableAppRoleMember',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members',
      body: new CreateBitableAppRoleMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      CreateBitableAppRoleMemberReq,
      Bitable.CreateBitableAppRoleMemberResp
    >(req)
  }
  // deleteBitableAppRoleMember 删除自定义权限的协作者
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/delete
  async deleteBitableAppRoleMember(
    request: Bitable.DeleteBitableAppRoleMemberReq
  ): Promise<{
    data: Bitable.DeleteBitableAppRoleMemberResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteBitableAppRoleMemberReq> = {
      scope: 'Bitable',
      api: 'DeleteBitableAppRoleMember',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/:member_id',
      body: new DeleteBitableAppRoleMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteBitableAppRoleMemberReq,
      Bitable.DeleteBitableAppRoleMemberResp
    >(req)
  }
  // getBitableTableList 根据  app_token, 获取多维表格下的所有数据表
  //
  // 该接口支持调用频率上限为 20 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/list
  async getBitableTableList(
    request: Bitable.GetBitableTableListReq
  ): Promise<{
    data: Bitable.GetBitableTableListResp
    response: Response
  }> {
    const req: RawRequestReq<GetBitableTableListReq> = {
      scope: 'Bitable',
      api: 'GetBitableTableList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables',
      body: new GetBitableTableListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBitableTableListReq, Bitable.GetBitableTableListResp>(req)
  }
  // createBitableTable 新增一个数据表
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/create
  async createBitableTable(
    request: Bitable.CreateBitableTableReq
  ): Promise<{
    data: Bitable.CreateBitableTableResp
    response: Response
  }> {
    const req: RawRequestReq<CreateBitableTableReq> = {
      scope: 'Bitable',
      api: 'CreateBitableTable',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables',
      body: new CreateBitableTableReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateBitableTableReq, Bitable.CreateBitableTableResp>(req)
  }
  // batchCreateBitableTable 新增多个数据表
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_create
  async batchCreateBitableTable(
    request: Bitable.BatchCreateBitableTableReq
  ): Promise<{
    data: Bitable.BatchCreateBitableTableResp
    response: Response
  }> {
    const req: RawRequestReq<BatchCreateBitableTableReq> = {
      scope: 'Bitable',
      api: 'BatchCreateBitableTable',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables/batch_create',
      body: new BatchCreateBitableTableReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchCreateBitableTableReq, Bitable.BatchCreateBitableTableResp>(req)
  }
  // deleteBitableTable 删除一个数据表
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/delete
  async deleteBitableTable(
    request: Bitable.DeleteBitableTableReq
  ): Promise<{
    data: Bitable.DeleteBitableTableResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteBitableTableReq> = {
      scope: 'Bitable',
      api: 'DeleteBitableTable',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables/:table_id',
      body: new DeleteBitableTableReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteBitableTableReq, Bitable.DeleteBitableTableResp>(req)
  }
  // batchDeleteBitableTable 删除多个数据表
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_delete
  async batchDeleteBitableTable(
    request: Bitable.BatchDeleteBitableTableReq
  ): Promise<{
    data: Bitable.BatchDeleteBitableTableResp
    response: Response
  }> {
    const req: RawRequestReq<BatchDeleteBitableTableReq> = {
      scope: 'Bitable',
      api: 'BatchDeleteBitableTable',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token/tables/batch_delete',
      body: new BatchDeleteBitableTableReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchDeleteBitableTableReq, Bitable.BatchDeleteBitableTableResp>(req)
  }
  // updateBitableTableForm 该接口用于更新表单中的元数据项
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/patch
  async updateBitableTableForm(
    request: Bitable.UpdateBitableTableFormReq
  ): Promise<{
    data: Bitable.UpdateBitableTableFormResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateBitableTableFormReq> = {
      scope: 'Bitable',
      api: 'UpdateBitableTableForm',
      method: 'PATCH',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id',
      body: new UpdateBitableTableFormReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateBitableTableFormReq, Bitable.UpdateBitableTableFormResp>(req)
  }
  // getBitableTableForm 获取表单的所有元数据项
  //
  // 该接口支持调用频率上限为 20 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/get
  async getBitableTableForm(
    request: Bitable.GetBitableTableFormReq
  ): Promise<{
    data: Bitable.GetBitableTableFormResp
    response: Response
  }> {
    const req: RawRequestReq<GetBitableTableFormReq> = {
      scope: 'Bitable',
      api: 'GetBitableTableForm',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id',
      body: new GetBitableTableFormReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBitableTableFormReq, Bitable.GetBitableTableFormResp>(req)
  }
  // updateBitableTableFormField 该接口用于更新表单中的问题项
  //
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/patch
  async updateBitableTableFormField(
    request: Bitable.UpdateBitableTableFormFieldReq
  ): Promise<{
    data: Bitable.UpdateBitableTableFormFieldResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateBitableTableFormFieldReq> = {
      scope: 'Bitable',
      api: 'UpdateBitableTableFormField',
      method: 'PATCH',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields/:field_id',
      body: new UpdateBitableTableFormFieldReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateBitableTableFormFieldReq,
      Bitable.UpdateBitableTableFormFieldResp
    >(req)
  }
  // getBitableTableFormFieldList 列出表单的所有问题项
  //
  // 该接口支持调用频率上限为 20 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/list
  async getBitableTableFormFieldList(
    request: Bitable.GetBitableTableFormFieldListReq
  ): Promise<{
    data: Bitable.GetBitableTableFormFieldListResp
    response: Response
  }> {
    const req: RawRequestReq<GetBitableTableFormFieldListReq> = {
      scope: 'Bitable',
      api: 'GetBitableTableFormFieldList',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields',
      body: new GetBitableTableFormFieldListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      GetBitableTableFormFieldListReq,
      Bitable.GetBitableTableFormFieldListResp
    >(req)
  }
  // updateBitableMeta 通过 app_token 更新多维表格元数据
  //
  // - 飞书文档、飞书表格、知识库中的多维表格不支持开启高级权限
  // - 此接口非原子操作, 先修改多维表格名字, 后开关高级权限。可能存在部分成功的情况
  // 该接口支持调用频率上限为 10 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update
  async updateBitableMeta(
    request: Bitable.UpdateBitableMetaReq
  ): Promise<{
    data: Bitable.UpdateBitableMetaResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateBitableMetaReq> = {
      scope: 'Bitable',
      api: 'UpdateBitableMeta',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token',
      body: new UpdateBitableMetaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateBitableMetaReq, Bitable.UpdateBitableMetaResp>(req)
  }
  // getBitableMeta 通过 app_token 获取多维表格元数据
  //
  // 该接口支持调用频率上限为 20 QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/get
  async getBitableMeta(
    request: Bitable.GetBitableMetaReq
  ): Promise<{
    data: Bitable.GetBitableMetaResp
    response: Response
  }> {
    const req: RawRequestReq<GetBitableMetaReq> = {
      scope: 'Bitable',
      api: 'GetBitableMeta',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/bitable/v1/apps/:app_token',
      body: new GetBitableMetaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetBitableMetaReq, Bitable.GetBitableMetaResp>(req)
  }
}

export declare namespace Bitable {
  export interface GetBitableViewListReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "vewTpR1urY"
  }

  export interface GetBitableViewListResp {
    items?: GetBitableViewListRespItem[] // 视图信息
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
    total: number // 总数
  }

  export interface GetBitableViewListRespItem {
    view_id: string // 视图Id
    view_name: string // 视图名字
    view_type: string // 视图类型
  }

  export interface getBitableViewListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBitableViewListResp
  }

  export interface CreateBitableViewReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    view_name: string // 视图名字, 示例值: "表格视图1"
    view_type?: string // 视图类型, 示例值: "grid", 可选值有: grid: 表格视图, kanban: 看板视图, gallery: 画册视图, gantt: 甘特视图, form: 表单视图
  }

  export interface CreateBitableViewResp {
    view: CreateBitableViewRespView // 视图
  }

  export interface CreateBitableViewRespView {
    view_id: string // 视图Id
    view_name: string // 视图名字
    view_type: string // 视图类型
  }

  export interface createBitableViewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateBitableViewResp
  }

  export interface DeleteBitableViewReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    view_id: string // 视图Id, 示例值: "vewTpR1urY"
  }

  export interface DeleteBitableViewResp {}

  export interface deleteBitableViewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteBitableViewResp
  }

  export interface GetBitableRecordListReq {
    app_token: string // bitable app token, 示例值: "bascnCMII2ORej2RItqpZZUNMIe"
    table_id: string // table id, 示例值: "tblxI2tWaxP5dG7p"
    view_id?: string // 视图 id, 注意: 如 filter 或 sort 有值, view_id 会被忽略, 示例值: "vewqhz51lk"
    filter?: string // 筛选参数, 注意: 1.筛选记录的表达式不超过2000个字符, 2.不支持对“人员”以及“关联字段”的属性进行过滤筛选, 如人员的 OpenID, 3.仅支持字段在页面展示字符值进行筛选, 详细请参考[记录筛选开发指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/filter), 示例值: "示例表达式: AND(CurrentValue.[身高]>180, CurrentValue.[体重]>150)"
    sort?: string // 排序参数, 注意: 1.表达式需要不超过1000字符, 2.不支持对带“公式”和“关联字段”的表的使用, 示例值: "["字段1 DESC", "字段2 ASC"], 注意: 使用引号将字段名称和顺序逆序连接起来。"
    field_names?: string // 字段名称, 示例值: "["字段1"]"
    text_field_as_array?: boolean // 控制多行文本字段数据的返回格式, true 表示以数组形式返回, 注意: 1.多行文本中如果有超链接部分, 则会返回链接的 URL, 2.目前可以返回多行文本中 URL 类型为多维表格链接、飞书 doc、飞书 sheet的URL类型以及@人员的数据结构, 示例值: true
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    display_formula_ref?: boolean // 控制公式、查找引用是否显示完整的原样返回结果, 示例值: true
    automatic_fields?: boolean // 控制是否返回自动计算的字段, 例如 `created_by`/`created_time`/`last_modified_by`/`last_modified_time`, true 表示返回, 示例值: true
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "recn0hoyXL"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetBitableRecordListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    total: number // 总数
    items?: GetBitableRecordListRespItem[] // 记录信息
  }

  export interface GetBitableRecordListRespItem {
    record_id: string // 记录 id
    created_by: GetBitableRecordListRespItemCreatedBy // 创建人
    created_time: number // 创建时间
    last_modified_by: GetBitableRecordListRespItemLastModifiedBy // 修改人
    last_modified_time: number // 最近更新时间
    fields?: { [key: string]: any } // 记录字段, 关于支持新增的字段类型, 请参考[接入指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bitable/notification)
  }

  export interface GetBitableRecordListRespItemCreatedBy {
    id: string // 人员Id
    name: string // 中文姓名
    en_name: string // 英文姓名
    email: string // 邮箱
  }

  export interface GetBitableRecordListRespItemLastModifiedBy {
    id: string // 人员Id
    name: string // 中文姓名
    en_name: string // 英文姓名
    email: string // 邮箱
  }

  export interface getBitableRecordListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBitableRecordListResp
  }

  export interface GetBitableRecordReq {
    app_token: string // bitable app token, 示例值: "bascnCMII2ORej2RItqpZZUNMIe"
    table_id: string // table id, 示例值: "tblxI2tWaxP5dG7p"
    record_id: string // 单条记录的 id, 示例值: "recn0hoyXL"
    text_field_as_array?: boolean // 控制多行文本字段数据的返回格式, true 表示以数组形式返回, 示例值: true
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    display_formula_ref?: boolean // 控制公式、查找引用是否显示完整的原样返回结果, 示例值: true
    automatic_fields?: boolean // 控制是否返回自动计算的字段, 例如 `created_by`/`created_time`/`last_modified_by`/`last_modified_time`, true 表示返回, 示例值: true
  }

  export interface GetBitableRecordResp {
    record: GetBitableRecordRespRecord // 记录
  }

  export interface GetBitableRecordRespRecord {
    record_id: string // 记录 id
    created_by: GetBitableRecordRespRecordCreatedBy // 创建人
    created_time: number // 创建时间
    last_modified_by: GetBitableRecordRespRecordLastModifiedBy // 修改人
    last_modified_time: number // 最近更新时间
    fields?: { [key: string]: any } // 记录字段, 关于支持新增的字段类型, 请参考[接入指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bitable/notification)
  }

  export interface GetBitableRecordRespRecordCreatedBy {
    id: string // 人员Id
    name: string // 中文姓名
    en_name: string // 英文姓名
    email: string // 邮箱
  }

  export interface GetBitableRecordRespRecordLastModifiedBy {
    id: string // 人员Id
    name: string // 中文姓名
    en_name: string // 英文姓名
    email: string // 邮箱
  }

  export interface getBitableRecordResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBitableRecordResp
  }

  export interface CreateBitableRecordReq {
    app_token: string // bitable app token, 示例值: "bascng7vrxcxpig7geggXiCtadY"
    table_id: string // table id, 示例值: "tblUa9vcYjWQYJCj"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    fields?: { [key: string]: any } // 记录字段, 关于支持新增的字段类型, 请参考[接入指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bitable/notification)
  }

  export interface CreateBitableRecordResp {
    record: CreateBitableRecordRespRecord // 记录
  }

  export interface CreateBitableRecordRespRecord {
    record_id: string // 记录 id
    fields?: { [key: string]: any } // 记录字段, 关于支持新增的字段类型, 请参考[接入指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bitable/notification)
  }

  export interface createBitableRecordResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateBitableRecordResp
  }

  export interface BatchCreateBitableRecordReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    records?: BatchCreateBitableRecordReqRecord[] // 记录
  }

  export interface BatchCreateBitableRecordReqRecord {
    fields?: { [key: string]: any } // 记录字段, 关于支持新增的字段类型, 请参考[接入指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bitable/notification)
  }

  export interface BatchCreateBitableRecordResp {
    records?: BatchCreateBitableRecordRespRecord[] // 记录
  }

  export interface BatchCreateBitableRecordRespRecord {
    record_id: string // 记录 id
    fields?: { [key: string]: any } // 记录字段, 关于支持新增的字段类型, 请参考[接入指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bitable/notification)
  }

  export interface batchCreateBitableRecordResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchCreateBitableRecordResp
  }

  export interface UpdateBitableRecordReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    record_id: string // 单条记录的 id, 示例值: "recqwIwhc6"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    fields?: { [key: string]: any } // 记录字段, 关于支持新增的字段类型, 请参考[接入指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bitable/notification)
  }

  export interface UpdateBitableRecordResp {
    record: UpdateBitableRecordRespRecord // {, "fields": {, "人力评估": 2, "任务执行人": [, {, "id": "ou_debc524b2d8cb187704df652b43d29de", }, ], "任务描述": "多渠道收集用户反馈", "对应 OKR": [, "recqwIwhc6", "recOuEJMvN", ], "截止日期": 1609516800000, "是否完成": true, "状态": "已结束", "相关部门": [, "销售", "客服", ], }, }
  }

  export interface UpdateBitableRecordRespRecord {
    record_id: string // 记录 id
    fields?: { [key: string]: any } // 记录字段, 关于支持新增的字段类型, 请参考[接入指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bitable/notification)
  }

  export interface updateBitableRecordResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateBitableRecordResp
  }

  export interface BatchUpdateBitableRecordReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    records?: BatchUpdateBitableRecordReqRecord[] // 记录
  }

  export interface BatchUpdateBitableRecordReqRecord {
    record_id?: string // 记录 id, 示例值: "recqwIwhc6"
    fields?: { [key: string]: any } // 记录字段, 关于支持新增的字段类型, 请参考[接入指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bitable/notification)
  }

  export interface BatchUpdateBitableRecordResp {
    records?: BatchUpdateBitableRecordRespRecord[] // 记录
  }

  export interface BatchUpdateBitableRecordRespRecord {
    record_id: string // 记录 id
    fields?: { [key: string]: any } // 记录字段, 关于支持新增的字段类型, 请参考[接入指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bitable/notification)
  }

  export interface batchUpdateBitableRecordResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchUpdateBitableRecordResp
  }

  export interface DeleteBitableRecordReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    record_id: string // 单条记录的Id, 示例值: "recpCsf4ME"
  }

  export interface DeleteBitableRecordResp {
    deleted: boolean // 是否成功删除
    record_id: string // 删除的记录 ID
  }

  export interface deleteBitableRecordResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteBitableRecordResp
  }

  export interface BatchDeleteBitableRecordReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    records?: string[] // 删除的多条记录id列表, 示例值: [, "recIcJBbvC", "recvmiCORa", ]
  }

  export interface BatchDeleteBitableRecordResp {
    records?: BatchDeleteBitableRecordRespRecord[] // 记录
  }

  export interface BatchDeleteBitableRecordRespRecord {
    deleted: boolean // 是否成功删除
    record_id: string // 删除的记录 ID
  }

  export interface batchDeleteBitableRecordResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchDeleteBitableRecordResp
  }

  export interface GetBitableFieldListReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    view_id?: string // 视图 ID, 示例值: "vewOVMEXPF"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "fldwJ4YrtB"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetBitableFieldListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    total: number // 总数
    items?: GetBitableFieldListRespItem[] // 字段信息
  }

  export interface GetBitableFieldListRespItem {
    field_id: string // 多维表格字段 id
    field_name: string // 多维表格字段名
    type: number // 多维表格字段类型, 可选值有: `1`: 多行文本, `2`: 数字, `3`: 单选, `4`: 多选, `5`: 日期, `7`: 复选框, `11`: 人员, `15`: 超链接, `17`: 附件, `18`: 关联, `20`: 公式, `21`: 双向关联, `1001`: 创建时间, `1002`: 最后更新时间, `1003`: 创建人, `1004`: 修改人
    property: GetBitableFieldListRespItemProperty // 字段属性, 具体参考: [字段编辑指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/guide)
  }

  export interface GetBitableFieldListRespItemProperty {
    options?: GetBitableFieldListRespItemPropertyOption[] // 单选、多选字段的选项信息
    formatter: string // 数字、公式字段的显示格式
    date_formatter: string // 日期、创建时间、最后更新时间字段的显示格式
    auto_fill: boolean // 日期字段中新纪录自动填写创建时间
    multiple: boolean // 人员字段中允许添加多个成员, 单向关联、双向关联中允许添加多个记录
    table_id: string // 单向关联、双向关联字段中关联的数据表的id
    table_name: string // 单向关联、双向关联字段中关联的数据表的名字
    back_field_name: string // 双向关联字段中关联的数据表中对应的双向关联字段的名字
  }

  export interface GetBitableFieldListRespItemPropertyOption {
    name: string // 选项名
    id: string // 选项id
    color: number // 选项颜色
  }

  export interface getBitableFieldListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBitableFieldListResp
  }

  export interface CreateBitableFieldReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    field_name: string // 多维表格字段名, 示例值: "多行文本"
    type: number // 多维表格字段类型, 示例值: 1, 可选值有: `1`: 多行文本, `2`: 数字, `3`: 单选, `4`: 多选, `5`: 日期, `7`: 复选框, `11`: 人员, `15`: 超链接, `17`: 附件, `18`: 关联, `20`: 公式, `21`: 双向关联, `1001`: 创建时间, `1002`: 最后更新时间, `1003`: 创建人, `1004`: 修改人
    property?: CreateBitableFieldReqProperty // 字段属性, 具体参考: [字段编辑指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/guide)
  }

  export interface CreateBitableFieldReqProperty {
    options?: CreateBitableFieldReqPropertyOption[] // 单选、多选字段的选项信息
    formatter?: string // 数字、公式字段的显示格式, 示例值: "0"
    date_formatter?: string // 日期、创建时间、最后更新时间字段的显示格式, 示例值: "日期格式"
    auto_fill?: boolean // 日期字段中新纪录自动填写创建时间, 示例值: false
    multiple?: boolean // 人员字段中允许添加多个成员, 单向关联、双向关联中允许添加多个记录, 示例值: false
    table_id?: string // 单向关联、双向关联字段中关联的数据表的id, 示例值: "tblsRc9GRRXKqhvW"
    table_name?: string // 单向关联、双向关联字段中关联的数据表的名字, 示例值: ""table2""
    back_field_name?: string // 双向关联字段中关联的数据表中对应的双向关联字段的名字, 示例值: ""table1-双向关联""
  }

  export interface CreateBitableFieldReqPropertyOption {
    name?: string // 选项名, 示例值: "红色"
    id?: string // 选项id, 示例值: "optKl35lnG"
    color?: number // 选项颜色, 示例值: 0, 取值范围: `0` ～ `54`
  }

  export interface CreateBitableFieldResp {
    field: CreateBitableFieldRespField // 字段
  }

  export interface CreateBitableFieldRespField {
    field_id: string // 多维表格字段 id
    field_name: string // 多维表格字段名
    type: number // 多维表格字段类型, 可选值有: `1`: 多行文本, `2`: 数字, `3`: 单选, `4`: 多选, `5`: 日期, `7`: 复选框, `11`: 人员, `15`: 超链接, `17`: 附件, `18`: 关联, `20`: 公式, `21`: 双向关联, `1001`: 创建时间, `1002`: 最后更新时间, `1003`: 创建人, `1004`: 修改人
    property: CreateBitableFieldRespFieldProperty // 字段属性, 具体参考: [字段编辑指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/guide)
  }

  export interface CreateBitableFieldRespFieldProperty {
    options?: CreateBitableFieldRespFieldPropertyOption[] // 单选、多选字段的选项信息
    formatter: string // 数字、公式字段的显示格式
    date_formatter: string // 日期、创建时间、最后更新时间字段的显示格式
    auto_fill: boolean // 日期字段中新纪录自动填写创建时间
    multiple: boolean // 人员字段中允许添加多个成员, 单向关联、双向关联中允许添加多个记录
    table_id: string // 单向关联、双向关联字段中关联的数据表的id
    table_name: string // 单向关联、双向关联字段中关联的数据表的名字
    back_field_name: string // 双向关联字段中关联的数据表中对应的双向关联字段的名字
  }

  export interface CreateBitableFieldRespFieldPropertyOption {
    name: string // 选项名
    id: string // 选项id
    color: number // 选项颜色
  }

  export interface createBitableFieldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateBitableFieldResp
  }

  export interface UpdateBitableFieldReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    field_id: string // field id, 示例值: "fldPTb0U2y"
    field_name: string // 多维表格字段名, 示例值: "多行文本"
    type: number // 多维表格字段类型, 示例值: 1, 可选值有: `1`: 多行文本, `2`: 数字, `3`: 单选, `4`: 多选, `5`: 日期, `7`: 复选框, `11`: 人员, `15`: 超链接, `17`: 附件, `18`: 关联, `20`: 公式, `21`: 双向关联, `1001`: 创建时间, `1002`: 最后更新时间, `1003`: 创建人, `1004`: 修改人
    property?: UpdateBitableFieldReqProperty // 字段属性, 具体参考: [字段编辑指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/guide)
  }

  export interface UpdateBitableFieldReqProperty {
    options?: UpdateBitableFieldReqPropertyOption[] // 单选、多选字段的选项信息
    formatter?: string // 数字、公式字段的显示格式, 示例值: "0"
    date_formatter?: string // 日期、创建时间、最后更新时间字段的显示格式, 示例值: "日期格式"
    auto_fill?: boolean // 日期字段中新纪录自动填写创建时间, 示例值: false
    multiple?: boolean // 人员字段中允许添加多个成员, 单向关联、双向关联中允许添加多个记录, 示例值: false
    table_id?: string // 单向关联、双向关联字段中关联的数据表的id, 示例值: "tblsRc9GRRXKqhvW"
    table_name?: string // 单向关联、双向关联字段中关联的数据表的名字, 示例值: ""table2""
    back_field_name?: string // 双向关联字段中关联的数据表中对应的双向关联字段的名字, 示例值: ""table1-双向关联""
  }

  export interface UpdateBitableFieldReqPropertyOption {
    name?: string // 选项名, 示例值: "红色"
    id?: string // 选项id, 示例值: "optKl35lnG"
    color?: number // 选项颜色, 示例值: 0, 取值范围: `0` ～ `54`
  }

  export interface UpdateBitableFieldResp {
    field: UpdateBitableFieldRespField // 字段
  }

  export interface UpdateBitableFieldRespField {
    field_id: string // 多维表格字段 id
    field_name: string // 多维表格字段名
    type: number // 多维表格字段类型, 可选值有: `1`: 多行文本, `2`: 数字, `3`: 单选, `4`: 多选, `5`: 日期, `7`: 复选框, `11`: 人员, `15`: 超链接, `17`: 附件, `18`: 关联, `20`: 公式, `21`: 双向关联, `1001`: 创建时间, `1002`: 最后更新时间, `1003`: 创建人, `1004`: 修改人
    property: UpdateBitableFieldRespFieldProperty // 字段属性, 具体参考: [字段编辑指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/guide)
  }

  export interface UpdateBitableFieldRespFieldProperty {
    options?: UpdateBitableFieldRespFieldPropertyOption[] // 单选、多选字段的选项信息
    formatter: string // 数字、公式字段的显示格式
    date_formatter: string // 日期、创建时间、最后更新时间字段的显示格式
    auto_fill: boolean // 日期字段中新纪录自动填写创建时间
    multiple: boolean // 人员字段中允许添加多个成员, 单向关联、双向关联中允许添加多个记录
    table_id: string // 单向关联、双向关联字段中关联的数据表的id
    table_name: string // 单向关联、双向关联字段中关联的数据表的名字
    back_field_name: string // 双向关联字段中关联的数据表中对应的双向关联字段的名字
  }

  export interface UpdateBitableFieldRespFieldPropertyOption {
    name: string // 选项名
    id: string // 选项id
    color: number // 选项颜色
  }

  export interface updateBitableFieldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateBitableFieldResp
  }

  export interface DeleteBitableFieldReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
    field_id: string // field id, 示例值: "fldPTb0U2y"
  }

  export interface DeleteBitableFieldResp {
    field_id: string // field id
    deleted: boolean // 删除标记
  }

  export interface deleteBitableFieldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteBitableFieldResp
  }

  export interface GetBitableAppRoleListReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `30`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "roljRpwIUt"
  }

  export interface GetBitableAppRoleListResp {
    items?: GetBitableAppRoleListRespItem[] // 自定义权限列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
    total: number // 总数
  }

  export interface GetBitableAppRoleListRespItem {
    role_name: string // 自定义权限的名字
    role_id: string // 自定义权限的id
    table_roles?: GetBitableAppRoleListRespItemTableRole[] // 数据表权限
  }

  export interface GetBitableAppRoleListRespItemTableRole {
    table_name: string // 数据表名
    table_perm: number // 数据表权限, `协作者可编辑自己的记录`和`可编辑指定字段`是`可编辑记录`的特殊情况, 可通过指定`rec_rule`或`field_perm`参数实现相同的效果, 可选值有: `0`: 无权限, `1`: 可阅读, `2`: 可编辑记录, `4`: 可编辑字段和记录
    rec_rule: GetBitableAppRoleListRespItemTableRoleRecRule // 记录筛选条件, 在table_perm为1或2时有意义, 用于指定可编辑或可阅读某些记录
    field_perm?: { [key: string]: number } // 字段权限, 仅在table_perm为2时有意义, 设置字段可编辑或可阅读。类型为 map, key 是字段名, value 是字段权限, value 枚举值有: `1`: 可阅读, `2`: 可编辑
  }

  export interface GetBitableAppRoleListRespItemTableRoleRecRule {
    conditions?: GetBitableAppRoleListRespItemTableRoleRecRuleCondition[] // 记录筛选条件
    conjunction: string // 多个筛选条件的关系, 可选值有: `and`: 与, `or`: 或
    other_perm: number // 其他记录权限, 仅在table_perm为2时有意义, 可选值有: `0`: 禁止查看, `1`: 仅可阅读
  }

  export interface GetBitableAppRoleListRespItemTableRoleRecRuleCondition {
    field_name: string // 字段名, 记录筛选条件是`创建人包含访问者本人`时, 此参数值为""
    operator: string // 运算符, 可选值有: `is`: 等于, `isNot`: 不等于, `contains`: 包含, `doesNotContain`: 不包含, `isEmpty`: 为空, `isNotEmpty`: 不为空
    value?: string[] // 单选或多选字段的选项id
    field_type: number // 字段类型
  }

  export interface getBitableAppRoleListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBitableAppRoleListResp
  }

  export interface CreateBitableAppRoleReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    role_name: string // 自定义权限的名字, 示例值: "自定义权限1"
    table_roles?: CreateBitableAppRoleReqTableRole[] // 数据表权限, 最大长度: `100`
  }

  export interface CreateBitableAppRoleReqTableRole {
    table_name: string // 数据表名, 示例值: "数据表1"
    table_perm: number // 数据表权限, `协作者可编辑自己的记录`和`可编辑指定字段`是`可编辑记录`的特殊情况, 可通过指定`rec_rule`或`field_perm`参数实现相同的效果, 示例值: 0, 可选值有: `0`: 无权限, `1`: 可阅读, `2`: 可编辑记录, `4`: 可编辑字段和记录, 默认值: `0`
    rec_rule?: CreateBitableAppRoleReqTableRoleRecRule // 记录筛选条件, 在table_perm为1或2时有意义, 用于指定可编辑或可阅读某些记录
    field_perm?: { [key: string]: number } // 字段权限, 仅在table_perm为2时有意义, 设置字段可编辑或可阅读。类型为 map, key 是字段名, value 是字段权限, value 枚举值有: `1`: 可阅读, `2`: 可编辑
  }

  export interface CreateBitableAppRoleReqTableRoleRecRule {
    conditions?: CreateBitableAppRoleReqTableRoleRecRuleCondition[] // 记录筛选条件, 最大长度: `100`
    conjunction?: string // 多个筛选条件的关系, 示例值: "and", 可选值有: `and`: 与, `or`: 或, 默认值: `and`
    other_perm?: number // 其他记录权限, 仅在table_perm为2时有意义, 示例值: 0, 可选值有: `0`: 禁止查看, `1`: 仅可阅读, 默认值: `0`
  }

  export interface CreateBitableAppRoleReqTableRoleRecRuleCondition {
    field_name: string // 字段名, 记录筛选条件是`创建人包含访问者本人`时, 此参数值为"", 示例值: "单选"
    operator?: string // 运算符, 示例值: "is", 可选值有: `is`: 等于, `isNot`: 不等于, `contains`: 包含, `doesNotContain`: 不包含, `isEmpty`: 为空, `isNotEmpty`: 不为空, 默认值: `is`
    value?: string[] // 单选或多选字段的选项id, 示例值: ["optbdVHf4q", "optrpd3eIJ"]
  }

  export interface CreateBitableAppRoleResp {
    role: CreateBitableAppRoleRespRole // 自定义权限
  }

  export interface CreateBitableAppRoleRespRole {
    role_name: string // 自定义权限的名字
    role_id: string // 自定义权限的id
    table_roles?: CreateBitableAppRoleRespRoleTableRole[] // 数据表权限
  }

  export interface CreateBitableAppRoleRespRoleTableRole {
    table_name: string // 数据表名
    table_perm: number // 数据表权限, `协作者可编辑自己的记录`和`可编辑指定字段`是`可编辑记录`的特殊情况, 可通过指定`rec_rule`或`field_perm`参数实现相同的效果, 可选值有: `0`: 无权限, `1`: 可阅读, `2`: 可编辑记录, `4`: 可编辑字段和记录
    rec_rule: CreateBitableAppRoleRespRoleTableRoleRecRule // 记录筛选条件, 在table_perm为1或2时有意义, 用于指定可编辑或可阅读某些记录
    field_perm?: { [key: string]: number } // 字段权限, 仅在table_perm为2时有意义, 设置字段可编辑或可阅读。类型为 map, key 是字段名, value 是字段权限, value 枚举值有: `1`: 可阅读, `2`: 可编辑
  }

  export interface CreateBitableAppRoleRespRoleTableRoleRecRule {
    conditions?: CreateBitableAppRoleRespRoleTableRoleRecRuleCondition[] // 记录筛选条件
    conjunction: string // 多个筛选条件的关系, 可选值有: `and`: 与, `or`: 或
    other_perm: number // 其他记录权限, 仅在table_perm为2时有意义, 可选值有: `0`: 禁止查看, `1`: 仅可阅读
  }

  export interface CreateBitableAppRoleRespRoleTableRoleRecRuleCondition {
    field_name: string // 字段名, 记录筛选条件是`创建人包含访问者本人`时, 此参数值为""
    operator: string // 运算符, 可选值有: `is`: 等于, `isNot`: 不等于, `contains`: 包含, `doesNotContain`: 不包含, `isEmpty`: 为空, `isNotEmpty`: 不为空
    value?: string[] // 单选或多选字段的选项id
    field_type: number // 字段类型
  }

  export interface createBitableAppRoleResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateBitableAppRoleResp
  }

  export interface DeleteBitableAppRoleReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    role_id: string // 自定义权限的id, 示例值: "roljRpwIUt"
  }

  export interface DeleteBitableAppRoleResp {}

  export interface deleteBitableAppRoleResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteBitableAppRoleResp
  }

  export interface UpdateBitableAppRoleReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    role_id: string // 自定义权限的id, 示例值: "roljRpwIUt"
    role_name: string // 自定义权限的名字, 示例值: "自定义权限1"
    table_roles?: UpdateBitableAppRoleReqTableRole[] // 数据表权限, 最大长度: `100`
  }

  export interface UpdateBitableAppRoleReqTableRole {
    table_name: string // 数据表名, 示例值: "数据表1"
    table_perm: number // 数据表权限, `协作者可编辑自己的记录`和`可编辑指定字段`是`可编辑记录`的特殊情况, 可通过指定`rec_rule`或`field_perm`参数实现相同的效果, 示例值: 0, 可选值有: `0`: 无权限, `1`: 可阅读, `2`: 可编辑记录, `4`: 可编辑字段和记录, 默认值: `0`
    rec_rule?: UpdateBitableAppRoleReqTableRoleRecRule // 记录筛选条件, 在table_perm为1或2时有意义, 用于指定可编辑或可阅读某些记录
    field_perm?: { [key: string]: number } // 字段权限, 仅在table_perm为2时有意义, 设置字段可编辑或可阅读。类型为 map, key 是字段名, value 是字段权限, value 枚举值有: `1`: 可阅读, `2`: 可编辑
  }

  export interface UpdateBitableAppRoleReqTableRoleRecRule {
    conditions?: UpdateBitableAppRoleReqTableRoleRecRuleCondition[] // 记录筛选条件, 最大长度: `100`
    conjunction?: string // 多个筛选条件的关系, 示例值: "and", 可选值有: `and`: 与, `or`: 或, 默认值: `and`
    other_perm?: number // 其他记录权限, 仅在table_perm为2时有意义, 示例值: 0, 可选值有: `0`: 禁止查看, `1`: 仅可阅读, 默认值: `0`
  }

  export interface UpdateBitableAppRoleReqTableRoleRecRuleCondition {
    field_name: string // 字段名, 记录筛选条件是`创建人包含访问者本人`时, 此参数值为"", 示例值: "单选"
    operator?: string // 运算符, 示例值: "is", 可选值有: `is`: 等于, `isNot`: 不等于, `contains`: 包含, `doesNotContain`: 不包含, `isEmpty`: 为空, `isNotEmpty`: 不为空, 默认值: `is`
    value?: string[] // 单选或多选字段的选项id, 示例值: ["optbdVHf4q", "optrpd3eIJ"]
  }

  export interface UpdateBitableAppRoleResp {
    role: UpdateBitableAppRoleRespRole // 自定义权限
  }

  export interface UpdateBitableAppRoleRespRole {
    role_name: string // 自定义权限的名字
    role_id: string // 自定义权限的id
    table_roles?: UpdateBitableAppRoleRespRoleTableRole[] // 数据表权限
  }

  export interface UpdateBitableAppRoleRespRoleTableRole {
    table_name: string // 数据表名
    table_perm: number // 数据表权限, `协作者可编辑自己的记录`和`可编辑指定字段`是`可编辑记录`的特殊情况, 可通过指定`rec_rule`或`field_perm`参数实现相同的效果, 可选值有: `0`: 无权限, `1`: 可阅读, `2`: 可编辑记录, `4`: 可编辑字段和记录
    rec_rule: UpdateBitableAppRoleRespRoleTableRoleRecRule // 记录筛选条件, 在table_perm为1或2时有意义, 用于指定可编辑或可阅读某些记录
    field_perm?: { [key: string]: number } // 字段权限, 仅在table_perm为2时有意义, 设置字段可编辑或可阅读。类型为 map, key 是字段名, value 是字段权限, value 枚举值有: `1`: 可阅读, `2`: 可编辑
  }

  export interface UpdateBitableAppRoleRespRoleTableRoleRecRule {
    conditions?: UpdateBitableAppRoleRespRoleTableRoleRecRuleCondition[] // 记录筛选条件
    conjunction: string // 多个筛选条件的关系, 可选值有: `and`: 与, `or`: 或
    other_perm: number // 其他记录权限, 仅在table_perm为2时有意义, 可选值有: `0`: 禁止查看, `1`: 仅可阅读
  }

  export interface UpdateBitableAppRoleRespRoleTableRoleRecRuleCondition {
    field_name: string // 字段名, 记录筛选条件是`创建人包含访问者本人`时, 此参数值为""
    operator: string // 运算符, 可选值有: `is`: 等于, `isNot`: 不等于, `contains`: 包含, `doesNotContain`: 不包含, `isEmpty`: 为空, `isNotEmpty`: 不为空
    value?: string[] // 单选或多选字段的选项id
    field_type: number // 字段类型
  }

  export interface updateBitableAppRoleResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateBitableAppRoleResp
  }

  export interface BatchDeleteBitableAppRoleMemberReq {
    app_token: string // 多维表格文档 Token, 示例值: "bascnnKKvcoUblgmmhZkYqabcef"
    role_id: string // 自定义权限 ID, 示例值: "rolNGhPqks"
    member_list?: BatchDeleteBitableAppRoleMemberReqMember[] // 协作者列表, 最大长度: `100`
  }

  export interface BatchDeleteBitableAppRoleMemberReqMember {
    type?: string // 协作者 ID 类型, 示例值: "open_id", 可选值有: open_id: 协作者 ID 类型为 open_id, union_id: 协作者 ID 类型为 union_id, user_id: 协作者 ID 类型为 user_id, chat_id: 协作者 ID 类型为 chat_id, department_id: 协作者 ID 类型为 department_id, open_department_id: 协作者 ID 类型为 open_department_id, 默认值: `open_id`
    id: string // 协作者 ID, 示例值: "ou_35990a9d9052051a2fae9b2f1afabcef"
  }

  export interface BatchDeleteBitableAppRoleMemberResp {}

  export interface batchDeleteBitableAppRoleMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchDeleteBitableAppRoleMemberResp
  }

  export interface BatchCreateBitableAppRoleMemberReq {
    app_token: string // Bitable 文档 Token, 示例值: "bascnnKKvcoUblgmmhZkYqabcef"
    role_id: string // 自定义权限 ID, 示例值: "rolNGhPqks"
    member_list?: BatchCreateBitableAppRoleMemberReqMember[] // 协作者列表, 最大长度: `100`
  }

  export interface BatchCreateBitableAppRoleMemberReqMember {
    type?: string // 协作者 ID 类型, 示例值: "open_id", 可选值有: open_id: 协作者 ID 类型为 open_id, union_id: 协作者 ID 类型为 union_id, user_id: 协作者 ID 类型为 user_id, chat_id: 协作者 ID 类型为 chat_id, department_id: 协作者 ID 类型为 department_id, open_department_id: 协作者 ID 类型为 open_department_id, 默认值: `open_id`
    id: string // 协作者 ID, 示例值: "ou_35990a9d9052051a2fae9b2f1afabcef"
  }

  export interface BatchCreateBitableAppRoleMemberResp {}

  export interface batchCreateBitableAppRoleMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchCreateBitableAppRoleMemberResp
  }

  export interface GetBitableAppRoleMemberListReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    role_id: string // 自定义权限的id, 示例值: "roljRpwIUt"
    page_size?: number // 分页大小, 示例值: 100, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xxxxx"
  }

  export interface GetBitableAppRoleMemberListResp {
    items?: GetBitableAppRoleMemberListRespItem[] // 协作者列表
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    total: number // 总数
  }

  export interface GetBitableAppRoleMemberListRespItem {
    open_id: string // 用户的 open_id
    union_id: string // 用户的 union_id
    user_id: string // 用户的 user_id
    chat_id: string // 群聊的 chat_id
    department_id: string // 部门的 department_id
    open_department_id: string // 部门的 open_department_id
    member_name: string // 协作者名字
    member_en_name: string // 协作者英文名
    member_type: string // 协作者类型, 可选值有: `user`: 用户, `chat`: 群组, `department`: 部门
  }

  export interface getBitableAppRoleMemberListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBitableAppRoleMemberListResp
  }

  export interface CreateBitableAppRoleMemberReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    role_id: string // 自定义权限的id, 示例值: "roljRpwIUt"
    member_id_type?: string // 协作者id类型, 与请求体中的member_id要对应, 示例值: "open_id", 可选值有: `open_id`: 以open_id来识别协作者, `union_id`: 以union_id来识别协作者, `user_id`: 以user_id来识别协作者, `chat_id`: 以chat_id来识别协作者, `department_id`: 以department_id来识别协作者, `open_department_id`: 以open_department_id来识别协作者, 默认值: `open_id`
    member_id: string // 协作者id, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
  }

  export interface CreateBitableAppRoleMemberResp {}

  export interface createBitableAppRoleMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateBitableAppRoleMemberResp
  }

  export interface DeleteBitableAppRoleMemberReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    role_id: string // 自定义权限的id, 示例值: "roljRpwIUt"
    member_id: string // 协作者id, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad53uew2"
    member_id_type?: string // 协作者id类型, 与请求体中的member_id要对应, 示例值: "open_id", 可选值有: `open_id`: 以open_id来识别协作者, `union_id`: 以union_id来识别协作者, `user_id`: 以user_id来识别协作者, `chat_id`: 以chat_id来识别协作者, `department_id`: 以department_id来识别协作者, `open_department_id`: 以open_department_id来识别协作者, 默认值: `open_id`
  }

  export interface DeleteBitableAppRoleMemberResp {}

  export interface deleteBitableAppRoleMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteBitableAppRoleMemberResp
  }

  export interface GetBitableTableListReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "tblsRc9GRRXKqhvW"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetBitableTableListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    total: number // 总数
    items?: GetBitableTableListRespItem[] // 数据表信息
  }

  export interface GetBitableTableListRespItem {
    table_id: string // 数据表 id
    revision: number // 数据表的版本号
    name: string // 数据表名字
  }

  export interface getBitableTableListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBitableTableListResp
  }

  export interface CreateBitableTableReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    table?: CreateBitableTableReqTable // 数据表
  }

  export interface CreateBitableTableReqTable {
    name?: string // 数据表 名字, 示例值: "table1"
  }

  export interface CreateBitableTableResp {
    table_id: string // table id
  }

  export interface createBitableTableResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateBitableTableResp
  }

  export interface BatchCreateBitableTableReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    tables?: BatchCreateBitableTableReqTable[] // tables
  }

  export interface BatchCreateBitableTableReqTable {
    name?: string // 数据表 名字, 示例值: "table1"
  }

  export interface BatchCreateBitableTableResp {
    table_ids?: string[] // table ids
  }

  export interface batchCreateBitableTableResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchCreateBitableTableResp
  }

  export interface DeleteBitableTableReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_id: string // table id, 示例值: "tblsRc9GRRXKqhvW"
  }

  export interface DeleteBitableTableResp {}

  export interface deleteBitableTableResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteBitableTableResp
  }

  export interface BatchDeleteBitableTableReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    table_ids?: string[] // 删除的多条tableid列表, 示例值: ["tblsRc9GRRXKqhvW"]
  }

  export interface BatchDeleteBitableTableResp {}

  export interface batchDeleteBitableTableResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchDeleteBitableTableResp
  }

  export interface UpdateBitableTableFormReq {
    app_token: string // 多维表格文档 Token, 示例值: "bascnv1jIEppJdTCn3jOosabcef"
    table_id: string // 表格 ID, 示例值: "tblz8nadEUdxNMt5"
    form_id: string // 表单 ID, 示例值: "vew6oMbAa4"
    name?: string // 表单名称, 示例值: "表单"
    description?: string // 表单描述, 示例值: "表单描述"
    shared?: boolean // 是否开启共享, 示例值: true
    shared_limit?: string // 分享范围限制, 示例值: "tenant_editable", 可选值有: off: 仅邀请的人可填写, tenant_editable: 组织内获得链接的人可填写, anyone_editable: 互联网上获得链接的人可填写
    submit_limit_once?: boolean // 填写次数限制一次, 示例值: true
  }

  export interface UpdateBitableTableFormResp {
    form: UpdateBitableTableFormRespForm // 表单元数据信息
  }

  export interface UpdateBitableTableFormRespForm {
    name: string // 表单名称
    description: string // 表单描述
    shared: boolean // 是否开启共享
    shared_url: string // 分享 URL
    shared_limit: string // 分享范围限制, 可选值有: off: 仅邀请的人可填写, tenant_editable: 组织内获得链接的人可填写, anyone_editable: 互联网上获得链接的人可填写
    submit_limit_once: boolean // 填写次数限制一次
  }

  export interface updateBitableTableFormResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateBitableTableFormResp
  }

  export interface GetBitableTableFormReq {
    app_token: string // 多维表格文档 Token, 示例值: "bascnv1jIEppJdTCn3jOosabcef"
    table_id: string // 表格 ID, 示例值: "tblz8nadEUdxNMt5"
    form_id: string // 表单 ID, 示例值: "vew6oMbAa4"
  }

  export interface GetBitableTableFormResp {
    form: GetBitableTableFormRespForm // 表单元数据信息
  }

  export interface GetBitableTableFormRespForm {
    name: string // 表单名称
    description: string // 表单描述
    shared: boolean // 是否开启共享
    shared_url: string // 分享 URL
    shared_limit: string // 分享范围限制, 可选值有: off: 仅邀请的人可填写, tenant_editable: 组织内获得链接的人可填写, anyone_editable: 互联网上获得链接的人可填写
    submit_limit_once: boolean // 填写次数限制一次
  }

  export interface getBitableTableFormResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBitableTableFormResp
  }

  export interface UpdateBitableTableFormFieldReq {
    app_token: string // 多维表格文档 Token, 示例值: "bascnCMII2ORej2RItqpZZUNMIe"
    table_id: string // 表格 ID, 示例值: "tblsRc9GRRXKqhvW"
    form_id: string // 表单 ID, 示例值: "vewTpR1urY"
    field_id: string // 表单问题 ID, 示例值: "fldjX7dUj5"
    pre_field_id?: string // 上一个表单问题 ID, 用于支持调整表单问题的顺序, 通过前一个表单问题的 field_id 来确定位置；如果 pre_field_id 为空字符串, 则说明要排到首个表单问题, 示例值: "fldjX7dUj5"
    title?: string // 表单问题, 示例值: "多行文本"
    description?: string // 问题描述, 示例值: "多行文本描述"
    required?: boolean // 是否必填, 示例值: true
    visible?: boolean // 是否可见, 示例值: true
  }

  export interface UpdateBitableTableFormFieldResp {
    field: UpdateBitableTableFormFieldRespField // 更新后的表单问题项
  }

  export interface UpdateBitableTableFormFieldRespField {
    pre_field_id: string // 上一个表单问题 ID, 用于支持调整表单问题的顺序, 通过前一个表单问题的 field_id 来确定位置；如果 pre_field_id 为空字符串, 则说明要排到首个表单问题
    title: string // 表单问题
    description: string // 问题描述
    required: boolean // 是否必填
    visible: boolean // 是否可见
  }

  export interface updateBitableTableFormFieldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateBitableTableFormFieldResp
  }

  export interface GetBitableTableFormFieldListReq {
    app_token: string // 多维表格文档 Token, 示例值: "bascnCMII2ORej2RItqpZZUNMIe"
    table_id: string // 表格 ID, 示例值: "tblxI2tWaxP5dG7p"
    form_id: string // 表单 ID, 示例值: "vewTpR1urY"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "vewTpR1urY"
  }

  export interface GetBitableTableFormFieldListResp {
    items?: GetBitableTableFormFieldListRespItem[] // 表单问题信息
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
    total: number // 总数
  }

  export interface GetBitableTableFormFieldListRespItem {
    field_id: string // 表单问题 ID
    title: string // 表单问题
    description: string // 问题描述
    required: boolean // 是否必填
    visible: boolean // 是否可见
  }

  export interface getBitableTableFormFieldListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBitableTableFormFieldListResp
  }

  export interface UpdateBitableMetaReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
    name?: string // 新的多维表格名字, 示例值: "新的多维表格名字"
    is_advanced?: boolean // 多维表格是否开启高级权限, 示例值: false
  }

  export interface UpdateBitableMetaResp {
    app: UpdateBitableMetaRespApp // 多维表格元数据
  }

  export interface UpdateBitableMetaRespApp {
    app_token: string // 多维表格的 app_token
    name: string // 多维表格的名字
    is_advanced: boolean // 多维表格是否已开启高级权限
  }

  export interface updateBitableMetaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateBitableMetaResp
  }

  export interface GetBitableMetaReq {
    app_token: string // bitable app token, 示例值: "appbcbWCzen6D8dezhoCH2RpMAh"
  }

  export interface GetBitableMetaResp {
    app: GetBitableMetaRespApp // 多维表格元数据
  }

  export interface GetBitableMetaRespApp {
    app_token: string // 多维表格的 app_token
    name: string // 多维表格的名字
    revision: number // 多维表格的版本号（对 app 进行修改时更新, 如新增、删除数据表, 修改数据表名）
  }

  export interface getBitableMetaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetBitableMetaResp
  }
}

class GetBitableViewListReq {
  app_token?: any
  table_id?: any
  page_size?: any
  page_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)

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

class CreateBitableViewReq {
  app_token?: any
  table_id?: any
  view_name?: any
  view_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      view_name: this.view_name,
      view_type: this.view_type
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)

    return path
  }
}

class DeleteBitableViewReq {
  app_token?: any
  table_id?: any
  view_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)
    path = path.replace(':view_id', this.view_id)

    return path
  }
}

class GetBitableRecordListReq {
  app_token?: any
  table_id?: any
  view_id?: any
  filter?: any
  sort?: any
  field_names?: any
  text_field_as_array?: any
  user_id_type?: any
  display_formula_ref?: any
  automatic_fields?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)

    const q = {} as { [key: string]: any }
    if (this.view_id !== undefined) {
      q['view_id'] = this.view_id
    }
    if (this.filter !== undefined) {
      q['filter'] = this.filter
    }
    if (this.sort !== undefined) {
      q['sort'] = this.sort
    }
    if (this.field_names !== undefined) {
      q['field_names'] = this.field_names
    }
    if (this.text_field_as_array !== undefined) {
      q['text_field_as_array'] = this.text_field_as_array
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.display_formula_ref !== undefined) {
      q['display_formula_ref'] = this.display_formula_ref
    }
    if (this.automatic_fields !== undefined) {
      q['automatic_fields'] = this.automatic_fields
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

class GetBitableRecordReq {
  app_token?: any
  table_id?: any
  record_id?: any
  text_field_as_array?: any
  user_id_type?: any
  display_formula_ref?: any
  automatic_fields?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)
    path = path.replace(':record_id', this.record_id)

    const q = {} as { [key: string]: any }
    if (this.text_field_as_array !== undefined) {
      q['text_field_as_array'] = this.text_field_as_array
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.display_formula_ref !== undefined) {
      q['display_formula_ref'] = this.display_formula_ref
    }
    if (this.automatic_fields !== undefined) {
      q['automatic_fields'] = this.automatic_fields
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateBitableRecordReq {
  app_token?: any
  table_id?: any
  user_id_type?: any
  fields?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      fields: this.fields
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchCreateBitableRecordReq {
  app_token?: any
  table_id?: any
  user_id_type?: any
  records?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      records: this.records
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateBitableRecordReq {
  app_token?: any
  table_id?: any
  record_id?: any
  user_id_type?: any
  fields?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      fields: this.fields
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)
    path = path.replace(':record_id', this.record_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchUpdateBitableRecordReq {
  app_token?: any
  table_id?: any
  user_id_type?: any
  records?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      records: this.records
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteBitableRecordReq {
  app_token?: any
  table_id?: any
  record_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)
    path = path.replace(':record_id', this.record_id)

    return path
  }
}

class BatchDeleteBitableRecordReq {
  app_token?: any
  table_id?: any
  records?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      records: this.records
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)

    return path
  }
}

class GetBitableFieldListReq {
  app_token?: any
  table_id?: any
  view_id?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)

    const q = {} as { [key: string]: any }
    if (this.view_id !== undefined) {
      q['view_id'] = this.view_id
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

class CreateBitableFieldReq {
  app_token?: any
  table_id?: any
  field_name?: any
  type?: any
  property?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      field_name: this.field_name,
      type: this.type,
      property: this.property
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)

    return path
  }
}

class UpdateBitableFieldReq {
  app_token?: any
  table_id?: any
  field_id?: any
  field_name?: any
  type?: any
  property?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      field_name: this.field_name,
      type: this.type,
      property: this.property
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)
    path = path.replace(':field_id', this.field_id)

    return path
  }
}

class DeleteBitableFieldReq {
  app_token?: any
  table_id?: any
  field_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)
    path = path.replace(':field_id', this.field_id)

    return path
  }
}

class GetBitableAppRoleListReq {
  app_token?: any
  page_size?: any
  page_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)

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

class CreateBitableAppRoleReq {
  app_token?: any
  role_name?: any
  table_roles?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      role_name: this.role_name,
      table_roles: this.table_roles
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)

    return path
  }
}

class DeleteBitableAppRoleReq {
  app_token?: any
  role_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':role_id', this.role_id)

    return path
  }
}

class UpdateBitableAppRoleReq {
  app_token?: any
  role_id?: any
  role_name?: any
  table_roles?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      role_name: this.role_name,
      table_roles: this.table_roles
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':role_id', this.role_id)

    return path
  }
}

class BatchDeleteBitableAppRoleMemberReq {
  app_token?: any
  role_id?: any
  member_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      member_list: this.member_list
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':role_id', this.role_id)

    return path
  }
}

class BatchCreateBitableAppRoleMemberReq {
  app_token?: any
  role_id?: any
  member_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      member_list: this.member_list
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':role_id', this.role_id)

    return path
  }
}

class GetBitableAppRoleMemberListReq {
  app_token?: any
  role_id?: any
  page_size?: any
  page_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':role_id', this.role_id)

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

class CreateBitableAppRoleMemberReq {
  app_token?: any
  role_id?: any
  member_id_type?: any
  member_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      member_id: this.member_id
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':role_id', this.role_id)

    const q = {} as { [key: string]: any }
    if (this.member_id_type !== undefined) {
      q['member_id_type'] = this.member_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteBitableAppRoleMemberReq {
  app_token?: any
  role_id?: any
  member_id?: any
  member_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':role_id', this.role_id)
    path = path.replace(':member_id', this.member_id)

    const q = {} as { [key: string]: any }
    if (this.member_id_type !== undefined) {
      q['member_id_type'] = this.member_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetBitableTableListReq {
  app_token?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)

    const q = {} as { [key: string]: any }
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

class CreateBitableTableReq {
  app_token?: any
  user_id_type?: any
  table?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      table: this.table
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchCreateBitableTableReq {
  app_token?: any
  user_id_type?: any
  tables?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      tables: this.tables
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteBitableTableReq {
  app_token?: any
  table_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)

    return path
  }
}

class BatchDeleteBitableTableReq {
  app_token?: any
  table_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      table_ids: this.table_ids
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)

    return path
  }
}

class UpdateBitableTableFormReq {
  app_token?: any
  table_id?: any
  form_id?: any
  name?: any
  description?: any
  shared?: any
  shared_limit?: any
  submit_limit_once?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      description: this.description,
      shared: this.shared,
      shared_limit: this.shared_limit,
      submit_limit_once: this.submit_limit_once
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)
    path = path.replace(':form_id', this.form_id)

    return path
  }
}

class GetBitableTableFormReq {
  app_token?: any
  table_id?: any
  form_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)
    path = path.replace(':form_id', this.form_id)

    return path
  }
}

class UpdateBitableTableFormFieldReq {
  app_token?: any
  table_id?: any
  form_id?: any
  field_id?: any
  pre_field_id?: any
  title?: any
  description?: any
  required?: any
  visible?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      pre_field_id: this.pre_field_id,
      title: this.title,
      description: this.description,
      required: this.required,
      visible: this.visible
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)
    path = path.replace(':form_id', this.form_id)
    path = path.replace(':field_id', this.field_id)

    return path
  }
}

class GetBitableTableFormFieldListReq {
  app_token?: any
  table_id?: any
  form_id?: any
  page_size?: any
  page_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)
    path = path.replace(':table_id', this.table_id)
    path = path.replace(':form_id', this.form_id)

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

class UpdateBitableMetaReq {
  app_token?: any
  name?: any
  is_advanced?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      is_advanced: this.is_advanced
    }
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)

    return path
  }
}

class GetBitableMetaReq {
  app_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':app_token', this.app_token)

    return path
  }
}
