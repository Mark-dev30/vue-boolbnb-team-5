<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'HomePage',

    data() {
        return {
            store,
            apartments: [],
        }
    }
}


</script>
<template lang="">
    <div>
        <div>
            <div v-for='(element, index) in apartments' :key="index" class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{element.title}}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="">
    
</style>