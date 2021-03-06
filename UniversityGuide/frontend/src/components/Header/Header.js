import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import SignUp from '../Auth/SignUp';
import Login from '../Auth/Login';
import {Link} from 'react-router-dom';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState((prevState) => {
            return {
                isOpen: !prevState.isOpen
            }
        });
    }

    render(){
        /**
         * @todo: Conditionally render Login, Logout and Signup buttons
         */
        return(
            <div>
                <Navbar color="dark" dark className="mb-5 pl-3 pr-4" expand="sm">
                        <NavbarBrand href="/">University Guide</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/" >SU Forum</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/SUSports">SU Sports</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/SUHousing" disabled>SU Housing</NavLink>
                                </NavItem>
                                <NavItem>
                                    <Login />
                                </NavItem>
                                <NavItem>
                                    <SignUp />
                                </NavItem>
                            </Nav>
                        </Collapse>
                </Navbar>
            </div>
        );
    }
}



export default Header;