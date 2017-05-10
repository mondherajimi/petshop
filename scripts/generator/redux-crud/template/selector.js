import { createSelector } from 'reselect'

export const getExpirationDateList = state => state.webservices.__entity__s && state.webservices.__entity__s.expirationDateList
export const getExpirationDateById = id => state => (
	state.webservices.__entity__s &&
	state.webservices.__entity__s.expirationDateById &&
	state.webservices.__entity__s.expirationDateById.get(id)
)

export const isLoadingList = state => state.webservices.__entity__s && state.webservices.__entity__s.loadingList
export const get__Entity__sById = state => state.webservices.__entity__s && state.webservices.__entity__s.__entity__ById
export const get__Entity__ = id => state => (
	state.webservices.__entity__s &&
	state.webservices.__entity__s.__entity__ById &&
	state.webservices.__entity__s.__entity__ById.get(id)
)

export const isLoading = id => state => (
	state.webservices.__entity__s &&
	state.webservices.__entity__s.loadingById &&
	state.webservices.__entity__s.loadingById.has(id)
)

export const get__Entity__List = createSelector(
	get__Entity__sById,
	(__entity__sById) => {
		const result = __entity__sById.valueSeq().toArray()
		return result
	}
)