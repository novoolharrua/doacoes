import Vue from "vue";
import Router from "vue-router";
import Inicio from "./views/Inicio.vue";
import InsideNavbar from "./layout/InsideNavBar.vue";
import MainFooter from "./layout/MainFooter.vue";
import Instituicoes_Admin from "./views/Instituicoes_Admin.vue";
import Region from "./views/Region.vue";
import Eventos from "./views/Eventos.vue";
import Links_Telefones from "./views/Links_Telefones.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import Links_Telefones_Admin from "./views/Links_Telefones_Admin.vue";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/admin_region",
            name: "admin_region",
            components: { default: Region, header: InsideNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/events",
            name: "events",
            components: { default: Eventos, header: InsideNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/",
            name: "index",
            components: { default: Inicio, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/admin_institution",
            name: "admin_institution",
            components: { default: Instituicoes_Admin, header: InsideNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/links",
            name: "links",
            components: { default: Links_Telefones, header: InsideNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/admin_info",
            name: "admin_info",
            components: { default: Links_Telefones_Admin, header: InsideNavbar, footer: MainFooter },
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