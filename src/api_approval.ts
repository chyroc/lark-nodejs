import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class ApprovalService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // createApproval 用于通过接口创建简单的审批定义, 可以灵活指定定义的基础信息、表单和流程等。创建成功后, 不支持从审批管理后台删除该定义。不推荐企业自建应用使用, 如有需要尽量联系管理员在审批管理后台创建定义。
  //
  // 接口谨慎调用, 创建后的审批定义无法停用/删除
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/create
  async createApproval(
    request: Approval.CreateApprovalReq
  ): Promise<{
    data: Approval.CreateApprovalResp
    response: Response
  }> {
    const req: RawRequestReq<CreateApprovalReq> = {
      scope: 'Approval',
      api: 'CreateApproval',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/approvals',
      body: new CreateApprovalReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateApprovalReq, Approval.CreateApprovalResp>(req)
  }
  // getApproval 根据 Approval Code 获取某个审批定义的详情, 用于构造创建审批实例的请求。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/get
  async getApproval(
    request: Approval.GetApprovalReq
  ): Promise<{
    data: Approval.GetApprovalResp
    response: Response
  }> {
    const req: RawRequestReq<GetApprovalReq> = {
      scope: 'Approval',
      api: 'GetApproval',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/approvals/:approval_code',
      body: new GetApprovalReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetApprovalReq, Approval.GetApprovalResp>(req)
  }
  // subscribeApprovalSubscription 应用订阅 approval_code 后, 该应用就可以收到该审批定义对应实例的事件通知。同一应用只需要订阅一次, 无需重复订阅。
  //
  // 当应用不希望再收到审批事件时, 可以使用取消订阅接口进行取消, 取消后将不再给应用推送消息。
  // 订阅和取消订阅都是应用维度的, 多个应用可以同时订阅同一个 approval_code, 每个应用都能收到审批事件。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/subscribe
  async subscribeApprovalSubscription(
    request: Approval.SubscribeApprovalSubscriptionReq
  ): Promise<{
    data: Approval.SubscribeApprovalSubscriptionResp
    response: Response
  }> {
    const req: RawRequestReq<SubscribeApprovalSubscriptionReq> = {
      scope: 'Approval',
      api: 'SubscribeApprovalSubscription',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/approvals/:approval_code/subscribe',
      body: new SubscribeApprovalSubscriptionReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      SubscribeApprovalSubscriptionReq,
      Approval.SubscribeApprovalSubscriptionResp
    >(req)
  }
  // unsubscribeApprovalSubscription 取消订阅 approval_code 后, 无法再收到该审批定义对应实例的事件通知
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/unsubscribe
  async unsubscribeApprovalSubscription(
    request: Approval.UnsubscribeApprovalSubscriptionReq
  ): Promise<{
    data: Approval.UnsubscribeApprovalSubscriptionResp
    response: Response
  }> {
    const req: RawRequestReq<UnsubscribeApprovalSubscriptionReq> = {
      scope: 'Approval',
      api: 'UnsubscribeApprovalSubscription',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/approvals/:approval_code/unsubscribe',
      body: new UnsubscribeApprovalSubscriptionReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      UnsubscribeApprovalSubscriptionReq,
      Approval.UnsubscribeApprovalSubscriptionResp
    >(req)
  }
  // createApprovalInstance 创建一个审批实例, 调用方需对审批定义的表单有详细了解, 将按照定义的表单结构, 将表单 Value 通过接口传入
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/create
  async createApprovalInstance(
    request: Approval.CreateApprovalInstanceReq
  ): Promise<{
    data: Approval.CreateApprovalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<CreateApprovalInstanceReq> = {
      scope: 'Approval',
      api: 'CreateApprovalInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances',
      body: new CreateApprovalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateApprovalInstanceReq, Approval.CreateApprovalInstanceResp>(req)
  }
  // getApprovalInstance 通过审批实例 Instance Code  获取审批实例详情。Instance Code 由 [批量获取审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/list) 接口获取。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/get
  async getApprovalInstance(
    request: Approval.GetApprovalInstanceReq
  ): Promise<{
    data: Approval.GetApprovalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<GetApprovalInstanceReq> = {
      scope: 'Approval',
      api: 'GetApprovalInstance',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/:instance_id',
      body: new GetApprovalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetApprovalInstanceReq, Approval.GetApprovalInstanceResp>(req)
  }
  // getApprovalInstanceList 根据 approval_code 批量获取审批实例的 instance_code, 用于拉取租户下某个审批定义的全部审批实例。默认以审批创建时间排序
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/list
  async getApprovalInstanceList(
    request: Approval.GetApprovalInstanceListReq
  ): Promise<{
    data: Approval.GetApprovalInstanceListResp
    response: Response
  }> {
    const req: RawRequestReq<GetApprovalInstanceListReq> = {
      scope: 'Approval',
      api: 'GetApprovalInstanceList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances',
      body: new GetApprovalInstanceListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetApprovalInstanceListReq, Approval.GetApprovalInstanceListResp>(
      req
    )
  }
  // cancelApprovalInstance 对于状态为“审批中”的单个审批实例进行撤销操作, 撤销后审批流程结束
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cancel
  async cancelApprovalInstance(
    request: Approval.CancelApprovalInstanceReq
  ): Promise<{
    data: Approval.CancelApprovalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<CancelApprovalInstanceReq> = {
      scope: 'Approval',
      api: 'CancelApprovalInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/cancel',
      body: new CancelApprovalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CancelApprovalInstanceReq, Approval.CancelApprovalInstanceResp>(req)
  }
  // createApprovalCarbonCopy 通过接口可以将当前审批实例抄送给其他人。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cc
  async createApprovalCarbonCopy(
    request: Approval.CreateApprovalCarbonCopyReq
  ): Promise<{
    data: Approval.CreateApprovalCarbonCopyResp
    response: Response
  }> {
    const req: RawRequestReq<CreateApprovalCarbonCopyReq> = {
      scope: 'Approval',
      api: 'CreateApprovalCarbonCopy',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/cc',
      body: new CreateApprovalCarbonCopyReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateApprovalCarbonCopyReq, Approval.CreateApprovalCarbonCopyResp>(
      req
    )
  }
  // previewApprovalInstance 提交审批前, 预览审批流程。或者发起审批后, 在某一审批节点预览后续流程
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-preview
  async previewApprovalInstance(
    request: Approval.PreviewApprovalInstanceReq
  ): Promise<{
    data: Approval.PreviewApprovalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<PreviewApprovalInstanceReq> = {
      scope: 'Approval',
      api: 'PreviewApprovalInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/preview',
      body: new PreviewApprovalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<PreviewApprovalInstanceReq, Approval.PreviewApprovalInstanceResp>(
      req
    )
  }
  // approveApprovalInstance 对于单个审批任务进行同意操作。同意后审批流程会流转到下一个审批人。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/approve
  async approveApprovalInstance(
    request: Approval.ApproveApprovalInstanceReq
  ): Promise<{
    data: Approval.ApproveApprovalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<ApproveApprovalInstanceReq> = {
      scope: 'Approval',
      api: 'ApproveApprovalInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/tasks/approve',
      body: new ApproveApprovalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<ApproveApprovalInstanceReq, Approval.ApproveApprovalInstanceResp>(
      req
    )
  }
  // rejectApprovalInstance 对于单个审批任务进行拒绝操作。拒绝后审批流程结束。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/reject
  async rejectApprovalInstance(
    request: Approval.RejectApprovalInstanceReq
  ): Promise<{
    data: Approval.RejectApprovalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<RejectApprovalInstanceReq> = {
      scope: 'Approval',
      api: 'RejectApprovalInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/tasks/reject',
      body: new RejectApprovalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<RejectApprovalInstanceReq, Approval.RejectApprovalInstanceResp>(req)
  }
  // transferApprovalInstance 对于单个审批任务进行转交操作。转交后审批流程流转给被转交人。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/transfer
  async transferApprovalInstance(
    request: Approval.TransferApprovalInstanceReq
  ): Promise<{
    data: Approval.TransferApprovalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<TransferApprovalInstanceReq> = {
      scope: 'Approval',
      api: 'TransferApprovalInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/tasks/transfer',
      body: new TransferApprovalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<TransferApprovalInstanceReq, Approval.TransferApprovalInstanceResp>(
      req
    )
  }
  // rollbackApprovalInstance 从当前审批任务, 退回到已审批的一个或多个任务节点。退回后, 已审批节点重新生成审批任务
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/specified_rollback
  async rollbackApprovalInstance(
    request: Approval.RollbackApprovalInstanceReq
  ): Promise<{
    data: Approval.RollbackApprovalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<RollbackApprovalInstanceReq> = {
      scope: 'Approval',
      api: 'RollbackApprovalInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/specified_rollback',
      body: new RollbackApprovalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<RollbackApprovalInstanceReq, Approval.RollbackApprovalInstanceResp>(
      req
    )
  }
  // addApprovalInstanceSign 对于单个审批任务进行加签操作。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-task-addsign
  async addApprovalInstanceSign(
    request: Approval.AddApprovalInstanceSignReq
  ): Promise<{
    data: Approval.AddApprovalInstanceSignResp
    response: Response
  }> {
    const req: RawRequestReq<AddApprovalInstanceSignReq> = {
      scope: 'Approval',
      api: 'AddApprovalInstanceSign',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/add_sign',
      body: new AddApprovalInstanceSignReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<AddApprovalInstanceSignReq, Approval.AddApprovalInstanceSignResp>(
      req
    )
  }
  // createApprovalComment 在某审批实例下创建、修改评论或评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/create
  async createApprovalComment(
    request: Approval.CreateApprovalCommentReq
  ): Promise<{
    data: Approval.CreateApprovalCommentResp
    response: Response
  }> {
    const req: RawRequestReq<CreateApprovalCommentReq> = {
      scope: 'Approval',
      api: 'CreateApprovalComment',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/:instance_id/comments',
      body: new CreateApprovalCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateApprovalCommentReq, Approval.CreateApprovalCommentResp>(req)
  }
  // getApprovalComment 根据 Instance Code 获取某个审批实例下的全部评论与评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/list
  async getApprovalComment(
    request: Approval.GetApprovalCommentReq
  ): Promise<{
    data: Approval.GetApprovalCommentResp
    response: Response
  }> {
    const req: RawRequestReq<GetApprovalCommentReq> = {
      scope: 'Approval',
      api: 'GetApprovalComment',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/:instance_id/comments',
      body: new GetApprovalCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetApprovalCommentReq, Approval.GetApprovalCommentResp>(req)
  }
  // deleteApprovalComment 逻辑删除某审批实例下的一条评论或评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/delete
  async deleteApprovalComment(
    request: Approval.DeleteApprovalCommentReq
  ): Promise<{
    data: Approval.DeleteApprovalCommentResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteApprovalCommentReq> = {
      scope: 'Approval',
      api: 'DeleteApprovalComment',
      method: 'DELETE',
      url:
        this.cli.openBaseURL + '/open-apis/approval/v4/instances/:instance_id/comments/:comment_id',
      body: new DeleteApprovalCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteApprovalCommentReq, Approval.DeleteApprovalCommentResp>(req)
  }
  // removeApprovalComment 删除某审批实例下的全部评论与评论回复。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/remove
  async removeApprovalComment(
    request: Approval.RemoveApprovalCommentReq
  ): Promise<{
    data: Approval.RemoveApprovalCommentResp
    response: Response
  }> {
    const req: RawRequestReq<RemoveApprovalCommentReq> = {
      scope: 'Approval',
      api: 'RemoveApprovalComment',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/:instance_id/comments/remove',
      body: new RemoveApprovalCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<RemoveApprovalCommentReq, Approval.RemoveApprovalCommentResp>(req)
  }
  // createApprovalExternalApproval 审批定义是审批的描述, 包括审批名称、图标、描述等基础信息。创建好审批定义, 用户就可以在审批应用的发起页中看到审批, 如果用户点击发起, 则会跳转到配置的发起三方系统地址去发起审批。
  //
  // 另外, 审批定义还配置了审批操作时的回调地址: 审批人在待审批列表中进行【同意】【拒绝】操作时, 审批中心会调用回调地址通知三方系统。
  // 注意, 审批中心不负责审批流程的流转, 只负责展示、操作、消息通知。因此审批定义创建时没有审批流程的信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/create
  async createApprovalExternalApproval(
    request: Approval.CreateApprovalExternalApprovalReq
  ): Promise<{
    data: Approval.CreateApprovalExternalApprovalResp
    response: Response
  }> {
    const req: RawRequestReq<CreateApprovalExternalApprovalReq> = {
      scope: 'Approval',
      api: 'CreateApprovalExternalApproval',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/external_approvals',
      body: new CreateApprovalExternalApprovalReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CreateApprovalExternalApprovalReq,
      Approval.CreateApprovalExternalApprovalResp
    >(req)
  }
  // createApprovalExternalInstance 审批中心不负责审批的流转, 审批的流转在三方系统, 三方系统在审批流转后生成的审批实例、审批任务、审批抄送数据同步到审批中心。
  //
  // 用户可以在审批中心中浏览三方系统同步过来的实例、任务、抄送信息, 并且可以跳转回三方系统进行更详细的查看和操作, 其中实例信息在【已发起】列表, 任务信息在【待审批】和【已审批】列表, 抄送信息在【抄送我】列表
  // :::html
  // <img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/9dff4434afbeb0ef69de7f36b9a6e995_z5iwmTzEgg.png" alt="" style="zoom:17%;" />
  // <img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/ca6e0e984a7a6d64e1b16a0bac4bf868_tfqjCiaJQM.png" alt="" style="zoom:17%;" />
  // <img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/529377e238df78d391bbd22e962ad195_T7eefLI1GA.png" alt="" style="zoom:17%;" />
  // 对于审批任务, 三方系统也可以配置审批任务的回调接口, 这样审批人可以在审批中心中直接进行审批操作, 审批中心会回调三方系统, 三方系统收到回调后更新任务信息, 并将新的任务信息同步回审批中心, 形成闭环。
  // :::html
  // <img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/721c35428bc1187db3318c572f9979ad_je75QpElcg.png" alt=""  style="zoom:25%;" />
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/create
  async createApprovalExternalInstance(
    request: Approval.CreateApprovalExternalInstanceReq
  ): Promise<{
    data: Approval.CreateApprovalExternalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<CreateApprovalExternalInstanceReq> = {
      scope: 'Approval',
      api: 'CreateApprovalExternalInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/external_instances',
      body: new CreateApprovalExternalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CreateApprovalExternalInstanceReq,
      Approval.CreateApprovalExternalInstanceResp
    >(req)
  }
  // checkApprovalExternalInstance 校验三方审批实例数据, 用于判断服务端数据是否为最新的。用户提交实例最新更新时间, 如果服务端不存在该实例, 或者服务端实例更新时间不是最新的, 则返回对应实例 id。
  //
  // 例如, 用户可以每隔5分钟, 将最近5分钟产生的实例使用该接口进行对比。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/check
  async checkApprovalExternalInstance(
    request: Approval.CheckApprovalExternalInstanceReq
  ): Promise<{
    data: Approval.CheckApprovalExternalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<CheckApprovalExternalInstanceReq> = {
      scope: 'Approval',
      api: 'CheckApprovalExternalInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/external_instances/check',
      body: new CheckApprovalExternalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      CheckApprovalExternalInstanceReq,
      Approval.CheckApprovalExternalInstanceResp
    >(req)
  }
  // getApprovalExternalList 该接口用于获取三方审批的状态。用户传入查询条件, 接口返回满足条件的审批实例的状态。该接口支持多种参数的组合, 包括如下组合:
  //
  // 1.通过 instance_ids 获取指定实例的任务状态
  // 2.通过 user_ids 获取指定用户的任务状态
  // 3.通过 status 获取指定状态的所有任务
  // 4.通过page_token获取下一批数据
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_task/list
  async getApprovalExternalList(
    request: Approval.GetApprovalExternalListReq
  ): Promise<{
    data: Approval.GetApprovalExternalListResp
    response: Response
  }> {
    const req: RawRequestReq<GetApprovalExternalListReq> = {
      scope: 'Approval',
      api: 'GetApprovalExternalList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/external_tasks',
      body: new GetApprovalExternalListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetApprovalExternalListReq, Approval.GetApprovalExternalListResp>(
      req
    )
  }
  // uploadApprovalFile 当审批表单中有图片或附件控件时, 开发者需在创建审批实例前通过审批上传文件接口将文件上传到审批系统, 且附件上传大小限制为50M, 图片上传大小为10M。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDOyUjL1gjM14SN4ITN
  async uploadApprovalFile(
    request: Approval.UploadApprovalFileReq
  ): Promise<{
    data: Approval.UploadApprovalFileResp
    response: Response
  }> {
    const req: RawRequestReq<UploadApprovalFileReq> = {
      scope: 'Approval',
      api: 'UploadApprovalFile',
      method: 'POST',
      url: this.cli.wwwBaseURL + '/approval/openapi/v2/file/upload',
      body: new UploadApprovalFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<UploadApprovalFileReq, Approval.UploadApprovalFileResp>(req)
  }
  // updateApprovalMessage 此接口可以根据审批bot消息id及相应状态, 更新相应的审批bot消息, 只可用于更新待审批模板的bot消息。例如, 给用户推送了审批待办消息, 当用户处理该消息后, 可以将之前推送的Bot消息更新为已审批。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uAjNyYjLwYjM24CM2IjN
  async updateApprovalMessage(
    request: Approval.UpdateApprovalMessageReq
  ): Promise<{
    data: Approval.UpdateApprovalMessageResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateApprovalMessageReq> = {
      scope: 'Approval',
      api: 'UpdateApprovalMessage',
      method: 'POST',
      url: this.cli.wwwBaseURL + '/approval/openapi/v1/message/update',
      body: new UpdateApprovalMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateApprovalMessageReq, Approval.UpdateApprovalMessageResp>(req)
  }
  // sendApprovalMessage 此接口可以用来通过飞书审批的Bot推送消息给用户, 当有新的审批待办, 或者审批待办的状态有更新时, 可以通过飞书审批的Bot告知用户。当然开发者也可以利用开放平台的能力自建一个全新的Bot, 用来推送审批相关信息。如果出现推送成功, 但是没有收到消息, 可能是因为开通了审批机器人的聚合推送。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ugDNyYjL4QjM24CO0IjN
  async sendApprovalMessage(
    request: Approval.SendApprovalMessageReq
  ): Promise<{
    data: Approval.SendApprovalMessageResp
    response: Response
  }> {
    const req: RawRequestReq<SendApprovalMessageReq> = {
      scope: 'Approval',
      api: 'SendApprovalMessage',
      method: 'POST',
      url: this.cli.wwwBaseURL + '/approval/openapi/v1/message/send',
      body: new SendApprovalMessageReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SendApprovalMessageReq, Approval.SendApprovalMessageResp>(req)
  }
  // searchApprovalInstance 该接口通过不同条件查询审批系统中符合条件的审批实例列表。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/query
  async searchApprovalInstance(
    request: Approval.SearchApprovalInstanceReq
  ): Promise<{
    data: Approval.SearchApprovalInstanceResp
    response: Response
  }> {
    const req: RawRequestReq<SearchApprovalInstanceReq> = {
      scope: 'Approval',
      api: 'SearchApprovalInstance',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/query',
      body: new SearchApprovalInstanceReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SearchApprovalInstanceReq, Approval.SearchApprovalInstanceResp>(req)
  }
  // searchApprovalCarbonCopy 该接口通过不同条件查询审批系统中符合条件的审批抄送列表。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/search_cc
  async searchApprovalCarbonCopy(
    request: Approval.SearchApprovalCarbonCopyReq
  ): Promise<{
    data: Approval.SearchApprovalCarbonCopyResp
    response: Response
  }> {
    const req: RawRequestReq<SearchApprovalCarbonCopyReq> = {
      scope: 'Approval',
      api: 'SearchApprovalCarbonCopy',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/instances/search_cc',
      body: new SearchApprovalCarbonCopyReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SearchApprovalCarbonCopyReq, Approval.SearchApprovalCarbonCopyResp>(
      req
    )
  }
  // searchApprovalTask 该接口通过不同条件查询审批系统中符合条件的审批任务列表
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/search
  async searchApprovalTask(
    request: Approval.SearchApprovalTaskReq
  ): Promise<{
    data: Approval.SearchApprovalTaskResp
    response: Response
  }> {
    const req: RawRequestReq<SearchApprovalTaskReq> = {
      scope: 'Approval',
      api: 'SearchApprovalTask',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/tasks/search',
      body: new SearchApprovalTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<SearchApprovalTaskReq, Approval.SearchApprovalTaskResp>(req)
  }
  // getApprovalUserTaskList 根据用户和任务分组查询任务列表
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/query
  async getApprovalUserTaskList(
    request: Approval.GetApprovalUserTaskListReq
  ): Promise<{
    data: Approval.GetApprovalUserTaskListResp
    response: Response
  }> {
    const req: RawRequestReq<GetApprovalUserTaskListReq> = {
      scope: 'Approval',
      api: 'GetApprovalUserTaskList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/approval/v4/tasks/query',
      body: new GetApprovalUserTaskListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetApprovalUserTaskListReq, Approval.GetApprovalUserTaskListResp>(
      req
    )
  }
}

export declare namespace Approval {
  export interface CreateApprovalReq {
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: department_id: 以自定义department_id来标识部门, open_department_id: 以open_department_id来标识部门
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    approval_name: string // 审批名称的国际化文案 Key, 以 @i18n@ 开头, 长度不得少于 9 个字符, 示例值: "@i18n@approval_name"
    approval_code?: string // 传空表示新建, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
    description?: string // 审批描述的国际化文案 Key, 以 @i18n@ 开头, 长度不得少于 9 个字符, 示例值: "@i18n@description"
    viewers?: CreateApprovalReqViewer[] // viewers 字段指定了哪些人能从审批应用的前台发起该审批, 1.当 type 为 USER 时, 需要填写 user_id 或 open_id 中的一个, 用于指定对哪个用户可见；, 2.当 type 为 DEPARTMENT 时, 需要填写部门的 open_id, 用于指定对哪个部门可见
    form: CreateApprovalReqForm // 审批定义表单
    node_list?: CreateApprovalReqNode[] // 审批定义节点, 需要将开始节点作为 list 第一个元素, 结束节点作为最后一个元素
    settings?: CreateApprovalReqSettings // 审批定义其他设置
    config?: CreateApprovalReqConfig // 审批定义配置项, 用于配置对应审批定义是否可以由用户在审批后台进行修改
    icon?: number // 审批图标枚举, 详见下方说明, 默认为 0, 示例值: 0, 默认值: `0`
    i18n_resources?: CreateApprovalReqI18nResource[] // 国际化文案
  }

  export interface CreateApprovalReqConfig {
    can_update_viewer: boolean // 允许用户修改可见范围, 示例值: false
    can_update_form: boolean // 允许用户更新表单, 示例值: false
    can_update_process: boolean // 允许用户更新流程定义, 示例值: false
    can_update_revert: boolean // 允许用户更新撤回设置, 示例值: false
    help_url: string // 帮助文档链接, 示例值: "https://www.baidu.com"
  }

  export interface CreateApprovalReqForm {
    form_content: string // 审批定义表单, json 数组, 见下方form_content字段说明, 示例值: "[{\"id\":\"user_name\", \"type\": \"input\", \"required\":true, \"name\":\"@i18n@widget1\"}]"
  }

  export interface CreateApprovalReqI18nResource {
    locale: string // 语言可选值有: zh-CN: 中文 en-US: 英文 ja-JP: 日文, 示例值: "zh-CN", 可选值有: zh-CN: 中文, en-US: 英文, ja-JP: 日文
    texts?: CreateApprovalReqI18nResourceText[] // 文案 key, value, i18n key 以 @i18n@ 开头； 该字段主要用于做国际化, 语序用户同时传多个语言的文案, 审批中心会根据用户当前的语音环境使用对应的文案, 如果没有传用户当前的语音环境文案, 则会使用默认的语言文案。
    is_default: boolean // 是否默认语言, 默认语言需要包含所有key, 非默认语言如果key不存在会使用默认语言代替, 示例值: true
  }

  export interface CreateApprovalReqI18nResourceText {
    key: string // 文案key, 示例值: "@i18n@1"
    value: string // 文案, 示例值: "people"
  }

  export interface CreateApprovalReqNode {
    id: string // 节点 ID, 开始节点的 ID 为 START, 结束节点的 ID 为 END, 开始和结束节点不需要指定 name、node_type 以及 approver, 示例值: "START"
    name?: string // 节点名称的国际化文案 Key, 以 @i18n@ 开头, 长度不得少于 9 个字符, 示例值: "@i18n@node_name"
    node_type?: string // 审批类型枚举, 当 node_type 为依次审批时, 审批人必须为『发起人自选』, 示例值: "AND", 可选值有: AND: 会签, OR: 或签, SEQUENTIAL: 依次审批
    approver?: CreateApprovalReqNodeApprover[] // 审批人列表
    ccer?: CreateApprovalReqNodeCcer[] // 抄送人列表
    privilege_field?: CreateApprovalReqNodePrivilegeField // 表单项的控件权限
  }

  export interface CreateApprovalReqNodeApprover {
    type: string // 审批节点上的审批人, 1.当 type 为 Supervisor、SupervisorTopDown、DepartmentManager 、DepartmentManagerTopDown 这 4 种时, 需要在 user_id 中填写对应的级数, 例如: 由下往上三级主管审批, user_id = 3；, 2.当 type 为 Personal 时, 需要填写user_id 或 open_id 中的一个, 用于指定用户；, 3.当 approver 为 Free 发起人自选时, 不需要指定 user_id 或 open_id；, ccer不支持 Free 发起人自选, 示例值: "Supervisor", 可选值有: Supervisor: 主管审批（由下往上）, SupervisorTopDown: 主管审批（从上往下）, DepartmentManager: 部门负责人审批（由下往上）, DepartmentManagerTopDown: 部门负责人审批（从上往下）, Personal: 指定成员, Free: 发起人自选
    user_id?: string // 用户id, 根据user_id_type填写, 示例值: "f7cb567e"
    level?: string // 审批级数, 当 type 为 Supervisor、SupervisorTopDown、DepartmentManager 、DepartmentManagerTopDown 这 4 种时, 需要在 level 中填写对应的级数, 例如: 由下往上三级主管审批, level = 3, 示例值: "3"
  }

  export interface CreateApprovalReqNodeCcer {
    type: string // 审批节点上的审批人, 1.当 type 为 Supervisor、SupervisorTopDown、DepartmentManager 、DepartmentManagerTopDown 这 4 种时, 需要在 user_id 中填写对应的级数, 例如: 由下往上三级主管审批, user_id = 3；, 2.当 type 为 Personal 时, 需要填写user_id 或 open_id 中的一个, 用于指定用户；, 3.当 approver 为 Free 发起人自选时, 不需要指定 user_id 或 open_id；, ccer不支持 Free 发起人自选, 示例值: "Supervisor", 可选值有: Supervisor: 主管审批（由下往上）, SupervisorTopDown: 主管审批（从上往下）, DepartmentManager: 部门负责人审批（由下往上）, DepartmentManagerTopDown: 部门负责人审批（从上往下）, Personal: 指定成员, Free: 发起人自选
    user_id?: string // 用户id, 根据user_id_type填写, 示例值: "f7cb567e"
    level?: string // 审批级数, 当 type 为 Supervisor、SupervisorTopDown、DepartmentManager 、DepartmentManagerTopDown 这 4 种时, 需要在 level 中填写对应的级数, 例如: 由下往上三级主管审批, level = 3, 示例值: "3"
  }

  export interface CreateApprovalReqNodePrivilegeField {
    writable?: string[] // 可写权限的表单项的 id列表, 示例值: 9293493
    readable?: string[] // 可读权限的表单项的 id列表, 示例值: 9293493
  }

  export interface CreateApprovalReqSettings {
    revert_interval?: number // 审批实例通过后允许撤回的时间, 以秒为单位, 默认 31 天, 0 为不可撤回, 示例值: 0
    revert_option?: number // 是否支持审批通过第一个节点后撤回, 默认为1, 0为不支持, 示例值: 0
  }

  export interface CreateApprovalReqViewer {
    viewer_type?: string // 可见人类型, 示例值: "USER", 可选值有: TENANT: 租户内可见, DEPARTMENT: 指定部门, USER: 指定用户, NONE: 任何人都不可见
    viewer_user_id?: string // 当 view_type 是 USER, 根据user_id_type填写用户id, 示例值: "19a294c2"
    viewer_department_id?: string // 当 view_type 为DEPARTMENT, 根据department_id_type填写部门id, 示例值: "od-ac9d697abfa990b715dcc33d58a62a9d"
  }

  export interface CreateApprovalResp {
    approval_code: string // 审批定义 Code
    approval_id: string // 审批定义 id
  }

  export interface createApprovalResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateApprovalResp
  }

  export interface GetApprovalReq {
    approval_code: string // 审批定义 Code, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
    locale?: string // 语言可选值, 示例值: "zh-CN", 可选值有: zh-CN: 中文, en-US: 英文, ja-JP: 日文
  }

  export interface GetApprovalResp {
    approval_name: string // 审批名称
    status: string // 审批定义状态, 可选值有: ACTIVE: 已启用, INACTIVE: 已停用, DELETED: 已删除, UNKNOWN: 未知
    form: string // 控件信息, 见下方form字段说明
    node_list?: GetApprovalRespNode[] // 节点信息
    viewers?: GetApprovalRespViewer[] // 可见人列表
  }

  export interface GetApprovalRespNode {
    name: string // 节点名称
    need_approver: boolean // 是否发起人自选节点 true - 发起审批时需要提交审批人
    node_id: string // 节点 ID
    custom_node_id: string // 节点自定义 ID, 如果没有设置则不返回
    node_type: string // 审批方式, 可选值有: AND: 会签, OR: 或签, SEQUENTIAL: 依次审批, CC_NODE: 抄送节点
  }

  export interface GetApprovalRespViewer {
    type: string // 可见人类型, 可选值有: TENANT: 租户内可见, DEPARTMENT: 指定部门, USER: 指定用户, ROLE: 指定角色, USER_GROUP: 指定用户组, NONE: 任何人都不可见
    id: string // 在可见人类型为DEPARTMENT时, id为部门的id ；在可见人类型为USER时, id为用户的id ；在可见人类型为ROLE时, id为角色的id ；在可见人类型为USER_GROUP时, id为用户组的id
    user_id: string // 在可见人类型为USER时, 表示可见人用户id
  }

  export interface getApprovalResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApprovalResp
  }

  export interface SubscribeApprovalSubscriptionReq {
    approval_code: string // 审批定义唯一标识, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
  }

  export interface SubscribeApprovalSubscriptionResp {}

  export interface subscribeApprovalSubscriptionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SubscribeApprovalSubscriptionResp
  }

  export interface UnsubscribeApprovalSubscriptionReq {
    approval_code: string // 审批定义唯一标识, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
  }

  export interface UnsubscribeApprovalSubscriptionResp {}

  export interface unsubscribeApprovalSubscriptionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UnsubscribeApprovalSubscriptionResp
  }

  export interface CreateApprovalInstanceReq {
    approval_code: string // 审批定义 code, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
    user_id?: string // 发起审批用户, 示例值: "f7cb567e"
    open_id: string // 发起审批用户 open id, 如果传了 user_id 则优先使用 user_id, 示例值: "ou_3cda9c969f737aaa05e6915dce306cb9"
    department_id?: string // 发起审批用户部门id, 如果用户只属于一个部门, 可以不填。如果属于多个部门, 默认会选择部门列表第一个部门, 示例值: "9293493ccacbdb9a"
    form: string // json 数组, 控件值, 示例值: "[{\"id\":\"user_name\", \"type\": \"input\", \"value\":\"test\"}]"
    node_approver_user_id_list?: { [key: string]: string[] } // 如果有发起人自选节点, 则需要填写对应节点的审批人
    node_approver_open_id_list?: { [key: string]: string[] } // 审批人发起人自选 open id, 与上述node_approver_user_id_list字段取并集
    node_cc_user_id_list?: { [key: string]: string[] } // 如果有发起人自选节点, 则可填写对应节点的抄送人, 单个节点最多选择20位抄送人, 最大长度: `20`
    node_cc_open_id_list?: { [key: string]: string[] } // 抄送人发起人自选 open id 单个节点最多选择20位抄送人, 最大长度: `20`
    uuid?: string // 审批实例 uuid, 用于幂等操作, 每个租户下面的唯一key, 同一个 uuid 只能用于创建一个审批实例, 如果冲突, 返回错误码 60012, 格式建议为 XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX, 不区分大小写, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A87"
  }

  export interface CreateApprovalInstanceResp {
    instance_code: string // 审批实例 Code
  }

  export interface createApprovalInstanceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateApprovalInstanceResp
  }

  export interface GetApprovalInstanceReq {
    instance_id: string // 审批实例 Code, 若在创建的时候传了uuid, 也可以通过传uuid获取, 示例值: "81D31358-93AF-92D6-7425-01A5D67C4E71"
    locale?: string // 语言, 示例值: "zh-CN", 可选值有: zh-CN: 中文, en-US: 英文, ja-JP: 日文
    user_id?: string // 发起审批用户id, 仅自建应用可返回, 示例值: "f7cb567e"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetApprovalInstanceResp {
    approval_name: string // 审批名称
    start_time: string // 审批创建时间
    end_time: string // 审批完成时间, 未完成为 0
    user_id: string // 发起审批用户
    open_id: string // 发起审批用户 open id
    serial_number: string // 审批单编号
    department_id: string // 发起审批用户所在部门
    status: string // 审批实例状态, 可选值有: PENDING: 审批中, APPROVED: 通过, REJECTED: 拒绝, CANCELED: 撤回, DELETED: 删除
    uuid: string // 用户的唯一标识id
    form: string // json字符串, 控件值详情见下方
    task_list?: GetApprovalInstanceRespTask[] // 审批任务列表
    comment_list?: GetApprovalInstanceRespComment[] // 评论列表
    timeline?: GetApprovalInstanceRespTimeline[] // 审批动态
    modified_instance_code: string // 修改的原实例 code, 仅在查询修改实例时显示该字段
    reverted_instance_code: string // 撤销的原实例 code, 仅在查询撤销实例时显示该字段
    approval_code: string // 审批定义 Code
    reverted: boolean // 单据是否被撤销
  }

  export interface GetApprovalInstanceRespComment {
    id: string // 评论 id
    user_id: string // 发表评论用户
    open_id: string // 发表评论用户 open id
    comment: string // 评论内容
    create_time: string // 1564590532967
  }

  export interface GetApprovalInstanceRespTask {
    id: string // task id
    user_id: string // 审批人的用户id, 自动通过、自动拒绝 时为空
    open_id: string // 审批人 open id
    status: string // 任务状态, 可选值有: PENDING: 审批中, APPROVED: 同意, REJECTED: 拒绝, TRANSFERRED: 已转交, DONE: 完成
    node_id: string // task 所属节点 id
    node_name: string // task 所属节点名称
    custom_node_id: string // task 所属节点自定义 id, 如果没设置自定义 id, 则不返回该字段
    type: string // 审批方式, 可选值有: AND: 会签, OR: 或签, AUTO_PASS: 自动通过, AUTO_REJECT: 自动拒绝, SEQUENTIAL: 按顺序
    start_time: string // task 开始时间
    end_time: string // task 完成时间, 未完成为 0
  }

  export interface GetApprovalInstanceRespTimeline {
    type: string // 动态类型, 不同类型 ext 内的 user_id_list 含义不一样, 可选值有: START: 审批开始, PASS: 通过, REJECT: 拒绝, AUTO_PASS: 自动通过, AUTO_REJECT: 自动拒绝, REMOVE_REPEAT: 去重, TRANSFER: 转交, ADD_APPROVER_BEFORE: 前加签, ADD_APPROVER: 并加签, ADD_APPROVER_AFTER: 后加签, DELETE_APPROVER: 减签, ROLLBACK_SELECTED: 指定回退, ROLLBACK: 全部回退, CANCEL: 撤回, DELETE: 删除, CC: 抄送
    create_time: string // 发生时间
    user_id: string // 动态产生用户
    open_id: string // 动态产生用户 open id
    user_id_list?: string[] // 被抄送人列表
    open_id_list?: string[] // 被抄送人列表
    task_id: string // 产生动态关联的task_id
    comment: string // 理由
    cc_user_list?: GetApprovalInstanceRespTimelineCcUser[] // 抄送人列表
    ext: string // 动态其他信息, json格式, 目前包括 user_id_list, user_id, open_id_list, open_id
    node_key: string // 产生task的节点key
  }

  export interface GetApprovalInstanceRespTimelineCcUser {
    user_id: string // 抄送人 user id
    cc_id: string // 审批实例内抄送唯一标识
    open_id: string // 抄送人 open id
  }

  export interface getApprovalInstanceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApprovalInstanceResp
  }

  export interface GetApprovalInstanceListReq {
    page_size?: number // 分页大小, 示例值: 100, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "nF1ZXJ5VGhlbkZldGNoCgAAAAAA6PZwFmUzSldvTC1yU"
    approval_code: string // 审批定义唯一标识, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
    start_time: number // 审批实例创建时间区间（毫秒）, 示例值: "1567690398020"
    end_time: number // 审批实例创建时间区间（毫秒）, 示例值: "1567690398020"
  }

  export interface GetApprovalInstanceListResp {
    instance_code_list?: string[] // 审批实例 Code
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface getApprovalInstanceListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApprovalInstanceListResp
  }

  export interface CancelApprovalInstanceReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    approval_code: string // 审批定义Code, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
    instance_code: string // 审批实例Code, 示例值: "81D31358-93AF-92D6-7425-01A5D67C4E71"
    user_id: string // 操作用户, 根据user_id_type填写, 示例值: "f7cb567e"
    notify_starter?: boolean // 如果为true, 撤回实例的时候会收到一条消息提醒, 示例值: true
  }

  export interface CancelApprovalInstanceResp {}

  export interface cancelApprovalInstanceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CancelApprovalInstanceResp
  }

  export interface CreateApprovalCarbonCopyReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    approval_code: string // 审批定义 code, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
    instance_code: string // 审批实例 code, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
    user_id: string // 根据user_id_type填写发起抄送的人的用户id, 示例值: "f7cb567e"
    cc_user_ids?: string[] // 根据user_id_type填写被抄送人的 用户id 列表, 示例值: f7cb567e
    comment?: string // 抄送留言, 示例值: "ok"
  }

  export interface CreateApprovalCarbonCopyResp {}

  export interface createApprovalCarbonCopyResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateApprovalCarbonCopyResp
  }

  export interface PreviewApprovalInstanceReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    approval_code?: string // 审批定义 Code
    user_id: string // 发起审批用户, employeid或者openid
    department_id?: string // 发起审批用户部门, 如果用户只属于一个部门, 可以不填, 如果属于多个部门, 必须填其中一个部门
    form: string // JSON字符串, 控件值。提交审批之前, 查看预览流程时, 该字段必填
    instance_code?: string // 审批实例code
    task_id?: string // 若审批实例已存在, 则传递当前审批任务对应的task_id, 并且user_id需要传task的指派人
  }

  export interface PreviewApprovalInstanceResp {
    preview_nodes?: PreviewApprovalInstanceRespPreviewNode[] // 预览节点信息
  }

  export interface PreviewApprovalInstanceRespPreviewNode {
    user_id_list?: string[] // 审批人id列表
    end_cc_id_list?: string[] // 审批结束抄送人id列表
    node_id: string // 节点id
    node_name: string // 节点名称
    node_type: string // 节点类型: AND: 会签 OR: 或签
    custom_node_id: string // 用户自定义节点id
    comments?: string[] // 节点的说明信息
    is_empty_logic: boolean // 审批人是否为空, 若为空, 则user_id_list为兜底审批人id列表
    is_approver_type_free: boolean // 是否发起人自选节点
    has_cc_type_free: boolean // 节点是否支持抄送人自选
  }

  export interface previewApprovalInstanceResp {
    code: number // 错误码, 非0表示失败
    msg: string // 返回码的描述
    data: PreviewApprovalInstanceResp // 返回业务信息
  }

  export interface ApproveApprovalInstanceReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    approval_code: string // 审批定义 Code, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
    instance_code: string // 审批实例 Code, 示例值: "81D31358-93AF-92D6-7425-01A5D67C4E71"
    user_id: string // 根据user_id_type填写操作用户id, 示例值: "f7cb567e"
    comment?: string // 意见, 示例值: "OK"
    task_id: string // 任务 ID, 审批实例详情task_list中id, 示例值: "12345"
  }

  export interface ApproveApprovalInstanceResp {}

  export interface approveApprovalInstanceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: ApproveApprovalInstanceResp
  }

  export interface RejectApprovalInstanceReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    approval_code: string // 审批定义 Code, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
    instance_code: string // 审批实例 Code, 示例值: "81D31358-93AF-92D6-7425-01A5D67C4E71"
    user_id: string // 根据user_id_type填写操作用户id, 示例值: "f7cb567e"
    comment?: string // 意见, 示例值: "OK"
    task_id: string // 任务 ID, 审批实例详情task_list中id, 示例值: "12345"
  }

  export interface RejectApprovalInstanceResp {}

  export interface rejectApprovalInstanceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: RejectApprovalInstanceResp
  }

  export interface TransferApprovalInstanceReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    approval_code: string // 审批定义 Code, 示例值: "7C468A54-8745-2245-9675-08B7C63E7A85"
    instance_code: string // 审批实例 Code, 示例值: "81D31358-93AF-92D6-7425-01A5D67C4E71"
    user_id: string // 根据user_id_type填写操作用户id, 示例值: "f7cb567e"
    comment?: string // 意见, 示例值: "OK"
    transfer_user_id: string // 根据user_id_type填写被转交人唯一 ID, 示例值: "f4ip317q"
    task_id: string // 任务 ID, 审批实例详情task_list中id, 示例值: "12345"
  }

  export interface TransferApprovalInstanceResp {}

  export interface transferApprovalInstanceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: TransferApprovalInstanceResp
  }

  export interface RollbackApprovalInstanceReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id: string // 用户ID, 示例值: "893g4c45"
    task_id: string // 回退的任务ID, 示例值: "7026591166355210260"
    reason?: string // 退回原因, 示例值: "申请事项填写不具体, 请重新填写"
    extra?: string // 扩展字段, 示例值: "暂不填写"
    task_def_key_list?: string[] // 退回到节点列表, 示例值: ["START", "APPROVAL_27997_285502", "APPROVAL_462205_2734554"], 长度范围: `1` ～ `100`
  }

  export interface RollbackApprovalInstanceResp {}

  export interface rollbackApprovalInstanceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: RollbackApprovalInstanceResp
  }

  export interface AddApprovalInstanceSignReq {
    approval_code: string // 审批定义 Code
    instance_code: string // 审批实例 Code
    user_id: string // 操作用户
    task_id: string // 任务 ID 审批实例详情task_list中id, 详情请参考[](https://open.feishu.cn/document/ukTMukTMukTM/uEDNyUjLxQjM14SM0ITN)
    comment?: string // 意见
    add_sign_user_ids?: string[] // 被加签人id
    add_sign_type: string // 1/2/3分别代表前加签/后加签/并加签
    approval_method?: string // 仅在前加签、后加签时需要填写, 1/2 分别代表或签/会签
  }

  export interface AddApprovalInstanceSignResp {}

  export interface addApprovalInstanceSignResp {
    code: number // 错误码, 非0表示失败
    msg: string // 返回码的描述
    data: AddApprovalInstanceSignResp
  }

  export interface CreateApprovalCommentReq {
    instance_id: string // 审批实例code（或租户自定义审批实例ID）, 示例值: "6A123516-FB88-470D-A428-9AF58B71B3C0"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id: string // 用户ID, 示例值: "e5286g26"
    content?: string // 评论内容, 包含艾特人、附件等, 示例值: "{\"text\":\"来自小程序的评论111我带附件中有extra \", \"files\":[{\"url\":\"xxx\", \"fileSize\":155149, \"title\":\"9a9fedc5cfb01a4a20c715098.png\", \"type\":\"image\", \"extra\":\"\"}]}"
    at_info_list?: CreateApprovalCommentReqAtInfo[] // 评论中艾特人信息
    parent_comment_id?: string // 父评论ID, 如果是回复评论, 需要传, 示例值: "7081516627711524883"
    comment_id?: string // 评论ID, 如果是编辑、删除一条评论, 需要传, 示例值: "7081516627711524883"
    disable_bot?: boolean // disable_bot=true只同步数据, 不触发bot, 示例值: false
    extra?: string // 附加字段, 示例值: "{\"a\":\"a\"}"
  }

  export interface CreateApprovalCommentReqAtInfo {
    user_id: string // 被艾特人的ID, 示例值: "579fd9c4"
    name: string // 被艾特人的姓名, 示例值: "张某"
    offset: string // 被艾特人在评论中的位置, 从0开始, 示例值: "1"
  }

  export interface CreateApprovalCommentResp {
    comment_id: string // 保存成功的comment_id
  }

  export interface createApprovalCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateApprovalCommentResp
  }

  export interface GetApprovalCommentReq {
    instance_id: string // 审批实例code（或者租户自定义审批实例ID）, 示例值: "6A123516-FB88-470D-A428-9AF58B71B3C0"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id: string // 用户ID, 示例值: "e5286g26"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "nF1ZXJ5VGhlbkZldGNoCgAAAAAA6PZwFmUzSldvTC1yU"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `1000`
  }

  export interface GetApprovalCommentResp {
    comments?: GetApprovalCommentRespComment[] // 评论数据列表
  }

  export interface GetApprovalCommentRespComment {
    id: string // 评论ID
    content: string // 评论内容
    create_time: string // 评论创建时间
    update_time: string // 评论更新时间
    is_delete: number // 是否删除, 0:未删除, 1:已删除
    replies?: GetApprovalCommentRespCommentReplie[] // 评论的回复
    at_info_list?: GetApprovalCommentRespCommentAtInfo[] // 评论中艾特人信息
    commentator: string // 评论创建人
    extra: string // 附加字段
  }

  export interface GetApprovalCommentRespCommentAtInfo {
    user_id: string // 被艾特人的ID
    name: string // 被艾特人的姓名
    offset: string // 被艾特人在评论中的位置, 从0开始
  }

  export interface GetApprovalCommentRespCommentReplie {
    id: string // 评论ID
    content: string // 评论内容
    create_time: string // 评论创建时间
    update_time: string // 评论更新时间
    is_delete: number // 是否删除, 0:未删除, 1:已删除
    at_info_list?: GetApprovalCommentRespCommentReplieAtInfo[] // 评论中艾特人信息
    commentator: string // 评论创建人
    extra: string // 附加字段
  }

  export interface GetApprovalCommentRespCommentReplieAtInfo {
    user_id: string // 被艾特人的ID
    name: string // 被艾特人的姓名
    offset: string // 被艾特人在评论中的位置, 从0开始
  }

  export interface getApprovalCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApprovalCommentResp
  }

  export interface DeleteApprovalCommentReq {
    instance_id: string // 审批实例code（或者租户自定义审批实例ID）, 示例值: "6A123516-FB88-470D-A428-9AF58B71B3C0"
    comment_id: string // 评论ID, 示例值: "7081516627711606803"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id: string // 根据user_id_type填写用户ID, 示例值: "ou_806a18fb5bdf525e38ba219733bdbd73"
  }

  export interface DeleteApprovalCommentResp {
    comment_id: string // 删除的评论ID
  }

  export interface deleteApprovalCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteApprovalCommentResp
  }

  export interface RemoveApprovalCommentReq {
    instance_id: string // 审批实例code（或者租户自定义审批实例ID）, 示例值: "6A123516-FB88-470D-A428-9AF58B71B3C0"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id?: string // 根据user_id_type填写用户ID, 示例值: "ou_806a18fb5bdf525e38ba219733bdbd73"
  }

  export interface RemoveApprovalCommentResp {
    instance_id: string // 审批实例code
    external_id: string // 租户自定义审批实例ID
  }

  export interface removeApprovalCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: RemoveApprovalCommentResp
  }

  export interface CreateApprovalExternalApprovalReq {
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: department_id: 以自定义department_id来标识部门, open_department_id: 以open_department_id来标识部门, 默认值: `open_department_id`
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    approval_name: string // 审批定义名称, 创建审批定义返回的值, 表示该实例属于哪个流程；该字段会影响到列表中该实例的标题, 标题取自对应定义的 name 字段, 示例值: "@i18n@1"
    approval_code: string // 审批定义 code, 用户自定义, 定义的唯一标识, 如果不存在该 code, 则创建, 否则更新, 示例值: "permission_test"
    group_code: string // 审批定义所属审批分组, 用户自定义； 如果group_code当前不存在, 则会新建审批分组； 如果group_code已经存在, 则会使用group_name更新审批分组名称, 示例值: "work_group"
    group_name?: string // 分组名称, 值的格式是 i18n key, 文案放在 i18n_resource； 如果是 group_code 当前不存在, 则该 group_name 必填, 否则, 如果填写了则会更新分组名称, 不填则不更新分组名称； 审批发起页 审批定义的分组名称来自该字段, 示例值: "@i18n@2"
    description?: string // 审批定义的说明, 值的格式是 i18n key, 文案放在 i18n_resource； 审批发起页 审批定义的说明内容来自该字段, 示例值: "@i18n@2"
    external: CreateApprovalExternalApprovalReqExternal // 三方审批相关
    viewers?: CreateApprovalExternalApprovalReqViewer[] // 可见人列表, 可通知配置多个可见人, 只有在配置的范围内用户可以在审批发起也看到该审批, 默认不传, 则是任何人不可见
    i18n_resources?: CreateApprovalExternalApprovalReqI18nResource[] // 国际化文案
  }

  export interface CreateApprovalExternalApprovalReqExternal {
    biz_name?: string // 列表中用于提示审批来自哪里, i18n key, 注意不需要“来自”前缀, 审批中心会拼上前缀, 示例值: "@i18n@3"
    biz_type?: string // 审批定义业务类别, 示例值: "permission"
    create_link_mobile: string // 移动端发起链接, 如果设置了该链接, 则会在移动端审批发起页展示该审批, 用户点击后会跳转到该链接进行发起； 如果不填, 则在mobile端不显示该审批, 示例值: "https://applink.feishu.cn/client/mini_program/open?appId=cli_9c90fc38e07a9101&path=pages/approval-form/index?id=9999"
    create_link_pc?: string // PC端发起链接, 如果设置了该链接, 则会在PC端审批发起页展示该审批, 用户点击后会跳转到该链接进行发起； 如果不填, 则在PC端不显示该审批；, 示例值: "https://applink.feishu.cn/client/mini_program/open?mode=appCenter&appId=cli_9c90fc38e07a9101&path=pc/pages/create-form/index?id=9999"
    support_pc?: boolean // 审批实例、审批任务、审批抄送是否要在PC端展示, 如果为 true, 则PC端列表会展示该定义下的实例信息, 否则, 不展示, 示例值: true
    support_mobile?: boolean // 审批实例、审批任务、审批抄送是否要在移动端展示, 如果为 true, 则移动端列表会展示该定义下的实例信息, 否则, 不展示； support_pc和support_mobile不可都为false, 否则不展示, 示例值: true
    support_batch_read?: boolean // 是否支持批量已读, 示例值: true
    enable_mark_readed?: boolean // 是否支持标注可读, 示例值: true
    enable_quick_operate?: boolean // 是否支持快速操作, 示例值: true
    action_callback_url?: string // 三方系统的操作回调 url, 【待审批】列表的任务审批人点同意或拒绝操作后, 审批中心调用该地址通知三方系统, 回调地址相关信息可参见: [三方审批快捷审批回调](https://open.feishu.cn/document/ukTMukTMukTM/ukjNyYjL5YjM24SO2IjN/quick-approval-callback), 示例值: "http://www.feishu.cn/approval/openapi/instanceOperate"
    action_callback_token?: string // 回调时带的 token, 用于业务系统验证请求来自审批, 具体参考 [开放平台文档](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM), 示例值: "sdjkljkx9lsadf110"
    action_callback_key?: string // 请求参数加密密钥, 如果配置了该参数, 则会对请求参数进行加密, 业务需要对请求进行解密, 加解密算法参考 [关联外部选项说明](https://open.feishu.cn/document/ukTMukTMukTM/uADM4QjLwADO04CMwgDN), 示例值: "gfdqedvsadfgfsd"
    allow_batch_operate?: boolean // 是否支持批量审批, 示例值: true
  }

  export interface CreateApprovalExternalApprovalReqI18nResource {
    locale: string // 语言可选值有: zh-CN: 中文 en-US: 英文 ja-JP: 日文, 示例值: "zh-CN", 可选值有: zh-CN: 中文, en-US: 英文, ja-JP: 日文
    texts?: CreateApprovalExternalApprovalReqI18nResourceText[] // 文案 key, value, i18n key 以 @i18n@ 开头； 该字段主要用于做国际化, 语序用户同时传多个语言的文案, 审批中心会根据用户当前的语音环境使用对应的文案, 如果没有传用户当前的语音环境文案, 则会使用默认的语言文案。
    is_default: boolean // 是否默认语言, 默认语言需要包含所有key, 非默认语言如果key不存在会使用默认语言代替, 示例值: true
  }

  export interface CreateApprovalExternalApprovalReqI18nResourceText {
    key: string // 文案key, 示例值: "@i18n@1"
    value: string // 文案, 示例值: "people"
  }

  export interface CreateApprovalExternalApprovalReqViewer {
    viewer_type?: string // 可见人类型, 示例值: "USER", 可选值有: TENANT: 租户内可见, DEPARTMENT: 指定部门, USER: 指定用户, NONE: 任何人都不可见
    viewer_user_id?: string // 当 view_type 是 USER, 根据user_id_type填写用户id, 示例值: "19a294c2"
    viewer_department_id?: string // 当 view_type 为DEPARTMENT, 根据department_id_type填写部门id, 示例值: "od-ac9d697abfa990b715dcc33d58a62a9d"
  }

  export interface CreateApprovalExternalApprovalResp {
    approval_code: string // 审批定义 code, 用户自定义, 定义的唯一标识
  }

  export interface createApprovalExternalApprovalResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateApprovalExternalApprovalResp
  }

  export interface CreateApprovalExternalInstanceReq {
    approval_code: string // 审批定义 code, 创建审批定义返回的值, 表示该实例属于哪个流程；该字段会影响到列表中该实例的标题, 标题取自对应定义的 name 字段, 示例值: "81D31358-93AF-92D6-7425-01A5D67C4E71"
    status: string // 审批实例状态, 示例值: "PENDING", 可选值有: PENDING: 审批中, APPROVED: 审批流程结束, 结果为同意, REJECTED: 审批流程结束, 结果为拒绝, CANCELED: 审批发起人撤回, DELETED: 审批被删除, HIDDEN: 状态隐藏(不显示状态)
    extra?: string // 审批实例扩展 JSON, 示例值: "{\"xxx\":\"xxx\"}"
    instance_id: string // 审批实例唯一标识, 用户自定义, 需确保证租户、应用下唯一, 示例值: "24492654"
    links?: CreateApprovalExternalInstanceReqLink[] // 审批实例链接集合, 用于【已发起】列表的跳转, 跳转回三方系统； pc_link 和 mobile_link 必须填一个, 填写的是哪一端的链接, 即会跳转到该链接, 不受平台影响
    title?: string // 审批展示名称, 如果填写了该字段, 则审批列表中的审批名称使用该字段, 如果不填该字段, 则审批名称使用审批定义的名称, 示例值: "@i18n@1"
    form?: CreateApprovalExternalInstanceReqForm[] // 用户提交审批时填写的表单数据, 用于所有审批列表中展示。可传多个值, 但审批中心pc展示前2个, 移动端展示前3个, 长度不超过2048字符
    user_id?: string // 审批发起人 user_id, 发起人可在【已发起】列表中看到所有已发起的审批; 在【待审批】, 【已审批】【抄送我】列表中, 该字段展示审批是谁发起的。审批发起人 open id, 和 user id 二选一, 示例值: "a987sf9s"
    user_name?: string // 审批发起人 用户名, 如果发起人不是真实的用户（例如是某个部门）, 没有 user_id, 则可以使用该字段传名称, 示例值: "@i18n@9"
    open_id?: string // 审批发起人 open id, 和 user id 二选一, 示例值: "ou_be73cbc0ee35eb6ca54e9e7cc14998c1"
    department_id?: string // 发起人部门, 用于列表中展示发起人所属部门。不传则不展示。如果用户没加入任何部门, 传 "", 将展示租户名称传 department_name 展示部门名称, 示例值: "od-8ec33278bc2"
    department_name?: string // 审批发起人 部门, 如果发起人不是真实的用户（例如是某个部门）, 没有 department_id, 则可以使用该字段传名称, 示例值: "@i18n@10"
    start_time: string // 审批发起时间, Unix毫秒时间戳, 示例值: "1556468012678"
    end_time: string // 审批实例结束时间: 未结束的审批为 0, Unix毫秒时间戳, 示例值: "1556468012678"
    update_time: string // 审批实例最近更新时间；用于推送数据版本控制如果 update_mode 值为 UPDATE, 则只有传过来的 update_time 有变化时（变大）, 才会更新审批中心中的审批实例信息。使用该字段主要用来避免并发时老的数据更新了新的数据, 示例值: "1556468012678"
    display_method?: string // 列表页打开审批实例的方式, 示例值: "BROWSER", 可选值有: BROWSER: 跳转系统默认浏览器打开, SIDEBAR: 飞书中侧边抽屉打开, NORMAL: 飞书内嵌页面打开
    update_mode?: string // 更新方式, 当 update_mode=REPLACE时, 每次都以当前推送的数据为最终数据, 会删掉审批中心中多余的任务、抄送数据（不在这次推送的数据中）; 当 update_mode=UPDATE时, 则不会删除审批中心的数据, 而只是进行新增和更新实例、任务数据, 示例值: "UPDATE", 可选值有: REPLACE: 全量替换, 默认值, UPDATE: 增量更新
    task_list?: CreateApprovalExternalInstanceReqTask[] // 任务列表, 最大长度: `200`
    cc_list?: CreateApprovalExternalInstanceReqCc[] // 抄送列表, 最大长度: `200`
    i18n_resources?: CreateApprovalExternalInstanceReqI18nResource[] // 国际化文案
  }

  export interface CreateApprovalExternalInstanceReqCc {
    cc_id: string // 审批实例内唯一标识, 示例值: "123456"
    user_id: string // 抄送人 employee id, 示例值: "12345"
    open_id?: string // 抄送人 open id, 和user id 二选一, 示例值: "ou_be73cbc0ee35eb6ca54e9e7cc14998c1"
    links?: CreateApprovalExternalInstanceReqCcLink[] // 跳转链接, 用于【抄送我的】列表中的跳转pc_link 和 mobile_link 必须填一个, 填写的是哪一端的链接, 即会跳转到该链接, 不受平台影响
    read_status: string // 阅读状态, 空值表示不支持已读未读: 示例值: "READ", 可选值有: READ: 已读, UNREAD: 未读
    extra?: string // 扩展 json, 示例值: "{\"xxx\":\"xxx\"}"
    title?: string // 抄送任务名称, 示例值: "xxx"
    create_time: string // 抄送发起时间, Unix 毫秒时间戳, 示例值: "1556468012678"
    update_time: string // 抄送最近更新时间, 用于推送数据版本控制更新策略同 instance 的update_time, 示例值: "1556468012678"
    display_method?: string // 列表页打开审批任务的方式, 示例值: "BROWSER", 可选值有: BROWSER: 跳转系统默认浏览器打开, SIDEBAR: 飞书中侧边抽屉打开, NORMAL: 飞书内嵌页面打开
  }

  export interface CreateApprovalExternalInstanceReqCcLink {
    pc_link: string // pc 端的跳转链接, 当用户使用飞书 pc 端时, 使用该字段进行跳转, 示例值: "https://applink.feishu.cn/client/mini_program/open?mode=appCenter&appId=cli_9c90fc38e07a9101&path=pc/pages/detail?id=1234"
    mobile_link?: string // 移动端 跳转链接, 当用户使用飞书 移动端时, 使用该字段进行跳转, 示例值: "https://applink.feishu.cn/client/mini_program/open?appId=cli_9c90fc38e07a9101&path=pages/detail?id=1234"
  }

  export interface CreateApprovalExternalInstanceReqForm {
    name?: string // 表单字段名称, 示例值: "@i18n@2"
    value?: string // 表单值, 示例值: "@i18n@3"
  }

  export interface CreateApprovalExternalInstanceReqI18nResource {
    locale: string // 语言可选值有: zh-CN: 中文 en-US: 英文 ja-JP: 日文, 示例值: "zh-CN", 可选值有: zh-CN: 中文, en-US: 英文, ja-JP: 日文
    texts?: CreateApprovalExternalInstanceReqI18nResourceText[] // 文案 key, value, i18n key 以 @i18n@ 开头； 该字段主要用于做国际化, 语序用户同时传多个语言的文案, 审批中心会根据用户当前的语音环境使用对应的文案, 如果没有传用户当前的语音环境文案, 则会使用默认的语言文案。
    is_default: boolean // 是否默认语言, 默认语言需要包含所有key, 非默认语言如果key不存在会使用默认语言代替, 示例值: true
  }

  export interface CreateApprovalExternalInstanceReqI18nResourceText {
    key: string // 文案key, 示例值: "@i18n@1"
    value: string // 文案, 示例值: "people"
  }

  export interface CreateApprovalExternalInstanceReqLink {
    pc_link: string // pc 端的跳转链接, 当用户使用飞书 pc 端时, 使用该字段进行跳转, 示例值: "https://applink.feishu.cn/client/mini_program/open?mode=appCenter&appId=cli_9c90fc38e07a9101&path=pc/pages/detail?id=1234"
    mobile_link?: string // 移动端 跳转链接, 当用户使用飞书 移动端时, 使用该字段进行跳转, 示例值: "https://applink.feishu.cn/client/mini_program/open?appId=cli_9c90fc38e07a9101&path=pages/detail?id=1234"
  }

  export interface CreateApprovalExternalInstanceReqTask {
    task_id: string // 审批实例内的唯一标识, 用于更新审批任务时定位数据, 示例值: "112534"
    user_id: string // 审批人 user_id, 该任务会出现在审批人的【待审批】或【已审批】列表中, 示例值: "a987sf9s"
    open_id?: string // 审批人 open id, 和 user id 二选一, 示例值: "ou_be73cbc0ee35eb6ca54e9e7cc14998c1"
    title?: string // 审批任务名称, 示例值: "i18n1"
    links: CreateApprovalExternalInstanceReqTaskLinks // 【待审批】或【已审批】中使用的跳转链接, 用于跳转回三方系统pc_link 和 mobile_link 必须填一个, 填写的是哪一端的链接, 即会跳转到该链接, 不受平台影响
    status: string // 任务状态, 示例值: "PENDING", 可选值有: PENDING: 待审批, APPROVED: 任务同意, REJECTED: 任务拒绝, TRANSFERRED: 任务转交, DONE: 任务通过但审批人未操作；审批人看不到这个任务, 若想要看到, 可以通过抄送该人.
    extra?: string // 扩展 json, 示例值: "{\"xxx\":\"xxx\"}"
    create_time: string // 任务创建时间, Unix 毫秒时间戳, 示例值: "1556468012678"
    end_time: string // 任务完成时间: 未结束的审批为 0, Unix 毫秒时间戳, 示例值: "1556468012678"
    update_time?: string // task最近更新时间, 用于推送数据版本控制； 更新策略同 instance 中的 update_time, 示例值: "1556468012678"
    action_context?: string // 操作上下文, 当用户操作时, 回调请求中带上该参数, 用于传递该任务的上下文数据, 示例值: "123456"
    action_configs?: CreateApprovalExternalInstanceReqTaskActionConfig[] // 任务级别操作配置, 快捷审批目前支持移动端操作
    display_method?: string // 列表页打开审批任务的方式, 示例值: "BROWSER", 可选值有: BROWSER: 跳转系统默认浏览器打开, SIDEBAR: 飞书中侧边抽屉打开, NORMAL: 飞书内嵌页面打开
  }

  export interface CreateApprovalExternalInstanceReqTaskActionConfig {
    action_type: string // 操作类型, 每个任务都可以配置2个操作, 会展示审批列表中, 当用户操作时, 回调请求会带上该字段, 表示用户进行了同意操作还是拒绝操作, 示例值: "APPROVE", 可选值有: APPROVE: 同意, REJECT: 拒绝, {KEY}: 任意字符串, 如果使用任意字符串, 则需要提供 action_name
    action_name?: string // 操作名称, i18n key 用于前台展示, 如果 action_type 不是 APPROVAL和REJECT, 则必须提供该字段, 用于展示特定的操作名称, 示例值: "@i18n@5"
    is_need_reason?: boolean // 是否需要意见, 如果为true, 则用户操作时, 会跳转到 意见填写页面, 示例值: false
    is_reason_required?: boolean // 审批意见是否必填, 示例值: false
    is_need_attachment?: boolean // 意见是否支持上传附件, 示例值: false
  }

  export interface CreateApprovalExternalInstanceReqTaskLinks {
    pc_link: string // pc 端的跳转链接, 当用户使用飞书 pc 端时, 使用该字段进行跳转, 示例值: "https://applink.feishu.cn/client/mini_program/open?mode=appCenter&appId=cli_9c90fc38e07a9101&path=pc/pages/detail?id=1234"
    mobile_link?: string // 移动端 跳转链接, 当用户使用飞书 移动端时, 使用该字段进行跳转, 示例值: "https://applink.feishu.cn/client/mini_program/open?appId=cli_9c90fc38e07a9101&path=pages/detail?id=1234"
  }

  export interface CreateApprovalExternalInstanceResp {
    data: CreateApprovalExternalInstanceRespData // 同步的实例数据
  }

  export interface CreateApprovalExternalInstanceRespData {
    approval_code: string // 审批定义 code, 创建审批定义返回的值, 表示该实例属于哪个流程；该字段会影响到列表中该实例的标题, 标题取自对应定义的 name 字段
    status: string // 审批实例状态, 可选值有: PENDING: 审批中, APPROVED: 审批流程结束, 结果为同意, REJECTED: 审批流程结束, 结果为拒绝, CANCELED: 审批发起人撤回, DELETED: 审批被删除, HIDDEN: 状态隐藏(不显示状态)
    extra: string // 审批实例扩展 JSON
    instance_id: string // 审批实例唯一标识, 用户自定义, 需确保证租户、应用下唯一
    links?: CreateApprovalExternalInstanceRespDataLink[] // 审批实例链接集合, 用于【已发起】列表的跳转, 跳转回三方系统； pc_link 和 mobile_link 必须填一个, 填写的是哪一端的链接, 即会跳转到该链接, 不受平台影响
    title: string // 审批展示名称, 如果填写了该字段, 则审批列表中的审批名称使用该字段, 如果不填该字段, 则审批名称使用审批定义的名称
    form?: CreateApprovalExternalInstanceRespDataForm[] // 用户提交审批时填写的表单数据, 用于所有审批列表中展示。可传多个值, 但审批中心pc展示前2个, 移动端展示前3个, 长度不超过2048字符
    user_id: string // 审批发起人 user_id, 发起人可在【已发起】列表中看到所有已发起的审批; 在【待审批】, 【已审批】【抄送我】列表中, 该字段展示审批是谁发起的。审批发起人 open id, 和 user id 二选一。
    user_name: string // 审批发起人 用户名, 如果发起人不是真实的用户（例如是某个部门）, 没有 user_id, 则可以使用该字段传名称
    open_id: string // 审批发起人 open id, 和 user id 二选一
    department_id: string // 发起人部门, 用于列表中展示发起人所属部门。不传则不展示。如果用户没加入任何部门, 传 "", 将展示租户名称传 department_name 展示部门名称
    department_name: string // 审批发起人 部门, 如果发起人不是真实的用户（例如是某个部门）, 没有 department_id, 则可以使用该字段传名称
    start_time: string // 审批发起时间, Unix毫秒时间戳
    end_time: string // 审批实例结束时间: 未结束的审批为 0, Unix毫秒时间戳
    update_time: string // 审批实例最近更新时间；用于推送数据版本控制如果 update_mode 值为 UPDATE, 则只有传过来的 update_time 有变化时（变大）, 才会更新审批中心中的审批实例信息。使用该字段主要用来避免并发时老的数据更新了新的数据
    display_method: string // 列表页打开审批实例的方式, 可选值有: BROWSER: 跳转系统默认浏览器打开, SIDEBAR: 飞书中侧边抽屉打开, NORMAL: 飞书内嵌页面打开
    update_mode: string // 更新方式, 当 update_mode=REPLACE时, 每次都以当前推送的数据为最终数据, 会删掉审批中心中多余的任务、抄送数据（不在这次推送的数据中）; 当 update_mode=UPDATE时, 则不会删除审批中心的数据, 而只是进行新增和更新实例、任务数据, 可选值有: REPLACE: 全量替换, 默认值, UPDATE: 增量更新
    task_list?: CreateApprovalExternalInstanceRespDataTask[] // 任务列表
    cc_list?: CreateApprovalExternalInstanceRespDataCc[] // 抄送列表
    i18n_resources?: CreateApprovalExternalInstanceRespDataI18nResource[] // 国际化文案
  }

  export interface CreateApprovalExternalInstanceRespDataCc {
    cc_id: string // 审批实例内唯一标识
    user_id: string // 抄送人 employee id
    open_id: string // 抄送人 open id, 和user id 二选一
    links?: CreateApprovalExternalInstanceRespDataCcLink[] // 跳转链接, 用于【抄送我的】列表中的跳转pc_link 和 mobile_link 必须填一个, 填写的是哪一端的链接, 即会跳转到该链接, 不受平台影响
    read_status: string // 阅读状态, 空值表示不支持已读未读: 可选值有: READ: 已读, UNREAD: 未读
    extra: string // 扩展 json
    title: string // 抄送任务名称
    create_time: string // 抄送发起时间, Unix 毫秒时间戳
    update_time: string // 抄送最近更新时间, 用于推送数据版本控制更新策略同 instance 的update_time
    display_method: string // 列表页打开审批任务的方式, 可选值有: BROWSER: 跳转系统默认浏览器打开, SIDEBAR: 飞书中侧边抽屉打开, NORMAL: 飞书内嵌页面打开
  }

  export interface CreateApprovalExternalInstanceRespDataCcLink {
    pc_link: string // pc 端的跳转链接, 当用户使用飞书 pc 端时, 使用该字段进行跳转
    mobile_link: string // 移动端 跳转链接, 当用户使用飞书 移动端时, 使用该字段进行跳转
  }

  export interface CreateApprovalExternalInstanceRespDataForm {
    name: string // 表单字段名称
    value: string // 表单值
  }

  export interface CreateApprovalExternalInstanceRespDataI18nResource {
    locale: string // 语言可选值有: zh-CN: 中文 en-US: 英文 ja-JP: 日文, 可选值有: zh-CN: 中文, en-US: 英文, ja-JP: 日文
    texts?: CreateApprovalExternalInstanceRespDataI18nResourceText[] // 文案 key, value, i18n key 以 @i18n@ 开头； 该字段主要用于做国际化, 语序用户同时传多个语言的文案, 审批中心会根据用户当前的语音环境使用对应的文案, 如果没有传用户当前的语音环境文案, 则会使用默认的语言文案。
    is_default: boolean // 是否默认语言, 默认语言需要包含所有key, 非默认语言如果key不存在会使用默认语言代替
  }

  export interface CreateApprovalExternalInstanceRespDataI18nResourceText {
    key: string // 文案key
    value: string // 文案
  }

  export interface CreateApprovalExternalInstanceRespDataLink {
    pc_link: string // pc 端的跳转链接, 当用户使用飞书 pc 端时, 使用该字段进行跳转
    mobile_link: string // 移动端 跳转链接, 当用户使用飞书 移动端时, 使用该字段进行跳转
  }

  export interface CreateApprovalExternalInstanceRespDataTask {
    task_id: string // 审批实例内的唯一标识, 用于更新审批任务时定位数据
    user_id: string // 审批人 user_id, 该任务会出现在审批人的【待审批】或【已审批】列表中
    open_id: string // 审批人 open id, 和 user id 二选一
    title: string // 审批任务名称
    links: CreateApprovalExternalInstanceRespDataTaskLinks // 【待审批】或【已审批】中使用的跳转链接, 用于跳转回三方系统pc_link 和 mobile_link 必须填一个, 填写的是哪一端的链接, 即会跳转到该链接, 不受平台影响
    status: string // 任务状态, 可选值有: PENDING: 待审批, APPROVED: 任务同意, REJECTED: 任务拒绝, TRANSFERRED: 任务转交, DONE: 任务通过但审批人未操作；审批人看不到这个任务, 若想要看到, 可以通过抄送该人.
    extra: string // 扩展 json
    create_time: string // 任务创建时间, Unix 毫秒时间戳
    end_time: string // 任务完成时间: 未结束的审批为 0, Unix 毫秒时间戳
    update_time: string // task最近更新时间, 用于推送数据版本控制； 更新策略同 instance 中的 update_time
    action_context: string // 操作上下文, 当用户操作时, 回调请求中带上该参数, 用于传递该任务的上下文数据
    action_configs?: CreateApprovalExternalInstanceRespDataTaskActionConfig[] // 任务级别操作配置, 快捷审批目前支持移动端操作
    display_method: string // 列表页打开审批任务的方式, 可选值有: BROWSER: 跳转系统默认浏览器打开, SIDEBAR: 飞书中侧边抽屉打开, NORMAL: 飞书内嵌页面打开
  }

  export interface CreateApprovalExternalInstanceRespDataTaskActionConfig {
    action_type: string // 操作类型, 每个任务都可以配置2个操作, 会展示审批列表中, 当用户操作时, 回调请求会带上该字段, 表示用户进行了同意操作还是拒绝操作, 可选值有: APPROVE: 同意, REJECT: 拒绝, {KEY}: 任意字符串, 如果使用任意字符串, 则需要提供 action_name
    action_name: string // 操作名称, i18n key 用于前台展示, 如果 action_type 不是 APPROVAL和REJECT, 则必须提供该字段, 用于展示特定的操作名称
    is_need_reason: boolean // 是否需要意见, 如果为true, 则用户操作时, 会跳转到 意见填写页面
    is_reason_required: boolean // 审批意见是否必填
    is_need_attachment: boolean // 意见是否支持上传附件
  }

  export interface CreateApprovalExternalInstanceRespDataTaskLinks {
    pc_link: string // pc 端的跳转链接, 当用户使用飞书 pc 端时, 使用该字段进行跳转
    mobile_link: string // 移动端 跳转链接, 当用户使用飞书 移动端时, 使用该字段进行跳转
  }

  export interface createApprovalExternalInstanceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateApprovalExternalInstanceResp
  }

  export interface CheckApprovalExternalInstanceReq {
    instances?: CheckApprovalExternalInstanceReqInstance[] // 校验的实例信息
  }

  export interface CheckApprovalExternalInstanceReqInstance {
    instance_id: string // 审批实例 id, 示例值: "1234234234242423"
    update_time: string // 审批实例最近更新时间, 示例值: "1591603040000"
    tasks?: CheckApprovalExternalInstanceReqInstanceTask[] // 任务信息
  }

  export interface CheckApprovalExternalInstanceReqInstanceTask {
    task_id: string // 任务 id, 示例值: "112253"
    update_time: string // 任务最近更新时间, 示例值: "1591603040000"
  }

  export interface CheckApprovalExternalInstanceResp {
    diff_instances?: CheckApprovalExternalInstanceRespDiffInstance[] // 更新时间不一致的实例信息
  }

  export interface CheckApprovalExternalInstanceRespDiffInstance {
    instance_id: string // 审批实例 id
    update_time: string // 任务最近更新时间
    tasks?: CheckApprovalExternalInstanceRespDiffInstanceTask[] // 任务信息
  }

  export interface CheckApprovalExternalInstanceRespDiffInstanceTask {
    task_id: string // 任务 id
    update_time: string // 任务最近更新时间
  }

  export interface checkApprovalExternalInstanceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CheckApprovalExternalInstanceResp
  }

  export interface GetApprovalExternalListReq {
    page_size?: number // 分页大小, 示例值: 100, 最大值: `500`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "nF1ZXJ5VGhlbkZldGNoCgAAAAAA6PZwFmUzSldvTC1yU"
    approval_codes?: string[] // 审批定义 Code, 用于指定只获取这些定义下的数据, 示例值: B7B65FFE-C2GC-452F-9F0F-9AA8352363D6, 最大长度: `20`
    instance_ids?: string[] // 审批实例 ID, 用于指定只获取这些实例下的数据, 最多支持 20 个, 示例值: oa_159160304
    user_ids?: string[] // 审批人 user_id, 用于指定只获取这些用户的数据, 示例值: 112321
    status?: string // 审批任务状态, 用于指定获取该状态下的数据, 示例值: "PENDING", 可选值有: PENDING: 审批中, APPROVED: 审批流程结束, 结果为同意, REJECTED: 审批流程结束, 结果为拒绝, TRANSFERRED: 任务转交, DONE: 任务通过但审批人未操作；审批人看不到这个任务, 若想要看到, 可以通过抄送该人.
  }

  export interface GetApprovalExternalListResp {
    data?: GetApprovalExternalListRespData[] // 返回数据
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetApprovalExternalListRespData {
    instance_id: string // 审批实例 ID
    approval_id: string // 审批的id
    approval_code: string // 审批对应的 approval_code
    status: string // 审批实例当前的状态, 可选值有: PENDING: 审批中, APPROVED: 审批流程结束, 结果为同意, REJECTED: 审批流程结束, 结果为拒绝, CANCELED: 审批发起人撤回, DELETED: 审批被删除, HIDDEN: 状态隐藏(不显示状态)
    update_time: string // 审批实例最后更新时间, 单位 毫秒
    tasks?: GetApprovalExternalListRespDataTask[] // 审批实例下的审批任务
  }

  export interface GetApprovalExternalListRespDataTask {
    id: string // 审批任务 ID
    status: string // 审批任务状态, 可选值有: PENDING: 审批中, APPROVED: 审批流程结束, 结果为同意, REJECTED: 审批流程结束, 结果为拒绝, TRANSFERRED: 任务转交, DONE: 任务通过但审批人未操作；审批人看不到这个任务, 若想要看到, 可以通过抄送该人.
    update_time: string // 审批任务最后更新时间, 单位 毫秒
  }

  export interface getApprovalExternalListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApprovalExternalListResp
  }

  export interface UploadApprovalFileReq {
    name: string // 文件名（需包含文件扩展名, 如“文件.doc”
    type: string // 文件类型（image 或 attachment）
    content: Buffer // 文件
  }

  export interface UploadApprovalFileResp {
    code: string // 文件标识码（用于创建审批实例）
    url: string // 文件 url
  }

  export interface uploadApprovalFileResp {
    code: number // 错误码, 非0表示失败
    msg: string // 返回码的描述
    data: UploadApprovalFileResp // 返回业务信息
  }

  export interface UpdateApprovalMessageReq {
    message_id: string // 卡片 id, 发送卡片时会拿到
    status: string // 状态类型, 用于更新第一个action文字内容, 枚举: APPROVED:-已同意 REJECTED:-已拒绝 CANCELLED:-已撤回 FORWARDED:-已转交 ROLLBACK:-已回退 ADD:-已加签 DELETED:-已删除 PROCESSED:-已处理 CUSTOM:-自定义按钮状态
    status_name?: string // status=CUSTOM时可以自定义审批同意/拒绝后title状态
    detail_action_name?: string // status=CUSTOM时可以自定义审批同意/拒绝后“查看详情按钮名称”
    i18n_resources?: string // i18n国际化文案
  }

  export interface UpdateApprovalMessageResp {
    message_id: string // 消息 id, 用于卡片更新、撤回
  }

  export interface updateApprovalMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 返回码的描述
    data: UpdateApprovalMessageResp // 返回业务信息
  }

  export interface SendApprovalMessageReq {}

  export interface SendApprovalMessageResp {
    message_id: string // 消息 id, 用于卡片更新
  }

  export interface sendApprovalMessageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 返回码的描述
    data: SendApprovalMessageResp // 返回业务信息
  }

  export interface SearchApprovalInstanceReq {
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "nF1ZXJ5VGhlbkZldGNoCgAAAAAA6PZwFmUzSldvTC1yU"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id: string // 根据x_user_type填写用户 id, 示例值: "lwiu098wj"
    approval_code?: string // 审批定义 code, 示例值: "EB828003-9FFE-4B3F-AA50-2E199E2ED942"
    instance_code?: string // 审批实例 code, 示例值: "EB828003-9FFE-4B3F-AA50-2E199E2ED943"
    instance_external_id?: string // 审批实例第三方 id 注: 和 approval_code 取并集, 示例值: "EB828003-9FFE-4B3F-AA50-2E199E2ED976"
    group_external_id?: string // 审批定义分组第三方 id 注: 和 instance_code 取并集, 示例值: "1234567"
    instance_title?: string // 审批实例标题（只有第三方审批有）, 示例值: "test"
    instance_status?: string // 审批实例状态, 注: 若不设置, 查询全部状态 若不在集合中, 报错, 示例值: "PENDING", 可选值有: PENDING: 审批中, RECALL: 撤回, REJECT: 拒绝, DELETED: 已删除, APPROVED: 通过, ALL: 所有状态
    instance_start_time_from?: string // 实例查询开始时间（unix毫秒时间戳）, 示例值: "1547654251506"
    instance_start_time_to?: string // 实例查询结束时间 (unix毫秒时间戳), 示例值: "1547654251506"
    locale?: string // 地区, 示例值: "zh-CN", 可选值有: zh-CN: 中文, en-US: 英文, ja-JP: 日文
  }

  export interface SearchApprovalInstanceResp {
    count: number // 查询返回条数
    instance_list?: SearchApprovalInstanceRespInstance[] // 审批实例列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface SearchApprovalInstanceRespInstance {
    approval: SearchApprovalInstanceRespInstanceApproval // 审批定义
    group: SearchApprovalInstanceRespInstanceGroup // 审批定义分组
    instance: SearchApprovalInstanceRespInstanceInstance // 审批实例信息
  }

  export interface SearchApprovalInstanceRespInstanceApproval {
    code: string // 审批定义 code
    name: string // 审批定义名称
    is_external: boolean // 是否为第三方审批
    external: SearchApprovalInstanceRespInstanceApprovalExternal // 第三方审批信息
  }

  export interface SearchApprovalInstanceRespInstanceApprovalExternal {
    batch_cc_read: boolean // 是否支持批量读
  }

  export interface SearchApprovalInstanceRespInstanceGroup {
    external_id: string // 审批定义分组外部 id
    name: string // 审批定义分组名称
  }

  export interface SearchApprovalInstanceRespInstanceInstance {
    code: string // 审批实例 code
    external_id: string // 审批实例外部 id
    user_id: string // 审批实例发起人 id
    start_time: string // 审批实例开始时间
    end_time: string // 审批实例结束时间
    status: string // 审批实例状态, 可选值有: REJECT: 拒绝, PENDING: 审批中, RECALL: 撤回, DELETED: 已删除, APPROVED: 通过
    title: string // 审批实例名称（只有第三方审批有）
    extra: string // 审批实例扩展字段, string型json
    serial_id: string // 审批流水号
    link: SearchApprovalInstanceRespInstanceInstanceLink // 审批实例链接（只有第三方审批有）
  }

  export interface SearchApprovalInstanceRespInstanceInstanceLink {
    pc_link: string // 审批实例 pc 端链接
    mobile_link: string // 审批实例移动端链接
  }

  export interface searchApprovalInstanceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SearchApprovalInstanceResp
  }

  export interface SearchApprovalCarbonCopyReq {
    page_size?: number // 分页大小, 示例值: 10, 默认值: `10`, 取值范围: `5` ～ `200`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "nF1ZXJ5VGhlbkZldGNoCgAAAAAA6PZwFmUzSldvTC1yU"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id: string // 根据x_user_type填写用户 id, 示例值: "lwiu098wj"
    approval_code?: string // 审批定义 code, 示例值: "EB828003-9FFE-4B3F-AA50-2E199E2ED942"
    instance_code?: string // 审批实例 code, 示例值: "EB828003-9FFE-4B3F-AA50-2E199E2ED943"
    instance_external_id?: string // 审批实例第三方 id 注: 和 approval_code 取并集, 示例值: "EB828003-9FFE-4B3F-AA50-2E199E2ED976"
    group_external_id?: string // 审批定义分组第三方 id 注: 和 instance_code 取并集, 示例值: "1234567"
    cc_title?: string // 审批实例标题（只有第三方审批有）, 示例值: "test"
    read_status?: string // 审批抄送状态, 注: 若不设置, 查询全部状态 若不在集合中, 报错, 示例值: "READ", 可选值有: READ: 已读, UNREAD: 未读, ALL: 所有状态
    cc_create_time_from?: string // 实例查询开始时间（unix毫秒时间戳）, 示例值: "1547654251506"
    cc_create_time_to?: string // 实例查询结束时间 (unix毫秒时间戳), 示例值: "1547654251506"
    locale?: string // 地区, 示例值: "zh-CN", 可选值有: zh-CN: 中文, en-US: 英文, ja-JP: 日文
  }

  export interface SearchApprovalCarbonCopyResp {
    count: number // 查询返回条数
    cc_list?: SearchApprovalCarbonCopyRespCc[] // 审批实例列表
    page_token: string // 翻页 Token
    has_more: boolean // 是否有更多任务可供拉取
  }

  export interface SearchApprovalCarbonCopyRespCc {
    approval: SearchApprovalCarbonCopyRespCcApproval // 审批定义
    group: SearchApprovalCarbonCopyRespCcGroup // 审批定义分组
    instance: SearchApprovalCarbonCopyRespCcInstance // 审批实例信息
    cc: SearchApprovalCarbonCopyRespCcCc // 审批任务
  }

  export interface SearchApprovalCarbonCopyRespCcApproval {
    code: string // 审批定义 code
    name: string // 审批定义名称
    is_external: boolean // 是否为第三方审批
    external: SearchApprovalCarbonCopyRespCcApprovalExternal // 第三方审批信息
  }

  export interface SearchApprovalCarbonCopyRespCcApprovalExternal {
    batch_cc_read: boolean // 是否支持批量读
  }

  export interface SearchApprovalCarbonCopyRespCcCc {
    user_id: string // 审批实例发起人 id
    create_time: string // 审批实例开始时间
    read_status: string // 审批实例状态, 可选值有: READ: 已读, UNREAD: 未读
    title: string // 审批实例名称（只有第三方审批有）
    extra: string // 审批实例扩展字段, string型json
    link: SearchApprovalCarbonCopyRespCcCcLink // 审批实例链接（只有第三方审批有）
  }

  export interface SearchApprovalCarbonCopyRespCcCcLink {
    pc_link: string // 审批实例 pc 端链接
    mobile_link: string // 审批实例移动端链接
  }

  export interface SearchApprovalCarbonCopyRespCcGroup {
    external_id: string // 审批定义分组外部 id
    name: string // 审批定义分组名称
  }

  export interface SearchApprovalCarbonCopyRespCcInstance {
    code: string // 审批实例 code
    external_id: string // 审批实例外部 id
    user_id: string // 审批实例发起人 id
    start_time: string // 审批实例开始时间
    end_time: string // 审批实例结束时间
    status: string // 审批实例状态, 可选值有: REJECT: 拒绝, PENDING: 审批中, RECALL: 撤回, DELETED: 已删除, APPROVED: 通过
    title: string // 审批实例名称（只有第三方审批有）
    extra: string // 审批实例扩展字段, string型json
    serial_id: string // 审批流水号
    link: SearchApprovalCarbonCopyRespCcInstanceLink // 审批实例链接（只有第三方审批有）
  }

  export interface SearchApprovalCarbonCopyRespCcInstanceLink {
    pc_link: string // 审批实例 pc 端链接
    mobile_link: string // 审批实例移动端链接
  }

  export interface searchApprovalCarbonCopyResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SearchApprovalCarbonCopyResp
  }

  export interface SearchApprovalTaskReq {
    page_size?: number // 分页大小, 示例值: 10, 默认值: `10`, 取值范围: `5` ～ `200`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "nF1ZXJ5VGhlbkZldGNoCgAAAAAA6PZwFmUzSldvTC1yU"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    user_id: string // 根据x_user_type填写用户 id, 示例值: "lwiu098wj"
    approval_code?: string // 审批定义 code, 示例值: "EB828003-9FFE-4B3F-AA50-2E199E2ED942"
    instance_code?: string // 审批实例 code, 示例值: "EB828003-9FFE-4B3F-AA50-2E199E2ED943"
    instance_external_id?: string // 审批实例第三方 id 注: 和 approval_code 取并集, 示例值: "EB828003-9FFE-4B3F-AA50-2E199E2ED976"
    group_external_id?: string // 审批定义分组第三方 id 注: 和 instance_code 取并集, 示例值: "1234567"
    task_title?: string // 审批实例标题（只有第三方审批有）, 示例值: "test"
    task_status?: string // 审批实例状态, 注: 若不设置, 查询全部状态 若不在集合中, 报错, 示例值: "PENDING", 可选值有: PENDING: 审批中, REJECTED: 拒绝, APPROVED: 通过, TRANSFERRED: 转交, DONE: 已完成, RM_REPEAT: 去重, PROCESSED: 已处理, ALL: 所有状态
    task_start_time_from?: string // 实例查询开始时间（unix毫秒时间戳）, 示例值: "1547654251506"
    task_start_time_to?: string // 实例查询结束时间 (unix毫秒时间戳), 示例值: "1547654251506"
    locale?: string // 地区, 示例值: "zh-CN", 可选值有: zh-CN: 中文, en-US: 英文, ja-JP: 日文
  }

  export interface SearchApprovalTaskResp {
    count: number // 查询返回条数
    task_list?: SearchApprovalTaskRespTask[] // 审批任务列表
    page_token: string // 翻页 Token
    has_more: boolean // 是否有更多任务可供拉取
  }

  export interface SearchApprovalTaskRespTask {
    approval: SearchApprovalTaskRespTaskApproval // 审批定义
    group: SearchApprovalTaskRespTaskGroup // 审批定义分组
    instance: SearchApprovalTaskRespTaskInstance // 审批实例信息
    task: SearchApprovalTaskRespTaskTask // 审批任务
  }

  export interface SearchApprovalTaskRespTaskApproval {
    code: string // 审批定义 code
    name: string // 审批定义名称
    is_external: boolean // 是否为第三方审批
    external: SearchApprovalTaskRespTaskApprovalExternal // 第三方审批信息
  }

  export interface SearchApprovalTaskRespTaskApprovalExternal {
    batch_cc_read: boolean // 是否支持批量读
  }

  export interface SearchApprovalTaskRespTaskGroup {
    external_id: string // 审批定义分组外部 id
    name: string // 审批定义分组名称
  }

  export interface SearchApprovalTaskRespTaskInstance {
    code: string // 审批实例 code
    external_id: string // 审批实例外部 id
    user_id: string // 审批实例发起人 id
    start_time: string // 审批实例开始时间
    end_time: string // 审批实例结束时间
    status: string // 审批实例状态, 可选值有: REJECT: 拒绝, PENDING: 审批中, RECALL: 撤回, DELETED: 已删除, APPROVED: 通过
    title: string // 审批实例名称（只有第三方审批有）
    extra: string // 审批实例扩展字段, string型json
    serial_id: string // 审批流水号
    link: SearchApprovalTaskRespTaskInstanceLink // 审批实例链接（只有第三方审批有）
  }

  export interface SearchApprovalTaskRespTaskInstanceLink {
    pc_link: string // 审批实例 pc 端链接
    mobile_link: string // 审批实例移动端链接
  }

  export interface SearchApprovalTaskRespTaskTask {
    user_id: string // 审批实例发起人 id
    start_time: string // 审批实例开始时间
    end_time: string // 审批实例结束时间
    status: string // 审批实例状态, 可选值有: REJECTED: 拒绝, PENDING: 审批中, APPROVED: 通过, TRANSFERRED: 转交, DONE: 已完成, RM_REPEAT: 去重, PROCESSED: 已处理
    title: string // 审批实例名称（只有第三方审批有）
    extra: string // 审批实例扩展字段, string型json
    link: SearchApprovalTaskRespTaskTaskLink // 审批实例链接（只有第三方审批有）
    task_id: string // 任务id
  }

  export interface SearchApprovalTaskRespTaskTaskLink {
    pc_link: string // 审批实例 pc 端链接
    mobile_link: string // 审批实例移动端链接
  }

  export interface searchApprovalTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SearchApprovalTaskResp
  }

  export interface GetApprovalUserTaskListReq {
    page_size?: number // 分页大小, 示例值: 100, 最大值: `200`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "1"
    user_id: string // 需要查询的 User ID, 示例值: "example_user_id"
    topic: string // 需要查询的任务分组主题, 如「待办」、「已办」等, 示例值: "1", 可选值有: `1`: 待办审批, `2`: 已办审批, `3`: 已发起审批, `17`: 未读知会, `18`: 已读知会
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetApprovalUserTaskListResp {
    tasks?: GetApprovalUserTaskListRespTask[] // 任务列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
    count: GetApprovalUserTaskListRespCount // 列表计数, 只在分页第一页返回
  }

  export interface GetApprovalUserTaskListRespCount {
    total: number // 总数, 大于等于 1000 个项目时将返回 999
    has_more: boolean // 还有更多, 当大于等于 1000 时将返回 true
  }

  export interface GetApprovalUserTaskListRespTask {
    topic: string // 任务所属的任务分组, 如「待办」、「已办」等, 可选值有: `1`: 待办审批, `2`: 已办审批, `3`: 已发起审批, `17`: 未读知会, `18`: 已读知会
    user_id: string // 任务所属的用户 ID
    title: string // 任务题目
    urls: GetApprovalUserTaskListRespTaskURLs // 任务相关 URL
    process_external_id: string // 流程三方 ID, 仅第三方流程, 需要在当前租户、当前 APP 内唯一
    task_external_id: string // 任务三方 ID, 仅第三方流程, 需要在当前流程实例内唯一
    status: string // 任务状态, 可选值有: `1`: 待办, `2`: 已办, `17`: 未读, `18`: 已读, `33`: 处理中, 标记完成用, `34`: 撤回
    process_status: string // 流程实例状态, 可选值有: `0`: 无流程状态, 不展示对应标签, `1`: 流程实例流转中, `2`: 已通过, `3`: 已拒绝, `4`: 已撤销, `5`: 已终止
    definition_code: string // 流程定义 Code
    initiators?: string[] // 发起人 ID 列表
    initiator_names?: string[] // 发起人姓名列表
    task_id: string // 任务 ID, 全局唯一
    process_id: string // 流程 ID, 全局唯一
    process_code: string // 流程 Code
    definition_group_id: string // 流程定义分组 ID
    definition_group_name: string // 流程定义分组名称
    definition_id: string // 流程定义 ID
    definition_name: string // 流程定义名称
  }

  export interface GetApprovalUserTaskListRespTaskURLs {
    helpdesk: string // 帮助服务台 URL
    mobile: string // 移动端 URL
    pc: string // PC 端 URL
  }

  export interface getApprovalUserTaskListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetApprovalUserTaskListResp
  }
}

