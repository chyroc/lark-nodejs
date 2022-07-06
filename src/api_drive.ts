import { Lark } from './lark'
import { RawRequestReq, Response } from './request'
import { encodeQuery } from './helper'

export default class DriveService {
  private cli: Lark

  constructor(config: { lark: Lark }) {
    this.cli = config.lark
  }

  // subscribeDriveFile 该接口仅支持文档拥有者订阅自己文档的通知事件, 可订阅的文档类型为旧版文档、电子表格和多维表格。在调用该接口之前请确保正确[配置事件回调网址和订阅事件类型](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM#2eb3504a), 事件类型参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/subscribe
  async subscribeDriveFile(
    request: Drive.SubscribeDriveFileReq
  ): Promise<{
    data: Drive.SubscribeDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<SubscribeDriveFileReq> = {
      scope: 'Drive',
      api: 'SubscribeDriveFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token/subscribe',
      body: new SubscribeDriveFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SubscribeDriveFileReq, Drive.SubscribeDriveFileResp>(req)
  }
  // searchDriveFile 该接口用于根据搜索条件进行文档搜索。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ugDM4UjL4ADO14COwgTN
  async searchDriveFile(
    request: Drive.SearchDriveFileReq
  ): Promise<{
    data: Drive.SearchDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<SearchDriveFileReq> = {
      scope: 'Drive',
      api: 'SearchDriveFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/suite/docs-api/search/object',
      body: new SearchDriveFileReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SearchDriveFileReq, Drive.SearchDriveFileResp>(req)
  }
  // getDriveFileMeta 该接口用于根据 token 获取各类文件的元数据
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/meta/batch_query
  async getDriveFileMeta(
    request: Drive.GetDriveFileMetaReq
  ): Promise<{
    data: Drive.GetDriveFileMetaResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveFileMetaReq> = {
      scope: 'Drive',
      api: 'GetDriveFileMeta',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/metas/batch_query',
      body: new GetDriveFileMetaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveFileMetaReq, Drive.GetDriveFileMetaResp>(req)
  }
  // createDriveFile 在用户云空间指定文件夹中创建文档、电子表格或者多维表格。
  //
  // 如果目标文件夹是我的空间, 则新建的文档会在「我的空间」的「归我所有」列表里。
  // 云空间中文件夹单层节点上限是1500个, 超过限制新建文档接口会返回失败, 如果有这类需求, 可以考虑将文档新建在不同文件夹中。
  // 为了更好地提升该接口的安全性, 我们对其进行了升级, 如果需要创建文档可以尝试
  // [新版本>>](https://open.feishu.cn/document/ukTMukTMukTM/ugDM2YjL4AjN24COwYjN), 如果需要创建电子表格可以尝试[新版本>>](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/create)
  // 该接口不支持并发创建, 且调用频率上限为 5QPS 且 10000次/天
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uQTNzUjL0UzM14CN1MTN
  async createDriveFile(
    request: Drive.CreateDriveFileReq
  ): Promise<{
    data: Drive.CreateDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<CreateDriveFileReq> = {
      scope: 'Drive',
      api: 'CreateDriveFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/explorer/v2/file/:folderToken',
      body: new CreateDriveFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateDriveFileReq, Drive.CreateDriveFileResp>(req)
  }
  // deleteDriveFile 删除用户在云空间内的文件或者文件夹。文件或者文件夹被删除后, 会进入用户回收站里。
  //
  // 要删除文件需要确保应用具有下述两种权限之一:
  // 1. 该应用是文件所有者并且具有该文件所在父文件夹的编辑权限。
  // 2. 该应用并非文件所有者, 但是是该文件所在父文件夹的所有者或者拥有该父文件夹的所有权限（full access）。
  // 该接口不支持并发调用, 且调用频率上限为5QPS。删除文件夹会异步执行并返回一个task_id, 可以使用[task_check](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/task_check)接口查询任务执行状态。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete
  async deleteDriveFile(
    request: Drive.DeleteDriveFileReq
  ): Promise<{
    data: Drive.DeleteDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteDriveFileReq> = {
      scope: 'Drive',
      api: 'DeleteDriveFile',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token',
      body: new DeleteDriveFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteDriveFileReq, Drive.DeleteDriveFileResp>(req)
  }
  // deleteDriveSheetFile 该接口用于根据 spreadsheetToken 删除对应的 sheet 文档。
  //
  // 为了更好地提升该接口的安全性, 我们对其进行了升级, 请尽快迁移至
  // [新版本>>](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete)
  // </md-alert>
  // <md-alert type="warn">
  // 文档只能被文档所有者删除, 文档被删除后将会放到回收站里
  // 该接口不支持并发调用, 且调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUTNzUjL1UzM14SN1MTN/delete-sheet
  async deleteDriveSheetFile(
    request: Drive.DeleteDriveSheetFileReq
  ): Promise<{
    data: Drive.DeleteDriveSheetFileResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteDriveSheetFileReq> = {
      scope: 'Drive',
      api: 'DeleteDriveSheetFile',
      method: 'DELETE',
      url:
        this.cli.openBaseURL + '/open-apis/drive/explorer/v2/file/spreadsheets/:spreadsheetToken',
      body: new DeleteDriveSheetFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteDriveSheetFileReq, Drive.DeleteDriveSheetFileResp>(req)
  }
  // getDriveFileList 获取用户云空间中指定文件夹下的文件清单。清单类型包括文件、各种在线文档（文档、电子表格、多维表格、思维笔记）、文件夹和快捷方式。该接口支持分页, 但是不会递归的获取子文件夹的清单。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/list
  async getDriveFileList(
    request: Drive.GetDriveFileListReq
  ): Promise<{
    data: Drive.GetDriveFileListResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveFileListReq> = {
      scope: 'Drive',
      api: 'GetDriveFileList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files',
      body: new GetDriveFileListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveFileListReq, Drive.GetDriveFileListResp>(req)
  }
  // getDriveRootFolderMeta 该接口用于获取 "我的空间" 的元信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ugTNzUjL4UzM14CO1MTN/get-root-folder-meta
  async getDriveRootFolderMeta(
    request: Drive.GetDriveRootFolderMetaReq
  ): Promise<{
    data: Drive.GetDriveRootFolderMetaResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveRootFolderMetaReq> = {
      scope: 'Drive',
      api: 'GetDriveRootFolderMeta',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/explorer/v2/root_folder/meta',
      body: new GetDriveRootFolderMetaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveRootFolderMetaReq, Drive.GetDriveRootFolderMetaResp>(req)
  }
  // getDriveFolderMeta 该接口用于根据 folderToken 获取该文件夹的元信息。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uAjNzUjLwYzM14CM2MTN
  async getDriveFolderMeta(
    request: Drive.GetDriveFolderMetaReq
  ): Promise<{
    data: Drive.GetDriveFolderMetaResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveFolderMetaReq> = {
      scope: 'Drive',
      api: 'GetDriveFolderMeta',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/explorer/v2/folder/:folderToken/meta',
      body: new GetDriveFolderMetaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveFolderMetaReq, Drive.GetDriveFolderMetaResp>(req)
  }
  // getDriveFolderChildren 获取用户云空间中指定文件夹下的文件清单。清单类型包括文件、各种在线文档（文档、电子表格、多维表格、思维笔记）、文件夹和快捷方式。该接口不支持分页, 并且不会递归的获取子文件夹的清单。
  //
  // 为了更好地提升该接口的安全性, 我们对其进行了升级, 请尽快迁移至
  // [新版本>>](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/list)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uEjNzUjLxYzM14SM2MTN
  async getDriveFolderChildren(
    request: Drive.GetDriveFolderChildrenReq
  ): Promise<{
    data: Drive.GetDriveFolderChildrenResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveFolderChildrenReq> = {
      scope: 'Drive',
      api: 'GetDriveFolderChildren',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/explorer/v2/folder/:folderToken/children',
      body: new GetDriveFolderChildrenReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveFolderChildrenReq, Drive.GetDriveFolderChildrenResp>(req)
  }
  // getDriveFileStatistics 此接口用于获取文件统计信息, 包括文档阅读人数、次数和点赞数。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-statistics/get
  async getDriveFileStatistics(
    request: Drive.GetDriveFileStatisticsReq
  ): Promise<{
    data: Drive.GetDriveFileStatisticsResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveFileStatisticsReq> = {
      scope: 'Drive',
      api: 'GetDriveFileStatistics',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token/statistics',
      body: new GetDriveFileStatisticsReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveFileStatisticsReq, Drive.GetDriveFileStatisticsResp>(req)
  }
  // getDriveFileTask 查询删除文件夹等异步任务的状态信息。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/task_check
  async getDriveFileTask(
    request: Drive.GetDriveFileTaskReq
  ): Promise<{
    data: Drive.GetDriveFileTaskResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveFileTaskReq> = {
      scope: 'Drive',
      api: 'GetDriveFileTask',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/task_check',
      body: new GetDriveFileTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveFileTaskReq, Drive.GetDriveFileTaskResp>(req)
  }
  // createDriveExportTask 创建导出任务, 将云文档导出为文件
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create
  async createDriveExportTask(
    request: Drive.CreateDriveExportTaskReq
  ): Promise<{
    data: Drive.CreateDriveExportTaskResp
    response: Response
  }> {
    const req: RawRequestReq<CreateDriveExportTaskReq> = {
      scope: 'Drive',
      api: 'CreateDriveExportTask',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/export_tasks',
      body: new CreateDriveExportTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateDriveExportTaskReq, Drive.CreateDriveExportTaskResp>(req)
  }
  // getDriveExportTask 根据创建导出任务的ticket查询导出任务的结果
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get
  async getDriveExportTask(
    request: Drive.GetDriveExportTaskReq
  ): Promise<{
    data: Drive.GetDriveExportTaskResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveExportTaskReq> = {
      scope: 'Drive',
      api: 'GetDriveExportTask',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/export_tasks/:ticket',
      body: new GetDriveExportTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveExportTaskReq, Drive.GetDriveExportTaskResp>(req)
  }
  // downloadDriveExportTask 根据任务导出结果的token, 下载导出文件
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/download
  async downloadDriveExportTask(
    request: Drive.DownloadDriveExportTaskReq
  ): Promise<{
    data: Drive.DownloadDriveExportTaskResp
    response: Response
  }> {
    const req: RawRequestReq<DownloadDriveExportTaskReq> = {
      scope: 'Drive',
      api: 'DownloadDriveExportTask',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/export_tasks/file/:file_token/download',
      body: new DownloadDriveExportTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true,
      is_file_download: true
    }
    return this.cli.RawRequest<DownloadDriveExportTaskReq, Drive.DownloadDriveExportTaskResp>(req)
  }
  // downloadDriveFile 使用该接口可以下载在云空间目录下的文件（不含飞书文档/表格/思维导图等在线文档）。支持range下载。
  //
  // 该接口支持调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/download
  async downloadDriveFile(
    request: Drive.DownloadDriveFileReq
  ): Promise<{
    data: Drive.DownloadDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<DownloadDriveFileReq> = {
      scope: 'Drive',
      api: 'DownloadDriveFile',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token/download',
      body: new DownloadDriveFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true,
      is_file_download: true
    }
    return this.cli.RawRequest<DownloadDriveFileReq, Drive.DownloadDriveFileResp>(req)
  }
  // copyDriveFile 将文件复制到用户云空间的其他文件夹中。不支持复制文件夹。
  //
  // 如果目标文件夹是我的空间, 则复制的文件会在「我的空间」的「归我所有」列表里。
  // 该接口不支持并发拷贝多个文件, 且调用频率上限为 5QPS 且 10000次/天
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/copy
  async copyDriveFile(
    request: Drive.CopyDriveFileReq
  ): Promise<{
    data: Drive.CopyDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<CopyDriveFileReq> = {
      scope: 'Drive',
      api: 'CopyDriveFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token/copy',
      body: new CopyDriveFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CopyDriveFileReq, Drive.CopyDriveFileResp>(req)
  }
  // createDriveFolder 在用户云空间的指定文件夹中创建一个新的空文件夹。
  //
  // 该接口不支持并发创建, 且调用频率上限为 5QPS 以及 10000次/天
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_folder
  async createDriveFolder(
    request: Drive.CreateDriveFolderReq
  ): Promise<{
    data: Drive.CreateDriveFolderResp
    response: Response
  }> {
    const req: RawRequestReq<CreateDriveFolderReq> = {
      scope: 'Drive',
      api: 'CreateDriveFolder',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/create_folder',
      body: new CreateDriveFolderReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateDriveFolderReq, Drive.CreateDriveFolderResp>(req)
  }
  // moveDriveFile 将文件或者文件夹移动到用户云空间的其他位置。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/move
  async moveDriveFile(
    request: Drive.MoveDriveFileReq
  ): Promise<{
    data: Drive.MoveDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<MoveDriveFileReq> = {
      scope: 'Drive',
      api: 'MoveDriveFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token/move',
      body: new MoveDriveFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<MoveDriveFileReq, Drive.MoveDriveFileResp>(req)
  }
  // uploadDriveFile 向云空间指定目录下上传一个小文件。
  //
  // 请不要使用这个接口上传大于20MB的文件, 如果有这个需求可以尝试使用[分片上传接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/multipart-upload-file-/introduction)。
  // 该接口支持调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_all
  async uploadDriveFile(
    request: Drive.UploadDriveFileReq
  ): Promise<{
    data: Drive.UploadDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<UploadDriveFileReq> = {
      scope: 'Drive',
      api: 'UploadDriveFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/upload_all',
      body: new UploadDriveFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<UploadDriveFileReq, Drive.UploadDriveFileResp>(req)
  }
  // prepareUploadDriveFile 发送初始化请求获取上传事务ID和分块策略, 目前是以4MB大小进行定长分片。
  //
  // 你在24小时内可保存上传事务ID和上传进度, 以便可以恢复上传
  // 该接口不支持太高的并发, 且调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_prepare
  async prepareUploadDriveFile(
    request: Drive.PrepareUploadDriveFileReq
  ): Promise<{
    data: Drive.PrepareUploadDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<PrepareUploadDriveFileReq> = {
      scope: 'Drive',
      api: 'PrepareUploadDriveFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/upload_prepare',
      body: new PrepareUploadDriveFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<PrepareUploadDriveFileReq, Drive.PrepareUploadDriveFileResp>(req)
  }
  // partUploadDriveFile 上传对应的文件块。
  //
  // 该接口不支持太高的并发, 且调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_part
  async partUploadDriveFile(
    request: Drive.PartUploadDriveFileReq
  ): Promise<{
    data: Drive.PartUploadDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<PartUploadDriveFileReq> = {
      scope: 'Drive',
      api: 'PartUploadDriveFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/upload_part',
      body: new PartUploadDriveFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<PartUploadDriveFileReq, Drive.PartUploadDriveFileResp>(req)
  }
  // finishUploadDriveFile 触发完成上传。
  //
  // 该接口不支持太高的并发, 且调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_finish
  async finishUploadDriveFile(
    request: Drive.FinishUploadDriveFileReq
  ): Promise<{
    data: Drive.FinishUploadDriveFileResp
    response: Response
  }> {
    const req: RawRequestReq<FinishUploadDriveFileReq> = {
      scope: 'Drive',
      api: 'FinishUploadDriveFile',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/upload_finish',
      body: new FinishUploadDriveFileReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<FinishUploadDriveFileReq, Drive.FinishUploadDriveFileResp>(req)
  }
  // downloadDriveMedia 使用该接口可以下载素材。素材表示在各种创作容器里的文件, 如Doc文档内的图片, 文件均属于素材。支持range下载。
  //
  // 该接口不支持太高的并发, 且调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/download
  async downloadDriveMedia(
    request: Drive.DownloadDriveMediaReq
  ): Promise<{
    data: Drive.DownloadDriveMediaResp
    response: Response
  }> {
    const req: RawRequestReq<DownloadDriveMediaReq> = {
      scope: 'Drive',
      api: 'DownloadDriveMedia',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/medias/:file_token/download',
      body: new DownloadDriveMediaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true,
      is_file_download: true
    }
    return this.cli.RawRequest<DownloadDriveMediaReq, Drive.DownloadDriveMediaResp>(req)
  }
  // uploadDriveMedia 将文件、图片、视频等素材文件上传到指定云文档中。素材文件在云空间中不会显示, 只会显示在对应云文档中。
  //
  // 请不要使用这个接口上传大于20MB的文件, 如果有这个需求可以尝试使用[分片上传接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/multipart-upload-media/introduction)。
  // 该接口支持调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all
  async uploadDriveMedia(
    request: Drive.UploadDriveMediaReq
  ): Promise<{
    data: Drive.UploadDriveMediaResp
    response: Response
  }> {
    const req: RawRequestReq<UploadDriveMediaReq> = {
      scope: 'Drive',
      api: 'UploadDriveMedia',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/medias/upload_all',
      body: new UploadDriveMediaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<UploadDriveMediaReq, Drive.UploadDriveMediaResp>(req)
  }
  // prepareUploadDriveMedia 发送初始化请求获取上传事务ID和分块策略, 目前是以4MB大小进行定长分片。
  //
  // 您在24小时内可保存上传事务ID和上传进度, 以便可以恢复上传
  // 该接口不支持太高的并发, 且调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare
  async prepareUploadDriveMedia(
    request: Drive.PrepareUploadDriveMediaReq
  ): Promise<{
    data: Drive.PrepareUploadDriveMediaResp
    response: Response
  }> {
    const req: RawRequestReq<PrepareUploadDriveMediaReq> = {
      scope: 'Drive',
      api: 'PrepareUploadDriveMedia',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/medias/upload_prepare',
      body: new PrepareUploadDriveMediaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<PrepareUploadDriveMediaReq, Drive.PrepareUploadDriveMediaResp>(req)
  }
  // partUploadDriveMedia 上传对应的文件块。
  //
  // 该接口不支持太高的并发, 且调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_part
  async partUploadDriveMedia(
    request: Drive.PartUploadDriveMediaReq
  ): Promise<{
    data: Drive.PartUploadDriveMediaResp
    response: Response
  }> {
    const req: RawRequestReq<PartUploadDriveMediaReq> = {
      scope: 'Drive',
      api: 'PartUploadDriveMedia',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/medias/upload_part',
      body: new PartUploadDriveMediaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true,
      is_file: true
    }
    return this.cli.RawRequest<PartUploadDriveMediaReq, Drive.PartUploadDriveMediaResp>(req)
  }
  // finishUploadDriveMedia 触发完成上传。
  //
  // 该接口不支持太高的并发, 且调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_finish
  async finishUploadDriveMedia(
    request: Drive.FinishUploadDriveMediaReq
  ): Promise<{
    data: Drive.FinishUploadDriveMediaResp
    response: Response
  }> {
    const req: RawRequestReq<FinishUploadDriveMediaReq> = {
      scope: 'Drive',
      api: 'FinishUploadDriveMedia',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/medias/upload_finish',
      body: new FinishUploadDriveMediaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<FinishUploadDriveMediaReq, Drive.FinishUploadDriveMediaResp>(req)
  }
  // createDriveMemberPermissionOld 该接口用于根据 filetoken 给用户增加文档的权限。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMzNzUjLzczM14yM3MTN
  async createDriveMemberPermissionOld(
    request: Drive.CreateDriveMemberPermissionOldReq
  ): Promise<{
    data: Drive.CreateDriveMemberPermissionOldResp
    response: Response
  }> {
    const req: RawRequestReq<CreateDriveMemberPermissionOldReq> = {
      scope: 'Drive',
      api: 'CreateDriveMemberPermissionOld',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/permission/member/create',
      body: new CreateDriveMemberPermissionOldReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      CreateDriveMemberPermissionOldReq,
      Drive.CreateDriveMemberPermissionOldResp
    >(req)
  }
  // transferDriveMemberPermission 该接口用于根据文档信息和用户信息转移文档的所有者。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uQzNzUjL0czM14CN3MTN
  async transferDriveMemberPermission(
    request: Drive.TransferDriveMemberPermissionReq
  ): Promise<{
    data: Drive.TransferDriveMemberPermissionResp
    response: Response
  }> {
    const req: RawRequestReq<TransferDriveMemberPermissionReq> = {
      scope: 'Drive',
      api: 'TransferDriveMemberPermission',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/permission/member/transfer',
      body: new TransferDriveMemberPermissionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      TransferDriveMemberPermissionReq,
      Drive.TransferDriveMemberPermissionResp
    >(req)
  }
  // getDriveMemberPermissionList 该接口用于根据 filetoken 查询协作者, 目前包括人("user")和群("chat") 。
  //
  // 你能获取到协作者列表的前提是你对该文档有分享权限
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATN3UjLwUzN14CM1cTN
  async getDriveMemberPermissionList(
    request: Drive.GetDriveMemberPermissionListReq
  ): Promise<{
    data: Drive.GetDriveMemberPermissionListResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveMemberPermissionListReq> = {
      scope: 'Drive',
      api: 'GetDriveMemberPermissionList',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/permission/member/list',
      body: new GetDriveMemberPermissionListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      GetDriveMemberPermissionListReq,
      Drive.GetDriveMemberPermissionListResp
    >(req)
  }
  // createDriveMemberPermission 该接口用于根据 filetoken 给用户增加文档的权限。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/create
  async createDriveMemberPermission(
    request: Drive.CreateDriveMemberPermissionReq
  ): Promise<{
    data: Drive.CreateDriveMemberPermissionResp
    response: Response
  }> {
    const req: RawRequestReq<CreateDriveMemberPermissionReq> = {
      scope: 'Drive',
      api: 'CreateDriveMemberPermission',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/permissions/:token/members',
      body: new CreateDriveMemberPermissionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      CreateDriveMemberPermissionReq,
      Drive.CreateDriveMemberPermissionResp
    >(req)
  }
  // deleteDriveMemberPermission 该接口用于根据 filetoken 移除文档协作者的权限。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/delete
  async deleteDriveMemberPermission(
    request: Drive.DeleteDriveMemberPermissionReq
  ): Promise<{
    data: Drive.DeleteDriveMemberPermissionResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteDriveMemberPermissionReq> = {
      scope: 'Drive',
      api: 'DeleteDriveMemberPermission',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/permissions/:token/members/:member_id',
      body: new DeleteDriveMemberPermissionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteDriveMemberPermissionReq,
      Drive.DeleteDriveMemberPermissionResp
    >(req)
  }
  // deleteDriveMemberPermissionOld 该接口用于根据 filetoken 移除文档协作者的权限。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYTN3UjL2UzN14iN1cTN
  async deleteDriveMemberPermissionOld(
    request: Drive.DeleteDriveMemberPermissionOldReq
  ): Promise<{
    data: Drive.DeleteDriveMemberPermissionOldResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteDriveMemberPermissionOldReq> = {
      scope: 'Drive',
      api: 'DeleteDriveMemberPermissionOld',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/permission/member/delete',
      body: new DeleteDriveMemberPermissionOldReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteDriveMemberPermissionOldReq,
      Drive.DeleteDriveMemberPermissionOldResp
    >(req)
  }
  // updateDriveMemberPermissionOld 该接口用于根据 filetoken 更新文档协作者的权限。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ucTN3UjL3UzN14yN1cTN
  async updateDriveMemberPermissionOld(
    request: Drive.UpdateDriveMemberPermissionOldReq
  ): Promise<{
    data: Drive.UpdateDriveMemberPermissionOldResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateDriveMemberPermissionOldReq> = {
      scope: 'Drive',
      api: 'UpdateDriveMemberPermissionOld',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/permission/member/update',
      body: new UpdateDriveMemberPermissionOldReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateDriveMemberPermissionOldReq,
      Drive.UpdateDriveMemberPermissionOldResp
    >(req)
  }
  // updateDriveMemberPermission 该接口用于根据 filetoken 更新文档协作者的权限。
  //
  // 该接口要求文档协作者已存在, 如还未对文档协作者授权请先调用[「增加权限」 ](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/create)接口进行授权。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/update
  async updateDriveMemberPermission(
    request: Drive.UpdateDriveMemberPermissionReq
  ): Promise<{
    data: Drive.UpdateDriveMemberPermissionResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateDriveMemberPermissionReq> = {
      scope: 'Drive',
      api: 'UpdateDriveMemberPermission',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/permissions/:token/members/:member_id',
      body: new UpdateDriveMemberPermissionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateDriveMemberPermissionReq,
      Drive.UpdateDriveMemberPermissionResp
    >(req)
  }
  // checkDriveMemberPermission 该接口用于根据 filetoken 判断当前登录用户是否具有某权限。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYzN3UjL2czN14iN3cTN
  async checkDriveMemberPermission(
    request: Drive.CheckDriveMemberPermissionReq
  ): Promise<{
    data: Drive.CheckDriveMemberPermissionResp
    response: Response
  }> {
    const req: RawRequestReq<CheckDriveMemberPermissionReq> = {
      scope: 'Drive',
      api: 'CheckDriveMemberPermission',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/permission/member/permitted',
      body: new CheckDriveMemberPermissionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CheckDriveMemberPermissionReq, Drive.CheckDriveMemberPermissionResp>(
      req
    )
  }
  // getDrivePublicPermission 该接口用于根据 filetoken 获取云文档的权限设置。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/get
  async getDrivePublicPermission(
    request: Drive.GetDrivePublicPermissionReq
  ): Promise<{
    data: Drive.GetDrivePublicPermissionResp
    response: Response
  }> {
    const req: RawRequestReq<GetDrivePublicPermissionReq> = {
      scope: 'Drive',
      api: 'GetDrivePublicPermission',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/permissions/:token/public',
      body: new GetDrivePublicPermissionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDrivePublicPermissionReq, Drive.GetDrivePublicPermissionResp>(req)
  }
  // updateDrivePublicPermission 该接口用于根据 filetoken 更新云文档的权限设置。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/patch
  async updateDrivePublicPermission(
    request: Drive.UpdateDrivePublicPermissionReq
  ): Promise<{
    data: Drive.UpdateDrivePublicPermissionResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateDrivePublicPermissionReq> = {
      scope: 'Drive',
      api: 'UpdateDrivePublicPermission',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/permissions/:token/public',
      body: new UpdateDrivePublicPermissionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateDrivePublicPermissionReq,
      Drive.UpdateDrivePublicPermissionResp
    >(req)
  }
  // batchGetDriveMediaTmpDownloadURL 通过file_token获取素材临时下载链接, 链接时效性是24小时, 过期失效。
  //
  // 该接口不支持太高的并发, 且调用频率上限为5QPS
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/batch_get_tmp_download_url
  async batchGetDriveMediaTmpDownloadURL(
    request: Drive.BatchGetDriveMediaTmpDownloadURLReq
  ): Promise<{
    data: Drive.BatchGetDriveMediaTmpDownloadURLResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetDriveMediaTmpDownloadURLReq> = {
      scope: 'Drive',
      api: 'BatchGetDriveMediaTmpDownloadURL',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/medias/batch_get_tmp_download_url',
      body: new BatchGetDriveMediaTmpDownloadURLReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      BatchGetDriveMediaTmpDownloadURLReq,
      Drive.BatchGetDriveMediaTmpDownloadURLResp
    >(req)
  }
  // getDriveCommentList 通过分页方式获取云文档中的全文评论列表。
  //
  // 注意: 该接口仅可获取在线文档的全文评论, 不支持获取局部评论或者在线表格中的评论。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/list
  async getDriveCommentList(
    request: Drive.GetDriveCommentListReq
  ): Promise<{
    data: Drive.GetDriveCommentListResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveCommentListReq> = {
      scope: 'Drive',
      api: 'GetDriveCommentList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token/comments',
      body: new GetDriveCommentListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveCommentListReq, Drive.GetDriveCommentListResp>(req)
  }
  // getDriveComment 获取云文档中的某条评论。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/get
  async getDriveComment(
    request: Drive.GetDriveCommentReq
  ): Promise<{
    data: Drive.GetDriveCommentResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveCommentReq> = {
      scope: 'Drive',
      api: 'GetDriveComment',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token/comments/:comment_id',
      body: new GetDriveCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveCommentReq, Drive.GetDriveCommentResp>(req)
  }
  // createDriveComment 往云文档添加一条全局评论。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/create
  async createDriveComment(
    request: Drive.CreateDriveCommentReq
  ): Promise<{
    data: Drive.CreateDriveCommentResp
    response: Response
  }> {
    const req: RawRequestReq<CreateDriveCommentReq> = {
      scope: 'Drive',
      api: 'CreateDriveComment',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token/comments',
      body: new CreateDriveCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateDriveCommentReq, Drive.CreateDriveCommentResp>(req)
  }
  // updateDriveComment 更新云文档中的某条回复。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/update
  async updateDriveComment(
    request: Drive.UpdateDriveCommentReq
  ): Promise<{
    data: Drive.UpdateDriveCommentResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateDriveCommentReq> = {
      scope: 'Drive',
      api: 'UpdateDriveComment',
      method: 'PUT',
      url:
        this.cli.openBaseURL +
        '/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies/:reply_id',
      body: new UpdateDriveCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateDriveCommentReq, Drive.UpdateDriveCommentResp>(req)
  }
  // deleteDriveComment 删除云文档中的某条回复。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/delete
  async deleteDriveComment(
    request: Drive.DeleteDriveCommentReq
  ): Promise<{
    data: Drive.DeleteDriveCommentResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteDriveCommentReq> = {
      scope: 'Drive',
      api: 'DeleteDriveComment',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies/:reply_id',
      body: new DeleteDriveCommentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteDriveCommentReq, Drive.DeleteDriveCommentResp>(req)
  }
  // updateDriveCommentPatch 解决或恢复云文档中的评论。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/patch
  async updateDriveCommentPatch(
    request: Drive.UpdateDriveCommentPatchReq
  ): Promise<{
    data: Drive.UpdateDriveCommentPatchResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateDriveCommentPatchReq> = {
      scope: 'Drive',
      api: 'UpdateDriveCommentPatch',
      method: 'PATCH',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token/comments/:comment_id',
      body: new UpdateDriveCommentPatchReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateDriveCommentPatchReq, Drive.UpdateDriveCommentPatchResp>(req)
  }
  // createDriveFileSubscription 订阅文档中的变更事件, 当前支持文档评论订阅, 订阅后文档评论更新会有“云文档助手”推送给订阅的用户
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/create
  async createDriveFileSubscription(
    request: Drive.CreateDriveFileSubscriptionReq
  ): Promise<{
    data: Drive.CreateDriveFileSubscriptionResp
    response: Response
  }> {
    const req: RawRequestReq<CreateDriveFileSubscriptionReq> = {
      scope: 'Drive',
      api: 'CreateDriveFileSubscription',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/files/:file_token/subscriptions',
      body: new CreateDriveFileSubscriptionReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      CreateDriveFileSubscriptionReq,
      Drive.CreateDriveFileSubscriptionResp
    >(req)
  }
  // getDriveFileSubscription 根据订阅ID获取该订阅的状态
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/get
  async getDriveFileSubscription(
    request: Drive.GetDriveFileSubscriptionReq
  ): Promise<{
    data: Drive.GetDriveFileSubscriptionResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveFileSubscriptionReq> = {
      scope: 'Drive',
      api: 'GetDriveFileSubscription',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/drive/v1/files/:file_token/subscriptions/:subscription_id',
      body: new GetDriveFileSubscriptionReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveFileSubscriptionReq, Drive.GetDriveFileSubscriptionResp>(req)
  }
  // updateDriveFileSubscription 根据订阅ID更新订阅状态
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/patch
  async updateDriveFileSubscription(
    request: Drive.UpdateDriveFileSubscriptionReq
  ): Promise<{
    data: Drive.UpdateDriveFileSubscriptionResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateDriveFileSubscriptionReq> = {
      scope: 'Drive',
      api: 'UpdateDriveFileSubscription',
      method: 'PATCH',
      url:
        this.cli.openBaseURL +
        '/open-apis/drive/v1/files/:file_token/subscriptions/:subscription_id',
      body: new UpdateDriveFileSubscriptionReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateDriveFileSubscriptionReq,
      Drive.UpdateDriveFileSubscriptionResp
    >(req)
  }
  // createDriveDoc 在使用此接口前, 请仔细阅读[文档概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/docs-doc-overview)和[准备接入文档 API](https://open.feishu.cn/document/ukTMukTMukTM/ugzNzUjL4czM14CO3MTN/guide/getting-start)了解文档调用的规则和约束, 确保你的文档数据不会丢失或出错。
  //
  // 文档数据结构定义可参考: [文档数据结构概述](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)
  // 此接口创建出的文档为旧版文档, 如果需要创建新版文档, 请使用[创建新版文档](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/create)接口。
  // 该接口用于创建并初始化文档。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ugDM2YjL4AjN24COwYjN
  async createDriveDoc(
    request: Drive.CreateDriveDocReq
  ): Promise<{
    data: Drive.CreateDriveDocResp
    response: Response
  }> {
    const req: RawRequestReq<CreateDriveDocReq> = {
      scope: 'Drive',
      api: 'CreateDriveDoc',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/doc/v2/create',
      body: new CreateDriveDocReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateDriveDocReq, Drive.CreateDriveDocResp>(req)
  }
  // getDriveDocContent 在使用此接口前, 请仔细阅读[文档概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/docs-doc-overview)和[准备接入文档 API](https://open.feishu.cn/document/ukTMukTMukTM/ugzNzUjL4czM14CO3MTN/guide/getting-start)了解文档调用的规则和约束, 确保你的文档数据不会丢失或出错。
  //
  // 文档数据结构定义可参考: [文档数据结构概述](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)
  // 此接口只支持获取旧版文档富文本内容, 如果需要获取新版文档的富文本内容, 请调用新版文档相关接口:
  // - [获取文档所有块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/list)
  // - [获取指定块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/get)
  // - [获取指定块下所有子块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/get)
  // 该接口用于获取结构化的文档内容。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDM2YjL1AjN24SNwYjN
  async getDriveDocContent(
    request: Drive.GetDriveDocContentReq
  ): Promise<{
    data: Drive.GetDriveDocContentResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveDocContentReq> = {
      scope: 'Drive',
      api: 'GetDriveDocContent',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/doc/v2/:docToken/content',
      body: new GetDriveDocContentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveDocContentReq, Drive.GetDriveDocContentResp>(req)
  }
  // updateDriveDocContent 在使用此接口前, 请仔细阅读[文档概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/docs-doc-overview)和[准备接入文档 API](https://open.feishu.cn/document/ukTMukTMukTM/ugzNzUjL4czM14CO3MTN/guide/getting-start)了解文档调用的规则和约束, 确保你的文档数据不会丢失或出错。
  //
  // 文档数据结构定义可参考: [文档数据结构概述](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)
  // 此接口只支持编辑旧版文档内容, 如果需要编辑新版文档的内容, 请调用新版文档相关接口:
  // - [创建块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/create)
  // - [更新块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/patch)
  // - [批量更新块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/batch_update)
  // - [删除块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/batch_delete)
  // 该接口用于批量编辑更新文档内容, 包括更新标题、范围删除、插入内容。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYDM2YjL2AjN24iNwYjN
  async updateDriveDocContent(
    request: Drive.UpdateDriveDocContentReq
  ): Promise<{
    data: Drive.UpdateDriveDocContentResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateDriveDocContentReq> = {
      scope: 'Drive',
      api: 'UpdateDriveDocContent',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/doc/v2/:docToken/batch_update',
      body: new UpdateDriveDocContentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateDriveDocContentReq, Drive.UpdateDriveDocContentResp>(req)
  }
  // getDriveDocRawContent 此接口只支持查询旧版文档纯文本内容, 如果需要查询新版文档的纯文本内容, 请使用[获取新版文档纯文本内容
  //
  // ](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/raw_content)接口。
  // 该接口用于获取文档的纯文本内容, 不包含富文本格式信息。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ukzNzUjL5czM14SO3MTN
  async getDriveDocRawContent(
    request: Drive.GetDriveDocRawContentReq
  ): Promise<{
    data: Drive.GetDriveDocRawContentResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveDocRawContentReq> = {
      scope: 'Drive',
      api: 'GetDriveDocRawContent',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/doc/v2/:docToken/raw_content',
      body: new GetDriveDocRawContentReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveDocRawContentReq, Drive.GetDriveDocRawContentResp>(req)
  }
  // getDriveDocMeta 此接口只支持查询旧版文档元信息, 如果需要查询新版文档元信息, 请使用[获取元数据](https://open.feishu.cn/document/ukTMukTMukTM/uMjN3UjLzYzN14yM2cTN)接口。
  //
  // 该接口用于根据 docToken 获取元数据。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uczN3UjL3czN14yN3cTN
  async getDriveDocMeta(
    request: Drive.GetDriveDocMetaReq
  ): Promise<{
    data: Drive.GetDriveDocMetaResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveDocMetaReq> = {
      scope: 'Drive',
      api: 'GetDriveDocMeta',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/doc/v2/meta/:docToken',
      body: new GetDriveDocMetaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveDocMetaReq, Drive.GetDriveDocMetaResp>(req)
  }
  // createSheet 使用该接口可以在指定的目录下创建在线表格。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/create
  async createSheet(
    request: Drive.CreateSheetReq
  ): Promise<{
    data: Drive.CreateSheetResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSheetReq> = {
      scope: 'Drive',
      api: 'CreateSheet',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/sheets/v3/spreadsheets',
      body: new CreateSheetReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateSheetReq, Drive.CreateSheetResp>(req)
  }
  // getSheetMeta 该接口用于根据 spreadsheetToken 获取表格元数据。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uETMzUjLxEzM14SMxMTN
  async getSheetMeta(
    request: Drive.GetSheetMetaReq
  ): Promise<{
    data: Drive.GetSheetMetaResp
    response: Response
  }> {
    const req: RawRequestReq<GetSheetMetaReq> = {
      scope: 'Drive',
      api: 'GetSheetMeta',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/metainfo',
      body: new GetSheetMetaReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetSheetMetaReq, Drive.GetSheetMetaResp>(req)
  }
  // updateSheetProperty 该接口用于根据 spreadsheetToken 更新表格属性, 如更新表格标题。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ucTMzUjL3EzM14yNxMTN
  async updateSheetProperty(
    request: Drive.UpdateSheetPropertyReq
  ): Promise<{
    data: Drive.UpdateSheetPropertyResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSheetPropertyReq> = {
      scope: 'Drive',
      api: 'UpdateSheetProperty',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/properties',
      body: new UpdateSheetPropertyReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateSheetPropertyReq, Drive.UpdateSheetPropertyResp>(req)
  }
  // batchUpdateSheet 该接口用于根据 spreadsheetToken 操作表格, 如增加工作表, 复制工作表、删除工作表。
  //
  // ::: note
  // 该接口和 [更新工作表属性](https://open.feishu.cn/document/ukTMukTMukTM/ugjMzUjL4IzM14COyMTN) 的请求地址相同, 但参数不同, 调用前请仔细阅读文档。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYTMzUjL2EzM14iNxMTN
  async batchUpdateSheet(
    request: Drive.BatchUpdateSheetReq
  ): Promise<{
    data: Drive.BatchUpdateSheetResp
    response: Response
  }> {
    const req: RawRequestReq<BatchUpdateSheetReq> = {
      scope: 'Drive',
      api: 'BatchUpdateSheet',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/sheets_batch_update',
      body: new BatchUpdateSheetReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchUpdateSheetReq, Drive.BatchUpdateSheetResp>(req)
  }
  // importSheet >  为了更好地提升该接口的安全性, 我们对其进行了升级, 请尽快迁移至[新版本](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/import-user-guide)
  //
  // 该接口用于将本地表格导入到云空间上。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATO2YjLwkjN24CM5YjN
  async importSheet(
    request: Drive.ImportSheetReq
  ): Promise<{
    data: Drive.ImportSheetResp
    response: Response
  }> {
    const req: RawRequestReq<ImportSheetReq> = {
      scope: 'Drive',
      api: 'ImportSheet',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/sheets/v2/import',
      body: new ImportSheetReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<ImportSheetReq, Drive.ImportSheetResp>(req)
  }
  // createDriveImportTask 创建导入任务。支持导入为 doc、sheet、bitable, 参考[导入用户指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/import-user-guide)
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/create
  async createDriveImportTask(
    request: Drive.CreateDriveImportTaskReq
  ): Promise<{
    data: Drive.CreateDriveImportTaskResp
    response: Response
  }> {
    const req: RawRequestReq<CreateDriveImportTaskReq> = {
      scope: 'Drive',
      api: 'CreateDriveImportTask',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/import_tasks',
      body: new CreateDriveImportTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateDriveImportTaskReq, Drive.CreateDriveImportTaskResp>(req)
  }
  // getDriveImportTask 根据创建导入任务返回的 ticket 查询导入结果。
  //
  // doc: https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/get
  async getDriveImportTask(
    request: Drive.GetDriveImportTaskReq
  ): Promise<{
    data: Drive.GetDriveImportTaskResp
    response: Response
  }> {
    const req: RawRequestReq<GetDriveImportTaskReq> = {
      scope: 'Drive',
      api: 'GetDriveImportTask',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/drive/v1/import_tasks/:ticket',
      body: new GetDriveImportTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetDriveImportTaskReq, Drive.GetDriveImportTaskResp>(req)
  }
  // moveSheetDimension 该接口用于移动行列, 行列被移动到目标位置后, 原本在目标位置的行列会对应右移或下移。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/move_dimension
  async moveSheetDimension(
    request: Drive.MoveSheetDimensionReq
  ): Promise<{
    data: Drive.MoveSheetDimensionResp
    response: Response
  }> {
    const req: RawRequestReq<MoveSheetDimensionReq> = {
      scope: 'Drive',
      api: 'MoveSheetDimension',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/move_dimension',
      body: new MoveSheetDimensionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<MoveSheetDimensionReq, Drive.MoveSheetDimensionResp>(req)
  }
  // prependSheetValue 该接口用于根据 spreadsheetToken 和 range 向范围之前增加相应数据的行和相应的数据, 相当于数组的插入操作；单次写入不超过5000行, 100列, 每个格子不超过5万字符。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uIjMzUjLyIzM14iMyMTN
  async prependSheetValue(
    request: Drive.PrependSheetValueReq
  ): Promise<{
    data: Drive.PrependSheetValueResp
    response: Response
  }> {
    const req: RawRequestReq<PrependSheetValueReq> = {
      scope: 'Drive',
      api: 'PrependSheetValue',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/values_prepend',
      body: new PrependSheetValueReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<PrependSheetValueReq, Drive.PrependSheetValueResp>(req)
  }
  // appendSheetValue 该接口用于根据 spreadsheetToken 和 range 遇到空行则进行覆盖追加或新增行追加数据。 空行: 默认该行第一个格子是空, 则认为是空行；单次写入不超过5000行, 100列, 每个格子不超过5万字符。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uMjMzUjLzIzM14yMyMTN
  async appendSheetValue(
    request: Drive.AppendSheetValueReq
  ): Promise<{
    data: Drive.AppendSheetValueResp
    response: Response
  }> {
    const req: RawRequestReq<AppendSheetValueReq> = {
      scope: 'Drive',
      api: 'AppendSheetValue',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/values_append',
      body: new AppendSheetValueReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<AppendSheetValueReq, Drive.AppendSheetValueResp>(req)
  }
  // insertSheetDimensionRange 该接口用于根据 spreadsheetToken 和维度信息 插入空行/列。
  //
  // 如 startIndex=3, endIndex=7, 则从第 4 行开始开始插入行列, 一直到第 7 行, 共插入 4 行；单次操作不超过5000行或列。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uQjMzUjL0IzM14CNyMTN
  async insertSheetDimensionRange(
    request: Drive.InsertSheetDimensionRangeReq
  ): Promise<{
    data: Drive.InsertSheetDimensionRangeResp
    response: Response
  }> {
    const req: RawRequestReq<InsertSheetDimensionRangeReq> = {
      scope: 'Drive',
      api: 'InsertSheetDimensionRange',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/insert_dimension_range',
      body: new InsertSheetDimensionRangeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<InsertSheetDimensionRangeReq, Drive.InsertSheetDimensionRangeResp>(
      req
    )
  }
  // addSheetDimensionRange 该接口用于根据 spreadsheetToken 和长度, 在末尾增加空行/列；单次操作不超过5000行或列。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUjMzUjL1IzM14SNyMTN
  async addSheetDimensionRange(
    request: Drive.AddSheetDimensionRangeReq
  ): Promise<{
    data: Drive.AddSheetDimensionRangeResp
    response: Response
  }> {
    const req: RawRequestReq<AddSheetDimensionRangeReq> = {
      scope: 'Drive',
      api: 'AddSheetDimensionRange',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/dimension_range',
      body: new AddSheetDimensionRangeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<AddSheetDimensionRangeReq, Drive.AddSheetDimensionRangeResp>(req)
  }
  // updateSheetDimensionRange 该接口用于根据 spreadsheetToken 和维度信息更新隐藏行列、单元格大小；单次操作不超过5000行或列。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYjMzUjL2IzM14iNyMTN
  async updateSheetDimensionRange(
    request: Drive.UpdateSheetDimensionRangeReq
  ): Promise<{
    data: Drive.UpdateSheetDimensionRangeResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSheetDimensionRangeReq> = {
      scope: 'Drive',
      api: 'UpdateSheetDimensionRange',
      method: 'PUT',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/dimension_range',
      body: new UpdateSheetDimensionRangeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateSheetDimensionRangeReq, Drive.UpdateSheetDimensionRangeResp>(
      req
    )
  }
  // deleteSheetDimensionRange 该接口用于根据 spreadsheetToken 和维度信息删除行/列 。单次删除最大5000行/列。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ucjMzUjL3IzM14yNyMTN
  async deleteSheetDimensionRange(
    request: Drive.DeleteSheetDimensionRangeReq
  ): Promise<{
    data: Drive.DeleteSheetDimensionRangeResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSheetDimensionRangeReq> = {
      scope: 'Drive',
      api: 'DeleteSheetDimensionRange',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/dimension_range',
      body: new DeleteSheetDimensionRangeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteSheetDimensionRangeReq, Drive.DeleteSheetDimensionRangeResp>(
      req
    )
  }
  // getSheetValue 该接口用于根据 spreadsheetToken 和 range 读取表格单个范围的值, 返回数据限制为10M。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ugTMzUjL4EzM14COxMTN
  async getSheetValue(
    request: Drive.GetSheetValueReq
  ): Promise<{
    data: Drive.GetSheetValueResp
    response: Response
  }> {
    const req: RawRequestReq<GetSheetValueReq> = {
      scope: 'Drive',
      api: 'GetSheetValue',
      method: 'GET',
      url:
        this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/values/:range',
      body: new GetSheetValueReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetSheetValueReq, Drive.GetSheetValueResp>(req)
  }
  // batchGetSheetValue 该接口用于根据 spreadsheetToken 和 ranges 读取表格多个范围的值, 返回数据限制为10M。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ukTMzUjL5EzM14SOxMTN
  async batchGetSheetValue(
    request: Drive.BatchGetSheetValueReq
  ): Promise<{
    data: Drive.BatchGetSheetValueResp
    response: Response
  }> {
    const req: RawRequestReq<BatchGetSheetValueReq> = {
      scope: 'Drive',
      api: 'BatchGetSheetValue',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/values_batch_get',
      body: new BatchGetSheetValueReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchGetSheetValueReq, Drive.BatchGetSheetValueResp>(req)
  }
  // setSheetValue 该接口用于根据 spreadsheetToken 和 range 向单个范围写入数据, 若范围内有数据, 将被更新覆盖；单次写入不超过5000行, 100列, 每个格子不超过5万字符。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uAjMzUjLwIzM14CMyMTN
  async setSheetValue(
    request: Drive.SetSheetValueReq
  ): Promise<{
    data: Drive.SetSheetValueResp
    response: Response
  }> {
    const req: RawRequestReq<SetSheetValueReq> = {
      scope: 'Drive',
      api: 'SetSheetValue',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/values',
      body: new SetSheetValueReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SetSheetValueReq, Drive.SetSheetValueResp>(req)
  }
  // batchSetSheetValue 该接口用于根据 spreadsheetToken 和 range 向多个范围写入数据, 若范围内有数据, 将被更新覆盖；单次写入不超过5000行, 100列, 每个格子不超过5万字符。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uEjMzUjLxIzM14SMyMTN
  async batchSetSheetValue(
    request: Drive.BatchSetSheetValueReq
  ): Promise<{
    data: Drive.BatchSetSheetValueResp
    response: Response
  }> {
    const req: RawRequestReq<BatchSetSheetValueReq> = {
      scope: 'Drive',
      api: 'BatchSetSheetValue',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/values_batch_update',
      body: new BatchSetSheetValueReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchSetSheetValueReq, Drive.BatchSetSheetValueResp>(req)
  }
  // setSheetStyle 该接口用于根据 spreadsheetToken 、range 和样式信息更新单元格样式；单次写入不超过5000行, 100列。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ukjMzUjL5IzM14SOyMTN
  async setSheetStyle(
    request: Drive.SetSheetStyleReq
  ): Promise<{
    data: Drive.SetSheetStyleResp
    response: Response
  }> {
    const req: RawRequestReq<SetSheetStyleReq> = {
      scope: 'Drive',
      api: 'SetSheetStyle',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/style',
      body: new SetSheetStyleReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SetSheetStyleReq, Drive.SetSheetStyleResp>(req)
  }
  // batchSetSheetStyle 该接口用于根据 spreadsheetToken 、range和样式信息 批量更新单元格样式；单次写入不超过5000行, 100列。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uAzMzUjLwMzM14CMzMTN
  async batchSetSheetStyle(
    request: Drive.BatchSetSheetStyleReq
  ): Promise<{
    data: Drive.BatchSetSheetStyleResp
    response: Response
  }> {
    const req: RawRequestReq<BatchSetSheetStyleReq> = {
      scope: 'Drive',
      api: 'BatchSetSheetStyle',
      method: 'PUT',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/styles_batch_update',
      body: new BatchSetSheetStyleReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<BatchSetSheetStyleReq, Drive.BatchSetSheetStyleResp>(req)
  }
  // mergeSheetCell 该接口用于根据 spreadsheetToken 和维度信息合并单元格；单次操作不超过5000行, 100列。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ukDNzUjL5QzM14SO0MTN
  async mergeSheetCell(
    request: Drive.MergeSheetCellReq
  ): Promise<{
    data: Drive.MergeSheetCellResp
    response: Response
  }> {
    const req: RawRequestReq<MergeSheetCellReq> = {
      scope: 'Drive',
      api: 'MergeSheetCell',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/merge_cells',
      body: new MergeSheetCellReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<MergeSheetCellReq, Drive.MergeSheetCellResp>(req)
  }
  // unmergeSheetCell 该接口用于根据 spreadsheetToken 和维度信息拆分单元格；单次操作不超过5000行, 100列。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATNzUjLwUzM14CM1MTN
  async unmergeSheetCell(
    request: Drive.UnmergeSheetCellReq
  ): Promise<{
    data: Drive.UnmergeSheetCellResp
    response: Response
  }> {
    const req: RawRequestReq<UnmergeSheetCellReq> = {
      scope: 'Drive',
      api: 'UnmergeSheetCell',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/unmerge_cells',
      body: new UnmergeSheetCellReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UnmergeSheetCellReq, Drive.UnmergeSheetCellResp>(req)
  }
  // setSheetValueImage 该接口用于根据 spreadsheetToken 和 range 向单个格子写入图片。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDNxYjL1QTM24SN0EjN
  async setSheetValueImage(
    request: Drive.SetSheetValueImageReq
  ): Promise<{
    data: Drive.SetSheetValueImageResp
    response: Response
  }> {
    const req: RawRequestReq<SetSheetValueImageReq> = {
      scope: 'Drive',
      api: 'SetSheetValueImage',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/values_image',
      body: new SetSheetValueImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<SetSheetValueImageReq, Drive.SetSheetValueImageResp>(req)
  }
  // findSheet 按照指定的条件查找子表的某个范围内的数据符合条件的单元格位置。请求体中的 range 和 find 字段为必填。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/find
  async findSheet(
    request: Drive.FindSheetReq
  ): Promise<{
    data: Drive.FindSheetResp
    response: Response
  }> {
    const req: RawRequestReq<FindSheetReq> = {
      scope: 'Drive',
      api: 'FindSheet',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/find',
      body: new FindSheetReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<FindSheetReq, Drive.FindSheetResp>(req)
  }
  // replaceSheet 按照指定的条件查找子表的某个范围内的数据符合条件的单元格并替换值, 返回替换成功的单元格位置。一次请求最多允许替换5000个单元格, 如果超过请将range缩小范围再操作。请求体中的 range、find、replaccement 字段必填。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/replace
  async replaceSheet(
    request: Drive.ReplaceSheetReq
  ): Promise<{
    data: Drive.ReplaceSheetResp
    response: Response
  }> {
    const req: RawRequestReq<ReplaceSheetReq> = {
      scope: 'Drive',
      api: 'ReplaceSheet',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/replace',
      body: new ReplaceSheetReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<ReplaceSheetReq, Drive.ReplaceSheetResp>(req)
  }
  // createSheetConditionFormat 该接口用于创建新的条件格式, 单次最多支持增加10个条件格式, 每个条件格式的设置会返回成功或者失败, 失败的情况包括各种参数的校验。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/conditionformat/condition-format-set
  async createSheetConditionFormat(
    request: Drive.CreateSheetConditionFormatReq
  ): Promise<{
    data: Drive.CreateSheetConditionFormatResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSheetConditionFormatReq> = {
      scope: 'Drive',
      api: 'CreateSheetConditionFormat',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/condition_formats/batch_create',
      body: new CreateSheetConditionFormatReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateSheetConditionFormatReq, Drive.CreateSheetConditionFormatResp>(
      req
    )
  }
  // updateSheetConditionFormat 该接口用于更新已有的条件格式, 单次最多支持更新10个条件格式, 每个条件格式的更新会返回成功或者失败, 失败的情况包括各种参数的校验。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/conditionformat/condition-format-update
  async updateSheetConditionFormat(
    request: Drive.UpdateSheetConditionFormatReq
  ): Promise<{
    data: Drive.UpdateSheetConditionFormatResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSheetConditionFormatReq> = {
      scope: 'Drive',
      api: 'UpdateSheetConditionFormat',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/condition_formats/batch_update',
      body: new UpdateSheetConditionFormatReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateSheetConditionFormatReq, Drive.UpdateSheetConditionFormatResp>(
      req
    )
  }
  // deleteSheetConditionFormat 该接口用于删除已有的条件格式, 单次最多支持删除10个条件格式, 每个条件格式的删除会返回成功或者失败, 失败的情况包括各种参数的校验。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/conditionformat/condition-format-delete
  async deleteSheetConditionFormat(
    request: Drive.DeleteSheetConditionFormatReq
  ): Promise<{
    data: Drive.DeleteSheetConditionFormatResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSheetConditionFormatReq> = {
      scope: 'Drive',
      api: 'DeleteSheetConditionFormat',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/condition_formats/batch_delete',
      body: new DeleteSheetConditionFormatReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteSheetConditionFormatReq, Drive.DeleteSheetConditionFormatResp>(
      req
    )
  }
  // createSheetProtectedDimension 该接口用于根据 spreadsheetToken 和维度信息增加多个保护范围；单次操作不超过5000行或列。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/ugDNzUjL4QzM14CO0MTN
  async createSheetProtectedDimension(
    request: Drive.CreateSheetProtectedDimensionReq
  ): Promise<{
    data: Drive.CreateSheetProtectedDimensionResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSheetProtectedDimensionReq> = {
      scope: 'Drive',
      api: 'CreateSheetProtectedDimension',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/protected_dimension',
      body: new CreateSheetProtectedDimensionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      CreateSheetProtectedDimensionReq,
      Drive.CreateSheetProtectedDimensionResp
    >(req)
  }
  // getSheetProtectedDimension 该接口用于根据保护范围ID查询详细的保护行列信息, 最多支持同时查询5个ID。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uQTM5YjL0ETO24CNxkjN
  async getSheetProtectedDimension(
    request: Drive.GetSheetProtectedDimensionReq
  ): Promise<{
    data: Drive.GetSheetProtectedDimensionResp
    response: Response
  }> {
    const req: RawRequestReq<GetSheetProtectedDimensionReq> = {
      scope: 'Drive',
      api: 'GetSheetProtectedDimension',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/protected_range_batch_get',
      body: new GetSheetProtectedDimensionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetSheetProtectedDimensionReq, Drive.GetSheetProtectedDimensionResp>(
      req
    )
  }
  // updateSheetProtectedDimension 该接口用于根据保护范围ID修改保护范围, 单次最多支持同时修改10个ID。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUTM5YjL1ETO24SNxkjN
  async updateSheetProtectedDimension(
    request: Drive.UpdateSheetProtectedDimensionReq
  ): Promise<{
    data: Drive.UpdateSheetProtectedDimensionResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSheetProtectedDimensionReq> = {
      scope: 'Drive',
      api: 'UpdateSheetProtectedDimension',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/protected_range_batch_update',
      body: new UpdateSheetProtectedDimensionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateSheetProtectedDimensionReq,
      Drive.UpdateSheetProtectedDimensionResp
    >(req)
  }
  // deleteSheetProtectedDimension 该接口用于根据保护范围ID删除保护范围, 最多支持同时删除10个ID。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uYTM5YjL2ETO24iNxkjN
  async deleteSheetProtectedDimension(
    request: Drive.DeleteSheetProtectedDimensionReq
  ): Promise<{
    data: Drive.DeleteSheetProtectedDimensionResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSheetProtectedDimensionReq> = {
      scope: 'Drive',
      api: 'DeleteSheetProtectedDimension',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/protected_range_batch_del',
      body: new DeleteSheetProtectedDimensionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteSheetProtectedDimensionReq,
      Drive.DeleteSheetProtectedDimensionResp
    >(req)
  }
  // createSheetDataValidationDropdown 该接口根据 spreadsheetToken 、range 和下拉列表属性给单元格设置下拉列表规则；单次设置范围不超过5000行, 100列。当一个数据区域中已有数据, 支持将有效数据直接转为选项。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/datavalidation/set-dropdown
  async createSheetDataValidationDropdown(
    request: Drive.CreateSheetDataValidationDropdownReq
  ): Promise<{
    data: Drive.CreateSheetDataValidationDropdownResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSheetDataValidationDropdownReq> = {
      scope: 'Drive',
      api: 'CreateSheetDataValidationDropdown',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/dataValidation',
      body: new CreateSheetDataValidationDropdownReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      CreateSheetDataValidationDropdownReq,
      Drive.CreateSheetDataValidationDropdownResp
    >(req)
  }
  // deleteSheetDataValidationDropdown 该接口根据 spreadsheetToken 、range 移除选定数据范围单元格的下拉列表设置, 但保留选项文本。单个删除范围不超过5000单元格。单次请求range最大数量100个。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/datavalidation/delete-datavalidation
  async deleteSheetDataValidationDropdown(
    request: Drive.DeleteSheetDataValidationDropdownReq
  ): Promise<{
    data: Drive.DeleteSheetDataValidationDropdownResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSheetDataValidationDropdownReq> = {
      scope: 'Drive',
      api: 'DeleteSheetDataValidationDropdown',
      method: 'DELETE',
      url:
        this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/dataValidation',
      body: new DeleteSheetDataValidationDropdownReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteSheetDataValidationDropdownReq,
      Drive.DeleteSheetDataValidationDropdownResp
    >(req)
  }
  // updateSheetDataValidationDropdown 该接口根据 spreadsheetToken 、sheetId、dataValidationId 更新下拉列表的属性。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/datavalidation/update-datavalidation
  async updateSheetDataValidationDropdown(
    request: Drive.UpdateSheetDataValidationDropdownReq
  ): Promise<{
    data: Drive.UpdateSheetDataValidationDropdownResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSheetDataValidationDropdownReq> = {
      scope: 'Drive',
      api: 'UpdateSheetDataValidationDropdown',
      method: 'PUT',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/dataValidation/:sheetId/:dataValidationId',
      body: new UpdateSheetDataValidationDropdownReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateSheetDataValidationDropdownReq,
      Drive.UpdateSheetDataValidationDropdownResp
    >(req)
  }
  // getSheetDataValidationDropdown 该接口根据 spreadsheetToken 、range 查询range内的下拉列表设置信息；单次查询范围不超过5000行, 100列。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/datavalidation/query-datavalidation
  async getSheetDataValidationDropdown(
    request: Drive.GetSheetDataValidationDropdownReq
  ): Promise<{
    data: Drive.GetSheetDataValidationDropdownResp
    response: Response
  }> {
    const req: RawRequestReq<GetSheetDataValidationDropdownReq> = {
      scope: 'Drive',
      api: 'GetSheetDataValidationDropdown',
      method: 'GET',
      url:
        this.cli.openBaseURL + '/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/dataValidation',
      body: new GetSheetDataValidationDropdownReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      GetSheetDataValidationDropdownReq,
      Drive.GetSheetDataValidationDropdownResp
    >(req)
  }
  // createSheetFilter 在子表内创建筛选。
  //
  // 参数值可参考[筛选指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/filter-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/create
  async createSheetFilter(
    request: Drive.CreateSheetFilterReq
  ): Promise<{
    data: Drive.CreateSheetFilterResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSheetFilterReq> = {
      scope: 'Drive',
      api: 'CreateSheetFilter',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter',
      body: new CreateSheetFilterReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateSheetFilterReq, Drive.CreateSheetFilterResp>(req)
  }
  // deleteSheetFilter 删除子表的筛选
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/delete
  async deleteSheetFilter(
    request: Drive.DeleteSheetFilterReq
  ): Promise<{
    data: Drive.DeleteSheetFilterResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSheetFilterReq> = {
      scope: 'Drive',
      api: 'DeleteSheetFilter',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter',
      body: new DeleteSheetFilterReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteSheetFilterReq, Drive.DeleteSheetFilterResp>(req)
  }
  // updateSheetFilter 更新子表筛选范围中的列筛选条件。
  //
  // 参数值可参考[筛选指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/filter-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/update
  async updateSheetFilter(
    request: Drive.UpdateSheetFilterReq
  ): Promise<{
    data: Drive.UpdateSheetFilterResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSheetFilterReq> = {
      scope: 'Drive',
      api: 'UpdateSheetFilter',
      method: 'PUT',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter',
      body: new UpdateSheetFilterReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateSheetFilterReq, Drive.UpdateSheetFilterResp>(req)
  }
  // getSheetFilter 获取子表的详细筛选信息
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/get
  async getSheetFilter(
    request: Drive.GetSheetFilterReq
  ): Promise<{
    data: Drive.GetSheetFilterResp
    response: Response
  }> {
    const req: RawRequestReq<GetSheetFilterReq> = {
      scope: 'Drive',
      api: 'GetSheetFilter',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter',
      body: new GetSheetFilterReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetSheetFilterReq, Drive.GetSheetFilterResp>(req)
  }
  // createSheetFilterView 根据传入的参数创建一个筛选视图。Id 和 名字可选, 不填的话会默认生成；range 必填。Id 长度为10, 由 0-9、a-z、A-Z 组合生成。名字长度不超过100。单个子表内的筛选视图个数不超过 150。
  //
  // 筛选范围的设置参考: [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/create
  async createSheetFilterView(
    request: Drive.CreateSheetFilterViewReq
  ): Promise<{
    data: Drive.CreateSheetFilterViewResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSheetFilterViewReq> = {
      scope: 'Drive',
      api: 'CreateSheetFilterView',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views',
      body: new CreateSheetFilterViewReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateSheetFilterViewReq, Drive.CreateSheetFilterViewResp>(req)
  }
  // deleteSheetFilterView 删除指定 id 对应的筛选视图。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/delete
  async deleteSheetFilterView(
    request: Drive.DeleteSheetFilterViewReq
  ): Promise<{
    data: Drive.DeleteSheetFilterViewResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSheetFilterViewReq> = {
      scope: 'Drive',
      api: 'DeleteSheetFilterView',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id',
      body: new DeleteSheetFilterViewReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteSheetFilterViewReq, Drive.DeleteSheetFilterViewResp>(req)
  }
  // updateSheetFilterView 更新筛选视图的名字或者筛选范围。名字长度不超过100, 不能重复即子表内唯一；筛选范围不超过子表的最大范围。
  //
  // 筛选范围的设置参考: [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/patch
  async updateSheetFilterView(
    request: Drive.UpdateSheetFilterViewReq
  ): Promise<{
    data: Drive.UpdateSheetFilterViewResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSheetFilterViewReq> = {
      scope: 'Drive',
      api: 'UpdateSheetFilterView',
      method: 'PATCH',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id',
      body: new UpdateSheetFilterViewReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateSheetFilterViewReq, Drive.UpdateSheetFilterViewResp>(req)
  }
  // getSheetFilterView 获取指定筛选视图 id 的名字和筛选范围。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/get
  async getSheetFilterView(
    request: Drive.GetSheetFilterViewReq
  ): Promise<{
    data: Drive.GetSheetFilterViewResp
    response: Response
  }> {
    const req: RawRequestReq<GetSheetFilterViewReq> = {
      scope: 'Drive',
      api: 'GetSheetFilterView',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id',
      body: new GetSheetFilterViewReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetSheetFilterViewReq, Drive.GetSheetFilterViewResp>(req)
  }
  // querySheetFilterView 查询子表内所有的筛选视图基本信息, 包括 id、name 和 range
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/query
  async querySheetFilterView(
    request: Drive.QuerySheetFilterViewReq
  ): Promise<{
    data: Drive.QuerySheetFilterViewResp
    response: Response
  }> {
    const req: RawRequestReq<QuerySheetFilterViewReq> = {
      scope: 'Drive',
      api: 'QuerySheetFilterView',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/query',
      body: new QuerySheetFilterViewReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<QuerySheetFilterViewReq, Drive.QuerySheetFilterViewResp>(req)
  }
  // createSheetFilterViewCondition 在筛选视图的筛选范围的某一列创建筛选条件。
  //
  // 筛选条件参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/create
  async createSheetFilterViewCondition(
    request: Drive.CreateSheetFilterViewConditionReq
  ): Promise<{
    data: Drive.CreateSheetFilterViewConditionResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSheetFilterViewConditionReq> = {
      scope: 'Drive',
      api: 'CreateSheetFilterViewCondition',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions',
      body: new CreateSheetFilterViewConditionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      CreateSheetFilterViewConditionReq,
      Drive.CreateSheetFilterViewConditionResp
    >(req)
  }
  // deleteSheetFilterViewCondition 删除筛选视图的筛选范围某一列的筛选条件。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/delete
  async deleteSheetFilterViewCondition(
    request: Drive.DeleteSheetFilterViewConditionReq
  ): Promise<{
    data: Drive.DeleteSheetFilterViewConditionResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSheetFilterViewConditionReq> = {
      scope: 'Drive',
      api: 'DeleteSheetFilterViewCondition',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id',
      body: new DeleteSheetFilterViewConditionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      DeleteSheetFilterViewConditionReq,
      Drive.DeleteSheetFilterViewConditionResp
    >(req)
  }
  // updateSheetFilterViewCondition 更新筛选视图范围的某列的筛选条件, condition id 即为列的字母号。
  //
  // 筛选条件参数可参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/update
  async updateSheetFilterViewCondition(
    request: Drive.UpdateSheetFilterViewConditionReq
  ): Promise<{
    data: Drive.UpdateSheetFilterViewConditionResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSheetFilterViewConditionReq> = {
      scope: 'Drive',
      api: 'UpdateSheetFilterViewCondition',
      method: 'PUT',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id',
      body: new UpdateSheetFilterViewConditionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      UpdateSheetFilterViewConditionReq,
      Drive.UpdateSheetFilterViewConditionResp
    >(req)
  }
  // getSheetFilterViewCondition 获取筛选视图某列的筛选条件信息。
  //
  // 筛选条件含义参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/get
  async getSheetFilterViewCondition(
    request: Drive.GetSheetFilterViewConditionReq
  ): Promise<{
    data: Drive.GetSheetFilterViewConditionResp
    response: Response
  }> {
    const req: RawRequestReq<GetSheetFilterViewConditionReq> = {
      scope: 'Drive',
      api: 'GetSheetFilterViewCondition',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id',
      body: new GetSheetFilterViewConditionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      GetSheetFilterViewConditionReq,
      Drive.GetSheetFilterViewConditionResp
    >(req)
  }
  // querySheetFilterViewCondition 查询一个筛选视图的所有筛选条件, 返回筛选视图的筛选范围内的筛选条件。
  //
  // 筛选条件含义可参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/query
  async querySheetFilterViewCondition(
    request: Drive.QuerySheetFilterViewConditionReq
  ): Promise<{
    data: Drive.QuerySheetFilterViewConditionResp
    response: Response
  }> {
    const req: RawRequestReq<QuerySheetFilterViewConditionReq> = {
      scope: 'Drive',
      api: 'QuerySheetFilterViewCondition',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/query',
      body: new QuerySheetFilterViewConditionReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<
      QuerySheetFilterViewConditionReq,
      Drive.QuerySheetFilterViewConditionResp
    >(req)
  }
  // createSheetFloatImage 根据传入的参数创建一张浮动图片。Float_image_token （[上传图片至表格后得到](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all)）和range（只支持一个单元格） 必填。Float_image_id 可选, 不填的话会默认生成, 长度为10, 由 0-9、a-z、A-Z 组合生成。表格内不重复的图片（浮动图片+单元格图片）总数不超过4000。width 和 height 为图片展示的宽高, 可选, 不填的话会使用图片的真实宽高。offset_x 和 offset_y 为图片左上角距离所在单元格左上角的偏移, 可选, 默认为 0。
  //
  // 浮动图片的设置参考: [浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/create
  async createSheetFloatImage(
    request: Drive.CreateSheetFloatImageReq
  ): Promise<{
    data: Drive.CreateSheetFloatImageResp
    response: Response
  }> {
    const req: RawRequestReq<CreateSheetFloatImageReq> = {
      scope: 'Drive',
      api: 'CreateSheetFloatImage',
      method: 'POST',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images',
      body: new CreateSheetFloatImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateSheetFloatImageReq, Drive.CreateSheetFloatImageResp>(req)
  }
  // deleteSheetFloatImage 删除 float_image_id 对应的浮动图片。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/delete
  async deleteSheetFloatImage(
    request: Drive.DeleteSheetFloatImageReq
  ): Promise<{
    data: Drive.DeleteSheetFloatImageResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteSheetFloatImageReq> = {
      scope: 'Drive',
      api: 'DeleteSheetFloatImage',
      method: 'DELETE',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id',
      body: new DeleteSheetFloatImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteSheetFloatImageReq, Drive.DeleteSheetFloatImageResp>(req)
  }
  // updateSheetFloatImage 更新已有的浮动图片位置和宽高, 包括 range、width、height、offset_x 和 offset_y, 不包括 float_image_id 和 float_image_token。
  //
  // 浮动图片更新参考: [浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/patch
  async updateSheetFloatImage(
    request: Drive.UpdateSheetFloatImageReq
  ): Promise<{
    data: Drive.UpdateSheetFloatImageResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateSheetFloatImageReq> = {
      scope: 'Drive',
      api: 'UpdateSheetFloatImage',
      method: 'PATCH',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id',
      body: new UpdateSheetFloatImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateSheetFloatImageReq, Drive.UpdateSheetFloatImageResp>(req)
  }
  // getSheetFloatImage 根据 float_image_id 获取对应浮动图片的信息。
  //
  // 浮动图片参考: [浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/get
  async getSheetFloatImage(
    request: Drive.GetSheetFloatImageReq
  ): Promise<{
    data: Drive.GetSheetFloatImageResp
    response: Response
  }> {
    const req: RawRequestReq<GetSheetFloatImageReq> = {
      scope: 'Drive',
      api: 'GetSheetFloatImage',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id',
      body: new GetSheetFloatImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetSheetFloatImageReq, Drive.GetSheetFloatImageResp>(req)
  }
  // querySheetFloatImage 返回子表内所有的浮动图片信息。
  //
  // 浮动图片参考: [浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/query
  async querySheetFloatImage(
    request: Drive.QuerySheetFloatImageReq
  ): Promise<{
    data: Drive.QuerySheetFloatImageResp
    response: Response
  }> {
    const req: RawRequestReq<QuerySheetFloatImageReq> = {
      scope: 'Drive',
      api: 'QuerySheetFloatImage',
      method: 'GET',
      url:
        this.cli.openBaseURL +
        '/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/query',
      body: new QuerySheetFloatImageReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<QuerySheetFloatImageReq, Drive.QuerySheetFloatImageResp>(req)
  }
  // createWikiSpace 此接口用于创建知识空间
  //
  // 此接口不支持tenant access token（应用身份访问）
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/create
  async createWikiSpace(
    request: Drive.CreateWikiSpaceReq
  ): Promise<{
    data: Drive.CreateWikiSpaceResp
    response: Response
  }> {
    const req: RawRequestReq<CreateWikiSpaceReq> = {
      scope: 'Drive',
      api: 'CreateWikiSpace',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces',
      body: new CreateWikiSpaceReq(request),
      method_option: false,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateWikiSpaceReq, Drive.CreateWikiSpaceResp>(req)
  }
  // getWikiSpaceList 此接口用于获取有权限访问的知识空间列表。
  //
  // 此接口为分页接口。由于权限过滤, 可能返回列表为空, 但分页标记（has_more）为true, 可以继续分页请求。
  // 对于知识空间各项属性描述请参阅[获取知识空间信息](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get)
  // 使用tenant access token调用时, 请确认应用/机器人拥有部分知识空间的访问权限, 否则返回列表容易为空。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/list
  async getWikiSpaceList(
    request: Drive.GetWikiSpaceListReq
  ): Promise<{
    data: Drive.GetWikiSpaceListResp
    response: Response
  }> {
    const req: RawRequestReq<GetWikiSpaceListReq> = {
      scope: 'Drive',
      api: 'GetWikiSpaceList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces',
      body: new GetWikiSpaceListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetWikiSpaceListReq, Drive.GetWikiSpaceListResp>(req)
  }
  // getWikiSpace 此接口用于根据知识空间ID来查询知识空间的信息。
  //
  // 空间类型（type）:
  // - 个人空间: 归个人管理。一人仅可拥有一个个人空间, 无法添加其他管理员。
  // - 团队空间: 归团队（多人)管理, 可添加多个管理员。
  // 空间可见性（visibility）:
  // - 公开空间: 租户所有用户可见, 默认为成员权限。无法额外添加成员, 但可以添加管理员。
  // - 私有空间: 仅对知识空间管理员、成员可见, 需要手动添加管理员、成员。
  // 本接口要求知识库权限:
  // - 需要为知识空间成员（管理员）
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get
  async getWikiSpace(
    request: Drive.GetWikiSpaceReq
  ): Promise<{
    data: Drive.GetWikiSpaceResp
    response: Response
  }> {
    const req: RawRequestReq<GetWikiSpaceReq> = {
      scope: 'Drive',
      api: 'GetWikiSpace',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/:space_id',
      body: new GetWikiSpaceReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetWikiSpaceReq, Drive.GetWikiSpaceResp>(req)
  }
  // updateWikiSpaceSetting 根据space_id更新知识空间公共设置
  //
  // 知识库权限要求:
  // - 为知识空间管理员
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-setting/update
  async updateWikiSpaceSetting(
    request: Drive.UpdateWikiSpaceSettingReq
  ): Promise<{
    data: Drive.UpdateWikiSpaceSettingResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateWikiSpaceSettingReq> = {
      scope: 'Drive',
      api: 'UpdateWikiSpaceSetting',
      method: 'PUT',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/:space_id/setting',
      body: new UpdateWikiSpaceSettingReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateWikiSpaceSettingReq, Drive.UpdateWikiSpaceSettingResp>(req)
  }
  // deleteWikiSpaceMember 此接口用于删除知识空间成员。
  //
  // - 公开知识空间（visibility为public）对租户所有用户可见, 因此不支持再删除成员, 但可以删除管理员。
  // - 个人知识空间 （type为person）为个人管理的知识空间, 不支持删除管理员。但可以删除成员。
  // 知识库权限要求
  // - 为知识空间管理员
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/delete
  async deleteWikiSpaceMember(
    request: Drive.DeleteWikiSpaceMemberReq
  ): Promise<{
    data: Drive.DeleteWikiSpaceMemberResp
    response: Response
  }> {
    const req: RawRequestReq<DeleteWikiSpaceMemberReq> = {
      scope: 'Drive',
      api: 'DeleteWikiSpaceMember',
      method: 'DELETE',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/:space_id/members/:member_id',
      body: new DeleteWikiSpaceMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<DeleteWikiSpaceMemberReq, Drive.DeleteWikiSpaceMemberResp>(req)
  }
  // addWikiSpaceMember 添加知识空间成员（管理员）。
  //
  // - 公开知识空间（visibility为public）对租户所有用户可见, 因此不支持再添加成员, 但可以添加管理员。
  // 相关错误: 131101 public wiki space can't create member.
  // - 个人知识空间 （type为person）为个人管理的知识空间, 不支持添加其他管理员（包括应用/机器人）。但可以添加成员。
  // 相关错误: 131101 person wiki space can't create admin.
  // 知识库权限要求
  // - 为知识空间管理员
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/create
  async addWikiSpaceMember(
    request: Drive.AddWikiSpaceMemberReq
  ): Promise<{
    data: Drive.AddWikiSpaceMemberResp
    response: Response
  }> {
    const req: RawRequestReq<AddWikiSpaceMemberReq> = {
      scope: 'Drive',
      api: 'AddWikiSpaceMember',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/:space_id/members',
      body: new AddWikiSpaceMemberReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<AddWikiSpaceMemberReq, Drive.AddWikiSpaceMemberResp>(req)
  }
  // createWikiNode 此接口用于在知识库里创建节点。
  //
  // 知识库权限要求:
  // - 父节点容器编辑权限
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/create
  async createWikiNode(
    request: Drive.CreateWikiNodeReq
  ): Promise<{
    data: Drive.CreateWikiNodeResp
    response: Response
  }> {
    const req: RawRequestReq<CreateWikiNodeReq> = {
      scope: 'Drive',
      api: 'CreateWikiNode',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/:space_id/nodes',
      body: new CreateWikiNodeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CreateWikiNodeReq, Drive.CreateWikiNodeResp>(req)
  }
  // getWikiNodeList 此接口用于分页获取Wiki节点的子节点列表。
  //
  // 此接口为分页接口。由于权限过滤, 可能返回列表为空, 但分页标记（has_more）为true, 可以继续分页请求。
  // 知识库权限要求:
  // - 父节点阅读权限
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/list
  async getWikiNodeList(
    request: Drive.GetWikiNodeListReq
  ): Promise<{
    data: Drive.GetWikiNodeListResp
    response: Response
  }> {
    const req: RawRequestReq<GetWikiNodeListReq> = {
      scope: 'Drive',
      api: 'GetWikiNodeList',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/:space_id/nodes',
      body: new GetWikiNodeListReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetWikiNodeListReq, Drive.GetWikiNodeListResp>(req)
  }
  // moveWikiNode 此方法用于在Wiki内移动节点, 支持跨知识空间移动。如果有子节点, 会携带子节点一起移动。
  //
  // 知识库权限要求:
  // - 节点编辑权限
  // - 原父节点容器编辑权限
  // - 目的父节点容器编辑权限
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move
  async moveWikiNode(
    request: Drive.MoveWikiNodeReq
  ): Promise<{
    data: Drive.MoveWikiNodeResp
    response: Response
  }> {
    const req: RawRequestReq<MoveWikiNodeReq> = {
      scope: 'Drive',
      api: 'MoveWikiNode',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/move',
      body: new MoveWikiNodeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<MoveWikiNodeReq, Drive.MoveWikiNodeResp>(req)
  }
  // updateWikiNodeTitle 此接口用于更新节点标题
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/update_title
  async updateWikiNodeTitle(
    request: Drive.UpdateWikiNodeTitleReq
  ): Promise<{
    data: Drive.UpdateWikiNodeTitleResp
    response: Response
  }> {
    const req: RawRequestReq<UpdateWikiNodeTitleReq> = {
      scope: 'Drive',
      api: 'UpdateWikiNodeTitle',
      method: 'POST',
      url:
        this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/update_title',
      body: new UpdateWikiNodeTitleReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<UpdateWikiNodeTitleReq, Drive.UpdateWikiNodeTitleResp>(req)
  }
  // copyWikiNode 此接口用于创建节点副本到指定地点。
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/copy
  async copyWikiNode(
    request: Drive.CopyWikiNodeReq
  ): Promise<{
    data: Drive.CopyWikiNodeResp
    response: Response
  }> {
    const req: RawRequestReq<CopyWikiNodeReq> = {
      scope: 'Drive',
      api: 'CopyWikiNode',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/copy',
      body: new CopyWikiNodeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<CopyWikiNodeReq, Drive.CopyWikiNodeResp>(req)
  }
  // getWikiNode 获取节点信息
  //
  // 知识库权限要求:
  // - 节点阅读权限
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get_node
  async getWikiNode(
    request: Drive.GetWikiNodeReq
  ): Promise<{
    data: Drive.GetWikiNodeResp
    response: Response
  }> {
    const req: RawRequestReq<GetWikiNodeReq> = {
      scope: 'Drive',
      api: 'GetWikiNode',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/get_node',
      body: new GetWikiNodeReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetWikiNodeReq, Drive.GetWikiNodeResp>(req)
  }
  // moveDocsToWiki 该接口允许添加已有云文档至知识库, 并挂载在指定父页面下
  //
  // ### 移动操作 ###
  // 移动后, 文档将从“我的空间”或“共享空间”转移至“知识库”, 并将从以下功能入口消失:
  // - 云空间主页: 最近访问、快速访问
  // - 我的空间
  // - 共享空间
  // - 收藏
  // ### 权限变更 ###
  // 移动后, 文档会向所有可查看“页面树”的用户显示, 默认继承父页面的权限设置。
  // </md-alert
  // 仅支持文档所有者发起请求
  // 此接口为异步接口。若移动已完成（或节点已在Wiki中）, 则直接返回结果（Wiki token）。若尚未完成, 则返回task id。请使用[获取任务结果](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/task/get)接口进行查询。
  // 知识库权限要求:
  // - 文档可管理权限
  // - 原文件夹编辑权限
  // - 目标父节点容器编辑权限
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move_docs_to_wiki
  async moveDocsToWiki(
    request: Drive.MoveDocsToWikiReq
  ): Promise<{
    data: Drive.MoveDocsToWikiResp
    response: Response
  }> {
    const req: RawRequestReq<MoveDocsToWikiReq> = {
      scope: 'Drive',
      api: 'MoveDocsToWiki',
      method: 'POST',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/spaces/:space_id/nodes/move_docs_to_wiki',
      body: new MoveDocsToWikiReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<MoveDocsToWikiReq, Drive.MoveDocsToWikiResp>(req)
  }
  // getWikiTask 该方法用于获取wiki异步任务的结果
  //
  // 知识库权限要求:
  // - 为任务创建者（用户或应用/机器人）
  //
  // doc: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/task/get
  async getWikiTask(
    request: Drive.GetWikiTaskReq
  ): Promise<{
    data: Drive.GetWikiTaskResp
    response: Response
  }> {
    const req: RawRequestReq<GetWikiTaskReq> = {
      scope: 'Drive',
      api: 'GetWikiTask',
      method: 'GET',
      url: this.cli.openBaseURL + '/open-apis/wiki/v2/tasks/:task_id',
      body: new GetWikiTaskReq(request),
      method_option: false,
      need_tenant_accessToken: true,
      need_user_accessToken: true
    }
    return this.cli.RawRequest<GetWikiTaskReq, Drive.GetWikiTaskResp>(req)
  }
}

export declare namespace Drive {
  export interface SubscribeDriveFileReq {
    file_token: string // 文档token, 示例值: "doccnxxxxxxxxxxxxxxxxxxxxxx"
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `docx`: 新版文档, `sheet`: 表格, `bitable`: 多维表格
  }

  export interface SubscribeDriveFileResp {}

  export interface subscribeDriveFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: SubscribeDriveFileResp
  }

  export interface SearchDriveFileReq {
    search_key: string // 搜索关键字
    count?: number // 搜索返回数量, 0 <= count <= 50
    offset?: number // 搜索偏移位, offset >= 0, offset + count < 200
    owner_ids?: string[] // 文档所有者的userid
    chat_ids?: string[] // 文档所在群的chatid
    docs_types?: string[] // 文档类型, 支持: "doc", "sheet", "slide", "bitable", "mindnote", "file"
  }

  export interface SearchDriveFileResp {
    docs_entities?: SearchDriveFileRespDocsEntity[] // 搜索匹配文档列表
    has_more: boolean // 搜索偏移位结果列表后是否还有数据
    total: number // 搜索匹配文档总数量
  }

  export interface SearchDriveFileRespDocsEntity {
    docs_token: string // 文档token
    docs_type: string // 文档类型
    title: string // 标题
    owner_id: string // 文件所有者
  }

  export interface searchDriveFileResp {
    code: number
    msg: string
    data: SearchDriveFileResp
  }

  export interface GetDriveFileMetaReq {
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    request_docs?: GetDriveFileMetaReqRequestDocs[] // 请求文档, 一次不超过200个, 长度范围: `1` ～ `200`
    with_url?: boolean // 是否获取文档链接, 示例值: false
  }

  export interface GetDriveFileMetaReqRequestDocs {
    doc_token: string // 文件的 token, 获取方式见[如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6), 示例值: "doccnfYZzTlvXqZIGTdAHKabcef"
    doc_type: string // 文件类型, 示例值: "doc", 可选值有: `doc`: 飞书文档, `sheet`: 飞书电子表格, `bitable`: 飞书多维表格, `mindnote`: 飞书思维笔记, `file`: 飞书文件, `wiki`: 飞书wiki, `docx`: 飞书新版文档
  }

  export interface GetDriveFileMetaResp {
    metas?: GetDriveFileMetaRespMeta[] // 文档元数据列表
    failed_list?: GetDriveFileMetaRespFailed[] // 无法获取元数据的文档列表
  }

  export interface GetDriveFileMetaRespFailed {
    token: string // 获取元数据失败的文档token
    code: number // 获取元数据失败的错误码, 可选值有: `970002`: Unsupported doc-type, `970003`: No permission to access meta, `970005`: Record not found (不存在或者已被删除)
  }

  export interface GetDriveFileMetaRespMeta {
    doc_token: string // 文件token
    doc_type: string // 文件类型
    title: string // 标题
    owner_id: string // 文件所有者
    create_time: string // 创建时间（Unix时间戳）
    latest_modify_user: string // 最后编辑者
    latest_modify_time: string // 最后编辑时间（Unix时间戳）
    url: string // 文档链接
  }

  export interface getDriveFileMetaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDriveFileMetaResp
  }

  export interface CreateDriveFileReq {
    folderToken: string // 文件夹 token, 用于在此文件夹下新建文档, 获取方式见[如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)
    title: string // 创建文档的标题。注: type 为 "doc" 时不可用（非必填, 请求会被过滤）, 有创建带标题doc文档需求可用 [创建文档](https://open.feishu.cn/document/ukTMukTMukTM/ugDM2YjL4AjN24COwYjN) 接口
    type: string // 需要创建文档的类型  "doc" 、 "sheet"  or  "bitable"
  }

  export interface CreateDriveFileResp {
    url: string // 新创建文档的 url
    token: string // 新创建文档的 token
    revision: number // 新创建文档的版本号
  }

  export interface createDriveFileResp {
    code: number
    msg: string
    data: CreateDriveFileResp
  }

  export interface DeleteDriveFileReq {
    file_token: string // 需要删除的文件token, 示例值: "boxcnrHpsg1QDqXAAAyachabcef"
    type: string // 被删除文件的类型, 示例值: "file", 可选值有: `file`: 文件类型, `docx`: 新版文档类型, `bitable`: 多维表格类型, `folder`: 文件夹类型, `doc`: 文档类型, `sheet`: 电子表格类型, `mindnote`: 思维笔记类型, `shortcut`: 快捷方式类型
  }

  export interface DeleteDriveFileResp {
    task_id: string // 异步任务id, 删除文件夹时返回
  }

  export interface deleteDriveFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteDriveFileResp
  }

  export interface DeleteDriveSheetFileReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见 [概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/files/guide/introduction)
  }

  export interface DeleteDriveSheetFileResp {
    id: string // sheet 的 id 「字符串类型」
    result: boolean // 删除结果
  }

  export interface deleteDriveSheetFileResp {
    code: number
    msg: string
    data: DeleteDriveSheetFileResp
  }

  export interface GetDriveFileListReq {
    page_size?: number // 分页大小, 示例值: 10, 最大值: `200`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "MTY1NTA3MTA1OXw3MTA4NDc2MDc1NzkyOTI0Nabcef"
    folder_token?: string // 文件夹的token, 示例值: "fldbcO1UuPz8VwnpPx5a9abcef"
  }

  export interface GetDriveFileListResp {
    files?: GetDriveFileListRespFile[] // 文件夹清单列表
    next_page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回下一次遍历的page_token, 否则则不返回
    has_more: boolean // 是否还有更多项
  }

  export interface GetDriveFileListRespFile {
    token: string // 文件标识
    name: string // 文件名
    type: string // 文件类型
    parent_token: string // 父文件夹标识
    url: string // 在浏览器中查看的链接
    shortcut_info: GetDriveFileListRespFileShortcutInfo // 快捷方式文件信息
  }

  export interface GetDriveFileListRespFileShortcutInfo {
    target_type: string // 快捷方式指向的原文件类型
    target_token: string // 快捷方式指向的原文件token
  }

  export interface getDriveFileListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDriveFileListResp
  }

  export interface GetDriveRootFolderMetaReq {}

  export interface GetDriveRootFolderMetaResp {
    token: string // 文件夹的 token
    id: string // 文件夹的 id
    user_id: string // 文件夹的所有者 id
  }

  export interface getDriveRootFolderMetaResp {
    code: number
    msg: string
    data: GetDriveRootFolderMetaResp
  }

  export interface GetDriveFolderMetaReq {
    folderToken: string // 文件夹 token, 获取方式见[如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)
  }

  export interface GetDriveFolderMetaResp {
    id: string // 文件夹的 id
    name: string // 文件夹的标题
    token: string // 文件夹的 token
    createUid: string // 文件夹的创建者 id
    editUid: string // 文件夹的最后编辑者 id
    parentId: string // 文件夹的上级目录 id
    ownUid: string // 文件夹为个人文件夹时, 为文件夹的所有者 id；文件夹为共享文件夹时, 为文件夹树id
  }

  export interface getDriveFolderMetaResp {
    code: number
    msg: string
    data: GetDriveFolderMetaResp
  }

  export interface GetDriveFolderChildrenReq {
    folderToken: string // 文件夹的 token, 获取方式见 [如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)
    types?: string[] // 需要查询的文件类型, 默认返回所有 children；types 可多选, 可选类型有 doc、sheet、file、bitable、docx、folder、mindnote 。如 url?types=folder&types=sheet
  }

  export interface GetDriveFolderChildrenResp {
    parentToken: string // 文件夹的 token
    children?: { [key: string]: GetDriveFolderChildrenRespChildren } // 文件夹的下的文件
  }

  export interface GetDriveFolderChildrenRespChildren {
    token: string // 文件的 token
    name: string // 文件的标题
    type: string // 文件的类型
    is_shortcut: boolean // 该文件是否是快捷方式, 如果值为true, 代表该文件是一个快捷方式
  }

  export interface getDriveFolderChildrenResp {
    code: number
    msg: string
    data: GetDriveFolderChildrenResp
  }

  export interface GetDriveFileStatisticsReq {
    file_token: string // 文件 token, 示例值: "doccnfYZzTlvXqZIGTdAHKabcef"
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 表格, `mindnote`: 思维笔记, `bitable`: 多维表格, `wiki`: 知识库, `file`: 文件
  }

  export interface GetDriveFileStatisticsResp {
    file_token: string // 文件 token
    file_type: string // 文件类型
    statistics: GetDriveFileStatisticsRespStatistics // 文件统计信息
  }

  export interface GetDriveFileStatisticsRespStatistics {
    uv: number // 文件历史访问人数, 同一用户（user_id）多次访问按一次计算。
    pv: number // 文件历史访问次数, 同一用户（user_id）多次访问按多次计算。（注: 同一用户相邻两次访问间隔在半小时内视为一次访问）
    like_count: number // 文件历史点赞总数, 若对应的文档类型不支持点赞, 返回 -1
    timestamp: number // 时间戳（秒）
  }

  export interface getDriveFileStatisticsResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDriveFileStatisticsResp
  }

  export interface GetDriveFileTaskReq {
    task_id: string // 文件相关异步任务id, 示例值: "12345"
  }

  export interface GetDriveFileTaskResp {
    status: string // 异步任务的执行状态, 如果任务执行成功则返回success, 如果任务执行失败则返回fail, 如果任务还在执行中则返回process。
  }

  export interface getDriveFileTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDriveFileTaskResp
  }

  export interface CreateDriveExportTaskReq {
    file_extension: string // 导出文件扩展名, 示例值: "pdf", 可选值有: `docx`: Microsoft Word (DOCX) 格式, `pdf`: pdf 格式, `xlsx`: Microsoft Excel (XLSX) 格式
    token: string // 导出文档 token, 示例值: "doccnxe5OxxxxxxxSNdsJviENsk"
    type: string // 导出文档类型, 示例值: "doc", 可选值有: `doc`: 旧版飞书云文档类型, `sheet`: 飞书电子表格类型, `bitable`: 飞书多维表格类型, `docx`: 新版飞书云文档类型
  }

  export interface CreateDriveExportTaskResp {
    ticket: string // 导出任务ID
  }

  export interface createDriveExportTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateDriveExportTaskResp
  }

  export interface GetDriveExportTaskReq {
    ticket: string // 导出任务ID, 示例值: "6933093124755423251"
    token: string // 导出文档的 token, 示例值: "doccnZVxxxxxxxxxxxxGiyBgYqe"
  }

  export interface GetDriveExportTaskResp {
    result: GetDriveExportTaskRespResult // 导出任务结果
  }

  export interface GetDriveExportTaskRespResult {
    file_extension: string // 导出文件扩展名, 可选值有: `docx`: Microsoft Word (DOCX) 格式, `pdf`: pdf 格式, `xlsx`: Microsoft Excel (XLSX) 格式
    type: string // 导出文档类型, 可选值有: `doc`: 旧版飞书云文档类型, `sheet`: 飞书电子表格类型, `bitable`: 飞书多维表格类型, `docx`: 新版飞书云文档类型
    file_name: string // 导出文件名
    file_token: string // 导出文件 drive token
    file_size: number // 导出文件大小
    job_error_msg: string // 任务失败原因
    job_status: number // 任务状态, 可选值有: `0`: 成功, `1`: 初始化, `2`: 处理中, `3`: 内部错误, `107`: 导出文档过大, `108`: 处理超时, `109`: 内部错误, `110`: 无权限, `111`: 导出文档已删除, `122`: 创建副本中禁止导出, `123`: 导出文档不存在, `6000`: 导出文档图片过多
  }

  export interface getDriveExportTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDriveExportTaskResp
  }

  export interface DownloadDriveExportTaskReq {
    file_token: string // 导出文档token, 示例值: "boxcnNAlfwHxxxxxxxxxxSaLSec"
  }

  export interface DownloadDriveExportTaskResp {
    file: Buffer
  }

  export interface downloadDriveExportTaskResp {
    code: number
    msg: string
    data: DownloadDriveExportTaskResp
  }

  export interface DownloadDriveFileReq {
    file_token: string // 文件的 token, 获取方式见 [概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/files/guide/introduction), 示例值: "boxcnabCdefg12345"
    range?: number[] // 指定文件下载部分, 示例值: "bytes=0-1024"
  }

  export interface DownloadDriveFileResp {
    file: Buffer
  }

  export interface downloadDriveFileResp {
    code: number
    msg: string
    data: DownloadDriveFileResp
  }

  export interface CopyDriveFileReq {
    file_token: string // 被复制的文件token, 示例值: "boxbc0dGSMu23m7QkC1bvabcef"
    name: string // 被复制文件的新名称, 示例值: "123.txt"
    type?: string // 被复制文件的类型, 如果该值为空或者与文件实际类型不匹配, 接口会返回失败, 示例值: "file", 可选值有: `file`: 文件类型, `doc`: 文档类型, `sheet`: 电子表格类型, `bitable`: 多维表格类型, `docx`: 新版文档类型, `mindnote`: 思维笔记类型
    folder_token: string // 文件被复制到的目标文件夹token, 示例值: "fldbcO1UuPz8VwnpPx5a92abcef"
  }

  export interface CopyDriveFileResp {
    file: CopyDriveFileRespFile // 复制后的文件资源
  }

  export interface CopyDriveFileRespFile {
    token: string // 文件标识
    name: string // 文件名
    type: string // 文件类型
    parent_token: string // 父文件夹标识
    url: string // 在浏览器中查看的链接
  }

  export interface copyDriveFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CopyDriveFileResp
  }

  export interface CreateDriveFolderReq {
    name: string // 文件夹名称, 示例值: "New Folder"
    folder_token: string // 父文件夹token, 示例值: "fldbcO1UuPz8VwnpPx5a92abcef"
  }

  export interface CreateDriveFolderResp {
    token: string // 创建文件夹的token
    url: string // 创建文件夹的访问url
  }

  export interface createDriveFolderResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateDriveFolderResp
  }

  export interface MoveDriveFileReq {
    file_token: string // 需要移动的文件token, 示例值: "boxcnrHpsg1QDqXAAAyachabcef"
    type?: string // 文件类型, 如果该值为空或者与文件实际类型不匹配, 接口会返回失败, 示例值: "file", 可选值有: `file`: 普通文件类型, `docx`: 新版文档类型, `bitable`: 多维表格类型, `doc`: 文档类型, `sheet`: 电子表格类型, `mindnote`: 思维笔记类型, `folder`: 文件夹类型
    folder_token?: string // 目标文件夹token, 示例值: "fldbcO1UuPz8VwnpPx5a92abcef"
  }

  export interface MoveDriveFileResp {
    task_id: string // 异步任务id, 移动文件夹时返回
  }

  export interface moveDriveFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: MoveDriveFileResp
  }

  export interface UploadDriveFileReq {
    file_name: string // 文件名, 示例值: "demo.pdf", 最大长度: `250` 字符
    parent_type: string // 上传点类型, 示例值: "explorer", 可选值有: explorer: 云空间。
    parent_node: string // 文件夹token, 获取方式见 [概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/files/guide/introduction), 示例值: "fldbcO1UuPz8VwnpPx5a92abcef"
    size: number // 文件大小（以字节为单位）, 示例值: 1024, 最大值: `20971520`
    checksum?: string // 文件adler32校验和(可选), 示例值: "123423882374238912356"
    file: Buffer // 文件二进制内容, 示例值: file binary
  }

  export interface UploadDriveFileResp {
    file_token: string // 新创建文件的 token
  }

  export interface uploadDriveFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UploadDriveFileResp
  }

  export interface PrepareUploadDriveFileReq {
    file_name: string // 文件名, 示例值: "test.txt", 最大长度: `250` 字符
    parent_type: string // 上传点类型, 示例值: "explorer", 可选值有: explorer: 云空间。
    parent_node: string // 文件夹的token, 示例值: "fldbcO1UuPz8VwnpPx5a92abcef"
    size: number // 文件大小, 示例值: 1024, 最小值: `0`
  }

  export interface PrepareUploadDriveFileResp {
    upload_id: string // 分片上传事务ID
    block_size: number // 分片大小策略
    block_num: number // 分片数量
  }

  export interface prepareUploadDriveFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: PrepareUploadDriveFileResp
  }

  export interface PartUploadDriveFileReq {
    upload_id: string // 分片上传事务ID, 示例值: "7111211691345512356"
    seq: number // 块号, 从0开始计数, 示例值: 0
    size: number // 块大小（以字节为单位）, 示例值: 4194304
    checksum?: string // 文件分块adler32校验和(可选), 示例值: "12342388237783212356"
    file: Buffer // 文件分片二进制内容, 示例值: file binary
  }

  export interface PartUploadDriveFileResp {}

  export interface partUploadDriveFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: PartUploadDriveFileResp
  }

  export interface FinishUploadDriveFileReq {
    upload_id: string // 分片上传事务ID, 示例值: "7111211691345512356"
    block_num: number // 分片数量, 示例值: 1
  }

  export interface FinishUploadDriveFileResp {
    file_token: string // 新创建的文件token
  }

  export interface finishUploadDriveFileResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: FinishUploadDriveFileResp
  }

  export interface DownloadDriveMediaReq {
    file_token: string // 文件的 token, 获取方式见 [概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/files/guide/introduction), 示例值: "boxcnrHpsg1QDqXAAAyachabcef"
    extra?: string // 扩展信息, 示例值: "[请参考-上传点类型及对应Extra说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/introduction)"
    range?: number[] // 指定文件下载部分, 示例值: "bytes=0-1024"
  }

  export interface DownloadDriveMediaResp {
    file: Buffer
  }

  export interface downloadDriveMediaResp {
    code: number
    msg: string
    data: DownloadDriveMediaResp
  }

  export interface UploadDriveMediaReq {
    file_name: string // 文件名, 示例值: "demo.jpeg", 最大长度: `250` 字符
    parent_type: string // 上传点类型, 示例值: "doc_image", 可选值有: `doc_image`: 文档图片, `docx_image`: 新版文档图片, `sheet_image`: 电子表格图片, `doc_file`: 文档文件, `docx_file`: 新版文档文件, `sheet_file`: 电子表格文件, `vc_virtual_background`: vc虚拟背景(灰度中, 暂未开放), `bitable_image`: 多维表格图片, `bitable_file`: 多维表格文件, `moments`: 同事圈(灰度中, 暂未开放), `ccm_import_open`: 云文档导入文件。
    parent_node: string // 上传点的token, 示例值: "doccnFivLCfJfblZjGZtxgabcef"
    size: number // 文件大小（以字节为单位）, 示例值: 1024, 最大值: `20971520`
    checksum?: string // 文件adler32校验和（可选）, 示例值: "12345678"
    extra?: string // 扩展信息(可选), 示例值: "{"test":"test"}"
    file: Buffer // 文件二进制内容, 示例值: file binary
  }

  export interface UploadDriveMediaResp {
    file_token: string // 素材文件的 token。
  }

  export interface uploadDriveMediaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UploadDriveMediaResp
  }

  export interface PrepareUploadDriveMediaReq {
    file_name: string // 文件名, 示例值: "demo.jpeg", 最大长度: `250` 字符
    parent_type: string // 上传点类型, 示例值: "doc_image", 可选值有: `doc_image`: 文档图片, `sheet_image`: 电子表格图片, `doc_file`: 文档文件, `sheet_file`: 电子表格文件, `vc_virtual_background`: vc虚拟背景(灰度中, 暂未开放), `bitable_image`: 多维表格图片, `bitable_file`: 多维表格文件, `moments`: 同事圈(灰度中, 暂未开放), `ccm_import_open`: 云文档导入文件。
    parent_node: string // 上传点的标识符, 示例值: "doccnFivLCfJfblZjGZtxgabcef"
    size: number // 文件大小, 示例值: 1024, 最小值: `0`
    extra?: string // 扩展信息(可选), 示例值: "{\"test\":\"test\"}"
  }

  export interface PrepareUploadDriveMediaResp {
    upload_id: string // 分片上传事务ID
    block_size: number // 分片大小策略
    block_num: number // 分片数量
  }

  export interface prepareUploadDriveMediaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: PrepareUploadDriveMediaResp
  }

  export interface PartUploadDriveMediaReq {
    upload_id: string // 分片上传事务ID, 示例值: "7111211691345512356"
    seq: number // 块号, 从0开始计数, 示例值: 0
    size: number // 块大小（以字节为单位）, 示例值: 4194304
    checksum?: string // 文件分块adler32校验和(可选), 示例值: "12345678"
    file: Buffer // 文件分片二进制内容, 示例值: file binary
  }

  export interface PartUploadDriveMediaResp {}

  export interface partUploadDriveMediaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: PartUploadDriveMediaResp
  }

  export interface FinishUploadDriveMediaReq {
    upload_id: string // 分片上传事务ID, 示例值: "7111211691345512356"
    block_num: number // 分片数量, 示例值: 1
  }

  export interface FinishUploadDriveMediaResp {
    file_token: string // 新创建文件的 token
  }

  export interface finishUploadDriveMediaResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: FinishUploadDriveMediaResp
  }

  export interface CreateDriveMemberPermissionOldReq {
    token: string // 文件的 token, 获取方式见 [对接前说明](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN)的第 4 项
    type: string // 文档类型  "doc" 、"sheet" 、 "bitable" or "file"
    members: CreateDriveMemberPermissionOldReqMembers // 用户
    notify_lark?: boolean // 添加权限后是否飞书/lark通知对方 true 通知 or false 不通知
  }

  export interface CreateDriveMemberPermissionOldReqMembers {
    member_type: string // 用户类型, 可选 email 、openid、openchat、userid
    member_id: string // 用户类型下的值
    perm: string // 需要增加的权限, 权限值: "view", "edit"
  }

  export interface CreateDriveMemberPermissionOldResp {
    is_all_success: boolean // 是否全部成功
    fail_members?: CreateDriveMemberPermissionOldRespFailMember[] // 添加权限失败的用户信息
  }

  export interface CreateDriveMemberPermissionOldRespFailMember {
    member_type: string // 用户类型
    member_id: string // 用户类型下的值
    perm: string // 需要增加的权限
  }

  export interface createDriveMemberPermissionOldResp {
    code: number
    msg: string
    data: CreateDriveMemberPermissionOldResp
  }

  export interface TransferDriveMemberPermissionReq {
    token: string // 文件的 token, 获取方式见 [如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)
    type: string // 文档类型, 可选 doc、docx、sheet、bitable、file
    owner: TransferDriveMemberPermissionReqOwner // 要转移到的新的文档所有者
    remove_old_owner?: boolean // true 为转移后删除旧 owner 的权限, 默认为false
    cancel_notify?: boolean // true为不通知新owner, 默认为false
  }

  export interface TransferDriveMemberPermissionReqOwner {
    member_type: string // 用户类型, 可选 email、openid、userid、unionid
    member_id: string // 用户类型下的值, 获取方式见 [如何获得 User ID、Open ID 和 Union ID？](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get)
  }

  export interface TransferDriveMemberPermissionResp {
    is_success: boolean // 请求是否成功
    type: string // 文档类型, 可选 doc、sheet、bitable、file
    token: string // 文档的 token
    owner: TransferDriveMemberPermissionRespOwner // 文档当前所有者
  }

  export interface TransferDriveMemberPermissionRespOwner {
    member_type: string // 用户类型, 有 email、openid、userid、unionid
    member_id: string // 用户类型下的值
  }

  export interface transferDriveMemberPermissionResp {
    code: number
    msg: string
    data: TransferDriveMemberPermissionResp
  }

  export interface GetDriveMemberPermissionListReq {
    token: string // 文件的 token, 获取方式见 [如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)
    type: string // 文档类型, 可选 doc、docx、sheet、bitable、file
  }

  export interface GetDriveMemberPermissionListResp {
    members?: GetDriveMemberPermissionListRespMember[] // 协作者列表
  }

  export interface GetDriveMemberPermissionListRespMember {
    member_type: string // 协作者类型 "user" or "chat"
    member_open_id: string // 协作者openid
    member_user_id: string // 协作者userid(仅当member_type="user"时有效)
    perm: string // 协作者权限 (注意: 有"edit"权限的协作者一定有"view"权限)
  }

  export interface getDriveMemberPermissionListResp {
    code: number
    msg: string
    data: GetDriveMemberPermissionListResp
  }

  export interface CreateDriveMemberPermissionReq {
    token: string // 文件的 token, 获取方式见 [如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6), 示例值: "doccnBKgoMyY5OMbUG6FioTXuBe"
    type: string // 文件类型, 放于query参数中, 如: `?type=doc`, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 电子表格, `file`: 云空间文件, `wiki`: 知识库节点, `bitable`: 多维表格, `docx`: 新版文档, `folder`: 文件夹（未来支持）
    need_notification?: boolean // 添加权限后是否通知对方, 注意: 使用`tenant_access_token`访问不支持该参数, 示例值: false, 默认值: `false`
    member_type: string // 用户类型, 与请求体中的`member_id`要对应, 可选值有: `email`: 飞书邮箱, `openid`: [开放平台ID](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get), `openchat`: [开放平台群组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), `opendepartmentid`:[开放平台部门ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview), `userid`: [用户自定义ID](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get), 注意: 使用`tenant_access_token`访问不支持添加`opendepartmentid`, 示例值: "openid"
    member_id: string // 用户类型下的值, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    perm: string // 需要更新的权限, 可选值有: `view`: 可阅读, `edit`: 可编辑, `full_access`: 所有权限, 示例值: "view"
  }

  export interface CreateDriveMemberPermissionResp {
    member: CreateDriveMemberPermissionRespMember // 本次添加权限的用户信息
  }

  export interface CreateDriveMemberPermissionRespMember {
    member_type: string // 用户类型, 与请求体中的`member_id`要对应, 可选值有: `email`: 飞书邮箱, `openid`: [开放平台ID](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get), `openchat`: [开放平台群组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), `opendepartmentid`:[开放平台部门ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview), `userid`: [用户自定义ID](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get), 注意: 使用`tenant_access_token`访问不支持添加`opendepartmentid`
    member_id: string // 用户类型下的值
    perm: string // 需要更新的权限, 可选值有: `view`: 可阅读, `edit`: 可编辑, `full_access`: 所有权限
  }

  export interface createDriveMemberPermissionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateDriveMemberPermissionResp
  }

  export interface DeleteDriveMemberPermissionReq {
    token: string // 文件的 token, 获取方式见 [如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6), 示例值: "doccnBKgoMyY5OMbUG6FioTXuBe"
    member_id: string // 权限成员的ID, 与`member_type`相对应, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    type: string // 文件类型, 放于query参数中, 如: `?type=doc`, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 电子表格, `file`: 云空间文件, `wiki`: 知识库节点, `bitable`: 多维表格, `docx`: 新版文档, `folder`: 文件夹（未来支持）
    member_type: string // 权限成员类型, 放于query参数中, 如: `?member_type=openid`, 示例值: "openid", 可选值有: `email`: 邮箱地址, `openid`: [开放平台ID](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get), `openchat`: [开放平台群组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), `opendepartmentid`: [开放平台部门ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview), `userid`: [用户自定义ID](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get)
  }

  export interface DeleteDriveMemberPermissionResp {}

  export interface deleteDriveMemberPermissionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteDriveMemberPermissionResp
  }

  export interface DeleteDriveMemberPermissionOldReq {
    token: string // 文件的 token, 获取方式见 [对接前说明](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN)的第 4 项
    type: string // 文档类型 "doc"  or  "sheet" or "bitable"  or "file"
    member_type: string // 用户类型, 可选 "openid"、"openchat"、"userid"
    member_id: string // 用户类型下的值
  }

  export interface DeleteDriveMemberPermissionOldResp {
    is_success: boolean // 是否操作成功
  }

  export interface deleteDriveMemberPermissionOldResp {
    code: number
    msg: string
    data: DeleteDriveMemberPermissionOldResp
  }

  export interface UpdateDriveMemberPermissionOldReq {
    token: string // 文件的 token, 获取方式见 [对接前说明](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN)的第 4 项
    type: string // 文档类型  "doc"  or  "sheet" or "file"
    member_type: string // 用户类型, 可选 "openid"、"openchat"、"userid"
    member_id: string // 用户类型下的值
    perm: string // 权限, "view" or "edit"
    notify_lark: boolean // 修改权限后是否飞书/lark通知对方 true 通知 or false 不通知
  }

  export interface UpdateDriveMemberPermissionOldResp {
    is_success: boolean // 是否操作成功
  }

  export interface updateDriveMemberPermissionOldResp {
    code: number
    msg: string
    data: UpdateDriveMemberPermissionOldResp
  }

  export interface UpdateDriveMemberPermissionReq {
    token: string // 文件的 token, 获取方式见 [如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6), 示例值: "doccnBKgoMyY5OMbUG6FioTXuBe"
    member_id: string // 权限成员的ID, 与`member_type`相对应, 示例值: "ou_7dab8a3d3cdcc9da365777c7ad535d62"
    need_notification?: boolean // 更新权限后是否通知对方, 注意: 使用`tenant_access_token`访问不支持该参数, 示例值: false, 默认值: `false`
    type: string // 文件类型, 放于query参数中, 如: `?type=doc`, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 电子表格, `file`: 云空间文件, `wiki`: 知识库节点, `bitable`: 多维表格, `docx`: 新版文档
    member_type: string // 用户类型, 与请求体中的`member_id`要对应, 可选值有: `email`: 飞书邮箱, `openid`: [开放平台ID](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get), `openchat`: [开放平台群组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), `opendepartmentid`:[开放平台部门ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview), `userid`: [用户自定义ID](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get), 注意: 使用`tenant_access_token`访问不支持添加`opendepartmentid`, 示例值: "openid"
    perm: string // 需要更新的权限, 可选值有: `view`: 可阅读, `edit`: 可编辑, `full_access`: 所有权限, 示例值: "view"
  }

  export interface UpdateDriveMemberPermissionResp {
    member: UpdateDriveMemberPermissionRespMember // 本次更新权限的用户信息
  }

  export interface UpdateDriveMemberPermissionRespMember {
    member_type: string // 用户类型, 与请求体中的`member_id`要对应, 可选值有: `email`: 飞书邮箱, `openid`: [开放平台ID](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get), `openchat`: [开放平台群组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description), `opendepartmentid`:[开放平台部门ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview), `userid`: [用户自定义ID](https://open.feishu.cn/document/home/user-identity-introduction/how-to-get), 注意: 使用`tenant_access_token`访问不支持添加`opendepartmentid`
    member_id: string // 用户类型下的值
    perm: string // 需要更新的权限, 可选值有: `view`: 可阅读, `edit`: 可编辑, `full_access`: 所有权限
  }

  export interface updateDriveMemberPermissionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateDriveMemberPermissionResp
  }

  export interface CheckDriveMemberPermissionReq {
    token: string // 文件的 token, 获取方式见 [如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)
    type: string // 文档类型, 可选 doc、docx、sheet、bitable、file
    perm: string // 权限, "view" or "edit" or "share"
  }

  export interface CheckDriveMemberPermissionResp {
    is_permitted: boolean // 是否具有指定权限
  }

  export interface checkDriveMemberPermissionResp {
    code: number
    msg: string
    data: CheckDriveMemberPermissionResp
  }

  export interface GetDrivePublicPermissionReq {
    token: string // 文件的 token, 获取方式见 [如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6), 示例值: "doccnBKgoMyY5OMbUG6FioTXuBe"
    type: string // 文件类型, 放于query参数中, 如: `?type=doc`, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 电子表格, `file`: 云空间文件, `wiki`: 知识库节点, `bitable`: 多维表格, `docx`: 新版文档
  }

  export interface GetDrivePublicPermissionResp {
    permission_public: GetDrivePublicPermissionRespPermissionPublic // 返回的文档权限设置
  }

  export interface GetDrivePublicPermissionRespPermissionPublic {
    external_access: boolean // 允许内容被分享到组织外, 可选值有: `true`: 允许, `false`: 不允许
    security_entity: string // 谁可以复制内容、创建副本、打印、下载, 可选值有: `anyone_can_view`: 拥有可阅读权限的用户, `anyone_can_edit`: 拥有可编辑权限的用户, `only_full_access`: 拥有可管理权限（包括我）的用户
    comment_entity: string // 可评论设置, 可选值有: `anyone_can_view`: 拥有可阅读权限的用户, `anyone_can_edit`: 拥有可编辑权限的用户
    share_entity: string // 谁可以添加和管理协作者, 可选值有: `anyone`: 所有可阅读或编辑此文档的用户, `same_tenant`: 组织内所有可阅读或编辑此文档的用户, `only_full_access`: 拥有可管理权限（包括我）的用户
    link_share_entity: string // 链接分享设置, 可选值有: `tenant_readable`: 组织内获得链接的人可阅读, `tenant_editable`: 组织内获得链接的人可编辑, `anyone_readable`: 互联网上获得链接的任何人可阅读, 提示: 仅`external_access=true`时有效, `anyone_editable`: 互联网上获得链接的任何人可编辑, 提示: 仅`external_access=true`时有效, `closed`: 关闭链接分享
    invite_external: boolean // 允许非「可管理权限」的人分享到组织外, 提示: 仅`share_entity="same_tenant"`时有效
    lock_switch: boolean // 节点加锁状态
  }

  export interface getDrivePublicPermissionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDrivePublicPermissionResp
  }

  export interface UpdateDrivePublicPermissionReq {
    token: string // 文件的 token, 获取方式见 [如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6), 示例值: "doccnBKgoMyY5OMbUG6FioTXuBe"
    type: string // 文件类型, 放于query参数中, 如: `?type=doc`, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 电子表格, `file`: 云空间文件, `wiki`: 知识库节点, `bitable`: 多维表格, `docx`: 新版文档
    external_access?: boolean // 允许内容被分享到组织外, 示例值: true
    security_entity?: string // 谁可以复制内容、创建副本、打印、下载, 示例值: "anyone_can_view", 可选值有: `anyone_can_view`: 拥有可阅读权限的用户, `anyone_can_edit`: 拥有可编辑权限的用户, `only_full_access`: 拥有可管理权限（包括我）的用户
    comment_entity?: string // 谁可以评论, 示例值: "anyone_can_view", 可选值有: `anyone_can_view`: 拥有可阅读权限的用户, `anyone_can_edit`: 拥有可编辑权限的用户
    share_entity?: string // 谁可以添加和管理协作者, 示例值: "anyone", 可选值有: `anyone`: 所有可阅读或编辑此文档的用户, `same_tenant`: 组织内所有可阅读或编辑此文档的用户, `only_full_access`: 拥有可管理权限（包括我）的用户
    link_share_entity?: string // 链接分享设置, 示例值: "tenant_readable", 可选值有: `tenant_readable`: 组织内获得链接的人可阅读, `tenant_editable`: 组织内获得链接的人可编辑, `anyone_readable`: 互联网上获得链接的任何人可阅读, 提示: 仅`external_access=true`时有效, `anyone_editable`: 互联网上获得链接的任何人可编辑, 提示: 仅`external_access=true`时有效, `closed`: 关闭链接分享
    invite_external?: boolean // 允许非「可管理权限」的人分享到组织外, 提示: 仅`share_entity="same_tenant"`时有效, 示例值: true
  }

  export interface UpdateDrivePublicPermissionResp {
    permission_public: UpdateDrivePublicPermissionRespPermissionPublic // 本次更新后的文档权限设置
  }

  export interface UpdateDrivePublicPermissionRespPermissionPublic {
    external_access: boolean // 允许内容被分享到组织外, 可选值有: `true`: 允许, `false`: 不允许
    security_entity: string // 谁可以复制内容、创建副本、打印、下载, 可选值有: `anyone_can_view`: 拥有可阅读权限的用户, `anyone_can_edit`: 拥有可编辑权限的用户, `only_full_access`: 拥有可管理权限（包括我）的用户
    comment_entity: string // 可评论设置, 可选值有: `anyone_can_view`: 拥有可阅读权限的用户, `anyone_can_edit`: 拥有可编辑权限的用户
    share_entity: string // 谁可以添加和管理协作者, 可选值有: `anyone`: 所有可阅读或编辑此文档的用户, `same_tenant`: 组织内所有可阅读或编辑此文档的用户, `only_full_access`: 拥有可管理权限（包括我）的用户
    link_share_entity: string // 链接分享设置, 可选值有: `tenant_readable`: 组织内获得链接的人可阅读, `tenant_editable`: 组织内获得链接的人可编辑, `anyone_readable`: 互联网上获得链接的任何人可阅读, 提示: 仅`external_access=true`时有效, `anyone_editable`: 互联网上获得链接的任何人可编辑, 提示: 仅`external_access=true`时有效, `closed`: 关闭链接分享
    invite_external: boolean // 允许非「可管理权限」的人分享到组织外, 提示: 仅`share_entity="same_tenant"`时有效
  }

  export interface updateDrivePublicPermissionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateDrivePublicPermissionResp
  }

  export interface BatchGetDriveMediaTmpDownloadURLReq {
    file_tokens?: string[] // 文件标识符列表, 示例值: boxcnrHpsg1QDqXAAAyachabcef
    extra?: string // 拓展信息(可选), 示例值: "[请参考-上传点类型及对应Extra说明](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/introduction)"
  }

  export interface BatchGetDriveMediaTmpDownloadURLResp {
    tmp_download_urls?: BatchGetDriveMediaTmpDownloadURLRespTmpDownloadURL[] // 临时下载列表
  }

  export interface BatchGetDriveMediaTmpDownloadURLRespTmpDownloadURL {
    file_token: string // 文件标识符
    tmp_download_url: string // 文件临时下载链接
  }

  export interface batchGetDriveMediaTmpDownloadURLResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: BatchGetDriveMediaTmpDownloadURLResp
  }

  export interface GetDriveCommentListReq {
    file_token: string // 文档token, 示例值: "doccnHh7U87HOFpii5u5G*"
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 表格, `file`: 文件, `docx`: 新版文档
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    is_solved?: boolean // 是否已解决（可选）, 示例值: false
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "6916106822734578184"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `100`
  }

  export interface GetDriveCommentListResp {
    has_more: boolean // 是否还有更多项
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    items?: GetDriveCommentListRespItem[] // 评论列表
  }

  export interface GetDriveCommentListRespItem {
    comment_id: string // 评论ID（创建新评论可不填；如填写, 则视为回复已有评论）
    user_id: string // 用户ID
    create_time: number // 创建时间
    update_time: number // 更新时间
    is_solved: boolean // 是否已解决
    solved_time: number // 解决评论时间
    solver_user_id: string // 解决评论者的用户ID
    reply_list: GetDriveCommentListRespItemReplyList // 评论里的回复列表
  }

  export interface GetDriveCommentListRespItemReplyList {
    replies?: GetDriveCommentListRespItemReplyListReply[] // 回复列表
  }

  export interface GetDriveCommentListRespItemReplyListReply {
    reply_id: string // 回复ID
    user_id: string // 用户ID
    create_time: number // 创建时间
    update_time: number // 更新时间
    content: GetDriveCommentListRespItemReplyListReplyContent // 回复内容
  }

  export interface GetDriveCommentListRespItemReplyListReplyContent {
    elements?: GetDriveCommentListRespItemReplyListReplyContentElement[] // 回复的内容
  }

  export interface GetDriveCommentListRespItemReplyListReplyContentElement {
    type: string // 回复的内容元素, 可选值有: `text_run`: 普通文本, `docs_link`: at 云文档链接, `person`: at 联系人
    text_run: GetDriveCommentListRespItemReplyListReplyContentElementTextRun // 文本内容
    docs_link: GetDriveCommentListRespItemReplyListReplyContentElementDocsLink // 文本内容
    person: GetDriveCommentListRespItemReplyListReplyContentElementPerson // 文本内容
  }

  export interface GetDriveCommentListRespItemReplyListReplyContentElementDocsLink {
    url: string // 回复 at云文档
  }

  export interface GetDriveCommentListRespItemReplyListReplyContentElementPerson {
    user_id: string // 回复 at联系人
  }

  export interface GetDriveCommentListRespItemReplyListReplyContentElementTextRun {
    text: string // 回复 普通文本
  }

  export interface getDriveCommentListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDriveCommentListResp
  }

  export interface GetDriveCommentReq {
    file_token: string // 文档token, 示例值: "doccnHh7U87HOFpii5u5G*"
    comment_id: string // 评论ID, 示例值: "6916106822734578184"
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 表格, `file`: 文件, `docx`: 新版文档
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
  }

  export interface GetDriveCommentResp {
    comment_id: string // 评论ID（创建新评论可不填；如填写, 则视为回复已有评论）
    user_id: string // 用户ID
    create_time: number // 创建时间
    update_time: number // 更新时间
    is_solved: boolean // 是否已解决
    solved_time: number // 解决评论时间
    solver_user_id: string // 解决评论者的用户ID
    reply_list: GetDriveCommentRespReplyList // 评论里的回复列表
  }

  export interface GetDriveCommentRespReplyList {
    replies?: GetDriveCommentRespReplyListReply[] // 回复列表
  }

  export interface GetDriveCommentRespReplyListReply {
    reply_id: string // 回复ID
    user_id: string // 用户ID
    create_time: number // 创建时间
    update_time: number // 更新时间
    content: GetDriveCommentRespReplyListReplyContent // 回复内容
  }

  export interface GetDriveCommentRespReplyListReplyContent {
    elements?: GetDriveCommentRespReplyListReplyContentElement[] // 回复的内容
  }

  export interface GetDriveCommentRespReplyListReplyContentElement {
    type: string // 回复的内容元素, 可选值有: `text_run`: 普通文本, `docs_link`: at 云文档链接, `person`: at 联系人
    text_run: GetDriveCommentRespReplyListReplyContentElementTextRun // 文本内容
    docs_link: GetDriveCommentRespReplyListReplyContentElementDocsLink // 文本内容
    person: GetDriveCommentRespReplyListReplyContentElementPerson // 文本内容
  }

  export interface GetDriveCommentRespReplyListReplyContentElementDocsLink {
    url: string // 回复 at云文档
  }

  export interface GetDriveCommentRespReplyListReplyContentElementPerson {
    user_id: string // 回复 at联系人
  }

  export interface GetDriveCommentRespReplyListReplyContentElementTextRun {
    text: string // 回复 普通文本
  }

  export interface getDriveCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDriveCommentResp
  }

  export interface CreateDriveCommentReq {
    file_token: string // 文档token, 示例值: "doccnGp4UK1UskrOEJwBXd3"
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 表格, `file`: 文件, `docx`: 新版文档
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    comment_id?: string // 评论ID（创建新评论可不填；如填写, 则视为回复已有评论）, 示例值: "6916106822734578184"
    user_id?: string // 用户ID, 示例值: "ou_cc19b2bfb93f8a44db4b4d6eab*"
    create_time?: number // 创建时间, 示例值: 1610281603
    update_time?: number // 更新时间, 示例值: 1610281603
    is_solved?: boolean // 是否已解决, 示例值: false
    solved_time?: number // 解决评论时间, 示例值: 1610281603
    solver_user_id?: string // 解决评论者的用户ID, 示例值: "null"
    reply_list?: CreateDriveCommentReqReplyList // 评论里的回复列表
  }

  export interface CreateDriveCommentReqReplyList {
    replies?: CreateDriveCommentReqReplyListReply[] // 回复列表
  }

  export interface CreateDriveCommentReqReplyListReply {
    reply_id?: string // 回复ID, 示例值: "6916106822734594568"
    user_id?: string // 用户ID, 示例值: "ou_cc19b2bfb93f8a44db4b4d6eab2*"
    create_time?: number // 创建时间, 示例值: 1610281603
    update_time?: number // 更新时间, 示例值: 1610281603
    content: CreateDriveCommentReqReplyListReplyContent // 回复内容
  }

  export interface CreateDriveCommentReqReplyListReplyContent {
    elements?: CreateDriveCommentReqReplyListReplyContentElement[] // 回复的内容
  }

  export interface CreateDriveCommentReqReplyListReplyContentElement {
    type: string // 回复的内容元素, 示例值: "text_run", 可选值有: `text_run`: 普通文本, `docs_link`: at 云文档链接, `person`: at 联系人
    text_run?: CreateDriveCommentReqReplyListReplyContentElementTextRun // 文本内容
    docs_link?: CreateDriveCommentReqReplyListReplyContentElementDocsLink // 文本内容
    person?: CreateDriveCommentReqReplyListReplyContentElementPerson // 文本内容
  }

  export interface CreateDriveCommentReqReplyListReplyContentElementDocsLink {
    url: string // 回复 at云文档, 示例值: "https://bytedance.feishu.cn/docs/doccnHh7U87HOFpii5u5G*"
  }

  export interface CreateDriveCommentReqReplyListReplyContentElementPerson {
    user_id: string // 回复 at联系人, 示例值: "ou_cc19b2bfb93f8a44db4b4d6eab*"
  }

  export interface CreateDriveCommentReqReplyListReplyContentElementTextRun {
    text: string // 回复 普通文本, 示例值: "comment text"
  }

  export interface CreateDriveCommentResp {
    comment_id: string // 评论ID（创建新评论可不填；如填写, 则视为回复已有评论）
    user_id: string // 用户ID
    create_time: number // 创建时间
    update_time: number // 更新时间
    is_solved: boolean // 是否已解决
    solved_time: number // 解决评论时间
    solver_user_id: string // 解决评论者的用户ID
    reply_list: CreateDriveCommentRespReplyList // 评论里的回复列表
  }

  export interface CreateDriveCommentRespReplyList {
    replies?: CreateDriveCommentRespReplyListReply[] // 回复列表
  }

  export interface CreateDriveCommentRespReplyListReply {
    reply_id: string // 回复ID
    user_id: string // 用户ID
    create_time: number // 创建时间
    update_time: number // 更新时间
    content: CreateDriveCommentRespReplyListReplyContent // 回复内容
  }

  export interface CreateDriveCommentRespReplyListReplyContent {
    elements?: CreateDriveCommentRespReplyListReplyContentElement[] // 回复的内容
  }

  export interface CreateDriveCommentRespReplyListReplyContentElement {
    type: string // 回复的内容元素, 可选值有: `text_run`: 普通文本, `docs_link`: at 云文档链接, `person`: at 联系人
    text_run: CreateDriveCommentRespReplyListReplyContentElementTextRun // 文本内容
    docs_link: CreateDriveCommentRespReplyListReplyContentElementDocsLink // 文本内容
    person: CreateDriveCommentRespReplyListReplyContentElementPerson // 文本内容
  }

  export interface CreateDriveCommentRespReplyListReplyContentElementDocsLink {
    url: string // 回复 at云文档
  }

  export interface CreateDriveCommentRespReplyListReplyContentElementPerson {
    user_id: string // 回复 at联系人
  }

  export interface CreateDriveCommentRespReplyListReplyContentElementTextRun {
    text: string // 回复 普通文本
  }

  export interface createDriveCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateDriveCommentResp
  }

  export interface UpdateDriveCommentReq {
    file_token: string // 文档token, 示例值: "doccnHh7U87HOFpii5u5G*"
    comment_id: string // 评论ID, 示例值: "6916106822734578184"
    reply_id: string // 回复ID, 示例值: "6916106822734594568"
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 表格, `file`: 文件, `docx`: 新版文档
    user_id_type?: string // 用户 ID 类型, 示例值: "open_id", 可选值有: `open_id`: 用户的 open id, `union_id`: 用户的 union id, `user_id`: 用户的 user id, 默认值: `open_id`, 当值为 `user_id`, 字段权限要求: 获取用户 user ID
    content: UpdateDriveCommentReqContent // 回复内容
  }

  export interface UpdateDriveCommentReqContent {
    elements?: UpdateDriveCommentReqContentElement[] // 回复的内容
  }

  export interface UpdateDriveCommentReqContentElement {
    type: string // 回复的内容元素, 示例值: "text_run", 可选值有: `text_run`: 普通文本, `docs_link`: at 云文档链接, `person`: at 联系人
    text_run?: UpdateDriveCommentReqContentElementTextRun // 文本内容
    docs_link?: UpdateDriveCommentReqContentElementDocsLink // 文本内容
    person?: UpdateDriveCommentReqContentElementPerson // 文本内容
  }

  export interface UpdateDriveCommentReqContentElementDocsLink {
    url: string // 回复 at云文档, 示例值: "https://bytedance.feishu.cn/docs/doccnHh7U87HOFpii5u5G*"
  }

  export interface UpdateDriveCommentReqContentElementPerson {
    user_id: string // 回复 at联系人, 示例值: "ou_cc19b2bfb93f8a44db4b4d6eab*"
  }

  export interface UpdateDriveCommentReqContentElementTextRun {
    text: string // 回复 普通文本, 示例值: "comment text"
  }

  export interface UpdateDriveCommentResp {}

  export interface updateDriveCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateDriveCommentResp
  }

  export interface DeleteDriveCommentReq {
    file_token: string // 文档token, 示例值: "doccnHh7U87HOFpii5u5G*"
    comment_id: string // 评论ID, 示例值: "6916106822734578184"
    reply_id: string // 回复ID, 示例值: "6916106822734594568"
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 表格, `file`: 文件, `docx`: 新版文档
  }

  export interface DeleteDriveCommentResp {}

  export interface deleteDriveCommentResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteDriveCommentResp
  }

  export interface UpdateDriveCommentPatchReq {
    file_token: string // 文档token, 示例值: "doccnGp4UK1UskrOEJwBXd3"
    comment_id: string // 评论ID, 示例值: "6916106822734578184"
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `sheet`: 表格, `file`: 文件, `docx`: 新版文档
    is_solved: boolean // 评论解决标志, 示例值: true
  }

  export interface UpdateDriveCommentPatchResp {}

  export interface updateDriveCommentPatchResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateDriveCommentPatchResp
  }

  export interface CreateDriveFileSubscriptionReq {
    file_token: string // 文档token, 示例值: "doxcnxxxxxxxxxxxxxxxxxxxxxx"
    subscription_id?: string // 订阅关系ID, 示例值: "1234567890987654321"
    subscription_type: string // 订阅类型, 示例值: "comment_update", 可选值有: `comment_update`: 评论更新
    is_subcribe?: boolean // 是否订阅, 示例值: true
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `docx`: 新版文档, `wiki`: 知识库wiki
  }

  export interface CreateDriveFileSubscriptionResp {
    subscription: CreateDriveFileSubscriptionRespSubscription // 本次增加的文档订阅信息
  }

  export interface CreateDriveFileSubscriptionRespSubscription {
    subscription_id: string // 订阅关系ID
    subscription_type: string // 订阅类型, 可选值有: `comment_update`: 评论更新
    is_subcribe: boolean // 是否订阅
    file_type: string // 文档类型, 可选值有: `doc`: 文档, `docx`: 新版文档, `wiki`: 知识库wiki
  }

  export interface createDriveFileSubscriptionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateDriveFileSubscriptionResp
  }

  export interface GetDriveFileSubscriptionReq {
    file_token: string // 文档token, 示例值: "doxcnxxxxxxxxxxxxxxxxxxxxxx"
    subscription_id: string // 订阅关系ID, 示例值: "1234567890987654321"
    subscription_type?: string // 订阅类型, 示例值: "comment_update", 可选值有: `comment_update`: 评论更新
    is_subcribe?: boolean // 是否订阅, 示例值: true
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `docx`: 新版文档, `wiki`: 知识库wiki
  }

  export interface GetDriveFileSubscriptionResp {
    subscription: GetDriveFileSubscriptionRespSubscription // 文档订阅信息
  }

  export interface GetDriveFileSubscriptionRespSubscription {
    subscription_id: string // 订阅关系ID
    subscription_type: string // 订阅类型, 可选值有: `comment_update`: 评论更新
    is_subcribe: boolean // 是否订阅
    file_type: string // 文档类型, 可选值有: `doc`: 文档, `docx`: 新版文档, `wiki`: 知识库wiki
  }

  export interface getDriveFileSubscriptionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDriveFileSubscriptionResp
  }

  export interface UpdateDriveFileSubscriptionReq {
    file_token: string // 文档token, 示例值: "doxcnxxxxxxxxxxxxxxxxxxxxxx"
    subscription_id: string // 订阅关系ID, 示例值: "1234567890987654321"
    is_subscribe: boolean // 是否订阅, 示例值: true
    file_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: 文档, `docx`: 新版文档, `wiki`: 知识库wiki
  }

  export interface UpdateDriveFileSubscriptionResp {
    subscription: UpdateDriveFileSubscriptionRespSubscription // 本次修改的文档订阅信息
  }

  export interface UpdateDriveFileSubscriptionRespSubscription {
    subscription_id: string // 订阅关系ID
    subscription_type: string // 订阅类型, 可选值有: `comment_update`: 评论更新
    is_subcribe: boolean // 是否订阅
    file_type: string // 文档类型, 可选值有: `doc`: 文档, `docx`: 新版文档, `wiki`: 知识库wiki
  }

  export interface updateDriveFileSubscriptionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateDriveFileSubscriptionResp
  }

  export interface CreateDriveDocReq {
    FolderToken?: string // 文件夹 token, 获取方式见[如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)；空表示根目录, tenant_access_token应用权限仅允许操作应用创建的目录
    Content?: string // 传入符合[文档数据结构](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)的字符串, 若为空表示创建空文档
  }

  export interface CreateDriveDocResp {
    objToken: string // 新建文档的token
    url: string // 新建文档的访问链接
  }

  export interface createDriveDocResp {
    code: number
    msg: string
    data: CreateDriveDocResp
  }

  export interface GetDriveDocContentReq {
    docToken: string // 获取方式详见[如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)
  }

  export interface GetDriveDocContentResp {
    content: string // 详情参考[文档数据结构](https://open.feishu.cn/document/ukTMukTMukTM/ukDM2YjL5AjN24SOwYjN)
    revision: number // 文档当前版本号
  }

  export interface getDriveDocContentResp {
    code: number
    msg: string
    data: GetDriveDocContentResp
  }

  export interface UpdateDriveDocContentReq {
    docToken: string // 文件的 token, 获取方式见[如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)
    Revision: number // 文档的指定版本, 文档新创建后版本号是0, [获取方式](https://open.feishu.cn/document/ukTMukTMukTM/uUDM2YjL1AjN24SNwYjN), 要求>=0, post body json 字段
    Requests?: string[] // post body json, OperationRequest 类型序列化 string 数组
  }

  export interface UpdateDriveDocContentResp {}

  export interface updateDriveDocContentResp {
    code: number
    msg: string
    data: UpdateDriveDocContentResp
  }

  export interface GetDriveDocRawContentReq {
    docToken: string // 获取方式详见 [如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)
  }

  export interface GetDriveDocRawContentResp {
    content: string // 如: string
  }

  export interface getDriveDocRawContentResp {
    code: number
    msg: string
    data: GetDriveDocRawContentResp
  }

  export interface GetDriveDocMetaReq {
    docToken: string // doc 的 token, 获取方式见[如何获取云文档资源相关 token](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#08bb5df6)
  }

  export interface GetDriveDocMetaResp {
    create_date: string // 创建日期
    create_time: number // 创建时间戳
    creator: string // 创建者open_id
    create_user_name: string // 创建者用户名
    delete_flag: number // 删除标志, 0表示正常访问未删除, 1表示在回收站, 2表示已经彻底删除
    edit_time: number // 最后编辑时间戳
    edit_user_name: string // 最后编辑者用户名
    is_external: boolean // 是否外部文档
    is_pined: boolean // 是否在接口调用者目录里快速访问
    is_stared: boolean // 是否在接口调用者目录里收藏
    obj_type: string // 文档类型, 固定是doc
    owner: string // 当前所有者open_id
    owner_user_name: string // 当前所有者用户名
    server_time: number // 处理请求时的服务器时间戳
    tenant_id: string // 文档所在租户id
    title: string // 文档名称
    type: number // 文档类型, 固定是2
    url: string // 文档url
  }

  export interface getDriveDocMetaResp {
    code: number
    msg: string
    data: GetDriveDocMetaResp
  }

  export interface CreateSheetReq {
    title?: string // 表格标题, 示例值: "title"
    folder_token?: string // 文件夹token, 获取方式见[概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/files/guide/introduction), 示例值: "fldcnMsNb*hIW9IjG1LVswg"
  }

  export interface CreateSheetResp {
    spreadsheet: CreateSheetRespSpreadsheet // 表格
  }

  export interface CreateSheetRespSpreadsheet {
    title: string // 表格标题
    folder_token: string // 文件夹token, 获取方式见[概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/files/guide/introduction)
    url: string // 文档url
    spreadsheet_token: string // 表格token
  }

  export interface createSheetResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateSheetResp
  }

  export interface GetSheetMetaReq {
    spreadsheetToken: string // spreadsheet 的 token；获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    extFields?: string // 额外返回的字段, extFields=protectedRange时返回保护行列信息
    user_id_type?: string // 返回的用户id类型, 可选open_id, union_id
  }

  export interface GetSheetMetaResp {
    spreadsheetToken: string // spreadsheet 的 token
    properties: GetSheetMetaRespProperties // spreadsheet 的属性
    sheets?: GetSheetMetaRespSheet[] // spreadsheet 下的sheet列表
  }

  export interface GetSheetMetaRespProperties {
    title: string // spreadsheet 的标题
    ownerUser: number // 所有者的 id, 仅user_id_type为空时返回该值
    ownerUserID: string // 所有者的 id, 取决于user_id_type的值, 仅user_id_type不为空时返回该值
    sheetCount: number // spreadsheet 下的 sheet 数
    revision: number // 该 sheet 的版本
  }

  export interface GetSheetMetaRespSheet {
    sheetId: string // sheet 的 id
    title: string // sheet 的标题
    index: number // sheet 的位置
    rowCount: number // sheet 的最大行数
    columnCount: number // sheet 的最大列数
    frozenRowCount: number // 该 sheet 的冻结行数, 小于等于 sheet 的最大行数, 0表示未设置冻结
    frozenColCount: number // 该 sheet 的冻结列数, 小于等于 sheet 的最大列数, 0表示未设置冻结
    merges?: GetSheetMetaRespSheetMerge[] // 该 sheet 中合并单元格的范围
    protectedRange: GetSheetMetaRespSheetProtectedRange // 该 sheet 中保护范围
    blockInfo: GetSheetMetaRespSheetBlockInfo // 若含有该字段, 则此工作表不为表格
  }

  export interface GetSheetMetaRespSheetBlockInfo {
    blockToken: string // block的token
    blockType: string // block的类型
  }

  export interface GetSheetMetaRespSheetMerge {
    startRowIndex: number // 合并单元格范围的开始行下标, index 从 0 开始
    startColumnIndex: number // 合并单元格范围的开始列下标, index 从 0 开始
    rowCount: number // 合并单元格范围的行数量
    columnCount: number // 合并单元格范围的列数量
  }

  export interface GetSheetMetaRespSheetProtectedRange {
    dimension: GetSheetMetaRespSheetProtectedRangeDimension // 保护行列的信息, 如果为保护工作表, 则该字段为空
    protectId: string // 保护范围ID
    lockInfo: string // 保护说明
    sheetId: string // 保护工作表 ID
  }

  export interface GetSheetMetaRespSheetProtectedRangeDimension {
    startIndex: number // 保护行列的起始位置, 位置从1开始
    endIndex: number // 保护行列的结束位置, 位置从1开始
    majorDimension: string // 若为ROWS, 则为保护行；为COLUMNS, 则为保护列
    sheetId: string // 保护范围所在工作表 ID
  }

  export interface getSheetMetaResp {
    code: number
    msg: string
    data: GetSheetMetaResp
  }

  export interface UpdateSheetPropertyReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    properties: UpdateSheetPropertyReqProperties // spreadsheet 的属性
  }

  export interface UpdateSheetPropertyReqProperties {
    title: string // spreadsheet 的标题, 最大长度100个字符
  }

  export interface UpdateSheetPropertyResp {
    spreadsheetToken: string // spreadsheet 的 token
    title: string // spreadsheet 的标题
  }

  export interface updateSheetPropertyResp {
    code: number
    msg: string
    data: UpdateSheetPropertyResp
  }

  export interface BatchUpdateSheetReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    requests?: BatchUpdateSheetReqRequest[] // 请求操作, 支持增、删、复制工作表, 三个操作选一个
  }

  export interface BatchUpdateSheetReqRequest {
    updateSheet: BatchUpdateSheetReqRequestUpdateSheet // 更新工作表
    addSheet?: BatchUpdateSheetReqRequestAddSheet // 增加工作表
    copySheet?: BatchUpdateSheetReqRequestCopySheet // 复制工作表
    deleteSheet?: BatchUpdateSheetReqRequestDeleteSheet // 删除 sheet
  }

  export interface BatchUpdateSheetReqRequestAddSheet {
    properties: BatchUpdateSheetReqRequestAddSheetProperties // 工作表属性
  }

  export interface BatchUpdateSheetReqRequestAddSheetProperties {
    title: string // 工作表标题
    index?: number // 新增工作表的位置, 不填默认往前增加工作表
  }

  export interface BatchUpdateSheetReqRequestCopySheet {
    source: BatchUpdateSheetReqRequestCopySheetSource // 需要复制的工作表资源
    destination: BatchUpdateSheetReqRequestCopySheetDestination // 工作表 的属性
  }

  export interface BatchUpdateSheetReqRequestCopySheetDestination {
    title?: string // 目标工作表名称。不填为 old_title(副本_0)
  }

  export interface BatchUpdateSheetReqRequestCopySheetSource {
    sheetId: string // 源 sheetId
  }

  export interface BatchUpdateSheetReqRequestDeleteSheet {
    sheetId: string // sheetId
  }

  export interface BatchUpdateSheetReqRequestUpdateSheet {
    properties: BatchUpdateSheetReqRequestUpdateSheetProperties // 工作表属性
  }

  export interface BatchUpdateSheetReqRequestUpdateSheetProperties {
    sheetId: string // read-only ,作为表格唯一识别参数
    title?: string // 更改工作表标题
    index?: number // 移动工作表的位置
    hidden?: boolean // 隐藏表格，默认 false
    frozenRowCount?: number // 冻结行数，小于等于工作表的最大行数，0表示取消冻结行
    frozenColCount?: number // 该 sheet 的冻结列数，小于等于工作表的最大列数，0表示取消冻结列
    protect: BatchUpdateSheetReqRequestUpdateSheetPropertiesProtect // 锁定表格
  }

  export interface BatchUpdateSheetReqRequestUpdateSheetPropertiesProtect {
    lock: string // LOCK 、UNLOCK 上锁/解锁
    lockInfo?: string // 锁定信息
    userIDs?: string[] // 除了本人与所有者外，添加其他的可编辑人员,user_id_type不为空时使用该字段
  }

  export interface BatchUpdateSheetResp {
    replies?: BatchUpdateSheetRespReply[] // 返回本次相关操作工作表的结果
  }

  export interface BatchUpdateSheetRespReply {
    updateSheet: BatchUpdateSheetRespReplyUpdateSheet // 更新工作表
    addSheet: BatchUpdateSheetRespReplyAddSheet // 增加/复制工作表的属性
    copySheet: BatchUpdateSheetRespReplyCopySheet // 增加/复制工作表的属性
    deleteSheet: BatchUpdateSheetRespReplyDeleteSheet // 删除工作表
  }

  export interface BatchUpdateSheetRespReplyAddSheet {
    properties: BatchUpdateSheetRespReplyAddSheetProperties // 表格属性
  }

  export interface BatchUpdateSheetRespReplyAddSheetProperties {
    sheetId: string // sheetId
    title: string // 工作表标题
    index: number // 工作表位置
  }

  export interface BatchUpdateSheetRespReplyCopySheet {
    properties: BatchUpdateSheetRespReplyCopySheetProperties // 表格属性
  }

  export interface BatchUpdateSheetRespReplyCopySheetProperties {
    sheetId: string // sheetId
    title: string // 工作表标题
    index: number // 工作表位置
  }

  export interface BatchUpdateSheetRespReplyDeleteSheet {
    result: boolean // 删除工作表是否成功
    sheetId: string // sheetId
  }

  export interface BatchUpdateSheetRespReplyUpdateSheet {
    properties: BatchUpdateSheetRespReplyUpdateSheetProperties // 工作表属性
  }

  export interface BatchUpdateSheetRespReplyUpdateSheetProperties {
    sheetId: string // read-only ,作为表格唯一识别参数
    title: string // 更改工作表标题
    index: number // 移动工作表的位置
    hidden: boolean // 隐藏表格，默认 false
    frozenRowCount: number // 冻结行数，小于等于工作表的最大行数，0表示取消冻结行
    frozenColCount: number // 该 sheet 的冻结列数，小于等于工作表的最大列数，0表示取消冻结列
    protect: BatchUpdateSheetRespReplyUpdateSheetPropertiesProtect // 锁定表格
  }

  export interface BatchUpdateSheetRespReplyUpdateSheetPropertiesProtect {
    lock: string // LOCK 、UNLOCK 上锁/解锁
    lockInfo: string // 锁定信息
    userIDs?: string[] // 除了本人与所有者外，添加其他的可编辑人员,user_id_type不为空时使用该字段
  }

  export interface batchUpdateSheetResp {
    code: number
    msg: string
    data: BatchUpdateSheetResp
  }

  export interface ImportSheetReq {
    file: Blob // 需要导入的文件数据, 转换成字节数组的形式, 支持"xlsx", "csv"格式, 最大不超过20M
    name: string // 文件名, 带上文件拓展名, 如"hello.csv"、"hello.xlsx"。导入后sheet的标题将去除文件拓展名, 如"hello.xlsx"导入后标题为"hello"。
    folderToken?: string // 导入的文件夹token, 默认导入到根目录下
  }

  export interface ImportSheetResp {
    ticket: string // 与导入文件一一对应的凭证, 用于查询文件导入的进度, 详见[查询导入结果的接口](https://open.feishu.cn/document/ukTMukTMukTM/uETO2YjLxkjN24SM5YjN)
  }

  export interface importSheetResp {
    code: number
    msg: string
    data: ImportSheetResp
  }

  export interface CreateDriveImportTaskReq {
    file_extension: string // 导入文件格式后缀, 示例值: "xlsx"
    file_token: string // 导入文件Drive FileToken, 示例值: "boxcnxe5OxxxxxxxSNdsJviENsk"
    type: string // 导入目标云文档格式, 示例值: "sheet"
    file_name?: string // 导入目标云文档文件名, 若为空使用Drive文件名, 示例值: "test"
    point: CreateDriveImportTaskReqPoint // 挂载点
  }

  export interface CreateDriveImportTaskReqPoint {
    mount_type: number // 挂载类型, 示例值: 1, 可选值有: `1`: 挂载到云空间
    mount_key: string // 挂载位置, 对于mount_type=1, 云空间目录token, 空表示根目录, 示例值: "fldxxxxxxxx"
  }

  export interface CreateDriveImportTaskResp {
    ticket: string // 导入任务ID
  }

  export interface createDriveImportTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateDriveImportTaskResp
  }

  export interface GetDriveImportTaskReq {
    ticket: string // 导入任务ID, 示例值: "6990281865xxxxxxxx7843"
  }

  export interface GetDriveImportTaskResp {
    result: GetDriveImportTaskRespResult // 导入结果
  }

  export interface GetDriveImportTaskRespResult {
    ticket: string // 任务ID
    type: string // 导入目标云文档格式
    job_status: number // 任务状态, 可选值有: `0`: 成功, `1`: 初始化, `2`: 处理中, `3`: 内部错误, `100`: 导入文档已加密, `101`: 内部错误, `102`: 内部错误, `103`: 内部错误, `104`: 租户容量不足, `105`: 文件夹节点太多, `106`: 内部错误, `107`: 导出文档过大, `108`: 处理超时, `109`: 内部错误, `110`: 无权限, `112`: 格式不支持, `113`: office格式不支持, `114`: 内部错误, `115`: 导入文件过大, `116`: 目录无权限, `117`: 目录已删除, `118`: 导入文件和任务指定后缀不匹配, `119`: 目录不存在, `120`: 导入文件和任务指定文件类型不匹配, `121`: 导入文件已过期, `122`: 创建副本中禁止导出, `5000`: 内部错误, `7000`: docx block 数量超过系统上限, `7001`: docx block 层级超过系统上线, `7002`: docx block 大小超过系统上限
    job_error_msg: string // 任务失败原因
    token: string // 导入云文档Token
    url: string // 导入云文档URL
    extra?: string[] // 任务成功后的提示信息
  }

  export interface getDriveImportTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetDriveImportTaskResp
  }

  export interface MoveSheetDimensionReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA\*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b\**12"
    source?: MoveSheetDimensionReqSource // 移动源位置参数
    destination_index?: number // 移动的目标位置行或者列号, 示例值: 4
  }

  export interface MoveSheetDimensionReqSource {
    major_dimension?: string // 操作行还是列, 取值: ROWS、COLUMNS, 示例值: "ROWS"
    start_index?: number // 起始行或者列号, 示例值: 0
    end_index?: number // 结束行或者列号, 示例值: 1
  }

  export interface MoveSheetDimensionResp {}

  export interface moveSheetDimensionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: MoveSheetDimensionResp
  }

  export interface PrependSheetValueReq {
    spreadsheetToken: string // sheet的token, 获取方式见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    valueRange: PrependSheetValueReqValueRange // 值与范围
  }

  export interface PrependSheetValueReqValueRange {
    range: string // ⁣插入范围, 包含 sheetId 与单元格范围两部分, 目前支持三种索引方式, 详见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview), range所表示的范围需要大于等于values占用的范围。
    values: any[][] // 需要写入的值, 如要写入公式、超链接、email、@人等, 可详看附录[sheet 支持写入数据类型](https://open.feishu.cn/document/ukTMukTMukTM/ugjN1UjL4YTN14CO2UTN)
  }

  export interface PrependSheetValueResp {
    spreadsheetToken: string // spreadsheet 的 token
    tableRange: string // 写入的范围
    revision: number // sheet 的版本号
    updates: PrependSheetValueRespUpdates // 插入数据的范围、行列数等
  }

  export interface PrependSheetValueRespUpdates {
    spreadsheetToken: string // spreadsheet 的 token
    updatedRange: string // 写入的范围
    updatedRows: number // 写入的行数
    updatedColumns: number // 写入的列数
    updatedCells: number // 写入的单元格总数
    revision: number // sheet 的版本号
  }

  export interface prependSheetValueResp {
    code: number
    msg: string
    data: PrependSheetValueResp
  }

  export interface AppendSheetValueReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    insertDataOption?: string // 遇到空行追加, 默认 OVERWRITE, 若空行的数量小于追加数据的行数, 则会覆盖已有数据；可选 INSERT_ROWS, 会在插入足够数量的行后再进行数据追加
    valueRange: AppendSheetValueReqValueRange // 值与范围
  }

  export interface AppendSheetValueReqValueRange {
    range: string // ⁣查询范围, 包含 sheetId 与单元格范围两部分, 目前支持三种索引方式, 详见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)。range所表示的范围需要大于等于values占用的范围。
    values: any[][] // 需要写入的值, 如要写入公式、超链接、email、@人等, 可详看附录[sheet 支持写入数据类型](https://open.feishu.cn/document/ukTMukTMukTM/ugjN1UjL4YTN14CO2UTN)
  }

  export interface AppendSheetValueResp {
    spreadsheetToken: string // spreadsheet 的 token
    tableRange: string // 写入的范围
    revision: number // sheet 的版本号
    updates: AppendSheetValueRespUpdates // 插入数据的范围、行列数等
  }

  export interface AppendSheetValueRespUpdates {
    spreadsheetToken: string // spreadsheet 的 token
    updatedRange: string // 写入的范围
    updatedRows: number // 写入的行数
    updatedColumns: number // 写入的列数
    updatedCells: number // 写入的单元格总数
    revision: number // sheet 的版本号
  }

  export interface appendSheetValueResp {
    code: number
    msg: string
    data: AppendSheetValueResp
  }

  export interface InsertSheetDimensionRangeReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    dimension: InsertSheetDimensionRangeReqDimension // 需要插入行列的维度信息
    inheritStyle?: string // BEFORE 或 AFTER, 不填为不继承 style
  }

  export interface InsertSheetDimensionRangeReqDimension {
    sheetId: string // sheet 的 Id
    majorDimension?: string // 默认 ROWS, 可选 ROWS、COLUMNS
    startIndex: number // 开始的位置
    endIndex: number // 结束的位置
  }

  export interface InsertSheetDimensionRangeResp {}

  export interface insertSheetDimensionRangeResp {
    code: number
    msg: string
    data: InsertSheetDimensionRangeResp
  }

  export interface AddSheetDimensionRangeReq {
    spreadsheetToken: string // spreadsheet 的 token, 详见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    dimension: AddSheetDimensionRangeReqDimension // 需要增加行列的维度信息
  }

  export interface AddSheetDimensionRangeReqDimension {
    sheetId: string // sheetId
    majorDimension?: string // 默认 ROWS, 可选 ROWS、COLUMNS
    length: number // 要增加的行/列数, 0<length<5000
  }

  export interface AddSheetDimensionRangeResp {
    addCount: number // 增加的行/列数
    majorDimension: string // 插入维度
  }

  export interface addSheetDimensionRangeResp {
    code: number
    msg: string
    data: AddSheetDimensionRangeResp
  }

  export interface UpdateSheetDimensionRangeReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    dimension: UpdateSheetDimensionRangeReqDimension // 需要更新行列的维度信息
    dimensionProperties: UpdateSheetDimensionRangeReqDimensionProperties // 需要更新行列的属性
  }

  export interface UpdateSheetDimensionRangeReqDimension {
    sheetId: string // sheetId
    majorDimension?: string // 默认 ROWS, 可选 ROWS、COLUMNS
    startIndex: number // 开始的位置
    endIndex: number // 结束的位置
  }

  export interface UpdateSheetDimensionRangeReqDimensionProperties {
    visible?: boolean // true 为显示, false 为隐藏行列
    fixedSize?: number // 行/列的大小
  }

  export interface UpdateSheetDimensionRangeResp {}

  export interface updateSheetDimensionRangeResp {
    code: number
    data: UpdateSheetDimensionRangeResp
    msg: string
  }

  export interface DeleteSheetDimensionRangeReq {
    spreadsheetToken: string // spreadsheet的token, 详见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    dimension: DeleteSheetDimensionRangeReqDimension // 需要删除行列的维度信息
  }

  export interface DeleteSheetDimensionRangeReqDimension {
    sheetId: string // sheetId
    majorDimension?: string // 默认 ROWS, 可选 ROWS、COLUMNS
    startIndex: number // 开始的位置
    endIndex: number // 结束的位置
  }

  export interface DeleteSheetDimensionRangeResp {
    delCount: number // 删除的行/列数
    majorDimension: string // 插入维度
  }

  export interface deleteSheetDimensionRangeResp {
    code: number
    msg: string
    data: DeleteSheetDimensionRangeResp
  }

  export interface GetSheetValueReq {
    spreadsheetToken: string // spreadsheet 的 token, 详见电子表格[概述](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    range: string // 查询范围, 包含 sheetId 与单元格范围两部分, 详见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    valueRenderOption?: string // valueRenderOption=ToString 可返回纯文本的值(数值类型除外)；valueRenderOption=FormattedValue 计算并格式化单元格；valueRenderOption=Formula单元格中含有公式时返回公式本身；valueRenderOption=UnformattedValue计算但不对单元格进行格式化。
    dateTimeRenderOption?: string // dateTimeRenderOption=FormattedString 计算并对时间日期按照其格式进行格式化, 但不会对数字进行格式化, 返回格式化后的字符串。详见[电子表格常见问题](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/guide/sheets-faq)
    user_id_type?: string // 返回的用户id类型, 可选open_id, union_id
  }

  export interface GetSheetValueResp {
    revision: number // sheet 的版本号
    spreadsheetToken: string // spreadsheet 的 token, 详见电子表格[概述](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    valueRange: GetSheetValueRespValueRange // 值与范围
  }

  export interface GetSheetValueRespValueRange {
    majorDimension: string // 插入维度
    range: string // 返回数据的范围, 为空时表示查询范围没有数据
    revision: number // sheet 的版本号
    values: any[][] // 查询得到的值
  }

  export interface getSheetValueResp {
    code: number
    msg: string
    data: GetSheetValueResp
  }

  export interface BatchGetSheetValueReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    ranges?: string[] // 多个查询范围 如 url?ranges=range1, range2, ⁣其中 range 包含 sheetId 与单元格范围两部分, 目前支持四种索引方式, 详见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    valueRenderOption?: string // valueRenderOption=ToString 可返回纯文本的值(数值类型除外)；valueRenderOption=FormattedValue 计算并格式化单元格；valueRenderOption=Formula单元格中含有公式时返回公式本身；valueRenderOption=UnformattedValue计算但不对单元格进行格式化
    dateTimeRenderOption?: string // dateTimeRenderOption=FormattedString 计算并将时间日期按照其格式进行格式化, 但不会对数字进行格式化, 返回格式化后的字符串。详见[电子表格常见问题](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/guide/sheets-faq)
    user_id_type?: string // 返回的用户id类型, 可选open_id, union_id
  }

  export interface BatchGetSheetValueResp {
    revision: number // sheet 的版本号
    spreadsheetToken: string // spreadsheet 的 token, 详见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    totalCells: number // 读取的单元格总数
    valueRanges?: BatchGetSheetValueRespValueRange[] // 值与范围
  }

  export interface BatchGetSheetValueRespValueRange {
    majorDimension: string // 插入维度
    range: string // 返回数据的范围, 为空时表示查询范围没有数据
    revision: number // sheet 的版本号
    values: any[][] // 查询得到的值
  }

  export interface batchGetSheetValueResp {
    code: number
    msg: string
    data: BatchGetSheetValueResp
  }

  export interface SetSheetValueReq {
    spreadsheetToken: string // spreadsheet的token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    valueRange: SetSheetValueReqValueRange // 值与范围
  }

  export interface SetSheetValueReqValueRange {
    range: string // 更新范围, 包含 sheetId 与单元格范围两部分, 目前支持三种索引方式, 详见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview), range所表示的范围需要大于等于values占用的范围
    values: any[][] // 需要写入的值, 如要写入公式、超链接、email、@人等, 可详看附录[sheet 支持写入数据类型](https://open.feishu.cn/document/ukTMukTMukTM/ugjN1UjL4YTN14CO2UTN)
  }

  export interface SetSheetValueResp {
    spreadsheetToken: string // spreadsheet 的 token
    updatedRange: string // 写入的范围
    updatedRows: number // 写入的行数
    updatedColumns: number // 写入的列数
    updatedCells: number // 写入的单元格总数
    revision: number // sheet 的版本号
  }

  export interface setSheetValueResp {
    code: number
    msg: string
    data: SetSheetValueResp
  }

  export interface BatchSetSheetValueReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    valueRanges?: BatchSetSheetValueReqValueRange[] // 需要更新的多个范围
  }

  export interface BatchSetSheetValueReqValueRange {
    range: string // 更新范围, 包含 sheetId 与单元格范围两部分, 目前支持三种索引方式, 详见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)。range所表示的范围需要大于等于values占用的范围。
    values: any[][] // 需要写入的值, 如要写入公式、超链接、email、@人等, 可详看附录[sheet 支持写入数据类型](https://open.feishu.cn/document/ukTMukTMukTM/ugjN1UjL4YTN14CO2UTN)
  }

  export interface BatchSetSheetValueResp {
    responses?: BatchSetSheetValueRespResponse[] // 响应
    revision: number // sheet 的版本号
    spreadsheetToken: string // spreadsheet 的 token
  }

  export interface BatchSetSheetValueRespResponse {
    spreadsheetToken: string // spreadsheet 的 token
    updatedRange: string // 写入的范围
    updatedRows: number // 写入的行数
    updatedColumns: number // 写入的列数
    updatedCells: number // 写入的单元格总数
  }

  export interface batchSetSheetValueResp {
    code: number
    msg: string
    data: BatchSetSheetValueResp
  }

  export interface SetSheetStyleReq {
    spreadsheetToken: string // spreadsheet 的 token, 详见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    appendStyle: SetSheetStyleReqAppendStyle // 设置单元格样式
  }

  export interface SetSheetStyleReqAppendStyle {
    range: string // 查询范围, 包含 sheetId 与单元格范围两部分, 目前支持四种索引方式, 详见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    style: SetSheetStyleReqAppendStyleStyle // 需要更新的样式
  }

  export interface SetSheetStyleReqAppendStyleStyle {
    font?: SetSheetStyleReqAppendStyleStyleFont // 字体相关样式
    textDecoration?: number // 文本装饰, 0 默认, 1 下划线, 2 删除线, 3 下划线和删除线
    formatter?: string // 数字格式, 详见附录 [sheet支持数字格式类型](https://open.feishu.cn/document/ukTMukTMukTM/uMjM2UjLzIjN14yMyYTN)
    hAlign?: number // 水平对齐, 0 左对齐, 1 中对齐, 2 右对齐
    vAlign?: number // 垂直对齐, 0 上对齐, 1 中对齐, 2 下对齐
    foreColor?: string // 字体颜色
    backColor?: string // 背景颜色
    borderType?: string // 边框类型, 可选 "FULL_BORDER", "OUTER_BORDER", "INNER_BORDER", "NO_BORDER", "LEFT_BORDER", "RIGHT_BORDER", "TOP_BORDER", "BOTTOM_BORDER"
    borderColor?: string // 边框颜色
    clean?: boolean // 是否清除所有格式, 默认 false
  }

  export interface SetSheetStyleReqAppendStyleStyleFont {
    bold?: boolean // 是否加粗
    italic?: boolean // 是否斜体
    fontSize?: string // 字体大小 字号大小为9~36 行距固定为1.5, 如:10pt/1.5
    clean?: boolean // 清除 font 格式, 默认 false
  }

  export interface SetSheetStyleResp {
    spreadsheetToken: string // spreadsheet 的 token
    updatedRange: string // 设置样式的范围
    updatedRows: number // 设置样式的行数
    updatedColumns: number // 设置样式的列数
    updatedCells: number // 设置样式的单元格总数
    revision: number // sheet 的版本号
  }

  export interface setSheetStyleResp {
    code: number
    msg: string
    data: SetSheetStyleResp
  }

  export interface BatchSetSheetStyleReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    data?: BatchSetSheetStyleReqData[] // 请求数据
  }

  export interface BatchSetSheetStyleReqData {
    ranges?: string[] // 查询范围, 包含 sheetId 与单元格范围两部分, 目前支持四种索引方式, 详见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    style: BatchSetSheetStyleReqDataStyle // 需要更新的样式
  }

  export interface BatchSetSheetStyleReqDataStyle {
    font?: BatchSetSheetStyleReqDataStyleFont // 字体相关样式
    textDecoration?: number // 文本装饰, 0 默认, 1 下划线, 2 删除线, 3 下划线和删除线
    formatter?: string // 数字格式, 详见附录 [sheet支持数字格式类型](https://open.feishu.cn/document/ukTMukTMukTM/uMjM2UjLzIjN14yMyYTN)
    hAlign?: number // 水平对齐, 0 左对齐, 1 中对齐, 2 右对齐
    vAlign?: number // 垂直对齐, 0 上对齐, 1 中对齐, 2 下对齐
    foreColor?: string // 字体颜色
    backColor?: string // 背景颜色
    borderType?: string // 边框类型, 可选 "FULL_BORDER", "OUTER_BORDER", "INNER_BORDER", "NO_BORDER", "LEFT_BORDER", "RIGHT_BORDER", "TOP_BORDER", "BOTTOM_BORDER"
    borderColor?: string // 边框颜色
    clean?: boolean // 是否清除所有格式, 默认 false
  }

  export interface BatchSetSheetStyleReqDataStyleFont {
    bold?: boolean // 是否加粗
    italic?: boolean // 是否斜体
    fontSize?: string // 字体大小 字号大小为9~36 行距固定为1.5, 如:10pt/1.5
  }

  export interface BatchSetSheetStyleResp {
    spreadsheetToken: string // spreadsheet 的 token
    totalUpdatedRows: number // 设置样式的总行数
    totalUpdatedColumns: number // 设置样式的总列数
    totalUpdatedCells: number // 设置样式的单元格总数
    revision: number // sheet 的版本号
    responses?: BatchSetSheetStyleRespResponse[] // 各个范围的设置单元格样式的范围、行列数等
  }

  export interface BatchSetSheetStyleRespResponse {
    spreadsheetToken: string // spreadsheet 的 token
    updatedRange: string // 设置样式的范围
    updatedRows: number // 设置样式的行数
    updatedColumns: number // 设置样式的列数
    updatedCells: number // 设置样式的单元格数
  }

  export interface batchSetSheetStyleResp {
    code: number
    msg: string
    data: BatchSetSheetStyleResp
  }

  export interface MergeSheetCellReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    range: string // 查询范围, 包含 sheetId 与单元格范围两部分, 目前支持四种索引方式, 详见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    mergeType: string // 可选三个类型, "MERGE_ALL"  将所选区域直接合并、"MERGE_ROWS"  将所选区域按行合并、"MERGE_COLUMNS"  将所选区域按列合并响应
  }

  export interface MergeSheetCellResp {
    spreadsheetToken: string // spreadsheet 的 token
  }

  export interface mergeSheetCellResp {
    code: number
    msg: string
    data: MergeSheetCellResp
  }

  export interface UnmergeSheetCellReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    range: string // 查询范围, 包含 sheetId 与单元格范围两部分, 目前支持四种索引方式, 详见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
  }

  export interface UnmergeSheetCellResp {
    spreadsheetToken: string // spreadsheet 的 token
  }

  export interface unmergeSheetCellResp {
    code: number
    msg: string
    data: UnmergeSheetCellResp
  }

  export interface SetSheetValueImageReq {
    spreadsheetToken: string // spreadsheet的token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    range: string // 查询范围  range=<sheetId>!<开始格子>:<结束格子> 如: xxxx!A1:D5, 详见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)。此处限定为一个格子, 如: xxxx!A1:A1
    image: Blob // 需要写入的图片二进制流, 支持  "PNG", "JPEG", "JPG", "GIF", "BMP", "JFIF", "EXIF", "TIFF", "BPG", "WEBP", "HEIC" 等图片格式
    name: string // 写入的图片名字
  }

  export interface SetSheetValueImageResp {
    spreadsheetToken: string // spreadsheet 的 token
    revision: number // spreadsheet 的版本号
    updateRange: string // 写入图片的range
  }

  export interface setSheetValueImageResp {
    code: number
    msg: string
    data: SetSheetValueImageResp
  }

  export interface FindSheetReq {
    spreadsheet_token: string // 表格的 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表的 id, 示例值: "0b**12"
    find_condition: FindSheetReqFindCondition // 查找条件
    find: string // 查找的字符串, 示例值: "hello"
  }

  export interface FindSheetReqFindCondition {
    range: string // 查找范围, 示例值: "0b**12!A1:H10"
    match_case?: boolean // 是否忽略大小写, 示例值: true
    match_entire_cell?: boolean // 是否匹配整个单元格, 示例值: false
    search_by_regex?: boolean // 是否为正则匹配, 示例值: false
    include_formulas?: boolean // 是否搜索公式内容, 示例值: false
  }

  export interface FindSheetResp {
    find_result: FindSheetRespFindResult // 查找返回符合条件的信息
  }

  export interface FindSheetRespFindResult {
    matched_cells?: string[] // 符合查找条件的单元格数组, 不包含公式, 例如["A1", "A2"...]
    matched_formula_cells?: string[] // 符合查找条件的含有公式的单元格数组, 例如["B3", "H7"...]
    rows_count: number // 符合查找条件的总行数
  }

  export interface findSheetResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: FindSheetResp
  }

  export interface ReplaceSheetReq {
    spreadsheet_token: string // Spreadsheet token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // Sheet id, 示例值: "0b**12"
    find_condition: ReplaceSheetReqFindCondition // 查找条件
    find: string // 查找的字符串, 示例值: "hello"
    replacement: string // 替换的字符串, 示例值: "world"
  }

  export interface ReplaceSheetReqFindCondition {
    range: string // 查找范围, 示例值: "0b**12!A1:H10"
    match_case?: boolean // 是否忽略大小写, 示例值: true
    match_entire_cell?: boolean // 是否匹配整个单元格, 示例值: false
    search_by_regex?: boolean // 是否为正则匹配, 示例值: false
    include_formulas?: boolean // 是否搜索公式内容, 示例值: false
  }

  export interface ReplaceSheetResp {
    replace_result: ReplaceSheetRespReplaceResult // 符合查找条件并替换的单元格信息
  }

  export interface ReplaceSheetRespReplaceResult {
    matched_cells?: string[] // 符合查找条件的单元格数组, 不包含公式, 例如["A1", "A2"...]
    matched_formula_cells?: string[] // 符合查找条件的含有公式的单元格数组, 例如["B3", "H7"...]
    rows_count: number // 符合查找条件的总行数
  }

  export interface replaceSheetResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: ReplaceSheetResp
  }

  export interface CreateSheetConditionFormatReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    sheet_condition_formats?: CreateSheetConditionFormatReqSheetConditionFormat[] // 表格的条件格式信息
  }

  export interface CreateSheetConditionFormatReqSheetConditionFormat {
    sheet_id: string // sheet的id
    condition_format: CreateSheetConditionFormatReqSheetConditionFormatConditionFormat // 一个条件格式的详细信息
  }

  export interface CreateSheetConditionFormatReqSheetConditionFormatConditionFormat {
    ranges?: string[] // 条件格式应用的范围, 支持: sheetId（整表）；sheetId!1:2（整行）；sheetId!A:B（整列）；sheetId!A1:B2（普通范围）；sheetId!A1:C（应用至最后一行）。应用范围不能超过表格的行总数和列总数, sheetId要与参数的sheetId一致
    rule_type: string // 条件格式规则类型, 目前只有7种: *containsBlanks（为空）、notContainsBlanks（不为空）、duplicateValues（重复值）、uniqueValues（唯一值）、cellIs（限定值范围）、containsText（包含内容）、timePeriod（日期）*
    attrs?: CreateSheetConditionFormatReqSheetConditionFormatConditionFormatAttr[] // rule_type对应的具体属性信息, 详见 [条件格式指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/conditionformat/condition-format-guide)
    style?: CreateSheetConditionFormatReqSheetConditionFormatConditionFormatStyle // 条件格式样式, 只支持以下样式, 以下样式每个参数都可选, 但是不能设置空的style
  }

  export interface CreateSheetConditionFormatReqSheetConditionFormatConditionFormatAttr {
    operator?: string // 操作方法
    time_period?: string // 时间范围
    formula?: string[] // 格式
    text?: string // 文本
  }

  export interface CreateSheetConditionFormatReqSheetConditionFormatConditionFormatStyle {
    font?: CreateSheetConditionFormatReqSheetConditionFormatConditionFormatStyleFont // 字体样式
    text_decoration?: number // 文本装饰, 0 默认, 1 下划线, 2 删除线, 3 下划线和删除线
    fore_color?: string // 字体颜色
    back_color?: string // 背景颜色
  }

  export interface CreateSheetConditionFormatReqSheetConditionFormatConditionFormatStyleFont {
    bold?: boolean // 加粗
    italic?: boolean // 斜体
  }

  export interface CreateSheetConditionFormatResp {
    responses?: CreateSheetConditionFormatRespResponse[] // 响应
  }

  export interface CreateSheetConditionFormatRespResponse {
    sheet_id: string // sheet的Id
    cf_id: string // 设置成功的条件格式id
    res_code: number // 条件格式设置状态码, 0表示成功, 非0表示失败
    res_msg: string // 条件格式设置返回的状态信息, 空表示成功, 非空表示失败原因
  }

  export interface createSheetConditionFormatResp {
    code: number
    msg: string
    data: CreateSheetConditionFormatResp
  }

  export interface UpdateSheetConditionFormatReq {
    spreadsheetToken: string // sheet 的 token, 获取方式见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    sheet_condition_formats?: UpdateSheetConditionFormatReqSheetConditionFormat[] // 表格的条件格式信息
  }

  export interface UpdateSheetConditionFormatReqSheetConditionFormat {
    sheet_id: string // sheet的id
    condition_format: UpdateSheetConditionFormatReqSheetConditionFormatConditionFormat // 一个条件格式的详细信息
  }

  export interface UpdateSheetConditionFormatReqSheetConditionFormatConditionFormat {
    cf_id: string // 需要更新的条件格式id, 会校验id是否存在
    ranges?: string[] // 条件格式应用的范围, 支持: sheetId（整表）；sheetId!1:2（整行）；sheetId!A:B（整列）；sheetId!A1:B2（普通范围）；sheetId!A1:C（应用至最后一行）。应用范围不能超过表格的行总数和列总数, sheetId要与参数的sheetId一致
    rule_type: string // 条件格式规则类型, 目前只有7种: *containsBlanks（为空）、notContainsBlanks（不为空）、duplicateValues（重复值）、uniqueValues（唯一值）、cellIs（限定值范围）、containsText（包含内容）、timePeriod（日期）*
    attrs?: UpdateSheetConditionFormatReqSheetConditionFormatConditionFormatAttr[] // rule_type对应的具体属性信息, 详见 [条件格式指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/conditionformat/condition-format-guide)
    style?: UpdateSheetConditionFormatReqSheetConditionFormatConditionFormatStyle // 条件格式样式, 只支持以下样式, 以下样式每个参数都可选, 但是不能设置空的style
  }

  export interface UpdateSheetConditionFormatReqSheetConditionFormatConditionFormatAttr {
    operator?: string // 操作方法
    time_period?: string // 时间范围
    formula?: string[] // 格式
    text?: string // 文本
  }

  export interface UpdateSheetConditionFormatReqSheetConditionFormatConditionFormatStyle {
    font?: UpdateSheetConditionFormatReqSheetConditionFormatConditionFormatStyleFont // 字体样式
    text_decoration?: number // 文本装饰, 0 默认, 1 下划线, 2 删除线, 3 下划线和删除线
    fore_color?: string // 字体颜色
    back_color?: string // 背景颜色
  }

  export interface UpdateSheetConditionFormatReqSheetConditionFormatConditionFormatStyleFont {
    bold?: boolean // 加粗
    italic?: boolean // 斜体
  }

  export interface UpdateSheetConditionFormatResp {
    responses?: UpdateSheetConditionFormatRespResponse[] // 响应
  }

  export interface UpdateSheetConditionFormatRespResponse {
    sheet_id: string // sheet的Id
    cf_id: string // 更新的条件格式id
    res_code: number // 条件格式更新状态码, 0表示成功, 非0表示失败
    res_msg: string // 条件格式更新返回的状态信息, 空表示成功, 不空表示失败原因
  }

  export interface updateSheetConditionFormatResp {
    code: number
    msg: string
    data: UpdateSheetConditionFormatResp
  }

  export interface DeleteSheetConditionFormatReq {
    spreadsheetToken: string // sheet 的 token, 获取方式见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    sheet_cf_ids: DeleteSheetConditionFormatReqSheetCfIDs // 表格条件格式id
  }

  export interface DeleteSheetConditionFormatReqSheetCfIDs {
    sheet_id: string // sheet的id
    cf_id: string // 条件格式id
  }

  export interface DeleteSheetConditionFormatResp {
    responses?: DeleteSheetConditionFormatRespResponse[] // 响应
  }

  export interface DeleteSheetConditionFormatRespResponse {
    sheet_id: string // sheet的Id
    cf_id: string // 条件格式id
    res_code: number // 条件格式删除状态码, 0表示成功, 非0表示失败
    res_msg: string // 条件格式删除返回的状态信息, 空表示成功, 非空表示失败原因
  }

  export interface deleteSheetConditionFormatResp {
    code: number
    msg: string
    data: DeleteSheetConditionFormatResp
  }

  export interface CreateSheetProtectedDimensionReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    user_id_type?: string // 请求的用户id类型, 可选open_id, union_id
    addProtectedDimension?: CreateSheetProtectedDimensionReqAddProtectedDimension[] // 需要增加保护范围的维度信息, 可多个范围
  }

  export interface CreateSheetProtectedDimensionReqAddProtectedDimension {
    dimension: CreateSheetProtectedDimensionReqAddProtectedDimensionDimension // 需要保护行列的维度信息
    editors?: number[] // 允许编辑保护范围的用户的 userID
    users?: string[] // 允许编辑保护范围的用户的id, id类型取决于user_id_type
    lockInfo?: string // 保护范围的信息
  }

  export interface CreateSheetProtectedDimensionReqAddProtectedDimensionDimension {
    sheetId: string // sheetId
    majorDimension?: string // 默认 ROWS, 可选 ROWS、COLUMNS
    startIndex: number // 开始的位置
    endIndex: number // 结束的位置
  }

  export interface CreateSheetProtectedDimensionResp {
    addProtectedDimension?: CreateSheetProtectedDimensionRespAddProtectedDimension[] // 需要增加保护范围的维度信息, 可多个范围
  }

  export interface CreateSheetProtectedDimensionRespAddProtectedDimension {
    dimension: CreateSheetProtectedDimensionRespAddProtectedDimensionDimension // 需要保护行列的维度信息
    editors?: number[] // 允许编辑保护范围的用户的 userID
    users?: string[] // 允许编辑保护范围的用户的id, id类型取决于user_id_type
    lockInfo: string // 保护范围的信息
    protectId: string // 保护区域的唯一 uid, 可用做后续解除保护
  }

  export interface CreateSheetProtectedDimensionRespAddProtectedDimensionDimension {
    sheetId: string // sheetId
    majorDimension: string // 默认 ROWS, 可选 ROWS、COLUMNS
    startIndex: number // 开始的位置
    endIndex: number // 结束的位置
  }

  export interface createSheetProtectedDimensionResp {
    code: number
    msg: string
    data: CreateSheetProtectedDimensionResp
  }

  export interface GetSheetProtectedDimensionReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    protectIds?: string[] // 保护范围ID, 可以通过[获取表格元数据](https://open.feishu.cn/document/ukTMukTMukTM/uETMzUjLxEzM14SMxMTN)接口获取, 多个ID用逗号分隔, 如xxxID1, xxxID2
    memberType?: string // 返回的用户类型, 可选userId, openId, unionId, 默认使用userId
  }

  export interface GetSheetProtectedDimensionResp {
    protectedRange: GetSheetProtectedDimensionRespProtectedRange // 保护范围
  }

  export interface GetSheetProtectedDimensionRespProtectedRange {
    protectId: string // 保护范围ID
    dimension: GetSheetProtectedDimensionRespProtectedRangeDimension // 保护范围, 如果为空, 则为保护子表
    sheetId: string // sheet的id
    lockInfo: string // 保护说明
    editors: GetSheetProtectedDimensionRespProtectedRangeEditors // 用户信息
  }

  export interface GetSheetProtectedDimensionRespProtectedRangeDimension {
    sheetId: string // sheet 的 id
    startIndex: number // 保护行列起始下标, 下标从1开始
    endIndex: number // 保护行列终止下标, 下标从1开始
    majorDimension: string // 保护范围的维度, COLUMNS为保护列, ROWS为保护行
  }

  export interface GetSheetProtectedDimensionRespProtectedRangeEditors {
    users?: GetSheetProtectedDimensionRespProtectedRangeEditorsUser[] // 用户信息列表
  }

  export interface GetSheetProtectedDimensionRespProtectedRangeEditorsUser {
    memberType: string // 用户类型
    memberId: string // 用户ID
  }

  export interface getSheetProtectedDimensionResp {
    code: number
    msg: string
    data: GetSheetProtectedDimensionResp
  }

  export interface UpdateSheetProtectedDimensionReq {
    spreadsheetToken: string // sheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    requests: UpdateSheetProtectedDimensionReqRequests // 请求
  }

  export interface UpdateSheetProtectedDimensionReqRequests {
    protectId: string // 保护范围ID, 可以通过[获取表格元数据](https://open.feishu.cn/document/ukTMukTMukTM/uETMzUjLxEzM14SMxMTN) 接口获取
    dimension?: UpdateSheetProtectedDimensionReqRequestsDimension // 行列保护信息
    editors?: UpdateSheetProtectedDimensionReqRequestsEditor[] // 可编辑保护范围的用户
    lockInfo?: string // 保护说明
  }

  export interface UpdateSheetProtectedDimensionReqRequestsDimension {
    sheetId: string // sheetId
    startIndex: number // 保护行列起始下标, 下标从1开始
    endIndex: number // 保护行列终止下标, 下标从1开始
    majorDimension: string // 保护范围ID对应的保护范围的维度, COLUMNS为保护列, ROWS为保护行
  }

  export interface UpdateSheetProtectedDimensionReqRequestsEditor {
    addEditors?: UpdateSheetProtectedDimensionReqRequestsEditorAddEditor[] // 需要增加的用户的列表, 用户需要有文档的编辑权限
    delEditors?: UpdateSheetProtectedDimensionReqRequestsEditorDelEditor[] // 需要删除的用户的列表
  }

  export interface UpdateSheetProtectedDimensionReqRequestsEditorAddEditor {
    memberType: string // 用户类型, 支持userId, openId, unionId
    memberId: string // 用户类型对应的用户ID
  }

  export interface UpdateSheetProtectedDimensionReqRequestsEditorDelEditor {
    memberType: string // 用户类型, 支持userId, openId, unionId
    memberId: string // 用户类型对应的用户ID
  }

  export interface UpdateSheetProtectedDimensionResp {
    replies?: UpdateSheetProtectedDimensionRespReply[] // 响应
  }

  export interface UpdateSheetProtectedDimensionRespReply {
    sheetId: string // sheet的id
    dimension: UpdateSheetProtectedDimensionRespReplyDimension // 成功修改的保护行列信息
    editors?: UpdateSheetProtectedDimensionRespReplyEditor[] // 可编辑保护范围的用户
    lockInfo: string // 成功修改的保护说明
  }

  export interface UpdateSheetProtectedDimensionRespReplyDimension {
    sheetId: string // sheetId
    startIndex: number // 保护行列起始下标, 下标从1开始
    endIndex: number // 保护行列终止下标, 下标从1开始
    majorDimension: string // 保护范围的维度
  }

  export interface UpdateSheetProtectedDimensionRespReplyEditor {
    addEditors?: UpdateSheetProtectedDimensionRespReplyEditorAddEditor[] // 成功增加的用户的列表
    delEditors?: UpdateSheetProtectedDimensionRespReplyEditorDelEditor[] // 成功删除的用户的列表
  }

  export interface UpdateSheetProtectedDimensionRespReplyEditorAddEditor {
    memberType: string // 用户类型
    memberId: string // 用户类型对应的用户ID
  }

  export interface UpdateSheetProtectedDimensionRespReplyEditorDelEditor {
    memberType: string // 用户类型
    memberId: string // 用户类型对应的用户ID
  }

  export interface updateSheetProtectedDimensionResp {
    code: number
    msg: string
    data: UpdateSheetProtectedDimensionResp
  }

  export interface DeleteSheetProtectedDimensionReq {
    spreadsheetToken: string // sheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    protectIds?: string[] // 需要删除的保护范围ID, 可以通过[获取表格元数据](https://open.feishu.cn/document/ukTMukTMukTM/uETMzUjLxEzM14SMxMTN)接口获取
  }

  export interface DeleteSheetProtectedDimensionResp {
    delProtectIds?: string[] // 成功删除的保护范围ID
  }

  export interface deleteSheetProtectedDimensionResp {
    code: number
    msg: string
    data: DeleteSheetProtectedDimensionResp
  }

  export interface CreateSheetDataValidationDropdownReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    range: string // 查询范围, 包含 sheetId 与单元格范围两部分, 目前支持四种索引方式, 详见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    dataValidationType: string // 下拉列表填"list"
    dataValidation?: CreateSheetDataValidationDropdownReqDataValidation // 下拉列表规则属性
  }

  export interface CreateSheetDataValidationDropdownReqDataValidation {
    conditionValues?: string[] // 下拉列表选项值, 需为字符串, 不能包含", ", 选项值最长100字符, 选项个数最多500个
    options?: CreateSheetDataValidationDropdownReqDataValidationOptions // 可选属性
  }

  export interface CreateSheetDataValidationDropdownReqDataValidationOptions {
    multipleValues?: boolean // 单选填false, 多选填true, 不填默认为false
    highlightValidData?: boolean // 是否设置颜色和胶囊样式, 不填默认为false
    colors?: string[] // 当highlightValidData为true时, color需填颜色, 与conditionValues中的值一一对应。需是RGB16进制格式, 如"#fffd00"
  }

  export interface CreateSheetDataValidationDropdownResp {}

  export interface createSheetDataValidationDropdownResp {
    code: number // 状态码, 0代表成功
    msg?: string // 状态信息
    data: CreateSheetDataValidationDropdownResp
  }

  export interface DeleteSheetDataValidationDropdownReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    dataValidationRanges?: DeleteSheetDataValidationDropdownReqDataValidationRange[] // 范围数组, 每个range 最大单元格数量5000, 每个range独立执行, 一个range的失败不影响其他range的执行。返回结果会返回每个range的执行结果
  }

  export interface DeleteSheetDataValidationDropdownReqDataValidationRange {
    range: string // 查询范围, 包含 sheetId 与单元格范围两部分, 目前支持四种索引方式, 详见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    dataValidationIds?: number[] // 指定需要删除的dataValidationIds
  }

  export interface DeleteSheetDataValidationDropdownResp {
    rangeResults?: DeleteSheetDataValidationDropdownRespRangeResult[]
  }

  export interface DeleteSheetDataValidationDropdownRespRangeResult {
    range: string // 执行的range, 与请求入参中的range 对应
    msg?: string // 结果信息
    success: boolean // 执行结果
    updatedCells: number // 影响的单元格数量
  }

  export interface deleteSheetDataValidationDropdownResp {
    code: number // 状态码, 0代表成功
    msg?: string // 状态信息
    data: DeleteSheetDataValidationDropdownResp
  }

  export interface UpdateSheetDataValidationDropdownReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    sheetId: string // 子sheet唯一识别参数
    dataValidationId: number // sheet中下拉列表的唯一标示id
    dataValidationType: string // 下拉列表填"list"
    dataValidation?: UpdateSheetDataValidationDropdownReqDataValidation // 下拉列表规则属性
  }

  export interface UpdateSheetDataValidationDropdownReqDataValidation {
    conditionValues?: string[] // 下拉列表选项值, 需为字符串, 不能包含", ", 选项值最长100字符, 选项个数最多500个
    options?: UpdateSheetDataValidationDropdownReqDataValidationOptions // 可选属性
  }

  export interface UpdateSheetDataValidationDropdownReqDataValidationOptions {
    multipleValues?: boolean // 单选填false, 多选填true, 不填默认为false
    highlightValidData?: boolean // 是否设置颜色和胶囊样式, 不填默认为false
    colors?: string[] // 当highlightValidData为true时, color需填颜色, 与conditionValues中的值一一对应。需是RGB16进制格式, 如"#fffd00"
  }

  export interface UpdateSheetDataValidationDropdownResp {
    spreadsheetToken: string // spreadsheet的token
    sheetId: string // 工作表 sheet 的 id
    dataValidation?: UpdateSheetDataValidationDropdownRespDataValidation
  }

  export interface UpdateSheetDataValidationDropdownRespDataValidation {
    dataValidationId: number // 唯一标示id
    dataValidationType: string // 下拉列表为"list"
    conditionValues?: string[] // 下拉列表选项值
    options?: UpdateSheetDataValidationDropdownRespDataValidationOptions // 可选属性
  }

  export interface UpdateSheetDataValidationDropdownRespDataValidationOptions {
    multipleValues?: boolean // 单选填false, 多选填true
    highlightValidData?: boolean // 是否设置颜色和胶囊样式
    colorValueMap?: { [key: string]: string } // 当highlightValidData为true时, colorValueMap的key与conditionValues中的值一一对应, value为对应的颜色参数。
  }

  export interface updateSheetDataValidationDropdownResp {
    code: number // 状态码, 0代表成功
    msg?: string // 状态信息
    data: UpdateSheetDataValidationDropdownResp
  }

  export interface GetSheetDataValidationDropdownReq {
    spreadsheetToken: string // spreadsheet 的 token, 获取方式见 [在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    range: string // 查询范围, 包含 sheetId 与单元格范围两部分, 目前支持四种索引方式, 详见[在线表格开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uATMzUjLwEzM14CMxMTN/overview)
    dataValidationType: string // 下拉列表填"list"
  }

  export interface GetSheetDataValidationDropdownResp {
    spreadsheetToken: string // spreadsheet的token
    sheetId: string // 工作表 sheet 的 id
    revision: number // 版本号
    dataValidations?: GetSheetDataValidationDropdownRespDataValidation[] // 下拉列表数组, 不存在时为空
  }

  export interface GetSheetDataValidationDropdownRespDataValidation {
    dataValidationId: number // 唯一标示id
    dataValidationType: string // 下拉列表为"list"
    conditionValues?: string[] // 下拉列表选项值
    options?: GetSheetDataValidationDropdownRespDataValidationOptions // 可选属性
  }

  export interface GetSheetDataValidationDropdownRespDataValidationOptions {
    multipleValues?: boolean // 单选填false, 多选填true
    highlightValidData?: boolean // 是否设置颜色和胶囊样式
    colorValueMap?: { [key: string]: string } // 当highlightValidData为true时, colorValueMap的key与conditionValues中的值一一对应, value为对应的颜色参数。
  }

  export interface getSheetDataValidationDropdownResp {
    code: number // 状态码, 0代表成功
    msg?: string // 状态信息
    data: GetSheetDataValidationDropdownResp
  }

  export interface CreateSheetFilterReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA\*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b\**12"
    range: string // 筛选应用范围, 示例值: "xxxxxx!C1:H14"
    col: string // 设置筛选条件的列, 示例值: "E"
    condition: CreateSheetFilterReqCondition // 筛选的条件
  }

  export interface CreateSheetFilterReqCondition {
    filter_type: string // 筛选类型, 示例值: "number"
    compare_type?: string // 比较类型, 示例值: "less"
    expected?: string[] // 筛选参数, 示例值: 6
  }

  export interface CreateSheetFilterResp {}

  export interface createSheetFilterResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateSheetFilterResp
  }

  export interface DeleteSheetFilterReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA\*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b\**12"
  }

  export interface DeleteSheetFilterResp {}

  export interface deleteSheetFilterResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteSheetFilterResp
  }

  export interface UpdateSheetFilterReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA\*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b\**12"
    col: string // 更新筛选条件的列, 示例值: "E"
    condition: UpdateSheetFilterReqCondition // 筛选条件
  }

  export interface UpdateSheetFilterReqCondition {
    filter_type: string // 筛选类型, 示例值: "number"
    compare_type?: string // 比较类型, 示例值: "less"
    expected?: string[] // 筛选参数, 示例值: 6
  }

  export interface UpdateSheetFilterResp {}

  export interface updateSheetFilterResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateSheetFilterResp
  }

  export interface GetSheetFilterReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA\*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b\**12"
  }

  export interface GetSheetFilterResp {
    sheet_filter_info: GetSheetFilterRespSheetFilterInfo // 筛选信息
  }

  export interface GetSheetFilterRespSheetFilterInfo {
    range: string // 筛选应用范围
    filtered_out_rows?: number[] // 筛选出来隐藏的行
    filter_infos?: GetSheetFilterRespSheetFilterInfoFilterInfo[] // sheet的筛选条件
  }

  export interface GetSheetFilterRespSheetFilterInfoFilterInfo {
    col: string // 设置了筛选条件的列
    conditions?: GetSheetFilterRespSheetFilterInfoFilterInfoCondition[] // 筛选条件
  }

  export interface GetSheetFilterRespSheetFilterInfoFilterInfoCondition {
    filter_type: string // 筛选类型
    compare_type: string // 比较类型
    expected?: string[] // 筛选参数
  }

  export interface getSheetFilterResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetSheetFilterResp
  }

  export interface CreateSheetFilterViewReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    filter_view_id?: string // 筛选视图 id, 示例值: "pH9hbVcCXA"
    filter_view_name?: string // 筛选视图名字, 示例值: "筛选视图 1"
    range?: string // 筛选视图的筛选范围, 示例值: "0b**12!C1:H14"
  }

  export interface CreateSheetFilterViewResp {
    filter_view: CreateSheetFilterViewRespFilterView // 创建的筛选视图的 id 、name、range
  }

  export interface CreateSheetFilterViewRespFilterView {
    filter_view_id: string // 筛选视图 id
    filter_view_name: string // 筛选视图名字
    range: string // 筛选视图的筛选范围
  }

  export interface createSheetFilterViewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateSheetFilterViewResp
  }

  export interface DeleteSheetFilterViewReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    filter_view_id: string // 筛选视图 id, 示例值: "pH9hbVcCXA"
  }

  export interface DeleteSheetFilterViewResp {}

  export interface deleteSheetFilterViewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteSheetFilterViewResp
  }

  export interface UpdateSheetFilterViewReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    filter_view_id: string // 筛选视图 id, 示例值: "pH9hbVcCXA"
    filter_view_name?: string // 筛选视图名字, 示例值: "筛选视图 1"
    range?: string // 筛选视图的筛选范围, 示例值: "0b**12!C1:H14"
  }

  export interface UpdateSheetFilterViewResp {
    filter_view: UpdateSheetFilterViewRespFilterView // 更新后的筛选视图的 id 、name、range
  }

  export interface UpdateSheetFilterViewRespFilterView {
    filter_view_id: string // 筛选视图 id
    filter_view_name: string // 筛选视图名字
    range: string // 筛选视图的筛选范围
  }

  export interface updateSheetFilterViewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateSheetFilterViewResp
  }

  export interface GetSheetFilterViewReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    filter_view_id: string // 筛选视图 id, 示例值: "pH9hbVcCXA"
  }

  export interface GetSheetFilterViewResp {
    filter_view: GetSheetFilterViewRespFilterView // 筛选视图信息, 包括 id、name、range
  }

  export interface GetSheetFilterViewRespFilterView {
    filter_view_id: string // 筛选视图 id
    filter_view_name: string // 筛选视图名字
    range: string // 筛选视图的筛选范围
  }

  export interface getSheetFilterViewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetSheetFilterViewResp
  }

  export interface QuerySheetFilterViewReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
  }

  export interface QuerySheetFilterViewResp {
    items?: QuerySheetFilterViewRespItem[] // 子表的所有筛选视图信息, id、name、range
  }

  export interface QuerySheetFilterViewRespItem {
    filter_view_id: string // 筛选视图 id
    filter_view_name: string // 筛选视图名字
    range: string // 筛选视图的筛选范围
  }

  export interface querySheetFilterViewResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: QuerySheetFilterViewResp
  }

  export interface CreateSheetFilterViewConditionReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    filter_view_id: string // 筛选视图 id, 示例值: "pH9hbVcCXA"
    condition_id?: string // 设置筛选条件的列, 使用字母号, 示例值: "E"
    filter_type?: string // 筛选类型, 示例值: "number"
    compare_type?: string // 比较类型, 示例值: "less"
    expected?: string[] // 筛选参数, 示例值: 6
  }

  export interface CreateSheetFilterViewConditionResp {
    condition: CreateSheetFilterViewConditionRespCondition // 创建的筛选条件
  }

  export interface CreateSheetFilterViewConditionRespCondition {
    condition_id: string // 设置筛选条件的列, 使用字母号
    filter_type: string // 筛选类型
    compare_type: string // 比较类型
    expected?: string[] // 筛选参数
  }

  export interface createSheetFilterViewConditionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateSheetFilterViewConditionResp
  }

  export interface DeleteSheetFilterViewConditionReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    filter_view_id: string // 筛选视图 id, 示例值: "pH9hbVcCXA"
    condition_id: string // 筛选范围内的某列字母号, 示例值: "E"
  }

  export interface DeleteSheetFilterViewConditionResp {}

  export interface deleteSheetFilterViewConditionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteSheetFilterViewConditionResp
  }

  export interface UpdateSheetFilterViewConditionReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    filter_view_id: string // 筛选视图 id, 示例值: "pH9hbVcCXA"
    condition_id: string // 列字母号, 示例值: "E"
    filter_type?: string // 筛选类型, 示例值: "number"
    compare_type?: string // 比较类型, 示例值: "less"
    expected?: string[] // 筛选参数, 示例值: 6
  }

  export interface UpdateSheetFilterViewConditionResp {
    condition: UpdateSheetFilterViewConditionRespCondition // 更新后的筛选条件
  }

  export interface UpdateSheetFilterViewConditionRespCondition {
    condition_id: string // 设置筛选条件的列, 使用字母号
    filter_type: string // 筛选类型
    compare_type: string // 比较类型
    expected?: string[] // 筛选参数
  }

  export interface updateSheetFilterViewConditionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateSheetFilterViewConditionResp
  }

  export interface GetSheetFilterViewConditionReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    filter_view_id: string // 筛选视图 id, 示例值: "pH9hbVcCXA"
    condition_id: string // 需要查询筛选条件的列字母号, 示例值: "E"
  }

  export interface GetSheetFilterViewConditionResp {
    condition: GetSheetFilterViewConditionRespCondition // 筛选的条件
  }

  export interface GetSheetFilterViewConditionRespCondition {
    condition_id: string // 设置筛选条件的列, 使用字母号
    filter_type: string // 筛选类型
    compare_type: string // 比较类型
    expected?: string[] // 筛选参数
  }

  export interface getSheetFilterViewConditionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetSheetFilterViewConditionResp
  }

  export interface QuerySheetFilterViewConditionReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    filter_view_id: string // 筛选视图 id, 示例值: "pH9hbVcCXA"
  }

  export interface QuerySheetFilterViewConditionResp {
    items?: QuerySheetFilterViewConditionRespItem[] // 筛选视图设置的所有筛选条件
  }

  export interface QuerySheetFilterViewConditionRespItem {
    condition_id: string // 设置筛选条件的列, 使用字母号
    filter_type: string // 筛选类型
    compare_type: string // 比较类型
    expected?: string[] // 筛选参数
  }

  export interface querySheetFilterViewConditionResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: QuerySheetFilterViewConditionResp
  }

  export interface CreateSheetFloatImageReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    float_image_id?: string // 浮动图片 id, 示例值: "ye06SS14ph"
    float_image_token?: string // 【更新时不用传, 创建需要】浮动图片 token, 需要先上传图片到表格获得此 token 之后再进行浮动图片的相关操作, 示例值: "boxbcbQsaSqIXsxxxxx1HCPJFbh"
    range?: string // 浮动图片的左上角单元格定位, 只支持一个单元格, 示例值: "0b**12!A1:A1"
    width?: number // 浮动图片的宽度, 大于等于 20px, 示例值: 100
    height?: number // 浮动图片的高度, 大于等于 20px, 示例值: 100
    offset_x?: number // 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移, 大于等于0且小于所在单元格的宽度, 示例值: 0
    offset_y?: number // 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移, 大于等于0且小于所在单元格的高度, 示例值: 0
  }

  export interface CreateSheetFloatImageResp {
    float_image: CreateSheetFloatImageRespFloatImage // 浮动图片返回值
  }

  export interface CreateSheetFloatImageRespFloatImage {
    float_image_id: string // 浮动图片 id
    float_image_token: string // 【更新时不用传, 创建需要】浮动图片 token, 需要先上传图片到表格获得此 token 之后再进行浮动图片的相关操作
    range: string // 浮动图片的左上角单元格定位, 只支持一个单元格
    width: number // 浮动图片的宽度, 大于等于 20px
    height: number // 浮动图片的高度, 大于等于 20px
    offset_x: number // 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移, 大于等于0且小于所在单元格的宽度
    offset_y: number // 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移, 大于等于0且小于所在单元格的高度
  }

  export interface createSheetFloatImageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateSheetFloatImageResp
  }

  export interface DeleteSheetFloatImageReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    float_image_id: string // 浮动图片 id, 示例值: "ye06SS14ph"
  }

  export interface DeleteSheetFloatImageResp {}

  export interface deleteSheetFloatImageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteSheetFloatImageResp
  }

  export interface UpdateSheetFloatImageReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    float_image_id: string // 浮动图片 id, 示例值: "ye06SS14ph"
    float_image_token?: string // 【更新时不用传, 创建需要】浮动图片 token, 需要先上传图片到表格获得此 token 之后再进行浮动图片的相关操作, 示例值: "boxbcbQsaSqIXsxxxxx1HCPJFbh"
    range?: string // 浮动图片的左上角单元格定位, 只支持一个单元格, 示例值: "0b**12!A1:A1"
    width?: number // 浮动图片的宽度, 大于等于 20px, 示例值: 100
    height?: number // 浮动图片的高度, 大于等于 20px, 示例值: 100
    offset_x?: number // 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移, 大于等于0且小于所在单元格的宽度, 示例值: 0
    offset_y?: number // 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移, 大于等于0且小于所在单元格的高度, 示例值: 0
  }

  export interface UpdateSheetFloatImageResp {
    float_image: UpdateSheetFloatImageRespFloatImage // 浮动图片信息
  }

  export interface UpdateSheetFloatImageRespFloatImage {
    float_image_id: string // 浮动图片 id
    float_image_token: string // 【更新时不用传, 创建需要】浮动图片 token, 需要先上传图片到表格获得此 token 之后再进行浮动图片的相关操作
    range: string // 浮动图片的左上角单元格定位, 只支持一个单元格
    width: number // 浮动图片的宽度, 大于等于 20px
    height: number // 浮动图片的高度, 大于等于 20px
    offset_x: number // 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移, 大于等于0且小于所在单元格的宽度
    offset_y: number // 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移, 大于等于0且小于所在单元格的高度
  }

  export interface updateSheetFloatImageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateSheetFloatImageResp
  }

  export interface GetSheetFloatImageReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
    float_image_id: string // 浮动图片 id, 示例值: "ye06SS14ph"
  }

  export interface GetSheetFloatImageResp {
    float_image: GetSheetFloatImageRespFloatImage // 浮动图片信息
  }

  export interface GetSheetFloatImageRespFloatImage {
    float_image_id: string // 浮动图片 id
    float_image_token: string // 【更新时不用传, 创建需要】浮动图片 token, 需要先上传图片到表格获得此 token 之后再进行浮动图片的相关操作
    range: string // 浮动图片的左上角单元格定位, 只支持一个单元格
    width: number // 浮动图片的宽度, 大于等于 20px
    height: number // 浮动图片的高度, 大于等于 20px
    offset_x: number // 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移, 大于等于0且小于所在单元格的宽度
    offset_y: number // 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移, 大于等于0且小于所在单元格的高度
  }

  export interface getSheetFloatImageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetSheetFloatImageResp
  }

  export interface QuerySheetFloatImageReq {
    spreadsheet_token: string // 表格 token, 示例值: "shtcnmBA*yGehy8"
    sheet_id: string // 子表 id, 示例值: "0b**12"
  }

  export interface QuerySheetFloatImageResp {
    items?: QuerySheetFloatImageRespItem[] // 子表的所有浮动图片信息
  }

  export interface QuerySheetFloatImageRespItem {
    float_image_id: string // 浮动图片 id
    float_image_token: string // 【更新时不用传, 创建需要】浮动图片 token, 需要先上传图片到表格获得此 token 之后再进行浮动图片的相关操作
    range: string // 浮动图片的左上角单元格定位, 只支持一个单元格
    width: number // 浮动图片的宽度, 大于等于 20px
    height: number // 浮动图片的高度, 大于等于 20px
    offset_x: number // 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移, 大于等于0且小于所在单元格的宽度
    offset_y: number // 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移, 大于等于0且小于所在单元格的高度
  }

  export interface querySheetFloatImageResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: QuerySheetFloatImageResp
  }

  export interface CreateWikiSpaceReq {
    name?: string // 知识空间名称, 示例值: "知识空间"
    description?: string // 知识空间描述, 示例值: "知识空间描述"
  }

  export interface CreateWikiSpaceResp {
    space: CreateWikiSpaceRespSpace // 知识空间
  }

  export interface CreateWikiSpaceRespSpace {
    name: string // 知识空间名称
    description: string // 知识空间描述
    space_id: string // 知识空间id
    space_type: string // 表示知识空间类型（团队空间 或 个人空间）, 可选值有: `team`: 团队空间, `person`: 个人空间
    visibility: string // 表示知识空间可见性（公开空间 或 私有空间）, 可选值有: `public`: 公开空间, `private`: 私有空间
  }

  export interface createWikiSpaceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateWikiSpaceResp
  }

  export interface GetWikiSpaceListReq {
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "1565676577122621"
  }

  export interface GetWikiSpaceListResp {
    items?: GetWikiSpaceListRespItem[] // 数据列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetWikiSpaceListRespItem {
    name: string // 知识空间名称
    description: string // 知识空间描述
    space_id: string // 知识空间id
    space_type: string // 表示知识空间类型（团队空间 或 个人空间）, 可选值有: `team`: 团队空间, `person`: 个人空间
    visibility: string // 表示知识空间可见性（公开空间 或 私有空间）, 可选值有: `public`: 公开空间, `private`: 私有空间
  }

  export interface getWikiSpaceListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetWikiSpaceListResp
  }

  export interface GetWikiSpaceReq {
    space_id: string // 知识空间id, 示例值: "6870403571079249922"
  }

  export interface GetWikiSpaceResp {
    space: GetWikiSpaceRespSpace // 知识空间
  }

  export interface GetWikiSpaceRespSpace {
    name: string // 知识空间名称
    description: string // 知识空间描述
    space_id: string // 知识空间id
    space_type: string // 表示知识空间类型（团队空间 或 个人空间）, 可选值有: `team`: 团队空间, `person`: 个人空间
    visibility: string // 表示知识空间可见性（公开空间 或 私有空间）, 可选值有: `public`: 公开空间, `private`: 私有空间
  }

  export interface getWikiSpaceResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetWikiSpaceResp
  }

  export interface UpdateWikiSpaceSettingReq {
    space_id: string // 知识空间id, 示例值: "1565676577122621"
    create_setting?: string // 谁可以创建空间的一级页面: "admin_and_member" = 管理员和成员 "admin"  - 仅管理员, 示例值: "admin/admin_and_member"
    security_setting?: string // 可阅读用户可否创建副本/打印/导出/复制: "allow" - 允许 "not_allow" - 不允许, 示例值: "allow/not_allow"
    comment_setting?: string // 可阅读用户可否评论: "allow" - 允许 "not_allow" - 不允许, 示例值: "allow/not_allow"
  }

  export interface UpdateWikiSpaceSettingResp {
    setting: UpdateWikiSpaceSettingRespSetting // 知识空间设置
  }

  export interface UpdateWikiSpaceSettingRespSetting {
    create_setting: string // 谁可以创建空间的一级页面: "admin_and_member" = 管理员和成员 "admin"  - 仅管理员
    security_setting: string // 可阅读用户可否创建副本/打印/导出/复制: "allow" - 允许 "not_allow" - 不允许
    comment_setting: string // 可阅读用户可否评论: "allow" - 允许 "not_allow" - 不允许
  }

  export interface updateWikiSpaceSettingResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateWikiSpaceSettingResp
  }

  export interface DeleteWikiSpaceMemberReq {
    space_id: string // 知识空间id, 示例值: "7008061636015554580"
    member_id: string // 成员id, 示例值: "g64fb7g7"
    member_type: string // “openchat” - 群id, “userid” - 用户id, “email” - 邮箱, “opendepartmentid” - 部门id, “openid” - 应用openid, “unionid” - unionid, 示例值: "userid"
    member_role: string // 角色: “admin” - 管理员, “member” - 成员, 示例值: "admin"
  }

  export interface DeleteWikiSpaceMemberResp {
    member: DeleteWikiSpaceMemberRespMember // 成员信息
  }

  export interface DeleteWikiSpaceMemberRespMember {
    member_type: string // “openchat” - 群id, “userid” - 用户id, “email” - 邮箱, “opendepartmentid” - 部门id, “openid” - 应用openid, “unionid” - unionid
    member_id: string // 用户id
    member_role: string // 角色: “admin” - 管理员, “member” - 成员
  }

  export interface deleteWikiSpaceMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: DeleteWikiSpaceMemberResp
  }

  export interface AddWikiSpaceMemberReq {
    space_id: string // 知识空间id, 示例值: "1565676577122621"
    need_notification?: boolean // 添加权限后是否通知对方, 示例值: true/fasle
    member_type: string // “openchat” - 群id, “userid” - 用户id, “email” - 邮箱, “opendepartmentid” - 部门id, “openid” - 应用openid, “unionid” - unionid, 示例值: "userid"
    member_id: string // 用户id, 示例值: "1565676577122621"
    member_role: string // 角色: “admin” - 管理员, “member” - 成员, 示例值: "admin"
  }

  export interface AddWikiSpaceMemberResp {
    member: AddWikiSpaceMemberRespMember // 知识空间成员
  }

  export interface AddWikiSpaceMemberRespMember {
    member_type: string // “openchat” - 群id, “userid” - 用户id, “email” - 邮箱, “opendepartmentid” - 部门id, “openid” - 应用openid, “unionid” - unionid
    member_id: string // 用户id
    member_role: string // 角色: “admin” - 管理员, “member” - 成员
  }

  export interface addWikiSpaceMemberResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: AddWikiSpaceMemberResp
  }

  export interface CreateWikiNodeReq {
    space_id: string // 知识空间id, 示例值: "6704147935988285963"
    obj_type: string // 文档类型, 对于快捷方式, 该字段是对应的实体的obj_type, 示例值: "doc/sheet/mindnote", 可选值有: `doc`: doc, `sheet`: sheet, `mindnote`: mindnote, `bitable`: bitable, `file`: file, `docx`: docx
    parent_node_token?: string // 节点的父亲token。当节点为一级节点时, 父亲token为空, 示例值: "wikcnKQ1k3pcuo5uSK4t8Vabcef"
    node_type: string // 节点类型, 示例值: "origin/shortcut", 可选值有: `origin`: 实体, `shortcut`: 快捷方式
    origin_node_token?: string // 快捷方式对应的实体node_token, 当创建节点为快捷方式时, 需要传该值, 示例值: "wikcnKQ1k3pcuo5uSK4t8Vabcef"
  }

  export interface CreateWikiNodeResp {
    node: CreateWikiNodeRespNode // 节点
  }

  export interface CreateWikiNodeRespNode {
    space_id: string // 知识库id
    node_token: string // 节点token
    obj_token: string // 文档token, 可以根据obj_type判断是属于doc、sheet还是mindnote的token(对于快捷方式, 该字段是对应的实体的obj_token)
    obj_type: string // 文档类型, 对于快捷方式, 该字段是对应的实体的obj_type, 可选值有: `doc`: doc, `sheet`: sheet, `mindnote`: mindnote, `bitable`: bitable, `file`: file, `docx`: docx
    parent_node_token: string // 节点的父亲token。当节点为一级节点时, 父亲token为空。
    node_type: string // 节点类型, 可选值有: `origin`: 实体, `shortcut`: 快捷方式
    origin_node_token: string // 快捷方式对应的实体node_token, 当创建节点为快捷方式时, 需要传该值
    origin_space_id: string // 快捷方式对应的实体所在的spaceid
    has_child: boolean // 是否有子节点
    title: string // 文档标题
    obj_create_time: string // 文档创建时间
    obj_edit_time: string // 文档最近编辑时间
    node_create_time: string // 节点创建时间
  }

  export interface createWikiNodeResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CreateWikiNodeResp
  }

  export interface GetWikiNodeListReq {
    space_id: string // 知识空间id, 示例值: "6946843325487906839"
    page_size?: number // 分页大小, 示例值: 10, 最大值: `50`
    page_token?: string // 分页标记, 第一次请求不填, 表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token, 下次遍历可采用该 page_token 获取查询结果, 示例值: "6946843325487456878"
    parent_node_token?: string // 父节点token, 示例值: "wikcnKQ1k3pcuo5uSK4t8VN6kVf"
  }

  export interface GetWikiNodeListResp {
    items?: GetWikiNodeListRespItem[] // 数据列表
    page_token: string // 分页标记, 当 has_more 为 true 时, 会同时返回新的 page_token, 否则不返回 page_token
    has_more: boolean // 是否还有更多项
  }

  export interface GetWikiNodeListRespItem {
    space_id: string // 知识库id
    node_token: string // 节点token
    obj_token: string // 文档token, 可以根据obj_type判断是属于doc、sheet还是mindnote的token(对于快捷方式, 该字段是对应的实体的obj_token)
    obj_type: string // 文档类型, 对于快捷方式, 该字段是对应的实体的obj_type, 可选值有: `doc`: doc, `sheet`: sheet, `mindnote`: mindnote, `bitable`: bitable, `file`: file, `docx`: docx
    parent_node_token: string // 节点的父亲token。当节点为一级节点时, 父亲token为空。
    node_type: string // 节点类型, 可选值有: `origin`: 实体, `shortcut`: 快捷方式
    origin_node_token: string // 快捷方式对应的实体node_token, 当创建节点为快捷方式时, 需要传该值
    origin_space_id: string // 快捷方式对应的实体所在的spaceid
    has_child: boolean // 是否有子节点
    title: string // 文档标题
    obj_create_time: string // 文档创建时间
    obj_edit_time: string // 文档最近编辑时间
    node_create_time: string // 节点创建时间
  }

  export interface getWikiNodeListResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetWikiNodeListResp
  }

  export interface MoveWikiNodeReq {
    space_id: string // 知识空间id, 示例值: "7008061636015554580"
    node_token: string // 需要迁移的节点token, 示例值: "wikbcd6ydSUyOEzbdlt1BfpA5Yc"
    target_parent_token: string // 移动到的父节点token, 示例值: "wikbcd6ydSUyOEzbdlt1BfpA5Yc"
  }

  export interface MoveWikiNodeResp {
    node: MoveWikiNodeRespNode // 移动后的节点信息
  }

  export interface MoveWikiNodeRespNode {
    space_id: string // 知识库id
    node_token: string // 节点token
    obj_token: string // 文档token, 可以根据obj_type判断是属于doc、sheet还是mindnote的token(对于快捷方式, 该字段是对应的实体的obj_token)
    obj_type: string // 文档类型, 对于快捷方式, 该字段是对应的实体的obj_type, 可选值有: `doc`: doc, `sheet`: sheet, `mindnote`: mindnote, `bitable`: bitable, `file`: file, `docx`: docx
    parent_node_token: string // 节点的父亲token。当节点为一级节点时, 父亲token为空。
    node_type: string // 节点类型, 可选值有: `origin`: 实体, `shortcut`: 快捷方式
    origin_node_token: string // 快捷方式对应的实体node_token, 当创建节点为快捷方式时, 需要传该值
    origin_space_id: string // 快捷方式对应的实体所在的spaceid
    has_child: boolean // 是否有子节点
    title: string // 文档标题
    obj_create_time: string // 文档创建时间
    obj_edit_time: string // 文档最近编辑时间
    node_create_time: string // 节点创建时间
  }

  export interface moveWikiNodeResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: MoveWikiNodeResp
  }

  export interface UpdateWikiNodeTitleReq {
    space_id: string // 知识空间ID, 示例值: "6946843325487912356"
    node_token: string // 节点token, 示例值: "wikcnKQ1k3pcuo5uSK4t8Vabcef"
    title: string // 节点新标题, 示例值: "新标题"
  }

  export interface UpdateWikiNodeTitleResp {}

  export interface updateWikiNodeTitleResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: UpdateWikiNodeTitleResp
  }

  export interface CopyWikiNodeReq {
    space_id: string // 知识空间id, 示例值: "6946843325487912356"
    node_token: string // 节点token, 示例值: "wikcnKQ1k3pcuo5uSK4t8Vabcef"
    target_parent_token?: string // 目标父节点token, 示例值: "wikcnKQ1k3pcuo5uSK4t8Vabcef"
    target_space_id?: string // 目标知识空间id, 示例值: "6946843325487912356"
    title?: string // 复制后的新标题。如果填空, 则新标题为空。如果不填, 则使用原节点标题, 示例值: "新标题"
  }

  export interface CopyWikiNodeResp {
    node: CopyWikiNodeRespNode // copy后的节点
  }

  export interface CopyWikiNodeRespNode {
    space_id: string // 知识库id
    node_token: string // 节点token
    obj_token: string // 文档token, 可以根据obj_type判断是属于doc、sheet还是mindnote的token(对于快捷方式, 该字段是对应的实体的obj_token)
    obj_type: string // 文档类型, 对于快捷方式, 该字段是对应的实体的obj_type, 可选值有: doc: doc, sheet: sheet, mindnote: mindnote, bitable: bitable, file: file, docx: docx
    parent_node_token: string // 节点的父亲token。当节点为一级节点时, 父亲token为空。
    node_type: string // 节点类型, 可选值有: origin: 实体, shortcut: 快捷方式
    origin_node_token: string // 快捷方式对应的实体node_token, 当创建节点为快捷方式时, 需要传该值
    origin_space_id: string // 快捷方式对应的实体所在的spaceid
    has_child: boolean // 是否有子节点
    title: string // 文档标题
    obj_create_time: string // 文档创建时间
    obj_edit_time: string // 文档最近编辑时间
    node_create_time: string // 节点创建时间
    creator: string // 节点创建者
    owner: string // 节点所有者
  }

  export interface copyWikiNodeResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: CopyWikiNodeResp
  }

  export interface GetWikiNodeReq {
    token: string // 文档的wiki token, 示例值: "wikcnKQ1k3pcuo5uSK4t8VN6kVf"
  }

  export interface GetWikiNodeResp {
    node: GetWikiNodeRespNode // 节点信息
  }

  export interface GetWikiNodeRespNode {
    space_id: string // 知识库id
    node_token: string // 节点token
    obj_token: string // 文档token, 可以根据obj_type判断是属于doc、sheet还是mindnote的token(对于快捷方式, 该字段是对应的实体的obj_token)
    obj_type: string // 文档类型, 对于快捷方式, 该字段是对应的实体的obj_type, 可选值有: `doc`: doc, `sheet`: sheet, `mindnote`: mindnote, `bitable`: bitable, `file`: file, `docx`: docx
    parent_node_token: string // 节点的父亲token。当节点为一级节点时, 父亲token为空。
    node_type: string // 节点类型, 可选值有: `origin`: 实体, `shortcut`: 快捷方式
    origin_node_token: string // 快捷方式对应的实体node_token, 当创建节点为快捷方式时, 需要传该值
    origin_space_id: string // 快捷方式对应的实体所在的spaceid
    has_child: boolean // 是否有子节点
    title: string // 文档标题
    obj_create_time: string // 文档创建时间
    obj_edit_time: string // 文档最近编辑时间
    node_create_time: string // 节点创建时间
  }

  export interface getWikiNodeResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetWikiNodeResp
  }

  export interface MoveDocsToWikiReq {
    space_id: string // 知识库id, 示例值: "1565676577122621"
    parent_wiki_token?: string // 节点的父亲token, 示例值: "wikbcOHIFxB0PJS2UTd2kF2SP6c"
    obj_type: string // 文档类型, 示例值: "doc", 可选值有: `doc`: doc（文档）, `sheet`: sheet（表格）, `bitable`: bitable（多维表格）, `mindnote`: mindnote（思维导图）, `docx`: docx, `file`: file (文件)
    obj_token: string // 文档token, 示例值: "docbc6e1qBqt1O5mCBVA1QUKVEg"
    apply?: boolean // 没有权限时, 是否申请迁入文档, 示例值: true
  }

  export interface MoveDocsToWikiResp {
    wiki_token: string // 移动后的知识库token
    task_id: string // 任务id
    applied: boolean // 是否提交了文档迁入申请
  }

  export interface moveDocsToWikiResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: MoveDocsToWikiResp
  }

  export interface GetWikiTaskReq {
    task_id: string // 任务id, 示例值: "7037044037068177428-075c9481e6a0007c1df689dfbe5b55a08b6b06f7"
    task_type: string // 任务类型, 示例值: "move", 可选值有: `move`: MoveDocsToWiki任务
  }

  export interface GetWikiTaskResp {
    task: GetWikiTaskRespTask // 任务结果
  }

  export interface GetWikiTaskRespTask {
    task_id: string // 任务id
    move_result?: GetWikiTaskRespTaskMoveResult[] // MoveDocsToWiki任务结果
  }

  export interface GetWikiTaskRespTaskMoveResult {
    node: GetWikiTaskRespTaskMoveResultNode // 移动完成的节点信息
    status: number // 节点移动状态码
    status_msg: string // 节点移动状态信息
  }

  export interface GetWikiTaskRespTaskMoveResultNode {
    space_id: string // 知识库id
    node_token: string // 节点token
    obj_token: string // 文档token, 可以根据obj_type判断是属于doc、sheet还是mindnote的token(对于快捷方式, 该字段是对应的实体的obj_token)
    obj_type: string // 文档类型, 对于快捷方式, 该字段是对应的实体的obj_type, 可选值有: `doc`: doc, `sheet`: sheet, `mindnote`: mindnote, `bitable`: bitable, `file`: file, `docx`: docx
    parent_node_token: string // 节点的父亲token。当节点为一级节点时, 父亲token为空。
    node_type: string // 节点类型, 可选值有: `origin`: 实体, `shortcut`: 快捷方式
    origin_node_token: string // 快捷方式对应的实体node_token, 当创建节点为快捷方式时, 需要传该值
    origin_space_id: string // 快捷方式对应的实体所在的spaceid
    has_child: boolean // 是否有子节点
    title: string // 文档标题
    obj_create_time: string // 文档创建时间
    obj_edit_time: string // 文档最近编辑时间
    node_create_time: string // 节点创建时间
  }

  export interface getWikiTaskResp {
    code: number // 错误码, 非 0 表示失败
    msg: string // 错误描述
    data: GetWikiTaskResp
  }
}

class SubscribeDriveFileReq {
  file_token?: any
  file_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    const q = {} as { [key: string]: any }
    if (this.file_type !== undefined) {
      q['file_type'] = this.file_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SearchDriveFileReq {
  search_key?: any
  count?: any
  offset?: any
  owner_ids?: any
  chat_ids?: any
  docs_types?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      search_key: this.search_key,
      count: this.count,
      offset: this.offset,
      owner_ids: this.owner_ids,
      chat_ids: this.chat_ids,
      docs_types: this.docs_types
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetDriveFileMetaReq {
  user_id_type?: any
  request_docs?: any
  with_url?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      request_docs: this.request_docs,
      with_url: this.with_url
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

class CreateDriveFileReq {
  folderToken?: any
  title?: any
  type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      title: this.title,
      type: this.type
    }
  }

  getPath(path: string) {
    path = path.replace(':folderToken', this.folderToken)

    return path
  }
}

class DeleteDriveFileReq {
  file_token?: any
  type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    const q = {} as { [key: string]: any }
    if (this.type !== undefined) {
      q['type'] = this.type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteDriveSheetFileReq {
  spreadsheetToken?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class GetDriveFileListReq {
  page_size?: any
  page_token?: any
  folder_token?: any

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
    if (this.folder_token !== undefined) {
      q['folder_token'] = this.folder_token
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetDriveRootFolderMetaReq {
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

class GetDriveFolderMetaReq {
  folderToken?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':folderToken', this.folderToken)

    return path
  }
}

class GetDriveFolderChildrenReq {
  folderToken?: any
  types?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':folderToken', this.folderToken)

    const q = {} as { [key: string]: any }
    if (this.types !== undefined) {
      q['types'] = this.types
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetDriveFileStatisticsReq {
  file_token?: any
  file_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    const q = {} as { [key: string]: any }
    if (this.file_type !== undefined) {
      q['file_type'] = this.file_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetDriveFileTaskReq {
  task_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.task_id !== undefined) {
      q['task_id'] = this.task_id
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateDriveExportTaskReq {
  file_extension?: any
  token?: any
  type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      file_extension: this.file_extension,
      token: this.token,
      type: this.type
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetDriveExportTaskReq {
  ticket?: any
  token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':ticket', this.ticket)

    const q = {} as { [key: string]: any }
    if (this.token !== undefined) {
      q['token'] = this.token
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DownloadDriveExportTaskReq {
  file_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    return path
  }
}

class DownloadDriveFileReq {
  file_token?: any
  range?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    return path
  }
}

class CopyDriveFileReq {
  file_token?: any
  name?: any
  type?: any
  folder_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      type: this.type,
      folder_token: this.folder_token
    }
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    return path
  }
}

class CreateDriveFolderReq {
  name?: any
  folder_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      name: this.name,
      folder_token: this.folder_token
    }
  }

  getPath(path: string) {
    return path
  }
}

class MoveDriveFileReq {
  file_token?: any
  type?: any
  folder_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      type: this.type,
      folder_token: this.folder_token
    }
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    return path
  }
}

class UploadDriveFileReq {
  file_name?: any
  parent_type?: any
  parent_node?: any
  size?: any
  checksum?: any
  file?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      file_name: this.file_name,
      parent_type: this.parent_type,
      parent_node: this.parent_node,
      size: this.size,
      checksum: this.checksum,
      file: this.file
    }
  }

  getPath(path: string) {
    return path
  }
}

class PrepareUploadDriveFileReq {
  file_name?: any
  parent_type?: any
  parent_node?: any
  size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      file_name: this.file_name,
      parent_type: this.parent_type,
      parent_node: this.parent_node,
      size: this.size
    }
  }

  getPath(path: string) {
    return path
  }
}

class PartUploadDriveFileReq {
  upload_id?: any
  seq?: any
  size?: any
  checksum?: any
  file?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      upload_id: this.upload_id,
      seq: this.seq,
      size: this.size,
      checksum: this.checksum,
      file: this.file
    }
  }

  getPath(path: string) {
    return path
  }
}

class FinishUploadDriveFileReq {
  upload_id?: any
  block_num?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      upload_id: this.upload_id,
      block_num: this.block_num
    }
  }

  getPath(path: string) {
    return path
  }
}

class DownloadDriveMediaReq {
  file_token?: any
  extra?: any
  range?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    const q = {} as { [key: string]: any }
    if (this.extra !== undefined) {
      q['extra'] = this.extra
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UploadDriveMediaReq {
  file_name?: any
  parent_type?: any
  parent_node?: any
  size?: any
  checksum?: any
  extra?: any
  file?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      file_name: this.file_name,
      parent_type: this.parent_type,
      parent_node: this.parent_node,
      size: this.size,
      checksum: this.checksum,
      extra: this.extra,
      file: this.file
    }
  }

  getPath(path: string) {
    return path
  }
}

class PrepareUploadDriveMediaReq {
  file_name?: any
  parent_type?: any
  parent_node?: any
  size?: any
  extra?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      file_name: this.file_name,
      parent_type: this.parent_type,
      parent_node: this.parent_node,
      size: this.size,
      extra: this.extra
    }
  }

  getPath(path: string) {
    return path
  }
}

class PartUploadDriveMediaReq {
  upload_id?: any
  seq?: any
  size?: any
  checksum?: any
  file?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      upload_id: this.upload_id,
      seq: this.seq,
      size: this.size,
      checksum: this.checksum,
      file: this.file
    }
  }

  getPath(path: string) {
    return path
  }
}

class FinishUploadDriveMediaReq {
  upload_id?: any
  block_num?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      upload_id: this.upload_id,
      block_num: this.block_num
    }
  }

