<template>
  <div class="wrapper">
    <parallax class="section1"></parallax>
    <div class="main main-raised">
      <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
        <h2 class="text-center title">Eventos</h2>
        
        <div class="mx-auto text-center">
          <b-table striped hover :fields="fields" :items="eventos">
            <template slot="Tipo" slot-scope="data">
              <p v-if="data.item.type == 'FOOD'"> Alimentos </p>
              <p v-if="data.item.type == 'CLOTHING'"> Roupas </p>
              <p v-if="data.item.type == 'RELIGION'"> Religiosa </p>
              <p v-if="data.item.type == 'OTHERS'"> Outros </p>
            </template>
            <template slot="Região" slot-scope="data">
              <p>{{data.item.region.region_name}}</p>
            </template>
            <template slot="Endereço" slot-scope="data">
              <p>{{data.item.region.region_address}}
              </p>
              <md-button
              class="md-success md-sm"
              target="_blank"
              > ver no maps <img class="icone" src="https://img.icons8.com/color/48/000000/google-maps.png"></md-button>
            </template>
            <template slot="Data" slot-scope="data">
                {{data.item.date}}
            </template>
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
      <!-- CRIAR NOVO EVENTO MODAL -->
      <modal v-if="newEvent" @close="newEventHide">
        <template slot="header">
          <h4 class="modal-title">Criar Evento</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="newEventHide"
          >x</md-button>
        </template>
        <template slot="body">
        <md-content class="md-scrollbar">
            <b-form-group id="input-group-3" label="Instituição:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="selected_institution"
                :options="institutions"
                value-field="id"
                text-field="name"
                required
                disabled
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
            <iframe class="calendarView" :src="url"></iframe>
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
          </md-content>
          </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="newEventHide">Cancelar</md-button>
          <md-button @click="salvar" class="md-simple md-success">Criar Evento</md-button>
        </template>
      </modal>
      <!-- EDITAR REGIAO ATUAL -->
      <modal v-if="editEvent" @close="editEventHide">
        <template slot="header">
          <h4 class="modal-title">Visualizar Evento</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="editEventHide"
          >x</md-button>
        </template>

        <template slot="body">
       <md-content class="md-scrollbar">
            <b-form-group id="input-group-3" label="Instituição:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="selected_institution"
                :options="institutions"
                value-field="id"
                text-field="name"
                required
                disabled
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
            <iframe class="calendarView" :src="url"></iframe>
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
          </md-content>
        </template>

        <template slot="footer">
          <md-button class="md-danger md-simple" @click="editEventHide">Fechar</md-button>
          <md-button class="md-simple md-warning" @click="editar">Editar</md-button>
          <md-button class="md-simple md-danger" @click="excluir(event_selected.id)">Excluir</md-button>
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
      newEvent: false,
      editEvent: false,
      fields: ["Tipo", "Região", "Endereço", "Data", "visualizar"],
      mensagens: [],
      id_region: "",
      logged_institution: null,
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
      this.$http.get("event?iid="+localStorage.logged_institution).then(res => {
        this.eventos = res.data.data;
      });
    },
    obterTipos() {
        return [{ value:"FOOD",text: "Alimentos"}, {value:"CLOTHING",text: "Roupas"}, {value:"RELIGION",text: "Religiosa"},{value:"OTHERS",text: "Outros Tipos"}]
    },
    obterTurnos() {
        return [{ value:"M",text: "Manhã"}, {value:"T",text: "Tarde"}, {value:"N",text: "Noite"}]
    },
    autenticaSessao(){
      if(localStorage.logged_institution && localStorage.token){
        this.$http.get("institution/validate_token?token="+localStorage.token).then(res => {
          this.selected_institution = localStorage.logged_institution;
          this.$http.get("institution/" + this.selected_institution).then(res => {
            this.$store.state.logged_institution = res.data;
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
        this.url = "https://calendar.google.com/calendar/b/1/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FSao_Paulo&"+"src="+ this.region.gcloud_id+ "&color=%237CB342&color=%239E69AF&color=%23009688&color=%23EF6C00&showTitle=0&showDate=1&showPrint=0&showTabs=1&showTz=0&showCalendars=0"
        console.log(this.region.gcloud_id);
     });          
		},
    obterRegions() {
      this.$http.get("region").then(res => {
        this.regions = res.data.data;
      });
    },
    editar(){
      this.salvar()
      this.excluir(this.event_selected.id)
    },
    excluir(id) {
      this.$http
        .delete(`/event/${id}`)
        .then(() => {
          this.editEventHide();
          this.obterEventos()
        });
    },
    limpar(){
      this.event_selected = null
      this.selected_region = null
      this.selected_type = null
      this.selected_turn = null
      this.selected_date = null
    }
    ,
    editEventHide() {
      this.editEvent = false;
      this.limpar();
    },
    editEventModal(data){
      this.event_selected = data
      this.selected_institution = data.institution.institution_id
      this.selected_region = data.region.region_id
      this.selected_type = data.type
      this.selected_turn = data.period
      this.selected_date = data.date
      this.recuperaCalendario();
      this.editEvent = true;
    }
    ,
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
.calendarView{
  height: 800px !important;
  width: 1000px;
}
</style>