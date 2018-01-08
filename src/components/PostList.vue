<template>
    <div>
        <table class='lista-posts'>
            <thead>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>Resumo</th>
                <th>Tags</th>
                <th>Ações</th>
            </thead>
            <tbody>
                <tr v-for="(post, index) in postPages[actualPage]" :key='index'>
                    <td class="postlist-title">{{post.postTitle}} // {{post.postSlug}}</td>
                    <td class="postlist-author">{{post.postAuthorEmail}}</td>
                    <td class="postlist-category">{{post.postCategory}}</td>
                    <td class="postlist-excerpt">{{post.postExcerpt}}</td>
                    <td class="postlist-tags">
                        <span class='postlist-post-single-tag' v-for="(tag, index) in post.postTags" :key="index">{{tag}}</span>
                    </td>
                    <td class="postlist-actions">
                        <span>
                            <button @click="editPost(post['.key'])">
                                Editar <i class="fa fa-pencil fa-fw"></i>
                            </button>
                            <button @click="removeItem('posts',post['.key'])">
                                Excluir <i class="fa fa-trash fa-fw"></i>
                            </button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <v-pages items="posts" itemsPerPage='4' :change='reload'></v-pages>
        <v-msg :message='msgSucessoErro' :change='change'></v-msg>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { slug, trocaMsg, reloadItems, removeItem } from '../mixins';
export default {
    mixins: [ slug, trocaMsg, reloadItems, removeItem ],
    computed:{
        ...mapGetters([
            'posts',
            'postPages',
            'actualPage',
            'loaded'
        ]),
    },
    methods: {
        editPost(key){
            console.log(key);
            this.$store.commit('setEditPostKey', key);
            this.$router.push( { path: `/posts/edit/${key}` } )   
        }
    }
}
</script>

<style>

</style>
