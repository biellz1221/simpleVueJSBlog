<template>
    <div>
        <div v-if="!cUser">
            <input type="email" name="email" v-model="email" placeholder="Email">
            <input type="password" name="password" v-model="password" placeholder="Senha">
            <button @click="login">Login</button>
            <p>Não tem uma conta? <router-link to="/signup">Crie uma agora!</router-link></p>
        </div>
        <div v-else>
            <p>Você já está logado como <b>{{userEmail}}</b></p>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
import {categoRef} from '../store'
export default {
    name: 'Auth',
    data: () => {
        return {
            email: '',
            password: '',
            cUser: firebase.auth().currentUser,
            userEmail: firebase.auth().currentUser.email,
            
        }
    },
    computed:{
        ...mapGetters([
            // Mounts the "safelyStoredNumber" getter to the scope of your component.
            'categorias'
        ])
    },
    methods: {
        login() {
            if (this.email && this.password) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    this.$router.replace("success"),
                    function(err) {
                        alert("Deu xabú! " + err.message)
                    }
                )
            } else {
                if (this.email === "") {
                    alert("Faltou o email");
                }
                if (this.password === "") {
                    alert("Faltou a senha");
                }
            }
        }
    },
    created() {
        this.$store.dispatch('setTodosRef', categoRef)
    },
}
</script>

<style>

</style>
