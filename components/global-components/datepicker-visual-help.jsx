import React from 'react'

export default function DatepickerVisualHelp({
  note1,
  note2,
  note3,
  date1,
  date2,
  date3,
}) {
  const containerStyle = {
    backgroundColor: '#5d7dfa',
    color: '#fff',
    position: 'fixed',
    width: '100vw',
    top: '0',
    left: '0',
    zIndex: '9999999999',
  }

  const itemStyle = {
    padding: '10px',
    border: '1px solid #fff',
    margin: '10px',
  }

  const itemSpanStyle = {
    marginRight: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  }

  return (
    <div style={containerStyle}>
      <div style={{ padding: '10px', fontWeight: 'bold', fontSize: '18px' }}>
        Notas programadas{' '}
        <span style={{ fontWeight: 'normal', fontSize: '16px' }}>
          (Formato: Día/Mes/Año)
        </span>
      </div>

      {!note1 && !note2 && !note3 ? (
        <div style={itemStyle}>
          No tiene notas programadas para este destaque
        </div>
      ) : null}

      {note1 ? (
        <div style={itemStyle}>
          Nota 1:{' '}
          <span style={itemSpanStyle}>
            {new Date(date1).toLocaleString('en-GB')}
          </span>{' '}
          <span style={{ fontSize: '13px', color: '#e2e2e2' }}>
            URL: {note1}
          </span>
        </div>
      ) : null}
      {note2 ? (
        <div style={itemStyle}>
          Nota 2:{' '}
          <span style={itemSpanStyle}>
            {new Date(date2).toLocaleString('en-GB')}
          </span>{' '}
          <span style={{ fontSize: '13px', color: '#e2e2e2' }}>
            URL: {note2}
          </span>
        </div>
      ) : null}
      {note3 ? (
        <div style={itemStyle}>
          Nota 3:{' '}
          <span style={itemSpanStyle}>
            {new Date(date3).toLocaleString('en-GB')}
          </span>{' '}
          <span style={{ fontSize: '13px', color: '#e2e2e2' }}>
            URL: {note3}
          </span>
        </div>
      ) : null}
    </div>
  )
}
