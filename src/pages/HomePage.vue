<script>
import axios from 'axios';
import { store } from '../store';
import Jumbotron from '../components/Jumbotron.vue';
import Advertising from '../components/Advertising.vue';
import SponsorCard from '../components/SponsorCard.vue';
import TeamCard from '../components/TeamCard.vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
export default {
    name: 'HomePage',
    data() {
        return {
            store,
            sponsor: [],
            team: [
                {
                    image: 'src/assets/img/lorenzo-martini-ov.jpg',
                    imageHover: 'src/assets/img/lorenzo-martini.png',
                    name: 'Marco Fronterré',
                    job: 'Jr. Full Stack Web Developer',
                    url: 'https://www.linkedin.com/in/marco-fronterre/',
                },
                {
                    image: 'src/assets/img/lorenzo-martini-ov.jpg',
                    imageHover: 'src/assets/img/lorenzo-martini.png',
                    name: 'Sophia Mziou',
                    job: 'Jr. Full Stack Web Developer',
                    url: 'https://www.linkedin.com/in/sophia-mziou-b57baa170/',
                },
                {
                    image: 'src/assets/img/lorenzo-martini-ov.jpg',
                    imageHover: 'src/assets/img/lorenzo-martini.png',
                    name: 'Lorenzo Martini',
                    job: 'Jr. Full Stack Web Developer',
                    url: 'https://www.linkedin.com/in/lorenzo-martini-mrt/',
                },
                {
                    image: 'src/assets/img/lorenzo-martini-ov.jpg',
                    imageHover: 'src/assets/img/lorenzo-martini.png',
                    name: 'Aurora Bizzozero',
                    job: 'Jr. Full Stack Web Developer',
                    url: 'https://www.linkedin.com/in/aurora-bizzozero-50b696210/',
                },
                {
                    image: 'src/assets/img/lorenzo-martini-ov.jpg',
                    imageHover: 'src/assets/img/lorenzo-martini.png',
                    name: 'Ilario Moreni',
                    job: 'Jr. Full Stack Web Developer',
                    url: 'https://www.linkedin.com/in/ilario-moreni/',
                },
            ],
            settings: {
                itemsToShow: 1.3,
                snapAlign: 'center',
            },
            // breakpoints are mobile first
            // any settings not specified will fallback to the carousel settings
            breakpoints: {
                // 768px and up
                768: {
                    itemsToShow: 2.5,
                    snapAlign: 'center',
                },
                // 992 and up
                992: {
                    itemsToShow: 3.4,
                    snapAlign: 'center',
                },

                1052: {
                    itemsToShow: 3.4,
                    snapAlign: 'center',
                },
                // 1200 and up
                1200: {
                    itemsToShow: 4.3,
                    snapAlign: 'center',
                },
                // 1400 and up
                1400: {
                    itemsToShow: 4.8,
                    snapAlign: 'center',
                },
                1570: {
                    itemsToShow: 5,
                    snapAlign: 'center',
                },
                1670: {
                    itemsToShow: 5.3,
                    snapAlign: 'center',
                },
                1800: {
                    itemsToShow: 5.6,
                    snapAlign: 'center',
                },
            },
        }
    },

    components: {
        Carousel,
        Slide,
        Navigation,
        TeamCard,
        Jumbotron,
        Advertising,
        SponsorCard
    },

    methods: {
        getProperty() {
            axios.post(`${this.store.baseUrl}/api/apartments/sponsor`).then((response) => {
                if (response.data.success) {
                    this.sponsor = response.data.sponsor
                }
                else {
                    console.log('nope')
                }
            });
        }
    },

    mounted() {
        this.getProperty()
    }
}


