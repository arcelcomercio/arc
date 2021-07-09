import * as React from 'react'

const styles = {
  wrapper: 'step__grid wrapper-steps',
  left: 'step__left grid-two-one-buy',
  right: 'step__right grid-two-two-buy',
}

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns
 */
export const Container = ({ children }) => (
  <div className="step" id="main-steps">
    {children}
  </div>
)

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {React.CSSProperties} props.style
 * @returns
 */
export const Wrapper = ({ children, step }) => (
  <div
    className={` ${step !== 5 ? styles.wrapper : 'wrapper-steps wrapper-full'}`}
    style={{
      minHeight: '530px',
    }}>
    {children}
  </div>
)

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns
 */
export const PanelLeft = ({ children, step }) => (
  <section
    className={`${styles.left} ${step === 3 ? 'step-pay' : ''} ${
      step === 5 ? 'step-efectivo' : ''
    }`}>
    {children}
  </section>
)

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns
 */
export const PanelRight = ({ children, hidePanel }) => (
  <section
    className={styles.right}
    style={hidePanel ? { display: 'none' } : {}}
    id="div-detail">
    <div className="wrapper-buy">{children}</div>
  </section>
)
