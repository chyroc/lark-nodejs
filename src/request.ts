export interface RequestBody {
  getBody: ()=>any,
}

// RawRequestReq is the parameter that composes the lark sdk request
export interface RawRequestReq<T extends RequestBody> {
  scope: string        // api domain, such as Auth, Chat, Mail
  api: string        // api name, as in CreateMailGroup
  method: string        // http request method, such as GET, POST
  url: string        // http request url
  body?: T  // http request body, query, path and other parameter information
  is_file?: boolean          // send body data as a file
  need_tenant_accessToken?: boolean          // do you need TenantAccessToken
  need_app_accessToken?: boolean          // do you need AppAccessToken
  need_user_accessToken?: boolean          // do you need UserAccessToken
  need_helpdesk_auth?: boolean          // do you need HelpdeskAccessToken
  method_option?: any// *MethodOption // method option, such as userAccessToken
}

export interface Response {
  // request method
  method: string
  // request url
  url: string
  // request id, if you got some error and oncall lark/feishu team, please with this request id
  request_id: string
  status_code: number   // http response status code
  header: any // http response header
  content_length: number   // http response content length
}
