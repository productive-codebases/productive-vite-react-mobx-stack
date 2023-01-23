export enum ErrorName {
  // 401
  UnauthorizedAccessError = 'UnauthorizedAccessError',

  // Runtime error
  ApplicationError = 'ApplicationError',

  // Too specific error that could be handled in a not-generic way
  CustomError = 'CustomError'
}
