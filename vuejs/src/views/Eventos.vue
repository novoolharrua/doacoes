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
        <template slot="body">
          <div>
            <b-form-group id="input-group-3" label="Instituição:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="selected_institution"
                :options="institutions"
                value-field="id"
                text-field="name"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group id="input-group-3" label="Região:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="selected_region"
                :options="regions"
                value-field="id_region"
                text-field="name"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group id="input-group-3" label="Doação:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="selected_type"
                :options="obterTipos()"
                required
                @input="recuperaCalendario()"
              ></b-form-select>
            </b-form-group>
            <iframe class="calendar" :src="url" style="border-width:0" width="1000" height="800" frameborder="0" scrolling="no"></iframe>
            <b-form-group id="input-group-3" label="Doação:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="selected_turn"
                :options="obterTurnos()"
                required
              ></b-form-select>
            </b-form-group>
              <md-field>
			        <label>Data:</label>
			        <md-input v-model="selected_date" type="text"></md-input>
			      </md-field>
          </div>
        </template>
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
      institutions: this.obterInstitutions(),
      selected_region: null,
      selected_type: null,
      selected_institution: null,
      selected_turn:null,
      selected_date:null,
      event_selected: null,
      event,
      id: null,
      region: null,
      url : null
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
    }
    ,
    salvar() {
      const metodo = "post";
      this.newEvent = false;
      this.selected_date
      this.event = {
        date : this.selected_date,
        period : this.selected_turn,
        type: this.selected_type
      }
      this.$http[metodo](`/event`+'?iid=' + this.selected_institution+'&rid='+this.selected_region, this.event).then(() => {
        this.mensagens.push({
          texto: "Operação realizada com sucesso!",
          tipo: "success"
        });
      });
      this.obterEventos();
    },
    obterEventos() {
      this.$http.get("event").then(res => {
        this.eventos = res.data.data;
      });
    },
    obterTipos() {
        return [{ value:"FOOD",text: "Alimentos"}, {value:"CLOTHING",text: "Roupas"}, {value:"RELIGION",text: "Religiosa"},{value:"OTHERS",text: "Outros Tipos"}]
    },
    obterTurnos() {
        return [{ value:"M",text: "Manhã"}, {value:"T",text: "Tarde"}, {value:"N",text: "Noite"}]
    }
    ,
    obterInstitutions() {
      this.$http.get("institution").then(res => {
        this.institutions = res.data;
      });
    },
    filtrarCalendario(value){
      return value.type == this.selected_type;
    }
    ,
    recuperaCalendario() {
			this.$http.get('region/'+this.selected_region).then(res => {
        this.region = res.data;
        this.region = this.region.calendars.filter(this.filtrarCalendario)[0];
        this.url = "https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FSao_Paulo&amp;"+"src="+this.region.gcloud_id+ "&amp;color=%237CB342&amp;color=%239E69AF&amp;color=%23009688&amp;color=%23EF6C00&amp;showTitle=0&amp;showDate=1&amp;showPrint=0&amp;showTabs=1&amp;showTz=0&amp;showCalendars=0"
        console.log(this.region.gcloud_id);
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