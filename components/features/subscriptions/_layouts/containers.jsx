import React from 'react'

const styles = {
  wrapper: 'step__grid wrapper-buy',
  left: 'step__left grid-two-one-buy',
  right: 'step__right grid-two-two-buy',
}

export const Container = ({ children }) => {
  return (
    <section className="step" id="main-steps">
      {children}
    </section>
  )
}

export const Wrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export const PanelLeft = ({ children }) => {
  return <article className={styles.left}>{children}</article>
}

export const PanelRight = ({ children }) => {
  return (
    <article className={styles.right} id="div-detail">
      {children}
    </article>
  )
}
