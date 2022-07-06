import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class MailService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // getMailUser 使用邮箱状态查询接口, 可以输入邮箱地址, 查询出该邮箱地址对应的类型以及状态
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user/query
  async getMailUser(
    request: Mail.GetMailUserReq
  ): Promise<{
    data: Mail.GetMailUserResp
    response: Response
  }> {
    const req: RawRequestReq<GetMailUserReq> = {
      scope: 'Mail',
      api: 'GetMailUser',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/users/query',
      body: new GetMailUserReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetMailUserReq, Mail.GetMailUserResp>(req)
  }
  // createMailGroup 创建一个邮件组
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/create
  async createMailGroup(
    request: Mail.CreateMailGroupReq
  ): Promise<{
    data: Mail.CreateMailGroupResp
    response: Response
  }> {
    const req: RawRequestReq<CreateMailGroupReq> = {
      scope: 'Mail',
      api: 'CreateMailGroup',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups',
      body: new CreateMailGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateMailGroupReq, Mail.CreateMailGroupResp>(req)
  }
  // getMailGroup 获取特定邮件组信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/get
  async getMailGroup(
    request: Mail.GetMailGroupReq
  ): Promise<{
    data: Mail.GetMailGroupResp
    response: Response
  }> {
    const req: RawRequestReq<GetMailGroupReq> = {
      scope: 'Mail',
      api: 'GetMailGroup',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id',
      body: new GetMailGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetMailGroupReq, Mail.GetMailGroupResp>(req)
  }
  // getMailGroupList 分页批量获取邮件组
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/list
  async getMailGroupList(
    request: Mail.GetMailGroupListReq
  ): Promise<{
    data: Mail.GetMailGroupListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMailGroupListReq> = {
      scope: 'Mail',
      api: 'GetMailGroupList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups',
      body: new GetMailGroupListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetMailGroupListReq, Mail.GetMailGroupListResp>(req)
  }
  // updateMailGroupPatch 更新邮件组部分字段, 没有填写的字段不会被更新
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/patch
  async updateMailGroupPatch(
    request: Mail.UpdateMailGroupPatchReq
  ): Promise<{
    data: Mail.UpdateMailGroupPatchResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateMailGroupPatchReq> = {
      scope: 'Mail',
      api: 'UpdateMailGroupPatch',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id',
      body: new UpdateMailGroupPatchReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateMailGroupPatchReq, Mail.UpdateMailGroupPatchResp>(req)
  }
  // updateMailGroup 更新邮件组所有信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/update
  async updateMailGroup(
    request: Mail.UpdateMailGroupReq
  ): Promise<{
    data: Mail.UpdateMailGroupResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateMailGroupReq> = {
      scope: 'Mail',
      api: 'UpdateMailGroup',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id',
      body: new UpdateMailGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateMailGroupReq, Mail.UpdateMailGroupResp>(req)
  }
  // deleteMailGroup 删除一个邮件组
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/delete
  async deleteMailGroup(
    request: Mail.DeleteMailGroupReq
  ): Promise<{
    data: Mail.DeleteMailGroupResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMailGroupReq> = {
      scope: 'Mail',
      api: 'DeleteMailGroup',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id',
      body: new DeleteMailGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteMailGroupReq, Mail.DeleteMailGroupResp>(req)
  }
  // createMailGroupMember 向邮件组添加单个成员
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/create
  async createMailGroupMember(
    request: Mail.CreateMailGroupMemberReq
  ): Promise<{
    data: Mail.CreateMailGroupMemberResp
    response: Response
  }> {
    const req: RawRequestReq<CreateMailGroupMemberReq> = {
      scope: 'Mail',
      api: 'CreateMailGroupMember',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id/members',
      body: new CreateMailGroupMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateMailGroupMemberReq, Mail.CreateMailGroupMemberResp>(req)
  }
  // getMailGroupMember 获取邮件组单个成员信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/get
  async getMailGroupMember(
    request: Mail.GetMailGroupMemberReq
  ): Promise<{
    data: Mail.GetMailGroupMemberResp
    response: Response
  }> {
    const req: RawRequestReq<GetMailGroupMemberReq> = {
      scope: 'Mail',
      api: 'GetMailGroupMember',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id/members/:member_id',
      body: new GetMailGroupMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetMailGroupMemberReq, Mail.GetMailGroupMemberResp>(req)
  }
  // getMailGroupMemberList 分页批量获取邮件组成员列表
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/list
  async getMailGroupMemberList(
    request: Mail.GetMailGroupMemberListReq
  ): Promise<{
    data: Mail.GetMailGroupMemberListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMailGroupMemberListReq> = {
      scope: 'Mail',
      api: 'GetMailGroupMemberList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id/members',
      body: new GetMailGroupMemberListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetMailGroupMemberListReq, Mail.GetMailGroupMemberListResp>(req)
  }
  // deleteMailGroupMember 删除邮件组单个成员
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/delete
  async deleteMailGroupMember(
    request: Mail.DeleteMailGroupMemberReq
  ): Promise<{
    data: Mail.DeleteMailGroupMemberResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMailGroupMemberReq> = {
      scope: 'Mail',
      api: 'DeleteMailGroupMember',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id/members/:member_id',
      body: new DeleteMailGroupMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteMailGroupMemberReq, Mail.DeleteMailGroupMemberResp>(req)
  }
  // createMailGroupPermissionMember 向邮件组添加单个自定义权限成员, 添加后该成员可发送邮件到该邮件组
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/create
  async createMailGroupPermissionMember(
    request: Mail.CreateMailGroupPermissionMemberReq
  ): Promise<{
    data: Mail.CreateMailGroupPermissionMemberResp
    response: Response
  }> {
    const req: RawRequestReq<CreateMailGroupPermissionMemberReq> = {
      scope: 'Mail',
      api: 'CreateMailGroupPermissionMember',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members',
      body: new CreateMailGroupPermissionMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CreateMailGroupPermissionMemberReq,
      Mail.CreateMailGroupPermissionMemberResp
    >(req)
  }
  // getMailGroupPermissionMember 获取邮件组单个权限成员信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/get
  async getMailGroupPermissionMember(
    request: Mail.GetMailGroupPermissionMemberReq
  ): Promise<{
    data: Mail.GetMailGroupPermissionMemberResp
    response: Response
  }> {
    const req: RawRequestReq<GetMailGroupPermissionMemberReq> = {
      scope: 'Mail',
      api: 'GetMailGroupPermissionMember',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/:permission_member_id',
      body: new GetMailGroupPermissionMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetMailGroupPermissionMemberReq,
      Mail.GetMailGroupPermissionMemberResp
    >(req)
  }
  // getMailGroupPermissionMemberList 分页批量获取邮件组权限成员列表
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/list
  async getMailGroupPermissionMemberList(
    request: Mail.GetMailGroupPermissionMemberListReq
  ): Promise<{
    data: Mail.GetMailGroupPermissionMemberListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMailGroupPermissionMemberListReq> = {
      scope: 'Mail',
      api: 'GetMailGroupPermissionMemberList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members',
      body: new GetMailGroupPermissionMemberListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetMailGroupPermissionMemberListReq,
      Mail.GetMailGroupPermissionMemberListResp
    >(req)
  }
  // deleteMailGroupPermissionMember 从自定义成员中删除单个成员, 删除后该成员无法发送邮件到该邮件组
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/delete
  async deleteMailGroupPermissionMember(
    request: Mail.DeleteMailGroupPermissionMemberReq
  ): Promise<{
    data: Mail.DeleteMailGroupPermissionMemberResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMailGroupPermissionMemberReq> = {
      scope: 'Mail',
      api: 'DeleteMailGroupPermissionMember',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/:permission_member_id',
      body: new DeleteMailGroupPermissionMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteMailGroupPermissionMemberReq,
      Mail.DeleteMailGroupPermissionMemberResp
    >(req)
  }
  // createMailGroupAlias 创建邮件组别名
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/create
  async createMailGroupAlias(
    request: Mail.CreateMailGroupAliasReq
  ): Promise<{
    data: Mail.CreateMailGroupAliasResp
    response: Response
  }> {
    const req: RawRequestReq<CreateMailGroupAliasReq> = {
      scope: 'Mail',
      api: 'CreateMailGroupAlias',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases',
      body: new CreateMailGroupAliasReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateMailGroupAliasReq, Mail.CreateMailGroupAliasResp>(req)
  }
  // getMailGroupAliasList 获取邮件组所有别名
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/list
  async getMailGroupAliasList(
    request: Mail.GetMailGroupAliasListReq
  ): Promise<{
    data: Mail.GetMailGroupAliasListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMailGroupAliasListReq> = {
      scope: 'Mail',
      api: 'GetMailGroupAliasList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases',
      body: new GetMailGroupAliasListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetMailGroupAliasListReq, Mail.GetMailGroupAliasListResp>(req)
  }
  // deleteMailGroupAlias 删除邮件组别名
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/delete
  async deleteMailGroupAlias(
    request: Mail.DeleteMailGroupAliasReq
  ): Promise<{
    data: Mail.DeleteMailGroupAliasResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMailGroupAliasReq> = {
      scope: 'Mail',
      api: 'DeleteMailGroupAlias',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases/:alias_id',
      body: new DeleteMailGroupAliasReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteMailGroupAliasReq, Mail.DeleteMailGroupAliasResp>(req)
  }
  // createPublicMailbox 创建一个公共邮箱
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/create
  async createPublicMailbox(
    request: Mail.CreatePublicMailboxReq
  ): Promise<{
    data: Mail.CreatePublicMailboxResp
    response: Response
  }> {
    const req: RawRequestReq<CreatePublicMailboxReq> = {
      scope: 'Mail',
      api: 'CreatePublicMailbox',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/public_mailboxes',
      body: new CreatePublicMailboxReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreatePublicMailboxReq, Mail.CreatePublicMailboxResp>(req)
  }
  // getPublicMailbox 获取公共邮箱信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/get
  async getPublicMailbox(
    request: Mail.GetPublicMailboxReq
  ): Promise<{
    data: Mail.GetPublicMailboxResp
    response: Response
  }> {
    const req: RawRequestReq<GetPublicMailboxReq> = {
      scope: 'Mail',
      api: 'GetPublicMailbox',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id',
      body: new GetPublicMailboxReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetPublicMailboxReq, Mail.GetPublicMailboxResp>(req)
  }
  // getPublicMailboxList 分页批量获取公共邮箱列表
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/list
  async getPublicMailboxList(
    request: Mail.GetPublicMailboxListReq
  ): Promise<{
    data: Mail.GetPublicMailboxListResp
    response: Response
  }> {
    const req: RawRequestReq<GetPublicMailboxListReq> = {
      scope: 'Mail',
      api: 'GetPublicMailboxList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/public_mailboxes',
      body: new GetPublicMailboxListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetPublicMailboxListReq, Mail.GetPublicMailboxListResp>(req)
  }
  // updatePublicMailboxPatch 更新公共邮箱部分字段, 没有填写的字段不会被更新
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/patch
  async updatePublicMailboxPatch(
    request: Mail.UpdatePublicMailboxPatchReq
  ): Promise<{
    data: Mail.UpdatePublicMailboxPatchResp
    response: Response
  }> {
    const req: RawRequestReq<UpdatePublicMailboxPatchReq> = {
      scope: 'Mail',
      api: 'UpdatePublicMailboxPatch',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id',
      body: new UpdatePublicMailboxPatchReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdatePublicMailboxPatchReq, Mail.UpdatePublicMailboxPatchResp>(req)
  }
  // updatePublicMailbox 更新公共邮箱所有信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/update
  async updatePublicMailbox(
    request: Mail.UpdatePublicMailboxReq
  ): Promise<{
    data: Mail.UpdatePublicMailboxResp
    response: Response
  }> {
    const req: RawRequestReq<UpdatePublicMailboxReq> = {
      scope: 'Mail',
      api: 'UpdatePublicMailbox',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id',
      body: new UpdatePublicMailboxReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdatePublicMailboxReq, Mail.UpdatePublicMailboxResp>(req)
  }
  // deletePublicMailbox 该接口会永久删除公共邮箱地址。可用于释放邮箱回收站的公共邮箱地址, 一旦删除, 该邮箱地址将无法恢复。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/delete
  async deletePublicMailbox(
    request: Mail.DeletePublicMailboxReq
  ): Promise<{
    data: Mail.DeletePublicMailboxResp
    response: Response
  }> {
    const req: RawRequestReq<DeletePublicMailboxReq> = {
      scope: 'Mail',
      api: 'DeletePublicMailbox',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id',
      body: new DeletePublicMailboxReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeletePublicMailboxReq, Mail.DeletePublicMailboxResp>(req)
  }
  // createPublicMailboxMember 向公共邮箱添加单个成员
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/create
  async createPublicMailboxMember(
    request: Mail.CreatePublicMailboxMemberReq
  ): Promise<{
    data: Mail.CreatePublicMailboxMemberResp
    response: Response
  }> {
    const req: RawRequestReq<CreatePublicMailboxMemberReq> = {
      scope: 'Mail',
      api: 'CreatePublicMailboxMember',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members',
      body: new CreatePublicMailboxMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreatePublicMailboxMemberReq, Mail.CreatePublicMailboxMemberResp>(
      req
    )
  }
  // getPublicMailboxMember 获取公共邮箱单个成员信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/get
  async getPublicMailboxMember(
    request: Mail.GetPublicMailboxMemberReq
  ): Promise<{
    data: Mail.GetPublicMailboxMemberResp
    response: Response
  }> {
    const req: RawRequestReq<GetPublicMailboxMemberReq> = {
      scope: 'Mail',
      api: 'GetPublicMailboxMember',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/:member_id',
      body: new GetPublicMailboxMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetPublicMailboxMemberReq, Mail.GetPublicMailboxMemberResp>(req)
  }
  // getPublicMailboxMemberList 分页批量获取公共邮箱成员列表
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/list
  async getPublicMailboxMemberList(
    request: Mail.GetPublicMailboxMemberListReq
  ): Promise<{
    data: Mail.GetPublicMailboxMemberListResp
    response: Response
  }> {
    const req: RawRequestReq<GetPublicMailboxMemberListReq> = {
      scope: 'Mail',
      api: 'GetPublicMailboxMemberList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members',
      body: new GetPublicMailboxMemberListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetPublicMailboxMemberListReq, Mail.GetPublicMailboxMemberListResp>(
      req
    )
  }
  // deletePublicMailboxMember 删除公共邮箱单个成员
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/delete
  async deletePublicMailboxMember(
    request: Mail.DeletePublicMailboxMemberReq
  ): Promise<{
    data: Mail.DeletePublicMailboxMemberResp
    response: Response
  }> {
    const req: RawRequestReq<DeletePublicMailboxMemberReq> = {
      scope: 'Mail',
      api: 'DeletePublicMailboxMember',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/:member_id',
      body: new DeletePublicMailboxMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeletePublicMailboxMemberReq, Mail.DeletePublicMailboxMemberResp>(
      req
    )
  }
  // clearPublicMailboxMember 删除公共邮箱所有成员
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/clear
  async clearPublicMailboxMember(
    request: Mail.ClearPublicMailboxMemberReq
  ): Promise<{
    data: Mail.ClearPublicMailboxMemberResp
    response: Response
  }> {
    const req: RawRequestReq<ClearPublicMailboxMemberReq> = {
      scope: 'Mail',
      api: 'ClearPublicMailboxMember',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/clear',
      body: new ClearPublicMailboxMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<ClearPublicMailboxMemberReq, Mail.ClearPublicMailboxMemberResp>(req)
  }
  // createMailPublicMailboxAlias 创建公共邮箱别名
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/create
  async createMailPublicMailboxAlias(
    request: Mail.CreateMailPublicMailboxAliasReq
  ): Promise<{
    data: Mail.CreateMailPublicMailboxAliasResp
    response: Response
  }> {
    const req: RawRequestReq<CreateMailPublicMailboxAliasReq> = {
      scope: 'Mail',
      api: 'CreateMailPublicMailboxAlias',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases',
      body: new CreateMailPublicMailboxAliasReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CreateMailPublicMailboxAliasReq,
      Mail.CreateMailPublicMailboxAliasResp
    >(req)
  }
  // getMailPublicMailboxAliasList 获取所有公共邮箱别名
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/list
  async getMailPublicMailboxAliasList(
    request: Mail.GetMailPublicMailboxAliasListReq
  ): Promise<{
    data: Mail.GetMailPublicMailboxAliasListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMailPublicMailboxAliasListReq> = {
      scope: 'Mail',
      api: 'GetMailPublicMailboxAliasList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases',
      body: new GetMailPublicMailboxAliasListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetMailPublicMailboxAliasListReq,
      Mail.GetMailPublicMailboxAliasListResp
    >(req)
  }
  // deleteMailPublicMailboxAlias 删除公共邮箱别名
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/delete
  async deleteMailPublicMailboxAlias(
    request: Mail.DeleteMailPublicMailboxAliasReq
  ): Promise<{
    data: Mail.DeleteMailPublicMailboxAliasResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMailPublicMailboxAliasReq> = {
      scope: 'Mail',
      api: 'DeleteMailPublicMailboxAlias',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases/:alias_id',
      body: new DeleteMailPublicMailboxAliasReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteMailPublicMailboxAliasReq,
      Mail.DeleteMailPublicMailboxAliasResp
    >(req)
  }
  // createMailUserMailboxAlias 创建用户邮箱别名
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/create
  async createMailUserMailboxAlias(
    request: Mail.CreateMailUserMailboxAliasReq
  ): Promise<{
    data: Mail.CreateMailUserMailboxAliasResp
    response: Response
  }> {
    const req: RawRequestReq<CreateMailUserMailboxAliasReq> = {
      scope: 'Mail',
      api: 'CreateMailUserMailboxAlias',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases',
      body: new CreateMailUserMailboxAliasReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateMailUserMailboxAliasReq, Mail.CreateMailUserMailboxAliasResp>(
      req
    )
  }
  // deleteMailUserMailboxAlias 删除用户邮箱别名
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/delete
  async deleteMailUserMailboxAlias(
    request: Mail.DeleteMailUserMailboxAliasReq
  ): Promise<{
    data: Mail.DeleteMailUserMailboxAliasResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMailUserMailboxAliasReq> = {
      scope: 'Mail',
      api: 'DeleteMailUserMailboxAlias',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases/:alias_id',
      body: new DeleteMailUserMailboxAliasReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteMailUserMailboxAliasReq, Mail.DeleteMailUserMailboxAliasResp>(
      req
    )
  }
  // getMailUserMailboxAliasList 获取用户邮箱所有别名
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/list
  async getMailUserMailboxAliasList(
    request: Mail.GetMailUserMailboxAliasListReq
  ): Promise<{
    data: Mail.GetMailUserMailboxAliasListResp
    response: Response
  }> {
    const req: RawRequestReq<GetMailUserMailboxAliasListReq> = {
      scope: 'Mail',
      api: 'GetMailUserMailboxAliasList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases',
      body: new GetMailUserMailboxAliasListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetMailUserMailboxAliasListReq,
      Mail.GetMailUserMailboxAliasListResp
    >(req)
  }
  // deleteMailUserMailbox 该接口会永久删除用户邮箱地址。可用于删除位于邮箱回收站中的用户邮箱地址, 一旦删除, 将无法恢复。该接口支持邮件的转移, 可以将被释放邮箱的邮件转移到另外一个可以使用的邮箱中。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox/delete
  async deleteMailUserMailbox(
    request: Mail.DeleteMailUserMailboxReq
  ): Promise<{
    data: Mail.DeleteMailUserMailboxResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteMailUserMailboxReq> = {
      scope: 'Mail',
      api: 'DeleteMailUserMailbox',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/mail/v1/user_mailboxes/:user_mailbox_id',
      body: new DeleteMailUserMailboxReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteMailUserMailboxReq, Mail.DeleteMailUserMailboxResp>(req)
  }
}

export declare namespace Mail {
  export interface GetMailUserReq {
    email_list?: string[] // 需要查询的邮箱地址列表, 示例值: ["aaa@lark.com", "bbb@lark.com"]
  }

  export interface GetMailUserResp {
    user_list?: GetMailUserRespUser[] // 邮箱地址以及其对应的类型类型和状态
  }

  export interface GetMailUserRespUser {
    email: string // 邮箱地址
    status: number // 邮箱地址状态, 可选值有: `1`: 邮箱地址格式错误, `2`: 邮箱地址域名不存在, `3`: 邮箱地址不存在, `4`: 启用, `5`: 已删除（邮箱回收站中）, `6`: 禁用
    type: number // 邮箱地址类型, 可选值有: `1`: 成员邮箱, `2`: 成员邮箱别名, `3`: 公共邮箱, `4`: 公共邮箱别名, `5`: 邮件组, `6`: 邮件组别名
  }

  export interface getMailUserResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMailUserResp
  }

  export interface CreateMailGroupReq {
    email?: string // 邮件组地址, 示例值: "test_mail_group@xxx.xx"
    name?: string // 邮件组名称, 示例值: "test mail group"
    description?: string // 邮件组描述, 示例值: "mail group for testing"
    who_can_send_mail?: string // 谁可发送邮件到此邮件组, 示例值: "ALL_INTERNAL_USERS", 可选值有: `ANYONE`: 任何人, `ALL_INTERNAL_USERS`: 仅组织内部成员, `ALL_GROUP_MEMBERS`: 仅邮件组成员, `CUSTOM_MEMBERS`: 自定义成员
  }

  export interface CreateMailGroupResp {
    mailgroup_id: string // 邮件组ID
    email: string // 邮件组地址
    name: string // 邮件组名称
    description: string // 邮件组描述
    direct_members_count: string // 邮件组成员数量
    include_external_member: boolean // 是否包含外部成员
    include_all_company_member: boolean // 是否是全员邮件组
    who_can_send_mail: string // 谁可发送邮件到此邮件组, 可选值有: `ANYONE`: 任何人, `ALL_INTERNAL_USERS`: 仅组织内部成员, `ALL_GROUP_MEMBERS`: 仅邮件组成员, `CUSTOM_MEMBERS`: 自定义成员
  }

  export interface createMailGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateMailGroupResp
  }

  export interface GetMailGroupReq {
    mailgroup_id: string // 邮件组ID或者邮件组地址, 示例值: "xxxxxxxxxxxxxxx 或 test_mail_group@xxx.xx"
  }

  export interface GetMailGroupResp {
    mailgroup_id: string // 邮件组ID
    email: string // 邮件组地址
    name: string // 邮件组名称
    description: string // 邮件组描述
    direct_members_count: string // 邮件组成员数量
    include_external_member: boolean // 是否包含外部成员
    include_all_company_member: boolean // 是否是全员邮件组
    who_can_send_mail: string // 谁可发送邮件到此邮件组, 可选值有: `ANYONE`: 任何人, `ALL_INTERNAL_USERS`: 仅组织内部成员, `ALL_GROUP_MEMBERS`: 仅邮件组成员, `CUSTOM_MEMBERS`: 自定义成员
  }

  export interface getMailGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMailGroupResp
  }

  export interface GetMailGroupListReq {
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xxx"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `200`
  }

  export interface GetMailGroupListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetMailGroupListRespItem[] // 邮件组列表
  }

  export interface GetMailGroupListRespItem {
    mailgroup_id: string // 邮件组ID
    email: string // 邮件组地址
    name: string // 邮件组名称
    description: string // 邮件组描述
    direct_members_count: string // 邮件组成员数量
    include_external_member: boolean // 是否包含外部成员
    include_all_company_member: boolean // 是否是全员邮件组
    who_can_send_mail: string // 谁可发送邮件到此邮件组, 可选值有: `ANYONE`: 任何人, `ALL_INTERNAL_USERS`: 仅组织内部成员, `ALL_GROUP_MEMBERS`: 仅邮件组成员, `CUSTOM_MEMBERS`: 自定义成员
  }

  export interface getMailGroupListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMailGroupListResp
  }

  export interface UpdateMailGroupPatchReq {
    mailgroup_id: string // 邮件组ID或者邮件组地址, 示例值: "xxxxxxxxxxxxxxx 或 test_mail_group@xxx.xx"
    name?: string // 邮件组名称, 示例值: "test mail group"
    description?: string // 邮件组描述, 示例值: "mail group for testing"
    who_can_send_mail?: string // 谁可发送邮件到此邮件组, 示例值: "ALL_INTERNAL_USERS", 可选值有: `ANYONE`: 任何人, `ALL_INTERNAL_USERS`: 仅组织内部成员, `ALL_GROUP_MEMBERS`: 仅邮件组成员, `CUSTOM_MEMBERS`: 自定义成员
  }

  export interface UpdateMailGroupPatchResp {
    mailgroup_id: string // 邮件组ID
    email: string // 邮件组地址
    name: string // 邮件组名称
    description: string // 邮件组描述
    direct_members_count: string // 邮件组成员数量
    include_external_member: boolean // 是否包含外部成员
    include_all_company_member: boolean // 是否是全员邮件组
    who_can_send_mail: string // 谁可发送邮件到此邮件组, 可选值有: `ANYONE`: 任何人, `ALL_INTERNAL_USERS`: 仅组织内部成员, `ALL_GROUP_MEMBERS`: 仅邮件组成员, `CUSTOM_MEMBERS`: 自定义成员
  }

  export interface updateMailGroupPatchResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateMailGroupPatchResp
  }

  export interface UpdateMailGroupReq {
    mailgroup_id: string // 邮件组ID或者邮件组地址, 示例值: "xxxxxxxxxxxxxxx 或 test_mail_group@xxx.xx"
    name?: string // 邮件组名称, 示例值: "test mail group"
    description?: string // 邮件组描述, 示例值: "mail group for testing"
    who_can_send_mail?: string // 谁可发送邮件到此邮件组, 示例值: "ALL_INTERNAL_USERS", 可选值有: `ANYONE`: 任何人, `ALL_INTERNAL_USERS`: 仅组织内部成员, `ALL_GROUP_MEMBERS`: 仅邮件组成员, `CUSTOM_MEMBERS`: 自定义成员
  }

  export interface UpdateMailGroupResp {
    mailgroup_id: string // 邮件组ID
    email: string // 邮件组地址
    name: string // 邮件组名称
    description: string // 邮件组描述
    direct_members_count: string // 邮件组成员数量
    include_external_member: boolean // 是否包含外部成员
    include_all_company_member: boolean // 是否是全员邮件组
    who_can_send_mail: string // 谁可发送邮件到此邮件组, 可选值有: `ANYONE`: 任何人, `ALL_INTERNAL_USERS`: 仅组织内部成员, `ALL_GROUP_MEMBERS`: 仅邮件组成员, `CUSTOM_MEMBERS`: 自定义成员
  }

  export interface updateMailGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateMailGroupResp
  }

  export interface DeleteMailGroupReq {
    mailgroup_id: string // 邮件组ID或者邮件组地址, 示例值: "xxxxxxxxxxxxxxx 或 test_mail_group@xxx.xx"
  }

  export interface DeleteMailGroupResp {}

  export interface deleteMailGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteMailGroupResp
  }

  export interface CreateMailGroupMemberReq {
    mailgroup_id: string // 邮件组ID或者邮件组地址, 示例值: "xxxxxxxxxxxxxxx 或 test_mail_group@xxx.xx"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门
    email?: string // 成员邮箱地址（当成员类型是EXTERNAL_USER/MAIL_GROUP/OTHER_MEMBER时有值）, 示例值: "test_memeber@xxx.xx"
    user_id?: string // 租户内用户的唯一标识（当成员类型是USER时有值）, 示例值: "xxxxxxxxxx"
    department_id?: string // 租户内部门的唯一标识（当成员类型是DEPARTMENT时有值）, 示例值: "xxxxxxxxxx"
    type?: string // 成员类型, 示例值: "USER", 可选值有: `USER`: 内部用户, `DEPARTMENT`: 部门, `COMPANY`: 全员, `EXTERNAL_USER`: 外部用户, `MAIL_GROUP`: 邮件组, `OTHER_MEMBER`: 内部成员
  }

  export interface CreateMailGroupMemberResp {
    member_id: string // 邮件组内成员唯一标识
    email: string // 成员邮箱地址（当成员类型是EXTERNAL_USER/MAIL_GROUP/OTHER_MEMBER时有值）
    user_id: string // 租户内用户的唯一标识（当成员类型是USER时有值）
    department_id: string // 租户内部门的唯一标识（当成员类型是DEPARTMENT时有值）
    type: string // 成员类型, 可选值有: `USER`: 内部用户, `DEPARTMENT`: 部门, `COMPANY`: 全员, `EXTERNAL_USER`: 外部用户, `MAIL_GROUP`: 邮件组, `OTHER_MEMBER`: 内部成员
  }

  export interface createMailGroupMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateMailGroupMemberResp
  }

  export interface GetMailGroupMemberReq {
    mailgroup_id: string // 邮件组ID或者邮件组地址, 示例值: "xxxxxxxxxxxxxxx 或 test_mail_group@xxx.xx"
    member_id: string // 邮件组内成员唯一标识, 示例值: "xxxxxxxxxxxxxxx"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门
  }

  export interface GetMailGroupMemberResp {
    member_id: string // 邮件组内成员唯一标识
    email: string // 成员邮箱地址（当成员类型是EXTERNAL_USER/MAIL_GROUP/OTHER_MEMBER时有值）
    user_id: string // 租户内用户的唯一标识（当成员类型是USER时有值）
    department_id: string // 租户内部门的唯一标识（当成员类型是DEPARTMENT时有值）
    type: string // 成员类型, 可选值有: `USER`: 内部用户, `DEPARTMENT`: 部门, `COMPANY`: 全员, `EXTERNAL_USER`: 外部用户, `MAIL_GROUP`: 邮件组, `OTHER_MEMBER`: 内部成员
  }

  export interface getMailGroupMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMailGroupMemberResp
  }

  export interface GetMailGroupMemberListReq {
    mailgroup_id: string // The unique ID or email address of a mail group, 示例值: "xxxxxxxxxxxxxxx or test_mail_group@xxx.xx"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xxx"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `200`
  }

  export interface GetMailGroupMemberListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetMailGroupMemberListRespItem[] // 邮件组成员列表
  }

  export interface GetMailGroupMemberListRespItem {
    member_id: string // 邮件组内成员唯一标识
    email: string // 成员邮箱地址（当成员类型是EXTERNAL_USER/MAIL_GROUP/OTHER_MEMBER时有值）
    user_id: string // 租户内用户的唯一标识（当成员类型是USER时有值）
    department_id: string // 租户内部门的唯一标识（当成员类型是DEPARTMENT时有值）
    type: string // 成员类型, 可选值有: `USER`: 内部用户, `DEPARTMENT`: 部门, `COMPANY`: 全员, `EXTERNAL_USER`: 外部用户, `MAIL_GROUP`: 邮件组, `OTHER_MEMBER`: 内部成员
  }

  export interface getMailGroupMemberListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMailGroupMemberListResp
  }

  export interface DeleteMailGroupMemberReq {
    mailgroup_id: string // The unique ID or email address of a mail group, 示例值: "xxxxxxxxxxxxxxx or test_mail_group@xxx.xx"
    member_id: string // The unique ID of a member in this mail group, 示例值: "xxxxxxxxxxxxxxx"
  }

  export interface DeleteMailGroupMemberResp {}

  export interface deleteMailGroupMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteMailGroupMemberResp
  }

  export interface CreateMailGroupPermissionMemberReq {
    mailgroup_id: string // 邮件组ID或者邮件组地址, 示例值: "xxxxxxxxxxxxxxx 或 test_mail_group@xxx.xx"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "xxx", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门
    user_id?: string // 租户内用户的唯一标识（当成员类型是USER时有值）, 示例值: "xxxxxxxxxx"
    department_id?: string // 租户内部门的唯一标识（当成员类型是DEPARTMENT时有值）, 示例值: "xxxxxxxxxx"
    type?: string // 成员类型, 示例值: "USER", 可选值有: `USER`: 内部用户, `DEPARTMENT`: 部门
  }

  export interface CreateMailGroupPermissionMemberResp {
    permission_member_id: string // 权限组内成员唯一标识
    user_id: string // 租户内用户的唯一标识（当成员类型是USER时有值）
    department_id: string // 租户内部门的唯一标识（当成员类型是DEPARTMENT时有值）
    type: string // 成员类型, 可选值有: `USER`: 内部用户, `DEPARTMENT`: 部门
  }

  export interface createMailGroupPermissionMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateMailGroupPermissionMemberResp
  }

  export interface GetMailGroupPermissionMemberReq {
    mailgroup_id: string // 邮件组ID或者邮件组地址, 示例值: "xxxxxxxxxxxxxxx 或 test_mail_group@xxx.xx"
    permission_member_id: string // 权限组内成员唯一标识, 示例值: "xxxxxxxxxxxxxxx"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门
  }

  export interface GetMailGroupPermissionMemberResp {
    permission_member_id: string // 权限组内成员唯一标识
    user_id: string // 租户内用户的唯一标识（当成员类型是USER时有值）
    department_id: string // 租户内部门的唯一标识（当成员类型是DEPARTMENT时有值）
    type: string // 成员类型, 可选值有: `USER`: 内部用户, `DEPARTMENT`: 部门
  }

  export interface getMailGroupPermissionMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMailGroupPermissionMemberResp
  }

  export interface GetMailGroupPermissionMemberListReq {
    mailgroup_id: string // 邮件组ID或者邮件组地址, 示例值: "xxxxxxxxxxxxxxx 或 test_mail_group@xxx.xx"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xxx"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `200`
  }

  export interface GetMailGroupPermissionMemberListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetMailGroupPermissionMemberListRespItem[] // 邮件组权限成员列表
  }

  export interface GetMailGroupPermissionMemberListRespItem {
    permission_member_id: string // 权限组内成员唯一标识
    user_id: string // 租户内用户的唯一标识（当成员类型是USER时有值）
    department_id: string // 租户内部门的唯一标识（当成员类型是DEPARTMENT时有值）
    type: string // 成员类型, 可选值有: `USER`: 内部用户, `DEPARTMENT`: 部门
  }

  export interface getMailGroupPermissionMemberListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMailGroupPermissionMemberListResp
  }

  export interface DeleteMailGroupPermissionMemberReq {
    mailgroup_id: string // The unique ID or email address of a mail group, 示例值: "xxxxxxxxxxxxxxx or test_mail_group@xxx.xx"
    permission_member_id: string // The unique ID of a member in this permission group, 示例值: "xxxxxxxxxxxxxxx"
  }

  export interface DeleteMailGroupPermissionMemberResp {}

  export interface deleteMailGroupPermissionMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteMailGroupPermissionMemberResp
  }

  export interface CreateMailGroupAliasReq {
    mailgroup_id: string // 邮件组id或邮件组邮箱地址, 示例值: "xxxxxx 或者 xxx@xx.xxx"
    email_alias?: string // 邮箱别名, 示例值: "xxx@xx.xxx"
  }

  export interface CreateMailGroupAliasResp {
    mailgroup_alias: CreateMailGroupAliasRespMailGroupAlias // 邮件组别名
  }

  export interface CreateMailGroupAliasRespMailGroupAlias {
    primary_email: string // 主邮箱地址
    email_alias: string // 邮箱别名
  }

  export interface createMailGroupAliasResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateMailGroupAliasResp
  }

  export interface GetMailGroupAliasListReq {
    mailgroup_id: string // 邮件组id或邮件组邮箱地址, 示例值: "xxxxxxxxxxxxxxx 或 test_mail_group@xxx.xx"
  }

  export interface GetMailGroupAliasListResp {
    items?: GetMailGroupAliasListRespItem[] // 邮件组别名
  }

  export interface GetMailGroupAliasListRespItem {
    primary_email: string // 主邮箱地址
    email_alias: string // 邮箱别名
  }

  export interface getMailGroupAliasListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMailGroupAliasListResp
  }

  export interface DeleteMailGroupAliasReq {
    mailgroup_id: string // 邮件组id或邮件组邮箱地址, 示例值: "xxxxxx 或 test_group@xx.xxx"
    alias_id: string // 邮件组别名邮箱地址, 示例值: "xxx@xx.xxx"
  }

  export interface DeleteMailGroupAliasResp {}

  export interface deleteMailGroupAliasResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteMailGroupAliasResp
  }

  export interface CreatePublicMailboxReq {
    email?: string // 公共邮箱地址, 示例值: "test_public_mailbox@xxx.xx"
    name?: string // 公共邮箱名称, 示例值: "test public mailbox"
  }

  export interface CreatePublicMailboxResp {
    public_mailbox_id: string // 公共邮箱唯一标识
    email: string // 公共邮箱地址
    name: string // 公共邮箱名称
  }

  export interface createPublicMailboxResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreatePublicMailboxResp
  }

  export interface GetPublicMailboxReq {
    public_mailbox_id: string // 公共邮箱唯一标识或公共邮箱地址, 示例值: "xxxxxxxxxxxxxxx 或 test_public_mailbox@xxx.xx"
  }

  export interface GetPublicMailboxResp {
    public_mailbox_id: string // 公共邮箱唯一标识
    email: string // 公共邮箱地址
    name: string // 公共邮箱名称
  }

  export interface getPublicMailboxResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetPublicMailboxResp
  }

  export interface GetPublicMailboxListReq {
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xxx"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `200`
  }

  export interface GetPublicMailboxListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetPublicMailboxListRespItem[] // 公共邮箱列表
  }

  export interface GetPublicMailboxListRespItem {
    public_mailbox_id: string // 公共邮箱唯一标识
    email: string // 公共邮箱地址
    name: string // 公共邮箱名称
  }

  export interface getPublicMailboxListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetPublicMailboxListResp
  }

  export interface UpdatePublicMailboxPatchReq {
    public_mailbox_id: string // 公共邮箱唯一标识或公共邮箱地址, 示例值: "xxxxxxxxxxxxxxx 或 test_public_mailbox@xxx.xx"
    name?: string // 公共邮箱名称, 示例值: "test public mailbox"
  }

  export interface UpdatePublicMailboxPatchResp {
    public_mailbox_id: string // 公共邮箱唯一标识
    email: string // 公共邮箱地址
    name: string // 公共邮箱名称
  }

  export interface updatePublicMailboxPatchResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdatePublicMailboxPatchResp
  }

  export interface UpdatePublicMailboxReq {
    public_mailbox_id: string // 公共邮箱唯一标识或公共邮箱地址, 示例值: "xxxxxxxxxxxxxxx 或 test_public_mailbox@xxx.xx"
    name?: string // 公共邮箱名称, 示例值: "test public mailbox"
  }

  export interface UpdatePublicMailboxResp {
    public_mailbox_id: string // 公共邮箱唯一标识
    email: string // 公共邮箱地址
    name: string // 公共邮箱名称
  }

  export interface updatePublicMailboxResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdatePublicMailboxResp
  }

  export interface DeletePublicMailboxReq {
    public_mailbox_id: string // 要释放的公共邮箱地址, 示例值: "xxxxxx@abc.com"
  }

  export interface DeletePublicMailboxResp {}

  export interface deletePublicMailboxResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeletePublicMailboxResp
  }

  export interface CreatePublicMailboxMemberReq {
    public_mailbox_id: string // 公共邮箱唯一标识或公共邮箱地址, 示例值: "xxxxxxxxxxxxxxx 或 test_public_mailbox@xxx.xx"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id?: string // 租户内用户的唯一标识（当成员类型是USER时有值）, 示例值: "xxxxxxxxxx"
    type?: string // 成员类型, 示例值: "USER", 可选值有: `USER`: 内部用户
  }

  export interface CreatePublicMailboxMemberResp {
    member_id: string // 公共邮箱内成员唯一标识
    user_id: string // 租户内用户的唯一标识（当成员类型是USER时有值）
    type: string // 成员类型, 可选值有: `USER`: 内部用户
  }

  export interface createPublicMailboxMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreatePublicMailboxMemberResp
  }

  export interface GetPublicMailboxMemberReq {
    public_mailbox_id: string // 公共邮箱唯一标识或公共邮箱地址, 示例值: "xxxxxxxxxxxxxxx 或 test_public_mailbox@xxx.xx"
    member_id: string // 公共邮箱内成员唯一标识, 示例值: "xxxxxxxxxxxxxxx"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetPublicMailboxMemberResp {
    member_id: string // 公共邮箱内成员唯一标识
    user_id: string // 租户内用户的唯一标识（当成员类型是USER时有值）
    type: string // 成员类型, 可选值有: `USER`: 内部用户
  }

  export interface getPublicMailboxMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetPublicMailboxMemberResp
  }

  export interface GetPublicMailboxMemberListReq {
    public_mailbox_id: string // The unique ID or email address of a public mailbox, 示例值: "xxxxxxxxxxxxxxx or test_public_mailbox@xxx.xx"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xxx"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `200`
  }

  export interface GetPublicMailboxMemberListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetPublicMailboxMemberListRespItem[] // 公共邮箱成员列表
  }

  export interface GetPublicMailboxMemberListRespItem {
    member_id: string // 公共邮箱内成员唯一标识
    user_id: string // 租户内用户的唯一标识（当成员类型是USER时有值）
    type: string // 成员类型, 可选值有: `USER`: 内部用户
  }

  export interface getPublicMailboxMemberListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetPublicMailboxMemberListResp
  }

  export interface DeletePublicMailboxMemberReq {
    public_mailbox_id: string // 公共邮箱唯一标识或公共邮箱地址, 示例值: "xxxxxxxxxxxxxxx 或 test_public_mailbox@xxx.xx"
    member_id: string // 公共邮箱内成员唯一标识, 示例值: "xxxxxxxxxxxxxxx"
  }

  export interface DeletePublicMailboxMemberResp {}

  export interface deletePublicMailboxMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeletePublicMailboxMemberResp
  }

  export interface ClearPublicMailboxMemberReq {
    public_mailbox_id: string // 公共邮箱唯一标识或公共邮箱地址, 示例值: "xxxxxxxxxxxxxxx 或 test_public_mailbox@xxx.xx"
  }

  export interface ClearPublicMailboxMemberResp {}

  export interface clearPublicMailboxMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: ClearPublicMailboxMemberResp
  }

  export interface CreateMailPublicMailboxAliasReq {
    public_mailbox_id: string // 公共邮箱id或公共邮箱地址, 示例值: "xxxxxx 或 xxx@xx.xxx"
    email_alias?: string // 邮箱别名, 示例值: "xxx@xx.xxx"
  }

  export interface CreateMailPublicMailboxAliasResp {
    public_mailbox_alias: CreateMailPublicMailboxAliasRespPublicMailboxAlias // 公共邮箱别名
  }

  export interface CreateMailPublicMailboxAliasRespPublicMailboxAlias {
    primary_email: string // 主邮箱地址
    email_alias: string // 邮箱别名
  }

  export interface createMailPublicMailboxAliasResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateMailPublicMailboxAliasResp
  }

  export interface GetMailPublicMailboxAliasListReq {
    public_mailbox_id: string // 公共邮箱id或公共邮箱邮件地址, 示例值: "xxxxxx 或 xxx@xx.xxx"
  }

  export interface GetMailPublicMailboxAliasListResp {
    items?: GetMailPublicMailboxAliasListRespItem[] // 公共邮箱别名
  }

  export interface GetMailPublicMailboxAliasListRespItem {
    primary_email: string // 主邮箱地址
    email_alias: string // 邮箱别名
  }

  export interface getMailPublicMailboxAliasListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMailPublicMailboxAliasListResp
  }

  export interface DeleteMailPublicMailboxAliasReq {
    public_mailbox_id: string // 公共邮箱id或公共邮箱地址, 示例值: "xxxxxx 或 xxx@xx.xxx"
    alias_id: string // 公共邮箱别名, 示例值: "xxx@xx.xxx"
  }

  export interface DeleteMailPublicMailboxAliasResp {}

  export interface deleteMailPublicMailboxAliasResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteMailPublicMailboxAliasResp
  }

  export interface CreateMailUserMailboxAliasReq {
    user_mailbox_id: string // 用户邮箱地址, 示例值: "user@xxx.xx"
    email_alias?: string // 邮箱别名, 示例值: "xxx@xx.xxx"
  }

  export interface CreateMailUserMailboxAliasResp {
    user_mailbox_alias: CreateMailUserMailboxAliasRespUserMailboxAlias // 用户邮箱别名
  }

  export interface CreateMailUserMailboxAliasRespUserMailboxAlias {
    primary_email: string // 主邮箱地址
    email_alias: string // 邮箱别名
  }

  export interface createMailUserMailboxAliasResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateMailUserMailboxAliasResp
  }

  export interface DeleteMailUserMailboxAliasReq {
    user_mailbox_id: string // 用户邮箱地址, 示例值: "user@xxx.xx"
    alias_id: string // 别名邮箱地址, 示例值: "user_alias@xxx.xx"
  }

  export interface DeleteMailUserMailboxAliasResp {}

  export interface deleteMailUserMailboxAliasResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteMailUserMailboxAliasResp
  }

  export interface GetMailUserMailboxAliasListReq {
    user_mailbox_id: string // 用户邮箱地址, 示例值: "user@xxx.xx"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "xxx"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `20`
  }

  export interface GetMailUserMailboxAliasListResp {
    items?: GetMailUserMailboxAliasListRespItem[] // 用户邮箱别名
  }

  export interface GetMailUserMailboxAliasListRespItem {
    primary_email: string // 主邮箱地址
    email_alias: string // 邮箱别名
  }

  export interface getMailUserMailboxAliasListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetMailUserMailboxAliasListResp
  }

  export interface DeleteMailUserMailboxReq {
    user_mailbox_id: string // 要释放的邮箱地址, 示例值: "111111@abc.com"
    transfer_mailbox?: string // 用于接受转移的邮箱地址, 示例值: "888888@abc.com"
  }

  export interface DeleteMailUserMailboxResp {}

  export interface deleteMailUserMailboxResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteMailUserMailboxResp
  }
}

