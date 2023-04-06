<script>
export default {

}
</script>

<template>
  <div class="contain w-100">
    <div class="row h-100">
        <div class="col-12 h-100 d-flex justify-content-around align-items-center">
            <div class="container">
                <h1 class="text-white text-center">Per le tue vacanze in italia, come vuoi, dove vuoi!</h1>
            </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .contain {
    height: 250px;
    background-image: url(https://images.unsplash.com/photo-1471189641895-16c58a695bcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1645&q=80);
    background-repeat: no-repeat;
    background-size: cover;
  }

  

  @media (min-width: 800px) {
  
    .contain {
      height: 700px;
      background-position: center;
    }

    h1 {
      font-size: 60px;
    }

}

</style>

