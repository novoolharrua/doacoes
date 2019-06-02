<template>
  <div class="wrapper">
    <parallax class="section1">
    </parallax>
    <div class="main main-raised ">
        <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
          <h2 class="text-center title">Eventos</h2>
    			<div
            class=" mx-auto text-center"
          >
					<b-table striped hover :fields="fields" :busy="isBusy" :items="regions">
						
						<template slot="visualizar" slot-scope="data">
							<md-button
              class="md-success md-sm"
              target="_blank"
                @click="editRegionModal(data.item)"
              > Visualizar</md-button
            >
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
              > Criar Região</md-button
            >
					</div>
        </div>
			<!-- CRIAR NOVA REGIAO MODAL -->
			<modal v-if="newRegion" @close="newRegionHide" >
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
			      <md-button @click="salvar" class="md-simple md-success"> Criar Região</md-button>
						
			    </template>
			  </modal>
				<!-- EDITAR REGIAO ATUAL -->
				<modal v-if="editRegion" @close="editRegionHide">
			    <template slot="header">
			      <h4 class="modal-title"> Visualizar Região</h4>
			      <md-button
			        class="md-simple md-just-icon md-round modal-default-button"
			        @click="editRegionHide"
			      >x
			      </md-button>
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
			      <md-button
			        class="md-danger md-simple"
			        @click="editRegionHide"
			        >Fechar</md-button
			      >
			      <md-button class="md-simple md-warning" @click="editar">Editar</md-button>
						<md-button class="md-simple md-danger" @click="excluir(region_selected.id_region)">Excluir</md-button>
			    </template>
			  </modal>
    </div>
</div>
</template>
<script>
import { Modal } from "@/components";
import { log } from 'util';
export default {
	components: {
    Modal
  },
	data() {
		return {
			newRegion: false,
			editRegion: false,
			fields:['name','address','population','visualizar'],
			mensagens: [],
			id_region: '',
			isBusy: false,
			regions: this.obterRegions(),
			id: null,
			region_selected:null,
			region: {
      			name: '',
      			address: '',
      			population: ''
			}
		}
	},
	methods: {
		limpar() {
      		this.name = '',
      		this.address = '',
      		this.population = null,
			this.id_region = null
			this.mensagens = []
		},
		carregar(id_region) {
			this.id_region = id_region;
			this.region = this.getRegion(id_region);
		},
		excluir(id_region) {
			this.$http.delete(`/region/${id_region}`)
				.then(() => {
					this.limpar()
					this.obterRegions()
					})
				.catch(err => {
					this.limpar()
					this.mensagens.push({
						texto: 'Problema para excluir!',
						tipo: 'danger'
					})
				})
		},
		editar(){
			this.excluir(this.region_selected.id_region);
			this.region.name = this.region_selected.name;
			this.region.address = this.region_selected.address;
			this.region.population = this.region_selected.population;
			this.editRegionHide();
			this.salvar();
		},
		salvar() {
			this.region.population = parseInt(this.region.population)
			const metodo = 'post'
			this.toggleBusy();
			this.newRegion = false;
			this.$http[metodo](`/region`, this.region)
				.then(() => {
					this.limpar();
					this.toggleBusy();
					this.obterRegions();
					this.mensagens.push({
						texto: 'Operação realizada com sucesso!',
						tipo: 'success'
					})
				})
		},
		obterRegions() {
			this.$http.get('event').then(res => {
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
        this.isBusy = !this.isBusy
      },
		newRegionHide() {
			this.limpar()
      this.newRegion = false;
		},
		editRegionModal(data) {
			this.region_selected = null;
			this.$http.get('region/'+data.id_region).then(res => {
				this.region_selected = res.data;
				this.editRegion = true;
				});
		},
		editRegionHide() {
			this.region_selected = null;
      this.editRegion = false;
		},
		Watch(){

		}
	}

}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
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