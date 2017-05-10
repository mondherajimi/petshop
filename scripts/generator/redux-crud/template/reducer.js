import { types } from './__entity__Actions'
import { combineReducers } from 'redux'
import { Map, Set } from 'immutable'

const cacheDuration = 600

const initialState = new Map({})
const __entity__ById = (state = initialState, action) => {
	switch (action.type) {
		case types.LOAD_LIST: {
			if (!action.payload) {
				return new Map({})
			}
			let result = state
			action.payload.forEach((__entity__) => {
				result = result.set(__entity__._id, __entity__)
			})
			return result
		}
		case types.ADD___ENTITY__:
		case types.LOAD___ENTITY__: {
			if (action.payload) {
				return state.set(action.payload._id, action.payload)
			}
			return state
		}
		case types.REMOVE___ENTITY__: {
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
		case types.ADD___ENTITY__:
		case types.LOAD___ENTITY__: {
			if (action.payload) {
				return state.set(action.payload._id, (+new Date() + cacheDuration * 1000))
			}
			return state
		}
		case types.REMOVE___ENTITY__: {
			return state.remove(action.payload)
		}
		default:
			return state
	}
}

export default combineReducers({
	loadingList,
	__entity__ById,
	loadingById
})
