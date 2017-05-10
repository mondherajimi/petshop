import PetService from './PetService'
import {
	getExpirationDateList,
	getExpirationDateById,
	isLoading,
	isLoadingList
} from './petSelector'

const ACTION_NAMESPACE = '/PETS'

export const types = {
	LOAD_LIST: `${ACTION_NAMESPACE}/LOAD_LIST`,
	LOADING_LIST: `${ACTION_NAMESPACE}/LOADING_LIST`,
	LOAD_PET: `${ACTION_NAMESPACE}/LOAD`,
	LOADING: `${ACTION_NAMESPACE}/LOADING`,
	ADD_PET: `${ACTION_NAMESPACE}/ADD`,
	REMOVE_PET: `${ACTION_NAMESPACE}/REMOVE_PET`,
}

export const loadPets = () => (dispatch, getState) => {
	if (!isLoadingList(getState()) &&
		(!getExpirationDateList(getState()) ||
		getExpirationDateList(getState()) < (+new Date()))) {
		dispatch({type: types.LOADING_LIST, payload: true})
		return PetService.getPets().then((pets) => {
			dispatch({type: types.LOADING_LIST, payload: false})
			if (pets) {
				dispatch({
					type: types.LOAD_LIST,
					payload: pets
				})
			}
		}).catch((e) => {
			dispatch({type: types.LOADING_LIST, payload: false})
			throw e
		})
	} else {
		console.log('PetList en cache est toujours valable')
	}
}

export const loadPet = (id) => (dispatch, getState) => {
	if (!isLoading(id)(getState()) &&
		(!getExpirationDateById(id)(getState()) ||
		getExpirationDateById(id)(getState()) < (+new Date()))) {
		dispatch({type: types.LOADING, payload: {loading: true, id}})
		return PetService.getPet(id).then((pet) => {
			dispatch({type: types.LOADING, payload: {loading: false, id}})
			if (pet) {
				dispatch({
					type: types.LOAD_PET,
					payload: pet
				})
			}
		}).catch((e) => {
			dispatch({type: types.LOADING, payload: {loading: false, id}})
			throw e
		})
	} else {
		console.log(`Pet ${id} en cache est toujours valable`)
	}
}


export const addPet = (pet) => (dispatch) => {
	dispatch({
		type: types.LOAD_PET,
		payload: pet
	})
}

export const removePet = (idPet) => (dispatch) => {
	dispatch({
		type: types.REMOVE_PET,
		payload: idPet
	})
}