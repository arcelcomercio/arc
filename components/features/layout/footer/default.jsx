import PropTypes from "prop-types";
import Consumer from "fusion:consumer";
import React, { Fragment, Component } from "react";
import { FormatClassName } from "../../../../resources/utilsJs/utilities";

const classes = FormatClassName({
  footerContainer: ["margin-top"],
  footerTop: ["flex", "flex--justify-center", "footer-top"],
  footerTopColumn: ["footer-top__col"],
  footerSiteLogo: ["footer-top__col__site-logo"],
  footerSiteLegal: [
    "flex",
    "flex--column",
    "footer-top__col__ul",
    "footer-top__col__site-legal"
  ],
  footerTopMenus: [
    "flex",
    "flex--column",
    "footer-top__col__ul",
    "footer-top__col__menus"
  ],
  footerBottom: ["flex", "flex--justify-center", "footer-bot"],
  footerBottomList: ["flex", "flex--justify-center"]
});

@Consumer
class LayoutFooter extends Component {
  constructor(props) {
    super(props);
    this.state = { menus: [] };
    this.fetch();
  }

  fetch() {
    // take only section's name
    const { fetched } = this.getContent(
      "site-navigation",
      { website: this.props.arcSite },
      "{ children { name } }"
    );
    fetched.then(response => {
      // console.log(response)
      this.castSection(response);
    });
  }

  castSection(res) {
    // temporary menus footer data
    let { menus } = this.props.siteProperties.footer;
    // temporary structure
    const auxMenu = { title: "", path: "", list: [] };
    if (res) {
      menus = menus.filter((e, i) => i !== 0);
      auxMenu.title = "Secciones";
      auxMenu.list = res.children.map(el => {
        return { name: el.name, path: "" };
      });
      menus = [auxMenu, ...menus];
      this.setState({ menus: menus });
    } else {
      this.setState({ menus: menus });
    }
  }

  render() {
    const {
      background,
      img,
      info,
      menus,
      titleColor,
      textColor,
      gecColor
    } = this.props.siteProperties.footer;
    const { gecSites, siteUrl } = this.props.siteProperties;
    const styles = {
      container: {
        backgroundColor: background
      },
      titleColor: {
        color: titleColor,
        fontWeight: "bold",
        fontSize: "16px"
      },
      textColor: {
        color: textColor
      },
      gecColor: {
        color: gecColor
      }
    };
    return (
      <footer className={classes.footerContainer}>
        <div className={classes.footerTop} style={styles.container}>
          <div className={classes.footerTopColumn}>
            <a href="" className={classes.footerSiteLogo}>
              <img src={img} alt="" />
            </a>
            <ul className={classes.footerSiteLegal}>
              {info.map((el, k) => (
                <li key={k} style={styles.textColor}>
                  {el}
                </li>
              ))}
            </ul>
          </div>
          {this.state.menus.map((el, keyID) => {
            return (
              <div className={classes.footerTopColumn} key={keyID}>
                <ul className={classes.footerTopMenus}>
                  <li>
                    <a style={styles.titleColor} href="">
                      {el.title}
                    </a>
                  </li>
                  {el.list.map((e, key) => (
                    <li key={key}>
                      <a style={styles.textColor} href="">
                        {e.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className={classes.footerBottom}>
          <ul className={classes.footerBottomList}>
            <li style={styles.gecColor}>Visite también:</li>
            {gecSites.map((site, key) => {
              if (site.name !== siteUrl) {
                return (
                  <li key={key}>
                    <a href="">{site.name}</a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </footer>
    );
  }
}

export default LayoutFooter;
