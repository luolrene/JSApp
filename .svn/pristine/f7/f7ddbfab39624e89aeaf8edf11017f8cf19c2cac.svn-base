import Vue from 'vue'
import App from './App'
import store from './pages/store/index.js'
import common from './common/common.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$common = common

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    ...App,
		store
})

import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
