import { GET_ALL_CATEGORY, GET_ALL_CATEGORY_FAIL } from './types';
import { API, setAuthToken } from '../config/api';
export const getallcategory =() => async (dispatch)=>{
	try{
		let res = await API.get('/category');
		dispatch({
			type: GET_ALL_CATEGORY,
			payload: res.data.data,
		})
	}catch(err){
		dispatch({
			type: GET_ALL_CATEGORY_FAIL ,
			payload: err.response.data
		});
		console.log(err)
	}
}