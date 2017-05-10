export const convertDateFRToDateEN = (dateString) => {
	const dateSplit = dateString && dateString.split(/\//)
	return dateString && dateSplit.length === 3 && [dateSplit[1], dateSplit[0], dateSplit[2]].join('/')
}