import { setupLogger } from '@productive-codebases/toolbox'
import { loggerMapping } from './loggerMapping'

const { newLogger, debug } = setupLogger(loggerMapping)

export { newLogger, debug }
