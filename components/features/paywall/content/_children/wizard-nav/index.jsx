import React from 'react'
import * as S from './styled'

function Nav({ totalSteps, stepsNames, currentStep, right = () => {} }) {
  const steps = new Array(totalSteps).fill(0)
  return (
    <S.WizardNav>
      <S.Wrap>
        {steps.map((item, index) => {
          const step = index + 1
          return (
            <S.Content key={step} active={step === currentStep}>
              <S.StepCircle>
                <S.StepNumber>{step}</S.StepNumber>
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
