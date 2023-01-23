import { Maybe } from '@/common/types'

/**
 * Return a formatted date from a timestamp
 */
export function timestampToDate(timestamp?: Maybe<number>): string {
  if (!timestamp) {
    return 'N/A'
  }

  const date = new Date(timestamp)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
