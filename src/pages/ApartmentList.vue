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
            loading: false,
            strReplace: store.street.replace(/%20+/g, " ")
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
            this.loading = true;
            axios.post(`${this.store.baseUrl}/api/apartments/filter`, {
                street: store.street,
                n_beds: this.n_beds,
                n_rooms: this.n_rooms,
                n_bathrooms: this.n_bathrooms,
                n_range: this.range,
                services: this.moreservices

            }).then((response) => {

                if (response.data.success) {
                    store.apartmentList = response.data.prova
                    setTimeout(() => {
                        this.loading = false
                    }, 500);


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
        <div class="row">
            <div class="col-12 loader-list" v-if="this.loading == true">
                <div class="col-3" v-for="n in 6" >
                    <div class="card-loader m-2">
                        <div class="image-loader"></div>
                        <div class="content-loader">
                            <h2 class="h2-loader"></h2>
                            <p class="p-loader"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12" v-else>
                <div class="row align-items-center my-3 title-result" v-if="store.apartmentList?.length == 0 || store.apartmentList == null ">
                    <div class="col-12 text-center">
                        <h4>Spiacenti, non ci sono risultati per la tua ricerca.</h4>
                    </div>
                    <div class="col-12 no-result text-center">
                        <img src="src/assets/img/imagenotfound.png" alt="">
                    </div>
                    
                </div>
                <div class="row my-3  title-result" v-else>
                    <div class="col-10" >
                        <h4>I RISULTATI IN BASE ALLA TUA RICERCA SONO {{store.apartmentList.length}}</h4>
                    </div>
                    <div class="col-2 text-end pe-0">
                        <button type="button" class="btn btn-filter my_btn me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa-solid fa-sliders"></i> 
                            <span class="d-none d-md-inline-block ms-2">Filtri</span>
                        </button>
                    </div>
                </div>
                
                <div class="col-12 d-flex flex-wrap ">
                    <div class="card m-2 border-0" style="width: 18rem;" v-for="(apartment, index) in store.apartmentList" :key="apartment.id">
                        <ApartmentCard :apartment="apartment" />
                    </div>
                </div>
                <!-- MODAL -->
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
                                <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn btn-modal" @click="getFilter">Mostra Risultati</button>
                            </div>
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

.no-result {
    width: 100%;
    height: 25rem;
    object-fit: contain;

    img {
        height: 100%;

    }
}

@media (max-width: 550px) {
    .no-result {
        height: 10rem;
    }
}

.my_btn {
    background-color: #02CCBC;
    color: white;

    &:hover {
        color: #02CCBC;
        background-color: white;
        border: 1px #02CCBC solid;
    }
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

.btn-modal {
    background-color: #02ccbc;
    color: white;
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

/* Loader */
.card-loader {
    width: 290px;
    background: #fff;
    border-radius: 10px;
}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}

.image-loader,
.h2-loader,
.p-loader {
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
}

.image-loader {
    height: 17rem;
    border-radius: 1rem;
}

.content-loader {
    margin: 23px 10px 0 0;
}

.h2-loader {
    width: 80%;
    height: 1rem;
}

.p-loader {
    width: 50%;
    height: 1rem;

}
</style>