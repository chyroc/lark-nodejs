import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class ChatService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // createChat 创建群并设置群头像、群名、群描述等。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 本接口只支持创建群, 如果需要拉用户或者机器人入群参考 [将用户或机器人拉入群聊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/create)接口
  // - 每次请求, 最多拉 50 个用户或者 5 个机器人, 并且群组最多容纳 15 个机器人
  // - 拉机器人入群请使用 [app_id]
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/create
  async createChat(
    request: Chat.CreateChatReq
  ): Promise<{
    data: Chat.CreateChatResp
    response: Response
  }> {
    const req: RawRequestReq<CreateChatReq> = {
      scope: 'Chat',
      api: 'CreateChat',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats',
      body: new CreateChatReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateChatReq, Chat.CreateChatResp>(req)
  }
  // getChat 获取群名称、群描述、群头像、群主 ID 等群基本信息。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 机器人或授权用户必须在群里（否则只会返回群名称、群头像等基本信息）
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get
  async getChat(
    request: Chat.GetChatReq
  ): Promise<{
    data: Chat.GetChatResp
    response: Response
  }> {
    const req: RawRequestReq<GetChatReq> = {
      scope: 'Chat',
      api: 'GetChat',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id',
      body: new GetChatReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetChatReq, Chat.GetChatResp>(req)
  }
  // getChatOld 为了更好地提升该接口的安全性, 我们对其进行了升级, 请尽快迁移至[新版本>>](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get)
  //
  // 获取群名称、群主 ID、成员列表 ID 等群基本信息。
  // - 需要启用机器人能力；机器人必须在群里
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMTO5QjLzkTO04yM5kDN
  async getChatOld(
    request: Chat.GetChatOldReq
  ): Promise<{
    data: Chat.GetChatOldResp
    response: Response
  }> {
    const req: RawRequestReq<GetChatOldReq> = {
      scope: 'Chat',
      api: 'GetChatOld',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/chat/v4/info',
      body: new GetChatOldReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetChatOldReq, Chat.GetChatOldResp>(req)
  }
  // updateChat 更新群头像、群名称、群描述、群配置、转让群主等。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 若群未开启 [仅群主和群管理员可编辑群信息] 配置:
  // --群主/群管理员 或 创建群组且具备[更新应用所创建群的群信息]权限的机器人, 可更新所有信息
  // --不满足上述条件的群成员或机器人, 仅可更新群头像、群名称、群描述、群国际化名称信息
  // - 若群开启了[仅群主和群管理员可编辑群信息]配置:
  // --群主/群管理员 或 创建群组且具备[更新应用所创建群的群信息]权限的机器人, 可更新所有信息
  // --不满足上述条件的群成员或者机器人, 任何群信息都不能修改
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/update
  async updateChat(
    request: Chat.UpdateChatReq
  ): Promise<{
    data: Chat.UpdateChatResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateChatReq> = {
      scope: 'Chat',
      api: 'UpdateChat',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id',
      body: new UpdateChatReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateChatReq, Chat.UpdateChatResp>(req)
  }
  // deleteChat 解散群组
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 如果使用tenant_access_token, 需要机器人是群的创建者且具备[更新应用所创建群的群信息]权限才可解散群
  // - 如果使用user_access_token, 需要对应的用户是群主才可解散群
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/delete
  async deleteChat(
    request: Chat.DeleteChatReq
  ): Promise<{
    data: Chat.DeleteChatResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteChatReq> = {
      scope: 'Chat',
      api: 'DeleteChat',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id',
      body: new DeleteChatReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteChatReq, Chat.DeleteChatResp>(req)
  }
  // getChatListOfSelf 获取用户或者机器人所在群列表。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 查询参数  user_id_type 用于控制响应体中 owner_id 的类型, 如果是获取机器人所在群列表该值可以不填
  // - 请注意区分本接口和[获取群信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get)的请求 URL
  // - 获取的群列表不包含p2p单聊群
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/list
  async getChatListOfSelf(
    request: Chat.GetChatListOfSelfReq
  ): Promise<{
    data: Chat.GetChatListOfSelfResp
    response: Response
  }> {
    const req: RawRequestReq<GetChatListOfSelfReq> = {
      scope: 'Chat',
      api: 'GetChatListOfSelf',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats',
      body: new GetChatListOfSelfReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetChatListOfSelfReq, Chat.GetChatListOfSelfResp>(req)
  }
  // searchChat 搜索对用户或机器人可见的群列表, 包括: 用户或机器人所在的群、对用户或机器人公开的群。
  //
  // 搜索可获得的群信息包括: 群ID（chat_id）、群名称、群描述等。
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/search
  async searchChat(
    request: Chat.SearchChatReq
  ): Promise<{
    data: Chat.SearchChatResp
    response: Response
  }> {
    const req: RawRequestReq<SearchChatReq> = {
      scope: 'Chat',
      api: 'SearchChat',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/search',
      body: new SearchChatReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SearchChatReq, Chat.SearchChatResp>(req)
  }
  // getChatMemberList 如果用户在群中, 则返回该群的成员列表。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 该接口不会返回群内的机器人成员
  // - 由于返回的群成员列表会过滤掉机器人成员, 因此返回的群成员个数可能会小于指定的page_size
  // - 如果有同一时间加入群的群成员, 会一次性返回, 这会导致返回的群成员个数可能会大于指定的page_size
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/get
  async getChatMemberList(
    request: Chat.GetChatMemberListReq
  ): Promise<{
    data: Chat.GetChatMemberListResp
    response: Response
  }> {
    const req: RawRequestReq<GetChatMemberListReq> = {
      scope: 'Chat',
      api: 'GetChatMemberList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/members',
      body: new GetChatMemberListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetChatMemberListReq, Chat.GetChatMemberListResp>(req)
  }
  // isInChat 根据使用的access_token判断对应的用户或者机器人是否在群里。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/is_in_chat
  async isInChat(
    request: Chat.IsInChatReq
  ): Promise<{
    data: Chat.IsInChatResp
    response: Response
  }> {
    const req: RawRequestReq<IsInChatReq> = {
      scope: 'Chat',
      api: 'IsInChat',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/members/is_in_chat',
      body: new IsInChatReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<IsInChatReq, Chat.IsInChatResp>(req)
  }
  // createChatManager 将用户或机器人指定为群管理员。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 仅有群主可以指定群管理员
  // - 对于普通群, 最多指定 10 个管理员
  // - 对于超大群, 最多指定 20 个管理员
  // - 每次请求最多指定 50 个用户或者 5 个机器人
  // - 指定机器人类型的管理员请使用 [app_id]
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/add_managers
  async createChatManager(
    request: Chat.CreateChatManagerReq
  ): Promise<{
    data: Chat.CreateChatManagerResp
    response: Response
  }> {
    const req: RawRequestReq<CreateChatManagerReq> = {
      scope: 'Chat',
      api: 'CreateChatManager',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/managers/add_managers',
      body: new CreateChatManagerReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateChatManagerReq, Chat.CreateChatManagerResp>(req)
  }
  // deleteChatManager 删除指定的群管理员（用户或机器人）
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 仅有群主可以删除群管理员
  // - 每次请求最多指定 50 个用户或者 5 个机器人
  // - 删除机器人类型的管理员请使用 [app_id]
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/delete_managers
  async deleteChatManager(
    request: Chat.DeleteChatManagerReq
  ): Promise<{
    data: Chat.DeleteChatManagerResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteChatManagerReq> = {
      scope: 'Chat',
      api: 'DeleteChatManager',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/managers/delete_managers',
      body: new DeleteChatManagerReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteChatManagerReq, Chat.DeleteChatManagerResp>(req)
  }
  // addChatMember 将用户或机器人拉入群聊。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 如需拉用户进群, 需要机器人对用户有可见性
  // - 在开启 [仅群主和群管理员可添加群成员] 的设置时, 仅有群主/管理员 或 创建群组且具备 [更新应用所创建群的群信息] 权限的机器人, 可以拉用户或者机器人进群
  // - 在未开启 [仅群主和群管理员可添加群成员] 的设置时, 所有群成员都可以拉用户或机器人进群
  // - 每次请求, 最多拉50个用户或者5个机器人, 并且群组最多容纳15个机器人
  // - 拉机器人入群请使用 [app_id]
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/create
  async addChatMember(
    request: Chat.AddChatMemberReq
  ): Promise<{
    data: Chat.AddChatMemberResp
    response: Response
  }> {
    const req: RawRequestReq<AddChatMemberReq> = {
      scope: 'Chat',
      api: 'AddChatMember',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/members',
      body: new AddChatMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<AddChatMemberReq, Chat.AddChatMemberResp>(req)
  }
  // deleteChatMember 将用户或机器人移出群聊。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 用户或机器人在任何条件下均可移除自己出群（即主动退群）
  // - 仅有群主/管理员 或 创建群组并且具备 [更新应用所创建群的群信息] 权限的机器人, 可以移除其他用户或者机器人
  // - 每次请求, 最多移除50个用户或者5个机器人
  // - 移除机器人请使用 [app_id]
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/delete
  async deleteChatMember(
    request: Chat.DeleteChatMemberReq
  ): Promise<{
    data: Chat.DeleteChatMemberResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteChatMemberReq> = {
      scope: 'Chat',
      api: 'DeleteChatMember',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/members',
      body: new DeleteChatMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteChatMemberReq, Chat.DeleteChatMemberResp>(req)
  }
  // joinChat 用户或机器人主动加入群聊。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 目前仅支持加入公开群
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/me_join
  async joinChat(
    request: Chat.JoinChatReq
  ): Promise<{
    data: Chat.JoinChatResp
    response: Response
  }> {
    const req: RawRequestReq<JoinChatReq> = {
      scope: 'Chat',
      api: 'JoinChat',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/members/me_join',
      body: new JoinChatReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<JoinChatReq, Chat.JoinChatResp>(req)
  }
  // getChatModeration 获取群发言模式、可发言用户名单等
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/uQjL04CN/uYTMuYTMuYTM)
  // - 机器人 或 授权用户 必须在群里
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/get
  async getChatModeration(
    request: Chat.GetChatModerationReq
  ): Promise<{
    data: Chat.GetChatModerationResp
    response: Response
  }> {
    const req: RawRequestReq<GetChatModerationReq> = {
      scope: 'Chat',
      api: 'GetChatModeration',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/moderation',
      body: new GetChatModerationReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetChatModerationReq, Chat.GetChatModerationResp>(req)
  }
  // updateChatModeration 更新群组的发言权限设置, 可设置为全员可发言、仅管理员可发言  或 指定用户可发言。
  //
  // 注意事项:
  // - 需要开启[机器人能力](https://open.feishu.cn/document/uQjL04CN/uYTMuYTMuYTM)
  // - 若以用户授权调用接口, 当授权用户是群主时, 可更新群发言权限
  // - 若以租户授权调用接口(即以机器人身份调用接口), 当机器人是群主 或者 机器人是创建群组、具备[更新应用所创建群的群信息]权限且仍在群内时, 可更新群发言权限
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/update
  async updateChatModeration(
    request: Chat.UpdateChatModerationReq
  ): Promise<{
    data: Chat.UpdateChatModerationResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateChatModerationReq> = {
      scope: 'Chat',
      api: 'UpdateChatModeration',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/moderation',
      body: new UpdateChatModerationReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateChatModerationReq, Chat.UpdateChatModerationResp>(req)
  }
  // updateChatTopNotice 更新会话中的群置顶信息, 可以将群中的某一条消息, 或者群公告置顶显示。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/put_top_notice
  async updateChatTopNotice(
    request: Chat.UpdateChatTopNoticeReq
  ): Promise<{
    data: Chat.UpdateChatTopNoticeResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateChatTopNoticeReq> = {
      scope: 'Chat',
      api: 'UpdateChatTopNotice',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/top_notice/put_top_notice',
      body: new UpdateChatTopNoticeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateChatTopNoticeReq, Chat.UpdateChatTopNoticeResp>(req)
  }
  // deleteChatTopNotice 撤销会话中的置顶
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/delete_top_notice
  async deleteChatTopNotice(
    request: Chat.DeleteChatTopNoticeReq
  ): Promise<{
    data: Chat.DeleteChatTopNoticeResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteChatTopNoticeReq> = {
      scope: 'Chat',
      api: 'DeleteChatTopNotice',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/top_notice/delete_top_notice',
      body: new DeleteChatTopNoticeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteChatTopNoticeReq, Chat.DeleteChatTopNoticeResp>(req)
  }
  // getChatAnnouncement 获取会话中的群公告信息, 公告信息格式与[云文档](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)格式相同。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/get
  async getChatAnnouncement(
    request: Chat.GetChatAnnouncementReq
  ): Promise<{
    data: Chat.GetChatAnnouncementResp
    response: Response
  }> {
    const req: RawRequestReq<GetChatAnnouncementReq> = {
      scope: 'Chat',
      api: 'GetChatAnnouncement',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/announcement',
      body: new GetChatAnnouncementReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetChatAnnouncementReq, Chat.GetChatAnnouncementResp>(req)
  }
  // updateChatAnnouncement 更新会话中的群公告信息, 更新公告信息的格式和更新[云文档](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)格式相同。
  //
  // 注意事项:
  // - 应用需要开启[机器人能力](https://open.feishu.cn/document/home/develop-a-bot-in-5-minutes/create-an-app)
  // - 若群开启了 [仅群主和群管理员可编辑群信息] 配置, 群主/群管理员 或 创建群组且具备 [更新应用所创建群的群信息] 权限的机器人, 可更新群公告
  // - 若群未开启 [仅群主和群管理员可编辑群信息] 配置, 所有成员可以更新群公告
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/patch
  async updateChatAnnouncement(
    request: Chat.UpdateChatAnnouncementReq
  ): Promise<{
    data: Chat.UpdateChatAnnouncementResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateChatAnnouncementReq> = {
      scope: 'Chat',
      api: 'UpdateChatAnnouncement',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/announcement',
      body: new UpdateChatAnnouncementReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateChatAnnouncementReq, Chat.UpdateChatAnnouncementResp>(req)
  }
  // createChatTab 添加自定义会话标签页
  //
  // 注意事项:
  // - 只允许添加类型为doc和url的会话标签页
  // - 创建时不需要设置tabID
  // - 一个群内最多只允许添加20个自定义会话标签页
  // - 会话标签页的名称不超过30个字符
  // - 添加doc类型时, 操作者（access token对应的身份）需要拥有对应文档的权限
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/create
  async createChatTab(
    request: Chat.CreateChatTabReq
  ): Promise<{
    data: Chat.CreateChatTabResp
    response: Response
  }> {
    const req: RawRequestReq<CreateChatTabReq> = {
      scope: 'Chat',
      api: 'CreateChatTab',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/chat_tabs',
      body: new CreateChatTabReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateChatTabReq, Chat.CreateChatTabResp>(req)
  }
  // deleteChatTab 删除会话标签页
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/delete_tabs
  async deleteChatTab(
    request: Chat.DeleteChatTabReq
  ): Promise<{
    data: Chat.DeleteChatTabResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteChatTabReq> = {
      scope: 'Chat',
      api: 'DeleteChatTab',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/chat_tabs/delete_tabs',
      body: new DeleteChatTabReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteChatTabReq, Chat.DeleteChatTabResp>(req)
  }
  // getChatTabList 拉取会话标签页
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/list_tabs
  async getChatTabList(
    request: Chat.GetChatTabListReq
  ): Promise<{
    data: Chat.GetChatTabListResp
    response: Response
  }> {
    const req: RawRequestReq<GetChatTabListReq> = {
      scope: 'Chat',
      api: 'GetChatTabList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/chat_tabs/list_tabs',
      body: new GetChatTabListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetChatTabListReq, Chat.GetChatTabListResp>(req)
  }
  // updateChatTab 更新会话标签页
  //
  // 注意事项:
  // - 只允许更新类型为doc和url的会话标签页
  // - 会话标签页的名称不超过30个字符
  // - 更新doc类型时, 操作者（access token对应的身份）需要拥有对应文档的权限
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/update_tabs
  async updateChatTab(
    request: Chat.UpdateChatTabReq
  ): Promise<{
    data: Chat.UpdateChatTabResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateChatTabReq> = {
      scope: 'Chat',
      api: 'UpdateChatTab',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/chat_tabs/update_tabs',
      body: new UpdateChatTabReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateChatTabReq, Chat.UpdateChatTabResp>(req)
  }
  // sortChatTab 会话标签页排序
  //
  // 注意事项:
  // - 当前消息标签页固定为第一顺位, 不参与排序, 但是请求体中必须包含。
  // - 请求体必须包含全部的TabID
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/sort_tabs
  async sortChatTab(
    request: Chat.SortChatTabReq
  ): Promise<{
    data: Chat.SortChatTabResp
    response: Response
  }> {
    const req: RawRequestReq<SortChatTabReq> = {
      scope: 'Chat',
      api: 'SortChatTab',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/im/v1/chats/:chat_id/chat_tabs/sort_tabs',
      body: new SortChatTabReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SortChatTabReq, Chat.SortChatTabResp>(req)
  }
}

export declare namespace Chat {
  export interface CreateChatReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    set_bot_manager?: boolean // 如果选择了设置群主为指定用户, 可以选择是否同时设置创建此群的机器人为管理员, 此标志位用于标记是否设置创建群的机器人为管理员, 示例值: false
    avatar?: string // 群头像对应的 Image Key, 可通过[上传图片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create)获取（注意: 上传图片的 [image_type] 需要指定为 [avatar]）, 示例值: "default-avatar_44ae0ca3-e140-494b-956f-78091e348435"
    name?: string // 群名称, 示例值: "测试群名称"
    description?: string // 群描述, 示例值: "测试群描述"
    i18n_names?: CreateChatReqI18nNames // 群国际化名称
    owner_id?: string // 创建群时指定的群主, 不填时指定建群的机器人为群主, 群主 ID, ID值与查询参数中的 user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "4d7a3c6g"
    user_id_list?: string[] // 创建群时邀请的群成员, id 类型为 user_id_type, 示例值: ["4d7a3c6g"], 最大长度: `50`
    bot_id_list?: string[] // 创建群时邀请的群机器人, 示例值: ["cli_a10fbf7e94b8d01d"], 最大长度: `5`
    chat_mode?: string // 群模式, 可选值有: `group`: 群组, 示例值: "group"
    chat_type?: string // 群类型, 可选值有: `private`: 私有群, `public`: 公开群, 示例值: "private"
    external?: boolean // 是否是外部群, 示例值: false
    join_message_visibility?: string // 入群消息可见性, 可选值有: `only_owner`: 仅群主和管理员可见, `all_members`: 所有成员可见, `not_anyone`: 任何人均不可见, 示例值: "all_members"
    leave_message_visibility?: string // 退群消息可见性, 可选值有: `only_owner`: 仅群主和管理员可见, `all_members`: 所有成员可见, `not_anyone`: 任何人均不可见, 示例值: "all_members"
    membership_approval?: string // 加群审批, 可选值有: `no_approval_required`: 无需审批, `approval_required`: 需要审批, 示例值: "no_approval_required"
  }

  export interface CreateChatReqI18nNames {
    zh_cn?: string // 中文名, 示例值: "群聊"
    en_us?: string // 英文名, 示例值: "group chat"
    ja_jp?: string // 日文名, 示例值: "グループチャット"
  }

  export interface CreateChatResp {
    chat_id: string // 群 ID, 详情参见: [群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description)
    avatar: string // 群头像 URL
    name: string // 群名称
    description: string // 群描述
    i18n_names: CreateChatRespI18nNames // 群国际化名称
    owner_id: string // 群主 ID, ID值与查询参数中的 user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 当群主是机器人时, 该字段不返回
    owner_id_type: string // 群主 ID 对应的ID类型, 与查询参数中的 user_id_type 相同。取值为: `open_id`、`user_id`、`union_id`其中之一, 当群主是机器人时, 该字段不返回
    add_member_permission: string // 拉 用户或机器人 入群权限, 可选值有: `only_owner`: 仅群主和管理员, `all_members`: 所有成员
    share_card_permission: string // 群分享权限, 可选值有: `allowed`: 允许, `not_allowed`: 不允许
    at_all_permission: string // at 所有人权限, 可选值有: `only_owner`: 仅群主和管理员, `all_members`: 所有成员
    edit_permission: string // 群编辑权限, 可选值有: `only_owner`: 仅群主和管理员, `all_members`: 所有成员
    chat_mode: string // 群模式, 可选值有: `group`: 群组
    chat_type: string // 群类型, 可选值有: `private`: 私有群, `public`: 公开群
    chat_tag: string // 群标签, 如有多个, 则按照下列顺序返回第一个, 可选值有: `inner`: 内部群, `tenant`: 公司群, `department`: 部门群, `edu`: 教育群, `meeting`: 会议群, `customer_service`: 客服群
    external: boolean // 是否是外部群
    tenant_key: string // 租户在飞书上的唯一标识, 用来换取对应的tenant_access_token, 也可以用作租户在应用里面的唯一标识
    join_message_visibility: string // 入群消息可见性, 可选值有: `only_owner`: 仅群主和管理员可见, `all_members`: 所有成员可见, `not_anyone`: 任何人均不可见
    leave_message_visibility: string // 出群消息可见性, 可选值有: `only_owner`: 仅群主和管理员可见, `all_members`: 所有成员可见, `not_anyone`: 任何人均不可见
    membership_approval: string // 加群审批, 可选值有: `no_approval_required`: 无需审批, `approval_required`: 需要审批
    moderation_permission: string // 发言权限, 可选值有: `only_owner`: 仅群主和管理员, `all_members`: 所有成员, `moderator_list`: 指定群成员
  }

  export interface CreateChatRespI18nNames {
    zh_cn: string // 中文名
    en_us: string // 英文名
    ja_jp: string // 日文名
  }

  export interface createChatResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateChatResp
  }

  export interface GetChatReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetChatResp {
    avatar: string // 群头像 URL
    name: string // 群名称
    description: string // 群描述
    i18n_names: GetChatRespI18nNames // 群国际化名称
    add_member_permission: string // 群成员添加权限(all_members/only_owner)
    share_card_permission: string // 群分享权限(allowed/not_allowed)
    at_all_permission: string // at 所有人权限(all_members/only_owner)
    edit_permission: string // 群编辑权限(all_members/only_owner)
    owner_id_type: string // 群主 ID 的类型(open_id/user_id/union_id), 群主是机器人时, 不返回该字段。
    owner_id: string // 群主 ID, 群主是机器人时, 不返回该字段。
    chat_mode: string // 群模式(group/topic/p2p)
    chat_type: string // 群类型(private/public)
    chat_tag: string // 优先级最高的一个群tag(inner/tenant/department/edu/meeting/customer_service)
    join_message_visibility: string // 入群消息可见性(only_owner/all_members/not_anyone)
    leave_message_visibility: string // 出群消息可见性(only_owner/all_members/not_anyone)
    membership_approval: string // 加群审批(no_approval_required/approval_required)
    moderation_permission: string // 发言权限(all_members/only_owner/moderator_list)
    external: boolean // 是否是外部群
    tenant_key: string // tenant key
    user_count: string // 群成员人数
    bot_count: string // 群机器人数
  }

  export interface GetChatRespI18nNames {
    zh_cn: string // 中文名
    en_us: string // 英文名
    ja_jp: string // 日文名
  }

  export interface getChatResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetChatResp
  }

  export interface GetChatOldReq {
    chat_id: string // 群 ID
  }

  export interface GetChatOldResp {
    avatar: string // 群头像
    description: string // 群描述
    i18n_names?: { [key: string]: any } // 群国际化名称（设置了国际化名称才会有这个字段）
    chat_id: string // 群 ID
    members?: GetChatOldRespMember[] // 成员列表
    name: string // 群名称, 类型为group时有效
    type: string // 群类型, group表示群聊, p2p表示单聊
    owner_user_id: string // 群主的 user_id（机器人是群主的时候没有这个字段）
    owner_open_id: string // 群主的 open_id （机器人是群主的时候没有这个字段）
    only_owner_edit: boolean // 是否仅群主可编辑群信息, 群信息包括头像、名称、描述、公告
    only_owner_add: boolean // 是否仅群主可以添加人
    share_allowed: boolean // 是否允许分享群
    add_member_verify: boolean // 是否开启入群验证
    only_owner_at_all: boolean // 是否仅群主@all
    send_message_permission: string // 允许谁发送消息 all: 所有人   owner: 仅群主 selected_member: 指定成员
    join_message_visibility: string // 成员入群通知 all: 所有人  owner: 仅群主  not_anyone: 不通知任何人"
    leave_message_visibility: string // 成员退群通知 all: 所有人  owner: 仅群主  not_anyone: 不通知任何人
    group_email_enabled: boolean // 是否开启群邮件
    send_group_email_permission: string // 发送群邮件的权限 owner: 仅群主   group_member: 群组内成员 tenant_member: 团队成员  all: 所有人
  }

  export interface GetChatOldRespMember {
    open_id: string // 某成员的open_id
    user_id: string // 某成员的user_id
  }

  export interface getChatOldResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码描述
    data: GetChatOldResp
  }

  export interface UpdateChatReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    avatar?: string // 群头像对应的 Image Key, 可通过[上传图片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create)获取（注意: 上传图片的 [image_type] 需要指定为 [avatar]）, 示例值: "default-avatar_44ae0ca3-e140-494b-956f-78091e348435"
    name?: string // 群名称, 示例值: "群聊"
    description?: string // 群描述, 示例值: "测试群描述"
    i18n_names?: UpdateChatReqI18nNames // 群国际化名称
    add_member_permission?: string // 加 user/bot 入群权限(all_members/only_owner), 示例值: "all_members"
    share_card_permission?: string // 群分享权限(allowed/not_allowed), 示例值: "allowed"
    at_all_permission?: string // at 所有人权限(all_members/only_owner), 示例值: "all_members"
    edit_permission?: string // 群编辑权限(all_members/only_owner), 示例值: "all_members"
    owner_id?: string // 新群主 ID, 示例值: "4d7a3c6g"
    join_message_visibility?: string // 入群消息可见性(only_owner/all_members/not_anyone), 示例值: "only_owner"
    leave_message_visibility?: string // 出群消息可见性(only_owner/all_members/not_anyone), 示例值: "only_owner"
    membership_approval?: string // 加群审批(no_approval_required/approval_required), 示例值: "no_approval_required"
  }

  export interface UpdateChatReqI18nNames {
    zh_cn?: string // 中文名, 示例值: "群聊"
    en_us?: string // 英文名, 示例值: "group chat"
    ja_jp?: string // 日文名, 示例值: "グループチャット"
  }

  export interface UpdateChatResp {}

  export interface updateChatResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateChatResp
  }

  export interface DeleteChatReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
  }

  export interface DeleteChatResp {}

  export interface deleteChatResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteChatResp
  }

  export interface GetChatListOfSelfReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "dmJCRHhpd3JRbGV1VEVNRFFyTitRWDY5ZFkybmYrMEUwMUFYT0VMMWdENEtuYUhsNUxGMDIwemtvdE5ORjBNQQ["
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetChatListOfSelfResp {
    items?: GetChatListOfSelfRespItem[] // chat 列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetChatListOfSelfRespItem {
    chat_id: string // 群组 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description)
    avatar: string // 群头像 URL
    name: string // 群名称
    description: string // 群描述
    owner_id: string // 群主 ID
    owner_id_type: string // 群主 ID 类型
    external: boolean // 是否是外部群
    tenant_key: string // tenant key
  }

  export interface getChatListOfSelfResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetChatListOfSelfResp
  }

  export interface SearchChatReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    query?: string // 关键词。注意: 如果query为空值将返回空的结果, 示例值: "abc"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "dmJCRHhpd3JRbGV1VEVNRFFyTitRWDY5ZFkybmYrMEUwMUFYT0VMMWdENEtuYUhsNUxGMDIwemtvdE5ORjBNQQ["
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface SearchChatResp {
    items?: SearchChatRespItem[] // chat 列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface SearchChatRespItem {
    chat_id: string // 群组 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description)
    avatar: string // 群头像 URL
    name: string // 群名称
    description: string // 群描述
    owner_id: string // 群主 ID
    owner_id_type: string // 群主 ID 类型
    external: boolean // 是否是外部群
    tenant_key: string // tenant key
  }

  export interface searchChatResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SearchChatResp
  }

  export interface GetChatMemberListReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
    member_id_type?: string // 群成员 用户 ID 类型, 详情参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "open_id", 可选值有: `user_id`: 以 user_id 来识别成员, `union_id`: 以 union_id 来识别成员, `open_id`: 以 open_id 来识别成员, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "dmJCRHhpd3JRbGV1VEVNRFFyTitRWDY5ZFkybmYrMEUwMUFYT0VMMWdENEtuYUhsNUxGMDIwemtvdE5ORjBNQQ=="
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetChatMemberListResp {
    items?: GetChatMemberListRespItem[] // 成员列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
    member_total: number // 成员总数
  }

  export interface GetChatMemberListRespItem {
    member_id_type: string // 成员的用户 ID 类型, 与查询参数中的 member_id_type 相同。取值为: `open_id`、`user_id`、`union_id`其中之一。
    member_id: string // 成员的用户ID, ID值与查询参数中的 member_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    name: string // 名字
    tenant_key: string // tenant key
  }

  export interface getChatMemberListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetChatMemberListResp
  }

  export interface IsInChatReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
  }

  export interface IsInChatResp {
    is_in_chat: boolean // 用户或者机器人是否在群中
  }

  export interface isInChatResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: IsInChatResp
  }

  export interface CreateChatManagerReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
    member_id_type?: string // 群成员 id 类型 open_id/user_id/union_id/app_id, 示例值: "open_id", 可选值有: `user_id`: 以 user_id 来识别成员, 需要有获取用户 UserID 的权限 ([什么是 User ID？](https://open.feishu.cn/document/home/user-identity-introduction/user-id)), `union_id`: 以 union_id 来识别成员([什么是 Union ID？](https://open.feishu.cn/document/home/user-identity-introduction/union-id)), `open_id`: 以 open_id 来识别成员([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id)), `app_id`: 以 app_id 来识别成员([获取应用身份访问凭证](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/g))
    manager_ids?: string[] // 要增加的 manager_id, 示例值: ["ou_9204a37300b3700d61effaa439f34295"], 最大长度: `50`
  }

  export interface CreateChatManagerResp {
    chat_managers?: string[] // 群目前用户类型的管理员 id
    chat_bot_managers?: string[] // 群目前机器人类型的管理员 id
  }

  export interface createChatManagerResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateChatManagerResp
  }

  export interface DeleteChatManagerReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
    member_id_type?: string // 群成员 id 类型 open_id/user_id/union_id/app_id, 示例值: "open_id", 可选值有: `user_id`: 以 user_id 来识别成员, 需要有获取用户 UserID 的权限 ([什么是 User ID？](https://open.feishu.cn/document/home/user-identity-introduction/user-id)), `union_id`: 以 union_id 来识别成员([什么是 Union ID？](https://open.feishu.cn/document/home/user-identity-introduction/union-id)), `open_id`: 以 open_id 来识别成员([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id)), `app_id`: 以 app_id 来识别成员([获取应用身份访问凭证](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/g))
    manager_ids?: string[] // 要删除的 manager_id, 示例值: ["ou_9204a37300b3700d61effaa439f34295"], 最大长度: `50`
  }

  export interface DeleteChatManagerResp {
    chat_managers?: string[] // 群目前用户类型的管理员 id
    chat_bot_managers?: string[] // 群目前机器人类型的管理员 id
  }

  export interface deleteChatManagerResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteChatManagerResp
  }

  export interface AddChatMemberReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
    member_id_type?: string // 进群成员 id 类型 open_id/user_id/union_id/app_id, 示例值: "open_id", 可选值有: `user_id`: 以 user_id 来识别成员, 需要有获取用户UserID的权限 ([什么是 User ID？](https://open.feishu.cn/document/home/user-identity-introduction/user-id)), `union_id`: 以 union_id 来识别成员([什么是 Union ID？](https://open.feishu.cn/document/home/user-identity-introduction/union-id)), `open_id`: 以 open_id 来识别成员([什么是 Open ID？](https://open.feishu.cn/document/home/user-identity-introduction/open-id)), `app_id`: 以 app_id 来识别成员([获取应用身份访问凭证](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/g))
    succeed_type?: number // 出现不可用ID后的处理方式 0/1/2, 示例值: 0, 可选值有: `0`: 兼容之前的策略, 不存在/不可见的 ID 会拉群失败, 并返回错误响应。存在已离职 ID 时, 会将其他可用 ID 拉入群聊, 返回拉群成功的响应, `1`: 将参数中可用的 ID 全部拉入群聊, 返回拉群成功的响应, 并展示剩余不可用的 ID 及原因, `2`: 参数中只要存在任一不可用的 ID, 就会拉群失败, 返回错误响应, 并展示出不可用的 ID。
    id_list?: string[] // 成员列表, 示例值: ["ou_9204a37300b3700d61effaa439f34295"]
  }

  export interface AddChatMemberResp {
    invalid_id_list?: string[] // 无效成员列表
    not_existed_id_list?: string[] // ID不存在的成员列表
  }

  export interface addChatMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: AddChatMemberResp
  }

  export interface DeleteChatMemberReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
    member_id_type?: string // 出群成员 id 类型 open_id/user_id/union_id/app_id, 示例值: "open_id", 可选值有: `user_id`: 以 user_id 来识别成员, `union_id`: 以 union_id 来识别成员, `open_id`: 以 open_id 来识别成员, `app_id`: 以 app_id 来识别成员
    id_list?: string[] // 成员列表, 示例值: ["ou_9204a37300b3700d61effaa439f34295"]
  }

  export interface DeleteChatMemberResp {
    invalid_id_list?: string[] // 无效成员列表
  }

  export interface deleteChatMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteChatMemberResp
  }

  export interface JoinChatReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
  }

  export interface JoinChatResp {}

  export interface joinChatResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: JoinChatResp
  }

  export interface GetChatModerationReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "dmJCRHhpd3JRbGV1VEVNRFFyTitRWDY5ZFkybmYrMEUwMUFYT0VMMWdENEtuYUhsNUxGMDIwemtvdE5ORjBNQQ["
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetChatModerationResp {
    moderation_setting: string // 群发言模式（all_members/only_owner/moderator_list, 其中 moderator_list 表示部分用户可发言的模式）
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
    items?: GetChatModerationRespItem[] // 可发言用户列表
  }

  export interface GetChatModerationRespItem {
    user_id_type: string // 可发言用户 ID 类型
    user_id: string // 可发言用户 ID
  }

  export interface getChatModerationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetChatModerationResp
  }

  export interface UpdateChatModerationReq {
    chat_id: string // 群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_a0553eda9014c201e6969b478895c230"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    moderation_setting?: string // 群发言模式（all_members/only_owner/moderator_list, 其中 moderator_list 表示部分用户可发言的模式）, 示例值: "moderator_list"
    moderator_added_list?: string[] // 选择部分用户可发言模式时, 添加的可发言用户列表（自动过滤不在群内的用户）
    moderator_removed_list?: string[] // 选择部分用户可发言模式时, 移除的可发言用户列表（自动过滤不在群内的用户）
  }

  export interface UpdateChatModerationResp {}

  export interface updateChatModerationResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateChatModerationResp
  }

  export interface UpdateChatTopNoticeReq {
    chat_id: string // 待修改置顶的群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_5ad11d72b830411d72b836c20"
    chat_top_notice?: UpdateChatTopNoticeReqChatTopNotice[] // 要进行发布的群置顶
  }

  export interface UpdateChatTopNoticeReqChatTopNotice {
    action_type?: string // 置顶的类型, 示例值: "1", 可选值有: `1`: 消息类型, `2`: 群公告类型
    message_id?: string // 消息id, 示例值: "om_dc13264520392913993dd051dba21dcf"
  }

  export interface UpdateChatTopNoticeResp {}

  export interface updateChatTopNoticeResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateChatTopNoticeResp
  }

  export interface DeleteChatTopNoticeReq {
    chat_id: string // 待撤销置顶的群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_5ad11d72b830411d72b836c20"
  }

  export interface DeleteChatTopNoticeResp {}

  export interface deleteChatTopNoticeResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteChatTopNoticeResp
  }

  export interface GetChatAnnouncementReq {
    chat_id: string // 待获取公告的群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_5ad11d72b830411d72b836c20"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetChatAnnouncementResp {
    content: string // 云文档序列化信息
    revision: string // 文档当前版本号 纯数字
    create_time: string // 文档生成的时间戳（秒）
    update_time: string // 文档更新的时间戳（秒）
    owner_id_type: string // 文档所有者的 ID 类型, 如果所有者是用户, 则与查询参数中的user_id_type 相同；取值为`open_id` `user_id` `union_id` 其中之一, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 如果所有者是机器人, 为机器人应用的 `app_id`, 详情参见  [获取应用身份访问凭证](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/g), 可选值有: `user_id`: 以 user_id 来识别用户, `union_id`: 以 union_id 来识别用户, `open_id`: 以 open_id 来识别用户, `app_id`: 以 app_id 来识别机器人应用
    owner_id: string // 文档所有者 ID, ID 值与owner_id_type 中的ID类型对应
    modifier_id_type: string // 文档最新修改者 id 类型, 如果修改者是用户, 则与查询参数中的user_id_type 相同；取值为`open_id` `user_id` `union_id` 其中之一, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 如果修改者是机器人, 为机器人应用的 `app_id`, 详情参见  [获取应用身份访问凭证](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/g), 可选值有: `user_id`: 以 user_id 来识别用户, `union_id`: 以 union_id 来识别用户, `open_id`: 以 open_id 来识别用户, `app_id`: 以 app_id 来识别应用
    modifier_id: string // 文档最新修改者 ID, ID 值与modifier_id_type 中的ID类型对应
  }

  export interface getChatAnnouncementResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetChatAnnouncementResp
  }

  export interface UpdateChatAnnouncementReq {
    chat_id: string // 待修改公告的群 ID, 详情参见[群ID 说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), 示例值: "oc_5ad11d72b830411d72b836c20"
    revision: string // 文档当前版本号 int64 类型, get 接口会返回, 示例值: "12"
    requests?: string[] // 修改文档请求的序列化字段, 更新公告信息的格式和更新[云文档](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)格式相同, 示例值: xxx
  }

  export interface UpdateChatAnnouncementResp {}

  export interface updateChatAnnouncementResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateChatAnnouncementResp
  }

  export interface CreateChatTabReq {
    chat_id: string // 群ID, 示例值: "oc_a0553eda9014c201e6969b478895c230"
    chat_tabs?: CreateChatTabReqChatTab[] // 会话标签页
  }

  export interface CreateChatTabReqChatTab {
    tab_id?: string // TabID, 示例值: "7101214603622940671"
    tab_name?: string // Tab名称, 示例值: "文档"
    tab_type: string // Tab类型, 示例值: "doc", 可选值有: message: 消息类型, doc_list: 云文档列表, doc: 文档, pin: Pin, meeting_minute: 会议纪要, chat_announcement: 群公告, url: URL, file: 文件
    tab_content?: CreateChatTabReqChatTabTabContent // Tab内容
  }

  export interface CreateChatTabReqChatTabTabContent {
    url?: string // URL类型, 示例值: "https://www.feishu.cn"
    doc?: string // Doc链接, 示例值: "https://bytedance.feishu.cn/wiki/wikcnPIcqWjJQwkwDzrB9t40123xz"
    meeting_minute?: string // 会议纪要, 示例值: "https://bytedance.feishu.cn/docs/doccnvIXbV22i6hSD3utar4123dx"
  }

  export interface CreateChatTabResp {
    chat_tabs?: CreateChatTabRespChatTab[] // 会话标签页
  }

  export interface CreateChatTabRespChatTab {
    tab_id: string // TabID
    tab_name: string // Tab名称
    tab_type: string // Tab类型, 可选值有: message: 消息类型, doc_list: 云文档列表, doc: 文档, pin: Pin, meeting_minute: 会议纪要, chat_announcement: 群公告, url: URL, file: 文件
    tab_content: CreateChatTabRespChatTabTabContent // Tab内容
  }

  export interface CreateChatTabRespChatTabTabContent {
    url: string // URL类型
    doc: string // Doc链接
    meeting_minute: string // 会议纪要
  }

  export interface createChatTabResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateChatTabResp
  }

  export interface DeleteChatTabReq {
    chat_id: string // 群ID, 示例值: "oc_a0553eda9014c201e6969b478895c230"
    tab_ids?: string[] // 会话标签页id列表, 示例值: ["7101214603622940671", "7101214603622940672"]
  }

  export interface DeleteChatTabResp {
    chat_tabs?: DeleteChatTabRespChatTab[] // 会话标签页
  }

  export interface DeleteChatTabRespChatTab {
    tab_id: string // TabID
    tab_name: string // Tab名称
    tab_type: string // Tab类型, 可选值有: message: 消息类型, doc_list: 云文档列表, doc: 文档, pin: Pin, meeting_minute: 会议纪要, chat_announcement: 群公告, url: URL, file: 文件
    tab_content: DeleteChatTabRespChatTabTabContent // Tab内容
  }

  export interface DeleteChatTabRespChatTabTabContent {
    url: string // URL类型
    doc: string // Doc链接
    meeting_minute: string // 会议纪要
  }

  export interface deleteChatTabResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteChatTabResp
  }

  export interface GetChatTabListReq {
    chat_id: string // 群ID, 示例值: "oc_a0553eda9014c201e6969b478895c230"
  }

  export interface GetChatTabListResp {
    chat_tabs?: GetChatTabListRespChatTab[] // 会话标签页
  }

  export interface GetChatTabListRespChatTab {
    tab_id: string // TabID
    tab_name: string // Tab名称
    tab_type: string // Tab类型, 可选值有: message: 消息类型, doc_list: 云文档列表, doc: 文档, pin: Pin, meeting_minute: 会议纪要, chat_announcement: 群公告, url: URL, file: 文件
    tab_content: GetChatTabListRespChatTabTabContent // Tab内容
  }

  export interface GetChatTabListRespChatTabTabContent {
    url: string // URL类型
    doc: string // Doc链接
    meeting_minute: string // 会议纪要
  }

  export interface getChatTabListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetChatTabListResp
  }

  export interface UpdateChatTabReq {
    chat_id: string // 群ID, 示例值: "oc_a0553eda9014c201e6969b478895c230"
    chat_tabs?: UpdateChatTabReqChatTab[] // 会话标签页
  }

  export interface UpdateChatTabReqChatTab {
    tab_id?: string // TabID, 示例值: "7101214603622940671"
    tab_name?: string // Tab名称, 示例值: "文档"
    tab_type: string // Tab类型, 示例值: "doc", 可选值有: message: 消息类型, doc_list: 云文档列表, doc: 文档, pin: Pin, meeting_minute: 会议纪要, chat_announcement: 群公告, url: URL, file: 文件
    tab_content?: UpdateChatTabReqChatTabTabContent // Tab内容
  }

  export interface UpdateChatTabReqChatTabTabContent {
    url?: string // URL类型, 示例值: "https://www.feishu.cn"
    doc?: string // Doc链接, 示例值: "https://bytedance.feishu.cn/wiki/wikcnPIcqWjJQwkwDzrB9t40123xz"
    meeting_minute?: string // 会议纪要, 示例值: "https://bytedance.feishu.cn/docs/doccnvIXbV22i6hSD3utar4123dx"
  }

  export interface UpdateChatTabResp {
    chat_tabs?: UpdateChatTabRespChatTab[] // 群标签
  }

  export interface UpdateChatTabRespChatTab {
    tab_id: string // TabID
    tab_name: string // Tab名称
    tab_type: string // Tab类型, 可选值有: message: 消息类型, doc_list: 云文档列表, doc: 文档, pin: Pin, meeting_minute: 会议纪要, chat_announcement: 群公告, url: URL, file: 文件
    tab_content: UpdateChatTabRespChatTabTabContent // Tab内容
  }

  export interface UpdateChatTabRespChatTabTabContent {
    url: string // URL类型
    doc: string // Doc链接
    meeting_minute: string // 会议纪要
  }

  export interface updateChatTabResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateChatTabResp
  }

  export interface SortChatTabReq {
    chat_id: string // 群ID, 示例值: "oc_a0553eda9014c201e6969b478895c230"
    tab_ids?: string[] // 会话标签页ID列表, 示例值: ["7101214603622940671", "7101214603622940672"]
  }

  export interface SortChatTabResp {
    chat_tabs?: SortChatTabRespChatTab[] // 会话标签页
  }

  export interface SortChatTabRespChatTab {
    tab_id: string // TabID
    tab_name: string // Tab名称
    tab_type: string // Tab类型, 可选值有: message: 消息类型, doc_list: 云文档列表, doc: 文档, pin: Pin, meeting_minute: 会议纪要, chat_announcement: 群公告, url: URL, file: 文件
    tab_content: SortChatTabRespChatTabTabContent // Tab内容
  }

  export interface SortChatTabRespChatTabTabContent {
    url: string // URL类型
    doc: string // Doc链接
    meeting_minute: string // 会议纪要
  }

  export interface sortChatTabResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SortChatTabResp
  }
}

