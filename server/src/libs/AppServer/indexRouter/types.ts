import { MaybeUndef } from '@/common/types'

export interface IManifestEntries {
  'index.html': IManifestEntry
}

export interface IManifestEntry {
  file: string
  src: string
  css?: string
}

export interface IServerTemplateVariables {
  title: string

  // undef when used in development
  indexHtmlScript: MaybeUndef<string>
  indexCssScript: MaybeUndef<string>
}
