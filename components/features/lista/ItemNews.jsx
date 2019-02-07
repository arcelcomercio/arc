import React from "react";

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

const TimeItem = ({time}) => <div className="time">{time}</div>;

export const ItemNews = ({ seeHour, seeImageNews, time, title, urlNews }) => {
  return (
    <article className="item-news">
      {seeImageNews && <ImageNews />}
      {seeHour && <TimeItem time={time} />}
      <div className="page-link">
        <a href={urlNews}>
          <h3 className="bold">
            {title}
          </h3>
        </a>
      </div>
    </article>
  );
};
export const ListItemNews = ({ seeHour, seeImageNews, listNews }) => {
  let classListItems =
    listNews.length > 3 ? "list-news-items scrol" : "list-news-items";
  
  return (
    <div className={classListItems}>
      {listNews.map(({ time, title, urlNews }, index) => (
        
        <ItemNews
          seeHour={seeHour}
          seeImageNews={seeImageNews===true && index===0?true:false}
          time={time}
          title={title}
          urlNews={urlNews}
        />
      ))}

    </div>
  );
};
