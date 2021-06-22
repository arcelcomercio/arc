import * as React from 'react'

let counter = 0

/**
 * This Hook returns an unique id every time its executed.
 * The generated id will be the same every time the component where
 * its called, is rendered.
 *
 * @param suffix text to be placed before the generated id
 */
export const useGenerateId = (suffix = ''): string => {
  const id = React.useMemo(() => {
    counter += 1
    return counter
  }, [])

  return `id-${suffix}${id}`
}
