import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

@Consumer
class BlogPostHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentList: 'firstList',
    }
    const { globalContent } = props
    const { post: { post_permalink: postPermaLink = '' } = {} } =
      globalContent || {}
    this.shareButtons = {
      firstList: [
        {
          icon: 'L',
          link: `http://www.linkedin.com/shareArticle?url=http://gestion.pe/blog/${postPermaLink}`,
        },
        {
          icon: 'F',
          link: `http://www.facebook.com/sharer.php?u=http://gestion.pe/blog/${postPermaLink}`,
        },
        {
          icon: 'T',
          link: `http://twitter.com/home?status=La%20Autoeficacia%20Emprendedora%20II+http://gestion.pe/blog/${postPermaLink}+via%20@Gestionpe`,
          mobileClass: 'no-mobile',
        },
        {
          icon: 'W',
          link: `whatsapp://send?text=http://gestion.pe/blog/${postPermaLink}`,
          mobileClass: 'no-desktop',
        },
      ],
      secondList: [
        {
          icon: 'P',
          link: `https://pinterest.com/pin/create/button/?url=http://gestion.pe/blog/${postPermaLink}`,
        },
        {
          icon: 'T',
          link: `http://twitter.com/home?status=La%20Autoeficacia%20Emprendedora%20II+http://gestion.pe/blog/${postPermaLink}+via%20@Gestionpe`,
          mobileClass: 'no-desktop',
        },
        {
          icon: 'IM',
          link: '',
        },
      ],
    }
  }

  popUpWindow = (url, title, w, h) => {
    const left = window.screen.width / 2 - w / 2
    const top = window.screen.height / 2 - h / 2
    return window.open(
      url,
      title,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    )
  }

  handleMoreButton = () => {
    const { currentList } = this.state
    const newList = currentList === 'firstList' ? 'secondList' : 'firstList'
    this.setState({ currentList: newList })
  }

  openLink = (event, item, print) => {
    event.preventDefault()
    if (print) window.print()
    else this.popUpWindow(item.link, '', 600, 400)
  }

  render() {
    const { currentList } = this.state
    const { globalContent } = this.props
    const { post: { post_title: postTitle } = {} } = globalContent || {}
    return (
      <div className="post-header padding-normal">
        <h1 className="post-header__title">{postTitle}</h1>
        <ul className="post-header__list flex">
          {this.shareButtons[currentList].map((item, i) => (
            <li className={`post-header__item ${item.mobileClass}`}>
              <a
                className="post-header__link flex-center-vertical flex--justify-center"
                href={item.link}
                onClick={event => {
                  if (i === 2 && currentList === 'secondList')
                    this.openLink(event, item, true)
                  else this.openLink(event, item, false)
                }}>
                <i>{item.icon}</i>
                <span className="post-header__share">
                  {i === 2 && currentList === 'secondList'
                    ? 'Imprimir'
                    : 'Compartir'}
                </span>
              </a>
            </li>
          ))}

          <li className="post-header__more">
            <button
              className="post-header__button flex-center-vertical flex--justify-center"
              type="button"
              onClick={e => this.handleMoreButton(e)}>
              <i>{currentList === 'firstList' ? '+' : '-'}</i>
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

BlogPostHeader.label = 'Blog - Cabecera del post'

export default BlogPostHeader
