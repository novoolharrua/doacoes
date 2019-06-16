<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-white"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">Novo Olhar Rua</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>

              <md-list-item
                href="javascript:void(0)"
              >
               <a href="#/">
                <p>Inicio</p>
              </a>
              </md-list-item>
              <md-list-item v-if="this.$store.state.logged_institution!=null"
                href="javascript:void(0)"
              >
              <a href="#/events">
                <p>Eventos</p>
              </a>
              </md-list-item>
              <md-list-item v-if="this.status == 1"
                href="javascript:void(0)"
              >
              <a href="#/admin_institution">
                <p>Gerenciar Instituições</p>
              </a>
              </md-list-item>
              <md-list-item v-if="this.status == 1"
                href="javascript:void(0)"
              >
              <a href="#/admin_info">
                <p>Gerenciar Informações</p>
              </a>
              </md-list-item>
              <md-list-item v-if="this.status == 1"
                href="javascript:void(0)"
              >
              <a href="#/admin_region">
                <p>Gerenciar Regiões</p>
              </a>
              </md-list-item>
              <li class="md-list-item">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple"
                        data-toggle="dropdown"
                      >
                        <p class="color-white">Informações Uteis</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="#/links">
                            <p>Links Uteis</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>
              <md-list-item v-if="this.$store.state.logged_institution!=null"
                href="javascript:void(0)"
              >
              <a @click="logout()">
                <p>Logout</p>
              </a>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      toggledClass: false,
      status: null
    };
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile"];
      return excludedRoutes.every(r => r !== this.$route.name);
    }
    
  },
  methods: {
    autenticaSessao(){
		  if(localStorage.logged_institution && localStorage.token){
		    this.$http.get("institution/validate_token?token="+localStorage.token).then(res => {
		      this.$http.get("institution/" + localStorage.logged_institution).then(res => {
		        this.$store.state.logged_institution = res.data;
		      }).catch(err => {
		      this.flashMessage.show({status: 'error', title: 'Error', message: this.$store.state.error.sessao})
		      this.$router.push('/');
		    });
		    }).catch(err => {
		      this.flashMessage.show({status: 'error', title: 'Error', message: this.$store.state.error.sessao})
		      this.$router.push('/');
		    });
		  }else{
		      this.flashMessage.show({status: 'error', title: 'Error', message: this.$store.state.error.sessao})
		    this.$router.push('/');
		  }
		},
    gerenciaNavBar(){
      if(this.$store.state.logged_institution!=null){
        this.status = this.$store.state.logged_institution.admin
      }else{
        this.status = 3
      }
      console.log(this.status);
    },
    logout(){
      delete localStorage.logged_institution;
      delete localStorage.token;
      this.autenticaSessao();
    },
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>
