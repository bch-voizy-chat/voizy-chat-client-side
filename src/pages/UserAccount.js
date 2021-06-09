import React from "react";
import { Button } from "react-bootstrap";
const UserAccount = () => {
	return (
		<div
			className='flow d-flex flex-column mx-auto pt-5 text-center'
			style={{ maxWidth: "320px" }}
		>
			<section className='details flow'>
				<h2>Account Details:</h2>
				<div className='detail__container'>
					<p>Email</p>
				</div>
				<div className='detail__container'>
					<p>Password</p>
				</div>
				<div className='detail__container'>
					<p>Username</p>
				</div>
				<Button disabled className='squishy w-100'>
					Edit Account
				</Button>
				<p className='text-danger w-75 mx-auto'>
					This information can’t be edited for the time being.
				</p>
			</section>
		</div>
	);
};

export default UserAccount;
