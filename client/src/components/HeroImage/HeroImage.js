import React from 'react';
import './HeroImage.css';

const HeroImage = (props) => {
	return (
		<div
			className="hero"
			style={{
				background: `linear-gradient(to bottom, rgba(0,0, 0, 0), black), url('${props.heroImage.img}'), #1c1c1c`
			}}
		>
			<div className="hero-content">
				<div className="hero-text">
					<img src={props.heroImage.logo} alt="logohero" className="logohero" />
					<p>{props.heroImage.desc}</p>
					<p>
						<span className="year">{props.heroImage.year}</span>
						<span className="tipe">{props.heroImage.type}</span>
					</p>

					<button className="hero-button">WATCH NOW !</button>
				</div>
			</div>
		</div>
	);
};

export default HeroImage;
