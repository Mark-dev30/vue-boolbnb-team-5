<script>

export default {
    data() {
        return {
            value: ''
        }
    },
    methods: {
        getString(param) {
            if (param != '') {
                let str = param
                let strReplace = str.replace(/ +/g, "%20");
                return strReplace

            }
            else {
                let error = 'inserisci qualcosa'
                return error
            }
        }
    }
}

</script>

<template>
    <div class="container-search d-flex align-items-center gap-3">
        <input class="form-control" type="text" v-model="value" @keyup.enter="$emit('buttonClick', getString(value))">
        <router-link :to="{ name: 'apartment_list' }" class="btn btn-primary"
            @click="$emit('buttonClick', getString(value))">
            <i class="fa-solid fa-magnifying-glass"></i>
        </router-link>
    </div>
</template>
<style lang="scss"></style>