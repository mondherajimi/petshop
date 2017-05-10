/**
 * Erreur custom pour les retour API
 * status : code http
 * data : les données renvoyés dans le body de la réponse
 */
export default function ApiError(status, data) {
	this.status = status
	this.data = data
	return this
}
