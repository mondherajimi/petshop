export const addRoutes = (router) => {
	router.route('/species')
		.get((req, res) => {
				res.json([
					'Chat',
					'Chien',
					'Souris',
					'Oiseau',
					'Poisson',
					'Serpent',
					'Poney',
					]
				)
		})
}