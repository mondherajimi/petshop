let io = null
export const initSocketIOController = (socketIO) => {
	io = socketIO

	io.on('connection', (socket) => {
		console.log('USER CONNECTED', socket.id)

		socket.on('updatePet', (pet) => {
			socket.broadcast.emit('updatePet', pet)
		})
		socket.on('removePet', (pet) => {
			socket.broadcast.emit('removePet', pet)
		})
		socket.on('disconnect', () => {
			console.log('USER DISCONNECTED')
		})
	})
}
