import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const usernameRef = useRef();
	const { signup } = useAuth();
	const [accountCreated, setAccountCreated] = useState(false);
	const [accountError, setAccountError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		let resp = await signup(
			emailRef.current.value,
			passwordRef.current.value,
			usernameRef.current.value
		);
		resp ? setAccountError(resp) : setAccountCreated(true);
	};

	return (
		<div
			className='flow d-flex flex-column mx-auto pt-5'
			style={{ maxWidth: "320px" }}
		>
			<h2 className='text-center'>Create a new account:</h2>
			<Form className='flow form-flow' onSubmit={handleSubmit}>
				<Form.Group id='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control type='email' ref={emailRef} required />
				</Form.Group>
				<Form.Group id='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' ref={passwordRef} required />
				</Form.Group>
				<Form.Group id='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control type='username' ref={usernameRef} required />
				</Form.Group>
				<Button type='submit' className='w-100 mt-3'>
					Create Account
				</Button>
			</Form>
			{accountCreated && (
				<Alert variant='success' className='mb-0'>
					Your account has been successfully created.{" "}
					<Link to='/login' className='alert-link'>
						Go to log in.
					</Link>
				</Alert>
			)}
			{accountError && (
				<Alert variant='danger' className='mb-0'>
					Oops! {accountError}
				</Alert>
			)}
			<p className='w-100 text-center'>
				Already have an account?
				<br />
				<Link to='/login'>Log in here</Link>
			</p>
		</div>
	);
};

export default Signup;
