import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import rootReducer from '../reducers'

const router = routerMiddleware(browserHistory)
const enhancer = applyMiddleware(thunk, router)

export default function configureStore(initialState) {
	const store = createStore(rootReducer,
    initialState,
    enhancer)
	return store
}