class GetMailUserReq {
  email_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      email_list: this.email_list
    }
  }

  getPath(path: string) {
    return path
  }
}

class CreateMailGroupReq {
  email?: any
  name?: any
  description?: any
  who_can_send_mail?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      email: this.email,
      name: this.name,
      description: this.description,
      who_can_send_mail: this.who_can_send_mail
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetMailGroupReq {
  mailgroup_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)

    return path
  }
}

class GetMailGroupListReq {
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

class UpdateMailGroupPatchReq {
  mailgroup_id?: any
  name?: any
  description?: any
  who_can_send_mail?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      description: this.description,
      who_can_send_mail: this.who_can_send_mail
    }
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)

    return path
  }
}

class UpdateMailGroupReq {
  mailgroup_id?: any
  name?: any
  description?: any
  who_can_send_mail?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      description: this.description,
      who_can_send_mail: this.who_can_send_mail
    }
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)

    return path
  }
}

class DeleteMailGroupReq {
  mailgroup_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)

    return path
  }
}

class CreateMailGroupMemberReq {
  mailgroup_id?: any
  user_id_type?: any
  department_id_type?: any
  email?: any
  user_id?: any
  department_id?: any
  type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      email: this.email,
      user_id: this.user_id,
      department_id: this.department_id,
      type: this.type
    }
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetMailGroupMemberReq {
  mailgroup_id?: any
  member_id?: any
  user_id_type?: any
  department_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)
    path = path.replace(':member_id', this.member_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetMailGroupMemberListReq {
  mailgroup_id?: any
  user_id_type?: any
  department_id_type?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
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

class DeleteMailGroupMemberReq {
  mailgroup_id?: any
  member_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)
    path = path.replace(':member_id', this.member_id)

    return path
  }
}

