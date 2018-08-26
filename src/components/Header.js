import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap'

import { AUTH_TOKEN } from '../constants'

class Header extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">LOGO</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {authToken &&
            <NavItem>
              <Link to="/" className="nav-link">Dashboard</Link>
            </NavItem>}
            {authToken ?
            <NavItem>
              <NavLink href="#"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN)
                  this.props.history.push(`/`)
                }}
              >Logout</NavLink>
            </NavItem>
              :
            <NavItem>
              <Link to="/login" className="nav-link">Login</Link>
            </NavItem>}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Header)
