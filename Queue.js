const Operation = require('./Operation')

class Queue {
  constructor(options = {}) {
    this.maxProccess = options.maxProccess || 5
    this.queue = []

    this.add.bind(this)
    this.start.bind(this)
  }

  add(operation) {
    if (!(operation instanceof Operation)) {
      throw new Error('add parameter must be an Operation')
    }

    this.queue.push(operation)
    const runningQueue = this.queue.filter(o => o.running)
    if (runningQueue.length < this.maxProccess) this.start(operation)
  }

  start(operation) {
    if (this.queue.length > 0) {
      operation.start(() => {
        this.queue = this.queue.filter(o => o !== operation)
        const next = this.queue.filter(o => !o.running)[0]
        if (next) this.start(next)
      })
    }
  }
}

module.exports = Queue
