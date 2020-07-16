import {API} from '../config/api';
import moment from 'moment';
import {
	POST_PAYMENT_SUCCSESS, 
	POST_PAYMENT_FAIL,
	GET_ALL_TRANSACTION_SUCCESS,
	GET_ALL_TRANSACTION_FAIL,
	EDIT_UNSUBS_FAIL,
	EDIT_UNSUBS_SUCCESS,
	EDIT_TRANSACTION_SUCCESS,
	EDIT_TRANSACTION_FAIL
} from './types';

export const postpayment = (attache,idUser) => async (dispatch) => {
	try {
		const startDate = moment();
		const dueDate = moment();
		const userId = idUser;
		const status = "Pending";
		const attachment = attache;
		const bankAccount= "BRI";
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const body = JSON.stringify({
			startDate,
			dueDate,
			userId,
			status,
			attachment,
			bankAccount
		});
		const res = await API.post("/transaction",body, config);
		dispatch({
			type: POST_PAYMENT_SUCCSESS,
			payload: res.data.data,
		});
	} catch (err) {
		dispatch({
			type: POST_PAYMENT_FAIL,
			payload: err
		});
	}
};

export const getalltransaction = () => async (dispatch) => {
	try {
		const res = await API.get('/transaction');
		dispatch({
			type: GET_ALL_TRANSACTION_SUCCESS,
			payload: res.data.data
		});
	} catch (error) {
		dispatch({
			type: GET_ALL_TRANSACTION_FAIL,
		});
	}
};

export const edittransaction = (status, idTransaction, idUser) => async (dispatch) =>{
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body =JSON.stringify({
		status,
		idUser
	});
	try{
		const res = await API.patch(`/transaction/${idTransaction}`, body, config);
		dispatch({
			type: EDIT_TRANSACTION_SUCCESS,
			payload:  res.data.data.resultTransaction
		})
	}catch(err){
		dispatch({
			type: EDIT_TRANSACTION_FAIL,
		})
	}
}

export const editsubs = (status,idUser) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body =JSON.stringify({
		status,
		idUser
	});
	try{
		const res = await API.patch(`/user/${idUser}`, body, config);
		dispatch({
			type: EDIT_UNSUBS_SUCCESS,
			payload:  res.data.data.resultTransaction
		})
	}catch(err){
		dispatch({
			type: EDIT_UNSUBS_FAIL,
		})
	}
}