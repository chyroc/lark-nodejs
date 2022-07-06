import { appAllPermission, chatForSendMessage, file1 } from './help.test'

// 			_, _, _ = AppAllPermission.Ins().Message.DeleteMessage(ctx, &lark.DeleteMessageReq{MessageID: v})

describe('message', () => {
  const cli = appAllPermission.ins()

  it('text, chat', async () => {
    const resp = await cli.message.sendRawMessageOld({
      chat_id: chatForSendMessage.chatID,
      open_id: '',
      email: '',
      user_id: '',
      msg_type: 'text',
      content: {
        text: 'hello',
        image_key: ''
      }
    })
    expect(resp.data.message_id).toBeDefined()
  })

  it('image, chat', async () => {
    const resp = await cli.message.sendRawMessageOld({
      chat_id: chatForSendMessage.chatID,
      open_id: '',
      email: '',
      user_id: '',
      msg_type: 'image',
      content: {
        text: '',
        image_key: file1.key
      }
    })
    expect(resp.data.message_id).toBeDefined()
  })

  it('post, chat', async () => {
    const resp = await cli.message.sendRawMessageOld({
      chat_id: chatForSendMessage.chatID,
      open_id: '',
      email: '',
      user_id: '',
      msg_type: 'post',
      content: {
        text: '',
        image_key: '',
        post: { 'zh_cn': { 'title': '我是一个标题', 'content': [[{ 'tag': 'text', 'text': '文本' }]] } }
      }
    })
    expect(resp.data.message_id).toBeDefined()
  })

  it('card, chat', async () => {
    const resp = await cli.message.sendRawMessage({
      receive_id: chatForSendMessage.chatID,
      receive_id_type: 'chat_id',
      msg_type: 'interactive',
      content: '{"config": { "wide_screen_mode": true },"i18n_elements": {"zh_cn": [{"tag": "div","text": { "tag": "lark_md", "content": "文本"}}]}}'
    })
    expect(resp.data.message_id).toBeDefined()
  })

  it('send, reply, delete', async () => {
    const resp = await cli.message.sendRawMessageOld({
      chat_id: chatForSendMessage.chatID,
      open_id: '',
      email: '',
      user_id: '',
      msg_type: 'text',
      content: {
        text: '',
        image_key: ''
      }
    })
    expect(resp.data.message_id).toBeDefined()

    await cli.message.replyRawMessage({
      msg_type: 'text',
      message_id: resp.data.message_id,
      content: JSON.stringify({
        text: 'hello'
      })
    })

    await cli.message.deleteMessage({
      message_id: resp.data.message_id
    })
  })
})


