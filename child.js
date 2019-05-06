process.on('message', ({ id }) => {
  setTimeout(() => {
    console.log(`child: ${id}`)
    process.send({ child: id })
  }, 5 * 1000)
})
