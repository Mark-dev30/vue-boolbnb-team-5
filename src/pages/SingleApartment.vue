<script>
import { store } from '../store';
import axios from 'axios';
import Map from '../components/Map.vue';

import SingleApartmentFormMessage from '../components/SingleApartmentFormMessage.vue';

export default {
    name: 'SingleApartment',
    components: {
        Map,
    },
    data() {
        return {
            store,
            apartment: []
        }
    },
    components: {
        SingleApartmentFormMessage
    },
    mounted() {
        axios.get(`${store.baseUrl}/api/apartments/${this.$route.params.slug}`).then((response) => {
            this.apartment = response.data.apartment
        })
    }
}
</script>
<template lang="">
    <div class="container w-50 m-auto">
        <div class="row">
            <div class="col-12">
                <div class="py-5 d-flex justify-content-center">
                    <img :src="apartment.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://picsum.photos/300/200'" alt="" class="img-fluid h-17 rounded-4 w-100 h-auto">
                </div>
                <div class="">
                    <h1>{{ apartment.title }}</h1>
                </div>
            </div>
        </div>
        <div class="row py-3">
            <div class="col-3">
                <div>
                    PANORAMICA
                </div>
            </div>
            <div class="col-9">
                <div class="d-flex justify-content-between">
                    <div>
                        <i class="fa-solid fa-person-shelter"></i>
                        <span class="mx-2"><strong>Stanze: </strong>{{ apartment.n_room }}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-bed"></i>
                        <span class="mx-2"><strong>Letti: </strong>{{ apartment.n_bed }}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-bath"></i>
                        <span class="mx-2"><strong>Bagni: </strong>{{ apartment.n_bathroom }}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-kaaba"></i>
                        <span class="mx-2"><strong>m&#178;: </strong>{{ apartment.mq }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row py-3">
            <div class="col-3">
                SERVIZI
            </div>
            <div class="col-9 d-flex justify-content-around">
                <ul v-for="(service, index) in apartment.services" :key="index" class="list-unstyled">
					<li><strong class="mx-2"><i :class="service.class_icon"></i></strong><strong>{{ service.name }}</strong></li>
				</ul>
            </div>
        </div>
    </div>

    <Map />

    <SingleApartmentFormMessage :apartment_id='apartment.id'/>
</template>

<style lang="">
    
</style>