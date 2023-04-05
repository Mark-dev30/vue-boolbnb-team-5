<script>
import { store } from '../store';
import { reactive } from 'vue';
import  useVuelidate  from '@vuelidate/core';
import { required, email, maxLength } from '@vuelidate/validators';
import axios from 'axios';
export default {
    name: 'SingleApartmentFormMessage',
    props:{
        apartment_id: Number
    },
    setup() {
        const formData = reactive({
            name: '',
            surname: '',
            email: '',
            description: '',
        })
        const rules = {
            name: {maxLength: maxLength(30)},
            surname: {maxLength: maxLength(30)},
            email: {required, email},
            description: {required},
        }

        const v$ = useVuelidate(rules, formData)

        return { formData, v$ }
    },
    data(){
        return{
            store,
        }
    },
    methods: {
        async sendMessage(formData) {
            const result = await this.v$.$validate() 
            if(!result){
                alert('La form deve essere prima compilata')
                this.v$.$reset()
            }
            axios.post(`${store.baseUrl}/api/messages`, {
                apartment_id: this.apartment_id/* .toString() */,
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                description: formData.description
            }).then((response) => {
                console.log(response);
                if (response.data.success) {
                    alert(response.data.message);
                    this.formData.name = '';
                    this.formData.surname = '';
                    this.formData.email = '';
                    this.formData.description = '';
                    this.v$.$reset()
                }
            });
        },
        log(e){
            console.log(e)
        },
    },
    created(){

    }
}
</script>
<template lang="">
    <div class='container'>
        <div class="row justify-content-center">
            <div class="col-8">
                <form ref='form' id="form" @submit.prevent='sendMessage(this.formData)'>
                    <div class="mb-3">
                        <input ref='name' id='name' type="text" class="form-control" placeholder="name" aria-label="name" aria-describedby="addon-wrapping" v-model='formData.name' @blur='v$.name.$touch()'>
                        <div v-for='error in v$.name.$errors' :key='error.$uid'>
                            <div class="error alert alert-danger mt-2">{{error.$message}}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <input ref='surname' id='surname' type="text" class="form-control" placeholder="Surname" aria-label="Surname" aria-describedby="addon-wrapping" v-model='formData.surname' @blur='v$.surname.$touch()'>
                        <div v-for='error in v$.surname.$errors' :key='error.$uid'>
                            <div class="error alert alert-danger mt-2">{{error.$message}}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                       <!--  <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        @keyup='isValidEmail(this.email)' -->
                        <input ref='email' id='email' type="email" class="form-control" placeholder="name@example.com" v-model='formData.email' @blur='v$.email.$touch()'>
                        <div v-for='error in v$.email.$errors' :key='error.$uid'>
                            <div class="error alert alert-danger mt-2">{{error.$message}}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                        <textarea ref='description' id='description' class="form-control" rows="3" v-model='formData.description' @blur='v$.description.$touch()'></textarea>
                        <div v-for='error in v$.description.$errors' :key='error.$uid'>
                            <div class="error alert alert-danger mt-2">{{error.$message}}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <button type='submit' class="btn btn-primary" @click=''>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>