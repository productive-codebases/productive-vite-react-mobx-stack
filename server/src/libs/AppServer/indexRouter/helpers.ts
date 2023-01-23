import { runtimePaths } from '@/common/paths'
import * as fse from 'fs-extra'
import { template, TemplateExecutor } from 'lodash'
import * as path from 'path'
import { IManifestEntries } from './types'

/**
 * Get hashed filenames compiled by Vite.
 */
export function getManifestEntries(): IManifestEntries {
  const assetsFile = path.resolve(runtimePaths.serverClientDir, 'manifest.json')
  const manifestContentStr = fse.readFileSync(assetsFile, 'utf8')
  const manifest = JSON.parse(manifestContentStr) as IManifestEntries

  if (!('index.html' in manifest)) {
    throw new Error('index.html entry not found in Vite manifest')
  }

  return manifest
}

/**
 * Compile the template.
 * If production arg is true, return it directly if already saved in the module.
 */
export function compileIndex(): TemplateExecutor {
  const indexFile = path.resolve(
    runtimePaths.serverTemplatesDir,
    'server.index.html'
  )
  const indexContent = fse.readFileSync(indexFile, 'utf8')

  return template(indexContent)
}
