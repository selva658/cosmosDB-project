// routes/items.js
const express = require('express');
const router = express.Router();
const { getItems, addItem, updateItem, deleteItem } = require('../database');

router.get('/', async (req, res, next) => {
  try {
    const items = await getItems(req.container);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await addItem(req.container, req.body);
    const items = await getItems(req.container);
    res.status(201).json(items);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    await updateItem(req.container, itemId, req.body);
    const items = await getItems(req.container);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    await deleteItem(req.container, itemId);
    const items = await getItems(req.container);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
