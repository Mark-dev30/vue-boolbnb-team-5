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
            moreservices: [],
            numbers: ['Qualsiasi', 1, 2, 3, 4, '5+'],
            loading: true
        }
    },
    /* computed: {
        filterApartment: function () {
            return this.filterProductsByBed(this.filterProductsByRoom(this.filterProductsByBathroom(store.apartmentList)))
        }
    
    }, */
    methods: {
        getServices() {
            this.loading = true;
            axios.get(`${this.store.baseUrl}/api/services`).then((response) => {
                if (response.data.success) {
                    this.services = response.data.services
                    this.loading = false;

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
                    console.log(response.data)
                    store.apartmentList = response.data.prova

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
            <div class="row align-items-center title-result">
                <div class="col-10 ">
                    <h2>ECCO I RISULTATI PER {{store.street}}</h2>
                </div>
                <div class="col-2 text-end">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fa-solid fa-sliders"></i> Filtri
                    </button>
                </div>
            </div>
            <div class="col-12 d-flex flex-wrap justify-content-center">
                <div class="card m-2 border-0" style="width: 18rem;" v-for="(apartment, index) in store.apartmentList" :key="apartment.id">
                    <ApartmentCard :apartment="apartment" />
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-fullscreen-lg-down">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="icon-filter" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Filtri</h1>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <div class="col-12">
                                            <div >
                                                <label for="" class="form-label">Inserisci Raggio KM</label>
                                                <div class="d-flex align-items-center">
                                                    
                                                    <input type="range" id="range" class=" range" min="0" max="20" step="5" name="range" v-model='range'>
                                                    <span id="rangeValue">{{range ? range : 20}}</span>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <span class="title-filter">Numero Stanze</span>
                                        <div class="col-12 d-flex padding">
                                            <div v-for='(number, key) in numbers' class="margin">
                                                <input type="radio" class="btn-check" name="option_room" :id="'option_room'+ key" autocomplete="off" v-model='n_rooms' :value='key' v-if="key == 0" checked>
                                                <input type="radio" class="btn-check" name="option_room" :id="'option_room'+ key" autocomplete="off" v-model='n_rooms' :value='key' v-else>
                                                <label class="btn-filter btn" :for="'option_room'+ key">{{number}}</label>
                                            </div>
                                        </div>
                                        <span class="title-filter">Numero Letti</span>
                                        <div class="col-12 d-flex">
                                            <div v-for='(number, key) in numbers' class="margin">
                                                <input type="radio" class="btn-check" name="option_bed" :id="'option_bed'+ key" autocomplete="off" v-model='n_beds' :value='key' v-if="key == 0" checked>
                                                <input type="radio" class="btn-check" name="option_bed" :id="'option_bed'+ key" autocomplete="off" v-model='n_beds' :value='key' v-else>
                                                <label class="btn-filter btn" :for="'option_bed'+ key">{{number}}</label>
                                            </div>
                                        </div>
                                        <span class="title-filter">Numero Bagni</span>
                                        <div class="col-12 d-flex">
                                            <div v-for='(number, key) in numbers' class="margin">
                                                <input type="radio" class="btn-check" name="options_bathroom" :id="'options_bathroom'+ key" autocomplete="off" v-model='n_bathrooms' :value='key' v-if="key == 0" checked>
                                                <input type="radio" class="btn-check" name="options_bathroom" :id="'options_bathroom'+ key" autocomplete="off" v-model='n_bathrooms' :value='key' v-else>
                                                <label  class="btn-filter btn" :for="'options_bathroom'+ key">{{number}}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <span class="title-filter">Servizi</span>
                                        <div class="row">
                                            <div v-for="service in services" class="col-lg-6">
                                                <div class="form-check ">
                                                    <input class="form-check-input" type="checkbox" :value="service.id" name="" v-model="this.moreservices">
                                                    <label class="form-check-label">
                                                        {{service.name}}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn btn-primary" @click="getFilter">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.icon-filter {
    border: 0;
    background: none;
}

.fade {
    padding: 0;
}

.margin {
    margin: 20px 0;
}

.btn-filter {
    padding: 5px 13px;
    border-radius: 15px;
    margin-right: 0.3rem;

    &:hover {
        border: 1px solid #02ccbc;
    }
}

.btn-check:checked+.btn {
    background-color: #02ccbc;
    color: white;
}

.title-filter {
    font-size: 20px;
}

/* INPUT RANGE */
#rangeValue {
    position: relative;
    display: block;
    text-align: center;
    font-size: 15px;
    color: #000000;
    font-weight: 400;
    margin-left: 1rem;
}

.range {
    width: 400px;
    height: 15px;
    -webkit-appearance: none;
    background: #ebebeb;
    outline: none;
    border-radius: 15px;
    overflow: hidden;

}

.range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    border: 4px solid #ffffff;
    box-shadow: -407px 0 0 400px #02ccbc;
}
</style>