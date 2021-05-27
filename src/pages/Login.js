import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const [loginError, setLoginError] = useState("");
	const history = useHistory();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		let resp = await login(emailRef.current.value, passwordRef.current.value);
		setIsLoading(false);
		resp ? setLoginError(resp) : history.push("/");
	};

	return (
		<div
			className='flow d-flex flex-column mx-auto pt-5'
			style={{ maxWidth: "320px" }}
		>
			<h2 className='text-center'>Log in:</h2>
			<Form className='flow form-flow' onSubmit={handleSubmit}>
				<Form.Group id='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control type='email' ref={emailRef} required />
				</Form.Group>
				<Form.Group id='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' ref={passwordRef} required />
				</Form.Group>

				<Button type='submit' disabled={isLoading} className='w-100 mt-3'>
					{isLoading ? "Loading…" : "Log In"}
				</Button>
			</Form>
			{loginError && (
				<Alert variant='danger' className='mb-0'>
					Oops! {loginError}
				</Alert>
			)}
			<p className='w-100 text-center'>
				Don't have an account?
				<br />
				<Link to='/signup'>Sign up here</Link>
			</p>
		</div>
	);
};

export default Login;
