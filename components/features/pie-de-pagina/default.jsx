import PropTypes from "prop-types";
import Consumer from "fusion:consumer";
import React, { Fragment, Component } from "react";
import { FormatClassName } from "../../../../resources/utilsJs/utilities";

const classes = FormatClassName({});

@Consumer
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.fetch();
  }

  fetch() {
    const { fetched } = this.getContent();
    fetched.then(response => {
      console.log(response);
    });
  }

  castSection(res) {}

  render() {
    return (
      <footer className={classes.footerContainer}>
        <div>asd</div>
      </footer>
    );
  }
}

export default Footer;
