import React,{useEffect,useState} from 'react'
import {postepisodes} from '../actions/episodes';
import { getFilmsAll} from "../actions/film";
import { connect } from "react-redux";

const AddEpisodes = ({postepisodes,  getFilmsAll,films:{filmsAll,loading}}) => {
    const [limit,setlimit]=useState('')
    useEffect(()=>{
      getFilmsAll();
      },[limit]);
    
    let getmovie = [...filmsAll]
    let filmsTVSeries = getmovie.filter((el)=>el.category.id === 1 );
    let filmsfilter = filmsTVSeries.filter((el)=>el.title === limit)
    let film = null
    if (limit === ''){
      film = filmsTVSeries
    }else{
      film = filmsfilter
    }

    const handleLimit = (event)=>{
      setlimit(event.target.value)
    }

    const [formData, setFormData] = useState({
        title:"",
        thumbnailFilm:"",
        linkFilm:"",
        filmId:""
      });
    
      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(e.target.name)
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
    <div style={{paddingTop:200,paddingBottom:150}}>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-input-artis">
            <input
              type="text"
              className="custom-input"
              placeholder="Title Episode"
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
          <div className="form-input-artis" style={{width:1105,display:'flex'}}>
                <select
                    name="filmId"
                    className="custom-select"
                    onChange={(e) => {
                        onChange(e);
                    }}
                    required
                    >
                    <option value={filmId}>Select Film</option>
                    {film == null || loading ? (
                        'loading'
                    ) : (
                        film.map((film) => (
                            <option value={film.id} key={film.id}>
                                {film.title}
                            </option>
                        ))
                    )}
                </select>
                <div style={{paddingLeft:10,width:800}}>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Filter"
                    value={limit}
                    onChange = {handleLimit}
                  />
                </div>
          </div>
          <div className="form-submit" >
            <button className="save" type="submit">
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
  
  export default connect(mapStateToProps, { getFilmsAll, postepisodes})(AddEpisodes);