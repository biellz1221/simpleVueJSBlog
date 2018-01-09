<template>
    <div>
        <v-title pageTitle='Criar Nova Conta'></v-title>
        <linha-container>
            <p>Vamos criar uma nova conta!</p>
            <input type="email" name="email" placeholder="Email" v-model="email">
            <input type="password" name="password" placeholder="Senha" v-model="password">
            <input type="password" name="password-confirm" placeholder="Comfirmar Senha" v-model="passwordConfirm">
            <button @click="criarConta">Criar Conta</button>
            <small>Já tinha uma conta? <router-link to="/">Então volta pra fazer login!</router-link></small>
        </linha-container>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'signUp',
    data: () => {
        return {
            email: '',
            password: '',
            passwordConfirm: '',
        }
    },
    methods: {
        criarConta(){
            if (this.email && this.password) {
                if (this.password === this.passwordConfirm) {
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                        function(user) {
                            alert("Conta criada com sucesso")
                        },
                        function(err) {
                            alert("Ops! " + err.message)
                        }
                    )
                } else {
                    alert("Suas senhas não coincidem");
                }
            } else {
                if ( this.email === '') {
                    alert("Faltou preencher o email!")                
                }
                if ( this.password === '') {
                    alert("Faltou preencher a senha!")
                }
                if ( this.passwordConfirm === '') {
                    alert("Confirme a senha!")                
                }
            }
        },
    },
}
</script>
