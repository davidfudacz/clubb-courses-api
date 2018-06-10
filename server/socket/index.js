module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection has been made with id: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} is no more`)
    })
  })
}
