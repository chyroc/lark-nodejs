import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class ContactService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // searchUserOld 以用户身份搜索其他用户的信息, 无法搜索到外部企业或已离职的用户。
  //
  // 调用该接口需要申请 `搜索用户` 权限。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMTM4UjLzEDO14yMxgTN
  async searchUserOld(
    request: Contact.SearchUserOldReq
  ): Promise<{
    data: Contact.SearchUserOldResp
    response: Response
  }> {
    const req: RawRequestReq<SearchUserOldReq> = {
      scope: 'Contact',
      api: 'SearchUserOld',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/search/v1/user',
      body: new SearchUserOldReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SearchUserOldReq, Contact.SearchUserOldResp>(req)
  }
  // createUser 使用该接口向通讯录创建一个用户, 可以理解为员工入职。创建用户后只返回有数据权限的数据。具体的数据权限的与字段的对应关系请参照[应用权限](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // - 新增用户的所有部门必须都在当前应用的通讯录授权范围内才允许新增用户, 如果想要在根部门下新增用户, 必须要有全员权限。
  // - 应用商店应用无权限调用此接口。
  // - 创建用户后, 会给用户发送邀请短信/邮件, 用户在操作同意后才可访问团队。
  // - 返回数据中不返回手机号, 如果需要请重新查询用户信息获取手机号
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/create
  async createUser(
    request: Contact.CreateUserReq
  ): Promise<{
    data: Contact.CreateUserResp
    response: Response
  }> {
    const req: RawRequestReq<CreateUserReq> = {
      scope: 'Contact',
      api: 'CreateUser',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/users',
      body: new CreateUserReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateUserReq, Contact.CreateUserResp>(req)
  }
  // deleteUser 该接口向通讯录删除一个用户信息, 可以理解为员工离职。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // 若用户归属部门A、部门B, 应用的通讯录权限范围必须包括部门A和部门B才可以删除用户。应用商店应用无权限调用接口。用户可以在删除员工时设置删除员工数据的接收者, 如果不设置则由其leader接收, 如果该员工没有leader, 则会将该员工的数据删除。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/delete
  async deleteUser(
    request: Contact.DeleteUserReq
  ): Promise<{
    data: Contact.DeleteUserResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteUserReq> = {
      scope: 'Contact',
      api: 'DeleteUser',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/users/:user_id',
      body: new DeleteUserReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteUserReq, Contact.DeleteUserResp>(req)
  }
  // getUser 该接口用于获取通讯录中单个用户的信息。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get
  async getUser(
    request: Contact.GetUserReq
  ): Promise<{
    data: Contact.GetUserResp
    response: Response
  }> {
    const req: RawRequestReq<GetUserReq> = {
      scope: 'Contact',
      api: 'GetUser',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/users/:user_id',
      body: new GetUserReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetUserReq, Contact.GetUserResp>(req)
  }
  // getUserList 基于部门ID获取, 获取部门直属用户列表。
  //
  // [常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN).
  // 部门ID 必填, 根部门的部门ID为0
  // - 使用 user_access_token 情况下根据个人组织架构的通讯录可见范围进行权限过滤, 返回个人组织架构通讯录范围（[登录企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内可见的用户数据。
  // - 使用tenant_access_token, 会根据应用通讯录的范围进行权限过滤。 如果请求的部门ID为0, 则校验应用是否具有全员通讯录权限； 如果是非0的部门ID, 则会验证应用是否具有该部门的通讯录权限。 无权限返回无权限错误码, 有权限则返回对应部门下的直接用户列表。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/find_by_department
  async getUserList(
    request: Contact.GetUserListReq
  ): Promise<{
    data: Contact.GetUserListResp
    response: Response
  }> {
    const req: RawRequestReq<GetUserListReq> = {
      scope: 'Contact',
      api: 'GetUserList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/users/find_by_department',
      body: new GetUserListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetUserListReq, Contact.GetUserListResp>(req)
  }
  // getUserListOld 基于部门ID获取部门下直属用户列表。
  //
  // [常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  // - 使用 user_access_token 情况下根据个人组织架构的通讯录可见范围进行权限过滤, 返回个人组织架构通讯录范围（[登陆企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内可见的用户数据。
  // -  tenant_access_token  基于应用通讯录范围进行权限鉴定。由于 department_id 是非必填参数, 填与不填存在<b>两种数据权限校验与返回</b>情况: 1、请求设置了 department_id
  // （根部门为0）, 会检验所带部门ID是否具有通讯录权限（如果带上
  // department_id=0 会校验是否有全员权限）, 有则返回部门下直属的成员列表, 否则提示无部门权限的错误码返回。 2、请求未带
  // department_id 参数, 则会返回权限范围内的独立用户（权限范围直接包含了某用户, 则该用户视为权限范围内的独立用户）。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/list
  async getUserListOld(
    request: Contact.GetUserListOldReq
  ): Promise<{
    data: Contact.GetUserListOldResp
    response: Response
  }> {
    const req: RawRequestReq<GetUserListOldReq> = {
      scope: 'Contact',
      api: 'GetUserListOld',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/users',
      body: new GetUserListOldReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetUserListOldReq, Contact.GetUserListOldResp>(req)
  }
  // batchGetUser 为了更好地提升该接口的安全性, 我们对其进行了升级, 请尽快迁移至[新版本>>](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get)
  //
  // 该接口用于批量获取用户详细信息。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uIzNz4iM3MjLyczM
  async batchGetUser(
    request: Contact.BatchGetUserReq
  ): Promise<{
    data: Contact.BatchGetUserResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetUserReq> = {
      scope: 'Contact',
      api: 'BatchGetUser',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v1/user/batch_get',
      body: new BatchGetUserReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<BatchGetUserReq, Contact.BatchGetUserResp>(req)
  }
  // updateUserPatch 该接口用于更新通讯录中用户的字段, 未传递的参数不会更新。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/patch
  async updateUserPatch(
    request: Contact.UpdateUserPatchReq
  ): Promise<{
    data: Contact.UpdateUserPatchResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateUserPatchReq> = {
      scope: 'Contact',
      api: 'UpdateUserPatch',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/users/:user_id',
      body: new UpdateUserPatchReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateUserPatchReq, Contact.UpdateUserPatchResp>(req)
  }
  // updateUser 该接口用于更新通讯录中用户的字段。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // 应用需要拥有待更新用户的通讯录授权, 如果涉及到用户部门变更, 还需要同时拥有所有新部门的通讯录授权。应用商店应用无权限调用此接口。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/update
  async updateUser(
    request: Contact.UpdateUserReq
  ): Promise<{
    data: Contact.UpdateUserResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateUserReq> = {
      scope: 'Contact',
      api: 'UpdateUser',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/users/:user_id',
      body: new UpdateUserReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateUserReq, Contact.UpdateUserResp>(req)
  }
  // batchGetUserByID 通过该接口, 可使用手机号/邮箱获取用户的 ID 信息, 具体获取支持的 ID 类型包括 open_id、user_id、union_id, 可通过查询参数指定。
  //
  // 如果查询的手机号、邮箱不存在, 或者无权限查看对应的用户, 则返回的open_id为空。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch_get_id
  async batchGetUserByID(
    request: Contact.BatchGetUserByIDReq
  ): Promise<{
    data: Contact.BatchGetUserByIDResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetUserByIDReq> = {
      scope: 'Contact',
      api: 'BatchGetUserByID',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/users/batch_get_id',
      body: new BatchGetUserByIDReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<BatchGetUserByIDReq, Contact.BatchGetUserByIDResp>(req)
  }
  // batchGetUserByIDOld 根据用户邮箱或手机号查询用户 open_id 和 user_id, 支持批量查询。
  //
  // 调用该接口需要申请 `通过手机号或邮箱获取用户 ID` 权限。 只能查询到应用可用性范围内的用户 ID, 不在范围内的用户会表现为不存在。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUzMyUjL1MjM14SNzITN
  async batchGetUserByIDOld(
    request: Contact.BatchGetUserByIDOldReq
  ): Promise<{
    data: Contact.BatchGetUserByIDOldResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetUserByIDOldReq> = {
      scope: 'Contact',
      api: 'BatchGetUserByIDOld',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/user/v1/batch_get_id',
      body: new BatchGetUserByIDOldReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<BatchGetUserByIDOldReq, Contact.BatchGetUserByIDOldResp>(req)
  }
  // createDepartment 该接口用于向通讯录中创建部门。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // 只可在应用的通讯录权限范围内的部门下创建部门。若需要在根部门下创建子部门, 则应用通讯录权限范围需要设置为“全部成员”。应用商店应用无权限调用此接口。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/create
  async createDepartment(
    request: Contact.CreateDepartmentReq
  ): Promise<{
    data: Contact.CreateDepartmentResp
    response: Response
  }> {
    const req: RawRequestReq<CreateDepartmentReq> = {
      scope: 'Contact',
      api: 'CreateDepartment',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/departments',
      body: new CreateDepartmentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateDepartmentReq, Contact.CreateDepartmentResp>(req)
  }
  // getDepartment 该接口用于向通讯录获取单个部门信息。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // 使用tenant_access_token时, 应用需要拥有待查询部门的通讯录授权。如果需要获取根部门信息, 则需要拥有全员权限。
  // 使用user_access_token时, 用户需要有待查询部门的可见性, 如果需要获取根部门信息, 则要求员工可见所有人。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/get
  async getDepartment(
    request: Contact.GetDepartmentReq
  ): Promise<{
    data: Contact.GetDepartmentResp
    response: Response
  }> {
    const req: RawRequestReq<GetDepartmentReq> = {
      scope: 'Contact',
      api: 'GetDepartment',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/departments/:department_id',
      body: new GetDepartmentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDepartmentReq, Contact.GetDepartmentResp>(req)
  }
  // getDepartmentList 通过部门ID获取部门的子部门列表。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // 部门ID 必填, 根部门的部门ID 为0
  // - 使用 user_access_token 时, 返回该用户组织架构可见性范围（[登陆企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内的所有可见部门。当进行递归查询时, 只筛查最多1000个部门的可见性。
  // - 使用
  // tenant_access_token 则基于应用的通讯录权限范围进行权限校验与过滤。
  // 如果部门ID为0, 会检验应用是否有全员通讯录权限, 如果是非0 部门ID, 则会校验应用是否有该部门的通讯录权限。无部门权限返回无部门通讯录权限错误码, 有权限则返回部门下子部门列表（根据fetch_child决定是否递归）。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/children
  async getDepartmentList(
    request: Contact.GetDepartmentListReq
  ): Promise<{
    data: Contact.GetDepartmentListResp
    response: Response
  }> {
    const req: RawRequestReq<GetDepartmentListReq> = {
      scope: 'Contact',
      api: 'GetDepartmentList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/departments/:department_id/children',
      body: new GetDepartmentListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDepartmentListReq, Contact.GetDepartmentListResp>(req)
  }
  // getDepartmentListOld 该接口用于获取当前部门子部门列表。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // - 使用 user_access_token 时, 返回该用户组织架构可见性范围（[登陆企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内的所有可见部门。当进行递归查询时, 只筛查最多1000个部门的可见性。
  // - 使用
  // tenant_access_token 则基于应用的通讯录权限范围进行权限校验与过滤。由于
  // parent_department_id 是非必填参数, 填与不填存在<b>两种数据权限校验与返回</b>情况:
  // 1、请求设置了
  // parent_department_id 为A（根部门0）, 会检验A是否在通讯录权限内, 若在( parent_department_id=0 时会校验是否为全员权限）, 则返回部门下子部门列表（根据fetch_child决定是否递归）, 否则返回无部门通讯录权限错误码。
  // 2、请求未带
  // parent_department_id 参数, 如通讯录范围为全员权限, 只返回根部门ID(部门ID为0), 否则返回根据通讯录范围配置的部门ID及子部门(根据
  // fetch_child 决定是否递归)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/list
  async getDepartmentListOld(
    request: Contact.GetDepartmentListOldReq
  ): Promise<{
    data: Contact.GetDepartmentListOldResp
    response: Response
  }> {
    const req: RawRequestReq<GetDepartmentListOldReq> = {
      scope: 'Contact',
      api: 'GetDepartmentListOld',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/departments',
      body: new GetDepartmentListOldReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDepartmentListOldReq, Contact.GetDepartmentListOldResp>(req)
  }
  // getParentDepartment 该接口用来递归获取部门父部门的信息, 并按照由子到父的顺序返回有权限的父部门信息列表。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // 使用tenant_access_token时, 该接口只返回可见性范围内的父部门信息
  // 例如: A >>B>>C>>D四级部门, 通讯录权限只到B, 那么查询D部门的parent, 会返回B和C两级部门。
  // 使用user_access_token时, 该接口只返回对于用户可见的父部门信息
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/parent
  async getParentDepartment(
    request: Contact.GetParentDepartmentReq
  ): Promise<{
    data: Contact.GetParentDepartmentResp
    response: Response
  }> {
    const req: RawRequestReq<GetParentDepartmentReq> = {
      scope: 'Contact',
      api: 'GetParentDepartment',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/departments/parent',
      body: new GetParentDepartmentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetParentDepartmentReq, Contact.GetParentDepartmentResp>(req)
  }
  // searchDepartment 搜索部门, 用户通过关键词查询可见的部门数据, 部门可见性需要管理员在后台配置。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // 部门存在, 但用户搜索不到并不一定是搜索有问题, 可能是管理员在后台配置了权限控制, 导致用户无法搜索到该部门
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/search
  async searchDepartment(
    request: Contact.SearchDepartmentReq
  ): Promise<{
    data: Contact.SearchDepartmentResp
    response: Response
  }> {
    const req: RawRequestReq<SearchDepartmentReq> = {
      scope: 'Contact',
      api: 'SearchDepartment',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/departments/search',
      body: new SearchDepartmentReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SearchDepartmentReq, Contact.SearchDepartmentResp>(req)
  }
  // updateDepartmentPatch 该接口用于更新通讯录中部门的信息中的任一个字段。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // 调用该接口需要具有该部门以及更新操作涉及的部门的通讯录权限。应用商店应用无权限调用此接口。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/patch
  async updateDepartmentPatch(
    request: Contact.UpdateDepartmentPatchReq
  ): Promise<{
    data: Contact.UpdateDepartmentPatchResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateDepartmentPatchReq> = {
      scope: 'Contact',
      api: 'UpdateDepartmentPatch',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/departments/:department_id',
      body: new UpdateDepartmentPatchReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateDepartmentPatchReq, Contact.UpdateDepartmentPatchResp>(req)
  }
  // updateDepartment 该接口用于更新当前部门所有信息。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // - 调用该接口需要具有该部门以及更新操作涉及的部门的通讯录权限。应用商店应用无权限调用此接口。
  // - 没有填写的字段会被置为空值（order字段除外）。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update
  async updateDepartment(
    request: Contact.UpdateDepartmentReq
  ): Promise<{
    data: Contact.UpdateDepartmentResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateDepartmentReq> = {
      scope: 'Contact',
      api: 'UpdateDepartment',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/departments/:department_id',
      body: new UpdateDepartmentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateDepartmentReq, Contact.UpdateDepartmentResp>(req)
  }
  // deleteDepartment 该接口用于向通讯录中删除部门。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
  //
  // 应用需要同时拥有待删除部门及其父部门的通讯录授权。应用商店应用无权限调用该接口。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/delete
  async deleteDepartment(
    request: Contact.DeleteDepartmentReq
  ): Promise<{
    data: Contact.DeleteDepartmentResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteDepartmentReq> = {
      scope: 'Contact',
      api: 'DeleteDepartment',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/departments/:department_id',
      body: new DeleteDepartmentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteDepartmentReq, Contact.DeleteDepartmentResp>(req)
  }
  // unbindDepartmentChat 通过该接口将部门群转为普通群。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/unbind_department_chat
  async unbindDepartmentChat(
    request: Contact.UnbindDepartmentChatReq
  ): Promise<{
    data: Contact.UnbindDepartmentChatResp
    response: Response
  }> {
    const req: RawRequestReq<UnbindDepartmentChatReq> = {
      scope: 'Contact',
      api: 'UnbindDepartmentChat',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/departments/unbind_department_chat',
      body: new UnbindDepartmentChatReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UnbindDepartmentChatReq, Contact.UnbindDepartmentChatResp>(req)
  }
  // createContactGroup 使用该接口创建用户组, 请注意创建用户组时应用的通讯录权限范围需为“全部员工”, 否则会创建失败, [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/create
  async createContactGroup(
    request: Contact.CreateContactGroupReq
  ): Promise<{
    data: Contact.CreateContactGroupResp
    response: Response
  }> {
    const req: RawRequestReq<CreateContactGroupReq> = {
      scope: 'Contact',
      api: 'CreateContactGroup',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group',
      body: new CreateContactGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateContactGroupReq, Contact.CreateContactGroupResp>(req)
  }
  // updateContactGroup 使用该接口更新用户组信息, 请注意更新用户组时应用的通讯录权限范围需为“全部员工”, 否则会更新失败。[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/patch
  async updateContactGroup(
    request: Contact.UpdateContactGroupReq
  ): Promise<{
    data: Contact.UpdateContactGroupResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateContactGroupReq> = {
      scope: 'Contact',
      api: 'UpdateContactGroup',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group/:group_id',
      body: new UpdateContactGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateContactGroupReq, Contact.UpdateContactGroupResp>(req)
  }
  // deleteContactGroup 通过该接口可删除企业中的用户组, 请注意删除用户组时应用的通讯录权限范围需为“全部员工”, 否则会删除失败, [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/delete
  async deleteContactGroup(
    request: Contact.DeleteContactGroupReq
  ): Promise<{
    data: Contact.DeleteContactGroupResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteContactGroupReq> = {
      scope: 'Contact',
      api: 'DeleteContactGroup',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group/:group_id',
      body: new DeleteContactGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteContactGroupReq, Contact.DeleteContactGroupResp>(req)
  }
  // getContactGroup 根据用户组 ID 查询某个用户组的基本信息, 支持查询普通用户组和动态用户组。请确保应用的通讯录权限范围里包括该用户组或者是“全部员工”, [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/get
  async getContactGroup(
    request: Contact.GetContactGroupReq
  ): Promise<{
    data: Contact.GetContactGroupResp
    response: Response
  }> {
    const req: RawRequestReq<GetContactGroupReq> = {
      scope: 'Contact',
      api: 'GetContactGroup',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group/:group_id',
      body: new GetContactGroupReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetContactGroupReq, Contact.GetContactGroupResp>(req)
  }
  // getContactGroupList 通过该接口可查询企业的用户组列表, 可分别查询普通用户组或动态用户组。如果应用的通讯录权限范围是“全部员工”, 则可获取企业全部用户组列表。如果应用的通讯录权限范围不是“全部员工”, 则仅可获取通讯录权限范围内的用户组。[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/simplelist
  async getContactGroupList(
    request: Contact.GetContactGroupListReq
  ): Promise<{
    data: Contact.GetContactGroupListResp
    response: Response
  }> {
    const req: RawRequestReq<GetContactGroupListReq> = {
      scope: 'Contact',
      api: 'GetContactGroupList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group/simplelist',
      body: new GetContactGroupListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetContactGroupListReq, Contact.GetContactGroupListResp>(req)
  }
  // getContactMemberGroupList 通过该接口可查询该用户所属的用户组列表, 可分别查询普通用户组和动态用户组。如果应用的通讯录权限范围是“全部员工”, 则可获取该员工所属的全部用户组列表。如果应用的通讯录权限范围不是“全部员工”, 则仅可获取通讯录权限范围内该员工所属的用户组。[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/member_belong
  async getContactMemberGroupList(
    request: Contact.GetContactMemberGroupListReq
  ): Promise<{
    data: Contact.GetContactMemberGroupListResp
    response: Response
  }> {
    const req: RawRequestReq<GetContactMemberGroupListReq> = {
      scope: 'Contact',
      api: 'GetContactMemberGroupList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group/member_belong',
      body: new GetContactMemberGroupListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetContactMemberGroupListReq, Contact.GetContactMemberGroupListResp>(
      req
    )
  }
  // addContactGroupMember 向用户组中添加成员(目前成员仅支持用户, 未来会支持部门), 如果应用的通讯录权限范围是“全部员工”, 则可将任何成员添加到任何用户组。如果应用的通讯录权限范围不是“全部员工”, 则仅可将通讯录权限范围中的成员添加到通讯录权限范围的用户组中, [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/add
  async addContactGroupMember(
    request: Contact.AddContactGroupMemberReq
  ): Promise<{
    data: Contact.AddContactGroupMemberResp
    response: Response
  }> {
    const req: RawRequestReq<AddContactGroupMemberReq> = {
      scope: 'Contact',
      api: 'AddContactGroupMember',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group/:group_id/member/add',
      body: new AddContactGroupMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<AddContactGroupMemberReq, Contact.AddContactGroupMemberResp>(req)
  }
  // batchAddContactGroupMember 向普通用户组中批量添加成员(目前仅支持添加用户, 暂不支持添加部门）, 如果应用的通讯录权限范围是“全部员工”, 则可将任何成员添加到任何用户组。如果应用的通讯录权限范围不是“全部员工”, 则仅可将通讯录权限范围中的成员添加到通讯录权限范围的用户组中, [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // 请求体中的member_type, 目前仅支持user, 未来将支持department。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_add
  async batchAddContactGroupMember(
    request: Contact.BatchAddContactGroupMemberReq
  ): Promise<{
    data: Contact.BatchAddContactGroupMemberResp
    response: Response
  }> {
    const req: RawRequestReq<BatchAddContactGroupMemberReq> = {
      scope: 'Contact',
      api: 'BatchAddContactGroupMember',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group/:group_id/member/batch_add',
      body: new BatchAddContactGroupMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchAddContactGroupMemberReq,
      Contact.BatchAddContactGroupMemberResp
    >(req)
  }
  // deleteContactGroupMember 从用户组中移除成员 (目前成员仅支持用户, 未来会支持部门), 如果应用的通讯录权限范围是“全部员工”, 则可将任何成员移出任何用户组。如果应用的通讯录权限范围不是“全部员工”, 则仅可将通讯录权限范围中的成员从通讯录权限范围的用户组中移除, [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/remove
  async deleteContactGroupMember(
    request: Contact.DeleteContactGroupMemberReq
  ): Promise<{
    data: Contact.DeleteContactGroupMemberResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteContactGroupMemberReq> = {
      scope: 'Contact',
      api: 'DeleteContactGroupMember',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group/:group_id/member/remove',
      body: new DeleteContactGroupMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteContactGroupMemberReq, Contact.DeleteContactGroupMemberResp>(
      req
    )
  }
  // batchDeleteContactGroupMember 从普通用户组中批量移除成员 (目前仅支持移除用户, 暂不支持移除部门）。如果应用的通讯录权限范围是“全部员工”, 则可将任何成员移出任何用户组。如果应用的通讯录权限范围不是“全部员工”, 则仅可将通讯录权限范围中的成员从通讯录权限范围的用户组中移除, [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // 请求体中的member_type, 目前仅支持user, 未来将支持department。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_remove
  async batchDeleteContactGroupMember(
    request: Contact.BatchDeleteContactGroupMemberReq
  ): Promise<{
    data: Contact.BatchDeleteContactGroupMemberResp
    response: Response
  }> {
    const req: RawRequestReq<BatchDeleteContactGroupMemberReq> = {
      scope: 'Contact',
      api: 'BatchDeleteContactGroupMember',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group/:group_id/member/batch_remove',
      body: new BatchDeleteContactGroupMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      BatchDeleteContactGroupMemberReq,
      Contact.BatchDeleteContactGroupMemberResp
    >(req)
  }
  // getContactGroupMember 通过该接口可查询某个用户组的成员列表（支持查询成员中的用户和部门）, 本接口支持普通用户组和动态用户组。如果应用的通讯录权限范围是“全部员工”, 则可查询企业内任何用户组的成员列表。如果应用的通讯录权限范围不是“全部员工”, 则仅可查询通讯录权限范围中的用户组的成员列表, [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/simplelist
  async getContactGroupMember(
    request: Contact.GetContactGroupMemberReq
  ): Promise<{
    data: Contact.GetContactGroupMemberResp
    response: Response
  }> {
    const req: RawRequestReq<GetContactGroupMemberReq> = {
      scope: 'Contact',
      api: 'GetContactGroupMember',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/group/:group_id/member/simplelist',
      body: new GetContactGroupMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetContactGroupMemberReq, Contact.GetContactGroupMemberResp>(req)
  }
  // getEmployeeTypeEnumList 该接口用于获取员工的人员类型
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list
  async getEmployeeTypeEnumList(
    request: Contact.GetEmployeeTypeEnumListReq
  ): Promise<{
    data: Contact.GetEmployeeTypeEnumListResp
    response: Response
  }> {
    const req: RawRequestReq<GetEmployeeTypeEnumListReq> = {
      scope: 'Contact',
      api: 'GetEmployeeTypeEnumList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/employee_type_enums',
      body: new GetEmployeeTypeEnumListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetEmployeeTypeEnumListReq, Contact.GetEmployeeTypeEnumListResp>(req)
  }
  // updateEmployeeTypeEnumPatch 更新自定义人员类型
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/update
  async updateEmployeeTypeEnumPatch(
    request: Contact.UpdateEmployeeTypeEnumPatchReq
  ): Promise<{
    data: Contact.UpdateEmployeeTypeEnumPatchResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateEmployeeTypeEnumPatchReq> = {
      scope: 'Contact',
      api: 'UpdateEmployeeTypeEnumPatch',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/employee_type_enums/:enum_id',
      body: new UpdateEmployeeTypeEnumPatchReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateEmployeeTypeEnumPatchReq,
      Contact.UpdateEmployeeTypeEnumPatchResp
    >(req)
  }
  // deleteEmployeeTypeEnum 删除自定义人员类型
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/delete
  async deleteEmployeeTypeEnum(
    request: Contact.DeleteEmployeeTypeEnumReq
  ): Promise<{
    data: Contact.DeleteEmployeeTypeEnumResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteEmployeeTypeEnumReq> = {
      scope: 'Contact',
      api: 'DeleteEmployeeTypeEnum',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/employee_type_enums/:enum_id',
      body: new DeleteEmployeeTypeEnumReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteEmployeeTypeEnumReq, Contact.DeleteEmployeeTypeEnumResp>(req)
  }
  // createEmployeeTypeEnum 新增自定义人员类型
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/create
  async createEmployeeTypeEnum(
    request: Contact.CreateEmployeeTypeEnumReq
  ): Promise<{
    data: Contact.CreateEmployeeTypeEnumResp
    response: Response
  }> {
    const req: RawRequestReq<CreateEmployeeTypeEnumReq> = {
      scope: 'Contact',
      api: 'CreateEmployeeTypeEnum',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/employee_type_enums',
      body: new CreateEmployeeTypeEnumReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateEmployeeTypeEnumReq, Contact.CreateEmployeeTypeEnumResp>(req)
  }
  // getContactCustomAttrList 获取企业自定义的用户字段配置信息
  //
  // 调用该接口前, 需要先确认[企业管理员](https://www.feishu.cn/hc/zh-CN/articles/360049067822)在[企业管理后台 - 组织架构 - 成员字段管理](http://www.feishu.cn/admin/contacts/employee-field-new/custom) 自定义字段管理栏开启了“允许开放平台API调用“。
  // ![通讯录.gif](//sf3-cn.feishucdn.com/obj/open-platform-opendoc/544738c94f13ef0b9ebaff53a5133cc7_E9EGMkXyzX.gif)
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/custom_attr/list
  async getContactCustomAttrList(
    request: Contact.GetContactCustomAttrListReq
  ): Promise<{
    data: Contact.GetContactCustomAttrListResp
    response: Response
  }> {
    const req: RawRequestReq<GetContactCustomAttrListReq> = {
      scope: 'Contact',
      api: 'GetContactCustomAttrList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/custom_attrs',
      body: new GetContactCustomAttrListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetContactCustomAttrListReq, Contact.GetContactCustomAttrListResp>(
      req
    )
  }
  // createContactUnit 使用该接口创建单位, 需要有更新单位的权限。注意: 单位功能属于旗舰版付费功能, 企业需开通对应版本才可以创建单位。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/create
  async createContactUnit(
    request: Contact.CreateContactUnitReq
  ): Promise<{
    data: Contact.CreateContactUnitResp
    response: Response
  }> {
    const req: RawRequestReq<CreateContactUnitReq> = {
      scope: 'Contact',
      api: 'CreateContactUnit',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/unit',
      body: new CreateContactUnitReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<CreateContactUnitReq, Contact.CreateContactUnitResp>(req)
  }
  // updateContactUnit 调用该接口, 需要有更新单位的权限。注意: 单位功能属于旗舰版付费功能, 企业需开通对应版本才可以修改单位
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/patch
  async updateContactUnit(
    request: Contact.UpdateContactUnitReq
  ): Promise<{
    data: Contact.UpdateContactUnitResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateContactUnitReq> = {
      scope: 'Contact',
      api: 'UpdateContactUnit',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/unit/:unit_id',
      body: new UpdateContactUnitReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<UpdateContactUnitReq, Contact.UpdateContactUnitResp>(req)
  }
  // deleteContactUnit 使用该接口删除单位, 需要有更新单位的权限。注意: 如果单位的单位类型被其它的业务使用, 不允许删除。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/delete
  async deleteContactUnit(
    request: Contact.DeleteContactUnitReq
  ): Promise<{
    data: Contact.DeleteContactUnitResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteContactUnitReq> = {
      scope: 'Contact',
      api: 'DeleteContactUnit',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/unit/:unit_id',
      body: new DeleteContactUnitReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<DeleteContactUnitReq, Contact.DeleteContactUnitResp>(req)
  }
  // getContactUnit 调用该接口获取单位信息, 需有获取单位的权限
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/get
  async getContactUnit(
    request: Contact.GetContactUnitReq
  ): Promise<{
    data: Contact.GetContactUnitResp
    response: Response
  }> {
    const req: RawRequestReq<GetContactUnitReq> = {
      scope: 'Contact',
      api: 'GetContactUnit',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/unit/:unit_id',
      body: new GetContactUnitReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetContactUnitReq, Contact.GetContactUnitResp>(req)
  }
  // getContactUnitList 通过该接口获取企业的单位列表, 需获取单位的权限
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list
  async getContactUnitList(
    request: Contact.GetContactUnitListReq
  ): Promise<{
    data: Contact.GetContactUnitListResp
    response: Response
  }> {
    const req: RawRequestReq<GetContactUnitListReq> = {
      scope: 'Contact',
      api: 'GetContactUnitList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/unit',
      body: new GetContactUnitListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetContactUnitListReq, Contact.GetContactUnitListResp>(req)
  }
  // bindContactUnitDepartment 通过该接口建立部门与单位的绑定关系, 需更新单位的权限, 需对应部门的通讯录权限。由于单位是旗舰版付费功能, 企业需开通相关版本, 否则会绑定失败
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/bind_department
  async bindContactUnitDepartment(
    request: Contact.BindContactUnitDepartmentReq
  ): Promise<{
    data: Contact.BindContactUnitDepartmentResp
    response: Response
  }> {
    const req: RawRequestReq<BindContactUnitDepartmentReq> = {
      scope: 'Contact',
      api: 'BindContactUnitDepartment',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/unit/bind_department',
      body: new BindContactUnitDepartmentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<BindContactUnitDepartmentReq, Contact.BindContactUnitDepartmentResp>(
      req
    )
  }
  // unbindContactUnitDepartment 通过该接口解除部门与单位的绑定关系, 需更新单位的权限, 需对应部门的通讯录权限。由于单位是旗舰版付费功能, 企业需开通相关功能, 否则会解绑失败
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/unbind_department
  async unbindContactUnitDepartment(
    request: Contact.UnbindContactUnitDepartmentReq
  ): Promise<{
    data: Contact.UnbindContactUnitDepartmentResp
    response: Response
  }> {
    const req: RawRequestReq<UnbindContactUnitDepartmentReq> = {
      scope: 'Contact',
      api: 'UnbindContactUnitDepartment',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/unit/unbind_department',
      body: new UnbindContactUnitDepartmentReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      UnbindContactUnitDepartmentReq,
      Contact.UnbindContactUnitDepartmentResp
    >(req)
  }
  // getContactUnitDepartmentList 通过该接口获取单位绑定的部门列表, 需具有获取单位的权限
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list_department
  async getContactUnitDepartmentList(
    request: Contact.GetContactUnitDepartmentListReq
  ): Promise<{
    data: Contact.GetContactUnitDepartmentListResp
    response: Response
  }> {
    const req: RawRequestReq<GetContactUnitDepartmentListReq> = {
      scope: 'Contact',
      api: 'GetContactUnitDepartmentList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/unit/list_department',
      body: new GetContactUnitDepartmentListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<
      GetContactUnitDepartmentListReq,
      Contact.GetContactUnitDepartmentListResp
    >(req)
  }
  // getContactScopeList 该接口用于获取应用被授权可访问的通讯录范围, 包括可访问的部门列表、用户列表和用户组列表。
  //
  // 授权范围为全员时, 返回的部门列表为该企业所有的一级部门；否则返回的部门为管理员在设置授权范围时勾选的部门（不包含勾选部门的子部门）。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/scope/list
  async getContactScopeList(
    request: Contact.GetContactScopeListReq
  ): Promise<{
    data: Contact.GetContactScopeListResp
    response: Response
  }> {
    const req: RawRequestReq<GetContactScopeListReq> = {
      scope: 'Contact',
      api: 'GetContactScopeList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/contact/v3/scopes',
      body: new GetContactScopeListReq(request),
      method_option: false,
      need_tenant_accessToken: true
    }
    return this.cli.RawRequest<GetContactScopeListReq, Contact.GetContactScopeListResp>(req)
  }
}

export declare namespace Contact {
  export interface SearchUserOldReq {
    query: string // 要执行搜索的字符串, 一般为用户名。
    page_size?: number // 分页大小, 最小为 1, 最大为 200, 默认为 20。
    page_token?: string // 分页标识, 获取首页不需要填写, 获取下一页时传入上一页返回的分页标识值。 请注意此字段的值并没有特殊含义, 请使用每次请求所返回的标识值。
  }

  export interface SearchUserOldResp {
    has_more: boolean // 是否还有更多用户, 值为 true 表示存在下一页。
    page_token: string // 分页标识, 存在下一页的时候返回。下次请求带上此标识可以获取下一页的用户。
    users?: SearchUserOldRespUser[] // 搜索到的用户列表。
  }

  export interface SearchUserOldRespUser {
    avatar: SearchUserOldRespUserAvatar // 用户的头像信息。
    department_ids?: string[] // 用户所在的部门 ID。
    name: string // 用户名。
    open_id: string // 用户的 open_id。
    user_id: string // 用户的 user_id, 只有已申请 `获取用户UserID` 权限的企业自建应用返回此字段。
  }

  export interface SearchUserOldRespUserAvatar {
    avatar_72: string // 用户的头像图片 URL, 72×72px。
    avatar_240: string // 用户的头像图片 URL, 240×240px。
    avatar_640: string // 用户的头像图片 URL, 640×640px。
    avatar_origin: string // 用户的头像图片 URL, 原始大小。
  }

  export interface searchUserOldResp {
    code: number // 返回码, 非 0 表示失败。
    msg: string // 对返回码的文本描述。
    data: SearchUserOldResp
  }

  export interface CreateUserReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: open_id: 用户的 open id, union_id: 用户的 union id, user_id: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 不同 ID 的说明以及获取方式参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0), 示例值: "open_department_id", 可选值有: department_id: 以自定义department_id来标识部门, open_department_id: 以open_department_id来标识部门, 默认值: `open_department_id`
    client_token?: string // 根据client_token是否一致来判断是否为同一请求, 示例值: "xxxx-xxxxx-xxx"
    user_id?: string // 租户内用户的唯一标识, 用户的user_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "3e3cf96b"
    name: string // 用户名, 示例值: "张三", 最小长度: `1` 字符
    en_name?: string // 英文名, 示例值: "San Zhang"
    nickname?: string // 别名, 示例值: "Alex Zhang"
    email?: string // 邮箱, 注意非 +86 手机号成员必须同时添加邮箱, 示例值: "zhangsan@gmail.com"
    mobile: string // 手机号, 在本企业内不可重复；未认证企业仅支持添加中国大陆手机号, 通过飞书认证的企业允许添加海外手机号, 注意国际电话区号前缀中必须包含加号 +, 示例值: "中国大陆手机号: 13011111111 或 +8613011111111, 境外手机号: +41446681800"
    mobile_visible?: boolean // 手机号码可见性, true 为可见, false 为不可见, 目前默认为 true。不可见时, 组织员工将无法查看该员工的手机号码, 示例值: false
    gender?: number // 性别, 示例值: 1, 可选值有: 0: 保密, 1: 男, 2: 女
    avatar_key?: string // 头像的文件Key, 可通过“消息与群组/消息/图片信息”中的“上传图片”接口上传并获取头像文件 Key, 示例值: "2500c7a9-5fff-4d9a-a2de-3d59614ae28g"
    department_ids?: string[] // 用户所属部门的ID列表, 一个用户可属于多个部门, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0), 示例值: od-4e6ac4d14bcd5071a37a39de902c7141
    leader_user_id?: string // 用户的直接主管的用户ID, ID值与查询参数中的user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    city?: string // 城市, 示例值: "杭州"
    country?: string // 国家或地区Code缩写, 具体写入格式请参考 [国家/地区码表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/country-code-description), 示例值: "CN"
    work_station?: string // 工位, 示例值: "北楼-H34"
    join_time?: number // 入职时间, 示例值: 2147483647
    employee_no?: string // 工号, 示例值: "1"
    employee_type: number // 员工类型, 可选值有: `1`: 正式员工, `2`: 实习生, `3`: 外包, `4`: 劳务, `5`: 顾问, 同时可读取到自定义员工类型的 int 值, 可通过下方接口获取到该租户的自定义员工类型的名称, [获取人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list), 示例值: 1
    orders?: CreateUserReqOrder[] // 用户排序信息
    custom_attrs?: CreateUserReqCustomAttr[] // 自定义字段, 请确保你的组织管理员已在管理后台/组织架构/成员字段管理/自定义字段管理/全局设置中开启了“允许开放平台 API 调用“, 否则该字段不会生效/返回。
    enterprise_email?: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 示例值: "demo@mail.com"
    job_title?: string // 职务, 示例值: "xxxxx"
    ent_email_password?: string // 企业邮箱登录时的密码（已废弃, 无需使用）, 示例值: "-"
  }

  export interface CreateUserReqCustomAttr {
    type?: string // 自定义字段类型, `TEXT`: 文本, `HREF`: 网页, `ENUMERATION`: 枚举, `PICTURE_ENUM`: 图片, `GENERIC_USER`: 用户, [自定义字段相关常见问题](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN), 示例值: "TEXT"
    id?: string // 自定义字段ID, 示例值: "DemoId"
    value?: CreateUserReqCustomAttrValue // 自定义字段取值
  }

  export interface CreateUserReqCustomAttrValue {
    text?: string // 字段类型为`TEXT`时该参数定义字段值, 必填；字段类型为`HREF`时该参数定义网页标题, 必填, 示例值: "DemoText"
    url?: string // 字段类型为 HREF 时, 该参数定义默认 URL, 示例值: "http://www.feishu.cn"
    pc_url?: string // 字段类型为 HREF 时, 该参数定义PC端 URL, 示例值: "http://www.feishu.cn"
    option_id?: string // 字段类型为 ENUMERATION 或 PICTURE_ENUM 时, 该参数定义选项值, 示例值: "edcvfrtg"
    generic_user?: CreateUserReqCustomAttrValueGenericUser // 字段类型为 GENERIC_USER 时, 该参数定义引用人员
  }

  export interface CreateUserReqCustomAttrValueGenericUser {
    id: string // 用户的user_id [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "9b2fabg5"
    type: number // 用户类型    1: 用户, 示例值: 1
  }

  export interface CreateUserReqOrder {
    department_id?: string // 排序信息对应的部门ID, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview), 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141"
    user_order?: number // 用户在其直属部门内的排序, 数值越大, 排序越靠前, 示例值: 100
    department_order?: number // 用户所属的多个部门间的排序, 数值越大, 排序越靠前, 示例值: 100
  }

  export interface CreateUserResp {
    user: CreateUserRespUser // 用户信息
  }

  export interface CreateUserRespUser {
    union_id: string // 用户的union_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    user_id: string // 租户内用户的唯一标识, 用户的user_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求: 获取用户 user ID
    open_id: string // 用户的open_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    name: string // 用户名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    en_name: string // 英文名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    nickname: string // 别名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    email: string // 邮箱, 注意非 +86 手机号成员必须同时添加邮箱, 字段权限要求: 获取用户邮箱信息
    mobile: string // 手机号, 在本企业内不可重复；未认证企业仅支持添加中国大陆手机号, 通过飞书认证的企业允许添加海外手机号, 注意国际电话区号前缀中必须包含加号 +, 字段权限要求: 获取用户手机号
    mobile_visible: boolean // 手机号码可见性, true 为可见, false 为不可见, 目前默认为 true。不可见时, 组织员工将无法查看该员工的手机号码
    gender: number // 性别, 可选值有: 0: 保密, 1: 男, 2: 女, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户性别, 以应用身份访问通讯录, 读取通讯录
    avatar_key: string // 头像的文件Key, 可通过“消息与群组/消息/图片信息”中的“上传图片”接口上传并获取头像文件 Key
    avatar: CreateUserRespUserAvatar // 用户头像信息, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    status: CreateUserRespUserStatus // 用户状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    department_ids?: string[] // 用户所属部门的ID列表, 一个用户可属于多个部门, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    leader_user_id: string // 用户的直接主管的用户ID, ID值与查询参数中的user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    city: string // 城市, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    country: string // 国家或地区Code缩写, 具体写入格式请参考 [国家/地区码表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/country-code-description), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    work_station: string // 工位, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    join_time: number // 入职时间, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    is_tenant_manager: boolean // 是否是租户超级管理员, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    employee_no: string // 工号, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    employee_type: number // 员工类型, 可选值有: `1`: 正式员工, `2`: 实习生, `3`: 外包, `4`: 劳务, `5`: 顾问, 同时可读取到自定义员工类型的 int 值, 可通过下方接口获取到该租户的自定义员工类型的名称, [获取人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    orders?: CreateUserRespUserOrder[] // 用户排序信息, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    custom_attrs?: CreateUserRespUserCustomAttr[] // 自定义字段, 请确保你的组织管理员已在管理后台/组织架构/成员字段管理/自定义字段管理/全局设置中开启了“允许开放平台 API 调用“, 否则该字段不会生效/返回, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    enterprise_email: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    job_title: string // 职务, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇员信息, 以应用身份访问通讯录, 读取通讯录
    is_frozen: boolean // 是否暂停用户
    ent_email_password: string // 企业邮箱登录时的密码（已废弃, 无需使用）
  }

  export interface CreateUserRespUserAvatar {
    avatar_72: string // 72*72像素头像链接
    avatar_240: string // 240*240像素头像链接
    avatar_640: string // 640*640像素头像链接
    avatar_origin: string // 原始头像链接
  }

  export interface CreateUserRespUserCustomAttr {
    type: string // 自定义字段类型, `TEXT`: 文本, `HREF`: 网页, `ENUMERATION`: 枚举, `PICTURE_ENUM`: 图片, `GENERIC_USER`: 用户, [自定义字段相关常见问题](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)
    id: string // 自定义字段ID
    value: CreateUserRespUserCustomAttrValue // 自定义字段取值
  }

  export interface CreateUserRespUserCustomAttrValue {
    text: string // 字段类型为`TEXT`时该参数定义字段值, 必填；字段类型为`HREF`时该参数定义网页标题, 必填
    url: string // 字段类型为 HREF 时, 该参数定义默认 URL
    pc_url: string // 字段类型为 HREF 时, 该参数定义PC端 URL
    option_id: string // 字段类型为 ENUMERATION 或 PICTURE_ENUM 时, 该参数定义选项值
    option_value: string // 选项值
    name: string // 名称
    picture_url: string // 图片链接
    generic_user: CreateUserRespUserCustomAttrValueGenericUser // 字段类型为 GENERIC_USER 时, 该参数定义引用人员
  }

  export interface CreateUserRespUserCustomAttrValueGenericUser {
    id: string // 用户的user_id [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    type: number // 用户类型    1: 用户
  }

  export interface CreateUserRespUserOrder {
    department_id: string // 排序信息对应的部门ID, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)
    user_order: number // 用户在其直属部门内的排序, 数值越大, 排序越靠前
    department_order: number // 用户所属的多个部门间的排序, 数值越大, 排序越靠前
  }

  export interface CreateUserRespUserStatus {
    is_frozen: boolean // 是否暂停
    is_resigned: boolean // 是否离职
    is_activated: boolean // 是否激活
    is_exited: boolean // 是否主动退出, 主动退出一段时间后用户会自动转为已离职
    is_unjoin: boolean // 是否未加入, 需要用户自主确认才能加入团队
  }

  export interface createUserResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateUserResp
  }

  export interface DeleteUserReq {
    user_id: string // 用户ID, 需要与查询参数中的user_id_type类型保持一致, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_chat_acceptor_user_id?: string // 部门群接收者。被删除用户为部门群群主时, 转让群主给指定接收者, 不指定接收者则默认转让给群内第一个入群的人, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    external_chat_acceptor_user_id?: string // 外部群接收者。被删除用户为外部群群主时, 转让群主给指定接收者, 不指定接收者则默认转让给群内与被删除用户在同一组织的第一个入群的人, 如果组织内只有该用户在群里, 则解散外部群, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    docs_acceptor_user_id?: string // 文档接收者。用户被删除时, 其拥有的文档转让给接收者, 不指定接收者则默认转让给直接领导, 如果无直接领导则直接删除文档资源, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    calendar_acceptor_user_id?: string // 日程接收者。用户被删除时, 其拥有的日程转让给接收者, 不指定接收者则默认转让给直接领导, 如果无直接领导则直接删除日程资源, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    application_acceptor_user_id?: string // 应用接收者。用户被删除时, 其创建的应用转让给接收者, 不指定接收者则默认转让给直接领导, 如果无直接领导则不会转移应用, 会造成应用不可用, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    helpdesk_acceptor_user_id?: string // 服务台资源接收者, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
  }

  export interface DeleteUserResp {}

  export interface deleteUserResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteUserResp
  }

  export interface GetUserReq {
    user_id: string // 用户ID, 需要与查询参数中的user_id_type类型保持一致, 示例值: "7be5fg9a"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
  }

  export interface GetUserResp {
    user: GetUserRespUser // 用户信息
  }

  export interface GetUserRespUser {
    union_id: string // 用户的union_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    user_id: string // 租户内用户的唯一标识, 用户的user_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求: 获取用户 user ID
    open_id: string // 用户的open_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    name: string // 用户名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    en_name: string // 英文名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    nickname: string // 别名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    email: string // 邮箱, 注意非 +86 手机号成员必须同时添加邮箱, 字段权限要求: 获取用户邮箱信息
    mobile: string // 手机号, 在本企业内不可重复；未认证企业仅支持添加中国大陆手机号, 通过飞书认证的企业允许添加海外手机号, 注意国际电话区号前缀中必须包含加号 +, 字段权限要求: 获取用户手机号
    mobile_visible: boolean // 手机号码可见性, true 为可见, false 为不可见, 目前默认为 true。不可见时, 组织员工将无法查看该员工的手机号码
    gender: number // 性别, 可选值有: `0`: 保密, `1`: 男, `2`: 女, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户性别, 以应用身份访问通讯录, 读取通讯录
    avatar: GetUserRespUserAvatar // 用户头像信息, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    status: GetUserRespUserStatus // 用户状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    department_ids?: string[] // 用户所属部门的ID列表, 一个用户可属于多个部门, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    leader_user_id: string // 用户的直接主管的用户ID, ID值与查询参数中的user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    city: string // 城市, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    country: string // 国家或地区Code缩写, 具体写入格式请参考 [国家/地区码表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/country-code-description), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    work_station: string // 工位, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    join_time: number // 入职时间, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    is_tenant_manager: boolean // 是否是租户超级管理员, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    employee_no: string // 工号, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    employee_type: number // 员工类型, 可选值有: `1`: 正式员工, `2`: 实习生, `3`: 外包, `4`: 劳务, `5`: 顾问, 同时可读取到自定义员工类型的 int 值, 可通过下方接口获取到该租户的自定义员工类型的名称, [获取人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    orders?: GetUserRespUserOrder[] // 用户排序信息, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    custom_attrs?: GetUserRespUserCustomAttr[] // 自定义字段, 请确保你的组织管理员已在管理后台/组织架构/成员字段管理/自定义字段管理/全局设置中开启了“允许开放平台 API 调用“, 否则该字段不会生效/返回, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    enterprise_email: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    job_title: string // 职务, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
  }

  export interface GetUserRespUserAvatar {
    avatar_72: string // 72*72像素头像链接
    avatar_240: string // 240*240像素头像链接
    avatar_640: string // 640*640像素头像链接
    avatar_origin: string // 原始头像链接
  }

  export interface GetUserRespUserCustomAttr {
    type: string // 自定义字段类型, `TEXT`: 文本, `HREF`: 网页, `ENUMERATION`: 枚举, `PICTURE_ENUM`: 图片, `GENERIC_USER`: 用户, [自定义字段相关常见问题](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)
    id: string // 自定义字段ID
    value: GetUserRespUserCustomAttrValue // 自定义字段取值
  }

  export interface GetUserRespUserCustomAttrValue {
    text: string // 字段类型为`TEXT`时该参数定义字段值, 必填；字段类型为`HREF`时该参数定义网页标题, 必填
    url: string // 字段类型为 HREF 时, 该参数定义默认 URL
    pc_url: string // 字段类型为 HREF 时, 该参数定义PC端 URL
    option_value: string // 选项值
    name: string // 名称
    picture_url: string // 图片链接
    generic_user: GetUserRespUserCustomAttrValueGenericUser // 字段类型为 GENERIC_USER 时, 该参数定义引用人员
  }

  export interface GetUserRespUserCustomAttrValueGenericUser {
    id: string // 用户的user_id [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    type: number // 用户类型    1: 用户
  }

  export interface GetUserRespUserOrder {
    department_id: string // 排序信息对应的部门ID, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)
    user_order: number // 用户在其直属部门内的排序, 数值越大, 排序越靠前
    department_order: number // 用户所属的多个部门间的排序, 数值越大, 排序越靠前
  }

  export interface GetUserRespUserStatus {
    is_frozen: boolean // 是否暂停
    is_resigned: boolean // 是否离职
    is_activated: boolean // 是否激活
    is_exited: boolean // 是否主动退出, 主动退出一段时间后用户会自动转为已离职
    is_unjoin: boolean // 是否未加入, 需要用户自主确认才能加入团队
  }

  export interface getUserResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetUserResp
  }

  export interface GetUserListReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    department_id: string // 填写该字段表示获取该部门下用户, 必填。根部门的部门ID为0, 示例值: "od-xxxxxxxxxxxxx"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/dk53s4Ebp882DYfFaPFbz00L4CMZJrqGdzNyc8BcZtDbwVUvRmQTvyMYicnGWrde9X56TgdBuS+JKiSIkdexPw="
  }

  export interface GetUserListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetUserListRespItem[] // 用户信息列表
  }

  export interface GetUserListRespItem {
    union_id: string // 用户的union_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    user_id: string // 租户内用户的唯一标识, 用户的user_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求: 获取用户 user ID
    open_id: string // 用户的open_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    name: string // 用户名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    en_name: string // 英文名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    nickname: string // 别名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    email: string // 邮箱, 注意非 +86 手机号成员必须同时添加邮箱, 字段权限要求: 获取用户邮箱信息
    mobile: string // 手机号, 在本企业内不可重复；未认证企业仅支持添加中国大陆手机号, 通过飞书认证的企业允许添加海外手机号, 注意国际电话区号前缀中必须包含加号 +, 字段权限要求: 获取用户手机号
    mobile_visible: boolean // 手机号码可见性, true 为可见, false 为不可见, 目前默认为 true。不可见时, 组织员工将无法查看该员工的手机号码
    gender: number // 性别, 可选值有: `0`: 保密, `1`: 男, `2`: 女, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户性别, 以应用身份访问通讯录, 读取通讯录
    avatar_key: string // 头像的文件Key, 可通过“消息与群组/消息/图片信息”中的“上传图片”接口上传并获取头像文件 Key
    avatar: GetUserListRespItemAvatar // 用户头像信息, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    status: GetUserListRespItemStatus // 用户状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    department_ids?: string[] // 用户所属部门的ID列表, 一个用户可属于多个部门, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    leader_user_id: string // 用户的直接主管的用户ID, ID值与查询参数中的user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    city: string // 城市, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    country: string // 国家或地区Code缩写, 具体写入格式请参考 [国家/地区码表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/country-code-description), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    work_station: string // 工位, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    join_time: number // 入职时间, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    is_tenant_manager: boolean // 是否是租户超级管理员, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    employee_no: string // 工号, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    employee_type: number // 员工类型, 可选值有: `1`: 正式员工, `2`: 实习生, `3`: 外包, `4`: 劳务, `5`: 顾问, 同时可读取到自定义员工类型的 int 值, 可通过下方接口获取到该租户的自定义员工类型的名称, [获取人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    orders?: GetUserListRespItemOrder[] // 用户排序信息, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    custom_attrs?: GetUserListRespItemCustomAttr[] // 自定义字段, 请确保你的组织管理员已在管理后台/组织架构/成员字段管理/自定义字段管理/全局设置中开启了“允许开放平台 API 调用“, 否则该字段不会生效/返回, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    enterprise_email: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    job_title: string // 职务, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    is_frozen: boolean // 是否暂停用户
  }

  export interface GetUserListRespItemAvatar {
    avatar_72: string // 72*72像素头像链接
    avatar_240: string // 240*240像素头像链接
    avatar_640: string // 640*640像素头像链接
    avatar_origin: string // 原始头像链接
  }

  export interface GetUserListRespItemCustomAttr {
    type: string // 自定义字段类型, `TEXT`: 文本, `HREF`: 网页, `ENUMERATION`: 枚举, `PICTURE_ENUM`: 图片, `GENERIC_USER`: 用户, [自定义字段相关常见问题](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)
    id: string // 自定义字段ID
    value: GetUserListRespItemCustomAttrValue // 自定义字段取值
  }

  export interface GetUserListRespItemCustomAttrValue {
    text: string // 字段类型为`TEXT`时该参数定义字段值, 必填；字段类型为`HREF`时该参数定义网页标题, 必填
    url: string // 字段类型为 HREF 时, 该参数定义默认 URL
    pc_url: string // 字段类型为 HREF 时, 该参数定义PC端 URL
    option_id: string // 字段类型为 ENUMERATION 或 PICTURE_ENUM 时, 该参数定义选项值
    option_value: string // 选项值
    name: string // 名称
    picture_url: string // 图片链接
    generic_user: GetUserListRespItemCustomAttrValueGenericUser // 字段类型为 GENERIC_USER 时, 该参数定义引用人员
  }

  export interface GetUserListRespItemCustomAttrValueGenericUser {
    id: string // 用户的user_id [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    type: number // 用户类型    1: 用户
  }

  export interface GetUserListRespItemOrder {
    department_id: string // 排序信息对应的部门ID, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)
    user_order: number // 用户在其直属部门内的排序, 数值越大, 排序越靠前
    department_order: number // 用户所属的多个部门间的排序, 数值越大, 排序越靠前
  }

  export interface GetUserListRespItemStatus {
    is_frozen: boolean // 是否暂停
    is_resigned: boolean // 是否离职
    is_activated: boolean // 是否激活
    is_exited: boolean // 是否主动退出, 主动退出一段时间后用户会自动转为已离职
    is_unjoin: boolean // 是否未加入, 需要用户自主确认才能加入团队
  }

  export interface getUserListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetUserListResp
  }

  export interface GetUserListOldReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_type", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    department_id?: string // 填写该字段表示获取部门下所有用户, 选填, 示例值: "od-xxxxxxxxxxxxx"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/dk53s4Ebp882DYfFaPFbz00L4CMZJrqGdzNyc8BcZtDbwVUvRmQTvyMYicnGWrde9X56TgdBuS%2BJKiSIkdexPw="
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetUserListOldResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetUserListOldRespItem[]
  }

  export interface GetUserListOldRespItem {
    union_id: string // 用户的union_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    user_id: string // 租户内用户的唯一标识, 用户的user_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求: 获取用户 user ID
    open_id: string // 用户的open_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    name: string // 用户名, 字段权限要求（满足任一）: 获取用户基本信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    en_name: string // 英文名, 字段权限要求（满足任一）: 获取用户基本信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    email: string // 邮箱, 字段权限要求: 获取用户邮箱信息
    mobile: string // 手机号, 中国大陆手机可不填区号, 境外手机需加国际电话区号前缀, 字段权限要求: 获取用户手机号
    mobile_visible: boolean // 手机号码可见性, true 为可见, false 为不可见, 目前默认为 true。不可见时, 组织员工将无法查看该员工的手机号码
    gender: number // 性别, 可选值有: `0`: 保密, `1`: 男, `2`: 女, 字段权限要求（满足任一）: 获取用户性别, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    avatar: GetUserListOldRespItemAvatar // 用户头像信息, 字段权限要求（满足任一）: 获取用户基本信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    status: GetUserListOldRespItemStatus // 用户状态, 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    department_ids?: string[] // 用户所属部门的ID列表, 一个用户可属于多个部门, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0), 字段权限要求（满足任一）: 获取用户组织架构信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    leader_user_id: string // 用户的直接主管的用户ID, ID值与查询参数中的user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求（满足任一）: 获取用户组织架构信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    city: string // 城市, 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    country: string // 国家或地区Code缩写, 具体写入格式请参考 [国家/地区码表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/country-code-description), 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    work_station: string // 工位, 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    join_time: number // 入职时间, 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    is_tenant_manager: boolean // 是否是租户超级管理员, 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    employee_no: string // 工号, 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    employee_type: number // 员工类型, 可选值有: `1`: 正式员工, `2`: 实习生, `3`: 外包, `4`: 劳务, `5`: 顾问, 同时可读取到自定义员工类型的 int 值, 可通过下方接口获取到该租户的自定义员工类型的名称, [获取人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list), 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    orders?: GetUserListOldRespItemOrder[] // 用户排序信息, 字段权限要求（满足任一）: 获取用户组织架构信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    custom_attrs?: GetUserListOldRespItemCustomAttr[] // 自定义字段, 请确保你的组织管理员已在管理后台/组织架构/成员字段管理/自定义字段管理/全局设置中开启了“允许开放平台 API 调用“, 否则该字段不会生效/返回, 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    enterprise_email: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
    job_title: string // 职务, 字段权限要求（满足任一）: 获取用户雇佣信息, 以应用身份读取通讯录, 读取通讯录, 以应用身份访问通讯录
  }

  export interface GetUserListOldRespItemAvatar {
    avatar_72: string // 72*72像素头像链接
    avatar_240: string // 240*240像素头像链接
    avatar_640: string // 640*640像素头像链接
    avatar_origin: string // 原始头像链接
  }

  export interface GetUserListOldRespItemCustomAttr {
    type: string // 自定义字段类型, `TEXT`: 文本, `HREF`: 网页, `ENUMERATION`: 枚举, `PICTURE_ENUM`: 图片, `GENERIC_USER`: 用户, [自定义字段相关常见问题](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)
    id: string // 自定义字段ID
    value: GetUserListOldRespItemCustomAttrValue // 自定义字段取值
  }

  export interface GetUserListOldRespItemCustomAttrValue {
    text: string // 字段类型为`TEXT`时该参数定义字段值, 必填；字段类型为`HREF`时该参数定义网页标题, 必填
    url: string // 字段类型为 HREF 时, 该参数定义默认 URL
    pc_url: string // 字段类型为 HREF 时, 该参数定义PC端 URL
    option_value: string // 选项值
    name: string // 名称
    picture_url: string // 图片链接
    generic_user: GetUserListOldRespItemCustomAttrValueGenericUser // 字段类型为 GENERIC_USER 时, 该参数定义引用人员
  }

  export interface GetUserListOldRespItemCustomAttrValueGenericUser {
    id: string // 用户的user_id [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    type: number // 用户类型    1: 用户
  }

  export interface GetUserListOldRespItemOrder {
    department_id: string // 排序信息对应的部门ID, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)
    user_order: number // 用户在其直属部门内的排序, 数值越大, 排序越靠前
    department_order: number // 用户所属的多个部门间的排序, 数值越大, 排序越靠前
  }

  export interface GetUserListOldRespItemStatus {
    is_frozen: boolean // 是否暂停
    is_resigned: boolean // 是否离职
    is_activated: boolean // 是否激活
  }

  export interface getUserListOldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetUserListOldResp
  }

  export interface BatchGetUserReq {
    employee_ids?: string[] // 支持通过 open_id 或者 employee_id 查询用户信息, 不支持混合两种 ID 进行查询, 单次请求支持的最大用户数量为100
    open_ids?: string[] // 支持通过 open_id 或者 employee_id 查询用户信息, 不支持混合两种 ID 进行查询, 单次请求支持的最大用户数量为100
  }

  export interface BatchGetUserResp {
    user_infos?: BatchGetUserRespUserInfo[] // 用户信息
  }

  export interface BatchGetUserRespUserInfo {
    name: string // 用户名
    name_py: string // 用户名拼音
    en_name: string // 英文名
    employee_id: string // 用户的 employee_id, 申请了"获取用户 user_id"权限的应用返回该字段
    employee_no: string // 工号
    open_id: string // 用户的 open_id
    union_id: string // 用户的 union_id
    status: number // 用户状态, bit0(最低位): 1冻结, 0未冻结；bit1:1离职, 0在职；bit2:1未激活, 0已激活
    employee_type: number // 员工类型。1:正式员工；2:实习生；3:外包；4:劳务；5:顾问
    avatar_72: string // 用户头像, 72*72px
    avatar_240: string // 用户头像, 240*240px
    avatar_640: string // 用户头像, 640*640px
    avatar_url: string // 用户头像, 原始大小
    gender: number // 性别, 未设置不返回该字段。1:男；2:女
    email: string // 用户邮箱地址, 已申请"获取用户邮箱"权限返回该字段
    mobile: string // 用户手机号, 已申请"获取用户手机号"权限的企业自建应用返回该字段
    description: string // 用户个人签名
    country: string // 用户所在国家
    city: string // 用户所在城市
    work_station: string // 工位
    is_tenant_manager: boolean // 是否是企业超级管理员
    join_time: number // 入职时间, 未设置不返回该字段
    update_time: number // 更新时间
    leader_employee_id: string // 用户直接领导的 employee_id, 企业自建应用返回, 应用商店应用申请了 employee_id 权限时才返回
    leader_open_id: string // 用户直接领导的 open_id
    leader_union_id: string // 用户直接领导的 union_id
    departments?: string[] // 用户所在部门自定义 ID列表, 用户可能同时存在于多个部门
    open_departments?: string[] // 用户所在部门 openID 列表, 用户可能同时存在于多个部门
    custom_attrs?: { [key: string]: any } // 用户的自定义属性信息。 该字段返回的每一个属性包括自定义属性 ID 和自定义属性值。  企业开放了自定义用户属性且为该用户设置了自定义属性的值, 才会返回该字段
  }

  export interface batchGetUserResp {
    code: number // 返回码, 非 0 表示失败
    msg: string // 返回码的描述
    data: BatchGetUserResp // 返回业务数据
  }

  export interface UpdateUserPatchReq {
    user_id: string // 用户ID, 需要与查询参数中的user_id_type类型保持一致, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    name?: string // 用户名, 示例值: "张三", 最小长度: `1` 字符
    en_name?: string // 英文名, 示例值: "San Zhang"
    nickname?: string // 别名, 示例值: "Alex Zhang"
    email?: string // 邮箱, 注意非 +86 手机号成员必须同时添加邮箱, 示例值: "zhangsan@gmail.com"
    mobile?: string // 手机号, 在本企业内不可重复；未认证企业仅支持添加中国大陆手机号, 通过飞书认证的企业允许添加海外手机号, 注意国际电话区号前缀中必须包含加号 +, 示例值: "中国大陆手机号: 13011111111 或 +8613011111111, 境外手机号: +41446681800"
    mobile_visible?: boolean // 手机号码可见性, true 为可见, false 为不可见, 目前默认为 true。不可见时, 组织员工将无法查看该员工的手机号码, 示例值: false
    gender?: number // 性别, 示例值: 1, 可选值有: `0`: 保密, `1`: 男, `2`: 女
    avatar_key?: string // 头像的文件Key, 可通过“消息与群组/消息/图片信息”中的“上传图片”接口上传并获取头像文件 Key, 示例值: "2500c7a9-5fff-4d9a-a2de-3d59614ae28g"
    department_ids?: string[] // 用户所属部门的ID列表, 一个用户可属于多个部门, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0), 示例值: od-4e6ac4d14bcd5071a37a39de902c7141
    leader_user_id?: string // 用户的直接主管的用户ID, ID值与查询参数中的user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    city?: string // 城市, 示例值: "杭州"
    country?: string // 国家或地区Code缩写, 具体写入格式请参考 [国家/地区码表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/country-code-description), 示例值: "CN"
    work_station?: string // 工位, 示例值: "北楼-H34"
    join_time?: number // 入职时间, 示例值: 2147483647
    employee_no?: string // 工号, 示例值: "1"
    employee_type?: number // 员工类型, 可选值有: `1`: 正式员工, `2`: 实习生, `3`: 外包, `4`: 劳务, `5`: 顾问, 同时可读取到自定义员工类型的 int 值, 可通过下方接口获取到该租户的自定义员工类型的名称, [获取人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list), 示例值: 1
    orders?: UpdateUserPatchReqOrder[] // 用户排序信息
    custom_attrs?: UpdateUserPatchReqCustomAttr[] // 自定义字段, 请确保你的组织管理员已在管理后台/组织架构/成员字段管理/自定义字段管理/全局设置中开启了“允许开放平台 API 调用“, 否则该字段不会生效/返回。
    enterprise_email?: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 示例值: "demo@mail.com"
    job_title?: string // 职务, 示例值: "xxxxx"
    is_frozen?: boolean // 是否暂停用户, 示例值: false
    ent_email_password?: string // 企业邮箱登录时的密码（已废弃, 无需使用）, 示例值: "-"
  }

  export interface UpdateUserPatchReqCustomAttr {
    type?: string // 自定义字段类型, `TEXT`: 文本, `HREF`: 网页, `ENUMERATION`: 枚举, `PICTURE_ENUM`: 图片, `GENERIC_USER`: 用户, [自定义字段相关常见问题](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN), 示例值: "TEXT"
    id?: string // 自定义字段ID, 示例值: "DemoId"
    value?: UpdateUserPatchReqCustomAttrValue // 自定义字段取值
  }

  export interface UpdateUserPatchReqCustomAttrValue {
    text?: string // 字段类型为`TEXT`时该参数定义字段值, 必填；字段类型为`HREF`时该参数定义网页标题, 必填, 示例值: "DemoText"
    url?: string // 字段类型为 HREF 时, 该参数定义默认 URL, 示例值: "http://www.feishu.cn"
    pc_url?: string // 字段类型为 HREF 时, 该参数定义PC端 URL, 示例值: "http://www.feishu.cn"
    option_id?: string // 字段类型为 ENUMERATION 或 PICTURE_ENUM 时, 该参数定义选项值, 示例值: "edcvfrtg"
    generic_user?: UpdateUserPatchReqCustomAttrValueGenericUser // 字段类型为 GENERIC_USER 时, 该参数定义引用人员
  }

  export interface UpdateUserPatchReqCustomAttrValueGenericUser {
    id: string // 用户的user_id [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "9b2fabg5"
    type: number // 用户类型    1: 用户, 示例值: 1
  }

  export interface UpdateUserPatchReqOrder {
    department_id?: string // 排序信息对应的部门ID, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview), 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141"
    user_order?: number // 用户在其直属部门内的排序, 数值越大, 排序越靠前, 示例值: 100
    department_order?: number // 用户所属的多个部门间的排序, 数值越大, 排序越靠前, 示例值: 100
  }

  export interface UpdateUserPatchResp {
    user: UpdateUserPatchRespUser // 用户信息
  }

  export interface UpdateUserPatchRespUser {
    union_id: string // 用户的union_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    user_id: string // 租户内用户的唯一标识, 用户的user_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求: 获取用户 user ID
    open_id: string // 用户的open_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    name: string // 用户名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    en_name: string // 英文名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    nickname: string // 别名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    email: string // 邮箱, 注意非 +86 手机号成员必须同时添加邮箱, 字段权限要求: 获取用户邮箱信息
    mobile: string // 手机号, 在本企业内不可重复；未认证企业仅支持添加中国大陆手机号, 通过飞书认证的企业允许添加海外手机号, 注意国际电话区号前缀中必须包含加号 +, 字段权限要求: 获取用户手机号
    mobile_visible: boolean // 手机号码可见性, true 为可见, false 为不可见, 目前默认为 true。不可见时, 组织员工将无法查看该员工的手机号码
    gender: number // 性别, 可选值有: `0`: 保密, `1`: 男, `2`: 女, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户性别, 以应用身份访问通讯录, 读取通讯录
    avatar_key: string // 头像的文件Key, 可通过“消息与群组/消息/图片信息”中的“上传图片”接口上传并获取头像文件 Key
    avatar: UpdateUserPatchRespUserAvatar // 用户头像信息, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    status: UpdateUserPatchRespUserStatus // 用户状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    department_ids?: string[] // 用户所属部门的ID列表, 一个用户可属于多个部门, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    leader_user_id: string // 用户的直接主管的用户ID, ID值与查询参数中的user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    city: string // 城市, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    country: string // 国家或地区Code缩写, 具体写入格式请参考 [国家/地区码表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/country-code-description), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    work_station: string // 工位, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    join_time: number // 入职时间, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    is_tenant_manager: boolean // 是否是租户超级管理员, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    employee_no: string // 工号, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    employee_type: number // 员工类型, 可选值有: `1`: 正式员工, `2`: 实习生, `3`: 外包, `4`: 劳务, `5`: 顾问, 同时可读取到自定义员工类型的 int 值, 可通过下方接口获取到该租户的自定义员工类型的名称, [获取人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    orders?: UpdateUserPatchRespUserOrder[] // 用户排序信息, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    custom_attrs?: UpdateUserPatchRespUserCustomAttr[] // 自定义字段, 请确保你的组织管理员已在管理后台/组织架构/成员字段管理/自定义字段管理/全局设置中开启了“允许开放平台 API 调用“, 否则该字段不会生效/返回, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    enterprise_email: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    job_title: string // 职务, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    is_frozen: boolean // 是否暂停用户
    ent_email_password: string // 企业邮箱登录时的密码（已废弃, 无需使用）
  }

  export interface UpdateUserPatchRespUserAvatar {
    avatar_72: string // 72*72像素头像链接
    avatar_240: string // 240*240像素头像链接
    avatar_640: string // 640*640像素头像链接
    avatar_origin: string // 原始头像链接
  }

  export interface UpdateUserPatchRespUserCustomAttr {
    type: string // 自定义字段类型, `TEXT`: 文本, `HREF`: 网页, `ENUMERATION`: 枚举, `PICTURE_ENUM`: 图片, `GENERIC_USER`: 用户, [自定义字段相关常见问题](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)
    id: string // 自定义字段ID
    value: UpdateUserPatchRespUserCustomAttrValue // 自定义字段取值
  }

  export interface UpdateUserPatchRespUserCustomAttrValue {
    text: string // 字段类型为`TEXT`时该参数定义字段值, 必填；字段类型为`HREF`时该参数定义网页标题, 必填
    url: string // 字段类型为 HREF 时, 该参数定义默认 URL
    pc_url: string // 字段类型为 HREF 时, 该参数定义PC端 URL
    option_id: string // 字段类型为 ENUMERATION 或 PICTURE_ENUM 时, 该参数定义选项值
    option_value: string // 选项值
    name: string // 名称
    picture_url: string // 图片链接
    generic_user: UpdateUserPatchRespUserCustomAttrValueGenericUser // 字段类型为 GENERIC_USER 时, 该参数定义引用人员
  }

  export interface UpdateUserPatchRespUserCustomAttrValueGenericUser {
    id: string // 用户的user_id [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    type: number // 用户类型    1: 用户
  }

  export interface UpdateUserPatchRespUserOrder {
    department_id: string // 排序信息对应的部门ID, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)
    user_order: number // 用户在其直属部门内的排序, 数值越大, 排序越靠前
    department_order: number // 用户所属的多个部门间的排序, 数值越大, 排序越靠前
  }

  export interface UpdateUserPatchRespUserStatus {
    is_frozen: boolean // 是否暂停
    is_resigned: boolean // 是否离职
    is_activated: boolean // 是否激活
    is_exited: boolean // 是否主动退出, 主动退出一段时间后用户会自动转为已离职
    is_unjoin: boolean // 是否未加入, 需要用户自主确认才能加入团队
  }

  export interface updateUserPatchResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateUserPatchResp
  }

  export interface UpdateUserReq {
    user_id: string // 用户ID, 需要与查询参数中的user_id_type类型保持一致, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    name: string // 用户名, 示例值: "张三", 最小长度: `1` 字符
    en_name?: string // 英文名, 示例值: "San Zhang"
    nickname?: string // 别名, 示例值: "Alex Zhang"
    email?: string // 邮箱, 注意非 +86 手机号成员必须同时添加邮箱, 示例值: "zhangsan@gmail.com"
    mobile: string // 手机号, 在本企业内不可重复；未认证企业仅支持添加中国大陆手机号, 通过飞书认证的企业允许添加海外手机号, 注意国际电话区号前缀中必须包含加号 +, 示例值: "中国大陆手机号: 13011111111 或 +8613011111111, 境外手机号: +41446681800"
    mobile_visible?: boolean // 手机号码可见性, true 为可见, false 为不可见, 目前默认为 true。不可见时, 组织员工将无法查看该员工的手机号码, 示例值: false
    gender?: number // 性别, 示例值: 1, 可选值有: `0`: 保密, `1`: 男, `2`: 女
    avatar_key?: string // 头像的文件Key, 可通过“消息与群组/消息/图片信息”中的“上传图片”接口上传并获取头像文件 Key, 示例值: "2500c7a9-5fff-4d9a-a2de-3d59614ae28g"
    department_ids?: string[] // 用户所属部门的ID列表, 一个用户可属于多个部门, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0), 示例值: od-4e6ac4d14bcd5071a37a39de902c7141
    leader_user_id?: string // 用户的直接主管的用户ID, ID值与查询参数中的user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    city?: string // 城市, 示例值: "杭州"
    country?: string // 国家或地区Code缩写, 具体写入格式请参考 [国家/地区码表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/country-code-description), 示例值: "CN"
    work_station?: string // 工位, 示例值: "北楼-H34"
    join_time?: number // 入职时间, 示例值: 2147483647
    employee_no?: string // 工号, 示例值: "1"
    employee_type: number // 员工类型, 可选值有: `1`: 正式员工, `2`: 实习生, `3`: 外包, `4`: 劳务, `5`: 顾问, 同时可读取到自定义员工类型的 int 值, 可通过下方接口获取到该租户的自定义员工类型的名称, [获取人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list), 示例值: 1
    orders?: UpdateUserReqOrder[] // 用户排序信息
    custom_attrs?: UpdateUserReqCustomAttr[] // 自定义字段, 请确保你的组织管理员已在管理后台/组织架构/成员字段管理/自定义字段管理/全局设置中开启了“允许开放平台 API 调用“, 否则该字段不会生效/返回。
    enterprise_email?: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 示例值: "demo@mail.com"
    job_title?: string // 职务, 示例值: "xxxxx"
    is_frozen?: boolean // 是否暂停用户, 示例值: false
    ent_email_password?: string // 企业邮箱登录时的密码（已废弃, 无需使用）, 示例值: "-"
  }

  export interface UpdateUserReqCustomAttr {
    type?: string // 自定义字段类型, `TEXT`: 文本, `HREF`: 网页, `ENUMERATION`: 枚举, `PICTURE_ENUM`: 图片, `GENERIC_USER`: 用户, [自定义字段相关常见问题](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN), 示例值: "TEXT"
    id?: string // 自定义字段ID, 示例值: "DemoId"
    value?: UpdateUserReqCustomAttrValue // 自定义字段取值
  }

  export interface UpdateUserReqCustomAttrValue {
    text?: string // 字段类型为`TEXT`时该参数定义字段值, 必填；字段类型为`HREF`时该参数定义网页标题, 必填, 示例值: "DemoText"
    url?: string // 字段类型为 HREF 时, 该参数定义默认 URL, 示例值: "http://www.feishu.cn"
    pc_url?: string // 字段类型为 HREF 时, 该参数定义PC端 URL, 示例值: "http://www.feishu.cn"
    option_id?: string // 字段类型为 ENUMERATION 或 PICTURE_ENUM 时, 该参数定义选项值, 示例值: "edcvfrtg"
    generic_user?: UpdateUserReqCustomAttrValueGenericUser // 字段类型为 GENERIC_USER 时, 该参数定义引用人员
  }

  export interface UpdateUserReqCustomAttrValueGenericUser {
    id: string // 用户的user_id [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 示例值: "9b2fabg5"
    type: number // 用户类型    1: 用户, 示例值: 1
  }

  export interface UpdateUserReqOrder {
    department_id?: string // 排序信息对应的部门ID, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview), 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141"
    user_order?: number // 用户在其直属部门内的排序, 数值越大, 排序越靠前, 示例值: 100
    department_order?: number // 用户所属的多个部门间的排序, 数值越大, 排序越靠前, 示例值: 100
  }

  export interface UpdateUserResp {
    user: UpdateUserRespUser // 用户信息
  }

  export interface UpdateUserRespUser {
    union_id: string // 用户的union_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    user_id: string // 租户内用户的唯一标识, 用户的user_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求: 获取用户 user ID
    open_id: string // 用户的open_id, 不同ID的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    name: string // 用户名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    en_name: string // 英文名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    nickname: string // 别名, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    email: string // 邮箱, 注意非 +86 手机号成员必须同时添加邮箱, 字段权限要求: 获取用户邮箱信息
    mobile: string // 手机号, 在本企业内不可重复；未认证企业仅支持添加中国大陆手机号, 通过飞书认证的企业允许添加海外手机号, 注意国际电话区号前缀中必须包含加号 +, 字段权限要求: 获取用户手机号
    mobile_visible: boolean // 手机号码可见性, true 为可见, false 为不可见, 目前默认为 true。不可见时, 组织员工将无法查看该员工的手机号码
    gender: number // 性别, 可选值有: `0`: 保密, `1`: 男, `2`: 女, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户性别, 以应用身份访问通讯录, 读取通讯录
    avatar_key: string // 头像的文件Key, 可通过“消息与群组/消息/图片信息”中的“上传图片”接口上传并获取头像文件 Key
    avatar: UpdateUserRespUserAvatar // 用户头像信息, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户基本信息, 以应用身份访问通讯录, 读取通讯录
    status: UpdateUserRespUserStatus // 用户状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    department_ids?: string[] // 用户所属部门的ID列表, 一个用户可属于多个部门, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    leader_user_id: string // 用户的直接主管的用户ID, ID值与查询参数中的user_id_type 对应, 不同 ID 的说明参见 [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    city: string // 城市, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    country: string // 国家或地区Code缩写, 具体写入格式请参考 [国家/地区码表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/country-code-description), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    work_station: string // 工位, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    join_time: number // 入职时间, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    is_tenant_manager: boolean // 是否是租户超级管理员, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    employee_no: string // 工号, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    employee_type: number // 员工类型, 可选值有: `1`: 正式员工, `2`: 实习生, `3`: 外包, `4`: 劳务, `5`: 顾问, 同时可读取到自定义员工类型的 int 值, 可通过下方接口获取到该租户的自定义员工类型的名称, [获取人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list), 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    orders?: UpdateUserRespUserOrder[] // 用户排序信息, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户组织架构信息, 以应用身份访问通讯录, 读取通讯录
    custom_attrs?: UpdateUserRespUserCustomAttr[] // 自定义字段, 请确保你的组织管理员已在管理后台/组织架构/成员字段管理/自定义字段管理/全局设置中开启了“允许开放平台 API 调用“, 否则该字段不会生效/返回, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    enterprise_email: string // 企业邮箱, 请先确保已在管理后台启用飞书邮箱服务, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    job_title: string // 职务, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取用户雇佣信息, 以应用身份访问通讯录, 读取通讯录
    is_frozen: boolean // 是否暂停用户
    ent_email_password: string // 企业邮箱登录时的密码（已废弃, 无需使用）
  }

  export interface UpdateUserRespUserAvatar {
    avatar_72: string // 72*72像素头像链接
    avatar_240: string // 240*240像素头像链接
    avatar_640: string // 640*640像素头像链接
    avatar_origin: string // 原始头像链接
  }

  export interface UpdateUserRespUserCustomAttr {
    type: string // 自定义字段类型, `TEXT`: 文本, `HREF`: 网页, `ENUMERATION`: 枚举, `PICTURE_ENUM`: 图片, `GENERIC_USER`: 用户, [自定义字段相关常见问题](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)
    id: string // 自定义字段ID
    value: UpdateUserRespUserCustomAttrValue // 自定义字段取值
  }

  export interface UpdateUserRespUserCustomAttrValue {
    text: string // 字段类型为`TEXT`时该参数定义字段值, 必填；字段类型为`HREF`时该参数定义网页标题, 必填
    url: string // 字段类型为 HREF 时, 该参数定义默认 URL
    pc_url: string // 字段类型为 HREF 时, 该参数定义PC端 URL
    option_id: string // 字段类型为 ENUMERATION 或 PICTURE_ENUM 时, 该参数定义选项值
    option_value: string // 选项值
    name: string // 名称
    picture_url: string // 图片链接
    generic_user: UpdateUserRespUserCustomAttrValueGenericUser // 字段类型为 GENERIC_USER 时, 该参数定义引用人员
  }

  export interface UpdateUserRespUserCustomAttrValueGenericUser {
    id: string // 用户的user_id [用户相关的 ID 概念](https://open.feishu.cn/document/home/user-identity-introduction/introduction)
    type: number // 用户类型    1: 用户
  }

  export interface UpdateUserRespUserOrder {
    department_id: string // 排序信息对应的部门ID, ID值与查询参数中的department_id_type 对应, 不同 ID 的说明参见 [部门ID说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)
    user_order: number // 用户在其直属部门内的排序, 数值越大, 排序越靠前
    department_order: number // 用户所属的多个部门间的排序, 数值越大, 排序越靠前
  }

  export interface UpdateUserRespUserStatus {
    is_frozen: boolean // 是否暂停
    is_resigned: boolean // 是否离职
    is_activated: boolean // 是否激活
    is_exited: boolean // 是否主动退出, 主动退出一段时间后用户会自动转为已离职
    is_unjoin: boolean // 是否未加入, 需要用户自主确认才能加入团队
  }

  export interface updateUserResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateUserResp
  }

  export interface BatchGetUserByIDReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    emails?: string[] // 要查询的用户邮箱, 最多 50 条, 示例值: zhangsan@a.com, 最大长度: `50`
    mobiles?: string[] // 要查询的用户手机号, 最多 50 条。 非中国大陆地区的手机号需要添加以 “+” 开头的国家 / 地区代码, 示例值: 13812345678, 最大长度: `50`
  }

  export interface BatchGetUserByIDResp {
    user_list?: BatchGetUserByIDRespUser[] // 手机号或者邮箱对应的用户id信息
  }

  export interface BatchGetUserByIDRespUser {
    user_id: string // 用户id, 值为user_id_type所指定的类型。如果查询的手机号、邮箱不存在, 或者无权限查看对应的用户, 则此项为空。
    mobile: string // 手机号, 通过手机号查询时返回
    email: string // 邮箱, 通过邮箱查询时返回
  }

  export interface batchGetUserByIDResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchGetUserByIDResp
  }

  export interface BatchGetUserByIDOldReq {
    emails?: string // 要查询的用户邮箱, 最多 50 条, 多个邮箱以 & 隔开。
    mobiles?: string // 要查询的用户手机号, 最多 50 条, 多个手机号以 & 隔开。 非中国大陆地区的手机号需要添加以 “+” 开头的国家 / 地区代码, 并且需要进行 URL 转义。
  }

  export interface BatchGetUserByIDOldResp {
    email_users?: { [key: string]: BatchGetUserByIDOldRespEmailUser[] } // 根据邮箱查询到的用户, key 为邮箱, value 为查询到用户的 array。 目前同一个邮箱最多只能查询到一个用户。
    emails_not_exist?: string[] // 没有匹配记录的邮箱。
    mobile_users?: { [key: string]: BatchGetUserByIDOldRespEmailUser[] } // 根据手机号查询到的用户, key 为手机号, value 为查询到用户的 array。 目前同一个手机号最多只能查询到一个用户。
    mobiles_not_exist?: string[] // 没有匹配记录的手机号。
  }

  export interface BatchGetUserByIDOldRespEmailUser {
    open_id: string // 用户的 open_id。[open_id描述](https://open.feishu.cn/document/home/user-identity-introduction/open-id)
    user_id: string // 用户的 user_id。 只有已申请 `获取用户UserID` 权限的企业自建应用返回此字段。[user_id描述](https://open.feishu.cn/document/home/user-identity-introduction/user-id)
  }

  export interface batchGetUserByIDOldResp {
    code: number // 返回码, 非 0 表示失败。
    msg: string // 对返回码的文本描述。
    data: BatchGetUserByIDOldResp
  }

  export interface CreateDepartmentReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门
    client_token?: string // 根据client_token是否一致来判断是否为同一请求, 示例值: "473469C7-AA6F-4DC5-B3DB-A3DC0DE3C83E"
    name: string // 部门名称, 示例值: "DemoName", 最小长度: `1` 字符
    i18n_name?: CreateDepartmentReqI18nName // 国际化的部门名称
    parent_department_id: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 示例值: "D067"
    department_id?: string // 本部门的自定义部门ID, 示例值: "D096", 最大长度: `64` 字符, 正则校验: `^0|[^od][A-Za-z0-9]*`
    leader_user_id?: string // 部门主管用户ID, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    order?: string // 部门的排序, 即部门在其同级部门的展示顺序, 示例值: "100"
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 示例值: custom_unit_id
    create_group_chat?: boolean // 是否创建部门群, 默认不创建, 示例值: false
  }

  export interface CreateDepartmentReqI18nName {
    zh_cn?: string // 部门的中文名, 示例值: "Demo名称"
    ja_jp?: string // 部门的日文名, 示例值: "デモ名"
    en_us?: string // 部门的英文名, 示例值: "Demo Name"
  }

  export interface CreateDepartmentResp {
    department: CreateDepartmentRespDepartment // 部门信息
  }

  export interface CreateDepartmentRespDepartment {
    name: string // 部门名称, 字段权限要求（满足任一）: 获取部门基础信息, 以应用身份读取通讯录
    i18n_name: CreateDepartmentRespDepartmentI18nName // 国际化的部门名称, 字段权限要求（满足任一）: 获取部门基础信息, 以应用身份读取通讯录
    parent_department_id: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 字段权限要求（满足任一）: 获取部门组织架构信息, 以应用身份读取通讯录
    department_id: string // 本部门的自定义部门ID, 字段权限要求（满足任一）: 获取部门基础信息, 以应用身份读取通讯录
    open_department_id: string // 部门的open_id
    leader_user_id: string // 部门主管用户ID, 字段权限要求（满足任一）: 获取部门组织架构信息, 以应用身份读取通讯录
    chat_id: string // 部门群ID, 字段权限要求（满足任一）: 获取部门基础信息, 以应用身份读取通讯录
    order: string // 部门的排序, 即部门在其同级部门的展示顺序, 字段权限要求（满足任一）: 获取部门组织架构信息, 以应用身份读取通讯录
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 字段权限要求（满足任一）: 获取部门组织架构信息, 以应用身份读取通讯录
    member_count: number // 部门下用户的个数, 字段权限要求（满足任一）: 获取部门组织架构信息, 以应用身份读取通讯录
    status: CreateDepartmentRespDepartmentStatus // 部门状态, 字段权限要求（满足任一）: 获取部门基础信息, 以应用身份读取通讯录
  }

  export interface CreateDepartmentRespDepartmentI18nName {
    zh_cn: string // 部门的中文名
    ja_jp: string // 部门的日文名
    en_us: string // 部门的英文名
  }

  export interface CreateDepartmentRespDepartmentStatus {
    is_deleted: boolean // 是否被删除
  }

  export interface createDepartmentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateDepartmentResp
  }

  export interface GetDepartmentReq {
    department_id: string // 需要获取的部门ID, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141", 最大长度: `64` 字符, 正则校验: `^0|[^od][A-Za-z0-9]*`
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
  }

  export interface GetDepartmentResp {
    department: GetDepartmentRespDepartment // 部门信息
  }

  export interface GetDepartmentRespDepartment {
    name: string // 部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    i18n_name: GetDepartmentRespDepartmentI18nName // 国际化的部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    parent_department_id: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    department_id: string // 本部门的自定义部门ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    open_department_id: string // 部门的open_id
    leader_user_id: string // 部门主管用户ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    chat_id: string // 部门群ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    order: string // 部门的排序, 即部门在其同级部门的展示顺序, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    member_count: number // 部门下用户的个数, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    status: GetDepartmentRespDepartmentStatus // 部门状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
  }

  export interface GetDepartmentRespDepartmentI18nName {
    zh_cn: string // 部门的中文名
    ja_jp: string // 部门的日文名
    en_us: string // 部门的英文名
  }

  export interface GetDepartmentRespDepartmentStatus {
    is_deleted: boolean // 是否被删除
  }

  export interface getDepartmentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDepartmentResp
  }

  export interface GetDepartmentListReq {
    department_id: string // 部门ID, 根部门的部门ID 为0, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141", 最大长度: `64` 字符, 正则校验: `^0|[^od][A-Za-z0-9]*`
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    fetch_child?: boolean // 是否递归获取子部门, 示例值: false
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/RD/cIFmu77WxpxPB/2oHfQLZ+G8JG6tK7+ZnHiT7COhD2hMSICh/eBl7cpzU6JEC3J7COKNe4jrQ8ExwBCR"
  }

  export interface GetDepartmentListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetDepartmentListRespItem[] // 部门列表
  }

  export interface GetDepartmentListRespItem {
    name: string // 部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    i18n_name: GetDepartmentListRespItemI18nName // 国际化的部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    parent_department_id: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    department_id: string // 本部门的自定义部门ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    open_department_id: string // 部门的open_id
    leader_user_id: string // 部门主管用户ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    chat_id: string // 部门群ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    order: string // 部门的排序, 即部门在其同级部门的展示顺序, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    member_count: number // 部门下用户的个数, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    status: GetDepartmentListRespItemStatus // 部门状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    create_group_chat: boolean // 是否创建部门群, 默认不创建
  }

  export interface GetDepartmentListRespItemI18nName {
    zh_cn: string // 部门的中文名
    ja_jp: string // 部门的日文名
    en_us: string // 部门的英文名
  }

  export interface GetDepartmentListRespItemStatus {
    is_deleted: boolean // 是否被删除
  }

  export interface getDepartmentListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDepartmentListResp
  }

  export interface GetDepartmentListOldReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    parent_department_id?: string // 父部门的ID, 填上获取部门下所有子部门, 此处填写的 ID 必须是 department_id_type 指定的 ID, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141"
    fetch_child?: boolean // 是否递归获取子部门, 示例值: 是否递归获取子部门, 默认值: false
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/RD/cIFmu77WxpxPB/2oHfQLZ%2BG8JG6tK7%2BZnHiT7COhD2hMSICh/eBl7cpzU6JEC3J7COKNe4jrQ8ExwBCR"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
  }

  export interface GetDepartmentListOldResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetDepartmentListOldRespItem[]
  }

  export interface GetDepartmentListOldRespItem {
    name: string // 部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    i18n_name: GetDepartmentListOldRespItemI18nName // 国际化的部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    parent_department_id: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    department_id: string // 本部门的自定义部门ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    open_department_id: string // 部门的open_id
    leader_user_id: string // 部门主管用户ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    chat_id: string // 部门群ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    order: string // 部门的排序, 即部门在其同级部门的展示顺序, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    member_count: number // 部门下用户的个数, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    status: GetDepartmentListOldRespItemStatus // 部门状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
  }

  export interface GetDepartmentListOldRespItemI18nName {
    zh_cn: string // 部门的中文名
    ja_jp: string // 部门的日文名
    en_us: string // 部门的英文名
  }

  export interface GetDepartmentListOldRespItemStatus {
    is_deleted: boolean // 是否被删除
  }

  export interface getDepartmentListOldResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDepartmentListOldResp
  }

  export interface GetParentDepartmentReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门
    department_id: string // 部门ID, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141"
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/RD/cIFmu77WxpxPB/2oHfQLZ%2BG8JG6tK7%2BZnHiT7COhD2hMSICh/eBl7cpzU6JEC3J7COKNe4jrQ8ExwBCR"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
  }

  export interface GetParentDepartmentResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetParentDepartmentRespItem[]
  }

  export interface GetParentDepartmentRespItem {
    name: string // 部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    i18n_name: GetParentDepartmentRespItemI18nName // 国际化的部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    parent_department_id: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    department_id: string // 本部门的自定义部门ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    open_department_id: string // 部门的open_id
    leader_user_id: string // 部门主管用户ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    chat_id: string // 部门群ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    order: string // 部门的排序, 即部门在其同级部门的展示顺序, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    member_count: number // 部门下用户的个数, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    status: GetParentDepartmentRespItemStatus // 部门状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
  }

  export interface GetParentDepartmentRespItemI18nName {
    zh_cn: string // 部门的中文名
    ja_jp: string // 部门的日文名
    en_us: string // 部门的英文名
  }

  export interface GetParentDepartmentRespItemStatus {
    is_deleted: boolean // 是否被删除
  }

  export interface getParentDepartmentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetParentDepartmentResp
  }

  export interface SearchDepartmentReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义 department_id 来标识部门, `open_department_id`: 以 open_department_id 来标识部门
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/RD/cIFmu77WxpxPB/2oHfQLZ+G8JG6tK7+ZnHiT7COhD2hMSICh/eBl7cpzU6JEC3J7COKNe4jrQ8ExwBCR"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    query: string // 搜索关键词, 匹配字段为部门名称（不支持匹配部门国际化名称）, 示例值: "DemoName"
  }

  export interface SearchDepartmentResp {
    items?: SearchDepartmentRespItem[]
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface SearchDepartmentRespItem {
    name: string // 部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    i18n_name: SearchDepartmentRespItemI18nName // 国际化的部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    parent_department_id: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    department_id: string // 本部门的自定义部门ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    open_department_id: string // 部门的open_id
    leader_user_id: string // 部门主管用户ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    chat_id: string // 部门群ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    order: string // 部门的排序, 即部门在其同级部门的展示顺序, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    member_count: number // 部门下用户的个数, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 以应用身份访问通讯录, 读取通讯录
    status: SearchDepartmentRespItemStatus // 部门状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 以应用身份访问通讯录, 读取通讯录
    create_group_chat: boolean // 是否创建部门群, 默认不创建
  }

  export interface SearchDepartmentRespItemI18nName {
    zh_cn: string // 部门的中文名
    ja_jp: string // 部门的日文名
    en_us: string // 部门的英文名
  }

  export interface SearchDepartmentRespItemStatus {
    is_deleted: boolean // 是否被删除
  }

  export interface searchDepartmentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SearchDepartmentResp
  }

  export interface UpdateDepartmentPatchReq {
    department_id: string // 部门ID, 需要与查询参数中传入的department_id_type类型保持一致, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141", 最大长度: `64` 字符, 正则校验: `^0|[^od][A-Za-z0-9]*`
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    name?: string // 部门名称, 示例值: "DemoName", 最小长度: `1` 字符
    i18n_name?: UpdateDepartmentPatchReqI18nName // 国际化的部门名称
    parent_department_id?: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 示例值: "D067"
    leader_user_id?: string // 部门主管用户ID, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    order?: string // 部门的排序, 即部门在其同级部门的展示顺序, 示例值: "100"
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 示例值: custom_unit_id
    create_group_chat?: boolean // 是否创建部门群, 默认不创建, 示例值: false
  }

  export interface UpdateDepartmentPatchReqI18nName {
    zh_cn?: string // 部门的中文名, 示例值: "Demo名称"
    ja_jp?: string // 部门的日文名, 示例值: "デモ名"
    en_us?: string // 部门的英文名, 示例值: "Demo Name"
  }

  export interface UpdateDepartmentPatchResp {
    department: UpdateDepartmentPatchRespDepartment // 部门信息
  }

  export interface UpdateDepartmentPatchRespDepartment {
    name: string // 部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    i18n_name: UpdateDepartmentPatchRespDepartmentI18nName // 国际化的部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    parent_department_id: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    department_id: string // 本部门的自定义部门ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    open_department_id: string // 部门的open_id
    leader_user_id: string // 部门主管用户ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    chat_id: string // 部门群ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    order: string // 部门的排序, 即部门在其同级部门的展示顺序, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    member_count: number // 部门下用户的个数, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    status: UpdateDepartmentPatchRespDepartmentStatus // 部门状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
  }

  export interface UpdateDepartmentPatchRespDepartmentI18nName {
    zh_cn: string // 部门的中文名
    ja_jp: string // 部门的日文名
    en_us: string // 部门的英文名
  }

  export interface UpdateDepartmentPatchRespDepartmentStatus {
    is_deleted: boolean // 是否被删除
  }

  export interface updateDepartmentPatchResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateDepartmentPatchResp
  }

  export interface UpdateDepartmentReq {
    department_id: string // 部门ID, 需要与查询参数中传入的department_id_type类型保持一致, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141", 最大长度: `64` 字符, 正则校验: `^0|[^od][A-Za-z0-9]*`
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    name: string // 部门名称, 示例值: "DemoName", 最小长度: `1` 字符
    i18n_name?: UpdateDepartmentReqI18nName // 国际化的部门名称
    parent_department_id: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 示例值: "D067"
    leader_user_id?: string // 部门主管用户ID, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    order?: string // 部门的排序, 即部门在其同级部门的展示顺序, 示例值: "100"
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 示例值: custom_unit_id
    create_group_chat?: boolean // 是否创建部门群, 默认不创建, 示例值: false
  }

  export interface UpdateDepartmentReqI18nName {
    zh_cn?: string // 部门的中文名, 示例值: "Demo名称"
    ja_jp?: string // 部门的日文名, 示例值: "デモ名"
    en_us?: string // 部门的英文名, 示例值: "Demo Name"
  }

  export interface UpdateDepartmentResp {
    department: UpdateDepartmentRespDepartment // 部门信息
  }

  export interface UpdateDepartmentRespDepartment {
    name: string // 部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    i18n_name: UpdateDepartmentRespDepartmentI18nName // 国际化的部门名称, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    parent_department_id: string // 父部门的ID, * 创建根部门, 该参数值为 “0”, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    department_id: string // 本部门的自定义部门ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    open_department_id: string // 部门的open_id
    leader_user_id: string // 部门主管用户ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    chat_id: string // 部门群ID, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
    order: string // 部门的排序, 即部门在其同级部门的展示顺序, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    unit_ids?: string[] // 部门单位自定义ID列表, 当前只支持一个, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    member_count: number // 部门下用户的个数, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门组织架构信息, 读取通讯录, 以应用身份访问通讯录
    status: UpdateDepartmentRespDepartmentStatus // 部门状态, 字段权限要求（满足任一）: 以应用身份读取通讯录, 获取部门基础信息, 读取通讯录, 以应用身份访问通讯录
  }

  export interface UpdateDepartmentRespDepartmentI18nName {
    zh_cn: string // 部门的中文名
    ja_jp: string // 部门的日文名
    en_us: string // 部门的英文名
  }

  export interface UpdateDepartmentRespDepartmentStatus {
    is_deleted: boolean // 是否被删除
  }

  export interface updateDepartmentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateDepartmentResp
  }

  export interface DeleteDepartmentReq {
    department_id: string // 部门ID, 需要与查询参数中传入的department_id_type类型保持一致, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141", 最大长度: `64` 字符, 正则校验: `^0|[^od][A-Za-z0-9]*`
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
  }

  export interface DeleteDepartmentResp {}

  export interface deleteDepartmentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteDepartmentResp
  }

  export interface UnbindDepartmentChatReq {
    department_id_type?: string // 此次调用中使用的部门ID的类型, 默认为"open_department_id", 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门
    department_id: string // 部门ID, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141"
  }

  export interface UnbindDepartmentChatResp {}

  export interface unbindDepartmentChatResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UnbindDepartmentChatResp
  }

  export interface CreateContactGroupReq {
    group_id?: string // 自定义用户组ID, 可在创建时自定义, 不自定义则由系统自动生成, 已创建用户组不允许修改 group_id, 自定义group_id 最大长度: 64 字符, 校验规则: 数字、大小写字母的组合, 不能包含空格, 示例值: "g122817"
    name: string // 用户组的名字, 企业内唯一, 最大长度: 100 字符, 示例值: "IT 外包组"
    description?: string // 用户组描述, 示例值: "IT服务人员的集合"
    type?: number // 用户组的类型。默认为1表示普通用户组, 示例值: 1, 可选值有: `1`: 普通用户组, 默认值: `1`
  }

  export interface CreateContactGroupResp {
    group_id: string // 用户组ID
  }

  export interface createContactGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateContactGroupResp
  }

  export interface UpdateContactGroupReq {
    group_id: string // 用户组ID, 示例值: "g187131"
    name?: string // 用户组的名字, 企业内唯一, 最大长度: 100 字符, 示例值: "外包 IT 用户组"
    description?: string // 用户组描述信息, 最大长度: 500 字, 示例值: "IT 外包用户组, 需要进行细粒度权限管控"
  }

  export interface UpdateContactGroupResp {}

  export interface updateContactGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateContactGroupResp
  }

  export interface DeleteContactGroupReq {
    group_id: string // 需删除的用户组ID, 示例值: "g1837191"
  }

  export interface DeleteContactGroupResp {}

  export interface deleteContactGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteContactGroupResp
  }

  export interface GetContactGroupReq {
    group_id: string // 用户组ID, 示例值: "g193821"
  }

  export interface GetContactGroupResp {
    group: GetContactGroupRespGroup // 用户组详情
  }

  export interface GetContactGroupRespGroup {
    id: string // 用户组ID
    name: string // 用户组名字
    description: string // 用户组描述
    member_user_count: number // 用户组成员中用户的数量
    member_department_count: number // 普通用户组成员中部门的数量, 动态用户组成员中没有部门。
  }

  export interface getContactGroupResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetContactGroupResp
  }

  export interface GetContactGroupListReq {
    page_size?: number // 分页大小, 示例值: 50, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/dk53s4Ebp882DYfFaPFbz00L4CMZJrqGdzNyc8BcZtDbwVUvRmQTvyMYicnGWrde9X56TgdBuS+JKiSIkdexPw="
    type?: number // 用户组类型, 示例值: 1, 可选值有: 1: 普通用户组, 2: 动态用户组, 默认值: `1`
  }

  export interface GetContactGroupListResp {
    grouplist?: GetContactGroupListRespGroup[] // 用户组列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetContactGroupListRespGroup {
    id: string // 用户组ID
    name: string // 用户组名字
    description: string // 用户组描述
    member_user_count: number // 用户组成员中用户的数量
    member_department_count: number // 普通用户组成员中部门的数量, 动态用户组成员中没有部门。
  }

  export interface getContactGroupListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetContactGroupListResp
  }

  export interface GetContactMemberGroupListReq {
    member_id: string // 成员ID, 示例值: "u287xj12"
    member_id_type?: string // 成员ID类型, 示例值: "open_id", 可选值有: open_id: member_id_type为user时, 表示用户的open_id, union_id: member_id_type为user时, 表示用户的union_id, user_id: member_id_type为user时, 表示用户的user_id, 默认值: `open_id`
    group_type?: number // 欲获取的用户组类型, 示例值: 1, 可选值有: 1: 普通用户组, 2: 动态用户组, 取值范围: `1` ～ `2`
    page_size?: number // 分页查询大小, 示例值: 500, 默认值: `500`, 取值范围: `1` ～ `1000`
    page_token?: string // 分页查询Token, 示例值: "AQD9/Rn9eij9Pm39ED40/dk53s4Ebp882DYfFaPFbz00L4CMZJrqGdzNyc8BcZtDbwVUvRmQTvyMYicnGWrde9X56TgdBuS+JKiSIkdexPw="
  }

  export interface GetContactMemberGroupListResp {
    group_list?: string[] // 用户组ID列表
    page_token: string // 分页查询Token
    has_more: boolean // 是否有更多结果
  }

  export interface getContactMemberGroupListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetContactMemberGroupListResp
  }

  export interface AddContactGroupMemberReq {
    group_id: string // 用户组ID, 示例值: "g281721"
    member_type: string // 用户组成员的类型, 取值为 user, 示例值: "user", 可选值有: `user`: 用户。返回归属于该用户组的用户列表, 默认值: `user`
    member_id_type: string // 当member_type =user时候, member_id_type表示user_id_type, 枚举值为open_id, union_id, user_id, 示例值: "open_id", 可选值有: `open_id`: member_type =user时候, 表示用户的open_id, `union_id`: member_type =user时候, 表示用户的union_id, `user_id`: member_type =user时候, 表示用户的user_id
    member_id: string // 添加的成员ID, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
  }

  export interface AddContactGroupMemberResp {}

  export interface addContactGroupMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: AddContactGroupMemberResp
  }

  export interface BatchAddContactGroupMemberReq {
    group_id: string // 用户组ID, 示例值: "test_group"
    members?: BatchAddContactGroupMemberReqMember[] // 待添加成员, 长度范围: `1` ～ `100`
  }

  export interface BatchAddContactGroupMemberReqMember {
    member_id: string // 成员ID, 示例值: "u287xj12"
    member_type: string // 用户组成员的类型, 取值为 user或department, 示例值: "user"
    member_id_type?: string // 当member_type为user时, member_id_type表示user_id_type, 可选值为open_id, union_id, user_id。仅在请求参数中有效, 响应体中不会返回此参数, 示例值: "user_id"
  }

  export interface BatchAddContactGroupMemberResp {
    results?: BatchAddContactGroupMemberRespResult[] // 成员添加操作结果
  }

  export interface BatchAddContactGroupMemberRespResult {
    member_id: string // 成员ID
    code: number // 结果响应码, 0表示成功
  }

  export interface batchAddContactGroupMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchAddContactGroupMemberResp
  }

  export interface DeleteContactGroupMemberReq {
    group_id: string // 用户组ID, 示例值: "g198123"
    member_type: string // 用户组成员的类型, 取值为 user, 示例值: "user", 可选值有: `user`: 用户。返回归属于该用户组的用户列表, 默认值: `user`
    member_id: string // 操作移除的用户组成员ID, 示例值: "xj82871k"
    member_id_type: string // 当member_type =user时候, member_id_type表示user_id_type, 枚举值为open_id, union_id, user_id, 示例值: "open_id", 可选值有: `open_id`: member_type =user时候, 表示用户的open_id, `union_id`: member_type =user时候, 表示用户的union_id, `user_id`: member_type =user时候, 表示用户的user_id, 默认值: `open_id`
  }

  export interface DeleteContactGroupMemberResp {}

  export interface deleteContactGroupMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteContactGroupMemberResp
  }

  export interface BatchDeleteContactGroupMemberReq {
    group_id: string // 用户组ID, 示例值: "test_group"
    members?: BatchDeleteContactGroupMemberReqMember[] // 待移除成员, 长度范围: `1` ～ `100`
  }

  export interface BatchDeleteContactGroupMemberReqMember {
    member_id: string // 成员ID, 示例值: "u287xj12"
    member_type: string // 用户组成员的类型, 取值为 user或department, 示例值: "user"
    member_id_type?: string // 当member_type为user时, member_id_type表示user_id_type, 可选值为open_id, union_id, user_id。仅在请求参数中有效, 响应体中不会返回此参数, 示例值: "user_id"
  }

  export interface BatchDeleteContactGroupMemberResp {}

  export interface batchDeleteContactGroupMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchDeleteContactGroupMemberResp
  }

  export interface GetContactGroupMemberReq {
    group_id: string // 用户组ID, 示例值: "g128187"
    page_size?: number // 分页大小, 示例值: 50, 默认值: `50`, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/dk53s4Ebp882DYfFaPFbz00L4CMZJrqGdzNyc8BcZtDbwVUvRmQTvyMYicnGWrde9X56TgdBuS+JKiSIkdexPw="
    member_id_type?: string // 欲获取成员ID类型, 当member_type=user时候, member_id_type表示user_id_type, 枚举值open_id, union_id和user_id, 当member_type=department时候, member_id_type表示department_id_type, 枚举值open_id和department_id, 示例值: "open_id", 可选值有: open_id: member_type =user时候, 表示用户的open_id, union_id: member_type =user时候, 表示用户的union_id, user_id: member_type =user时候, 表示用户的user_id, department_id: member_type=department时候, 表示部门的department_id, 默认值: `open_id`
    member_type?: string // 欲获取的用户组成员类型, 示例值: "user", 可选值有: user: 用户。返回归属于该用户组的用户列表, department: 部门。返回归属于该用户组的部门列表, 默认值: `user`
  }

  export interface GetContactGroupMemberResp {
    memberlist?: GetContactGroupMemberRespMember[] // 成员列表
    page_token: string // 下次分页获取的page_token
    has_more: boolean // 是否还需要分页获取
  }

  export interface GetContactGroupMemberRespMember {
    member_id: string // 成员ID
    member_type: string // 用户组成员的类型, 取值为 user或department。
    member_id_type: string // 当member_type为user时, member_id_type表示user_id_type, 可选值为open_id, union_id, user_id。仅在请求参数中有效, 响应体中不会返回此参数。
  }

  export interface getContactGroupMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetContactGroupMemberResp
  }

  export interface GetEmployeeTypeEnumListReq {
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "3"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetEmployeeTypeEnumListResp {
    items?: GetEmployeeTypeEnumListRespItem[] // 枚举数据
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface GetEmployeeTypeEnumListRespItem {
    enum_id: string // 枚举值id
    enum_value: string // 枚举的编号值, 创建新的人员类型后, 系统生成对应编号。对应[创建用户接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/create)中用户信息的employee_type字段值
    content: string // 枚举内容
    enum_type: number // 类型, 可选值有: `1`: 内置类型, `2`: 自定义
    enum_status: number // 使用状态, 可选值有: `1`: 激活, `2`: 未激活
    i18n_content?: GetEmployeeTypeEnumListRespItemI18nContent[] // i18n定义
  }

  export interface GetEmployeeTypeEnumListRespItemI18nContent {
    locale: string // 语言版本
    value: string // 字段名
  }

  export interface getEmployeeTypeEnumListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetEmployeeTypeEnumListResp
  }

  export interface UpdateEmployeeTypeEnumPatchReq {
    enum_id: string // 枚举值id, 示例值: "exGeIjow7zIqWMy+ONkFxA["
    content: string // 枚举内容, 示例值: "专家", 长度范围: `1` ～ `100` 字符
    enum_type: number // 类型, 示例值: 2, 可选值有: `1`: 内置类型, `2`: 自定义
    enum_status: number // 使用状态, 示例值: 1, 可选值有: `1`: 激活, `2`: 未激活
    i18n_content?: UpdateEmployeeTypeEnumPatchReqI18nContent[] // i18n定义
  }

  export interface UpdateEmployeeTypeEnumPatchReqI18nContent {
    locale?: string // 语言版本, 示例值: "zh_cn"
    value?: string // 字段名, 示例值: "专家"
  }

  export interface UpdateEmployeeTypeEnumPatchResp {
    employee_type_enum: UpdateEmployeeTypeEnumPatchRespEmployeeTypeEnum // 更新后的人员类型字段
  }

  export interface UpdateEmployeeTypeEnumPatchRespEmployeeTypeEnum {
    enum_id: string // 枚举值id
    enum_value: string // 枚举的编号值, 创建新的人员类型后, 系统生成对应编号。对应[创建用户接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/create)中用户信息的employee_type字段值
    content: string // 枚举内容, 长度范围: `1` ～ `100` 字符
    enum_type: number // 类型, 可选值有: `1`: 内置类型, `2`: 自定义
    enum_status: number // 使用状态, 可选值有: `1`: 激活, `2`: 未激活
    i18n_content?: UpdateEmployeeTypeEnumPatchRespEmployeeTypeEnumI18nContent[] // i18n定义
  }

  export interface UpdateEmployeeTypeEnumPatchRespEmployeeTypeEnumI18nContent {
    locale: string // 语言版本
    value: string // 字段名
  }

  export interface updateEmployeeTypeEnumPatchResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateEmployeeTypeEnumPatchResp
  }

  export interface DeleteEmployeeTypeEnumReq {
    enum_id: string // 枚举值id, 示例值: "exGeIjow7zIqWMy+ONkFxA=="
  }

  export interface DeleteEmployeeTypeEnumResp {}

  export interface deleteEmployeeTypeEnumResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteEmployeeTypeEnumResp
  }

  export interface CreateEmployeeTypeEnumReq {
    content: string // 枚举内容, 示例值: "专家", 长度范围: `1` ～ `100` 字符
    enum_type: number // 类型, 示例值: 2, 可选值有: `1`: 内置类型, `2`: 自定义
    enum_status: number // 使用状态, 示例值: 1, 可选值有: `1`: 激活, `2`: 未激活
    i18n_content?: CreateEmployeeTypeEnumReqI18nContent[] // i18n定义
  }

  export interface CreateEmployeeTypeEnumReqI18nContent {
    locale?: string // 语言版本, 示例值: "zh_cn"
    value?: string // 字段名, 示例值: "专家"
  }

  export interface CreateEmployeeTypeEnumResp {
    employee_type_enum: CreateEmployeeTypeEnumRespEmployeeTypeEnum // 新建的人员类型信息
  }

  export interface CreateEmployeeTypeEnumRespEmployeeTypeEnum {
    enum_id: string // 枚举值id
    enum_value: string // 枚举的编号值, 创建新的人员类型后, 系统生成对应编号。对应[创建用户接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/create)中用户信息的employee_type字段值
    content: string // 枚举内容
    enum_type: number // 类型, 可选值有: `1`: 内置类型, `2`: 自定义
    enum_status: number // 使用状态, 可选值有: `1`: 激活, `2`: 未激活
    i18n_content?: CreateEmployeeTypeEnumRespEmployeeTypeEnumI18nContent[] // i18n定义
  }

  export interface CreateEmployeeTypeEnumRespEmployeeTypeEnumI18nContent {
    locale: string // 语言版本
    value: string // 字段名
  }

  export interface createEmployeeTypeEnumResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateEmployeeTypeEnumResp
  }

  export interface GetContactCustomAttrListReq {
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/RYU5lvOM4s6zgbeeNNaWd%2BVKwAsoreeRWk0J2noGvJy"
  }

  export interface GetContactCustomAttrListResp {
    items?: GetContactCustomAttrListRespItem[] // 自定义字段定义
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetContactCustomAttrListRespItem {
    id: string // 自定义字段id
    type: string // 自定义字段类型, 可选值有: `TEXT`: 纯文本, 用于纯文本描述人员, 如备注, `HREF`: 静态 URL, 用于人员 Profile 跳转链接, `ENUMERATION`: 枚举, 用于结构化描述人员, 如民族, `GENERIC_USER`: 用户, 用于描述人和人关系, 如 HRBP, `PICTURE_ENUM`: 枚举图片, 以结构化的图片描述人员, 如在人员 Profile 展示荣誉徽章
    options: GetContactCustomAttrListRespItemOptions // 选项定义, 当type为`ENUMERATION`或者`PICTURE_ENUM`时此项有值, 列举所有可选项
    i18n_name?: GetContactCustomAttrListRespItemI18nName[] // 自定义字段的字段名称
  }

  export interface GetContactCustomAttrListRespItemI18nName {
    locale: string // 语言版本
    value: string // 字段名
  }

  export interface GetContactCustomAttrListRespItemOptions {
    default_option_id: string // 默认选项id
    option_type: string // 选项类型, 可选值有: `TEXT`: 文本选项, `PICTURE`: 图片选项
    options?: GetContactCustomAttrListRespItemOptionsOption[] // 选项列表
  }

  export interface GetContactCustomAttrListRespItemOptionsOption {
    id: string // 枚举类型选项id
    value: string // 枚举选项值, 当option_type为`TEXT`为文本值, 当option_type为`PICTURE`时为图片链接
    name: string // 名称, 仅option_type为PICTURE时有效
  }

  export interface getContactCustomAttrListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetContactCustomAttrListResp
  }

  export interface CreateContactUnitReq {
    unit_id?: string // 单位自定义ID。不带默认自动生成。1-64字节范围大小, 需为数字字母, 示例值: "BU121"
    name: string // 单位的名字, 长度范围为1-100个字, 示例值: "消费者事业部"
    unit_type: string // 单位类型, 长度范围为1-100个字, 创建后不可修改, 示例值: "事业部"
  }

  export interface CreateContactUnitResp {
    unit_id: string // 单位的自定义ID
  }

  export interface createContactUnitResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateContactUnitResp
  }

  export interface UpdateContactUnitReq {
    unit_id: string // 单位ID, 示例值: "BU121"
    name?: string // 单位的名字, 示例值: "消费者事业部"
  }

  export interface UpdateContactUnitResp {}

  export interface updateContactUnitResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateContactUnitResp
  }

  export interface DeleteContactUnitReq {
    unit_id: string // 单位ID, 示例值: "BU121"
  }

  export interface DeleteContactUnitResp {}

  export interface deleteContactUnitResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteContactUnitResp
  }

  export interface GetContactUnitReq {
    unit_id: string // 单位ID, 示例值: "BU121"
  }

  export interface GetContactUnitResp {
    unit: GetContactUnitRespUnit // 单位信息
  }

  export interface GetContactUnitRespUnit {
    unit_id: string // 单位的自定义ID
    name: string // 单位的名字
    unit_type: string // 单位的类型
  }

  export interface getContactUnitResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetContactUnitResp
  }

  export interface GetContactUnitListReq {
    page_size?: number // 分页大小, 默认50, 取值范围 1-100, 示例值: 50, 默认值: `50`, 最大值: `100`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/dk53s4Ebp882DYfFaPFbz00L4CMZJrqGdzNyc8BcZtDbwVUvRmQTvyMYicnGWrde9X56TgdBuS+JKiSIkdexPw="
  }

  export interface GetContactUnitListResp {
    unitlist?: GetContactUnitListRespUnit[] // 单位列表
    has_more: boolean // 是否还有分页数据
    page_token: string // 分页下次调用的page_token值
  }

  export interface GetContactUnitListRespUnit {
    unit_id: string // 单位的自定义ID
    name: string // 单位的名字
    unit_type: string // 单位的类型
  }

  export interface getContactUnitListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetContactUnitListResp
  }

  export interface BindContactUnitDepartmentReq {
    unit_id: string // 单位ID, 示例值: "BU121"
    department_id: string // 单位关联的部门ID, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141"
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
  }

  export interface BindContactUnitDepartmentResp {}

  export interface bindContactUnitDepartmentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BindContactUnitDepartmentResp
  }

  export interface UnbindContactUnitDepartmentReq {
    unit_id: string // 单位ID, 示例值: "BU121"
    department_id: string // 预解除关联的部门ID, 示例值: "od-4e6ac4d14bcd5071a37a39de902c7141"
    department_id_type?: string // 此次调用中使用的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
  }

  export interface UnbindContactUnitDepartmentResp {}

  export interface unbindContactUnitDepartmentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UnbindContactUnitDepartmentResp
  }

  export interface GetContactUnitDepartmentListReq {
    unit_id: string // 单位ID, 示例值: "BU121"
    department_id_type?: string // 此次调用中预获取的部门ID的类型, 示例值: "open_department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/dk53s4Ebp882DYfFaPFbz00L4CMZJrqGdzNyc8BcZtDbwVUvRmQTvyMYicnGWrde9X56TgdBuS+JKiSIkdexPw="
    page_size?: number // 分页大小, 示例值: 50, 默认值: `50`, 最大值: `100`
  }

  export interface GetContactUnitDepartmentListResp {
    departmentlist?: GetContactUnitDepartmentListRespDepartment[] // 单位绑定的部门列表
    has_more: boolean // 是否还有分页数据
    page_token: string // 下次分页请求标记
  }

  export interface GetContactUnitDepartmentListRespDepartment {
    unit_id: string // 单位ID
    department_id: string // 部门ID
  }

  export interface getContactUnitDepartmentListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetContactUnitDepartmentListResp
  }

  export interface GetContactScopeListReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    department_id_type?: string // 返回值的部门ID的类型, 示例值: "department_id", 可选值有: `department_id`: 以自定义department_id来标识部门, `open_department_id`: 以open_department_id来标识部门, 默认值: `open_department_id`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "AQD9/Rn9eij9Pm39ED40/dk53s4Ebp882DYfFaPFbz00L4CMZJrqGdzNyc8BcZtDbwVUvRmQTvyMYicnGWrde9X56TgdBuS+JKiSIkdexPw="
    page_size?: number // 分页大小, 示例值: 50, 最大值: `100`
  }

  export interface GetContactScopeListResp {
    department_ids?: string[] // 已授权部门列表, 授权范围为全员可见时返回的是当前企业的所有一级部门列表
    user_ids?: string[] // 已授权用户列表, 应用申请了获取用户user_id 权限时返回；当授权范围为全员可见时返回的是当前企业所有顶级部门用户列表
    group_ids?: string[] // 已授权的用户组, 授权范围为全员可见时返回的是当前企业所有用户组
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
  }

  export interface getContactScopeListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetContactScopeListResp
  }
}

