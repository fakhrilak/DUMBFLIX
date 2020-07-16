import {POST_EPISODES_SUCCESS,POST_EPISODES_FAIL} from './types'
import { API, setAuthToken } from '../config/api';
export const postepisodes = (
	title,
	thumbnailFilm,
	linkFilm,
	filmId,
  ) => async (dispatch) => {
	const config = {
	  headers: {
		"Content-Type": "application/json",
	  },
	};
  
	const body = JSON.stringify({
	  title,
	  thumbnailFilm,
      linkFilm,
      filmId
	});
  
	try {
	  const res = await API.post("/episode", body, config);
	  dispatch({
		type: POST_EPISODES_SUCCESS,
		payload: res.data.data,
	  });
	} catch (err) {
	  dispatch({
		type: POST_EPISODES_FAIL,
		payload: err
	  });
	}
  };