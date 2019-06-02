<template>
  <div class="wrapper">
    <parallax class="section1"></parallax>
    <div class="main main-raised">
      <div class="md-layout-item md-xsmall-size-100 align-middle">
        <h2 class="text-center title">Links e Telefones Úteis</h2>
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
          </b-table>
        </div>
      </div>
      <modal v-if="newRegion" @close="newRegionHide"></modal>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      mensagens: [],
      infos: this.obterInfos(),
      fields: ["imagem", "nome", "detalhe", "informacoes"],
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
    obterInfos() {
      this.$http.get("info").then(res => {
        this.infos = res.data;
      });
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
