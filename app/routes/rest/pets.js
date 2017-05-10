import Pet from '../../model/Pet'

const validatePet = (pet) => {
	const errors = {}

	if (!pet.name) {
		errors.name = 'Champ obligatoire'
	}

	if (!pet.species || pet.species == 0) {
		errors.species = 'Champ obligatoire'
	}

	return errors;
}

const validateUpdatePet = (pet) => {
	const errors = validatePet(pet)

	return Pet.find({name: pet.name}).then((pets) => {
		if (pets.some((p) => {
				return p._id != pet._id
			})) {
			errors.name = 'Ce nom est déjà utilisé pour un autre animal'
		}
		return errors;
	})
}

export const addRoutes = (router) => {
	router.route('/pets')
		.get((req, res) => {
			Pet.find().then((pets) => {
				res.json(pets)
			}).catch(e => {
				res.send(e)
			})
		})
		.post((req, res) => {
			const pet = new Pet({
				...req.body
			})
			const errors = validatePet(pet)
			if (errors && Object.keys(errors).length > 0) {
				res.status(500).json(errors);
			} else {
				Pet.create(pet).then(() => {
					res.status(201).json(pet);
				}).catch(e => {
					if (e && e.errors) {
						const errors = Object.keys(e.errors).reduce((accu, cur) => {
							return ({
								...accu,
								[cur]: e.errors[cur].message
							})
						}, {})
						res.status(500).json(errors);
					}
					console.log(e)
					res.status(500).json(e);
				})
			}
		});

	router.route('/pets/:petId')
		.get((req, res) => {
			Pet.findById(req.params.petId).then((pet) => {
				if (pet) {
					res.json(pet)
				} else {
					res.status(404).json({message: 'Not found'});
				}
			}).catch(e => {
				res.status(500).json({message: 'Error'});
			})
		})
		.put((req, res) => {
			return validateUpdatePet(req.body).then((errors) => {
				if (errors && Object.keys(errors).length > 0) {
					res.status(500).json(errors);
				} else {
					if (req.body) {
						req.body.updated = Date.now()
					}
					Pet.findByIdAndUpdate(req.params.petId, req.body, {new: true}).then((pet) => {
						if (pet) {
							res.status(201).json(pet)
						} else {
							res.status(404).json({message: 'Not found'});
						}
					}).catch(e => {
						console.log(e)
						res.status(500).json(e);
					})
				}
			})
		})
		.delete((req, res) => {
			Pet.findByIdAndRemove(req.params.petId).then((pet) => {
				if (pet) {
					res.json({message: 'Pet removed'})
				} else {
					res.status(404).json({message: 'Not found'});
				}
			}).catch(e => {
				console.log(e)
				res.status(500).json(e);
			})
		})
}