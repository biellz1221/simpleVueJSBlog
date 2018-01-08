<template>
    <transition name="fade">
        <div class="div-info info-success" v-if="mostraMsg">
            {{message}}
        </div>
    </transition>
</template>

<script>
export default {
    props: ['message', 'change'],
    data: () => {
        return{
            mostraMsg: false
        }
    },
    methods: {
        showMessage(){
            this.mostraMsg = true;
            setTimeout(() => {this.mostraMsg = false}, 1500);
        }
    },
    watch: {
        change: function (val,oldVal) {
            this.showMessage()          
        }
    }
}
</script>