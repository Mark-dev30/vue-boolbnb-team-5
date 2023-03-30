<script>
import { store } from '../store';
export default {
    name: 'ApartmentCard',
    props: {
        apartment: Object,

    },
    data() {
        return {
            store
        }
    }
}
</script>
<template lang="">
    <!-- <img :src="project.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://picsum.photos/300/200'"class="img-fluid" alt=""> -->
    <div class="card-body">
        <img :src="apartment.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://picsum.photos/300/200'" alt="" class="img-fluid">
        <h5 class="card-title">{{ apartment.title }}</h5>
        <p class="card-text">N. Rooms{{ apartment.n_room }}</p>
        <p class="card-text">N. Bed{{ apartment.n_bed }}</p>
        <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug }}" class="btn btn-sm btn-primary">
            Dettaglio
        </router-link>
    </div>
</template>

<style lang="scss"></style>