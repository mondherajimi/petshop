import { createSelector } from 'reselect'
import {convertDateFRToDateEN} from '../../utils/formatUtils'

export const getExpirationDateList = state => state.webservices.pets && state.webservices.pets.expirationDateList
export const getExpirationDateById = id => state => (
	state.webservices.pets &&
	state.webservices.pets.expirationDateById &&
	state.webservices.pets.expirationDateById.get(id))
export const isLoadingList = state => state.webservices.pets && state.webservices.pets.loadingList
export const getPetsById = state => state.webservices.pets && state.webservices.pets.petById
export const getPet = id => state => (
	state.webservices.pets &&
	state.webservices.pets.petById &&
	state.webservices.pets.petById.get(id))
export const isLoading = id => state => (
	state.webservices.pets &&
	state.webservices.pets.loadingById &&
	state.webservices.pets.loadingById.has(id)
)

export const getPetList = createSelector(
	getPetsById,
	(petsById) => {
		const result = petsById.valueSeq().toArray()
		result.sort((p1, p2) => {
			return p1.name && p1.name.localeCompare(p2.name)
		})
		return result
	}
)

const calculateAge = (birthday) => {
	if (!birthday || !birthday.getTime()) {
		return null
	}
	var ageDifMs = Date.now() - birthday.getTime()
	var ageDate = new Date(ageDifMs) // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970)
}

// Recupere les informations de pet avec des données calculées en plus (age, date de mise à jour, date de création)
const computePetWithMetadata = (p) => {
	const birthday = new Date(convertDateFRToDateEN(p.birthday))
	const age = calculateAge(birthday)

	const createdDateTime = p.created && new Date(p.created)
	const createdLocalString = createdDateTime &&
		`${createdDateTime.toLocaleDateString()} ${createdDateTime.toLocaleTimeString()}`

	const updatedDateTime = p.updated && new Date(p.updated)
	const updatedLocalString = updatedDateTime &&
		`${updatedDateTime.toLocaleDateString()} ${updatedDateTime.toLocaleTimeString()}`
	return {
		...p,
		age,
		createdDate: createdLocalString,
		updatedDate: updatedLocalString,
	}
}

export const getPetListWithMetadata = createSelector(
	getPetList,
	(pets) => {
		return pets && pets.map(p => {
				return computePetWithMetadata(p)
			})
	}
)

export const getPetWithMetadata = (id) => createSelector(
	getPet(id),
	(pet) => {
		if (!pet) {
			return null
		}
		return computePetWithMetadata(pet)
	}
)