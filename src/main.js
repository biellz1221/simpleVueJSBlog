import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'
import App from './App.vue'
import {router} from './router'
import {fbConfig} from './fbConfig'

import LinhaContainer from './components/estruturais/LinhaContainer.vue'
import paginator from './components/estruturais/Paginate.vue'

Vue.use(VueFire);

Vue.component('linha-container', LinhaContainer);
Vue.component('v-pages', paginator);

firebase.auth().onAuthStateChanged(function(user){
	new Vue({
		el: '#app',
		router,
		render: h => h(App)
	})
})
