import Vue from "vue"
import {VNode} from "vue"
import App from "./App.vue"
import router from "./vistas/router"
import store from "./store/store"

declare global {
  interface Array<T> {
      forEach2D(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => void): void;
      forEachBorde(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => void): void;
      includes2D(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => boolean): boolean;
  }
}

Array.prototype.forEach2D = function<T>(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => void): void {
  for(let i = 0; i < this.length; i++) {
    for(let j = 0; j < this[0].length; j++) {
      callback(this[i][j]);
    }
  }
}

Array.prototype.forEachBorde = function<T>(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => void): void {
  const anchoMax = this.length - 1;
  const altoMax = this[0].length - 1;
  
  for(let i = 0; i < this.length; i++) {
    callback(this[i][0]);
    callback(this[i][altoMax]);
  }
  for(let i = 0; i < this[0].length; i++) {
    callback(this[0][i]);
    callback(this[anchoMax][i]);
  }
}

Array.prototype.includes2D = function<T>(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => boolean): boolean {
  for(let i = 0; i < this.length; i++) {
    for(let j = 0; j < this[0].length; j++) {
      if(callback(this[i][j])) {
        return true;
      }
    }
  }
  return false;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h): VNode => h(App)
}).$mount("#app");