const router = require('express').Router();

const buildingController = require('../controllers/building.controller');
const buildingMiddleware = require('../../middleware/building.middleware');

router.get('/', buildingController.getAllBuildings);
router.get('/:building_id', buildingMiddleware.isBuildingIdValid, buildingController.getBuildingById);
router.post(
    '/',
    buildingMiddleware.isReqBodyValid,
    buildingMiddleware.isEmailUnique,
    buildingController.createBuilding
);

/*
router.patch(
    '/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isReqBodyUpdateValid,
    userMiddleware.isUserByIdExists,
    userController.updateUser
);
*/
// router.delete('/:user_id', userMiddleware.isUserIdValid, userMiddleware.isUserByIdExists, userController.deleteUser);

module.exports = router;
