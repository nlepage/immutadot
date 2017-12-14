/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { toLocaleLowerCase } from 'string'

describe('string.toLowerCase', () => {

  it('should replace capitals by lower case letters', () => {
    immutaTest((input, path) => {
      const output = toLocaleLowerCase(input, path)
      expect(output).toEqual({ nested: { prop: 'hello world !' } })
      return output
    }, { nested: { prop: 'Hello WORLD !' } }, 'nested.prop')
  })
})
