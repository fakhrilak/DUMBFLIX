import React, { useEffect } from "react";
import HeroImage from "../components/HeroImage/HeroImage";
import { heroImage2 } from "../components/Thumbnail/Thumbnail";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { getFilmsAll } from "../actions/film";

const TVSection = ({ getFilmsAll, films: { filmsAll, loading },auth : {user}}) => {
  const limit = 12;

  useEffect(() => {
    getFilmsAll();
  }, [getFilmsAll]);

  let getmovie = [...filmsAll]
  let filmsTVSeries = getmovie.filter((el)=>el.category.id === 1 );
  let history = useHistory();
  return loading ? (
    <>
      <p>Loding...</p>
    </>
  ) : (
    <div>
      <HeroImage heroImage={heroImage2} />
      <div className="app">
      <h3 className = "title">TV SERIES</h3>
      <div className="Home">
        <div className="grid-music">
          {filmsTVSeries === null || loading ? <div>Loading...</div> : filmsTVSeries.map((film) => (
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  films: state.film,
  auth: state.auth,
});

export default connect(mapStateToProps, { getFilmsAll })(TVSection);
