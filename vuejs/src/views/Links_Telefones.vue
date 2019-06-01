<template>
<div class="wrapper">
    <parallax class="section1">
    </parallax>
    <div class="main main-raised ">
        <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
          <h2 class="text-center title">Regiões</h2>
    			<div
            class=" mx-auto text-center"
          >
					<b-table striped hover :fields="fields" :items="regions">
						<template slot="imagem">
                    <img
                    :src="image"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid"
                  />
			      </template>
					</b-table>
					</div>
        </div>
			<modal v-if="newRegion" @close="newRegionHide">
			    <template slot="header">
			      <h4 class="modal-title"> Criar Região</h4>
			      <md-button
			        class="md-simple md-just-icon md-round modal-default-button"
			        @click="newRegionHide"
			      >x
			      </md-button>
			    </template>
			
			    <template slot="body">
			      <md-field>
			        <label>Nome da Região</label>
			        <md-input v-model="region.name" type="text"></md-input>
			      </md-field>
			      <md-field>
			        <label>Endereço da Região</label>
			        <md-input v-model="region.address" type="text"></md-input>
			      </md-field>      
			      <md-field>
			        <label>Numero de Pessoas na Região</label>
			        <md-input v-model="region.population" type="text"></md-input>
			      </md-field>
			    </template>
			
			    <template slot="footer">
			      <md-button
			        class="md-danger md-simple"
			        @click="newRegionHide"
			        >Cancelar</md-button
			      >
			      <md-button @click="salvar" class="md-simple md-success">Criar Região</md-button>
			
			    </template>
			  </modal>
				<modal v-if="editRegion" @close="editRegionHide">
			    <template slot="header">
			      <h4 class="modal-title"> Criar Região</h4>
			      <md-button
			        class="md-simple md-just-icon md-round modal-default-button"
			        @click="editRegionHide"
			      >x
			      </md-button>
			    </template>
			
			    <template slot="body">
			      <md-field>
			        <label>Nome da Região</label>
			        <md-input v-model="region.name" type="text"></md-input>
			      </md-field>
			      <md-field>
			        <label>Endereço da Região</label>
			        <md-input v-model="region.address" type="text"></md-input>
			      </md-field>      
			      <md-field>
			        <label>Numero de Pessoas na Região</label>
			        <md-input v-model="region.population" type="text"></md-input>
			      </md-field>
			    </template>
			
			    <template slot="footer">
			      <md-button
			        class="md-danger md-simple"
			        @click="editRegionHide"
			        >Fechar</md-button
			      >
			      <md-button @click="salvar" class="md-simple md-warning">Editar</md-button>
						<md-button @click="salvar" class="md-simple md-danger">Excluir</md-button>
			    </template>
			  </modal>
    </div>
</div>
</template>
  <!-- <div class="container">
    <b-alert
      show
      dismissible
      v-for="mensagem in mensagens"
      :key="mensagem.texto"
      :variant="mensagem.tipo"
    >{{ mensagem.texto }}</b-alert>
    <b-card>
      <b-form-group label="Nome:">
        <b-form-input type="text" size="lg" v-model="info.name" placeholder="Informe o Nome"></b-form-input>
      </b-form-group>
      <b-form-group label="Telefone:">
        <b-form-input type="text" size="lg" v-model="info.phone" placeholder="Informe o Telefone"></b-form-input>
      </b-form-group>
      <b-form-group label="Link:">
        <b-form-input type="text" size="lg" v-model="info.link" placeholder="Informe seu Link"></b-form-input>
      </b-form-group>
      <b-form-group label="Descrição:">
        <b-form-input
          type="text"
          size="lg"
          v-model="info.description"
          placeholder="Informe sua descrição"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Imagem:">
        <b-form-input
          type="text"
          size="lg"
          v-model="info.image"
          placeholder="Adicione a sua Imagem"
        ></b-form-input>
      </b-form-group>

      <hr>
      <b-button @click="salvar" size="lg" variant="primary">Salvar</b-button>
      <b-button @click="obterInfos" size="lg" variant="success" class="ml-2">Obter Inoformacoes</b-button>
    </b-card>
    <hr>

    <b-table striped hover :fields="fields" :items="infos">
      <template slot="visualizar">
        <md-button class="md-success md-sm" target="_blank" @click="newRegion = true">Visualizar</md-button>
      </template>
    </b-table>

    <b-list-group>
      <b-list-group-item v-for="(informacoes, id) in infos" :key="id">
        <strong>Nome:</strong>
        {{ informacoes.name }}
        <br>
        <strong>Telefone:</strong>
        {{ informacoes.phone }}
        <br>
        <strong>Link:</strong>
        {{ informacoes.link }}
        <br>
        <b-button variant="warning" size="lg" @click="carregar(informacoes.id)">Carregar</b-button>
        <b-button variant="danger" size="lg" class="ml-2" @click="excluir(informacoes.id)">Excluir</b-button>
      </b-list-group-item>
    </b-list-group>
  </div> -->


<script>
export default {
  data() {
    return {
      mensagens: [],
      infos: this.obterInfos(),
      fields:['img','name','description','link','phone'],
      id_info: null,
      created_at: null,
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
    limpar() {
      (this.name = ""),
        (this.address = ""),
        (this.population = null),
        (this.id = null);
      this.mensagens = [];
    },
    carregar(id_region) {
      this.id = id;
      this.region = { ...this.regions[id] };
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
    salvar() {
      const metodo = "post";
      this.$http[metodo](`/info`, this.info).then(() => {
        this.limpar();
        this.obterInfos();
        /* this.mensagens.push({
          texto: "Operação realizada com sucesso!",
          tipo: "success"
        });*/
      });
    },
    obterInfos() {
      this.$http.get("info").then(res => {
        this.infos = res.data;
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
