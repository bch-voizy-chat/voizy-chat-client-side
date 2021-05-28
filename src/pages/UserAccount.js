import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
const UserAccount = () => {
	const { logout } = useAuth();
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
				<p class='text-danger'>
					This information can’t be edited for the time being.
				</p>

				<Button className='w-100'>Edit Account</Button>
			</section>
		</div>
	);
};

export default UserAccount;
