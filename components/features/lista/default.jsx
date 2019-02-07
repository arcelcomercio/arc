import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";
import HeaderList from "./HeaderList";
import { ListItemNews } from "./ItemNews";
import "./lista.css";

@Consumer
class Lista extends Component {
  constructor(props) {
    super(props);

    const {
      title,
      background = "",
      seeMore = true,
      seeHour = false,
      seeImageNews = false,
      listNews
    } = this.props;
    this.state = {
      title,
      background,
      seeMore,
      seeHour,
      seeImageNews,
      listNews
    };
  }
  render() {
    return (
      <div className="List">
        <HeaderList
          title={this.state.title}
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
  title: "Politica",
  background: "color-backgroud-light-blue",
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
  ],
  seeMore: false,
  seeHour: false,
  seeImageNews: false
};
Lista.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({ name: "Título" }),
    seeMore: PropTypes.bool.tag({ name: "Ver más" }),
    seeHour: PropTypes.bool.tag({ name: "Ver hora" }),
    seeImageNews: PropTypes.bool.tag({ name: "Ver imagen" })
  }),

  //title: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  //seeMore: PropTypes.bool.isRequired,
  //seeHour: PropTypes.bool.isRequired,
  seeImageNews: PropTypes.bool,
  //defaultProps: PropTypes.array
};

export default Lista;
