export default class LarkError extends Error {
  scope: string
  api: string
  code: number
  msg: string

  constructor(scope: string, api: string, code: number, msg: string) {
    super(`${scope}#${api} ${code}: ${msg}`)

    this.scope = scope
    this.api = api
    this.code = code
    this.msg = msg
  }
}
