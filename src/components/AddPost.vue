<template>
    <div>
        <div class="campo">
            <!-- <label for="titulo">Título</label> -->
            <input type="text" name="titulo" v-model="newPost.postTitle" placeholder="Título do Post">
            {{slugify(this.newPost.postTitle)}}
        </div>
        <div class="campo">
            <label for="resumo">Resumo do Post</label>
            <textarea name="resumo" id="" maxlength="300" v-model="newPost.postExcerpt"></textarea>
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
            <button class="new-post-tag" v-for="(tag, index) in newPost.postTags" :key="index" @click="removeTag(index)">{{tag}}</button>
        </div>
        <div class="campo"><button @click="addPost(newPost)">Adicionar Post</button></div>
        <button @click="clean">Limpar</button>
        <v-msg :message='msgSucessoErro' :change='change'></v-msg>
    </div>
</template>

<script>
import {fbDB} from '../fbConfig';
import firebase from 'firebase';
import { quillEditor } from 'vue-quill-editor';
import { slug, trocaMsg } from '../mixins';
export default {
    mixins: [slug, trocaMsg],
    data: () => {
        return {
            newPost: {
                postTitle: '',
                postSlug: '',
                postExcerpt: '',
                postContent: '',
                postCategory: '',
                postTags: [],
                postAuthorEmail: firebase.auth().currentUser.email
            },
            tagToAdd: '',
        }
    },
    firebase: {
        categorias: {
            source: fbDB.ref('categorias'),
        }
    },
    methods: {
        clean() {
            this.newPost.postTitle = '';
            this.newPost.postExcerpt = '';
            this.newPost.postContent = '';
            this.newPost.postCategory = '';
            this.newPost.postTags = [];
        },
        addPost(post) {
            this.newPost.postSlug = this.slugify(this.newPost.postTitle);
            if (this.newPost.postTitle && this.newPost.postContent && this.newPost.postCategory && this.newPost.postExcerpt) {
                fbDB.ref('posts').push(post);
                this.trocaMsg('Post inserido com sucesso!');
                this.clean();
            } else if(!this.newPost.postTitle) {
                alert("Não pode inserir um post sem título!")
            } else if(!this.newPost.postContent) {
                alert("Não pode inserir um post sem conteúdo!")
            } else if(!this.newPost.postCategory) {
                alert("Não pode inserir um post sem categoria!")
            } else if(!this.newPost.postExcerpt) {
                alert("Não pode inserir um post sem resumo!")
            };
        },
        addTag(){
            let add = this.tagToAdd.split(',')
            for (let i = 0; i < add.length; i++) {
                this.newPost.postTags.push(add[i].trim())
            };
            this.tagToAdd = ''
        },
        removeTag(tag) {
            this.newPost.postTags.splice(tag, 1);
        },
    },
    components: {
        quillEditor
    }
}
</script>
