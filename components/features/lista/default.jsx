import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";
// import HeaderList from "./HeaderList";
// import { ListItemNews } from "./ItemNews";
import "./lista.css";

const HeaderList = ({ nameSection, background, seeMore }) => {
  return (
    <div className={"lista-header " + background}>
      <div className="title">
        <h4>{nameSection} </h4>
      </div>
      {seeMore && <SeeMore />}
    </div>
  );
};
const SeeMore = () => (
  <div className="more-news">
    <a href="#">
      <h4>ver mas</h4>
    </a>
  </div>
);
const ImageNews = () => {
  return (
    <figure>
      <a href="https://elcomercio.pe/vamos/peru/cinco-restaurantes-encontraras-mejores-causas-lima-fotos-noticia-604647">
        <picture>
          <source
            data-type="srcset"
            srcSet="https://img.elcomercio.pe/files/listing_ec_home_bloque5/files/article_content_ec_fotos/uploads/2019/02/05/5c59eaa4ad426.jpeg"
            media="(max-width: 639px)"
          />
          <img
            datatype="src"
            src="https://img.elcomercio.pe/files/article_content_ec_fotos/uploads/2019/02/05/5c59eaa4ad426.jpeg"
          />
        </picture>
      </a>
    </figure>
  );
};

const TimeItem = ({ time }) => <div className="time">{time}</div>;

const ItemNews = ({ seeHour, seeImageNews, time, title, urlNews }) => {
  return (
    <article className="item-news">
      {seeImageNews && <ImageNews />}
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

  return (
    <div className={classListItems}>
      {listNews.map(({ time, title, urlNews }, index) => (
        <ItemNews
          key={time}
          seeHour={seeHour}
          seeImageNews={seeImageNews === true && index === 0 ? true : false}
          time={time}
          title={title}
          urlNews={urlNews}
        />
      ))}
    </div>
  );
};
@Consumer
class Lista extends Component {
  constructor(props) {
    super(props);

    const {
      nameSection,
      background = "",
      seeMore,
      seeHour,
      seeImageNews
      // listNews
    } = this.props.customFields || {};
    const { listNews } = this.props;
    
    this.state = {
      nameSection,
      background,
      seeMore,
      seeHour,
      seeImageNews,
      listNews,
      data: {}
    };

    this.fetch();
    
  }

  fetch(){
    
    const { fetched } = this.getContent(
      "get-lis-news",
      {
        website: "elcomercio",
      },
      this.filterSchema()
    );
    fetched.then(response => {
      debugger
      
      this.setState({
        data: response.content_elements
      });
    })
  };

  filterSchema() {
    return `
    {
      content_elements{
        canonical_url
        website_url
        display_date
        headlines{
          basic
        }
      }
    }
    `;
  };

  render() {
    debugger;
    return (
      <div className="List">
        <HeaderList
          nameSection={this.state.nameSection}
          background={this.state.background}
          seeMore={this.state.seeMore}
        />
        <ListItemNews
          seeHour={this.state.seeHour}
          seeImageNews={this.state.seeImageNews}
          listNews={this.state.listNews}
        />
      </div>
    );
  }
}

Lista.defaultProps = {
  // title: 'ÚLTIMO MINUTO'
  //title: "Politica",
  //background: "color-backgroud-light-blue",
  listNews: [
    {
      time: "14:15",
      title: "Yanet García y su singular baile para recibir el Año Nuevo Chino",
      urlNews:
        "https://elcomercio.pe/politica/partido-morado-viable-tacha-agrupacion-julio-guzman-analisis-noticia-605056"
    },
    {
      time: "14:14",
      title:
        "El presidente independiente, la columna de Maria Alejandra Campos",
      urlNews:
        "https://elcomercio.pe/politica/presidente-independiente-columna-maria-alejandra-campos-noticia-604782"
    },
    {
      time: "14:13",
      title:
        "Partido Morado: ¿Es viable la tacha contra agrupación de Julio Guzmán?",
      urlNews:
        "https://elcomercio.pe/politica/partido-morado-viable-tacha-agrupacion-julio-guzman-analisis-noticia-605056"
    },
    {
      time: "14:11",
      title:
        "La ley no exige sentencia en segunda instancia para caso Donayre, señala Prado",
      urlNews:
        "https://elcomercio.pe/politica/presidente-independiente-columna-maria-alejandra-campos-noticia-604782"
    }
  ]
  //seeMore: false,
  //seeHour: false,
  //seeImageNews: false
};
Lista.propTypes = {
  customFields: PropTypes.shape({
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

    nameSection: PropTypes.string.isRequired.tag({ name: "Sección" }),
    seeMore: PropTypes.bool.tag({ name: "Ver más" }),
    seeHour: PropTypes.bool.tag({ name: "Ver hora" }),
    seeImageNews: PropTypes.bool.tag({ name: "Ver imagen" })
  })

  //title: PropTypes.string.isRequired,
  //background: PropTypes.string.isRequired,
  //seeMore: PropTypes.bool.isRequired,
  //seeHour: PropTypes.bool.isRequired,
  //seeImageNews: PropTypes.bool,
  //defaultProps: PropTypes.array
};

export default Lista;
