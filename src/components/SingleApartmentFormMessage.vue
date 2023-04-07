<script>
import { store } from '../store';
import { reactive } from 'vue';
import  useVuelidate  from '@vuelidate/core';
import { required, email, maxLength, helpers } from '@vuelidate/validators';
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
            name: {
                required: helpers.withMessage('Il nome è un campo obbligatiorio', required), 
                maxLength: helpers.withMessage(({ $params }) => `Il nome non può superare i ${$params.max} caratteri`, maxLength(30))
            },
            surname: {
                maxLength: helpers.withMessage(({ $params }) => `Il cognome non può superare i ${$params.max} caratteri`, maxLength(30))
            },
            email: {
                required: helpers.withMessage('La email è un campo obbligatiorio', required),
                email: helpers.withMessage(`L'email inserita non è valida`, email)
                },
            description: {
                required: helpers.withMessage('Il testo del messaggio non può essere vuoto', required)
            },
        }

        const v$ = useVuelidate(rules, formData)

        return { formData, v$ }
    },
    data(){
        return{
            store,
            formSent: false
        }
    },
    methods: {
        cleanErr(){
            this.v$.$reset()
        },
        formSentReset(){
            this.formSent = false;    
        },
        async sendMessage(formData) {
            let results =  await this.v$.$validate();
            if (results){
                axios.post(`${store.baseUrl}/api/messages`, {
                    apartment_id: this.apartment_id/* .toString() */,
                    name: formData.name,
                    surname: formData.surname,
                    email: formData.email,
                    description: formData.description
                }).then((response) => {
                    console.log(response);
                    if (response.data.success) {
                        this.formSent = true;
                        this.formData.name = '';
                        this.formData.surname = '';
                        this.formData.email = '';
                        this.formData.description = '';
                        this.v$.$reset()
                        setTimeout(this.formSentReset, 6000);
                    }
                });

            }

        },
        log(e){
            console.log(e)
        },
    },
    created(){
        this.v$.$reset()
    }
}
</script>
<template lang="">
    <div class='container'>
        <div class="row">
            <div class="col button_contact_container">
                <h2>
                    <button class="btn my_btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Contatta il proprietario</button>
                </h2>
            </div>
        </div>
        <div class="offcanvas offcanvas-bottom my_canvas" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
            <div class="row justify-content-center">
                <div class="col p-4">
                    <div class='pb-5 d-flex justify-content-center'>
                        <button type="button" class="btn btn-outline-secondary w-100" data-bs-dismiss="offcanvas">Chiudi</button>
                    </div>
                    <form ref='form' id="form" @submit.prevent='sendMessage(this.formData)' novalidate>
                        <div class="mb-3">
                            <input ref='name' id='name' type="text" class="form-control" placeholder="Nome" aria-label="name" aria-describedby="addon-wrapping" v-model='formData.name' @keydown='cleanErr'  @blur='v$.name.$touch()'>
                            <div v-for='error in v$.name.$errors' :key='error.$uid'>
                                <div class="error alert alert-danger mt-2">{{error.$message}}</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <input ref='surname' id='surname' type="text" class="form-control" placeholder="Cognome" aria-label="Surname" aria-describedby="addon-wrapping" v-model='formData.surname' @keydown='cleanErr' @blur='v$.surname.$touch()'>
                            <div v-for='error in v$.surname.$errors' :key='error.$uid'>
                                <div class="error alert alert-danger mt-2">{{error.$message}}</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <input ref='email' id='email' type="email" class="form-control" placeholder="@mail" v-model='formData.email' @keydown='cleanErr' @blur='v$.email.$touch()'>
                            <div v-for='error in v$.email.$errors' :key='error.$uid'>
                                <div class="error alert alert-danger mt-2">{{error.$message}}</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <textarea placeholder="Scrivi un messaggio" ref='description' id='description' class="form-control" rows="3" v-model='formData.description' @keydown='cleanErr' @blur='v$.description.$touch()'></textarea>
                            <div v-for='error in v$.description.$errors' :key='error.$uid'>
                                <div class="error alert alert-danger mt-2">{{error.$message}}</div>
                            </div>
                        </div>
                        <!-- button -->
                        <div class="mb-3 d-flex justify-content-end">
                            <button type='submit' class="btn my_btn"  >Invia</button>
                        </div>
                    </form>
                    <div v-if='formSent'>
                        <div class='message_success bg-gradient text-center'>
                            <h3>Messaggio inviato con successo!</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>


    .button_contact_container{
        display: flex;
        justify-content: center;
    }



    .my_btn{
        background-color: #02CCBC;
        color:white;
        font-weight: bold;
        font-size: 24px;
        &:hover{
            color: #02CCBC;
            background-color: white;
            border: 1px #02CCBC solid;
        }
    }

    .my_canvas{
        height: 80vh;
    }
    .message_success{
        padding: 1rem;
        width: 80vw;
        border-radius: 10px;
        margin: 0 auto;
        color: white;
        background-color:#02CCBC;
        animation: success_message 3s;
        animation-delay: 2s;
    }

    @keyframes success_message {
        from {filter: opacity(1);}
        to {filter: opacity(0);}
    }

    @media (min-width: 500px){
        .button_contact_container{
            justify-content: start;
        } 
    }


</style>