import { createStore } from 'vuex'
import mutations from './mutation'
import storage from '../utils/storage'

const state = {
  userInfo: storage.getItem('userInfo') || {},
  menuList: storage.getItem('menuList'),
  actionList: storage.getItem('actionList')
}

export default createStore({
  state,
  mutations
})
