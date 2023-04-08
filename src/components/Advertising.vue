<script>
export default {

}
</script>

<template>
    <div class="container pt-3 pb-4">
        <div class="row">
            <div class="col-3 text-center mt-0">
                <div>
                    <div><i class="fa-solid fa-shield-halved"></i></div>
                    <h5 class="my-3">Prenotazioni più sicure</h5>
                    <p>La nostra Garanzia Prenotazione Sicura offre supporto 24 ore al giorno, 7 giorni su 7</p>
                </div>
            </div>
            <div class="col-3 text-center mt-0">
                <div>
                    <div><i class="fa-solid fa-suitcase"></i></div>
                    <h5 class="my-3">Migliore qualità del tempo</h5>
                    <p>Dalla prenotazione al soggiorno, il percorso è semplice e gradevole</p>
                </div>
            </div>
            <div class="col-3 text-center mt-0">
                <div>
                    <div><i class="fa-solid fa-mug-hot"></i></div>
                    <h5 class="my-3">Con l’intimità di una casa</h5>
                    <p>Tutte le comodità a tua disposizione, piscina, parcheggio gratis, wi-fi, e molto altro</p>
                </div>
            </div>
            <div class="col-3 text-center mt-0">
                <div>
                    <div><i class="fa-solid fa-piggy-bank"></i></div>
                    <h5 class="my-3">Molto più che una casa vacanza</h5>
                    <p>Più spazio, più privacy, più servizi... migliore qualità!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
i {
    font-size: 30px;
    color: rgb(0, 206, 188);
}

h5 {
    color: rgb(0, 206, 188);
}

@media (max-width: 500px) {

    .row {
        display: flex;
        flex-direction: column;
        margin-bottom: 3rem !important;
        padding: 0 12px 0 12px;
    }

    .col-3 {
        width: 100%;
    }

    .my-5 {
        margin-bottom: 0 !important;
    }
}

@media (min-width: 501px) and (max-width: 900px) {

    .row {
        display: flex;
        margin-bottom: 3rem !important;
        flex-wrap: wrap;
    }

    .col-3 {
        width: 50%;
    }

    .my-5 {
        margin-bottom: 0 !important;
    }
}
</style>