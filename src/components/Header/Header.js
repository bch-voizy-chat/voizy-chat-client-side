import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

import logo from "../../assets/Logo-white-png-tinified.png";

const Header = () => {
	const [expanded, setExpanded] = useState(false);
	const { logout, isLoggedIn } = useAuth();
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
					<Nav className='mr-auto'>
						{isLoggedIn ? (
							<>
								<NavLink
									to='/account'
									className='voizy-nav-link'
									onClick={() => setExpanded(false)}
								>
									Account
								</NavLink>
								<button
									type='button'
									className='btn-text voizy-nav-link'
									onClick={logoutHandler}
								>
									Log Out
								</button>
							</>
						) : (
							<>
								<NavLink
									to='/login'
									className='voizy-nav-link'
									onClick={() => setExpanded(false)}
								>
									Log In
								</NavLink>
								<NavLink
									to='/signup'
									className='voizy-nav-link'
									onClick={() => setExpanded(false)}
								>
									Sign Up
								</NavLink>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
