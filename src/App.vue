<script>

import AppHeader from './components/AppHeader.vue'
// import { store } from './store'
import AppFooter from "./components/AppFooter.vue";
import HomePage from "./pages/HomePage.vue";

export default {
  components: {
    AppFooter,
    AppHeader,
    HomePage
  },
};
</script>

  
<template>
  <div>
    <AppHeader></AppHeader>
    <HomePage></HomePage>
    <AppFooter></AppFooter>
  </div>
</template>

<style lang="scss">
@use "./styles/generals.scss" as *;
</style>

