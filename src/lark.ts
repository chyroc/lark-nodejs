import axios, { AxiosInstance } from 'axios'
import { RawRequestReq, RequestBody, Response } from './request'
import * as FormData from 'form-data'
import LarkError from './err'
import Store, { StoreMemory } from './store'

import ACSService from './api_acs'
import AIService from './api_ai'
import AdminService from './api_admin'
import AppLinkService from './api_applink'
import ApplicationService from './api_application'
import ApprovalService from './api_approval'
import AttendanceService from './api_attendance'
import AuthService from './api_auth'
import BaikeService from './api_baike'
import BitableService from './api_bitable'
import BotService from './api_bot'
import CalendarService from './api_calendar'
import ChatService from './api_chat'
import ContactService from './api_contact'
import DriveService from './api_drive'
import EHRService from './api_ehr'
import EventService from './api_event'
import FileService from './api_file'
import HelpdeskService from './api_helpdesk'
import HireService from './api_hire'
import HumanAuthService from './api_humanauth'
import JssdkService from './api_jssdk'
import MailService from './api_mail'
import MeetingRoomService from './api_meetingroom'
import MessageService from './api_message'
import OKRService from './api_okr'
import PassportService from './api_passport'
import SearchService from './api_search'
import TaskService from './api_task'
import TenantService from './api_tenant'
import VCService from './api_vc'

export interface LarkProps {
  appID?: string
  appSecret?: string
  helpdeskID?: string
  helpdeskToken?: string
  encryptKey?: string
  verificationToken?: string
  customURL?: string
  customSecret?: string
  isISV?: boolean
  tenantKey?: string

  store?: Store
  timeout?: number
}

export class Lark {
  public openBaseURL: string
  public wwwBaseURL: string

  public appID?: string
  public appSecret?: string
  public helpdeskID?: string
  public helpdeskToken?: string
  public encryptKey?: string
  public verificationToken?: string
  public customURL?: string
  public customSecret?: string
  public isISV?: boolean
  public tenantKey?: string

  public timeout?: number
  public store?: Store
  public httpClient: AxiosInstance

  acs: ACSService
  ai: AIService
  admin: AdminService
  applink: AppLinkService
  application: ApplicationService
  approval: ApprovalService
  attendance: AttendanceService
  auth: AuthService
  baike: BaikeService
  bitable: BitableService
  bot: BotService
  calendar: CalendarService
  chat: ChatService
  contact: ContactService
  drive: DriveService
  ehr: EHRService
  event: EventService
  file: FileService
  helpdesk: HelpdeskService
  hire: HireService
  humanauth: HumanAuthService
  jssdk: JssdkService
  mail: MailService
  meetingroom: MeetingRoomService
  message: MessageService
  okr: OKRService
  passport: PassportService
  search: SearchService
  task: TaskService
  tenant: TenantService
  vc: VCService

