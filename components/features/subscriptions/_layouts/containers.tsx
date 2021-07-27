import * as React from 'react'
import { CommonProps } from 'types/utils'

interface WrapperProps extends Pick<CommonProps, 'children'> {
  step?: number
}

const styles = {
  wrapper: 'step__grid wrapper-steps',
  left: 'step__left grid-two-one-buy',
  right: 'step__right grid-two-two-buy',
}

export const Container = ({
  children,
}: Pick<CommonProps, 'children'>): JSX.Element => (
  <div className="step" id="main-steps">
    {children}
  </div>
)

export const Wrapper = ({ children, step = 0 }: WrapperProps): JSX.Element => (
  <div
    className={` ${step !== 5 ? styles.wrapper : 'wrapper-steps wrapper-full'}`}
    style={{
      minHeight: '530px',
    }}>
    {children}
  </div>
)

export const PanelLeft = ({
  children,
  step = 0,
}: WrapperProps): JSX.Element => (
  <section
    className={`${styles.left} ${step === 3 ? 'step-pay' : ''} ${
      step === 5 ? 'step-efectivo' : ''
    }`}>
    {children}
  </section>
)

interface PanelRightProps extends Pick<CommonProps, 'children'> {
  hidePanel?: boolean
}

export const PanelRight = ({
  children,
  hidePanel = false,
}: PanelRightProps): JSX.Element => (
  <section
    className={styles.right}
    style={hidePanel ? { display: 'none' } : {}}
    id="div-detail">
    <div className="wrapper-buy">{children}</div>
  </section>
)
