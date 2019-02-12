import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";
// import HeaderList from "./HeaderList";
// import { ListItemNews } from "./ItemNews";
import "./lista.css";

const HeaderList = ({ nameSection, background, seeMore, seeMoreurl }) => {
  return (
    <div className={"lista-header " + background}>
      <div className="title">
        <h4>{nameSection} </h4>
      </div>
      {seeMore && <SeeMore seeMoreurl={seeMoreurl} />}
    </div>
  );
};

const SeeMore = ({seeMoreurl}) => (
  <div className="more-news">
    <a href={seeMoreurl} >
      <h4>ver mas</h4>
    </a>
  </div>
);
const ImageNews = ({urlNews, promo_items}) => {
  //"https://img.elcomercio.pe/files/article_content_ec_fotos/uploads/2019/02/05/5c59eaa4ad426.jpeg"
  // srcSet="https://img.elcomercio.pe/files/listing_ec_home_bloque5/files/article_content_ec_fotos/uploads/2019/02/05/5c59eaa4ad426.jpeg"
  //"https://elcomercio.pe/vamos/peru/cinco-restaurantes-encontraras-mejores-causas-lima-fotos-noticia-604647"
  debugger
  let imagen = promo_items.basic? promo_items.basic.url||'' :'';
  
  return (
    <figure>
      <a href={urlNews} >
        <picture>
          <source
            data-type="srcset"
            srcSet={imagen}
            media="(max-width: 639px)"
          />
          <img
            datatype="src"
            src={imagen}
          />
        </picture>
      </a>
    </figure>
  );
};

const TimeItem = ({ time }) => <div className="time">{time}</div>;

const ItemNews = ({ seeHour, seeImageNews, time, title, urlNews, promo_items }) => {
  return (
    <article className="item-news">
      {seeImageNews && <ImageNews urlNews={urlNews} promo_items={promo_items} />}
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
  debugger
  return (
    <div className={classListItems}>
      {listNews.map(({ display_date, headlines:{basic}, canonical_url, promo_items }, index) => {
        let fechaPublicacion = new Date(display_date);
        
        return(
        <ItemNews
          key={index}
          seeHour={seeHour}
          seeImageNews={seeImageNews === true && index === 0 ? true : false}
          time={fechaPublicacion.getHours()+ ':'+fechaPublicacion.getMinutes()+'-'}
          title={basic}
          urlNews={canonical_url}
          promo_items ={promo_items||''}
        />)
        
      })}
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
      seeMoreurl,
      seeHour,
      seeImageNews,
      secction
    } = this.props.customFields || {};
    debugger
    this.state = {
      nameSection,
      background,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      secction,
      data: []
    }; 
    
  }

  componentDidMount =() =>{
    const { fetched } = this.getContent(
      "get-lis-news",
      {
        website: this.props.arcSite,
        secction: this.state.secction
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
  };

  render() {
    return (
      <div className="List">
        <HeaderList
          nameSection={this.state.nameSection}
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
    secction: PropTypes.oneOf([
      'politica',
      'economia',
      'lastnews'
    ]).tag({
      name:'Sección',
      labels:{
        'politica':'Política',
        'economia':'economia',
        'lastnews':'Ultimo minuto',
      },
      defaultValue: "politica"
    }),
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
    seeImageNews: PropTypes.bool.tag({ name: "Ver imagen" }),
    seeMoreurl: PropTypes.string.tag({name:"Ver más url"})
  })

  //title: PropTypes.string.isRequired,
  //background: PropTypes.string.isRequired,
  //seeMore: PropTypes.bool.isRequired,
  //seeHour: PropTypes.bool.isRequired,
  //seeImageNews: PropTypes.bool,
  //defaultProps: PropTypes.array
};

export default Lista;
