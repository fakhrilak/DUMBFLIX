import { API } from '../config/api';
import {ALL_USER,ERROR} from './types';


export const getUsers = () => async (dispatch) => {
	try {
		let res = await API.get("/user");
		dispatch({
			type: ALL_USER,
			payload: res.data.data
		});
	} catch (err) {
		dispatch({
			type: ERROR,
			payload: 'error'
		});
	}
};

