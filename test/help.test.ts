import { Lark } from '../src'

function isInCI(): boolean {
  return !!process.env.IN_CI
}

class App {
  appID: string
  appSecret: string
  customURL: string
  customSecret: string

  constructor(props: any) {
    this.appID = props.appID || ''
    this.appSecret = props.appSecret || ''
    this.customURL = props.customURL || ''
    this.customSecret = props.customSecret || ''
  }

  ins() {
    if (isInCI()) {
      return new Lark({
        appID: this.appID,
        appSecret: this.appSecret,
        timeout: 1000 * 20
      })
    } else {
      return new Lark({
        appID: this.appID,
        appSecret: this.appSecret,
        timeout: 1000 * 20
// 		lark.WithLogger(lark.NewLoggerStdout(), lark.LogLevelTrace),
      })
    }
  }

  customBot() {
    return new Lark({
      customURL: this.customURL,
      customSecret: this.customSecret,
      timeout: 1000 * 20
    })
  }
}

export const appNoPermission = new App({
  appID: process.env.LARK_APP_NO_PERMISSION_APP_ID,
  appSecret: process.env.LARK_APP_NO_PERMISSION_APP_SECRET
})

export const appAllPermission = new App({
  appID: process.env.LARK_APP_ALL_PERMISSION_APP_ID,
  appSecret: process.env.LARK_APP_ALL_PERMISSION_APP_SECRET
})

export const appCustomBotNoValid = new App({
  customURL: process.env.LARK_APP_CUSTOM_BOT_NO_VALID_WEBHOOK_URL
})

export const appCustomBotCheckCanSendWord = new App({
  customURL: process.env.LARK_APP_CUSTOM_BOT_CHECK_CAN_SEND_WEBHOOK_URL
})

export const appCustomBotCheckSign = new App({
  customURL: process.env.LARK_APP_CUSTOM_BOT_CHECK_SIGN_WEBHOOK_URL,
  customSecret: process.env.LARK_APP_CUSTOM_BOT_CHECK_SIGN_SIGN
})

class Helpdesk {
  appID: string
  appSecret: string
  id: string
  token: string

  constructor(props: any) {
    this.appID = props.appID || ''
    this.appSecret = props.appSecret || ''
    this.id = props.id || ''
    this.token = props.token || ''
  }

  ins() {
    return new Lark({
      appID: this.appID,
      appSecret: this.appSecret,
      helpdeskID: this.id,
      helpdeskToken: this.token,
      timeout: 1000 * 20
    })
  }
}

export const helpdeskAllPermission = new Helpdesk({
  appID: process.env.LARK_APP_ALL_PERMISSION_APP_ID,
  appSecret: process.env.LARK_APP_ALL_PERMISSION_APP_SECRET,
  id: process.env.LARK_HELPDESK_ALL_PERMISSION_ID,
  token: process.env.LARK_HELPDESK_ALL_PERMISSION_TOKEN
})

class User {
  userID: string
  openID: string
  name: string
  accessToken: { [key: string]: string }
  refreshToken: { [key: string]: string }

  constructor(props: any) {
    this.userID = props.userID || ''
    this.openID = props.openID || ''
    this.name = props.name || ''
    this.accessToken = props.accessToken || {}
    this.refreshToken = props.refreshToken || {}
  }

  oneAccessToken(): string {
    for (const p in this.accessToken) {
      if (this.accessToken && this.accessToken.hasOwnProperty(p) && this.accessToken[p] !== undefined) {
        return this.accessToken[p]
      }
    }
    return ''
  }
}

export const userAdmin = new User({
  userID: process.env.LARK_USER_ADMIN_USER_ID,
  openID: process.env.LARK_USER_ADMIN_OPEN_ID,
  name: process.env.LARK_USER_ADMIN_NAME,
  accessToken: {
    [process.env.LARK_APP_ALL_PERMISSION_APP_ID as string]: process.env.LARK_ACCESS_TOKEN_ALL_PERMISSION_APP
  },
  refreshToken: {
    [process.env.LARK_APP_ALL_PERMISSION_APP_ID as string]: process.env.LARK_REFRESH_TOKEN_ALL_PERMISSION_APP
  }
})


class Chat {
  chatID: string
  name: string

  constructor(props: any) {
    this.chatID = props.chatID || ''
    this.name = props.name || ''
  }
}


// 这个群公共，必须设置「群公共」三个字
export const chatContainALLPermissionApp = new Chat({
  chatID: process.env.LARK_CHAT_CONTAINS_APP_PERMISSION_APP_CHAT_ID,
  name: '包含「lark-sdk」的群'
})

export const chatNotContainALLPermissionApp = new Chat({
  chatID: process.env.LARK_CHAT_NOT_CONTAINS_APP_PERMISSION_APP_CHAT_ID,
  name: '不包含「lark-sdk」的群'
})

export const chatForSendMessage = new Chat({
  chatID: process.env.LARK_CHAT_FOR_SEND_MSG_CHAT_ID,
  name: 'for-send-message'
})

class File {
  key: string

  constructor(props: any) {
    this.key = props.key || ''
  }
}

export const file1 = new File({
  key: process.env.LARK_FILE_KEY_TEST_FILE_1_PNG // this is file of ./test/file_1.png
})

export const file2 = new File({
  key: process.env.LARK_FILE_KEY_TEST_FILE_2_DOC // ./test/file_2.docx
})

class Approval {
  code: string

  constructor(props: any) {
    this.code = props.code || ''
  }
}

export const approvalALLField = new Approval({
  code: process.env.LARK_APPROVAL_ALL_FIELD
})

describe('config', () => {
  it('', async () => {
    expect(appNoPermission.appID).toBeDefined()
    expect(appNoPermission.appSecret).toBeDefined()
    expect(appAllPermission.appID).toBeDefined()
    expect(appAllPermission.appSecret).toBeDefined()
    expect(userAdmin.userID).toBeDefined()
    expect(userAdmin.openID).toBeDefined()
    expect(chatContainALLPermissionApp.chatID).toBeDefined()
    expect(chatNotContainALLPermissionApp.chatID).toBeDefined()
    expect(chatForSendMessage.chatID).toBeDefined()
    expect(file1.key).toBeDefined()
    expect(file2.key).toBeDefined()
  })
})

// type fakeHTTPWriter struct {
// 	header http.Header
// 	code   int
// 	lock   sync.Mutex
// 	data   []byte
// }
//
// func newFakeHTTPWriter() *fakeHTTPWriter {
// 	return &fakeHTTPWriter{
// 		header: map[string][]string{},
// 	}
// }
//
// func (r *fakeHTTPWriter) Header() http.Header {
// 	return r.header
// }
//
// func (r *fakeHTTPWriter) Write(bytes []byte) (int, error) {
// 	r.lock.Lock()
// 	defer r.lock.Unlock()
//
// 	r.data = append(r.data, bytes...)
// 	return len(bytes), nil
// }
//
// func (r *fakeHTTPWriter) WriteHeader(statusCode int) {
// 	r.code = statusCode
// }
//
// func (r *fakeHTTPWriter) str() string {
// 	return string(r.data)
// }
