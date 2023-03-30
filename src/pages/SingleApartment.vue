<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: 'SingleApartment',
    data() {
        return {
            store,
            apartment: []
        }
    },
    mounted() {
        axios.get(`${this.store.baseUrl}/api/apartment/${this.$route.params.slug}`).then((response) => {
            this.apartment = response.data.apartment
            console.log(this.apartment)
        })
    }
}
</script>
<template lang="">
    <div>
        ciao
    </div>
</template>

<style lang="">
    
</style>