<template>
  <div class="container mx-auto">
    <div class="mt-10">
      <form @submit.prevent="_sendStock" class="max-w-sm mx-auto">
        <div class="mb-2">
          <label for="barang" class="block text-sm font-medium text-gray-700"
            >Barang</label
          >
          <select
            v-model="form.barangId"
            id="barang"
            name="barang"
            autocomplete="country-name"
            class="mt-1 block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option
              v-for="(barang, index) in barangs"
              :key="barang.id"
              :value="barang.id"
            >
              {{ barang.nama }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label for="shipper" class="block text-sm font-medium text-gray-700"
            >Pengirim</label
          >
          <select
            v-model="form.shipperId"
            id="shipper"
            name="shipper"
            autocomplete="country-name"
            class="mt-1 block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option
              v-for="(shipper, index) in shippers"
              :key="shipper.id"
              :value="shipper.id"
            >
              {{ shipper.codeShipper + "-" + shipper.nama }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label for="jumlah" class="block text-sm font-medium text-gray-700"
            >Jumlah</label
          >
          <input
            v-model="form.stock"
            type="number"
            name="jumlah"
            id="jumlah"
            class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
            placeholder="Jumlah"
          />
        </div>
        <div class="mt-2">
          <button class="bg-gray-800 text-white block w-full py-2 rounded-md">
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default {
  name: "FormShip",
  data() {
    return {
      form: {
        tipe: "IN",
        shipperId: "",
        barangId: "",
        stock: 0,
      },
    };
  },
  computed: {
    ...mapState("barang", ["barangs"]),
    ...mapState("pengirim", ["shippers"]),
  },
  methods: {
    ...mapActions("barang", ["getAllBarang"]),
    ...mapActions("pengirim", ["getAllShipper"]),
    ...mapActions("stock", ["sendStock"]),
    async _sendStock() {
      try {
        await this.sendStock(this.form);

        if (this.form.tipe === "IN") {
          iziToast.success({
            title: "Success",
            message: "Stock masuk berhasil!",
          });
        } else if (this.form.tipe === "OUT") {
          iziToast.success({
            title: "Success",
            message: "Barang di gudang diambil!",
          });
        }

        this.$router.replace({ name: "home" });
      } catch (e) {
        iziToast.error({
          title: "Error",
          message: e.message || "Gagal mengirim stock.",
        });
        console.error(e);
      }
    },
  },
  created() {
    this.form.tipe = this.$route.params.tipe;
    this.getAllBarang();
    this.getAllShipper();
  },
};
</script>

<style scoped></style>
