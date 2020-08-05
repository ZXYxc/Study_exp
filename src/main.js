import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import router from './router'
import lab_panel from './components/czq/lab-panel.vue'
import cl_params_table from './components/czq/cl-params-table.vue'

// 引入element组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//axios的引入
import api from './api'
Vue.prototype.$api = api; // 将api挂载到vue的原型上

//vuex
import Vuex from 'vuex'
import store from "./store/index"

//进入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'jquery'

// 主样式
import './css/main.css'

//引入icon
import { BootstrapVue,IconsPlugin} from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(lab_panel)
Vue.use(cl_params_table)

Vue.component('lab-panel', lab_panel)
Vue.component('cl-params-table', cl_params_table)


new Vue({
  render: h => h(App),
  router,
  Vuex,
  store,
}).$mount('#app')

