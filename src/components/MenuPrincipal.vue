<template>
    <div class="menu-principal">
        <i class="fa fa-bars btn-menu" @click="openMobileMenu"></i>
        <nav>
            <h1><router-link to="/auth">Home</router-link></h1>
            <ul>
                <li v-if="cUser"><router-link to="/success">Admin</router-link></li>
                <li v-if="cUser"><router-link to="/categorias">Categorias</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'MenuPrincipal',
    data: () => {
        return {
            cUser: firebase.auth().currentUser,
        }
    },
    methods: {
        openMobileMenu(){},
    }
}
</script>
