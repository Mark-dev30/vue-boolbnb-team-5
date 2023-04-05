<script>
import {store} from "../store";

export default {
    name: 'ApartmentCard',
    props: {
        apartment: Object,

    },
    data() {
        return {
            store
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
}
</script>
<template lang="">
    <div class="h-same">
        <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug }}">
            <img :src="apartment.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://picsum.photos/300/200'" alt="" class="img-fluid h-17 rounded-4" @click='getLatAndLon(apartment)'>

        </router-link>
    </div>
    <div class="">
        <h5 class="card-title">{{ apartment.title }}</h5>
        <p class="m-0">N. Rooms{{ apartment.n_room }}</p>
        <p class="m-0">N. Bed{{ apartment.n_bed }}</p>
    </div>
</template>

<style lang="scss">

    .h-same {
        width: 100%;
        aspect-ratio : 1 / 1;
    }

    .h-17 {
        height: 17rem;
    }

</style>