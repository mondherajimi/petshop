import SpeciesService from './SpeciesService'
import {getExpirationDateList, isLoadingList} from './speciesSelector'

const ACTION_NAMESPACE = '/SPECIES'

export const types = {
	LOAD_LIST: `${ACTION_NAMESPACE}/LOAD_LIST`,
	LOADING_LIST: `${ACTION_NAMESPACE}/LOADING_LIST`,
}

export const loadSpecies = () => (dispatch, getState) => {
	if (!isLoadingList(getState()) &&
		(!getExpirationDateList(getState()) ||
		getExpirationDateList(getState()) < (+new Date()))) {
		dispatch({type: types.LOADING_LIST, payload: true})
		return SpeciesService.getSpecies().then((species) => {
			dispatch({type: types.LOADING_LIST, payload: false})
			if (species) {
				dispatch({
					type: types.LOAD_LIST,
					payload: species
				})
			}
		}).catch((e) => {
			dispatch({type: types.LOADING_LIST, payload: false})
			throw e
		})
	} else {
		console.log('SpeciesList en cache est toujours valable')
	}
}