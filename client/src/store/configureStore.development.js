import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import rootReducer from '../reducers'

const router = routerMiddleware(browserHistory)

let enhancers
if (window.devToolsExtension) {
	// utilisation de redux dev tools uniquement
	enhancers = [applyMiddleware(thunk, router), window.devToolsExtension()]
} else {
	// à défaut, utilisation du redux-logger middleware
	const loggerMiddleware = createLogger({
		level: 'info',
		collapsed: true
	})
	enhancers = [applyMiddleware(loggerMiddleware, thunk, router)]
}

export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, compose(...enhancers))

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
		})
	}

	return store
}
