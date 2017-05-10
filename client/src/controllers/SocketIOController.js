import io from 'socket.io-client'
import React from 'react'
import * as actions from '../webservices/pets/petActions'
import { addNotification } from '../pages/notifier/NotifierActions'

let dispatch = null

export const initDispatch = (d) => {
	dispatch = d
}

const socket = io('http://localhost:4000')

// ------------- EVENT FROM SERVER
socket.on('connect', function() {
	console.log('-- connect')
})

socket.on('updatePet', function(pet) {
	console.log('-- updatePet', pet)
	if (dispatch && pet) {
		actions.addPet(pet)(dispatch)
		dispatch(addNotification({
			message: (<div className="notification-content">
				Des informations ont été reçues pour l'animal { pet.name }
			</div>),
			level: 'info'
		}))
	}
})

socket.on('removePet', function(pet) {
	console.log('-- removePet', pet)
	if (dispatch && pet) {
		actions.removePet(pet._id)(dispatch)
		dispatch(addNotification({
			message: (<div className="notification-content">
				L'animal { pet.name } a été relaché
			</div>),
			level: 'info'
		}))
	}
})

socket.on('disconnect', function(){
	console.log('-- disconnect')
})
// ------------- END EVENT FROM SERVER

// MESSAGES CLIENT
export const emitUpdatePet = (pet) => {
	socket.emit('updatePet', pet)
}

export const emitRemovePet = (pet) => {
	socket.emit('removePet', pet)
}
