import React, { useEffect } from "react";
import HeroImage from "../components/HeroImage/HeroImage";
import { heroImage2 } from "../components/Thumbnail/Thumbnail";
import {useHistory} from "react-router-dom"
import { connect } from "react-redux";
import { getFilmsAll } from "../actions/film";


const MoviesSection = ({ getFilmsAll, films: { filmsAll, loading } ,auth : {user}}) => {
  const limit = 12;

  useEffect(() => {
    getFilmsAll();
  }, [getFilmsAll]);

  let getmovie = [...filmsAll]
  let filmsMovies = getmovie.filter((el)=>el.category.id === 2 );
  let history = useHistory();
  return loading ? (
    <>
      <p>KOSONG</p>
    </>
  ) : (
    <div className= "app">
      <HeroImage heroImage={heroImage2} />
      <h3 className = "title" >MOVIE</h3>
      <div className="Home"> 
        <div className="grid-music">
          {filmsMovies === null || loading ? <div>Loading...</div> : filmsMovies.map((film) => (
            <div className="card-music" >
              <div className="card-music">
              {user === null ||  user.subscribe ||user.role === 1  ? (
                <>
                  <img className="thumbnailmusic"src={film.thumbnailFilm} onClick={()=> history.push(`/detail/${film.id}`)}/>
                  <p className="titlemusic">{film.title}</p>
                  <p className="namaartis">{film.year}</p>
                </>
                ):(
                  <>
                    <img className="thumbnailmusic"src={film.thumbnailFilm} onClick={()=> history.push(`/payment`)}/>
                    <p className="titlemusic">{film.title}</p>
                    <p className="namaartis">{film.year}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  films: state.film,
  auth: state.auth,
});

export default connect(mapStateToProps, { getFilmsAll })(MoviesSection);
