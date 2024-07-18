<template>
  <div class="container mx-auto">
    <div class="mt-10">
      <form @submit.prevent="_submitUpdateBarang" class="max-w-sm mx-auto">
        <!-- Nama barang -->
        <div class="mb-2">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nama barang</label
          >
          <input
            v-model="form.nama"
            type="text"
            name="name"
            id="name"
            class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
            placeholder="Nama barang"
            required
          />
        </div>

        <!-- Kategori -->
        <div class="mb-2">
          <label for="kategori" class="block text-sm font-medium text-gray-700"
            >Kategori</label
          >
          <input
            v-model="form.category"
            type="text"
            name="category"
            id="kategori"
            class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
            placeholder="Kategori"
            required
          />
        </div>

        <!-- Berat -->
        <div class="mb-2">
          <label for="berat" class="block text-sm font-medium text-gray-700"
            >Berat</label
          >
          <input
            v-model="form.berat"
            type="text"
            name="berat"
            id="berat"
            class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
            placeholder="Berat"
            required
            pattern="[0-9]*\.?[0-9]+"
          />
        </div>

        <!-- Satuan Berat -->
        <div class="mb-2">
          <label for="unit" class="block text-sm font-medium text-gray-700"
            >Satuan Berat</label
          >
          <select
            v-model="form.unit"
            id="unit"
            class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
            required
          >
            <option value="KG">KG</option>
            <option value="G">G</option>
          </select>
        </div>

        <!-- Tombol Simpan -->
        <div class="mt-2">
          <button
            type="submit"
            class="bg-gray-800 text-white block w-full py-2 rounded-md"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>

    <!-- Modal for confirmation -->
    <transition name="modal-fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-10 flex items-center justify-center"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="closeModal"
        ></div>

        <div
          class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.75v7.5m0 0L8.25 9m3.75 3.25L15.75 9M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Konfirmasi Pembaruan
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Apakah Anda ingin menyimpan perubahan ini?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              @click="confirmUpdate"
            >
              Simpan
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              @click="closeModal"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import iziToast from "izitoast";
const store = useStore();
const router = useRouter();
const isModalOpen = ref(false);
const form = store.state.barang.barang;

const _submitUpdateBarang = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const confirmUpdate = async () => {
  try {
    await store.dispatch("barang/updateBarang", form);
    await router.replace({ name: "barang.index" });
    iziToast.success({
      title: "Success",
      message: "Perubahan disimpan!",
    });
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: "Error",
      message: "Gagal melakukan perubahan .",
    });
  }
  closeModal();
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
