import { filterNullOrUndefinedValues } from '@/common/helpers/filterNullOrUndefinedValues'
import { DATA_TESTID_ATTRIBUTE } from './constants'
import { IForwardedProps } from './types'

/**
 * Forward CSS/style props + exposed IForwardedProps<TProps> ones.
 * It limits code redundancy due to props drilling and flexibility by exposing
 * intrinsic props easily (onClick, etc).
 */
export function forwardProps<TProps extends IForwardedProps<object>>(
  props: TProps
) {
  return filterNullOrUndefinedValues({
    className: props.className,
    style: props.style,

    // forward data-test-id attributes, used in unit tests
    [DATA_TESTID_ATTRIBUTE]: props[DATA_TESTID_ATTRIBUTE],

    // forward data-attributes
    ...getDataAttributesFromProps(props),

    // props of the html tag itself
    ...props.forwardedAttributes
  })
}

/**
 * Retrieve only data-attr properties.
 */
function getDataAttributesFromProps<TProps extends IForwardedProps<object>>(
  props: TProps
): object {
  const dataAttributes: Array<[string, any]> = []

  Object.keys(props).forEach(propsKey => {
    if (propsKey.startsWith('data-attr')) {
      dataAttributes.push([propsKey, props[propsKey as keyof TProps]])
    }
  })

  return Object.fromEntries(dataAttributes)
}
