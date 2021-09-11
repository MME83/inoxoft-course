const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const { IMAGE_MAX_SIZE, IMAGE_MIME_TYPES } = require('../common/constants');

module.exports = {
    checkBuildingImage: (req, res, next) => {
        try {
            const { building_image } = req.files;

            if (!building_image) {
                next();
                return;
            }

            const { name, size, mimetype } = building_image;

            if (!IMAGE_MIME_TYPES.includes(mimetype)) {
                throw new CustomError(HttpStatusCode.BAD_REQUEST, `Wrong file format ${name}`);
            }

            if (size > IMAGE_MAX_SIZE) {
                throw new CustomError(HttpStatusCode.BAD_REQUEST, `FIle ${name} is to large`);
            }

            next();
        } catch (err) {
            next(err);
        }
    }
};
