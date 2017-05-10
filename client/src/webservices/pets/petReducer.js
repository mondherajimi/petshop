import { types } from './petActions'
import { combineReducers } from 'redux'
import { Map, Set } from 'immutable'

const cacheDuration = 600

const initialState = new Map({})
const petById = (state = initialState, action) => {
	switch (action.type) {
		case types.LOAD_LIST: {
			if (!action.payload) {
				return new Map({})
			}
			let result = state
			action.payload.forEach((pet) => {
				result = result.set(pet._id, pet)
			})
			return result
		}
		case types.ADD_PET:
		case types.LOAD_PET: {
			if (action.payload) {
				return state.set(action.payload._id, action.payload)
			}
			return state
		}
		case types.REMOVE_PET: {
			return state.remove(action.payload)
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

// liste des ids en cours de telechargement
const initialStateLoading = new Set([])
const loadingById = (state = initialStateLoading, action) => {
	switch (action.type) {
		case types.LOADING: {
			const key = action.payload.id
			if (action.payload.loading) {
				return state.add(action.payload.id)
			}
			return state.delete(action.payload.id)
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

const initialExpirationDateState = new Map({})
const expirationDateById = (state = initialExpirationDateState, action) => {
	switch (action.type) {
		case types.LOAD_LIST: {
			if (!action.payload) {
				return new Map({})
			}
			let result = state
			action.payload.forEach((pet) => {
				result = result.set(pet._id, (+new Date() + cacheDuration * 1000))
			})
			return result
		}
		case types.ADD_PET:
		case types.LOAD_PET: {
			if (action.payload) {
				return state.set(action.payload._id, (+new Date() + cacheDuration * 1000))
			}
			return state
		}
		case types.REMOVE_PET: {
			return state.remove(action.payload)
		}
		default:
			return state
	}
}


export default combineReducers({
	loadingList,
	petById,
	loadingById,
	expirationDateList,
	expirationDateById
})
