import { useContext, useState } from 'react'
import { AppContext } from '../../context/app-context'

export const Intertitle = () => {
  const { sendData, page, data, handleDataChange } = useContext(AppContext)

  return (
    <div className="p-5">
      {page !== 'view' && (
        <>
          <div>
            <form>
              <div className="mb-3">
                <label className="form-label">Intertítulo:</label>
                <input
                  type="text"
                  className="form-control"
                  value={data?.text || ''}
                  onChange={(event) => {
                    handleDataChange({ ...data, text: event.target.value })
                  }}
                />
              </div>
            </form>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => sendData()}>
              Guardar
            </button>
          </div>
          <h5 className="mt-5">Previsualización:</h5>
        </>
      )}

      <div>
        <h2
          style={{
            textAlign: 'center',
            font: 'normal normal 900 32px/40px Noto Serif KR',
            letterSpacing: '-0.64px',
          }}>
          {data?.text}
        </h2>
      </div>
    </div>
  )
}
