import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import {
  popUpWindow,
  socialMediaUrlShareList,
} from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  news:
    'article-header__share flex-center-vertical flex--justify-between mg-bottom-20',
  breadcrumb: '',
  item: 'article-header__item',
  category: 'text-uppercase',
  link: 'article-header__link flex-center',
  icon: 'article-header__icon',
  list: 'article-header__list flex flex--justify-between',
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
      siteProperties: {
        social: {
          twitter: { user: siteNameRedSocial },
        },
        siteUrl,
      },
      globalContent: {
        website_url: postPermaLink,
        headlines: { basic: postTitle } = {},
      },
    } = props

    const urlsShareList = socialMediaUrlShareList(
      siteUrl,
      postPermaLink,
      postTitle,
      siteNameRedSocial
    )
    this.shareButtons = {
      [this.firstList]: [
        {
          icon: 'icon-facebook',
          link: urlsShareList.facebook,
          mobileClass: 'flex flex--justify-center',
        },

        {
          icon: 'icon-twitter',
          link: urlsShareList.twitter,
          mobileClass: 'flex flex--justify-center',
        },
        {
          icon: 'icon-linkedin-circle',
          link: urlsShareList.linkedin,
          mobileClass: 'flex flex--justify-center',
        },
        {
          icon: 'icon-ribbon',
          link: urlsShareList.pin,
          mobileClass: 'flex flex--justify-center',
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
      globalContent: { taxonomy: { primary_section: { name } = {} } } = {},
    } = this.props

    return (
      <>
        <div className={classes.news}>
          <div className={classes.category}> {name}</div>
          <ul className={classes.list}>
            {this.shareButtons[currentList].map((item, i) => (
              <li
                key={UtilListKey(i)}
                className={` ${classes.item} ${item.mobileClass}`}>
                <a
                  className={classes.link}
                  href={item.link}
                  onClick={event => {
                    const isPrint = i === 2 && currentList === this.secondList
                    this.openLink(event, item, isPrint)
                  }}>
                  <i className={`${item.icon} ${classes.icon}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default ArticleHeaderChildSocial
