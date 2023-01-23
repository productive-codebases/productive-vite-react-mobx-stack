import { randomNumberInRange } from 'bouchon-reloaded'
import { sampleSize } from 'lodash'

/**
 * Return one random key from a map.
 */
export function randomKeyFromMap<K, V>(map: Map<K, V>): K {
  const value = randomKeysFromMap(map, [1, 1]).pop() || null

  if (!value) {
    throw new Error('Value not found')
  }

  return value
}

/**
 * Return random keys from a map.
 */
export function randomKeysFromMap<K, V>(map: Map<K, V>, range: number[]): K[] {
  return sampleSize(Array.from(map.keys()), randomNumberInRange(range))
}

/**
 * Return one random value from a map.
 */
export function randomValueFromMap<K, V>(map: Map<K, V>): V {
  const value = randomValuesFromMap(map, [1, 1]).pop()

  if (!value) {
    throw new Error('Value not found')
  }

  return value
}

/**
 * Return random values from a map.
 */
export function randomValuesFromMap<K, V>(
  map: Map<K, V>,
  range: number[]
): V[] {
  return sampleSize(Array.from(map.values()), randomNumberInRange(range))
}

/**
 * Return one random item from a map.
 */
export function randomItemFromMap<K, V>(map: Map<K, V>): [K, V] {
  const value = randomItemsFromMap(map, [1, 1]).pop()

  if (!value) {
    throw new Error('Value not found')
  }

  return value
}

/**
 * Return random items from a map.
 */
export function randomItemsFromMap<K, V>(
  map: Map<K, V>,
  range: number[]
): Array<[K, V]> {
  return sampleSize(Array.from(map.entries()), randomNumberInRange(range))
}

/**
 * Return `value` bounded between `min` and `max`.
 */
export function between(min: number, max: number) {
  return (value: number): number => {
    return Math.max(min, Math.min(value, max))
  }
}
