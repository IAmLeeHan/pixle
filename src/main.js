import Vue from 'vue'
import App from './App'

import RenderCanvas from 'vnode2canvas'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(RenderCanvas)

const app = new Vue(App)
app.$mount()
