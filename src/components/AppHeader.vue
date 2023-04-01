<script>
import AppSearch from './AppSearch.vue';
import axios from 'axios';
import { store } from '../store'
export default {
    data() {
        return {
            string: '',
            text: '',
            store,
            apartments: [],
            researchPosition: {},
            databaseLocations: []
        }
    },
    components: {
        AppSearch
    },
    methods: {
        getRadiusCenter(parametro) {
            let newUrl = `${store.searchUrlFirst}${parametro}${store.searchUrlSecond}${store.apikey}`
            axios.get(newUrl).then((response) => {
                // let i
                this.researchPosition = response.data.results[0].position
                this.ConfrontProperty()
            })
        },
        ConfrontProperty() {
            store.apartmentList = []
            let AptPosition
            let arrayApt = []
            let AptString
            let radiusUrl = ""
            this.apartments.forEach(function (apartment) {
                AptPosition = `%7B%22position%22%3A%7B%22lat%22%3A${apartment.latitude}%2C%22lon%22%3A${apartment.longitude}%7D%7D`
                arrayApt.push(AptPosition)
            })
            AptString = arrayApt.toString()
            radiusUrl = `https://api.tomtom.com/search/2/geometryFilter.json?geometryList=%5B%7B%22type%22%3A%22CIRCLE%22%2C%20%22position%22%3A%22${this.researchPosition.lat}%2C%20${this.researchPosition.lon}%22%2C%20%22radius%22%3A20000%7D%2C%20%7B%22type%22%3A%22POLYGON%22%2C%20%22vertices%22%3A%5B%2237.7524152343544%2C%20-122.43576049804686%22%2C%20%2237.70660472542312%2C%20-122.43301391601562%22%2C%20%2237.712059855877314%2C%20-122.36434936523438%22%2C%20%2237.75350561243041%2C%20-122.37396240234374%22%5D%7D%5D&poiList=%5B${AptString}%5D&key=${store.apikey}`
            /* console.log(radiusUrl) */
            axios.get(radiusUrl).then((response) => {
                let radiusUrl_results = response.data.results
                let j
                for (j = 0; j < radiusUrl_results.length; j++) {
                    radiusUrl_results[j].position

                    let newArray = this.apartments.filter(function (el) {
                        return el.latitude == radiusUrl_results[j].position.lat &&
                            el.longitude == radiusUrl_results[j].position.lon
                    });

                    store.apartmentList.push(newArray)
                }
            })
        },

        getApartments() {
            axios.get(`${store.baseUrl}/api/apartments`).then((response) => {
                if (response.data.success) {
                    this.apartments = response.data.apartments.data
                    /* console.log(this.apartments) */
                }
            });
        },
        search() {
            this.string = this.text
            this.$store.dispatch('setString', this.text);
        }
    },
    mounted() {
        this.getApartments()
    }
}
</script>

<template lang="">
    <header class="container-fluid">
        <div class="container h-100 d-flex justify-content-between align items-center">
            <img src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png" alt="">
            <!-- search -->
            <div class="container-search d-flex align-items-center gap-3">
                <input class="form-control" type="text" v-model="value" @keyup.enter="$emit('search', searchText)">
            </div>
        </div>
    </header>

</template>
<style lang="scss">
header {
    height: 85px;
    background-color: #fff;
}
</style>