  getPath(path: string) {
    return path
  }
}

class CreateDriveMemberPermissionOldReq {
  token?: any
  type?: any
  members?: any
  notify_lark?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      token: this.token,
      type: this.type,
      members: this.members,
      notify_lark: this.notify_lark
    }
  }

  getPath(path: string) {
    return path
  }
}

class TransferDriveMemberPermissionReq {
  token?: any
  type?: any
  owner?: any
  remove_old_owner?: any
  cancel_notify?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      token: this.token,
      type: this.type,
      owner: this.owner,
      remove_old_owner: this.remove_old_owner,
      cancel_notify: this.cancel_notify
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetDriveMemberPermissionListReq {
  token?: any
  type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      token: this.token,
      type: this.type
    }
  }

  getPath(path: string) {
    return path
  }
}

class CreateDriveMemberPermissionReq {
  token?: any
  type?: any
  need_notification?: any
  member_type?: any
  member_id?: any
  perm?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      member_type: this.member_type,
      member_id: this.member_id,
      perm: this.perm
    }
  }

  getPath(path: string) {
    path = path.replace(':token', this.token)

    const q = {} as { [key: string]: any }
    if (this.type !== undefined) {
      q['type'] = this.type
    }
    if (this.need_notification !== undefined) {
      q['need_notification'] = this.need_notification
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteDriveMemberPermissionReq {
  token?: any
  member_id?: any
  type?: any
  member_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':token', this.token)
    path = path.replace(':member_id', this.member_id)

    const q = {} as { [key: string]: any }
    if (this.type !== undefined) {
      q['type'] = this.type
    }
    if (this.member_type !== undefined) {
      q['member_type'] = this.member_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteDriveMemberPermissionOldReq {
  token?: any
  type?: any
  member_type?: any
  member_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      token: this.token,
      type: this.type,
      member_type: this.member_type,
      member_id: this.member_id
    }
  }

  getPath(path: string) {
    return path
  }
}

class UpdateDriveMemberPermissionOldReq {
  token?: any
  type?: any
  member_type?: any
  member_id?: any
  perm?: any
  notify_lark?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      token: this.token,
      type: this.type,
      member_type: this.member_type,
      member_id: this.member_id,
      perm: this.perm,
      notify_lark: this.notify_lark
    }
  }

  getPath(path: string) {
    return path
  }
}

