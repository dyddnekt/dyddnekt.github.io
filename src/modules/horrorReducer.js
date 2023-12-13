import { GET_HORROR } from './movie';

export default function(state = [], action) {
    switch (action.type) {
        case GET_HORROR:
            return {
                ...state,
                movies: action.data
            };
        default:
            return state;
    }
}