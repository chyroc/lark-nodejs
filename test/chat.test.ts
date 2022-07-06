import {
  appAllPermission,
  chatContainALLPermissionApp,
  chatNotContainALLPermissionApp,
  userAdmin
} from './help.test'

describe('chat.test', () => {
  const cli = appAllPermission.ins()

  it('chat', async () => {
    const createChatResp = await cli.chat.createChat({})
    expect(createChatResp.data.chat_id).toBeDefined()
    const chatID = createChatResp.data.chat_id

    await cli.chat.addChatMember({
      chat_id: chatID,
      member_id_type: 'user_id',
      id_list: [userAdmin.userID]
    })

    const getChatMemberListResp = await cli.chat.getChatMemberList({
      chat_id: chatID,
      member_id_type: 'user_id'
    })
    expect(getChatMemberListResp.data.items).toHaveLength(1)
    expect(getChatMemberListResp.data.items![0].member_id).toEqual(userAdmin.userID)

    await cli.chat.deleteChatMember({
      chat_id: chatID,
      member_id_type: 'user_id',
      id_list: [userAdmin.userID]
    })

    await cli.chat.deleteChat({
      chat_id: chatID
    })
  }, 20 * 1000)

  it('chat.in', async () => {
    const isInChatResp = await cli.chat.isInChat({
      chat_id: chatContainALLPermissionApp.chatID
    })
    expect(isInChatResp.data.is_in_chat).toBeTruthy()

    const isInChatResp2 = await cli.chat.isInChat({
      chat_id: chatNotContainALLPermissionApp.chatID
    })
    expect(isInChatResp2.data.is_in_chat).toBeFalsy()
  }, 20 * 1000)
})

describe('chat', () => {
  const cli = appAllPermission.ins()

  it('get', async () => {
    const getChatResp = await cli.chat.getChat({
      chat_id: chatContainALLPermissionApp.chatID
    })
    expect(getChatResp.data.name).toContain('lark-sdk')
    expect(getChatResp.data.chat_mode).toEqual('group')
    expect(getChatResp.data.chat_type).toEqual('private')
  }, 20 * 1000)

  it('update', async () => {
    await cli.chat.updateChat({
      chat_id: chatContainALLPermissionApp.chatID,
      name: `包含「lark-sdk」的群 ${Math.random()}`
    })
  }, 20 * 1000)

  it('getOfSelf', async () => {
    const resp = await cli.chat.getChatListOfSelf({
      user_id_type: 'open_id'
    })
    expect(resp.data.items?.length).toBeGreaterThan(0)
    expect(resp.data.items!.map(v => v.chat_id)).toContain(chatContainALLPermissionApp.chatID)
  }, 20 * 1000)

  it('search', async () => {
    const resp = await cli.chat.searchChat({
      query: 'lark-sdk'
    })
    expect(resp.data.items?.length).toBeGreaterThan(0)
    expect(resp.data.items!.map(v => v.chat_id)).toContain(chatContainALLPermissionApp.chatID)
  }, 20 * 1000)

  it('announcement', async () => {
    const resp = await cli.chat.getChatAnnouncement({
      chat_id: chatContainALLPermissionApp.chatID
    })
    expect(resp.data.content).toContain('群公告')
  })
})