class UpdateDriveMemberPermissionReq {
  token?: any
  member_id?: any
  need_notification?: any
  type?: any
  member_type?: any
  perm?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      member_type: this.member_type,
      perm: this.perm
    }
  }

  getPath(path: string) {
    path = path.replace(':token', this.token)
    path = path.replace(':member_id', this.member_id)

    const q = {} as { [key: string]: any }
    if (this.need_notification !== undefined) {
      q['need_notification'] = this.need_notification
    }
    if (this.type !== undefined) {
      q['type'] = this.type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CheckDriveMemberPermissionReq {
  token?: any
  type?: any
  perm?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      token: this.token,
      type: this.type,
      perm: this.perm
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetDrivePublicPermissionReq {
  token?: any
  type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':token', this.token)

    const q = {} as { [key: string]: any }
    if (this.type !== undefined) {
      q['type'] = this.type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateDrivePublicPermissionReq {
  token?: any
  type?: any
  external_access?: any
  security_entity?: any
  comment_entity?: any
  share_entity?: any
  link_share_entity?: any
  invite_external?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      external_access: this.external_access,
      security_entity: this.security_entity,
      comment_entity: this.comment_entity,
      share_entity: this.share_entity,
      link_share_entity: this.link_share_entity,
      invite_external: this.invite_external
    }
  }

  getPath(path: string) {
    path = path.replace(':token', this.token)

    const q = {} as { [key: string]: any }
    if (this.type !== undefined) {
      q['type'] = this.type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchGetDriveMediaTmpDownloadURLReq {
  file_tokens?: any
  extra?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.file_tokens !== undefined) {
      q['file_tokens'] = this.file_tokens
    }
    if (this.extra !== undefined) {
      q['extra'] = this.extra
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetDriveCommentListReq {
  file_token?: any
  file_type?: any
  user_id_type?: any
  is_solved?: any
  page_token?: any
  page_size?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    const q = {} as { [key: string]: any }
    if (this.file_type !== undefined) {
      q['file_type'] = this.file_type
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    if (this.is_solved !== undefined) {
      q['is_solved'] = this.is_solved
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

class GetDriveCommentReq {
  file_token?: any
  comment_id?: any
  file_type?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)
    path = path.replace(':comment_id', this.comment_id)

    const q = {} as { [key: string]: any }
    if (this.file_type !== undefined) {
      q['file_type'] = this.file_type
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateDriveCommentReq {
  file_token?: any
  file_type?: any
  user_id_type?: any
  comment_id?: any
  user_id?: any
  create_time?: any
  update_time?: any
  is_solved?: any
  solved_time?: any
  solver_user_id?: any
  reply_list?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      comment_id: this.comment_id,
      user_id: this.user_id,
      create_time: this.create_time,
      update_time: this.update_time,
      is_solved: this.is_solved,
      solved_time: this.solved_time,
      solver_user_id: this.solver_user_id,
      reply_list: this.reply_list
    }
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    const q = {} as { [key: string]: any }
    if (this.file_type !== undefined) {
      q['file_type'] = this.file_type
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateDriveCommentReq {
  file_token?: any
  comment_id?: any
  reply_id?: any
  file_type?: any
  user_id_type?: any
  content?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      content: this.content
    }
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)
    path = path.replace(':comment_id', this.comment_id)
    path = path.replace(':reply_id', this.reply_id)

    const q = {} as { [key: string]: any }
    if (this.file_type !== undefined) {
      q['file_type'] = this.file_type
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class DeleteDriveCommentReq {
  file_token?: any
  comment_id?: any
  reply_id?: any
  file_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)
    path = path.replace(':comment_id', this.comment_id)
    path = path.replace(':reply_id', this.reply_id)

    const q = {} as { [key: string]: any }
    if (this.file_type !== undefined) {
      q['file_type'] = this.file_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateDriveCommentPatchReq {
  file_token?: any
  comment_id?: any
  file_type?: any
  is_solved?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      is_solved: this.is_solved
    }
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)
    path = path.replace(':comment_id', this.comment_id)

    const q = {} as { [key: string]: any }
    if (this.file_type !== undefined) {
      q['file_type'] = this.file_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateDriveFileSubscriptionReq {
  file_token?: any
  subscription_id?: any
  subscription_type?: any
  is_subcribe?: any
  file_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      subscription_id: this.subscription_id,
      subscription_type: this.subscription_type,
      is_subcribe: this.is_subcribe,
      file_type: this.file_type
    }
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)

    return path
  }
}

class GetDriveFileSubscriptionReq {
  file_token?: any
  subscription_id?: any
  subscription_type?: any
  is_subcribe?: any
  file_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      subscription_type: this.subscription_type,
      is_subcribe: this.is_subcribe,
      file_type: this.file_type
    }
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)
    path = path.replace(':subscription_id', this.subscription_id)

    return path
  }
}

class UpdateDriveFileSubscriptionReq {
  file_token?: any
  subscription_id?: any
  is_subscribe?: any
  file_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      is_subscribe: this.is_subscribe,
      file_type: this.file_type
    }
  }

  getPath(path: string) {
    path = path.replace(':file_token', this.file_token)
    path = path.replace(':subscription_id', this.subscription_id)

    return path
  }
}

class CreateDriveDocReq {
  FolderToken?: any
  Content?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      FolderToken: this.FolderToken,
      Content: this.Content
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetDriveDocContentReq {
  docToken?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':docToken', this.docToken)

    return path
  }
}

class UpdateDriveDocContentReq {
  docToken?: any
  Revision?: any
  Requests?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      Revision: this.Revision,
      Requests: this.Requests
    }
  }

  getPath(path: string) {
    path = path.replace(':docToken', this.docToken)

    return path
  }
}

class GetDriveDocRawContentReq {
  docToken?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':docToken', this.docToken)

    return path
  }
}

