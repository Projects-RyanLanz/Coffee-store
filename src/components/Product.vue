<template>

    <div class="bg-white px-6 max-w-sm min-h-48 max-h-48 rounded border border-black overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
        <div class=" py-4 ">
            <div class="font-bold text-xl mb-2">{{ product.name }}</div>
            <p class="text-gray-700 text-base">{{ truncatedDescription }}</p>
        </div>
        <div class=" pt-4 pb-2 ">
            <a href="#" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ir a algum lugar</a>
        </div>
    </div>


</template>

<script>
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
};
</script>