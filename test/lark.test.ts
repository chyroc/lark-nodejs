import Lark from '../src/lark'

describe('Lark test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(new Lark({})).toBeInstanceOf(Lark)
  })

  it('cli.bot', () => {
    const cli = new Lark({})
    console.log('cli.bot', cli.bot)
  })
})
