/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { xorWith } from './xorWith'

describe('XorWith', () => {

  it('should xor arrays', () => {
    immutaTest((input, path) => {
      const output = xorWith(input, path, [{ x: 2 }, { x: 3 }], (a, b) => a.x === b.x)
      expect(output).toEqual({
        nested: { prop: [{ x: 1 }, { x: 3 }] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [{ x: 1 }, { x: 2 }] },
      other: {},
    }, 'nested.prop')
  })
})
