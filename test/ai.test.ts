import { appAllPermission } from './help.test'

describe('ai.test', () => {
  const cli = appAllPermission.ins()

  it('ai.detectTextLanguage', async () => {
    const resp = await cli.ai.detectTextLanguage({
      text: 'Some checks haven’t completed yet'
    })
    expect(resp.data.language).toEqual('en')
  })

  it('ai.translateText', async () => {
    const resp = await cli.ai.translateText({
      source_language: 'zh',
      text: '国家',
      target_language: 'en'
    })
    expect(resp.data.text.toLowerCase()).toEqual('country')
  })

  it('ai.recognizeBasicImage', async () => {
    const resp = await cli.ai.recognizeBasicImage({
      image: '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'
    })
    expect(resp.data.text_list).toHaveLength(1)
    expect(resp.data.text_list![0]).toEqual('Run')
  })
})


