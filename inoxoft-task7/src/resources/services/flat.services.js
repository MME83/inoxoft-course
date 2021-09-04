const { Flats, Users, Buildings } = require('../models');

const getAllFlats = async () => {
    const flats = await Flats.find();

    return flats;
};

const createFlat = async (flatData) => {
    const newFlat = await Flats.create(flatData);

    if (newFlat) {
        process.stdout.write('\n ...flat created \n\n');
    }

    await Buildings.updateOne({ _id: newFlat.building }, { $push: { flats: newFlat._id } });
    await Users.updateMany({ _id: newFlat.owners }, { $push: { flats: newFlat._id } });

    return newFlat;
};

const getFlatById = async (id) => {
    const flat = await Flats.findOne(id);

    return flat;
};

const updateFlat = async (id, flatData) => {
    await Users.deleteMany({ _id: flatData.owners }, { $pull: { flats: id } });

    const updatedFlat = await Flats.findByIdAndUpdate(id, flatData, {
        new: true,
        runValidators: true,
    });

    await Users.updateMany({ _id: updatedFlat.owners }, { $push: { flats: updatedFlat._id } });

    if (updatedFlat) {
        process.stdout.write('\n ...flat updated \n\n');
    }

    return updatedFlat;
};

// const getFlatsByBuildingId;
// const getFlatsByStreetEndNum;
// const getFlatsByOwnerId;

// const getFlatById;
// const getFlatByOwnerId;

/*
const createFlat = async {flatData, buildingId, ownersIds} => {
    return Flats.create(flatData).then(docFlats => {
        console.log('Created Flat:\n', docFlats);

        return Users.findByIdAndUpdate(

        )
    })
};
*/

module.exports = {
    getAllFlats,
    createFlat,
    getFlatById,
    updateFlat,
};
