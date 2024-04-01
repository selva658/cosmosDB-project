import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const categorizeItems = items => {
  const categorized = {
    clothing: [],
    books: [],
    electronics: [],
    uncategorized: []
  };

  items.forEach(item => {
    const category = item.category ? item.category.toLowerCase() : 'uncategorized';
    categorized[category]?.push(item);
  });

  return categorized;
};

export default new Vuex.Store({
  state: {
    items: [],
    clothing: [],
    books: [],
    electronics: [],
    uncategorized: []
  },
  mutations: {
    SET_ITEMS(state, { items, categorized }) {
      state.items = items;
      Object.keys(categorized).forEach(category => {
        state[category] = categorized[category];
      });
    }
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const response = await axios.get('http://localhost:4000/api/items');
        const items = response.data;
        const categorized = categorizeItems(items);
        commit('SET_ITEMS', { items, categorized });
      } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
      }
    },
    async addItem({ commit }, data) {
      try {
        const response = await axios.post('http://localhost:4000/api/items', data);
        const items = response.data;
        const categorized = categorizeItems(items);
        commit('SET_ITEMS', { items, categorized });
      } catch (error) {
        console.error('Error adding item:', error);
        throw error;
      }
    },
    async updateItem({ commit }, data) {
      try {
        const response = await axios.put(`http://localhost:4000/api/items/${data.id}`, data);
        const items = response.data;
        const categorized = categorizeItems(items);
        commit('SET_ITEMS', { items, categorized });
      } catch (error) {
        console.error('Error updating item:', error);
        throw error;
      }
    },
    async deleteItem({ commit }, id) {
      try {
        await axios.delete(`http://localhost:4000/api/items/${id}`);
        const response = await axios.get('http://localhost:4000/api/items');
        const items = response.data;
        const categorized = categorizeItems(items);
        commit('SET_ITEMS', { items, categorized });
      } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
      }
    }
  },
 // Vuex store
getters: {
  categorizedSections: state => {
    return {
      clothing: state.clothing,
      books: state.books,
      electronics: state.electronics,
      uncategorized: state.uncategorized
    };
  }
}

});
