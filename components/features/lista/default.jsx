import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";

//import "./lista.css";

const HeaderList = ({ titleList, background, seeMore, seeMoreurl }) => {
  return (
    <div className={"lista-header " + background}>
      <div className="title">
        <h4>{titleList} </h4>
      </div>
      {seeMore && <SeeMore seeMoreurl={seeMoreurl} />}
    </div>
  );
};

const SeeMore = ({ seeMoreurl }) => (
  <div className="more-news">
    <a href={seeMoreurl}>
      <h4>ver mas</h4>
    </a>
  </div>
);
const ImageNews = ({ urlNews, promo_items }) => {
  let imagen = promo_items.basic ? promo_items.basic.url || "" : "";
  return (
    <figure>
      {imagen ? (
        <a href={urlNews}>
          <picture>
            <source
              data-type="srcset"
              srcSet={imagen}
              media="(max-width: 639px)"
            />
            <img datatype="src" src={imagen} />
          </picture>
        </a>
      ) : (
        null
      )}
    </figure>
  );
};

const TimeItem = ({ time }) => <div className="time">{time}</div>;

const ItemNews = ({
  seeHour,
  seeImageNews,
  time,
  title,
  urlNews,
  promo_items
}) => {
  return (
    <article className="item-news">
      {seeImageNews && (
        <ImageNews urlNews={urlNews} promo_items={promo_items} />
      )}
      {seeHour && <TimeItem time={time} />}
      <div className="page-link">
        <a href={urlNews}>
          <h3 className="bold">{title}</h3>
        </a>
      </div>
    </article>
  );
};
const ListItemNews = ({ seeHour, seeImageNews, listNews }) => {
  let classListItems =
    listNews.length > 3 ? "list-news-items scrol" : "list-news-items";
  //let nuevalista =[];

  return (
    <div className={classListItems}>
      {listNews.map(
        (
          { display_date, headlines: { basic }, canonical_url, promo_items },
          index
        ) => {
          let fechaPublicacion = new Date(display_date);

          return (
            <ItemNews
              key={index}
              seeHour={seeHour}
              seeImageNews={seeImageNews === true && index === 0 ? true : false}
              time={
                fechaPublicacion.getHours() +
                ":" +
                fechaPublicacion.getMinutes() +
                "-"
              }
              title={basic}
              urlNews={canonical_url}
              promo_items={promo_items || ""}
            />
          );
        }
      )}
    </div>
  );
};
@Consumer
class Lista extends Component {
  constructor(props) {
    super(props);

    var {
      titleList,
      background = "",
      newsNumber,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      secction
    } = this.props.customFields || {};
    debugger
    
    this.state = {
      titleList,
      background,
      newsNumber,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      secction,
      data: []
    };
    
  }

  componentDidMount = () => {
    const { fetched } = this.getContent(
      "get-lis-news",
      {
        website: this.props.arcSite,
        secction: this.state.secction,
        newsNumber: this.state.newsNumber,
      },
      this.filterSchema()
    );
    fetched.then(response => {
      if (!response) {
        response = [];
        console.log("No hay respuesta del servicio para obtener el listado de noticias");
      }

      if(!response.content_elements){
        response.content_elements = [];
        console.log("No hay respuesta del servicio para obtener el listado de noticias");
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
        display_date
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
      <div className="List">
        <HeaderList
          titleList={this.state.titleList}
          background={this.state.background}
          seeMore={this.state.seeMore}
          seeMoreurl={this.state.seeMoreurl}
        />
        <ListItemNews
          seeHour={this.state.seeHour}
          seeImageNews={this.state.seeImageNews}
          listNews={this.state.data || []}
        />
      </div>
    );
  }
}

Lista.propTypes = {
  customFields: PropTypes.shape({
    // secction: PropTypes.oneOf(["politica", "economia", "lastnews"]).tag({
    //   name: "Sección",
    //   labels: {
    //     politica: "Política",
    //     economia: "economia",
    //     lastnews: "Ultimo minuto"
    //   },
    //   defaultValue: "politica"
    // }),
    secction: PropTypes.string.isRequired.tag({ name: "Sección" }),
    background: PropTypes.oneOf([
      "color-backgroud-light-blue",
      "color-backgroud-white"
    ]).tag({
      name: "Color de fondo cabecera",
      labels: {
        "color-backgroud-light-blue": "celeste",
        "color-backgroud-white": "blanco"
      },
      defaultValue: "color-backgroud-light-blue"
    }),

    titleList: PropTypes.string.isRequired.tag({ name: "Título de la lista" }),
    newsNumber: PropTypes.number.tag({name: "Número de noticas"}),
    seeMore: PropTypes.bool.tag({ name: "Ver más" }),
    seeHour: PropTypes.bool.tag({ name: "Ver hora" }),
    seeImageNews: PropTypes.bool.tag({ name: "Ver imagen" }),
    seeMoreurl: PropTypes.string.tag({ name: "Ver más url" })
  })
};

export default Lista;
