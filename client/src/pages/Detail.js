import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDetailsFilm } from '../actions/film';
import ReactPlayer from "react-player";
import "./Detail.css"

const DetailMovie = ({
	getDetailsFilm,
	match,
	film: { filmDetails, loading },
	auth:{user}
}) => {
	useEffect(() => {
		getDetailsFilm(match.params.id);	
		},
		[ ]
	);
	const [play,setplay] = useState(0)
	const [playx,setplayx] = useState(0)
	const handleplay = ()=>{
		setplayx(play)
	}
	const handlenext = ()=>{
		const Z = filmDetails.episodes.length
		if(play===Z-1){

		}else{
			setplay(play + 1)
		}
		console.log(play)
	}
	const handleback = ()=>{
		if (play===0){
			
		}else{
			setplay (play - 1)
		}	
	}
	const history = useHistory();

	const handlepush = () =>{
		history.push("/add-episodes-tvseries")
	}
	return loading || filmDetails === null ? (<div>Loading...</div>) : (
	<div className="Detail">
		<div style={{paddingLeft:350}}>
			<ReactPlayer url={filmDetails.episodes[playx].linkFilm} controls={true} style={{width:'100%',height:'100%'}}/>
		</div>
		<div className="bawah">
			<div className="description-container" >
				<div className="movie" >
					<div className="movie-image" >
						<img src={filmDetails.thumbnailFilm} style={{width:200,height:250}}/>	
					</div>
					<div className="movie-description" >
						<h1>{filmDetails.title}</h1>
						<label className="year">{filmDetails.year}</label>
						<label className="tipe">
						{filmDetails.category.name}
						</label>
						<div style={{width:475}}><p className="description" >{filmDetails.description}</p></div>
					</div>	
				</div>
			</div>
			{filmDetails.category.id === 1 ? (
				<div className="episodes">
					<div style={{paddingLeft:100}}>
						<div className="buttonepisodes">
							{user === null ||user.role === 1  ? (
								<>
								<div style={{paddingLeft:200}}><button onClick={()=>handlepush() }>Add Episodes</button></div>
								</>
								):null}
						</div>
						<div style={{ position: 'relative',textalign: 'center',color: 'white'} }>
							<div><h1 onClick={()=>handleback()} style={{width:50,backgroundColor:'rgba(76, 50, 80, 0.3)',position:'absolute',top:'30%',cursor:'pointer'}}>{"<<"}</h1></div>
							<div><h1 onClick={()=>handlenext()} style={{width:50,backgroundColor:'rgba(76, 50, 80, 0.3)',position:'absolute',left:310,top:'30%',cursor:'pointer'}}>{">>"}</h1></div>
							<img src={filmDetails.episodes[play].thumbnailFilm} style={{width:350, height:200,cursor:'pointer'}} onClick={()=>handleplay()}/>
						</div>
						<h3>{filmDetails.title} {":"} {filmDetails.episodes[play].title}</h3>
					</div>
				</div>
        	) : null}	
		</div>
	</div>
	);
};


const mapStateToProps = (state) => ({
	film: state.film,
	auth: state.auth
});

export default connect(mapStateToProps, { getDetailsFilm })(DetailMovie);