import { types } from './speciesActions'
import { combineReducers } from 'redux'

const cacheDuration = 600

const speciesList = (state = [], action) => {
	switch (action.type) {
		case types.LOAD_LIST: {
			return action.payload
		}
		default:
			return state
	}
}

const loadingList = (state = false, action) => {
	switch (action.type) {
		case types.LOADING_LIST:
			{
				return action.payload
			}
		default:
			return state
	}
}


const expirationDateList = (state = null, action) => {
	switch (action.type) {
		case types.LOADING_LIST:
		{
			return (+new Date() + cacheDuration * 1000)
		}
		default:
			return state
	}
}


export default combineReducers({
	loadingList,
	speciesList,
	expirationDateList
})
