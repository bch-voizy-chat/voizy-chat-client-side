import React from "react";

const About = () => {
	return (
		<div className='flow pt-5 about-page'>
			<h2>About Voizy Chat</h2>
			<p>
				This web application is an extension of{" "}
				<a href='https://play.google.com/store/apps/details?id=com.voizy.android'>
					Voizy
				</a>
				, the audio meme generator app , where you have threaded conversations
				with any other users. This is an MVP initially created by students of
				the{" "}
				<a href='https://en.bc.fi/qualifications/full-stack-web-developer-program/'>
					Full Stack Web Development program
				</a>{" "}
				at Business College Helsinki.
			</p>
			<p>
				If you have any comment or feedback, please reach out to{" "}
				<a href='mailto:hello@voizyapp.com'>hello@voizyapp.com</a>
			</p>
		</div>
	);
};

export default About;
