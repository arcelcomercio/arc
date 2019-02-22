// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import { FormatClassName } from '../../../resources/utilsJs/utilities'

const classes = FormatClassName({
  footer: ['footer-container'],
  footerInfo: ['footer-container__info'],
  footerSections: ['footer-container__sections'],
  footerContact: ['footer-container__contact'],
  footerSites: ['footer-container__sites'],
})

@Consumer
class PieDePagina extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.fetch();
  }

  fetch() {
    const { fetched } = this.getContent()
    fetched.then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <footer className={classes.footer}>
        <div className={classes.footerInfo}>1</div>
        <div className={classes.footerSections}>2</div>
        <div className={classes.footerContact}>3</div>
        <div className={classes.footerSites}>4</div>
      </footer>
    )
  }
}

export default PieDePagina
