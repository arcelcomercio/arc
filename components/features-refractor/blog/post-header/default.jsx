import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import {
  popUpWindow,
  socialMediaUrlShareList,
} from '../../../utilities/helpers'

const classes = {
  header: 'post-header',
  pdnormal: 'padding-normal',
  headertitle: 'post-header__title',
  headerlist: 'post-header__list',
  flex: 'flex',
  headerlink: 'post-header__link',
  flexcentervertical: 'flex-center-vertical',
  flexjustifycenter: 'flex--justify-center',
  headeritem: 'post-header__item',
  headershare: 'post-header__share',
  headermore: 'post-header__more',
  headerbutton: 'post-header__button',
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
    const { globalContent } = props
    const {
      post: {
        post_permalink: postPermaLink = '',
        post_title: postTitle = '',
      } = {},
    } = globalContent || {}
    const urlsShareList = socialMediaUrlShareList(postPermaLink, postTitle)
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
      <div className={`${classes.header} ${classes.pdnormal}`}>
        <h1 className={classes.headertitle}>{postTitle}</h1>
        <ul className={`${classes.headerlist} ${classes.flex}`}>
          {this.shareButtons[currentList].map((item, i) => (
            <li className={`${classes.headeritem} ${item.mobileClass}`}>
              <a
                className={`${classes.headerlink} ${
                  classes.flexcentervertical
                } ${classes.flexjustifycenter}`}
                href={item.link}
                onClick={event => {
                  const isPrint = i === 2 && currentList === this.secondList
                  this.openLink(event, item, isPrint)
                }}>
                <i>{item.icon}</i>
                <span className={classes.headershare}>
                  {i === 2 && currentList === this.secondList
                    ? 'Imprimir'
                    : 'Compartir'}
                </span>
              </a>
            </li>
          ))}

          <li className={classes.headermore}>
            <button
              className={`${classes.headerbutton} ${
                classes.flexcentervertical
              } ${classes.flexjustifycenter}`}
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
