import {
    POST_EPISODES_SUCCESS,
    POST_EPISODES_FAIL
    } from '../actions/types';
    
    const initialState = {
        loading: true,
        allepisodes:[],
        error: ''
    }
    
    export default function(state = initialState, actions) {
        const { type, payload } = actions;
    
        switch (type) {
            case POST_EPISODES_SUCCESS:
            case POST_EPISODES_FAIL:
                default:
                return state;
        }
    }