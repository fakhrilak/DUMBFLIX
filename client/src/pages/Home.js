import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import HeroImage from "../components/HeroImage/HeroImage";
import { heroImage1 } from "../components/Thumbnail/Thumbnail";
import { connect } from "react-redux";
import { getFilmsAll} from "../actions/film";
import GridMovie from "../components/GridMovie/GridMovie"
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
          <GridMovie loading={loading} movie={movie} user={user}/>
       <h3 className = "title">TV SERIES</h3>     
          <GridMovie loading={loading} movie={tvseries} user={user}/>
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
