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
  <footer>
    <div class="container-fluid footer">
      <div class="row px-4 py-2 d-flex">
        <div class="col m-2" v-for="(item, index) in footerItems">
          <!-- item title -->
          <p>
            {{ item.title }}
          </p>
          <div class="line"></div>
          <!-- item content -->
          <ul>
            <li v-html="item" v-for="(item, index) in item.content"></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
footer {
    text-align: left;

    .footer {
        font-size: 14px;
        position: absolute;
        bottom: 0;
        left: 0;

        p {
            font-size: 18px;
            font-weight: 700;
        }

        ul {
            color: grey;
            padding: 0;

            li {
                display: flex;
                list-style: none;
                margin: 8px 0;

                a {
                    color: #ccc;
                }

                i {
                    margin-right: 15px;
                }
            }

            li:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
