<template>
  <div class="wrapper">
    <parallax class="section1"></parallax>
    <div class="main main-raised">
      <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
        <h2 class="text-center title">Eventos</h2>
        <div class="mx-auto text-center">
          <b-table striped hover :fields="fields" :items="eventos">
            <template slot="visualizar" slot-scope="data">
              <md-button
                class="md-success md-sm"
                target="_blank"
                @click="editEventModal(data.item)"
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
            @click="newEvent = true"
          >Criar Eventos</md-button>
        </div>
      </div>
      <!-- CRIAR NOVA REGIAO MODAL -->
      <modal v-if="newEvent" @close="newEventHide">
        <template slot="header">
          <h4 class="modal-title">Criar Região</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="newEventHide"
          >x</md-button>
        </template>

        <template slot="body"></template>

        <template slot="footer">
          <md-button class="md-danger md-simple" @click="newEventHide">Cancelar</md-button>
          <md-button @click="salvar" class="md-simple md-success">Criar Região</md-button>
        </template>
      </modal>
      <!-- EDITAR REGIAO ATUAL -->
      <modal v-if="editEvent" @close="editEventHide">
        <template slot="header">
          <h4 class="modal-title">Visualizar Região</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="editEventHide"
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
        </template>

        <template slot="footer">
          <md-button class="md-danger md-simple" @click="editEventHide">Fechar</md-button>
          <md-button class="md-simple md-warning" @click="editar">Editar</md-button>
          <md-button class="md-simple md-danger" @click="excluir(region_selected.id_region)">Excluir</md-button>
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
      newEvent: false,
      editEvent: false,
      fields: ["type", "region", "date", "visualizar"],
      mensagens: [],
      id_region: "",
      eventos: this.obterEventos(),
      regions: this.obterRegions(),
      id: null,
      event_selected: null
    };
  },
  methods: {
    excluir(id_region) {
      this.$http
        .delete(`/region/${id_region}`)
        .then(() => {
          this.obterEventos();
        })
        .catch(err => {
          this.mensagens.push({
            texto: "Problema para excluir!",
            tipo: "danger"
          });
        });
    },
    salvar() {
      const metodo = "post";
      this.toggleBusy();
      this.newEvent = false;
      this.$http[metodo](`/event`).then(() => {
        this.limpar();
        this.mensagens.push({
          texto: "Operação realizada com sucesso!",
          tipo: "success"
        });
      });
      this.obterEventos();
      this.toggleBusy();
    },
    obterEventos() {
      this.$http.get("event").then(res => {
        this.eventos = res.data.data;
      });
    },
    obterRegions() {
      this.$http.get("region").then(res => {
        this.regions = res.data.data;
      });
    },
    editEventHide() {
      this.editEvent = false;
    },
    newEventHide() {
      this.newEvent = false;
    }
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