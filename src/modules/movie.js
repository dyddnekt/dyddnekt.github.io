import axios from 'axios';

// Action function
export const GET_ACTION = 'movie/GET_ACTION';
export const GET_COMEDE = 'movie/GET_COMEDE';
export const GET_ROMANCE = 'movie/GET_ROMANCE';
export const GET_ANIMATION = 'movie/GET_ANIMATION';
export const GET_HORROR = 'movie/GET_HORROR';

// Api information
export const API_KEY = '2a98cbe1fa65b5daaabc0522192e19f3';
export const API_URL = `https://api.themoviedb.org/3`;

// Action
export const getActionData = (data) => {
    return {
        type: GET_ACTION,
        data
    }
};

export const getAction = () => dispatch => {
    return axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&language=ko&with_genres=28`)
    .then(response => {
        dispatch(getActionData(response.data))
    })
    .catch(error => {
        console.log('error');
        throw(error);
    })
};

// Comedy
export const getComedyData = (data) => {
    return {
        type: GET_COMEDE,
        data
    }
};

export const getComedy = () => dispatch => {
    return axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&language=ko&with_genres=35`)
    .then(response => {
        dispatch(getComedyData(response.data))
    })
    .catch(error => {
        throw(error);
    })
};

// Romance
export const getRomanceData = (data) => {
    return {
        type: GET_ROMANCE,
        data
    }
};

export const getRomance = () => dispatch => {
    return axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&language=ko&with_genres=10749`)
    .then(response => {
        dispatch(getRomanceData(response.data))
    })
    .catch(error => {
        throw(error);
    })
};

// Animation
export const getAnimationData = (data) => {
    return {
        type: GET_ANIMATION,
        data
    }
};

export const getAnimation = () => dispatch => {
    return axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&language=ko&with_genres=16`)
    .then(response => {
        dispatch(getAnimationData(response.data))
    })
    .catch(error => {
        throw(error);
    })
};

// Horror
export const getHorrorData = (data) => {
    return {
        type: GET_HORROR,
        data
    }
};

export const getHorror = () => dispatch => {
    return axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&language=ko&with_genres=27`)
    .then(response => {
        dispatch(getHorrorData(response.data))
    })
    .catch(error => {
        throw(error);
    })
};

