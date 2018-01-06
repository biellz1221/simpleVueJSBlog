import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import {fbDB} from './fbConfig'
import {firebaseMutations, firebaseAction} from 'vuexfire'
import VuexFire from 'vuexfire'

Vue.use(Vuex)

export const categoRef = fbDB.ref('categorias');
export const postRef = fbDB.ref('posts');

export const store = new Vuex.Store({
    state: {
        posts: [],
        categorias: [],
        postPages: [],
        catPages: [],
        actualPage: 0,
        loaded: false
    },
    mutations: {
        ...firebaseMutations,
        insertCat(state, categoria) {
            state.catPages.push(categoria)
        },
        insertPost(state, post){
            state.postPages.push(post)
        },
        movePages(state, changer) {
            if(changer === 'prev') {
                state.actualPage = state.actualPage - 1;    
            } else if (changer === 'next') {
                state.actualPage = state.actualPage + 1;    
            } else {
                state.actualPage = changer;
            }
        },
        isLoaded(state) {
            state.loaded = !state.loaded
        }
    },
    getters: {
        categorias: state => state.categorias,
        posts: state => state.posts,
        catPages: state => state.catPages,
        postPages: state => state.postPages,
        actualPage: state => state.actualPage,
        loaded: state => state.loaded,
    },
    actions: {
        setCategoriasRef: firebaseAction(({
            bindFirebaseRef
        }, ref) => {
            bindFirebaseRef('categorias', ref)
        }),
        setPostsRef: firebaseAction(({
            bindFirebaseRef
        }, ref) => {
            bindFirebaseRef('posts', ref)
        }),
    },
})
