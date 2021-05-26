import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	return (
		<div
			className='flow d-flex flex-column justify-content-center mx-auto'
			style={{ minHeight: "85vh", maxWidth: "320px" }}
		>
			<h2 className='text-center'>Log in:</h2>
			<Form className='flow form-flow'>
				<Form.Group id='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control type='email' ref={emailRef} required />
				</Form.Group>
				<Form.Group id='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' ref={passwordRef} required />
				</Form.Group>

				<Button type='submit' className='w-100 mt-3'>
					Log In
				</Button>
			</Form>
			<p className='w-100 text-center'>
				Don't have an account?
				<br />
				<Link to='/signup'>Sign up here</Link>
			</p>
		</div>
	);
};

export default Login;
