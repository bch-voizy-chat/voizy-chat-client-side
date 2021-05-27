import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

import logo from "../../assets/Logo-white-png-tinified.png";

const Header = () => {
	const [expanded, setExpanded] = useState(false);
	const { logout, currentUser } = useAuth();
	const userLoggedIn = Object.keys(currentUser).length;
	const logoutHandler = () => {
		logout();
		window.location.reload();
	};

	return (
		<header>
			<Navbar collapseOnSelect expand='lg' expanded={expanded}>
				<Navbar.Brand>
					<NavLink to='/' onClick={() => setExpanded(false)}>
						<h1 className='visually-hidden'>Voizy Chat</h1>
						<img src={logo} alt='Voizy Logo' />
					</NavLink>
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='responsive-navbar-nav'
					onClick={() => setExpanded(expanded ? false : "expanded")}
				/>
				<Navbar.Collapse id='responsive-navbar-nav'>
					{userLoggedIn ? (
						<Button
							type='button'
							className='nav-link'
							variant='link'
							onClick={logoutHandler}
						>
							Log Out
						</Button>
					) : (
						<Nav className='mr-auto '>
							<NavLink
								to='/login'
								className='nav-link'
								onClick={() => setExpanded(false)}
							>
								Log In
							</NavLink>
							<NavLink
								to='/signup'
								className='nav-link'
								onClick={() => setExpanded(false)}
							>
								Sign Up
							</NavLink>
						</Nav>
					)}
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
