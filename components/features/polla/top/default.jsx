/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import customFields from './_dependencies/custom-fields'

const TopHeader = props => {
  const {
    customFields: {
      logoSmall = 'https://cdna.trome.pe/resources/dist/trome/polla/logo-trome.png',
    } = {},
  } = props

  return (
    <div className="site-options">
      <div className="box-content clearfix">
        <div className="site-edition">
          <a href="https://trome.pe">
            <img src={logoSmall} alt="Trome" />
          </a>
        </div>
        <div className="box-right clearfix">
          <div className="site-social">
            <ul className="social-items">
              <li className="social-item social-title">Sigue a Trome en:</li>
              <li className="social-item">
                <a
                  href="https://www.facebook.com/Tromepe"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link link-fb">
                  <i className="icon-fb"></i>
                </a>
              </li>
              <li className="social-item">
                <a
                  href="https://twitter.com/tromepe"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link link-tw">
                  <i className="icon-tw"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="site-search">
            <a
              href=""
              data-target="#search-content"
              className="search-link ui-toggle">
              <i className="icon-search"></i>
              <i className="icon-close"></i>
            </a>
            <div id="search-content" className="search-content"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

TopHeader.propTypes = {
  customFields,
}

TopHeader.label = 'La Polla - Top Header'
TopHeader.static = false

export default TopHeader