class GetDriveDocMetaReq {
  docToken?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':docToken', this.docToken)

    return path
  }
}

class CreateSheetReq {
  title?: any
  folder_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      title: this.title,
      folder_token: this.folder_token
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetSheetMetaReq {
  spreadsheetToken?: any
  extFields?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    const q = {} as { [key: string]: any }
    if (this.extFields !== undefined) {
      q['extFields'] = this.extFields
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateSheetPropertyReq {
  spreadsheetToken?: any
  properties?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      properties: this.properties
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class BatchUpdateSheetReq {
  spreadsheetToken?: any
  requests?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      requests: this.requests
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class ImportSheetReq {
  file?: any
  name?: any
  folderToken?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      file: this.file,
      name: this.name,
      folderToken: this.folderToken
    }
  }

  getPath(path: string) {
    return path
  }
}

class CreateDriveImportTaskReq {
  file_extension?: any
  file_token?: any
  type?: any
  file_name?: any
  point?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      file_extension: this.file_extension,
      file_token: this.file_token,
      type: this.type,
      file_name: this.file_name,
      point: this.point
    }
  }

  getPath(path: string) {
    return path
  }
}

class GetDriveImportTaskReq {
  ticket?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':ticket', this.ticket)

    return path
  }
}

class MoveSheetDimensionReq {
  spreadsheet_token?: any
  sheet_id?: any
  source?: any
  destination_index?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      source: this.source,
      destination_index: this.destination_index
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class PrependSheetValueReq {
  spreadsheetToken?: any
  valueRange?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      valueRange: this.valueRange
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class AppendSheetValueReq {
  spreadsheetToken?: any
  insertDataOption?: any
  valueRange?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      valueRange: this.valueRange
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    const q = {} as { [key: string]: any }
    if (this.insertDataOption !== undefined) {
      q['insertDataOption'] = this.insertDataOption
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class InsertSheetDimensionRangeReq {
  spreadsheetToken?: any
  dimension?: any
  inheritStyle?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      dimension: this.dimension,
      inheritStyle: this.inheritStyle
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class AddSheetDimensionRangeReq {
  spreadsheetToken?: any
  dimension?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      dimension: this.dimension
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class UpdateSheetDimensionRangeReq {
  spreadsheetToken?: any
  dimension?: any
  dimensionProperties?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      dimension: this.dimension,
      dimensionProperties: this.dimensionProperties
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class DeleteSheetDimensionRangeReq {
  spreadsheetToken?: any
  dimension?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      dimension: this.dimension
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class GetSheetValueReq {
  spreadsheetToken?: any
  range?: any
  valueRenderOption?: any
  dateTimeRenderOption?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)
    path = path.replace(':range', this.range)

    const q = {} as { [key: string]: any }
    if (this.valueRenderOption !== undefined) {
      q['valueRenderOption'] = this.valueRenderOption
    }
    if (this.dateTimeRenderOption !== undefined) {
      q['dateTimeRenderOption'] = this.dateTimeRenderOption
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class BatchGetSheetValueReq {
  spreadsheetToken?: any
  ranges?: any
  valueRenderOption?: any
  dateTimeRenderOption?: any
  user_id_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    const q = {} as { [key: string]: any }
    if (this.ranges !== undefined) {
      q['ranges'] = this.ranges
    }
    if (this.valueRenderOption !== undefined) {
      q['valueRenderOption'] = this.valueRenderOption
    }
    if (this.dateTimeRenderOption !== undefined) {
      q['dateTimeRenderOption'] = this.dateTimeRenderOption
    }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class SetSheetValueReq {
  spreadsheetToken?: any
  valueRange?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      valueRange: this.valueRange
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class BatchSetSheetValueReq {
  spreadsheetToken?: any
  valueRanges?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      valueRanges: this.valueRanges
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class SetSheetStyleReq {
  spreadsheetToken?: any
  appendStyle?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      appendStyle: this.appendStyle
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class BatchSetSheetStyleReq {
  spreadsheetToken?: any
  data?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      data: this.data
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class MergeSheetCellReq {
  spreadsheetToken?: any
  range?: any
  mergeType?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      range: this.range,
      mergeType: this.mergeType
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class UnmergeSheetCellReq {
  spreadsheetToken?: any
  range?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      range: this.range
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class SetSheetValueImageReq {
  spreadsheetToken?: any
  range?: any
  image?: any
  name?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      range: this.range,
      image: this.image,
      name: this.name
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class FindSheetReq {
  spreadsheet_token?: any
  sheet_id?: any
  find_condition?: any
  find?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      find_condition: this.find_condition,
      find: this.find
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class ReplaceSheetReq {
  spreadsheet_token?: any
  sheet_id?: any
  find_condition?: any
  find?: any
  replacement?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      find_condition: this.find_condition,
      find: this.find,
      replacement: this.replacement
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class CreateSheetConditionFormatReq {
  spreadsheetToken?: any
  sheet_condition_formats?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      sheet_condition_formats: this.sheet_condition_formats
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class UpdateSheetConditionFormatReq {
  spreadsheetToken?: any
  sheet_condition_formats?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      sheet_condition_formats: this.sheet_condition_formats
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class DeleteSheetConditionFormatReq {
  spreadsheetToken?: any
  sheet_cf_ids?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      sheet_cf_ids: this.sheet_cf_ids
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class CreateSheetProtectedDimensionReq {
  spreadsheetToken?: any
  user_id_type?: any
  addProtectedDimension?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      addProtectedDimension: this.addProtectedDimension
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    const q = {} as { [key: string]: any }
    if (this.user_id_type !== undefined) {
      q['user_id_type'] = this.user_id_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class GetSheetProtectedDimensionReq {
  spreadsheetToken?: any
  protectIds?: any
  memberType?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    const q = {} as { [key: string]: any }
    if (this.protectIds !== undefined) {
      q['protectIds'] = this.protectIds
    }
    if (this.memberType !== undefined) {
      q['memberType'] = this.memberType
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class UpdateSheetProtectedDimensionReq {
  spreadsheetToken?: any
  requests?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      requests: this.requests
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class DeleteSheetProtectedDimensionReq {
  spreadsheetToken?: any
  protectIds?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      protectIds: this.protectIds
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class CreateSheetDataValidationDropdownReq {
  spreadsheetToken?: any
  range?: any
  dataValidationType?: any
  dataValidation?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      range: this.range,
      dataValidationType: this.dataValidationType,
      dataValidation: this.dataValidation
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class DeleteSheetDataValidationDropdownReq {
  spreadsheetToken?: any
  dataValidationRanges?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      dataValidationRanges: this.dataValidationRanges
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    return path
  }
}

class UpdateSheetDataValidationDropdownReq {
  spreadsheetToken?: any
  sheetId?: any
  dataValidationId?: any
  dataValidationType?: any
  dataValidation?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      dataValidationType: this.dataValidationType,
      dataValidation: this.dataValidation
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)
    path = path.replace(':sheetId', this.sheetId)
    path = path.replace(':dataValidationId', this.dataValidationId)

    return path
  }
}

class GetSheetDataValidationDropdownReq {
  spreadsheetToken?: any
  range?: any
  dataValidationType?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheetToken', this.spreadsheetToken)

    const q = {} as { [key: string]: any }
    if (this.range !== undefined) {
      q['range'] = this.range
    }
    if (this.dataValidationType !== undefined) {
      q['dataValidationType'] = this.dataValidationType
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateSheetFilterReq {
  spreadsheet_token?: any
  sheet_id?: any
  range?: any
  col?: any
  condition?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      range: this.range,
      col: this.col,
      condition: this.condition
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class DeleteSheetFilterReq {
  spreadsheet_token?: any
  sheet_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class UpdateSheetFilterReq {
  spreadsheet_token?: any
  sheet_id?: any
  col?: any
  condition?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      col: this.col,
      condition: this.condition
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class GetSheetFilterReq {
  spreadsheet_token?: any
  sheet_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class CreateSheetFilterViewReq {
  spreadsheet_token?: any
  sheet_id?: any
  filter_view_id?: any
  filter_view_name?: any
  range?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      filter_view_id: this.filter_view_id,
      filter_view_name: this.filter_view_name,
      range: this.range
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class DeleteSheetFilterViewReq {
  spreadsheet_token?: any
  sheet_id?: any
  filter_view_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':filter_view_id', this.filter_view_id)

    return path
  }
}

class UpdateSheetFilterViewReq {
  spreadsheet_token?: any
  sheet_id?: any
  filter_view_id?: any
  filter_view_name?: any
  range?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      filter_view_name: this.filter_view_name,
      range: this.range
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':filter_view_id', this.filter_view_id)

    return path
  }
}

class GetSheetFilterViewReq {
  spreadsheet_token?: any
  sheet_id?: any
  filter_view_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':filter_view_id', this.filter_view_id)

    return path
  }
}

class QuerySheetFilterViewReq {
  spreadsheet_token?: any
  sheet_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class CreateSheetFilterViewConditionReq {
  spreadsheet_token?: any
  sheet_id?: any
  filter_view_id?: any
  condition_id?: any
  filter_type?: any
  compare_type?: any
  expected?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      condition_id: this.condition_id,
      filter_type: this.filter_type,
      compare_type: this.compare_type,
      expected: this.expected
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':filter_view_id', this.filter_view_id)

    return path
  }
}

class DeleteSheetFilterViewConditionReq {
  spreadsheet_token?: any
  sheet_id?: any
  filter_view_id?: any
  condition_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':filter_view_id', this.filter_view_id)
    path = path.replace(':condition_id', this.condition_id)

    return path
  }
}

class UpdateSheetFilterViewConditionReq {
  spreadsheet_token?: any
  sheet_id?: any
  filter_view_id?: any
  condition_id?: any
  filter_type?: any
  compare_type?: any
  expected?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      filter_type: this.filter_type,
      compare_type: this.compare_type,
      expected: this.expected
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':filter_view_id', this.filter_view_id)
    path = path.replace(':condition_id', this.condition_id)

    return path
  }
}

class GetSheetFilterViewConditionReq {
  spreadsheet_token?: any
  sheet_id?: any
  filter_view_id?: any
  condition_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':filter_view_id', this.filter_view_id)
    path = path.replace(':condition_id', this.condition_id)

    return path
  }
}

class QuerySheetFilterViewConditionReq {
  spreadsheet_token?: any
  sheet_id?: any
  filter_view_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':filter_view_id', this.filter_view_id)

    return path
  }
}

class CreateSheetFloatImageReq {
  spreadsheet_token?: any
  sheet_id?: any
  float_image_id?: any
  float_image_token?: any
  range?: any
  width?: any
  height?: any
  offset_x?: any
  offset_y?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      float_image_id: this.float_image_id,
      float_image_token: this.float_image_token,
      range: this.range,
      width: this.width,
      height: this.height,
      offset_x: this.offset_x,
      offset_y: this.offset_y
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class DeleteSheetFloatImageReq {
  spreadsheet_token?: any
  sheet_id?: any
  float_image_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':float_image_id', this.float_image_id)

    return path
  }
}

class UpdateSheetFloatImageReq {
  spreadsheet_token?: any
  sheet_id?: any
  float_image_id?: any
  float_image_token?: any
  range?: any
  width?: any
  height?: any
  offset_x?: any
  offset_y?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      float_image_token: this.float_image_token,
      range: this.range,
      width: this.width,
      height: this.height,
      offset_x: this.offset_x,
      offset_y: this.offset_y
    }
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':float_image_id', this.float_image_id)

    return path
  }
}

class GetSheetFloatImageReq {
  spreadsheet_token?: any
  sheet_id?: any
  float_image_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)
    path = path.replace(':float_image_id', this.float_image_id)

    return path
  }
}

class QuerySheetFloatImageReq {
  spreadsheet_token?: any
  sheet_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':spreadsheet_token', this.spreadsheet_token)
    path = path.replace(':sheet_id', this.sheet_id)

    return path
  }
}

class CreateWikiSpaceReq {
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
    return path
  }
}

class GetWikiSpaceListReq {
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

class GetWikiSpaceReq {
  space_id?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':space_id', this.space_id)

    return path
  }
}

class UpdateWikiSpaceSettingReq {
  space_id?: any
  create_setting?: any
  security_setting?: any
  comment_setting?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      create_setting: this.create_setting,
      security_setting: this.security_setting,
      comment_setting: this.comment_setting
    }
  }

  getPath(path: string) {
    path = path.replace(':space_id', this.space_id)

    return path
  }
}

class DeleteWikiSpaceMemberReq {
  space_id?: any
  member_id?: any
  member_type?: any
  member_role?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      member_type: this.member_type,
      member_role: this.member_role
    }
  }

  getPath(path: string) {
    path = path.replace(':space_id', this.space_id)
    path = path.replace(':member_id', this.member_id)

    return path
  }
}

class AddWikiSpaceMemberReq {
  space_id?: any
  need_notification?: any
  member_type?: any
  member_id?: any
  member_role?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      member_type: this.member_type,
      member_id: this.member_id,
      member_role: this.member_role
    }
  }

  getPath(path: string) {
    path = path.replace(':space_id', this.space_id)

    const q = {} as { [key: string]: any }
    if (this.need_notification !== undefined) {
      q['need_notification'] = this.need_notification
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class CreateWikiNodeReq {
  space_id?: any
  obj_type?: any
  parent_node_token?: any
  node_type?: any
  origin_node_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      obj_type: this.obj_type,
      parent_node_token: this.parent_node_token,
      node_type: this.node_type,
      origin_node_token: this.origin_node_token
    }
  }

  getPath(path: string) {
    path = path.replace(':space_id', this.space_id)

    return path
  }
}

class GetWikiNodeListReq {
  space_id?: any
  page_size?: any
  page_token?: any
  parent_node_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':space_id', this.space_id)

    const q = {} as { [key: string]: any }
    if (this.page_size !== undefined) {
      q['page_size'] = this.page_size
    }
    if (this.page_token !== undefined) {
      q['page_token'] = this.page_token
    }
    if (this.parent_node_token !== undefined) {
      q['parent_node_token'] = this.parent_node_token
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class MoveWikiNodeReq {
  space_id?: any
  node_token?: any
  target_parent_token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      target_parent_token: this.target_parent_token
    }
  }

  getPath(path: string) {
    path = path.replace(':space_id', this.space_id)
    path = path.replace(':node_token', this.node_token)

    return path
  }
}

class UpdateWikiNodeTitleReq {
  space_id?: any
  node_token?: any
  title?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      title: this.title
    }
  }

