import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class TaskService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // createTaskFollower 该接口用于创建任务关注人。可以一次性添加多位关注人。关注人ID要使用表示用户的ID。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/create
  async createTaskFollower(
    request: Task.CreateTaskFollowerReq
  ): Promise<{
    data: Task.CreateTaskFollowerResp
    response: Response
  }> {
    const req: RawRequestReq<CreateTaskFollowerReq> = {
      scope: 'Task',
      api: 'CreateTaskFollower',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/followers',
      body: new CreateTaskFollowerReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateTaskFollowerReq, Task.CreateTaskFollowerResp>(req)
  }
  // deleteTaskFollower 该接口用于删除任务关注人
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/delete
  async deleteTaskFollower(
    request: Task.DeleteTaskFollowerReq
  ): Promise<{
    data: Task.DeleteTaskFollowerResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteTaskFollowerReq> = {
      scope: 'Task',
      api: 'DeleteTaskFollower',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/followers/:follower_id',
      body: new DeleteTaskFollowerReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteTaskFollowerReq, Task.DeleteTaskFollowerResp>(req)
  }
  // batchDeleteTaskFollower 该接口用于批量删除关注人
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_follower
  async batchDeleteTaskFollower(
    request: Task.BatchDeleteTaskFollowerReq
  ): Promise<{
    data: Task.BatchDeleteTaskFollowerResp
    response: Response
  }> {
    const req: RawRequestReq<BatchDeleteTaskFollowerReq> = {
      scope: 'Task',
      api: 'BatchDeleteTaskFollower',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/batch_delete_follower',
      body: new BatchDeleteTaskFollowerReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchDeleteTaskFollowerReq, Task.BatchDeleteTaskFollowerResp>(req)
  }
  // getTaskFollowerList 该接口用于查询任务关注人列表, 支持分页, 最大值为50
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/list
  async getTaskFollowerList(
    request: Task.GetTaskFollowerListReq
  ): Promise<{
    data: Task.GetTaskFollowerListResp
    response: Response
  }> {
    const req: RawRequestReq<GetTaskFollowerListReq> = {
      scope: 'Task',
      api: 'GetTaskFollowerList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/followers',
      body: new GetTaskFollowerListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetTaskFollowerListReq, Task.GetTaskFollowerListResp>(req)
  }
  // createTaskCollaborator 该接口用于新增任务执行者, 一次性可以添加多个执行者。新增的执行者必须是表示是用户的ID。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/create
  async createTaskCollaborator(
    request: Task.CreateTaskCollaboratorReq
  ): Promise<{
    data: Task.CreateTaskCollaboratorResp
    response: Response
  }> {
    const req: RawRequestReq<CreateTaskCollaboratorReq> = {
      scope: 'Task',
      api: 'CreateTaskCollaborator',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/collaborators',
      body: new CreateTaskCollaboratorReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateTaskCollaboratorReq, Task.CreateTaskCollaboratorResp>(req)
  }
  // deleteTaskCollaborator 该接口用于删除任务执行者
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/delete
  async deleteTaskCollaborator(
    request: Task.DeleteTaskCollaboratorReq
  ): Promise<{
    data: Task.DeleteTaskCollaboratorResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteTaskCollaboratorReq> = {
      scope: 'Task',
      api: 'DeleteTaskCollaborator',
      method: 'DELETE',
      url:
        this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/collaborators/:collaborator_id',
      body: new DeleteTaskCollaboratorReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteTaskCollaboratorReq, Task.DeleteTaskCollaboratorResp>(req)
  }
  // batchDeleteTaskCollaborator 该接口用于批量删除执行者
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_collaborator
  async batchDeleteTaskCollaborator(
    request: Task.BatchDeleteTaskCollaboratorReq
  ): Promise<{
    data: Task.BatchDeleteTaskCollaboratorResp
    response: Response
  }> {
    const req: RawRequestReq<BatchDeleteTaskCollaboratorReq> = {
      scope: 'Task',
      api: 'BatchDeleteTaskCollaborator',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/batch_delete_collaborator',
      body: new BatchDeleteTaskCollaboratorReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      BatchDeleteTaskCollaboratorReq,
      Task.BatchDeleteTaskCollaboratorResp
    >(req)
  }
  // getTaskCollaboratorList 该接口用于查询任务执行者列表, 支持分页, 最大值为50
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/list
  async getTaskCollaboratorList(
    request: Task.GetTaskCollaboratorListReq
  ): Promise<{
    data: Task.GetTaskCollaboratorListResp
    response: Response
  }> {
    const req: RawRequestReq<GetTaskCollaboratorListReq> = {
      scope: 'Task',
      api: 'GetTaskCollaboratorList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/collaborators',
      body: new GetTaskCollaboratorListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetTaskCollaboratorListReq, Task.GetTaskCollaboratorListResp>(req)
  }
  // createTaskReminder 该接口用于创建任务的提醒时间。提醒时间在截止时间基础上做偏移, 但是偏移后的结果不能早于当前时间。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/create
  async createTaskReminder(
    request: Task.CreateTaskReminderReq
  ): Promise<{
    data: Task.CreateTaskReminderResp
    response: Response
  }> {
    const req: RawRequestReq<CreateTaskReminderReq> = {
      scope: 'Task',
      api: 'CreateTaskReminder',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/reminders',
      body: new CreateTaskReminderReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateTaskReminderReq, Task.CreateTaskReminderResp>(req)
  }
  // getTaskReminderList 返回提醒时间列表, 支持分页, 最大值为50
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/list
  async getTaskReminderList(
    request: Task.GetTaskReminderListReq
  ): Promise<{
    data: Task.GetTaskReminderListResp
    response: Response
  }> {
    const req: RawRequestReq<GetTaskReminderListReq> = {
      scope: 'Task',
      api: 'GetTaskReminderList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/reminders',
      body: new GetTaskReminderListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetTaskReminderListReq, Task.GetTaskReminderListResp>(req)
  }
  // deleteTaskReminder 删除提醒时间, 返回结果状态
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/delete
  async deleteTaskReminder(
    request: Task.DeleteTaskReminderReq
  ): Promise<{
    data: Task.DeleteTaskReminderResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteTaskReminderReq> = {
      scope: 'Task',
      api: 'DeleteTaskReminder',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/reminders/:reminder_id',
      body: new DeleteTaskReminderReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteTaskReminderReq, Task.DeleteTaskReminderResp>(req)
  }
  // createTask 该接口可以创建一个任务（基本信息）, 如果需要绑定协作者等需要调用别的资源管理接口。其中查询字段 user_id_type 是用于控制返回体中 creator_id 的类型, 不传时默认返回 open_id。当使用 tenant_access_token 调用接口时不支持 user_id_type 为 user_id。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/create
  async createTask(
    request: Task.CreateTaskReq
  ): Promise<{
    data: Task.CreateTaskResp
    response: Response
  }> {
    const req: RawRequestReq<CreateTaskReq> = {
      scope: 'Task',
      api: 'CreateTask',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks',
      body: new CreateTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateTaskReq, Task.CreateTaskResp>(req)
  }
  // getTask 该接口用于获取任务详情, 包括任务标题、描述、时间、来源等信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/get
  async getTask(
    request: Task.GetTaskReq
  ): Promise<{
    data: Task.GetTaskResp
    response: Response
  }> {
    const req: RawRequestReq<GetTaskReq> = {
      scope: 'Task',
      api: 'GetTask',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id',
      body: new GetTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetTaskReq, Task.GetTaskResp>(req)
  }
  // getTaskList 以分页的方式获取任务列表。当使用user_access_token时, 获取与该用户身份相关的所有任务。当使用tenant_access_token时, 获取该应用通过“创建任务“创建的任务列表。
  //
  // 本接口支持通过任务创建时间以及任务的完成状态对任务进行过滤。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/list
  async getTaskList(
    request: Task.GetTaskListReq
  ): Promise<{
    data: Task.GetTaskListResp
    response: Response
  }> {
    const req: RawRequestReq<GetTaskListReq> = {
      scope: 'Task',
      api: 'GetTaskList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks',
      body: new GetTaskListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetTaskListReq, Task.GetTaskListResp>(req)
  }
  // deleteTask 该接口用于删除任务
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/delete
  async deleteTask(
    request: Task.DeleteTaskReq
  ): Promise<{
    data: Task.DeleteTaskResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteTaskReq> = {
      scope: 'Task',
      api: 'DeleteTask',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id',
      body: new DeleteTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteTaskReq, Task.DeleteTaskResp>(req)
  }
  // updateTask 该接口用于修改任务的标题、描述、时间、来源等相关信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/patch
  async updateTask(
    request: Task.UpdateTaskReq
  ): Promise<{
    data: Task.UpdateTaskResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateTaskReq> = {
      scope: 'Task',
      api: 'UpdateTask',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id',
      body: new UpdateTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateTaskReq, Task.UpdateTaskResp>(req)
  }
  // completeTask 该接口用于将任务状态修改为”已完成“
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/complete
  async completeTask(
    request: Task.CompleteTaskReq
  ): Promise<{
    data: Task.CompleteTaskResp
    response: Response
  }> {
    const req: RawRequestReq<CompleteTaskReq> = {
      scope: 'Task',
      api: 'CompleteTask',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/complete',
      body: new CompleteTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CompleteTaskReq, Task.CompleteTaskResp>(req)
  }
  // uncompleteTask 该接口用于取消任务的已完成状态
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/uncomplete
  async uncompleteTask(
    request: Task.UncompleteTaskReq
  ): Promise<{
    data: Task.UncompleteTaskResp
    response: Response
  }> {
    const req: RawRequestReq<UncompleteTaskReq> = {
      scope: 'Task',
      api: 'UncompleteTask',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/uncomplete',
      body: new UncompleteTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UncompleteTaskReq, Task.UncompleteTaskResp>(req)
  }
  // createTaskComment 该接口用于创建和回复任务的评论。当parent_id字段为0时, 为创建评论；当parent_id不为0时, 为回复某条评论
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/create
  async createTaskComment(
    request: Task.CreateTaskCommentReq
  ): Promise<{
    data: Task.CreateTaskCommentResp
    response: Response
  }> {
    const req: RawRequestReq<CreateTaskCommentReq> = {
      scope: 'Task',
      api: 'CreateTaskComment',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/comments',
      body: new CreateTaskCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateTaskCommentReq, Task.CreateTaskCommentResp>(req)
  }
  // getTaskComment 该接口用于通过评论ID获取评论详情
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/get
  async getTaskComment(
    request: Task.GetTaskCommentReq
  ): Promise<{
    data: Task.GetTaskCommentResp
    response: Response
  }> {
    const req: RawRequestReq<GetTaskCommentReq> = {
      scope: 'Task',
      api: 'GetTaskComment',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/comments/:comment_id',
      body: new GetTaskCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetTaskCommentReq, Task.GetTaskCommentResp>(req)
  }
  // getTaskCommentList 该接口用于查询任务评论列表, 支持分页, 最大值为100
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/list
  async getTaskCommentList(
    request: Task.GetTaskCommentListReq
  ): Promise<{
    data: Task.GetTaskCommentListResp
    response: Response
  }> {
    const req: RawRequestReq<GetTaskCommentListReq> = {
      scope: 'Task',
      api: 'GetTaskCommentList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/comments',
      body: new GetTaskCommentListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetTaskCommentListReq, Task.GetTaskCommentListResp>(req)
  }
  // deleteTaskComment 该接口用于通过评论ID删除评论
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/delete
  async deleteTaskComment(
    request: Task.DeleteTaskCommentReq
  ): Promise<{
    data: Task.DeleteTaskCommentResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteTaskCommentReq> = {
      scope: 'Task',
      api: 'DeleteTaskComment',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/comments/:comment_id',
      body: new DeleteTaskCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteTaskCommentReq, Task.DeleteTaskCommentResp>(req)
  }
  // updateTaskComment 该接口用于更新评论内容
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/update
  async updateTaskComment(
    request: Task.UpdateTaskCommentReq
  ): Promise<{
    data: Task.UpdateTaskCommentResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateTaskCommentReq> = {
      scope: 'Task',
      api: 'UpdateTaskComment',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/task/v1/tasks/:task_id/comments/:comment_id',
      body: new UpdateTaskCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateTaskCommentReq, Task.UpdateTaskCommentResp>(req)
  }
}

export declare namespace Task {
  export interface CreateTaskFollowerReq {
    task_id: string // 任务 ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    id?: string // 任务关注人 ID, 示例值: "ou_99e1a581b36ecc4862cbfbce473f3123"
    id_list?: string[] // 要添加的关注人ID列表, 示例值: [, "ou_550cc75233d8b7b9fcbdad65f34433f4", "ou_d1e9d27cf3235b40ca9a67c67ef088b0", ]
  }

  export interface CreateTaskFollowerResp {
    follower: CreateTaskFollowerRespFollower // 创建后的任务关注者
  }

  export interface CreateTaskFollowerRespFollower {
    id: string // 任务关注人 ID
    id_list?: string[] // 要添加的关注人ID列表
  }

  export interface createTaskFollowerResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateTaskFollowerResp
  }

  export interface DeleteTaskFollowerReq {
    task_id: string // 任务 ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    follower_id: string // 任务关注人 ID（Open ID）, 示例值: "ou_87e1a581b36ecc4862cbfbce473f346a"
  }

  export interface DeleteTaskFollowerResp {}

  export interface deleteTaskFollowerResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteTaskFollowerResp
  }

  export interface BatchDeleteTaskFollowerReq {
    task_id: string // 任务ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    id_list?: string[] // 要添加的关注人ID列表, 示例值: [, "ou_550cc75233d8b7b9fcbdad65f34433f4", "ou_d1e9d27cf3235b40ca9a67c67ef088b0", ]
  }

  export interface BatchDeleteTaskFollowerResp {
    followers?: string[] // 实际删除的关注人用户ID列表
  }

  export interface batchDeleteTaskFollowerResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchDeleteTaskFollowerResp
  }

  export interface GetTaskFollowerListReq {
    task_id: string // 任务 ID, 示例值: "0d38e26e-190a-49e9-93a2-35067763ed1f"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "「上次返回的page_token」"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetTaskFollowerListResp {
    items?: GetTaskFollowerListRespItem[] // 返回的关注人ID列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetTaskFollowerListRespItem {
    id: string // 任务关注人 ID
  }

  export interface getTaskFollowerListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetTaskFollowerListResp
  }

  export interface CreateTaskCollaboratorReq {
    task_id: string // 任务 ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    id?: string // 任务执行者的 ID, 示例值: "ou_99e1a581b36ecc4862cbfbce473f1234"
    id_list?: string[] // 执行者的用户ID列表, 示例值: ["ou_550cc75233d8b7b9fcbdad65f34433f4", "ou_d1e9d27cf3235b40ca9a67c67ef088b0"]
  }

  export interface CreateTaskCollaboratorResp {
    collaborator: CreateTaskCollaboratorRespCollaborator // 返回创建成功后的任务执行者列表
  }

  export interface CreateTaskCollaboratorRespCollaborator {
    id: string // 任务执行者的 ID
    id_list?: string[] // 执行者的用户ID列表。
  }

  export interface createTaskCollaboratorResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateTaskCollaboratorResp
  }

  export interface DeleteTaskCollaboratorReq {
    task_id: string // 任务 ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    collaborator_id: string // 任务执行者 ID（Open ID）, 示例值: "ou_99e1a581b36ecc4862cbfbce123f346a"
  }

  export interface DeleteTaskCollaboratorResp {}

  export interface deleteTaskCollaboratorResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteTaskCollaboratorResp
  }

  export interface BatchDeleteTaskCollaboratorReq {
    task_id: string // 任务ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    id_list?: string[] // 执行者的用户ID列表, 示例值: ["ou_550cc75233d8b7b9fcbdad65f34433f4", "ou_d1e9d27cf3235b40ca9a67c67ef088b0"]
  }

  export interface BatchDeleteTaskCollaboratorResp {
    collaborators?: string[] // 实际删除的执行人用户ID列表
  }

  export interface batchDeleteTaskCollaboratorResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchDeleteTaskCollaboratorResp
  }

  export interface GetTaskCollaboratorListReq {
    task_id: string // 任务 ID, 示例值: "0d38e26e-190a-49e9-93a2-35067763ed1f"
    page_size?: number // 分页大小, 示例值: 50, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "「上次返回的page_token」"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetTaskCollaboratorListResp {
    items?: GetTaskCollaboratorListRespItem[] // 返回的执行者ID列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetTaskCollaboratorListRespItem {
    id: string // 任务执行者的 ID
  }

  export interface getTaskCollaboratorListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetTaskCollaboratorListResp
  }

  export interface CreateTaskReminderReq {
    task_id: string // 任务 ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    relative_fire_minute: number // 相对于截止时间的提醒时间（如提前 30 分钟, 截止时间后 30 分钟, 则为 -30） 任务没有截止时间则为全天任务(截止时间为0), 示例值: 30
  }

  export interface CreateTaskReminderResp {
    reminder: CreateTaskReminderRespReminder // 返回创建成功的提醒时间
  }

  export interface CreateTaskReminderRespReminder {
    id: string // 提醒时间设置的 ID（在删除时候需要使用这个）
    relative_fire_minute: number // 相对于截止时间的提醒时间（如提前 30 分钟, 截止时间后 30 分钟, 则为 -30） 任务没有截止时间则为全天任务(截止时间为0)
  }

  export interface createTaskReminderResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateTaskReminderResp
  }

  export interface GetTaskReminderListReq {
    task_id: string // 任务 ID, 示例值: "0d38e26e-190a-49e9-93a2-35067763ed1f"
    page_size?: number // 分页大小, 示例值: 50, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "「填写上次返回的page_token」"
  }

  export interface GetTaskReminderListResp {
    items?: GetTaskReminderListRespItem[] // 返回提醒时间设置列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetTaskReminderListRespItem {
    id: string // 提醒时间设置的 ID（在删除时候需要使用这个）
    relative_fire_minute: number // 相对于截止时间的提醒时间（如提前 30 分钟, 截止时间后 30 分钟, 则为 -30） 任务没有截止时间则为全天任务(截止时间为0)
  }

  export interface getTaskReminderListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetTaskReminderListResp
  }

  export interface DeleteTaskReminderReq {
    task_id: string // 任务 ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    reminder_id: string // 任务提醒时间设置的 ID（即 reminder.id）, 示例值: "1"
  }

  export interface DeleteTaskReminderResp {}

  export interface deleteTaskReminderResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteTaskReminderResp
  }

  export interface CreateTaskReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    summary: string // 任务标题。创建任务时, 如果没有标题填充, 飞书服务器会将其视为无主题的任务, 示例值: "每天喝八杯水, 保持身心愉悦", 长度范围: `1` ～ `256` 字符
    description?: string // 任务备注, 示例值: "多吃水果, 多运动, 健康生活, 快乐工作。", 长度范围: `0` ～ `65536` 字符
    extra?: string // 接入方可以自定义的附属信息二进制格式, 采用 base64 编码, 解析方式由接入方自己决定, 示例值: "dGVzdA[", 长度范围: `0` ～ `65536` 字符
    due?: CreateTaskReqDue // 任务的截止时间设置
    origin: CreateTaskReqOrigin // 任务关联的第三方平台来源信息
    can_edit?: boolean // 此字段用于控制该任务在飞书任务中心是否可编辑, 默认为false, 若为true则第三方需考虑是否需要接入事件来接收任务在任务中心的变更信息, （即将废弃）, 示例值: true, 默认值: `false`
    custom?: string // 此字段用于存储第三方需透传到端上的自定义数据, Json格式。取值举例中custom_complete字段存储「完成」按钮的跳转链接（href）或提示信息（tip）, pc、ios、android三端均可自定义, 其中tip字段的key为语言类型, value为提示信息, 可自行增加或减少语言类型, 支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn。href的优先级高于tip, href和tip同时不为空时只跳转不提示。链接和提示信息可自定义, 其余的key需按举例中的结构传递, 示例值: "{\"custom_complete\":{\"android\":{\"href\":\"https://www.google.com.hk/\", \"tip\":{\"zh_cn\":\"你好\", \"en_us\":\"hello\"}}, \"ios\":{\"href\":\"https://www.google.com.hk/\", \"tip\":{\"zh_cn\":\"你好\", \"en_us\":\"hello\"}}, \"pc\":{\"href\":\"https://www.google.com.hk/\", \"tip\":{\"zh_cn\":\"你好\", \"en_us\":\"hello\"}}}}", 长度范围: `0` ～ `65536` 字符
    collaborator_ids?: string[] // 创建任务时添加的执行者用户id列表, 示例值: ["ou_1400208f15333e20e11339d39067844b", "ou_84ed6312949945c8ae6168f10829e9e6"], 最大长度: `100`
    follower_ids?: string[] // 创建任务时添加的关注者用户id列表, 示例值: ["ou_1400208f15333e20e11339d39067844b", "ou_84ed6312949945c8ae6168f10829e9e6"], 最大长度: `100`
  }

  export interface CreateTaskReqDue {
    time?: string // 截止时间的时间戳（单位为秒）, 示例值: "1623124318"
    timezone?: string // 截止时间对应的时区, 使用IANA Time Zone Database标准, 如Asia/Shanghai, 示例值: "Asia/Shanghai", 默认值: `Asia/Shanghai`
    is_all_day?: boolean // 标记任务是否为全天任务（全天任务的截止时间为当天 UTC 时间的 0 点）, 示例值: false, 默认值: `false`
  }

  export interface CreateTaskReqOrigin {
    platform_i18n_name: string // 任务导入来源的名称, 用于在任务中心详情页展示。请提供一个字典, 多种语言名称映射。支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn, 示例值: "{\"zh_cn\": \"IT 工作台\", \"en_us\": \"IT Workspace\"}", 长度范围: `0` ～ `1024` 字符
    href?: CreateTaskReqOriginHref // 任务关联的来源平台详情页链接
  }

  export interface CreateTaskReqOriginHref {
    url?: string // 具体链接地址, 示例值: "https://support.feishu.com/internal/foo-bar", 长度范围: `0` ～ `1024` 字符
    title?: string // 链接对应的标题, 示例值: "反馈一个问题, 需要协助排查", 长度范围: `0` ～ `512` 字符
  }

  export interface CreateTaskResp {
    task: CreateTaskRespTask // 返回创建好的任务
  }

  export interface CreateTaskRespTask {
    id: string // 任务 ID, 由飞书任务服务器发号
    summary: string // 任务标题。创建任务时, 如果没有标题填充, 飞书服务器会将其视为无主题的任务
    description: string // 任务备注
    complete_time: string // 任务的完成时间戳（单位为秒）, 如果完成时间为 0, 则表示任务尚未完成
    creator_id: string // 任务的创建者 ID。在创建任务时无需填充该字段
    extra: string // 接入方可以自定义的附属信息二进制格式, 采用 base64 编码, 解析方式由接入方自己决定
    create_time: string // 任务的创建时间戳（单位为秒）
    update_time: string // 任务的更新时间戳（单位为秒）
    due: CreateTaskRespTaskDue // 任务的截止时间设置
    origin: CreateTaskRespTaskOrigin // 任务关联的第三方平台来源信息
    can_edit: boolean // 此字段用于控制该任务在飞书任务中心是否可编辑, 默认为false, 若为true则第三方需考虑是否需要接入事件来接收任务在任务中心的变更信息, （即将废弃）
    custom: string // 此字段用于存储第三方需透传到端上的自定义数据, Json格式。取值举例中custom_complete字段存储「完成」按钮的跳转链接（href）或提示信息（tip）, pc、ios、android三端均可自定义, 其中tip字段的key为语言类型, value为提示信息, 可自行增加或减少语言类型, 支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn。href的优先级高于tip, href和tip同时不为空时只跳转不提示。链接和提示信息可自定义, 其余的key需按举例中的结构传递
    source: number // 任务创建的来源, 可选值有: 0: 未知类型, 1: 来源任务中心创建, 2: 来源消息转任务, 3: 来源云文档, 4: 来源文档单品, 5: 来源PANO, 6: 来源tenant_access_token创建的任务, 7: 来源user_access_token创建的任务, 8: 来源新版云文档
    followers?: CreateTaskRespTaskFollower[] // 任务的关注者
    collaborators?: CreateTaskRespTaskCollaborator[] // 任务的执行者
    collaborator_ids?: string[] // 创建任务时添加的执行者用户id列表
    follower_ids?: string[] // 创建任务时添加的关注者用户id列表
  }

  export interface CreateTaskRespTaskCollaborator {
    id: string // 任务执行者的 ID
    id_list?: string[] // 执行者的用户ID列表。
  }

  export interface CreateTaskRespTaskDue {
    time: string // 截止时间的时间戳（单位为秒）
    timezone: string // 截止时间对应的时区, 使用IANA Time Zone Database标准, 如Asia/Shanghai
    is_all_day: boolean // 标记任务是否为全天任务（全天任务的截止时间为当天 UTC 时间的 0 点）
  }

  export interface CreateTaskRespTaskFollower {
    id: string // 任务关注人 ID
    id_list?: string[] // 要添加的关注人ID列表
  }

  export interface CreateTaskRespTaskOrigin {
    platform_i18n_name: string // 任务导入来源的名称, 用于在任务中心详情页展示。请提供一个字典, 多种语言名称映射。支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn
    href: CreateTaskRespTaskOriginHref // 任务关联的来源平台详情页链接
  }

  export interface CreateTaskRespTaskOriginHref {
    url: string // 具体链接地址
    title: string // 链接对应的标题
  }

  export interface createTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateTaskResp
  }

  export interface GetTaskReq {
    task_id: string // 任务 ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetTaskResp {
    task: GetTaskRespTask // 返回任务资源详情
  }

  export interface GetTaskRespTask {
    id: string // 任务 ID, 由飞书任务服务器发号
    summary: string // 任务标题。创建任务时, 如果没有标题填充, 飞书服务器会将其视为无主题的任务
    description: string // 任务备注
    complete_time: string // 任务的完成时间戳（单位为秒）, 如果完成时间为 0, 则表示任务尚未完成
    creator_id: string // 任务的创建者 ID。在创建任务时无需填充该字段
    extra: string // 接入方可以自定义的附属信息二进制格式, 采用 base64 编码, 解析方式由接入方自己决定
    create_time: string // 任务的创建时间戳（单位为秒）
    update_time: string // 任务的更新时间戳（单位为秒）
    due: GetTaskRespTaskDue // 任务的截止时间设置
    origin: GetTaskRespTaskOrigin // 任务关联的第三方平台来源信息
    can_edit: boolean // 此字段用于控制该任务在飞书任务中心是否可编辑, 默认为false, 若为true则第三方需考虑是否需要接入事件来接收任务在任务中心的变更信息, （即将废弃）
    custom: string // 此字段用于存储第三方需透传到端上的自定义数据, Json格式。取值举例中custom_complete字段存储「完成」按钮的跳转链接（href）或提示信息（tip）, pc、ios、android三端均可自定义, 其中tip字段的key为语言类型, value为提示信息, 可自行增加或减少语言类型, 支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn。href的优先级高于tip, href和tip同时不为空时只跳转不提示。链接和提示信息可自定义, 其余的key需按举例中的结构传递
    source: number // 任务创建的来源, 可选值有: `0`: 未知类型, `1`: 来源任务中心创建, `2`: 来源消息转任务, `3`: 来源云文档, `4`: 来源文档单品, `5`: 来源PANO, `6`: 来源tenant_access_token创建的任务, `7`: 来源user_access_token创建的任务, `8`: 来源新版云文档
    followers?: GetTaskRespTaskFollower[] // 任务的关注者
    collaborators?: GetTaskRespTaskCollaborator[] // 任务的执行者
  }

  export interface GetTaskRespTaskCollaborator {
    id: string // 任务执行者的 ID
  }

  export interface GetTaskRespTaskDue {
    time: string // 截止时间的时间戳（单位为秒）
    timezone: string // 截止时间对应的时区, 使用IANA Time Zone Database标准, 如Asia/Shanghai
    is_all_day: boolean // 标记任务是否为全天任务（全天任务的截止时间为当天 UTC 时间的 0 点）
  }

  export interface GetTaskRespTaskFollower {
    id: string // 任务关注人 ID
  }

  export interface GetTaskRespTaskOrigin {
    platform_i18n_name: string // 任务导入来源的名称, 用于在任务中心详情页展示。请提供一个字典, 多种语言名称映射。支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn
    href: GetTaskRespTaskOriginHref // 任务关联的来源平台详情页链接
  }

  export interface GetTaskRespTaskOriginHref {
    url: string // 具体链接地址
    title: string // 链接对应的标题
  }

  export interface getTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetTaskResp
  }

  export interface GetTaskListReq {
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "MTYzMTg3ODUxNQ["
    start_create_time?: string // 范围查询任务时, 查询的起始时间。不填时默认起始时间为第一个任务的创建时间, 示例值: "1652323331"
    end_create_time?: string // 范围查询任务时, 查询的结束时间。不填时默认结束时间为最后一个任务的创建时间, 示例值: "1652323335"
    task_completed?: boolean // 可用于查询时过滤任务完成状态。true表示只返回已完成的任务, false表示只返回未完成的任务。不填时表示同时返回两种完成状态的任务, 示例值: false
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetTaskListResp {
    items?: GetTaskListRespItem[] // 任务列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetTaskListRespItem {
    id: string // 任务 ID, 由飞书任务服务器发号
    summary: string // 任务标题。创建任务时, 如果没有标题填充, 飞书服务器会将其视为无主题的任务
    description: string // 任务备注
    complete_time: string // 任务的完成时间戳（单位为秒）, 如果完成时间为 0, 则表示任务尚未完成
    creator_id: string // 任务的创建者 ID。在创建任务时无需填充该字段
    extra: string // 接入方可以自定义的附属信息二进制格式, 采用 base64 编码, 解析方式由接入方自己决定
    create_time: string // 任务的创建时间戳（单位为秒）
    update_time: string // 任务的更新时间戳（单位为秒）
    due: GetTaskListRespItemDue // 任务的截止时间设置
    origin: GetTaskListRespItemOrigin // 任务关联的第三方平台来源信息
    can_edit: boolean // 此字段用于控制该任务在飞书任务中心是否可编辑, 默认为false, 若为true则第三方需考虑是否需要接入事件来接收任务在任务中心的变更信息, （即将废弃）
    custom: string // 此字段用于存储第三方需透传到端上的自定义数据, Json格式。取值举例中custom_complete字段存储「完成」按钮的跳转链接（href）或提示信息（tip）, pc、ios、android三端均可自定义, 其中tip字段的key为语言类型, value为提示信息, 可自行增加或减少语言类型, 支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn。href的优先级高于tip, href和tip同时不为空时只跳转不提示。链接和提示信息可自定义, 其余的key需按举例中的结构传递
    source: number // 任务创建的来源, 可选值有: `0`: 未知类型, `1`: 来源任务中心创建, `2`: 来源消息转任务, `3`: 来源云文档, `4`: 来源文档单品, `5`: 来源PANO, `6`: 来源tenant_access_token创建的任务, `7`: 来源user_access_token创建的任务, `8`: 来源新版云文档
    followers?: GetTaskListRespItemFollower[] // 任务的关注者
    collaborators?: GetTaskListRespItemCollaborator[] // 任务的执行者
  }

  export interface GetTaskListRespItemCollaborator {
    id: string // 任务执行者的 ID
  }

  export interface GetTaskListRespItemDue {
    time: string // 截止时间的时间戳（单位为秒）
    timezone: string // 截止时间对应的时区, 使用IANA Time Zone Database标准, 如Asia/Shanghai
    is_all_day: boolean // 标记任务是否为全天任务（全天任务的截止时间为当天 UTC 时间的 0 点）
  }

  export interface GetTaskListRespItemFollower {
    id: string // 任务关注人 ID
  }

  export interface GetTaskListRespItemOrigin {
    platform_i18n_name: string // 任务导入来源的名称, 用于在任务中心详情页展示。请提供一个字典, 多种语言名称映射。支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn
    href: GetTaskListRespItemOriginHref // 任务关联的来源平台详情页链接
  }

  export interface GetTaskListRespItemOriginHref {
    url: string // 具体链接地址
    title: string // 链接对应的标题
  }

  export interface getTaskListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetTaskListResp
  }

  export interface DeleteTaskReq {
    task_id: string // 任务 ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
  }

  export interface DeleteTaskResp {}

  export interface deleteTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteTaskResp
  }

  export interface UpdateTaskReq {
    task_id: string // 任务 ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    task: UpdateTaskReqTask // 被更新的任务实体基础信息
    update_fields?: string[] // 指定需要更新的字段（目前可选更新的字段为: summary, description, due, extra）, 否则服务端将不知道更新哪些字段, 示例值: ["summary"]
  }

  export interface UpdateTaskReqTask {
    summary?: string // 任务标题。创建任务时, 如果没有标题填充, 飞书服务器会将其视为无主题的任务, 示例值: "每天喝八杯水, 保持身心愉悦", 长度范围: `1` ～ `256` 字符
    description?: string // 任务备注, 示例值: "多吃水果, 多运动, 健康生活, 快乐工作。", 长度范围: `0` ～ `65536` 字符
    extra?: string // 接入方可以自定义的附属信息二进制格式, 采用 base64 编码, 解析方式由接入方自己决定, 示例值: "dGVzdA[", 长度范围: `0` ～ `65536` 字符
    due?: UpdateTaskReqTaskDue // 任务的截止时间设置
    origin?: UpdateTaskReqTaskOrigin // 任务关联的第三方平台来源信息
    can_edit?: boolean // 此字段用于控制该任务在飞书任务中心是否可编辑, 默认为false, 若为true则第三方需考虑是否需要接入事件来接收任务在任务中心的变更信息, （即将废弃）, 示例值: true, 默认值: `false`
    custom?: string // 此字段用于存储第三方需透传到端上的自定义数据, Json格式。取值举例中custom_complete字段存储「完成」按钮的跳转链接（href）或提示信息（tip）, pc、ios、android三端均可自定义, 其中tip字段的key为语言类型, value为提示信息, 可自行增加或减少语言类型, 支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn。href的优先级高于tip, href和tip同时不为空时只跳转不提示。链接和提示信息可自定义, 其余的key需按举例中的结构传递, 示例值: "{\"custom_complete\":{\"android\":{\"href\":\"https://www.google.com.hk/\", \"tip\":{\"zh_cn\":\"你好\", \"en_us\":\"hello\"}}, \"ios\":{\"href\":\"https://www.google.com.hk/\", \"tip\":{\"zh_cn\":\"你好\", \"en_us\":\"hello\"}}, \"pc\":{\"href\":\"https://www.google.com.hk/\", \"tip\":{\"zh_cn\":\"你好\", \"en_us\":\"hello\"}}}}", 长度范围: `0` ～ `65536` 字符
  }

  export interface UpdateTaskReqTaskDue {
    time?: string // 截止时间的时间戳（单位为秒）, 示例值: "1623124318"
    timezone?: string // 截止时间对应的时区, 使用IANA Time Zone Database标准, 如Asia/Shanghai, 示例值: "Asia/Shanghai", 默认值: `Asia/Shanghai`
    is_all_day?: boolean // 标记任务是否为全天任务（全天任务的截止时间为当天 UTC 时间的 0 点）, 示例值: false, 默认值: `false`
  }

  export interface UpdateTaskReqTaskOrigin {
    platform_i18n_name: string // 任务导入来源的名称, 用于在任务中心详情页展示。请提供一个字典, 多种语言名称映射。支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn, 示例值: "{\"zh_cn\": \"IT 工作台\", \"en_us\": \"IT Workspace\"}", 长度范围: `0` ～ `1024` 字符
    href?: UpdateTaskReqTaskOriginHref // 任务关联的来源平台详情页链接
  }

  export interface UpdateTaskReqTaskOriginHref {
    url?: string // 具体链接地址, 示例值: "https://support.feishu.com/internal/foo-bar", 长度范围: `0` ～ `1024` 字符
    title?: string // 链接对应的标题, 示例值: "反馈一个问题, 需要协助排查", 长度范围: `0` ～ `512` 字符
  }

  export interface UpdateTaskResp {
    task: UpdateTaskRespTask // 返回修改后的任务详情
  }

  export interface UpdateTaskRespTask {
    id: string // 任务 ID, 由飞书任务服务器发号
    summary: string // 任务标题。创建任务时, 如果没有标题填充, 飞书服务器会将其视为无主题的任务
    description: string // 任务备注
    complete_time: string // 任务的完成时间戳（单位为秒）, 如果完成时间为 0, 则表示任务尚未完成
    creator_id: string // 任务的创建者 ID。在创建任务时无需填充该字段
    extra: string // 接入方可以自定义的附属信息二进制格式, 采用 base64 编码, 解析方式由接入方自己决定
    create_time: string // 任务的创建时间戳（单位为秒）
    update_time: string // 任务的更新时间戳（单位为秒）
    due: UpdateTaskRespTaskDue // 任务的截止时间设置
    origin: UpdateTaskRespTaskOrigin // 任务关联的第三方平台来源信息
    can_edit: boolean // 此字段用于控制该任务在飞书任务中心是否可编辑, 默认为false, 若为true则第三方需考虑是否需要接入事件来接收任务在任务中心的变更信息, （即将废弃）
    custom: string // 此字段用于存储第三方需透传到端上的自定义数据, Json格式。取值举例中custom_complete字段存储「完成」按钮的跳转链接（href）或提示信息（tip）, pc、ios、android三端均可自定义, 其中tip字段的key为语言类型, value为提示信息, 可自行增加或减少语言类型, 支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn。href的优先级高于tip, href和tip同时不为空时只跳转不提示。链接和提示信息可自定义, 其余的key需按举例中的结构传递
    source: number // 任务创建的来源, 可选值有: `0`: 未知类型, `1`: 来源任务中心创建, `2`: 来源消息转任务, `3`: 来源云文档, `4`: 来源文档单品, `5`: 来源PANO, `6`: 来源tenant_access_token创建的任务, `7`: 来源user_access_token创建的任务, `8`: 来源新版云文档
  }

  export interface UpdateTaskRespTaskDue {
    time: string // 截止时间的时间戳（单位为秒）
    timezone: string // 截止时间对应的时区, 使用IANA Time Zone Database标准, 如Asia/Shanghai
    is_all_day: boolean // 标记任务是否为全天任务（全天任务的截止时间为当天 UTC 时间的 0 点）
  }

  export interface UpdateTaskRespTaskOrigin {
    platform_i18n_name: string // 任务导入来源的名称, 用于在任务中心详情页展示。请提供一个字典, 多种语言名称映射。支持的各地区语言名: it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn
    href: UpdateTaskRespTaskOriginHref // 任务关联的来源平台详情页链接
  }

  export interface UpdateTaskRespTaskOriginHref {
    url: string // 具体链接地址
    title: string // 链接对应的标题
  }

  export interface updateTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateTaskResp
  }

  export interface CompleteTaskReq {
    task_id: string // 任务 ID, 示例值: "bb54ab99-d360-434f-bcaa-a4cc4c05840e"
  }

  export interface CompleteTaskResp {}

  export interface completeTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CompleteTaskResp
  }

  export interface UncompleteTaskReq {
    task_id: string // 任务 ID, 示例值: "bb54ab99-d360-434f-bcaa-a4cc4c05840e"
  }

  export interface UncompleteTaskResp {}

  export interface uncompleteTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UncompleteTaskResp
  }

  export interface CreateTaskCommentReq {
    task_id: string // 任务 ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    content?: string // 评论内容, 示例值: "举杯邀明月, 对影成三人", 长度范围: `0` ～ `65536` 字符
    parent_id?: string // 评论的父ID, 创建评论时若不为空则为某条评论的回复, 若为空则不是回复, 示例值: "6937231762296684564"
    id?: string // 评论ID, 由飞书服务器发号, 示例值: "6937231762296684564"
  }

  export interface CreateTaskCommentResp {
    comment: CreateTaskCommentRespComment // 返回创建好的任务评论
  }

  export interface CreateTaskCommentRespComment {
    content: string // 评论内容
    parent_id: string // 评论的父ID, 创建评论时若不为空则为某条评论的回复, 若为空则不是回复
    id: string // 评论ID, 由飞书服务器发号
  }

  export interface createTaskCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateTaskCommentResp
  }

  export interface GetTaskCommentReq {
    task_id: string // 任务ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    comment_id: string // 评论ID, 示例值: "6937231762296684564"
  }

  export interface GetTaskCommentResp {
    comment: GetTaskCommentRespComment // 返回新的任务评论详情
  }

  export interface GetTaskCommentRespComment {
    content: string // 评论内容
    parent_id: string // 评论的父ID, 创建评论时若不为空则为某条评论的回复, 若为空则不是回复
    id: string // 评论ID, 由飞书服务器发号
    create_milli_time: string // 评论创建的时间戳, 单位为毫秒, 用于展示, 创建时不用填写
  }

  export interface getTaskCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetTaskCommentResp
  }

  export interface GetTaskCommentListReq {
    task_id: string // 任务id, 示例值: ""83912691-2e43-47fc-94a4-d512e03984fa""
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: ""MTYzMTg3ODUxNQ==""
    list_direction?: number // 评论排序标记, 可按照评论时间从小到大查询, 或者评论时间从大到小查询, 不填默认按照从小到大, 示例值: 0, 可选值有: 0: 按照回复时间从小到大查询, 1: 按照回复时间从大到小查询, 默认值: `0`
  }

  export interface GetTaskCommentListResp {
    items?: GetTaskCommentListRespItem[] // 返回的评论列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetTaskCommentListRespItem {
    content: string // 评论内容
    parent_id: string // 评论的父ID, 创建评论时若不为空则为某条评论的回复, 若为空则不是回复
    id: string // 评论ID, 由飞书服务器发号
    create_milli_time: string // 评论创建的时间戳, 单位为毫秒, 用于展示, 创建时不用填写
  }

  export interface getTaskCommentListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetTaskCommentListResp
  }

  export interface DeleteTaskCommentReq {
    task_id: string // 任务ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    comment_id: string // 评论ID, 示例值: "6937231762296684564"
  }

  export interface DeleteTaskCommentResp {}

  export interface deleteTaskCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteTaskCommentResp
  }

  export interface UpdateTaskCommentReq {
    task_id: string // 任务ID, 示例值: "83912691-2e43-47fc-94a4-d512e03984fa"
    comment_id: string // 评论 ID, 示例值: "6937231762296684564"
    content: string // 新的评论内容, 示例值: "飞流直下三千尺, 疑是银河落九天"
  }

  export interface UpdateTaskCommentResp {
    comment: UpdateTaskCommentRespComment // 返回修改后的任务评论详情
  }

  export interface UpdateTaskCommentRespComment {
    content: string // 评论内容
    parent_id: string // 评论的父ID, 创建评论时若不为空则为某条评论的回复, 若为空则不是回复
    id: string // 评论ID, 由飞书服务器发号
  }

  export interface updateTaskCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateTaskCommentResp
  }
}

