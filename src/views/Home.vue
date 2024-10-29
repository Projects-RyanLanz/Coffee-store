<script setup>
import Product from '../components/Product.vue';

import "../assets/output.css"

</script>

<template>
  <header>  
    <div class="mx-auto w-full px-4 py-3 flex justify-center items-center bg-black">
      <div class="text-white font-bold align-middle  text-[30px] tracking-widest">
        Coffee Store
      </div>
      <button @click="logoff" class="self-end ml-72 text-white bg-pink-700">Exit</button>
    </div>
  </header> 

  <body class="p-10 bg-gray-50">

    <div data-dial-init class="fixed bottom-6 end-6 group">
      <button id="openModal-order" type="button" data-dial-toggle="speed-dial-menu-bottom-left" aria-controls="speed-dial-menu-bottom-left" aria-expanded="false" class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
        <svg class="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
        </svg>
        <span class="sr-only">Open actions menu</span>
      </button>
    </div>

    <div class="grid grid-cols-4 gap-10">
      <Product 
        v-for="product in products" 
        :key="product.id"
        :product="product"
        @product-deleted="fetchProducts"
        :admin="admin"
      />
      <div class="flex justify-center items-center " v-if="admin"> <!-- ou use a altura desejada -->
        <button id="openModal" type="button" class="bg-blue-500 w-24 h-24 rounded border border-black overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 flex items-center justify-center">
          <img src="../assets/plus-symbol-button.svg" alt="" class="w-12 h-12 text-white">
        </button>

      </div>
    </div>
 
  <!--                                *****                                           -->
  <!--                                Modal                                           -->
  <!--                                *****                                           -->
  <div id="modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
    <div class="bg-white rounded-lg p-6 w-3/5 h-4/5 flex flex-col">
      <!-- Modal header -->
      <div class="flex items-center justify-between pb-4 md:pb-5 border-b rounded-t dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 ">
            Terms of Service
        </h3>
        <button id="xButton" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal Body d -->
      <div class="p-4 md:p-5 space-y-4"> 
        <form @submit.prevent="createProduct">
          <div class="grid gap-6 mb-6 grid-cols-6">
            <div class="col-span-5">
              <label for="productName" class="block mb-2 text-sm font-medium text-gray-900 ">Default input</label>
              <input required v-model="formData.name" maxlength="255" type="text" id="productName" class=" w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ">
              <span v-if="!formData.name">Por favor, insira um nome.</span>
            </div> 
            <div class="col-span-1"> 
              <label for="productPrice" class="block mb-2 text-sm font-medium text-gray-900 ">Default input</label>
              <input  v-model="formData.price" type="number" id="productPrice" class=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required>
            </div>
            <div class="col-span-6 h-48">  
              <label for="productDesc" class="block mb-2 text-sm font-medium text-gray-900">Your message</label>
              <textarea required v-model="formData.desc" id="productDesc" maxlength="255" class="h-full resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   " placeholder="Write your thoughts here..."></textarea>
            </div>
          </div>
          
          <!-- Modal Footer -->
          <div class="flex items-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button type="submit" id="closeModal" class="px-4 py-2 text-white bg-green-500 rounded">Criar</button>
          </div>
        </form>
      </div>
    </div>
  </div>


  <div id="order-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
            </div>
        </div>
    </div>
  </div>


  </body> 
</template>
 
<script>
import axios from 'axios';

//Rota GET lista de produtos
export default {
  components: {
    Product,
  },
  data() {
    return {
      privilege:localStorage.getItem('privilege'), 
      admin:false,
      products: [],
      formData:{
        name: '',
        desc: '',
        price: 0.0,
        availability: true,
      }
    };
  },
  created(){
    this.admin = this.privilege === 'ADMIN';
  },
  mounted() {
     
    // CHECKA SE É USER OU ADMIN
    if(this.privilege === 'ADMIN'){
      const modal = document.getElementById('modal');
      const openModalButton = document.getElementById('openModal');
      const closeModalButton = document.getElementById('closeModal');
      const xButton = document.getElementById('xButton');
  
      openModalButton.addEventListener('click', () => {
          modal.classList.remove('hidden');
      });
  
      closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
  
      xButton.addEventListener('click', () => {
        modal.classList.add('hidden');
      }); 
    }


    const modalOrder = document.getElementById('order-modal');
    const openModalOrder = document.getElementById('openModal-order');
    //const closeModalOrder = document.getElementById('closeModal-order');
    //const xButtonOrder = document.getElementById('xButton-order');

    openModalOrder.addEventListener('click', () => {
      modalOrder.classList.remove('hidden');
    });

    /*closeModalOrder.addEventListener('click', () => {
      modalOrder.classList.add('hidden');
    });

    xButtonOrder.addEventListener('click', () => {
      modalOrder.classList.add('hidden');
    }); */


    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.fetchProducts(); // Chama a função para fazer a requisição
    } else {
        // Redirecionar para a tela de login se não houver token
        this.$router.push('/login');
    } 
  },
  methods: {

    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/product');
        
        this.products = response.data;
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    },


    async createProduct() {
      try{
        const response = await axios.post("http://localhost:3000/product",this.formData)
        const att = await axios.get('http://localhost:3000/product');
        this.products = att.data;
        this.formData={
          name: '',
          desc: '',
          price: 0.0,
          availability: true,
        };
        console.log('Resposta:', response.data);
      }catch{
        console.error('Erro ao enviar dados:', error);
      }
       
    },

    async logoff(){
      localStorage.removeItem('token');
      this.$router.push('/login');
    } 
  },
};

 

</script>