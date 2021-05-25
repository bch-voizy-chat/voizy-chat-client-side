import React from "react";

const Header = () => {
	/**for dev purpose */
	let currentUser = true;

	return (
		<header className='d-flex justify-content-between'>
			<div className='logo'>
				<h1 className='visually-hidden'>Voizy Chat</h1>
				<img src='none' alt='Voizy chat logo.' />
			</div>
			{currentUser ? <div>User icon</div> : <div>Log in/Register</div>}
		</header>
	);
};

export default Header;
