const router = require('express').Router();

const {
    authMiddleware,
    roleMiddleware,
    flatMiddleware
} = require('../../middleware');

const { flatController } = require('../controllers');

const { ADMIN, USER } = require('../../common/user-role.enum');

router.get(
    '/',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([ADMIN]),
    flatController.getAllFlats
);

router.post(
    '/',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([ADMIN]),
    flatMiddleware.isReqBodyValid,
    flatController.createFlat
);

router.get(
    '/:flat_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkRoleAndIdAccess([USER]),
    flatMiddleware.isFlatIdValid,
    flatController.getFlatById
);

router.patch(
    '/:flat_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([ADMIN]),
    flatMiddleware.isFlatIdValid,
    flatMiddleware.isFlatUpdReqBodyValid,
    flatMiddleware.isFlatByIdExists,
    flatController.updateFlat
);

router.delete(
    '/:flat_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([ADMIN]),
    flatMiddleware.isFlatIdValid,
    flatMiddleware.isFlatByIdExists,
    flatController.deleteFlat
);

module.exports = router;
