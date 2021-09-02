const router = require('express').Router();

const flatController = require('../controllers/flat.controller');
// const flatMiddleware = require('../../middleware/flat.middleware');

router.get('/', flatController.getAllFlats);

router.post(
    '/',
    flatController.createFlat
);

// router.update('/:flat_id', flatController.updateFlat);
// router.delete('/flat', )

module.exports = router;
