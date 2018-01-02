import Vue from 'vue'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import VueFire from 'vuefire'
import App from './App.vue'
import {router} from './router'
import {fbConfig} from './fbConfig'

Vue.use(VueFire);

firebase.auth().onAuthStateChanged(function(user){
	new Vue({
		el: '#app',
		router,
		render: h => h(App)
	})
})
