import { atBuilder } from '../src'

describe('builder.test', () => {
  it('', async () => {
    expect(atBuilder.atAll()).toEqual('<at user_id="all"></at>')
    expect(atBuilder.atOpenID('1')).toEqual('<at user_id="1"></at>')
  })
})
