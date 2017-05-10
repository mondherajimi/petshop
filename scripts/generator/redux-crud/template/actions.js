import __Entity__Service from './__Entity__Service'
import {
	getExpirationDateList,
	getExpirationDateById,
	isLoading,
	isLoadingList
} from './__entity__Selector'

const ACTION_NAMESPACE = '/__ENTITY__S'

export const types = {
	LOAD_LIST: `${ACTION_NAMESPACE}/LOAD_LIST`,
	LOADING_LIST: `${ACTION_NAMESPACE}/LOADING_LIST`,
	LOAD___ENTITY__: `${ACTION_NAMESPACE}/LOAD`,
	LOADING: `${ACTION_NAMESPACE}/LOADING`,
	ADD___ENTITY__: `${ACTION_NAMESPACE}/ADD`,
	REMOVE___ENTITY__: `${ACTION_NAMESPACE}/REMOVE___ENTITY__`,
}

export const load__Entity__s = () => (dispatch, getState) => {
	if (!isLoadingList(getState()) &&
		(!getExpirationDateList(getState()) ||
		getExpirationDateList(getState()) < (+new Date()))) {
		dispatch({type: types.LOADING_LIST, payload: true})
		return __Entity__Service.get__Entity__s().then((__entity__s) => {
			dispatch({type: types.LOADING_LIST, payload: false})
			if (__entity__s) {
				dispatch({
					type: types.LOAD_LIST,
					payload: __entity__s
				})
			}
		}).catch((e) => {
			dispatch({type: types.LOADING_LIST, payload: false})
			throw e
		})
	} else {
		console.log('__Entity__List en cache est toujours valable')
	}
}

export const load__Entity__ = (id) => (dispatch, getState) => {
	if (!isLoading(id)(getState()) &&
		(!getExpirationDateById(id)(getState()) ||
		getExpirationDateById(id)(getState()) < (+new Date()))) {
		dispatch({type: types.LOADING, payload: {loading: true, id}})
		return __Entity__Service.get__Entity__(id).then((__entity__) => {
			dispatch({type: types.LOADING, payload: {loading: false, id}})
			if (__entity__) {
				dispatch({
					type: types.LOAD___ENTITY__,
					payload: __entity__
				})
			}
		}).catch((e) => {
			dispatch({type: types.LOADING, payload: {loading: false, id}})
			throw e
		})
	} else {
		console.log(`__Entity__ ${id} en cache est toujours valable`)
	}
}


export const add__Entity__ = (__entity__) => (dispatch) => {
	dispatch({
		type: types.LOAD___ENTITY__,
		payload: __entity__
	})
}

export const remove__Entity__ = (id__Entity__) => (dispatch) => {
	dispatch({
		type: types.REMOVE___ENTITY__,
		payload: id__Entity__
	})
}