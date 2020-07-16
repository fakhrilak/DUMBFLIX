import {
GET_ALL_CATEGORY,
GET_ALL_CATEGORY_FAIL
} from '../actions/types';

const initialState = {
    loading: true,
    allcategory:[],
    error: ''
}

export default function(state = initialState, actions) {
    const { type, payload } = actions;

    switch (type) {
		case GET_ALL_CATEGORY:
			return {
				...state,
				allcategory: payload,
				loading: false
            };
        case GET_ALL_CATEGORY_FAIL:
            default:
			return state;
    }
}