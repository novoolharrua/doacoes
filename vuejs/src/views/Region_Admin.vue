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
              <md-button
                @click="addressRegionModal(data.item)"
                class="md-success md-sm"
                target="_blank"
              >
                ver no maps
                <img
                  class="icone"
                  src="https://img.icons8.com/color/48/000000/google-maps.png"
                />
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
            <div slot="table-busy" class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </b-table>
          <md-button
            id="criarRegiao"
            class="text-center md-success md-lg"
            target="_blank"
            @click="newRegion = true"
          >Criar Região</md-button>
        </div>
      </div>
      <!-- CRIAR NOVA REGIAO MODAL -->
      <modal v-if="newRegion" @close="newRegionHide">
        <template slot="header">
          <h4 class="modal-title">Criar Região</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="newRegionHide"
          >x</md-button>
        </template>

        <template slot="body">
          <md-field>
            <label>Nome da Região</label>
            <md-input v-model="region.name" type="text"></md-input>
          </md-field>
          <div class="md-layout">
            <div class="md-layout-item text-right ml-auto">
              <md-field id="cep">
                <label>CEP</label>
                <md-input v-on:keyup="obterCep" v-model="region.endereco.cep" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item text-right ml-auto">
              <md-field>
                <label>logradouro</label>
                <md-input v-model="region.endereco.logradouro" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item text-right ml-auto">
              <md-field>
                <label>uf</label>
                <md-input v-model="region.endereco.uf" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item text-right ml-auto">
              <md-field>
                <label>localidade</label>
                <md-input v-model="region.endereco.localidade" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item text-right ml-auto">
              <md-field>
                <label>bairro</label>
                <md-input v-model="region.endereco.bairro" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item text-right ml-auto">
              <md-field>
                <label>number</label>
                <md-input v-model="region.endereco.number" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <md-field>
            <label>Numero de Pessoas na Região</label>
            <md-input v-model="region.population" type="text"></md-input>
          </md-field>
        </template>

        <template slot="footer">
          <md-button class="md-danger md-simple" @click="newRegionHide">Cancelar</md-button>
          <md-button @click="salvar" class="md-simple md-success">Criar Região</md-button>
        </template>
      </modal>
      <!-- EDITAR REGIAO ATUAL -->
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
            <md-input v-model="region_selected.name" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Endereço da Região</label>
            <md-input v-model="region_selected.address" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Numero de Pessoas na Região</label>
            <md-input v-model="region_selected.population" type="text"></md-input>
          </md-field>
          <iframe class="calendarView" :src="url"></iframe>
        </template>

        <template slot="footer">
          <md-button class="md-danger md-simple" @click="editRegionHide">Fechar</md-button>
          <md-button class="md-simple md-warning" @click="editar">Editar</md-button>
          <md-button class="md-simple md-danger" @click="excluir(region_selected.id_region)">Excluir</md-button>
        </template>
      </modal>
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
          <iframe class="calendarView" :src="addressURL">
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
    this.autenticaSessao();
    return {
      url: null,
      newRegion: false,
      editRegion: false,
      addressRegion: false,
      fields: ["Nome", "Endereço", "População", "visualizar"],
      mensagens: [],
      id_region: "",
      isBusy: false,
      regions: this.obterRegions(),
      id: null,
      region_selected: null,
      region: {
        name: "",
        endereco: {
          cep: "",
          logradouro: "",
          complemento: "",
          bairro: "",
          localidade: "",
          uf: "",
          number: ""
        },
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
    },
    obterCep() {
      let campCep = document.getElementById("cep");
      if (this.region.endereco.cep.length == 8) {
        this.$correios.get(this.region.endereco.cep + "/json").then(res => {
          this.region.endereco = res.data;
        });
      }
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
          this.flashMessage.show({
            status: "success",
            title: "Sucesso",
            message: this.$store.state.error.excluir_regiao
          });
        })
        .catch(err => {
          this.limpar();
          this.flashMessage.show({
            status: "error",
            title: "Error",
            message: this.$store.state.error.excluir_regiao
          });
        });
    },
    editar() {
      this.excluir(this.region_selected.id_region);
      this.region.name = this.region_selected.name;
      this.region.address = this.region_selected.address;
      this.region.population = this.region_selected.population;
      this.editRegionHide();
      this.salvar();
    },
    addressRegionModal(data) {
      this.region_selected = null;
      this.$http.get("region/" + data.id_region).then(res => {
        this.region_selected = res.data;
        this.addressRegion = true;
        this.addressURL =
          "https://www.google.com/maps/embed/v1/place?key=AIzaSyCcNZsfGTX_XraIdg4l9Wy6N-8OqVc3XrI&q=" +
          this.region_selected.address;
      });
    },
    addressRegionHide() {
      this.region_selected = null;
      this.addressRegion = false;
    },
    autenticaSessao() {
      if (localStorage.logged_institution && localStorage.token) {
        this.$http
          .get("institution/validate_token?token=" + localStorage.token)
          .then(res => {
            this.$http
              .get("institution/" + localStorage.logged_institution)
              .then(res => {
                this.$store.state.logged_institution = res.data;
              })
              .catch(err => {
                this.flashMessage.show({
                  status: "error",
                  title: "Error",
                  message: this.$store.state.error.sessao
                });
                this.$router.push("/");
              });
          })
          .catch(err => {
            this.flashMessage.show({
              status: "error",
              title: "Error",
              message: this.$store.state.error.sessao
            });
            this.$router.push("/");
          });
      } else {
        this.flashMessage.show({
          status: "error",
          title: "Error",
          message: this.$store.state.error.sessao
        });
        this.$router.push("/");
      }
    },

    salvar() {
      this.region.population = parseInt(this.region.population);
      const metodo = "post";
      this.toggleBusy();
      this.newRegion = false;
      this.region.address =
        this.region.endereco.logradouro +
        ", " +
        this.region.endereco.number +
        " - " +
        this.region.endereco.bairro +
        ", " +
        this.region.endereco.localidade +
        ", " +
        this.region.endereco.uf +
        " - " +
        this.region.endereco.cep;
      this.flashMessage.show({
        title: "Info",
        message: "Criando região por favor aguarde...",
        status: "info"
      });
      this.$http[metodo](`/region`, this.region)
        .then(() => {
          this.limpar();
          this.flashMessage.show({
            title: "Sucesso",
            status: "success",
            message: this.$store.state.success.criar_regiao
          });
          this.obterRegions();
        })
        .catch(err => {
          this.flashMessage.show({
            status: "error",
            title: "Error",
            message: this.$store.state.error.criar_regiao
          });
          this.$router.push("/");
        });
      this.obterRegions();
      this.toggleBusy();
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
    newRegionHide() {
      this.limpar();
      this.newRegion = false;
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
    editRegionHide() {
      this.region_selected = null;
      this.editRegion = false;
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