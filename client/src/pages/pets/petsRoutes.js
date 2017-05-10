import PetListPage from './list/PetListPage'
import PetPage from './pet/PetPage'
import EditPetPage from './edit/EditPetPage'

export default [
	{
		path: '/pets',
		component: PetListPage
	},
	{
		path: '/addPet',
		component: EditPetPage
	},
	{
		path: '/pets/edit',
		component: EditPetPage
	},
	{
		path: '/pets/edit/:petId',
		component: EditPetPage
	},
	{
		path: '/pets/:petId',
		component: PetPage
	},
]

