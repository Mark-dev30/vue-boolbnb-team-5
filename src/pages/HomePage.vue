<script>
import axios from 'axios';
import { store } from '../store';
import ApartmentCard from '../components/ApartmentCard.vue';
export default {
    name: 'HomePage',
    components: {
        ApartmentCard
    },
    data() {
        return {
            store,
            carmela: [],
            showModal: false

        }
    },


    computed: {

    },

    methods: {
        getApartments() {
            axios.post(`${this.store.baseUrl}/api/apartments/sponsor`, {

            }).then((response) => {

                if (response.data.success) {
                    this.carmela = response.data.sponsor

                }
                else {
                }

            });
        },
    },
    mounted() {
        this.getApartments()
    },

}


</script>
<template lang="">
    <div class="container">
        <div class="row ">
            <div class="col-9 d-flex flex-wrap justify-content-center">
                <div class="card m-2 border-0" style="width: 18rem;" v-for="(apartment, index) in carmela" :key="apartment.id">
                    <ApartmentCard :apartment="apartment" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="">
    
</style>