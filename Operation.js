/* eslint-disable no-underscore-dangle */
const { fork } = require('child_process')

class Operation {
  constructor(path, data) {
    this._path = path
    this._data = data
    this._running = false

    this.start.bind(this)
  }

  get data() {
    return this._data
  }

  get path() {
    return this._path
  }

  get running() {
    return this._running
  }

  start(callback) {
    this._running = true

    const child = fork(this.path)

    child.send(this.data)
    child.on('message', (...args) => {
      child.kill()
      callback(...args)
    })
  }
}

module.exports = Operation
