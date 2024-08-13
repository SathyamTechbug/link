const Link = require('../model/link');

const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find();
    if (!links) return res.status(404).json({ message: 'URLs not found' });
    res.json(links);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLinkById = async (req, res) => {
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
};

const createLink = async (req, res) => {
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
};

const updateLink = async (req, res) => {
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
};

const deleteLink = async (req, res) => {
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
};

module.exports = {
  getAllLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
};
