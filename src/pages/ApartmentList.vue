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
            services: [],
            range: '',
            n_beds: '',
            n_bathrooms: '',
            n_rooms: '',
            moreservices: []
        }
    },
    /* computed: {
        filterApartment: function () {
            return this.filterProductsByBed(this.filterProductsByRoom(this.filterProductsByBathroom(store.apartmentList)))
        }

    }, */
    methods: {
        getServices() {
            axios.get(`${this.store.baseUrl}/api/services`).then((response) => {

                if (response.data.success) {

                    this.services = response.data.services

                }

            });
        },
        getFilter() {
            axios.post(`${this.store.baseUrl}/api/apartments/filter`, {
                street: store.street,
                n_beds: this.n_beds,
                n_rooms: this.n_rooms,
                n_bathrooms: this.n_bathrooms,
                n_range: this.range,
                services: this.moreservices

            }).then((response) => {

                if (response.data.success) {
                    console.log(response.data.prova)
                    store.apartmentList = response.data.prova
                    console.log(store.apartmentList)

                }

            });
        }
        /* PostServices() {
            axios.post(`${this.store.baseUrl}/api/apartments`, {
                name: 'lorenzo',
                surname: 'ciao'
            }).then((response) => {

                if (response.data.success) {
                    console.log(response)
                }

            });
            
        }, */
        /* filterProductsByBed: function (products) {
            return products.filter(product => product[0].n_bed >= this.n_beds)
        },

        filterProductsByRoom: function (products) {
            return products.filter(product => product[0].n_room >= this.n_rooms)
        },

        filterProductsByBathroom: function (products) {
            return products.filter(product => product[0].n_bathroom >= this.n_bathrooms)
        },

        log(message) {
            console.log(message)
        } */
    },


    mounted() {
        this.getServices()
        /* this.PostServices() */
    }
}
</script>
<template lang="">
    <div class="container">
        <div class="row ">
            
            <div class="col-9 d-flex flex-wrap justify-content-center">
                <div class="card m-2 border-0" style="width: 18rem;" v-for="(apartment, index) in store.apartmentList" :key="apartment.id">
                    <ApartmentCard :apartment="apartment" />
                </div>
            </div>
            <div class="col-3 d-flex flex-wrap justify-content-center ">
                <div class="my-3">
                    <label for="" class="form-label">Inserisci Raggio KM</label>
                    <input type="range" id="range" class="form-range" min="10" max="50" step="10" name="range" v-model='range'>
                </div>

                <div class="my-3">
                    <label for="" class="form-label">Numero stanze</label>
                    <input type="number" id="rooms" class="form-control" name="n_room" v-model='n_rooms'>
                </div>
                <div class="my-3">
                    <label for="" class="form-label">Numero letti</label>
                    <input type="number" id="beds" class="form-control" name="n_bed" v-model='n_beds'>
                </div>
                <div class="my-3">
                    <label for="" class="form-label">Numero bagni</label>
                    <input type="number" id="bathrooms" class="form-control" name="n_bathroom" v-model='n_bathrooms'>
                </div>
                <div class="my-3">
                    <label for="" class="form-label">Seleziona i servizi</label>
                    <div v-for="service in services">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :value="service.id" name="" v-model="this.moreservices">
                            <label class="form-check-label">
                                <i :class="service.class_icon"></i>
                                {{service.name}}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="my-3">
                    <button class="btn btn-primary" @click="getFilter">
                        cliccami
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.col-3 {
    height: 50%;
    background-color: rgb(218, 218, 218);
    border-radius: 1rem
}
</style>