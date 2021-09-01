const HttpStatusCode = require('../../common/statusCodes');

const buildingService = require('../services/building.services');

const asyncWrapper = require('../../middleware/asyncWrapper');

module.exports = {

    getAllBuildings: asyncWrapper(async (req, res) => {
        const buildings = await buildingService.getAll();

        return res.status(HttpStatusCode.OK).json(buildings);
    }),

    createBuilding: asyncWrapper(async (req, res) => {
        const building = await buildingService.createBuilding(req.body);

        return res.status(HttpStatusCode.CREATED).json(building);
    }),

    getBuildingById: asyncWrapper(async (req, res) => {
        const { building_id } = req.params;

        const building = await buildingService.getBuildingById(building_id);

        return res.json(building);
    }),

};
