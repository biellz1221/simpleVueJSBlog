<template>
    <div class="menu-principal">
        <nav>
            <i class="fa fa-bars btn-menu" @click="openMobileMenu"></i>
            <h1><router-link to="/auth">Home</router-link></h1>
            <ul>
                <li v-if="cUser"><router-link to="/admin"><span>Painel</span></router-link></li>
                <li v-if="cUser"><router-link to="/categorias"><span>Categorias</span></router-link></li>
                <li v-if="cUser"><router-link to="/posts/list"><span>Posts</span></router-link></li>
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
