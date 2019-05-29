import Consumer from 'fusion:consumer'
import React, { PureComponent, Fragment } from 'react'
import { popUpWindow } from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  news: 'article-body__icon-list',
  list: 'article-body__list',
  item: 'article-body__item',
  link: 'article-body__link',
}
@Consumer
class ArticleBodyChildIcon extends PureComponent {
  constructor(props) {
    super(props)
    this.firstList = 'firstList'
    this.secondList = 'secondList'
    this.state = {
      currentList: this.firstList,
    }

    this.shareButtons = {
      [this.firstList]: [
        {
          icon: 'icon-print',
          link: '',
          mobileClass: '',
        },

        {
          icon: 'icon-message',
          link: '',
          mobileClass: '',
        },
        {
          icon: 'icon-link',
          link: '',
          mobileClass: '',
        },
        {
          icon: 'icon-zoom',
          link: '',
          mobileClass: '',
        },
      ],
    }
  }

  openLink = (event, item, print) => {
    event.preventDefault()
    if (print) window.print()
    else popUpWindow(item.link, '', 600, 400)
  }

  render() {
    const { currentList } = this.state

    return (
      <Fragment>
        <div className={classes.news}>
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

export default ArticleBodyChildIcon
