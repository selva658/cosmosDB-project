<!-- ItemManagement.vue -->
<template>
  <v-card>
    <v-card-text>
      <v-list v-for="(sectionItems, sectionName) in categorizedItems" :key="sectionName">
      <v-card-title>{{sectionName}}</v-card-title>
        <v-list-item v-for="item in sectionItems" :key="item.id">
          <v-list-item-content>
            <v-text-field v-model="item.name" label="Name"></v-text-field>
            <v-text-field v-model="item.description" label="Description"></v-text-field>
            <v-text-field v-model="item.price" label="Price"></v-text-field>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="updateItem(item)" color="error">Update</v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn @click="deleteItem(item.id)" color="error">Delete</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
   props: {
    title: String, // Receive the title prop
    categorizedItems: Object,
    deleteItem: Function,
    updateItem: Function
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
