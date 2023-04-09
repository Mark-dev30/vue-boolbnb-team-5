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
            isVisible: false
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
    <div class="mb-2 our-card">
        <div class="single-card h-100">
            <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug }}">
                <div class="h-100 w-100 position-relative">
                    <img :src="apartment.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://picsum.photos/300/200'" alt="" class="rounded-4" @click='getLatAndLon(apartment)'>
                    <div v-show="isVisible" class="position-absolute p-1 hover-back text-white">
                        <ul v-if="apartment.services.length !== 0" class="list-unstyled d-flex justify-content-center gap-3 w-100">
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
                <p class="card-title"><strong>{{ apartment.title }}</strong></p>
                <div class="d-flex justify-content-between align-items-end w-100">
                    <div class="d-flex">
                        <p class="me-3 mb-0"><i class="fa-solid fa-person-shelter"></i> {{ apartment.n_room }}</p>
                        <p class="me-4 mb-0"><i class="fa-solid fa-bath"></i> {{ apartment.n_bathroom }}</p>
                        <p class="me-4 mb-0"><i class="fa-solid fa-bed"></i> {{ apartment.n_bed }}</p>
                    </div>
                    <button v-on:click="isVisible = !isVisible" class="servizi show"><i class="fa-solid fa-bell-concierge me-2"></i>Servizi</button>
                </div>
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
    width: 18rem;

    img {
        width: 18rem;
        height: 18rem;
        object-fit: cover;
    }
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
</style>