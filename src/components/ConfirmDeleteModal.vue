<template>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    aria-hidden="true"
  >
    <div
      class="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
    >
      <div class="relative bg-white rounded-lg max-w-lg w-full mx-4 p-6">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-gray-900" id="modal-headline">
              Confirm Delete
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">{{ message }}</p>
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <button
            @click="confirmDelete"
            type="button"
            class="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
          <button
            @click="closeModal"
            type="button"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const message = ref("");

function openModal(msg) {
  isOpen.value = true;
  message.value = msg;
}

function closeModal() {
  isOpen.value = false;
}

function confirmDelete() {
  // Emit event to parent component to handle delete operation
  closeModal();
  $emit("confirm");
}
</script>
