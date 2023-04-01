import { reactive } from "vue";
export const store = reactive({
    baseUrl: 'http://127.0.0.1:8000',
    /* apikey: 'sqAC6HGqUo0FuWA7iea7gmbV4KpA2wju',
    searchUrlFirst: 'https://api.tomtom.com/search/2/geocode/',
    searchUrlSecond: '.json?storeResult=false&countrySet=IT&language=it-IT&view=Unified&key=', */
    apartmentList: []

})