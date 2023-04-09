<script>
import AppSearch from './AppSearch.vue';
import axios from 'axios';
import { store } from '../store'
export default {
    data() {
        return {
            store,
            apartments: [],
            researchPosition: {},
            databaseLocations: [],
            value: '',
            loading: false
        }
    },
    components: {
        AppSearch
    },
    methods: {
        getSearch(a) {
            axios.post(`${this.store.baseUrl}/api/apartments`, {
                street: a,
            }).then((response) => {

                if (response.data.success) {
                    store.apartmentList = response.data.filteredList
                    this.loading = false
                }

            });
        },
        getString(param) {
            if (param != '') {
                console.log('sono entrato')
                let str = param
                let strReplace = str.replace(/ +/g, "%20");
                store.street = strReplace
                this.getSearch(strReplace)
                this.$router.push({ name: 'apartment_list' })

            }
            else {
                let error = 'inserisci qualcosa'
                return error
            }
        },
        isLoaded(a) {
            if (a != '') {
                store.apartmentList = []
                this.loading = true
                setTimeout(this.getString(a), 3000)
            }
            else {
                let error = 'inserisci qualcosa'
                return error
            }

        }
    },

    /* methods: {
        getRadiusCenter(parametro) {
            let newUrl = `${store.searchUrlFirst}${parametro}${store.searchUrlSecond}${store.apikey}`
            axios.get(newUrl).then((response) => {
                
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
                    
                }
            });
        },
        getSearch(parametro) {
            this.getRadiusCenter(parametro)
            
        }
    }, */
    mounted() {

    }
}
</script>

<template lang="">
    <header class="container-fluid">
        <div class="container h-100 d-flex justify-content-between align items-center position-relative">
            <router-link :to="{ name: 'homepage'}" class="d-flex"><img src="../../public/bool-bb-logo.svg" alt="Bool bnb logo"></router-link>
            <div class="container-search d-flex align-items-center gap-3">
                <!-- <input class="form-control" type="text" v-model="value" @keyup.enter="getString(value)">
                <router-link :to="{ name: 'apartment_list'}" class="btn btn-primary"
                    @click="getString(value)">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </router-link> -->
                <div class="searchbar d-none d-md-flex">
                    <input class="search_input" type="text" v-model="value" @keyup.enter="isLoaded(value)" required placeholder="Cerca...">
                    <div class="search_icon" @click="isLoaded(value)"> 
                        <i class="fas fa-search"></i>
                    </div>
                </div>
                <div class="login-container searchbar d-none d-md-flex align-items-center justify-content-center">
                    <div class="d-flex align-items-center">
                        <div class="search_icon user">
                            <a href="http://127.0.0.1:8000/admin/dashboard"><i class="fa-regular fa-user"></i></a>
                        </div>
                        <div class="dropdown">
                            <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-bars"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end desk-menu mt-1">
                                <li><a class="dropdown-item" href="http://127.0.0.1:8000/login">Log-in</a></li>
                                <li><a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrati</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Navigazione mobile -->
                <div class="d-flex d-md-none mobile">
                    <div class="dropdown">
                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-search"></i>
                        </button>
                        <ul class="dropdown-menu mobile-nav px-4">
                            <li class="searchbar d-none d-md-flex">
                                <input class="search_input form-control" type="text" v-model="value" @keyup.enter="isLoaded(value)"  placeholder="Cerca...">
                                <div class="search_icon" @click="isLoaded(value)"> 
                                    <i class="fas fa-search"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="dropdown">
                        <button class="btn pe-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-bars"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end mobile-nav">
                            <div class="container d-flex justify-content-end">
                                <li><a class="btn-drop" href="http://127.0.0.1:8000/login">Log-in</a></li>
                                <li><a class="btn-drop" href="http://127.0.0.1:8000/register">Registrati</a></li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- <div class="w-100 search-mobile position-absolute">
                <div class="container my-3">
                    <div class="searchbar d-flex">
                        <input class="search_input" type="text" v-model="value" @keyup.enter="getString(value)" placeholder="Cerca...">
                        <router-link :to="{ name: 'apartment_list'}" class="search_icon"
                            @click="getString(value)">
                            <i class="fas fa-search"></i>
                        </router-link>
                    </div>
                </div>
            </div> -->
        </div>
    </header>
    <div class="container mt-5">
        <div class="row" v-if="this.loading == true" >
            <div class="col-12 col-md-6 col-lg-3 gap-1" v-for="n in 6" >
                <div class="card-loader">
                    <div class="image-loader"></div>
                    <div class="content-loader">
                        <h2 class="h2-loader"></h2>
                        <p class="p-loader"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
header {
    height: 85px;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
    z-index: 10;

    img {
        width: 130px;
    }
}

.user a {
    color: #fff;
}

.searchbar {
    height: 40px;
    background-color: #fff;
    border-radius: 30px;
    border: 1px solid #ebebeb;
    padding: 0px;
    display: flex;
    align-items: center;

}

.search_input {
    color: #000;
    border: 0;
    outline: 0;
    background: none;
    width: 0;
    caret-color: transparent;
    line-height: 40px;
    padding: 0 20px;
    width: 400px;
    caret-color: #02CCBC;
}

.search_icon:hover {
    background: white;
    color: #02CCBC;
}

.search_icon:hover a {
    background: white;
    color: #02CCBC;
}

.search_icon {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: white;
    background-color: #02CCBC;
    text-decoration: none;
    cursor: pointer;

    a {
        color: #fff;
    }
}

.search-mobile {
    border-bottom: 1px solid #ebebeb;
    width: 100vw;
    top: 85px;
    left: 0;
    z-index: 5;
}

.login-container {
    border: 1px solid #ebebeb;

    .search_icon {
        margin: 0 5px;
    }
}

.desk-menu li :hover {
    background-color: #02CCBC !Important;
    color: #fff !Important;

    input {
        color: #000;
    }
}

.btn.show,
.btn {
    border: none !important;
}

.distance {
    margin-top: 10px;
}

.mobile {
    .search_icon {
        height: 30px;
        width: 43px;
    }

    .searchbar {
        color: #000;
        padding: 0;
        margin: 0 20px;
    }

    // li :hover {
    //     background-color: transparent !Important;
    // }
}

.form-control:focus {
    box-shadow: none;
    background-color: transparent;
}

.mobile-nav {
    width: 100vw;
    border: none !important;
    margin-top: 24px !important;
    padding: 20px 0 !important;
    border-bottom: 1px solid #ebebeb !important;
    border-radius: 0 !important;
    // display: flex;

    li {
        padding: 0 10px;
        display: flex !important;

        input {
            color: #000;
        }

        a {
            display: flex !important;
        }
    }

    .btn-drop {
        text-decoration: none;
        color: #02CCBC;
        background-color: #ebebeb;
        padding: 5px 20px;
        border-radius: 50px;
    }

}

/* Loader */
.card-loader {
    background: #fff;
    border-radius: 10px;
}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}

.image-loader,
.h2-loader,
.p-loader {
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
}

.image-loader {
    height: 17rem;
    border-radius: 1rem;
}

.content-loader {
    margin: 23px 10px 0 0;
}

.h2-loader {
    width: 80%;
    height: 1rem;
}

.p-loader {
    width: 50%;
    height: 1rem;

}
</style>