<template>
  <div class="container mx-auto">
    <div class="mt-10">
      <div class="max-w-5xl mx-auto">
        <!-- Bagian Header -->
        <div class="flex justify-between items-center mb-5">
          <!-- Teks USER LIST -->
          <div class="flex items-center">
            <span
              class="text-gray-500 text-xl font-bold italic ml-5"
              style="font-family: 'Poppins', sans-serif"
            >
              USER LIST
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
            <a
              href="register"
              class="shadow bg-blue-700 border block border-gray-300 text-white py-2 px-3 rounded-md text-sm font-medium"
            >
              Add
            </a>
          </div>
        </div>

        <!-- Tabel Data Pengguna -->
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
                      ID
                    </th>
                    <th
                      scope="col"
                      class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      class="px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <!-- <th
                      scope="col"
                      class="px-14 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th> -->
                    <th
                      scope="col"
                      class="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      class="relative px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody
                  class="bg-white divide-y divide-gray-200 max-h-96 overflow-y-auto"
                >
                  <tr v-for="user in filteredUsers" :key="user.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ user.id }}</div>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ user.username }}
                      </div>
                    </td>
                    <td class="px-1 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ user.email }}</div>
                    </td>
                    <!-- <td class="px-14 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ user.role }}</div>
                    </td> -->
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ user.createdAt }}
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"
                    >
                      <a
                        href="#"
                        @click.prevent="editUser(user)"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                      |
                      <a
                        href="#"
                        @click.prevent="confirmDeleteUser(user.id)"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Modal Konfirmasi Delete -->
        <transition name="modal-fade">
          <div
            v-if="showModal"
            class="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
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
                      Hapus Pengguna
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Apakah Anda yakin ingin menghapus pengguna ini? Tindakan
                        ini tidak dapat diurungkan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  @click="deleteConfirmed"
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition-all ease-in-out duration-300"
                >
                  Hapus
                </button>
                <button
                  @click="cancelDelete"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-all ease-in-out duration-300"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import iziToast from "izitoast";
const router = useRouter();
const store = useStore();
const users = computed(() => store.state.user.users);
const searchQuery = ref("");
const showModal = ref(false);
let userIdToDelete = null;

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  return users.value.filter((user) => {
    const query = searchQuery.value.toLowerCase();
    return (
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      // user.role.toLowerCase().includes(query) ||
      user.createdAt.toLowerCase().includes(query)
    );
  });
});
const editUser = (user) => {
  store.commit("user/_assign_user_form", user);
  router.push({ name: "user.update" });
};

const deleteConfirmed = async () => {
  try {
    if (userIdToDelete) {
      await store.dispatch("user/deleteUser", userIdToDelete);
      userIdToDelete = null;
      showModal.value = false;
      // Refresh data setelah menghapus pengguna
      await fetchUsers();
      iziToast.success({
        title: "Success",
        message: "Barang berhasil dihapus!",
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const cancelDelete = () => {
  showModal.value = false;
  userIdToDelete = null;
};

const confirmDeleteUser = (userId) => {
  userIdToDelete = userId;
  showModal.value = true;
};

const fetchUsers = async () => {
  try {
    await store.dispatch("user/getAllUsers");
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.button {
  width: 90px;
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

.modal-overlay {
  z-index: -1;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-container {
  max-height: 80vh;
}

.modal-close {
  transition: all 0.3s;
}

.modal-button-deactivate {
  background-color: #e53e3e;
  color: white;
}

.modal-button-deactivate:hover {
  background-color: #c53030;
}

.modal-button-cancel {
  background-color: #ffffff;
  color: #4a5568;
}

.modal-button-cancel:hover {
  background-color: #edf2f7;
}
</style>
