<script>

import AppHeader from './components/AppHeader.vue'
import { store } from './store';
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppFooter,
    AppHeader,
  },
  data(){
    return{
      store,
    }
  },
  methods: {
    search(input){
      this.store.string = input;
      console.log(store);
      /* let apiCall = store.api + input;
      let apiCall_tv = store.api_tv + input;
      axios.get(apiCall).then((response) => {
          store.movieList = response.data.results
      })
      axios.get(apiCall_tv).then((response) => {
          store.seriesList = response.data.results
      }) */
  }
  },
};
</script>

  
<template>
  <div>
    <AppHeader @search="search"></AppHeader>
    <router-view></router-view>
    <AppFooter></AppFooter>
  </div>
</template>

<style lang="scss">
@use "./styles/generals.scss" as *;
</style>

