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
      />
      <div class="flex justify-center items-center "> <!-- ou use a altura desejada -->
        <button type="button" class="bg-blue-500 w-24 h-24 rounded border border-black overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 flex items-center justify-center">
          <img src="./assets/plus-symbol-button.svg" alt="" class="w-12 h-12 text-white">
        </button>

      </div>
    </div>
    <button id="openModal" class="px-4 py-2 text-white bg-blue-500 rounded">Abrir Modal</button>

<!-- Modal -->
<div id="modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
    <div class="bg-white rounded-lg p-6 w-4/5">
        <h2 class="text-xl font-bold mb-4">Título do Modal</h2>
        <p class="mb-4">Este é um exemplo de modal usando Tailwind CSS.</p>
        <div class="flex justify-end">
            <button id="closeModal" class="px-4 py-2 text-white bg-red-500 rounded">Fechar</button>
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

export default {
  components: {
    Product,
  },
  data() {
    return {
      products: [],
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
  },
};
</script>