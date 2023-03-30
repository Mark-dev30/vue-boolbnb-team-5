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
                let error = 'inserisci qalcosa'
                console.log(error)
                return error
            }
        }
    }
}

</script>

<template>
    <div class="container-search d-flex align-items-center gap-3">
        <input class="form-control" type="text" v-model="value" @keyup.enter="$emit('buttonClick', getString(value))">
        <button class="btn btn-primary" @click="$emit('buttonClick', getString(value))"><i
                class="fa-solid fa-magnifying-glass"></i></button>
        <!-- <i class="fa-solid fa-user"></i> -->
    </div>
</template>
<style lang="scss"></style>