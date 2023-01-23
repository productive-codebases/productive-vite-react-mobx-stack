import { seed } from '@ngneat/falso'

export function initFalso() {
  // allow consistent randomized things
  seed('my-awesome-mocks-seed')
}
