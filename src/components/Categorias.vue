<template>
    <div>
        <linha-container>
            <div class="flex-container categorias">
                <div class="lista-categorias">
                    <span class="titulo-lista">Lista de Categorias</span>
                    <ul>
                        <li v-for="(categoria, index) in categorias" :key='index'>{{categoria.nome}}</li>
                    </ul>
                </div>
                <div class="inserir-categoria">
                    <span class="insira-categoria">Insira uma Categoria</span>
                    <p>Basta digitar o nome e apertar em inserir.</p>
                    <input type="text" name="categoria" placeholder="Nome da Categoria" v-model='categoria' @keyup.enter="insereCategoria" maxlength="30">
                    <button @click="insereCategoria">Inserir</button>
                </div>
            </div>
            <div v-if="mostraMsg">
                {{msgSucessoErro}}
            </div>
        </linha-container>
    </div>
</template>

<script>
import {fbDB} from '../fbConfig'
export default {
    data: () => {
        return {
            categoria: '',
            mostraMsg: true,
            msgSucessoErro: 'Categoria inserida com sucesso!',
        }
    },
    firebase: {
        categorias: {
            source: fbDB.ref('categorias'),
        }
    },
    created(){
    },
    methods: {
        insereCategoria(){
            if (this.categoria != '') {
                fbDB.ref('categorias').push({
                    nome: this.categoria,
                });
                this.categoria = ''
                this.mostraMsg = true
                setTimeout(() => {this.mostraMsg = false}, 2500)
            } else {
                alert("Can't insert a category without a name!")
            };
        },

    }
}
</script>

<style>

</style>