class CreateApprovalReq {
  department_id_type?: any
  user_id_type?: any
  approval_name?: any
  approval_code?: any
  description?: any
  viewers?: any
  form?: any
  node_list?: any
  settings?: any
  config?: any
  icon?: any
  i18n_resources?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_name: this.approval_name,
      approval_code: this.approval_code,
      description: this.description,
      viewers: this.viewers,
      form: this.form,
      node_list: this.node_list,
      settings: this.settings,
      config: this.config,
      icon: this.icon,
      i18n_resources: this.i18n_resources
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApprovalReq {
  approval_code?: any
  locale?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':approval_code', this.approval_code)

    const q = {} as { [key: string]: any }
    if (this.locale !== undefined) {
      q['locale'] = this.locale
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SubscribeApprovalSubscriptionReq {
  approval_code?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':approval_code', this.approval_code)

    return path
  }
}

class UnsubscribeApprovalSubscriptionReq {
  approval_code?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':approval_code', this.approval_code)

    return path
  }
}

class CreateApprovalInstanceReq {
  approval_code?: any
  user_id?: any
  open_id?: any
  department_id?: any
  form?: any
  node_approver_user_id_list?: any
  node_approver_open_id_list?: any
  node_cc_user_id_list?: any
  node_cc_open_id_list?: any
  uuid?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_code: this.approval_code,
      user_id: this.user_id,
      open_id: this.open_id,
      department_id: this.department_id,
      form: this.form,
      node_approver_user_id_list: this.node_approver_user_id_list,
      node_approver_open_id_list: this.node_approver_open_id_list,
      node_cc_user_id_list: this.node_cc_user_id_list,
      node_cc_open_id_list: this.node_cc_open_id_list,
      uuid: this.uuid
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetApprovalInstanceReq {
  instance_id?: any
  locale?: any
  user_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':instance_id', this.instance_id)

