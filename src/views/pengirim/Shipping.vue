<template>
  <div class="container mx-auto">
    <div class="mt-10">
      <div class="max-w-3xl mx-auto">
        <!-- iziToast container untuk notifikasi -->
        <div id="toast-container" class="iziToast-container"></div>

        <div class="flex flex-col">
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
                        Detail
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Barang
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tanggal
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(shipping, index) in shippings" :key="index">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                          {{ shipping.stok }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ shipping.tipe }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                          {{ shipping.barang }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                          {{ shipping.tanggal }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default {
  name: "Shipping",
  computed: {
    ...mapState("pengirim", ["shippings"]),
  },
  methods: {
    ...mapActions("pengirim", ["getShippingShipper"]),
    async _getShippingShipper() {
      try {
        await this.getShippingShipper(this.$route.params.id);
      } catch (e) {
        alert(e.message);
      }
    },
    showNotification() {
      iziToast.info({
        title: "info",
        message: "List barang yang diambil shipper!",
      });
    },
  },
  created() {
    this._getShippingShipper();
    this.showNotification(); // Menampilkan notifikasi saat komponen dibuat
  },
};
</script>

<style scoped></style>
