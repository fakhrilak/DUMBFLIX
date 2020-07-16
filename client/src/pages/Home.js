import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import HeroImage from "../components/HeroImage/HeroImage";
import { heroImage1 } from "../components/Thumbnail/Thumbnail";
import { connect } from "react-redux";
import { getFilmsAll} from "../actions/film";
import './Home.css'
const Home = ({
  getFilmsAll,
  films: { filmsAll, loading },
  auth : {user}
}) => {
  let history = useHistory();

  useEffect(() => {
    getFilmsAll()
  }, []);

  let A = [...filmsAll]
  let sortmovie = A.filter((el)=>el.category.id === 2 );
  let movie = sortmovie.slice(0, 6)
  
  let sorttvseries = A.filter((el)=>el.category.id === 1 );
  let tvseries = sorttvseries.slice(0, 6)
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className= "app">
      <HeroImage heroImage={heroImage1} />
      <h3 className = "title">MOVIE</h3>
      <div className="Home"> 
        <div className="grid-music">
          {movie === null || loading ? <div>Loading...</div> : movie.map((film, index) => (
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
          ))}
        </div>
      </div>
       <h3 className = "title">TV SERIES</h3>
      <div className="Home">
        <div className="grid-music">
          {tvseries === null || loading ? <div>Loading...</div> : tvseries.map((film, index) => (
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

export default connect(mapStateToProps, {getFilmsAll })(
  Home
);
