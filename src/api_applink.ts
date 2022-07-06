import { Lark } from './lark'
import { encodeQuery } from './helper'
import { RequestBody } from './request'

export default class AppLinkService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // openLark 打开飞书
  //
  // 唤起飞书客户端
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-lark
  openLark(request: AppLink.OpenLarkReq): string {
    return joinAppLinkURL('https://applink.feishu.cn/client/op/open', new OpenLarkReq(request))
  }
  // openMiniProgram 打开小程序
  //
  // 打开一个小程序或者小程序中的一个页面
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-a-gadget
  openMiniProgram(request: AppLink.OpenMiniProgramReq): string {
    return joinAppLinkURL(
      'https://applink.feishu.cn/client/mini_program/open',
      new OpenMiniProgramReq(request)
    )
  }
  // openWebApp 打开网页应用
  //
  // 打开一个已安装的H5应用
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-an-h5-app
  openWebApp(request: AppLink.OpenWebAppReq): string {
    return joinAppLinkURL(
      'https://applink.feishu.cn/client/web_app/open',
      new OpenWebAppReq(request)
    )
  }
  // openChat 打开聊天页面
  //
  // 打开一个聊天页面，单聊会话或群聊会话
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-a-chat-page
  openChat(request: AppLink.OpenChatReq): string {
    return joinAppLinkURL('https://applink.feishu.cn/client/chat/open', new OpenChatReq(request))
  }
  // openCalender 打开日历
  //
  // 跳转并打开日历，打开界面为上一次离开日历时的视图。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-calender/open-a-calender
  openCalender(request: AppLink.OpenCalenderReq): string {
    return joinAppLinkURL(
      'https://applink.feishu.cn/client/calendar/open',
      new OpenCalenderReq(request)
    )
  }
  // openCalenderView 打开日历（支持定义视图和日期）
  //
  // 打开日历tab，并支持定义跳转到具体视图和具体日期。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-calender/open-a-calendar-and-support-to-define-view-and-date
  openCalenderView(request: AppLink.OpenCalenderViewReq): string {
    return joinAppLinkURL(
      'https://applink.feishu.cn/client/calendar/view',
      new OpenCalenderViewReq(request)
    )
  }
  // openCalenderEventCreate 打开日程创建页
  //
  // 跳转日历 tab 并进入日程创建页面，用户可新建日程。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-calender/open-the-schedule-creation-page
  openCalenderEventCreate(request: AppLink.OpenCalenderEventCreateReq): string {
    return joinAppLinkURL(
      'https://applink.feishu.cn/client/calendar/event/create',
      new OpenCalenderEventCreateReq(request)
    )
  }
  // openCalenderAccount 打开第三方日历账户管理页
  //
  // 打开第三方日历账户管理页，方便用户添加或导入谷歌/Exchange 日历。移动端打开页面，PC端打开弹层。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-calender/open
  openCalenderAccount(request: AppLink.OpenCalenderAccountReq): string {
    return joinAppLinkURL(
      'https://applink.feishu.cn/client/calendar/account',
      new OpenCalenderAccountReq(request)
    )
  }
  // openDocs 打开云文档
  //
  // 打开云文档（docs）。使用外部浏览器打开文档时，提供入口从飞书中打开。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-docs
  openDocs(request: AppLink.OpenDocsReq): string {
    return joinAppLinkURL('https://applink.feishu.cn/client/docs/open', new OpenDocsReq(request))
  }
  // openBot 打开机器人会话
  //
  // 打开一个机器人的聊天窗。
  // 如果访问用户没有机器人的可用性，将看到相关的引导提示。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-a-bot
  openBot(request: AppLink.OpenBotReq): string {
    return joinAppLinkURL('https://applink.feishu.cn/client/bot/open', new OpenBotReq(request))
  }
  // openSSOLogin 打开SSO登录页
  //
  // 在飞书客户端中打开租户在admin后台配置的SSO登录页
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-the-sso-login-page
  openSSOLogin(request: AppLink.OpenSSOLoginReq): string {
    return joinAppLinkURL(
      'https://applink.feishu.cn/client/passport/sso_login',
      new OpenSSOLoginReq(request)
    )
  }
  // openWebURL 打开PC端内web-view访问指定URL
  //
  // 用户在PC端点击这类applink，不必跳转外部浏览器，可以直接在聊天的侧边栏、或飞书的独立窗口中打开指定的网页。
  // 可以配置这类applink在消息卡片的“查看详情”跳转上，使用户连贯地消费消息中的详情内容。
  //
  //
  // ![image.png](//sf3-cn.feishucdn.com/obj/open-platform-opendoc/761f68be5274fea59bf8145489633c88_Z6KZ6NyGCh.png?lazyload=true&width=1649&height=962)
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-the-web-view-in-feishu-to-access-the-specified-url
  openWebURL(request: AppLink.OpenWebURLReq): string {
    return joinAppLinkURL(
      'https://applink.feishu.cn/client/web_url/open',
      new OpenWebURLReq(request)
    )
  }
  // openTask 打开任务
  //
  // 打开任务首页，查看任务。
  //
  // **什么是「任务」**：[任务](https://www.feishu.cn/hc/zh-CN/articles/798052212434)是一个轻量级的团队任务管理工具，可有效帮助成员：集中管理任务、追踪任务进度、推进团队协作。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-todo/open-todo
  openTask(request: AppLink.OpenTaskReq): string {
    return joinAppLinkURL('https://applink.feishu.cn/client/todo/open', new OpenTaskReq(request))
  }
  // openTaskCreate 创建任务
  //
  // 唤起创建任务页。
  //
  // **什么是「任务」**：[任务](https://www.feishu.cn/hc/zh-CN/articles/798052212434)是一个轻量级的团队任务管理工具，可有效帮助成员：集中管理任务、追踪任务进度、推进团队协作。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-todo/create-task
  openTaskCreate(request: AppLink.OpenTaskCreateReq): string {
    return joinAppLinkURL(
      'https://applink.feishu.cn/client/todo/create',
      new OpenTaskCreateReq(request)
    )
  }
  // openTaskDetail 打开任务详情页
  //
  // 唤起任务详情页。
  //
  // **什么是「任务」**：[任务](https://www.feishu.cn/hc/zh-CN/articles/798052212434)是一个轻量级的团队任务管理工具，可有效帮助成员：集中管理任务、追踪任务进度、推进团队协作。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-todo/open-the-task-details-page
  openTaskDetail(request: AppLink.OpenTaskDetailReq): string {
    return joinAppLinkURL(
      'https://applink.feishu.cn/client/todo/detail',
      new OpenTaskDetailReq(request)
    )
  }
  // openTaskTab 打开任务tab页
  //
  // 唤起任务tab页，跳转到指定tab。
  //
  // **什么是「任务」**：[任务](https://www.feishu.cn/hc/zh-CN/articles/798052212434)是一个轻量级的团队任务管理工具，可有效帮助成员：集中管理任务、追踪任务进度、推进团队协作。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-todo/open-the-task-tab-page
  openTaskTab(request: AppLink.OpenTaskTabReq): string {
    return joinAppLinkURL('https://applink.feishu.cn/client/todo/view', new OpenTaskTabReq(request))
  }
  // openScan 打开扫一扫功能
  //
  // 通过applink 打开飞书扫一扫功能
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/uYjL24iN/applink-protocol/supported-protocol/open-scan-function
  openScan(request: AppLink.OpenScanReq): string {
    return joinAppLinkURL('https://applink.feishu.cn/client/qrcode/main', new OpenScanReq(request))
  }
}

