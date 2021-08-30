import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElemPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import request from './utils/request'
import api from './api'
import storage from './utils/storage'
import store from './store'

import './assets/style/reset.css'
import './assets/style/index.scss'

console.log('环境变量=》', import.meta.env) //VITE专属

const app = createApp(App)

app.directive('has', {
  // 比如 v-has:add="'user-create'"(注意，一定要用字符串引起来，否则是个函数了，)
  // el是绑定过的元素   ， binding.args = 'add'  binding.value = 'user-crate'
  //使用 USER.VUE <el-button type="danger" v-has="'user-patch-delete'"@click="handlePatchDel">批量删除</el-button>
  beforeMount: function (el, binding) {
    let actionList = storage.getItem('actionList')
    let value = binding.value
    let hasPermission = actionList.includes(value)
    if (!hasPermission) {
      el.style = 'display:none'
      //光隐藏不够，删了他，做个异步因为在beforeMount钩子了  他还没有渲染到DOM上
      setTimeout(() => {
        el.parentNode.removeChild(el)
      }, 0)
    }
  }
})

app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api

app.use(router).use(store).use(ElemPlus, { size: 'small' }).mount('#app')
