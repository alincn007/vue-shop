'use strict'

//import 'es6-promise/auto'

//import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './store/store'
import VueMask from 'v-mask'

import axios from 'axios'
import VueAxios from 'vue-axios'

// ROUTES
import router from './router'

//import VueSocketio from 'vue-socket.io'
//Vue.use(VueSocketio, '/')

Vue.use(VueAxios, axios)
Vue.use(VueMask)
Vue.config.silent = true
Vue.config.productionTip = false
Vue.axios.defaults.headers.post['Content-Type'] = 'application/json'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
