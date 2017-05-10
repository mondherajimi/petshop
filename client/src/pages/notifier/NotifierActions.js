const ACTION_NAMESPACE = '/NOTIFY'

export const types = {
	ADD: `${ACTION_NAMESPACE}/ADD`
}

export function addNotification(notification) {
	return {
		type: types.ADD,
		notification
	}
}
