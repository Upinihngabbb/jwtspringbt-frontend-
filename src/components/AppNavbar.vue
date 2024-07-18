<template>
  <nav class="bg-white border-2">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link
                :to="{ name: 'home' }"
                class="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Dashboard</router-link
              >
              <router-link
                :to="{ name: 'barang.index' }"
                class="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Barang</router-link
              >
              <router-link
                :to="{ name: 'pengirim.index' }"
                class="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Pengirim</router-link
              >
            </div>
          </div>
        </div>
        <div class="flex items-center relative">
          <div class="relative inline-block text-left">
            <button
              @click="toggleDropdown"
              class="flex items-center space-x-1 text-gray-500 text-sm font-medium focus:outline-none"
              id="dropdownMenuButton2"
            >
              <div class="flex flex-col">
                <span>Administrator</span>
                <span>Gudang</span>
              </div>
              <svg
                class="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M6 8l4 4 4-4z" />
              </svg>
            </button>
            <div
              v-if="dropdownOpen"
              @click.away="closeDropdown"
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdownMenuButton2"
            >
              <div class="py-1" role="none">
                <button
                  @click="logout"
                  class="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                  role="menuitem"
                >
                  Logout
                </button>
                <button
                  @click="users"
                  class="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                  role="menuitem"
                >
                  Userlist
                </button>
              </div>
            </div>
          </div>
          <div class="border-l-2 border-gray-400 h-11 mx-4"></div>
          <div class="relative group">
            <svg
              class="w-7 h-7 fill-current text-gray-500 group-hover:text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
            <div
              v-if="currentUserName"
              class="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-max max-w-xs text-center p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {{ currentUserName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dropdownOpen: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    currentUserName() {
      return this.currentUser ? this.currentUser.username : "User"; // Mengambil nama pengguna dari state auth
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    users() {
      this.$router.push({ name: "UserList" });
    },
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Tooltip styling */
.group:hover .group-hover\\:opacity-100 {
  opacity: 1;
}
</style>
