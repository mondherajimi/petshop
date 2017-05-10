import path from 'path'
import fse from 'fs-extra'

const entityName = process.argv[2]
if (!entityName) {
	console.log('Missing EntityName parameter')
	process.exit()
}

const replaceVariablesInfFile = (filename) => {
	let content = fse.readFileSync(filename, 'utf8')
	content = content.replace(/__Entity__/g, entityName);
	content = content.replace(/__entity__/g, entityNameLowerCase)
	content = content.replace(/__ENTITY__/g, entityNameUpperCase)
	fse.writeFileSync(filename, content, 'utf8')
}

const entityNameLowerCase = entityName.toLowerCase()
const entityNameUpperCase = entityName.toUpperCase()

console.log(`Generating CRUD sources for ${entityName} entity...`)
console.log('---')
fse.copySync(path.join(__dirname, '/template/actions.js'), path.join(__dirname, `/out/${entityNameLowerCase}Actions.js`))
replaceVariablesInfFile(path.join(__dirname, `/out/${entityNameLowerCase}Actions.js`))
console.log(`... /out/${entityNameLowerCase}Actions.js created...`)

fse.copySync(path.join(__dirname, '/template/reducer.js'), path.join(__dirname, `/out/${entityNameLowerCase}Reducer.js`))
replaceVariablesInfFile(path.join(__dirname, `/out/${entityNameLowerCase}Reducer.js`))
console.log(`... /out/${entityNameLowerCase}Reducer.js created...`)

fse.copySync(path.join(__dirname, '/template/selector.js'), path.join(__dirname, `/out/${entityNameLowerCase}Selector.js`))
replaceVariablesInfFile(path.join(__dirname, `/out/${entityNameLowerCase}Selector.js`))
console.log(`... /out/${entityNameLowerCase}Selector.js created...`)

fse.copySync(path.join(__dirname, '/template/service.js'), path.join(__dirname, `/out/${entityName}Service.js`))
replaceVariablesInfFile(path.join(__dirname, `/out/${entityName}Service.js`))
console.log(`... /out/${entityName}Service.js created...`)

console.log('---')
console.log('... generation successed !')
console.log('You can copy the generated sources from the /out directory to your React Redux project.')
console.log(`Don't forget to include ${entityNameLowerCase}Reducer.js in your root Reducer ;)`)