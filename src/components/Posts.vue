<template>
    <linha-container>
        <router-link to='/posts/list' class="btn-posts"><i class="fa fa-angle-double-left"></i> Lista de Posts</router-link>
        <router-link to='/posts/new' class="btn-posts"><i class="fa fa-plus"></i> Adicionar Post</router-link>
        <router-view></router-view>
    </linha-container>
</template>

<script>
export default {
}
</script>

<style>

</style>
