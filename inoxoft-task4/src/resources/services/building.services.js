const { Buildings } = require('../models');

const CustomError = require('../../errors/errorHandler');
const HttpStatusCode = require('../../common/statusCodes');

const getAll = async () => {
    const buildings = await Buildings.find();

    if (!buildings || buildings.length < 1) throw new CustomError(HttpStatusCode.NOT_FOUND, 'No buildings found');

    return buildings;
};

const getBuildingById = async (id) => {
    const building = await Buildings.findById(id);

    if (!building) throw new CustomError(HttpStatusCode.NOT_FOUND, 'Building not found');

    return building;
};

const getBuildingByEmail = async (email) => {
    const building = await Buildings.findOne({ email: `${email}` }).exec();

    return building;
};

const createBuilding = async (buildingData) => {
    const building = await Buildings.create(buildingData);

    if (!building) throw new CustomError(HttpStatusCode.CONFLICT, 'Can\'t create new building, try again');

    process.stdout.write('\n ...a new building has created \n\n');
    return building;
};

const updateBuilding = async (id, data) => {
    const updatedBuilding = await Buildings.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

    if (!updatedBuilding) throw new CustomError(HttpStatusCode.NOT_FOUND, 'Building not found');

    return updatedBuilding;
};

const deleteBuilding = async (id) => {
    const deletedBuilding = await Buildings.findByIdAndDelete(id);

    if (!deletedBuilding) throw new CustomError(HttpStatusCode.NOT_FOUND, 'Building not found');

    process.stdout.write('\n ...building has deleted\n\n');
    return true;
};

module.exports = {
    getAll,
    getBuildingById,
    getBuildingByEmail,
    createBuilding,
    updateBuilding,
    deleteBuilding,
};
