import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false,
  Vue.prototype.$axios = axios;
import { apiGet, apiPost } from "@/api/api";
Vue.prototype.$apiGet = apiGet,
  Vue.prototype.$apiPost = apiPost
new Vue({
  render: h => h(App),
}).$mount('#app')
