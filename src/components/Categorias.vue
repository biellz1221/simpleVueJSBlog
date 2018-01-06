<template>
    <div>
        <linha-container>
            <div class="flex-container categorias">
                <div class="lista-categorias">
                    <span class="titulo-lista">Lista de Categorias</span>
                    <ul>
                        <transition name="fade">
                            <li v-if="!loaded" class='loading' style="text-align:center">
                                <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                            </li>
                        </transition>
                        <li v-for="(categoria, index) in catPages[actualPage]" :key='index'>{{categoria.nome}}</li>
                    </ul>
                    <v-pages items="categorias" itemsPerPage='2'></v-pages>
                </div>
                
                <div class="inserir-categoria">
                    <span class="insira-categoria">Insira uma Categoria</span>
                    <p>Basta digitar o nome e apertar em inserir.</p>
                    <input type="text" name="categoria" placeholder="Nome da Categoria" v-model='categoria' @keyup.enter="insereCategoria" maxlength="30">
                    <button @click="insereCategoria">Inserir</button>
                </div>
            </div>
            <transition name="fade">
                <div class="div-info info-success" v-if="mostraMsg">
                    {{msgSucessoErro}}
                </div>
            </transition>
        </linha-container>
        

    </div>
</template>

<script>
import {fbDB} from '../fbConfig'
import { mapGetters } from 'vuex'
export default {
    data: () => {
        return {
            categoria: '',
            msgSucessoErro: 'Categoria inserida com sucesso!',
            mostraMsg: false,
        }
    },
    computed:{
        ...mapGetters([
            'categorias',
            'catPages',
            'actualPage',
            'loaded'
        ]),
    },
    methods: {
        insereCategoria(){
            if (this.categoria) {
                fbDB.ref('categorias').push({
                    nome: this.categoria,
                });
                this.categoria = ''
                this.mostraMsg = true
                setTimeout(() => {this.mostraMsg = false}, 1500)
            } else {
                alert("Não pode inserir uma categoria sem nome!")
            };
        },
    }
}
</script>

<style>

</style>
