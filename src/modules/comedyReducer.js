import { GET_COMEDE } from './movie';

export default function(state = [], action) {
    switch (action.type) {
        case GET_COMEDE:
            return {
                ...state,
                movies: action.data
            };
        default:
            return state;
    }
}