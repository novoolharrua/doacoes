<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
          >
            <h1 class="title text-center">TOME A ATITUDE!</h1>
            <h4 class="text-center">
              Unidos Para Ajudar a População em Situação de Rua
            </h4>
            <br />
            <md-button
              class="md-success md-lg"
              target="_blank"
                @click="registrarModal = true"
              > Quero Participar</md-button
            >
              <md-button
              class="md-success md-lg"
              target="_blank"
                @click="registrarModal = true"
              > Já Sou Doador</md-button
            >

          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised-margin">
      <div class="section">
        <div class="container-person">
          <div class="md-layout ">
          <div class="md-layout-item text-right ml-auto">
                <img :src="image" class="rounded size-img" />
          </div>
          <div class="md-layout-item">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-90 md-xsmall-size-100 mx-auto "
            >
              <h2 class="title ">Logo do Novo Olhar Rua
              Unidos Para Ajudar a População em Situação de Rua</h2>
              <h5 class="description">
                O que todos nós precisamos para agir em prol da população de rua é termos um Novo Olhar. Não um olhar de administrador de empresas, de um homem público, de um mantenedor da ordem ou de quem simplesmente doa alimentos, mas SIM um olhar empático de quem se imagina em situação de rua..
              </h5>

            </div>
          </div>
          <div class="md-layout">
            <div
              class="md-layout-item md-size-90 md-xsmall-size-100 mx-auto "
            >
              <h2 class="title ">Como Surgiu?
              </h2>
              <h5 class="description">
              O Projeto Novolharua surgiu da observação de múltiplas ações desencadeadas pelos órgãos públicos e pela sociedade civil em prol da população em situação de rua, sem, entretanto, uma necessária ordenação, gerando desperdício de tempo e dinheiro. Como dizem alguns moradores da rua: “Num dia muita comida, no outro passo fome, ninguém para ajudar”.              </h5>

            </div>
          </div>
          <div class="md-layout">
            <div
              class="md-layout-item md-size-90 md-xsmall-size-100 mx-auto "
            >
              <h2 class="title ">Objetivos</h2>
              <h5 class="description">
                Criar e disponibilizar informações atualizadas a cerca de serviços ofertados in loco para a população em situação de Rua de Belo Horizonte com o intuito de facilitar, organizar, articular e qualificar as diversas ações de pessoas e grupos voluntários.
              </h5>

            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main main-raised-margin">
      <div class="section text-center">
        <div class="container">
          <h2 class="title">Apoiadores</h2>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg1"
                        alt="Thumbnail Image"
                        class="img-raised rounded-box img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Vicariato
                      <br />
                      <small class="card-description text-muted">Instituição</small>
                    </h4>
                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-facebook-square"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg2"
                        alt="Thumbnail Image"
                        class="img-raised rounded-box img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Pastoral rua
                      <br />
                      <small class="card-description text-muted"
                        >Instituição</small
                      >
                    </h4>
                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-linkedin"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg3"
                        alt="Thumbnail Image"
                        class="img-raised rounded-box img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Amigos do Clovis
                      <br />
                      <small class="card-description text-muted">Grupo Individual</small>
                    </h4>


                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-facebook-square"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main main-raised-margin">
      <div class="section text-center">
        <div class="container">
          <h2 class="title">Patriocinadores</h2>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg1"
                        alt="Thumbnail Image"
                        class="img-raised rounded-box img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Vicariato
                      <br />
                      <small class="card-description text-muted">Instituição</small>
                    </h4>
                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-facebook-square"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg2"
                        alt="Thumbnail Image"
                        class="img-raised rounded-box img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Pastoral rua
                      <br />
                      <small class="card-description text-muted"
                        >Instituição</small
                      >
                    </h4>
                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-linkedin"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg3"
                        alt="Thumbnail Image"
                        class="img-raised rounded-box img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Amigos do Clovis
                      <br />
                      <small class="card-description text-muted">Grupo Individual</small>
                    </h4>


                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-facebook-square"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main main-raised">
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Entre em Contato</h2>
              <h4 class="text-center description">
                Sua Colaboração no projeto é muito importante!
              </h4>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Seu Nome</label>
                      <md-input v-model="name" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Seu Email</label>
                      <md-input v-model="email" type="email"></md-input>
                    </md-field>
                  </div>
                </div>
                <md-field maxlength="5">
                  <label>Sua Mensagem</label>
                  <md-textarea v-model="message"></md-textarea>
                </md-field>
                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success">Send Message</md-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!--MODAL REGISTRE-SE-->
  <modal v-if="registrarModal" @close="registrarModalHide">
    <template slot="header">
      <h4 class="modal-title">Registre-se</h4>


      <md-button
        class="md-simple md-just-icon md-round modal-default-button"
        @click="registrarModalHide"
      >x
      </md-button>
    </template>

    <template slot="body">
      <md-field>
        <label>Nome</label>
        <md-input v-model="name" type="text"></md-input>
      </md-field>
      <md-field>
        <label>E-Mail</label>
        <md-input v-model="email" type="email"></md-input>
      </md-field>      
      <md-field>
        <label>CPF</label>
        <md-input v-model="cpf" type="text"></md-input>
      </md-field>
      <md-field>
        <label>CEP</label>
        <md-input v-model="endereco.cep" type="text"></md-input>
      </md-field>
      <div class="md-layout-item text-right ml-auto">
      <md-field>
        <label>uf</label>
        <md-input v-model="endereco.uf" type="text"></md-input>
      </md-field>
      <md-field>
        <label>localidade</label>
        <md-input v-model="endereco.localidade" type="text"></md-input>
      </md-field>
      </div>
      <md-field>
        <label>logradouro</label>
        <md-input v-model="endereco.logradouro" type="text"></md-input>
      </md-field>
      <div class="md-layout ">
      <div class="md-layout-item text-right ml-auto">
      <md-field>
        <label>bairro</label>
        <md-input v-model="endereco.bairro" type="text"></md-input>
      </md-field>
      </div>
      <div class="md-layout-item text-right ml-auto">
      <md-field>
        <label>number</label>
        <md-input v-model="endereco.number" type="text"></md-input>
      </md-field>
      </div>
      </div>
      <div class="md-layout ">
            <div class="md-layout-item text-right ml-auto">
            <md-checkbox v-model="checkbox1">Alimentação</md-checkbox>
            </div>
            <div class="md-layout-item text-right ml-auto">
            <md-checkbox v-model="checkbox2">Roupas</md-checkbox>
            </div>
            <div class="md-layout-item text-right ml-auto">
            <md-checkbox v-model="checkbox3"
              >Religiosidade</md-checkbox
            >
            </div>
            <div class="md-layout-item text-right ml-auto">
            <md-checkbox v-model="checkbox3"
              >Outros</md-checkbox
            >
            </div>
        </div>
      <md-field>
        <label>Senha</label>
        <md-input v-model="senha" type="password"></md-input>
      </md-field>
    </template>

    <template slot="footer">
      <md-button
        class="md-danger md-simple"
        @click="registrarModalHide"
        >Fechar</md-button
      >
      <md-button class="md-simple md-success">Registrar</md-button>

    </template>
  </modal>
  <!--MODAL LOGIN-->
  </div>
</template>

<script>
import { Modal } from "@/components";
export default {
  components: {
    Modal
  },
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
    },
    teamImg1: {
      type: String,
      default: require("@/assets/img/faces/avatar.jpg")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/kendall.jpg")
    }
  },
  data() {
    return {
      registrarModal: false,
      name: null,
      email: null,
      message: null,
      image: require("@/assets/img/logos/logo.jpg"),
      endereco: {
        cep: '',
        logradouro:'',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
        number:''
      }
    };
  },
  methods: {
    registrarModalHide() {
      this.registrarModal = false;
    },
    obterInfos(cep) {
      this.$correios.get(cep+"/json").then(res => {
        this.endereco = res.data;
      });
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.text-right{
  text-align: right;
}
.contact-form {
  margin-top: 30px;
}
.container-person{
  width: 80%;
}
.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
