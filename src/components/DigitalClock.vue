<template>
  <div class="relative h-screen flex items-center justify-center">
    <!-- Button -->
    <button
      type="button"
      class="absolute top-8 left-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="openModal"
    >
      Select Timezone
    </button>

    <!-- Card -->
    <div class="card clock-card bg-white text-black border-4 border-black">
      <div class="card-body">
        <div class="clock">{{ formattedTime }}</div>
        <div class="date">{{ formattedDate }}</div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal-fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75"
        aria-labelledby="timezoneModalLabel"
        aria-hidden="true"
      >
        <div
          class="flex items-center justify-center min-h-screen px-4 py-6 text-center sm:block sm:p-0"
          @click="closeModal"
        >
          <div
            class="fixed inset-0 bg-gray-500 opacity-75 transition-opacity"
            @click="closeModal"
          ></div>
          <div
            class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            @click.stop
          >
            <!-- Close Button -->
            <button
              type="button"
              class="absolute top-2 right-2 text-black font-bold py-1 px-2 rounded"
              @click="closeModal"
            >
              &times;
            </button>
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <!-- Full Width Border -->
                  <div class="relative">
                    <h3
                      class="text-lg font-medium text-gray-900 mb-2"
                      id="timezoneModalLabel"
                    >
                      Select Timezone
                    </h3>
                    <div
                      class="absolute left-0 bottom-0 w-full border-b border-gray-300"
                    ></div>
                  </div>
                  <div class="mt-2 px-4 py-2">
                    <select
                      v-model="selectedTimezone"
                      @change="updateTimezone"
                      class="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      style="height: 40px"
                    >
                      <option value="WIB">WIB (Western Indonesian Time)</option>
                      <option value="WITA">
                        WITA (Central Indonesian Time)
                      </option>
                      <option value="WIT">WIT (Eastern Indonesian Time)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="border-t border-gray-300 bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                @click="closeModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const currentTime = ref("");
let timezoneOffset = 0; // Default to WIB
const selectedTimezone = ref(localStorage.getItem("simpanDilocal") || "WIB");
const isModalOpen = ref(false);

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
  let previousTimezone = timezoneOffset; // Save previous timezone offset
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

  if (previousTimezone !== timezoneOffset) {
    iziToast.success({
      title: "Success",
      message: `You have selected ${selectedTimezone.value} timezone.`,
      position: "topRight",
      timeout: 1500,
    });
  }
};

const handleLocalStorageTimezone = () => {
  const timezoneOffset = localStorage.getItem("simpanDilocal");
  if (timezoneOffset) {
    selectedTimezone.value = timezoneOffset;
    updateTimezone(); // Update time with restored timezone
  }
  console.log("invoke local storage handler");
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

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Digital+7&display=swap");

.clock-card {
  width: 400px; /* Perbesar lebar kartu */
  height: 290px;
  text-align: center;
  padding: 5px;
  border-radius: 10px;
  position: relative;
  top: 0px; /* Sedikit ke atas dari tengah layar */
}

.clock {
  margin-top: 70px;
  font-size: 60px; /* Perbesar ukuran font jam */
  font-weight: bold;
  font-style: italic;
  font-family: "Digital-7", sans-serif; /* Gunakan font digital */
}

.date {
  font-size: 18px; /* Perbesar ukuran font tanggal */
  font-weight: bold;
  margin-top: 20px;
}

/* Tailwind modal transition styles */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
