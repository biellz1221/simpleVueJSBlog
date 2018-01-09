<template>
    <div>
        <v-title pageTitle='Editar Post'></v-title>
        <div class="campo form-post-title">
            <input type="text" name="titulo" v-model="editedPost.postTitle" placeholder="Título do Post">
            <!--<span class="slug">{{slugify(this.editedPost.postTitle)}}</span>-->
        </div>
        <div class="campo form-post-excerpt">
            <label for="resumo">Resumo do Post</label>
            <textarea name="resumo" id="" maxlength="300" v-model="editedPost.postExcerpt"></textarea>
        </div>
        <div class="campo q-editor">
            <quill-editor v-model="editedPost.postContent"></quill-editor>
        </div>
        <div class="campo form-post-category">
            <label for="categorias">Categoria</label>
            <select name="categorias" v-model="editedPost.postCategory">
                <option v-for="(categoria, index) in categorias" :key="index" :value="categoria.nome">{{categoria.nome}}</option>
            </select>
        </div>
        <div class="campo form-post-tags">
            <label for="tags">Tags</label>
            <input type="text" name="tags" @keydown.enter="addTag" placeholder="Tags saparated by comma" v-model="tagToAdd">
            <button @click="addTag">Inserir Tag</button><br>
            <button class="new-post-tag" v-for="(tag, index) in editedPost.postTags" :key="index" @click="removeTag(index)">{{tag}}</button>
        </div>
        <div class="campo form-post-btn-edit">
            <div class="campo"><button @click="editPost(editedPost)">Salvar Edição</button></div>
        </div>
        <v-msg :message='msgSucessoErro' :change='change'></v-msg>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {fbDB} from '../fbConfig';
import firebase from 'firebase';
import { quillEditor } from 'vue-quill-editor';
import { slug, trocaMsg } from '../mixins';

export default {
    mixins: [ slug, trocaMsg ],
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
    created(){
        this.postKey = this.$route.params.key;
        this.$bindAsObject('post', fbDB.ref('posts').child(this.postKey));
        this.setPostToEdit();
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
        setPostToEdit() {
            setTimeout(() => {
                this.editedPost.postTitle = this.post.postTitle;
                this.editedPost.postSlug = this.post.postSlug;
                this.editedPost.postExcerpt = this.post.postExcerpt;
                this.editedPost.postContent = this.post.postContent;
                this.editedPost.postCategory = this.post.postCategory;
                this.editedPost.postTags = this.post.postTags;
                this.$bindAsObject('match', 
                    fbDB.ref('posts')
                    .orderByChild('postSlug')
                    .equalTo(this.editedPost.postSlug)); // para buscar post baseado no Slug
            }, 1000);
        },
        editPost(post) {
            fbDB.ref('posts').child(this.postKey).update({
                postTitle: this.editedPost.postTitle,
                postSlug: this.editedPost.postSlug,
                postExcerpt: this.editedPost.postExcerpt,
                postContent: this.editedPost.postContent,
                postCategory: this.editedPost.postCategory,
                postTags: this.editedPost.postTags,
            })
            this.trocaMsg('Post inserido com sucesso!');
            setTimeout(()=>{
                this.$router.push( { path: `/posts/list/` } )
            },1300)
        }
    },
    components: {
        quillEditor
    }
}
</script>
