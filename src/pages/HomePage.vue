<script>
import axios from 'axios';
import { store } from '../store';
import Jumbotron from '../components/Jumbotron.vue';
import Advertising from '../components/Advertising.vue';
export default {
    name: 'HomePage',
    data() {
        return {

        }
    },

    components: {
        Jumbotron,
        Advertising
    },

    computed: {

    },

    methods: {

    },

}


</script>
<template lang="">
    <Jumbotron></Jumbotron>
    <Advertising></Advertising>
</template>

<style lang="">
    
</style>