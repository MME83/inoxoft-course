const router = require('express').Router();

const buildingController = require('../controllers/building.controller');
const buildingMiddleware = require('../../middleware/building.middleware');

router.get('/', buildingController.getAllBuildings);

router.post(
    '/',
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
    buildingMiddleware.isBuildingIdValid,
    buildingMiddleware.isBuildingUpdReqBodyValid,
    buildingMiddleware.isBuildingByIdExists,
    buildingMiddleware.isEmailUnique,
    buildingController.updateBuilding
);

router.delete(
    '/:building_id',
    buildingMiddleware.isBuildingIdValid,
    buildingMiddleware.isBuildingByIdExists,
    buildingController.deleteBuilding
);

module.exports = router;
