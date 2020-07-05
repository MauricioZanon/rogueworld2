import Vue from "vue"
import {VNode} from "vue"
import App from "./App.vue"
import router from "./vistas/router"
import store from "./store/store"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h): VNode => h(App)
}).$mount("#app")
