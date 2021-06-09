import * as React from 'react'
import { FC } from 'types/features'

import customFields from './_dependencies/custom-fields'

type ScrollTopButtonProps = {
  customFields?: {
    gap?: number
  }
}

const ScrollTopButton: FC<ScrollTopButtonProps> = (props) => {
  const { customFields: { gap = 150 } = {} } = props

  const [active, setActive] = React.useState(false)

  const activeButtonScroll = () => {
    if (document.body.scrollTop || document.documentElement.scrollTop > gap) {
      setActive(true)
    } else {
      setActive(false)
    }
  }

  React.useEffect(() => {
    window.onscroll = () => {
      activeButtonScroll()
    }
  }, [])

  return (
    <button
      type="button"
      id="btn-arrow-top"
      className={`arrow-up ${active ? 'active' : ''}`}
      aria-label="ir a la parte superior"
      onClick={() => {
        window.scrollTo(0, 0)
      }}>
      <i aria-hidden />
    </button>
  )
}

ScrollTopButton.propTypes = {
  customFields,
}

export default ScrollTopButton
