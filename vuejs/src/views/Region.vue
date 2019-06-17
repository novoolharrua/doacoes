<template>
  <div class="wrapper">
    <parallax class="section1"></parallax>
    <div class="main main-raised">
      <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
        <h2 class="text-center title">Regiões</h2>
        <div class="mx-auto text-center">
          <b-table striped hover :fields="fields" :busy="isBusy" :items="regions">
            <template slot="Nome" slot-scope="data">
              <p>{{data.item.name}}</p>
            </template>
			<template slot="Endereço" slot-scope="data">
              <p>{{data.item.address}}</p>
              <md-button @click="addressRegionModal(data.item)" class="md-success md-sm" target="_blank">
                ver no maps
                <img class="icone" src="https://img.icons8.com/color/48/000000/google-maps.png">
              </md-button>
            </template>
			<template slot="População" slot-scope="data">
              <p>{{data.item.population}}</p>
            </template>
            <template slot="visualizar" slot-scope="data">
              <md-button
                class="md-success md-sm"
                target="_blank"
                @click="editRegionModal(data.item)"
              >Visualizar</md-button>
            </template>
          </b-table>
        </div>
      </div>
      <!-- VISUALIZAR REGIAO ATUAL -->
      <modal v-if="editRegion" @close="editRegionHide">
        <template slot="header">
          <h4 class="modal-title">Visualizar Região</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="editRegionHide"
          >x</md-button>
        </template>

        <template slot="body">
          <md-field>
            <label>Nome da Região</label>
            <md-input v-model="region_selected.name" disabled type="text"></md-input>
          </md-field>
          <md-field>
            <label>Endereço da Região</label>
            <md-input v-model="region_selected.address" disabled type="text"></md-input>
          </md-field>
          <md-field>
            <label>Numero de Pessoas na Região</label>
            <md-input v-model="region_selected.population" disabled type="text"></md-input>
          </md-field>
          <iframe class="calendarView" :src="url"></iframe>
        </template>

        <template slot="footer">
          <md-button class="md-danger md-simple" @click="editRegionHide">Fechar</md-button>
        </template>
      </modal>
      <!-- ADRESS REGIAO ATUAL -->
      <modal v-if="addressRegion" @close="addressRegionHide">
        <template slot="header">
          <h4 class="modal-title">Visualizar Região</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="addressRegionHide"
          >x</md-button>
        </template>

        <template slot="body">
          <md-field>
            <label>Nome da Região</label>
            <md-input v-model="region_selected.name" disabled type="text"></md-input>
          </md-field>
          <md-field>
            <label>Endereço da Região</label>
            <md-input v-model="region_selected.address" disabled type="text"></md-input>
          </md-field>
          <iframe class="calendarView"
            :src="addressURL"
          >
            <a href="https://www.maps.ie/map-my-route/">Draw map route</a>
          </iframe>
        </template>

        <template slot="footer">
          <md-button class="md-danger md-simple" @click="editRegionHide">Fechar</md-button>
        </template>
      </modal>
    </div>
  </div>
</template>
<script>
import { Modal } from "@/components";
import { log } from "util";
export default {
  components: {
    Modal
  },
  data() {
    return {
      url: null,
      addressRegion: false,
	  editRegion: false,
	  addressURL: null,
      fields: ["Nome", "Endereço", "População", "visualizar"],
      mensagens: [],
      id_region: "",
      isBusy: false,
      regions: this.obterRegions(),
      id: null,
      region_selected: null,
      region: {
        name: "",
        address: "",
        population: ""
      }
    };
  },
  methods: {
    limpar() {
      (this.name = ""),
        (this.address = ""),
        (this.population = null),
        (this.id_region = null);
      this.mensagens = [];
    },
    carregar(id_region) {
      this.id_region = id_region;
      this.region = this.getRegion(id_region);
    },
    excluir(id_region) {
      this.$http
        .delete(`/region/${id_region}`)
        .then(() => {
          this.limpar();
          this.obterRegions();
        })
        .catch(err => {
          this.limpar();
          this.mensagens.push({
            texto: "Problema para excluir!",
            tipo: "danger"
          });
        });
    },
    obterRegions() {
      this.$http.get("region").then(res => {
        this.regions = res.data.data;
      });
    },
    toggleBusy() {
      let disableStatus = document.getElementById("criarRegiao");
      if (this.isBusy) {
        disableStatus.classList.remove("disable");
      } else {
        disableStatus.classList.add("disable");
      }
      this.isBusy = !this.isBusy;
    },
    editRegionModal(data) {
      this.region_selected = null;
      this.$http.get("region/" + data.id_region).then(res => {
        this.region_selected = res.data;
        this.editRegion = true;
        this.region = res.data;
        this.url =
          "https://calendar.google.com/calendar/b/1/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FSao_Paulo&" +
          "src=" +
          this.region.calendars[0].gcloud_id +
          "&amp;src=" +
          this.region.calendars[1].gcloud_id +
          "&amp;src=" +
          this.region.calendars[2].gcloud_id +
          "&color=%237CB342&color=%239E69AF&color=%23009688&color=%23EF6C00&showTitle=0&showDate=1&showPrint=0&showTabs=1&showTz=0&showCalendars=0";
      });
	},
	addressRegionModal(data) {
      this.region_selected = null;
      this.$http.get("region/" + data.id_region).then(res => {
        this.region_selected = res.data;
        this.addressRegion = true;
		this.addressURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCcNZsfGTX_XraIdg4l9Wy6N-8OqVc3XrI&q=" + this.region_selected.address
      });
    },
    editRegionHide() {
      this.region_selected = null;
      this.editRegion = false;
    },
    addressRegionHide() {
      this.region_selected = null;
      this.addressRegion = false;
    },
    Watch() {}
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
}

#app h1 {
  text-align: center;
  margin: 50px;
}
</style>