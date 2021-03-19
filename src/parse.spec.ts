import { parse } from './parse'
import { NavigatorType } from './path'

describe('parse', () => {
  it('should parse prop navigators', () => {
    expect(parse(['.foo.bar.baz'], [])).toEqual([
      [NavigatorType.Prop, 'foo'],
      [NavigatorType.Prop, 'bar'],
      [NavigatorType.Prop, 'baz'],
    ])
    expect(parse(['["foo"][\'bar\']'], [])).toEqual([
      [NavigatorType.Prop, 'foo'],
      [NavigatorType.Prop, 'bar'],
    ])
  })

  it('should parse interpolated props', () => {
    const bar = Symbol('bar')
    expect(parse(['[', '][', ']'], ['foo', bar])).toEqual([
      [NavigatorType.Prop, 'foo'],
      [NavigatorType.Prop, bar],
    ])
  })

  it('should parse indexes', () => {
    expect(parse(['[1][2][3]'], [])).toEqual([
      [NavigatorType.Index, 1],
      [NavigatorType.Index, 2],
      [NavigatorType.Index, 3],
    ])
  })

  it('should parse negative indexes as properties', () => {
    expect(parse(['[-1][- 2][-3]'], [])).toEqual([
      [NavigatorType.Prop, '-1'],
      [NavigatorType.Prop, '-2'],
      [NavigatorType.Prop, '-3'],
    ])
  })

  it('should parse interpolated indexes', () => {
    expect(parse(['[', '][', '][', ']'], [1, 2, 3])).toEqual([
      [NavigatorType.Index, 1],
      [NavigatorType.Index, 2],
      [NavigatorType.Index, 3],
    ])
  })

  it('should parse negative interpolated indexes as properties', () => {
    expect(parse(['[', '][', '][', ']'], [-1, -2, -3])).toEqual([
      [NavigatorType.Prop, '-1'],
      [NavigatorType.Prop, '-2'],
      [NavigatorType.Prop, '-3'],
    ])
  })

  it('should parse slices', () => {
    expect(parse(['[1:2][3:][:4][:]'], [])).toEqual([
      [NavigatorType.Slice, 1, 2],
      [NavigatorType.Slice, 3, undefined],
      [NavigatorType.Slice, undefined, 4],
      [NavigatorType.Slice, undefined, undefined],
    ])
  })

  it('should parse negative slices', () => {
    expect(parse(['[-1:-2][-3:][:-4][:][5:-6][-7:8]'], [])).toEqual([
      [NavigatorType.Slice, -1, -2],
      [NavigatorType.Slice, -3, undefined],
      [NavigatorType.Slice, undefined, -4],
      [NavigatorType.Slice, undefined, undefined],
      [NavigatorType.Slice, 5, -6],
      [NavigatorType.Slice, -7, 8],
    ])
  })
})