const { Buildings } = require('../models');

const getAll = async () => {
    const buildings = await Buildings.find();

    return buildings;
};

const getBuildingById = async (id) => {
    const building = await Buildings.findById(id);

    return building;
};

const getBuildingByEmail = async (email) => {
    const building = await Buildings.findOne({ email: `${email}` }).exec();

    return building;
};

const createBuilding = async (buildingData) => {
    const building = await Buildings.create(buildingData);

    if (building) {
        process.stdout.write('\n ...new building created \n\n');
    }

    return building;
};

const updateBuilding = async (id, data) => {
    const updatedBuilding = await Buildings.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

    if (updatedBuilding) {
        process.stdout.write('\n ...building updated \n\n');
    }

    return updatedBuilding;
};

const deleteBuilding = async (id) => {
    const deletedBuilding = await Buildings.findByIdAndDelete(id);

    // console.log(deletedBuilding);

    if (deletedBuilding) {
        process.stdout.write('\n ...building was deleted\n\n');
    }

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
