<template>
  <div>
      <v-title pageTitle='Painel'></v-title>
	  <button @click="logOut">Log Out</button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
	methods: {
		logOut(){
			firebase.auth().signOut().then(() => {
					this.$router.replace('auth');
				}
			)
		}
	}
}
</script>

<style>

</style>
