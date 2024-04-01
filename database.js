// database.js

async function getItems(container) {
    const querySpec = {
      query: "SELECT * FROM c"
    };
    const { resources: items } = await container.items.query(querySpec).fetchAll();
    return items;
  }
  
  async function addItem(container, newItem) {
    await container.items.create(newItem);
  }
  
  async function updateItem(container, itemId, updatedItem) {
    await container.item(itemId).replace(updatedItem);
  }
  
  async function deleteItem(container, itemId) {
    await container.item(itemId).delete();
  }
  
  module.exports = { getItems, addItem, updateItem, deleteItem };
  