import { recurFreeze } from '../recurFreeze'
import { set } from './set'

describe('Set', () => {
  it('should set a nested property (prop navigators only)', () => {
    const o = recurFreeze({
      nested: {
        property: 'foo',
        otherProperty: 'baz',
      },
    })

    expect(set`${o}.nested.property`('bar')).toEqual({
      nested: {
        property: 'bar',
        otherProperty: 'baz',
      },
    })
  })

  it('should set a nested array index (index navigators only)', () => {
    const a = recurFreeze([
      'foo',
      ['bar', 'baz', 'qwe'],
      'plop',
    ])

    expect(set`${a}[1][${2}]`('aze')).toEqual([
      'foo',
      ['bar', 'baz', 'aze'],
      'plop',
    ])
  })

  it('should create missing objects for prop navigators', () => {
    expect(set`${undefined}.nested.property`('bar')).toEqual({
      nested: {
        property: 'bar',
      },
    })
  })

  it('should create missing arrays for index navigators', () => {
    expect(set`${undefined}[1][2]`('aze')).toEqual([
      undefined,
      [undefined, undefined, 'aze'],
    ])
  })

  it('should support path w/o root object', () => {
    const o = recurFreeze({
      nested: {
        property: 'foo',
        otherProperty: 'baz',
      },
    })

    expect(set`.nested.property`('bar')(o)).toEqual({
      nested: {
        property: 'bar',
        otherProperty: 'baz',
      },
    })
  })

  it('should access Symbol properties', () => {
    const nested = Symbol('nested')
    const property = Symbol('property')
    const o = recurFreeze({
      [nested]: {
        [property]: 'foo',
        otherProperty: 'baz',
      },
    })

    expect(set`${o}[${nested}][${property}]`('bar')).toEqual({
      [nested]: {
        [property]: 'bar',
        otherProperty: 'baz',
      },
    })
  })
})