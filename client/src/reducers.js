import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import notifierReducer from './pages/notifier/NotifierReducer'
import pets from './webservices/pets/petReducer'
import species from './webservices/species/speciesReducer'
import searchPetFilter from './pages/pets/list/search/searchPetReducer'

const notifications = notifierReducer()

const webservices = combineReducers({
	pets,
	species
})


const pages = combineReducers({
	searchPetFilter
})

const rootReducer = combineReducers({
	pages,
	webservices,
	notifications,
	routing,
	form: formReducer     // <---- Mounted at 'form'
})

export default rootReducer
