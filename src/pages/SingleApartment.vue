<script>
import { store } from '../store';
import axios from 'axios';

import SingleApartmentFormMessage from '../components/SingleApartmentFormMessage.vue';

export default {
    name: 'SingleApartment',
    data() {
        return {
            store,
            apartment: [],
        }
    },
    components:{
        SingleApartmentFormMessage,
    },
    mounted() {
        axios.get(`${store.baseUrl}/api/apartments/${this.$route.params.slug}`).then((response) => {
            this.apartment = response.data.apartment
            let latitude = response.data.apartment.latitude
            let longitude = response.data.apartment.longitude
            
            /* this.latLonToTileZXY(latitude,longitude, 14); */
            this.createMap(longitude, latitude);

        })
    },
    methods:{
        createMap(lat, lon){
            var map = tt.map({
                key: store.apikey,
                container: "map",
                center: [lat, lon],
                zoom: 13,
            })
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl()); 
            this.addMarker(map, lat, lon);
        },
        addMarker(map, lat, lon){
            const tt = window.tt;
            var location = [lat, lon];
            var popupOffsets = {
                top: [0, 0],
                bottom: [0, -30],
                'bottom-right': [0, -30],
                'bottom-left': [0, -30],
                left: [0, -35],
                right: [-25, -35]
            }
            let color = '#02CCBC';
            var marker = new tt.Marker({color: color, scale: 1, draggable: true }).setLngLat(location).addTo(map);
            var popup = new tt.Popup({offset: popupOffsets}).setHTML('Siamo qui!');
            marker.setPopup(popup).togglePopup();
        }
    }
}
</script>
<template lang="">
    <div class="container apt_container">
        <div class="row py-5">
            <div class="col-md-8">
                <div class="d-flex justify-content-center">
                    <div class='d-block d-md-none'>
                        <img :src="apartment.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://www.finconsumo.com/wp-content/uploads/2022/07/placeholder-176.png'" alt="" class="img-fluid h-17 rounded-3 w-100 h-auto my_img_apt">
                    </div>
                    <div class='d-none d-md-block'>
                        <img :src="apartment.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://www.finconsumo.com/wp-content/uploads/2022/07/placeholder-176.png'" alt="" class="img-fluid h-17 rounded-3 w-100 h-auto my_img_apt" data-bs-toggle="modal" data-bs-target="#open_img">
                        <!-- Modal -->
                        <div class="modal fade modal-xl my_modal" id="open_img" tabindex="-1" aria-labelledby="open_imgLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="d-flex justify-content-end">
                                    <button type="button" class="btn-close mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="d-flex justify-content-center p-2">
                                    <img :src="apartment.image != null ? `${this.store.baseUrl}/storage/${apartment.image}` : 'https://picsum.photos/300/200'" alt="" class="my_modal_img">
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <!-- tablet e desktop -->
            <div class='d-none d-md-block col-4'>
                <div class="ps-3 row my_row">
                    <div>
                        <h1 class='apt_title'><strong>{{ apartment.title }}</strong></h1>
                    </div>
                    <div class="">
                        <div class='info_title'>
                            <strong>PANORAMICA</strong>
                        </div>
                        <div class="">
                            <ul class="list-unstyled">
                                <li class='my-2'>
                                    <strong class="mx-2"><i class="fa-solid fa-person-shelter icon_services"></i></strong>
                                    <span class=""><strong>Stanze: </strong>{{ apartment.n_room }}</span>
                                </li>
                                <li class='my-2'>
                                    <strong class="mx-2"><i class="fa-solid fa-bed icon_services"></i></strong>
                                    <span class=""><strong>Letti: </strong>{{ apartment.n_bed }}</span>
                                </li>
                                <li class='my-2'>
                                    <strong class="mx-2"><i class="fa-solid fa-bath icon_services"></i></strong>
                                    <span class=""><strong>Bagni: </strong>{{ apartment.n_bathroom }}</span>
                                </li>
                                <li class='my-2'>
                                    <strong class="mx-2"><i class="fa-solid fa-kaaba icon_services"></i></strong>
                                    <span class=""><strong>Superficie: </strong>{{ apartment.mq }}m&#178;</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- mobile -->
        <SingleApartmentFormMessage :apartment_id='apartment.id'/>
        <hr class='d-none d-md-block'>
        <div class='d-block d-md-none'>
            <div class="p-3 row">
                <h1 class='apt_title'><strong>{{ apartment.title }}</strong></h1>
            </div>
        </div>

        
        <!-- mobile -->
        <div class='d-md-none d-block'>
            <div class="ps-3 row py-3">
                <div class="col-12">
                    <div class='info_title'>
                    <strong>PANORAMICA</strong>
                    </div>
                    <div class="">
                        <ul class="list-unstyled">
                            <li class='my-2'>
                                <strong class="mx-2"><i class="fa-solid fa-person-shelter icon_services"></i></strong>
                                <span class=""><strong>Stanze: </strong>{{ apartment.n_room }}</span>
                            </li>
                            <li class='my-2'>
                                <strong class="mx-2"><i class="fa-solid fa-bed icon_services"></i></strong>
                                <span class=""><strong>Letti: </strong>{{ apartment.n_bed }}</span>
                            </li>
                            <li class='my-2'>
                                <strong class="mx-2"><i class="fa-solid fa-bath icon_services"></i></strong>
                                <span class=""><strong>Bagni: </strong>{{ apartment.n_bathroom }}</span>
                            </li>
                            <li class='my-2'>
                                <strong class="mx-2"><i class="fa-solid fa-kaaba icon_services"></i></strong>
                                <span class=""><strong>Superficie: </strong>{{ apartment.mq }}m&#178;</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr>
            <div class="ps-3 row py-3">
                <div class="col">
                    <div class='info_title'>
                        <strong>SERVIZI</strong>
                    </div>
                    <div class="">
                        <div v-if='apartment.services?.length == 0 || apartment.services == null' class='grey_font'>Ci dispiace questo appartamento non dispone di nessuno dei servizi inclusi.</div>
                        <ul v-for="(service, index) in apartment.services" class="list-unstyled">
                            <li  :key="index" class='my-2'><strong class="mx-2"><i :class="service.class_icon " class=' icon_services'></i></strong><span>{{ service.name }}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- desktop -->
        <div class='d-none d-md-block'>
            <div class="ps-3 row py-3">
                <div class="col-12">
                    <div class='info_title'>
                        <strong>SERVIZI</strong>
                    </div>
                    <div class="">
                        <div v-if='apartment.services?.length == 0 || apartment.services == null' class='grey_font'>Ci dispiace questo appartamento non dispone di nessuno dei servizi inclusi.</div>
                        <ul v-for="(service, index) in apartment.services" class="list-unstyled">
                            <li  :key="index" class='my-2'><strong class="mx-2"><i :class="service.class_icon " class=' icon_services'></i></strong><span>{{ service.name }}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <hr>
    </div>
    
    <div class='container'>
        <div id='map'></div> 
        <hr>
    </div>

</template>

<style lang="scss" scoped>

.apt_container{
    font-size:18px;
}
.apt_title{
    font-size:48px;
    margin-bottom: 2rem;
}
.my_modal{
    max-height: 96vh;
    .my_modal_img{
        margin: 0 auto;
        max-width: 100%;
        max-height: 100%;
    }
}

.icon_services::before{
    display: flex;
    width: 20px;
    justify-content: center;
}
.icon_services{
    color:#02CCBC;
    width: 20px;
}

.grey_font{
    color:rgb(160, 160, 160);
}

.info_title{
    font-size: 24px;
}

#map { 
        width: 100%;
        aspect-ratio: 16 / 9; 
    } 

    .my_img_apt{
        aspect-ratio: 4 / 3;
    }


    @media (min-width: 550px) and (max-width: 992px){
        .apt_title{
            font-size:36px;
        }
    
    }

    @media (max-width: 550px){
        .apt_title{
            margin-bottom: 0.5rem;
        }
    
    }
    
</style>