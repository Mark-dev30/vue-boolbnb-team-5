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

        log(message) {
            console.log(message)
        }
    },
    mounted() {
        console.log(store.apartmentList)

        /* let i
        for (i = 0; i < store.apartmentList.length; i++) {
            this.apartments.push(store.apartmentList[i])
            console.log(this.apartments)
        } */

        /* console.log(store.apartmentList) */
    }
}
</script>
<template lang="">
    <div class="container">
        <div class="row ">
            <div class="col-9 d-flex flex-wrap justify-content-center">
                <div class="card m-2 border-0" style="width: 18rem;" v-for="(apartment, index) in store.apartmentList" :key="apartment.id">
                    <ApartmentCard :apartment="apartment[0]" />
                </div>
            </div>
            <div class="col-3 d-flex flex-wrap justify-content-center">
                <div class="my-3">
                    <label for="" class="form-label">Numero stanze</label>
                    <input type="number" id="rooms" class="form-control" name="n_room">
                </div>
                <div class="my-3">
                    <label for="" class="form-label">Numero letti</label>
                    <input type="number" id="beds" class="form-control" name="n_bed">
                </div>
                <div class="my-3">
                    <label for="" class="form-label">Numero bagni</label>
                    <input type="number" id="bathrooms" class="form-control" name="n_bathroom">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Seleziona i servizi</label>
                    <input type="number" id="bathrooms" class="form-control" name="n_bathroom">
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.col-3 {
    background-color: rgb(161, 161, 161);
}
</style>