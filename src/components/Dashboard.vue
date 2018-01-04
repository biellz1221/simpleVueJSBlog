<template>
  <div>
      Foi porra! TOMAR NO CÚ!
	  <button @click="logOut">Vaza Caralho!</button>
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
