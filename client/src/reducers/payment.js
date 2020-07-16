import {
  POST_PAYMENT_SUCCSESS, 
POST_PAYMENT_FAIL,
GET_ALL_TRANSACTION_SUCCESS,
GET_ALL_TRANSACTION_FAIL,
EDIT_TRANSACTION_SUCCESS,
EDIT_UNSUBS_SUCCESS,
EDIT_UNSUBS_FAIL,
EDIT_TRANSACTION_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  alltransaction:[],
  error: '',
};

export default function(state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
      case POST_PAYMENT_FAIL:
      case POST_PAYMENT_SUCCSESS:
          return{
              ...state,
              loading:false
          }
      case GET_ALL_TRANSACTION_SUCCESS:
          return{
              ...state,
              alltransaction : payload,
              loading: false
          }
      case GET_ALL_TRANSACTION_FAIL:
          return{
              ...state,
              error: payload,
              loading: false
          }
      case EDIT_TRANSACTION_SUCCESS:
          return {
      ...state,
      alltransaction: state.alltransaction.map((data) =>data.id == payload.id ?         
            {
                ...data,
                status: payload.status,
                user: payload.user
              }: data),
              loading: false
            };
        case EDIT_UNSUBS_SUCCESS:
      default:
      return state;
  }
}