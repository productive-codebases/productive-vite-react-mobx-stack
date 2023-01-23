import { ensureArray } from '@productive-codebases/toolbox'
import { Maybe } from '../types'

/**
 * Instanciate 'real entities' from litteral objects
 * having the same object shape.
 */
export function createEntities<TRaw, TEntity, TParentEntity = any>(
  EntityClass: any,
  rawObjects: Maybe<TRaw[]>,
  parentEntity?: TParentEntity
): TEntity[] {
  return ensureArray(rawObjects).map(rawObject => {
    return new EntityClass(rawObject, parentEntity)
  })
}

export function createEntity<TRaw, TEntity, TParentEntity = any>(
  EntityClass: any,
  rawObject: TRaw,
  parentEntity?: TParentEntity
): TEntity {
  return new EntityClass(rawObject, parentEntity)
}
