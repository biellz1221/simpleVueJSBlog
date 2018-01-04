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

    <span v-for="(npag, index) in pages" :key="index">{{npag}}<br></span>

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
        }
    },
    firebase: {
        categorias: {
            source: fbDB.ref(this.dbTable),
        }
    },
    mounted(){
        this.loadItems();
    },
    methods: {
        loadItems(){
            this.arr = this.items;
            do {
                this.brr = this.arr.splice(0, 2);
                this.pages.push(this.brr);
                this.brr = [];
            } while(this.arr.length > 0);
            console.log(this.pages)
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
