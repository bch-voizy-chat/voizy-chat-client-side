import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const usernameRef = useRef();
	const { signup } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				usernameRef.current.value
			);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div
			className='flow d-flex flex-column justify-content-center mx-auto'
			style={{ minHeight: "85vh", maxWidth: "320px" }}
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
			<p className='w-100 text-center'>
				Already have an account?
				<br />
				<Link to='/login'>Log in here</Link>
			</p>
		</div>
	);
};

export default Signup;
