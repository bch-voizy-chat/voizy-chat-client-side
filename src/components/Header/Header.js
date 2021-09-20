import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

import logo from "../../assets/Logo-white-png-tinified.png";

const Header = () => {
	const history = useHistory();
	const [expanded, setExpanded] = useState(false);
	const { logout, isLoggedIn } = useAuth();
	const logoutHandler = () => {
		logout();
		setExpanded(false);
		history.push({
			pathname: "/login",
			state: { message: "user logged out", status: 300 },
		});
		window.location.reload();
	};

	return (
		<header>
			<Navbar collapseOnSelect expand='lg' expanded={expanded}>
				<Navbar.Brand>
					<NavLink
						to='/'
						className='focus-visible-only'
						onClick={() => setExpanded(false)}
					>
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
									className='voizy-nav-link focus-visible-only'
									onClick={() => setExpanded(false)}
								>
									Account
								</NavLink>
								<button
									type='button'
									className='btn-text voizy-nav-link focus-visible-only '
									onClick={logoutHandler}
								>
									Log Out
								</button>
							</>
						) : (
							<>
								<NavLink
									to='/login'
									className='voizy-nav-link focus-visible-only'
									onClick={() => setExpanded(false)}
								>
									Log In
								</NavLink>
								<NavLink
									to='/signup'
									className='voizy-nav-link focus-visible-only'
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