export declare namespace AppLink {
  export interface OpenLarkReq {}

  export interface OpenMiniProgramReq {
    appId: string // 小程序 appId(可从「开发者后台-凭证与基础信息」获取)
    mode?: string // PC小程序启动模式, 枚举值包括: `sidebar-semi`: 聊天的侧边栏打开 `appCenter`: 工作台中打开 `window`: 独立大窗口打开 `window-semi`: 独立小窗口打开, 飞书3.33版本开始支持此模式
    height?: string // 自定义独立窗口高度（仅当`mode`为`window`时生效）, 飞书5.12版本开始支持 最小值: 480 最大值: 屏幕的高度 默认值: 飞书窗口的高度
    width?: string // 自定义独立窗口宽度（仅当`mode`为`window`时生效）, 飞书5.12版本开始支持 最小值: 640 最大值: 屏幕的宽度 默认值: 飞书窗口的宽度
    relaunch?: string // 是否重新加载指定页面。该参数仅当applink中传入path参数时才会生效。枚举值包括: `false`: 与[小程序打开逻辑](https://open.feishu.cn/document/uYjL24iN/uMjNzUjLzYzM14yM2MTN#c2bcfa33)一致。如果用户已打开相同path的页面与参数, 则保持页面原先状态, 不会重新加载；其他情况下会清空原来的页面栈, 打开指定页 `true`: 无论用户是否打开相同path的页面与参数, 一定会清空原来的页面栈, 打开指定页（与[relaunch](https://open.feishu.cn/document/uYjL24iN/uEDM04SMwQjLxADN)的逻辑一致）<BR>飞书5.9版本开始支持该参数, 默认值为`false`
    path?: string // 需要跳转的页面路径, 路径后可以带参数。也可以使用 path_android、path_ios、path_pc 参数对不同的客户端指定不同的path
    path_android?: string // 同 path 参数, Android 端会优先使用该参数, 如果该参数不存在, 则会使用 path 参数
    path_ios?: string // 同 path 参数, iOS 端会优先使用该参数, 如果该参数不存在, 则会使用 path 参数
    path_pc?: string // 同 path 参数, PC 端会优先使用该参数, 如果该参数不存在, 则会使用 path 参数
    min_lk_ver?: string // 指定 AppLink 协议能够兼容的最小飞书版本, 使用三位版本号 x.y.z。如果当前飞书版本号小于min_lk_ver, 打开该 AppLink 会显示为兼容页面
  }

