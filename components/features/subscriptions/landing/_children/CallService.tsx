import * as Sentry from '@sentry/browser'
import { useContent } from 'fusion:content'
import * as React from 'react'

import useSentry from '../../../../hooks/useSentry'
import { PropertiesCommon } from '../../_dependencies/Properties'

type DataCallProps = {
  name: string
  phone: string
}

const styles = {
  msg: 'msg-confirmation',
  load: 'loading-call',
  success: 'title-success',
  note: 'note-schedule',
}

// prettier-ignore
const texts = {
  businessHours:  'Horario de atención es de L-V: 9AM a 8PM y S: 9AM a 1PM',
  successDescrip: 'Uno de nuestros ejecutivos se pondrá en contacto contigo.',
  successTitle:   'Tus datos han sido enviados correctamente',
  errorTitle:     'Oh, oh, algo salió mal',
  errorID:        'Error al recibir ID inválido - Servicio CallIn',
  errorFormat:    'Error al recibir formato inválido - Servicio CallIn',
  errorResponse:  'Error al recibir respuesta - Servicio CallIn',
  errorResolver:  'Error al cargar resolver de ARC',
  msgError:       'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.',
  arcError:       'Ocurrió un error inesperado. Por favor, inténtalo nuevamente refrescando la página.',
}

export const CallService = (data: DataCallProps) => {
  const [loading, setLoading] = React.useState(true)
  const [showError, setShowError] = React.useState<string>()
  const [showSuccess, setShowSuccess] = React.useState<number>()

  const result =
    useContent({
      source: 'paywall-callin',
      query: data,
    }) || {}

  const { success, error, Message } = result
  const { urls: urlCommon } = PropertiesCommon
  useSentry(urlCommon.sentrySubs)

  React.useEffect(() => {
    if (success) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(success, 'text/xml')
      const parent = doc.getElementsByTagName('ws_EC_SuscripcionResult')[0]
      const child = parent.childNodes[0]
      if (parent && child) {
        const numOrderClear = Number(child.nodeValue)
        if (numOrderClear >= 0) {
          setShowSuccess(numOrderClear)
        } else {
          setShowError(texts.msgError)
          Sentry.captureEvent({
            message: texts.errorID,
            level: Sentry.Severity.Error,
            extra: error || {},
          })
        }
        setLoading(false)
      } else {
        setShowError(texts.msgError)
        setLoading(false)
        Sentry.captureEvent({
          message: texts.errorFormat,
          level: Sentry.Severity.Error,
          extra: error || {},
        })
      }
    }
    if (error) {
      setLoading(false)
      Sentry.captureEvent({
        message: texts.errorResponse,
        level: Sentry.Severity.Error,
        extra: error || {},
      })
    }
    if (Message) {
      setLoading(false)
      setShowError(texts.arcError)
      Sentry.captureEvent({
        message: texts.errorResolver,
        level: Sentry.Severity.Error,
        extra: error || {},
      })
    }
  }, [success, error, Message])

  return (
    <div className={styles.msg}>
      {loading ? (
        <div className={styles.load}>
          <div />
          <div />
          <div />
          <div />
        </div>
      ) : (
        <>
          {showSuccess && (
            <>
              <h3 className={styles.success}>{texts.successTitle}</h3>
              <p>{texts.successDescrip}</p>
              <p className={styles.note}>{texts.businessHours}</p>
            </>
          )}
          {(showError || error || Message) && (
            <>
              <h3>{texts.errorTitle}</h3>
              <p>{showError || error}</p>
            </>
          )}
        </>
      )}
    </div>
  )
}
