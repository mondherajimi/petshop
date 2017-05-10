const ACTION_NAMESPACE = '/SEARCH_PET'

export const types = {
	UPDATE_SEARCH_FILTER: `${ACTION_NAMESPACE}/UPDATE_SEARCH_FILTER`,
	SHOW_FILTER: `${ACTION_NAMESPACE}/SHOW_FILTER`,
}

export const updateSearchFilter = values => (dispatch) => {
	dispatch({
		type: types.UPDATE_SEARCH_FILTER,
		payload: values
	})
}

export const setShowFilter = value => (dispatch) => {
	dispatch({
		type: types.SHOW_FILTER,
		payload: value
	})
}