const router = require('express').Router();

const buildingController = require('../controllers/building.controller');
const buildingMiddleware = require('../../middleware/building.middleware');
const authMiddleware = require('../../middleware/auth.middleware');

router.get('/', buildingController.getAllBuildings);

router.post(
    '/',
    authMiddleware.checkAccessToken,
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
    authMiddleware.checkAccessToken,
    buildingMiddleware.isBuildingIdValid,
    buildingMiddleware.isBuildingUpdReqBodyValid,
    buildingMiddleware.isBuildingByIdExists,
    buildingMiddleware.isEmailUnique,
    buildingController.updateBuilding
);

router.delete(
    '/:building_id',
    authMiddleware.checkAccessToken,
    buildingMiddleware.isBuildingIdValid,
    buildingMiddleware.isBuildingByIdExists,
    buildingController.deleteBuilding
);

module.exports = router;
