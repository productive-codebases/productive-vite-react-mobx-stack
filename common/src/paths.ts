import * as path from 'path'

/**
 * Resolve runtime paths used when the app is running.
 */
function resolveRuntimePaths() {
  // When building for production, rootDir is server/dist directory.
  const rootDir = path.resolve(__dirname, '..', '..')

  // Common
  const commonRootDir = path.join(rootDir, 'common')

  // Client
  const clientRootDir = path.join(rootDir, 'client')

  // Server
  const serverRootDir = path.join(rootDir, 'server')
  const serverEnvFile = path.join(serverRootDir, '.env')
  const serverConfigsDir = path.join(serverRootDir, 'configs')
  const serverTemplatesDir = path.join(serverRootDir, 'templates')
  const serverClientDir = path.join(rootDir, 'client')
  const serverClientStaticDir = path.join(serverClientDir, 'w', 'static')

  // Mocks
  const mocksRootDir = path.join(rootDir, 'mocks')

  return {
    rootDir,
    commonRootDir,
    clientRootDir,
    serverRootDir,
    serverEnvFile,
    serverConfigsDir,
    serverTemplatesDir,
    serverClientDir,
    serverClientStaticDir,
    mocksRootDir
  }
}

/**
 * Resolve static paths, used during the compilation only.
 */
function resolveStaticPaths() {
  const rootDir = path.resolve(__dirname, '..', '..')

  const serverDistDir = path.join(rootDir, 'server', 'dist')
  const serverDistClientDir = path.join(serverDistDir, 'client')
  const clientSrcDir = path.join(rootDir, 'client', 'src')
  const commonSrcDir = path.join(rootDir, 'common', 'src')

  return {
    rootDir,
    serverDistDir,
    serverDistClientDir,
    clientSrcDir,
    commonSrcDir
  }
}

export const runtimePaths = resolveRuntimePaths()
export const staticPaths = resolveStaticPaths()
