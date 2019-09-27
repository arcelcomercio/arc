import React from 'react'
import PropTypes from 'prop-types'
import { useWindowHeight } from '@react-hook/window-size'

import styled from 'styled-components'
import Delay from 'react-delay'

const FillHeight = ({
  children,
  substractElements = [],
  substractHeight = 0,
  wait = 100,
}) => {
  const height = useWindowHeight(-1, -1, { wait })
  const child = React.Children.only(children)
  const ClonedComponent = ({ className, ...restProps }) => {
    return React.cloneElement(child, {
      ...child.props,
      ...restProps,
      className: `${child.props.className || ''} ${className}`,
    })
  }
  const FilledComponent = styled(ClonedComponent).attrs(
    ({ filler, ...props }) => {
      const nodes = substractElements
        .map(id => document.getElementById(id))
        .filter(i => i)
      let diff = nodes.reduce((prev, node) => prev + node.offsetHeight, 0)
      diff += substractHeight
      return { diff, ...props }
    }
  )`
    min-height: calc(${height}px - ${({ diff }) => diff}px);
  `
  return (
    <Delay wait={wait}>
      <FilledComponent />
    </Delay>
  )
}

FillHeight.propTypes = {
  substractElements: PropTypes.arrayOf(PropTypes.string),
  substractHeight: PropTypes.number,
}

export default FillHeight
