require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./middleware/logEvents');
const Link = require('./model/link');

const PORT = 8080;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

app.get('/', (req, res) => res.end('You are at right place'));

app.post('/createlink', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) return res.status(400).json({ message: 'URL is required' });

    const newLink = await Link.create({ url });

    res.json(newLink.id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/getlink', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id.length) return res.status(400).json({ message: 'ID is required' });

    const foundedLink = await Link.findById(id);

    if (!foundedLink) return res.status(404).json({ message: 'URL not found' });

    res.json(foundedLink.url);
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
      { url },
      { new: true, runValidators: true }
    );

    res.json({ id: updatedLink.id, url: updatedLink.url });
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
