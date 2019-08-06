import React from 'react'

const classes = {
  plusG: 'plus-g',
  left: 'plus-g__left',
  section: 'plus-g__section',
  detail: 'plus-g__detail',
  read: 'plus-g__read',
  description: 'plus-g__description',
  author: 'plus-g__author',
  boxIcon: 'plus-g__box-icon',
  sectionSmall: 'plus-g__section-small',
  iconImage: 'plus-g__icon-image',
  right: 'plus-g__right',
  icon: 'plus-g__icon icon-video',
  image: 'plus-g__image',
}

const getModel = model => {
  const type = {
    basic: ' plus-g--card ',
    twoCol: ' col-2 ',
    full: ' col-2 row-2 ',
  }
  return type[model] || type.basic
}

const PlusGChild = ({ model, bgColor }) => {
  return (
    <div
      className={classes.plusG
        .concat(getModel(model))
        .concat(` plus-g--${bgColor}`)}>
      <div className={classes.left}>
        <h3 className={classes.section}>
          <a href="/">Tecnologia</a>
        </h3>
        <h2>
          <a className="plus-g__title" href="/">
            Las bondades del lado oscuro de la Luna
          </a>
        </h2>
        <p className={classes.detail}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sapiente molestiae magni nam suscipit, libero officiis architecto non,
          eligendi natus voluptate autem fugit cum quasi voluptatum enim
          dignissimos. Tempora, omnis!
          <a className={classes.read} href="/">
            Leer
          </a>
        </p>
        <div className={classes.description}>
          <h6>
            <a className={classes.author} href="/">
              Elisabeth García
            </a>
          </h6>
          <div className={classes.boxIcon}>
            <p>
              <a className={classes.sectionSmall} href="/">
                Tegnologia
              </a>
            </p>
            <img
              className={classes.iconImage}
              src="https://assets.gestion.pe/img/gestion/logo-gestion-social.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <span className={classes.icon} />
        <a href="/">
          <img
            className={classes.image}
            src="https://www.ecestaticos.com/imagestatic/clipping/a89/4e5/a894e547cf282a3284c470eec6cbb935/es-verdad-que-la-influencia-de-la-luna-afecta-a-nuestro-estado-de-animo.jpg?mtime=1564669644"
            alt=""
          />
        </a>
      </div>
    </div>
  )
}

export default PlusGChild
