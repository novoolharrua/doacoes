<template>
  <div class="wrapper">
    <parallax class="section1"></parallax>
    <div class="main main-raised">
      <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
        <h2 class="text-center title">Gerenciamento de Instituições</h2>
        <div class="mx-auto text-center">
          <b-table striped hover :fields="fields" :items="institutions">
            <template slot="visualizar" slot-scope="data">
              <md-button
                class="md-success md-sm"
                target="_blank"
                @click="editInstitutionsModal(data.item)"
              >Visualizar</md-button>
            </template>
          </b-table>
        </div>
      </div>

      <!-- MODAL EDITAR NOVA INSTITUICAO -->

      <modal v-if="editInstitution" @close="editInstitutionHide">
        <template slot="header">
          <h4 class="modal-title">Visualizar Instituição</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="editInstitutionHide"
          >x</md-button>
        </template>

        <template slot="body">
          <md-field>
            <label>Nome da Instituição</label>
            <md-input v-model="institution_selected.name" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Endereço da Instituição</label>
            <md-input v-model="institution_selected.address" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Email da Instituição</label>
            <md-input v-model="institution_selected.email" type="text"></md-input>
          </md-field>
            <md-radio v-model="institution_selected.status" value="NEW">Nova</md-radio>
            <md-radio v-model="institution_selected.status" value="ACTIVE">Aceita</md-radio>
            <md-radio v-model="institution_selected.status" value="PENDING">Pendente</md-radio>
            <md-radio v-model="institution_selected.status" value="DENIED">Rejeitada</md-radio>
        </template>

        <template slot="footer">
          <md-button class="md-danger md-simple" @click="editInstitutionHide">Fechar</md-button>
          <md-button class="md-simple md-warning" @click="editar">Editar</md-button>
          <md-button class="md-simple md-danger" @click="excluir(institution_selected.id)">Excluir</md-button>
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
      editInstitution: false,
      mensagens: [],
      institutions: this.obterInstitutions(),
      fields: ["name", "address", "types", "status", "visualizar"],
      institution_selected: null
    };
  },
  methods: {
    editInstitutionsModal(data) {
      this.institution_selected = null;
      this.$http.get("institution/" + data.id).then(res => {
        this.institution_selected = res.data;
        this.editInstitution = true;
      });
    },
    limpar() {
      (this.name = ""),
        (this.address = ""),
        (this.email = ""),
        (this.passwd = ""),
        (this.types = ""),
        (this.shelter = 0);
      this.id = null;
      this.mensagens = [];
    },
    editInstitutionHide() {
      this.instituition_selected = null;
      this.editInstitution = false;
    },
    excluir(id) {
      this.$http
        .delete(`/institution/${id}`)
        .then(() => {
          this.limpar();
          this.obterInstitutions();
        })
        .catch(err => {
          this.limpar();
          this.mensagens.push({
            texto: "Problema para excluir!",
            tipo: "danger"
          });
        });
    },
    editar() {
      const metodo = "put";
      this.institution_selected.types = this.institution_selected.types.join(",")
      var id = this.institution_selected.id
      delete this.institution_selected.created_at
      delete this.institution_selected.id
      this.$http[metodo](`/institution/`+id, this.institution_selected).then(() => {
        this.obterInstitutions();
        this.mensagens.push({
          texto: "Operação realizada com sucesso!",
          tipo: "success"
        });
      });
    },
    obterInstitutions() {
      this.$http.get("institution").then(res => {
        this.institutions = res.data;
      });
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