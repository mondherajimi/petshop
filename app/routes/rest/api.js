import express from 'express'
import sanitize from 'mongo-sanitize'
import { addRoutes as addPetRoutes } from './pets'
import { addRoutes as addSpeciesRoutes } from './species'

const router = express.Router();

router.use((req, res, next) => {
	console.log('Call api', req.path, req.body);
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// prevent mongo injection (necessaire ?)
	req.body = sanitize(req.body)
	next()
})

addPetRoutes(router)
addSpeciesRoutes(router)

export default router
