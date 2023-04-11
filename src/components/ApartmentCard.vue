<script>
import { store } from "../store";

export default {
    name: 'ApartmentCard',
    props: {
        apartment: Object,

    },
    data() {
        return {
            store,
            isVisible: false,
            distance: null
        }
    },
    /* mounted() {
        this.getLatAndLon();
    }, */
    methods: {
        getLatAndLon(apartment) {
            store.latitude = apartment.latitude;
            store.longitude = apartment.longitude;
        }
    },


    mounted() {
    },
}
</script>
<template lang="">
    <!-- <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug }}" class="position-relative w-100">
        <div class="single-card">
            <img :src="apartment.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://picsum.photos/300/200'" alt="" class="rounded-4" @click='getLatAndLon(apartment)'>
            <div class="my-3 mx-1">
                <h5 class="card-title">{{ apartment.title }}</h5>
                <div class="d-flex">
                    <p class="me-4"><i class="fa-solid fa-bed"></i> {{ apartment.n_bed }}</p>
                    <p class="me-4"><i class="fa-solid fa-bath"></i> {{ apartment.n_bathroom }}</p>
                    <p v-on:click="isVisible = !isVisible" class="m-0 show"><i class="fa-solid fa-bell-concierge"></i> Services <i class="fa-solid fa-caret-down"></i></p>
                </div>
            </div>
        </div>
    </router-link>
    <div class="single-card"> -->

    <!-- </div> -->
    <div class="single-card our-card">
        <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug }}">
            <div class=" w-100 position-relative">
                <img :src="apartment.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://picsum.photos/300/200'" alt="" class="rounded-4" @click='getLatAndLon(apartment)'>
                <div v-show="isVisible" class="position-absolute p-1 hover-back text-white">
                    <ul v-if="apartment.services.length !== 0" class="list-unstyled d-flex justify-content-center gap-3 m-0 w-100">
                        <li v-for="service in apartment.services" :key="service" class="d-flex">
                            <div>
                                <i :class="service.class_icon"></i>
                            </div>
                        </li>
                    </ul>
                    <div class="w-100" v-else>
                        <p class="text-center mb-0">Nessun servizio</p>
                    </div>
                </div>
            </div>
        </router-link>
        <div class="my-3 mx-2 gap-2 d-flex flex-column align-items-start text-start details">
            <div class="w-100 d-flex justify-content-between">
                <p class="card-title"><strong>{{ apartment.title }}</strong></p>
                <div class="d-flex">
                    <i class="fa-solid fa-location-dot"></i>
                    <p class="ms-1">{{ (Math.round(apartment.distance * 100) / 100).toFixed(1) }} Km</p>
                </div>
                    
            </div>
            

            <div class="d-flex justify-content-between align-items-end w-100">
                <div class="d-flex">
                    <p class="me-2 mb-0 d-flex" ><i class="fa-solid fa-person-shelter"></i> {{ apartment.n_room }}</p>
                    <p class="me-2 mb-0 d-flex"><i class="fa-solid fa-bath"></i> {{ apartment.n_bathroom }}</p>
                    <p class="me-2 mb-0 d-flex"><i class="fa-solid fa-bed"></i> {{ apartment.n_bed }}</p>
                </div>
                <button v-on:click="isVisible = !isVisible" class="servizi show d-flex align-items-center gap-1"><i class="fa-solid fa-bell-concierge"></i>Servizi</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wh-card {
    width: 18rem;
    height: 17rem;
}

.single-card {

    img {
        width: 100%;
        height: 18rem;
        object-fit: cover;
    }
}

.card-title {
    width: 73%;
}

.bg-dark-transparent {
    background-color: rgb(0, 0, 0, 0.5);
}

.show:hover {
    cursor: pointer;
}

.our-card {
    transition: transform 500ms ease;
}

.our-card:hover {
    transform: scale(1.05);
}

.top-0 {
    top: 100;
    left: 0;
}

.details i {
    color: #02CCBC;
}

.servizi {
    border: none;
    border-radius: 50px;
    padding: 0 15px;
    background-color: #ebebeb;
    cursor: pointer;

    &:hover {
        background-color: #02CCBC;
        color: #fff;

        i {

            color: #fff;
        }
    }
}

.hover-back {
    background-color: #02CCBC;
    width: 100%;
    display: flex;
    bottom: 0;
    left: 0;
    border-radius: 0 0 15px 15px;
}

p {
    i {
        padding: 0.2rem 0.4rem 0 0;
    }
}
</style>