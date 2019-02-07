import React, { Component } from "react";

export default class HeaderList extends Component {
  render() {
    const { title, background, seeMore } = this.props;
    return (
      <div className={"lista-header " + background}>
        <div className="title">
          <h4>{title} </h4>
        </div>
        {seeMore && (
          <div className="more-news">
            <a href="#">
              <h4>ver mas</h4>
            </a>
          </div>
        )}
      </div>
    );
  }
}
