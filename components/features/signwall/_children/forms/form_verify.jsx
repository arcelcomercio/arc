import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { ModalConsumer } from '../../../subscriptions/_context/modal'
import getCodeError from '../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import { getOriginAPI } from '../../_dependencies/domains'
import { MsgResetPass } from '../iconos'
import Loading from '../loading'
import * as S from './styles'

const FormVerify = ({ onClose, tokenVerify, typeDialog }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorBr, mainColorBtn, primaryFont },
      activePaywall,
    },
  } = useAppContext() || {}

  const { changeTemplate } = React.useContext(ModalConsumer)
  const [showLoading, setShowLoading] = React.useState(true)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [showBtnContinue, setShowBtnContinue] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
      window.Identity.verifyEmail(tokenVerify)
        .then(() => {
          setShowConfirm(true)
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_aceptar_sucess`
          )
          if (
            window.Identity.userProfile ||
            window.Identity.userIdentity.uuid
          ) {
            window.Identity.getUserProfile()
          }
        })
        .catch((errLogin) => {
          setShowError(getCodeError(errLogin.code))
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_aceptar_error`
          )
        })
        .finally(() => {
          setShowLoading(false)
        })

      if (window.Identity.userProfile || window.Identity.userIdentity.uuid) {
        setShowBtnContinue(true)
      }
    }
  }, [])

  return (
    <S.Form>
      {showLoading ? (
        <Loading arcSite={arcSite} typeBg="wait" />
      ) : (
        <>
          <div className="center block mb-20">
            <MsgResetPass bgcolor={mainColorBr} />
          </div>

          <S.Title s="20" primaryFont={primaryFont} className="center mb-10">
            {showConfirm
              ? '¡Bienvenido(a) Usuario!'
              : '¡Bienvenido(a) Nuevamente!'}
          </S.Title>

          {showError && <S.Error>{showError}</S.Error>}

          <S.Text c="gray" s="14" lh="28" className="mt-10 mb-20 center">
            {showConfirm
              ? 'Tu correo electrónico ha sido validado'
              : 'Tu correo electrónico podría ya estar validado'}
            <br />

            {!activePaywall && 'disfruta nuestro contenido sin límites'}
          </S.Text>

          {showBtnContinue ? (
            <S.Button
              type="button"
              color={mainColorBtn}
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_continuar_boton`
                )
                onClose()
              }}>
              CONTINUAR NAVEGANDO
            </S.Button>
          ) : (
            <S.Button
              type="button"
              color={mainColorBtn}
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_continuar_boton`
                )
                changeTemplate('login')
              }}>
              CONTINUAR
            </S.Button>
          )}
        </>
      )}
    </S.Form>
  )
}

export default FormVerify
