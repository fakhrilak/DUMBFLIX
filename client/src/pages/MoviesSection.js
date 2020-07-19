import React, { useEffect } from "react";
import HeroImage from "../components/HeroImage/HeroImage";
import { heroImage2 } from "../components/Thumbnail/Thumbnail";
import { connect } from "react-redux";
import { getFilmsAll } from "../actions/film";
import GridMovie from "../components/GridMovie/GridMovie"

const MoviesSection = ({ getFilmsAll, films: { filmsAll, loading } ,auth : {user}}) => {

  useEffect(() => {
    getFilmsAll();
  }, []);

  let getmovie = [...filmsAll]
  let filmsMovies = getmovie.filter((el)=>el.category.id === 2 );
  return loading ? (
    <>
      <p>KOSONG</p>
    </>
  ) : (
    <div className= "app">
      <HeroImage heroImage={heroImage2} />
      <h3 className = "title" >MOVIE</h3>
      <GridMovie loading={loading} movie={filmsMovies} user={user}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  films: state.film,
  auth: state.auth,
});

export default connect(mapStateToProps, { getFilmsAll })(MoviesSection);
