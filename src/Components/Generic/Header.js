import React, { Component } from "react";
import hims_logo from "../../assets/images/hims_logo.png";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSidebar: false,
      side: ""
    };
    this.headerRef = null;

    this.setHeaderRef = element => {
      this.headerRef = element;
    };
  }

  _openSidebar = (side, content) => {
    this.setState({
      openSidebar: true,
      side: side,
      sidebarContent: content
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = e => {
    if (this.headerRef) {
      if (
        this.headerRef.getBoundingClientRect().height <
        document.documentElement.scrollTop
      ) {
        this.headerRef.classList.add("scrolled");
      } else {
        this.headerRef.classList.remove("scrolled");
      }
    }
  };
  handleMobileNav = () => {
    let navbar = document.querySelector(".navbar-collapse.collapse");
    if ([...navbar.classList].includes("in")) {
      navbar.classList.remove("in");
    } else {
      navbar.classList.add("in");
    }
  };
  render() {
    return (
      <>
        <div
          className="navbar navbar-default navbar-fixed-top"
          role="navigation"
          ref={this.setHeaderRef}
        >
          <div className="container">
            <div className="cart_desktop">
              <span onClick={() => this._openSidebar("right", "cart")}>
                Cart
              </span>
            </div>
            <div className="header_logo">
              <Link to="/">
                <img src={hims_logo} title="hime" alt="hime" />
              </Link>
            </div>

            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
                onClick={this.handleMobileNav}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>

            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
 
                <li onClick={() => this._openSidebar("left", "shop")}>
                  <Link to="#">Shop</Link>
                </li>
                <li onClick = {() => this._openSidebar("left", "learn")}>
                  <Link to="#">Learn</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li
                  className="mobile_none"
                  onClick={() => this._openSidebar("right", "cart")}
                >
                  <Link to="#">Cart </Link>
                </li>
                <li onClick={() => this._openSidebar("right", "login")}>
                  <Link to="#">Login </Link>
                </li>
                <li onClick={() => this._openSidebar("right", "account")}>
                  <Link to="#"> Account </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="clearfix" />

        {/* {this.state.openSidebar !== false ? ( */}
        <Sidebar
          openSidebar={this.state.openSidebar}
          side={this.state.side}
          content={this.state.sidebarContent}
          closeSidebar={() => {
            this.setState({
              openSidebar: false
            });
          }}
        />
        {/* ) : null} */}
      </>
    );
  }
}

export default Header;
