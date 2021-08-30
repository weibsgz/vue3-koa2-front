import config from '../config/index.js'

//这个项目所有的storage存储在一个命名空间对象上

export default {
  getStorage() {
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
  },

  setItem(key, val) {
    let storage = this.getStorage()
    storage[key] = val
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },

  getItem(key) {
    return this.getStorage()[key]
  },
  clearItem(key) {
    let storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAlliItem() {
    window.localStorage.clear()
  }
}
