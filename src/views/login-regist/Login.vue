<template>
  <div class="relative min-h-screen">
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
    >
      <div class="text-6xl font-bold italic text-gray-300" v-show="!showForm">
        SIMPLE WAREHOUSE
      </div>
    </div>
    <div
      class="flex items-center justify-center min-h-screen animated-bg"
      @click="showLoginForm"
    >
      <div
        v-if="showForm"
        class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md"
      >
        <h2 class="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <input
              type="text"
              v-model="username"
              id="username"
              @input="resetTimeout"
              required
              class="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              v-model="password"
              id="password"
              @input="resetTimeout"
              required
              class="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div class="flex justify-between items-center mb-4">
            <label class="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                v-model="rememberMe"
                @input="resetTimeout"
                class="mr-2 rounded border-gray-300 text-blue-500 focus:ring-blue-200"
              />
              Remember me
            </label>
            <router-link
              to="/forgot-password"
              class="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </router-link>
          </div>
          <button
            type="submit"
            class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Login
          </button>
        </form>
        <div class="text-left mt-4">
          <span class="text-sm text-gray-700">Don't have an account?</span>
          <router-link
            to="/register"
            class="text-sm text-blue-500 hover:underline"
          >
            Signup
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      showForm: false,
      timeoutId: null,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleLogin() {
      if (!this.username || !this.password) {
        alert("Please enter username and password.");
        return;
      }

      try {
        await this.login({ username: this.username, password: this.password });
        if (this.rememberMe) {
          localStorage.setItem("rememberedUsername", this.username);
        } else {
          localStorage.removeItem("rememberedUsername");
        }
        this.$router.push({ name: "home" });
      } catch (error) {
        alert(error.message || "Login failed. Please try again.");
      }
    },
    showLoginForm() {
      this.showForm = true;
      this.resetTimeout();
    },
    hideLoginForm() {
      this.showForm = false;
    },
    resetTimeout() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(this.hideLoginForm, 30000); // Hide after 30 seconds of inactivity
    },
  },
  created() {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    if (rememberedUsername) {
      this.username = rememberedUsername;
      this.rememberMe = true;
    }
  },
  watch: {
    username() {
      this.resetTimeout();
    },
    password() {
      this.resetTimeout();
    },
  },
  beforeDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
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
