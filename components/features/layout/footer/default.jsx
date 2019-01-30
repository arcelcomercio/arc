/*  /components/features/movies/movie-list.jsx  */

import './style.scss'

import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

@Consumer
class Footer extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { background, img, info, menus, titleColor } = this.props.siteProperties.footer
    const styles = {
      container: {
        backgroundColor: background
      },
      titleColor: {
        color: titleColor,
        fontWeight: 'bold'
      }
    }
    return (
      <div>
        <div className="home-footer-top" style={styles.container}>
          <div className="home-footer-col">
            <a href="" className="site-logo">
              <img src={img} alt="" />
            </a>
            <ul className="site-legal">
              {info.map(el => <li>{el}</li>)}
            </ul>
          </div>
          {menus.map((el, keyID) => {
            return (
              <div className="home-footer-col">
                <ul>
                  <li key={keyID}>
                    <a  style={styles.titleColor} href="">{el.title}</a>
                  </li>
                  {el.list.map((e, key) =>
                    <li key={key}>
                      <a href="">{e.name}</a>
                    </li>
                  )}
                </ul>
              </div>
            )
          })}

        </div>
        <div className="home-footer-bot"></div>
      </div>
    )
  }
}

export default Footer