class CreateMailGroupPermissionMemberReq {
  mailgroup_id?: any
  user_id_type?: any
  department_id_type?: any
  user_id?: any
  department_id?: any
  type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id: this.user_id,
      department_id: this.department_id,
      type: this.type
    }
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetMailGroupPermissionMemberReq {
  mailgroup_id?: any
  permission_member_id?: any
  user_id_type?: any
  department_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)
    path = path.replace(':permission_member_id', this.permission_member_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetMailGroupPermissionMemberListReq {
  mailgroup_id?: any
  user_id_type?: any
  department_id_type?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
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

class DeleteMailGroupPermissionMemberReq {
  mailgroup_id?: any
  permission_member_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)
    path = path.replace(':permission_member_id', this.permission_member_id)

    return path
  }
}

class CreateMailGroupAliasReq {
  mailgroup_id?: any
  email_alias?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      email_alias: this.email_alias
    }
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)

    return path
  }
}

class GetMailGroupAliasListReq {
  mailgroup_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)

    return path
  }
}

class DeleteMailGroupAliasReq {
  mailgroup_id?: any
  alias_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':mailgroup_id', this.mailgroup_id)
    path = path.replace(':alias_id', this.alias_id)

    return path
  }
}

class CreatePublicMailboxReq {
  email?: any
  name?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      email: this.email,
      name: this.name
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetPublicMailboxReq {
  public_mailbox_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)

