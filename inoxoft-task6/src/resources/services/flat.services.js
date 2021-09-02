const { Flats, Users, Buildings } = require('../models');

const getAllFlats = async () => {
    const flats = await Flats.find();

    return flats;
};

const createFlat = async (flatData) => {
    const newFlat = await Flats.create(flatData);

    await Buildings.updateOne({ _id: newFlat.building }, { $push: { flats: newFlat._id } });
    await Users.updateMany({ _id: newFlat.owners }, { $push: { flats: newFlat._id } });

    return newFlat;
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
};