class CreateChatReq {
  user_id_type?: any
  set_bot_manager?: any
  avatar?: any
  name?: any
  description?: any
  i18n_names?: any
  owner_id?: any
  user_id_list?: any
  bot_id_list?: any
  chat_mode?: any
  chat_type?: any
  external?: any
  join_message_visibility?: any
  leave_message_visibility?: any
  membership_approval?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      avatar: this.avatar,
      name: this.name,
      description: this.description,
      i18n_names: this.i18n_names,
      owner_id: this.owner_id,
      user_id_list: this.user_id_list,
      bot_id_list: this.bot_id_list,
      chat_mode: this.chat_mode,
      chat_type: this.chat_type,
      external: this.external,
      join_message_visibility: this.join_message_visibility,
      leave_message_visibility: this.leave_message_visibility,
      membership_approval: this.membership_approval
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.set_bot_manager !== undefined) {
      q['set_bot_manager'] = this.set_bot_manager
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetChatReq {
  chat_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetChatOldReq {
  chat_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.chat_id !== undefined) {
      q['chat_id'] = this.chat_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateChatReq {
  chat_id?: any
  user_id_type?: any
  avatar?: any
  name?: any
  description?: any
  i18n_names?: any
  add_member_permission?: any
  share_card_permission?: any
  at_all_permission?: any
  edit_permission?: any
  owner_id?: any
  join_message_visibility?: any
  leave_message_visibility?: any
  membership_approval?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      avatar: this.avatar,
      name: this.name,
      description: this.description,
      i18n_names: this.i18n_names,
      add_member_permission: this.add_member_permission,
      share_card_permission: this.share_card_permission,
      at_all_permission: this.at_all_permission,
      edit_permission: this.edit_permission,
      owner_id: this.owner_id,
      join_message_visibility: this.join_message_visibility,
      leave_message_visibility: this.leave_message_visibility,
      membership_approval: this.membership_approval
    }
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteChatReq {
  chat_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}

class GetChatListOfSelfReq {
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

class SearchChatReq {
  user_id_type?: any
  query?: any
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
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.query !== undefined) {
      q['query'] = this.query
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

class GetChatMemberListReq {
  chat_id?: any
  member_id_type?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    const q = {} as { [key: string]: any }
    if (this.member_id_type !== undefined) {
      q['member_id_type'] = this.member_id_type
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

class IsInChatReq {
  chat_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}

class CreateChatManagerReq {
  chat_id?: any
  member_id_type?: any
  manager_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      manager_ids: this.manager_ids
    }
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    const q = {} as { [key: string]: any }
    if (this.member_id_type !== undefined) {
      q['member_id_type'] = this.member_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteChatManagerReq {
  chat_id?: any
  member_id_type?: any
  manager_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      manager_ids: this.manager_ids
    }
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    const q = {} as { [key: string]: any }
    if (this.member_id_type !== undefined) {
      q['member_id_type'] = this.member_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class AddChatMemberReq {
  chat_id?: any
  member_id_type?: any
  succeed_type?: any
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
    path = path.replace(':chat_id', this.chat_id)

    const q = {} as { [key: string]: any }
    if (this.member_id_type !== undefined) {
      q['member_id_type'] = this.member_id_type
    }
    if (this.succeed_type !== undefined) {
      q['succeed_type'] = this.succeed_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteChatMemberReq {
  chat_id?: any
  member_id_type?: any
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
    path = path.replace(':chat_id', this.chat_id)

    const q = {} as { [key: string]: any }
    if (this.member_id_type !== undefined) {
      q['member_id_type'] = this.member_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class JoinChatReq {
  chat_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}

class GetChatModerationReq {
  chat_id?: any
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
    path = path.replace(':chat_id', this.chat_id)

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

class UpdateChatModerationReq {
  chat_id?: any
  user_id_type?: any
  moderation_setting?: any
  moderator_added_list?: any
  moderator_removed_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      moderation_setting: this.moderation_setting,
      moderator_added_list: this.moderator_added_list,
      moderator_removed_list: this.moderator_removed_list
    }
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateChatTopNoticeReq {
  chat_id?: any
  chat_top_notice?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      chat_top_notice: this.chat_top_notice
    }
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}

class DeleteChatTopNoticeReq {
  chat_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}

class GetChatAnnouncementReq {
  chat_id?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateChatAnnouncementReq {
  chat_id?: any
  revision?: any
  requests?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      revision: this.revision,
      requests: this.requests
    }
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}

class CreateChatTabReq {
  chat_id?: any
  chat_tabs?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      chat_tabs: this.chat_tabs
    }
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}

class DeleteChatTabReq {
  chat_id?: any
  tab_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      tab_ids: this.tab_ids
    }
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}

class GetChatTabListReq {
  chat_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}

class UpdateChatTabReq {
  chat_id?: any
  chat_tabs?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      chat_tabs: this.chat_tabs
    }
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}

class SortChatTabReq {
  chat_id?: any
  tab_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      tab_ids: this.tab_ids
    }
  }

  getPath(path: string) {
    path = path.replace(':chat_id', this.chat_id)

    return path
  }
}
