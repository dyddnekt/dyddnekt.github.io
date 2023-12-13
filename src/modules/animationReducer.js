import { GET_ANIMATION } from './movie';

export default function(state = [], action) {
    switch (action.type) {
        case GET_ANIMATION:
            return {
                ...state,
                movies: action.data
            };
        default:
            return state;
    }
}