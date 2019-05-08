import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  // PinterestShareButton,
  EmailShareButton,
} from 'react-share'

const classes = {
  share: 'article-header__share-news',
  shareListItem: '',
  shareItemFb:
    'article-header__list-items__item article-header__list-items__item--face',
  shareItemTw:
    'article-header__list-items__item article-header__list-items__item--tw',
  shareItemLinkedIn:
    'article-header__list-items__item    article-header__list-items__item--linkedin',
  shareItemWs: 'article-header__list-items__item hide',
  shareItemGplus:
    'article-header__list-items__item article-header__list-items__item--gplus',
  shareItemOtherItems:
    'article-header__list-items__item article-header__list-items__item--other-items   hide',
  shareItemShowMore:
    'article-header__list-items__item article-header__list-items__item--show-more',
  shareItemLink: 'article-header__list-items__item__link',
  shareBtnLess: 'less',
  shareBtnMore: 'more',
}

@Consumer
class ArticleHeaderChildSocial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shareMas: '',
    }
  }

  handleOnclickMas = () => {
    this.setState({
      shareMas: ' article-header__list-items__item--active',
    })
  }

  handleOnclickckClose = () => {
    this.setState({
      shareMas: '',
    })
  }

  render() {
    const { url = '', title = '' } = this.props
    // console.log(url);     debugger;
    const inUrl = `http://www.linkedin.com/shareArticle?url=${url}`
    const twUrl = url + title
    const fbUrl = `http://www.facebook.com/sharer.php?u=${url}`
    // const waUrl = 'whatsapp://send?text=' + title ? 'title.basic' : '' + url
    const gpUrl = `https://plus.google.com/share?url=${url}`
    const { shareMas } = this.state
    return (
      <div className={classes.share + shareMas}>
        <div className={classes.shareListItem}>
          <FacebookShareButton className={classes.shareItemFb} url={fbUrl}>
            <i className="icon-fb" />
            <span>Compartir </span>
          </FacebookShareButton>
          <TwitterShareButton className={classes.shareItemTw} url={twUrl}>
            <i className="icon-tw" /> <span>Compartir</span>
          </TwitterShareButton>
          <LinkedinShareButton
            url={inUrl}
            className={classes.shareItemLinkedIn}>
            <i className="icon-in" />
            <span>Compartir </span>
          </LinkedinShareButton>
          <div className={classes.shareItemOtherItems + shareMas}>
            <GooglePlusShareButton
              url={gpUrl}
              className={classes.shareItemLinkedIn}>
              <i className="icon-in" />
              <span>Compartir </span>
            </GooglePlusShareButton>
            <EmailShareButton url={inUrl} className={classes.shareItemLinkedIn}>
              <i className="icon-in" />
              <span>Compartir </span>
            </EmailShareButton>
          </div>
          <div className={classes.shareItemShowMore}>
            <span
              className={classes.shareBtnMore}
              onClick={this.handleOnclickMas}
              role="button"
              onKeyPress={this.handleOnclickMas}
              tabIndex={0}>
              +
            </span>
            <span
              className={classes.shareBtnLess}
              onClick={this.handleOnclickckClose}
              role="button"
              onKeyPress={this.handleOnclickckClose}
              tabIndex={-1}>
              -{' '}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
export default ArticleHeaderChildSocial
