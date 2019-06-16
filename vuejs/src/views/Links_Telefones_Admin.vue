<template>
  <div class="wrapper">
    <parallax class="section1"></parallax>
    <div class="main main-raised">
      <div class="md-layout-item md-xsmall-size-100 align-middle">
        <h2 class="text-center title">Gerenciamento Links e Telefones Úteis</h2>
        <div class="mx-auto text-center">
          <b-table striped responsive hover :fields="fields" :items="infos">
            <template slot="nome" slot-scope="row">
              <p class="text-table-link">{{row.item.name}}</p>
            </template>
            <template slot="detalhe" slot-scope="row">
              <md-button
                @click="row.toggleDetails"
                class="md-success md-sm mr-2"
              >{{ row.detailsShowing ? 'Esconder' : 'Mostrar'}} Descrição</md-button>
            </template>
            <template slot="row-details" slot-scope="row">
              <p>{{row.item.description}}</p>
            </template>
            <template slot="imagem" slot-scope="image">
              <img
                :src="busca_imagem(image)"
                alt="Circle Image"
                class="img-raised rounded-circle img-fluid size-img-link"
              >
            </template>
            <template slot="informacoes" slot-scope="data">
              <p>{{data.item.phone}}</p>
              <a v-bind:href="data.item.link">{{data.item.link}}</a>
            </template>

            <template slot="visualizar" slot-scope="data">
              <md-button
                class="md-success md-sm"
                target="_blank"
                @click="editLinkModal(data.item)"
              >Visualizar</md-button>
            </template>
          </b-table>

          <md-button
            class="text-center md-success md-lg"
            target="_blank"
            @click="newLink = true"
          >Adicionar link e/ou telefone</md-button>
        </div>
      </div>
      <!-- MODAL CRIAR NOVO LINK/TELEFONE -->
      <modal v-if="newLink" @close="newLinkHide">
        <template slot="header">
          <h4 class="modal-title">Adicionar Informação</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="newLinkHide"
          >x</md-button>
        </template>

        <template slot="body">
          <md-field>
            <label>Nome da Instituição</label>
            <md-input v-model="info.name" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Telefone da Instituição(Opcional)</label>
            <md-input v-model="info.phone" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Link da Instituição(Opcional)</label>
            <md-input v-model="info.link" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Descrição da Instituição</label>
            <md-textarea v-model="info.description" type="text"></md-textarea>
          </md-field>
          <md-field>
            <label>Imagem da Instituição</label>
            <md-input v-model="info.image" type="text"></md-input>
          </md-field>
        </template>

        <template slot="footer">
          <md-button class="md-danger md-simple" @click="newLinkHide">Cancelar</md-button>
          <md-button @click="salvar" class="md-simple md-success">Criar Região</md-button>
        </template>
      </modal>

      <!-- MODAL EDITAR NOVO LINK/TELEFONE -->

      <modal v-if="editLink" @close="editLinkHide">
        <template slot="header">
          <h4 class="modal-title">Visualizar Infos/Telefones</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="editLinkHide"
          >x</md-button>
        </template>

        <template slot="body">
          <md-field>
            <label>Nome da Instituição</label>
            <md-input v-model="info_selected.name" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Telefone da Instituição(Opcional)</label>
            <md-input v-model="info_selected.phone" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Link da Instituição(Opcional)</label>
            <md-input v-model="info_selected.link" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Imagem da Instituição</label>
            <md-input v-model="info_selected.image" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Descrição da Instituição</label>
            <md-textarea v-model="info_selected.description" type="text"></md-textarea>
          </md-field>
        </template>

        <template slot="footer">
          <md-button class="md-danger md-simple" @click="editLinkHide">Fechar</md-button>
          <md-button class="md-simple md-warning" @click="editar">Editar</md-button>
          <md-button class="md-simple md-danger" @click="excluir(info_selected.id)">Excluir</md-button>
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
    this.autenticaSessao()
    return {
      newLink: false,
      editLink: false,
      mensagens: [],
      infos: this.obterInfos(),
      fields: ["imagem", "nome", "detalhe", "informacoes", "visualizar"],
      created_at: null,
      info_selected: null,
      info: {
        name: "",
        phone: "",
        link: "",
        image: "",
        description: ""
      }
    };
  },
  methods: {
    obterInfos() {
      this.$http.get("info").then(res => {
        this.infos = res.data;
      });
    },
    limpar() {
      (this.name = ""),
        (this.link = ""),
        (this.phone = ""),
        (this.image = ""),
        (this.description = ""),
        (this.id = null);
      this.mensagens = [];
    },
    excluir(id) {
      this.$http
        .delete(`/info/${id}`)
        .then(() => {
          this.limpar();
          this.obterInfos();
          this.editLinkHide();
        })
        .catch(err => {
          this.limpar();
          this.mensagens.push({
            texto: "Problema para excluir!",
            tipo: "danger"
          });
        });
    },
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
    editar() {
      this.excluir(this.info_selected.id);
      this.info.name = this.info_selected.name;
      this.info.phone = this.info_selected.phone;
      this.info.link = this.info_selected.link;
      this.info.image = this.info_selected.image;
      this.info.description = this.info_selected.description;
      this.editLinkHide();
      this.salvar();
    },
    editLinkModal(data) {
      this.info_selected = null;
      console.log(data);
      this.$http.get("info/" + data.id).then(res => {
        this.info_selected = res.data;
        this.editLink = true;
      });
    },
    salvar() {
      const metodo = "post";
      this.newLink = false;
      this.$http[metodo](`/info`, this.info).then(() => {
        this.limpar();
        this.obterInfos();
        this.mensagens.push({
          texto: "Operação realizada com sucesso!",
          tipo: "success"
        });
      });
    },

    newLinkHide() {
      this.limpar();
      this.newLink = false;
    },
    editLinkHide() {
      this.info_selected = null;
      this.editLink = false;
    },
    busca_imagem(imagem) {
      return imagem.item.image;
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
