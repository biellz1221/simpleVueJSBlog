import {fbDB} from './fbConfig'
export const slug = {
    methods: {
        slugify(text){
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text)
        },
    }
}
export const trocaMsg = {
    data: () => {
        return {
            msgSucessoErro: '',
            change: false,
        }
    },
    methods: {
        trocaMsg(successMessage) {
            this.msgSucessoErro = successMessage;
            this.change = !this.change
        }        
    }
}
export const reloadItems = {
    data: () => {
        return {
            reload: false
        }
    },
    methods: {
        reloadItems() {
            this.reload = !this.reload;
        }
    }
}
export const removeItem = {
    methods: {
        removeItem(tabela, key) {
            if(tabela === 'categorias') {
                fbDB.ref('categorias').child(key).remove();
                this.trocaMsg('Categoria removida com sucesso!')
                this.reloadItems();
            } else if (tabela ==='posts') {
                fbDB.ref('posts').child(key).remove();
                this.trocaMsg('Post removido com sucesso!')
                this.reloadItems();
            }
        }
    }
}