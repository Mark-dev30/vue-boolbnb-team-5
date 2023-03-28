<script>

export default {
    data() {
        return {
            value: ''
        }
    }
}

</script>

<template>
    <div class="container-search d-flex align-items-center gap-3">
        <input class="form-control" type="text" v-model="value" @keyup.enter="$emit('buttonClick', value)">
        <button class="btn btn-primary" @click="$emit('buttonClick', value)"><i
                class="fa-solid fa-magnifying-glass"></i></button>
        <!-- <i class="fa-solid fa-user"></i> -->
    </div>
</template>
<style lang="scss"></style>