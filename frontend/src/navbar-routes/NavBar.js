import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand, Collapse, NavbarToggler } from "reactstrap";
import staticMsg from "../helpers/staticUserMsg";

/** Navigation bar that changes according to currentUser. */

const NavBar = ({ currentUser, logout }) => {
	const [ collapsed, setCollapsed ] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div>
			<Navbar expand="md" light className="Navbar">
				<NavbarBrand href="/" className="Navbar-brand">
					{staticMsg.LOGO_NAME}
				</NavbarBrand>
				<NavbarToggler onClick={toggleNavbar} className="Navbar-hamburger" />
				<Collapse isOpen={!collapsed} navbar>
					{currentUser && (
						<Nav className="Navbar-cntr ml-auto" navbar>
							<NavItem>
								<NavLink className="navbar-link" to="/events">
									{staticMsg.NAV_MY_EVENTS}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/inspiration">
									{staticMsg.NAV_INSPIRATION}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/catering">
									{staticMsg.NAV_CATERING}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/profile">
									{staticMsg.NAV_PROFILE}
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink className="navbar-link" to="/" onClick={logout}>
									{staticMsg.NAV_LOG_OUT}
								</NavLink>
							</NavItem>
						</Nav>
					)}
					{!currentUser && (
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink className="navbar-link" to="/login">
									{staticMsg.NAV_LOG_IN}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/signup">
									{staticMsg.NAV_SIGN_UP}
								</NavLink>
							</NavItem>
						</Nav>
					)}
				</Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
