<script>
export default {
    data() {
        return {
            footerItems: [
                {
                    title: "Assistenza",
                    content: [
                        "Centro assistenza",
                        "AirCover",
                        "Accessibilità per tutti",
                        "Opzioni di cancellazione",
                        "La nostra risposta all'emergenza COVID-19",
                        "Segnala problemi nel quartiere",
                    ],
                },
                {
                    title: "Community",
                    content: [
                        "Airbnb.org: un rifugio sicuro",
                        "Contro la discriminazione"
                    ],
                },
                {
                    title: "Ospitare",
                    content: [
                        "Apri un Airbnb",
                        "AirCover per gli host",
                        "Esplora le risorse per host",
                        "Vai al forum della comunity",
                        "Come ospitare responsabilmente"
                    ],

                },
                {
                    title: "Airbnb",
                    content: [
                        "Newsroom",
                        "Scopri le nuove funzionalità",
                        "Lettera dai nostri fondatori",
                        "Opportunità di lavoro",
                        "Investitori",
                        "Gift card"
                    ],
                }
            ],
        };
    },
}
</script>
<template lang="">
    <footer class="container-fluid g-0">
        <div class="container footer py-5 g-5 g-lg-0 px-lg-3">
            <div class="row d-flex flex-column flex-md-row flex-lg-nowrap">
                <div class="col my-3 col-md-6 col-lg-3" v-for="(item, index) in footerItems">
                    <!-- item title -->
                    <p class="title">
                        {{ item.title }}
                    </p>
                <div class="line"></div>
                    <!-- item content -->
                    <ul class="d-flex flex-column gap-0">
                        <li class="my-1" v-html="item" v-for="(item, index) in item.content"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container-fluid copy">
            <div class="container py-3">
                <p class="m-0 text-center">Copyright 2029 © Boolbnb - Developed by Team 5 - Classe Boolean #82</p>
            </div>
        </div>
    </footer>
</template>
<style lang="scss">
footer {
    text-align: left;
    background-color: #ebebeb;

    .copy {
        background-color: #02CCBC;
        color: #fff;
    }

    .footer {
        font-size: 14px;
        bottom: 0;
        left: 0;

        .title {
            color: #02CCBC;
        }

        p {
            font-size: 18px;
            font-weight: 700;
        }

        ul {
            color: grey;
            padding: 0;
            margin-bottom: 0;

            li {
                display: flex;
                list-style: none;

                a {
                    color: #ccc;
                }

                i {
                    margin-right: 15px;
                }
            }

            li:hover {
                cursor: pointer;
                color: #02CCBC;
            }
        }
    }
}
</style>
