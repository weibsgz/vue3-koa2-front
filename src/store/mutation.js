import storage from '../utils/storage'

export default {
  saveUserInfo(state, payload) {
    state.userInfo = payload
    storage.setItem('userInfo', payload)
  },
  saveMenuList(state, menuList) {
    state.menuList = menuList
    storage.setItem('menuList', menuList)
  },
  saveActionList(state, actionList) {
    state.actionList = actionList
    storage.setItem('actionList', actionList)
  }
}
