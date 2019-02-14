import React, { Component, Fragment } from "react";
import renderHTML from 'react-render-html';
import { FormatClassName } from '../../../../../resources/utilsJs/utilities';

const styles = FormatClassName({
    share: [
        'share-news'
    ],
    shareListItem: [ ],
    shareItemLinkedIn: [
        'share-news__list-items__item',
        'share-news__list-items__item--linkedin'
    ],
    shareItemFb: [
        'share-news__list-items__item',
        'share-news__list-items__item--face'
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
        'hide'
    ]
});

const Share = (props) => {
    const {url,  title } = props;
    //console.log(url);     debugger;
    const inUrl ="http://www.linkedin.com/shareArticle?url=" + url;
    const fbUrl ="http://www.facebook.com/sharer.php?u=" + url;
    const waUrl ="whatsapp://send?text=" + ( title )? 'title.basic':'' + url;
    const gpUrl ="https://plus.google.com/share?url=" + url;
    return (
        <Fragment>
            <div className={ styles.share }>
                <div className={ styles.shareListItem }>
                    <div className={ styles.shareItemLinkedIn }>
                        <a href={inUrl} className={ styles.shareItemLink }>
                            <i className="icon-in"></i> <span>Compartir</span>
                        </a>
                    </div>
                    <div className={ styles.shareItemFb }>
                        <a href={fbUrl} className={ styles.shareItemLink }>
                            <i className="icon-fb"> </i><span>Compartir </span></a>
                    </div>
                    <div className={ styles.shareItemWs }>
                        <a href={waUrl} className={ styles.shareItemLink }>
                            <i className="icon-wa"> </i>
                        </a>
                    </div>
                    <div className={ styles.shareItemGplus }>
                        <a href={gpUrl} className={ styles.shareItemLink }><i className="icon-gp"> </i>
                            <span>Compartir </span>
                        </a>
                    </div>
                    <div className={ styles.shareItemOtherItems }>
                        <a href="//pinterest.com/pin/create/button/?url=&amp;description=Las%20siete%20licencias%20laborales%20remuneradas%20a%20las%20que%20puede%20acceder%20un%20trabajador%20en%20Per%C3%BA" className="share-link link-pin"><i className="icon-pin"> </i><span>Compartir </span></a> <a href="https://twitter.com/intent/tweet?original_referer=amp;tw_p=tweetbutton&amp;text=Las%20siete%20licencias%20laborales%20remuneradas%20a%20las%20que%20puede%20acceder%20un%20trabajador%20en%20Per%C3%BA&amp;url=https://gestion.pe/fotogalerias/siete-licencias-laborales-remuneradas-acceder-trabajador-peru-257914&amp;via=Gestionpe" className="share-link link-tw">
                            <i className="icon-tw"> </i><span>Compartir </span></a>
                        <a  className={ styles.shareItemLink }><i className="icon-print"> </i><span>Imprimir </span></a>
                    </div>
                    <div className={ styles.shareItemShowMore }>
                        <a href="#"  className="link-show-more ui-toggle" id="">
                            <span className="more">+</span><span className={ styles.shareBtnLess }>- </span>
                        </a>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Share;



