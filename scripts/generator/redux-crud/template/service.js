import AbstractRestAPI from './AbstractRestAPI'

export default class __Entity__Service {

	static get__Entity__s() {
		return AbstractRestAPI.get('/__entity__s')
	}

	static get__Entity__(id) {
		return AbstractRestAPI.get(`/__entity__s/${id}`)
	}

	static create__Entity__(__entity__) {
		return AbstractRestAPI.post(`/__entity__s`, __entity__)
	}

	static modify__Entity__(id, __entity__) {
		return AbstractRestAPI.put(`/__entity__s/${id}`, __entity__)
	}

	static delete__Entity__(id) {
		return AbstractRestAPI.delete(`/__entity__s/${id}`)
	}
}
