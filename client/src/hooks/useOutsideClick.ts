import * as React from 'react'

/**
 * Add the ability to detect if the user clicks outside of a component
 * Returns a ref for adding to the "inside" component
 *
 * Usage:
 *  const ref = useOutsideClick<HTMLDivElement>(() => {
 *   console.log('Clicked outside of the component')
 * })
 *
 * <div ref={ref} onClick={() => {console.log('Clicked inside the component')}} />
 */
export const useOutsideClick = <T extends HTMLElement>(
  handleMouseClick: () => void
) => {
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current || !event.target) {
        return
      }

      // if the target clicked is not contained in the ref's current node,
      // it means that the click is outside the element that owns the ref
      if (!ref.current.contains(event.target as Node)) {
        handleMouseClick()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}