    return path
  }
}

class GetPublicMailboxListReq {
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

class UpdatePublicMailboxPatchReq {
  public_mailbox_id?: any
  name?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name
    }
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)

    return path
  }
}

class UpdatePublicMailboxReq {
  public_mailbox_id?: any
  name?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name
    }
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)

    return path
  }
}

class DeletePublicMailboxReq {
  public_mailbox_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)

    return path
  }
}

class CreatePublicMailboxMemberReq {
  public_mailbox_id?: any
  user_id_type?: any
  user_id?: any
  type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id: this.user_id,
      type: this.type
    }
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetPublicMailboxMemberReq {
  public_mailbox_id?: any
  member_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)
    path = path.replace(':member_id', this.member_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetPublicMailboxMemberListReq {
  public_mailbox_id?: any
  user_id_type?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
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

class DeletePublicMailboxMemberReq {
  public_mailbox_id?: any
  member_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)
    path = path.replace(':member_id', this.member_id)

    return path
  }
}

class ClearPublicMailboxMemberReq {
  public_mailbox_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)

    return path
  }
}

class CreateMailPublicMailboxAliasReq {
  public_mailbox_id?: any
  email_alias?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      email_alias: this.email_alias
    }
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)

    return path
  }
}

class GetMailPublicMailboxAliasListReq {
  public_mailbox_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)

    return path
  }
}

class DeleteMailPublicMailboxAliasReq {
  public_mailbox_id?: any
  alias_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':public_mailbox_id', this.public_mailbox_id)
    path = path.replace(':alias_id', this.alias_id)

    return path
  }
}

class CreateMailUserMailboxAliasReq {
  user_mailbox_id?: any
  email_alias?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      email_alias: this.email_alias
    }
  }

  getPath(path: string) {
    path = path.replace(':user_mailbox_id', this.user_mailbox_id)

    return path
  }
}

class DeleteMailUserMailboxAliasReq {
  user_mailbox_id?: any
  alias_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':user_mailbox_id', this.user_mailbox_id)
    path = path.replace(':alias_id', this.alias_id)

    return path
  }
}

class GetMailUserMailboxAliasListReq {
  user_mailbox_id?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':user_mailbox_id', this.user_mailbox_id)

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

class DeleteMailUserMailboxReq {
  user_mailbox_id?: any
  transfer_mailbox?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':user_mailbox_id', this.user_mailbox_id)

    const q = {} as { [key: string]: any }
    if (this.transfer_mailbox !== undefined) {
      q['transfer_mailbox'] = this.transfer_mailbox
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}
