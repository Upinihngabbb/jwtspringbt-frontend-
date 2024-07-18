<template>
  <div class="container mx-auto">
    <div class="mt-10">
      <div class="max-w-5xl mx-auto">
        <div class="flex justify-between items-center mb-5">
          <!-- Teks SIMPLE WAREHOUSE -->
          <div class="flex items-center">
            <span
              class="text-gray-500 text-xl font-bold italic ml-5"
              style="font-family: 'Poppins', sans-serif"
            >
              SIMPLE WAREHOUSE
            </span>
          </div>

          <!-- Kolom Search dan Tombol Add Item -->
          <div class="flex items-center">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="shadow border block border-gray-300 py-2 px-1 rounded-md text-sm font-medium mr-2"
            />
            <router-link
              :to="{ name: 'pengirim.new' }"
              class="shadow bg-blue-700 border block border-gray-300 text-white py-2 px-3 rounded-md text-sm font-medium"
            >
              Add
            </router-link>
          </div>
        </div>

        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      class="relative px-16 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white divide-y divide-gray-200 max-h-96 overflow-y-auto"
                >
                  <tr v-for="(shipper, index) in shippers" :key="shipper.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ shipper.nama }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ shipper.codeShipper }}
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <a
                        href="#"
                        @click.prevent="showPengirimanShipper(shipper.id)"
                        class="text-indigo-600 hover:text-indigo-900"
                        >Pengiriman</a
                      >
                      |
                      <a
                        href="#"
                        @click.prevent="editShipper(index)"
                        class="text-indigo-600 hover:text-indigo-900"
                        >Edit</a
                      >
                      |
                      <a
                        href="#"
                        @click.prevent="confirmDeleteShipper(shipper.id)"
                        class="text-indigo-600 hover:text-indigo-900"
                        >Hapus</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi Penghapusan -->
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
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Hapus Pengirim
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Apakah Anda yakin ingin menghapus pengirim ini? Tindakan ini
                    tidak dapat dibatalkan.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              @click="deleteShipper"
            >
              Hapus
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import iziToast from "izitoast";
const store = useStore();
const router = useRouter();

const shippers = ref([]);
const isModalOpen = ref(false);
const shipperIdToDelete = ref(null);

const getAllShipper = async () => {
  try {
    await store.dispatch("pengirim/getAllShipper");
    shippers.value = store.state.pengirim.shippers;
  } catch (e) {
    alert(e.message);
  }
};

const editShipper = (index) => {
  store.state.pengirim.shipper = shippers.value[index];
  router.push({ name: "pengirim.update" });
};

const showPengirimanShipper = (id) => {
  router.push({ name: "pengirim.shipping", params: { id: id } });
};

const confirmDeleteShipper = (id) => {
  shipperIdToDelete.value = id;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const deleteShipper = async () => {
  try {
    await store.dispatch("pengirim/deleteShipper", shipperIdToDelete.value);
    getAllShipper();
    closeModal();
    iziToast.success({
      title: "Success",
      message: "Pengirim berhasil dihapus!",
    });
  } catch (e) {
    console.error(e);
    iziToast.error({
      title: "Error",
      message: "Gagal menghapus pengirim.",
    });
  }
};

onMounted(getAllShipper);
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

tbody.max-h-96 {
  display: block;
  max-height: 384px; /* Adjust this value as needed */
  overflow-y: auto;
}

table {
  display: block;
}

thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
.action {
  margin-right: 20px;
}
</style>