  constructor(option: LarkProps) {
    this.openBaseURL = 'https://open.feishu.cn'
    this.wwwBaseURL = 'https://www.feishu.cn'

    this.appID = option.appID
    this.appSecret = option.appSecret
    this.helpdeskID = option.helpdeskID
    this.helpdeskToken = option.helpdeskToken
    this.encryptKey = option.encryptKey
    this.verificationToken = option.verificationToken
    this.customURL = option.customURL
    this.customSecret = option.customSecret
    this.isISV = option.isISV
    this.tenantKey = option.tenantKey

    this.timeout = option.timeout
    this.store = option.store || new StoreMemory()
    this.httpClient = axios.create({
      maxRedirects: 0,
      validateStatus: function() {
        return true
      }
    })

    this.acs = new ACSService({ lark: this })
    this.ai = new AIService({ lark: this })
    this.admin = new AdminService({ lark: this })
    this.applink = new AppLinkService({ lark: this })
    this.application = new ApplicationService({ lark: this })
    this.approval = new ApprovalService({ lark: this })
    this.attendance = new AttendanceService({ lark: this })
    this.auth = new AuthService({ lark: this })
    this.baike = new BaikeService({ lark: this })
    this.bitable = new BitableService({ lark: this })
    this.bot = new BotService({ lark: this })
    this.calendar = new CalendarService({ lark: this })
    this.chat = new ChatService({ lark: this })
    this.contact = new ContactService({ lark: this })
    this.drive = new DriveService({ lark: this })
    this.ehr = new EHRService({ lark: this })
    this.event = new EventService({ lark: this })
    this.file = new FileService({ lark: this })
    this.helpdesk = new HelpdeskService({ lark: this })
    this.hire = new HireService({ lark: this })
    this.humanauth = new HumanAuthService({ lark: this })
    this.jssdk = new JssdkService({ lark: this })
    this.mail = new MailService({ lark: this })
    this.meetingroom = new MeetingRoomService({ lark: this })
    this.message = new MessageService({ lark: this })
    this.okr = new OKRService({ lark: this })
    this.passport = new PassportService({ lark: this })
    this.search = new SearchService({ lark: this })
    this.task = new TaskService({ lark: this })
    this.tenant = new TenantService({ lark: this })
    this.vc = new VCService({ lark: this })
  }

  public async RawRequest<T extends RequestBody, K>(
    req: RawRequestReq<T>
  ): Promise<{
    data: K
    response: Response
  }> {
    const method = req.method
    const url = req.body?.getPath ? req.body?.getPath(req.url) : req.url

    console.log(`[DEBUG] ${req.scope}#${req.api} ${method} ${url} req`, req)

    const headers = {} as { [key: string]: string }

    if (req.need_user_accessToken && !!this.verificationToken) {
      headers['Authorization'] = `Bearer ${this.verificationToken}`
    } else if (req.need_tenant_accessToken) {
      const { data } = await this.auth.getTenantAccessToken()
      headers['Authorization'] = `Bearer ${data.token}`
    } else if (req.need_app_accessToken) {
      const { data } = await this.auth.getAppAccessToken()
      headers['Authorization'] = `Bearer ${data.token}`
    }
    if (req.need_helpdesk_auth) {
      //  		r.Headers[httpRequestHeaderHelpdeskAuth] = base64.StdEncoding.EncodeToString([]byte(ins.helpdeskID + ":" + ins.helpdeskToken))
      headers['X-Lark-Helpdesk-Authorization'] = Buffer.from(
        `${this.helpdeskID}:${this.helpdeskToken}`
      ).toString('base64')
    }
    let body = req.body?.getBody()
    if (req.is_file && body) {
      const formData = new FormData()
      for (const key in body) {
        if (body.hasOwnProperty(key) && body[key] !== undefined) {
          const val = body[key]
          if (Buffer.isBuffer(val)) {
            formData.append(key, val)
          } else {
            formData.append(key, val)
          }
        }
      }
      body = formData
    }
    const res = await this.httpClient.request({
      method,
      url,
      headers,
      data: body,
      responseType: req.is_file_download ? 'arraybuffer' : undefined
    })
    const data = res.data
    console.log(`[DEBUG] ${req.scope}#${req.api} resp`, JSON.stringify(data))

    if (data.code !== undefined && data.code !== 0) {
      let msg = data.msg
      data.error &&
        data.error.field_violations &&
        data.error.field_violations.forEach((item: { field: string; description: string }) => {
          msg += `, ${item.field} ${item.description}`
        })
      throw new LarkError(req.scope, req.api, data.code, msg)
    }

    if (req.is_file_download) {
      // @ts-ignore
      return { data: { file: res.data }, response: res }
    }

    if (req.api === 'GetBotInfo' && res.data.bot) {
      // @ts-ignore
      return { data: res.data.bot, response: {} }
    } else if (res.data.data) {
      // @ts-ignore
      return { data: res.data.data, response: {} }
    }

    // @ts-ignore
    return { data: res.data, response: {} }
  }
}
