const router = require('express').Router();

const user_role = require('../../common/user-role.enum');

const { checkAccessToken } = require('../../middleware/auth.middleware');
const { checkUserRole } = require('../../middleware/role.middleware');
const buildingMiddleware = require('../../middleware/building.middleware');

const buildingController = require('../controllers/building.controller');

router.get('/', buildingController.getAllBuildings);

router.post(
    '/',
    checkAccessToken,
    checkUserRole([user_role.ADMIN]),
    buildingMiddleware.isReqBodyValid,
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
    checkAccessToken,
    checkUserRole([user_role.ADMIN]),
    buildingMiddleware.isBuildingIdValid,
    buildingMiddleware.isBuildingUpdReqBodyValid,
    buildingMiddleware.isBuildingByIdExists,
    buildingMiddleware.isEmailUnique,
    buildingController.updateBuilding
);

router.delete(
    '/:building_id',
    checkAccessToken,
    checkUserRole([user_role.ADMIN]),
    buildingMiddleware.isBuildingIdValid,
    buildingMiddleware.isBuildingByIdExists,
    buildingController.deleteBuilding
);

module.exports = router;
