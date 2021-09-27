import { useContent } from 'fusion:content'
import * as React from 'react'

type DataCallProps = {
  name: string
  phone: string
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
  const { success, error } = result

  React.useEffect(() => {
    const msgError =
      'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.'

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
          setShowError(msgError)
        }
        setLoading(false)
      } else {
        setShowError(msgError)
        setLoading(false)
      }
    }
    if (error) {
      setLoading(false)
    }
  }, [success, error])

  return (
    <div className="msg-confirmation">
      {loading ? (
        <div className="loading-call">
          <div />
          <div />
          <div />
          <div />
        </div>
      ) : (
        <>
          {showSuccess && (
            <>
              <h3 className="title-success">
                Tus datos han sido enviados correctamente - Orden: {showSuccess}
              </h3>
              <p>Uno de nuestros ejecutivos se pondrá en contacto contigo.</p>
              <p className="note-schedule">
                Horario de atención es de L-V: 9AM a 8PM y S: 9AM a 1PM
              </p>
            </>
          )}
          {(error || showError) && (
            <>
              <h3>Oh, oh, algo salió mal</h3>
              <p>{error || showError}</p>
            </>
          )}
        </>
      )}
    </div>
  )
}
