<template>
	<div>
		<linha-container>
			<v-title pageTitle='Painel'></v-title>
			<button @click="logOut">Log Out</button>
		</linha-container>
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
