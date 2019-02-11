import React, { Component, Fragment } from "react";
import renderHTML from 'react-render-html';


const Share = (props) => {
    const {url,  title } = props;
    //console.log(url);     debugger;
    const inUrl ="http://www.linkedin.com/shareArticle?url=" + url;
    const fbUrl ="http://www.facebook.com/sharer.php?u=" + url;
    const waUrl ="whatsapp://send?text=" + title.basic + url;
    const gpUrl ="https://plus.google.com/share?url=" + url;
    return (
        <Fragment>
            <div class="share-news">
                <div id="share-items" class="share-items clearfix">
                    <div class="share-item item-in">
                        <a href={inUrl} class="share-link link-in">
                            <i class="icon-in"></i> <span>Compartir</span>
                        </a>
                    </div>
                    <div class="share-item item-fb">
                        <a href={fbUrl} class="share-link link-fb">
                            <i class="icon-fb"> </i><span>Compartir </span></a>
                    </div>
                    <div class="share-item item-wa">
                        <a href={waUrl} class="share-link link-wa">
                            <i class="icon-wa"> </i>
                        </a>
                    </div>
                    <div class="share-item item-gp">
                        <a href={gpUrl} class="share-link link-gp"><i class="icon-gp"> </i>
                            <span>Compartir </span>
                        </a>
                    </div>
                    <div class="share-item other-share-items clearfix">
                        <a href="//pinterest.com/pin/create/button/?url=&amp;description=Las%20siete%20licencias%20laborales%20remuneradas%20a%20las%20que%20puede%20acceder%20un%20trabajador%20en%20Per%C3%BA" class="share-link link-pin"><i class="icon-pin"> </i><span>Compartir </span></a> <a href="https://twitter.com/intent/tweet?original_referer=amp;tw_p=tweetbutton&amp;text=Las%20siete%20licencias%20laborales%20remuneradas%20a%20las%20que%20puede%20acceder%20un%20trabajador%20en%20Per%C3%BA&amp;url=https://gestion.pe/fotogalerias/siete-licencias-laborales-remuneradas-acceder-trabajador-peru-257914&amp;via=Gestionpe" class="share-link link-tw">
                            <i class="icon-tw"> </i><span>Compartir </span></a>
                        <a onclick="window.print()" class="share-link link-print"><i class="icon-print"> </i><span>Imprimir </span>
                        </a>
                    </div>
                    <div class="share-item show-more">
                        <a href="#" data-target="#share-items" class="link-show-more ui-toggle" id="">
                            <span class="more">+</span><span class="less">- </span>
                        </a>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Share;



