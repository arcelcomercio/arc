import React from 'react'

const OpinionItem = () => {
  return (
    <div className="opinion-item">
      <article>
        <div className="item-detail">
          <h3 className="item-detail__column">
            <a href="#">opinion</a>
          </h3>
          <span className="item-detail__author">
            <a href="#">Jaime Bayly</a>
          </span>
          <p className="item-detail__summary">
            <a href="#">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </a>
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
