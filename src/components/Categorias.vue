<template>
    <div>
        <linha-container>
            <div class="flex-container categorias">
                <!-- <div class="lista-categorias">
                    <span class="titulo-lista">Lista de Categorias</span>
                    <ul>
                        <transition name="fade">
                            <li v-if="!loaded" class='loading' style="text-align:center">
                                <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                            </li>
                        </transition>
                        <li v-for="(categoria, index) in pages[actualPage]" :key='index'>{{categoria.nome}}</li>
                    </ul>
                    
                    <button @click="pagination(1)" v-if="actualPage < pages.length - 1">próxima</button>
                    {{ actualPage + 1 }}
                    <button @click="pagination(-1)" v-if="actualPage > 0">anterior</button>
                </div> -->
                
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

<!-- <span v-for="(npag, index) in pages.length" :key="index">{{npag}}<br></span> -->

<br><br><br><br><br>
        <v-pages :items="arrayDasCategorias" dbTable="categorias"></v-pages>
    </div>
</template>

<script>
import {fbDB} from '../fbConfig'
export default {
    data: () => {
        return {
            categoria: '',
            mostraMsg: false,
            msgSucessoErro: 'Categoria inserida com sucesso!',
            loaded: false,
            arrayDasCategorias: [],
            pages: [],
            brr: [],
            actualPage: 0,
        }
    },
    firebase: {
        categorias: {
            source: fbDB.ref('categorias'),
        }
    },
    mounted(){
        fbDB.ref('categorias').on('child_added',(snapshot) => {
            //console.log(snapshot.val().nome);
            this.arrayDasCategorias.push(snapshot.val().nome)
        })
        // fbDB.ref('categorias').once('value').then( 
        //     (user) => {
        //         this.arrayDasCategorias = this.categorias;
        //         this.loaded = true;
        //         do {
        //             this.brr = this.arrayDasCategorias.splice(0, 2);
        //             this.pages.push(this.brr);
        //             this.brr = [];
        //         } while(this.arrayDasCategorias.length > 0)
        //     },
        //     (err) => {
        //         console.log(err.message)
        //     }
        // )
    },
    methods: {
        insereCategoria(){
            if (this.categoria != '') {
                fbDB.ref('categorias').push({
                    nome: this.categoria,
                });
                this.categoria = ''
                this.mostraMsg = true
                setTimeout(() => {this.mostraMsg = false}, 1500)
            } else {
                alert("Can't insert a category without a name!")
            };
        },
        pagination(changer) {
            this.actualPage = this.actualPage + changer;
        },
    }
}
</script>

<style>

</style>
