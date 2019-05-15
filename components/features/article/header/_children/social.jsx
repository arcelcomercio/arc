import Consumer from 'fusion:consumer'
import React, { PureComponent, Fragment } from 'react'
import {
  popUpWindow,
  socialMediaUrlShareList,
} from '../../../../utilities/helpers'

const classes = {
  news: 'article-header_share',
  breadcrumb: 'article-header__breadcrumb',
  item: 'article-header--item',
  link: 'article-header__link flex-center-vertical flex--justify-center',
  list: 'article-header__list flex',
}
@Consumer
class ArticleHeaderChildSocial extends PureComponent {
  constructor(props) {
    super(props)
    this.firstList = 'firstList'
    this.secondList = 'secondList'
    this.state = {
      currentList: this.firstList,
    }
    const {
      globalContent: {
        website_url: postPermaLink,
        headlines: { basic: postTitle } = {},
      },
    } = props
    const urlsShareList = socialMediaUrlShareList(postPermaLink, postTitle)
    this.shareButtons = {
      [this.firstList]: [
        {
          icon: 'fb',
          link: urlsShareList.facebook,
          mobileClass: 'bg-color--blue',
        },

        {
          icon: 'tw',
          link: urlsShareList.twitter,
          mobileClass: 'bg-color--lightblue1',
        },
        {
          icon: 'in',
          link: urlsShareList.linkedin,
          mobileClass: 'bg-color--navy-blue',
        },
        {
          icon: 'icon-pin',
          link: urlsShareList.pin,
          mobileClass: 'bg-color--green',
        },
      ],
    }
  }

  getSeccionPrimary = dataArticle => {
    return dataArticle.taxonomy
      ? dataArticle.taxonomy.primary_section
      : { name: '', section: '' }
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
    const {
      arcSite,
      globalContent: {
        taxonomy: {
          primary_section: { name },
        },
      } = {},
    } = this.props

    return (
      <Fragment>
        <div className={classes.news}>
          <div className={classes.description}> {name}</div>
          <ul className={classes.list}>
            {this.shareButtons[currentList].map((item, i) => (
              <li className={`article-header__item ${item.mobileClass}`}>
                <a
                  className={classes.link}
                  href={item.link}
                  onClick={event => {
                    const isPrint = i === 2 && currentList === this.secondList
                    this.openLink(event, item, isPrint)
                  }}>
                  <i className={item.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default ArticleHeaderChildSocial
