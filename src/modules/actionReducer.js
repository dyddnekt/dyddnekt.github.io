import { GET_ACTION } from './movie';

export default function(state = [], action) {
    switch (action.type) {
        case GET_ACTION:
            return {
                ...state,
                movies: action.data
            };
        default:
            return state;
    }
}