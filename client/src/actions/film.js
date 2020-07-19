import { API } from '../config/api';
import {editsubs} from './payment';
import {
	GET_FILMS_ALL,
	DELET_FILM_FAIL,
	DELET_FILM_SUCCESS,
	GET_FILMS_DETAILS,
	POST_MOVIE_SUCCESS,
	POST_MOVIE_FAIL,
	ERROR
} from './types';


export const postmovie = (
	title,
	thumbnailFilm,
	year,
	categoryId,
	description,
  ) => async (dispatch) => {
	const config = {
	  headers: {
		"Content-Type": "application/json",
	  },
	};
  
	const body = JSON.stringify({
	  title,
	  thumbnailFilm,
	  year,
	  categoryId,
	  description
	});
  
	try {
	  const res = await API.post("/film", body, config);
	  dispatch({
		type: POST_MOVIE_SUCCESS,
		payload: res.data.data,
	  });
	} catch (err) {
	  dispatch({
		type: POST_MOVIE_FAIL,
		payload: err.response.data.error.message,
	  });
	}
  };	

export const getFilmsAll = () => async (dispatch) => {
	try {
		let res = await API.get(`/film`);
		dispatch({
			type: GET_FILMS_ALL,
			payload: res.data.data
		});
	} catch (err) {
		dispatch({
			type: ERROR,
			payload: 'error'
		});
	}
};

export const getDetailsFilm = (id) => async (dispatch) => {
	try {
		let res = await API.get(`/film/${id}`);
		dispatch({
			type: GET_FILMS_DETAILS,
			payload: res.data.data
		});
	} catch (err) {
		dispatch({
			type: ERROR,
			payload: 'error'
		});
	}
};

export const deletfilm = (id) => async (dispatch) => {
	try {
		let res = await API.delete(`/film/${id}`);
		dispatch({
			type: DELET_FILM_SUCCESS,
			payload: res.data.data
		});
	} catch (err) {
		dispatch({
			type: DELET_FILM_FAIL,
			payload: 'error'
		});
	}
};