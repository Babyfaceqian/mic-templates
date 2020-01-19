import Vue from 'vue'
import Main from '../modules/main/Main'
import { Button } from 'element-ui';

// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.component(Button.name, Button);

Vue.config.productionTip = false

new Vue({
  render: h => h(Main),
}).$mount('#root')
