require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const linkRoutes = require('./routes/linkRoute');
const contactRoutes = require('./routes/contactRoute');

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.get('/', (req, res) => res.end('You are at right place'));
app.use('/link', linkRoutes);
app.use('/contact', contactRoutes);

mongoose.connect(`${process.env.DB_URI}`).then(() => {
  console.log('Connected to mongoDB');
  app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
  });
});
