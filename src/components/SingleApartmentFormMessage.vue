<script>
import { store } from '../store';
import axios from 'axios';
export default {
    name: 'SingleApartmentFormMessage',
    props:{
        apartment_id: Number
    },
    data(){
        return{
            name: '',
            surname: '',
            email: '',
            description: '',
            store,
        }
    },
    methods: {
        sendMessage() {
            axios.post(`${store.baseUrl}/api/messages`, {
                apartment_id: this.apartment_id,
                name: this.name,
                surname: this.surname,
                email: this.email,
                description: this.description
            }).then((response) => {
                console.log(response);
                if (response.data.success) {
                    alert(response.data.message);
                }
            });
        }/* ,
        isValidEmail(email){
            {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
                {
                    return console.log('ci fidiamo')
                }
                return alert("You have entered an invalid email address!")
            }
        } */
    },
}
</script>
<template lang="">
    <div class='container'>
        <div class="row justify-content-center">
            <div class="col-8">
                <form @submit.prevent='sendMessage()'>
                    <div class="mb-3">
                        <input type="text" class="form-control" placeholder="name" aria-label="name" aria-describedby="addon-wrapping" v-model='name'>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" placeholder="Surname" aria-label="Surname" aria-describedby="addon-wrapping" v-model='surname'>
                    </div>
                    <div class="mb-3">
                       <!--  <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        @keyup='isValidEmail(this.email)' -->
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model='email'>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model='description'></textarea>
                    </div>
                    <div class="mb-3">
                        <button type='submit' class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>