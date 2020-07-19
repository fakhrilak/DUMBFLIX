import React,{useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";
import { getFilmsAll, deletfilm } from "../actions/film";
import { connect } from "react-redux";
import './Allfilms.css'
const Allfilms = ({getFilmsAll,deletfilm,films:{filmsAll,loading}}) => {
    const [limit,setlimit]=useState('all')
    const [limititem,setlimititem] = useState(100)
    const [delet,setdelet] = useState(false)
    useEffect(() => {
        getFilmsAll();
      },[]);
    let A = null

    const handleFilter = (e) => {
    if (e.target.value === "tv") {
        setlimit('tv')
    } else if (e.target.value === "movies") {
        setlimit('movies')
    } else if (e.target.value === "all") {
        setlimit('all')
    }
    };

    const counterup=()=>{
        setdelet(!delet)
        
    }

    const handlelimititem = (e)=>{
        setlimititem(e.target.value)
    }

    if (limit === 'all'){
       A = [...filmsAll] 
    }else if(limit === 'movies'){
        let B = [...filmsAll] 
        let sortmovie = B.filter((el)=>el.category.id === 2 );
        A = sortmovie.slice(0, limititem)
    }else if (limit === 'tv'){
        let B = [...filmsAll] 
        let sorttvseries = B.filter((el)=>el.category.id === 1 );
        A = sorttvseries.slice(0,limititem)
    }
    const actiondelet=(id)=>{
        deletfilm(id);
    }
    const history = useHistory();
    const handleopenaddfilm = ()=>{
        history.push("/add-movie");
    }
  return (
        <div  className="allfilms">
            <div className="filmsproperty">
                <div style={{paddingLeft:50}}>
                <h1>List Movie</h1>
                <div style={{paddingBottom:10,display:'flex'}}>
                    <select
                        name=""
                        id=""
                        className="select-category"
                        onChange={handleFilter}
                        >
                            <option value={"all"}>ALL</option>
                            <option value={"tv"}>TV Series</option>
                            <option value={"movies"}>Movies</option>
                    </select>
                    <div  className="filtercontainer">
                        <input
                        placeholder='Filter'
                        type="text"
                        value={limititem}
                        onChange={handlelimititem}
                         />
                    </div>
                    <div className="buttondelet">
                        {delet === true?(<button onClick={()=>counterup()}style={{backgroundColor:'green',borderColor:'green'}}>Delet</button>)
                        :(<button onClick={()=>counterup()} >Delet</button>)}                        
                    </div>
                    <div style={{paddingLeft:950}}><button onClick={()=>handleopenaddfilm ()}> Add film</button></div>
                    </div>
                </div>    
            </div>
            <div className="Home" style={{paddingTop:20}}>   
            <div className="grid-music">
                {A === null || loading ? <div>Loading...</div> : A.map((film) => (
                <div className="card-music">
                    <div className="card-music">
                    <div >
                        <div>
                            {delet === true?(<div className="buttondel">
                                <button
                                onClick={()=>actiondelet(film.id)}
                                >+</button></div>):null}                           
                            <img className="thumbnailmusic"src={film.thumbnailFilm}  onClick={()=> history.push(`/detail/${film.id}`)}/>                       
                        </div>  
                    </div>                    
                    <p className="titlemusic">{film.title}</p>
                    <p className="namaartis">{film.year}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
  )
}

const mapStateToProps = (state) => ({
    films: state.film,
  });
  
  export default connect(mapStateToProps, { getFilmsAll,deletfilm })(Allfilms);
  
