<template>
<div>
    <ul>
        <li v-if="actualPage > 0">
            <button @click="pagination(prev)">Anterior</button>
        </li>
        <li v-for="(page, index) in pages" :key="index">{{page.index}}</li>
        <li v-if="actualPage < pages.length - 1">
            <button @click="pagination(next)">Próximo</button>
        </li>
    </ul><br><br>

    
    <span v-for="(item, index) in categorias" :key="index">{{item}}<br></span>
    {{dbTable}}
    
</div>
</template>

<script>
import {fbDB} from '../../fbConfig'
export default {
    props: ['items','dbTable'],
    data: () => {
        return {
            pages: [],
            totalPages: '',
            brr: [],
            arr: [],
            actualPage: 0,
            executed: false,
            tabela: '',
        }
    },
    firebase: {
        categorias: {
            //source: fbDB.ref('categorias'),
            source: fbDB.ref(this.dbTable),
        },
        categotestes: {
            source: fbDB.ref('categorias')
        }
    },
    mounted(){
        // this.tabela = this.dbTable.toString();
        // console.log("Var Tabela = " + this.tabela)
        // setTimeout(() =>{
        //     this.loadItems();
        // }, 2000)
    },
    computed: {
    },
    methods: {
        loadItems(){    
            if(this.items != '') {
                this.executed = true;
                console.log(this.executed)
                do {
                    this.brr = this.items.splice(0, 2);
                    this.pages.push(this.brr);
                    this.brr = [];
                } while(this.items.length > 0);
            }
        },
        pagination(changer) {
            if(changer === 'prev') {
                this.actualPage = this.actualPage - 1;    
            } else if (changer === 'next') {
                this.actualPage = this.actualPage + 1;    
            } else {
                this.actualPage = changer + 1;
            }
        },
    },
    watch: {
        // 'items': function (val, oldVal) {
        //     this.arr = val;
        //     this.totalPages = this.pages.length
        // }
    },
}
</script>
