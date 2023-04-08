<script>
import { store } from "../store";

export default {
    name: 'ApartmentCard',
    props: {
        team: Object,

    },
    data() {
        return {
            store,
            isVisible: false
        }
    }
}
</script>
<template lang="">
    <a :href="team.url" class="mb-2 our-card">
        <div class="single-card h-100">
            <div class="position-relative">
                <img :src="team.image" alt="" class="rounded-4">
                <img :src="team.imageHover" alt="" class="rounded-4 ov position-absolute">
            </div>
            <div class="my-3 mx-2 gap-0 gap-lg-2 d-flex flex-column align-items-start text-start details">
                <p class="card-title"><strong>{{ team.name }}</strong></p>
                <div class="d-flex justify-content-between align-items-end w-100">
                    <div class="d-flex">
                        <p class="me-3 mb-0">{{ team.job }}</p>
                    </div>
                    <a class="servizi" :href="team.url"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
    </a>
</template>

<style lang="scss" scoped>
.wh-card {
    width: 18rem;
    height: 17rem;
}

a {
    text-decoration: none;
    color: #000;
}

.card-title {
    color: #02CCBC;
}

.single-card {
    width: 100%;

    img {
        width: 100%;
        object-fit: cover;
        background-color: #02CCBC;
    }
}

.bg-dark-transparent {
    background-color: rgb(0, 0, 0, 0.5);
}

.show:hover {
    cursor: pointer;
}

.our-card {
    width: calc(100% / 5 - 1rem);
    transition: transform 500ms ease;
}

.our-card:hover {
    transform: scale(1.05);

    .ov {
        top: 0;
        left: 0;
        opacity: 1;
    }
}

.our-card:hover a {
    background-color: #02CCBC;
    color: #fff;

    i {
        color: #fff;
    }
}

.ov {
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 250ms ease;
}

.details i {
    color: #02CCBC;
}

.servizi {
    border: none;
    border-radius: 50px;
    padding: 0 15px;
    background-color: #ebebeb;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 400ms ease;

    &:hover {
        background-color: #02CCBC;
        color: #fff;


        i {
            color: #fff;
        }
    }
}

.hover-back {
    background-color: #02CCBC;
    width: 100%;
    display: flex;
    bottom: 0;
    left: 0;
    border-radius: 0 0 15px 15px;
}

@media screen and (max-width: 768px) {
    .our-card {
        width: calc(100% / 3 - 1rem);
        transition: transform 500ms ease;
    }

    .card-title {
        font-size: 20px;
    }

    p {
        font-size: 18px;
    }
}

@media screen and (max-width: 576px) {
    .our-card {
        width: 100%;
        transition: transform 500ms ease;
    }

    .card-title {
        font-size: 20px;
    }

    p {
        font-size: 18px;
    }
}
</style>