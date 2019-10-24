import React from 'react'
import * as S from './styled'

function Nav({ stepsNames, excludeSteps = [], currentStep, right = () => {} }) {
  const totalSteps = stepsNames.length
  const steps = new Array(totalSteps).fill(0)
  let visibleStep = 0
  return (
    <S.WizardNav>
      <S.Wrap
        maxWidth={{
          xs: '100vw',
          sm: `${120 * (totalSteps - excludeSteps.length)}px`,
        }}>
        {steps.map((item, index) => {
          const step = index + 1
          if (excludeSteps.includes(index + 1)) return null
          visibleStep += 1
          return (
            <S.Content key={visibleStep} active={step === currentStep}>
              <S.StepCircle>
                <S.StepNumber>{visibleStep}</S.StepNumber>
              </S.StepCircle>
              <S.StepName>{stepsNames[index]}</S.StepName>
            </S.Content>
          )
        })}
      </S.Wrap>
      <S.Right>{right}</S.Right>
    </S.WizardNav>
  )
}

export default Nav
