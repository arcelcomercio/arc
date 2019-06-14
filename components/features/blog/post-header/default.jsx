import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import {
  popUpWindow,
  socialMediaUrlShareList,
} from '../../../utilities/helpers'

const classes = {
  header: 'post-header p-20',
  title:
    'post-header__title primary-font font-thin mb-25 title-md text-gray-300 line-h-xs',
  list: 'post-header__list flex',
  link: 'post-header__link flex items-center justify-center w-full h-full',
  item: 'post-header__item flex-grow',
  share: 'post-header__share hidden ml-10 text-sm',
  more: 'post-header__more',
  button:
    'post-header__button flex items-center justify-center w-full h-full text-white',
}
@Consumer
class BlogPostHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.firstList = 'firstList'
    this.secondList = 'secondList'
    this.state = {
      currentList: this.firstList,
    }
    const { globalContent, siteUrl } = props
    const {
      post: {
        post_permalink: postPermaLink = '',
        post_title: postTitle = '',
      } = {},
    } = globalContent || {}
    const urlsShareList = socialMediaUrlShareList(
      siteUrl,
      postPermaLink,
      postTitle
    )
    this.shareButtons = {
      [this.firstList]: [
        {
          icon: 'L',
          link: urlsShareList.linkedin,
        },
        {
          icon: 'F',
          link: urlsShareList.facebook,
        },
        {
          icon: 'T',
          link: urlsShareList.twitter,
          mobileClass: 'no-mobile',
        },
        {
          icon: 'W',
          link: urlsShareList.whatsapp,
          mobileClass: 'no-desktop',
        },
      ],
      [this.secondList]: [
        {
          icon: 'P',
          link: urlsShareList.pinterest,
        },
        {
          icon: 'T',
          link: urlsShareList.twitter,
          mobileClass: 'no-desktop',
        },
        {
          icon: 'IM',
          link: '',
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
    const { post: { post_title: postTitle } = {} } = globalContent || {}
    return (
      <div className={classes.header}>
        <h1 className={classes.title}>{postTitle}</h1>
        <ul className={classes.list}>
          {this.shareButtons[currentList].map((item, i) => (
            <li className={`${classes.item} ${item.mobileClass || ''}`}>
              <a
                className={classes.link}
                href={item.link}
                onClick={event => {
                  const isPrint = i === 2 && currentList === this.secondList
                  this.openLink(event, item, isPrint)
                }}>
                <i>{item.icon}</i>
                <span className={classes.share}>
                  {i === 2 && currentList === this.secondList
                    ? 'Imprimir'
                    : 'Compartir'}
                </span>
              </a>
            </li>
          ))}

          <li className={classes.more}>
            <button
              className={classes.button}
              type="button"
              onClick={e => this.handleMoreButton(e)}>
              <i>{currentList === this.firstList ? '+' : '-'}</i>
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

BlogPostHeader.label = 'Blog - Cabecera del post'

export default BlogPostHeader
