import nconf  from 'nconf'

const configurationFilename = process.env.CONFIG;
nconf.argv().env().file({ file: configurationFilename });

const config = {
	mongodb: nconf.get('mongodb') || 'mongodb://localhost:27017/inventory',
	apiUrl: 'http://localhost:4000/api'
}
module.exports = config