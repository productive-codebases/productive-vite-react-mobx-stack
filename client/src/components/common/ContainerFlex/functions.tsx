import { Theme } from '@/client/styles/themes/types'
import { Maybe } from '@/common/types'
import { isDefined } from '@productive-codebases/toolbox'
import { ContainerFlexSpace, IContainerFlexProps } from './types'

/**
 * Return the flex-wrap default directive according to the flex direction of items.
 */
export function getContainerFlexWrap(
  props: IContainerFlexProps
): React.CSSProperties['flexWrap'] {
  if (isContainerFlexDirectionColumnOriented(props)) {
    return 'nowrap'
  }

  return props.flexWrap || 'wrap'
}

export function isContainerFlexDirectionColumnOriented(
  props: IContainerFlexProps
): boolean {
  return /column/.test(props.flexDirection || 'row')
}

export function getLeftRightPadding(
  theme: Theme,
  space?: Maybe<ContainerFlexSpace>
) {
  if (!isDefined(space)) {
    return {}
  }

  return {
    paddingLeft: theme.sizes[space],
    paddingRight: theme.sizes[space]
  }
}

export function getTopBottomPadding(
  theme: Theme,
  space?: Maybe<ContainerFlexSpace>
) {
  if (!isDefined(space)) {
    return {}
  }

  return {
    paddingTop: theme.sizes[space],
    paddingBottom: theme.sizes[space]
  }
}

export function getLeftRightMargin(
  theme: Theme,
  space?: Maybe<ContainerFlexSpace>
) {
  if (!isDefined(space)) {
    return {}
  }

  return {
    marginLeft: theme.sizes[space],
    marginRight: theme.sizes[space]
  }
}

export function getTopBottomMargin(
  theme: Theme,
  space?: Maybe<ContainerFlexSpace>
) {
  if (!isDefined(space)) {
    return {}
  }

  return {
    marginTop: theme.sizes[space],
    marginBottom: theme.sizes[space]
  }
}
