// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { CosmosClient } = require("@azure/cosmos");
const cors = require('cors');
const { getItems, addItem, updateItem, deleteItem } = require('./database');

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

const endpoint = '';
const key = '';
const databaseId = "ToDoList";
const containerId = "Items";

const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

app.use(bodyParser.json());

// Routes
app.get('/api/items', async (req, res, next) => {
  try {
    const items = await getItems(container);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

app.post('/api/items', async (req, res, next) => {
  try {
    await addItem(container, req.body);
    const items = await getItems(container);
    res.status(201).json(items);
  } catch (error) {
    next(error);
  }
});

app.put('/api/items/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    await updateItem(container, itemId, req.body);
    const items = await getItems(container);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/items/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    await deleteItem(container, itemId);
    const items = await getItems(container);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
