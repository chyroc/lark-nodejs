import { Lark } from '../src'
import { Approval } from '../src/api_approval'
import { appAllPermission, approvalALLField, userAdmin } from './help.test'

describe('approval.test.get_approval', () => {
  const approvalAllFieldCode = approvalALLField.code
  const cli = appAllPermission.ins()

  it('ai.detectTextLanguage', async () => {
    const resp = await cli.approval.getApproval({
      approval_code: approvalAllFieldCode!
    })
    expect(resp.data.approval_name).toEqual('sdk-demo')
    console.log(resp.data)
    console.log(JSON.parse(resp.data.form))
// 	widgets := []*lark.ApprovalWidget{
// 		{Type: lark.ApprovalWidgetTypeInput, Name: "单行文本"},
// 		{Type: lark.ApprovalWidgetTypeTextarea, Name: "多行文本"},
// 		{Type: lark.ApprovalWidgetTypeText, Name: "说明 1"},
// 		{Type: lark.ApprovalWidgetTypeNumber, Name: "数字"},
// 		{Type: lark.ApprovalWidgetTypeAmount, Name: "金额"},
// 		{Type: lark.ApprovalWidgetTypeFormula, Name: "计算公式"},
// 		{Type: lark.ApprovalWidgetTypeRadioV2, Name: "单选", Option: &lark.ApprovalWidgetOptions{IsList: true, Options: []*lark.ApprovalWidgetOption{{Text: "1"}, {Text: "2"}}}},
// 		{Type: lark.ApprovalWidgetTypeCheckboxV2, Name: "多选", Option: &lark.ApprovalWidgetOptions{IsList: true, Options: []*lark.ApprovalWidgetOption{{Text: "1"}, {Text: "2"}, {Text: "3"}}}},
// 		{Type: lark.ApprovalWidgetTypeDate, Name: "日期"},
// 		{Type: lark.ApprovalWidgetTypeDateInterval, Name: "DateInterval"},
// 		{Type: lark.ApprovalWidgetTypeFieldList, Name: "明细", Children: []*lark.ApprovalWidget{{Name: "单行文本"}, {Name: "多行文本"}}},
// 		{Type: lark.ApprovalWidgetTypeImage, Name: "图片"},
// 		{Type: lark.ApprovalWidgetTypeAttachmentV2, Name: "附件"},
// 		{Type: lark.ApprovalWidgetTypeDepartment, Name: "部门"},
// 		{Type: lark.ApprovalWidgetTypeContact, Name: "联系人"},
// 		{Type: lark.ApprovalWidgetTypeConnect, Name: "关联审批"},
// 		{Type: lark.ApprovalWidgetTypeAddress, Name: "地址"},
// 	}
// 	as.Equal(len(widgets), len(resp.Form))
// 	for idx, widget := range resp.Form {
// 		expectWidget := widgets[idx]
// 		as.Equal(expectWidget.Name, widget.Name)
// 		as.Equal(expectWidget.Type, widget.Type)
// 		as.Equal(len(expectWidget.Children), len(widget.Children))
// 		if expectWidget.Option != nil {
// 			as.Equal(len(expectWidget.Option.Options), len(widget.Option.Options))
// 			for optionIdx, option := range widget.Option.Options {
// 				expectOption := expectWidget.Option.Options[optionIdx]
// 				as.Equal(expectOption.Text, option.Text)
// 			}
// 			for childrenIdx, children := range widget.Children {
// 				expectChildren := expectWidget.Children[childrenIdx]
// 				as.Equal(expectChildren.Name, children.Name)
// 			}
// 		}
// 	}
// }
//
  })
})


describe('approval.test.create', () => {
  const approvalAllFieldCode = approvalALLField.code
  const cli = appAllPermission.ins()

  it('cancel', async () => {
    const { instanceCode } = await testCreateApproval(cli, approvalAllFieldCode!, userAdmin.userID, userAdmin.openID)
    const resp = await cli.approval.cancelApprovalInstance({
      approval_code: approvalAllFieldCode,
      instance_code: instanceCode,
      user_id: userAdmin.openID
    })
  })
})

async function testCreateApproval(cli: Lark, approvalCode: string, userID: string, openID: string): Promise<{ instanceCode: string, instance: Approval.GetApprovalInstanceResp }> {
  const res = await cli.approval.getApproval({
    approval_code: approvalCode
  })
  const widgetDefine = JSON.parse(res.data.form) as any[]

  const res2 = await cli.approval.createApprovalInstance({
    approval_code: approvalCode,
    user_id: userID,
    open_id: openID,
    form: JSON.stringify([{
      ...widgetDefine[0],
      value: 'test'
    }])
  })

  const ins = await cli.approval.getApprovalInstance({
    instance_id: res2.data.instance_code
  })

  return { instanceCode: res2.data.instance_code, instance: ins.data }
}
