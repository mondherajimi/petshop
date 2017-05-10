import appConst from '../constant/appConst'
import ApiError from './ApiError'
import qs from 'querystring'

class AbstractRestAPI {

	static get(method, params, token) {
		return this._request(method, params, 'GET', token)
	}

	static post(method, params, token) {
		return this._request(method, params, 'POST', token)
	}

	static put(method, params, token) {
		return this._request(method, params, 'PUT', token)
	}

	static delete(method, params, token) {
		return this._request(method, params, 'DELETE', token)
	}

	static async _request(method, params, verb, token) {
		const headerArgs = {}
		if (token) {
			headerArgs.Authorization = `Bearer ${token}`
		}
		headerArgs['content-type'] = 'application/json'
		let args = ''
		if (verb === 'GET') {
			args = qs.stringify(params, {
				skipNulls: true,
				arrayFormat: 'repeat'
			})
			args = args === '' ? '' : (`?${args}`)
		}

		const url = appConst.api.baseUrl + method + args
		try {
			const response = await fetch(url, {
				method: verb,
				headers: {
					...headerArgs
				},
				body: (verb !== 'GET') ? params && JSON.stringify(params) : undefined
			})

			if (!response.ok) {
				if (response.status === 401 && method !== '/login') {
					// store.dispatch(logout())
				}

				let result = null
				try {
					result = await response.json()
				} catch (e) {
					// no json content
				}
				throw new ApiError(response.status, result)
			}

			const contentType = response.headers.get('content-type')
			if (contentType && contentType.indexOf('application/json') !== -1) {
				return await response.json()
			}
			// no content
			return {}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			throw new ApiError(500, 'Rest API unreachable')
		}
	}
}

export default AbstractRestAPI
