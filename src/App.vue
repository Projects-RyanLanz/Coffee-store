<script setup>
import { RouterLink, RouterView } from 'vue-router' 
import Product from './components/Product.vue';

import "./assets/output.css"

</script>

<template>
  <header>  
    <div class="mx-auto w-full px-4 py-3 flex justify-center   items-center bg-black">
      <div class="text-white font-bold align-middle  text-[30px] tracking-widest">
        Coffee Store 
      </div>
    </div>
  </header> 

  <body class="p-10 bg-gray-50">
    <div class="grid grid-cols-4 gap-10">
      <Product 
        v-for="product in products" 
        :key="product.id"
        :product="product"
         @product-deleted="fetchProducts"
      />
      <div class="flex justify-center items-center "> <!-- ou use a altura desejada -->
        <button id="openModal" type="button" class="bg-blue-500 w-24 h-24 rounded border border-black overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 flex items-center justify-center">
          <img src="./assets/plus-symbol-button.svg" alt="" class="w-12 h-12 text-white">
        </button>

      </div>
    </div>
 
  <!-- Modal -->
  <div id="modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div class="bg-white rounded-lg p-6 w-3/5 h-4/5 flex flex-col">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 md:pb-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 ">
                  Terms of Service
              </h3>
              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
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
                  <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 ">Default input</label>
                  <input required v-model="formData.name" maxlength="255" type="text" id="default-input" class=" w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ">
                  <span v-if="!formData.name">Por favor, insira um nome.</span>
                </div> 
                <div class="col-span-1"> 
                  <label for="price" class="block mb-2 text-sm font-medium text-gray-900 ">Default input</label>
                  <input  v-model="formData.price" type="number" id="price" class=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required>
                </div>
                <div class="col-span-6 h-48">  
                  <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                  <textarea required v-model="formData.desc" id="message" maxlength="255" class="h-full resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   " placeholder="Write your thoughts here..."></textarea>
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

  </body> 
</template>
 
<script>
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('openModal');
    const closeModalButton = document.getElementById('closeModal');

    openModalButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeModalButton.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
});

//Rota GET lista de produtos
export default {
  components: {
    Product,
  },
  data() {
    return {
      products: [],
      formData:{
        name: '',
        desc: '',
        price: 0.0,
        availability: true,
      }
    };
  },
  mounted() {
    this.fetchProducts(); 
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
        console.log('Resposta:', response.data);
      }catch{
        console.error('Erro ao enviar dados:', error);
      }
    } 
  },
};

 

</script>