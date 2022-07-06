import { appAllPermission, file1, file2 } from './help.test'

const fs = require('fs')
const path = require('path')

describe('file', () => {
  const cli = appAllPermission.ins()

  it('uploadImage', async () => {
    const filepath = path.join(__dirname, './file_1.png')
    const content = fs.readFileSync(filepath)
    const resp = await cli.file.uploadImage({
      image_type: 'message',
      image: content
    })
    expect(resp.data.image_key).toBeDefined()
  }, 20 * 1000)

  it('downloadImage', async () => {
    const resp = await cli.file.downloadImage({
      image_key: file1.key
    })
    expect(Buffer.isBuffer(resp.data.file)).toBeTruthy()
    expect(resp.data.file.length).toEqual(84)
  }, 20 * 1000)

  it('uploadFile', async () => {
    const filepath = path.join(__dirname, './file_2.docx')
    const content = fs.readFileSync(filepath)
    const resp = await cli.file.uploadFile({
      file_type: 'doc',
      file_name: 'file2.docx',
      file: content
    })
    expect(resp.data.file_key).toBeDefined()
  }, 20 * 1000)

  it('downloadFile', async () => {
    const resp = await cli.file.downloadFile({
      file_key: file2.key
    })
    expect(Buffer.isBuffer(resp.data.file)).toBeTruthy()
    expect(resp.data.file.length).toEqual(3247)
  }, 20 * 1000)
})
