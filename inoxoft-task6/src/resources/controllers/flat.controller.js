const flatService = require('../services/flat.services');

const HttpStatusCode = require('../../common/statusCodes');

const asyncWrapper = require('../../middleware/asyncWrapper');

module.exports = {

    getAllFlats: asyncWrapper(async (req, res) => {
        const flats = await flatService.getAllFlats();

        if (!flats || flats.length < 1) {
            return res.status(HttpStatusCode.NOT_FOUND).send({ message: 'No flats found' });
        }

        return res.status(HttpStatusCode.OK).json(flats);
    }),

    createFlat: asyncWrapper(async (req, res) => {
        const flat = await flatService.createFlat(req.body);

        if (!flat) {
            return res.status(HttpStatusCode.CONFLICT).send({ message: 'Can\'t create new Flat, try again' });
        }

        return res.status(HttpStatusCode.CREATED).json(flat);
    }),
};
