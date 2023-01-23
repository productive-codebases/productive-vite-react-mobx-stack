import {
  IForwardedProps,
  ReactHTMLAttributes
} from '@/client/libs/react-helpers/forwardProps/types'
import { Theme } from '@/client/styles/themes/types'
import { Maybe } from '@/common/types'

export type ContainerFlexSpace = keyof Theme['sizes']

export interface IContainerFlexProps
  extends IForwardedProps<ReactHTMLAttributes<HTMLDivElement>> {
  /** data-attr-name for easier debugging / dom documentation */
  name: string
  /** Styles */
  className?: string
  /** Define the flex-grow behavior of the ContainerFlex itself (when used into nested ContainerFlex) */
  flexGrow?: React.CSSProperties['flexGrow']
  /** Define the direction of items */
  flexDirection?: React.CSSProperties['flexDirection']
  /** Define items alignment */
  flexAlignItems?: React.CSSProperties['alignItems']
  /** Define justification of the flex container */
  flexJustifyContent?: React.CSSProperties['justifyContent']
  /** Define items wrapping behavior */
  flexWrap?: React.CSSProperties['flexWrap']
  /** Define items gap */
  flexGap?: ContainerFlexSpace

  /** Define items height */
  height?: React.CSSProperties['height']
  /** Define items nodes */
  children: React.ReactNode
  /** Container horizontal padding */
  paddingH?: Maybe<ContainerFlexSpace>
  /** Container vertical padding */
  paddingV?: Maybe<ContainerFlexSpace>
  /** Container horizontal margin */
  marginH?: Maybe<ContainerFlexSpace>
  /** Container vertical margin */
  marginV?: Maybe<ContainerFlexSpace>
  /** Extend the container on the full height */
  fullHeight?: boolean
  /** Extend the container on the full width */
  fullWidth?: boolean
  /** Add a border on each item */
  itemsDebug?: boolean
}
