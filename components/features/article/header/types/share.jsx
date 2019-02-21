import React, { Component, Fragment } from "react";
import Consumer from "fusion:consumer";
import { FormatClassName } from '../../../../../resources/utilsJs/utilities';

import {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    EmailShareButton,
} from 'react-share';


const classes = FormatClassName({
    share: [
        'share-news'
    ],
    shareListItem: [],
    shareItemFb: [
        'share-news__list-items__item',
        'share-news__list-items__item--face'
    ],
    shareItemTw: [
        'share-news__list-items__item',
        'share-news__list-items__item--tw'
    ],
    shareItemLinkedIn: [
        'share-news__list-items__item',
        'share-news__list-items__item--linkedin'
    ],

    shareItemWs: [
        'share-news__list-items__item',
        'hide'
    ],
    shareItemGplus: [
        'share-news__list-items__item',
        'share-news__list-items__item--gplus'
    ],
    shareItemOtherItems: [
        'share-news__list-items__item',
        'share-news__list-items__item--other-items',
        'hide'
    ],
    shareItemShowMore: [
        'share-news__list-items__item',
        'share-news__list-items__item--show-more'
    ],
    shareItemLink: [
        'share-news__list-items__item__link'
    ],
    shareBtnLess: [
        'less'
    ],
    shareBtnMore: [
        'more'
    ]
});

@Consumer
class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareMas: ""
        };

    }
    handleOnclickMas = () => {
        this.setState({
            shareMas: " share-news__list-items__item--active"
        });
    };
    handleOnclickckClose = () => {
        this.setState({
            shareMas: ""
        });
    };
    render() {
        const { url, title } = this.props;
        //console.log(url);     debugger;
        const inUrl = "http://www.linkedin.com/shareArticle?url=" + url;
        const twUrl = url + title;
        const fbUrl = "http://www.facebook.com/sharer.php?u=" + url;
        const waUrl = "whatsapp://send?text=" + (title) ? 'title.basic' : '' + url;
        const gpUrl = "https://plus.google.com/share?url=" + url;
        return (

            <Fragment>
                <div className={styles.share + this.state.shareMas}>
                    <div className={styles.shareListItem} >
                        <FacebookShareButton className={styles.shareItemFb} url={fbUrl} >
                            <i className="icon-fb"> </i><span>Compartir </span>
                        </FacebookShareButton>
                        <TwitterShareButton className={styles.shareItemTw} url={twUrl}>
                            <i className="icon-tw"></i> <span>Compartir</span>
                        </TwitterShareButton>
                        <LinkedinShareButton url={inUrl} className={styles.shareItemLinkedIn}>
                            <i className="icon-in"> </i>
                            <span>Compartir </span>
                        </LinkedinShareButton>
                        <div className={styles.shareItemOtherItems + this.state.shareMas}>
                            <GooglePlusShareButton url={gpUrl} className={styles.shareItemLinkedIn}>
                                <i className="icon-in"> </i>
                                <span>Compartir </span>
                            </GooglePlusShareButton>
                            <PinterestShareButton url={url} className={styles.shareItemLinkedIn}>
                                <i className="icon-in"> </i>
                                <span>Compartir </span>
                            </PinterestShareButton>

                            <EmailShareButton url={inUrl} className={styles.shareItemLinkedIn}>
                                <i className="icon-in"> </i>
                                <span>Compartir </span>
                            </EmailShareButton>
                        </div>
                        <div className={styles.shareItemShowMore}>
                            <span className={styles.shareBtnMore} onClick={this.handleOnclickMas}>+</span>
                            <span className={styles.shareBtnLess} onClick={this.handleOnclickckClose}>- </span>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default Share;
