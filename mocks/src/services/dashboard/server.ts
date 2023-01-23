import { servicesConfiguration } from '@/common/configuration/services'
import { bouchonRouter, newLogger } from 'bouchon-reloaded'
import colors from 'colors'
import express from 'express'
import morgan from 'morgan'
import { dashboardEndPoint } from './dashboard'

const app = express()

app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

const logger = newLogger('Dashboard')

// use bunyan for express logs
app.use(
  morgan('dev', {
    stream: {
      write: logger.info.bind(logger)
    }
  })
)

// setup bouchon router
app.use(bouchonRouter([dashboardEndPoint]))

// start the server
app
  .listen(
    servicesConfiguration.dashboard.mocks.port,
    servicesConfiguration.dashboard.mocks.hostname,
    () => {
      logger.info(
        `Server is listening on ${colors.bold.underline(
          `${servicesConfiguration.dashboard.mocks.hostname}:${servicesConfiguration.dashboard.mocks.port}`
        )}.`
      )
    }
  )
  .on('error', err => {
    logger.error('Error when starting the server: ', err)

    if (err.stack) {
      logger.debug(err.stack)
    }
  })
