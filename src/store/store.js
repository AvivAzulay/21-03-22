import { createStore, applyMiddleware, combineReducers } from 'redux'
import { appReducer } from './reducers/app.reducer.js'
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
    appModule: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
