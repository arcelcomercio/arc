import * as React from 'react'

const styles = {
  // wrapper: 'step__grid wrapper-buy',
  wrapper: 'step__grid wrapper-steps',
  left: 'step__left grid-two-one-buy',
  right: 'step__right grid-two-two-buy',
}

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns
 */
export const Container = ({ children }) => {
  return (
    <div className="step" id="main-steps">
      {children}
    </div>
  )
}

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {React.CSSProperties} props.style
 * @returns
 */
export const Wrapper = ({ children, style = {} }) => {
  return (
    <div className={styles.wrapper} style={style}>
      {children}
    </div>
  )
}

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns
 */
export const PanelLeft = ({ children }) => {
  return <section className={styles.left}>{children}</section>
}

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns
 */
export const PanelRight = ({ children }) => {
  return (
    <section className={styles.right} id="div-detail">
      <div className="wrapper-buy">{children}</div>
    </section>
  )
}
