import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'
import App from './App.vue'
import {router} from './router'
import {fbConfig} from './fbConfig'

import LinhaContainer from './components/estruturais/LinhaContainer.vue'

Vue.use(VueFire);

Vue.component('linha-container', LinhaContainer);

firebase.auth().onAuthStateChanged(function(user){
	new Vue({
		el: '#app',
		router,
		render: h => h(App)
	})
})
