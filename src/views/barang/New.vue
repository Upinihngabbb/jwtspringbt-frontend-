<template>
  <div class="container mx-auto">
    <div class="mt-10">
      <form @submit.prevent="_submitNewBarang" class="max-w-sm mx-auto">
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default {
  name: "New",
  data() {
    return {
      form: {
        nama: "",
        category: "",
        berat: "", // Menggunakan string kosong sebagai nilai awal
        unit: "KG", // Default unit
      },
    };
  },
  methods: {
    ...mapActions("barang", ["storeNewbarang"]),
    async _submitNewBarang() {
      try {
        // Mengubah nilai berat ke tipe data Number sebelum dikirim ke backend
        this.form.berat = parseFloat(this.form.berat);

        await this.storeNewbarang(this.form);
        iziToast.success({
          title: "Success",
          message: "Barang berhasil ditambahkan!",
        });
        await this.$router.replace({ name: "barang.index" });
      } catch (e) {
        iziToast.error({
          title: "Error",
          message: e.message || "Gagal menambahkan barang.",
        });
        console.error(e);
      }
    },
  },
};
</script>

<style scoped></style>
