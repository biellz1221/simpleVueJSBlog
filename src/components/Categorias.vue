<template>
  <div>
      Inserir umas categorias aí nessa porra!
      <input type="text" name="categoria" v-model='categoria'>
      <p>{{categoria}}</p>
      <button @click="insereCategoria">Mete a Categoria aí</button>
      <div style="background: lightgreen; color: #333" v-if="mostraMsg">Inseriu essa porra malandro</div>
      <hr>
      <ul>
        <li v-for="(categoria, index) in categorias" :key='index'>{{categoria.nome}}</li>
      </ul>
  </div>
</template>

<script>
import {fbDB} from '../fbConfig'
export default {
    data: () => {
        return {
            categoria: '',
            mostraMsg: false,
        }
    },
    firebase: {
        categorias: {
            source: fbDB.ref('categorias'),
        }
    },
    created(){
    },
    methods: {
        insereCategoria(){
            if (this.categoria != '') {
                fbDB.ref('categorias').push({
                    nome: this.categoria,
                });
                this.categoria = ''
                this.mostraMsg = true
                setTimeout(() => {this.mostraMsg = false}, 2500)
            } else {
                alert("Can't insert a category without a name!")
            };
        },

    }
}
</script>

<style>

</style>
