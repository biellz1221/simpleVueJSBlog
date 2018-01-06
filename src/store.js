import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import {fbDB} from './fbConfig'
import {firebaseMutations, firebaseAction} from 'vuexfire'
import VuexFire from 'vuexfire'

Vue.use(Vuex)

export const categoRef = fbDB.ref('categorias');
let postRef = fbDB.ref('posts');

export const store = new Vuex.Store({
    state: {
        posts: [],
        categorias: [],
    },
    mutations: {
        ...firebaseMutations
    },
    getters: {
        categorias: state => state.categorias
    },
    actions: {
        setTodosRef: firebaseAction(({
            bindFirebaseRef
        }, ref) => {
            bindFirebaseRef('categorias', ref)
        }),
    },
})
