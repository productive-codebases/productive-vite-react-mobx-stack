import { LoggerServer } from '@/common/libs/logger/types'

/**
 * Utility function to print errors easily.
 */
export function logException(
  logger: LoggerServer,
  options?: { showTraceback: boolean }
) {
  const finalOptions = {
    showTraceback: true,
    ...options
  }

  return (err: Error, customMessage: string = 'An exception has occurred') => {
    logger('error')(`↓ ${customMessage} ↓`)

    if (finalOptions.showTraceback && err instanceof Error) {
      logger('debug')('%O', err.stack)
    }
  }
}
