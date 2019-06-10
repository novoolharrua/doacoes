import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logged_institution: null,
        token: null,
        success: {
            generico: "Sucesso.",
            criar_regiao: "Região criada com sucesso.",
            criar_link_util: "Informação util criada com sucesso",
            cadastro_instituicao: "Cadastro efetuado",
            editar_regiao: "Região editada com sucesso",
            editar_link_util: "Informação util editada com sucesso",
            editar_instituicao: "Instituição editada com sucesso",
            excluir_regiao: "Região excluida com sucesso",
            excluir_link_util: "Informação util excluida com sucesso",
            excluir_instituicao: "Instituição excluida com sucesso",
        },
        error: {
            usuario_senha_invalida: "Usuario ou Senha Invalida.",
            inesperado: "Erro inesperado.",
            sessao: "sessão expirada ou invalida, favor refazer o login",
            campos_obrigatorios: "Favor preencher todos os campos obrigatórios.",
            criar_regiao: "Ocorreu um problema ao cadastrar uma região, favor contatar o suporte.",
            criar_link_util: "Ocorreu um problema ao cadastrar uma informação util, favor contatar o suporte.",
            cadastro_instituicao: "Ocorreu um problema ao registrar sua instituição, tente mais tarde.",
            editar_regiao: "Ocorreu um problema ao editar uma região, favor contatar o suporte.",
            editar_link_util: "Ocorreu um problema ao editar uma informação util, favor contatar o suporte.",
            editar_instituicao: "Ocorreu um problema ao editar uma instituição, favor contatar o suporte.",
            excluir_regiao: "Ocorreu um problema ao excluir uma região, favor contatar o suporte.",
            excluir_link_util: "Ocorreu um problema ao excluir uma informação util, favor contatar o suporte.",
            excluir_instituicao: "Ocorreu um problema ao excluir uma instituição, favor contatar o suporte.",
        }
    }
})