// 			t.Run("card", func(t *testing.T) {
// 				s := `{"config": { "wide_screen_mode": true },"i18n_elements": {"zh_cn": [{"tag": "div","text": { "tag": "lark_md", "content": "文本"}}]}}`
// 				resp, _, err := AppAllPermission.Ins().Message.Reply(messageID).SendCard(ctx, s)
// 				as.Nil(err)
// 				msgIDs = append(msgIDs, resp.MessageID)
// 			})
//
// 			t.Run("file", func(t *testing.T) {
// 				resp, _, err := AppAllPermission.Ins().Message.Reply(messageID).SendFile(ctx, File2.Key)
// 				as.Nil(err)
// 				msgIDs = append(msgIDs, resp.MessageID)
// 			})
//
// 			t.Run("chat", func(t *testing.T) {
// 				resp, _, err := AppAllPermission.Ins().Message.Reply(messageID).SendShareChat(ctx, ChatForSendMessage.ChatID)
// 				as.Nil(err)
// 				msgIDs = append(msgIDs, resp.MessageID)
// 			})
//
// 			t.Run("user", func(t *testing.T) {
// 				resp, _, err := AppAllPermission.Ins().Message.Reply(messageID).SendShareUser(ctx, UserAdmin.OpenID)
// 				as.Nil(err)
// 				msgIDs = append(msgIDs, resp.MessageID)
// 			})
// 		})
// 	})
//
// 	t.Run("get-message-read", func(t *testing.T) {
// 		messageID := testSendText(t)
// 		resp, _, err := AppAllPermission.Ins().Message.GetMessageReadUserList(ctx, &lark.GetMessageReadUserListReq{
// 			UserIDType: lark.IDTypeUserID,
// 			MessageID:  messageID,
// 		})
// 		printData(resp, err)
// 		as.Nil(err)
// 	})
//
// 	t.Run("get-message-text", func(t *testing.T) {
// 		messageID := testSendText(t)
//
// 		resp, _, err := AppAllPermission.Ins().Message.GetMessage(ctx, &lark.GetMessageReq{
// 			MessageID: messageID,
// 		})
// 		printData(resp, err)
// 		as.Nil(err)
// 		as.NotNil(resp)
// 		as.Len(resp.Items, 1)
// 		as.Equal(lark.MsgTypeText, resp.Items[0].MsgType)
// 		as.Equal(ChatForSendMessage.ChatID, resp.Items[0].ChatID)
// 		msgContent, err := lark.UnwrapMessageContent(resp.Items[0].MsgType, resp.Items[0].Body.Content)
// 		as.Nil(err)
// 		as.Contains(msgContent.Text.Text, "test")
// 	})
//
// 	t.Run("get-message-image", func(t *testing.T) {
// 		messageID := testSendImage(t)
// 		messageFile := ""
//
// 		{
// 			resp, _, err := AppAllPermission.Ins().Message.GetMessage(ctx, &lark.GetMessageReq{
// 				MessageID: messageID,
// 			})
// 			printData(resp, err)
// 			as.Nil(err)
// 			as.NotNil(resp)
// 			as.Len(resp.Items, 1)
// 			as.Equal(lark.MsgTypeImage, resp.Items[0].MsgType)
// 			as.Equal(ChatForSendMessage.ChatID, resp.Items[0].ChatID)
// 			as.Contains(resp.Items[0].Body.Content, "image_key")
// 			msgContent, err := lark.UnwrapMessageContent(resp.Items[0].MsgType, resp.Items[0].Body.Content)
// 			as.Nil(err)
// 			messageFile = msgContent.Image.ImageKey
// 		}
//
// 		{
// 			resp, _, err := AppAllPermission.Ins().Message.GetMessageFile(ctx, &lark.GetMessageFileReq{
// 				Type:      "image",
// 				MessageID: messageID,
// 				FileKey:   messageFile,
// 			})
// 			as.Nil(err)
// 			as.NotNil(resp)
// 			bs, err := ioutil.ReadAll(resp.File)
// 			as.Nil(err)
// 			as.NotEmpty(bs)
// 		}
// 	})
//
// 	t.Run("get-message-list", func(t *testing.T) {
// 		resp, _, err := AppAllPermission.Ins().Message.GetMessageList(ctx, &lark.GetMessageListReq{
// 			ContainerIDType: lark.ContainerIDTypeChat,
// 			ContainerID:     ChatContainALLPermissionApp.ChatID,
// 			StartTime:       nil,
// 			EndTime:         nil,
// 			PageToken:       nil,
// 			PageSize:        nil,
// 		})
// 		printData(resp, err)
// 		as.Nil(err)
// 		as.NotNil(resp)
// 		as.True(len(resp.Items) > 0)
// 	})
// }
//
// func Test_SendCustomBotMessage(t *testing.T) {
// 	as := assert.New(t)
//
// 	t.Run("AppCustomBotNoValid", func(t *testing.T) {
// 		cli := AppCustomBotNoValid.CustomBot().Message.Send()
// 		t.Run("text", func(t *testing.T) {
// 			_, _, err := cli.SendText(ctx, "hi")
// 			as.Nil(err)
// 		})
//
// 		t.Run("post", func(t *testing.T) {
// 			post := lark.MessageContentPostAll{
// 				ZhCn: &lark.MessageContentPost{
// 					Title: "title",
// 					Content: [][]lark.MessageContentPostItem{
// 						{
// 							lark.MessageContentPostText{
// 								Text:     "text",
// 								UnEscape: false,
// 							},
// 						},
// 					},
// 				},
// 			}
// 			_, _, err := cli.SendPost(ctx, post.String())
// 			as.Nil(err)
// 		})
//
// 		t.Run("chat", func(t *testing.T) {
// 			_, _, err := cli.SendShareChat(ctx, ChatForSendMessage.ChatID)
// 			as.Nil(err)
// 		})
//
// 		t.Run("image", func(t *testing.T) {
// 			imageKey := "img_v2_094a8a5c-ae93-4602-9416-4d875cc9a96g"
// 			_, _, err := cli.SendImage(ctx, imageKey)
// 			as.Nil(err)
// 		})
//
// 		t.Run("card", func(t *testing.T) {
// 			card := lark.MessageContentCard{
// 				Header: &lark.MessageContentCardHeader{
// 					Template: "",
// 					Title: &lark.MessageContentCardObjectText{
// 						Tag:     "plain_text",
// 						Content: "1",
// 					},
// 				},
// 				Config: &lark.MessageContentCardConfig{
// 					EnableForward: true,
// 				},
// 				Modules: []lark.MessageContentCardModule{
// 					lark.MessageContentCardModuleDIV{
// 						Text: &lark.MessageContentCardObjectText{
// 							Tag:     "plain_text",
// 							Content: "1",
// 						},
// 						Fields: nil,
// 						Extra:  nil,
// 					},
// 				},
// 			}
// 			_, _, err := cli.SendCard(ctx, card.String())
// 			as.Nil(err)
// 		})
// 	})
//
// 	t.Run("AppCustomBotCheckCanSendWord", func(t *testing.T) {
// 		cli := AppCustomBotCheckCanSendWord.CustomBot().Message.Send()
// 		t.Run("text", func(t *testing.T) {
// 			_, _, err := cli.SendText(ctx, "hi")
// 			as.NotNil(err)
// 			as.Contains(err.Error(), "Key Words Not Found")
// 		})
//
// 		t.Run("text", func(t *testing.T) {
// 			_, _, err := cli.SendText(ctx, "hi, can-send")
// 			as.Nil(err)
// 		})
//
// 		t.Run("post", func(t *testing.T) {
// 			post := lark.MessageContentPostAll{
// 				ZhCn: &lark.MessageContentPost{
// 					Title: "title",
// 					Content: [][]lark.MessageContentPostItem{
// 						{
// 							lark.MessageContentPostText{
// 								Text:     "title",
// 								UnEscape: false,
// 							},
// 						},
// 					},
// 				},
// 			}
// 			_, _, err := cli.SendPost(ctx, post.String())
// 			as.NotNil(err)
// 			as.Contains(err.Error(), "Key Words Not Found")
// 		})
//
// 		t.Run("post", func(t *testing.T) {
// 			post := lark.MessageContentPostAll{
// 				ZhCn: &lark.MessageContentPost{
// 					Title: "title",
// 					Content: [][]lark.MessageContentPostItem{
// 						{
// 							lark.MessageContentPostText{
// 								Text:     "can-send",
// 								UnEscape: false,
// 							},
// 						},
// 					},
// 				},
// 			}
// 			_, _, err := cli.SendPost(ctx, post.String())
// 			as.Nil(err)
// 		})
//
// 		t.Run("chat", func(t *testing.T) {
// 			_, _, err := cli.SendShareChat(ctx, ChatForSendMessage.ChatID)
// 			as.NotNil(err)
// 			as.Contains(err.Error(), "Key Words Not Found")
// 		})
//
// 		t.Run("image", func(t *testing.T) {
// 			imageKey := "img_v2_094a8a5c-ae93-4602-9416-4d875cc9a96g"
// 			_, _, err := cli.SendImage(ctx, imageKey)
// 			as.NotNil(err)
// 			as.Contains(err.Error(), "Key Words Not Found")
// 		})
//
// 		t.Run("card", func(t *testing.T) {
// 			card := lark.MessageContentCard{
// 				Header: &lark.MessageContentCardHeader{
// 					Template: "",
// 					Title: &lark.MessageContentCardObjectText{
// 						Tag:     "plain_text",
// 						Content: "1",
// 					},
// 				},
// 				Config: &lark.MessageContentCardConfig{
// 					EnableForward: true,
// 				},
// 				Modules: []lark.MessageContentCardModule{
// 					lark.MessageContentCardModuleDIV{
// 						Text: &lark.MessageContentCardObjectText{
// 							Tag:     "plain_text",
// 							Content: "1",
// 						},
// 						Fields: nil,
// 						Extra:  nil,
// 					},
// 				},
// 			}
// 			_, _, err := cli.SendCard(ctx, card.String())
// 			as.NotNil(err)
// 			as.Contains(err.Error(), "Key Words Not Found")
// 		})
//
// 		t.Run("card", func(t *testing.T) {
// 			card := lark.MessageContentCard{
// 				Header: &lark.MessageContentCardHeader{
// 					Template: "",
// 					Title: &lark.MessageContentCardObjectText{
// 						Tag:     "plain_text",
// 						Content: "1",
// 					},
// 				},
// 				Config: &lark.MessageContentCardConfig{
// 					EnableForward: true,
// 				},
// 				Modules: []lark.MessageContentCardModule{
// 					lark.MessageContentCardModuleDIV{
// 						Text: &lark.MessageContentCardObjectText{
// 							Tag:     "plain_text",
// 							Content: "1, can-send",
// 						},
// 						Fields: nil,
// 						Extra:  nil,
// 					},
// 				},
// 			}
// 			_, _, err := cli.SendCard(ctx, card.String())
// 			as.Nil(err)
// 		})
// 	})
//
// 	t.Run("AppCustomBotCheckSign", func(t *testing.T) {
// 		cli := AppCustomBotCheckSign.CustomBot().Message.Send()
// 		t.Run("text", func(t *testing.T) {
// 			_, _, err := cli.SendText(ctx, "hi")
// 			as.Nil(err)
// 		})
//
// 		t.Run("post", func(t *testing.T) {
// 			post := lark.MessageContentPostAll{
// 				ZhCn: &lark.MessageContentPost{
// 					Title: "title",
// 					Content: [][]lark.MessageContentPostItem{
// 						{
// 							lark.MessageContentPostText{
// 								Text:     "text",
// 								UnEscape: false,
// 							},
// 						},
// 					},
// 				},
// 			}
// 			_, _, err := cli.SendPost(ctx, post.String())
// 			as.Nil(err)
// 		})
//
// 		t.Run("chat", func(t *testing.T) {
// 			_, _, err := cli.SendShareChat(ctx, ChatForSendMessage.ChatID)
// 			as.Nil(err)
// 		})
//
// 		t.Run("image", func(t *testing.T) {
// 			imageKey := "img_v2_094a8a5c-ae93-4602-9416-4d875cc9a96g"
// 			_, _, err := cli.SendImage(ctx, imageKey)
// 			as.Nil(err)
// 		})
//
// 		t.Run("card", func(t *testing.T) {
// 			card := lark.MessageContentCard{
// 				Header: &lark.MessageContentCardHeader{
// 					Template: "",
// 					Title: &lark.MessageContentCardObjectText{
// 						Tag:     "plain_text",
// 						Content: "1",
// 					},
// 				},
// 				Config: &lark.MessageContentCardConfig{
// 					EnableForward: true,
// 				},
// 				Modules: []lark.MessageContentCardModule{
// 					lark.MessageContentCardModuleDIV{
// 						Text: &lark.MessageContentCardObjectText{
// 							Tag:     "plain_text",
// 							Content: "1",
// 						},
// 						Fields: nil,
// 						Extra:  nil,
// 					},
// 				},
// 			}
// 			_, _, err := cli.SendCard(ctx, card.String())
// 			as.Nil(err)
// 		})
// 	})
// }
//
// func Test_EphemeralMessage(t *testing.T) {
// 	as := assert.New(t)
//
// 	resp, res, err := AppAllPermission.Ins().Message.SendEphemeralMessage(ctx, &lark.SendEphemeralMessageReq{
// 		ChatID:  ChatForSendMessage.ChatID,
// 		UserID:  UserAdmin.UserID,
// 		MsgType: "interactive",
// 		Card: &lark.MessageContentCard{
// 			Header: &lark.MessageContentCardHeader{
// 				Template: lark.MessageContentCardHeaderTemplateBlue,
// 				Title: &lark.MessageContentCardObjectText{
// 					Tag:     "lark_md",
// 					Content: "title",
// 				},
// 			},
// 			Modules: []lark.MessageContentCardModule{
// 				lark.MessageContentCardModuleDIV{
// 					Text: &lark.MessageContentCardObjectText{
// 						Tag:     "lark_md",
// 						Content: "- text1\n- text2",
// 					},
// 				},
// 				lark.MessageContentCardModuleNote{
// 					Elements: []lark.MessageContentCardElement{
// 						lark.MessageContentCardObjectText{
// 							Tag:     "lark_md",
// 							Content: "hi",
// 						},
// 					},
// 				},
// 			},
// 		},
// 	})
// 	as.Nil(err)
// 	as.NotNil(resp)
// 	as.NotEmpty(resp.MessageID)
// 	as.NotNil(res)
// 	as.NotEmpty(res.RequestID)
// }
//
// func Test_BatchSend(t *testing.T) {
// 	as := assert.New(t)
//
// 	card := lark.MessageContentCard{
// 		Header: &lark.MessageContentCardHeader{
// 			Template: "",
// 			Title: &lark.MessageContentCardObjectText{
// 				Tag:     "plain_text",
// 				Content: "1",
// 			},
// 		},
// 		Config: &lark.MessageContentCardConfig{
// 			EnableForward: true,
// 		},
// 		Modules: []lark.MessageContentCardModule{
// 			lark.MessageContentCardModuleDIV{
// 				Text: &lark.MessageContentCardObjectText{
// 					Tag:     "plain_text",
// 					Content: "1",
// 				},
// 				Fields: nil,
// 				Extra:  nil,
// 			},
// 		},
// 	}
//
// 	resp, _, err := AppAllPermission.Ins().Message.BatchSendOldRawMessage(ctx, &lark.BatchSendOldRawMessageReq{
// 		MsgType: lark.MsgTypeInteractive,
// 		Card:    card,
// 		OpenIDs: []string{UserAdmin.OpenID},
// 	})
// 	as.Nil(err)
// 	as.NotNil(resp)
// 	as.NotEmpty(resp.MessageID)
// 	as.Empty(resp.InvalidOpenIDs)
// }
//
// func testSendText(t *testing.T) string {
// 	as := assert.New(t)
// 	text := "test " + strconv.FormatInt(time.Now().Unix(), 10)
// 	resp, _, err := AppAllPermission.Ins().Message.Send().ToChatID(ChatForSendMessage.ChatID).SendText(ctx, text)
// 	as.Nil(err)
//
// 	return resp.MessageID
// }
//
// func testSendImage(t *testing.T) string {
// 	as := assert.New(t)
//
// 	imageKey := "img_v2_094a8a5c-ae93-4602-9416-4d875cc9a96g"
// 	resp, _, err := AppAllPermission.Ins().Message.Send().ToChatID(ChatForSendMessage.ChatID).SendImage(ctx, imageKey)
// 	as.Nil(err)
//
// 	return resp.MessageID
// }
