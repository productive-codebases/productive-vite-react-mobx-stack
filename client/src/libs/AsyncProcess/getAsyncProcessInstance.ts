import { AsyncProcess } from '@productive-codebases/async-process'

type AsyncProcessTestIdentifier = 'initDashboardPage'

export function getAsyncProcessTestInstance<R = any, E = any>(
  identifier: AsyncProcessTestIdentifier,
  subIdentifiers?: string[]
): AsyncProcess<AsyncProcessTestIdentifier, R, E> {
  return AsyncProcess.instance(identifier, subIdentifiers)
}
