import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Auth from './components/Auth.vue'
import AuthSuccess from './components/AuthSuccess.vue'
import signUp from './components/SignUp.vue'
import Categorias from './components/Categorias.vue'
Vue.use(Router)

export const router = new Router ({
    mode: 'history',
    routes: [
        { path: '*', name: '', component: Auth },
        { path: '/', name: 'Auth', component: Auth },
        { path: '/auth', name: '', component: Auth },
        { path: '/signup', name: 'SignUp', component: signUp},
        { path: '/success', name: 'AuthSuccess', component: AuthSuccess, meta: {requiresAuth: true} },
        { path: '/categorias', name: 'Categorias', component: Categorias, meta: {requiresAuth: true} },        
    ],
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if(requiresAuth && !currentUser){
        alert("É necessário fazer login antes de prosseguir")
        next('/auth')
    } /*else if (!requiresAuth && currentUser) {
        next('/success')
    } */else {
        next();
    }
})