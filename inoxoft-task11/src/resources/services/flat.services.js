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
    const flat = await Flats.findOne({ _id: `${id}` });

    return flat;
};

const updateFlat = async (id, flatData = {}) => {
    const flat = await getFlatById(id);

    const updatedFlat = await Flats.findByIdAndUpdate(id, flatData, {
        new: true,
        runValidators: true,
    });

    if (updatedFlat) {
        if (flatData.owners) {
            await Users.updateMany({}, { $pull: { flats: flat._id } }, { multi: true });
            await Users.updateMany({ _id: updatedFlat.owners }, { $push: { flats: updatedFlat._id } });
        }

        if (flatData.building) {
            await Buildings.updateOne({ _id: flat.building }, { $pull: { flats: flat._id } }, { multi: true });
            await Buildings.updateOne({ _id: updatedFlat.Building }, { $push: { flats: updatedFlat._id } });
        }

        process.stdout.write('\n ...flat updated \n\n');
    }

    return updatedFlat;
};

const deleteFlat = async (id) => {
    const deletedFlat = await Flats.findByIdAndDelete(id);

    if (deletedFlat) {
        if (deletedFlat.owners) {
            await Users.updateMany({}, { $pull: { flats: deletedFlat._id } }, { multi: true });
        }

        if (deletedFlat.building) {
            await Buildings.updateOne({ _id: deletedFlat.building }, { $pull: { flats: deletedFlat._id } }, { multi: true });
        }

        process.stdout.write('\n ...flat was deleted\n\n');

        return true;
    }

    return false;
};

module.exports = {
    getAllFlats,
    createFlat,
    getFlatById,
    updateFlat,
    deleteFlat,
};
