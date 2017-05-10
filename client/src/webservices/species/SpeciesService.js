import AbstractRestAPI from '../../api/AbstractRestAPI'

export default class SpeciesService {

	static getSpecies() {
		return AbstractRestAPI.get('/species')
	}
}
