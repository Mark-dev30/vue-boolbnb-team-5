<script>
import { store } from '../store';
import axios from 'axios';

import SingleApartmentFormMessage from '../components/SingleApartmentFormMessage.vue';

export default {
    name: 'SingleApartment',
    components: {
        Map,
    },

    data() {
        return {
            store,
            apartment: [],
            loading: true,
            region: '',
            address: ''
        }
    },
    components: {
        SingleApartmentFormMessage,
    },
    mounted() {
        this.scrollTop();
        this.loading = true;
        this.letLoad()

    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        getaddress(lat, lon) {
            axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${lat}%2C${lon}.json?returnSpeedLimit=false&radius=10000&returnRoadUse=false&allowFreeformNewLine=false&returnMatchType=false&view=Unified&key=sqAC6HGqUo0FuWA7iea7gmbV4KpA2wju`).then((response) => {

                /* console.log(response.data.addresses[0].address.countrySecondarySubdivision) */

                this.address = response.data.addresses[0].address.freeformAddress;
            })
        },
        axiosCall() {
            axios.get(`${store.baseUrl}/api/apartments/${this.$route.params.slug}`).then((response) => {
                this.apartment = response.data.apartment
                let latitude = response.data.apartment.latitude
                let longitude = response.data.apartment.longitude
                /* this.latLonToTileZXY(latitude,longitude, 14); */
                this.getaddress(latitude, longitude);
                this.createMap(longitude, latitude);
                this.loading = false;
            })
        },
        letLoad() {
            setTimeout(this.axiosCall, 1000);
        },
        createMap(lat, lon) {
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
        addMarker(map, lat, lon) {
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
            var marker = new tt.Marker({ color: color, scale: 1, draggable: true }).setLngLat(location).addTo(map);
            var popup = new tt.Popup({ offset: popupOffsets }).setHTML('Siamo qui!');
            marker.setPopup(popup).togglePopup();
        },
        scrollTop() {
            window.scrollTo(0, 0);
        }
    }
}
</script>
<template lang="">
    <div class='container'>
        <div class="row">
            <div class="col">
                <button type='button' class='btn my_btn my-4' @click="goBack">
                  Torna alla lista 
                </button>
            </div>
        </div>
    </div>
    <div v-if='loading'>
        <div class='d-flex justify-content-center'>
            <lord-icon
                src="https://cdn.lordicon.com/hjbsbdhw.json"
                trigger="loop" delay="400"
                colors="primary:#e4e4e4,secondary:#02ccbc,tertiary:#02ccbc,quaternary:#ebe6ef"
                style="width:250px;height:250px;margin-top: 30vh;">
            </lord-icon>
            <!-- <div class="loader"></div> -->
        </div>
    </div>
    <div v-else>
        <div class="container apt_container">
            <div class="row pb-5">
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
                                    <div class="modal-content my_content">
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
                        <div class='my_address ms-2'>
                            <strong><i class="fa-solid fa-map-location-dot icon_services me-2 "></i>Indirizzo: </strong>{{address}}, {{region}}
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
                <div class='ps-3 my_address'>
                    <div class='ms-2'>
                        <strong><i class="fa-solid fa-map-location-dot icon_services me-2 "></i>Indirizzo:</strong>{{address}}, {{region}}
                    </div>
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
    </div>
    <div class='container'>
        <div id='map'></div> 
        <hr>
    </div>
</template>

<style lang="scss" scoped>
.apt_container {
    font-size: 18px;
}

.apt_title {
    font-size: 48px;
    margin-bottom: 0.5rem;
}

.my_modal {
    max-height: 96vh;

    .my_content {
        height: 50%;
    }

    .my_modal_img {
        margin: 0 auto;
        max-width: 75%;
        aspect-ratio: 4 / 3;
    }
}

.icon_services::before {
    display: flex;
    width: 20px;
    justify-content: center;
}

.icon_services {
    color: #02CCBC;
    width: 20px;
}

.grey_font {
    color: rgb(160, 160, 160);
}

.info_title {
    font-size: 24px;
}

#map {
    width: 100%;
    aspect-ratio: 16 / 9;
}

.my_img_apt {
    aspect-ratio: 4 / 3;
}


@media (min-width: 550px) and (max-width: 992px) {
    .apt_title {
        font-size: 36px;
    }

}

@media (max-width: 550px) {
    .apt_title {
        margin-bottom: 0.5rem;
    }

}

/* loader */
.loader {
    margin-top: 30vh;
    border: 16px solid #f3f3f3;
    /* Light grey */
    border-top: 16px solid #02CCBC;
    /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.my_btn {
    background-color: #02CCBC;
    color: white;
    font-weight: bold;
    font-size: 24px;

    &:hover {
        color: #02CCBC;
        background-color: white;
        border: 1px #02CCBC solid;
    }
}


.my_address {
    margin-bottom: 0.5rem;
}

/* loader 2 */
/* 
        .loader {
  width: 48px;
  height: 48px;
  display: block;
  margin: 20px auto;
  box-sizing: border-box;
  position: relative;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  left: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50% 50% 0;
  border: 15px solid #FFF;
  transform: rotate(45deg) translate(0, 0);
  box-sizing: border-box;
  animation: animMarker 0.4s ease-in-out infinite alternate;
}
.loader::before {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 150%;
  width: 24px;
  height: 4px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  animation: animShadow 0.4s ease-in-out infinite alternate;
}

@keyframes animMarker {
  0% {
    transform: rotate(45deg) translate(5px, 5px);
  }
  100% {
    transform: rotate(45deg) translate(-5px, -5px);
  }
}

@keyframes animShadow {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
} */
</style>