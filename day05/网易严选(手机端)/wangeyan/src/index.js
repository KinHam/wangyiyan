import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router/index'

import './utils/vant_use'
import 'swiper/css/swiper.css'
import './utils/flexible'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')