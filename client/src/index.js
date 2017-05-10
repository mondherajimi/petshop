import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import routesFactory from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './resources/bootstrap/less/bootstrap.less'
import './resources/css/styles.less'
import { initDispatch } from './controllers/SocketIOController'

injectTapEventPlugin()

function main() {
	const store = configureStore({})
	initDispatch(store.dispatch)
	const history = syncHistoryWithStore(browserHistory, store)
	const routes = routesFactory()
	ReactDOM.render(
		<Provider store={store}>
			<Router history={history} routes={routes} />
		</Provider>,
		document.getElementById('root')
	)
}

main()
