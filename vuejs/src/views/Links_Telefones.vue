<template>
  <div class="container">
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

    <!-- <b-list-group>
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
    </b-list-group>-->
  </div>
</template>



<script>
export default {
  data() {
    return {
      mensagens: [],
      infos: this.obterInfos(),
      fields:['name','description','link','phone'],
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
