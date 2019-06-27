import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import {
  popUpWindow,
  socialMediaUrlShareList,
} from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  news:
    'story-header__share flex items-center justify-between mb-20 p-20 border-b-1 border-t-1 border-solid border-gray',
  breadcrumb: '',
  item: 'story-header__item',
  category: 'text-gray-300 text-xl uppercase',
  link: 'story-header__link flex items-center justify-center text-gray-200',
  icon: 'story-header__icon title-xl',
  list: 'story-header__list flex justify-between',
}
@Consumer
class StoryHeaderChildSocial extends PureComponent {
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
          mobileClass: 'flex justify-center',
        },

        {
          icon: 'icon-twitter',
          link: urlsShareList.twitter,
          mobileClass: 'flex justify-center',
        },
        {
          icon: 'icon-linkedin-circle',
          link: urlsShareList.linkedin,
          mobileClass: 'flex justify-center',
        },
        {
          icon: 'icon-ribbon',
          link: urlsShareList.pin,
          mobileClass: 'block md:hidden flex justify-center',
        },
      ],
    }
  }

  getSeccionPrimary = dataStory => {
    return dataStory.taxonomy
      ? dataStory.taxonomy.primary_section
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

export default StoryHeaderChildSocial
