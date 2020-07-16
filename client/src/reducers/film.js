import {
	GET_FILMS_ALL,
	DELET_FILM_FAIL,
	DELET_FILM_SUCCESS,
	GET_FILMS_DETAILS,
	POST_MOVIE_SUCCESS,
	POST_MOVIE_FAIL,
	LOADING_TRUE,
	ERROR
} from '../actions/types';

const initialState = {
	loading: true,
	filmsAll: [],
	filmDetails: null,
	error: '',
};

export default function(state = initialState, actions) {
	const { type, payload } = actions;

	switch (type) {
		case GET_FILMS_ALL:
			return {
				...state,
				filmsAll: payload,
				loading: false
			};
		case GET_FILMS_DETAILS:
			return {
				...state,
				filmDetails: payload,
				loading: false
			};
		case ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case LOADING_TRUE:
			return {
				...state,
				loading: true
			};
		case POST_MOVIE_SUCCESS:
		case POST_MOVIE_FAIL:
		case DELET_FILM_SUCCESS:
			return{
				...state,
				loading: false,
			}
		case DELET_FILM_FAIL:
		default:
			return state;
	}
}
