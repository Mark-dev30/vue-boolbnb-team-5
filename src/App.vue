<script>

import AppHeader from './components/AppHeader.vue'
// import { store } from './store'
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppFooter,
    AppHeader
  },
};
</script>

  
<template>
  <div>
    <AppHeader></AppHeader>
    <AppFooter></AppFooter>
  </div>
</template>

<style lang="scss">
@use "./styles/generals.scss" as *;
</style>

