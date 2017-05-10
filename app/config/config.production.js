import nconf  from 'nconf'
import pkgUI from '../../package.json'

const configurationFilename = process.env.CONFIG;
nconf.argv().env().file({ file: configurationFilename });

const versionUI = pkgUI && pkgUI.versionUI
const config = {
	mongodb: nconf.get('mongodb') || 'mongodb://localhost:27017/inventory',
	apiUrl: (nconf.get('webhost') || 'http://localhost:4000') + '/api',
	bundlePath: `/resources/${versionUI}/js/main.js`,
	cssPath: `/resources/${versionUI}/css/main.css`
}

module.exports = config