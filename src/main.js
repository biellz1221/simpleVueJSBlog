import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'
import Vuex from 'vuex'
import App from './App.vue'
import {router} from './router'
import {fbConfig} from './fbConfig'
import {store} from './store'

import LinhaContainer from './components/estruturais/LinhaContainer.vue'
import paginator from './components/estruturais/Paginate.vue'
import msgComp from './components/estruturais/MsgSucErr.vue'
import pageTitle from './components/estruturais/PageTitle.vue'



Vue.use(VueFire);

Vue.component('linha-container', LinhaContainer);
Vue.component('v-pages', paginator);
Vue.component('v-msg', msgComp);
Vue.component('v-title', pageTitle)

firebase.auth().onAuthStateChanged(function(user){
	new Vue({
		el: '#app',
		router,
		store,
		render: h => h(App)
	})
})
