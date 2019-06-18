import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { popUpWindow } from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  news: 'story-content__icon-list md:block md:pt-20 md:pb-0 md:pr-20 md:pl-20 hidden',
  list: 'story-content__list',
  item: 'story-content__item mb-20',
  link: 'story-content__link text-gray-200',
}
@Consumer
class StoryContentChildIcon extends PureComponent {
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
          icon: 'icon-print story-content__icon title-xl',
          link: '',
          mobileClass: '',
        },

        {
          icon: 'icon-message story-content__icon title-xl',
          link: '',
          mobileClass: '',
        },
        {
          icon: 'icon-link story-content__icon title-xl',
          link: '',
          mobileClass: '',
        },
        {
          icon: 'icon-zoom story-content__icon title-xl',
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
      <>
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
      </>
    )
  }
}

export default StoryContentChildIcon
