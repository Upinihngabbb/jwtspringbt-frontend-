<template>
  <div class="container mx-auto">
    <app-navbar></app-navbar>
    <div class="mt-5">
      <div class="flex items-center justify-center space-x-4">
        <router-link
          :to="{ name: 'ship.form', params: { tipe: 'IN' } }"
          class="hover-effect bg-white border-2 border-gray-500 text-gray-900 text-center px-14 py-6 rounded-md text-sm font-medium mt-24 shadow-effect"
        >
          <img src="../assets/001.png" alt="h-14" />
          Barang Masuk
        </router-link>
        <router-link
          :to="{ name: 'ship.form', params: { tipe: 'OUT' } }"
          class="hover-effect bg-white border-2 border-gray-500 text-gray-900 text-center px-14 py-6 rounded-md text-sm font-medium mt-24 shadow-effect"
        >
          <img src="../assets/002.png" alt="h-14" />
          Barang Keluar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
.hover-effect {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.hover-effect:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.shadow-effect {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.242);
}
</style>
