import React from 'react'

import { Back } from '../../../signwall/_children/icons'

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
  padding: '10px 10px',
  margin: '0 auto',
  display: 'inline-grid',
  maxWidth: '200px',
}

const styles5 = {
  height: '50px',
  padding: '10px 10px',
  margin: '0 auto',
  display: 'inline-grid',
  maxWidth: '160px',
}

export default function Header({
  arcSite,
  mainColorBg,
  mainColorTxt,
  buttonBack,
}) {
  return (
    <div style={{ background: mainColorBg }}>
      <button type="button" style={styles2} onClick={buttonBack}>
        <Back color={mainColorTxt} />
      </button>
      <div style={styles3}>
        <div style={arcSite === 'elcomercio' ? styles4 : styles5}>
          <img
            alt={`Logo ${arcSite}`}
            src={`https://cdna.elcomercio.pe/resources/dist/${arcSite}/images/${
              arcSite === 'elcomercio' ? '' : 'white-'
            }logo.png?d=1`}
          />
        </div>
      </div>
    </div>
  )
}
