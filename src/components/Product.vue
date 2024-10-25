






<template> 

    <div :id="`${product.id}`" class="bg-white px-6 max-w-sm min-h-48 max-h-48 rounded border border-black overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
        <div class=" py-4 ">
            <div class="grid grid-cols-8 font-bold text-xl mb-2">
                <div class="col-span-7">{{ product.name }}</div> 
                <button @click="deleteProduct(product.id)" class="col-span-1 text-white bg-red-700 border border-black rounded-md transition-transform duration-300 transform hover:scale-105">X</button> 
            </div>
            <p class="text-gray-700 text-base">{{ truncatedDescription }}</p>
        </div>
        <div class=" pt-4 pb-2 ">
            <a href="#" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ir a algum lugar</a>
        </div>
    </div>
 
</template>

<script>
import axios from 'axios';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    truncatedDescription() {
        const maxLength = 50; // Defina o tamanho máximo do texto
        return this.product.desc.length > maxLength
            ? this.product.desc.substring(0, maxLength) + '...'
            : this.product.desc;
        },
    },
    methods: {
        
        async deleteProduct(id){
            try {
                await axios.delete('http://localhost:3000/product/'+id);  
                this.$emit('product-deleted');
            } catch (error) {
                console.error('Erro ao deletar produto:', error);
            }
        }

    }
};
</script>