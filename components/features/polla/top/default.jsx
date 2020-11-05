/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const TopHeader = () => {
  const logoSmall = 'https://jab.pe/polla/logo-trome-small.png'

  return (
    <div className="site-options">
      <div className="box-content clearfix">
        <div className="site-edition">
          <img src={logoSmall} alt="" />
        </div>
        <div className="box-right clearfix">
          <div className="site-social">
            <ul className="social-items">
              <li className="social-item social-title">Sigue a Depor en:</li>
              <li className="social-item">
                <a href="" className="social-link link-fb">
                  <i className="icon-fb"></i>
                </a>
              </li>
              <li className="social-item">
                <a href="" className="social-link link-tw">
                  <i className="icon-tw"></i>
                </a>
              </li>
              <li className="social-item">
                <a href="" className="social-link link-gp">
                  <i className="icon-gp"></i>
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
            <div id="search-content" className="search-content">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

TopHeader.label = 'La Polla - Top Header'
TopHeader.static = false

export default TopHeader
