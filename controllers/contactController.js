const Contact = require('../model/contact');

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts)
      return res.status(404).json({ message: 'Contacts not found' });
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.length) return res.status(400).json({ message: 'ID is required' });
    const foundContact = await Contact.findById(id);
    if (!foundContact)
      return res.status(404).json({ message: 'Contact not found' });
    res.json(foundContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createContact = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: 'Name and Email are required' });
    const newContact = await Contact.create({ name, email });
    res.json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!id.length || !name.length || !email.length)
      return res
        .status(400)
        .json({ message: 'ID, Name, and Email are required' });
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    res.json(updatedContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.length) return res.status(400).json({ message: 'ID is required' });
    const foundContact = await Contact.findById(id);
    if (!foundContact)
      return res.status(404).json({ message: 'Contact not found' });
    await Contact.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
