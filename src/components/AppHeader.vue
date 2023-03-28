<script>
import AppSearch from './AppSearch.vue';
import axios from 'axios';
export default {
    components: {
        AppSearch
    },
    // methods: {
    //     getMovie(parametro) {
    //         let newUrl = store.urlMovie + parametro
    //         axios.get(newUrl).then((response) => {
    //             store.movieList = response.data.results
    //             console.log(store.movieList)
    //         })
    //     },
    //     getSearch(parametro) {
    //         this.getMovie(parametro)
    //     },
    // }
}
</script>

<template lang="">
    <header class="container-fluid">
        <div class="container h-100 d-flex justify-content-between align items-center">
            <img src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png" alt="">
            <AppSearch @buttonClick="getSearch"></AppSearch>
        </div>
    </header>

</template>
<style lang="scss">
header {
    height: 85px;
    background-color: #fff;
}
</style>