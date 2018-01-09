<template>
    <div>
        <linha-container>
            <v-title pageTitle='Categorias'></v-title>
            <div class="flex-container categorias">
                <div class="lista-categorias">
                    <span class="titulo-lista">Lista de Categorias</span>
                    <ul>
                        <transition name="fade">
                            <li v-if="!loaded" class='loading' style="text-align:center">
                                <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                            </li>
                        </transition>
                        <li v-for="(categoria, index) in catPages[actualPage]" :key='index'>
                            <span v-if="editCat.catIndex === index">
                                <input type="text" v-model='editCat.catNome'>
                                <span class="btn-actions">
                                    <button class="remove-cat" @click="saveEdit(categoria['.key'])">
                                        <i class="fa fa-check"></i>
                                    </button>
                                    <button class="remove-cat" @click="cancelEdit">
                                        <i class="fa fa-times"></i>
                                    </button>
                                </span>
                            </span>
                            <span v-else-if="editCat.catIndex != index">
                                <span>{{categoria.nome}}</span>
                                <span class="btn-actions">
                                    <button class="edit-cat" @click="editCategory(categoria.nome, index)">
                                        <i class="fa fa-pencil"></i>
                                    </button>
                                    <button class="remove-cat" @click="removeItem('categorias', categoria['.key'])">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </span>
                            </span>
                            
                        </li>
                    </ul>
                    <v-pages items="categorias" itemsPerPage='2' :change='reload'></v-pages>
                </div>
                
                <div class="inserir-categoria">
                    <span class="insira-categoria">Insira uma Categoria</span>
                    <p>Basta digitar o nome e apertar em inserir.</p>
                    <input type="text" name="categoria" placeholder="Nome da Categoria" v-model='categoria.nome' @keyup.enter="insereCategoria" maxlength="30">
                    <button @click="insereCategoria">Inserir</button>
                </div>
            </div>
            <v-msg :message='msgSucessoErro' :change='change'></v-msg>
        </linha-container>
    </div>
</template>

<script>
import { fbDB } from '../fbConfig';
import { mapGetters } from 'vuex';
import { slug, trocaMsg, reloadItems, removeItem } from '../mixins';
export default {
    mixins: [ slug, trocaMsg, reloadItems, removeItem ],
    data: () => {
        return {
            editCat: {
                catIndex: null, 
                catNome: ''
            },
            categoria: {
                nome: '',
                slug: '',
            },
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
                    nome: this.categoria.nome.trim(),
                    slug: this.slugify(this.categoria.nome),
                });
                this.categoria.nome = '';
                this.categoria.slug = '';
                this.trocaMsg('Categoria inserida com sucesso!')
                this.reloadItems();
            } else {
                alert("Não pode inserir uma categoria sem nome!");
            };
        },
        editCategory(nomeCategoria, catIndex) {
            this.editCat.catNome = nomeCategoria;
            this.editCat.catIndex = catIndex;
        },
        saveEdit(key) {
            fbDB.ref('categorias').child(key).update({
                nome: this.editCat.catNome,
                slug: this.slugify(this.editCat.catNome),
            });
            this.trocaMsg('Categoria editada com sucesso!')
            this.reloadItems();
            this.cancelEdit();
        },
        cancelEdit() {
            this.editCat.catNome = '';
            this.editCat.catIndex = null;
        },
    }
}
</script>

<style>

</style>
