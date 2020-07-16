import React,{useEffect,useState,useRef} from 'react'
import {postepisodes} from '../actions/episodes';
import { getFilmsAll } from "../actions/film";
import { connect } from "react-redux";

const AddEpisodes = ({postepisodes, getFilmsAll,films:{filmsAll,loading}}) => {
    const [T,setT]=useState(false)
    useEffect(()=>{
      getFilmsAll();
      },[T]);

    let getmovie = [...filmsAll]
    let filmsMovies = getmovie.filter((el)=>el.category.id === 2 );
    let dropdownmovie = filmsMovies.filter((el)=>el.episodes.length < 1)
    const [formData, setFormData] = useState({
        title:"",
        thumbnailFilm:"",
        linkFilm:"",
        filmId:""
      });
      
      const onChange = (e) => {
        const {name,value} = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const { title, thumbnailFilm, linkFilm,filmId} = formData;
    
      const onSubmit = (e) => {
        e.preventDefault();
        postepisodes(
          title,
          thumbnailFilm,
          linkFilm,
          filmId
        );
        setFormData({
        title:"",
        thumbnailFilm:"",
        linkFilm:"",
        filmId:""
        })
      };

  return (
    <div  style={{paddingTop:200,paddingBottom:150}}>
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
              placeholder="LinkFilm"
              value={linkFilm}
              name="linkFilm"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-input-artis">
                <select
                    name="filmId"
                    className="custom-select"
                    onChange={(e) => {
                        onChange(e);
                    }}
                    required
                    >
                    <option value={filmId}>Select Film</option>
                    {dropdownmovie == null || loading ? (
                        'loading'
                    ) : (
                      dropdownmovie.map((dropdownmovie) => (
                            <option value={dropdownmovie.id} key={dropdownmovie.id}>
                                {dropdownmovie.title}
                            </option>
                        ))
                    )}
                </select>
          </div>
          <div className="form-submit" >
            <button className="save" type="submit" onClick={()=>setT(!T)}>
              save
            </button>
          </div>
        </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
    films: state.film,
  });
  
  export default connect(mapStateToProps, {  getFilmsAll, postepisodes})(AddEpisodes);