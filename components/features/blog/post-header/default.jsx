import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

@Consumer
class BlogPostHeader extends PureComponent {
  constructor(...props) {
    super(...props)
    this.state = {
      currentList: 'firstList',
    }

    this.shareButtons = {
      firstList: [
        {
          icon: 'L',
          link: '',
        },
        {
          icon: 'F',
          link: '',
        },
        {
          icon: 'W',
          link: '',
        },
      ],
      secondList: [
        {
          icon: 'P',
          link: '',
        },
        {
          icon: 'T',
          link: '',
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
    const newList = currentList === 'firstList' ? 'secondList' : 'firstList'
    this.setState({ currentList: newList })
  }

  render() {
    const { currentList } = this.state
    return (
      <div className="post-header padding-normal">
        <h1 className="post-header__title">No nos distraigas mucho, Alan...</h1>
        <ul className="post-header__list flex">
          {this.shareButtons[currentList].map((item, i) => (
            <li className="post-header__item">
              <a
                className="post-header__link flex-center-vertical flex--justify-center"
                href="/#">
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
