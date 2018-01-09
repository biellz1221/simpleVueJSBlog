<template>
<div>
    <div class="paginate">
        <button @click="pagination('prev')" v-if="actualPage > 0" class="btn-pag-prev">
            <i class="fa fa-angle-left"></i>
        </button>
        <span v-if="items === 'categorias' && catPages.length > 1">
            <span class="paginate-numbers">
                <span v-for="(npag,index) in catPages" :key="index" :title="npag" :class="'paginate-number-'+index">
                    <span v-if="index === actualPage" class="paginate-active">
                        <button disabled="disabled"  class="btn-pag-num">{{index+1}}</button>
                    </span>
                    <button v-else @click="pagination(index)" class="btn-pag-num">{{index+1}}</button>
                </span>
            </span>
            <button @click="pagination('next')" v-if="actualPage < catPages.length - 1" class="btn-pag-next">
                <i class="fa fa-angle-right"></i>
            </button>
        </span>
        <span v-if="items === 'posts' && postPages.length > 1">
            <span class="paginate-numbers">
                <span v-for="(npag,index) in postPages" :title="npag" :key="index" :class="'paginate-number-'+index">
                    <span v-if="index === actualPage" class="paginate-active">
                        <button disabled="disabled"  class="btn-pag-num">{{index+1}}</button>
                    </span>
                    <button v-else @click="pagination(index)" class="btn-pag-num">{{index+1}}</button>
                </span>
            </span>
            <button @click="pagination('next')" v-if="actualPage < postPages.length - 1" class="btn-pag-next">
                <i class="fa fa-angle-right"></i>
            </button>
        </span>
    </div>
</div>
</template>

<script>
import {fbDB} from '../../fbConfig'
import { mapGetters } from 'vuex'
import { categoRef, postRef } from '../../store'
export default {
    props: ['items', 'itemsPerPage', 'change'],
    data: () => {
        return {
            brr: [],
            itemList: [],
        }
    },
    computed:{
        ...mapGetters([
            'categorias',
            'posts',
            'postPages',
            'catPages',
            'actualPage'
        ]),
    },
    created() {
        this.loadAll()
    },
    methods: {
        loadAll() {
            if(this.items === 'categorias') {
                this.loadCategories()
            } else if (this.items === 'posts') {
                this.loadPosts();
            }
        },
        pagination(changer) {
            this.$store.commit('movePages', changer)
        },
        loadCategories() {
            this.$store.dispatch('setCategoriasRef', categoRef);
            setTimeout(()=>{
                this.isLoaded();
                if (this.$store.state.catPages.length > 0){
                    this.$store.commit('cleanPages', this.items);
                    this.itemList = this.categorias;
                    this.renderPages(this.items);
                } else {
                    this.itemList = this.categorias;
                    this.renderPages(this.items);
                }
            }, 1000);
        },
        loadPosts() {
            this.$store.dispatch('setPostsRef', postRef)
            setTimeout(()=>{
                this.isLoaded();
                if (this.$store.state.postPages.length > 0){
                    this.$store.commit('cleanPages', this.items);
                    this.itemList = this.posts;
                    this.renderPages(this.items);
                } else {
                    this.itemList = this.posts;
                    this.renderPages(this.items);
               }
            }, 1000);
        },
        isLoaded() {
            this.$store.commit('isLoaded');
        },
        renderPages(renderWat) {
            do {
                if(this.itemsPerPage > 0) {
                    this.brr = this.itemList.splice(0, this.itemsPerPage);
                } else {
                    this.brr = this.itemList.splice(0, 2);
                }
                if(renderWat === 'posts'){
                    this.$store.commit('insertPost', this.brr);
                } else if(renderWat === 'categorias') {
                    this.$store.commit('insertCat', this.brr);
                }
                this.brr = [];
            } while(this.itemList.length > 0);
        }
    },
    watch: {
        change: function (val, oldVal) {
            this.loadAll()
        }
    }
}
</script>