class SearchUserOldReq {
  query?: any
  page_size?: any
  page_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.query !== undefined) {
      q['query'] = this.query
    }
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

class CreateUserReq {
  user_id_type?: any
  department_id_type?: any
  client_token?: any
  user_id?: any
  name?: any
  en_name?: any
  nickname?: any
  email?: any
  mobile?: any
  mobile_visible?: any
  gender?: any
  avatar_key?: any
  department_ids?: any
  leader_user_id?: any
  city?: any
  country?: any
  work_station?: any
  join_time?: any
  employee_no?: any
  employee_type?: any
  orders?: any
  custom_attrs?: any
  enterprise_email?: any
  job_title?: any
  ent_email_password?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      user_id: this.user_id,
      name: this.name,
      en_name: this.en_name,
      nickname: this.nickname,
      email: this.email,
      mobile: this.mobile,
      mobile_visible: this.mobile_visible,
      gender: this.gender,
      avatar_key: this.avatar_key,
      department_ids: this.department_ids,
      leader_user_id: this.leader_user_id,
      city: this.city,
      country: this.country,
      work_station: this.work_station,
      join_time: this.join_time,
      employee_no: this.employee_no,
      employee_type: this.employee_type,
      orders: this.orders,
      custom_attrs: this.custom_attrs,
      enterprise_email: this.enterprise_email,
      job_title: this.job_title,
      ent_email_password: this.ent_email_password
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.client_token !== undefined) {
      q['client_token'] = this.client_token
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteUserReq {
  user_id?: any
  user_id_type?: any
  department_chat_acceptor_user_id?: any
  external_chat_acceptor_user_id?: any
  docs_acceptor_user_id?: any
  calendar_acceptor_user_id?: any
  application_acceptor_user_id?: any
  helpdesk_acceptor_user_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      department_chat_acceptor_user_id: this.department_chat_acceptor_user_id,
      external_chat_acceptor_user_id: this.external_chat_acceptor_user_id,
      docs_acceptor_user_id: this.docs_acceptor_user_id,
      calendar_acceptor_user_id: this.calendar_acceptor_user_id,
      application_acceptor_user_id: this.application_acceptor_user_id,
      helpdesk_acceptor_user_id: this.helpdesk_acceptor_user_id
    }
  }

  getPath(path: string) {
    path = path.replace(':user_id', this.user_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetUserReq {
  user_id?: any
  user_id_type?: any
  department_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':user_id', this.user_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetUserListReq {
  user_id_type?: any
  department_id_type?: any
  department_id?: any
  page_size?: any
  page_token?: any

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
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.department_id !== undefined) {
      q['department_id'] = this.department_id
    }
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

class GetUserListOldReq {
  user_id_type?: any
  department_id_type?: any
  department_id?: any
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
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.department_id !== undefined) {
      q['department_id'] = this.department_id
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

class BatchGetUserReq {
  employee_ids?: any
  open_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.employee_ids !== undefined) {
      q['employee_ids'] = this.employee_ids
    }
    if (this.open_ids !== undefined) {
      q['open_ids'] = this.open_ids
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateUserPatchReq {
  user_id?: any
  user_id_type?: any
  department_id_type?: any
  name?: any
  en_name?: any
  nickname?: any
  email?: any
  mobile?: any
  mobile_visible?: any
  gender?: any
  avatar_key?: any
  department_ids?: any
  leader_user_id?: any
  city?: any
  country?: any
  work_station?: any
  join_time?: any
  employee_no?: any
  employee_type?: any
  orders?: any
  custom_attrs?: any
  enterprise_email?: any
  job_title?: any
  is_frozen?: any
  ent_email_password?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      en_name: this.en_name,
      nickname: this.nickname,
      email: this.email,
      mobile: this.mobile,
      mobile_visible: this.mobile_visible,
      gender: this.gender,
      avatar_key: this.avatar_key,
      department_ids: this.department_ids,
      leader_user_id: this.leader_user_id,
      city: this.city,
      country: this.country,
      work_station: this.work_station,
      join_time: this.join_time,
      employee_no: this.employee_no,
      employee_type: this.employee_type,
      orders: this.orders,
      custom_attrs: this.custom_attrs,
      enterprise_email: this.enterprise_email,
      job_title: this.job_title,
      is_frozen: this.is_frozen,
      ent_email_password: this.ent_email_password
    }
  }

  getPath(path: string) {
    path = path.replace(':user_id', this.user_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateUserReq {
  user_id?: any
  user_id_type?: any
  department_id_type?: any
  name?: any
  en_name?: any
  nickname?: any
  email?: any
  mobile?: any
  mobile_visible?: any
  gender?: any
  avatar_key?: any
  department_ids?: any
  leader_user_id?: any
  city?: any
  country?: any
  work_station?: any
  join_time?: any
  employee_no?: any
  employee_type?: any
  orders?: any
  custom_attrs?: any
  enterprise_email?: any
  job_title?: any
  is_frozen?: any
  ent_email_password?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      en_name: this.en_name,
      nickname: this.nickname,
      email: this.email,
      mobile: this.mobile,
      mobile_visible: this.mobile_visible,
      gender: this.gender,
      avatar_key: this.avatar_key,
      department_ids: this.department_ids,
      leader_user_id: this.leader_user_id,
      city: this.city,
      country: this.country,
      work_station: this.work_station,
      join_time: this.join_time,
      employee_no: this.employee_no,
      employee_type: this.employee_type,
      orders: this.orders,
      custom_attrs: this.custom_attrs,
      enterprise_email: this.enterprise_email,
      job_title: this.job_title,
      is_frozen: this.is_frozen,
      ent_email_password: this.ent_email_password
    }
  }

  getPath(path: string) {
    path = path.replace(':user_id', this.user_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchGetUserByIDReq {
  user_id_type?: any
  emails?: any
  mobiles?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      emails: this.emails,
      mobiles: this.mobiles
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

class BatchGetUserByIDOldReq {
  emails?: any
  mobiles?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.emails !== undefined) {
      q['emails'] = this.emails
    }
    if (this.mobiles !== undefined) {
      q['mobiles'] = this.mobiles
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateDepartmentReq {
  user_id_type?: any
  department_id_type?: any
  client_token?: any
  name?: any
  i18n_name?: any
  parent_department_id?: any
  department_id?: any
  leader_user_id?: any
  order?: any
  unit_ids?: any
  create_group_chat?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      i18n_name: this.i18n_name,
      parent_department_id: this.parent_department_id,
      department_id: this.department_id,
      leader_user_id: this.leader_user_id,
      order: this.order,
      unit_ids: this.unit_ids,
      create_group_chat: this.create_group_chat
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.client_token !== undefined) {
      q['client_token'] = this.client_token
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetDepartmentReq {
  department_id?: any
  user_id_type?: any
  department_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':department_id', this.department_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetDepartmentListReq {
  department_id?: any
  user_id_type?: any
  department_id_type?: any
  fetch_child?: any
  page_size?: any
  page_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':department_id', this.department_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.fetch_child !== undefined) {
      q['fetch_child'] = this.fetch_child
    }
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

class GetDepartmentListOldReq {
  user_id_type?: any
  department_id_type?: any
  parent_department_id?: any
  fetch_child?: any
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
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.parent_department_id !== undefined) {
      q['parent_department_id'] = this.parent_department_id
    }
    if (this.fetch_child !== undefined) {
      q['fetch_child'] = this.fetch_child
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

class GetParentDepartmentReq {
  user_id_type?: any
  department_id_type?: any
  department_id?: any
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
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    if (this.department_id !== undefined) {
      q['department_id'] = this.department_id
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

class SearchDepartmentReq {
  user_id_type?: any
  department_id_type?: any
  page_token?: any
  page_size?: any
  query?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      query: this.query
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
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

class UpdateDepartmentPatchReq {
  department_id?: any
  user_id_type?: any
  department_id_type?: any
  name?: any
  i18n_name?: any
  parent_department_id?: any
  leader_user_id?: any
  order?: any
  unit_ids?: any
  create_group_chat?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      i18n_name: this.i18n_name,
      parent_department_id: this.parent_department_id,
      leader_user_id: this.leader_user_id,
      order: this.order,
      unit_ids: this.unit_ids,
      create_group_chat: this.create_group_chat
    }
  }

  getPath(path: string) {
    path = path.replace(':department_id', this.department_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateDepartmentReq {
  department_id?: any
  user_id_type?: any
  department_id_type?: any
  name?: any
  i18n_name?: any
  parent_department_id?: any
  leader_user_id?: any
  order?: any
  unit_ids?: any
  create_group_chat?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      i18n_name: this.i18n_name,
      parent_department_id: this.parent_department_id,
      leader_user_id: this.leader_user_id,
      order: this.order,
      unit_ids: this.unit_ids,
      create_group_chat: this.create_group_chat
    }
  }

  getPath(path: string) {
    path = path.replace(':department_id', this.department_id)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteDepartmentReq {
  department_id?: any
  department_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':department_id', this.department_id)

    const q = {} as { [key: string]: any }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UnbindDepartmentChatReq {
  department_id_type?: any
  department_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      department_id: this.department_id
    }
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateContactGroupReq {
  group_id?: any
  name?: any
  description?: any
  type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      group_id: this.group_id,
      name: this.name,
      description: this.description,
      type: this.type
    }
  }

  getPath(path: string) {
    return path
  }
}

class UpdateContactGroupReq {
  group_id?: any
  name?: any
  description?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      description: this.description
    }
  }

  getPath(path: string) {
    path = path.replace(':group_id', this.group_id)

    return path
  }
}

class DeleteContactGroupReq {
  group_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':group_id', this.group_id)

    return path
  }
}

class GetContactGroupReq {
  group_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':group_id', this.group_id)

    return path
  }
}

class GetContactGroupListReq {
  page_size?: any
  page_token?: any
  type?: any

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
    if (this.type !== undefined) {
      q['type'] = this.type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetContactMemberGroupListReq {
  member_id?: any
  member_id_type?: any
  group_type?: any
  page_size?: any
  page_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.member_id !== undefined) {
      q['member_id'] = this.member_id
    }
    if (this.member_id_type !== undefined) {
      q['member_id_type'] = this.member_id_type
    }
    if (this.group_type !== undefined) {
      q['group_type'] = this.group_type
    }
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

class AddContactGroupMemberReq {
  group_id?: any
  member_type?: any
  member_id_type?: any
  member_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      member_type: this.member_type,
      member_id_type: this.member_id_type,
      member_id: this.member_id
    }
  }

  getPath(path: string) {
    path = path.replace(':group_id', this.group_id)

    return path
  }
}

class BatchAddContactGroupMemberReq {
  group_id?: any
  members?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      members: this.members
    }
  }

  getPath(path: string) {
    path = path.replace(':group_id', this.group_id)

    return path
  }
}

class DeleteContactGroupMemberReq {
  group_id?: any
  member_type?: any
  member_id?: any
  member_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      member_type: this.member_type,
      member_id: this.member_id,
      member_id_type: this.member_id_type
    }
  }

  getPath(path: string) {
    path = path.replace(':group_id', this.group_id)

    return path
  }
}

class BatchDeleteContactGroupMemberReq {
  group_id?: any
  members?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      members: this.members
    }
  }

  getPath(path: string) {
    path = path.replace(':group_id', this.group_id)

    return path
  }
}

class GetContactGroupMemberReq {
  group_id?: any
  page_size?: any
  page_token?: any
  member_id_type?: any
  member_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':group_id', this.group_id)

    const q = {} as { [key: string]: any }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.member_id_type !== undefined) {
      q['member_id_type'] = this.member_id_type
    }
    if (this.member_type !== undefined) {
      q['member_type'] = this.member_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetEmployeeTypeEnumListReq {
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

class UpdateEmployeeTypeEnumPatchReq {
  enum_id?: any
  content?: any
  enum_type?: any
  enum_status?: any
  i18n_content?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      content: this.content,
      enum_type: this.enum_type,
      enum_status: this.enum_status,
      i18n_content: this.i18n_content
    }
  }

  getPath(path: string) {
    path = path.replace(':enum_id', this.enum_id)

    return path
  }
}

class DeleteEmployeeTypeEnumReq {
  enum_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':enum_id', this.enum_id)

    return path
  }
}

