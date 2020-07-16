import {ERROR,ALL_USER} from '../actions/types';
const initialState = {
	loading: true,
	UserAll: [],
	error: ''
};

export default function(state = initialState, actions) {
	const { type, payload } = actions;

	switch (type) {
		case ALL_USER:
			return {
				...state,
				UserAll: payload,
				loading: false
            };
            default:
			return state;
        }
        
}