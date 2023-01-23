import {
  camelCaseToSnakeCaseJsonTransformer,
  snakeCasetoCamelCaseJsonTransformer,
  unprotectDefaultPropertyJsonTransformer
} from '..'

describe('JSON transformers', () => {
  describe('camelCaseToSnakeCaseJsonTransformer', () => {
    it('should transform keys to snake_case recursively', () => {
      const input = {
        data: {
          accessRoles: ['testRole1', 'testRole2'],
          firstUser: {
            firstName: 'Alice',
            lastName: 'Bob',
            _mockId: '123'
          }
        }
      }

      const res = camelCaseToSnakeCaseJsonTransformer(input)

      expect(res).toEqual({
        data: {
          access_roles: ['testRole1', 'testRole2'],
          first_user: {
            _mockId: '123',
            first_name: 'Alice',
            last_name: 'Bob'
          }
        }
      })
    })
  })

  describe('snakeCasetoCamelCaseJsonTransformer', () => {
    it('should transform keys to camelCase recursively', () => {
      const input = {
        data: {
          access_roles: ['testRole1', 'testRole2'],
          first_user: {
            first_name: 'Alice',
            last_name: 'Bob',
            _mockId: '123'
          }
        }
      }

      const res = snakeCasetoCamelCaseJsonTransformer(input)

      expect(res).toEqual({
        data: {
          accessRoles: ['testRole1', 'testRole2'],
          firstUser: {
            _mockId: '123',
            firstName: 'Alice',
            lastName: 'Bob'
          }
        }
      })
    })
  })

  describe('unprotectDefaultPropertyJsonTransformer', () => {
    it('should copy _default to default', () => {
      const input = {
        data: {
          user: {
            _mockId: '123',
            firstName: 'Alice',
            lastName: 'Bob'
          },
          _default: {
            first: 'first',
            _default: {
              second: 'second'
            }
          },
          custom: {
            third: 'third'
          }
        }
      }

      const res = unprotectDefaultPropertyJsonTransformer(input)

      expect(res).toEqual({
        data: {
          user: {
            _mockId: '123',
            firstName: 'Alice',
            lastName: 'Bob'
          },
          default: {
            first: 'first',
            default: {
              second: 'second'
            }
          },
          custom: {
            third: 'third'
          }
        }
      })
    })
  })
})
