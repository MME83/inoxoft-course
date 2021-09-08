const router = require('express').Router();

const { flatController } = require('../controllers');
const { authMiddleware, roleMiddleware } = require('../../middleware');

const { ADMIN } = require('../../common/user-role.enum');

router.get('/', flatController.getAllFlats);

router.post(
    '/',
    flatController.createFlat
);

router.get(
    '/:flat_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([ADMIN]),
    flatController.getFlatById
);

router.patch(
    '/:flat_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([ADMIN]),
    flatController.updateFlat
);

router.delete(
    '/:flat_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([ADMIN]),
    flatController.deleteFlat
);

module.exports = router;
