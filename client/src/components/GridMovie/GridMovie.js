import React from 'react'
import {useHistory} from 'react-router-dom'
 
const GridMovie = props => {
    let history = useHistory();
  return (
    <div>
       <div className="Home">
        <div className="grid-music">
          {props.movie === null || props.loading ? <div>Loading...</div> : props.movie.map((film) => (
            <div className="card-music">
              {props.user === null ||  props.user.subscribe ||props.user.role === 1  ? (
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
  )
}

export default GridMovie
