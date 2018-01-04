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
                        <li v-for="(categoria, index) in pages[actualPage]" :key='index'>{{categoria.nome}}</li>
                    </ul>
                    <div class="paginate">
                        <button @click="pagination('prev')" v-if="actualPage > 0" class="btn-pag-prev">
                            <i class="fa fa-angle-left"></i>
                        </button>
                        <span class="paginate-numbers">
                            <span v-for="(npag,index) in pages" :key="index" :class="'paginate-number-'+index">
                                <span v-if="index === actualPage" class="paginate-active">
                                    <button disabled="disabled"  class="btn-pag-num">{{index+1}}</button>
                                </span>
                                <button v-else @click="pagination(index)" class="btn-pag-num">{{index+1}}</button>
                            </span>
                        </span>
                        <button @click="pagination('next')" v-if="actualPage < pages.length - 1" class="btn-pag-next">
                            <i class="fa fa-angle-right"></i>
                        </button>
                    </div>
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
export default {
    data: () => {
        return {
            categoria: '',
            msgSucessoErro: 'Categoria inserida com sucesso!',
            actualPage: 0,
            arrayDasCategorias: [],
            pages: [],
            brr: [],
            mostraMsg: false,
            loaded: false,
        }
    },
    firebase: {
        categorias: {
            source: fbDB.ref('categorias'),
        }
    },
    mounted(){
        fbDB.ref('categorias').once('value').then( 
            (user) => {
                this.arrayDasCategorias = this.categorias;
                this.loaded = true;
                do {
                    this.brr = this.arrayDasCategorias.splice(0, 5);
                    this.pages.push(this.brr);
                    this.brr = [];
                } while(this.arrayDasCategorias.length > 0)
            },
            (err) => {
                console.log(err.message)
            }
        )
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
        pagination(changer) {
            if(changer === 'prev') {
                this.actualPage = this.actualPage - 1;    
            } else if (changer === 'next') {
                this.actualPage = this.actualPage + 1;    
            } else {
                this.actualPage = changer;
            }
        },
    }
}
</script>

<style>

</style>
