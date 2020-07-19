import React, { useEffect } from "react";
import HeroImage from "../components/HeroImage/HeroImage";
import { heroImage2 } from "../components/Thumbnail/Thumbnail";
import { connect } from "react-redux";
import { getFilmsAll } from "../actions/film";
import GridMovie from "../components/GridMovie/GridMovie"
const TVSection = ({ getFilmsAll, films: { filmsAll, loading },auth : {user}}) => {

  useEffect(() => {
    getFilmsAll();
  }, []);

  let getmovie = [...filmsAll]
  let filmsTVSeries = getmovie.filter((el)=>el.category.id === 1 );
  return loading ? (
    <>
      <p>Loding...</p>
    </>
  ) : (
    <div>
      <HeroImage heroImage={heroImage2} />
      <div className="app">
      <h3 className = "title">TV SERIES</h3>
      <GridMovie loading={loading} movie={filmsTVSeries} user={user}/>
    </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  films: state.film,
  auth: state.auth,
});

export default connect(mapStateToProps, { getFilmsAll })(TVSection);