  export interface OpenWebAppReq {
    appId: string // H5应用的 appId(可从「开发者后台-凭证与基础信息」获取)
    mode?: string // 打开H5应用的容器模式, 枚举值包括  `appCenter`: 在工作台打开, 3.20版本开始支持（缺省值）   `window`: 在独立窗口打开, 3.20版本开始支持   `sidebar`: 在侧边栏打开, 3.40版本开始支持   `window-semi`: 在独立窗口以小屏形式打开, 5.10版本开始支持
    height?: string // 自定义独立窗口高度（仅当`mode`为`window`时生效）, 飞书5.12版本开始支持 最小值: 480 最大值: 屏幕的高度 默认值: 飞书窗口的高度
    width?: string // 自定义独立窗口宽度（仅当`mode`为`window`时生效）, 飞书5.12版本开始支持 最小值: 640 最大值: 屏幕的宽度 默认值: 飞书窗口的宽度
    path?: string // 访问H5应用的具体某个页面, path参数将替换H5应用URL的path部分。如果需要携带参数, 将预期的H5应用URL的query作为applink的query即可, 具体参考示例2。 注意: 1、path中不应该出现#和?字符, 否则会导致最终的H5页面URL结构异常）  2、可以使用 path_android、path_ios、path_pc 参数对不同的客户端指定不同的path  3.20版本开始支持
    path_android?: string // 同 path 参数, Android 端会优先使用该参数, 如果该参数不存在, 则会使用 path 参数。  3.20版本开始支持
    path_ios?: string // 同 path 参数, iOS 端会优先使用该参数, 如果该参数不存在, 则会使用 path 参数  3.20版本开始支持
    path_pc?: string // 同 path 参数, PC 端会优先使用该参数, 如果该参数不存在, 则会使用 path 参数  3.20版本开始支持
    lk_target_url?: string // 访问H5应用的具体某个页面, 针对网页path中包含#或?字符时, 可使用该参数, 而不使用`path`参数。需要填写H5应用某个具体页面的完整URL（协议名`scheme`和域名`domain`应当与开发者后台配置的应用首页相匹配）, 并进行[URL encode](https://meyerweb.com/eric/tools/dencoder/)后使用。具体参考示例3  飞书V5.12版本开始支持。飞书低版本中无法解析此参数, 将打开应用首页
  }

  export interface OpenChatReq {
    openId?: string // 用户 openId, 获取方式可以参考文档: [如何获得 User ID、Open ID 和 Union ID？](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get)
    openChatId?: string // 会话ID, 包括单聊会话和群聊会话。是以 'oc' 开头的字段, 获取方式可参考文档 [群ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description)<BR>示例值: oc_41e7bdf4877cfc316136f4ccf6c32613
  }

  export interface OpenCalenderReq {}

  export interface OpenCalenderViewReq {
    type?: string // 视图类型, 枚举值包括: `day`: 日视图  `three_day`: 三日视图, 仅移动端支持  `week`: 周视图, 仅PC端支持    `month`: 月视图  `meeting`: 会议室视图, 仅PC端支持   `list`: 列表视图, 仅移动端支持
    date?: string // 日期, {unixTime}格式
  }

  export interface OpenCalenderEventCreateReq {
    startTime?: string // 开始日期, {unixTime}格式
    endTime?: string // 结束日期, {unixTime}格式
    summary?: string // 日程主题, 中文可使用encodeURIComponent方法生成
  }

