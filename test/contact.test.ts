import { appAllPermission, userAdmin } from './help.test'

describe('contact', () => {
  const cli = appAllPermission.ins()

  it('getUser', async () => {
    const resp = await cli.contact.getUser({
      user_id_type: 'user_id',
      user_id: userAdmin.userID
    })
    expect(resp.data.user.open_id).toEqual(userAdmin.openID)
    expect(resp.data.user.is_tenant_manager).toBeTruthy()
    expect(resp.data.user.status.is_activated).toBeTruthy()
  }, 20 * 1000)

  it('getDepartment', async () => {
    const resp = await cli.contact.getDepartment({
      user_id_type: 'user_id',
      department_id_type: 'department_id',
      department_id: '0'
    })
    expect(resp.data.department.member_count).toBeGreaterThan(0)
    expect(resp.data.department.open_department_id).toEqual('0')
  }, 20 * 1000)

  it('getDepartmentList', async () => {
    const resp = await cli.contact.getDepartmentList({
      department_id: '0'
    })
    expect(resp.data.items?.length).toBeGreaterThan(0)
  }, 20 * 1000)


// 	if IsInCI() {
// 			moduleCli.SearchDepartment(ctx, &lark.SearchDepartmentReq{
// 				Query:            "lark-sdk",
// 			}, lark.WithUserAccessToken(UserAdmin.AccessToken[AppAllPermission.AppID]))


  it('createDepartment', async () => {
    const createDepartmentResp = await cli.contact.createDepartment({
      user_id_type: 'user_id',
      department_id_type: 'department_id',
      name: `dep-${Math.random()}`,
      parent_department_id: '0',
      leader_user_id: userAdmin.userID
    })
    const childOpenDepartmentID = createDepartmentResp.data.department.open_department_id

    await cli.contact.getParentDepartment({
      department_id_type: 'open_department_id',
      department_id: childOpenDepartmentID
    })

    await cli.contact.updateDepartmentPatch({
      department_id_type: 'open_department_id',
      department_id: childOpenDepartmentID,
      name: `dep-update-${Math.random()}`
    })

    await cli.contact.deleteDepartment({
      department_id_type: 'open_department_id',
      department_id: childOpenDepartmentID
    })
  })
})

