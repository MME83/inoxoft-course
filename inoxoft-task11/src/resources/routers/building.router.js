const router = require('express').Router();

const user_role = require('../../common/user-role.enum');

const {
    authMiddleware,
    roleMiddleware,
    buildingMiddleware,
    imageMiddleware
} = require('../../middleware');

const { buildingController } = require('../controllers');

router.get('/', buildingController.getAllBuildings);

router.post(
    '/',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([user_role.ADMIN]),
    buildingMiddleware.isReqBodyValid,
    imageMiddleware.checkBuildingImage,
    buildingMiddleware.isEmailUnique,
    buildingController.createBuilding
);

router.get(
    '/:building_id',
    buildingMiddleware.isBuildingIdValid,
    buildingController.getBuildingById
);

router.patch(
    '/:building_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([user_role.ADMIN]),
    buildingMiddleware.isBuildingIdValid,
    buildingMiddleware.isBuildingUpdReqBodyValid,
    buildingMiddleware.isBuildingByIdExists,
    buildingMiddleware.isEmailUnique,
    buildingController.updateBuilding
);

router.delete(
    '/:building_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([user_role.ADMIN]),
    buildingMiddleware.isBuildingIdValid,
    buildingMiddleware.isBuildingByIdExists,
    buildingController.deleteBuilding
);

module.exports = router;
