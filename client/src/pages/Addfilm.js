import React, { useState, useEffect } from "react";
import {postmovie} from "../actions/film";
import { getallcategory} from "../actions/category";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import './Addfilm.css'

const Addfilm = ({ getallcategory, postmovie, category:{allcategory,loading}}) => {

  useEffect(()=>{
    getallcategory();
  },[]);

  const [formData, setFormData] = useState({
    title:"",
    thumbnailFilm:"",
    year:"",
    categoryId:"",
    description:""
  });
  let history = useHistory();

  const handleaddlinktvseries = ()=>{
    history.push("/add-episodes-tvseries")
  }
  const handleaddlinkmovie = ()=>{
    history.push("/add-episodes-movie")
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { title, thumbnailFilm, year, categoryId, description} = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    postmovie(
      title,
      thumbnailFilm,
      year,
      categoryId,
      description,
    );
    setFormData({
      title:"",
      thumbnailFilm:"",
      year:"",
      categoryId:"",
      description:""
    })
  };

  return (
    <div className="Addfilm">
        <div style={{display:'flex',paddingLeft:1200}}><button onClick={()=>handleaddlinkmovie()}>ADD LINK MOVIE</button>
        <div style={{paddingLeft:10}}><button onClick={()=>handleaddlinktvseries()}>ADD LINK TV SERIES</button></div>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-input-artis">
            <input
              type="text"
              className="custom-input"
              placeholder="Title Film"
              value={title}
              name="title"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-input-artis">
            <input
              type="text"
              className="custom-input"
              placeholder="Url Thumbnail"
              value={thumbnailFilm}
              name="thumbnailFilm"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-input-artis">
            <input
              type="text"
              className="custom-input"
              placeholder="Year"
              value={year}
              name="year"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-input-artis">
          <select
							name="categoryId"
							className="custom-select"
							onChange={(e) => {
								onChange(e);
							}}
							required
						>
							<option value={categoryId}>Select category</option>
							{allcategory == null || loading ? (
								'loading'
							) : (
								allcategory.map((category) => (
									<option value={category.id} key={category.id}>
										{category.name}
									</option>
								))
							)}
						</select>
          </div>
          <div className="form-input-artis">
            <textarea
              type="text"
              className="custom-textarea"
              placeholder="Description"
              value={description}
              name="description"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-submit" >
            <button className="save" type="submit" style={{height:40,fontSize:20}}>
              save
            </button>
          </div>
        </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, {getallcategory, postmovie})(Addfilm);