  getPath(path: string) {
    path = path.replace(':space_id', this.space_id)
    path = path.replace(':node_token', this.node_token)

    return path
  }
}

class CopyWikiNodeReq {
  space_id?: any
  node_token?: any
  target_parent_token?: any
  target_space_id?: any
  title?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      target_parent_token: this.target_parent_token,
      target_space_id: this.target_space_id,
      title: this.title
    }
  }

  getPath(path: string) {
    path = path.replace(':space_id', this.space_id)
    path = path.replace(':node_token', this.node_token)

    return path
  }
}

class GetWikiNodeReq {
  token?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    const q = {} as { [key: string]: any }
    if (this.token !== undefined) {
      q['token'] = this.token
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}

class MoveDocsToWikiReq {
  space_id?: any
  parent_wiki_token?: any
  obj_type?: any
  obj_token?: any
  apply?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {
      parent_wiki_token: this.parent_wiki_token,
      obj_type: this.obj_type,
      obj_token: this.obj_token,
      apply: this.apply
    }
  }

  getPath(path: string) {
    path = path.replace(':space_id', this.space_id)

    return path
  }
}

class GetWikiTaskReq {
  task_id?: any
  task_type?: any

  constructor(props: any) {
    Object.assign(this, props)
  }

  getBody() {
    return {}
  }

  getPath(path: string) {
    path = path.replace(':task_id', this.task_id)

    const q = {} as { [key: string]: any }
    if (this.task_type !== undefined) {
      q['task_type'] = this.task_type
    }
    path = path + '?' + encodeQuery(q)
    return path
  }
}
