<template>
    <div>
        <div class="campo">
            <!-- <label for="titulo">Título</label> -->
            <input type="text" name="titulo" v-model="newPost.postTitle" placeholder="Título do Post">
        </div>
        <div class="campo q-editor">
            <quill-editor v-model="newPost.postContent"></quill-editor>
        </div>
        <div class="campo">
            <label for="categorias">Categoria</label>
            <select name="categorias" v-model="newPost.postCategory">
                <option v-for="(categoria, index) in categorias" :key="index" :value="categoria.nome">{{categoria.nome}}</option>
            </select>
        </div>
        <div class="campo">
            <label for="tags">Tags</label>
            <input type="text" name="tags" @keydown.enter="addTag" placeholder="Tags saparated by comma" v-model="tagToAdd">
            <button @click="addTag">Inserir Tag</button><br>
        </div>
        <transition name="fade">
            <div class="div-info info-success" v-if="mostraMsg">
                {{msgSucessoErro}}
            </div>
        </transition>
    </div>
</template>

<script>
import {fbDB} from '../fbConfig';
import firebase from 'firebase';

import { quillEditor } from 'vue-quill-editor'
export default {
    data: () => {
        return {
            newPost: {
                postTitle: '',
                postExcerpt: '',
                postContent: '',
                postCategory: '',
                postTags: [],
                postAuthorEmail: firebase.auth().currentUser.email
            },
            tagToAdd: '',
            arrayDasCategorias: [],
            msgSucessoErro: 'Categoria inserida com sucesso!',
            mostraMsg: false,
            loaded: false,
        }
    },
    firebase: {
        categorias: {
            source: fbDB.ref('categorias'),
        }
    },
    mounted() {
    },
    methods: {
        clean() {
            this.postTitle = '';
            this.postExcerpt = '';
            this.postContent = '';
            this.postCategory = '';
            this.postTags = [];
        },
        insertPost(post) {
            if (this.postTitle && postContent && postCategory) {
                fbDB.ref('posts').push(post);
                
                this.mostraMsg = true
                setTimeout(() => {this.mostraMsg = false}, 1500)
            } else {
                alert("Não pode inserir uma categoria sem nome!")
            };
        },
        addTag(){
            let add = this.tagToAdd.split(',')
            for (let i = 0; i < add.length; i++) {
                this.newPost.postTags.push(add[i].trim())
            };
            this.tagToAdd = ''
        },
    },
    components: {
        quillEditor
    }
}
</script>
