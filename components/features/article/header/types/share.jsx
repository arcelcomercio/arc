import React, { Component, Fragment } from "react";
import renderHTML from 'react-render-html';


const Share = (props) => {
    const {url,  title } = props;
    //console.log(url);     debugger;
    const inUrl ="http://www.linkedin.com/shareArticle?url=" + url;
    const fbUrl ="http://www.facebook.com/sharer.php?u=" + url;
    const waUrl ="whatsapp://send?text=" + ( title )? 'title.basic':'' + url;
    const gpUrl ="https://plus.google.com/share?url=" + url;
    return (
        <Fragment>
            <div className="share-news">
                <div className="share-items clearfix">
                    <div className="share-item item-in">
                        <a href={inUrl} className="share-link link-in">
                            <i className="icon-in"></i> <span>Compartir</span>
                        </a>
                    </div>
                    <div className="share-item item-fb">
                        <a href={fbUrl} className="share-link link-fb">
                            <i className="icon-fb"> </i><span>Compartir </span></a>
                    </div>
                    <div className="share-item item-wa">
                        <a href={waUrl} className="share-link link-wa">
                            <i className="icon-wa"> </i>
                        </a>
                    </div>
                    <div className="share-item item-gp">
                        <a href={gpUrl} className="share-link link-gp"><i className="icon-gp"> </i>
                            <span>Compartir </span>
                        </a>
                    </div>
                    <div className="share-item other-share-items clearfix">
                        <a href="//pinterest.com/pin/create/button/?url=&amp;description=Las%20siete%20licencias%20laborales%20remuneradas%20a%20las%20que%20puede%20acceder%20un%20trabajador%20en%20Per%C3%BA" className="share-link link-pin"><i className="icon-pin"> </i><span>Compartir </span></a> <a href="https://twitter.com/intent/tweet?original_referer=amp;tw_p=tweetbutton&amp;text=Las%20siete%20licencias%20laborales%20remuneradas%20a%20las%20que%20puede%20acceder%20un%20trabajador%20en%20Per%C3%BA&amp;url=https://gestion.pe/fotogalerias/siete-licencias-laborales-remuneradas-acceder-trabajador-peru-257914&amp;via=Gestionpe" className="share-link link-tw">
                            <i className="icon-tw"> </i><span>Compartir </span></a>
                        <a  className="share-link link-print"><i className="icon-print"> </i><span>Imprimir </span>
                        </a>
                    </div>
                    <div className="share-item show-more">
                        <a href="#"  className="link-show-more ui-toggle" id="">
                            <span className="more">+</span><span className="less">- </span>
                        </a>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Share;



