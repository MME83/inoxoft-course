const { buildingService, s3Service } = require('../services');

const asyncWrapper = require('../../middleware/asyncWrapper');

const HttpStatusCode = require('../../common/statusCodes');
const { BUILDING } = require('../../db/dbTablesEnum');

module.exports = {

    getAllBuildings: asyncWrapper(async (req, res) => {
        const buildings = await buildingService.getAll();

        if (!buildings || buildings.length < 1) {
            return res.status(HttpStatusCode.NOT_FOUND).send('No buildings found');
        }

        return res.status(HttpStatusCode.OK).json(buildings);
    }),

    createBuilding: asyncWrapper(async (req, res) => {
        const { building_image } = req.files;

        const building = await buildingService.createBuilding(req.body);

        if (!building) {
            return res.status(HttpStatusCode.CONFLICT).send('Can\'t create new building, try again');
        }

        if (building_image) {
            const { _id } = building;
            const uploadedImage = await s3Service.uploadImage(building_image, BUILDING, _id);

            if (!uploadedImage) {
                return res.status(HttpStatusCode.CREATED).json('Can\'t upload img, but building was created:\n', building);
            }

            await buildingService.setBuildingImage(_id, uploadedImage.Location);
        }

        return res.status(HttpStatusCode.CREATED).json(building);
    }),

    getBuildingById: asyncWrapper(async (req, res) => {
        const { building_id } = req.params;

        const building = await buildingService.getBuildingById(building_id);

        if (!building) {
            return res.status(HttpStatusCode.NOT_FOUND).send('Building not found');
        }

        return res.json(building);
    }),

    updateBuilding: asyncWrapper(async (req, res) => {
        const { building_id } = req.params;

        const updData = req.body;

        const building = await buildingService.updateBuilding(building_id, updData);

        if (!building) {
            return res.status(HttpStatusCode.NOT_FOUND).send('Building not found');
        }

        return res.status(HttpStatusCode.OK).json(building);
    }),

    deleteBuilding: asyncWrapper(async (req, res) => {
        const { building_id } = req.params;

        const deletedBuilding = await buildingService.deleteBuilding(building_id);

        if (!deletedBuilding) {
            return res.status(HttpStatusCode.NOT_FOUND).send('Building not found');
        }

        return res.status(HttpStatusCode.OK).send({ message: 'User has deleted' });
    }),
};
