import { filterNullOrUndefinedValues } from '..'

describe('filterNullOrUndefinedValues', () => {
  it.each([
    [
      { foo: 'bar', bar: 'foo' },
      { foo: 'bar', bar: 'foo' }
    ],
    [{ foo: 'bar', bar: undefined }, { foo: 'bar' }],
    [{ foo: 'bar', bar: null }, { foo: 'bar' }]
  ])(
    'should return only keys and values for which values are not null or undefined (%s)',
    (input, output) => {
      const res = filterNullOrUndefinedValues(input)
      expect(res).toEqual(output)
    }
  )

  it('should keep omitted keys', () => {
    const input = {
      foo: 'bar',
      bar: null,
      baz: undefined
    }

    const res = filterNullOrUndefinedValues(input, ['bar', 'baz'])

    expect(res).toEqual({
      foo: 'bar',
      bar: null,
      baz: undefined
    })
  })
})
