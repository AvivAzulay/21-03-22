import { appService } from '../../services/app.service.js'

// Dispatchers
const _setForcast = (forcast) => ({ type: 'SET_FORCAST', forcast });
const _setError = (error) => ({ type: 'SET_ERROR', error });
const _onSaveFavorites = (favorites) => ({ type: 'SET_FAVORITES', favorites });
const _updateIsFavorite = () => ({ type: 'UPDATE_IS_FAVORITES' });
const _updateIsCelsius = () => ({ type: 'UPDATE_IS_CELSIUS' });
const _updateIsDarkMode = () => ({ type: 'UPDATE_IS_DARK_MODE' });

// THUNK
export function loadForcast(filterLocation) {
    return async (dispatch) => {
        try {
            let forcast = await appService.getForcast(filterLocation);
            dispatch(_setForcast(forcast));
        } catch (err) {
            dispatch(_setError(err));
        }
    }
}

export function get(keyword) {
    return async (dispatch) => {
        try {
            let forcast = await appService.getForcast(keyword);
            dispatch(_setForcast(forcast));
        } catch (err) {
            dispatch(_setError(err));
        }
    }
}

export function onSaveFavorites(favorites) {
    return (dispatch) => {
        dispatch(_onSaveFavorites(favorites));
    }
}

export function updateIsFavorite() {
    return (dispatch) => {
        dispatch(_updateIsFavorite());
    }
}

export function updateForcast(forcast) {
    return (dispatch) => {
        dispatch(_setForcast(forcast));
    }
}

export function setError(error) {
    return (dispatch) => {
        dispatch(_setError(error));
    }
}

export function updateIsCelsius() {
    return (dispatch) => {
        dispatch(_updateIsCelsius());
    }
}

export function updateIsDarkMode() {
    return (dispatch) => {
        dispatch(_updateIsDarkMode());
    }
}
