import Consumer from "fusion:consumer";
import React, { Component, Fragment } from "react";
// import {
  
//   MobileView,
//   isBrowser,
//   isMobile,
//   isMobileOnly
// } from "react-device-detect";
//import "./_separador.scss";
const SeparatorItem = () => {
  return (
    <article className="separator__body__item">
      <div className="separator__body__item__detail">
        <h2 className="separator__body__item__detail__title">
          <a href="https://elcomercio.pe/somos/firmas/choros-dos-satanizacion-indiscrimada-motocicleta-jaime-bedoya-noticia-608112">
            Así era Kukín Flores, el niño prodigio de Cantolao, por Daniel
            Peredo
          </a>
        </h2>
      </div>
      <figure>
        <a href="https://elcomercio.pe/somos/firmas/choros-dos-satanizacion-indiscrimada-motocicleta-jaime-bedoya-noticia-608112">
          <img src="https://img.elcomercio.pe/files/listing_ec_home_separador_standar_nolazy/uploads/2019/02/18/5c6b4eba39457.jpeg" />
        </a>
      </figure>
    </article>
  );
};
const SeparatorListItem = () => {
  //if (isMobileOnly) {
  if (false) {
    return (
      <Fragment>
        <SeparatorItem />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <SeparatorItem />
        <SeparatorItem />
        <SeparatorItem />
        <SeparatorItem />
      </Fragment>
    );
  }
};
@Consumer
class Separador extends Component {
  

  render() {
    return (
      <div className="separator">
        <h1 className="separator__header__title">
          <a href="https://elcomercio.pe/mundo/eeuu/muro-trump-declaratoria-emergencia-frontera-estados-unidos-mexico-graficos-prototipos-quiere-construir-bbc-noticia-599781">
            MURO DE TRUMP
          </a>
        </h1>
        <div className="separator__body">
          <SeparatorListItem />
        </div>
      </div>
    );
  }
}

{
  /**/
}
export default Separador;
