import Consumer from "fusion:consumer";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

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

const HeaderTitulo = ({ titleSeparator, titleLink }) => {
  return (
    <Fragment>
      <h1 className="separator__header__title">
        <a href={titleLink}>{titleSeparator}</a>
      </h1>
    </Fragment>
  );
};
const createMarkup = html => {
  return { __html: html };
};

const HeaderHTML = ({ htmlCode }) => {
  return <div dangerouslySetInnerHTML={createMarkup(htmlCode)} />;
};
@Consumer
class Separador extends Component {
  constructor(props) {
    super(props);

    const { titleSeparator, titleLink, secction } =
      this.props.customFields || {};

    var { htmlCode } = this.props.customFields || {};

    this.state = {
      titleSeparator,
      titleLink,
      secction,
      htmlCode
    };
    debugger;
  }


  render() {
    return (
      <div className="separator">
        {this.state.titleSeparator ? (
          <HeaderTitulo
            titleSeparator={this.state.titleSeparator}
            titleLink={this.state.titleLink}
          />
        ) : (
          <HeaderHTML htmlCode={this.state.htmlCode} />
        )}

        <div className="separator__body">
          <SeparatorListItem />
        </div>
      </div>
    );
  }
}

Separador.propTypes = {
  customFields: PropTypes.shape({
    titleSeparator: PropTypes.string.tag({ name: "Titulo del separador" }),
    titleLink: PropTypes.string.tag({ name: "Enlace del separador" }),
    secction: PropTypes.string.isRequired.tag({ name: "Sección" }),
    htmlCode: PropTypes.richtext.tag({ name: "Código HTML" })
  })
};
export default Separador;
