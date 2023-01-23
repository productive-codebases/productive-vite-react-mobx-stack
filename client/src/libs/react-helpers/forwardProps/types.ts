import React from 'react'
import { DATA_TEST_ATTRIBUTE, DATA_TESTID_ATTRIBUTE } from './constants'

/**
 * Extends components props with props automatically forwarded by forwardProps() utility.
 *
 * Example:
 *
 * export interface IListItem extends IForwardedProps<ReactHTMLAttributes<HTMLDivElement>> {
 *   ...
 * }
 */
export interface IForwardedProps<TAttributes> {
  // Forward className for automatically styling the component
  className?: string

  // Forward optional inline style (use style only for very specific runtime cases)
  style?: React.CSSProperties

  // Forward other props defined by TAttributes
  forwardedAttributes?: TAttributes

  // Forward data-attribute used for unit tests
  [DATA_TESTID_ATTRIBUTE]?: string

  // Forward data-attribute used for e2e tests
  [DATA_TEST_ATTRIBUTE]?: string
}

/**
 * Extract attributes from a IForwardedProps interface.
 *
 * Usage:
 *
 * const onClick: ExtractAttributes<IListItemProps>['onClick'] = e => {
 *   ...
 * }
 */
export type ExtractAttributes<I extends IForwardedProps<any>> = NonNullable<
  I['forwardedAttributes']
>

/**
 * Extract all React HTML attributes.
 */
export type ReactHTMLAttributes<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>
