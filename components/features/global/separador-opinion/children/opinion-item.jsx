import React from 'react'

const OpinionItem = props => {
  const { basic, websiteUrl, author } = props
  return (
    <div className="opinion-item">
      <article>
        <div className="item-detail">
          <h3 className="item-detail__column">
            <a href="#" />
          </h3>
          <span className="item-detail__author">
            <a href="#">{author}</a>
          </span>
          <p className="item-detail__summary">
            <a href={websiteUrl}>{basic}</a>
          </p>
        </div>
        <figure className="item-image">
          <a href="#">
            <img src="" alt="imagen aqui" />
          </a>
        </figure>
      </article>
    </div>
  )
}

export default OpinionItem
