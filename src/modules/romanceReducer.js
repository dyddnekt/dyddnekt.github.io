import { GET_ROMANCE } from './movie';

export default function(state = [], action) {
    switch (action.type) {
        case GET_ROMANCE:
            return {
                ...state,
                movies: action.data
            };
        default:
            return state;
    }
}