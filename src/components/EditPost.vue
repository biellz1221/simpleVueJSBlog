<template>
    <div>
        <div class="campo">
                <!-- <label for="titulo">Título</label> -->
            <input type="text" name="titulo" v-model="editedPost.postTitle" placeholder="Título do Post">
            {{slugify(this.editedPost.postTitle)}}
        </div>
        <div class="campo">
            <label for="resumo">Resumo do Post</label>
            <textarea name="resumo" id="" maxlength="300" v-model="editedPost.postExcerpt"></textarea>
        </div>
        <div class="campo q-editor">
            <quill-editor v-model="editedPost.postContent"></quill-editor>
        </div>
        <div class="campo">
            <label for="categorias">Categoria</label>
            <select name="categorias" v-model="editedPost.postCategory">
                <option v-for="(categoria, index) in categorias" :key="index" :value="categoria.nome">{{categoria.nome}}</option>
            </select>
        </div>
        <div class="campo">
            <label for="tags">Tags</label>
            <input type="text" name="tags" @keydown.enter="addTag" placeholder="Tags saparated by comma" v-model="tagToAdd">
            <button @click="addTag">Inserir Tag</button><br>
            <button class="new-post-tag" v-for="(tag, index) in editedPost.postTags" :key="index" @click="removeTag(index)">{{tag}}</button>
        </div>
        <div class="campo"><button @click="editPost(editedPost)">Salvar Edição</button></div>
        {{postKey}}
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {fbDB} from '../fbConfig';
import firebase from 'firebase';
import { quillEditor } from 'vue-quill-editor';
import { slug, trocaMsg } from '../mixins';
export default {
    mixins: [ slug ],
    data: () => {
        return{
            editedPost: {
                postTitle: '',
                postSlug: '',
                postExcerpt: '',
                postContent: '',
                postCategory: '',
                postTags: [],
            },
            tagToAdd: '',
            postKey: '',
        }
    },
    mounted(){
        console.log(this.$route.params.key);
        this.postKey = this.$route.params.key;
    },
    computed:{
        ...mapGetters([
            'edPostKey',
        ]),
    },
    firebase: {
        categorias: {
            source: fbDB.ref('categorias'),
        },
        post: {
            source: fbDB.ref('posts').child('-L2Myto7qMDv5At88MrO')
        }
    },
    methods: {
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
