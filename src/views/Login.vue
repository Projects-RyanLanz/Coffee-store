<template> 

<div class="h-screen w-screen flex align-middle justify-center bg-slate-900">
    <form class="w-1/2 self-center m-auto" @submit.prevent="handleLogin"> 
        <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email:
            </label>
            <input type="email" v-model="user.email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password:
            </label>
            <input type="password" v-model="user.password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <p v-if="showModalError" class="text-red-500 py-2">User not found!!</p>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Login
        </button>
    </form>  
</div>


</template>

<script>
import axios from 'axios';

export default { 
    data() {
        return {
            showModalError: false,
            user: {
                email: '',
                password: '' 
            }
        }
    },
    mounted(){
        
        this.isAuthenticated()
    },
    methods: {
        async handleLogin() {
            try {
                await axios.post('http://localhost:3000/user/login', this.user)
                    .then(res => {
                        const token = res.data.token;
                        const privilege = res.data.user.privilege;
                        localStorage.setItem('token', token);
                        localStorage.setItem('privilege', privilege);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        if (res.status === 200) {
                            // Redirecionar para outra página após login
                            this.$router.push({ name: 'Home' }); 
                        }
                    })
                    .catch(error => {
                        this.showModalError = true;
                        console.error('Erro na requisição:', error);
                        if (error.response) {
                            // O servidor respondeu com um código de status fora do intervalo 2xx
                            console.log('Dados:', error.response.data);
                        } else if (error.request) {
                            // A requisição foi feita, mas não houve resposta
                            console.log('Sem resposta do servidor:', error.request);
                        } else {
                            // Algo aconteceu ao configurar a requisição
                            console.log('Erro:', error.message);
                        }
                    })
                  
            } catch (error) {
                this.errorMessage = 'Credenciais inválidas. Tente novamente.';
            }
        },
        closeModal() {
            this.showModalError = false;
        },isAuthenticated() {
            const token = localStorage.getItem('token');
            // Você pode adicionar mais lógica para verificar a validade do token, se necessário
            return console.log(token); // Retorna true se o token existir
        }
    }
}
</script>