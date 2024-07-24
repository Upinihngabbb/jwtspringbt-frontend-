<template>
  <div id="app" class="flex flex-col min-h-screen">
    <AppNavbar v-if="!isExemptedPage" />
    <div class="flex-grow">
      <router-view />
    </div>
    <!-- <Copyright v-if="!isExemptedPage" /> -->
  </div>
</template>

<script setup>
import AppNavbar from "./components/AppNavbar.vue";
import Copyright from "./components/Copyright.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const exemptedPages = ["/", "/register"];

const isExemptedPage = computed(() => {
  return exemptedPages.includes(router.currentRoute.value.path);
});
</script>

<style>
/* Add your styles here */
</style>
