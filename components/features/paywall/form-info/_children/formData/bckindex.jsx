// import React from 'react'
// import * as S from './styled'
// import c from '../../../_dependencies/tools'

// function FormData({ totalSteps, stepsNames, currentStep, right = () => {} }) {
//   const steps = new Array(totalSteps).fill(0)
//   return (
//     <S.WizardNav>
//       <S.GlobalStyle />
//       <S.Wrap>
//         {steps.map((item, index) => {
//           const step = index + 1
//           return (
//             <S.Content
//               key={step}
//               className={c([['nav-step-active', step === currentStep]])}>
//               <S.StepCircle className="nav-circle">
//                 <S.StepNumber className="nav-number">{step}</S.StepNumber>
//               </S.StepCircle>
//               <S.StepName className="nav-step-name">
//                 {stepsNames[index]}
//               </S.StepName>
//             </S.Content>
//           )
//         })}
//       </S.Wrap>
//       <S.Right>{right}</S.Right>
//     </S.WizardNav>
//   )
// }

// export default FormData








import React from 'react'
// import * as S from './styled'
// import c from '../../../_dependencies/tools'

function FormData({ totalSteps, stepsNames, currentStep }) {
  const steps = new Array(totalSteps).fill(0)
  return (
    
    <S.WizardNav>
      <S.GlobalStyle />
      <S.Wrap>
        {steps.map((item, index) => {
          const step = index + 1
          return (
            <S.Content
              key={step}
              className={c([['nav-step-active', step === currentStep]])}>
              <S.StepCircle className="nav-circle">
                <S.StepNumber className="nav-number">{step}</S.StepNumber>
              </S.StepCircle>
              <S.StepName className="nav-step-name">
                {stepsNames[index]}
              </S.StepName>
            </S.Content>
          )
        })}
      </S.Wrap>
    </S.WizardNav>
  )
}

export default FormData