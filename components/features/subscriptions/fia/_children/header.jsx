import React from 'react'

// const styles1 = {
//   background: '#f7c600',
//   color: '#000000',
//   position: 'relative',
//   width: '100%',
//   display: 'block',
//   margin: '0 auto',
//   height: '50px',
//   boxSizing: 'border-box',
// }

const styles2 = {
  background: 'transparent',
  border: '0px',
  color: '#000000',
  width: '25%',
  cursor: 'pointer',
  height: '50px',
  lineHeight: '20px',
  display: 'inline-block',
  verticalAlign: 'top',
  padding: '0 0 0 15px',
  margin: '0',
  textAlign: 'left',
}

const styles3 = {
  width: '50%',
  display: 'inline-block',
  textAlign: 'center',
  height: '50px',
  lineHeight: '65px',
}

const styles4 = {
  height: '50px',
  padding: '5px 10px',
  margin: '0 auto',
  display: 'inline-grid',
}

export default function Header({ arcSite, mainColorBg, buttonBack }) {
  return (
    <div style={{ background: mainColorBg }}>
      <button type="button" style={styles2} onClick={buttonBack}>
        <svg
          width="20"
          height="20"
          style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <path
            fill={arcSite === 'elcomercio' ? '#000000' : '#ffffff'}
            d="M20 8.8H4.7l7-7L10 0 0 10l10 10 1.8-1.8-7-7H20V8.8z"
            fillRule="evenodd"></path>
        </svg>
      </button>
      <div style={styles3}>
        <div style={styles4}>
          <img
            alt="Logo elcomercio"
            src={`https://cdna.elcomercio.pe/resources/dist/${arcSite}/images/${
              arcSite === 'elcomercio' ? '' : 'white-'
            }logo.png?d=1`}
          />
        </div>
      </div>
    </div>
  )
}
