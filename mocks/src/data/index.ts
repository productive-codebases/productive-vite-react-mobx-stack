import { newLogger } from '@/common/libs/logger'
import { runtimePaths } from '@/common/paths'
import { MockIdGenerator, stringifyData } from 'bouchon-reloaded'
import { writeFileSync } from 'fs'
import * as path from 'path'
import { getServiceNamePath } from '../helpers'
import { StoreDashboards } from '../services/dashboard/dashboard/types'
import { MockEntityName } from '../types'
import { generateRoles, generateUsers } from './generators/dashboard'
import { initFalso } from './initFalso'
import { IMockedAllData } from './types'

const logger = newLogger('mocks')('generator')

const mockIdGenerator = new MockIdGenerator<MockEntityName>(
  Object.values(MockEntityName)
)

const mocksUuidPath = path.join(runtimePaths.mocksRootDir, 'mocks-uuid.json')

try {
  initFalso()

  // write data in files
  Object.values(_generateAllMockedData()).forEach(({ filePath, data }) => {
    return writeFileSync(filePath, stringifyData(data))
  })

  // write mocks-uuid.json file (mapping between generated entities)
  writeFileSync(mocksUuidPath, mockIdGenerator.stringify())

  logger('info')('All mocks data files have been written!')
} catch (err) {
  logger('info')('An error has occurred when writing data mocks!')

  if (err instanceof Error) {
    logger('debug')(err.stack)
  }
}

/**
 * Generate all data for mocks.
 */
function _generateAllMockedData(): IMockedAllData {
  return {
    /**
     * Demo dashboard backend
     */

    dashboard: {
      filePath: getServiceNamePath('dashboard'),
      data: ((): StoreDashboards => {
        return {
          [MockEntityName.users]: generateUsers(mockIdGenerator),
          [MockEntityName.roles]: generateRoles(mockIdGenerator)
        }
      })()
    }
  }
}
