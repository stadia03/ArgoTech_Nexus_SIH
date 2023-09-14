const express = require('express');
const { connectToDatabase } = require('../database'); // Adjust the path as needed
const router = express.Router();

router.post('/new', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('items');

    const data = req.body;
    // console.log("post"+data);
    const result = await collection.insertOne(data);

    res.status(201).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/new', async (req, res) => {
  res.render('new');
  
});

router.get('/home', async (req, res) => {
  const item={
    state: "",
    district: "",
    market: "",
    commodity:"",
    price:"To be predicted"
  }
  res.render('home',{item:item});
  
});


router.get('/search-page', async (req, res) => {
  res.render('search');
})

router.post('/search', async (req, res) => {
  // console.log(req.params.district);
  try {
    const db = await connectToDatabase();
    const collection = db.collection('items');

    const { district, commodity } = req.body;
    console.log(req.body);
    const item = await collection.findOne({ district: district, commodity: commodity });
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    const result={
      state: item.state,
      district: item.district,
      market: item.market,
      commodity:item.commodity,
      price:item.price
    }

    res.render('home',{item:result});
    // res.json({ district: item.district, commodity: item.commodity ,price: item.price});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
