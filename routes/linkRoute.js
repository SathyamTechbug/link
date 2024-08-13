const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

router.get('/getAll', linkController.getAllLinks);
router.post('/createLink', linkController.createLink);
router.get('/getLink/:id', linkController.getLinkById);
router.put('/updateLink/:id', linkController.updateLink);
router.delete('/deleteLink/:id', linkController.deleteLink);

module.exports = router;
