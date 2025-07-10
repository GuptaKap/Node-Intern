const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
  createDoc, getDocs, getDocById, updateDoc
} = require('../controllers/docController');

const router = express.Router();
router.use(auth);

router.post('/', createDoc);
router.get('/', getDocs);
router.get('/:id', getDocById);
router.put('/:id', updateDoc);

module.exports = router;
