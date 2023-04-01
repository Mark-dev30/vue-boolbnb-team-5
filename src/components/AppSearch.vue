<script>
import {store } from '../store'

export default {
    data() {
        return {
            store,
            value: ''
        }
    },
    methods: {
        getString() {
            console.log(this.value);
            this.$store.string = this.value;
            console.log(this.$store.string);
            /* if (param != '') {
                let str = param
                let strReplace = str.replace(/ +/g, "%20");
                return strReplace

            }
            else {
                let error = 'inserisci qualcosa'
                return error
            } */
        }
    }
}

</script>

<template>
    
</template>
<style lang="scss"></style>