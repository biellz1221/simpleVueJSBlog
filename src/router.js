import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Auth from './components/Auth.vue'
import Dashboard from './components/Dashboard.vue'
import signUp from './components/SignUp.vue'
import Categorias from './components/Categorias.vue'
import Posts from './components/Posts.vue'

import AddPost from './components/AddPost.vue'
import PostList from './components/PostList.vue'
Vue.use(Router)

export const router = new Router ({
    mode: 'history',
    routes: [
        { path: '*', name: '', component: Auth },
        { path: '/', name: 'Auth', component: Auth },
        { path: '/auth', name: '', component: Auth },
        { path: '/signup', name: 'SignUp', component: signUp},
        { path: '/admin', name: 'Dashboard', component: Dashboard, meta: {requiresAuth: true} },
        { path: '/categorias', name: 'Categorias', component: Categorias, meta: {requiresAuth: true} },        
        { 
            path: '/posts', 
            name: 'Posts', 
            component: Posts, 
            meta: {requiresAuth: true},
            children: [
                {path: 'new', component: AddPost, name: "AddNewPost"},
                {path: 'list', component: PostList, name: "PostList"},
            ]
        },        
    ],
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if(requiresAuth && !currentUser){
        alert("É necessário fazer login antes de prosseguir")
        next('/auth')
    } else {
        next();
    }
})