import { newLogger } from '@/common/libs/logger'
import * as React from 'react'

interface IErrorBoundaryProps {
  errorComponent: React.ReactNode
  children: React.ReactNode
}

export interface IErrorBoundaryState {
  hasError: boolean
}

const logger = newLogger('client')('react')

export type ErrorBoundaryType = typeof ErrorBoundary

export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    logger('debug')('An error has occurred during the render:', error)

    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    // use a direct import to the logger to avoid to inject storeRoot in case
    // of StoreRoot initialization has failed
    logger('debug')('An error has occurred during the render:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent
    }

    return this.props.children
  }
}
