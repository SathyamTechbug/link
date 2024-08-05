require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const Link = require('./model/link');

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

app.get('/', (req, res) => res.end('You are at right place'));

app.get('/getall', async (req, res) => {
  try {
    const links = await Link.find();

    if (!links) return res.status(404).json({ message: 'URLs not found' });

    res.json(links);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getlink/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.length) return res.status(400).json({ message: 'ID is required' });

    const foundLink = await Link.findById(id);

    if (!foundLink) return res.status(404).json({ message: 'URL not found' });

    res.redirect(foundLink.url);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/createlink', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) return res.status(400).json({ message: 'URL is required' });

    const foundLink = await Link.findOne({ url: url });

    if (foundLink) return res.json(foundLink);

    const newLink = await Link.create({ url });

    res.json(newLink);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/updatelink/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    if (!id.length || !url.length)
      return res.status(400).json({ message: 'ID and URL is required' });

    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { url, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json(updatedLink);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/deletelink/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.length) return res.status(400).json({ message: 'ID is required' });

    const foundLink = await Link.findById(id);

    if (!foundLink) return res.status(404).json({ message: 'URL not found' });

    await Link.findByIdAndDelete(id);

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

mongoose.connect(`${process.env.DB_URI}`).then(() => {
  console.log('Connected to mongoDB');
  app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
  });
});
