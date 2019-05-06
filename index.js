const Queue = require('./Queue')
const Operation = require('./Operation')

console.time('init done')
const array = [...new Array(20)].map((_, i) => i + 1)

const queue = new Queue({ maxProccess: 10 })

for (let index = 0; index < array.length; index += 1) {
  const id = array[index]

  const operation = new Operation('./child.js', { id })

  queue.add(operation)
}
console.timeEnd('init done')

process.on('unhandledRejection', error => {
  console.error('Unhandled Promise Rejection:', error)
})

process.on('error', e => console.error('Error:', e))
