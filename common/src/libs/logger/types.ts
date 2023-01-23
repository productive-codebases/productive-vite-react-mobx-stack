import { newLogger } from '.'

export type LoggerServerNamespace = ReturnType<typeof newLogger<'server'>>

export type LoggerServer = ReturnType<LoggerServerNamespace>
