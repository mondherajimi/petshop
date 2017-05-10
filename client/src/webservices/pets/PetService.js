import AbstractRestAPI from '../../api/AbstractRestAPI'

export default class PetService {

	static getPets() {
		return AbstractRestAPI.get('/pets')
	}

	static getPet(id) {
		return AbstractRestAPI.get(`/pets/${id}`)
	}

	static createPet(pet) {
		return AbstractRestAPI.post(`/pets`, pet)
	}

	static modifyPet(id, pet) {
		return AbstractRestAPI.put(`/pets/${id}`, pet)
	}

	static deletePet(id) {
		return AbstractRestAPI.delete(`/pets/${id}`)
	}
}
