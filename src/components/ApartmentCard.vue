<script>
import {store} from "../store";

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
        getLatAndLon(apartment){
            console.log(apartment)
            store.latitude = apartment.latitude;
            store.longitude = apartment.longitude;
        }
    },

    mounted() {
        console.log(this.apartment)
    },
}
</script>
<template lang="">
    <div class="mb-2 our-card">
        <div class="wh-card d-flex">
            <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug }}" class="position-relative">
                <img :src="apartment.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://picsum.photos/300/200'" alt="" class="img-fluid h-100 rounded-4" @click='getLatAndLon(apartment)'>
                <div v-show="isVisible" class="wh-card position-absolute p-3 bg-dark-transparent rounded-4 text-white top-0">
                    <ul class="list-unstyled d-flex flex-column justify-content-end gap-3 h-100">
                        <li v-for="service in apartment.services" :key="service" class="d-flex">
                            <div>
                                <i :class="service.class_icon"></i>
                            </div>
                            <div class="px-2">
                                {{service.name}}
                            </div>
                        </li>
                    </ul>
                </div>
            </router-link>
        </div>
        <div class="my-3 mx-1">
            <h5 class="card-title">{{ apartment.title }}</h5>
            <div class="d-flex">
                <p class="me-4"><i class="fa-solid fa-bed"></i> {{ apartment.n_bed }}</p>
                <p class="me-4"><i class="fa-solid fa-bath"></i> {{ apartment.n_bathroom }}</p>
                <p v-on:click="isVisible = !isVisible" class="m-0 show"><i class="fa-solid fa-bell-concierge"></i> Services <i class="fa-solid fa-caret-down"></i></p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .wh-card {
        width: 18rem;
        height: 17rem;
    }

    .bg-dark-transparent{
        background-color: rgb(0, 0, 0, 0.5);
    }

    .show:hover {
        cursor: pointer;
    }

    .our-card {
        transition: transform 500ms ease;
    }
    .our-card:hover{
        transform: scale(1.05);
    }

    .top-0 {
        top: 0;
        left: 0;
    }

</style>