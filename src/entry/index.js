import Vue from 'vue'
import Main from '../modules/main/Main'

Vue.config.productionTip = false

new Vue({
  render: h => h(Main),
}).$mount('#root')
