import { types } from './searchPetActions'
import { combineReducers } from 'redux'

const initialState = {
	name: '',
	ageMin: undefined,
	ageMax: undefined,
	species: []
}

const filters = (state = initialState, action) => {
	switch (action.type) {
		case types.UPDATE_SEARCH_FILTER: {
			return action.payload
		}
		default :
			return state
	}
}


const showFilter = (state = false, action) => {
	switch (action.type) {
		case types.SHOW_FILTER: {
			return action.payload
		}
		default :
			return state
	}
}

export default combineReducers({
	filters,
	showFilter
})