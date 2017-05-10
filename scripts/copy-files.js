/* eslint-disable no-console */
import path from 'path'
import fse from 'fs-extra'
import packageData from '../package.json'
import packageUI from '../client/package.json'

const files = [
	{src: 'configuration.json', dest: '../build/configuration.json'},
	{src: 'app/public', dest: '../build/public'},
	{src: 'app/views', dest: '../build/views'},
	{src: 'client/build/resources', dest: '../build/public/resources'},
];

function copyFile(src, dest) {
	const buildPath = path.resolve(__dirname, dest);
	return new Promise((resolve) => {
		fse.copy(
			src,
			buildPath,
			(err) => {
				if (err) throw err;
				resolve();
			}
		);
	})
		.then(() => console.log(`Copied ${src} to ${buildPath}`));
}

function createPackageFile() {
	const {
		name,
		author,
		version,
		description,
		keywords,
		repository,
		license,
		bugs,
		homepage,
		peerDependencies,
		dependencies
	} = packageData;
	const versionUI = packageUI.version

	const minimalPackage = {
		name,
		author,
		version,
		versionUI,
		description,
		main: './index.js',
		keywords,
		repository,
		license,
		bugs,
		homepage,
		peerDependencies,
		dependencies,
		scripts: {
			start: 'cross-env NODE_ENV=production CONFIG="configuration.json" node ./index.js',
		}
	}

	return new Promise((resolve) => {
		const buildPath = path.resolve(__dirname, '../build/package.json');
		const data = JSON.stringify(minimalPackage, null, 2);
		fse.writeFile(buildPath, data, (err) => {
			if (err) throw (err);
			console.log(`Created package.json in ${buildPath}`);
			resolve();
		});
	});
}

Promise.all(
	files.map(({src, dest}) => {
		return copyFile(src, dest)
	})
).then(() => createPackageFile());
