import {createSelector} from 'reselect'
import {getPetListWithMetadata} from '../../../../webservices/pets/petSelector'

export const getSearchPetFilter = state => state.pages.searchPetFilter.filters
export const getShowFilter = state => state.pages.searchPetFilter.showFilter

export const getPetListFiltered = createSelector(
	getPetListWithMetadata,
	getSearchPetFilter,
	(pets, filter) => {
		return pets && pets.filter(p => {
			if (filter.name && !p.name.includes(filter.name)) {
				return false
			}
			if (filter.ageMin && (!p.age || p.age < filter.ageMin)) {
				return false
			}
			if (filter.ageMax && (!p.age || p.age > filter.ageMax)) {
				return false
			}
			if (filter.species &&
				filter.species.length > 0 &&
				!filter.species.some(s => (p.species === s))) {
				return false
			}
			return true
		})
	}
)