    const q = {} as { [key: string]: any }
    if (this.locale !== undefined) {
      q['locale'] = this.locale
    }
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

class GetApprovalInstanceListReq {
  page_size?: any
  page_token?: any
  approval_code?: any
  start_time?: any
  end_time?: any

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
    if (this.approval_code !== undefined) {
      q['approval_code'] = this.approval_code
    }
    if (this.start_time !== undefined) {
      q['start_time'] = this.start_time
    }
    if (this.end_time !== undefined) {
      q['end_time'] = this.end_time
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CancelApprovalInstanceReq {
  user_id_type?: any
  approval_code?: any
  instance_code?: any
  user_id?: any
  notify_starter?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_code: this.approval_code,
      instance_code: this.instance_code,
      user_id: this.user_id,
      notify_starter: this.notify_starter
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

class CreateApprovalCarbonCopyReq {
  user_id_type?: any
  approval_code?: any
  instance_code?: any
  user_id?: any
  cc_user_ids?: any
  comment?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_code: this.approval_code,
      instance_code: this.instance_code,
      user_id: this.user_id,
      cc_user_ids: this.cc_user_ids,
      comment: this.comment
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

class PreviewApprovalInstanceReq {
  user_id_type?: any
  approval_code?: any
  user_id?: any
  department_id?: any
  form?: any
  instance_code?: any
  task_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_code: this.approval_code,
      user_id: this.user_id,
      department_id: this.department_id,
      form: this.form,
      instance_code: this.instance_code,
      task_id: this.task_id
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

class ApproveApprovalInstanceReq {
  user_id_type?: any
  approval_code?: any
  instance_code?: any
  user_id?: any
  comment?: any
  task_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_code: this.approval_code,
      instance_code: this.instance_code,
      user_id: this.user_id,
      comment: this.comment,
      task_id: this.task_id
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

class RejectApprovalInstanceReq {
  user_id_type?: any
  approval_code?: any
  instance_code?: any
  user_id?: any
  comment?: any
  task_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_code: this.approval_code,
      instance_code: this.instance_code,
      user_id: this.user_id,
      comment: this.comment,
      task_id: this.task_id
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

class TransferApprovalInstanceReq {
  user_id_type?: any
  approval_code?: any
  instance_code?: any
  user_id?: any
  comment?: any
  transfer_user_id?: any
  task_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_code: this.approval_code,
      instance_code: this.instance_code,
      user_id: this.user_id,
      comment: this.comment,
      transfer_user_id: this.transfer_user_id,
      task_id: this.task_id
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

class RollbackApprovalInstanceReq {
  user_id_type?: any
  user_id?: any
  task_id?: any
  reason?: any
  extra?: any
  task_def_key_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id: this.user_id,
      task_id: this.task_id,
      reason: this.reason,
      extra: this.extra,
      task_def_key_list: this.task_def_key_list
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

class AddApprovalInstanceSignReq {
  approval_code?: any
  instance_code?: any
  user_id?: any
  task_id?: any
  comment?: any
  add_sign_user_ids?: any
  add_sign_type?: any
  approval_method?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_code: this.approval_code,
      instance_code: this.instance_code,
      user_id: this.user_id,
      task_id: this.task_id,
      comment: this.comment,
      add_sign_user_ids: this.add_sign_user_ids,
      add_sign_type: this.add_sign_type,
      approval_method: this.approval_method
    }
  }

  getPath(path: string) {
    return path
  }
}

class CreateApprovalCommentReq {
  instance_id?: any
  user_id_type?: any
  user_id?: any
  content?: any
  at_info_list?: any
  parent_comment_id?: any
  comment_id?: any
  disable_bot?: any
  extra?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      content: this.content,
      at_info_list: this.at_info_list,
      parent_comment_id: this.parent_comment_id,
      comment_id: this.comment_id,
      disable_bot: this.disable_bot,
      extra: this.extra
    }
  }

  getPath(path: string) {
    path = path.replace(':instance_id', this.instance_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.user_id !== undefined) {
      q['user_id'] = this.user_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetApprovalCommentReq {
  instance_id?: any
  user_id_type?: any
  user_id?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':instance_id', this.instance_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.user_id !== undefined) {
      q['user_id'] = this.user_id
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

class DeleteApprovalCommentReq {
  instance_id?: any
  comment_id?: any
  user_id_type?: any
  user_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':instance_id', this.instance_id)
    path = path.replace(':comment_id', this.comment_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.user_id !== undefined) {
      q['user_id'] = this.user_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class RemoveApprovalCommentReq {
  instance_id?: any
  user_id_type?: any
  user_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':instance_id', this.instance_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.user_id !== undefined) {
      q['user_id'] = this.user_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateApprovalExternalApprovalReq {
  department_id_type?: any
  user_id_type?: any
  approval_name?: any
  approval_code?: any
  group_code?: any
  group_name?: any
  description?: any
  external?: any
  viewers?: any
  i18n_resources?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_name: this.approval_name,
      approval_code: this.approval_code,
      group_code: this.group_code,
      group_name: this.group_name,
      description: this.description,
      external: this.external,
      viewers: this.viewers,
      i18n_resources: this.i18n_resources
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateApprovalExternalInstanceReq {
  approval_code?: any
  status?: any
  extra?: any
  instance_id?: any
  links?: any
  title?: any
  form?: any
  user_id?: any
  user_name?: any
  open_id?: any
  department_id?: any
  department_name?: any
  start_time?: any
  end_time?: any
  update_time?: any
  display_method?: any
  update_mode?: any
  task_list?: any
  cc_list?: any
  i18n_resources?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_code: this.approval_code,
      status: this.status,
      extra: this.extra,
      instance_id: this.instance_id,
      links: this.links,
      title: this.title,
      form: this.form,
      user_id: this.user_id,
      user_name: this.user_name,
      open_id: this.open_id,
      department_id: this.department_id,
      department_name: this.department_name,
      start_time: this.start_time,
      end_time: this.end_time,
      update_time: this.update_time,
      display_method: this.display_method,
      update_mode: this.update_mode,
      task_list: this.task_list,
      cc_list: this.cc_list,
      i18n_resources: this.i18n_resources
    }
  }

  getPath(path: string) {
    return path
  }
}

class CheckApprovalExternalInstanceReq {
  instances?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      instances: this.instances
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetApprovalExternalListReq {
  page_size?: any
  page_token?: any
  approval_codes?: any
  instance_ids?: any
  user_ids?: any
  status?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      approval_codes: this.approval_codes,
      instance_ids: this.instance_ids,
      user_ids: this.user_ids,
      status: this.status
    }
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

class UploadApprovalFileReq {
  name?: any
  type?: any
  content?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      type: this.type,
      content: this.content
    }
  }

  getPath(path: string) {
    return path
  }
}

class UpdateApprovalMessageReq {
  message_id?: any
  status?: any
  status_name?: any
  detail_action_name?: any
  i18n_resources?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      message_id: this.message_id,
      status: this.status,
      status_name: this.status_name,
      detail_action_name: this.detail_action_name,
      i18n_resources: this.i18n_resources
    }
  }

  getPath(path: string) {
    return path
  }
}

class SendApprovalMessageReq {
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

class SearchApprovalInstanceReq {
  page_size?: any
  page_token?: any
  user_id_type?: any
  user_id?: any
  approval_code?: any
  instance_code?: any
  instance_external_id?: any
  group_external_id?: any
  instance_title?: any
  instance_status?: any
  instance_start_time_from?: any
  instance_start_time_to?: any
  locale?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id: this.user_id,
      approval_code: this.approval_code,
      instance_code: this.instance_code,
      instance_external_id: this.instance_external_id,
      group_external_id: this.group_external_id,
      instance_title: this.instance_title,
      instance_status: this.instance_status,
      instance_start_time_from: this.instance_start_time_from,
      instance_start_time_to: this.instance_start_time_to,
      locale: this.locale
    }
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

class SearchApprovalCarbonCopyReq {
  page_size?: any
  page_token?: any
  user_id_type?: any
  user_id?: any
  approval_code?: any
  instance_code?: any
  instance_external_id?: any
  group_external_id?: any
  cc_title?: any
  read_status?: any
  cc_create_time_from?: any
  cc_create_time_to?: any
  locale?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id: this.user_id,
      approval_code: this.approval_code,
      instance_code: this.instance_code,
      instance_external_id: this.instance_external_id,
      group_external_id: this.group_external_id,
      cc_title: this.cc_title,
      read_status: this.read_status,
      cc_create_time_from: this.cc_create_time_from,
      cc_create_time_to: this.cc_create_time_to,
      locale: this.locale
    }
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

class SearchApprovalTaskReq {
  page_size?: any
  page_token?: any
  user_id_type?: any
  user_id?: any
  approval_code?: any
  instance_code?: any
  instance_external_id?: any
  group_external_id?: any
  task_title?: any
  task_status?: any
  task_start_time_from?: any
  task_start_time_to?: any
  locale?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id: this.user_id,
      approval_code: this.approval_code,
      instance_code: this.instance_code,
      instance_external_id: this.instance_external_id,
      group_external_id: this.group_external_id,
      task_title: this.task_title,
      task_status: this.task_status,
      task_start_time_from: this.task_start_time_from,
      task_start_time_to: this.task_start_time_to,
      locale: this.locale
    }
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

class GetApprovalUserTaskListReq {
  page_size?: any
  page_token?: any
  user_id?: any
  topic?: any
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
    if (this.user_id !== undefined) {
      q['user_id'] = this.user_id
    }
    if (this.topic !== undefined) {
      q['topic'] = this.topic
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}
