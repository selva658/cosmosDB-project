<!-- App.vue -->
<template>
  <v-app>
    <v-container>
      <item-management-wrapper></item-management-wrapper>
    </v-container>
  </v-app>
</template>

<script>
import ItemManagementWrapper from './components/ItemManagementWrapper.vue';

export default {
  components: {
    ItemManagementWrapper
  }
};
</script>

<style>
/* Add your custom styles here */
</style>
