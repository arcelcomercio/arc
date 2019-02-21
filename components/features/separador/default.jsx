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
const SeparatorItem = ({ headlines, promo_items, website_url }) => {
  return (
    <article className="separator__body__item">
      <div className="separator__body__item__detail">
        <h2 className="separator__body__item__detail__title">
          <a href={website_url}>{headlines}</a>
        </h2>
      </div>
      <figure>
        {website_url ? (
          <a href={website_url}>
            <img src={promo_items} />
          </a>
        ) : null}
      </figure>
    </article>
  );
};
const SeparatorListItem = ({ data }) => {
  let result = data.map((item, i) => {

    let imagen = null;
    if(item.promo_items){
      imagen = item.promo_items.basic ? item.promo_items.basic.url || null : null;
    }
    
    return (
      <SeparatorItem
        key={i}
        headlines={item.headlines.basic}
        promo_items={imagen}
        website_url={item.website_url}
      />
    );
  });
  return result;
};

// const SeparatorListItem = () => {
//   //if (isMobileOnly) {
//   if (false) {
//     return (
//       <Fragment>
//         <SeparatorItem />
//       </Fragment>
//     );
//   } else {
//     return (
//       <Fragment>
//         <SeparatorItem />
//         <SeparatorItem />
//         <SeparatorItem />
//         <SeparatorItem />
//       </Fragment>
//     );
//   }
// };
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
  return <div className="separator__header__title" dangerouslySetInnerHTML={createMarkup(htmlCode)} />;
};
@Consumer
class Separador extends Component {
  constructor(props) {
    super(props);

    const { titleSeparator, titleLink, secction } =
      this.props.customFields || {};

    let { htmlCode } = this.props.customFields || {};

    this.state = {
      titleSeparator,
      titleLink,
      secction,
      htmlCode,
      data: []
    };
  }
  componentDidMount = () => {
    const { fetched } = this.getContent(
      "get-lis-news",
      {
        website: this.props.arcSite,
        secction: this.state.secction,
        newsNumber: 4
      },
      this.filterSchema()
    );
    fetched.then(response => {
      if (!response) {
        response = [];
        console.log(
          "No hay respuesta del servicio para obtener el listado de noticias"
        );
      }

      if (!response.content_elements) {
        response.content_elements = [];
        console.log(
          "No hay respuesta del servicio para obtener el listado de noticias"
        );
      }
      
      this.setState({
        data: response.content_elements
      });
    });
  };

  filterSchema() {
    return `
    {
      content_elements{
        canonical_url
        website_url
        promo_items{
          basic{
            url
          }
        }
        headlines{
          basic
        }
      }
    }
    `;
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
          <SeparatorListItem data={this.state.data} />
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