class CreateEmployeeTypeEnumReq {
  content?: any
  enum_type?: any
  enum_status?: any
  i18n_content?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      content: this.content,
      enum_type: this.enum_type,
      enum_status: this.enum_status,
      i18n_content: this.i18n_content
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetContactCustomAttrListReq {
  page_size?: any
  page_token?: any

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
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateContactUnitReq {
  unit_id?: any
  name?: any
  unit_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      unit_id: this.unit_id,
      name: this.name,
      unit_type: this.unit_type
    }
  }

  getPath(path: string) {
    return path
  }
}

class UpdateContactUnitReq {
  unit_id?: any
  name?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name
    }
  }

  getPath(path: string) {
    path = path.replace(':unit_id', this.unit_id)

    return path
  }
}

class DeleteContactUnitReq {
  unit_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':unit_id', this.unit_id)

    return path
  }
}

class GetContactUnitReq {
  unit_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':unit_id', this.unit_id)

    return path
  }
}

class GetContactUnitListReq {
  page_size?: any
  page_token?: any

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
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BindContactUnitDepartmentReq {
  unit_id?: any
  department_id?: any
  department_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      unit_id: this.unit_id,
      department_id: this.department_id,
      department_id_type: this.department_id_type
    }
  }

  getPath(path: string) {
    return path
  }
}

class UnbindContactUnitDepartmentReq {
  unit_id?: any
  department_id?: any
  department_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      unit_id: this.unit_id,
      department_id: this.department_id,
      department_id_type: this.department_id_type
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetContactUnitDepartmentListReq {
  unit_id?: any
  department_id_type?: any
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
    if (this.unit_id !== undefined) {
      q['unit_id'] = this.unit_id
    }
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
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

class GetContactScopeListReq {
  user_id_type?: any
  department_id_type?: any
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
    if (this.department_id_type !== undefined) {
      q['department_id_type'] = this.department_id_type
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
