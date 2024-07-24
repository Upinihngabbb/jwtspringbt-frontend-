<template>
  <div class="container mx-auto">
    <app-navbar></app-navbar>

    <!-- Jam Card -->
    <div class="flex justify-center mt-5 mb-2">
      <div class="card clock-card bg-white text-black border-2 border-black">
        <div class="card-body">
          <div class="clock">{{ formattedTime }}</div>
          <div class="date">{{ formattedDate }}</div>
        </div>
      </div>
    </div>

    <!-- Tombol Barang Masuk dan Barang Keluar -->
    <div class="mt-4">
      <div class="flex items-center justify-center space-x-4">
        <router-link
          :to="{ name: 'ship.form', params: { tipe: 'IN' } }"
          class="hover-effect bg-white border-2 border-gray-500 text-gray-900 text-center px-14 py-6 rounded-md text-sm font-medium shadow-effect"
        >
          <img src="../assets/001.png" alt="h-14" />
          Barang Masuk
        </router-link>
        <router-link
          :to="{ name: 'ship.form', params: { tipe: 'OUT' } }"
          class="hover-effect bg-white border-2 border-gray-500 text-gray-900 text-center px-14 py-6 rounded-md text-sm font-medium shadow-effect"
        >
          <img src="../assets/002.png" alt="h-14" />
          Barang Keluar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const currentTime = ref("");
let timezoneOffset = 0; // Default to WIB
const selectedTimezone = ref(localStorage.getItem("simpanDilocal") || "WIB");

const updateTime = () => {
  const now = new Date();
  now.setHours(now.getHours() + timezoneOffset); // Adjust time according to selected timezone
  const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
  const amOrPm = now.getHours() >= 12 ? "PM" : "AM"; // Determine AM or PM
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes} ${amOrPm}`;
  currentTime.value = formattedTime;
};

const updateTimezone = () => {
  switch (selectedTimezone.value) {
    case "WIB":
      timezoneOffset = 0;
      break;
    case "WITA":
      timezoneOffset = 1;
      break;
    case "WIT":
      timezoneOffset = 2;
      break;
    default:
      timezoneOffset = 0;
  }
  updateTime(); // Update time when timezone changes
  localStorage.setItem("simpanDilocal", selectedTimezone.value);
};

const handleLocalStorageTimezone = () => {
  const timezoneOffset = localStorage.getItem("simpanDilocal");
  if (timezoneOffset) {
    selectedTimezone.value = timezoneOffset;
    updateTimezone(); // Update time with restored timezone
  }
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
  handleLocalStorageTimezone();
});

const formattedTime = computed(() => {
  return currentTime.value;
});

const formattedDate = computed(() => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return new Date().toLocaleDateString("en-US", options);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Digital+7&display=swap");

.card {
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.clock-card {
  width: 300px; /* Ukuran lebih panjang untuk card */
  height: 150px; /* Sesuaikan tinggi card */
  padding: 16px;
}

.clock {
  font-size: 48px; /* Ukuran font jam yang lebih besar */
  font-family: "Digital-7", sans-serif; /* Font digital */
  font-style: italic; /* Font miring */
}

.date {
  font-size: 16px; /* Ukuran font tanggal yang lebih kecil */
}

/* Styling untuk card lebih kecil */
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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
