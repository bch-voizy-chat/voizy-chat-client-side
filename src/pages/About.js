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
			<h3>Team</h3>
			<ul>
				<li>
					<p>
						Team Lead: Alfonso Ortiz Palma Junco
						<ul>
							<li>
								GitHub <a href='https://github.com/aortizpalma'>@aortizpalma</a>
							</li>
							<li>
								<span className='visually-hidden'>Alfonso's </span>
								<a href='https://www.linkedin.com/in/ortizpalma/'>LinkedIn</a>
							</li>
						</ul>
					</p>
				</li>
				<li>
					<p>
						Back End Lead: Alireza Keshmiry
						<ul>
							<li>
								GitHub <a href='https://github.com/ark13da'>@ark13da</a>
							</li>
							<li>
								<a href='https://www.linkedin.com/in/alireza-keshmiry-63193979/'>
									<span className='visually-hidden'>Alireza's </span>LinkedIn
								</a>
							</li>
						</ul>
					</p>
				</li>
				<li>
					<p>
						Front End Lead: Laurie Lim Sam
						<ul>
							<li>
								GitHub <a href='https://github.com/laurielim'>@laurielim</a>
							</li>
							<li>
								<a href='https://www.linkedin.com/in/margittennosaar/'>
									<span className='visually-hidden'>Laurie's </span>LinkedIn
								</a>
							</li>
						</ul>
					</p>
				</li>
			</ul>
		</div>
	);
};

export default About;
