/**
 * Retrieve the type of the Reponse type.
 * Usage: ExtractApiResponse<DefaultApi['createCard']>
 */
export type ExtractApiResponse<TMethodName extends (...args: any) => any> =
  Awaited<ReturnType<TMethodName>>

/**
 * Retrieve the type of the first Request parameter.
 * Usage: ExtractApiRequest<DefaultApi['createCard']>
 */
export type ExtractApiRequest<TMethodName extends (...args: any) => any> =
  NonNullable<Parameters<TMethodName>[0]>
