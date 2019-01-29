import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";

@Consumer
class TestComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('------>', this.props.siteProperties.footer)
    return (
      <div>
        <h1>{this.props.siteProperties.siteName}</h1>
      </div>
    );
  }
}

export default TestComp;