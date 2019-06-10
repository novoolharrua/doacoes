import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/store'
import './plugins/bootstrap-vue'
import './plugins/axios'
import FlashMessage from '@smartweb/vue-flash-message';

import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);
Vue.use(FlashMessage);

const NavbarStore = {
    showNavbar: false
};

Vue.mixin({
    data() {
        return {
            NavbarStore
        };
    }
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");

Vue.component('modal', {
    template: '#modal-template'
})