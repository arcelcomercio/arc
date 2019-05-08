import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Heading from './_children/heading'
import Subheading from './_children/subheading'
import Gallery from './_children/gallery'
import Share from './_children/share'
import {
  popUpWindow,
  socialMediaUrlShareList,
} from '../../../../resources/utilsJs/helpers'

const classes = {
  titleAmp: 'amp-header__title',
  datetime: 'amp-header__datetime',
  description: 'amp-header__description',
  share: 'amp-header__share',
  gallery: 'col-3 _gallery--cover',
}
@Consumer
class ArticleHeader extends Component {
  constructor(props) {
    super(props)
    this.firstList = 'firstList'
    this.secondList = 'secondList'
    this.state = {
      currentList: this.firstList,
    }
    const { globalContent } = props
    const {
      post: {
        post_permalink: postPermaLink = 'd',
        post_title: postTitle = 'd',
      } = {},
    } = globalContent || {}
    const urlsShareList = socialMediaUrlShareList(postPermaLink, postTitle)
    this.shareButtons = {
      [this.firstList]: [
        {
          icon:
            'M17.9 14h-3v8H12v-8h-2v-2.9h2V8.7C12 6.8 13.1 5 16 5c1.2 0 2 .1 2 .1v3h-1.8c-1 0-1.2.5-1.2 1.3v1.8h3l-.1 2.8z',
          link: urlsShareList.facebook,
          mobileClass: 'bg-color--blue',
        },

        {
          icon:
            'M21.3 10.5v.5c0 4.7-3.5 10.1-9.9 10.1-2 0-3.8-.6-5.3-1.6.3 0 .6.1.8.1 1.6 0 3.1-.6 4.3-1.5-1.5 0-2.8-1-3.3-2.4.2 0 .4.1.7.1l.9-.1c-1.6-.3-2.8-1.8-2.8-3.5.5.3 1 .4 1.6.4-.9-.6-1.6-1.7-1.6-2.9 0-.6.2-1.3.5-1.8 1.7 2.1 4.3 3.6 7.2 3.7-.1-.3-.1-.5-.1-.8 0-2 1.6-3.5 3.5-3.5 1 0 1.9.4 2.5 1.1.8-.1 1.5-.4 2.2-.8-.3.8-.8 1.5-1.5 1.9.7-.1 1.4-.3 2-.5-.4.4-1 1-1.7 1.5z',
          link: urlsShareList.twitter,
          mobileClass: 'bg-color--lightblue1',
        },
        {
          icon:
            'M186.4 142.4c0 19-15.3 34.5-34.2 34.5-18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5 18.9 0 34.2 15.5 34.2 34.5zm-5 58.9h-57.8v186.8h57.8V201.3zm92.4 0h-55.4v186.8h55.4v-98c0-26.3 12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9v98H398V269.8c0-50-28.3-74.2-68-74.2-39.6 0-56.3 30.9-56.3 30.9v-25.2h.1z',
          link: urlsShareList.linkedin,
          mobileClass: 'bg-color--navy-blue',
        },
        {
          icon:
            'M22.09 7.87c-1.88-1.88-4.38-2.92-7.05-2.92-5.49 0-9.96 4.47-9.96 9.96 0 1.75.46 3.47 1.33 4.98L5 25.04l5.28-1.38c1.45.79 3.09 1.21 4.76 1.21 5.49 0 9.96-4.47 9.96-9.96 0-2.65-1.03-5.15-2.91-7.04m-7.05 15.32c-1.49 0-2.95-.4-4.22-1.15l-.3-.18-3.13.82.84-3.05-.2-.31C7.2 18 6.76 16.47 6.77 14.91c0-4.56 3.71-8.27 8.28-8.27 2.21 0 4.29.86 5.85 2.43 1.56 1.56 2.42 3.64 2.42 5.85 0 4.56-3.72 8.27-8.28 8.27m4.54-6.2c-.25-.12-1.47-.73-1.7-.81s-.39-.12-.56.12c-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.57.12.17 1.75 2.68 4.25 3.76.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18s.21-1.08.14-1.18c-.06-.08-.23-.14-.48-.27',
          link: urlsShareList.whatsapp,
          mobileClass: 'bg-color--green',
        },
      ],
    }
  }

  handleMoreButton = () => {
    const { currentList } = this.state
    const newList =
      currentList === this.firstList ? this.secondList : this.firstList
    this.setState({ currentList: newList })
  }

  openLink = (event, item, print) => {
    event.preventDefault()
    if (print) window.print()
    else popUpWindow(item.link, '', 600, 400)
  }

  render() {
    const { currentList } = this.state
    const { globalContent } = this.props
    const {
      website_url: baseUrl = '',
      headlines: titleElements = '',
      subheadlines: subtitle = '',
      promo_items: galleryItems = {},
    } = globalContent || {}

    return (
      <Fragment>
        <div
          className={
            galleryItems &&
            galleryItems.basic_gallery &&
            typeof galleryItems.basic_gallery.content_elements !== 'undefined'
              ? classes.gallery
              : classes.news
          }>
          <header>
            {titleElements && (
              <h1 className={classes.titleAmp}> {titleElements.basic}</h1>
            )}
            <time
              datetime="2019-05-07T20:11:26-05:00"
              className={classes.datetime}>
              Martes 07 de mayo del 2019, 20:11
            </time>
          </header>

          {subtitle && subtitle.basic && (
            <div className={classes.description}> {subtitle.basic}</div>
          )}
          <ul className="amp-header__list flex">
            {this.shareButtons[currentList].map((item, i) => (
              <li className={`amp-header__item ${item.mobileClass}`}>
                <a
                  className="amp-header__link flex-center-vertical flex--justify-center"
                  href={item.link}
                  onClick={event => {
                    const isPrint = i === 2 && currentList === this.secondList
                    this.openLink(event, item, isPrint)
                  }}>
                  <svg width="32" height="32" viewbox="-2 -2 32 32">
                    <path className={classes.share} d={item.icon} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          {galleryItems &&
          galleryItems.basic_gallery &&
          typeof galleryItems.basic_gallery.content_elements !== 'undefined' ? (
            <Gallery data={galleryItems && galleryItems.basic_gallery} />
          ) : (
            ''
          )}
        </div>
      </Fragment>
    )
  }
}

ArticleHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  globalContent: PropTypes.object,
}

export default ArticleHeader