class CreateTaskFollowerReq {
  task_id?: any
  user_id_type?: any
  id?: any
  id_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      id: this.id,
      id_list: this.id_list
    }
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteTaskFollowerReq {
  task_id?: any
  follower_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)
    path = path.replace(':follower_id', this.follower_id)

    return path
  }
}

class BatchDeleteTaskFollowerReq {
  task_id?: any
  user_id_type?: any
  id_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      id_list: this.id_list
    }
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetTaskFollowerListReq {
  task_id?: any
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
    path = path.replace(':task_id', this.task_id)

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

class CreateTaskCollaboratorReq {
  task_id?: any
  user_id_type?: any
  id?: any
  id_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      id: this.id,
      id_list: this.id_list
    }
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteTaskCollaboratorReq {
  task_id?: any
  collaborator_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)
    path = path.replace(':collaborator_id', this.collaborator_id)

    return path
  }
}

class BatchDeleteTaskCollaboratorReq {
  task_id?: any
  user_id_type?: any
  id_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      id_list: this.id_list
    }
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetTaskCollaboratorListReq {
  task_id?: any
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
    path = path.replace(':task_id', this.task_id)

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

class CreateTaskReminderReq {
  task_id?: any
  relative_fire_minute?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      relative_fire_minute: this.relative_fire_minute
    }
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    return path
  }
}

