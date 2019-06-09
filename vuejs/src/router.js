import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Inicio from "./views/Inicio.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import SecondNavBar from "./layout/SecondNavBar.vue"
import MainFooter from "./layout/MainFooter.vue";
import Instituicoes_Admin from "./views/Instituicoes_Admin.vue";
import Region from "./views/Region.vue";
import Eventos from "./views/Eventos.vue";
import Links_Telefones from "./views/Links_Telefones.vue";
import Links_Telefones_Admin from "./views/Links_Telefones_Admin.vue";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "index",
            components: { default: Index, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/region",
            name: "region",
            components: { default: Region, header: SecondNavBar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/events",
            name: "index",
            components: { default: Eventos, header: SecondNavBar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/landing",
            name: "inicio",
            components: { default: Inicio, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/instituicoes_admin",
            name: "instituicoes admin",
            components: { default: Instituicoes_Admin, header: SecondNavBar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/links",
            name: "links",
            components: { default: Links_Telefones, header: SecondNavBar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/links_admin",
            name: "links admin",
            components: { default: Links_Telefones_Admin, header: SecondNavBar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/login",
            name: "login",
            components: { default: Login, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: "/profile",
            name: "profile",
            components: { default: Profile, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        }
    ],
    scrollBehavior: to => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    }
});