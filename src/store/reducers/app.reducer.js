import { utilService } from "../../services/util.service"

const { getFavoritesFromStorage, KEY } = utilService

const initialState = {
    favorites: getFavoritesFromStorage(KEY) || null,
    autoCompleteSearch: null,
    isDarkMode: false,
    isCelsius: true,
    forcast: null,
    error: null,
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_FORCAST':
            return { ...state, forcast: { ...action.forcast } }
        case 'SET_ERROR':
            return { ...state, error: action.error }
        case 'UPDATE_IS_CELSIUS':
            return { ...state, isCelsius: !state.isCelsius }
        case 'UPDATE_IS_DARK_MODE':
            return { ...state, isDarkMode: !state.isDarkMode }
        case 'SET_FAVORITES':
            return { ...state, favorites: [...action.favorites] }
        case 'UPDATE_IS_FAVORITES':
            const { forcast } = state
            return { ...state, forcast: { ...forcast, isFavorite: !forcast.isFavorite } }
        default:
            return state
    }
}