class GetTaskReminderListReq {
  task_id?: any
  page_size?: any
  page_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

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

class DeleteTaskReminderReq {
  task_id?: any
  reminder_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)
    path = path.replace(':reminder_id', this.reminder_id)

    return path
  }
}

class CreateTaskReq {
  user_id_type?: any
  summary?: any
  description?: any
  extra?: any
  due?: any
  origin?: any
  can_edit?: any
  custom?: any
  collaborator_ids?: any
  follower_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      summary: this.summary,
      description: this.description,
      extra: this.extra,
      due: this.due,
      origin: this.origin,
      can_edit: this.can_edit,
      custom: this.custom,
      collaborator_ids: this.collaborator_ids,
      follower_ids: this.follower_ids
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

class GetTaskReq {
  task_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetTaskListReq {
  page_size?: any
  page_token?: any
  start_create_time?: any
  end_create_time?: any
  task_completed?: any
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
    if (this.start_create_time !== undefined) {
      q['start_create_time'] = this.start_create_time
    }
    if (this.end_create_time !== undefined) {
      q['end_create_time'] = this.end_create_time
    }
    if (this.task_completed !== undefined) {
      q['task_completed'] = this.task_completed
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteTaskReq {
  task_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    return path
  }
}

class UpdateTaskReq {
  task_id?: any
  user_id_type?: any
  task?: any
  update_fields?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      task: this.task,
      update_fields: this.update_fields
    }
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CompleteTaskReq {
  task_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    return path
  }
}

class UncompleteTaskReq {
  task_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    return path
  }
}

class CreateTaskCommentReq {
  task_id?: any
  content?: any
  parent_id?: any
  id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      content: this.content,
      parent_id: this.parent_id,
      id: this.id
    }
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    return path
  }
}

class GetTaskCommentReq {
  task_id?: any
  comment_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)
    path = path.replace(':comment_id', this.comment_id)

    return path
  }
}

class GetTaskCommentListReq {
  task_id?: any
  page_size?: any
  page_token?: any
  list_direction?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    const q = {} as { [key: string]: any }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.list_direction !== undefined) {
      q['list_direction'] = this.list_direction
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteTaskCommentReq {
  task_id?: any
  comment_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)
    path = path.replace(':comment_id', this.comment_id)

    return path
  }
}

class UpdateTaskCommentReq {
  task_id?: any
  comment_id?: any
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
    path = path.replace(':task_id', this.task_id)
    path = path.replace(':comment_id', this.comment_id)

    return path
  }
}