</script>
<template lang="">
    <Jumbotron></Jumbotron>
    <!-- Titolo sezione sponsorizzate     -->
    <div class="container g-0 title-sponsor px-3 px-lg-0 pt-lg-5 mt-5 mb-4 mt-lg-5">
        <div class="row">
            <div class="col-12 col-lg-6">
                <div class="container-fluid">
                    <h2>La selezione di boolbnb</h2>
                    <p>Che sia al mare, in montagna o in città, dai un'occhiata alle <strong>proposte di questa settimana,</strong> innamorati di un luogo dove passare le tue vacanze e <strong>contatta il proprietario!</strong></p>
                </div>
            </div>
            <div class="col-12 col-lg-6 d-flex justify-content-end align-items-center">
                <div class="container-img mx-2 m-lg-0 d-flex gap-5 w-100">
                    <img  src="src/assets/img/bool-bb-loghetti.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- Sezione card delle proprietà sponsorizzate     -->
    <div class="mb-0 pb-4 pb-lg-5 mb-lg-3">
        <Carousel class="slider-prova" :settings="settings" :breakpoints="breakpoints" autoplay="2000" :wrap-around="true"  transition="500" pauseAutoplayOnHover="true">
            <Slide class="py-3" v-for="(element, index) in this.sponsor" :key="index">
                <SponsorCard :apartment="element"></SponsorCard>
            </Slide>    
        </Carousel>
    </div>
    <!-- Titolo sezione Adv     -->
    <div class="container-fluid bg-grey pt-3 py-lg-5">
        <div class="container g-0 title-sponsor px-3 px-lg-0 mt-5 mb-4 mt-lg-5 bg-grey">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-6">
                    <div class="container-fluid text-center">
                        <h2>Le garanzie boolbnb</h2>
                        <p class="mt-3">Prenotare con boolbnb è facile e sicuro. Controlliamo personalmente tutte le proprietà per garantire che il servizio erogato sia sempre al top!<br><strong>Prenota oggi ed assicurati un'esperienza fantastica!</strong></p>
                    </div>
                </div>
            </div>
        </div>  
        <Advertising></Advertising>
    </div>
    <!-- Titolo sezione sponsorizzate     -->
    <div class="container g-0 title-sponsor px-3 px-lg-0 pt-5 mt-5 mb-4 mt-lg-5">
        <div class="row">
            <div class="col-12 col-lg-8">
                <div class="container-fluid">
                    <h2>Il Team di boolbnb</h2>
                    <p>Prima vera esperienza di lavoro in Team. Abbiamo lavorato insieme, trovato soluzioni a problemi prima sconosciuti, abbiamo provato gioia e frustrazione, ma anche riso e scherzato. Tra difficoltà, cooperazione, risate e piccoli colpi di genio, alla fine ce l'abbiamo fatta (ed il risultato non è niente male). <strong>Grazie ad ognuno di voi.</strong></p>
                </div>
            </div>
            <div class="col-12 col-lg-4 d-flex class-82 justify-content-start justify-content-lg-end align-items-lg-end mb-1">
                <div class="mx-2 m-lg-0 d-flex gap-5">
                    <h2 class="me-2 text-start text-lg-end">Boolean<br>Team #5 - Classe #82</h2>
                </div>
            </div>
        </div>
    </div>
    <div class="container pb-5 pb-lg-0">
        <div class="row">
            <div class="col g-0 pe-lg-0 pb-lg-5 mb-lg-5">
                <div class="container px-4 px-lg-2 gap-4 gap-lg-0 d-flex flex-wrap justify-content-between justify-content-md-start justify-content-lg-between">
                    <TeamCard v-for="(elem, n) in team" :key="n" :team="elem"></TeamCard>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-container {
    display: flex;
}

.carousel__track {
    align-items: start;
}

.title-sponsor {
    img {
        width: 100%;
    }

    h2 {
        color: #02CCBC;
    }
}

.bg-grey {
    background-color: #ebebeb;
}

.class-82 {
    h2 {
        font-weight: 300;
    }
}

@media screen and (max-width: 900px) and (min-width: 600px) {
    .title-sponsor {
        img {
            width: 50%;
            text-align: center;
        }
    }
}
</style>