  export interface OpenCalenderAccountReq {}

  export interface OpenDocsReq {
    URL: string // 要打开的云文档URL
  }

  export interface OpenBotReq {
    appId: string // 机器人的appId
  }

  export interface OpenSSOLoginReq {
    sso_domain: string // 租户的域名, 填写的是租户在admin后台配置的租户域名信息。当在admin后台改动租户的域名时, 需要同步修改applink该参数值
    tenant_name: string // 租户名, 用于在切换租户时, 客户端展示即将登录到的租户名称, 一般填写公司名即可
  }

  export interface OpenWebURLReq {
    url: string // 指定需要在客户端内打开的具体链接, 需要执行encodeURIComponent, 4.2+版本支持lark协议
    mode: string // 打开的容器模式, 枚举值包括: `sidebar-semi` 在侧边栏打开； `window` 在独立窗口打开
    height?: string // 自定义独立窗口高度（仅当`mode`为`window`时生效）, 飞书5.12版本开始支持 最小值: 480 最大值: 屏幕的高度 默认值: 飞书窗口的高度
    width?: string // 自定义独立窗口宽度（仅当`mode`为`window`时生效）, 飞书5.12版本开始支持 最小值: 640 最大值: 屏幕的宽度 默认值: 飞书窗口的宽度
  }

  export interface OpenTaskReq {}

  export interface OpenTaskCreateReq {}

  export interface OpenTaskDetailReq {
    guid: string // 全局唯一的taskId（global unique ID）, 通过[飞书任务的 OpenAPI](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/overview) 获取
    mode?: string // 默认在im场景下, 打开任务详情页面； `mode=app`, 在任务tab中打开详情页面
  }

  export interface OpenTaskTabReq {
    tab: string // String类型, 枚举值包括: `all` 进行中；  `assign_to_me` 由我处理；  `assign_from_me` 我分配的；  `followed`  我关注的；  `completed` 已完成
  }

  export interface OpenScanReq {}
}

class OpenLarkReq {
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

class OpenMiniProgramReq {
  appId?: any
  mode?: any
  height?: any
  width?: any
  relaunch?: any
  path?: any
  path_android?: any
  path_ios?: any
  path_pc?: any
  min_lk_ver?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      appId: this.appId,
      mode: this.mode,
      height: this.height,
      width: this.width,
      relaunch: this.relaunch,
      path: this.path,
      path_android: this.path_android,
      path_ios: this.path_ios,
      path_pc: this.path_pc,
      min_lk_ver: this.min_lk_ver
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenWebAppReq {
  appId?: any
  mode?: any
  height?: any
  width?: any
  path?: any
  path_android?: any
  path_ios?: any
  path_pc?: any
  lk_target_url?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      appId: this.appId,
      mode: this.mode,
      height: this.height,
      width: this.width,
      path: this.path,
      path_android: this.path_android,
      path_ios: this.path_ios,
      path_pc: this.path_pc,
      lk_target_url: this.lk_target_url
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenChatReq {
  openId?: any
  openChatId?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      openId: this.openId,
      openChatId: this.openChatId
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenCalenderReq {
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

class OpenCalenderViewReq {
  type?: any
  date?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      type: this.type,
      date: this.date
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenCalenderEventCreateReq {
  startTime?: any
  endTime?: any
  summary?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      startTime: this.startTime,
      endTime: this.endTime,
      summary: this.summary
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenCalenderAccountReq {
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

class OpenDocsReq {
  URL?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      URL: this.URL
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenBotReq {
  appId?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      appId: this.appId
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenSSOLoginReq {
  sso_domain?: any
  tenant_name?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      sso_domain: this.sso_domain,
      tenant_name: this.tenant_name
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenWebURLReq {
  url?: any
  mode?: any
  height?: any
  width?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      url: this.url,
      mode: this.mode,
      height: this.height,
      width: this.width
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenTaskReq {
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

class OpenTaskCreateReq {
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

class OpenTaskDetailReq {
  guid?: any
  mode?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      guid: this.guid,
      mode: this.mode
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenTaskTabReq {
  tab?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      tab: this.tab
    }
  }

  getPath(path: string) {
    return path
  }
}

class OpenScanReq {
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

function joinAppLinkURL(baseURL: string, args: RequestBody): string {
  const body = args.getBody() as { [key: string]: any }
  const q = encodeQuery(body)
  if (q) {
    return baseURL + '?' + q
  }
  return baseURL
}
