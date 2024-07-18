<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-100 animated-bg"
  >
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-700">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label
              for="firstName"
              class="block text-sm font-medium text-gray-700"
              >First Name</label
            >
            <input
              type="text"
              v-model="firstName"
              id="firstName"
              required
              class="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-700"
              >Last Name</label
            >
            <input
              type="text"
              v-model="lastName"
              id="lastName"
              required
              class="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <!-- <div>
            <label for="role" class="block text-sm font-medium text-gray-700"
              >Role</label
            >
            <select
              v-model="role"
              id="role"
              required
              class="w-full px-10 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div> -->
        </div>
        <div class="mb-2">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            v-model="email"
            id="email"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            type="text"
            v-model="username"
            id="username"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            id="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Register
        </button>
        <div class="text-center mt-4">
          <span class="text-sm text-gray-700">Already have an account?</span>
          <router-link to="/" class="text-sm text-blue-500 hover:underline"
            >Login</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      // role: "USER", // Default role set to USER
      email: "",
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async handleRegister() {
      try {
        await this.register({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
          // role: this.role,
          email: this.email,
        });
        iziToast.success({
          title: "Success",
          message: "User berhasil diregistrasi!",
        });
        this.$router.push({ name: "login" });
      } catch (e) {
        iziToast.error({
          title: "Error",
          message: e.message || "Gagal melakukan registrasi.",
        });
      }
    },
  },
};
</script>

<style>
.animated-bg {
  background: linear-gradient(270deg, #001f3f, #7df9ff);
  background-size: 600% 600%;
  animation: gradientAnimation 10s ease infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
