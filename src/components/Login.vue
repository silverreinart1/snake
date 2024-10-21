<template>
    <div class="flex h-screen justify-center items-center">
      <div class="w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-6">Login</h2>
        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input v-model="username" type="text" class="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="password" type="password" class="mt-1 p-2 w-full border rounded-md" />
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      handleLogin() {
        if (this.username === 'user' && this.password === 'password') {
          this.$router.push('/game');
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
    },
  };
  </script>
  