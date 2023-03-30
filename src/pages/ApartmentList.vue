<script >
import axios from 'axios';
import { store } from '../store';
import ApartmentCard from '../components/ApartmentCard.vue';
export default {
    name: 'ApartmentList',
    components: {
        ApartmentCard
    },
    data() {
        return {
            store,
            apartments: []
        }
    },
    methods: {
        getApartments() {
            axios.get(`${this.store.baseUrl}/api/apartments`).then((response) => {
                if (response.data.success) {
                    this.apartments = response.data.apartments

                }

            });
        },
        log(message) {
            console.log(message)
        }
    },
    mounted() {
        this.getApartments()
    }
}
</script>
<template lang="">
    <div class="container">
        <div class="row ">
            <div class="col-12 d-flex flex-wrap justify-content-center">
                <div class="card m-2 border-0" style="width: 18rem;" v-for="apartment in apartments" :key="apartment.id">
                    <ApartmentCard :apartment="apartment" />
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>