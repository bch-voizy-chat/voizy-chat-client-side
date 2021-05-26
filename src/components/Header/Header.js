import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/Logo-white-png-tinified.png";

const Header = () => {
	/**for dev purpose */
	let currentUser = true;

	return (
		<header className='d-flex justify-content-between'>
			<div className='logo'>
				<NavLink to='/'>
					<h1 className='visually-hidden'>Voizy Chat</h1>
					<img src={logo} alt='Voizy Logo' />
				</NavLink>
			</div>
			{currentUser ? <div>User icon</div> : <div>Log in/Register</div>}
		</header>
	);
};

export default Header;
