const router = require('express').Router();

const { flatController } = require('../controllers');
// const flatMiddleware = require('../../middleware/flat.middleware');

router.get('/', flatController.getAllFlats);

router.post(
    '/',
    flatController.createFlat
);

router.get('/:flat_id', flatController.getFlatById);
router.patch('/:flat_id', flatController.updateFlat);

// router.delete('/flat', )

module.exports = router;
