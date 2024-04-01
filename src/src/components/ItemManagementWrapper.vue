<!-- App.vue -->
<template>
  <v-app>
    <v-container>
      <h1>Store Management</h1>
      <v-btn @click="showForm()" color="error">Add Item</v-btn>
      <v-container v-if="isForm">
        <form @submit.prevent="submit">
          <v-text-field v-model="name" label="Name"></v-text-field>
          <v-text-field v-model="description" label="Description"></v-text-field>
          <v-text-field v-model="price" label="Price"></v-text-field>
          <v-text-field v-model="category" label="Category"></v-text-field>
          <v-btn class="me-4" type="submit">Submit</v-btn>
        </form>
      </v-container>
      <item-management :categorizedItems="categorizedSections" 
                       :deleteItem="onDeleteItem" :updateItem="onUpdateItem">
      </item-management>

    </v-container>
  </v-app>
</template>

<script>
import ItemManagement from './ItemManagement.vue';
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ItemManagement
  },
  data() {
    return {
      isForm: false,
      name: '',
      description: '',
      price: '',
      category: ''
    };
  },
  computed: {
    ...mapGetters(["categorizedSections"]),
  },
  methods: {
    ...mapActions(["fetchItems", "deleteItem", "updateItem", "addItem"]),
    onDeleteItem(id) {
      this.deleteItem(id);
    },
    onUpdateItem(data) {
      this.updateItem(data);
    },
    showForm() {
      this.isForm = !this.isForm;
    },
    submit() {
      const data = {
        name: this.name,
        description: this.description,
        price: this.price,
        category: this.category
      }
      if (data.name) {
        this.addItem(data);
      }
      this.name = '';
      this.description = '';
      this.price = '';
      this.category = '';
      this.isForm = !this.isForm;
    }
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style>
/* Add your custom styles here */
h1 {
  margin: auto;
}
</style>
